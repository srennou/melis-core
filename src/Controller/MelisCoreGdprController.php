<?php
namespace MelisCore\Controller;

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 *
 */

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Zend\Form\Factory;
use MelisCore\Service\MelisCoreGeneralService;
use Zend\Http\PhpEnvironment\Response as HttpResponse;

class MelisCoreGdprController extends AbstractActionController
{
    /**
     * This will get the data from the service which will get
     * user info from modules that listens to the event.
     * @return JsonModel
     */
    public function checkFormAction()
    {
        $request = $this->getRequest();
        $success = 0;
        $errors = [];

        if ($request->isPost()) {
            $formInputs = $this->getTool('meliscore', 'melis_core_gdpr_tool')->sanitizeRecursive(get_object_vars($request->getPost()), [], true);
            $formConfig = $this->getFormConfig('meliscore/tools/melis_core_gdpr_tool/forms/melis_core_gdpr_search_form', 'melis_core_gdpr_search_form');
            $form = $this->getForm($formConfig);
            $form->setData($formInputs);

            if ($form->isValid()) {
                $success = 1;
            }
            else {
                $errors = $this->getFormErrors($form->getMessages(), $formConfig);
                $success = 0;
            }
        }

        return new JsonModel ([
            'success' =>  $success,
            'errors' => $errors,
        ]);
    }

    /**
     * This will generate an xml file from the data based on the ids
     * @return HttpResponse
     */
    public function melisCoreGdprExtractSelectedAction()
    {
        $idsToBeExtracted = $this->params()->fromQuery();

        $melisCoreGdprService = $this->getServiceLocator()->get('MelisCoreGdprService');
        $xml = $melisCoreGdprService->extractSelected($idsToBeExtracted);

        $name = "melisplatformgdpr.xml";
        $response = $this->downloadXml($name, $xml);

        return $response;
    }


    /**
     * This will delete the data based on the selected ids
     * @return JsonModel
     */
    public function melisCoreGdprDeleteSelectedAction()
    {
        $request = $this->getRequest();
        $success = 0;

        if ($request->isPost()) {
            $idsToBeDeleted = get_object_vars($request->getPost());

            $melisCoreGdprService = $this->getServiceLocator()->get('MelisCoreGdprService');
            $finalData = $melisCoreGdprService->deleteSelected($idsToBeDeleted);
            $success = 1;

            foreach ($finalData as $key => $value) {
                if (!$value) {
                    $success = 0;
                }
            }
        }

        return new JsonModel ([
            'success' =>  $success,
        ]);
    }

    /**
     * Container for the Gdpr page
     * which will call all interface
     * or zones inside of it which are
     * header and content
     * @return view model
     */
    public function renderMelisCoreGdprContainerAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        $view = new ViewModel();
        $view->melisKey = $melisKey;

        return $view;
    }

    /**
     * Header for the Gdpr page
     * displays the title and the
     * description of the page
     * @return view model
     */
    public function renderMelisCoreGdprHeaderAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        $view = new ViewModel();
        $view->melisKey = $melisKey;

        return $view;
    }

    /**
     * Content of the Gdpr page
     * which will call all the interfaces
     * under it. which are search form
     * and tabs
     * @return ViewModel
     */
    public function renderMelisCoreGdprContentAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        $view = new ViewModel();
        $view->melisKey = $melisKey;

        return $view;
    }

    /**
     * Search form of the Gdpr page
     * which will be used for the
     * searching of user data
     * @return view model
     */
    public function renderMelisCoreGdprSearchFormAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');

        $form = $this->getTool('meliscore', 'melis_core_gdpr_tool')->getForm('melis_core_gdpr_search_form');

        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->form = $form;

        return $view;
    }

    /**
     * The tabs that will show the records of user in every module
     * @return view model
     */
    public function renderMelisCoreGdprTabsAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $show = $this->params()->fromQuery('show', false);
        $formData = $this->params()->fromQuery('formData', []);

        if (!empty($formData)) {
            $finalData = [];

            foreach ($formData as $input) {
                $finalData[$input['name']] = $input['value'];
            }
            $melisCoreGdprService = $this->getServiceLocator()->get('MelisCoreGdprService');
            $modulesData = $melisCoreGdprService->getUserInfo($finalData);
        }


        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->show = $show;
        if (isset($modulesData['results']) && !empty($modulesData['results'])) {
            $view->modules = $modulesData['results'];
        }

        return $view;
    }


    /**
     * Gets the tool
     * @param plugin key
     * @param tool key
     * @return array|object
     */
    private function getTool($pluginKey, $toolKey)
    {
        $tool = $this->getServiceLocator()->get('MelisCoreTool');
        $tool->setMelisToolKey($pluginKey, $toolKey);

        return $tool;
    }

    /**
     * Gets the form
     * @param formConfig
     * @return \Zend\Form\ElementInterface
     */
    private function getForm($formConfig)
    {
        $factory = new \Zend\Form\Factory();
        $formElements = $this->serviceLocator->get('FormElementManager');
        $factory->setFormElementManager($formElements);
        $form = $factory->createForm($formConfig);

        return $form;
    }

    /**
     * This will get the form config
     * @param $formPath
     * @param $form
     * @return mixed
     */
    private function getFormConfig($formPath, $form)
    {
        $melisCoreConfig = $this->getServiceLocator()->get('MelisCoreConfig');
        $appConfigForm = $melisCoreConfig->getFormMergedAndOrdered($formPath, $form);

        return $appConfigForm;
    }

    /**
     * This will download the xml as a file
     * @param file name
     * @param xml
     * @return HttpResponse
     */
    private function downloadXml($fileName, $xml)
    {
        $response = new HttpResponse();

        $headers  = $response->getHeaders();
        $headers->addHeaderLine('Content-Type', 'text/xml; charset=utf-8');
        $headers->addHeaderLine('Content-Disposition', "attachment; filename=\"".$fileName."\"");
        $headers->addHeaderLine('Accept-Ranges', 'bytes');
        $headers->addHeaderLine('Content-Length', strlen($xml));
        $headers->addHeaderLine('fileName', $fileName);
        $response->setContent($xml);

        return $response;
    }

    /**
     * This will get the errors of the form
     * @param $errors
     * @param $formConfig
     * @return mixed
     */
    private function getFormErrors($errors, $formConfig)
    {
        foreach ($errors as $errorKey => $errorValue) {
            foreach ($formConfig['elements'] as $elementKey => $elementValue) {
                if ($elementValue['spec']['name'] == $errorKey && !empty($elementValue['spec']['options']['label'])) {
                    $errors[$elementValue['spec']['options']['label']] = reset($errorValue);
                    unset($errors[$errorKey]);
                }
            }
        }

        return $errors;
    }
}