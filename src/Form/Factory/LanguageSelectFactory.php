<?php

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 *
 */

namespace MelisCore\Form\Factory;

use Zend\ServiceManager\ServiceLocatorInterface;
use MelisCore\Form\Factory\MelisSelectFactory;

/**
 * This class creates a select box for melis languages
 *
 */
class LanguageSelectFactory extends MelisSelectFactory
{
	protected function loadValueOptions(ServiceLocatorInterface $formElementManager)
	{
		$serviceManager = $formElementManager->getServiceLocator();

		$tableLang = $serviceManager->get('MelisEngineTableCmsLang');
		$languages = $tableLang->fetchAll();
		
		$valueoptions = array();
		$max = $languages->count();
		for ($i = 0; $i < $max; $i++)
		{
			$tpl = $languages->current();
			$valueoptions[$tpl->lang_cms_id] = $tpl->lang_cms_name;
			$languages->next();
		}
		
		return $valueoptions;
	}

}