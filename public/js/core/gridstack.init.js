/**
 * Created by conta on 2/23/2018
 * Edited by Junry @ June - Sept 2018
 **/

var $body = $("body");

// Binding elements
$body.on("click", "#dashboard-plugin-delete-all", function() {
    melisDashBoardDragnDrop.deleteAllWidget($(this));
});

$body.on("click", ".dashboard-plugin-delete", function() {
    melisDashBoardDragnDrop.deleteWidget($(this));
});

$body.on("click", ".dashboard-plugin-refresh", function() {
    melisDashBoardDragnDrop.refreshWidget($(this));
});

var melisDashBoardDragnDrop = {
      
    currentPlugin: null,

    melisWidgetHandle: '.melis-core-dashboard-plugin-snippets',
    
    init: function() {
        this.cacheDom();
        this.gsSetOptions();
        this.bindEvents();
        
        this.dragWidget();
        this.docuReady();

        this.dropWidget( this.melisWidgetHandle );
        this.dragStopWidget();
        this.resizeStopWidget();
    },

    cacheDom: function() {
        // jQuery DOM element
        this.$body              = $("body");
        this.$document          = $(document);
        this.$gs1               = this.$body.find("#grid-droppable");
        this.$gs2               = this.$body.find("#grid-draggable");
        this.$gs                = $(".grid-stack");
        this.$pluginBox         = this.$body.find(".melis-core-dashboard-dnd-box");
        this.$pluginBtn         = this.$body.find("#melisDashBoardPluginBtn");

        // strings
        this.gsOptHandle        = ".grid-stack-item-content .widget-head:first"; // draggable handle selector
    },

    gsSetOptions: function() {
        var options = {
            cellHeight: 90,
            verticalMargin: 20,
            animate: true,
            float: false,
            acceptWidgets: '.melis-core-dashboard-plugin-snippets', // .grid-stack-item
            draggable: {
                scroll: true
            },
            handle: this.gsOptHandle
        };

        this.$gs.gridstack(options);
        //$("#grid-draggable.grid-stack").gridstack(_.defaults({ acceptWidgets: false }), options);
    },

    dragWidget: function() {
        // set up draggable element / this.melisWidgetHandle / .grid-stack-item
        $(".melis-core-dashboard-plugin-filter-box .melis-core-dashboard-plugin-snippets").draggable({
            helper: 'clone',
            revert: 'invalid',
            appendTo: 'body',
            drag: function(event, ui) {
                var grid        = $('#'+activeTabId+' .tab-pane .grid-stack');
                var gridPH      = $('#'+activeTabId+' .tab-pane .grid-stack .grid-stack-placeholder');

                gridPH.attr('data-gs-width', 6);
                gridPH.attr('data-gs-height', 4);
            }
        });
    },

    bindEvents: function() {
        this.$document.ready(this.docuReady.bind(this));
    },

    docuReady: function() {
        var self    = this,
            $gs     = this.$gs,
            $btn    = $("#melisDashBoardPluginBtn"),
            $window = $(window),
            $box    = $btn.closest(".melis-core-dashboard-dnd-box"),
            $dWidth = $gs.width() - $box.width(), // shrink, 1584 - 220 = 1364
            $nWidth = $dWidth + $box.width();

        var gridDetect = "<div class=\"device-xs visible-xs\"></div>" +
                         "<div class=\"device-sm visible-sm\"></div>" + 
                         "<div class=\"device-md visible-md\"></div>" +
                         "<div class=\"device-lg visible-lg\"></div>" +
                         "<div class=\"device-xl visible-xl\"></div>" + 
                         "<div class=\"gridDetector\"><span>Number of Columns:</span> <span id=\"grid-size\"></span></div>";

        // appends html structure for checking
        //this.$body.append( gridDetect );

        // call resize grid on document ready
        //self.resizeGrid();

        /* 
         * subtracts the .grid-stack width with the plugins sidebar's width so that it would not overlap
         * workaround solution for the issue: http://mantis.melistechnology.fr/view.php?id=2418
         */
        $btn.toggle(function() {
            $box.addClass("shown");

            if ( $window.width() >= 768 ) {
                $gs.animate({
                    width: $dWidth
                }, 3);
            }
            
        }, function() {
            $box.removeClass("shown");

            if( $window.width() >= 768 ) {
                $gs.animate({
                    width: $nWidth
                }, 3);
            }

        });

        // remove class shown on plugin box
        this.$body.on('click', 'ul.sideMenu li a[data-toggle="collapse"]', function() {
            $box.removeClass("shown");
        });

        // animate to full width size of #grid1
        this.$body.on("click", "#dashboard-plugin-delete-all", function() {
            $gs.animate({
                width: $nWidth
            }, 3);
        });
    },

    /*isBreakpoint: function(alias) {
        return $('.device-' + alias).is(':visible');
    },

    resizeGrid: function() {
        var self = this;

        // waitForFinalEvent http://stackoverflow.com/a/22885503
        var waitForFinalEvent = function(){var b={};return function(c,d,a){a||(a="I am a banana!");b[a]&&clearTimeout(b[a]);b[a]=setTimeout(c,d)}}();
        var fullDateString  = new Date(),
            $gridSize       = $("#grid-size"),
            grid            = this.$gs.data('gridstack');

        function gridResize() {
            if ( self.isBreakpoint('xs') ) {
                $gridSize.text('One column mode');
            } else if ( self.isBreakpoint('sm') ) {
                grid.setGridWidth(3);
                $gridSize.text(3);
            } else if ( self.isBreakpoint('md') ) {
                grid.setGridWidth(6);
                $gridSize.text(6);
            } else if ( self.isBreakpoint('lg') ) {
                grid.setGridWidth(12);
                $gridSize.text(12);
            }
        }

        $(window).resize(function() {
            waitForFinalEvent(function() {
                gridResize();
            }, 300, fullDateString.getTime());
        });
    },*/

    dropWidget: function( widget ) {
        var self        = this,
            $tabPane    = $("#"+activeTabId+" .tab-pane"),
            $grid       = $("#"+activeTabId+" .tab-pane .grid-stack"),
            gridstack   = $("#"+activeTabId+" .tab-pane .grid-stack").data("gridstack");

        var dropTimer,
            dropCount = 0;

        var gridDrop = gridstack.container.droppable({
            accept: widget,
            tolerance: 'pointer',
            drop: function(event, ui) {

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

                // addWidget passing dataString
                self.addWidget(dataString);
            }

        });
    },

    addWidget: function(dataString) {
        var self = this;

        var $mcDashPlugSnippets = $("#"+activeTabId+" .tab-pane .grid-stack .melis-core-dashboard-plugin-snippets");
            $mcDashPlugSnippets.attr('data-gs-width', 6);
            $mcDashPlugSnippets.attr('data-gs-height', 4);

        var mcLoader            = "<div class='overlay-loader'><img class='loader-icon spinning-cog' src='/MelisCore/assets/images/cog12.svg' alt=''></div>";

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
            grid.removeWidget( $(widget).prev() );           

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
    },

    saveDBWidgets: function(dataString) {
        // gridstack definition
        var gridstack = $("#"+activeTabId+" .tab-pane .grid-stack").data("gridstack");

        // save the lists of widgets on the dashboard to db
        var saveDashboardLists = $.post("/melis/MelisCore/DashboardPlugins/saveDashboardPlugins", dataString);
    },

    dragStopWidget: function() {
        var self = this;

        // grid stack widget drag and stop position
        this.$gs.on('dragstop', function(event, ui) {
            var $grid   = $(this),
                $el     = $(event.target),
                node    = $el.data('_gridstack_node'),
                items   = node._grid.container[0].children;

                // update size of widgets passes array of .grid-stack-items
                self.serializeWidgetMap( $(items) );
        });
    },

    resizeStopWidget: function() {
        var self = this;

        // grid stack stop widget resize
        this.$gs.on('gsresizestop', function(event, elem) {
            var $grid   = $(this),
                node    = $(elem).data('_gridstack_node');
                items   = node._grid.container[0].children;

                // update size of widgets passes array of .grid-stack-items
                self.serializeWidgetMap( $(items) );
        });
    },

    deleteWidget: function(el) {
        var self        = this;

        var $del        = el,
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
                grid.removeWidget($del.closest('.grid-stack-item'));
              
                self.saveDBWidgets(dataString);
            }
        );
    },

    deleteAllWidget: function(el) {
        var self        = this,
            $gs         = $("#grid1");

        var grid        = $('#'+activeTabId+' .grid-stack').data('gridstack'),
            nodeItem    = grid.container[0].children,
            $gs         = $('#' + activeTabId ).find('.grid-stack'),
            $items       = $gs.find('.grid-stack-item');

        if( $items.length != 0 ) {

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
                    
                    // save widgets position / size on db
                    self.saveDBWidgets(dataString);
                }
            );

            // hide plugin menu
            this.$pluginBox.removeClass("shown");
        }
    },

    refreshWidget: function(el) {
        var self = this;

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
                
                // assigning current plugin
                self.setCurrentPlugin(widget);
                
                // executing plugin JsCallback
                if(data.jsCallbacks.length) {
                    $.each(data.jsCallbacks, function(index, value) {
                        eval(value);
                    });
                }
            });
        }
    },

    setCurrentPlugin: function(widget){
        // set current plugin
        this.currentPlugin = widget;
    },
    
    getCurrentPlugin: function(){
        // get current plugin
        return this.currentPlugin;
    }
};

$(function(){
    // init
    melisDashBoardDragnDrop.init();
});