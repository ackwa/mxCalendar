<?php
class mxCalendarEvents extends xPDOSimpleObject {

    /**
     * Wrapper method to add related objects (and remove previous ones)
     *
     * @param string $type The kind of related object the add : Tags
     * @param array $data Related objects data
     *
     * @return void
     */
    public function setRelations($type, $key_type, array $data){
        $this->xpdo->log(xPDO::LOG_LEVEL_ERROR, 'SET RELATION '. $type."/".$key_type);
        $this->xpdo->log(xPDO::LOG_LEVEL_ERROR, 'SET RELATION '. $this->get('id').'/');
        $this->xpdo->log(xPDO::LOG_LEVEL_ERROR, 'SET RELATION '.print_r($data, true));
        $this->removeRelations($type);

        foreach ($data as $tagid) {
            $this->xpdo->log(xPDO::LOG_LEVEL_ERROR, 'SET RELATION '. $this->get('id').'/'.$tagid);
            // check if object exist
            if ($type == 'mxCalendarEventTags') $relation = 'mxCalendarTag';
            $tag = $this->xpdo->getObject($relation, $tagid);
            if ($tag) {
                $objectData = array(
                    $key_type => $tagid,
                    'event_id' => $this->get('id'),
                );
                // Create new tag
                $object = $this->xpdo->newObject($type);
                $object->fromArray($objectData, '', true);
                $object->save();
            }
        }
        return;
    }

    /**
     * Wrapper method to remove related objects
     *
     * @param string $class Related object class
     *
     * @return void
     */
    protected function removeRelations($class = null, $id = null){
        if (!$class) {
            $this->xpdo->log(modX::LOG_LEVEL_ERROR, 'No class given for mxCalendars::removeRelations()'.$class);
            return;
        }

        $this->xpdo->log(xPDO::LOG_LEVEL_ERROR, 'REMOVE RELATION '.$class.'/'.$this->get('id'));
        $query = $this->xpdo->newQuery($class);
        $query->where(array(
            'event_id' => $this->get('id')
        ));
        $total = $this->xpdo->getCount($class, $query);
        $this->xpdo->log(xPDO::LOG_LEVEL_ERROR, 'REMOVE RELATION TOTAL'.$total);

        if ($total && $total > 0) {
            $collection = $this->xpdo->getIterator($class, $query);
            /** @var xPDOObject $object */
            foreach ($collection as $object) {
                $object->remove();
            }
        }
    }
}