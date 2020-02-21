<?php

namespace MelisCore\Service\Factory;

use MelisCore\Model\Tables\MelisGdprDeleteConfigTable;
use MelisCore\Service\MelisCoreGdprAutoDeleteService;
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\ServiceManager\FactoryInterface;

class MelisCoreGdprAutoDeleteServiceFactory implements FactoryInterface{

    /**
     * @param ServiceLocatorInterface $sl
     * @return MelisCoreGdprAutoDeleteService
     */
    public function createService(ServiceLocatorInterface $sl)
    {
        /** @var MelisGdprDeleteConfigTable $gdprDeleteConfigTbl */
        $gdprDeleteConfigTbl = $sl->get('MelisGdprDeleteConfigTable');
        $gdprDeleteEmailsLogTbl = $sl->get('MelisGdprDeleteEmailsLogsTable');
        /*
        * inject melis gdpr delete config table
        * inject melis gdpr delete emails logs table
        */
        $melisCoreGdprService = new MelisCoreGdprAutoDeleteService($gdprDeleteConfigTbl,$gdprDeleteEmailsLogTbl);
        // set service locator
        $melisCoreGdprService->setServiceLocator($sl);

        return $melisCoreGdprService;
    }
}