<?php 

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 *
 */

namespace MelisCore\Listener;

use Laminas\EventManager\EventInterface;
use Laminas\EventManager\EventManagerInterface;

/**
 * Melis General Listener implements detach
 * so that other listener can extends this class and not
 * redefine those
 */
class MelisCoreGeneralListener 
{
    /**
     * @var \Laminas\Stdlib\CallbackHandler[]
     */
    protected $listeners = array();
    
	protected function getControllerAction($e)
	{
		$routeMatch = $e->getRouteMatch();
		$routeParams = $routeMatch->getParams();
		$controller = '';
		$action = '';
		
		if (!empty($routeParams['controller']))
			$controller = $routeParams['controller'];
		
		if (!empty($routeParams['action']))
			$action = $routeParams['action'];
		
		return array($controller, $action);
	}

    /**
     * Melis Logging actions
     *
     * @param EventInterface $event
     */
    public function logMessages(EventInterface $event)
    {
        $params = $event->getParams();
        $results = $event->getTarget()->forward()->dispatch(
            \MelisCore\Controller\MelisFlashMessengerController::class,
            array_merge(['action' => 'log'],
            $params)
        )->getVariables();
    }

    /**
     * Attach a listener to an event emitted by components with specific identifiers.
     *
     * @param  EventManagerInterface $events
     * @param  string $identifier Identifier for event emitting component
     * @param  string $eventName
     * @param  callable $listener Listener that will handle the event.
     * @param  int $priority Priority at which listener should execute
     *
     */
	public function attachEventListener(EventManagerInterface $events, $identifier, $eventName, callable $listiner,  $priority = 1)
    {
        $sharedEvents = $events->getSharedManager();

        if (empty($eventName))
            return;

        if (!is_callable($listiner))
            return;

        if (is_array($eventName)) {
            foreach ($eventName As $event)
                $this->listeners[] = $sharedEvents->attach($identifier, $event, $listiner, $priority);
        }else{
            $this->listeners[] = $sharedEvents->attach($identifier, $eventName, $listiner, $priority);
        }
    }

    public function detach(EventManagerInterface $events)
    {
        foreach ($this->listeners as $index => $listener) {
            if ($events->detach($listener)) {
                unset($this->listeners[$index]);
            }
        }
    }
}