<?php

namespace MelisCore\Service;

use MelisCmsUserAccount\Service\MelisCmsUserAccountGdprAutoDeleteService;
use MelisCore\Model\Tables\MelisGdprDeleteEmailsSentTable;
use MelisCore\Model\Tables\MelisGdprDeleteEmailsTable;
use Zend\Validator\File\Exists;
use Zend\Validator\File\Extension;
use Zend\Validator\IsInstanceOf;
use Zend\View\Model\ViewModel;
use Zend\View\Renderer\PhpRenderer;
use Zend\View\Resolver\TemplateMapResolver;

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * Class MelisCoreGdprAutoDeleteService
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 * @package MelisCore\Service
 */
class MelisCoreGdprAutoDeleteService extends MelisCoreGeneralService
{
    /**
     * constants to avoid incorrect entries of events,keys and can be use everywhere
     */
    const MODULE_LIST_KEY = "modules_list";
    const TAGS_EVENT = "melis_core_gdpr_auto_delete_modules_tags_list";
    const TAG_LIST_KEY = "modules_tags_list";
    const TAG_KEY = "tags";
    const WARNING_EVENT = "melis_core_gdpr_auto_delete_warning_list_of_users";
    const WARNING_LIST_KEY = "modules_warning_list";
    const SECOND_WARNING_EVENT = "melis_core_gdpr_auto_delete_second_warning_list_of_users";
    const SECOND_WARNING_LIST_KEY = "modules_second_warning_list";
    const VALIDATION_KEY = "validation_key";
    const CONFIG_KEY = "config";
    const LANG_KEY = "lang";
    const WARNING_METHONG = '';

    /**
     * @var MelisCoreGdprAutoDeleteToolService
     */
    protected $gdprAutoDeleteToolService;

    /**
     * @var MelisGdprDeleteEmailsSentTable
     */
    protected $deleteEmailsSentTable;

    /**
     * MelisCoreGdprAutoDeleteService constructor.
     * @param MelisCoreGdprAutoDeleteToolService $autoDeleteToolService
     * @param MelisGdprDeleteEmailsSentTable $deleteEmailsSentTable
     */
    public function __construct(
        MelisCoreGdprAutoDeleteToolService $autoDeleteToolService,
        MelisGdprDeleteEmailsSentTable $deleteEmailsSentTable
    )
    {
        $this->gdprAutoDeleteToolService = $autoDeleteToolService;
        $this->deleteEmailsSentTable = $deleteEmailsSentTable;
    }
    /**
     * get the list of tags in every modules that was sent through their respective listeners
     * @return array
     */
    public function getAllModulesListOfTags()
    {
        return $this->getDataOfAnEvent(self::TAGS_EVENT, self::TAG_LIST_KEY, self::TAG_KEY);
    }

    public function runCron()
    {
        // retrieving list of modules and list of sites
        $autoDelConfig = $this->gdprAutoDeleteToolService->getAllGdprAutoDeleteConfigData();
        // retrieving list of users' emails for first warning
        if (!empty($autoDelConfig)) {
            foreach ($autoDelConfig as $idx => $config) {
                // send email for first warning users
                $this->sendEmailForWarningUsers($config);
                // send mail for second warnign users
                $this->sendEmailForSecondWarningUsers($config);
            }

            return true;
        }

        return false;
    }

    /**
     * send first warning email for users that are inactvie
     * @param $autoDelConf
     * @return bool
     */
    private function sendEmailForWarningUsers($autoDelConf)
    {
        // if alert email status is in active then we get the list of warning users to mailed for revalidation
        if ($autoDelConf['mgdprc_alert_email_status']) {
            // check if the is days of inactivity set
            if ($autoDelConf['mgdprc_alert_email_days'] > 0) {
                // get all modules warning list of users
                $modulesWarningListsOfUsers = $this->getAllModulesWarningListOfUsers();
                if (!empty($modulesWarningListsOfUsers)) {
                    foreach ($modulesWarningListsOfUsers as $moduleName => $emails) {
                        // first check if user is belong to current site of the config
                        foreach ($emails as $email => $emailOpts) {
                            // check emmail logs on email_sent if email is not yet mailed
                            if (empty($this->getEmailSentAlertByEmailDatetime($email, date('Y-m-d')))) {
                                // check user if it belongs to the auto delete config
                                if ($this->checkUsersSite($emailOpts[self::CONFIG_KEY]['site_id'],$autoDelConf['mgdprc_site_id'])){
                                    // check user's inactive number of days
                                    if ($this->checkUsersInactiveDays($emailOpts,$autoDelConf['mgdprc_alert_email_days'])) {
                                        // send email
                                        $this->sendWarningEmails($autoDelConf,$email, $emailOpts);
                                    } else {
                                        $message = "";
                                    }
                                }
                            } else {
                                $message = "Email " .$email . " was already mailed today";
                            }
                        }
                    }
                }
            } else {
                $message =  "Error logs no inactivity days was set";
            }
        } else {
            $message = "Logs Alert email is off";
        }
    }

