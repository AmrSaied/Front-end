

;(function (selectBoxIt) {

   
    "use strict";

    
    selectBoxIt(window.jQuery, window, document);

}



(function ($, window, document, undefined) {

   
    "use strict";

    
    $.widget("selectBox.selectBoxIt", {

       
        VERSION: "3.8.0",

        
        options: {

           
            "showEffect": "none",

            
            "showEffectOptions": {},

            
            "showEffectSpeed": "medium",

           
            "hideEffect": "none",

          
            "hideEffectOptions": {},

            
            "hideEffectSpeed": "medium",

            
            "showFirstOption": true,

           
            "defaultText": "",

            
            "defaultIcon": "",

            
			
            "downArrowIcon": "",

      
            "theme": "default",

           
            "keydownOpen": true,

            
            "isMobile": function() {

               
                var ua = navigator.userAgent || navigator.vendor || window.opera;

                
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);

            },

            
            "native": false,

            
            "aggressiveChange": false,

           
            "selectWhenHidden": true,

           
            "viewport": $(window),

            
            "similarSearch": false,

            
            "copyAttributes": [

                "title",

                "rel"

            ],

           
            "copyClasses": "button",

          
            "nativeMousedown": false,

           
            "customShowHideEvent": false,

            
            "autoWidth": true,

            
            "html": true,

           
            "populate": "",

            
            "dynamicPositioning": true,

            
            "hideCurrent": false

        },

        // 
        "getThemes": function() {

            var self = this,
                theme = $(self.element).attr("data-theme") || "c";

            return {

                
                "bootstrap": {

                    "focus": "active",

                    "hover": "",

                    "enabled": "enabled",

                    "disabled": "disabled",

                    "arrow": "caret",

                    "button": "btn",

                    "list": "dropdown-menu",

                    "container": "bootstrap",

                    "open": "open"

                },

               
                "jqueryui": {

                    "focus": "ui-state-focus",

                    "hover": "ui-state-hover",

                    "enabled": "ui-state-enabled",

                    "disabled": "ui-state-disabled",

                    "arrow": "ui-icon ui-icon-triangle-1-s",

                    "button": "ui-widget ui-state-default",

                    "list": "ui-widget ui-widget-content",

                    "container": "jqueryui",

                    "open": "selectboxit-open"

                },

               
                "jquerymobile": {

                    "focus": "ui-btn-down-" + theme,

                    "hover": "ui-btn-hover-" + theme,

                    "enabled": "ui-enabled",

                    "disabled": "ui-disabled",

                    "arrow": "ui-icon ui-icon-arrow-d ui-icon-shadow",

                    "button": "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + theme,

                    "list": "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + theme,

                    "container": "jquerymobile",

                    "open": "selectboxit-open"

                },

                "default": {

                    "focus": "selectboxit-focus",

                    "hover": "selectboxit-hover",

                    "enabled": "selectboxit-enabled",

                    "disabled": "selectboxit-disabled",

                    "arrow": "selectboxit-default-arrow",

                    "button": "selectboxit-btn",

                    "list": "selectboxit-list",

                    "container": "selectboxit-container",

                    "open": "selectboxit-open"

                }

            };

        },

            
        isDeferred: function(def) {
            return $.isPlainObject(def) && def.promise && def.done;
        },

        
        _create: function(internal) {

            var self = this,
                populateOption = self.options["populate"],
                userTheme = self.options["theme"];

            
            if(!self.element.is("select")) {

               
                return;

            }

           
            self.widgetProto = $.Widget.prototype;

           
            self.originalElem = self.element[0];

            
            self.selectBox = self.element;

            if(self.options["populate"] && self.add && !internal) {

                self.add(populateOption);

            }

          
            self.selectItems = self.element.find("option");

           
            self.firstSelectItem = self.selectItems.slice(0, 1);

          
            self.documentHeight = $(document).height();

            self.theme = $.isPlainObject(userTheme) ? $.extend({}, self.getThemes()["default"], userTheme) : self.getThemes()[userTheme] ? self.getThemes()[userTheme] : self.getThemes()["default"];

           
            self.currentFocus = 0;

            
            self.blur = true;

            
            self.textArray = [];

           
            self.currentIndex = 0;

            
            self.currentText = "";

            
            self.flipped = false;

            
            if(!internal) {

                
                self.selectBoxStyles = self.selectBox.attr("style");

            }

           
            self._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(self.theme)._eventHandlers();

            if(self.originalElem.disabled && self.disable) {

                
                self.disable();

            }

            
            if(self._ariaAccessibility) {

              
                self._ariaAccessibility();

            }

            self.isMobile = self.options["isMobile"]();

            if(self._mobile) {

              
                self._mobile();

            }

         
            if(self.options["native"]) {

              
                this._applyNativeSelect();

            }

            
            self.triggerEvent("create");

           
            return self;

        },

  
        _createDropdownButton: function() {

            var self = this,
                originalElemId = self.originalElemId = self.originalElem.id || "",
                originalElemValue = self.originalElemValue = self.originalElem.value || "",
                originalElemName = self.originalElemName = self.originalElem.name || "",
                copyClasses = self.options["copyClasses"],
                selectboxClasses = self.selectBox.attr("class") || "";

           
            self.dropdownText = $("<span/>", {

               
                "id": originalElemId && originalElemId + "SelectBoxItText",

                "class": "selectboxit-text",

                
                "unselectable": "on",

               
                "text": self.firstSelectItem.text()

            }).

            
            attr("data-val", originalElemValue);

            self.dropdownImageContainer = $("<span/>", {

                "class": "selectboxit-option-icon-container"

            });

            
            self.dropdownImage = $("<i/>", {

                
                "id": originalElemId && originalElemId + "SelectBoxItDefaultIcon",

                "class": "selectboxit-default-icon",

               
                "unselectable": "on"

            });

           
            self.dropdown = $("<span/>", {

                
                "id": originalElemId && originalElemId + "SelectBoxIt",

                "class": "selectboxit " + (copyClasses === "button" ? selectboxClasses: "") + " " + (self.selectBox.prop("disabled") ? self.theme["disabled"]: self.theme["enabled"]),

                
                "name": originalElemName,

                
                "tabindex": self.selectBox.attr("tabindex") || "0",

                
                "unselectable": "on"

            }).

           
            append(self.dropdownImageContainer.append(self.dropdownImage)).append(self.dropdownText);

            
            self.dropdownContainer = $("<span/>", {

                "id": originalElemId && originalElemId + "SelectBoxItContainer",

                "class": 'selectboxit-container ' + self.theme.container + ' ' + (copyClasses === "container" ? selectboxClasses: "")

            }).

           
            append(self.dropdown);

            
            return self;

        },


        _createUnorderedList: function() {

           
            var self = this,

                dataDisabled,

                optgroupClass,

                optgroupElement,

                iconClass,

                iconUrl,

                iconUrlClass,

                iconUrlStyle,

              
                currentItem = "",

                originalElemId = self.originalElemId || "",

                
                createdList = $("<ul/>", {

                    
                    "id": originalElemId && originalElemId + "SelectBoxItOptions",

                    "class": "selectboxit-options",

                    
                    "tabindex": -1

                }),

                currentDataSelectedText,

                currentDataText,

                currentDataSearch,

                currentText,

                currentOption,

                parent;

           
            if (!self.options["showFirstOption"]) {

               
                self.selectItems.first().attr("disabled", "disabled");

               
                self.selectItems = self.selectBox.find("option").slice(1);

            }

           
            self.selectItems.each(function(index) {

                currentOption = $(this);

                optgroupClass = "";

                optgroupElement = "";

                dataDisabled = currentOption.prop("disabled");

                iconClass = currentOption.attr("data-icon") || "";

                iconUrl = currentOption.attr("data-iconurl") || "";

                iconUrlClass = iconUrl ? "selectboxit-option-icon-url": "";

                iconUrlStyle = iconUrl ? 'style="background-image:url(\'' + iconUrl + '\');"': "";

                currentDataSelectedText = currentOption.attr("data-selectedtext");

                currentDataText = currentOption.attr("data-text");

                currentText = currentDataText ? currentDataText: currentOption.text();

                parent = currentOption.parent();

               

                if(parent.is("optgroup")) {

                    optgroupClass = "selectboxit-optgroup-option";

                    if(currentOption.index() === 0) {

                         optgroupElement = '<span class="selectboxit-optgroup-header ' + parent.first().attr("class") + '"data-disabled="true">' + parent.first().attr("label") + '</span>';

                    }

                }

               
                currentItem += optgroupElement + '<li data-id="' + index + '" data-val="' + this.value + '" data-disabled="' + dataDisabled + '" class="' + optgroupClass + " selectboxit-option " + ($(this).attr("class") || "") + '"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon ' + iconClass + ' ' + (iconUrlClass || self.theme["container"]) + '"' + iconUrlStyle + '></i></span>' + (self.options["html"] ? currentText: self.htmlEscape(currentText)) + '</a></li>';

                currentDataSearch = currentOption.attr("data-search");

                
                self.textArray[index] = dataDisabled ? "": currentDataSearch ? currentDataSearch: currentText;

                if (this.selected) {

                    
                    self._setText(self.dropdownText, currentDataSelectedText || currentText);

                   
                    self.currentFocus = index;

                }

            });

            
            if ((self.options["defaultText"] || self.selectBox.attr("data-text"))) {

                var defaultedText = self.options["defaultText"] || self.selectBox.attr("data-text");

                
                self._setText(self.dropdownText, defaultedText);

                self.options["defaultText"] = defaultedText;

            }

            
            createdList.append(currentItem);

            
            self.list = createdList;

           
            self.dropdownContainer.append(self.list);

           
            self.listItems = self.list.children("li");

            self.listAnchors = self.list.find("a");

            
            self.listItems.first().addClass("selectboxit-option-first");

           
            self.listItems.last().addClass("selectboxit-option-last");

           
            self.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(self.theme["disabled"]);

            self.dropdownImage.addClass(self.selectBox.attr("data-icon") || self.options["defaultIcon"] || self.listItems.eq(self.currentFocus).find("i").attr("class"));

            self.dropdownImage.attr("style", self.listItems.eq(self.currentFocus).find("i").attr("style"));

           
            return self;

        },


        _replaceSelectBox: function() {

            var self = this,
                height,
                originalElemId = self.originalElem.id || "",
                size = self.selectBox.attr("data-size"),
                listSize = self.listSize = size === undefined ? "auto" : size === "0" || "size" === "auto" ? "auto" : +size,
                downArrowContainerWidth,
                dropdownImageWidth;

           
            self.selectBox.css("display", "none").

            
            after(self.dropdownContainer);

            self.dropdownContainer.appendTo('body').

            addClass('selectboxit-rendering');

          
            height = self.dropdown.height();

           
            self.downArrow = $("<i/>", {

                
                "id": originalElemId && originalElemId + "SelectBoxItArrow",

                "class": "selectboxit-arrow",

                
                "unselectable": "on"

            });

            
            self.downArrowContainer = $("<span/>", {

               
                "id": originalElemId && originalElemId + "SelectBoxItArrowContainer",

                "class": "selectboxit-arrow-container",

                
                "unselectable": "on"

            }).

            
            append(self.downArrow);

            
            self.dropdown.append(self.downArrowContainer);

           
            self.listItems.removeClass("selectboxit-selected").eq(self.currentFocus).addClass("selectboxit-selected");

           
            downArrowContainerWidth = self.downArrowContainer.outerWidth(true);

           
            dropdownImageWidth = self.dropdownImage.outerWidth(true);

            
            if(self.options["autoWidth"]) {

                
                self.dropdown.css({ "width": "auto" }).css({

                    "width": self.list.outerWidth(true) + downArrowContainerWidth + dropdownImageWidth

                });

                self.list.css({

                    "min-width": self.dropdown.width()

                });

            }

            
            self.dropdownText.css({

                "max-width": self.dropdownContainer.outerWidth(true) - (downArrowContainerWidth + dropdownImageWidth)

            });

           
            self.selectBox.after(self.dropdownContainer);

            self.dropdownContainer.removeClass('selectboxit-rendering');

            if($.type(listSize) === "number") {

                
                self.maxHeight = self.listAnchors.outerHeight(true) * listSize;

            }

           
            return self;

        },


        _scrollToView: function(type) {

            var self = this,

                currentOption = self.listItems.eq(self.currentFocus),

             
                listScrollTop = self.list.scrollTop(),

              
                currentItemHeight = currentOption.height(),

              
                currentTopPosition = currentOption.position().top,

                absCurrentTopPosition = Math.abs(currentTopPosition),

              
                listHeight = self.list.height(),

                currentText;

          
            if (type === "search") {

             
                if (listHeight - currentTopPosition < currentItemHeight) {

                    
                    self.list.scrollTop(listScrollTop + (currentTopPosition - (listHeight - currentItemHeight)));

                }

                
                else if (currentTopPosition < -1) {

                    self.list.scrollTop(currentTopPosition - currentItemHeight);

                }
            }

           
            else if (type === "up") {

                
                if (currentTopPosition < -1) {

                    self.list.scrollTop(listScrollTop - absCurrentTopPosition);

                }
            }

            
            else if (type === "down") {

               
                if (listHeight - currentTopPosition < currentItemHeight) {

                    
                    self.list.scrollTop((listScrollTop + (absCurrentTopPosition - listHeight + currentItemHeight)));

                }
            }

          
            return self;

        },

   
        _callbackSupport: function(callback) {

            var self = this;

            
            if ($.isFunction(callback)) {

                
                callback.call(self, self.dropdown);

            }

          
            return self;

        },

       
        _setText: function(elem, currentText) {

            var self = this;

            if(self.options["html"]) {

                elem.html(currentText);

            }

            else {

                elem.text(currentText);

            }

            return self;

        },

      
        open: function(callback) {

            var self = this,
                showEffect = self.options["showEffect"],
                showEffectSpeed = self.options["showEffectSpeed"],
                showEffectOptions = self.options["showEffectOptions"],
                isNative = self.options["native"],
                isMobile = self.isMobile;

        
            if(!self.listItems.length || self.dropdown.hasClass(self.theme["disabled"])) {

                return self;

            }

           
            if((!isNative && !isMobile) && !this.list.is(":visible")) {

               
                self.triggerEvent("open");

                if (self._dynamicPositioning && self.options["dynamicPositioning"]) {

                   
                    self._dynamicPositioning();

                }

            
                if(showEffect === "none") {

                    
                    self.list.show();

                }

              
                else if(showEffect === "show" || showEffect === "slideDown" || showEffect === "fadeIn") {

                    
                    self.list[showEffect](showEffectSpeed);

                }

               
                else {

                    
                    self.list.show(showEffect, showEffectOptions, showEffectSpeed);

                }

                self.list.promise().done(function() {

                    
                    self._scrollToView("search");

                });

            }

           
            self._callbackSupport(callback);

          
            return self;

        },


        close: function(callback) {

            var self = this,
                hideEffect = self.options["hideEffect"],
                hideEffectSpeed = self.options["hideEffectSpeed"],
                hideEffectOptions = self.options["hideEffectOptions"],
                isNative = self.options["native"],
                isMobile = self.isMobile;

          
            if((!isNative && !isMobile) && self.list.is(":visible")) {

                
                self.triggerEvent("close");

             
                if(hideEffect === "none") {

                    self.list.hide();

                }

               
                else if(hideEffect === "hide" || hideEffect === "slideUp" || hideEffect === "fadeOut") {

                    self.list[hideEffect](hideEffectSpeed);

                }

               
                else {

                  
                    self.list.hide(hideEffect, hideEffectOptions, hideEffectSpeed);

                }

            }

           
            self._callbackSupport(callback);

            
            return self;

        },

        toggle: function() {

            var self = this,
                listIsVisible = self.list.is(":visible");

            if(listIsVisible) {

                self.close();

            }

            else if(!listIsVisible) {

                self.open();

            }

        },

  
        _keyMappings: {

            "38": "up",

            "40": "down",

            "13": "enter",

            "8": "backspace",

            "9": "tab",

            "32": "space",

            "27": "esc"

        },


        _keydownMethods: function() {

            var self = this,
                moveToOption = self.list.is(":visible") || !self.options["keydownOpen"];

            return {

                "down": function() {

                   
                    if (self.moveDown && moveToOption) {

                        self.moveDown();

                    }

                },

                "up": function() {

                    
                    if (self.moveUp && moveToOption) {

                        self.moveUp();

                    }

                },

                "enter": function() {

                    var activeElem = self.listItems.eq(self.currentFocus);

                   
                    self._update(activeElem);

                    if (activeElem.attr("data-preventclose") !== "true") {

                        
                        self.close();

                    }

                    
                    self.triggerEvent("enter");

                },

                "tab": function() {

                    
                    self.triggerEvent("tab-blur");

                    
                    self.close();

                },

                "backspace": function() {

                   
                    self.triggerEvent("backspace");

                },

                "esc": function() {

                    
                    self.close();

                }

            };

        },


 
        _eventHandlers: function() {

           
            var self = this,
                nativeMousedown = self.options["nativeMousedown"],
                customShowHideEvent = self.options["customShowHideEvent"],
                currentDataText,
                currentText,
                focusClass = self.focusClass,
                hoverClass = self.hoverClass,
                openClass = self.openClass;

           
            this.dropdown.on({

                
                "click.selectBoxIt": function() {

                    
                    self.dropdown.trigger("focus", true);

                   
                    if (!self.originalElem.disabled) {

                       
                        self.triggerEvent("click");

                        if(!nativeMousedown && !customShowHideEvent) {

                            self.toggle();

                        }

                    }

                },

                
                "mousedown.selectBoxIt": function() {

                    
                    $(this).data("mdown", true);

                    self.triggerEvent("mousedown");

                    if(nativeMousedown && !customShowHideEvent) {

                        self.toggle();

                    }

                },

               
                "mouseup.selectBoxIt": function() {

                    self.triggerEvent("mouseup");

                },

                
                "blur.selectBoxIt": function() {

                    
                    if (self.blur) {

                        
                        self.triggerEvent("blur");

                       
                        self.close();

                        $(this).removeClass(focusClass);

                    }

                },

                "focus.selectBoxIt": function(event, internal) {

                    
                    var mdown = $(this).data("mdown");

                    
                    $(this).removeData("mdown");

                   
                    if (!mdown && !internal) {

                        setTimeout(function() {

                            
                            self.triggerEvent("tab-focus");

                        }, 0);

                    }

                    
                    if(!internal) {

                        if(!$(this).hasClass(self.theme["disabled"])) {

                            $(this).addClass(focusClass);

                        }

                        
                        self.triggerEvent("focus");

                    }

                },

             
                "keydown.selectBoxIt": function(e) {

                    
                    var currentKey = self._keyMappings[e.keyCode],

                        keydownMethod = self._keydownMethods()[currentKey];

                    if(keydownMethod) {

                        keydownMethod();

                        if(self.options["keydownOpen"] && (currentKey === "up" || currentKey === "down")) {

                            self.open();

                        }

                    }

                    if(keydownMethod && currentKey !== "tab") {

                        e.preventDefault();

                    }

                },

                
                "keypress.selectBoxIt": function(e) {

                    
                    var currentKey = e.charCode || e.keyCode,

                        key = self._keyMappings[e.charCode || e.keyCode],

                       
                        alphaNumericKey = String.fromCharCode(currentKey);

                   
                    if (self.search && (!key || (key && key === "space"))) {

                       
                        self.search(alphaNumericKey, true, true);

                    }

                    if(key === "space") {

                        e.preventDefault();

                    }

                },

                
                "mouseenter.selectBoxIt": function() {

                   
                    self.triggerEvent("mouseenter");

                },

               
                "mouseleave.selectBoxIt": function() {

                   
                    self.triggerEvent("mouseleave");

                }

            });

            
            self.list.on({

                
                "mouseover.selectBoxIt": function() {

                    
                    self.blur = false;

                },

                
                "mouseout.selectBoxIt": function() {

                   
                    self.blur = true;

                },

                
                "focusin.selectBoxIt": function() {

                    
                    self.dropdown.trigger("focus", true);

                }

            });

            
            self.list.on({

                "mousedown.selectBoxIt": function() {

                    self._update($(this));

                    self.triggerEvent("option-click");

                   
                    if ($(this).attr("data-disabled") === "false" && $(this).attr("data-preventclose") !== "true") {

                        
                        self.close();

                    }

                    setTimeout(function() {

                        self.dropdown.trigger('focus', true);

                    }, 0);

                },

               
               "focusin.selectBoxIt": function() {

                    
                    self.listItems.not($(this)).removeAttr("data-active");

                    $(this).attr("data-active", "");

                    var listIsHidden = self.list.is(":hidden");

                    if((self.options["searchWhenHidden"] && listIsHidden) || self.options["aggressiveChange"] || (listIsHidden && self.options["selectWhenHidden"])) {

                        self._update($(this));

                    }

                   
                   $(this).addClass(focusClass);

                },

                
                "mouseup.selectBoxIt": function() {

                    if(nativeMousedown && !customShowHideEvent) {

                        self._update($(this));

                        self.triggerEvent("option-mouseup");

                       
                        if ($(this).attr("data-disabled") === "false" && $(this).attr("data-preventclose") !== "true") {

                            
                            self.close();

                        }

                    }

                },

                
                "mouseenter.selectBoxIt": function() {

                    
                    if($(this).attr("data-disabled") === "false") {

                        self.listItems.removeAttr("data-active");

                        $(this).addClass(focusClass).attr("data-active", "");

                       
                        self.listItems.not($(this)).removeClass(focusClass);

                        $(this).addClass(focusClass);

                        self.currentFocus = +$(this).attr("data-id");

                    }

                },

               
                "mouseleave.selectBoxIt": function() {

                   
                    if($(this).attr("data-disabled") === "false") {

                        
                        self.listItems.not($(this)).removeClass(focusClass).removeAttr("data-active");

                        $(this).addClass(focusClass);

                        self.currentFocus = +$(this).attr("data-id");

                    }

                },

               
                "blur.selectBoxIt": function() {

                   
                    $(this).removeClass(focusClass);

                }

            }, ".selectboxit-option");

           
            self.list.on({

                "click.selectBoxIt": function(ev) {

                    
                    ev.preventDefault();

                }

            }, "a");

           
            self.selectBox.on({

                
                "change.selectBoxIt, internal-change.selectBoxIt": function(event, internal) {

                    var currentOption,
                        currentDataSelectedText;

                    
                    if(!internal) {

                        currentOption = self.list.find('li[data-val="' + self.originalElem.value + '"]');

                       
                        if(currentOption.length) {

                            self.listItems.eq(self.currentFocus).removeClass(self.focusClass);

                            self.currentFocus = +currentOption.attr("data-id");

                        }

                    }

                    currentOption = self.listItems.eq(self.currentFocus);

                    currentDataSelectedText = currentOption.attr("data-selectedtext");

                    currentDataText = currentOption.attr("data-text");

                    currentText = currentDataText ?  currentDataText: currentOption.find("a").text();

                   
                    self._setText(self.dropdownText, currentDataSelectedText || currentText);

                    self.dropdownText.attr("data-val", self.originalElem.value);

                    if(currentOption.find("i").attr("class")) {

                        self.dropdownImage.attr("class", currentOption.find("i").attr("class")).addClass("selectboxit-default-icon");

                        self.dropdownImage.attr("style", currentOption.find("i").attr("style"));
                    }

                    
                    self.triggerEvent("changed");

                },

                
                "disable.selectBoxIt": function() {

                    
                    self.dropdown.addClass(self.theme["disabled"]);

                },

               
                "enable.selectBoxIt": function() {

                    
                    self.dropdown.removeClass(self.theme["disabled"]);

                },

                
                "open.selectBoxIt": function() {

                    var currentElem = self.list.find("li[data-val='" + self.dropdownText.attr("data-val") + "']"),
                        activeElem;

                    
                    if(!currentElem.length) {

                        
                        currentElem = self.listItems.not("[data-disabled=true]").first();

                    }

                    self.currentFocus = +currentElem.attr("data-id");

                    activeElem = self.listItems.eq(self.currentFocus);

                    self.dropdown.addClass(openClass).

                   
                    removeClass(hoverClass).addClass(focusClass);

                    self.listItems.removeClass(self.selectedClass).

                    removeAttr("data-active").not(activeElem).removeClass(focusClass);

                    activeElem.addClass(self.selectedClass).addClass(focusClass);

                    if(self.options.hideCurrent) {

                        self.listItems.show();

                        activeElem.hide();

                    }

                },

                "close.selectBoxIt": function() {

                    
                    self.dropdown.removeClass(openClass);

                },

                "blur.selectBoxIt": function() {

                    self.dropdown.removeClass(focusClass);

                },

                
                "mouseenter.selectBoxIt": function() {

                    if(!$(this).hasClass(self.theme["disabled"])) {
                        self.dropdown.addClass(hoverClass);
                    }

                },

               
                "mouseleave.selectBoxIt": function() {

                   
                    self.dropdown.removeClass(hoverClass);

                },

               
                "destroy": function(ev) {

                    
                    ev.preventDefault();

                   
                    ev.stopPropagation();

                }

            });

           
            return self;

        },

        _update: function(elem) {

            var self = this,
                currentDataSelectedText,
                currentDataText,
                currentText,
                defaultText = self.options["defaultText"] || self.selectBox.attr("data-text"),
                currentElem = self.listItems.eq(self.currentFocus);

            if (elem.attr("data-disabled") === "false") {

                currentDataSelectedText = self.listItems.eq(self.currentFocus).attr("data-selectedtext");

                currentDataText = currentElem.attr("data-text");

                currentText = currentDataText ? currentDataText: currentElem.text();

               
                if ((defaultText && self.options["html"] ? self.dropdownText.html() === defaultText: self.dropdownText.text() === defaultText) && self.selectBox.val() === elem.attr("data-val")) {

                    self.triggerEvent("change");

                }

                else {

                   
                    self.selectBox.val(elem.attr("data-val"));

                  
                    self.currentFocus = +elem.attr("data-id");

                   
                    if (self.originalElem.value !== self.dropdownText.attr("data-val")) {

                        self.triggerEvent("change");

                    }

                }

            }

        },


        _addClasses: function(obj) {

            var self = this,

                focusClass = self.focusClass = obj.focus,

                hoverClass = self.hoverClass = obj.hover,

                buttonClass = obj.button,

                listClass = obj.list,

                arrowClass = obj.arrow,

                containerClass = obj.container,

                openClass = self.openClass = obj.open;

            self.selectedClass = "selectboxit-selected";

            self.downArrow.addClass(self.selectBox.attr("data-downarrow") || self.options["downArrowIcon"] || arrowClass);

        
            self.dropdownContainer.addClass(containerClass);

           
            self.dropdown.addClass(buttonClass);

           
            self.list.addClass(listClass);

           
            return self;

        },


        refresh: function(callback, internal) {

            var self = this;

          
            self._destroySelectBoxIt()._create(true);

            if(!internal) {
                self.triggerEvent("refresh");
            }

            self._callbackSupport(callback);

        
            return self;

        },


        htmlEscape: function(str) {

            return String(str)
                .replace(/&/g, "&amp;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");

        },


        triggerEvent: function(eventName) {

            var self = this,
              
                currentIndex = self.options["showFirstOption"] ? self.currentFocus : ((self.currentFocus - 1) >= 0 ? self.currentFocus: 0);

            
            self.selectBox.trigger(eventName, { "selectbox": self.selectBox, "selectboxOption": self.selectItems.eq(currentIndex), "dropdown": self.dropdown, "dropdownOption": self.listItems.eq(self.currentFocus) });

           
            return self;

        },


        _copyAttributes: function() {

            var self = this;

            if(self._addSelectBoxAttributes) {

                self._addSelectBoxAttributes();

            }

            return self;

        },


        _realOuterWidth: function(elem) {

            if(elem.is(":visible")) {

                return elem.outerWidth(true);

            }

            var self = this,
                clonedElem = elem.clone(),
                outerWidth;

            clonedElem.css({

                "visibility": "hidden",

                "display": "block",

                "position": "absolute"

            }).appendTo("body");

            outerWidth = clonedElem.outerWidth(true);

            clonedElem.remove();

            return outerWidth;
        }

    });

  
    var selectBoxIt = $.selectBox.selectBoxIt.prototype;



    selectBoxIt.add = function(data, callback) {

        this._populate(data, function(data) {

            var self = this,
                dataType = $.type(data),
                value,
                x = 0,
                dataLength,
                elems = [],
                isJSON = self._isJSON(data),
                parsedJSON = isJSON && self._parseJSON(data);

           
            if(data && (dataType === "array" || (isJSON && parsedJSON.data && $.type(parsedJSON.data) === "array")) || (dataType === "object" && data.data && $.type(data.data) === "array")) {

               
                if(self._isJSON(data)) {

                    
                    data = parsedJSON;

                }

                
                if(data.data) {

                   
                    data = data.data;

                }

             
                for(dataLength = data.length; x <= dataLength - 1; x += 1) {

                    
                    value = data[x];

                   
                    if($.isPlainObject(value)) {

                      
                        elems.push($("<option/>", value));

                    }

                    
                    else if($.type(value) === "string") {

                       
                        elems.push($("<option/>", { text: value, value: value }));

                    }

                }

                
                self.selectBox.append(elems);

            }

            
            else if(data && dataType === "string" && !self._isJSON(data)) {

               
                self.selectBox.append(data);

            }

            else if(data && dataType === "object") {

                
                self.selectBox.append($("<option/>", data));

            }

            else if(data && self._isJSON(data) && $.isPlainObject(self._parseJSON(data))) {

                
                self.selectBox.append($("<option/>", self._parseJSON(data)));

            }

            
            if(self.dropdown) {

               
                self.refresh(function() {

                    
                    self._callbackSupport(callback);

                }, true);

            } else {

               
                self._callbackSupport(callback);

            }

          
            return self;

        });

    };


    selectBoxIt._parseJSON = function(data) {

        return (JSON && JSON.parse && JSON.parse(data)) || $.parseJSON(data);

    };


    selectBoxIt._isJSON = function(data) {

        var self = this,
            json;

        try {

            json = self._parseJSON(data);

         
            return true;

        } catch (e) {

        
            return false;

        }

    };



    selectBoxIt._populate = function(data, callback) {

        var self = this;

        data = $.isFunction(data) ? data.call() : data;

        if(self.isDeferred(data)) {

            data.done(function(returnedData) {

                callback.call(self, returnedData);

            });

        }

        else {

            callback.call(self, data);

        }

       
        return self;

    };



    selectBoxIt._ariaAccessibility = function() {

        var self = this,
            dropdownLabel = $("label[for='" + self.originalElem.id + "']");

      
        self.dropdownContainer.attr({

            
            "role": "combobox",

           
            "aria-autocomplete": "list",

            "aria-haspopup": "true",

            
            "aria-expanded": "false",

            
            "aria-owns": self.list[0].id

        });

        self.dropdownText.attr({

            "aria-live": "polite"

        });

      
        self.dropdown.on({

            
            "disable.selectBoxIt" : function() {

               
                self.dropdownContainer.attr("aria-disabled", "true");

            },

          
            "enable.selectBoxIt" : function() {

               
                self.dropdownContainer.attr("aria-disabled", "false");

            }

        });

        if(dropdownLabel.length) {

          
            self.dropdownContainer.attr("aria-labelledby", dropdownLabel[0].id);

        }

     
        self.list.attr({

           
            "role": "listbox",

           
            "aria-hidden": "true"

        });

       
        self.listItems.attr({

          
            "role": "option"

        });

       
        self.selectBox.on({

           
            "open.selectBoxIt": function() {

               
                self.list.attr("aria-hidden", "false");

                
                self.dropdownContainer.attr("aria-expanded", "true");

            },

          
            "close.selectBoxIt": function() {

               
                self.list.attr("aria-hidden", "true");

               
                self.dropdownContainer.attr("aria-expanded", "false");

            }

        });

       
        return self;

    };



    selectBoxIt._addSelectBoxAttributes = function() {

       
        var self = this;

       
        self._addAttributes(self.selectBox.prop("attributes"), self.dropdown);

      
        self.selectItems.each(function(iterator) {

            
            self._addAttributes($(this).prop("attributes"), self.listItems.eq(iterator));

        });

       
        return self;

    };


    selectBoxIt._addAttributes = function(arr, elem) {

      
        var self = this,
            whitelist = self.options["copyAttributes"];

       
        if(arr.length) {

           
            $.each(arr, function(iterator, property) {

                
                var propName = (property.name).toLowerCase(), propValue = property.value;

               
                if(propValue !== "null" && ($.inArray(propName, whitelist) !== -1 || propName.indexOf("data") !== -1)) {

                  
                    elem.attr(propName, propValue);

                }

            });

        }

       
        return self;

    };


selectBoxIt.destroy = function(callback) {

    
    var self = this;

    self._destroySelectBoxIt();

   
    self.widgetProto.destroy.call(self);

   
    self._callbackSupport(callback);

    
    return self;

};



selectBoxIt._destroySelectBoxIt = function() {

    
    var self = this;

   
    self.dropdown.off(".selectBoxIt");

   
    if ($.contains(self.dropdownContainer[0], self.originalElem)) {

        
        self.dropdownContainer.before(self.selectBox);

    }

    
    self.dropdownContainer.remove();

   
    self.selectBox.removeAttr("style").attr("style", self.selectBoxStyles);

    
    self.selectBox.show();

   
    self.triggerEvent("destroy");

   
    return self;

};



    selectBoxIt.disable = function(callback) {

        var self = this;

        if(!self.options["disabled"]) {

           
            self.close();

            
            self.selectBox.attr("disabled", "disabled");

          
            self.dropdown.removeAttr("tabindex").

           
            removeClass(self.theme["enabled"]).

            
            addClass(self.theme["disabled"]);

            self.setOption("disabled", true);

           
            self.triggerEvent("disable");

        }

        
        self._callbackSupport(callback);

       
        return self;

    };



    selectBoxIt.disableOption = function(index, callback) {

        var self = this, currentSelectBoxOption, hasNextEnabled, hasPreviousEnabled, type = $.type(index);

       
        if(type === "number") {

         
            self.close();

           
            currentSelectBoxOption = self.selectBox.find("option").eq(index);

           
            self.triggerEvent("disable-option");

           
            currentSelectBoxOption.attr("disabled", "disabled");

            
            self.listItems.eq(index).attr("data-disabled", "true").

            
            addClass(self.theme["disabled"]);

           
            if(self.currentFocus === index) {

                hasNextEnabled = self.listItems.eq(self.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;

                hasPreviousEnabled = self.listItems.eq(self.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;

               
                if(hasNextEnabled) {

                    
                    self.moveDown();

                }

               
                else if(hasPreviousEnabled) {

                    
                    self.moveUp();

                }

               
                else {

                    
                    self.disable();

                }

            }

        }

      
        self._callbackSupport(callback);

       
        return self;

    };



    selectBoxIt._isDisabled = function(callback) {

        var self = this;

       
        if (self.originalElem.disabled) {

           
            self.disable();

        }

     
        return self;

    };



    selectBoxIt._dynamicPositioning = function() {

        var self = this;

        
        if($.type(self.listSize) === "number") {

         
            self.list.css("max-height", self.maxHeight || "none");

        }

       
        else {

            
            var listOffsetTop = self.dropdown.offset().top,

               
                listHeight = self.list.data("max-height") || self.list.outerHeight(),

                
                selectBoxHeight = self.dropdown.outerHeight(),

                viewport = self.options["viewport"],

                viewportHeight = viewport.height(),

                viewportScrollTop = $.isWindow(viewport.get(0)) ? viewport.scrollTop() : viewport.offset().top,

                topToBottom = (listOffsetTop + selectBoxHeight + listHeight <= viewportHeight + viewportScrollTop),

                bottomReached = !topToBottom;

            if(!self.list.data("max-height")) {

              self.list.data("max-height", self.list.outerHeight());

            }

            
            if (!bottomReached) {

                self.list.css("max-height", listHeight);

                
                self.list.css("top", "auto");

            }

           
            else if((self.dropdown.offset().top - viewportScrollTop) >= listHeight) {

                self.list.css("max-height", listHeight);

                
                self.list.css("top", (self.dropdown.position().top - self.list.outerHeight()));

            }

            
            else {

                var outsideBottomViewport = Math.abs((listOffsetTop + selectBoxHeight + listHeight) - (viewportHeight + viewportScrollTop)),

                    outsideTopViewport = Math.abs((self.dropdown.offset().top - viewportScrollTop) - listHeight);

                
                if(outsideBottomViewport < outsideTopViewport) {

                    self.list.css("max-height", listHeight - outsideBottomViewport - (selectBoxHeight/2));

                    self.list.css("top", "auto");

                }

              
                else {

                    self.list.css("max-height", listHeight - outsideTopViewport - (selectBoxHeight/2));

                    
                    self.list.css("top", (self.dropdown.position().top - self.list.outerHeight()));

                }

            }

        }

      
        return self;

    };


    selectBoxIt.enable = function(callback) {

        var self = this;

        if(self.options["disabled"]) {

           
            self.triggerEvent("enable");

          
            self.selectBox.removeAttr("disabled");

          
            self.dropdown.attr("tabindex", 0).

          
            removeClass(self.theme["disabled"]).

           
            addClass(self.theme["enabled"]);

            self.setOption("disabled", false);

           
            self._callbackSupport(callback);

        }

        
        return self;

    };



    selectBoxIt.enableOption = function(index, callback) {

        var self = this, currentSelectBoxOption, currentIndex = 0, hasNextEnabled, hasPreviousEnabled, type = $.type(index);

        
        if(type === "number") {

            
            currentSelectBoxOption = self.selectBox.find("option").eq(index);

            
            self.triggerEvent("enable-option");

            
            currentSelectBoxOption.removeAttr("disabled");

            
            self.listItems.eq(index).attr("data-disabled", "false").

            
            removeClass(self.theme["disabled"]);

        }

       
        self._callbackSupport(callback);

       
        return self;

    };



    selectBoxIt.moveDown = function(callback) {

        var self = this;

       
        self.currentFocus += 1;

       
        var disabled = self.listItems.eq(self.currentFocus).attr("data-disabled") === "true" ? true: false,

            hasNextEnabled = self.listItems.eq(self.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;

        
        if (self.currentFocus === self.listItems.length) {

            
            self.currentFocus -= 1;

        }

        
        else if (disabled && hasNextEnabled) {

            
            self.listItems.eq(self.currentFocus - 1).blur();

           
            self.moveDown();

          
            return;

        }

       
        else if (disabled && !hasNextEnabled) {

            self.currentFocus -= 1;

        }

        
        else {

      
            self.listItems.eq(self.currentFocus - 1).blur().end().

           
            eq(self.currentFocus).focusin();

            
            self._scrollToView("down");

            
            self.triggerEvent("moveDown");

        }

        
        self._callbackSupport(callback);

       
        return self;

    };


    selectBoxIt.moveUp = function(callback) {

        var self = this;

       
        self.currentFocus -= 1;

        
        var disabled = self.listItems.eq(self.currentFocus).attr("data-disabled") === "true" ? true: false,

            hasPreviousEnabled = self.listItems.eq(self.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;

        
        if (self.currentFocus === -1) {

            
            self.currentFocus += 1;

        }

       
        else if (disabled && hasPreviousEnabled) {

           
            self.listItems.eq(self.currentFocus + 1).blur();

           
            self.moveUp();

          
            return;

        }

        else if (disabled && !hasPreviousEnabled) {

            self.currentFocus += 1;

        }

        
        else {

        
            self.listItems.eq(this.currentFocus + 1).blur().end().

            
            eq(self.currentFocus).focusin();

            
            self._scrollToView("up");

            
            self.triggerEvent("moveUp");

        }

      
        self._callbackSupport(callback);

      
        return self;

    };



    selectBoxIt._setCurrentSearchOption = function(currentOption) {

        var self = this;

      
        if ((self.options["aggressiveChange"] || self.options["selectWhenHidden"] || self.listItems.eq(currentOption).is(":visible")) && self.listItems.eq(currentOption).data("disabled") !== true) {

          
            self.listItems.eq(self.currentFocus).blur();

           
            self.currentIndex = currentOption;

            
            self.currentFocus = currentOption;

            
            self.listItems.eq(self.currentFocus).focusin();

           
            self._scrollToView("search");

           
            self.triggerEvent("search");

        }

      
        return self;

    };


    selectBoxIt._searchAlgorithm = function(currentIndex, alphaNumeric) {

        var self = this,

         
            matchExists = false,

           
            x,

          
            y,

          
            arrayLength,

            
            currentSearch,

           
            textArray = self.textArray,

           
            currentText = self.currentText;

     
        for (x = currentIndex, arrayLength = textArray.length; x < arrayLength; x += 1) {

            currentSearch = textArray[x];

           
            for (y = 0; y < arrayLength; y += 1) {

                
                if (textArray[y].search(alphaNumeric) !== -1) {

                   
                    matchExists = true;

                    
                    y = arrayLength;

                }

            }

           
            if (!matchExists) {

               
                self.currentText = self.currentText.charAt(self.currentText.length - 1).

                
                replace(/[|()\[{.+*?$\\]/g, "\\$0");

                currentText = self.currentText;

            }

           
            alphaNumeric = new RegExp(currentText, "gi");

          
            if (currentText.length < 3) {

                alphaNumeric = new RegExp(currentText.charAt(0), "gi");

                
                if ((currentSearch.charAt(0).search(alphaNumeric) !== -1)) {

                    
                    self._setCurrentSearchOption(x);

                    if((currentSearch.substring(0, currentText.length).toLowerCase() !== currentText.toLowerCase()) || self.options["similarSearch"]) {

                        
                        self.currentIndex += 1;

                    }

                  
                    return false;

                }

            }

           
            else {

                
                if ((currentSearch.search(alphaNumeric) !== -1)) {

                    
                    self._setCurrentSearchOption(x);

                    
                    return false;

                }

            }

         
            if (currentSearch.toLowerCase() === self.currentText.toLowerCase()) {

                
                self._setCurrentSearchOption(x);

                
                self.currentText = "";

                
                return false;

            }

        }

    
        return true;

    };


    selectBoxIt.search = function(alphaNumericKey, callback, rememberPreviousSearch) {

        var self = this;

       
        if (rememberPreviousSearch) {

            
            self.currentText += alphaNumericKey.replace(/[|()\[{.+*?$\\]/g, "\\$0");

        }

        else {

            
            self.currentText = alphaNumericKey.replace(/[|()\[{.+*?$\\]/g, "\\$0");

        }

        
        var searchResults = self._searchAlgorithm(self.currentIndex, new RegExp(self.currentText, "gi"));

        
        if (searchResults) {

           
            self._searchAlgorithm(0, self.currentText);

        }

        
        self._callbackSupport(callback);

       
        return self;

    };

    selectBoxIt._updateMobileText = function() {

        var self = this,
            currentOption,
            currentDataText,
            currentText;

        currentOption = self.selectBox.find("option").filter(":selected");

        currentDataText = currentOption.attr("data-text");

        currentText = currentDataText ? currentDataText: currentOption.text();

      
        self._setText(self.dropdownText, currentText);

        if(self.list.find('li[data-val="' + currentOption.val() + '"]').find("i").attr("class")) {

           self.dropdownImage.attr("class", self.list.find('li[data-val="' + currentOption.val() + '"]').find("i").attr("class")).addClass("selectboxit-default-icon");

        }

    };



    selectBoxIt._applyNativeSelect = function() {

       
        var self = this;

       
        self.dropdownContainer.append(self.selectBox);

        self.dropdown.attr("tabindex", "-1");

        
        self.selectBox.css({

            "display": "block",

            "visibility": "visible",

            "width": self._realOuterWidth(self.dropdown),

            "height": self.dropdown.outerHeight(),

            "opacity": "0",

            "position": "absolute",

            "top": "0",

            "left": "0",

            "cursor": "pointer",

            "z-index": "999999",

            "margin": self.dropdown.css("margin"),

            "padding": "0",

            "-webkit-appearance": "menulist-button"

        });

        if(self.originalElem.disabled) {

            self.triggerEvent("disable");

        }

        return this;

    };


    selectBoxIt._mobileEvents = function() {

        var self = this;

        self.selectBox.on({

            "changed.selectBoxIt": function() {

                self.hasChanged = true;

                self._updateMobileText();

               
                self.triggerEvent("option-click");

            },

            "mousedown.selectBoxIt": function() {

               
                if(!self.hasChanged && self.options.defaultText && !self.originalElem.disabled) {

                    self._updateMobileText();

                    self.triggerEvent("option-click");

                }

            },

            "enable.selectBoxIt": function() {

                
                self.selectBox.removeClass('selectboxit-rendering');

            },

            "disable.selectBoxIt": function() {

               
                self.selectBox.addClass('selectboxit-rendering');

            }

        });

    };



    selectBoxIt._mobile = function(callback) {

     
        var self = this;

            if(self.isMobile) {

                self._applyNativeSelect();

                self._mobileEvents();

            }

        
            return this;

    };



    selectBoxIt.remove = function(indexes, callback) {

        var self = this,
            dataType = $.type(indexes),
            value,
            x = 0,
            dataLength,
            elems = "";

     
        if(dataType === "array") {

            
            for(dataLength = indexes.length; x <= dataLength - 1; x += 1) {

              
                value = indexes[x];

             
                if($.type(value) === "number") {

                    if(elems.length) {

                        
                        elems += ", option:eq(" + value + ")";

                    }

                    else {

                        
                        elems += "option:eq(" + value + ")";

                    }

                }

            }

            
            self.selectBox.find(elems).remove();

        }

       
        else if(dataType === "number") {

            self.selectBox.find("option").eq(indexes).remove();

        }

        
        else {

           
            self.selectBox.find("option").remove();

        }

       
        if(self.dropdown) {

           
            self.refresh(function() {

                
                self._callbackSupport(callback);

            }, true);

        } else {

           
            self._callbackSupport(callback);

        }

        
        return self;

    };



    selectBoxIt.selectOption = function(val, callback) {

      
        var self = this,
            type = $.type(val);

        
        if(type === "number") {

           
            self.selectBox.val(self.selectItems.eq(val).val()).change();

        }

        else if(type === "string") {

        
            self.selectBox.val(val).change();

        }

       
        self._callbackSupport(callback);

       
        return self;

    };



    selectBoxIt.setOption = function(key, value, callback) {

        var self = this;

       
        if($.type(key) === "string") {

           
            self.options[key] = value;

        }

    
        self.refresh(function() {

            
            self._callbackSupport(callback);

        }, true);

      
        return self;

    };



    selectBoxIt.setOptions = function(newOptions, callback) {

        var self = this;

      
        if($.isPlainObject(newOptions)) {

            self.options = $.extend({}, self.options, newOptions);

        }

     
        self.refresh(function() {

         
            self._callbackSupport(callback);

        }, true);

      
        return self;

    };



    selectBoxIt.wait = function(time, callback) {

        var self = this;

        self.widgetProto._delay.call(self, callback, time);

     
        return self;

    };
})); 