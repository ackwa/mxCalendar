<?php

if (!$modx->user->isAuthenticated('mgr')) return $modx->error->failure($modx->lexicon('permission_denied'));

$query = $modx->getOption('query',$scriptProperties,'');
$eventid = $modx->getOption('eventid',$scriptProperties,'');

$modx->log(xPDO::LOG_LEVEL_ERROR, print_r($scriptProperties, true));

/* build query */
$c = $modx->newQuery('mxCalendarTag');
$query->innerJoin('mxCalendarEvenTags','EventTags');

$c->select(array(
	'mxCalendarTag.id',
	'mxCalendarTag.name'
));

$c->where(array(
	//'mxCalendarTag.name:LIKE' => '%'.$query.'%',
    'EventTags.event_id' => $eventid
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



