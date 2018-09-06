/**
 * Created by conta on 2/23/2018.
 **/

var body    = $("body"),
    deleteAll = body.find('#dashboard-plugin-delete-all');

// Binding elements
body.on("click", "#dashboard-plugin-delete-all", function() {
    console.log('delete all widget.');

    melisDashBoardDragnDrop.deleteAllWidget($(this));
});

body.on("click", ".dashboard-plugin-delete", function() {
    melisDashBoardDragnDrop.deleteWidget($(this));
});

body.on("click", ".dashboard-plugin-refresh", function() {
    melisDashBoardDragnDrop.refreshWidget($(this));
});

var melisDashBoardDragnDrop = {
        
    currentPlugin: null,

    melisWidgetHandle: '.melis-core-dashboard-plugin-snippets',
    
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.gsSetOptions(this.melisWidgetHandle);
        
        this.dragWidget(this.melisWidgetHandle);
        this.docuReady();
        this.dropWidget(this.melisWidgetHandle);
        this.dragStopWidget(this.melisWidgetHandle);
        this.resizeStopWidget(this.melisWidgetHandle);
        //this.deleteAllWidget();
    },

    cacheDom: function() {
        // jQuery DOM element
        this.$body              = $("body");
        this.$document          = $(document);
        this.$gs                = $(".grid-stack");
        this.$tabPane           = this.$body.find('.tab-pane');
        this.$pluginBox         = $(".melis-core-dashboard-dnd-box");
        this.$delWidget         = $(".dashboard-plugin-delete");
        this.$refWidget         = $(".dashboard-plugin-refresh");

        // strings
        this.gsOptHandle        = ".grid-stack-item-content .widget-head:first"; // draggable handle selector
    },

    gsSetOptions: function(widget) {
        var options = {
            cellHeight: 80,
            verticalMargin: 20,
            animate: true,
            acceptWidgets: widget,
            draggable: {
                scroll: true
            },
            handle: this.gsOptHandle
        };

        this.$gs.gridstack(options);
    },

    dragWidget: function(widget) {
        // set up draggable element / this.melisWidgetHandle
        $(widget).draggable({
            helper: 'clone',
            revert: 'valid',
            /*revert: true,*/
            appendTo: 'body',

            drag: function(event, ui) {
                var grid        = $('#'+activeTabId+' .tab-pane .grid-stack');
                var gridPH      = $('#'+activeTabId+' .tab-pane .grid-stack .grid-stack-placeholder');

                gridPH.attr('data-gs-width', 6);
                gridPH.attr('data-gs-height', 3);

            }
        });
    },

    bindEvents: function() {
        this.$document.ready(this.docuReady.bind(this));
    },

    docuReady: function() {
        var self = this;

        if( this.$gs ) {
            this.$gs.closest('.tab-pane').css('height', 'calc(100vh - 50px)');
            this.$gs.css({
                'min-height'    : '700px',
                'height'        : '100%',
                'width'         : '100%',
                'max-width'     : '100%'
            });
        } else {
            this.$tabPane.closest('.tab-pane').css('height', '100%');
            this.$gs.css({
                'min-height'    : '700px',
                'width'         : '100%'
            });
        }

        var $pluginDelAll = $("#dashboard-plugin-delete-all");

        if( $pluginDelAll.length == 0 ) {
            this.$body.find(".melis-dashboard-plugins").prepend("<button class='btn btn-primary btn-md' id='dashboard-plugin-delete-all'>Delete All</button>");
        }

        $pluginDelAll.css({
            'display'           : 'block',
            'margin-bottom'     : '2em'
        });

        /* end of elements from cacheDom */

        //self.deleteAllWidget( $pluginDelAll );
    },

    dropWidget: function(widget) {
        var self = this;

        var grid = $('#'+activeTabId+' .tab-pane .grid-stack');
        var active_grid = $('#'+activeTabId+' .tab-pane .grid-stack').data('gridstack');

        var gridDrop = active_grid.container.droppable({
            accept: widget,
            tolerance: 'pointer',

            drop: function(event, ui) {

                if($(ui.draggable).parent("body")) {
                    $(ui.draggable).remove();
                }
                
                setTimeout (function () {

                    var dataString  = new Array;

                    // create dashboard array
                    dataString.push({
                        name: 'dashboard_id',
                        value: activeTabId
                    });

                    // get plugin menu data
                    var pluginMenu = $(ui.helper[0]).find(".plugin-json-config").text();

                    // check plugin menu
                    if(pluginMenu) {

                        // parse to JSON
                        var pluginConfig = JSON.parse(pluginMenu);

                        $.each(pluginConfig, function(index, value){

                            // check and modify w h value 6
                            if(index == "width" && value == "") { value = 6 };
                            if(index == "height" && value == "") { value = 6 };

                            // push to dashboard array
                            dataString.push({
                                name: index,
                                value: value
                            });
                        });
                    }

                    self.addWidget(dataString);
                }, 300);
            },

            activate: function(event, ui) {

                grid.css('background-color', 'lightgoldenrodyellow');

            }

        });
    },

    addWidget: function(dataString) {
        var self = this;

        var $mcDashPlugSnippets = $("#"+activeTabId+" .tab-pane .grid-stack .melis-core-dashboard-plugin-snippets");
            $mcDashPlugSnippets.attr('data-gs-width', 6);
            $mcDashPlugSnippets.attr('data-gs-height', 3);

        var mcLoader            = "<div class='overlay-loader'><img class='loader-icon spinning-cog' src='/MelisCore/assets/images/cog12.svg' alt=''></div>";

        // hide plugin menu
        this.$pluginBox.removeClass("shown");

        // loading effect
        $mcDashPlugSnippets.html(mcLoader);

        var request = $.post( "/melis/MelisCore/DashboardPlugins/getPlugin", dataString);

        request.done(function(data){
            // get dashboard gridstack data
            var grid = $('#'+activeTabId+' .grid-stack').data('gridstack');

            // get placeholder data
            var gridData = $("#"+activeTabId+' .tab-pane .grid-stack .melis-core-dashboard-plugin-snippets').data();

            var html = $(data.html);

            // add widget to dashboard default size 6 x 6
            var widget = grid.addWidget(html, gridData.gsX, gridData.gsY, html.data("gsWidth"), html.data("gsHeight"));

            // remove clone widgets
            grid.removeWidget($(widget).prev());

            // serialize widget and save to db
            self.serializeWidgetMap( grid.container[0].children );
                    
            // Assigning current plugin
            self.setCurrentPlugin(widget);
            
            // Executing plugin JsCallback
            if(data.jsCallbacks.length) {
                $.each(data.jsCallbacks, function(index, value) {
                    eval(value);
                });
            }

        });
    },

    serializeWidgetMap: function(items) {
        var self = this;

        var dataString = new Array;

        // create dashboard array
        dataString.push({
            name: 'dashboard_id',
            value: activeTabId
        });

        $.each(items, function(key, value) {
            var dataTxt = $(value).find('.dashboard-plugin-json-config').text();

            // check dashboard data
            if(dataTxt) {

                // get dynamic dashboard value
                var itemData = $(value).data();

                var dashboardX = itemData._gridstack_node.x;
                var dashboardY = itemData._gridstack_node.y;
                var dashboardWidth = itemData._gridstack_node.width;
                var dashboardHeight = itemData._gridstack_node.height;

                // JSON parse dashboard txt
                var pluginConfig = JSON.parse(dataTxt);

                $.each(pluginConfig, function(index, value){

                    // here modify x y w h of the plugin
                    if(index == "x-axis") { value = dashboardX; }
                    if(index == "y-axis") { value = dashboardY; }
                    if(index == "width") { value = dashboardWidth; }
                    if(index == "height") { value = dashboardHeight; }

                    // push to dashboard array
                    dataString.push({
                        name: 'plugins['+pluginConfig["plugin"]+']['+pluginConfig["plugin_id"]+']['+index+']',
                        value: value
                    });
                });
            }

        });

        // save widgets to db
        self.saveDBWidgets(dataString);

        //console.log('delete all serializeWidgetMap: ', dataString);
    },

    saveDBWidgets: function(dataString) {
        // save the lists of widgets on the dashboard to db
        var saveDashboardLists = $.post("/melis/MelisCore/DashboardPlugins/saveDashboardPlugins", dataString);
    },

    dragStopWidget: function(widget) {
        var self = this;

        // grid stack widget drag and stop position
        this.$gs.on('dragstop', function(event, ui) {
            var $this = $(this);

            // update position / size of the widget
            self.updateWidgetPosSize($this);
            self.dropWidget(widget);
        });
    },

    resizeStopWidget: function(widget) {
        var self = this;

        // grid stack stop widget resize
        this.$gs.on('gsresizestop', function(event, ui) {
            var $this   = $(this);
          
            // update position / size of widget
            self.updateWidgetPosSize($this);

            self.dropWidget(widget);
        });
    },

    updateWidgetPosSize: function(gs) {
        var self         = this;

        // jQuery element
        var $grid        = $('#' + activeTabId ).find(gs);
        var $gs_grid     = $('#' + activeTabId ).find('.grid-stack'),
            $gsiUiDrag   = $grid.find('.grid-stack-item.ui-draggable.ui-resizable'),
            gsi          = $grid.find('.grid-stack-item.ui-draggable.ui-resizable'),
            items        = [],
            posChanged   = false,
            sizeChanged  = false;

        $gsiUiDrag.each( function() {
            // refer to gsiUiDrag
            var $this    = $(this),
                node     = $this.data('_gridstack_node');

            items.push({
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                content: $this.data()
            });

            if( node.x != node._beforeDragX || node.y != node._beforeDragY ) {
                posChanged = true;
            }
        });

        /*$gsiUiDrag.each(function() {
            // refer to gsiUiDrag
            var $this    = $(this),
                node     = $this.data('_gridstack_node');

            console.log( 'node: ', node );

            items.push({
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                content: $this.data()
            });

            if( node.x != node._beforeDragX || node.y != node._beforeDragY ) {
                posChanged = true;
            }
        });*/

        /*var updatedWidgets = {};
        for (var i = 0; i < items.length; i++) {
            var widget = items[i].el;
            console.log(widget.data('gs-x') != items[i].x || widget.data('gs-y') != items[i].y);
        }*/

        /*var udpatedWidgets = {};
        for ( var i = 0; i < items.length; i++ ) {
            var widget = items[i].el;

            console.log( 'items[i]: ', items[i] );
            console.log( 'items[i].el: ', items[i].content._gridstack_node.el );
            console.log( 'items[i].width: ', items[i].width );
        }*/

        //var itemsChildren = $(items[0].content._gridstack_node._grid.container[0].children);

        if( posChanged ) {
            //console.log('items: ', items);
            // serialize widget
            self.serializeWidgetMap( $(items[0].content._gridstack_node._grid.container[0].children) );
        }

        //console.log('delete all updateWidgetPosSize: ', $(items[0].content._gridstack_node._grid.container[0].children) );
    },

    deleteWidget: function(el) {
        var self        = this;

        var $del        = el;
        var grid        = $('#'+activeTabId+' .grid-stack').data('gridstack');
        var nodeItem    = grid.container[0].children;
        var gs          = $('#' + activeTabId ).find('.grid-stack');
     
        melisCoreTool.confirm(
            translations.tr_meliscore_common_yes,
            translations.tr_meliscore_common_no,
            translations.tr_melis_core_remove_dashboard_plugin,
            translations.tr_melis_core_remove_dashboard_plugin_msg,
            function() {
                grid.removeWidget($del.closest('.grid-stack-item'));
              
                self.updateWidgetPosSize(gs);
            }
        );
    },

    deleteAllWidget: function(el) {
        var self        = this;

        var body        = $("body"),
            btnDel      = body.find(el),
            grid        = $('#'+activeTabId+' .grid-stack').data('gridstack'),
            nodeItem    = grid.container[0].children,
            gs          = $('#' + activeTabId ).find('.grid-stack');

        var dataString = new Array;

        // create dashboard array
        dataString.push({
            name: 'dashboard_id',
            value: activeTabId
        });

        melisCoreTool.confirm(
            translations.tr_meliscore_common_yes,
            translations.tr_meliscore_common_no,
            translations.tr_melis_core_remove_dashboard_plugin,
            translations.tr_melis_core_remove_dashboard_plugin_msg,
            function() {
                grid.removeAll();
              
                self.saveDBWidgets(dataString);
            }
        );
    },

    refreshWidget: function(el) {
        var dataString = new Array;
        // create dashboard array
        dataString.push({
            name: 'dashboard_id',
            value: activeTabId
        });
        var dashboardItem = $(el).closest('.grid-stack-item');
        var dataTxt = $(dashboardItem).find('.dashboard-plugin-json-config').text();
        var dashboardData =  dashboardItem.data('_gridstack_node');

        // check dataTxt
        if(dataTxt) {
            var pluginConfig = JSON.parse(dataTxt);
            $.each(pluginConfig, function(index, value){
                // here modify x y w h of the plugin
                if(index == "x-axis") { value = dashboardData.x }
                if(index == "y-axis") { value = dashboardData.y }
                if(index == "width") { value = dashboardData.width }
                if(index == "height") { value = dashboardData.height }

                // push to dashboard array
                dataString.push({
                    name: index,
                    value: value
                });
            });

            var request = $.post( "/melis/MelisCore/DashboardPlugins/getPlugin", dataString);

            // loading effect
            dashboardItem.append("<div class='overlay-loader'><img class='loader-icon spinning-cog' src='/MelisCore/assets/images/cog12.svg' alt=''></div>");

            request.done(function(data){
                
                // get dashboard gridstack data
                var grid = $('#'+activeTabId+' .grid-stack').data('gridstack');

                // remove loader
                $(dashboardItem).find('.overlay-loader').remove();
                grid.removeWidget($(dashboardItem));
                var html = $(data.html);

                // add widget to dashboard default size 6 x 6
                var widget = grid.addWidget(html, dashboardData.x, dashboardData.y, dashboardData.width, dashboardData.height);
                
                // Assigning current plugin
                melisDashBoardDragnDrop.setCurrentPlugin(widget);
                
                // Executing plugin JsCallback
                if(data.jsCallbacks.length) {
                    $.each(data.jsCallbacks, function(index, value) {
                        eval(value);
                    });
                }
            });
            // end of part of addWidget
        }
    },

    setCurrentPlugin: function(widget){
        // set current plugin
        this.currentPlugin = widget
    },
    
    getCurrentPlugin: function(){
        // get current plugin
        return this.currentPlugin
    }
};

$(function(){
    // init
    melisDashBoardDragnDrop.init();
});