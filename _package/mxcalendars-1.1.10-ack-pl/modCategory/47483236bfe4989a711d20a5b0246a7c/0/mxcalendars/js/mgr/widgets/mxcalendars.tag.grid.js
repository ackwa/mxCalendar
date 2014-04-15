mxcCore.grid.tag = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'mxc-tags-grid'
        ,url: mxcCore.config.connectorUrl
        ,baseParams: {
            action: 'mgr/tag/getList'
        }
        ,fields: ['id','name']
        ,paging: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,save_action: 'mgr/tag/updatefromgrid' // Support the inline editing
	    ,autosave: true // Support the inline editing
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
            ,width: 5
        },{
            header: _('mxcalendars.tag_name')
            ,dataIndex: 'name'
            ,sortable: true
            ,editor: { xtype: 'textfield' }
        }],tbar:[{
                xtype: 'textfield'
                ,id: 'mxcalendars-search-tags-filter'
                ,emptyText:_('mxcalendars.default_tag_search')
                ,listeners: {
                        'change': {fn:this.search,scope:this}
                        ,'render': {fn: function(cmp) {
                                new Ext.KeyMap(cmp.getEl(), {
                                        key: Ext.EventObject.ENTER
                                        ,fn: function() {
                                                this.fireEvent('change',this);
                                                this.blur();
                                                return true;
                                        }
                                        ,scope: cmp
                                });
                        },scope:this}
                }
        },'->',{
            xtype: 'mxc-combo-tag'
            ,listWidth: 300
            ,id: 'tag'
            ,emptyText: _('mxcalendars.tag_select')
            ,listeners: {
                /*change: {
                    fn: this.disableBtn
                    ,scope: this
                }
                ,*/select: {
                    fn: this.disableBtn
                    ,scope: this
                }
            }
        },{
            text: _('mxcalendars.tag_btn_create')
            ,id: 'add-tag-btn'
            ,disabled: true
            ,handler: function() {
                var entry = Ext.getCmp('tag')
                    ,g = Ext.getCmp('mxc-tags-grid')
                    ,s = g.getStore();
                if (entry && entry != '') {
                    var id = entry.getValue();
                    var name = entry.getRawValue();
                    // Check for duplicate entries
                    if (s.find('id', id) != -1) {
                        entry.markInvalid(_('mxcalendars.err_ae'));
                        MODx.msg.alert(
                            _('mxcalendars.err_ae')
                            ,_('mxcalendars.err_ae')
                        );
                        this.fieldClear(entry);
                        return false;
                    }
                    // Add to grid storea
                    var rec = new g.propRecord({
                        id: id
                        ,name: name
                    });
                    s.add(rec);
                    this.fieldClear(entry);
                }
            }
            ,scope :this
        }]
    });
    mxcCore.grid.tag.superclass.constructor.call(this,config)
};
Ext.extend(mxcCore.grid.tag,MODx.grid.Grid);
Ext.reg('mxc-tags-grid',mxcCore.grid.tag, {
    disableBtn: function() { // Disable the add button
        var addBtn = Ext.getCmp('add-tag-btn');
        addBtn.enable();
    }
    ,fieldClear: function(field) { // Clear the combo box values (raw & value)
        field.setValue('');
        field.setRawValue('');
        Ext.getCmp('add-tag-btn').disable();
    }
    ,getMenu: function() {
        return [{
            text: _('mxcalendars.remove')
            ,handler: this.removeEntry
        }];
    }
    ,removeEntry: function() {
        var rec = this.getSelectionModel().getSelected()
            ,s = this.getStore()
            ,idx = s.indexOf(rec)
            ,total = s.getCount()
            ,r ,x;

        for (x = idx; x < total; x++) {
            r = s.getAt(x);
            if (r) {
                r.commit();
            }
        }
        s.remove(rec);
    }
});

