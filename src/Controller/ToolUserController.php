<?php

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 *
 */

namespace MelisCore\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Zend\Stdlib\ArrayUtils;
use Zend\Session\Container;
use MelisCore\Service\MelisCoreRightsService;
/**
 * User Management Tool
 */
class ToolUserController extends AbstractActionController
{
    const TOOL_USER_MGMT_CONFIG_KEY = 'meliscore/tools/meliscore_tool_user';
    const TOOL_KEY = 'meliscore_tool_user';

    /**
     * Renders the main container of the tool
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserAction()
    {
        $translator = $this->getServiceLocator()->get('translator');
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $noAccessPrompt = 'tr_meliscore_no_access_to_tool';
        $hasAccess = $this->hasAccess($this::TOOL_KEY);

        if(!$hasAccess) {
            $noAccessPrompt = $translator->translate('tr_tool_no_access');
        }

        $melisKey = $this->params()->fromRoute('melisKey', '');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $view = new ViewModel();
        $view->title = $melisTool->getTitle();
        $view->melisKey = $melisKey;
        $view->hasAccess = $hasAccess;


        return $view;
    }

    /**
     * Renders the header section of the tool
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserHeaderAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $zoneConfig = $this->params()->fromRoute('zoneconfig', array());
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);


        $view = new ViewModel();
        $view->title = $melisTool->getTitle();
        $view->melisKey = $melisKey;

        return $view;
    }
    public function renderToolUserContentFiltersExportAction()
    {
        return new ViewModel();
    }

    /**
     * Renders to the refresh button placed in the datatable
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserContentFiltersRefreshAction()
    {
        return new ViewModel();
    }

    /**
     * Renders to the search input placed in the datatable
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserContentFiltersSearchAction()
    {
        return new ViewModel();
    }

    /**
     * Renders to the limit selection  placed in the datatable
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserContentFiltersLimitAction()
    {
        return new ViewModel();
    }

    public function renderToolUserActionNewUserAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        $view = new ViewModel();
        $view->melisKey = $melisKey;

        return $view;
    }

    /**
     * Renders the content of the tool
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserContentAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $melisTranslation = $this->getServiceLocator()->get('MelisCoreTranslation');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $translator = $this->getServiceLocator()->get('translator');
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $moduleSvc       =  $this->getServiceLocator()->get('ModulesService');
        $modules         = $moduleSvc->getAllModules();

        $request = $this->getRequest();
        $uri     = $request->getUri();
        $domain = isset($get['domain']) ? $get['domain'] : null;
        $scheme = isset($get['scheme']) ? $get['scheme'] : null;

        $columns = $melisTool->getColumns();
        // add action column
        $columns['actions'] = array('text' => $translator->translate('tr_meliscore_global_action'), 'css' => 'width:10%');

        $netStatus = $melisTool->isConnected();


        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->tableColumns = $columns;
        $view->getToolDataTableConfig = $melisTool->getDataTableConfiguration();

        $melisTool->setMelisToolKey('meliscore', 'user_view_date_connection_tool');
        $view->getToolDataTableConfigForDateConnection = $melisTool->getDataTableConfiguration('#tableUserViewDateConnection', null, null, array('order' => '[[ 0, "desc" ]]'));
        $view->modules = serialize($modules);

        $view->scheme  = $scheme;
        $view->domain  = $domain;
        $view->netStatus  = $netStatus;

        return $view;
    }

    /**
     * Renders to the Edit button inside the table content (Action column)
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserContentActionEditAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        $view = new ViewModel();
        $view->melisKey = $melisKey;

        return $view;
    }

    /**
     * Renders to the Delete button inside the table content (Action column)
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserContentActionDeleteAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        $view = new ViewModel();
        $view->melisKey = $melisKey;

        return $view;
    }

    /**
     * Renders as the modal container of the tool
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserModalContainerAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->emptyModal = $melisTool->getModal('meliscore_tool_user_empty_modal');

        return $view;
    }


    /**
     * Renders to the empty modal (no need to create a modal handler for this in app.interface)
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserModalEmptyAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        $view = new ViewModel();
        $view->melisKey = $melisKey;

        return $view;
    }

    /**
     * Handles the rights if Add Modal Content should be displayed for the user
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserModalHandlerNewAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->newUserModal = $melisTool->getModal('meliscore_tool_user_new_modal');

        return $view;
    }

    /**
     * Renders to the New Form content for the modal
     * @return \Zend\View\Model\ViewModel
     */
    public function renderTooluserModalNewAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);


        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->setVariable('meliscore_tool_user_form_new', $melisTool->getForm('meliscore_tool_user_form_new'));

        return $view;
    }

    /**
     * Handles the rights if Edit Content should be displayed for the user
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserModalHandlerEditAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->editModal = $melisTool->getModal('meliscore_tool_user_edit_modal');

        return $view;
    }


    /**
     * Renders to the Edit Form content for the modal
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserModalEditAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);


        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->setVariable('meliscore_tool_user_form_edit', $melisTool->getForm('meliscore_tool_user_form_edit'));

        return $view;
    }


    /**
     * Handles the rights if Edit Content should be displayed for the user
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserModalHandlerRightsAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->rightsModal = $melisTool->getModal('meliscore_tool_user_rights_modal');

        return $view;
    }

    /**
     * Handles the rights if New User Content should be displayed for the user
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserModalHandlerNewRightsAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->newRightsModal = $melisTool->getModal('meliscore_tool_user_new_rights_modal');

        return $view;
    }


    /**
     * Renders to the Edit Rights Form content for the modal
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserModalRightsAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');


        $view = new ViewModel();
        $view->melisKey = $melisKey;

        return $view;
    }

    /**
     * Renders to the New Rights Form content for the modal
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolUserModalNewRightsAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');


        $view = new ViewModel();
        $view->melisKey = $melisKey;

        return $view;
    }

    public function renderTooluserViewDateConnectionModalHandlerAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->userConnectionDateModal = $melisTool->getModal('meliscore_tool_user_view_date_connection_modal');

        return $view;
    }

    public function renderTooluserViewDateConnectionModalAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $melisTranslation = $this->getServiceLocator()->get('MelisCoreTranslation');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $translator = $this->getServiceLocator()->get('translator');
        $melisTool->setMelisToolKey('meliscore', 'user_view_date_connection_tool');

        $columns = $melisTool->getColumns();


        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->tableColumns = $columns;


        return $view;
    }


    /**
     * Checks whether the user has access to this tools or not
     * @param $key
     * @return bool
     */
    private function hasAccess($key): bool
    {
        $hasAccess = $this->getServiceLocator()->get('MelisCoreRights')->canAccess($key);

        return $hasAccess;
    }

    /**
     * --------- TOOL EVENT HANDLERS ---------------
     **/

    /**
     * Adds a new user to the database
     * @return \Zend\View\Model\JsonModel
     */
    public function addNewUserAction()
    {
        $container = new Container('meliscore');
        $translator = $this->getServiceLocator()->get('translator');

        $response = array();
        $this->getEventManager()->trigger('meliscore_tooluser_savenew_start', $this, $response);


        $melisMelisCoreConfig = $this->serviceLocator->get('MelisCoreConfig');
        $appConfigForm = $melisMelisCoreConfig->getItem('meliscore/tools/meliscore_tool_user/forms/meliscore_tool_user_form_new');
        $appConfigForm = $appConfigForm['elements'];

        $success = 0;
        $errors = array();
        $datas = array();
        $textTitle = 'tr_meliscore_tool_user';
        $textMessage = '';

        if(!empty($container['action-tool-user-tmp']))
        {
            if (!empty($container['action-tool-user-tmp']['success']))
                $success = $container['action-tool-user-tmp']['success'];

            if (!empty($container['action-tool-user-tmp']['errors']))
                $errors = $container['action-tool-user-tmp']['errors'];

            if (!empty($container['action-tool-user-tmp']['datas']))
                $datas = $container['action-tool-user-tmp']['datas'];

        }

        unset($container['action-tool-user-tmp']);
        unset($container['action-tool-user-setrights-tmp']);

        foreach ($errors as $keyError => $valueError)
        {
            foreach ($appConfigForm as $keyForm => $valueForm)
            {
                if ($valueForm['spec']['name'] == $keyError &&
                    !empty($valueForm['spec']['options']['label']))
                    $errors[$keyError]['label'] = $valueForm['spec']['options']['label'];
            }
        }

        if($success == 0)
        {
            $textMessage = 'tr_meliscore_tool_user_new_fail_info';
        }
        else
        {
            $textMessage = 'tr_meliscore_tool_user_new_success_info';
        }

        $userId = null;
        if (!empty($datas['usr_id']))
        {
            $userId = $datas['usr_id'];
            unset($datas['usr_id']);
        }

        $response = array(
            'success' => $success,
            'textTitle' => $textTitle,
            'textMessage' => $textMessage,
            'errors' => $errors,
            'datas' => $datas
        );

        $this->getEventManager()->trigger('meliscore_tooluser_savenew_end', $this, array_merge($response, array('typeCode' => 'CORE_USER_ADD', 'itemId' => $userId)));

        unset($response['datas']);

        return new JsonModel($response);
    }

    public function addNewUserInfoAction()
    {
        $data = array();
        $imageFile = '';
        $userData = array();
        $success = false;
        $errors = array();
        $textTitle = 'tr_meliscore_tool_user Add New User';
        $textMessage = '';

        $response = array();
        $this->getEventManager()->trigger('meliscore_tooluser_savenew_info_start', $this, $response);

        // translator
        $translator = $this->getServiceLocator()->get('translator');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $userAddForm = $melisTool->getForm('meliscore_tool_user_form_new');

        $userTable = $this->getServiceLocator()->get('MelisCoreTableUser');

        $imgService = $this->getServiceLocator()->get('MelisCoreImage');

        $melisCoreAuth = $this->serviceLocator->get('MelisCoreAuth');

        if($this->getRequest()->isPost())
        {
            $postValues = get_object_vars($this->getRequest()->getPost());
            $postValues = $melisTool->sanitizePost($postValues);
            $userAddForm->setData($postValues);

            $userLogin = $this->getRequest()->getPost('usr_login');
            $password  = $this->getRequest()->getPost('usr_password');
            $confirmPass = $this->getRequest()->getPost('usr_confirm_password');
            $language  = (int) $this->getRequest()->getPost('usr_lang_id');
            $roleId    = (int) $this->getRequest()->getPost('usr_role_id');


            if($userAddForm->isValid())
            {
                // check if the user exists
                $userDatas = $userTable->getEntryByField('usr_login', $userLogin);
                $userDatas = $userDatas->current();
                if(!empty($userDatas->usr_login))
                {
                    $success = false;
                    $textMessage = 'tr_meliscore_tool_user_new_fail_user_exists';
                    $errors= array(
                        'usr_login' => array(
                            'user_exists' => $translator->translate($textMessage)
                        ),
                    );
                }
                elseif(empty($language))
                {
                    $success = false;
                    $textMessage = 'tr_meliscore_tool_user_update_fail_info';
                    $errors = array(
                        'usr_lang_id' => array(
                            'invalidLanguageSelection' => $translator->translate('tr_meliscore_tool_user_usr_lang_id_error_invalid'),
                        ),
                    );
                }
                else
                {
                    if($password == $confirmPass)
                    {
                        $imageContent = null;
                        // create tmp folder if not exists
                        $dirName = $_SERVER['DOCUMENT_ROOT'].'/media/';
                        if(!file_exists($dirName) && is_writable($dirName)) {
                            $oldmask = umask(0);
                            mkdir($dirName, 0777,  true);
                        }

                        if(file_exists($dirName)) {
                            $imageFile = $this->params()->fromFiles('usr_image');
                            $tempImg = !empty($imageFile['tmp_name']) ? $imgService->createThumbnail($dirName,$imageFile['name'],$imageFile['tmp_name']) : null;
                            $imageContent = !empty($imageFile['tmp_name']) ? file_get_contents($dirName.'tmb_'.$imageFile['name']) : null;

                            // delete tmp image
                            if(!empty($imageFile['tmp_name'])) {
                                unlink($dirName.'tmb_'.$imageFile['name']);
                            }
                        }

                        $data = $userAddForm->getData();
                        // remove confirm pass when adding
                        unset($data['usr_confirm_password']);

                        $data['usr_id'] = null;
                        $data['usr_password'] = $melisCoreAuth->encryptPassword($data['usr_password']);
                        $data['usr_admin'] = ($data['usr_admin']) ? 1 : 0;
                        $data['usr_image'] = $imageContent;
                        $data['usr_creation_date'] = date('Y-m-d H:i:s');
                        $data['usr_last_login_date'] = null;


                        if($roleId == 0 || $roleId == 1)
                        {
                            $data['usr_role_id'] = 1;
                            $container = new Container('meliscore');
                            if (!empty($container['action-tool-user-setrights-tmp']))
                            {
                                $newXmlRights = '<?xml version="1.0" encoding="UTF-8"?><document type="MelisUserRights" author="MelisTechnology" version="2.0">';
                                foreach ($container['action-tool-user-setrights-tmp'] as $xmlrights)
                                    $newXmlRights .= $xmlrights;

                                $newXmlRights .= '</document>';

                                $data['usr_rights'] = $newXmlRights;
                            }
                        }
                        else
                        {
                            $data['usr_role_id'] = $roleId;
                            $rolesTable = $this->getServiceLocator()->get('MelisUserRole');
                            $roleData = $rolesTable->getEntryById($roleId);
                            $roleData = $roleData->current();
                            $data['usr_rights'] = null;
                        }

                        $melisEmailBO = $this->getServiceLocator()->get('MelisCoreBOEmailService');

                        // Tags to be replace at email content with the corresponding value
                        $tags = array(
                            'NAME' => $data['usr_firstname'].' '.$data['usr_lastname'],
                            'EMAIL' => $data['usr_email'],
                            'LOGIN' => $data['usr_login'],
                            'PASSWORD' => $password
                        );

                        $name_to = $tags['NAME'];
                        $email_to = $tags['EMAIL'];
                        $langId = $language;

                        $melisEmailBO->sendBoEmailByCode('ACCOUNTCREATION',  $tags, $email_to, $name_to, $langId);

                        $data['usr_id'] = $userTable->save($data);
                        $textMessage = 'tr_meliscore_tool_user_new_success_info';
                        $success = true;
                    }
                    else
                    {
                        $success = false;
                        $textMessage = 'tr_meliscore_tool_user_new_fail_pass';
                        $errors= array(
                            'usr_password' => array(
                                'user_exists' => $translator->translate($textMessage)
                            ),
                        );
                    }
                }
            }
            else
            {
                $success = false;
                $errors = $userAddForm->getMessages();
                $textMessage = 'tr_meliscore_tool_user_new_fail_info';
            }
        }

        $response = array(
            'success' => $success,
            'errors' => array($errors),
            'datas' => $data
        );
        $this->getEventManager()->trigger('meliscore_tooluser_savenew_info_end', $this, $response);

        return new JsonModel($response);

    }
    /**
     * Handles the Delete User event
     * @return \Zend\View\Model\JsonModel
     */
    public function deleteUserAction()
    {

        $response = array();
        $this->getEventManager()->trigger('meliscore_tooluser_delete_start', $this, $response);
        $translator = $this->getServiceLocator()->get('translator');
        $id = null;
        $success = 0;
        $textTitle = 'tr_meliscore_tool_user_delete';
        $textMessage = 'tr_meliscore_tool_user_delete_unable';
        $userTable = $this->getServiceLocator()->get('MelisCoreTableUser');

        if($this->getRequest()->isPost())
        {
            $id = $this->getRequest()->getPost('id');

            if(is_numeric($id))
            {
                $userTable->deleteById($id);
                $success = 1;
                $textMessage = 'tr_meliscore_tool_user_delete_success';
            }
        }

        $response = array(
            'textTitle' => $textTitle,
            'textMessage' => $textMessage,
            'success' => $success
        );
        $this->getEventManager()->trigger('meliscore_tooluser_delete_end', $this, array_merge($response, array('typeCode' => 'CORE_USER_DELETE', 'itemId' => $id)));

        return new JsonModel($response);
    }

    public function getUserByIdAction()
    {
        $id = 0;
        $success = false;
        $userTable = $this->getServiceLocator()->get('MelisCoreTableUser');
        $data = array();
        $container = new Container('meliscore');
        $locale = $container['melis-lang-locale'];
        $melisTranslation = $this->getServiceLocator()->get('MelisCoreTranslation');
        $userSvc = $this->getServiceLocator()->get('MelisCoreUser');
        $translation = $this->getServiceLocator()->get('translator');

        if($this->getRequest()->isPost())
        {
            $id = (int) $this->getRequest()->getPost('id');

            if(is_numeric($id))
            {
                $_defaultProfile = '/MelisCore/images/profile/default_picture.jpg';
                foreach($userTable->getEntryById($id) as $userVal)
                {
                    $connectionTime = $userSvc->getUserSessionTime( (int) $userVal->usr_id, $userVal->usr_last_login_date) == '-' ?
                        strftime($melisTranslation->getDateFormatByLocate($locale), strtotime($userVal->usr_last_login_date)) :
                        $userSvc->getUserSessionTime( (int) $userVal->usr_id, $userVal->usr_last_login_date);

                    $connectionTime = $connectionTime ? $translation->translate('tr_meliscore_date_for') . $connectionTime : null;

                    $image = !empty($userVal->usr_image) ? 'data:image/jpeg;base64,'. base64_encode($userVal->usr_image) : $_defaultProfile;
                    $data['usr_id'] = $userVal->usr_id;
                    $data['usr_login'] = $userVal->usr_login;
                    $data['usr_email'] = $userVal->usr_email;
                    $data['usr_firstname'] = $userVal->usr_firstname;
                    $data['usr_lastname'] = $userVal->usr_lastname;
                    $data['usr_lang_id'] = $userVal->usr_lang_id;
                    $data['usr_admin'] = $userVal->usr_admin;
                    $data['usr_image'] = $image;
                    $data['usr_status'] = $userVal->usr_status;
                    $data['usr_last_login_date'] = is_null($userVal->usr_last_login_date) ? '-' : strftime($melisTranslation->getDateFormatByLocate($locale), strtotime($userVal->usr_last_login_date))  . ' ' . $connectionTime;
                    $data['usr_role_id'] = $userVal->usr_role_id;
                }

                $success = true;
            }
        }

        return new JsonModel(array(
            'success' => $success,
            'user' => $data
        ));
    }

    /**
     * Returns the User's Info by its User ID
     * @return \Zend\View\Model\JsonModel
     */
    public function getUserAction()
    {
        $userTable = $this->getServiceLocator()->get('MelisCoreTableUser');
        $translator = $this->getServiceLocator()->get('translator');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);
        $melisTranslation = $this->getServiceLocator()->get('MelisCoreTranslation');

        $container = new Container('meliscore');
        $locale = $container['melis-lang-locale'];

        $colId = array();
        $dataCount = 0;
        $draw = 0;
        $tableData = array();

        if($this->getRequest()->isPost())
        {
            $melisCoreAuth = $this->serviceLocator->get('MelisCoreAuth');
            $user = $melisCoreAuth->hasIdentity() ? $melisCoreAuth->getIdentity() : null;

            $colId = array_keys($melisTool->getColumns());

            $sortOrder = $this->getRequest()->getPost('order');
            $sortOrder = $sortOrder[0]['dir'];

            $selCol = $this->getRequest()->getPost('order');
            $selCol = $colId[$selCol[0]['column']];

            $draw = $this->getRequest()->getPost('draw');

            $start = $this->getRequest()->getPost('start');
            $length =  $this->getRequest()->getPost('length');

            $search = $this->getRequest()->getPost('search');
            $search = $search['value'];

            $dataCount = $userTable->getTotalData();

            $getData = $userTable->getPagedData(array(
                'where' => array(
                    'key' => 'usr_id',
                    'value' => $search,
                ),
                'order' => array(
                    'key' => $selCol,
                    'dir' => $sortOrder,
                ),
                'start' => $start,
                'limit' => $length,
                'columns' => $melisTool->getSearchableColumns(),
                'date_filter' => array(),
            ));

            // store fetched data for data modification (if needed)
            $tableData = $getData->toArray();

            $defaultProfile = '/MelisCore/images/profile/default_picture.jpg';

            $this->recheckActiveUsers();
            // force the current user to be online if this URL is called.
            if($user){
                $userTable->save([
                    'usr_is_online' => 1
                ], $user->usr_id);
            }

            for($ctr = 0; $ctr < count($tableData); $ctr++)
            {
                $userId              = (int) $tableData[$ctr]['usr_id'];
                $online = (int) $tableData[$ctr]['usr_is_online'] ? 'text-success' : 'text-danger';
                
                $userConnectionTable = $this->getServiceLocator()->get('MelisUserConnectionDate');
                $userConnectionData  = $userConnectionTable->getUserLastConnectionTime($userId, null, array(), 'usrcd_last_connection_time')->current();
                
                if($userConnectionData && $online == 'text-success')
                {
                    $now                = new \DateTime(date("H:i:s"));
                    $lastConnectionTime = new \DateTime(date('H:i:s', strtotime($userConnectionData->usrcd_last_connection_time)));
                    $difference         = $lastConnectionTime->diff($now)->i;
    
                    // if user has been away for 5mins, automatically set the user status to "offline"
                    if((int) $difference > 5) {
                        // update user status
                        $userTable->save([
                            'usr_is_online' => 0
                        ], $userId);
                        
                        $online = 'text-danger';
                    }
                    else {
                        $userTable->save([
                            'usr_is_online' => 1
                        ], $userId);
                        
                        $online = 'text-success';
                    }
                }

                // process image first before applying text limits
                $image = !empty($tableData[$ctr]['usr_image']) ? 'data:image/jpeg;base64,'. base64_encode($tableData[$ctr]['usr_image']) : $defaultProfile;
                $status = (int) $tableData[$ctr]['usr_status'] != 1 ? 'text-danger' : 'text-success';

                // manual data manipulation
                $tableData[$ctr]['DT_RowId'] = $userId;
                if($tableData[$ctr]['usr_login'] == $user->usr_login) {
                    $tableData[$ctr]['DT_RowClass'] = "clsCurrent";
                }
                $tableData[$ctr]['usr_image'] = $image;
                $tableData[$ctr]['usr_firstname'] = $tableData[$ctr]['usr_firstname'] . ' ' . $tableData[$ctr]['usr_lastname'];
                $tableData[$ctr]['usr_status'] = '<span class="'.$status.'"><i class="fa fa-fw fa-circle"></i></span>';
                $tableData[$ctr]['usr_is_online'] = '<span class="'.$online.'"><i class="fa fa-fw fa-circle"></i></span>';
                $tableData[$ctr]['usr_image'] = '<img src="'.$image . '" width="24" height="24" alt="profile image" title="Profile picture of '.$tableData[$ctr]['usr_firstname'].'"/>';
                $tableData[$ctr]['usr_last_login_date'] = ($tableData[$ctr]['usr_last_login_date']) ? strftime($melisTranslation->getDateFormatByLocate($locale), strtotime($tableData[$ctr]['usr_last_login_date'])) : '';
                $tableData[$ctr]['usr_email'] = $melisTool->limitedText($tableData[$ctr]['usr_email'], 35);
                // remove critical details
                unset($tableData[$ctr]['usr_password']);
                unset($tableData[$ctr]['usr_rights']);
                unset($tableData[$ctr]['usr_role_id']);
            }
        }

        return new JsonModel(array(
            'draw' => (int) $draw,
            'recordsTotal' => $dataCount,
            'recordsFiltered' =>  $userTable->getTotalFiltered(),
            'data' => $tableData,
        ));

    }

    private function recheckActiveUsers()
    {
        $userTable = $this->getServiceLocator()->get('MelisCoreTableUser');
        $users     = $userTable->fetchAll();
        $userConnectionTable = $this->getServiceLocator()->get('MelisUserConnectionDate');

        foreach($users as $idx => $user) {

            $userConnectionData = $userConnectionTable->getUserLastConnectionTime($user->usr_id)->current();

            if(!empty($userConnectionData)) {

                $now                = new \DateTime(date("Y-m-d H:i:s"));
                $lastConnectionTime = new \DateTime($userConnectionData->usrcd_last_connection_time);
                $difference         = $lastConnectionTime->diff($now);

                // get the total minutes
                $days         = (int) $difference->d * 24 * 60;
                $hours        = (int) $difference->h * 60;
                $minutes      = (int) $difference->i;
                $totalMinutes = $days + $hours + $minutes;

                if($totalMinutes > 5) {
                    // set user to offline
                    $userTable->save([
                        'usr_is_online' => 0
                    ], $userConnectionData->usrcd_usr_login);
                }

            }
            else {
                $userTable->save([
                    'usr_is_online' => 0
                ], $user->usr_id);
            }

        }

    }

    public function getUserDataAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $melisTranslation = $this->getServiceLocator()->get('MelisCoreTranslation');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $translator = $this->getServiceLocator()->get('translator');
        $melisTool->setMelisToolKey('meliscore', 'user_view_date_connection_tool');

        if($request->isPost()) {

            $post    = get_object_vars($request->getPost());

            $columns = array_keys($melisTool->getColumns());

            $data              = $userTbl->getUserConnectionData($userId, null, $searchValue, $searchableCols, $selColOrder, $orderDirection, $start, $length)->toArray();
            $dataCount         = $userTbl->getTotalData();
            $dataFilteredCount = $userTbl->getTotalFiltered();
            $tableData         = $data;

            for($ctr = 0; $ctr < count($tableData); $ctr++) {
                // apply text limits

            }
        }

        $response = [
            'draw' => $draw,
            'data' => $tableData,
            'recordsFiltered' => $dataFilteredCount,
            'recordsTotal' => $dataCount
        ];

        return new JsonModel($response);
    }

    /**
     * Handles the event of updating user's information
     */
    public function updateUserInfoAction()
    {
        $response = array();
        $this->getEventManager()->trigger('meliscore_tooluser_save_info_start', $this, $response);

        $data = array();
        $imageFile = '';
        $userData = array();
        $success = false;
        $errors = array();
        $datas = array();
        $textTitle = 'tr_meliscore_tool_user';
        $textMessage = '';
        $userInfo = array();
        // translator
        $translator = $this->getServiceLocator()->get('translator');

        // declare the Tool service that we will be using to completely create our tool.
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');

        // tell the Tool what configuration in the app.tool.php that will be used.
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $userUpdateForm = $melisTool->getForm('meliscore_tool_user_form_edit');

        $userTable = $this->getServiceLocator()->get('MelisCoreTableUser');

        $imgService = $this->getServiceLocator()->get('MelisCoreImage');
        $melisCoreAuth = $this->getServiceLocator()->get('MelisCoreAuth');

        // xml rights temp holder
        $newXmlRights = '';

        if($this->getRequest()->isPost())
        {


            $postValues = get_object_vars($this->getRequest()->getPost());
            $postValues = $melisTool->sanitizePost($postValues);

            $postValues = $this->getRequest()->getPost();

            $userUpdateForm->setData($postValues);

            // get the user id for sql wildcard
            $userId = $this->getRequest()->getPost('usr_id');
            $password  = $this->getRequest()->getPost('usr_password');
            $confirmPass = $this->getRequest()->getPost('usr_confirm_password');
            $roleId    = (int) $this->getRequest()->getPost('usr_role_id');

            if($userUpdateForm->isValid())
            {
                // pass values that should not be changed
                foreach($userTable->getEntryById($userId) as $user)
                {
                    $userInfo = array(
                        'usr_login' => $user->usr_login,
                        'usr_password' => $user->usr_password,
                        'usr_lang_id' => $user->usr_lang_id,
                        'usr_rights' => $user->usr_rights,
                        'usr_creation_date' => $user->usr_creation_date,
                        'usr_last_login_date' => $user->usr_last_login_date,
                        'usr_image' => $user->usr_image,
                        'usr_role_id' => $user->usr_role_id
                    );

                }
                $data = $userUpdateForm->getData();

                $imageContent = null;

                // create tmp folder if not exists
                $dirName = $_SERVER['DOCUMENT_ROOT'].'/media/';
                if(!file_exists($dirName) && is_writable($dirName)) {
                    $oldmask = umask(0);
                    mkdir($dirName, 0777, true);
                }

                if(file_exists($dirName)) {
                    // process image, convert image content into mysql BLOB || image validation needed (file size & file type)
                    $imageFile = $this->params()->fromFiles('usr_image');
                    $tempImg = !empty($imageFile['tmp_name']) ? $imgService->createThumbnail($dirName,$imageFile['name'],$imageFile['tmp_name']) : null;
                    $imageContent = !empty($imageFile['tmp_name']) ? file_get_contents($dirName.'tmb_'.$imageFile['name']) : $userInfo['usr_image'];


                    // delete tmp image
                    if(!empty($imageFile['tmp_name'])) {
                        unlink($dirName.'tmb_'.$imageFile['name']);
                    }
                }


                $data['usr_image'] = $imageContent;
                $newPass = '';
                // check if the user exists
                if ($userInfo)
                {
                    if(!empty($password) || !empty($confirmPass))
                    {
                        if(strlen($password) >= 8) {
                            if(strlen($confirmPass) >= 8) {
                                $passValidator = new \MelisCore\Validator\MelisPasswordValidator();
                                if($passValidator->isValid($password))
                                {

                                    // password and confirm password matching
                                    if($password == $confirmPass)
                                    {
                                        $melisEmailBO = $this->getServiceLocator()->get('MelisCoreBOEmailService');

                                        // Fetching user language Id
                                        $userTable = $this->getServiceLocator()->get('MelisCoreTableUser');
                                        $userDataResult = $userTable->getEntryById($userId);
                                        $userDatas = $userDataResult->current();

                                        // Tags to be replace at email content with the corresponding value
                                        $tags = array(
                                            'NAME' => $userDatas->usr_firstname.' '.$userDatas->usr_lastname,
                                            'PASSWORD' => $password,
                                        );

                                        $email_to = $userDatas->usr_email;
                                        $name_to = $userDatas->usr_login;
                                        $langId = $userDatas->usr_lang_id;

                                        $melisEmailBO->sendBoEmailByCode('PASSWORDMODIFICATION',  $tags, $email_to, $name_to, $langId);

                                        $newPass = $melisCoreAuth->encryptPassword($password);
                                        $success = true;
                                    }
                                    else
                                    {
                                        $success = false;
                                        $textMessage = 'tr_meliscore_tool_user_update_fail_info';
                                        $errors = array(
                                            'usr_password' => array(
                                                'invalidPassword' => $translator->translate('tr_meliscore_tool_user_usr_password_not_match'),
                                                'label' => 'Password',
                                            ),
                                            'usr_confirm_password' => array(
                                                'invalidPassword' => $translator->translate('tr_meliscore_tool_user_usr_password_not_match'),
                                                'label' => 'Password',
                                            ),
                                        );
                                    } // password and confirm password matching
                                }
                                else {
                                    $errors = array(
                                        'usr_password' => array(
                                            'invalidPassword' => $translator->translate('tr_meliscore_tool_user_usr_password_regex_not_match'),
                                            'label' => 'Password',
                                        )
                                    );
                                } // password regex validator
                            }
                            else {
                                $errors = array(
                                    'usr_confirm_password' => array(
                                        'invalidPassword' => $translator->translate('tr_meliscore_tool_user_usr_confirm_password_error_low'),
                                        'label' => 'Password',
                                    )
                                );
                            }// end confirm password length
                        }
                        else {
                            $errors = array(
                                'usr_password' => array(
                                    'invalidPassword' => $translator->translate('tr_meliscore_tool_user_usr_password_error_low'),
                                    'label' => 'Password',
                                )
                            );
                        }// end password length
                    }
                    else {

                        // update without touching the password
                        $success = true;
                    } // password and confirm password not empty


                    if($success) {

                        $savedPassword = !empty($newPass) ? $newPass : $userInfo['usr_password'];
                        // remove confirm pass when updating
                        unset($data['usr_confirm_password']);

                        $data['usr_login'] = $userInfo['usr_login'];
                        $data['usr_password'] = $savedPassword;
                        // $data['usr_lang_id'] = $userInfo['usr_lang_id'];
                        $data['usr_admin'] = ($data['usr_admin']) ? 1 : 0;
                        $data['usr_rights'] = $userInfo['usr_rights'];
                        $data['usr_creation_date'] = $userInfo['usr_creation_date'];
                        $data['usr_last_login_date'] = $userInfo['usr_last_login_date'];
                        $data['usr_role_id'] = $userInfo['usr_role_id'];

                        if ($roleId == 0 || $roleId == 1) {
                            $data['usr_role_id'] = 1;
                            $container = new Container('meliscore');
                            if (!empty($container['action-tool-user-setrights-tmp']))
                            {
                                $newXmlRights = '<?xml version="1.0" encoding="UTF-8"?><document type="MelisUserRights" author="MelisTechnology" version="2.0">';
                                foreach ($container['action-tool-user-setrights-tmp'] as $xmlrights)
                                    $newXmlRights .= $xmlrights;

                                $newXmlRights .= '</document>';

                                $data['usr_rights'] = $newXmlRights;
                            }
                        } else {
                            $data['usr_role_id'] = $roleId;
                            $rolesTable = $this->getServiceLocator()->get('MelisUserRole');
                            $roleData = $rolesTable->getEntryById($roleId);
                            $roleData = $roleData->current();
                            $newXmlRights = $roleData->urole_rights;
                            $data['usr_rights'] = $roleData->urole_rights;
                        }

                        $userTable->save($data, $userId);
                        // check if you are updating your own info
                        $userSession = $melisCoreAuth->getStorage()->read();
                        if ($data['usr_login'] == $userSession->usr_login) {

                            // update session data
                            $userSession->usr_status = $data['usr_status'];
                            $userSession->usr_email = $data['usr_email'];
                            $userSession->usr_firstname = $data['usr_firstname'];
                            $userSession->usr_lastname = $data['usr_lastname'];
                            $userSession->usr_lang_id = $data['usr_lang_id'];
                            $userSession->usr_role_id = $data['usr_role_id'];
                            $userSession->usr_rights = $newXmlRights;
                            $userSession->usr_image = $data['usr_image'];
                            $userSession->usr_password = $savedPassword;

                            $datas = array(
                                'isMyInfo' => 1,
                                'loadProfile' => 'data:image/jpeg;base64,'. base64_encode($userSession->usr_image),
                            );

                        }
                        // free up memory
                        unset($data);
                        $textMessage = 'tr_meliscore_tool_user_update_success_info';
                    }

                }
            }
            else
            {
                $success = false;
                $errors = $userUpdateForm->getMessages();
                $textMessage = 'tr_meliscore_tool_user_update_fail_info';
            }
        }

        $response = array(
            'success' => $success,
            'errors' => array($errors),
            'datas' => $datas
        );
        $this->getEventManager()->trigger('meliscore_tooluser_save_info_end', $this, $response);

        return new JsonModel($response);
    }


    public function exportToCsvAction()
    {
        $userTable = $this->getServiceLocator()->get('MelisCoreTableUser');
        $translator = $this->getServiceLocator()->get('translator');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('meliscore', $this::TOOL_KEY);

        $searched = $this->getRequest()->getQuery('filter');
        $columns  = $melisTool->getSearchableColumns();

        $data = $userTable->getDataForExport($searched, $columns);
        $userData = array();
        $userData = $data->toArray();

        // modify values of rights and profile when exporting
        for($x = 0; $x < count($userData); $x++) {
            $userData[$x]['usr_rights'] = '';
            $userData[$x]['usr_image'] = '';
        }

        return $melisTool->exportDataToCsv($userData);
    }


    public function updateUserAction()
    {
        $response = array();
        $this->getEventManager()->trigger('meliscore_tooluser_save_start', $this, $response);

        $container = new Container('meliscore');
        $translator = $this->getServiceLocator()->get('translator');

        $melisMelisCoreConfig = $this->serviceLocator->get('MelisCoreConfig');
        $appConfigForm = $melisMelisCoreConfig->getItem('meliscore/tools/meliscore_tool_user/forms/meliscore_tool_user_form_edit');
        $appConfigForm = $appConfigForm['elements'];

        $success = 0;
        $errors = array();
        $datas = array();
        $textTitle = 'tr_meliscore_tool_user';
        $textMessage = '';

        if(!empty($container['action-tool-user-tmp']))
        {
            if (!empty($container['action-tool-user-tmp']['success']))
                $success = $container['action-tool-user-tmp']['success'];

            if (!empty($container['action-tool-user-tmp']['errors']))
                $errors = $container['action-tool-user-tmp']['errors'];

            if (!empty($container['action-tool-user-tmp']['datas']))
                $datas = $container['action-tool-user-tmp']['datas'];

        }

        foreach ($errors as $keyError => $valueError)
        {
            foreach ($appConfigForm as $keyForm => $valueForm)
            {
                if ($valueForm['spec']['name'] == $keyError &&
                    !empty($valueForm['spec']['options']['label']))
                    $errors[$keyError]['label'] = $valueForm['spec']['options']['label'];
            }
        }

        unset($container['action-tool-user-tmp']);
        unset($container['action-tool-user-setrights-tmp']);



        if($success == 0)
        {
            $textMessage = 'tr_meliscore_tool_user_update_fail_info';
        }
        else
        {
            $textMessage = 'tr_meliscore_tool_user_update_success_info';
        }

        $userId = null;
        $request = $this->getRequest();
        $postData = get_object_vars($request->getPost());
        if (!empty($postData['usr_id']))
        {
            $userId = $postData['usr_id'];
        }

        $response = array(
            'success' => $success,
            'textTitle' => $textTitle,
            'textMessage' => $textMessage,
            'errors' => $errors,
            'datas' => $datas
        );

        $this->getEventManager()->trigger('meliscore_tooluser_save_end', $this, array_merge($response, array('typeCode' => 'CORE_USER_UPDATE', 'itemId' => $userId)));

        return new JsonModel($response);
    }

    public function getRightsTreeViewAction()
    {
        $datas = array();

        $response = $datas;
        $this->getEventManager()->trigger('meliscore_tooluser_getrightstreeview_start', $this, $response);

        $container = new Container('meliscore');

        if(!empty($container['action-tool-user-getrights-tmp']))
            $datas = $container['action-tool-user-getrights-tmp'];

        unset($container['action-tool-user-getrights-tmp']);

        $response = $datas;
        $this->getEventManager()->trigger('meliscore_tooluser_getrightstreeview_end', $this, $response);

        return new JsonModel($response);
    }


    public function getUserConnectionDataAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $melisTranslation = $this->getServiceLocator()->get('MelisCoreTranslation');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $translator = $this->getServiceLocator()->get('translator');
        $melisTool->setMelisToolKey('meliscore', 'user_view_date_connection_tool');
        $userSvc = $this->getServiceLocator()->get('MelisCoreUser');
        $userTbl = $this->getServiceLocator()->get('MelisUserConnectionDate');
        $melisTranslation = $this->getServiceLocator()->get('MelisCoreTranslation');

        $container = new Container('meliscore');
        $locale = $container['melis-lang-locale'];

        $data = null;
        $request = $this->getRequest();
        $dataCount = 0;
        $dataFilteredCount = 0;
        $tableData = array();
        $draw = 0;

        if($request->isPost()) {

            $post    = get_object_vars($request->getPost());

            $columns = array_keys($melisTool->getColumns());

            $draw              = (int) $post['draw'];
            $selColOrder       = $columns[(int) $post['order'][0]['column']];
            $orderDirection    = isset($post ['order']['0']['dir']) ? strtoupper($post['order']['0']['dir']) : 'ASC';
            $searchValue       = isset($post['search']['value']) ? $post['search']['value'] : null;
            $searchableCols    = $melisTool->getSearchableColumns();
            $start             = (int) $post['start'];
            $length            = (int) $post['length'];
            $userId            = (int) $post['usr_id'];

            $data              = $userTbl->getUserConnectionData($userId, null, $searchValue, $searchableCols, $selColOrder, $orderDirection, $start, $length)->toArray();
            $dataCount         = $userTbl->getTotalData();
            $dataFilteredCount = $userTbl->getTotalFiltered();
            $tableData         = $data;

            for($ctr = 0; $ctr < count($tableData); $ctr++) {
                // apply text limits
                foreach($tableData[$ctr] as $vKey => $vValue) {
                    $tableData[$ctr][$vKey] = $melisTool->limitedText($vValue, 80);
                }

                $loginDate = strftime($melisTranslation->getDateFormatByLocate($locale), strtotime($tableData[$ctr]['usrcd_last_login_date']));
                $loginDate = explode(' ' , $loginDate)[0];

                $connectionTime = $userSvc->getUserSessionTime( (int) $tableData[$ctr]['usr_id'], $tableData[$ctr]['usrcd_last_login_date']) == '-' ? '0' :
                    $userSvc->getUserSessionTime( (int) $tableData[$ctr]['usr_id'], $tableData[$ctr]['usrcd_last_login_date'], false);


                $tableData[$ctr]['usrcd_id']                   = date('H:i:s', strtotime($tableData[$ctr]['usrcd_last_login_date']));
                $tableData[$ctr]['usrcd_usr_login']            = date('H:i:s', strtotime($tableData[$ctr]['usrcd_last_connection_time']));
                $tableData[$ctr]['usrcd_last_login_date']      = $loginDate;
                $tableData[$ctr]['usrcd_last_connection_time'] = $connectionTime;
                $tableData[$ctr]['DT_RowId']                   = $tableData[$ctr]['usrcd_id'];
            }
        }

        $response = [
            'draw' => $draw,
            'data' => $tableData,
            'recordsFiltered' => $dataFilteredCount,
            'recordsTotal' => $dataCount
        ];

        return new JsonModel($response);
    }

}
