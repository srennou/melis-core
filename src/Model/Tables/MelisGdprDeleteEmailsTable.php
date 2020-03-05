<?php
namespace MelisCore\Model\Tables;

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2020 Melis Technology (http://www.melistechnology.com)
 *
 */

use Zend\Db\Sql\Where;
use Zend\Db\TableGateway\TableGateway;

class MelisGdprDeleteEmailsTable extends MelisGenericTable
{
    /**
     * saved warning email type
     */
    const EMAIL_WARNING = "1";
    /**
     * saved deleted email type
     */
    const EMAIL_DELETED = "2";

    /**
     * MelisGdprDeleteConfigTable constructor.
     * @param TableGateway $tableGateway
     */
	public function __construct(TableGateway $tableGateway)
	{
		parent::__construct($tableGateway);
		$this->idField = 'mgdpre_id';
	}

}
