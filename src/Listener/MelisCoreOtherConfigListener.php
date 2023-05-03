<?php 

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 *
 */

namespace MelisCore\Listener;

use Laminas\EventManager\EventManagerInterface;
use Laminas\EventManager\ListenerAggregateInterface;
use MelisCore\Listener\MelisGeneralListener;

/**
 * This listener is executed when page publication is asked.
 *
 */
class MelisCoreOtherConfigListener extends MelisGeneralListener implements ListenerAggregateInterface
{
    public function attach(EventManagerInterface $events, $priority = 1)
    {
        $this->attachEventListener(
            $events,
        	'MelisCore',
        	'meliscore_save_other_config', 
        	function($event){
                $params = $event->getParams();
                $passwordSettingsService =  $event->getTarget()->getEvent()->getApplication()->getServiceManager()->get('MelisPasswordSettingsService');
		        $result = $passwordSettingsService->saveItem($params);

                return $result;
        	},
        );
    }
}