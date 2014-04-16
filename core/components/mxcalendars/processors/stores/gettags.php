<?php

if (!$modx->user->isAuthenticated('mgr')) return $modx->error->failure($modx->lexicon('permission_denied'));

$query = $modx->getOption('query',$scriptProperties,'');

/* build query */
$c = $modx->newQuery('mxCalendarTag');
$c->select(array(
	'mxCalendarTag.id',
	'mxCalendarTag.name'
));

//$c->where(array(
//	'mxCalendarTag.name:LIKE' => '%'.$query.'%',
//    'id:IN' => explode('|', $query)
//));

$c->sortby('name','ASC');
$tags = $modx->getCollection('mxCalendarTag', $c);

/* iterate */
$list = array();
foreach ($tags as $mxc) {
    $list[] = $mxc->toArray();
}
return $this->outputArray($list,sizeof($list));



