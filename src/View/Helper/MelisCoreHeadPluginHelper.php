<?php

namespace MelisCore\View\Helper;

use Laminas\ServiceManager\ServiceManager;
use Laminas\View\Helper\AbstractHelper;
use MelisCore\Controller\ModulesController;
use MelisCore\Library\MelisAppConfig;

class MelisCoreHeadPluginHelper extends AbstractHelper
{
	public $serviceManager;

    public function setServiceManager(ServiceManager $serviceManager)
    {
        $this->serviceManager = $serviceManager;
    }

    public function __invoke($path = '/', $returnBundle = false)
	{
		$melisAppConfig = $this->serviceManager->get('MelisCoreConfig');
		
		$appsConfig = $melisAppConfig->getItem($path);
		if ($path != '/') {
	        $path = substr($path, 1, strlen($path));
	        $appsConfig = [$path => $appsConfig];
	    }
	    
		$jsFiles = [];
		$cssFiles = [];

		foreach ($appsConfig as $keyPlugin => $appConfig)
		{	
			$jsFiles = array_merge($jsFiles, $melisAppConfig->getItem("/$keyPlugin/ressources/js"));
			$cssFiles = array_merge($cssFiles, $melisAppConfig->getItem("/$keyPlugin/ressources/css"));
		}

        /**
         * if we return the bundled files or not
         */
        if($returnBundle) {
            /**
             * check if we are in login page
             */
            if ($path == 'meliscore_login') {
                /**
                 * check if bundle for login is available
                 */
                if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/'.ModulesController::BUNDLE_FOLDER_NAME.'/css/bundle-all-login.css')) {
                    $cssFiles = [];
                    $cssFiles[] = '/'.ModulesController::BUNDLE_FOLDER_NAME.'/css/bundle-all-login.css?v='.time();
                }

                if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/'.ModulesController::BUNDLE_FOLDER_NAME.'/js/bundle-all-login.js')) {
                    $jsFiles = [];
                    $jsFiles[] = '/'.ModulesController::BUNDLE_FOLDER_NAME.'/js/bundle-all-login.js?v='.time();
                }
            }
        }
		
		return [
            'js' => $jsFiles,
            'css' => $cssFiles
        ];
	}
}