<?php
$xpdo_meta_map['mxCalendarTag']= array (
  'package' => 'mxcalendars',
  'version' => NULL,
  'table' => 'mxcalendars_tag',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'name' => NULL,
  ),
  'fieldMeta' => 
  array (
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'index' => 'index',
    ),
  ),
  'composites' => 
  array (
    'Events' => 
    array (
      'class' => 'mxCalendarEventTags',
      'local' => 'id',
      'foreign' => 'tag_id',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
