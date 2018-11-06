<?php

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 *
 */

namespace MelisCore\Form\Factory;

use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorAwareInterface;
use MelisCore\Form\MelisForm;

class MelisFormFactory implements FactoryInterface
{
    public function createService(ServiceLocatorInterface $sl)
    {
        $form = new MelisForm();
        $form->setServiceLocator($sl);

        return $form;
    }
}
