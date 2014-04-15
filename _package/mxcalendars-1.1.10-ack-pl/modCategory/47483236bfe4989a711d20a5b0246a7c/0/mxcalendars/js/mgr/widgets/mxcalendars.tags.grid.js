Ext.USE_NATIVE_JSON = false;

mxcCore.grid.tags = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'mxcalendars-grid-tags'
        ,url: mxcCore.config.connectorUrl
        ,baseParams: { action: 'mgr/tag/getList' }
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
           text:_('mxcalendars.tag_btn_create')
           ,handler: { xtype: 'mxcalendars-window-tag-create' ,blankValues: true }
        }]
    });
    mxcCore.grid.tags.superclass.constructor.call(this,config)
};
Ext.extend(mxcCore.grid.tags,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,getMenu: function() {
		var m = [{
			text: _('mxcalendars.tag_menu_update')
			,handler: this.update
		},'-',{
			text: _('mxcalendars.tag_menu_remove')
			,handler: this.remove
		}];
		this.addContextMenuItem(m);
		return true;
	}
    ,update: function(btn,e) {
		if (!this.updateWindow) {
			this.updateWindow = MODx.load({
				xtype: 'mxcalendars-window-tag-update'
				,record: this.menu.record
				,listeners: {
					'success': {fn:this.refresh,scope:this}
				}
			});
		} else {
			this.updateWindow.setValues(this.menu.record);
		}
		this.updateWindow.show(e.target);
	}
    ,remove: function() {
		MODx.msg.confirm({
		    title: _('mxcalendars.tag_remove_title')
		    ,text: _('mxcalendars.tag_remove_confirm')
		    ,url: this.config.url
		    ,params: {
		        action: 'mgr/tag/remove'
		        ,id: this.menu.record.id
		    }
		    ,listeners: {
		        'success': {fn:this.refresh,scope:this}
		    }
		});
	}
});
Ext.reg('mxcalendars-grid-tags',mxcCore.grid.tags);


//---------------------------------------//
//-- Create the Update Feed Window --//
//---------------------------------------//
mxcCore.window.UpdateTag = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('mxcalendars.menu_update')
        ,url: mxcCore.config.connectorUrl
        ,width: 'auto'
        ,baseParams: {
            action: 'mgr/tag/update'
        }
        ,fields: [{xtype:'hidden',name:'id'},{
            xtype: 'textfield'
            ,fieldLabel:_('mxcalendars.label_name')
            ,name: 'name'
        }]
    });
    mxcCore.window.UpdateTag.superclass.constructor.call(this,config);
};
Ext.extend(mxcCore.window.UpdateTag,MODx.Window);
Ext.reg('mxcalendars-window-tag-update',mxcCore.window.UpdateTag);


//-------------------------------------------//
//-- Create the new Feed --//
//-------------------------------------------//
mxcCore.window.CreateTag = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('mxcalendars.tag_btn_create')
        ,url: mxcCore.config.connectorUrl
        ,width: 'auto'
        ,baseParams: {
            action: 'mgr/tag/create'
        }
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel:_('mxcalendars.label_name')
            ,name: 'name'
        }]
    });
    mxcCore.window.CreateTag.superclass.constructor.call(this,config);
};
Ext.extend(mxcCore.window.CreateTag,MODx.Window);
Ext.reg('mxcalendars-window-tag-create',mxcCore.window.CreateTag);
