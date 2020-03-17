<?php

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 *
 */

namespace MelisCore\Service\Factory;

use MelisCore\Service\MelisCoreCreatePasswordService;
use Laminas\ServiceManager\ServiceLocatorInterface;
use Laminas\ServiceManager\FactoryInterface;

class MelisCoreCreatePasswordServiceFactory implements FactoryInterface
{
	public function createService(ServiceLocatorInterface $sl)
	{
		$melisCoreCreatePass = new MelisCoreCreatePasswordService();
        $melisCoreCreatePass->setServiceLocator($sl);
		
		return $melisCoreCreatePass;
	}

}