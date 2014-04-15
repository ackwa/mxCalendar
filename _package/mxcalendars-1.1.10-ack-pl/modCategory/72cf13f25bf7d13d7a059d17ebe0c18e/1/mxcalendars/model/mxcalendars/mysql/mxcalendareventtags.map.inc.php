<?php
$xpdo_meta_map['mxCalendarEventTags']= array (
  'package' => 'mxcalendars',
  'version' => NULL,
  'table' => 'mxcalendars_events_tags',
  'extends' => 'xPDOObject',
  'fields' => 
  array (
    'event_id' => 0,
    'tag_id' => 0,
  ),
  'fieldMeta' => 
  array (
    'event_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'pk',
    ),
    'tag_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'pk',
    ),
  ),
  'indexes' => 
  array (
    'PRIMARY' => 
    array (
      'alias' => 'PRIMARY',
      'primary' => true,
      'unique' => true,
      'type' => 'BTREE',
      'columns' => 
      array (
        'event_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'tag_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  'aggregates' => 
  array (
    'Event' => 
    array (
      'class' => 'mxCalendarEvents',
      'local' => 'event_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
    'Tag' => 
    array (
      'class' => 'mxCalendarTag',
      'local' => 'tag_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
