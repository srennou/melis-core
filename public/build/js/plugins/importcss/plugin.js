!function(){var a={},b=function(b){for(var c=a[b],e=c.deps,f=c.defn,g=e.length,h=new Array(g),i=0;i<g;++i)h[i]=d(e[i]);var j=f.apply(null,h);if(void 0===j)throw"module ["+b+"] returned undefined";c.instance=j},c=function(b,c,d){if("string"!=typeof b)throw"module id must be a string";if(void 0===c)throw"no dependencies for "+b;if(void 0===d)throw"no definition function for "+b;a[b]={deps:c,defn:d,instance:void 0}},d=function(c){var d=a[c];if(void 0===d)throw"module ["+c+"] was undefined";return void 0===d.instance&&b(c),d.instance},e=function(a,b){for(var c=a.length,e=new Array(c),f=0;f<c;++f)e[f]=d(a[f]);b.apply(null,e)},f={};f.bolt={module:{api:{define:c,require:e,demand:d}}};var g=c,h=function(a,b){g(a,[],function(){return b})};h("4",tinymce.util.Tools.resolve),g("1",["4"],function(a){return a("tinymce.PluginManager")}),g("5",["4"],function(a){return a("tinymce.dom.DOMUtils")}),g("6",["4"],function(a){return a("tinymce.EditorManager")}),g("7",["4"],function(a){return a("tinymce.Env")}),g("8",["4"],function(a){return a("tinymce.util.Tools")}),g("9",[],function(){var a=function(a){return a.getParam("importcss_merge_classes")},b=function(a){return a.getParam("importcss_exclusive")},c=function(a){return a.getParam("importcss_selector_converter")},d=function(a){return a.getParam("importcss_selector_filter")},e=function(a){return a.getParam("importcss_groups")},f=function(a){return a.getParam("importcss_append")},g=function(a){return a.getParam("importcss_file_filter")};return{shouldMergeClasses:a,shouldImportExclusive:b,getSelectorConverter:c,getSelectorFilter:d,getCssGroups:e,shouldAppend:f,getFileFilter:g}}),g("3",["5","6","7","8","9"],function(a,b,c,d,e){var f=function(a){var b=c.cacheSuffix;return"string"==typeof a&&(a=a.replace("?"+b,"").replace("&"+b,"")),a},g=function(a,c){var d=a.settings,e=d.skin!==!1&&(d.skin||"lightgray");if(e){var f=d.skin_url?a.documentBaseURI.toAbsolute(d.skin_url):b.baseURL+"/skins/"+e;return c===f+"/content"+(a.inline?".inline":"")+".min.css"}return!1},h=function(a){return"string"==typeof a?function(b){return b.indexOf(a)!==-1}:a instanceof RegExp?function(b){return a.test(b)}:a},i=function(a,b,c){function e(b,i){var j,k=b.href;if(k=f(k),k&&c(k,i)&&!g(a,k)){d.each(b.imports,function(a){e(a,!0)});try{j=b.cssRules||b.rules}catch(a){}d.each(j,function(a){a.styleSheet?e(a.styleSheet,!0):a.selectorText&&d.each(a.selectorText.split(","),function(a){h.push(d.trim(a))})})}}var h=[],i={};d.each(a.contentCSS,function(a){i[a]=!0}),c||(c=function(a,b){return b||i[a]});try{d.each(b.styleSheets,function(a){e(a)})}catch(a){}return h},j=function(a,b){var c,f=/^(?:([a-z0-9\-_]+))?(\.[a-z0-9_\-\.]+)$/i.exec(b);if(f){var g=f[1],h=f[2].substr(1).split(".").join(" "),i=d.makeMap("a,img");return f[1]?(c={title:b},a.schema.getTextBlockElements()[g]?c.block=g:a.schema.getBlockElements()[g]||i[g.toLowerCase()]?c.selector=g:c.inline=g):f[2]&&(c={inline:"span",title:b.substr(1),classes:h}),e.shouldMergeClasses(a)!==!1?c.classes=h:c.attributes={"class":h},c}},k=function(a,b){return d.grep(a,function(a){return!a.filter||a.filter(b)})},l=function(a){return d.map(a,function(a){return d.extend({},a,{original:a,selectors:{},filter:h(a.filter),item:{text:a.title,menu:[]}})})},m=function(a,b){return null===b||e.shouldImportExclusive(a)!==!1},n=function(a,b,c,d){return!(m(a,c)?b in d:b in c.selectors)},o=function(a,b,c,d){m(a,c)?d[b]=!0:c.selectors[b]=!0},p=function(a,b,c,d){var f;return f=d&&d.selector_converter?d.selector_converter:e.getSelectorConverter(a)?e.getSelectorConverter(a):function(){return j(a,c,d)},f.call(b,c,d)},q=function(b){b.on("renderFormatsMenu",function(c){var f={},g=h(e.getSelectorFilter(b)),j=c.control,m=l(e.getCssGroups(b)),q=function(c,e){if(n(b,c,e,f)){o(b,c,e,f);var g=p(b,b.plugins.importcss,c,e);if(g){var h=g.name||a.DOM.uniqueId();return b.formatter.register(h,g),d.extend({},j.settings.itemDefaults,{text:g.title,format:h})}}return null};e.shouldAppend(b)||j.items().remove(),d.each(i(b,c.doc||b.getDoc(),h(e.getFileFilter(b))),function(a){if(a.indexOf(".mce-")===-1&&(!g||g(a))){var b=k(m,a);if(b.length>0)d.each(b,function(b){var c=q(a,b);c&&b.item.menu.push(c)});else{var c=q(a,null);c&&j.add(c)}}}),d.each(m,function(a){a.item.menu.length>0&&j.add(a.item)}),c.control.renderNew()})};return{defaultConvertSelectorToFormat:j,setup:q}}),g("2",["3"],function(a){var b=function(b){var c=function(c){return a.defaultConvertSelectorToFormat(b,c)};return{convertSelectorToFormat:c}};return{get:b}}),g("0",["1","2","3"],function(a,b,c){return a.add("importcss",function(a){return c.setup(a),b.get(a)}),function(){}}),d("0")()}();