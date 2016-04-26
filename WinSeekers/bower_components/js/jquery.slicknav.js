!function(t,e,n){function a(e,n){this.element=e,this.settings=t.extend({},i,n),this._defaults=i,this._name=s,this.init()}var i={label:"",duplicate:!0,duration:200,easingOpen:"swing",easingClose:"swing",closedSymbol:"&#9658;",openedSymbol:"&#9660;",prependTo:"body",parentTag:"a",closeOnClick:!1,allowParentLinks:!1,init:function(){},open:function(){},close:function(){}},s="slicknav",o="slicknav";a.prototype.init=function(){var n=this,a=t(this.element),i=this.settings;i.duplicate?(n.mobileNav=a.clone(),n.mobileNav.removeAttr("id"),n.mobileNav.find("*").each(function(e,n){t(n).removeAttr("id")})):n.mobileNav=a;var s=o+"_icon";""==i.label&&(s+=" "+o+"_no-text"),"a"==i.parentTag&&(i.parentTag='a href="#"'),n.mobileNav.attr("class",o+"_nav");var l=t('<div class="'+o+'_menu"></div>');n.btn=t("<"+i.parentTag+' aria-haspopup="true" tabindex="0" class="'+o+"_btn "+o+'_collapsed"><span class="'+o+'_menutxt">'+i.label+'</span><span class="'+s+'"><span class="'+o+'_icon-bar"></span><span class="'+o+'_icon-bar"></span><span class="'+o+'_icon-bar"></span></span></a>'),t(l).append(n.btn),t(i.prependTo).prepend(l),l.append(n.mobileNav);var r=n.mobileNav.find("li");t(r).each(function(){var e=t(this);if(data={},data.children=e.children("ul").attr("role","menu"),e.data("menu",data),data.children.length>0){var a=e.contents(),s=[];t(a).each(function(){return t(this).is("ul")?!1:void s.push(this)});t(s).wrapAll("<"+i.parentTag+' role="menuitem" aria-haspopup="true" tabindex="-1" class="'+o+'_item"/>').parent();e.addClass(o+"_collapsed"),e.addClass(o+"_parent"),t(s).last().after('<span class="'+o+'_arrow">'+i.closedSymbol+"</span>")}else 0==e.children().length&&e.addClass(o+"_txtnode");e.children("a").attr("role","menuitem").click(function(){i.closeOnClick&&t(n.btn).click()})}),t(r).each(function(){var e=t(this).data("menu");n._visibilityToggle(e.children,!1,null,!0)}),n._visibilityToggle(n.mobileNav,!1,"init",!0),n.mobileNav.attr("role","menu"),t(e).mousedown(function(){n._outlines(!1)}),t(e).keyup(function(){n._outlines(!0)}),t(n.btn).click(function(t){t.preventDefault(),n._menuToggle()}),n.mobileNav.on("click","."+o+"_item",function(e){e.preventDefault(),n._itemClick(t(this))}),t(n.btn).keydown(function(t){var e=t||event;13==e.keyCode&&(t.preventDefault(),n._menuToggle())}),n.mobileNav.on("keydown","."+o+"_item",function(e){var a=e||event;13==a.keyCode&&(e.preventDefault(),n._itemClick(t(e.target)))}),i.allowParentLinks&&t("."+o+"_item a").click(function(t){t.stopImmediatePropagation()})},a.prototype._menuToggle=function(t){var e=this,n=e.btn,a=e.mobileNav;n.hasClass(o+"_collapsed")?(n.removeClass(o+"_collapsed"),n.addClass(o+"_open")):(n.removeClass(o+"_open"),n.addClass(o+"_collapsed")),n.addClass(o+"_animating"),e._visibilityToggle(a,!0,n)},a.prototype._itemClick=function(t){var e=this,n=e.settings,a=t.data("menu");a||(a={},a.arrow=t.children("."+o+"_arrow"),a.ul=t.next("ul"),a.parent=t.parent(),t.data("menu",a)),a.parent.hasClass(o+"_collapsed")?(a.arrow.html(n.openedSymbol),a.parent.removeClass(o+"_collapsed"),a.parent.addClass(o+"_open"),a.parent.addClass(o+"_animating"),e._visibilityToggle(a.ul,!0,t)):(a.arrow.html(n.closedSymbol),a.parent.addClass(o+"_collapsed"),a.parent.removeClass(o+"_open"),a.parent.addClass(o+"_animating"),e._visibilityToggle(a.ul,!0,t))},a.prototype._visibilityToggle=function(e,n,a,i){var s=this,l=s.settings,r=s._getActionItems(e),c=0;n&&(c=l.duration),e.hasClass(o+"_hidden")?(e.removeClass(o+"_hidden"),e.slideDown(c,l.easingOpen,function(){t(a).removeClass(o+"_animating"),t(a).parent().removeClass(o+"_animating"),i||l.open(a)}),e.attr("aria-hidden","false"),r.attr("tabindex","0"),s._setVisAttr(e,!1)):(e.addClass(o+"_hidden"),e.slideUp(c,this.settings.easingClose,function(){e.attr("aria-hidden","true"),r.attr("tabindex","-1"),s._setVisAttr(e,!0),e.hide(),t(a).removeClass(o+"_animating"),t(a).parent().removeClass(o+"_animating"),i?"init"==a&&l.init():l.close(a)}))},a.prototype._setVisAttr=function(e,n){var a=this,i=e.children("li").children("ul").not("."+o+"_hidden");n?i.each(function(){var e=t(this);e.attr("aria-hidden","true");var i=a._getActionItems(e);i.attr("tabindex","-1"),a._setVisAttr(e,n)}):i.each(function(){var e=t(this);e.attr("aria-hidden","false");var i=a._getActionItems(e);i.attr("tabindex","0"),a._setVisAttr(e,n)})},a.prototype._getActionItems=function(t){var e=t.data("menu");if(!e){e={};var n=t.children("li"),a=n.children("a");e.links=a.add(n.children("."+o+"_item")),t.data("menu",e)}return e.links},a.prototype._outlines=function(e){e?t("."+o+"_item, ."+o+"_btn").css("outline",""):t("."+o+"_item, ."+o+"_btn").css("outline","none")},a.prototype.toggle=function(){$this._menuToggle()},a.prototype.open=function(){$this=this,$this.btn.hasClass(o+"_collapsed")&&$this._menuToggle()},a.prototype.close=function(){$this=this,$this.btn.hasClass(o+"_open")&&$this._menuToggle()},t.fn[s]=function(e){var n=arguments;if(void 0===e||"object"==typeof e)return this.each(function(){t.data(this,"plugin_"+s)||t.data(this,"plugin_"+s,new a(this,e))});if("string"==typeof e&&"_"!==e[0]&&"init"!==e){var i;return this.each(function(){var o=t.data(this,"plugin_"+s);o instanceof a&&"function"==typeof o[e]&&(i=o[e].apply(o,Array.prototype.slice.call(n,1)))}),void 0!==i?i:this}}}(jQuery,document,window);