    /**
     * @param $autoDelConf
     * @return bool
     */
    private function sendEmailForSecondWarningUsers($autoDelConf)
    {
        // if alert resend email status is in active then we get the list of warning users to mailed for revalidation again
        if ($autoDelConf['mgdprc_alert_email_resend']) {
            // get all modules second warning list of users
            $modulesWarningListsOfUsers = $this->getAllModulesSecondWarningListOfUsers();
            if (!empty($modulesWarningListsOfUsers)) {
                foreach ($modulesWarningListsOfUsers as $moduleName => $emails) {
                    foreach ($emails as $email => $emailOpts) {
                        // check if email is already mailed or not on this date
                        if (empty($this->getEmailSentAlertByEmailDatetime($email, date('Y-m-d')))) {
                            // check sites of user if it belongs to the auto delete config
                            if ($this->checkUsersSite($emailOpts[self::CONFIG_KEY]['site_id'],$autoDelConf['mgdprc_site_id'])) {
                                // check users inactive days
                                if ($this->checkUsersInactiveDays7DaysBeforeDeadline($emailOpts,$autoDelConf['mgdprc_delete_days'])) {
                                    // send email
                                    $this->sendWarningEmails($autoDelConf,$email, $emailOpts);
                                }
                            }
                        } else {
                            $message = "Email " . $email . " was already mailed today";
                        }
                    }
                }
                return true;
            }
        } else {
            $message = "Logs Alert email is off";
        }
    }

    /**
     * check user sites on the auto delete config
     * @param $site
     * @param $autoDeleteSiteId
     * @return bool
     */
    private function checkUsersSite($site, $autoDeleteSiteId)
    {
        $status = false;
        // if aarray
        if (is_array($site)) {
            if (in_array($autoDeleteSiteId,$site)) {
                $status = true;
            }
        }
        // if string
        if ($site == $autoDeleteSiteId) {
            $status = true;
        }

        return $status;
    }

    /**
     * check users inactive days for first warning email
     * @param $emailOpt
     * @param $alertEmailDays
     * @return bool
     */
    private function checkUsersInactiveDays($emailOpt, $alertEmailDays)
    {
        $inactiveUsers = false;
        // compare the users inactive days to auto delete config (Alert email sent after inactivity of)
        $usersDaysOfInactive = $this->getDaysDiff($emailOpt[self::CONFIG_KEY]['last_date'], date('Y-m-d'));
        iF ($usersDaysOfInactive > $alertEmailDays) {
            $inactiveUsers = true;
        }

        return $inactiveUsers;
    }

    /**
     * check users inactive days for first warning email
     * @param $emailOpt
     * @param $alertEmailDays
     * @return bool
     */
    private function checkUsersInactiveDays7DaysBeforeDeadline($emailOpt, $alertEmailDays)
    {
        $status = false;
        // compare the users inactive days to auto delete config (Alert email sent after inactivity of)
        $usersDaysOfInactive = $this->getDaysDiff($emailOpt[self::CONFIG_KEY]['last_date'], date('Y-m-d'));
        // check if the day has come, 7 days before the delete days of inactivity
        if ($usersDaysOfInactive == ($alertEmailDays) - 7) {
            $status = true;
        }

        return $status;
    }

