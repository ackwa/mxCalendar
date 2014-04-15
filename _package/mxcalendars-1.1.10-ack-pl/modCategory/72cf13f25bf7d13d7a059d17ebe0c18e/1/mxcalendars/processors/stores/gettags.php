<?php

if (!$modx->user->isAuthenticated('mgr')) return $modx->error->failure($modx->lexicon('permission_denied'));

$query = $modx->getOption('query',$scriptProperties,'');


$modx->log(xPDO::LOG_LEVEL_ERROR, print_r($scriptProperties, true));

/* build query */
$c = $modx->newQuery('mxCalendarTag');


$c->select(array(
	'mxCalendarTag.id',
	'mxCalendarTag.name'
));

$c->where(array(
	//'mxCalendarTag.name:LIKE' => '%'.$query.'%',
    'AND:id:IN' => explode('|', $query)
));

$c->sortby('name','ASC');

$c->prepare();
$modx->log(xPDO::LOG_LEVEL_ERROR, $c->toSQL());
$tags = $modx->getCollection('mxCalendarTag', $c);

/* iterate */
$list = array();
foreach ($tags as $mxc) {
    $list[] = $mxc->toArray();
}
return $this->outputArray($list,sizeof($list));



