<?php 

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2015 Melis Technology (http://www.melistechnology.com)
 *
 */

namespace MelisCore\Model\Tables;

use Laminas\Db\TableGateway\TableGateway;

class MelisBOEmailsTable extends MelisGenericTable
{
    /**
     * Model table
     */
    const TABLE = 'melis_core_bo_emails';

    /**
     * Table primary key
     */
    const PRIMARY_KEY = 'boe_id';

    public function __construct()
    {
        $this->idField = self::PRIMARY_KEY;
    }
}