    /**
     * @param $emails
     * @param $autoDelConf
     * @param $firstEmail
     * @return array
     */
    private function checkUsersLastDateValidityOld($emails, $autoDelConf, $firstEmail = false)
    {
        $inactiveUsers = [];
        foreach ($emails as $email => $opt) {
            // get the users days of inactivity
            $usersDaysOfInactive = $this->getDaysDiff($opt[self::CONFIG_KEY]['last_date'], date('Y-m-d'));
            if ($firstEmail) {
                iF ($usersDaysOfInactive > $autoDelConf['mgdprc_alert_email_days']) {
                    $inactiveUsers[$email] = $opt;
                }
            } else {
                // check if the day has come 7 days before the delete days of inactivity
                if ($usersDaysOfInactive == ($autoDelConf['mgdprc_delete_days']) - 7) {
                    $inactiveUsers[$email] = $opt;
                }
            }

        }

        return $inactiveUsers;
    }
    /**
     * check if the email is already mailed date to day
     * @param $emails
     * @return array
     */
    private function verifyAlertEmailSentStatus($emails)
    {
        // emails not mailed
        $emailsNotMailed = [];
        if (!empty($emails)) {
            foreach ($emails as $email => $emailOptions) {
                $data = $this->getEmailSentAlertByEmailDatetime($email, date('Y-m-d'));
                if (empty($data)) {
                    // now we know the email is not yet emailed
                    $emailsNotMailed[$email] = $emailOptions;
                }
            }
        }

        return $emailsNotMailed;
    }

