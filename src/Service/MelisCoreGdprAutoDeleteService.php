<?php
namespace MelisCore\Service;

use MelisCore\Model\Tables\MelisGdprDeleteConfigTable;
use MelisCore\Model\Tables\MelisGdprDeleteEmailsLogsTable;
use MelisCore\Model\Tables\MelisLangTable;
use MelisCore\Service\MelisCoreGeneralService;
use Zend\EventManager\ResponseCollection;
use Zend\Http\PhpEnvironment\Response as HttpResponse;

class MelisCoreGdprAutoDeleteService extends MelisCoreGeneralService
{
    /**
     * @var MelisGdprDeleteConfigTable
     */
    protected $gdprAutoDeleteConfigTable;
    /**
     * @var MelisGdprDeleteEmailsLogsTable
     */
    protected $gdprAutoDeleteEmailsLogsTable;

    /**
     * MelisCoreGdprAutoDeleteService constructor.
     * @param MelisGdprDeleteConfigTable $gdprAutoDeleteConfigTable
     * @param MelisGdprDeleteEmailsLogsTable $gdprAutoDeleteEmailsLogsTable
     */
    public function __construct(MelisGdprDeleteConfigTable $gdprAutoDeleteConfigTable, MelisGdprDeleteEmailsLogsTable $gdprAutoDeleteEmailsLogsTable)
    {
        $this->gdprAutoDeleteConfigTable     = $gdprAutoDeleteConfigTable;
        $this->gdprAutoDeleteEmailsLogsTable = $gdprAutoDeleteEmailsLogsTable;
    }

    /**
     * @param $searchValue
     * @param $searchableCols
     * @param $selColOrder
     * @param $orderDirection
     * @param $start
     * @param $length
     * @param int $sitId
     * @param null $module
     * @return mixed
     */
    public function getGdprDeleteConfigData($searchValue,$searchableCols, $selColOrder, $orderDirection , $start ,$length, $sitId = 0, $module = null )
    {
        // Event parameters prepare
        $arrayParameters = $this->makeArrayFromParameters(__METHOD__, func_get_args());
        // Sending service start event
        $arrayParameters = $this->sendEvent('melis_core_gdpr_auto_delete_get_gdrp_delete_config_data_start', $arrayParameters);
        // get the updated value of a variable
        foreach ($arrayParameters as $var => $val) {
            $$var = $val;
        }
        // Adding results to parameters for events treatment if needed
        $arrayParameters['results'] = $this->gdprAutoDeleteConfigTable->getGdprDeleteConfigData($searchValue,$searchableCols,$selColOrder, $orderDirection, $start, $length, $sitId , $module)->toArray();
        // Sending service end event
        $arrayParameters = $this->sendEvent('melis_core_gdpr_auto_delete_get_gdrp_delete_config_data_end', $arrayParameters);

        return $arrayParameters['results'];
    }
    /**
     *
     * get gdpr delete config data
     *
     * @param $searchValue
     * @param $searchableCols
     * @param $selColOrder
     * @param $orderDirection
     * @param $start
     * @param $length
     * @return mixed
     */
    public function getGdprDeleteEmailLogsData($searchValue,$searchableCols, $selColOrder, $orderDirection , $start ,$length )
    {
        // Event parameters prepare
        $arrayParameters = $this->makeArrayFromParameters(__METHOD__, func_get_args());
        // Sending service start event
        $arrayParameters = $this->sendEvent('melis_core_gdpr_auto_delete_get_gdrp_delete_email_logs_data_start', $arrayParameters);
        // get the updated value of a variable
        foreach ($arrayParameters as $var => $val) {
            $$var = $val;
        }
        // Adding results to parameters for events treatment if needed
        $arrayParameters['results'] = $this->gdprAutoDeleteEmailsLogsTable->getGdprDeleteEmailsLogsData($searchValue,$searchableCols,$selColOrder, $orderDirection, $start, $length)->toArray();
        // Sending service end event
        $arrayParameters = $this->sendEvent('melis_core_gdpr_auto_delete_get_gdrp_delete_email_logs_data_end', $arrayParameters);

        return $arrayParameters['results'];
    }

    /**
     * @return MelisLangTable
     */
    public function getMelisCoreLang()
    {
        /** @var MelisLangTable $melisCoreLangTbl */
        $melisCoreLangTbl = $this->getServiceLocator()->get('MelisCoreTableLang');

        return $melisCoreLangTbl->fetchAll()->toArray();
    }

    /**
     * get the list of modules
     *
     * @return array
     */
    public function getAutoDeleteModulesList()
    {
        // trigger event to get list of modules
        $list = $this->getEventManager()->trigger('melis_core_gdpr_auto_delete_modules_list');
        $moduleList = [];
        // get the returned data from each module listener
        for ($list->rewind();$list->valid();$list->next()) {
            // check if current data is not empty
            if (!empty($list->current())) {
                // get the lists
                foreach ($list->current()['modules_list'] as $moduleName => $moduleOptions) {
                    $moduleList[$moduleName] = $moduleOptions['name'] ?? $moduleName;
                }
            }
        };


        return $moduleList;
    }
}