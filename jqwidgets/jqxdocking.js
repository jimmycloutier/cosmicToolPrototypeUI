/*
jQWidgets v4.5.3 (2017-June)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
!function(a){a.jqx.jqxWidget("jqxDocking","",{}),a.extend(a.jqx._jqxDocking.prototype,{defineInstance:function(){var b={orientation:"horizontal",mode:"default",floatingWindowOpacity:.3,panelsRoundedCorners:!0,disabled:!1,width:"auto",height:"auto",windowsMode:null,cookies:!1,cookieOptions:{},windowsOffset:5,rtl:!1,keyboardNavigation:!1,_windowOptions:{},_draggedFired:!1,_dragging:!1,_draggingItem:null,_panels:[],_windows:[],_indicator:null,_events:["dragEnd","dragStart"]};return this===a.jqx._jqxDocking.prototype?b:(a.extend(!0,this,b),b)},createInstance:function(){if(!this.host.jqxWindow)throw new Error("jqxDocking: Missing reference to jqxwindow.js.");this._refresh(!0),this.disabled&&(this.disabled=!1,this.disable())},refresh:function(a){1!=a&&this._performLayout()},_refresh:function(b){this._render(),this._removeClasses(),this._addClasses(),this._setWindowsOptions(!0),this._performLayout(),this._cookieHandler(),this._cookieExporter(),this._removeEventListeners(),this._addEventListeners();var c=a.Event("resize");this.host.trigger(c)},resize:function(){this._refresh()},_addClasses:function(){this.host.addClass("jqx-docking");for(var a=0;a<this._panels.length;a+=1)this._panels[a].addClass(this.toThemeProperty("jqx-docking-panel")),this.panelsRoundedCorners&&this._panels[a].addClass(this.toThemeProperty("jqx-rc-all"));for(var a=0;a<this._windows.length;a+=1)this._windows[a].addClass(this.toThemeProperty("jqx-docking-window"))},_removeClasses:function(){this.host.removeClass("jqx-docking");for(var a=0;a<this._panels.length;a+=1)this._panels[a].removeClass(this.toThemeProperty("jqx-docking-panel")),this._panels[a].removeClass(this.toThemeProperty("jqx-rc-all"));for(var a=0;a<this._windows.length;a+=1)this._windows[a].removeClass(this.toThemeProperty("jqx-docking-window"))},_render:function(){for(var b=this.host.children("div"),c=0;c<b.length;c+=1)this._panels.push(a(b[c])),this._renderWindows(a(b[c]))},focus:function(b){this.focusedWindow&&a(this.focusedWindow).removeClass(this.toThemeProperty("jqx-fill-state-focus")),!a.isEmptyObject(b)&&"string"===a.type(b)&&a("#"+b).length>0?this.focusedWindow=a("#"+b)[0]:this.focusedWindow=this._windows[0][0],a(this.focusedWindow).addClass(this.toThemeProperty("jqx-fill-state-focus")),this.host.focus()},_renderWindows:function(b){for(var c=b.children("div"),d=0;d<c.length;d+=1)this._windows.push(a(c[d])),a(c[d]).jqxWindow({keyboardNavigation:!1,rtl:this.rtl,theme:this.theme,enableResize:!1,width:a(c[d]).css("width"),maxWidth:Number.MAX_VALUE}),a(c[d]).detach(),b.append(a(c[d]));b.append('<div class="spacer" style="clear: both;"></div>');var e=this;if(this.keyboardNavigation){var f=function(b){if(13===b.keyCode?e.focusedWindow&&a(e.focusedWindow).jqxWindow("showCollapseButton")&&a(e.focusedWindow).jqxWindow("_collapseButton").trigger("click"):(e.focusedWindow&&27===b.keyCode&&"esc"===a(e.focusedWindow).jqxWindow("keyboardCloseKey")||e.focusedWindow&&a(e.focusedWindow).jqxWindow("keyboardCloseKey")==b.keyCode)&&a(e.focusedWindow).jqxWindow("closeWindow",b),9===b.keyCode){if(null==e.focusedWindow)e.focusedWindow=e._windows[0],a(e.focusedWindow).focus(),b.stopPropagation();else{var c=-1;if(a.each(e._windows,function(a,b){this[0]==e.focusedWindow&&(c=a)}),b.shiftKey?c--:c++,c>=e._windows.length||c<0)return a(e.focusedWindow).removeClass(e.toThemeProperty("jqx-fill-state-focus")),e.focusedWindow=null,b.stopPropagation(),!0;var d=e._windows[c];d||(d=e._windows[0]),a(e.focusedWindow).removeClass(e.toThemeProperty("jqx-fill-state-focus")),e.focusedWindow=d[0],a(e.focusedWindow).focus()}a(e.focusedWindow).addClass(e.toThemeProperty("jqx-fill-state-focus")),b.preventDefault&&(b.preventDefault(),b.stopPropagation())}};a.each(e._windows,function(b,c){var d=a(this);e.removeHandler(d,"focus"),e.removeHandler(d,"blur"),e.removeHandler(d,"mousedown"),e.addHandler(d,"mousedown",function(b){e.focusedWindow&&a(e.focusedWindow).removeClass(e.toThemeProperty("jqx-fill-state-focus")),e.focusedWindow=d[0],a(e.focusedWindow).addClass(e.toThemeProperty("jqx-fill-state-focus")),a(e.focusedWindow).focus()}),e.addHandler(d,"focus",function(b){e.focusedWindow&&a(e.focusedWindow).removeClass(e.toThemeProperty("jqx-fill-state-focus")),e.focusedWindow=d[0],a(e.focusedWindow).addClass(e.toThemeProperty("jqx-fill-state-focus"))}),e.addHandler(d,"blur",function(b){if(a(document.activeElement).ischildof(a(d)))return!0;a(d).removeClass(e.toThemeProperty("jqx-fill-state-focus"))}),e.removeHandler(d,"keydown"),e.addHandler(d,"keydown",function(a){f(a)})}),this.removeHandler(this.host,"keydown"),this.addHandler(this.host,"keydown",function(a){f(a)}),this.removeHandler(this.host,"blur"),this.addHandler(this.host,"blur",function(b){e.focusedWindow&&(a(e.focusedWindow).removeClass(e.toThemeProperty("jqx-fill-state-focus")),e.focusedWindow=null)})}},_performLayout:function(){this.host.css("width",this.width),this.host.css("height",this.height),this._performWindowsLayout(),this._performPanelsLayout(),this._performWindowsLayout()},_performPanelsLayout:function(){this.host.css("overflow","hidden");for(var a,b=this.host.width(),c=0,d=0;d<this._panels.length;d+=1)a=this._panels[d],a.css("height","auto"),a.css("min-width","auto"),a[0].style.width="auto","vertical"===this.orientation?(a.css("width","auto"),a.css("float","none")):(c+=this._handleHorizontalSize(a,c,b),d>0&&a.css("margin-left",-this.windowsOffset));"horizontal"===this.orientation&&c<b&&this._fillContainer(b,c)},_handleHorizontalSize:function(a,b,c){var d,e=c/this._panels.length,f=a.outerWidth()-a.width();if(a.css("float","left"),"auto"===a[0].style.width||0===parseInt(a.css("width"),10)){var g=99.99/this._panels.length;return a[0].style.width=g+"%",a.outerWidth()}return b+a.outerWidth()>=c&&(b+e<c?(d=e-f,a.css("min-width",d),a.width(d)):(d=a.width()-(b+a.outerWidth()-c),a.css("min-width",d),a.width(d))),a.outerWidth()},_fillContainer:function(b,c){var d=this._panels.length,e=this._panels[d-1],f=b-c+e.width();a.jqx.browser.msie&&a.jqx.browser.version<9&&(f-=this._panels.length)},_performWindowsLayout:function(){for(var a,b=0;b<this._windows.length;b+=1)a=this._getWindowOptions(this._windows[b]),this._windows[b].ischildof(this.host)&&(a?"floating"!==a.mode&&(this._windows[b].css("margin",this.windowsOffset),this._windows[b].css("position","static")):"floating"!==this.mode&&(this._windows[b].css("position","static"),this._windows[b].css("margin",this.windowsOffset))),this._setWindowSize(this._windows[b],a)},_setWindowSize:function(a,b){if("floating"!==b.mode&&a.ischildof(this.host)){var c=a.parent().width()-(a.outerWidth()-a.width())-2*this.windowsOffset;this.orientation,a.jqxWindow("width",c)}this._setWindowOption(a,"size",{width:a.width(),height:a.height()})},_setWindowsOptions:function(a){for(var b=0;b<this._windows.length;b+=1){var c,d=this._windows[b].attr("id"),e=this._getWindowOptions(d);if(!a);c=null,this.windowsMode&&this.windowsMode.hasOwnProperty(d)?(c=this.windowsMode[d],this._setWindowOption(this._windows[b],"mode",c)):void 0!==e&&void 0===e.mode&&(c=this.mode,this._setWindowOption(this._windows[b],"mode",c)),a&&(this._setWindowOption(this._windows[b],"resizable",!0),"floating"==c?this._windows[b].jqxWindow({enableResize:!0}):this._windows[b].jqxWindow({enableResize:!1}),this._setWindowOption(this._windows[b],"size",{height:this._windows[b].height(),width:this._windows[b].width()}))}},_removeEventListeners:function(){for(var a=0;a<this._windows.length;a+=1)this.removeHandler(this._windows[a],"moving",this._itemDragging),this.removeHandler(this._windows[a],"moved",this._itemDrop),this.removeHandler(this._windows[a],"resized",this._itemResized),this.removeHandler(this._windows[a],"collapse",this._collapsed),this.removeHandler(this._windows[a],"expand",this._expanded)},_addEventListeners:function(){for(var b=0;b<this._windows.length;b+=1)this._addEventListenersTo(this._windows[b]);var c=this;a.jqx.utilities.resize(this.host,function(){c._performLayout()})},_addEventListenersTo:function(a){this.addHandler(a,"moving",this._itemDragging,{self:this}),this.addHandler(a,"moved",this._itemDrop,{self:this}),this.addHandler(a,"resized",this._itemResized,{self:this}),this.addHandler(a,"collapse",this._collapsed,{self:this}),this.addHandler(a,"expand",this._expanded,{self:this})},_itemDragging:function(b){var c=b.data.self,d=a(b.target),e=c._getWindowOptions(d);if(d.removeClass(c.toThemeProperty("jqx-docking-window")),d.css("margin","0px"),c._dragging||c._prepareForDragging(d),"floating"!==e.mode){var f={x:b.args.pageX,y:b.args.pageY},g=c._getMouseOverPanel(f);return g?c._mouseOverPanel(g,f):c._mouseLeavePanel(),c._draggedFired||(c._raiseEvent(1,{window:a(d).attr("id")}),c._draggedFired=!0),!0}},_prepareForDragging:function(b){this._dragging=!0;var c={parent:b.parent(),next:b.next(),prev:b.prev()};this._setWindowOption(b,"lastPosition",c),b.detach(),a(document.body).append(b),this._setDraggingStyles(b),this._draggingItem=b},_setDraggingStyles:function(a){a.css({position:"absolute",left:a.offset().left,top:a.offset().top}),a.fadeTo(0,this.floatingWindowOpacity)},_getMouseOverPanel:function(a){for(var b=0;b<this._panels.length;b+=1)if(this._isMouseOverItem(this._panels[b],a,!1))return this._panels[b];return null},_mouseOverPanel:function(a,b){if(this._dragging){var c=a.children("div"),d=this._getHoverWindow(b,c);if("indicator"===d)return;var e=this._centerOffset(d,b);this._handleIndicator(a,d,e)}},_getHoverWindow:function(b,c){if(this._isMouseOverItem(this._indicator,b,!0))return"indicator";for(var d=0;d<c.length;d+=1)if(this._isMouseOverItem(a(c[d]),b,!0))return a(c[d]);return null},_centerOffset:function(a,b){if(a){var c,d={x:a.offset().left,y:a.offset().top},e=a.height();a.width();return c=d.y+e/2,b.y>c?"next":"prev"}return"all"},_handleIndicator:function(a,b,c){var d=this._getIndicator(b);"all"===c?"vertical"===this.orientation?d.insertBefore(a.children(".spacer")):a.append(d):"prev"===c?d.insertBefore(b):d.insertAfter(b),this._resizeIndicator(d,a)},_getIndicator:function(){var b=this._indicator;return b||(b=a('<div class="'+this.toThemeProperty("jqx-docking-drop-indicator")+'"></div>')),this._indicator=b,this._indicator.css("margin",this.windowsOffset),"vertical"===this.orientation&&this._indicator.css("float","left"),b},_resizeIndicator:function(a,b){"horizontal"===this.orientation?(a.width(b.width()-(a.outerWidth(!0)-a.width())),a.height(this._draggingItem.height())):(a.width(this._draggingItem.width()),a.height(this._draggingItem.height()))},_mouseLeavePanel:function(a){this._indicator&&(this._indicator.remove(),this._indicator=null)},_itemDrop:function(b){var c=b.data.self,d=a(b.currentTarget);c._dragging=!1,c._indicator?(d.detach(),d.insertAfter(c._indicator),c._indicator.remove(),c._dropFixer(d)):c._dropHandler(d),d.fadeTo(0,1),d.focus(),c._indicator=null,c._cookieExporter(),c._draggedFired=!1,c._raiseEvent(0,{window:d.attr("id")})},_dropFixer:function(a){a.css("position","static"),a.addClass(this.toThemeProperty("jqx-docking-window")),a.css("margin",this.windowsOffset),a.jqxWindow("enableResize",!1),"horizontal"===this.orientation&&this._fixWindowSize(a)},_dropHandler:function(a){this._getWindowOptions(a);"docked"===this.mode?this._dropDocked(a):this._dropFloating(a)},_dropDocked:function(a){var b=this._getWindowOptions(a),c=b.lastPosition;a.detach(),c.next[0]?a.insertBefore(c.next):c.prev[0]?a.insertAfter(c.prev):c.parent.append(a),this._dropFixer(a)},_fixWindowSize:function(b){a(b).jqxWindow({width:b.parent().width()-(b.outerWidth()-b.width())-2*parseInt(this.windowsOffset,10)})},_itemResized:function(b){var c=b.data.self,d=a(b.currentTarget);c._setWindowOption(d,"size",{width:b.args.width,height:b.args.height}),c._cookieExporter()},_dropFloating:function(b){var c;a(b).jqxWindow("collapsed")||(c=this._getWindowOptions(b),a(b).jqxWindow("enableResize",c.resizable)),a(document.body).append(b),this._restoreWindowSize(b)},_restoreWindowSize:function(b){var c=this._getWindowOptions(b);a(b).jqxWindow({width:c.size.width})},_isMouseOverItem:function(a,b,c){if(!a)return!1;var d=a.outerWidth(!0),e=a.outerHeight(!0),f=a.width(),g=a.height(),h=a.offset().top,i=a.offset().left;return c&&(h-=(e-g)/2,i-=(d-f)/2,f=d,g=e),i<=b.x&&i+f>=b.x&&h<=b.y&&h+g+2*this._draggingItem.height()/3>=b.y},_cookieHandler:function(){if(this.cookies){var b=a.jqx.cookie.cookie("jqxDocking"+this.element.id);null!==b&&(this.importLayout(b),layoutImported=!0)}},_cookieExporter:function(){this.cookies&&a.jqx.cookie.cookie("jqxDocking"+this.element.id,this.exportLayout(),this.cookieOptions)},_indexOf:function(a,b){for(var c=0;c<b.length;c+=1)if(a[0]===b[c][0])return c;return-1},_exportFixed:function(){for(var b,c,d=[],e="",f=0;f<this._panels.length;f+=1){e+='"panel'+f+'": {',b=this._panels[f].children();for(var g=0;g<b.length;g+=1)c=a(b[g]),c.attr("id")&&(d.push(c),e+='"'+c.attr("id")+'":{"collapsed":'+c.jqxWindow("collapsed")+"},");b.length>1&&(e=e.substring(0,e.length-1)),e+="},"}return e=e.substring(0,e.length-1),{JSON:e,children:d}},_exportFloating:function(b){var c,d="";d+='"floating":{';for(var e=0;e<this._windows.length;e+=1)c=a(this._windows[e]),-1===this._indexOf(c,b)&&(d+='"'+c.attr("id")+'":{"x":"'+c.css("left")+'","y":"'+c.css("top")+'","width":"'+c.jqxWindow("width")+'","height":"'+c.jqxWindow("height")+'","collapsed":'+c.jqxWindow("collapsed")+"},");return","===d.substring(d.length-1,d.length)&&(d=d.substring(0,d.length-1)),d+="}"},_importFixed:function(b){for(var c in b)if("orientation"!==c&&"floating"!==c&&b.hasOwnProperty(c)){order=c.substring(c.length-1,c.length),order=parseInt(order,10),children=b[c];for(var c in children)a("#"+c).css("position","static"),children[c].collapsed&&function(b){setTimeout(function(){a("#"+b).jqxWindow("collapsed",!0)},0)}(c),this._panels[order].append(a("#"+c)),"horizontal"===this.orientation&&this._fixWindowSize(a("#"+c))}},_importFloating:function(b){var c,d=b.floating;for(var e in d)d.hasOwnProperty(e)&&(a("#"+e).css("position","absolute"),a(document.body).append(a("#"+e)),c=this._dragging,a("#"+e).jqxWindow("move",d[e].x,d[e].y),this._dragging=c,a("#"+e).jqxWindow("width",d[e].width),a("#"+e).jqxWindow("height",d[e].height),a("#"+e).jqxWindow("enableResize",!0),this._setWindowsOptions(!0),function(b){setTimeout(function(){a("#"+b).jqxWindow("collapsed",d[b].collapsed)},0)}(e),a("#"+e).fadeTo(0,1))},_getWindowOptions:function(a){return"object"==typeof a&&null!==a&&(a=a.length>0?a.attr("id"):a.id),this._windowOptions[a]},_setWindowOption:function(a,b,c){"object"==typeof a&&null!==a&&(a=a.length>0?a.attr("id"):a.id),void 0===this._windowOptions[a]&&(this._windowOptions[a]={}),this._windowOptions[a][b]=c,"mode"===b&&this.setWindowMode(a,c)},_expanded:function(a){a.data.self._cookieExporter()},_collapsed:function(a){a.data.self._cookieExporter()},_raiseEvent:function(b){var c=a.Event(this._events[b]);return c.args=arguments[1],this.host.trigger(c)},_moveWindow:function(b,c,d){var e=c.children(),f=null,g=0;a.each(e,function(c){"static"==a(this).css("position")&&(g==d&&this!=b[0]&&(f=this),g++)}),g<=d?b.appendTo(c):null!=f&&b.insertBefore(f),b.css("position","static")},propertyChangedHandler:function(b,c,d,e){switch(c){case"rtl":a.each(b._windows,function(){this.jqxWindow({rtl:e})});break;case"theme":a.each(b._windows,function(){this.jqxWindow({theme:e})});break;case"orientation":case"height":case"width":b._performLayout(),b._cookieExporter();break;case"panelsRoundedCorners":b._removeClasses(),b._addClasses();break;case"disabled":e?(b.disabled=!1,b.disable()):(b.disabled=!0,b.enable());break;case"windowsMode":case"mode":b._setWindowsOptions(!1);break;case"cookies":b._cookieExporter();break;case"windowsOffset":b._performLayout()}},destroy:function(){this._removeEventListeners(),this.host.remove(),this.windowsMode=null,this.cookieOptions=null,this._windowOptions=null,this._panels=null,this._windows=null,this._events=null},disable:function(){if(!this.disabled){this.disabled=!0,this._removeEventListeners();for(var b=0;b<this._windows.length;b+=1)this._windows[b][0].style.opacity="",a(this._windows[b]).jqxWindow("disable")}},enable:function(){if(this.disabled){this.disabled=!1,this._addEventListeners();for(var b=0;b<this._windows.length;b+=1)a(this._windows[b]).jqxWindow("enable")}},move:function(b,c,d){var c=this._panels[c];if(c){var e,f=a(c.children(".spacer"));f.detach(),b=a("#"+b),e=this._getWindowOptions(b),"floating"!==e.mode&&(this._moveWindow(b,c,d),c.append(f),this._cookieExporter(),this._dropFixer(b))}},exportLayout:function(){var a="{",b=this._exportFixed();return a+=b.JSON+","+this._exportFloating(b.children)+',"orientation": "'+this.orientation+'"',a+="}"},importLayout:function(b){try{var c=a.parseJSON(b);this.orientation=c.orientation,this._performLayout(),this._importFixed(c),this._importFloating(c)}catch(a){alert("Invalid JSON string.")}},setWindowMode:function(b,c){var b=a("#"+b),d=this._getWindowOptions(b);"floating"===c?(b.css("position","absolute"),this._windowOptions[b.attr("id")].mode=c):"floating"===d.mode&&"absolute"===b.css("position")&&(d.lastPosition?this._dropDocked(b):(this._panels[0].append(b),this._dropFixer(b))),this._windowOptions[b.attr("id")].mode=c},hideCloseButton:function(b){a("#"+b).jqxWindow("showCloseButton",!1)},showCloseButton:function(b){a("#"+b).jqxWindow("showCloseButton",!0)},hideCollapseButton:function(b){a("#"+b).jqxWindow("showCollapseButton",!1)},showCollapseButton:function(b){a("#"+b).jqxWindow("showCollapseButton",!0)},expandWindow:function(b,c){a("#"+b).jqxWindow("expand",c)},collapseWindow:function(b,c){a("#"+b).jqxWindow("collapse",c)},setWindowProperty:function(b,c,d){a("#"+b).jqxWindow(c,d)},getWindowProperty:function(b,c){return a("#"+b).jqxWindow(c)},setWindowPosition:function(b,c,d){var b=a("#"+b);"floating"===this._getWindowOptions(b).mode&&(b.css("position","absolute"),a(b).jqxWindow("move",c,d,null,!1))},hideAllCloseButtons:function(){for(var a=0;a<this._windows.length;a+=1)this._windows[a].jqxWindow("showCloseButton",!1)},hideAllCollapseButtons:function(){for(var a=0;a<this._windows.length;a+=1)this._windows[a].jqxWindow("showCollapseButton",!1)},showAllCloseButtons:function(){for(var a=0;a<this._windows.length;a+=1)this._windows[a].jqxWindow("showCloseButton",!0)},showAllCollapseButtons:function(){for(var a=0;a<this._windows.length;a+=1)this._windows[a].jqxWindow("showCollapseButton",!0)},pinWindow:function(b){a("#"+b).jqxWindow("draggable",!1)},unpinWindow:function(b){a("#"+b).jqxWindow("draggable",!0)},setDraggingMode:function(b){var c=a("#"+b);this._prepareForDragging(c),c.fadeTo(0,1)},enableWindowResize:function(b){b=a("#"+b),"absolute"===b.css("position")&&(this._setWindowOption(b,"resizable",!0),b.jqxWindow("enableResize",!0))},disableWindowResize:function(b){b=a("#"+b),this._setWindowOption(b,"resizable",!1),b.jqxWindow("enableResize",!1)},addWindow:function(b,c,d,e){var f="#"+b;a(f).jqxWindow({keyboardNavigation:!1,rtl:this.rtl,theme:this.theme,enableResize:!1,width:a(f).css("width"),maxWidth:Number.MAX_VALUE}),this._panels[0].append(a(f)),this._windows.push(a(f)),c?this._setWindowOption(a(f),"mode",c):this._setWindowOption(a(f),"mode",this.mode),this._setWindowOption(a(f),"resizable",!0),this._setWindowOption(a(f),"size",{width:a(f).width(),height:a(f).height()}),"floating"==c?a(f).jqxWindow({enableResize:!0}):a(f).jqxWindow({enableResize:!1}),null!=this._panels[d]&&this._setWindowOption(a(f),"size",{width:this._panels[d].width(),height:this._panels[d].height()}),this._addEventListenersTo(a(f)),void 0!==d&&void 0!==e&&this.move(b,d,e),this._dropFixer(a(f))},closeWindow:function(b){a("#"+b).jqxWindow("closeWindow")}})}(jqxBaseFramework);