    /**
     * calculate the diffrence of two dates in days
     * @param $date1
     * @param $date2
     * @return float
     */
    private function getDaysDiff($date1, $date2)
    {
        $diff = abs(strtotime($date2) - strtotime($date1));
        $years = floor($diff / (365*60*60*24));
        $months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));

        return floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24) / (60*60*24));
    }

    /**
     * @param $email
     * @param $dateTime
     * @return mixed
     */
    public function getEmailSentAlertByEmailDatetime($email, $dateTime)
    {
        // Event parameters prepare
        $arrayParameters = $this->makeArrayFromParameters(__METHOD__, func_get_args());
        // Sending service start event
        $arrayParameters = $this->sendEvent('melis_core_gdpr_auto_delete_get_emaiL_sent_data_by_email_start', $arrayParameters);
        // get the updated value of a variable
        foreach ($arrayParameters as $var => $val) {
            $$var = $val;
        }
        // Adding results to parameters for events treatment if needed
        $arrayParameters['results'] = $this->deleteEmailsSentTable->getEmailSentAlertDataByEmailAndDate($email,$dateTime)->current();
        // Sending service end event
        $arrayParameters = $this->sendEvent('melis_core_gdpr_auto_delete_get_emaiL_sent_data_by_email_end', $arrayParameters);

        return $arrayParameters['results'];
    }

    /**
     * @param $layout
     * @param $viewData
     * @param $content
     * @return string
     */
    private function createEmailViewTemplate($layout, $viewData, $content)
    {
        // php renderer
        $view = new PhpRenderer();
        // template resolver
        $resolver = new TemplateMapResolver();
        // view model
        $viewModel = new ViewModel();
        // set map for the layout
        $resolver->setMap([
            'mail-template' => $layout
        ]);
        // set resolver for the view
        $view->setResolver($resolver);
        // set template for the view
        $viewModel->setTemplate('mail-template');
        $uri = $this->getServiceLocator()->get('request')->getUri();
        // set variables for the view model
        $viewModel->setVariables([
            'title'          => $viewData['mgdprc_email_conf_layout_title'],
            'headerLogoLink' => 'https://www.google.com/',
            'headerLogo'     => !empty($viewData['mgdprc_email_conf_layout_logo']) ?  $viewData['mgdprc_email_conf_layout_logo'] : "http://dev9.test.melistechnology.fr/img/MelisTech.png",
            'footerInfo'     => $viewData['mgdprc_email_conf_layout_desc'],
            'content'        => wordwrap($content, FALSE),
            'fromName'       => $viewData['mgdprc_email_conf_from_name']
        ]);

        return $view->render($viewModel);
    }

    /**
     * send email
     * @param $emailFrom
     * @param $emailFromName
     * @param $emailTo
     * @param null $emailToName
     * @param $replyTo
     * @param $subject
     * @param $messageHtml
     * @param null $messageText
     */
    public function sendEmail(
        $emailFrom,
        $emailFromName,
        $emailTo,
        $emailToName = null,
        $replyTo,
        $subject,
        $messageHtml,
        $messageText = null
    ) {
        return $this->getServiceLocator()->get('MelisCoreEmailSendingService')->sendEmail(
            $emailFrom,
            $emailFromName,
            $emailTo,
            $emailToName,
            $replyTo,
            $subject,
            $messageHtml,
            $messageText
        );
    }

    /**
     * trigger an event and then get data based from main key to retrieve or with sub key to retrieve
     * @param $mvcEventName
     * @param $mainKeyToRetrieve
     * @param null $subKeyToRetrieve
     * @return array
     */
    private function getDataOfAnEvent($mvcEventName, $mainKeyToRetrieve, $subKeyToRetrieve = null)
    {
        // trigger zend mvc event
        $list = $this->getEventManager()->trigger($mvcEventName,$this);
        $data = [];
        // get the returned data from each module listener
        for ($list->rewind(); $list->valid(); $list->next()) {
            // check if current data is not empty
            if (!empty($list->current())) {
                // get the lists
                foreach ($list->current()[$mainKeyToRetrieve] as $moduleName => $moduleOptions) {
                    if (!is_null($subKeyToRetrieve)) {
                        $data[$moduleName] = $moduleOptions[$subKeyToRetrieve] ?? [];
                    } else {
                        $data[$moduleName] = $moduleOptions;
                    }
                }
            }
        };

        return $data;
    }

    /**
     * get the list of warning users in every modules that was sent through their respective listeners
     * @return array
     */
    public function getAllModulesWarningListOfUsers()
    {
        return $this->getDataOfAnEvent(self::WARNING_EVENT, self::WARNING_LIST_KEY);
    }

    /**
     * get the list of second warning users in every modules that was sent through their respective listeners
     * @return array
     */
    public function getAllModulesSecondWarningListOfUsers()
    {
        return $this->getDataOfAnEvent(self::SECOND_WARNING_EVENT, self::SECOND_WARNING_LIST_KEY);
    }

    /**
     * send first warning for those email are inactive for the set days
     * @param $emailSetupConfig
     * @param $email
     * @param $emailOptions
     * @return array
     */
    public function sendWarningEmails($emailSetupConfig, $email ,$emailOptions)
    {
        $response = [];
        // check config key is present
        if ($this->isExists(MelisCoreGdprAutoDeleteService::CONFIG_KEY, $emailOptions)) {
            // check lang id is present
            if ($this->isExists(MelisCoreGdprAutoDeleteService::LANG_KEY,$emailOptions[MelisCoreGdprAutoDeleteService::CONFIG_KEY])) {
                // get lang id
                $langId = $emailOptions[MelisCoreGdprAutoDeleteService::CONFIG_KEY][MelisCoreGdprAutoDeleteService::LANG_KEY];
                // get alert emails required data for the email
                $emailContent = $this->gdprAutoDeleteToolService->getAlertEmailsTransData($emailSetupConfig['mgdprc_id'], MelisGdprDeleteEmailsTable::EMAIL_WARNING, $langId);
                // send email
                $this->sendEmail(
                    $emailSetupConfig['mgdprc_email_conf_from_email'],
                    $emailSetupConfig['mgdprc_email_conf_from_name'],
                    $email,
                    null,
                    $emailSetupConfig['mgdprc_email_conf_reply_to'],
                    $emailContent->mgdpre_subject,
                    $this->prepareEmailLayout($emailSetupConfig, $emailContent->mgdpre_html),
                    $emailContent->mgdpre_text
                );
            } else {
                // logs lang id not present
            }

        } else {
            // logs config key not present
        }

        return $response;
    }

    private function isExists($key, array $array)
    {
        if (isset($array[$key]) && ! empty($array[$key])) {
            return true;
        }
    }

    /**
     * @param $emailData
     * @param $content
     * @return null|string
     */
    private function prepareEmailLayout($emailData, $content)
    {
        $messageContent = null;
        $file = null;
        // file validator
        $layoutPathValidator = new Exists();
        // check layout first in vendor directory
        if ($layoutPathValidator->isValid(__DIR__ . '/../../../' . $emailData['mgdprc_email_conf_layout'])) {
            $file = __DIR__ . '/../../../' . $emailData['mgdprc_email_conf_layout'];
        }
        // if no file in vendor directory then check in module root directory
        if (!$file) {
            if ($layoutPathValidator->isValid($_SERVER['DOCUMENT_ROOT'] . '/../module/' . $emailData['mgdprc_email_conf_layout'])) {
                $file = $_SERVER['DOCUMENT_ROOT'] . '/../module/' . $emailData['mgdprc_email_conf_layout'];
            }
        }
        // check file extenstion
        if ($file) {
            $layoutExtValidator = new Extension('phtml');
            if ($layoutExtValidator->isValid($file)) {
                $messageContent = $this->createEmailViewTemplate($file, $emailData, $content);
            }
        }

        return $messageContent;
    }

    private function print($data)
    {
        echo "<pre>";
        print_r($data);
        echo "</pre>";
    }
}