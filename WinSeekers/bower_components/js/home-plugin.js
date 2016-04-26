!function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    function e(e, s) {
        var n, o, a, r = e.nodeName.toLowerCase();
        return "area" === r ? (n = e.parentNode, o = n.name, e.href && o && "map" === n.nodeName.toLowerCase() ? (a = t("img[usemap='#" + o + "']")[0], !!a && i(a)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !e.disabled : "a" === r ? e.href || s : s) && i(e)
    }

    function i(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function () {
                return "hidden" === t.css(this, "visibility")
            }).length
    }

    function s(t) {
        for (var e, i; t.length && t[0] !== document;) {
            if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i))return i;
            t = t.parent()
        }
        return 0
    }

    function n() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = o(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function o(e) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(i, "mouseout", function () {
            t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", a)
    }

    function a() {
        t.datepicker._isDisabledDatepicker(v.inline ? v.dpDiv.parent()[0] : v.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
    }

    function r(e, i) {
        t.extend(e, i);
        for (var s in i)null == i[s] && (e[s] = i[s]);
        return e
    }

    function l(t) {
        return function () {
            var e = this.element.val();
            t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
        }
    }

    t.ui = t.ui || {}, t.extend(t.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), t.fn.extend({
        scrollParent: function (e) {
            var i = this.css("position"), s = "absolute" === i, n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/, o = this.parents().filter(function () {
                var e = t(this);
                return s && "static" === e.css("position") ? !1 : n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
            }).eq(0);
            return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document)
        }, uniqueId: function () {
            var t = 0;
            return function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++t)
                })
            }
        }(), removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
            })
        }
    }), t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function (e) {
            return function (i) {
                return !!t.data(i, e)
            }
        }) : function (e, i, s) {
            return !!t.data(e, s[3])
        }, focusable: function (i) {
            return e(i, !isNaN(t.attr(i, "tabindex")))
        }, tabbable: function (i) {
            var s = t.attr(i, "tabindex"), n = isNaN(s);
            return (n || s >= 0) && e(i, !n)
        }
    }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function (e, i) {
        function s(e, i, s, o) {
            return t.each(n, function () {
                i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
            }), i
        }

        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"], o = i.toLowerCase(), a = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight
        };
        t.fn["inner" + i] = function (e) {
            return void 0 === e ? a["inner" + i].call(this) : this.each(function () {
                t(this).css(o, s(this, e) + "px")
            })
        }, t.fn["outer" + i] = function (e, n) {
            return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function () {
                t(this).css(o, s(this, e, !0, n) + "px")
            })
        }
    }), t.fn.addBack || (t.fn.addBack = function (t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function (e) {
        return function (i) {
            return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
        }
    }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.fn.extend({
        focus: function (e) {
            return function (i, s) {
                return "number" == typeof i ? this.each(function () {
                    var e = this;
                    setTimeout(function () {
                        t(e).focus(), s && s.call(e)
                    }, i)
                }) : e.apply(this, arguments)
            }
        }(t.fn.focus), disableSelection: function () {
            var t = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.bind(t + ".ui-disableSelection", function (t) {
                    t.preventDefault()
                })
            }
        }(), enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }, zIndex: function (e) {
            if (void 0 !== e)return this.css("zIndex", e);
            if (this.length)for (var i, s, n = t(this[0]); n.length && n[0] !== document;) {
                if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s))return s;
                n = n.parent()
            }
            return 0
        }
    }), t.ui.plugin = {
        add: function (e, i, s) {
            var n, o = t.ui[e].prototype;
            for (n in s)o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]])
        }, call: function (t, e, i, s) {
            var n, o = t.plugins[e];
            if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))for (n = 0; o.length > n; n++)t.options[o[n][0]] && o[n][1].apply(t.element, i)
        }
    };
    var h = 0, c = Array.prototype.slice;
    t.cleanData = function (e) {
        return function (i) {
            var s, n, o;
            for (o = 0; null != (n = i[o]); o++)try {
                s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove")
            } catch (a) {
            }
            e(i)
        }
    }(t.cleanData), t.widget = function (e, i, s) {
        var n, o, a, r, l = {}, h = e.split(".")[0];
        return e = e.split(".")[1], n = h + "-" + e, s || (s = i, i = t.Widget), t.expr[":"][n.toLowerCase()] = function (e) {
            return !!t.data(e, n)
        }, t[h] = t[h] || {}, o = t[h][e], a = t[h][e] = function (t, e) {
            return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new a(t, e)
        }, t.extend(a, o, {
            version: s.version,
            _proto: t.extend({}, s),
            _childConstructors: []
        }), r = new i, r.options = t.widget.extend({}, r.options), t.each(s, function (e, s) {
            return t.isFunction(s) ? void(l[e] = function () {
                var t = function () {
                    return i.prototype[e].apply(this, arguments)
                }, n = function (t) {
                    return i.prototype[e].apply(this, t)
                };
                return function () {
                    var e, i = this._super, o = this._superApply;
                    return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e
                }
            }()) : void(l[e] = s)
        }), a.prototype = t.widget.extend(r, {widgetEventPrefix: o ? r.widgetEventPrefix || e : e}, l, {
            constructor: a,
            namespace: h,
            widgetName: e,
            widgetFullName: n
        }), o ? (t.each(o._childConstructors, function (e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, a, i._proto)
        }), delete o._childConstructors) : i._childConstructors.push(a), t.widget.bridge(e, a), a
    }, t.widget.extend = function (e) {
        for (var i, s, n = c.call(arguments, 1), o = 0, a = n.length; a > o; o++)for (i in n[o])s = n[o][i], n[o].hasOwnProperty(i) && void 0 !== s && (e[i] = t.isPlainObject(s) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], s) : t.widget.extend({}, s) : s);
        return e
    }, t.widget.bridge = function (e, i) {
        var s = i.prototype.widgetFullName || e;
        t.fn[e] = function (n) {
            var o = "string" == typeof n, a = c.call(arguments, 1), r = this;
            return o ? this.each(function () {
                var i, o = t.data(this, s);
                return "instance" === n ? (r = o, !1) : o ? t.isFunction(o[n]) && "_" !== n.charAt(0) ? (i = o[n].apply(o, a), i !== o && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + n + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + n + "'")
            }) : (a.length && (n = t.widget.extend.apply(null, [n].concat(a))), this.each(function () {
                var e = t.data(this, s);
                e ? (e.option(n || {}), e._init && e._init()) : t.data(this, s, new i(n, this))
            })), r
        }
    }, t.Widget = function () {
    }, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {disabled: !1, create: null},
        _createWidget: function (e, i) {
            i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = h++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (t) {
                    t.target === i && this.destroy()
                }
            }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function () {
            return this.element
        },
        option: function (e, i) {
            var s, n, o, a = e;
            if (0 === arguments.length)return t.widget.extend({}, this.options);
            if ("string" == typeof e)if (a = {}, s = e.split("."), e = s.shift(), s.length) {
                for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; s.length - 1 > o; o++)n[s[o]] = n[s[o]] || {}, n = n[s[o]];
                if (e = s.pop(), 1 === arguments.length)return void 0 === n[e] ? null : n[e];
                n[e] = i
            } else {
                if (1 === arguments.length)return void 0 === this.options[e] ? null : this.options[e];
                a[e] = i
            }
            return this._setOptions(a), this
        },
        _setOptions: function (t) {
            var e;
            for (e in t)this._setOption(e, t[e]);
            return this
        },
        _setOption: function (t, e) {
            return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function () {
            return this._setOptions({disabled: !1})
        },
        disable: function () {
            return this._setOptions({disabled: !0})
        },
        _on: function (e, i, s) {
            var n, o = this;
            "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function (s, a) {
                function r() {
                    return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
                }

                "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
                var l = s.match(/^([\w:-]*)\s*(.*)$/), h = l[1] + o.eventNamespace, c = l[2];
                c ? n.delegate(c, h, r) : i.bind(h, r)
            })
        },
        _off: function (e, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(i).undelegate(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
        },
        _delay: function (t, e) {
            function i() {
                return ("string" == typeof t ? s[t] : t).apply(s, arguments)
            }

            var s = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function (e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function (e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function (e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function (e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                }, focusout: function (e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (e, i, s) {
            var n, o, a = this.options[e];
            if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)for (n in o)n in i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, t.each({show: "fadeIn", hide: "fadeOut"}, function (e, i) {
        t.Widget.prototype["_" + e] = function (s, n, o) {
            "string" == typeof n && (n = {effect: n});
            var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {}, "number" == typeof n && (n = {duration: n}), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function (i) {
                t(this)[e](), o && o.call(s[0]), i()
            })
        }
    }), t.widget;
    var d = !1;
    t(document).mouseup(function () {
        d = !1
    }), t.widget("ui.mouse", {
        version: "1.11.4",
        options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
        _mouseInit: function () {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function (t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function (i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (e) {
            if (!d) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                var i = this, s = 1 === e.which, n = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
                return s && !n && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    i.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
                    return i._mouseMove(t)
                }, this._mouseUpDelegate = function (t) {
                    return i._mouseUp(t)
                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), d = !0, !0)) : !0
            }
        },
        _mouseMove: function (e) {
            if (this._mouseMoved) {
                if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button)return this._mouseUp(e);
                if (!e.which)return this._mouseUp(e)
            }
            return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function (e) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), d = !1, !1
        },
        _mouseDistanceMet: function (t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {
        },
        _mouseDrag: function () {
        },
        _mouseStop: function () {
        },
        _mouseCapture: function () {
            return !0
        }
    }), function () {
        function e(t, e, i) {
            return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
        }

        function i(e, i) {
            return parseInt(t.css(e, i), 10) || 0
        }

        function s(e) {
            var i = e[0];
            return 9 === i.nodeType ? {
                width: e.width(),
                height: e.height(),
                offset: {top: 0, left: 0}
            } : t.isWindow(i) ? {
                width: e.width(),
                height: e.height(),
                offset: {top: e.scrollTop(), left: e.scrollLeft()}
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {top: i.pageY, left: i.pageX}
            } : {width: e.outerWidth(), height: e.outerHeight(), offset: e.offset()}
        }

        t.ui = t.ui || {};
        var n, o, a = Math.max, r = Math.abs, l = Math.round, h = /left|center|right/, c = /top|center|bottom/, d = /[\+\-]\d+(\.[\d]+)?%?/, u = /^\w+/, p = /%$/, f = t.fn.position;
        t.position = {
            scrollbarWidth: function () {
                if (void 0 !== n)return n;
                var e, i, s = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), o = s.children()[0];
                return t("body").append(s), e = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = s[0].clientWidth), s.remove(), n = e - i
            }, getScrollInfo: function (e) {
                var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth, o = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
                return {width: o ? t.position.scrollbarWidth() : 0, height: n ? t.position.scrollbarWidth() : 0}
            }, getWithinInfo: function (e) {
                var i = t(e || window), s = t.isWindow(i[0]), n = !!i[0] && 9 === i[0].nodeType;
                return {
                    element: i,
                    isWindow: s,
                    isDocument: n,
                    offset: i.offset() || {left: 0, top: 0},
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: s || n ? i.width() : i.outerWidth(),
                    height: s || n ? i.height() : i.outerHeight()
                }
            }
        }, t.fn.position = function (n) {
            if (!n || !n.of)return f.apply(this, arguments);
            n = t.extend({}, n);
            var p, m, g, v, b, _, w = t(n.of), y = t.position.getWithinInfo(n.within), x = t.position.getScrollInfo(y), C = (n.collision || "flip").split(" "), k = {};
            return _ = s(w), w[0].preventDefault && (n.at = "left top"), m = _.width, g = _.height, v = _.offset, b = t.extend({}, v), t.each(["my", "at"], function () {
                var t, e, i = (n[this] || "").split(" ");
                1 === i.length && (i = h.test(i[0]) ? i.concat(["center"]) : c.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = h.test(i[0]) ? i[0] : "center", i[1] = c.test(i[1]) ? i[1] : "center", t = d.exec(i[0]), e = d.exec(i[1]), k[this] = [t ? t[0] : 0, e ? e[0] : 0], n[this] = [u.exec(i[0])[0], u.exec(i[1])[0]]
            }), 1 === C.length && (C[1] = C[0]), "right" === n.at[0] ? b.left += m : "center" === n.at[0] && (b.left += m / 2), "bottom" === n.at[1] ? b.top += g : "center" === n.at[1] && (b.top += g / 2), p = e(k.at, m, g), b.left += p[0], b.top += p[1], this.each(function () {
                var s, h, c = t(this), d = c.outerWidth(), u = c.outerHeight(), f = i(this, "marginLeft"), _ = i(this, "marginTop"), I = d + f + i(this, "marginRight") + x.width, T = u + _ + i(this, "marginBottom") + x.height, S = t.extend({}, b), D = e(k.my, c.outerWidth(), c.outerHeight());
                "right" === n.my[0] ? S.left -= d : "center" === n.my[0] && (S.left -= d / 2), "bottom" === n.my[1] ? S.top -= u : "center" === n.my[1] && (S.top -= u / 2), S.left += D[0], S.top += D[1], o || (S.left = l(S.left), S.top = l(S.top)), s = {
                    marginLeft: f,
                    marginTop: _
                }, t.each(["left", "top"], function (e, i) {
                    t.ui.position[C[e]] && t.ui.position[C[e]][i](S, {
                        targetWidth: m,
                        targetHeight: g,
                        elemWidth: d,
                        elemHeight: u,
                        collisionPosition: s,
                        collisionWidth: I,
                        collisionHeight: T,
                        offset: [p[0] + D[0], p[1] + D[1]],
                        my: n.my,
                        at: n.at,
                        within: y,
                        elem: c
                    })
                }), n.using && (h = function (t) {
                    var e = v.left - S.left, i = e + m - d, s = v.top - S.top, o = s + g - u, l = {
                        target: {
                            element: w,
                            left: v.left,
                            top: v.top,
                            width: m,
                            height: g
                        },
                        element: {element: c, left: S.left, top: S.top, width: d, height: u},
                        horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                        vertical: 0 > o ? "top" : s > 0 ? "bottom" : "middle"
                    };
                    d > m && m > r(e + i) && (l.horizontal = "center"), u > g && g > r(s + o) && (l.vertical = "middle"), l.important = a(r(e), r(i)) > a(r(s), r(o)) ? "horizontal" : "vertical", n.using.call(this, t, l)
                }), c.offset(t.extend(S, {using: h}))
            })
        }, t.ui.position = {
            fit: {
                left: function (t, e) {
                    var i, s = e.within, n = s.isWindow ? s.scrollLeft : s.offset.left, o = s.width, r = t.left - e.collisionPosition.marginLeft, l = n - r, h = r + e.collisionWidth - o - n;
                    e.collisionWidth > o ? l > 0 && 0 >= h ? (i = t.left + l + e.collisionWidth - o - n, t.left += l - i) : t.left = h > 0 && 0 >= l ? n : l > h ? n + o - e.collisionWidth : n : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = a(t.left - r, t.left)
                }, top: function (t, e) {
                    var i, s = e.within, n = s.isWindow ? s.scrollTop : s.offset.top, o = e.within.height, r = t.top - e.collisionPosition.marginTop, l = n - r, h = r + e.collisionHeight - o - n;
                    e.collisionHeight > o ? l > 0 && 0 >= h ? (i = t.top + l + e.collisionHeight - o - n, t.top += l - i) : t.top = h > 0 && 0 >= l ? n : l > h ? n + o - e.collisionHeight : n : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = a(t.top - r, t.top)
                }
            }, flip: {
                left: function (t, e) {
                    var i, s, n = e.within, o = n.offset.left + n.scrollLeft, a = n.width, l = n.isWindow ? n.scrollLeft : n.offset.left, h = t.left - e.collisionPosition.marginLeft, c = h - l, d = h + e.collisionWidth - a - l, u = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0, p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0, f = -2 * e.offset[0];
                    0 > c ? (i = t.left + u + p + f + e.collisionWidth - a - o, (0 > i || r(c) > i) && (t.left += u + p + f)) : d > 0 && (s = t.left - e.collisionPosition.marginLeft + u + p + f - l, (s > 0 || d > r(s)) && (t.left += u + p + f))
                }, top: function (t, e) {
                    var i, s, n = e.within, o = n.offset.top + n.scrollTop, a = n.height, l = n.isWindow ? n.scrollTop : n.offset.top, h = t.top - e.collisionPosition.marginTop, c = h - l, d = h + e.collisionHeight - a - l, u = "top" === e.my[1], p = u ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0, f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0, m = -2 * e.offset[1];
                    0 > c ? (s = t.top + p + f + m + e.collisionHeight - a - o, (0 > s || r(c) > s) && (t.top += p + f + m)) : d > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - l, (i > 0 || d > r(i)) && (t.top += p + f + m))
                }
            }, flipfit: {
                left: function () {
                    t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                }, top: function () {
                    t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                }
            }
        }, function () {
            var e, i, s, n, a, r = document.getElementsByTagName("body")[0], l = document.createElement("div");
            e = document.createElement(r ? "div" : "body"), s = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, r && t.extend(s, {position: "absolute", left: "-1000px", top: "-1000px"});
            for (a in s)e.style[a] = s[a];
            e.appendChild(l), i = r || document.documentElement, i.insertBefore(e, i.firstChild), l.style.cssText = "position: absolute; left: 10.7432222px;", n = t(l).offset().left, o = n > 10 && 11 > n, e.innerHTML = "", i.removeChild(e)
        }()
    }(), t.ui.position, t.widget("ui.draggable", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function () {
            "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
        },
        _setOption: function (t, e) {
            this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
        },
        _destroy: function () {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
        },
        _mouseCapture: function (e) {
            var i = this.options;
            return this._blurActiveElement(e), this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
        },
        _blockFrames: function (e) {
            this.iframeBlocks = this.document.find(e).map(function () {
                var e = t(this);
                return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function () {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _blurActiveElement: function (e) {
            var i = this.document[0];
            if (this.handleElement.is(e.target))try {
                i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && t(i.activeElement).blur()
            } catch (s) {
            }
        },
        _mouseStart: function (e) {
            var i = this.options;
            return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () {
                    return "fixed" === t(this).css("position")
                }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._normalizeRightBottom(), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
        },
        _refreshOffsets: function (t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }, this.offset.click = {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top}
        },
        _mouseDrag: function (e, i) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var s = this._uiHash();
                if (this._trigger("drag", e, s) === !1)return this._mouseUp({}), !1;
                this.position = s.position
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
        },
        _mouseStop: function (e) {
            var i = this, s = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                i._trigger("stop", e) !== !1 && i._clear()
            }) : this._trigger("stop", e) !== !1 && this._clear(), !1
        },
        _mouseUp: function (e) {
            return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.focus(), t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function () {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function (e) {
            return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function () {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function () {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function (e) {
            var i = this.options, s = t.isFunction(i.helper), n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
        },
        _setPositionRelative: function () {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function (e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left"in e && (this.offset.click.left = e.left + this.margins.left), "right"in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top"in e && (this.offset.click.top = e.top + this.margins.top), "bottom"in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _isRootNode: function (t) {
            return /(html|body)/i.test(t.tagName) || t === this.document[0]
        },
        _getParentOffset: function () {
            var e = this.offsetParent.offset(), i = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" !== this.cssPosition)return {top: 0, left: 0};
            var t = this.element.position(), e = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var e, i, s, n = this.options, o = this.document[0];
            return this.relativeContainer = null, n.containment ? "window" === n.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === n.containment ? void(this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : n.containment.constructor === Array ? void(this.containment = n.containment) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], void(s && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i))) : void(this.containment = null)
        },
        _convertPositionTo: function (t, e) {
            e || (e = this.position);
            var i = "absolute" === t ? 1 : -1, s = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function (t, e) {
            var i, s, n, o, a = this.options, r = this._isRootNode(this.scrollParent[0]), l = t.pageX, h = t.pageY;
            return r && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(), left: this.scrollParent.scrollLeft()
            }), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (l = this.originalPageX), "x" === a.axis && (h = this.originalPageY)), {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
                left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
        },
        _normalizeRightBottom: function () {
            "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
        },
        _trigger: function (e, i, s) {
            return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), t.ui.plugin.add("draggable", "connectToSortable", {
        start: function (e, i, s) {
            var n = t.extend({}, i, {item: s.element});
            s.sortables = [], t(s.options.connectToSortable).each(function () {
                var i = t(this).sortable("instance");
                i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, n))
            })
        }, stop: function (e, i, s) {
            var n = t.extend({}, i, {item: s.element});
            s.cancelHelperRemoval = !1, t.each(s.sortables, function () {
                var t = this;
                t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left")
                }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, n))
            })
        }, drag: function (e, i, s) {
            t.each(s.sortables, function () {
                var n = !1, o = this;
                o.positionAbs = s.positionAbs, o.helperProportions = s.helperProportions, o.offset.click = s.offset.click, o._intersectsWith(o.containerCache) && (n = !0, t.each(s.sortables, function () {
                    return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (n = !1), n
                })), n ? (o.isOver || (o.isOver = 1, s._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function () {
                    return i.helper[0]
                }, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = s.offset.click.top, o.offset.click.left = s.offset.click.left, o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top, s._trigger("toSortable", e), s.dropped = o.element, t.each(s.sortables, function () {
                    this.refreshPositions()
                }), s.currentItem = s.element, o.fromOutside = s), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function () {
                    this.refreshPositions()
                }))
            })
        }
    }), t.ui.plugin.add("draggable", "cursor", {
        start: function (e, i, s) {
            var n = t("body"), o = s.options;
            n.css("cursor") && (o._cursor = n.css("cursor")), n.css("cursor", o.cursor)
        }, stop: function (e, i, s) {
            var n = s.options;
            n._cursor && t("body").css("cursor", n._cursor)
        }
    }), t.ui.plugin.add("draggable", "opacity", {
        start: function (e, i, s) {
            var n = t(i.helper), o = s.options;
            n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity)
        }, stop: function (e, i, s) {
            var n = s.options;
            n._opacity && t(i.helper).css("opacity", n._opacity)
        }
    }), t.ui.plugin.add("draggable", "scroll", {
        start: function (t, e, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
        }, drag: function (e, i, s) {
            var n = s.options, o = !1, a = s.scrollParentNotHidden[0], r = s.document[0];
            a !== r && "HTML" !== a.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + a.offsetHeight - e.pageY < n.scrollSensitivity ? a.scrollTop = o = a.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (a.scrollTop = o = a.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + a.offsetWidth - e.pageX < n.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e)
        }
    }), t.ui.plugin.add("draggable", "snap", {
        start: function (e, i, s) {
            var n = s.options;
            s.snapElements = [], t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function () {
                var e = t(this), i = e.offset();
                this !== s.element[0] && s.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        }, drag: function (e, i, s) {
            var n, o, a, r, l, h, c, d, u, p, f = s.options, m = f.snapTolerance, g = i.offset.left, v = g + s.helperProportions.width, b = i.offset.top, _ = b + s.helperProportions.height;
            for (u = s.snapElements.length - 1; u >= 0; u--)l = s.snapElements[u].left - s.margins.left, h = l + s.snapElements[u].width, c = s.snapElements[u].top - s.margins.top, d = c + s.snapElements[u].height, l - m > v || g > h + m || c - m > _ || b > d + m || !t.contains(s.snapElements[u].item.ownerDocument, s.snapElements[u].item) ? (s.snapElements[u].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), {snapItem: s.snapElements[u].item})), s.snapElements[u].snapping = !1) : ("inner" !== f.snapMode && (n = m >= Math.abs(c - _), o = m >= Math.abs(d - b), a = m >= Math.abs(l - v), r = m >= Math.abs(h - g), n && (i.position.top = s._convertPositionTo("relative", {
                top: c - s.helperProportions.height,
                left: 0
            }).top), o && (i.position.top = s._convertPositionTo("relative", {
                top: d,
                left: 0
            }).top), a && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: l - s.helperProportions.width
            }).left), r && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: h
            }).left)), p = n || o || a || r, "outer" !== f.snapMode && (n = m >= Math.abs(c - b), o = m >= Math.abs(d - _), a = m >= Math.abs(l - g), r = m >= Math.abs(h - v), n && (i.position.top = s._convertPositionTo("relative", {
                top: c,
                left: 0
            }).top), o && (i.position.top = s._convertPositionTo("relative", {
                top: d - s.helperProportions.height,
                left: 0
            }).top), a && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left), r && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: h - s.helperProportions.width
            }).left)), !s.snapElements[u].snapping && (n || o || a || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), {snapItem: s.snapElements[u].item})), s.snapElements[u].snapping = n || o || a || r || p)
        }
    }), t.ui.plugin.add("draggable", "stack", {
        start: function (e, i, s) {
            var n, o = s.options, a = t.makeArray(t(o.stack)).sort(function (e, i) {
                return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
            });
            a.length && (n = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function (e) {
                t(this).css("zIndex", n + e)
            }), this.css("zIndex", n + a.length))
        }
    }), t.ui.plugin.add("draggable", "zIndex", {
        start: function (e, i, s) {
            var n = t(i.helper), o = s.options;
            n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex)
        }, stop: function (e, i, s) {
            var n = s.options;
            n._zIndex && t(i.helper).css("zIndex", n._zIndex)
        }
    }), t.ui.draggable, t.widget("ui.droppable", {
        version: "1.11.4",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function () {
            var e, i = this.options, s = i.accept;
            this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function (t) {
                return t.is(s)
            }, this.proportions = function () {
                return arguments.length ? void(e = arguments[0]) : e ? e : e = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }
            }, this._addToManager(i.scope), i.addClasses && this.element.addClass("ui-droppable")
        },
        _addToManager: function (e) {
            t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this)
        },
        _splice: function (t) {
            for (var e = 0; t.length > e; e++)t[e] === this && t.splice(e, 1)
        },
        _destroy: function () {
            var e = t.ui.ddmanager.droppables[this.options.scope];
            this._splice(e), this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function (e, i) {
            if ("accept" === e)this.accept = t.isFunction(i) ? i : function (t) {
                return t.is(i)
            }; else if ("scope" === e) {
                var s = t.ui.ddmanager.droppables[this.options.scope];
                this._splice(s), this._addToManager(i)
            }
            this._super(e, i)
        },
        _activate: function (e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
        },
        _deactivate: function (e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
        },
        _over: function (e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
        },
        _out: function (e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
        },
        _drop: function (e, i) {
            var s = i || t.ui.ddmanager.current, n = !1;
            return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
                var i = t(this).droppable("instance");
                return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && t.ui.intersect(s, t.extend(i, {offset: i.element.offset()}), i.options.tolerance, e) ? (n = !0, !1) : void 0
            }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1
        },
        ui: function (t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        }
    }), t.ui.intersect = function () {
        function t(t, e, i) {
            return t >= e && e + i > t
        }

        return function (e, i, s, n) {
            if (!i.offset)return !1;
            var o = (e.positionAbs || e.position.absolute).left + e.margins.left, a = (e.positionAbs || e.position.absolute).top + e.margins.top, r = o + e.helperProportions.width, l = a + e.helperProportions.height, h = i.offset.left, c = i.offset.top, d = h + i.proportions().width, u = c + i.proportions().height;
            switch (s) {
                case"fit":
                    return o >= h && d >= r && a >= c && u >= l;
                case"intersect":
                    return o + e.helperProportions.width / 2 > h && d > r - e.helperProportions.width / 2 && a + e.helperProportions.height / 2 > c && u > l - e.helperProportions.height / 2;
                case"pointer":
                    return t(n.pageY, c, i.proportions().height) && t(n.pageX, h, i.proportions().width);
                case"touch":
                    return (a >= c && u >= a || l >= c && u >= l || c > a && l > u) && (o >= h && d >= o || r >= h && d >= r || h > o && r > d);
                default:
                    return !1
            }
        }
    }(), t.ui.ddmanager = {
        current: null, droppables: {"default": []}, prepareOffsets: function (e, i) {
            var s, n, o = t.ui.ddmanager.droppables[e.options.scope] || [], a = i ? i.type : null, r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t:for (s = 0; o.length > s; s++)if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
                for (n = 0; r.length > n; n++)if (r[n] === o[s].element[0]) {
                    o[s].proportions().height = 0;
                    continue t
                }
                o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions({
                    width: o[s].element[0].offsetWidth,
                    height: o[s].element[0].offsetHeight
                }))
            }
        }, drop: function (e, i) {
            var s = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function () {
                this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }), s
        }, dragStart: function (e, i) {
            e.element.parentsUntil("body").bind("scroll.droppable", function () {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            })
        }, drag: function (e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var s, n, o, a = t.ui.intersect(e, this, this.options.tolerance, i), r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
                    r && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function () {
                        return t(this).droppable("instance").options.scope === n
                    }), o.length && (s = t(o[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
                }
            })
        }, dragStop: function (e, i) {
            e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        }
    }, t.ui.droppable, t.widget("ui.resizable", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function (t) {
            return parseInt(t, 10) || 0
        },
        _isNumber: function (t) {
            return !isNaN(parseInt(t, 10))
        },
        _hasScroll: function (e, i) {
            if ("hidden" === t(e).css("overflow"))return !1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop", n = !1;
            return e[s] > 0 ? !0 : (e[s] = 1, n = e[s] > 0, e[s] = 0, n)
        },
        _create: function () {
            var e, i, s, n, o, a = this, r = this.options;
            if (this.element.addClass("ui-resizable"), t.extend(this, {
                    _aspectRatio: !!r.aspectRatio,
                    aspectRatio: r.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({margin: this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
                        n: ".ui-resizable-n",
                        e: ".ui-resizable-e",
                        s: ".ui-resizable-s",
                        w: ".ui-resizable-w",
                        se: ".ui-resizable-se",
                        sw: ".ui-resizable-sw",
                        ne: ".ui-resizable-ne",
                        nw: ".ui-resizable-nw"
                    } : "e,s,se"), this._handles = t(), this.handles.constructor === String)for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; e.length > i; i++)s = t.trim(e[i]), o = "ui-resizable-" + s, n = t("<div class='ui-resizable-handle " + o + "'></div>"), n.css({zIndex: r.zIndex}), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
            this._renderAxis = function (e) {
                var i, s, n, o;
                e = e || this.element;
                for (i in this.handles)this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], {mousedown: a._mouseDown})), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
            }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.mouseover(function () {
                a.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = n && n[1] ? n[1] : "se")
            }), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                r.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show())
            }).mouseleave(function () {
                r.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var e, i = function (e) {
                t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _mouseCapture: function (e) {
            var i, s, n = !1;
            for (i in this.handles)s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
            return !this.options.disabled && n
        },
        _mouseStart: function (e) {
            var i, s, n, o = this.options, a = this.element;
            return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: i,
                top: s
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {width: a.width(), height: a.height()}, this.originalSize = this._helper ? {
                width: a.outerWidth(),
                height: a.outerHeight()
            } : {width: a.width(), height: a.height()}, this.sizeDiff = {
                width: a.outerWidth() - a.width(),
                height: a.outerHeight() - a.height()
            }, this.originalPosition = {left: i, top: s}, this.originalMousePosition = {
                left: e.pageX,
                top: e.pageY
            }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), a.addClass("ui-resizable-resizing"), this._propagate("start", e), !0
        },
        _mouseDrag: function (e) {
            var i, s, n = this.originalMousePosition, o = this.axis, a = e.pageX - n.left || 0, r = e.pageY - n.top || 0, l = this._change[o];
            return this._updatePrevProperties(), l ? (i = l.apply(this, [e, a, r]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1) : !1
        },
        _mouseStop: function (e) {
            this.resizing = !1;
            var i, s, n, o, a, r, l, h = this.options, c = this;
            return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = {
                width: c.helper.width() - o,
                height: c.helper.height() - n
            }, r = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, l = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, h.animate || this.element.css(t.extend(a, {
                top: l,
                left: r
            })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !h.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
        },
        _updatePrevProperties: function () {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            }, this.prevSize = {width: this.size.width, height: this.size.height}
        },
        _applyChanges: function () {
            var t = {};
            return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
        },
        _updateVirtualBoundaries: function (t) {
            var e, i, s, n, o, a = this.options;
            o = {
                minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
                maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
                minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
                maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0
            }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), o.maxWidth > i && (o.maxWidth = i), o.maxHeight > n && (o.maxHeight = n)), this._vBoundaries = o
        },
        _updateCache: function (t) {
            this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function (t) {
            var e = this.position, i = this.size, s = this.axis;
            return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
        },
        _respectSize: function (t) {
            var e = this._vBoundaries, i = this.axis, s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width, n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height, o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width, a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height, r = this.originalPosition.left + this.originalSize.width, l = this.position.top + this.size.height, h = /sw|nw|w/.test(i), c = /nw|ne|n/.test(i);
            return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), n && (t.height = e.maxHeight), o && h && (t.left = r - e.minWidth), s && h && (t.left = r - e.maxWidth), a && c && (t.top = l - e.minHeight), n && c && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
        },
        _getPaddingPlusBorderDimensions: function (t) {
            for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++)i[e] = parseInt(s[e], 10) || 0, i[e] += parseInt(n[e], 10) || 0;
            return {height: i[0] + i[2], width: i[1] + i[3]}
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length)for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++)t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                height: i.height() - this.outerDimensions.height || 0,
                width: i.width() - this.outerDimensions.width || 0
            })
        },
        _renderProxy: function () {
            var e = this.element, i = this.options;
            this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function (t, e) {
                return {width: this.originalSize.width + e}
            }, w: function (t, e) {
                var i = this.originalSize, s = this.originalPosition;
                return {left: s.left + e, width: i.width - e}
            }, n: function (t, e, i) {
                var s = this.originalSize, n = this.originalPosition;
                return {top: n.top + i, height: s.height - i}
            }, s: function (t, e, i) {
                return {height: this.originalSize.height + i}
            }, se: function (e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            }, sw: function (e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            }, ne: function (e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            }, nw: function (e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            }
        },
        _propagate: function (e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), t.ui.plugin.add("resizable", "animate", {
        stop: function (e) {
            var i = t(this).resizable("instance"), s = i.options, n = i._proportionallyResizeElements, o = n.length && /textarea/i.test(n[0].nodeName), a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height, r = o ? 0 : i.sizeDiff.width, l = {
                width: i.size.width - r,
                height: i.size.height - a
            }, h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(t.extend(l, c && h ? {top: c, left: h} : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function () {
                    var s = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    n && n.length && t(n[0]).css({
                        width: s.width,
                        height: s.height
                    }), i._updateCache(s), i._propagate("resize", e)
                }
            })
        }
    }), t.ui.plugin.add("resizable", "containment", {
        start: function () {
            var e, i, s, n, o, a, r, l = t(this).resizable("instance"), h = l.options, c = l.element, d = h.containment, u = d instanceof t ? d.get(0) : /parent/.test(d) ? c.parent().get(0) : d;
            u && (l.containerElement = t(u), /document/.test(d) || d === document ? (l.containerOffset = {
                left: 0,
                top: 0
            }, l.containerPosition = {left: 0, top: 0}, l.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (e = t(u), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function (t, s) {
                i[t] = l._num(e.css("padding" + s))
            }), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = {
                height: e.innerHeight() - i[3],
                width: e.innerWidth() - i[1]
            }, s = l.containerOffset, n = l.containerSize.height, o = l.containerSize.width, a = l._hasScroll(u, "left") ? u.scrollWidth : o, r = l._hasScroll(u) ? u.scrollHeight : n, l.parentData = {
                element: u,
                left: s.left,
                top: s.top,
                width: a,
                height: r
            }))
        }, resize: function (e) {
            var i, s, n, o, a = t(this).resizable("instance"), r = a.options, l = a.containerOffset, h = a.position, c = a._aspectRatio || e.shiftKey, d = {
                top: 0,
                left: 0
            }, u = a.containerElement, p = !0;
            u[0] !== document && /static/.test(u.css("position")) && (d = l), h.left < (a._helper ? l.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - l.left : a.position.left - d.left), c && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = r.helper ? l.left : 0), h.top < (a._helper ? l.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - l.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? l.top : 0), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top), i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - d.left : a.offset.left - l.left)), s = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - d.top : a.offset.top - l.top)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio, p = !1)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio, p = !1)), p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height)
        }, stop: function () {
            var e = t(this).resizable("instance"), i = e.options, s = e.containerOffset, n = e.containerPosition, o = e.containerElement, a = t(e.helper), r = a.offset(), l = a.outerWidth() - e.sizeDiff.width, h = a.outerHeight() - e.sizeDiff.height;
            e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: l,
                height: h
            }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: l,
                height: h
            })
        }
    }), t.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var e = t(this).resizable("instance"), i = e.options;
            t(i.alsoResize).each(function () {
                var e = t(this);
                e.data("ui-resizable-alsoresize", {
                    width: parseInt(e.width(), 10),
                    height: parseInt(e.height(), 10),
                    left: parseInt(e.css("left"), 10),
                    top: parseInt(e.css("top"), 10)
                })
            })
        }, resize: function (e, i) {
            var s = t(this).resizable("instance"), n = s.options, o = s.originalSize, a = s.originalPosition, r = {
                height: s.size.height - o.height || 0,
                width: s.size.width - o.width || 0,
                top: s.position.top - a.top || 0,
                left: s.position.left - a.left || 0
            };
            t(n.alsoResize).each(function () {
                var e = t(this), s = t(this).data("ui-resizable-alsoresize"), n = {}, o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                t.each(o, function (t, e) {
                    var i = (s[e] || 0) + (r[e] || 0);
                    i && i >= 0 && (n[e] = i || null)
                }), e.css(n)
            })
        }, stop: function () {
            t(this).removeData("resizable-alsoresize")
        }
    }), t.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var e = t(this).resizable("instance"), i = e.options, s = e.size;
            e.ghost = e.originalElement.clone(), e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: s.height,
                width: s.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
        }, resize: function () {
            var e = t(this).resizable("instance");
            e.ghost && e.ghost.css({
                position: "relative", height: e.size.height, width: e.size.width
            })
        }, stop: function () {
            var e = t(this).resizable("instance");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    }), t.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var e, i = t(this).resizable("instance"), s = i.options, n = i.size, o = i.originalSize, a = i.originalPosition, r = i.axis, l = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid, h = l[0] || 1, c = l[1] || 1, d = Math.round((n.width - o.width) / h) * h, u = Math.round((n.height - o.height) / c) * c, p = o.width + d, f = o.height + u, m = s.maxWidth && p > s.maxWidth, g = s.maxHeight && f > s.maxHeight, v = s.minWidth && s.minWidth > p, b = s.minHeight && s.minHeight > f;
            s.grid = l, v && (p += h), b && (f += c), m && (p -= h), g && (f -= c), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - u) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - d) : ((0 >= f - c || 0 >= p - h) && (e = i._getPaddingPlusBorderDimensions(this)), f - c > 0 ? (i.size.height = f, i.position.top = a.top - u) : (f = c - e.height, i.size.height = f, i.position.top = a.top + o.height - f), p - h > 0 ? (i.size.width = p, i.position.left = a.left - d) : (p = h - e.width, i.size.width = p, i.position.left = a.left + o.width - p))
        }
    }), t.ui.resizable, t.widget("ui.selectable", t.ui.mouse, {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function () {
            var e, i = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
                e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function () {
                    var e = t(this), i = e.offset();
                    t.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: i.left,
                        top: i.top,
                        right: i.left + e.outerWidth(),
                        bottom: i.top + e.outerHeight(),
                        startselected: !1,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
        },
        _mouseStart: function (e) {
            var i = this, s = this.options;
            this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
                var s = t.data(this, "selectable-item");
                s.startselected = !0, e.metaKey || e.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, {unselecting: s.element}))
            }), t(e.target).parents().addBack().each(function () {
                var s, n = t.data(this, "selectable-item");
                return n ? (s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", e, {selecting: n.element}) : i._trigger("unselecting", e, {unselecting: n.element}), !1) : void 0
            }))
        },
        _mouseDrag: function (e) {
            if (this.dragged = !0, !this.options.disabled) {
                var i, s = this, n = this.options, o = this.opos[0], a = this.opos[1], r = e.pageX, l = e.pageY;
                return o > r && (i = r, r = o, o = i), a > l && (i = l, l = a, a = i), this.helper.css({
                    left: o,
                    top: a,
                    width: r - o,
                    height: l - a
                }), this.selectees.each(function () {
                    var i = t.data(this, "selectable-item"), h = !1;
                    i && i.element !== s.element[0] && ("touch" === n.tolerance ? h = !(i.left > r || o > i.right || i.top > l || a > i.bottom) : "fit" === n.tolerance && (h = i.left > o && r > i.right && i.top > a && l > i.bottom), h ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", e, {selecting: i.element}))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, {unselecting: i.element}))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, {unselecting: i.element})))))
                }), !1
            }
        },
        _mouseStop: function (e) {
            var i = this;
            return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function () {
                var s = t.data(this, "selectable-item");
                s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, {unselected: s.element})
            }), t(".ui-selecting", this.element[0]).each(function () {
                var s = t.data(this, "selectable-item");
                s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, {selected: s.element})
            }), this._trigger("stop", e), this.helper.remove(), !1
        }
    }), t.widget("ui.sortable", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function (t, e, i) {
            return t >= e && e + i > t
        },
        _isFloating: function (t) {
            return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
        },
        _create: function () {
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
        },
        _setOption: function (t, e) {
            this._super(t, e), "handle" === t && this._setHandleClassName()
        },
        _setHandleClassName: function () {
            this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), t.each(this.items, function () {
                (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
            })
        },
        _destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--)this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function (e, i) {
            var s = null, n = !1, o = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () {
                return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : void 0
            }), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s && (!this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function () {
                this === e.target && (n = !0)
            }), n)) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1)
        },
        _mouseStart: function (e, i, s) {
            var n, o, a = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, t.extend(this.offset, {
                    click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top},
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)for (n = this.containers.length - 1; n >= 0; n--)this.containers[n]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
        },
        _mouseDrag: function (e) {
            var i, s, n, o, a = this.options, r = !1;
            for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - this.document.scrollTop() < a.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - a.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < a.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + a.scrollSpeed)), e.pageX - this.document.scrollLeft() < a.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - a.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < a.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
                if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s))break;
                this._rearrange(e, s), this._trigger("change", e, this._uiHash());
                break
            }
            return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function (e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                    var s = this, n = this.placeholder.offset(), o = this.options.axis, a = {};
                    o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function () {
                        s._clear(e)
                    })
                } else this._clear(e, i);
                return !1
            }
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({target: null}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--)this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function (e) {
            var i = this._getItemsAsjQuery(e && e.connected), s = [];
            return e = e || {}, t(i).each(function () {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }), !s.length && e.key && s.push(e.key + "="), s.join("&")
        },
        toArray: function (e) {
            var i = this._getItemsAsjQuery(e && e.connected), s = [];
            return e = e || {}, i.each(function () {
                s.push(t(e.item || this).attr(e.attribute || "id") || "")
            }), s
        },
        _intersectsWith: function (t) {
            var e = this.positionAbs.left, i = e + this.helperProportions.width, s = this.positionAbs.top, n = s + this.helperProportions.height, o = t.left, a = o + t.width, r = t.top, l = r + t.height, h = this.offset.click.top, c = this.offset.click.left, d = "x" === this.options.axis || s + h > r && l > s + h, u = "y" === this.options.axis || e + c > o && a > e + c, p = d && u;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && l > n - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function (t) {
            var e = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height), i = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width), s = e && i, n = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection();
            return s ? this.floating ? o && "right" === o || "down" === n ? 2 : 1 : n && ("down" === n ? 2 : 1) : !1
        },
        _intersectsWithSides: function (t) {
            var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height), i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width), s = this._getDragVerticalDirection(), n = this._getDragHorizontalDirection();
            return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && e || "up" === s && !e)
        },
        _getDragVerticalDirection: function () {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right" : "left")
        },
        refresh: function (t) {
            return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
        },
        _connectWith: function () {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function (e) {
            function i() {
                r.push(this)
            }

            var s, n, o, a, r = [], l = [], h = this._connectWith();
            if (h && e)for (s = h.length - 1; s >= 0; s--)for (o = t(h[s], this.document[0]), n = o.length - 1; n >= 0; n--)a = t.data(o[n], this.widgetFullName), a && a !== this && !a.options.disabled && l.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
            for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = l.length - 1; s >= 0; s--)l[s][0].each(i);
            return t(r)
        },
        _removeCurrentsFromItems: function () {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items, function (t) {
                for (var i = 0; e.length > i; i++)if (e[i] === t.item[0])return !1;
                return !0
            })
        },
        _refreshItems: function (e) {
            this.items = [], this.containers = [this];
            var i, s, n, o, a, r, l, h, c = this.items, d = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {item: this.currentItem}) : t(this.options.items, this.element), this]], u = this._connectWith();
            if (u && this.ready)for (i = u.length - 1; i >= 0; i--)for (n = t(u[i], this.document[0]), s = n.length - 1; s >= 0; s--)o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (d.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {item: this.currentItem}) : t(o.options.items, o.element), o]), this.containers.push(o));
            for (i = d.length - 1; i >= 0; i--)for (a = d[i][1], r = d[i][0], s = 0, h = r.length; h > s; s++)l = t(r[s]), l.data(this.widgetName + "-item", a), c.push({
                item: l,
                instance: a,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            })
        },
        refreshPositions: function (e) {
            this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, s, n, o;
            for (i = this.items.length - 1; i >= 0; i--)s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
            if (this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--)o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function (e) {
            e = e || this;
            var i, s = e.options;
            s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
                element: function () {
                    var s = e.currentItem[0].nodeName.toLowerCase(), n = t("<" + s + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tbody" === s ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(n)) : "tr" === s ? e._createTrPlaceholder(e.currentItem, n) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
                }, update: function (t, n) {
                    (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
        },
        _createTrPlaceholder: function (e, i) {
            var s = this;
            e.children().each(function () {
                t("<td>&#160;</td>", s.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i)
            })
        },
        _contactContainers: function (e) {
            var i, s, n, o, a, r, l, h, c, d, u = null, p = null;
            for (i = this.containers.length - 1; i >= 0; i--)if (!t.contains(this.currentItem[0], this.containers[i].element[0]))if (this._intersectsWith(this.containers[i].containerCache)) {
                if (u && t.contains(this.containers[i].element[0], u.element[0]))continue;
                u = this.containers[i], p = i
            } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
            if (u)if (1 === this.containers.length)this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1); else {
                for (n = 1e4, o = null, c = u.floating || this._isFloating(this.currentItem), a = c ? "left" : "top", r = c ? "width" : "height", d = c ? "clientX" : "clientY", s = this.items.length - 1; s >= 0; s--)t.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (l = this.items[s].item.offset()[a], h = !1, e[d] - l > this.items[s][r] / 2 && (h = !0), n > Math.abs(e[d] - l) && (n = Math.abs(e[d] - l), o = this.items[s], this.direction = h ? "up" : "down"));
                if (!o && !this.options.dropOnEmpty)return;
                if (this.currentContainer === this.containers[p])return void(this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1));
                o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1
            }
        },
        _createHelper: function (e) {
            var i = this.options, s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
        },
        _adjustOffsetFromHelper: function (e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left"in e && (this.offset.click.left = e.left + this.margins.left), "right"in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top"in e && (this.offset.click.top = e.top + this.margins.top), "bottom"in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var e, i, s, n = this.options;
            "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function (e, i) {
            i || (i = this.position);
            var s = "absolute" === e ? 1 : -1, n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(n[0].tagName);
            return {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s
            }
        },
        _generatePosition: function (e) {
            var i, s, n = this.options, o = e.pageX, a = e.pageY, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = /(html|body)/i.test(r[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
                top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : r.scrollTop()),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : r.scrollLeft())
            }
        },
        _rearrange: function (t, e, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var n = this.counter;
            this._delay(function () {
                n === this.counter && this.refreshPositions(!s)
            })
        },
        _clear: function (t, e) {
            function i(t, e, i) {
                return function (s) {
                    i._trigger(t, s, e._uiHash(e))
                }
            }

            this.reverting = !1;
            var s, n = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (s in this._storedCSS)("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !e && n.push(function (t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside))
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function (t) {
                this._trigger("update", t, this._uiHash())
            }), this !== this.currentContainer && (e || (n.push(function (t) {
                this._trigger("remove", t, this._uiHash())
            }), n.push(function (t) {
                return function (e) {
                    t._trigger("receive", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), n.push(function (t) {
                return function (e) {
                    t._trigger("update", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--)e || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                for (s = 0; n.length > s; s++)n[s].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !this.cancelHelperRemoval
        },
        _trigger: function () {
            t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function (e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    }), t.widget("ui.accordion", {
        version: "1.11.4",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e"},
            activate: null,
            beforeActivate: null
        },
        hideProps: {
            borderTopWidth: "hide",
            borderBottomWidth: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
            height: "hide"
        },
        showProps: {
            borderTopWidth: "show",
            borderBottomWidth: "show",
            paddingTop: "show",
            paddingBottom: "show",
            height: "show"
        },
        _create: function () {
            var e = this.options;
            this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), 0 > e.active && (e.active += this.headers.length), this._refresh()
        },
        _getCreateEventData: function () {
            return {header: this.active, panel: this.active.length ? this.active.next() : t()}
        },
        _createIcons: function () {
            var e = this.options.icons;
            e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function () {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function () {
            var t;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), t = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && t.css("height", "")
        },
        _setOption: function (t, e) {
            return "active" === t ? void this._activate(e) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), void("disabled" === t && (this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e),
                this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e))))
        },
        _keydown: function (e) {
            if (!e.altKey && !e.ctrlKey) {
                var i = t.ui.keyCode, s = this.headers.length, n = this.headers.index(e.target), o = !1;
                switch (e.keyCode) {
                    case i.RIGHT:
                    case i.DOWN:
                        o = this.headers[(n + 1) % s];
                        break;
                    case i.LEFT:
                    case i.UP:
                        o = this.headers[(n - 1 + s) % s];
                        break;
                    case i.SPACE:
                    case i.ENTER:
                        this._eventHandler(e);
                        break;
                    case i.HOME:
                        o = this.headers[0];
                        break;
                    case i.END:
                        o = this.headers[s - 1]
                }
                o && (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), o.focus(), e.preventDefault())
            }
        },
        _panelKeyDown: function (e) {
            e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
        },
        refresh: function () {
            var e = this.options;
            this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
        },
        _processPanels: function () {
            var t = this.headers, e = this.panels;
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)))
        },
        _refresh: function () {
            var e, i = this.options, s = i.heightStyle, n = this.element.parent();
            this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function () {
                var e = t(this), i = e.uniqueId().attr("id"), s = e.next(), n = s.uniqueId().attr("id");
                e.attr("aria-controls", n), s.attr("aria-labelledby", i)
            }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({"aria-hidden": "true"}).hide(), this.active.length ? this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }).next().attr({"aria-hidden": "false"}) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === s ? (e = n.height(), this.element.siblings(":visible").each(function () {
                var i = t(this), s = i.css("position");
                "absolute" !== s && "fixed" !== s && (e -= i.outerHeight(!0))
            }), this.headers.each(function () {
                e -= t(this).outerHeight(!0)
            }), this.headers.next().each(function () {
                t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === s && (e = 0, this.headers.next().each(function () {
                e = Math.max(e, t(this).css("height", "").height())
            }).height(e))
        },
        _activate: function (e) {
            var i = this._findActive(e)[0];
            i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function (e) {
            return "number" == typeof e ? this.headers.eq(e) : t()
        },
        _setupEvents: function (e) {
            var i = {keydown: "_keydown"};
            e && t.each(e.split(" "), function (t, e) {
                i[e] = "_eventHandler"
            }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {keydown: "_panelKeyDown"}), this._hoverable(this.headers), this._focusable(this.headers)
        },
        _eventHandler: function (e) {
            var i = this.options, s = this.active, n = t(e.currentTarget), o = n[0] === s[0], a = o && i.collapsible, r = a ? t() : n.next(), l = s.next(), h = {
                oldHeader: s,
                oldPanel: l,
                newHeader: a ? t() : n,
                newPanel: r
            };
            e.preventDefault(), o && !i.collapsible || this._trigger("beforeActivate", e, h) === !1 || (i.active = a ? !1 : this.headers.index(n), this.active = o ? t() : n, this._toggle(h), s.removeClass("ui-accordion-header-active ui-state-active"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), o || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), n.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function (e) {
            var i = e.newPanel, s = this.prevShow.length ? this.prevShow : e.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)), s.attr({"aria-hidden": "true"}), s.prev().attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }), i.length && s.length ? s.prev().attr({
                tabIndex: -1,
                "aria-expanded": "false"
            }) : i.length && this.headers.filter(function () {
                return 0 === parseInt(t(this).attr("tabIndex"), 10)
            }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _animate: function (t, e, i) {
            var s, n, o, a = this, r = 0, l = t.css("box-sizing"), h = t.length && (!e.length || t.index() < e.index()), c = this.options.animate || {}, d = h && c.down || c, u = function () {
                a._toggleComplete(i)
            };
            return "number" == typeof d && (o = d), "string" == typeof d && (n = d), n = n || d.easing || c.easing, o = o || d.duration || c.duration, e.length ? t.length ? (s = t.show().outerHeight(), e.animate(this.hideProps, {
                duration: o,
                easing: n,
                step: function (t, e) {
                    e.now = Math.round(t)
                }
            }), void t.hide().animate(this.showProps, {
                duration: o, easing: n, complete: u, step: function (t, i) {
                    i.now = Math.round(t), "height" !== i.prop ? "content-box" === l && (r += i.now) : "content" !== a.options.heightStyle && (i.now = Math.round(s - e.outerHeight() - r), r = 0)
                }
            })) : e.animate(this.hideProps, o, n, u) : t.animate(this.showProps, o, n, u)
        },
        _toggleComplete: function (t) {
            var e = t.oldPanel;
            e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
        }
    }), t.widget("ui.menu", {
        version: "1.11.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {submenu: "ui-icon-carat-1-e"},
            items: "> *",
            menus: "ul",
            position: {my: "left-1 top", at: "right top"},
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item": function (t) {
                    t.preventDefault()
                }, "click .ui-menu-item": function (e) {
                    var i = t(e.target);
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && t(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                }, "mouseenter .ui-menu-item": function (e) {
                    if (!this.previousFilter) {
                        var i = t(e.currentTarget);
                        i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
                    }
                }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function (t, e) {
                    var i = this.active || this.element.find(this.options.items).eq(0);
                    e || this.focus(t, i)
                }, blur: function (e) {
                    this._delay(function () {
                        t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                    })
                }, keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function (t) {
                    this._closeOnDocumentClick(t) && this.collapseAll(t), this.mouseHandled = !1
                }
            })
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var e = t(this);
                e.data("ui-menu-submenu-carat") && e.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function (e) {
            var i, s, n, o, a = !0;
            switch (e.keyCode) {
                case t.ui.keyCode.PAGE_UP:
                    this.previousPage(e);
                    break;
                case t.ui.keyCode.PAGE_DOWN:
                    this.nextPage(e);
                    break;
                case t.ui.keyCode.HOME:
                    this._move("first", "first", e);
                    break;
                case t.ui.keyCode.END:
                    this._move("last", "last", e);
                    break;
                case t.ui.keyCode.UP:
                    this.previous(e);
                    break;
                case t.ui.keyCode.DOWN:
                    this.next(e);
                    break;
                case t.ui.keyCode.LEFT:
                    this.collapse(e);
                    break;
                case t.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                    break;
                case t.ui.keyCode.ENTER:
                case t.ui.keyCode.SPACE:
                    this._activate(e);
                    break;
                case t.ui.keyCode.ESCAPE:
                    this.collapse(e);
                    break;
                default:
                    a = !1, s = this.previousFilter || "", n = String.fromCharCode(e.keyCode), o = !1, clearTimeout(this.filterTimer), n === s ? o = !0 : n = s + n, i = this._filterMenuItems(n), i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(e.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(e, i), this.previousFilter = n, this.filterTimer = this._delay(function () {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter
            }
            a && e.preventDefault()
        },
        _activate: function (t) {
            this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(t) : this.select(t))
        },
        refresh: function () {
            var e, i, s = this, n = this.options.icons.submenu, o = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), o.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var e = t(this), i = e.parent(), s = t("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
                i.attr("aria-haspopup", "true").prepend(s), e.attr("aria-labelledby", i.attr("id"))
            }), e = o.add(this.element), i = e.find(this.options.items), i.not(".ui-menu-item").each(function () {
                var e = t(this);
                s._isDivider(e) && e.addClass("ui-widget-content ui-menu-divider")
            }), i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            }), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function () {
            return {menu: "menuitem", listbox: "option"}[this.options.role]
        },
        _setOption: function (t, e) {
            "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e), this._super(t, e)
        },
        focus: function (t, e) {
            var i, s;
            this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function () {
                this._close()
            }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {item: e})
        },
        _scrollIntoView: function (e) {
            var i, s, n, o, a, r;
            this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.outerHeight(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r))
        },
        blur: function (t, e) {
            e || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {item: this.active}))
        },
        _startOpening: function (t) {
            clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function () {
                this._close(), this._open(t)
            }, this.delay))
        },
        _open: function (e) {
            var i = t.extend({of: this.active}, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function (e, i) {
            clearTimeout(this.timer), this.timer = this._delay(function () {
                var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                s.length || (s = this.element), this._close(s), this.blur(e), this.activeMenu = s
            }, this.delay)
        },
        _close: function (t) {
            t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
        },
        _closeOnDocumentClick: function (e) {
            return !t(e.target).closest(".ui-menu").length
        },
        _isDivider: function (t) {
            return !/[^\-\u2014\u2013\s]/.test(t.text())
        },
        collapse: function (t) {
            var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            e && e.length && (this._close(), this.focus(t, e))
        },
        expand: function (t) {
            var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            e && e.length && (this._open(e.parent()), this._delay(function () {
                this.focus(t, e)
            }))
        },
        next: function (t) {
            this._move("next", "first", t)
        },
        previous: function (t) {
            this._move("prev", "last", t)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (t, e, i) {
            var s;
            this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[e]()), this.focus(i, s)
        },
        nextPage: function (e) {
            var i, s, n;
            return this.active ? void(this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                return i = t(this), 0 > i.offset().top - s - n
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(e)
        },
        previousPage: function (e) {
            var i, s, n;
            return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                return i = t(this), i.offset().top - s + n > 0
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first()))) : void this.next(e)
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (e) {
            this.active = this.active || t(e.target).closest(".ui-menu-item");
            var i = {item: this.active};
            this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
        },
        _filterMenuItems: function (e) {
            var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), s = RegExp("^" + i, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
                return s.test(t.trim(t(this).text()))
            })
        }
    }), t.widget("ui.autocomplete", {
        version: "1.11.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {my: "left top", at: "left bottom", collision: "none"},
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function () {
            var e, i, s, n = this.element[0].nodeName.toLowerCase(), o = "textarea" === n, a = "input" === n;
            this.isMultiLine = o ? !0 : a ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function (n) {
                    if (this.element.prop("readOnly"))return e = !0, s = !0, void(i = !0);
                    e = !1, s = !1, i = !1;
                    var o = t.ui.keyCode;
                    switch (n.keyCode) {
                        case o.PAGE_UP:
                            e = !0, this._move("previousPage", n);
                            break;
                        case o.PAGE_DOWN:
                            e = !0, this._move("nextPage", n);
                            break;
                        case o.UP:
                            e = !0, this._keyEvent("previous", n);
                            break;
                        case o.DOWN:
                            e = !0, this._keyEvent("next", n);
                            break;
                        case o.ENTER:
                            this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));
                            break;
                        case o.TAB:
                            this.menu.active && this.menu.select(n);
                            break;
                        case o.ESCAPE:
                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());
                            break;
                        default:
                            i = !0, this._searchTimeout(n)
                    }
                }, keypress: function (s) {
                    if (e)return e = !1, void((!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault());
                    if (!i) {
                        var n = t.ui.keyCode;
                        switch (s.keyCode) {
                            case n.PAGE_UP:
                                this._move("previousPage", s);
                                break;
                            case n.PAGE_DOWN:
                                this._move("nextPage", s);
                                break;
                            case n.UP:
                                this._keyEvent("previous", s);
                                break;
                            case n.DOWN:
                                this._keyEvent("next", s)
                        }
                    }
                }, input: function (t) {
                    return s ? (s = !1, void t.preventDefault()) : void this._searchTimeout(t)
                }, focus: function () {
                    this.selectedItem = null, this.previous = this._value()
                }, blur: function (t) {
                    return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(t), void this._change(t))
                }
            }), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role: null}).hide().menu("instance"), this._on(this.menu.element, {
                mousedown: function (e) {
                    e.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    t(e.target).closest(".ui-menu-item").length || this._delay(function () {
                        var e = this;
                        this.document.one("mousedown", function (s) {
                            s.target === e.element[0] || s.target === i || t.contains(i, s.target) || e.close()
                        })
                    })
                }, menufocus: function (e, i) {
                    var s, n;
                    return this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function () {
                        t(e.target).trigger(e.originalEvent)
                    })) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, {item: n}) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, void(s && t.trim(s).length && (this.liveRegion.children().hide(), t("<div>").text(s).appendTo(this.liveRegion))))
                }, menuselect: function (t, e) {
                    var i = e.item.data("ui-autocomplete-item"), s = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function () {
                        this.previous = s, this.selectedItem = i
                    })), !1 !== this._trigger("select", t, {item: i}) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
                }
            }), this.liveRegion = t("<span>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function (t, e) {
            this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
        },
        _appendTo: function () {
            var e = this.options.appendTo;
            return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
        },
        _initSource: function () {
            var e, i, s = this;
            t.isArray(this.options.source) ? (e = this.options.source, this.source = function (i, s) {
                s(t.ui.autocomplete.filter(e, i.term))
            }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (e, n) {
                s.xhr && s.xhr.abort(), s.xhr = t.ajax({
                    url: i, data: e, dataType: "json", success: function (t) {
                        n(t)
                    }, error: function () {
                        n([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function (t) {
            clearTimeout(this.searching), this.searching = this._delay(function () {
                var e = this.term === this._value(), i = this.menu.element.is(":visible"), s = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
                (!e || e && !i && !s) && (this.selectedItem = null, this.search(null, t))
            }, this.options.delay)
        },
        search: function (t, e) {
            return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
        },
        _search: function (t) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({term: t}, this._response())
        },
        _response: function () {
            var e = ++this.requestIndex;
            return t.proxy(function (t) {
                e === this.requestIndex && this.__response(t), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function (t) {
            t && (t = this._normalize(t)), this._trigger("response", null, {content: t}), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
        },
        close: function (t) {
            this.cancelSearch = !0, this._close(t)
        },
        _close: function (t) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
        },
        _change: function (t) {
            this.previous !== this._value() && this._trigger("change", t, {item: this.selectedItem})
        },
        _normalize: function (e) {
            return e.length && e[0].label && e[0].value ? e : t.map(e, function (e) {
                return "string" == typeof e ? {label: e, value: e} : t.extend({}, e, {
                    label: e.label || e.value,
                    value: e.value || e.label
                })
            })
        },
        _suggest: function (e) {
            var i = this.menu.element.empty();
            this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({of: this.element}, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function () {
            var t = this.menu.element;
            t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (e, i) {
            var s = this;
            t.each(i, function (t, i) {
                s._renderItemData(e, i)
            })
        },
        _renderItemData: function (t, e) {
            return this._renderItem(t, e).data("ui-autocomplete-item", e)
        },
        _renderItem: function (e, i) {
            return t("<li>").text(i.label).appendTo(e)
        },
        _move: function (t, e) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[t](e) : void this.search(null, e)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (t, e) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
        }
    }), t.extend(t.ui.autocomplete, {
        escapeRegex: function (t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }, filter: function (e, i) {
            var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
            return t.grep(e, function (t) {
                return s.test(t.label || t.value || t)
            })
        }
    }), t.widget("ui.autocomplete", t.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (t) {
                    return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        }, __response: function (e) {
            var i;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion))
        }
    }), t.ui.autocomplete;
    var u, p = "ui-button ui-widget ui-state-default ui-corner-all", f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", m = function () {
        var e = t(this);
        setTimeout(function () {
            e.find(":ui-button").button("refresh")
        }, 1)
    }, g = function (e) {
        var i = e.name, s = e.form, n = t([]);
        return i && (i = i.replace(/'/g, "\\'"), n = s ? t(s).find("[name='" + i + "'][type=radio]") : t("[name='" + i + "'][type=radio]", e.ownerDocument).filter(function () {
            return !this.form
        })), n
    };
    t.widget("ui.button", {
        version: "1.11.4",
        defaultElement: "<button>",
        options: {disabled: null, text: !0, label: null, icons: {primary: null, secondary: null}},
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, m), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var e = this, i = this.options, s = "checkbox" === this.type || "radio" === this.type, n = s ? "" : "ui-state-active";
            null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(p).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                i.disabled || this === u && t(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function () {
                i.disabled || t(this).removeClass(n)
            }).bind("click" + this.eventNamespace, function (t) {
                i.disabled && (t.preventDefault(), t.stopImmediatePropagation())
            }), this._on({
                focus: function () {
                    this.buttonElement.addClass("ui-state-focus")
                }, blur: function () {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            }), s && this.element.bind("change" + this.eventNamespace, function () {
                e.refresh()
            }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                return i.disabled ? !1 : void 0
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                if (i.disabled)return !1;
                t(this).addClass("ui-state-active"), e.buttonElement.attr("aria-pressed", "true");
                var s = e.element[0];
                g(s).not(s).map(function () {
                    return t(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                return i.disabled ? !1 : (t(this).addClass("ui-state-active"), u = this, void e.document.one("mouseup", function () {
                    u = null
                }))
            }).bind("mouseup" + this.eventNamespace, function () {
                return i.disabled ? !1 : void t(this).removeClass("ui-state-active")
            }).bind("keydown" + this.eventNamespace, function (e) {
                return i.disabled ? !1 : void((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"))
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                t(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function (e) {
                e.keyCode === t.ui.keyCode.SPACE && t(this).click()
            })), this._setOption("disabled", i.disabled), this._resetButton()
        },
        _determineButtonType: function () {
            var t, e, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(p + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function (t, e) {
            return this._super(t, e), "disabled" === t ? (this.widget().toggleClass("ui-state-disabled", !!e), this.element.prop("disabled", !!e), void(e && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")))) : void this._resetButton()
        },
        refresh: function () {
            var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? g(this.element[0]).each(function () {
                t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function () {
            if ("input" === this.type)return void(this.options.label && this.element.val(this.options.label));
            var e = this.buttonElement.removeClass(f), i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(), s = this.options.icons, n = s.primary && s.secondary, o = [];
            s.primary || s.secondary ? (this.options.text && o.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (o.push(n ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : o.push("ui-button-text-only"), e.addClass(o.join(" "))
        }
    }), t.widget("ui.buttonset", {
        version: "1.11.4",
        options: {items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (t, e) {
            "disabled" === t && this.buttons.button("option", t, e), this._super(t, e)
        },
        refresh: function () {
            var e = "rtl" === this.element.css("direction"), i = this.element.find(this.options.items), s = i.filter(":ui-button");
            i.not(":ui-button").button(), s.button("refresh"), this.buttons = i.map(function () {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    }), t.ui.button, t.extend(t.ui, {datepicker: {version: "1.11.4"}});
    var v;
    t.extend(n.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (t) {
            return r(this._defaults, t || {}), this
        },
        _attachDatepicker: function (e, i) {
            var s, n, o;
            s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), n), o.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, o) : n && this._inlineDatepicker(e, o)
        },
        _newInst: function (e, i) {
            var s = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: s,
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? o(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function (e, i) {
            var s = t(e);
            i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function (e, i) {
            var s, n, o, a = this._get(i, "appendText"), r = this._get(i, "isRTL");
            i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                src: o,
                alt: n,
                title: n
            }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({
                src: o,
                alt: n,
                title: n
            }) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.click(function () {
                return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
            }))
        },
        _autoSize: function (t) {
            if (this._get(t, "autoSize") && !t.inline) {
                var e, i, s, n, o = new Date(2009, 11, 20), a = this._get(t, "dateFormat");
                a.match(/[DM]/) && (e = function (t) {
                    for (i = 0, s = 0, n = 0; t.length > n; n++)t[n].length > i && (i = t[n].length, s = n);
                    return s
                }, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length)
            }
        },
        _inlineDatepicker: function (e, i) {
            var s = t(e);
            s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (e, i, s, n, o) {
            var a, l, h, c, d, u = this._dialogInst;
            return u || (this.uuid += 1, a = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + a + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), u = this._dialogInst = this._newInst(this._dialogInput, !1), u.settings = {}, t.data(this._dialogInput[0], "datepicker", u)), r(u.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(u, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, h = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + c, h / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), u.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", u), this
        },
        _destroyDatepicker: function (e) {
            var i, s = t(e), n = t.data(e, "datepicker");
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty(), v === n && (v = null))
        },
        _enableDatepicker: function (e) {
            var i, s, n = t(e), o = t.data(e, "datepicker");
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function () {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
                return t === e ? null : t
            }))
        },
        _disableDatepicker: function (e) {
            var i, s, n = t(e), o = t.data(e, "datepicker");
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function () {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
                return t === e ? null : t
            }), this._disabledInputs[this._disabledInputs.length] = e)
        },
        _isDisabledDatepicker: function (t) {
            if (!t)return !1;
            for (var e = 0; this._disabledInputs.length > e; e++)if (this._disabledInputs[e] === t)return !0;
            return !1
        },
        _getInst: function (e) {
            try {
                return t.data(e, "datepicker")
            } catch (i) {
                throw"Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (e, i, s) {
            var n, o, a, l, h = this._getInst(e);
            return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({}, t.datepicker._defaults) : h ? "all" === i ? t.extend({}, h.settings) : this._get(h, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), void(h && (this._curInst === h && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), a = this._getMinMaxDate(h, "min"), l = this._getMinMaxDate(h, "max"), r(h.settings, n), null !== a && void 0 !== n.dateFormat && void 0 === n.minDate && (h.settings.minDate = this._formatDate(h, a)), null !== l && void 0 !== n.dateFormat && void 0 === n.maxDate && (h.settings.maxDate = this._formatDate(h, l)), "disabled"in n && (n.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), h), this._autoSize(h), this._setDate(h, o), this._updateAlternate(h), this._updateDatepicker(h))))
        },
        _changeDatepicker: function (t, e, i) {
            this._optionDatepicker(t, e, i)
        },
        _refreshDatepicker: function (t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e)
        },
        _setDateDatepicker: function (t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function (t, e) {
            var i = this._getInst(t);
            return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
        },
        _doKeyDown: function (e) {
            var i, s, n, o = t.datepicker._getInst(e.target), a = !0, r = o.dpDiv.is(".ui-datepicker-rtl");
            if (o._keyEvent = !0, t.datepicker._datepickerShowing)switch (e.keyCode) {
                case 9:
                    t.datepicker._hideDatepicker(), a = !1;
                    break;
                case 13:
                    return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), n[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, n[0]), i = t.datepicker._get(o, "onSelect"), i ? (s = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [s, o])) : t.datepicker._hideDatepicker(), !1;
                case 27:
                    t.datepicker._hideDatepicker();
                    break;
                case 33:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 34:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 35:
                    (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;
                    break;
                case 36:
                    (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;
                    break;
                case 37:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 38:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;
                    break;
                case 39:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 40:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;
                    break;
                default:
                    a = !1
            } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
            a && (e.preventDefault(), e.stopPropagation())
        },
        _doKeyPress: function (e) {
            var i, s, n = t.datepicker._getInst(e.target);
            return t.datepicker._get(n, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0
        },
        _doKeyUp: function (e) {
            var i, s = t.datepicker._getInst(e.target);
            if (s.input.val() !== s.lastVal)try {
                i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s))
            } catch (n) {
            }
            return !0
        },
        _showDatepicker: function (e) {
            if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                var i, n, o, a, l, h, c;
                i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(i, "beforeShow"), o = n ? n.apply(e, [e, i]) : {}, o !== !1 && (r(i.settings, o), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), a = !1, t(e).parents().each(function () {
                    return a |= "fixed" === t(this).css("position"), !a
                }), l = {
                    left: t.datepicker._pos[0],
                    top: t.datepicker._pos[1]
                }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), t.datepicker._updateDatepicker(i), l = t.datepicker._checkOffset(i, l, a), i.dpDiv.css({
                    position: t.datepicker._inDialog && t.blockUI ? "static" : a ? "fixed" : "absolute",
                    display: "none",
                    left: l.left + "px",
                    top: l.top + "px"
                }), i.inline || (h = t.datepicker._get(i, "showAnim"), c = t.datepicker._get(i, "duration"), i.dpDiv.css("z-index", s(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), c) : i.dpDiv[h || "show"](h ? c : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function (e) {
            this.maxRows = 4, v = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
            var i, s = this._getNumberOfMonths(e), n = s[1], o = 17, r = e.dpDiv.find("." + this._dayOverClass + " a");
            r.length > 0 && a.apply(r.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", o * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function () {
                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function (t) {
            return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
        },
        _checkOffset: function (e, i, s) {
            var n = e.dpDiv.outerWidth(), o = e.dpDiv.outerHeight(), a = e.input ? e.input.outerWidth() : 0, r = e.input ? e.input.outerHeight() : 0, l = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()), h = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
            return i.left -= this._get(e, "isRTL") ? n - a : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > l && l > n ? Math.abs(i.left + n - l) : 0), i.top -= Math.min(i.top, i.top + o > h && h > o ? Math.abs(o + r) : 0), i
        },
        _findPos: function (e) {
            for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));)e = e[n ? "previousSibling" : "nextSibling"];
            return i = t(e).offset(), [i.left, i.top]
        },
        _hideDatepicker: function (e) {
            var i, s, n, o, a = this._curInst;
            !a || e && a !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(a, "showAnim"), s = this._get(a, "duration"), n = function () {
                t.datepicker._tidyDialog(a)
            }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), s, n) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, o = this._get(a, "onClose"), o && o.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function (t) {
            t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (e) {
            if (t.datepicker._curInst) {
                var i = t(e.target), s = t.datepicker._getInst(i[0]);
                (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (e, i, s) {
            var n = t(e), o = this._getInst(n[0]);
            this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(o, i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0), s), this._updateDatepicker(o))
        },
        _gotoToday: function (e) {
            var i, s = t(e), n = this._getInst(s[0]);
            this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
        },
        _selectMonthYear: function (e, i, s) {
            var n = t(e), o = this._getInst(n[0]);
            o["selected" + ("M" === s ? "Month" : "Year")] = o["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(n)
        },
        _selectDay: function (e, i, s, n) {
            var o, a = t(e);
            t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", n).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = s, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
        },
        _clearDate: function (e) {
            var i = t(e);
            this._selectDate(i, "")
        },
        _selectDate: function (e, i) {
            var s, n = t(e), o = this._getInst(n[0]);
            i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), s = this._get(o, "onSelect"), s ? s.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (e) {
            var i, s, n, o = this._get(e, "altField");
            o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(o).each(function () {
                t(this).val(n)
            }))
        },
        noWeekends: function (t) {
            var e = t.getDay();
            return [e > 0 && 6 > e, ""]
        },
        iso8601Week: function (t) {
            var e, i = new Date(t.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
        },
        parseDate: function (e, i, s) {
            if (null == e || null == i)throw"Invalid arguments";
            if (i = "object" == typeof i ? "" + i : i + "", "" === i)return null;
            var n, o, a, r, l = 0, h = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff, c = "string" != typeof h ? h : (new Date).getFullYear() % 100 + parseInt(h, 10), d = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort, u = (s ? s.dayNames : null) || this._defaults.dayNames, p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort, f = (s ? s.monthNames : null) || this._defaults.monthNames, m = -1, g = -1, v = -1, b = -1, _ = !1, w = function (t) {
                var i = e.length > n + 1 && e.charAt(n + 1) === t;
                return i && n++, i
            }, y = function (t) {
                var e = w(t), s = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2, n = "y" === t ? s : 1, o = RegExp("^\\d{" + n + "," + s + "}"), a = i.substring(l).match(o);
                if (!a)throw"Missing number at position " + l;
                return l += a[0].length, parseInt(a[0], 10)
            }, x = function (e, s, n) {
                var o = -1, a = t.map(w(e) ? n : s, function (t, e) {
                    return [[e, t]]
                }).sort(function (t, e) {
                    return -(t[1].length - e[1].length)
                });
                if (t.each(a, function (t, e) {
                        var s = e[1];
                        return i.substr(l, s.length).toLowerCase() === s.toLowerCase() ? (o = e[0], l += s.length, !1) : void 0
                    }), -1 !== o)return o + 1;
                throw"Unknown name at position " + l
            }, C = function () {
                if (i.charAt(l) !== e.charAt(n))throw"Unexpected literal at position " + l;
                l++
            };
            for (n = 0; e.length > n; n++)if (_)"'" !== e.charAt(n) || w("'") ? C() : _ = !1; else switch (e.charAt(n)) {
                case"d":
                    v = y("d");
                    break;
                case"D":
                    x("D", d, u);
                    break;
                case"o":
                    b = y("o");
                    break;
                case"m":
                    g = y("m");
                    break;
                case"M":
                    g = x("M", p, f);
                    break;
                case"y":
                    m = y("y");
                    break;
                case"@":
                    r = new Date(y("@")), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                    break;
                case"!":
                    r = new Date((y("!") - this._ticksTo1970) / 1e4), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                    break;
                case"'":
                    w("'") ? C() : _ = !0;
                    break;
                default:
                    C()
            }
            if (i.length > l && (a = i.substr(l), !/^\s+/.test(a)))throw"Extra/unparsed characters found in date: " + a;
            if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (c >= m ? 0 : -100)), b > -1)for (g = 1, v = b; o = this._getDaysInMonth(m, g - 1), !(o >= v);)g++, v -= o;
            if (r = this._daylightSavingAdjust(new Date(m, g - 1, v)), r.getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v)throw"Invalid date";
            return r
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function (t, e, i) {
            if (!e)return "";
            var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, o = (i ? i.dayNames : null) || this._defaults.dayNames, a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, r = (i ? i.monthNames : null) || this._defaults.monthNames, l = function (e) {
                var i = t.length > s + 1 && t.charAt(s + 1) === e;
                return i && s++, i
            }, h = function (t, e, i) {
                var s = "" + e;
                if (l(t))for (; i > s.length;)s = "0" + s;
                return s
            }, c = function (t, e, i, s) {
                return l(t) ? s[e] : i[e]
            }, d = "", u = !1;
            if (e)for (s = 0; t.length > s; s++)if (u)"'" !== t.charAt(s) || l("'") ? d += t.charAt(s) : u = !1; else switch (t.charAt(s)) {
                case"d":
                    d += h("d", e.getDate(), 2);
                    break;
                case"D":
                    d += c("D", e.getDay(), n, o);
                    break;
                case"o":
                    d += h("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                    break;
                case"m":
                    d += h("m", e.getMonth() + 1, 2);
                    break;
                case"M":
                    d += c("M", e.getMonth(), a, r);
                    break;
                case"y":
                    d += l("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
                    break;
                case"@":
                    d += e.getTime();
                    break;
                case"!":
                    d += 1e4 * e.getTime() + this._ticksTo1970;
                    break;
                case"'":
                    l("'") ? d += "'" : u = !0;
                    break;
                default:
                    d += t.charAt(s)
            }
            return d
        },
        _possibleChars: function (t) {
            var e, i = "", s = !1, n = function (i) {
                var s = t.length > e + 1 && t.charAt(e + 1) === i;
                return s && e++, s
            };
            for (e = 0; t.length > e; e++)if (s)"'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1; else switch (t.charAt(e)) {
                case"d":
                case"m":
                case"y":
                case"@":
                    i += "0123456789";
                    break;
                case"D":
                case"M":
                    return null;
                case"'":
                    n("'") ? i += "'" : s = !0;
                    break;
                default:
                    i += t.charAt(e)
            }
            return i
        },
        _get: function (t, e) {
            return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e]
        },
        _setDateFromField: function (t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat"), s = t.lastVal = t.input ? t.input.val() : null, n = this._getDefaultDate(t), o = n, a = this._getFormatConfig(t);
                try {
                    o = this.parseDate(i, s, a) || n
                } catch (r) {
                    s = e ? "" : s
                }
                t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = s ? o.getDate() : 0, t.currentMonth = s ? o.getMonth() : 0, t.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(t)
            }
        },
        _getDefaultDate: function (t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
        },
        _determineDate: function (e, i, s) {
            var n = function (t) {
                var e = new Date;
                return e.setDate(e.getDate() + t), e
            }, o = function (i) {
                try {
                    return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                } catch (s) {
                }
                for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, o = n.getFullYear(), a = n.getMonth(), r = n.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, h = l.exec(i); h;) {
                    switch (h[2] || "d") {
                        case"d":
                        case"D":
                            r += parseInt(h[1], 10);
                            break;
                        case"w":
                        case"W":
                            r += 7 * parseInt(h[1], 10);
                            break;
                        case"m":
                        case"M":
                            a += parseInt(h[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));
                            break;
                        case"y":
                        case"Y":
                            o += parseInt(h[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a))
                    }
                    h = l.exec(i)
                }
                return new Date(o, a, r)
            }, a = null == i || "" === i ? s : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
            return a = a && "Invalid Date" == "" + a ? s : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
        },
        _daylightSavingAdjust: function (t) {
            return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
        },
        _setDate: function (t, e, i) {
            var s = !e, n = t.selectedMonth, o = t.selectedYear, a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
        },
        _getDate: function (t) {
            var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return e
        },
        _attachHandlers: function (e) {
            var i = this._get(e, "stepMonths"), s = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function () {
                var e = {
                    prev: function () {
                        t.datepicker._adjustDate(s, -i, "M")
                    }, next: function () {
                        t.datepicker._adjustDate(s, +i, "M")
                    }, hide: function () {
                        t.datepicker._hideDatepicker()
                    }, today: function () {
                        t.datepicker._gotoToday(s)
                    }, selectDay: function () {
                        return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    }, selectMonth: function () {
                        return t.datepicker._selectMonthYear(s, this, "M"), !1
                    }, selectYear: function () {
                        return t.datepicker._selectMonthYear(s, this, "Y"), !1
                    }
                };
                t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (t) {
            var e, i, s, n, o, a, r, l, h, c, d, u, p, f, m, g, v, b, _, w, y, x, C, k, I, T, S, D, P, O, A, $, M, z, E, H, N, W, F, B = new Date, L = this._daylightSavingAdjust(new Date(B.getFullYear(), B.getMonth(), B.getDate())), R = this._get(t, "isRTL"), j = this._get(t, "showButtonPanel"), q = this._get(t, "hideIfNoPrevNext"), Y = this._get(t, "navigationAsDateFormat"), U = this._getNumberOfMonths(t), V = this._get(t, "showCurrentAtPos"), K = this._get(t, "stepMonths"), X = 1 !== U[0] || 1 !== U[1], G = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)), Q = this._getMinMaxDate(t, "min"), J = this._getMinMaxDate(t, "max"), Z = t.drawMonth - V, tt = t.drawYear;
            if (0 > Z && (Z += 12, tt--), J)for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - U[0] * U[1] + 1, J.getDate())), e = Q && Q > e ? Q : e; this._daylightSavingAdjust(new Date(tt, Z, 1)) > e;)Z--, 0 > Z && (Z = 11, tt--);
            for (t.drawMonth = Z, t.drawYear = tt, i = this._get(t, "prevText"), i = Y ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, Z - K, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, tt, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "e" : "w") + "'>" + i + "</span></a>" : q ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = Y ? this.formatDate(n, this._daylightSavingAdjust(new Date(tt, Z + K, 1)), this._getFormatConfig(t)) : n, o = this._canAdjustMonth(t, 1, tt, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "w" : "e") + "'>" + n + "</span></a>" : q ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (R ? "w" : "e") + "'>" + n + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? G : L, a = Y ? this.formatDate(a, r, this._getFormatConfig(t)) : a, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", h = j ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (R ? l : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (R ? "" : l) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, d = this._get(t, "showWeek"), u = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), b = this._get(t, "selectOtherMonths"), _ = this._getDefaultDate(t), w = "", x = 0; U[0] > x; x++) {
                for (C = "", this.maxRows = 4, k = 0; U[1] > k; k++) {
                    if (I = this._daylightSavingAdjust(new Date(tt, Z, t.selectedDay)), T = " ui-corner-all", S = "", X) {
                        if (S += "<div class='ui-datepicker-group", U[1] > 1)switch (k) {
                            case 0:
                                S += " ui-datepicker-group-first", T = " ui-corner-" + (R ? "right" : "left");
                                break;
                            case U[1] - 1:
                                S += " ui-datepicker-group-last", T = " ui-corner-" + (R ? "left" : "right");
                                break;
                            default:
                                S += " ui-datepicker-group-middle", T = ""
                        }
                        S += "'>"
                    }
                    for (S += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && 0 === x ? R ? o : s : "") + (/all|right/.test(T) && 0 === x ? R ? s : o : "") + this._generateMonthYearHeader(t, Z, tt, Q, J, x > 0 || k > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead><tr>", D = d ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", y = 0; 7 > y; y++)P = (y + c) % 7, D += "<th scope='col'" + ((y + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + u[P] + "'>" + p[P] + "</span></th>";
                    for (S += D + "</tr></thead><tbody>", O = this._getDaysInMonth(tt, Z), tt === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, O)), A = (this._getFirstDayOfMonth(tt, Z) - c + 7) % 7, $ = Math.ceil((A + O) / 7), M = X && this.maxRows > $ ? this.maxRows : $, this.maxRows = M, z = this._daylightSavingAdjust(new Date(tt, Z, 1 - A)), E = 0; M > E; E++) {
                        for (S += "<tr>", H = d ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(z) + "</td>" : "", y = 0; 7 > y; y++)N = g ? g.apply(t.input ? t.input[0] : null, [z]) : [!0, ""], W = z.getMonth() !== Z, F = W && !b || !N[0] || Q && Q > z || J && z > J, H += "<td class='" + ((y + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (W ? " ui-datepicker-other-month" : "") + (z.getTime() === I.getTime() && Z === t.selectedMonth && t._keyEvent || _.getTime() === z.getTime() && _.getTime() === I.getTime() ? " " + this._dayOverClass : "") + (F ? " " + this._unselectableClass + " ui-state-disabled" : "") + (W && !v ? "" : " " + N[1] + (z.getTime() === G.getTime() ? " " + this._currentClass : "") + (z.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (W && !v || !N[2] ? "" : " title='" + N[2].replace(/'/g, "&#39;") + "'") + (F ? "" : " data-handler='selectDay' data-event='click' data-month='" + z.getMonth() + "' data-year='" + z.getFullYear() + "'") + ">" + (W && !v ? "&#xa0;" : F ? "<span class='ui-state-default'>" + z.getDate() + "</span>" : "<a class='ui-state-default" + (z.getTime() === L.getTime() ? " ui-state-highlight" : "") + (z.getTime() === G.getTime() ? " ui-state-active" : "") + (W ? " ui-priority-secondary" : "") + "' href='#'>" + z.getDate() + "</a>") + "</td>", z.setDate(z.getDate() + 1), z = this._daylightSavingAdjust(z);
                        S += H + "</tr>"
                    }
                    Z++, Z > 11 && (Z = 0, tt++), S += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && k === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), C += S
                }
                w += C
            }
            return w += h, t._keyEvent = !1, w
        },
        _generateMonthYearHeader: function (t, e, i, s, n, o, a, r) {
            var l, h, c, d, u, p, f, m, g = this._get(t, "changeMonth"), v = this._get(t, "changeYear"), b = this._get(t, "showMonthAfterYear"), _ = "<div class='ui-datepicker-title'>", w = "";
            if (o || !g)w += "<span class='ui-datepicker-month'>" + a[e] + "</span>"; else {
                for (l = s && s.getFullYear() === i, h = n && n.getFullYear() === i, w += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)(!l || c >= s.getMonth()) && (!h || n.getMonth() >= c) && (w += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
                w += "</select>"
            }
            if (b || (_ += w + (!o && g && v ? "" : "&#xa0;")), !t.yearshtml)if (t.yearshtml = "", o || !v)_ += "<span class='ui-datepicker-year'>" + i + "</span>"; else {
                for (d = this._get(t, "yearRange").split(":"), u = (new Date).getFullYear(), p = function (t) {
                    var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? u + parseInt(t, 10) : parseInt(t, 10);
                    return isNaN(e) ? u : e
                }, f = p(d[0]), m = Math.max(f, p(d[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, m = n ? Math.min(m, n.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++)t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                t.yearshtml += "</select>", _ += t.yearshtml, t.yearshtml = null
            }
            return _ += this._get(t, "yearSuffix"), b && (_ += (!o && g && v ? "" : "&#xa0;") + w), _ += "</div>"
        },
        _adjustInstDate: function (t, e, i) {
            var s = t.drawYear + ("Y" === i ? e : 0), n = t.drawMonth + ("M" === i ? e : 0), o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0), a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
            t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
        },
        _restrictMinMax: function (t, e) {
            var i = this._getMinMaxDate(t, "min"), s = this._getMinMaxDate(t, "max"), n = i && i > e ? i : e;
            return s && n > s ? s : n
        },
        _notifyChange: function (t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        },
        _getNumberOfMonths: function (t) {
            var e = this._get(t, "numberOfMonths");
            return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
        },
        _getMinMaxDate: function (t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null)
        },
        _getDaysInMonth: function (t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
        },
        _getFirstDayOfMonth: function (t, e) {
            return new Date(t, e, 1).getDay()
        },
        _canAdjustMonth: function (t, e, i, s) {
            var n = this._getNumberOfMonths(t), o = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
            return 0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
        },
        _isInRange: function (t, e) {
            var i, s, n = this._getMinMaxDate(t, "min"), o = this._getMinMaxDate(t, "max"), a = null, r = null, l = this._get(t, "yearRange");
            return l && (i = l.split(":"), s = (new Date).getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || r >= e.getFullYear())
        },
        _getFormatConfig: function (t) {
            var e = this._get(t, "shortYearCutoff");
            return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                shortYearCutoff: e,
                dayNamesShort: this._get(t, "dayNamesShort"),
                dayNames: this._get(t, "dayNames"),
                monthNamesShort: this._get(t, "monthNamesShort"),
                monthNames: this._get(t, "monthNames")
            }
        },
        _formatDate: function (t, e, i, s) {
            e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
            var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
        }
    }), t.fn.datepicker = function (e) {
        if (!this.length)return this;
        t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function () {
            "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
        }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    }, t.datepicker = new n, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.11.4", t.datepicker, t.widget("ui.dialog", {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "Close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center", at: "center", of: window, collision: "fit", using: function (e) {
                    var i = t(this).css(e).offset().top;
                    0 > i && t(this).css("top", e.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0},
        _create: function () {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(),
                this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        _appendTo: function () {
            var e = this.options.appendTo;
            return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
        },
        _destroy: function () {
            var t, e = this.originalPosition;
            this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
        },
        widget: function () {
            return this.uiDialog
        },
        disable: t.noop,
        enable: t.noop,
        close: function (e) {
            var i, s = this;
            if (this._isOpen && this._trigger("beforeClose", e) !== !1) {
                if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length)try {
                    i = this.document[0].activeElement, i && "body" !== i.nodeName.toLowerCase() && t(i).blur()
                } catch (n) {
                }
                this._hide(this.uiDialog, this.options.hide, function () {
                    s._trigger("close", e)
                })
            }
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function () {
            this._moveToTop()
        },
        _moveToTop: function (e, i) {
            var s = !1, n = this.uiDialog.siblings(".ui-front:visible").map(function () {
                return +t(this).css("z-index")
            }).get(), o = Math.max.apply(null, n);
            return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), s = !0), s && !i && this._trigger("focus", e), s
        },
        open: function () {
            var e = this;
            return this._isOpen ? void(this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function () {
                e._focusTabbable(), e._trigger("focus")
            }), this._makeFocusTarget(), void this._trigger("open"))
        },
        _focusTabbable: function () {
            var t = this._focusedElement;
            t || (t = this.element.find("[autofocus]")), t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).focus()
        },
        _keepFocus: function (e) {
            function i() {
                var e = this.document[0].activeElement, i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
                i || this._focusTabbable()
            }

            e.preventDefault(), i.call(this), this._delay(i)
        },
        _createWrapper: function () {
            this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                keydown: function (e) {
                    if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE)return e.preventDefault(), void this.close(e);
                    if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                        var i = this.uiDialog.find(":tabbable"), s = i.filter(":first"), n = i.filter(":last");
                        e.target !== n[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== s[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function () {
                            n.focus()
                        }), e.preventDefault()) : (this._delay(function () {
                            s.focus()
                        }), e.preventDefault())
                    }
                }, mousedown: function (t) {
                    this._moveToTop(t) && this._focusTabbable()
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({"aria-describedby": this.element.uniqueId().attr("id")})
        },
        _createTitlebar: function () {
            var e;
            this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                mousedown: function (e) {
                    t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {primary: "ui-icon-closethick"},
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                click: function (t) {
                    t.preventDefault(), this.close(t)
                }
            }), e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e), this.uiDialog.attr({"aria-labelledby": e.attr("id")})
        },
        _title: function (t) {
            this.options.title || t.html("&#160;"), t.text(this.options.title)
        },
        _createButtonPane: function () {
            this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
        },
        _createButtons: function () {
            var e = this, i = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? void this.uiDialog.removeClass("ui-dialog-buttons") : (t.each(i, function (i, s) {
                var n, o;
                s = t.isFunction(s) ? {
                    click: s,
                    text: i
                } : s, s = t.extend({type: "button"}, s), n = s.click, s.click = function () {
                    n.apply(e.element[0], arguments)
                }, o = {
                    icons: s.icons,
                    text: s.showText
                }, delete s.icons, delete s.showText, t("<button></button>", s).button(o).appendTo(e.uiButtonSet)
            }), this.uiDialog.addClass("ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog))
        },
        _makeDraggable: function () {
            function e(t) {
                return {position: t.position, offset: t.offset}
            }

            var i = this, s = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (s, n) {
                    t(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, e(n))
                },
                drag: function (t, s) {
                    i._trigger("drag", t, e(s))
                },
                stop: function (n, o) {
                    var a = o.offset.left - i.document.scrollLeft(), r = o.offset.top - i.document.scrollTop();
                    s.position = {
                        my: "left top",
                        at: "left" + (a >= 0 ? "+" : "") + a + " top" + (r >= 0 ? "+" : "") + r,
                        of: i.window
                    }, t(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, e(o))
                }
            })
        },
        _makeResizable: function () {
            function e(t) {
                return {
                    originalPosition: t.originalPosition,
                    originalSize: t.originalSize,
                    position: t.position,
                    size: t.size
                }
            }

            var i = this, s = this.options, n = s.resizable, o = this.uiDialog.css("position"), a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: s.maxWidth,
                maxHeight: s.maxHeight,
                minWidth: s.minWidth,
                minHeight: this._minHeight(),
                handles: a,
                start: function (s, n) {
                    t(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, e(n))
                },
                resize: function (t, s) {
                    i._trigger("resize", t, e(s))
                },
                stop: function (n, o) {
                    var a = i.uiDialog.offset(), r = a.left - i.document.scrollLeft(), l = a.top - i.document.scrollTop();
                    s.height = i.uiDialog.height(), s.width = i.uiDialog.width(), s.position = {
                        my: "left top",
                        at: "left" + (r >= 0 ? "+" : "") + r + " top" + (l >= 0 ? "+" : "") + l,
                        of: i.window
                    }, t(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, e(o))
                }
            }).css("position", o)
        },
        _trackFocus: function () {
            this._on(this.widget(), {
                focusin: function (e) {
                    this._makeFocusTarget(), this._focusedElement = t(e.target)
                }
            })
        },
        _makeFocusTarget: function () {
            this._untrackInstance(), this._trackingInstances().unshift(this)
        },
        _untrackInstance: function () {
            var e = this._trackingInstances(), i = t.inArray(this, e);
            -1 !== i && e.splice(i, 1)
        },
        _trackingInstances: function () {
            var t = this.document.data("ui-dialog-instances");
            return t || (t = [], this.document.data("ui-dialog-instances", t)), t
        },
        _minHeight: function () {
            var t = this.options;
            return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
        },
        _position: function () {
            var t = this.uiDialog.is(":visible");
            t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
        },
        _setOptions: function (e) {
            var i = this, s = !1, n = {};
            t.each(e, function (t, e) {
                i._setOption(t, e), t in i.sizeRelatedOptions && (s = !0), t in i.resizableRelatedOptions && (n[t] = e)
            }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n)
        },
        _setOption: function (t, e) {
            var i, s, n = this.uiDialog;
            "dialogClass" === t && n.removeClass(this.options.dialogClass).addClass(e), "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({label: "" + e}), "draggable" === t && (i = n.is(":data(ui-draggable)"), i && !e && n.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (s = n.is(":data(ui-resizable)"), s && !e && n.resizable("destroy"), s && "string" == typeof e && n.resizable("option", "handles", e), s || e === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function () {
            var t, e, i, s = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({
                height: "auto",
                width: s.width
            }).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({
                minHeight: e,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function () {
            this.iframeBlocks = this.document.find("iframe").map(function () {
                var e = t(this);
                return t("<div>").css({
                    position: "absolute",
                    width: e.outerWidth(),
                    height: e.outerHeight()
                }).appendTo(e.parent()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function () {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function (e) {
            return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length
        },
        _createOverlay: function () {
            if (this.options.modal) {
                var e = !0;
                this._delay(function () {
                    e = !1
                }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                    focusin: function (t) {
                        e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                    }
                }), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {mousedown: "_keepFocus"}), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
            }
        },
        _destroyOverlay: function () {
            if (this.options.modal && this.overlay) {
                var t = this.document.data("ui-dialog-overlays") - 1;
                t ? this.document.data("ui-dialog-overlays", t) : this.document.unbind("focusin").removeData("ui-dialog-overlays"), this.overlay.remove(), this.overlay = null
            }
        }
    }), t.widget("ui.progressbar", {
        version: "1.11.4",
        options: {max: 100, value: 0, change: null, complete: null},
        min: 0,
        _create: function () {
            this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
        },
        _destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
        },
        value: function (t) {
            return void 0 === t ? this.options.value : (this.options.value = this._constrainedValue(t), void this._refreshValue())
        },
        _constrainedValue: function (t) {
            return void 0 === t && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
        },
        _setOptions: function (t) {
            var e = t.value;
            delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
        },
        _setOption: function (t, e) {
            "max" === t && (e = Math.max(this.min, e)), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e), this._super(t, e)
        },
        _percentage: function () {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function () {
            var e = this.options.value, i = this._percentage();
            this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": e
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
        }
    }), t.widget("ui.selectmenu", {
        version: "1.11.4",
        defaultElement: "<select>",
        options: {
            appendTo: null,
            disabled: null,
            icons: {button: "ui-icon-triangle-1-s"},
            position: {my: "left top", at: "left bottom", collision: "none"},
            width: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null
        },
        _create: function () {
            var t = this.element.uniqueId().attr("id");
            this.ids = {
                element: t,
                button: t + "-button",
                menu: t + "-menu"
            }, this._drawButton(), this._drawMenu(), this.options.disabled && this.disable()
        },
        _drawButton: function () {
            var e = this;
            this.label = t("label[for='" + this.ids.element + "']").attr("for", this.ids.button), this._on(this.label, {
                click: function (t) {
                    this.button.focus(), t.preventDefault()
                }
            }), this.element.hide(), this.button = t("<span>", {
                "class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true"
            }).insertAfter(this.element), t("<span>", {"class": "ui-icon " + this.options.icons.button}).prependTo(this.button), this.buttonText = t("<span>", {"class": "ui-selectmenu-text"}).appendTo(this.button), this._setText(this.buttonText, this.element.find("option:selected").text()), this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function () {
                e.menuItems || e._refreshMenu()
            }), this._hoverable(this.button), this._focusable(this.button)
        },
        _drawMenu: function () {
            var e = this;
            this.menu = t("<ul>", {
                "aria-hidden": "true",
                "aria-labelledby": this.ids.button,
                id: this.ids.menu
            }), this.menuWrap = t("<div>", {"class": "ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                role: "listbox",
                select: function (t, i) {
                    t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t)
                },
                focus: function (t, i) {
                    var s = i.item.data("ui-selectmenu-item");
                    null != e.focusIndex && s.index !== e.focusIndex && (e._trigger("focus", t, {item: s}), e.isOpen || e._select(s, t)), e.focusIndex = s.index, e.button.attr("aria-activedescendant", e.menuItems.eq(s.index).attr("id"))
                }
            }).menu("instance"), this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function () {
                return !1
            }, this.menuInstance._isDivider = function () {
                return !1
            }
        },
        refresh: function () {
            this._refreshMenu(), this._setText(this.buttonText, this._getSelectedItem().text()), this.options.width || this._resizeButton()
        },
        _refreshMenu: function () {
            this.menu.empty();
            var t, e = this.element.find("option");
            e.length && (this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
        },
        open: function (t) {
            this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t))
        },
        _position: function () {
            this.menuWrap.position(t.extend({of: this.button}, this.options.position))
        },
        close: function (t) {
            this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t))
        },
        widget: function () {
            return this.button
        },
        menuWidget: function () {
            return this.menu
        },
        _renderMenu: function (e, i) {
            var s = this, n = "";
            t.each(i, function (i, o) {
                o.optgroup !== n && (t("<li>", {
                    "class": "ui-selectmenu-optgroup ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
                    text: o.optgroup
                }).appendTo(e), n = o.optgroup), s._renderItemData(e, o)
            })
        },
        _renderItemData: function (t, e) {
            return this._renderItem(t, e).data("ui-selectmenu-item", e)
        },
        _renderItem: function (e, i) {
            var s = t("<li>");
            return i.disabled && s.addClass("ui-state-disabled"), this._setText(s, i.label), s.appendTo(e)
        },
        _setText: function (t, e) {
            e ? t.text(e) : t.html("&#160;")
        },
        _move: function (t, e) {
            var i, s, n = ".ui-menu-item";
            this.isOpen ? i = this.menuItems.eq(this.focusIndex) : (i = this.menuItems.eq(this.element[0].selectedIndex), n += ":not(.ui-state-disabled)"), s = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](n).eq(-1) : i[t + "All"](n).eq(0), s.length && this.menuInstance.focus(e, s)
        },
        _getSelectedItem: function () {
            return this.menuItems.eq(this.element[0].selectedIndex)
        },
        _toggle: function (t) {
            this[this.isOpen ? "close" : "open"](t)
        },
        _setSelection: function () {
            var t;
            this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus())
        },
        _documentClick: {
            mousedown: function (e) {
                this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(e))
            }
        },
        _buttonEvents: {
            mousedown: function () {
                var t;
                window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange()
            }, click: function (t) {
                this._setSelection(), this._toggle(t)
            }, keydown: function (e) {
                var i = !0;
                switch (e.keyCode) {
                    case t.ui.keyCode.TAB:
                    case t.ui.keyCode.ESCAPE:
                        this.close(e), i = !1;
                        break;
                    case t.ui.keyCode.ENTER:
                        this.isOpen && this._selectFocusedItem(e);
                        break;
                    case t.ui.keyCode.UP:
                        e.altKey ? this._toggle(e) : this._move("prev", e);
                        break;
                    case t.ui.keyCode.DOWN:
                        e.altKey ? this._toggle(e) : this._move("next", e);
                        break;
                    case t.ui.keyCode.SPACE:
                        this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                        break;
                    case t.ui.keyCode.LEFT:
                        this._move("prev", e);
                        break;
                    case t.ui.keyCode.RIGHT:
                        this._move("next", e);
                        break;
                    case t.ui.keyCode.HOME:
                    case t.ui.keyCode.PAGE_UP:
                        this._move("first", e);
                        break;
                    case t.ui.keyCode.END:
                    case t.ui.keyCode.PAGE_DOWN:
                        this._move("last", e);
                        break;
                    default:
                        this.menu.trigger(e), i = !1
                }
                i && e.preventDefault()
            }
        },
        _selectFocusedItem: function (t) {
            var e = this.menuItems.eq(this.focusIndex);
            e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t)
        },
        _select: function (t, e) {
            var i = this.element[0].selectedIndex;
            this.element[0].selectedIndex = t.index, this._setText(this.buttonText, t.label), this._setAria(t), this._trigger("select", e, {item: t}), t.index !== i && this._trigger("change", e, {item: t}), this.close(e)
        },
        _setAria: function (t) {
            var e = this.menuItems.eq(t.index).attr("id");
            this.button.attr({
                "aria-labelledby": e,
                "aria-activedescendant": e
            }), this.menu.attr("aria-activedescendant", e)
        },
        _setOption: function (t, e) {
            "icons" === t && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(e.button), this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "disabled" === t && (this.menuInstance.option("disabled", e), this.button.toggleClass("ui-state-disabled", e).attr("aria-disabled", e), this.element.prop("disabled", e), e ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)), "width" === t && this._resizeButton()
        },
        _appendTo: function () {
            var e = this.options.appendTo;
            return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
        },
        _toggleAttr: function () {
            this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen), this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
        },
        _resizeButton: function () {
            var t = this.options.width;
            t || (t = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(t)
        },
        _resizeMenu: function () {
            this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
        },
        _getCreateOptions: function () {
            return {disabled: this.element.prop("disabled")}
        },
        _parseOptions: function (e) {
            var i = [];
            e.each(function (e, s) {
                var n = t(s), o = n.parent("optgroup");
                i.push({
                    element: n,
                    index: e,
                    value: n.val(),
                    label: n.text(),
                    optgroup: o.attr("label") || "",
                    disabled: o.prop("disabled") || n.prop("disabled")
                })
            }), this.items = i
        },
        _destroy: function () {
            this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.label.attr("for", this.ids.element)
        }
    }), t.widget("ui.slider", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function () {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function () {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function () {
            var e, i, s = this.options, n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), o = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>", a = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++)a.push(o);
            this.handles = n.add(t(a.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (e) {
                t(this).data("ui-slider-handle-index", e)
            })
        },
        _createRange: function () {
            var e = this.options, i = "";
            e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function () {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
        },
        _destroy: function () {
            this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function (e) {
            var i, s, n, o, a, r, l, h, c = this, d = this.options;
            return d.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: e.pageX,
                y: e.pageY
            }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) {
                var i = Math.abs(s - c.values(e));
                (n > i || n === i && (e === c._lastChangedValue || c.values(e) === d.min)) && (n = i, o = t(this), a = e)
            }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, o.addClass("ui-state-active").focus(), l = o.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? {
                left: 0,
                top: 0
            } : {
                left: e.pageX - l.left - o.width() / 2,
                top: e.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (t) {
            var e = {x: t.pageX, y: t.pageY}, i = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, i), !1
        },
        _mouseStop: function (t) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (t) {
            var e, i, s, n, o;
            return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o)
        },
        _start: function (t, e) {
            var i = {handle: this.handles[e], value: this.value()};
            return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
        },
        _slide: function (t, e, i) {
            var s, n, o;
            this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > s || 1 === e && s > i) && (i = s), i !== this.values(e) && (n = this.values(), n[e] = i, o = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i,
                values: n
            }), s = this.values(e ? 0 : 1), o !== !1 && this.values(e, i))) : i !== this.value() && (o = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i
            }), o !== !1 && this.value(i))
        },
        _stop: function (t, e) {
            var i = {handle: this.handles[e], value: this.value()};
            this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
        },
        _change: function (t, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {handle: this.handles[e], value: this.value()};
                this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
            }
        },
        value: function (t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
        },
        values: function (e, i) {
            var s, n, o;
            if (arguments.length > 1)return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, e);
            if (!arguments.length)return this._values();
            if (!t.isArray(arguments[0]))return this.options.values && this.options.values.length ? this._values(e) : this.value();
            for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1)s[o] = this._trimAlignValue(n[o]), this._change(null, o);
            this._refreshValue()
        },
        _setOption: function (e, i) {
            var s, n = 0;
            switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!i), this._super(e, i), e) {
                case"orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                    break;
                case"value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case"values":
                    for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1)this._change(null, s);
                    this._animateOff = !1;
                    break;
                case"step":
                case"min":
                case"max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case"range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function () {
            var t = this.options.value;
            return t = this._trimAlignValue(t)
        },
        _values: function (t) {
            var e, i, s;
            if (arguments.length)return e = this.options.values[t], e = this._trimAlignValue(e);
            if (this.options.values && this.options.values.length) {
                for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)i[s] = this._trimAlignValue(i[s]);
                return i
            }
            return []
        },
        _trimAlignValue: function (t) {
            if (this._valueMin() >= t)return this._valueMin();
            if (t >= this._valueMax())return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1, i = (t - this._valueMin()) % e, s = t - i;
            return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
        },
        _calculateNewMax: function () {
            var t = this.options.max, e = this._valueMin(), i = this.options.step, s = Math.floor(+(t - e).toFixed(this._precision()) / i) * i;
            t = s + e, this.max = parseFloat(t.toFixed(this._precision()))
        },
        _precision: function () {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
        },
        _precisionOf: function (t) {
            var e = "" + t, i = e.indexOf(".");
            return -1 === i ? 0 : e.length - i - 1
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.max
        },
        _refreshValue: function () {
            var e, i, s, n, o, a = this.options.range, r = this.options, l = this, h = this._animateOff ? !1 : r.animate, c = {};
            this.options.values && this.options.values.length ? this.handles.each(function (s) {
                i = 100 * ((l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin())), c["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({left: i + "%"}, r.animate), 1 === s && l.range[h ? "animate" : "css"]({width: i - e + "%"}, {
                    queue: !1,
                    duration: r.animate
                })) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({bottom: i + "%"}, r.animate), 1 === s && l.range[h ? "animate" : "css"]({height: i - e + "%"}, {
                    queue: !1,
                    duration: r.animate
                }))), e = i
            }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({width: i + "%"}, r.animate), "max" === a && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({width: 100 - i + "%"}, {
                queue: !1,
                duration: r.animate
            }), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({height: i + "%"}, r.animate), "max" === a && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({height: 100 - i + "%"}, {
                queue: !1,
                duration: r.animate
            }))
        },
        _handleEvents: {
            keydown: function (e) {
                var i, s, n, o, a = t(e.target).data("ui-slider-handle-index");
                switch (e.keyCode) {
                    case t.ui.keyCode.HOME:
                    case t.ui.keyCode.END:
                    case t.ui.keyCode.PAGE_UP:
                    case t.ui.keyCode.PAGE_DOWN:
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, t(e.target).addClass("ui-state-active"), i = this._start(e, a), i === !1))return
                }
                switch (o = this.options.step, s = n = this.options.values && this.options.values.length ? this.values(a) : this.value(), e.keyCode) {
                    case t.ui.keyCode.HOME:
                        n = this._valueMin();
                        break;
                    case t.ui.keyCode.END:
                        n = this._valueMax();
                        break;
                    case t.ui.keyCode.PAGE_UP:
                        n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                        if (s === this._valueMax())return;
                        n = this._trimAlignValue(s + o);
                        break;
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (s === this._valueMin())return;
                        n = this._trimAlignValue(s - o)
                }
                this._slide(e, a, n)
            }, keyup: function (e) {
                var i = t(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
            }
        }
    }), t.widget("ui.spinner", {
        version: "1.11.4",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n"},
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function () {
            var e = {}, i = this.element;
            return t.each(["min", "max", "step"], function (t, s) {
                var n = i.attr(s);
                void 0 !== n && n.length && (e[s] = n)
            }), e
        },
        _events: {
            keydown: function (t) {
                this._start(t) && this._keydown(t) && t.preventDefault()
            }, keyup: "_stop", focus: function () {
                this.previous = this.element.val()
            }, blur: function (t) {
                return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", t)))
            }, mousewheel: function (t, e) {
                if (e) {
                    if (!this.spinning && !this._start(t))return !1;
                    this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
                        this.spinning && this._stop(t)
                    }, 100), t.preventDefault()
                }
            }, "mousedown .ui-spinner-button": function (e) {
                function i() {
                    var t = this.element[0] === this.document[0].activeElement;
                    t || (this.element.focus(), this.previous = s, this._delay(function () {
                        this.previous = s
                    }))
                }

                var s;
                s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function () {
                    delete this.cancelBlur, i.call(this)
                }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
            }, "mouseup .ui-spinner-button": "_stop", "mouseenter .ui-spinner-button": function (e) {
                return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : void this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e) : void 0
            }, "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function () {
            var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable()
        },
        _keydown: function (e) {
            var i = this.options, s = t.ui.keyCode;
            switch (e.keyCode) {
                case s.UP:
                    return this._repeat(null, 1, e), !0;
                case s.DOWN:
                    return this._repeat(null, -1, e), !0;
                case s.PAGE_UP:
                    return this._repeat(null, i.page, e), !0;
                case s.PAGE_DOWN:
                    return this._repeat(null, -i.page, e), !0
            }
            return !1
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function () {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function (t) {
            return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
        },
        _repeat: function (t, e, i) {
            t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
                this._repeat(40, e, i)
            }, t), this._spin(e * this.options.step, i)
        },
        _spin: function (t, e) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, {value: i}) === !1 || (this._value(i), this.counter++)
        },
        _increment: function (e) {
            var i = this.options.incremental;
            return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
        },
        _precision: function () {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
        },
        _precisionOf: function (t) {
            var e = "" + t, i = e.indexOf(".");
            return -1 === i ? 0 : e.length - i - 1
        },
        _adjustValue: function (t) {
            var e, i, s = this.options;
            return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && s.min > t ? s.min : t
        },
        _stop: function (t) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
        },
        _setOption: function (t, e) {
            if ("culture" === t || "numberFormat" === t) {
                var i = this._parse(this.element.val());
                return this.options[t] = e, void this.element.val(this._format(i))
            }
            ("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (this.widget().toggleClass("ui-state-disabled", !!e), this.element.prop("disabled", !!e), this.buttons.button(e ? "disable" : "enable"))
        },
        _setOptions: l(function (t) {
            this._super(t)
        }),
        _parse: function (t) {
            return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
        },
        _format: function (t) {
            return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        isValid: function () {
            var t = this.value();
            return null === t ? !1 : t === this._adjustValue(t)
        },
        _value: function (t, e) {
            var i;
            "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh()
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
        },
        stepUp: l(function (t) {
            this._stepUp(t)
        }),
        _stepUp: function (t) {
            this._start() && (this._spin((t || 1) * this.options.step), this._stop())
        },
        stepDown: l(function (t) {
            this._stepDown(t)
        }),
        _stepDown: function (t) {
            this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
        },
        pageUp: l(function (t) {
            this._stepUp((t || 1) * this.options.page)
        }),
        pageDown: l(function (t) {
            this._stepDown((t || 1) * this.options.page)
        }),
        value: function (t) {
            return arguments.length ? void l(this._value).call(this, t) : this._parse(this.element.val())
        },
        widget: function () {
            return this.uiSpinner
        }
    }), t.widget("ui.tabs", {
        version: "1.11.4",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: function () {
            var t = /#.*$/;
            return function (e) {
                var i, s;
                e = e.cloneNode(!1), i = e.href.replace(t, ""), s = location.href.replace(t, "");
                try {
                    i = decodeURIComponent(i)
                } catch (n) {
                }
                try {
                    s = decodeURIComponent(s)
                } catch (n) {
                }
                return e.hash.length > 1 && i === s
            }
        }(),
        _create: function () {
            var e = this, i = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function (t) {
                return e.tabs.index(t)
            }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active)
        },
        _initialActive: function () {
            var e = this.options.active, i = this.options.collapsible, s = location.hash.substring(1);
            return null === e && (s && this.tabs.each(function (i, n) {
                return t(n).attr("aria-controls") === s ? (e = i, !1) : void 0
            }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)), e !== !1 && (e = this.tabs.index(this.tabs.eq(e)), -1 === e && (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length && (e = 0), e
        },
        _getCreateEventData: function () {
            return {tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : t()}
        },
        _tabKeydown: function (e) {
            var i = t(this.document[0].activeElement).closest("li"), s = this.tabs.index(i), n = !0;
            if (!this._handlePageNav(e)) {
                switch (e.keyCode) {
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                        s++;
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.LEFT:
                        n = !1, s--;
                        break;
                    case t.ui.keyCode.END:
                        s = this.anchors.length - 1;
                        break;
                    case t.ui.keyCode.HOME:
                        s = 0;
                        break;
                    case t.ui.keyCode.SPACE:
                        return e.preventDefault(), clearTimeout(this.activating), void this._activate(s);
                    case t.ui.keyCode.ENTER:
                        return e.preventDefault(), clearTimeout(this.activating), void this._activate(s === this.options.active ? !1 : s);
                    default:
                        return
                }
                e.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, n), e.ctrlKey || e.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function () {
                    this.option("active", s)
                }, this.delay))
            }
        },
        _panelKeydown: function (e) {
            this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
        },
        _handlePageNav: function (e) {
            return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
        },
        _findNextTab: function (e, i) {
            function s() {
                return e > n && (e = 0), 0 > e && (e = n), e
            }

            for (var n = this.tabs.length - 1; -1 !== t.inArray(s(), this.options.disabled);)e = i ? e + 1 : e - 1;
            return e
        },
        _focusNextTab: function (t, e) {
            return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
        },
        _setOption: function (t, e) {
            return "active" === t ? void this._activate(e) : "disabled" === t ? void this._setupDisabled(e) : (this._super(t, e), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", e), e || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(e), void("heightStyle" === t && this._setupHeightStyle(e)))
        },
        _sanitizeSelector: function (t) {
            return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function () {
            var e = this.options, i = this.tablist.children(":has(a[href])");
            e.disabled = t.map(i.filter(".ui-state-disabled"), function (t) {
                return i.index(t)
            }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden": "true"}), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({"aria-hidden": "false"})) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function () {
            var e = this, i = this.tabs, s = this.anchors, n = this.panels;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function (e) {
                t(this).is(".ui-state-disabled") && e.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                t(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function () {
                return t("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = t(), this.anchors.each(function (i, s) {
                var n, o, a, r = t(s).uniqueId().attr("id"), l = t(s).closest("li"), h = l.attr("aria-controls");
                e._isLocal(s) ? (n = s.hash, a = n.substring(1), o = e.element.find(e._sanitizeSelector(n))) : (a = l.attr("aria-controls") || t({}).uniqueId()[0].id, n = "#" + a, o = e.element.find(n), o.length || (o = e._createPanel(a), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), h && l.data("ui-tabs-aria-controls", h), l.attr({
                    "aria-controls": a,
                    "aria-labelledby": r
                }), o.attr("aria-labelledby", r)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), i && (this._off(i.not(this.tabs)), this._off(s.not(this.anchors)), this._off(n.not(this.panels)))
        },
        _getList: function () {
            return this.tablist || this.element.find("ol,ul").eq(0)
        },
        _createPanel: function (e) {
            return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function (e) {
            t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
            for (var i, s = 0; i = this.tabs[s]; s++)e === !0 || -1 !== t.inArray(s, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = e
        },
        _setupEvents: function (e) {
            var i = {};
            e && t.each(e.split(" "), function (t, e) {
                i[e] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                click: function (t) {
                    t.preventDefault()
                }
            }), this._on(this.anchors, i), this._on(this.tabs, {keydown: "_tabKeydown"}), this._on(this.panels, {keydown: "_panelKeydown"}), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function (e) {
            var i, s = this.element.parent();
            "fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
                var e = t(this), s = e.css("position");
                "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function () {
                i -= t(this).outerHeight(!0)
            }), this.panels.each(function () {
                t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function () {
                i = Math.max(i, t(this).height("").height())
            }).height(i))
        },
        _eventHandler: function (e) {
            var i = this.options, s = this.active, n = t(e.currentTarget), o = n.closest("li"), a = o[0] === s[0], r = a && i.collapsible, l = r ? t() : this._getPanelForTab(o), h = s.length ? this._getPanelForTab(s) : t(), c = {
                oldTab: s,
                oldPanel: h,
                newTab: r ? t() : o,
                newPanel: l
            };
            e.preventDefault(), o.hasClass("ui-state-disabled") || o.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || this._trigger("beforeActivate", e, c) === !1 || (i.active = r ? !1 : this.tabs.index(o), this.active = a ? t() : o, this.xhr && this.xhr.abort(), h.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(o), e), this._toggle(e, c))
        },
        _toggle: function (e, i) {
            function s() {
                o.running = !1, o._trigger("activate", e, i)
            }

            function n() {
                i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), a.length && o.options.show ? o._show(a, o.options.show, s) : (a.show(), s())
            }

            var o = this, a = i.newPanel, r = i.oldPanel;
            this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function () {
                i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n()
            }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), r.attr("aria-hidden", "true"), i.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }), a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function () {
                return 0 === t(this).attr("tabIndex")
            }).attr("tabIndex", -1), a.attr("aria-hidden", "false"), i.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _activate: function (e) {
            var i, s = this._findActive(e);
            s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function (e) {
            return e === !1 ? t() : this.tabs.eq(e)
        },
        _getIndex: function (t) {
            return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
        },
        _destroy: function () {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function () {
                t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function () {
                var e = t(this), i = e.data("ui-tabs-aria-controls");
                i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function (e) {
            var i = this.options.disabled;
            i !== !1 && (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i) ? t.map(i, function (t) {
                return t !== e ? t : null
            }) : t.map(this.tabs, function (t, i) {
                return i !== e ? i : null
            })), this._setupDisabled(i))
        },
        disable: function (e) {
            var i = this.options.disabled;
            if (i !== !0) {
                if (void 0 === e)i = !0; else {
                    if (e = this._getIndex(e), -1 !== t.inArray(e, i))return;
                    i = t.isArray(i) ? t.merge([e], i).sort() : [e]
                }
                this._setupDisabled(i)
            }
        },
        load: function (e, i) {
            e = this._getIndex(e);
            var s = this, n = this.tabs.eq(e), o = n.find(".ui-tabs-anchor"), a = this._getPanelForTab(n), r = {
                tab: n,
                panel: a
            }, l = function (t, e) {
                "abort" === e && s.panels.stop(!1, !0), n.removeClass("ui-tabs-loading"), a.removeAttr("aria-busy"), t === s.xhr && delete s.xhr
            };
            this._isLocal(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (n.addClass("ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.done(function (t, e, n) {
                setTimeout(function () {
                    a.html(t), s._trigger("load", i, r), l(n, e)
                }, 1)
            }).fail(function (t, e) {
                setTimeout(function () {
                    l(t, e)
                }, 1)
            })))
        },
        _ajaxSettings: function (e, i, s) {
            var n = this;
            return {
                url: e.attr("href"), beforeSend: function (e, o) {
                    return n._trigger("beforeLoad", i, t.extend({jqXHR: e, ajaxSettings: o}, s))
                }
            }
        },
        _getPanelForTab: function (e) {
            var i = t(e).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    }), t.widget("ui.tooltip", {
        version: "1.11.4", options: {
            content: function () {
                var e = t(this).attr("title") || "";
                return t("<a>").text(e).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {my: "left top+15", at: "left bottom", collision: "flipfit flip"},
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        }, _addDescribedBy: function (e, i) {
            var s = (e.attr("aria-describedby") || "").split(/\s+/);
            s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")))
        }, _removeDescribedBy: function (e) {
            var i = e.data("ui-tooltip-id"), s = (e.attr("aria-describedby") || "").split(/\s+/), n = t.inArray(i, s);
            -1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby")
        }, _create: function () {
            this._on({
                mouseover: "open",
                focusin: "open"
            }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = t("<div>").attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
        }, _setOption: function (e, i) {
            var s = this;
            return "disabled" === e ? (this[i ? "_disable" : "_enable"](), void(this.options[e] = i)) : (this._super(e, i), void("content" === e && t.each(this.tooltips, function (t, e) {
                s._updateContent(e.element)
            })))
        }, _disable: function () {
            var e = this;
            t.each(this.tooltips, function (i, s) {
                var n = t.Event("blur");
                n.target = n.currentTarget = s.element[0], e.close(n, !0)
            }), this.element.find(this.options.items).addBack().each(function () {
                var e = t(this);
                e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).removeAttr("title")
            })
        }, _enable: function () {
            this.element.find(this.options.items).addBack().each(function () {
                var e = t(this);
                e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
            })
        }, open: function (e) {
            var i = this, s = t(e ? e.target : this.element).closest(this.options.items);
            s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function () {
                var e, s = t(this);
                s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {
                    element: this,
                    title: s.attr("title")
                }, s.attr("title", ""))
            }), this._registerCloseHandlers(e, s), this._updateContent(s, e))
        }, _updateContent: function (t, e) {
            var i, s = this.options.content, n = this, o = e ? e.type : null;
            return "string" == typeof s ? this._open(e, t, s) : (i = s.call(t[0], function (i) {
                n._delay(function () {
                    t.data("ui-tooltip-open") && (e && (e.type = o), this._open(e, t, i))
                })
            }), void(i && this._open(e, t, i)))
        }, _open: function (e, i, s) {
            function n(t) {
                h.of = t, a.is(":hidden") || a.position(h)
            }

            var o, a, r, l, h = t.extend({}, this.options.position);
            if (s) {
                if (o = this._find(i))return void o.tooltip.find(".ui-tooltip-content").html(s);
                i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")), o = this._tooltip(i), a = o.tooltip, this._addDescribedBy(i, a.attr("id")), a.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), s.clone ? (l = s.clone(), l.removeAttr("id").find("[id]").removeAttr("id")) : l = s, t("<div>").html(l).appendTo(this.liveRegion), this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, {mousemove: n}), n(e)) : a.position(t.extend({of: i}, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function () {
                    a.is(":visible") && (n(h.of), clearInterval(r))
                }, t.fx.interval)), this._trigger("open", e, {tooltip: a})
            }
        }, _registerCloseHandlers: function (e, i) {
            var s = {
                keyup: function (e) {
                    if (e.keyCode === t.ui.keyCode.ESCAPE) {
                        var s = t.Event(e);
                        s.currentTarget = i[0], this.close(s, !0)
                    }
                }
            };
            i[0] !== this.element[0] && (s.remove = function () {
                this._removeTooltip(this._find(i).tooltip)
            }), e && "mouseover" !== e.type || (s.mouseleave = "close"), e && "focusin" !== e.type || (s.focusout = "close"), this._on(!0, i, s)
        }, close: function (e) {
            var i, s = this, n = t(e ? e.currentTarget : this.element), o = this._find(n);
            return o ? (i = o.tooltip, void(o.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), o.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function () {
                s._removeTooltip(t(this))
            }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function (e, i) {
                t(i.element).attr("title", i.title), delete s.parents[e]
            }), o.closing = !0, this._trigger("close", e, {tooltip: i}), o.hiding || (o.closing = !1)))) : void n.removeData("ui-tooltip-open")
        }, _tooltip: function (e) {
            var i = t("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")), s = i.uniqueId().attr("id");
            return t("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[s] = {
                element: e,
                tooltip: i
            }
        }, _find: function (t) {
            var e = t.data("ui-tooltip-id");
            return e ? this.tooltips[e] : null
        }, _removeTooltip: function (t) {
            t.remove(), delete this.tooltips[t.attr("id")]
        }, _destroy: function () {
            var e = this;
            t.each(this.tooltips, function (i, s) {
                var n = t.Event("blur"), o = s.element;
                n.target = n.currentTarget = o[0], e.close(n, !0), t("#" + i).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"))
            }), this.liveRegion.remove()
        }
    });
    var b = "ui-effects-", _ = t;
    t.effects = {effect: {}}, function (t, e) {
        function i(t, e, i) {
            var s = d[e.type] || {};
            return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t)
        }

        function s(i) {
            var s = h(), n = s._rgba = [];
            return i = i.toLowerCase(), f(l, function (t, o) {
                var a, r = o.re.exec(i), l = r && o.parse(r), h = o.space || "rgba";
                return l ? (a = s[h](l), s[c[h].cache] = a[c[h].cache], n = s._rgba = a._rgba, !1) : e
            }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), s) : o[i]
        }

        function n(t, e, i) {
            return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
        }

        var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", r = /^([\-+])=\s*(\d+\.?\d*)/, l = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (t) {
                return [t[1], t[2], t[3], t[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (t) {
                return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (t) {
                return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function (t) {
                return [t[1], t[2] / 100, t[3] / 100, t[4]]
            }
        }], h = t.Color = function (e, i, s, n) {
            return new t.Color.fn.parse(e, i, s, n)
        }, c = {
            rgba: {
                props: {
                    red: {idx: 0, type: "byte"},
                    green: {idx: 1, type: "byte"},
                    blue: {idx: 2, type: "byte"}
                }
            },
            hsla: {
                props: {
                    hue: {idx: 0, type: "degrees"},
                    saturation: {idx: 1, type: "percent"},
                    lightness: {idx: 2, type: "percent"}
                }
            }
        }, d = {
            "byte": {floor: !0, max: 255},
            percent: {max: 1},
            degrees: {mod: 360, floor: !0}
        }, u = h.support = {}, p = t("<p>")[0], f = t.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)", u.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function (t, e) {
            e.cache = "_" + t, e.props.alpha = {idx: 3, type: "percent", def: 1}
        }), h.fn = t.extend(h.prototype, {
            parse: function (n, a, r, l) {
                if (n === e)return this._rgba = [null, null, null, null], this;
                (n.jquery || n.nodeType) && (n = t(n).css(a), a = e);
                var d = this, u = t.type(n), p = this._rgba = [];
                return a !== e && (n = [n, a, r, l], u = "array"), "string" === u ? this.parse(s(n) || o._default) : "array" === u ? (f(c.rgba.props, function (t, e) {
                    p[e.idx] = i(n[e.idx], e)
                }), this) : "object" === u ? (n instanceof h ? f(c, function (t, e) {
                    n[e.cache] && (d[e.cache] = n[e.cache].slice())
                }) : f(c, function (e, s) {
                    var o = s.cache;
                    f(s.props, function (t, e) {
                        if (!d[o] && s.to) {
                            if ("alpha" === t || null == n[t])return;
                            d[o] = s.to(d._rgba)
                        }
                        d[o][e.idx] = i(n[t], e, !0)
                    }), d[o] && 0 > t.inArray(null, d[o].slice(0, 3)) && (d[o][3] = 1, s.from && (d._rgba = s.from(d[o])))
                }), this) : e
            }, is: function (t) {
                var i = h(t), s = !0, n = this;
                return f(c, function (t, o) {
                    var a, r = i[o.cache];
                    return r && (a = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props, function (t, i) {
                        return null != r[i.idx] ? s = r[i.idx] === a[i.idx] : e
                    })), s
                }), s
            }, _space: function () {
                var t = [], e = this;
                return f(c, function (i, s) {
                    e[s.cache] && t.push(i)
                }), t.pop()
            }, transition: function (t, e) {
                var s = h(t), n = s._space(), o = c[n], a = 0 === this.alpha() ? h("transparent") : this, r = a[o.cache] || o.to(a._rgba), l = r.slice();
                return s = s[o.cache], f(o.props, function (t, n) {
                    var o = n.idx, a = r[o], h = s[o], c = d[n.type] || {};
                    null !== h && (null === a ? l[o] = h : (c.mod && (h - a > c.mod / 2 ? a += c.mod : a - h > c.mod / 2 && (a -= c.mod)), l[o] = i((h - a) * e + a, n)))
                }), this[n](l)
            }, blend: function (e) {
                if (1 === this._rgba[3])return this;
                var i = this._rgba.slice(), s = i.pop(), n = h(e)._rgba;
                return h(t.map(i, function (t, e) {
                    return (1 - s) * n[e] + s * t
                }))
            }, toRgbaString: function () {
                var e = "rgba(", i = t.map(this._rgba, function (t, e) {
                    return null == t ? e > 2 ? 1 : 0 : t
                });
                return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
            }, toHslaString: function () {
                var e = "hsla(", i = t.map(this.hsla(), function (t, e) {
                    return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                });
                return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
            }, toHexString: function (e) {
                var i = this._rgba.slice(), s = i.pop();
                return e && i.push(~~(255 * s)), "#" + t.map(i, function (t) {
                    return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                }).join("")
            }, toString: function () {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }), h.fn.parse.prototype = h.fn, c.hsla.to = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])return [null, null, null, t[3]];
            var e, i, s = t[0] / 255, n = t[1] / 255, o = t[2] / 255, a = t[3], r = Math.max(s, n, o), l = Math.min(s, n, o), h = r - l, c = r + l, d = .5 * c;
            return e = l === r ? 0 : s === r ? 60 * (n - o) / h + 360 : n === r ? 60 * (o - s) / h + 120 : 60 * (s - n) / h + 240, i = 0 === h ? 0 : .5 >= d ? h / c : h / (2 - c), [Math.round(e) % 360, i, d, null == a ? 1 : a]
        }, c.hsla.from = function (t) {
            if (null == t[0] || null == t[1] || null == t[2])return [null, null, null, t[3]];
            var e = t[0] / 360, i = t[1], s = t[2], o = t[3], a = .5 >= s ? s * (1 + i) : s + i - s * i, r = 2 * s - a;
            return [Math.round(255 * n(r, a, e + 1 / 3)), Math.round(255 * n(r, a, e)), Math.round(255 * n(r, a, e - 1 / 3)), o]
        }, f(c, function (s, n) {
            var o = n.props, a = n.cache, l = n.to, c = n.from;
            h.fn[s] = function (s) {
                if (l && !this[a] && (this[a] = l(this._rgba)), s === e)return this[a].slice();
                var n, r = t.type(s), d = "array" === r || "object" === r ? s : arguments, u = this[a].slice();
                return f(o, function (t, e) {
                    var s = d["object" === r ? t : e.idx];
                    null == s && (s = u[e.idx]), u[e.idx] = i(s, e)
                }), c ? (n = h(c(u)), n[a] = u, n) : h(u)
            }, f(o, function (e, i) {
                h.fn[e] || (h.fn[e] = function (n) {
                    var o, a = t.type(n), l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s, h = this[l](), c = h[i.idx];
                    return "undefined" === a ? c : ("function" === a && (n = n.call(this, c), a = t.type(n)), null == n && i.empty ? this : ("string" === a && (o = r.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), h[i.idx] = n, this[l](h)))
                })
            })
        }), h.hook = function (e) {
            var i = e.split(" ");
            f(i, function (e, i) {
                t.cssHooks[i] = {
                    set: function (e, n) {
                        var o, a, r = "";
                        if ("transparent" !== n && ("string" !== t.type(n) || (o = s(n)))) {
                            if (n = h(o || n), !u.rgba && 1 !== n._rgba[3]) {
                                for (a = "backgroundColor" === i ? e.parentNode : e; ("" === r || "transparent" === r) && a && a.style;)try {
                                    r = t.css(a, "backgroundColor"), a = a.parentNode
                                } catch (l) {
                                }
                                n = n.blend(r && "transparent" !== r ? r : "_default")
                            }
                            n = n.toRgbaString()
                        }
                        try {
                            e.style[i] = n
                        } catch (l) {
                        }
                    }
                }, t.fx.step[i] = function (e) {
                    e.colorInit || (e.start = h(e.elem, i), e.end = h(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                }
            })
        }, h.hook(a), t.cssHooks.borderColor = {
            expand: function (t) {
                var e = {};
                return f(["Top", "Right", "Bottom", "Left"], function (i, s) {
                    e["border" + s + "Color"] = t
                }), e
            }
        }, o = t.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(_), function () {
        function e(e) {
            var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle, o = {};
            if (n && n.length && n[0] && n[n[0]])for (s = n.length; s--;)i = n[s], "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]); else for (i in n)"string" == typeof n[i] && (o[i] = n[i]);
            return o
        }

        function i(e, i) {
            var s, o, a = {};
            for (s in i)o = i[s], e[s] !== o && (n[s] || (t.fx.step[s] || !isNaN(parseFloat(o))) && (a[s] = o));
            return a
        }

        var s = ["add", "remove", "toggle"], n = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (e, i) {
            t.fx.step[i] = function (t) {
                ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (_.style(t.elem, i, t.end), t.setAttr = !0)
            }
        }), t.fn.addBack || (t.fn.addBack = function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t.effects.animateClass = function (n, o, a, r) {
            var l = t.speed(o, a, r);
            return this.queue(function () {
                var o, a = t(this), r = a.attr("class") || "", h = l.children ? a.find("*").addBack() : a;
                h = h.map(function () {
                    var i = t(this);
                    return {el: i, start: e(this)}
                }), o = function () {
                    t.each(s, function (t, e) {
                        n[e] && a[e + "Class"](n[e])
                    })
                }, o(), h = h.map(function () {
                    return this.end = e(this.el[0]), this.diff = i(this.start, this.end), this
                }), a.attr("class", r), h = h.map(function () {
                    var e = this, i = t.Deferred(), s = t.extend({}, l, {
                        queue: !1, complete: function () {
                            i.resolve(e)
                        }
                    });
                    return this.el.animate(this.diff, s), i.promise()
                }), t.when.apply(t, h.get()).done(function () {
                    o(), t.each(arguments, function () {
                        var e = this.el;
                        t.each(this.diff, function (t) {
                            e.css(t, "")
                        })
                    }), l.complete.call(a[0])
                })
            })
        }, t.fn.extend({
            addClass: function (e) {
                return function (i, s, n, o) {
                    return s ? t.effects.animateClass.call(this, {add: i}, s, n, o) : e.apply(this, arguments)
                }
            }(t.fn.addClass), removeClass: function (e) {
                return function (i, s, n, o) {
                    return arguments.length > 1 ? t.effects.animateClass.call(this, {remove: i}, s, n, o) : e.apply(this, arguments)
                }
            }(t.fn.removeClass), toggleClass: function (e) {
                return function (i, s, n, o, a) {
                    return "boolean" == typeof s || void 0 === s ? n ? t.effects.animateClass.call(this, s ? {add: i} : {remove: i}, n, o, a) : e.apply(this, arguments) : t.effects.animateClass.call(this, {toggle: i}, s, n, o)
                }
            }(t.fn.toggleClass), switchClass: function (e, i, s, n, o) {
                return t.effects.animateClass.call(this, {add: i, remove: e}, s, n, o)
            }
        })
    }(), function () {
        function e(e, i, s, n) {
            return t.isPlainObject(e) && (i = e, e = e.effect), e = {effect: e}, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s,
                s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e
        }

        function i(e) {
            return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
        }

        t.extend(t.effects, {
            version: "1.11.4", save: function (t, e) {
                for (var i = 0; e.length > i; i++)null !== e[i] && t.data(b + e[i], t[0].style[e[i]])
            }, restore: function (t, e) {
                var i, s;
                for (s = 0; e.length > s; s++)null !== e[s] && (i = t.data(b + e[s]), void 0 === i && (i = ""), t.css(e[s], i))
            }, setMode: function (t, e) {
                return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
            }, getBaseline: function (t, e) {
                var i, s;
                switch (t[0]) {
                    case"top":
                        i = 0;
                        break;
                    case"middle":
                        i = .5;
                        break;
                    case"bottom":
                        i = 1;
                        break;
                    default:
                        i = t[0] / e.height
                }
                switch (t[1]) {
                    case"left":
                        s = 0;
                        break;
                    case"center":
                        s = .5;
                        break;
                    case"right":
                        s = 1;
                        break;
                    default:
                        s = t[1] / e.width
                }
                return {x: s, y: i}
            }, createWrapper: function (e) {
                if (e.parent().is(".ui-effects-wrapper"))return e.parent();
                var i = {
                    width: e.outerWidth(!0),
                    height: e.outerHeight(!0),
                    "float": e.css("float")
                }, s = t("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }), n = {width: e.width(), height: e.height()}, o = document.activeElement;
                try {
                    o.id
                } catch (a) {
                    o = document.body
                }
                return e.wrap(s), (e[0] === o || t.contains(e[0], o)) && t(o).focus(), s = e.parent(), "static" === e.css("position") ? (s.css({position: "relative"}), e.css({position: "relative"})) : (t.extend(i, {
                    position: e.css("position"),
                    zIndex: e.css("z-index")
                }), t.each(["top", "left", "bottom", "right"], function (t, s) {
                    i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                }), e.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), e.css(n), s.css(i).show()
            }, removeWrapper: function (e) {
                var i = document.activeElement;
                return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
            }, setTransition: function (e, i, s, n) {
                return n = n || {}, t.each(i, function (t, i) {
                    var o = e.cssUnit(i);
                    o[0] > 0 && (n[i] = o[0] * s + o[1])
                }), n
            }
        }), t.fn.extend({
            effect: function () {
                function i(e) {
                    function i() {
                        t.isFunction(o) && o.call(n[0]), t.isFunction(e) && e()
                    }

                    var n = t(this), o = s.complete, r = s.mode;
                    (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), i()) : a.call(n[0], s, i)
                }

                var s = e.apply(this, arguments), n = s.mode, o = s.queue, a = t.effects.effect[s.effect];
                return t.fx.off || !a ? n ? this[n](s.duration, s.complete) : this.each(function () {
                    s.complete && s.complete.call(this)
                }) : o === !1 ? this.each(i) : this.queue(o || "fx", i)
            }, show: function (t) {
                return function (s) {
                    if (i(s))return t.apply(this, arguments);
                    var n = e.apply(this, arguments);
                    return n.mode = "show", this.effect.call(this, n)
                }
            }(t.fn.show), hide: function (t) {
                return function (s) {
                    if (i(s))return t.apply(this, arguments);
                    var n = e.apply(this, arguments);
                    return n.mode = "hide", this.effect.call(this, n)
                }
            }(t.fn.hide), toggle: function (t) {
                return function (s) {
                    if (i(s) || "boolean" == typeof s)return t.apply(this, arguments);
                    var n = e.apply(this, arguments);
                    return n.mode = "toggle", this.effect.call(this, n)
                }
            }(t.fn.toggle), cssUnit: function (e) {
                var i = this.css(e), s = [];
                return t.each(["em", "px", "%", "pt"], function (t, e) {
                    i.indexOf(e) > 0 && (s = [parseFloat(i), e])
                }), s
            }
        })
    }(), function () {
        var e = {};
        t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, i) {
            e[i] = function (e) {
                return Math.pow(e, t + 2)
            }
        }), t.extend(e, {
            Sine: function (t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }, Circ: function (t) {
                return 1 - Math.sqrt(1 - t * t)
            }, Elastic: function (t) {
                return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
            }, Back: function (t) {
                return t * t * (3 * t - 2)
            }, Bounce: function (t) {
                for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t;);
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            }
        }), t.each(e, function (e, i) {
            t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function (t) {
                return 1 - i(1 - t)
            }, t.easing["easeInOut" + e] = function (t) {
                return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
            }
        })
    }(), t.effects, t.effects.effect.blind = function (e, i) {
        var s, n, o, a = t(this), r = /up|down|vertical/, l = /up|left|vertical|horizontal/, h = ["position", "top", "bottom", "left", "right", "height", "width"], c = t.effects.setMode(a, e.mode || "hide"), d = e.direction || "up", u = r.test(d), p = u ? "height" : "width", f = u ? "top" : "left", m = l.test(d), g = {}, v = "show" === c;
        a.parent().is(".ui-effects-wrapper") ? t.effects.save(a.parent(), h) : t.effects.save(a, h), a.show(), s = t.effects.createWrapper(a).css({overflow: "hidden"}), n = s[p](), o = parseFloat(s.css(f)) || 0, g[p] = v ? n : 0, m || (a.css(u ? "bottom" : "right", 0).css(u ? "top" : "left", "auto").css({position: "absolute"}), g[f] = v ? o : n + o), v && (s.css(p, 0), m || s.css(f, o + n)), s.animate(g, {
            duration: e.duration,
            easing: e.easing,
            queue: !1,
            complete: function () {
                "hide" === c && a.hide(), t.effects.restore(a, h), t.effects.removeWrapper(a), i()
            }
        })
    }, t.effects.effect.bounce = function (e, i) {
        var s, n, o, a = t(this), r = ["position", "top", "bottom", "left", "right", "height", "width"], l = t.effects.setMode(a, e.mode || "effect"), h = "hide" === l, c = "show" === l, d = e.direction || "up", u = e.distance, p = e.times || 5, f = 2 * p + (c || h ? 1 : 0), m = e.duration / f, g = e.easing, v = "up" === d || "down" === d ? "top" : "left", b = "up" === d || "left" === d, _ = a.queue(), w = _.length;
        for ((c || h) && r.push("opacity"), t.effects.save(a, r), a.show(), t.effects.createWrapper(a), u || (u = a["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (o = {opacity: 1}, o[v] = 0, a.css("opacity", 0).css(v, b ? 2 * -u : 2 * u).animate(o, m, g)), h && (u /= Math.pow(2, p - 1)), o = {}, o[v] = 0, s = 0; p > s; s++)n = {}, n[v] = (b ? "-=" : "+=") + u, a.animate(n, m, g).animate(o, m, g), u = h ? 2 * u : u / 2;
        h && (n = {opacity: 0}, n[v] = (b ? "-=" : "+=") + u, a.animate(n, m, g)), a.queue(function () {
            h && a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
        }), w > 1 && _.splice.apply(_, [1, 0].concat(_.splice(w, f + 1))), a.dequeue()
    }, t.effects.effect.clip = function (e, i) {
        var s, n, o, a = t(this), r = ["position", "top", "bottom", "left", "right", "height", "width"], l = t.effects.setMode(a, e.mode || "hide"), h = "show" === l, c = e.direction || "vertical", d = "vertical" === c, u = d ? "height" : "width", p = d ? "top" : "left", f = {};
        t.effects.save(a, r), a.show(), s = t.effects.createWrapper(a).css({overflow: "hidden"}), n = "IMG" === a[0].tagName ? s : a, o = n[u](), h && (n.css(u, 0), n.css(p, o / 2)), f[u] = h ? o : 0, f[p] = h ? 0 : o / 2, n.animate(f, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function () {
                h || a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
            }
        })
    }, t.effects.effect.drop = function (e, i) {
        var s, n = t(this), o = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"], a = t.effects.setMode(n, e.mode || "hide"), r = "show" === a, l = e.direction || "left", h = "up" === l || "down" === l ? "top" : "left", c = "up" === l || "left" === l ? "pos" : "neg", d = {opacity: r ? 1 : 0};
        t.effects.save(n, o), n.show(), t.effects.createWrapper(n), s = e.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0) / 2, r && n.css("opacity", 0).css(h, "pos" === c ? -s : s), d[h] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + s, n.animate(d, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function () {
                "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
            }
        })
    }, t.effects.effect.explode = function (e, i) {
        function s() {
            _.push(this), _.length === d * u && n()
        }

        function n() {
            p.css({visibility: "visible"}), t(_).remove(), m || p.hide(), i()
        }

        var o, a, r, l, h, c, d = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3, u = d, p = t(this), f = t.effects.setMode(p, e.mode || "hide"), m = "show" === f, g = p.show().css("visibility", "hidden").offset(), v = Math.ceil(p.outerWidth() / u), b = Math.ceil(p.outerHeight() / d), _ = [];
        for (o = 0; d > o; o++)for (l = g.top + o * b, c = o - (d - 1) / 2, a = 0; u > a; a++)r = g.left + a * v, h = a - (u - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
            position: "absolute",
            visibility: "visible",
            left: -a * v,
            top: -o * b
        }).parent().addClass("ui-effects-explode").css({
            position: "absolute",
            overflow: "hidden",
            width: v,
            height: b,
            left: r + (m ? h * v : 0),
            top: l + (m ? c * b : 0),
            opacity: m ? 0 : 1
        }).animate({
            left: r + (m ? 0 : h * v),
            top: l + (m ? 0 : c * b),
            opacity: m ? 1 : 0
        }, e.duration || 500, e.easing, s)
    }, t.effects.effect.fade = function (e, i) {
        var s = t(this), n = t.effects.setMode(s, e.mode || "toggle");
        s.animate({opacity: n}, {queue: !1, duration: e.duration, easing: e.easing, complete: i})
    }, t.effects.effect.fold = function (e, i) {
        var s, n, o = t(this), a = ["position", "top", "bottom", "left", "right", "height", "width"], r = t.effects.setMode(o, e.mode || "hide"), l = "show" === r, h = "hide" === r, c = e.size || 15, d = /([0-9]+)%/.exec(c), u = !!e.horizFirst, p = l !== u, f = p ? ["width", "height"] : ["height", "width"], m = e.duration / 2, g = {}, v = {};
        t.effects.save(o, a), o.show(), s = t.effects.createWrapper(o).css({overflow: "hidden"}), n = p ? [s.width(), s.height()] : [s.height(), s.width()], d && (c = parseInt(d[1], 10) / 100 * n[h ? 0 : 1]), l && s.css(u ? {
            height: 0,
            width: c
        } : {
            height: c,
            width: 0
        }), g[f[0]] = l ? n[0] : c, v[f[1]] = l ? n[1] : 0, s.animate(g, m, e.easing).animate(v, m, e.easing, function () {
            h && o.hide(), t.effects.restore(o, a), t.effects.removeWrapper(o), i()
        })
    }, t.effects.effect.highlight = function (e, i) {
        var s = t(this), n = ["backgroundImage", "backgroundColor", "opacity"], o = t.effects.setMode(s, e.mode || "show"), a = {backgroundColor: s.css("backgroundColor")};
        "hide" === o && (a.opacity = 0), t.effects.save(s, n), s.show().css({
            backgroundImage: "none",
            backgroundColor: e.color || "#ffff99"
        }).animate(a, {
            queue: !1, duration: e.duration, easing: e.easing, complete: function () {
                "hide" === o && s.hide(), t.effects.restore(s, n), i()
            }
        })
    }, t.effects.effect.size = function (e, i) {
        var s, n, o, a = t(this), r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], h = ["width", "height", "overflow"], c = ["fontSize"], d = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], u = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], p = t.effects.setMode(a, e.mode || "effect"), f = e.restore || "effect" !== p, m = e.scale || "both", g = e.origin || ["middle", "center"], v = a.css("position"), b = f ? r : l, _ = {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        };
        "show" === p && a.show(), s = {
            height: a.height(),
            width: a.width(),
            outerHeight: a.outerHeight(),
            outerWidth: a.outerWidth()
        }, "toggle" === e.mode && "show" === p ? (a.from = e.to || _, a.to = e.from || s) : (a.from = e.from || ("show" === p ? _ : s), a.to = e.to || ("hide" === p ? _ : s)), o = {
            from: {
                y: a.from.height / s.height,
                x: a.from.width / s.width
            }, to: {y: a.to.height / s.height, x: a.to.width / s.width}
        }, ("box" === m || "both" === m) && (o.from.y !== o.to.y && (b = b.concat(d), a.from = t.effects.setTransition(a, d, o.from.y, a.from), a.to = t.effects.setTransition(a, d, o.to.y, a.to)), o.from.x !== o.to.x && (b = b.concat(u), a.from = t.effects.setTransition(a, u, o.from.x, a.from), a.to = t.effects.setTransition(a, u, o.to.x, a.to))), ("content" === m || "both" === m) && o.from.y !== o.to.y && (b = b.concat(c).concat(h), a.from = t.effects.setTransition(a, c, o.from.y, a.from), a.to = t.effects.setTransition(a, c, o.to.y, a.to)), t.effects.save(a, b), a.show(), t.effects.createWrapper(a), a.css("overflow", "hidden").css(a.from), g && (n = t.effects.getBaseline(g, s), a.from.top = (s.outerHeight - a.outerHeight()) * n.y, a.from.left = (s.outerWidth - a.outerWidth()) * n.x, a.to.top = (s.outerHeight - a.to.outerHeight) * n.y, a.to.left = (s.outerWidth - a.to.outerWidth) * n.x), a.css(a.from), ("content" === m || "both" === m) && (d = d.concat(["marginTop", "marginBottom"]).concat(c), u = u.concat(["marginLeft", "marginRight"]), h = r.concat(d).concat(u), a.find("*[width]").each(function () {
            var i = t(this), s = {
                height: i.height(),
                width: i.width(),
                outerHeight: i.outerHeight(),
                outerWidth: i.outerWidth()
            };
            f && t.effects.save(i, h), i.from = {
                height: s.height * o.from.y,
                width: s.width * o.from.x,
                outerHeight: s.outerHeight * o.from.y,
                outerWidth: s.outerWidth * o.from.x
            }, i.to = {
                height: s.height * o.to.y,
                width: s.width * o.to.x,
                outerHeight: s.height * o.to.y,
                outerWidth: s.width * o.to.x
            }, o.from.y !== o.to.y && (i.from = t.effects.setTransition(i, d, o.from.y, i.from), i.to = t.effects.setTransition(i, d, o.to.y, i.to)), o.from.x !== o.to.x && (i.from = t.effects.setTransition(i, u, o.from.x, i.from), i.to = t.effects.setTransition(i, u, o.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function () {
                f && t.effects.restore(i, h)
            })
        })), a.animate(a.to, {
            queue: !1, duration: e.duration, easing: e.easing, complete: function () {
                0 === a.to.opacity && a.css("opacity", a.from.opacity), "hide" === p && a.hide(), t.effects.restore(a, b), f || ("static" === v ? a.css({
                    position: "relative",
                    top: a.to.top,
                    left: a.to.left
                }) : t.each(["top", "left"], function (t, e) {
                    a.css(e, function (e, i) {
                        var s = parseInt(i, 10), n = t ? a.to.left : a.to.top;
                        return "auto" === i ? n + "px" : s + n + "px"
                    })
                })), t.effects.removeWrapper(a), i()
            }
        })
    }, t.effects.effect.scale = function (e, i) {
        var s = t(this), n = t.extend(!0, {}, e), o = t.effects.setMode(s, e.mode || "effect"), a = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === o ? 0 : 100), r = e.direction || "both", l = e.origin, h = {
            height: s.height(),
            width: s.width(),
            outerHeight: s.outerHeight(),
            outerWidth: s.outerWidth()
        }, c = {y: "horizontal" !== r ? a / 100 : 1, x: "vertical" !== r ? a / 100 : 1};
        n.effect = "size", n.queue = !1, n.complete = i, "effect" !== o && (n.origin = l || ["middle", "center"], n.restore = !0), n.from = e.from || ("show" === o ? {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            } : h), n.to = {
            height: h.height * c.y,
            width: h.width * c.x,
            outerHeight: h.outerHeight * c.y,
            outerWidth: h.outerWidth * c.x
        }, n.fade && ("show" === o && (n.from.opacity = 0, n.to.opacity = 1), "hide" === o && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n)
    }, t.effects.effect.puff = function (e, i) {
        var s = t(this), n = t.effects.setMode(s, e.mode || "hide"), o = "hide" === n, a = parseInt(e.percent, 10) || 150, r = a / 100, l = {
            height: s.height(),
            width: s.width(),
            outerHeight: s.outerHeight(),
            outerWidth: s.outerWidth()
        };
        t.extend(e, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: n,
            complete: i,
            percent: o ? a : 100,
            from: o ? l : {
                height: l.height * r,
                width: l.width * r,
                outerHeight: l.outerHeight * r,
                outerWidth: l.outerWidth * r
            }
        }), s.effect(e)
    }, t.effects.effect.pulsate = function (e, i) {
        var s, n = t(this), o = t.effects.setMode(n, e.mode || "show"), a = "show" === o, r = "hide" === o, l = a || "hide" === o, h = 2 * (e.times || 5) + (l ? 1 : 0), c = e.duration / h, d = 0, u = n.queue(), p = u.length;
        for ((a || !n.is(":visible")) && (n.css("opacity", 0).show(), d = 1), s = 1; h > s; s++)n.animate({opacity: d}, c, e.easing), d = 1 - d;
        n.animate({opacity: d}, c, e.easing), n.queue(function () {
            r && n.hide(), i()
        }), p > 1 && u.splice.apply(u, [1, 0].concat(u.splice(p, h + 1))), n.dequeue()
    }, t.effects.effect.shake = function (e, i) {
        var s, n = t(this), o = ["position", "top", "bottom", "left", "right", "height", "width"], a = t.effects.setMode(n, e.mode || "effect"), r = e.direction || "left", l = e.distance || 20, h = e.times || 3, c = 2 * h + 1, d = Math.round(e.duration / c), u = "up" === r || "down" === r ? "top" : "left", p = "up" === r || "left" === r, f = {}, m = {}, g = {}, v = n.queue(), b = v.length;
        for (t.effects.save(n, o), n.show(), t.effects.createWrapper(n), f[u] = (p ? "-=" : "+=") + l, m[u] = (p ? "+=" : "-=") + 2 * l, g[u] = (p ? "-=" : "+=") + 2 * l, n.animate(f, d, e.easing), s = 1; h > s; s++)n.animate(m, d, e.easing).animate(g, d, e.easing);
        n.animate(m, d, e.easing).animate(f, d / 2, e.easing).queue(function () {
            "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
        }), b > 1 && v.splice.apply(v, [1, 0].concat(v.splice(b, c + 1))), n.dequeue()
    }, t.effects.effect.slide = function (e, i) {
        var s, n = t(this), o = ["position", "top", "bottom", "left", "right", "width", "height"], a = t.effects.setMode(n, e.mode || "show"), r = "show" === a, l = e.direction || "left", h = "up" === l || "down" === l ? "top" : "left", c = "up" === l || "left" === l, d = {};
        t.effects.save(n, o), n.show(), s = e.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(n).css({overflow: "hidden"}), r && n.css(h, c ? isNaN(s) ? "-" + s : -s : s), d[h] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + s, n.animate(d, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function () {
                "hide" === a && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i()
            }
        })
    }, t.effects.effect.transfer = function (e, i) {
        var s = t(this), n = t(e.to), o = "fixed" === n.css("position"), a = t("body"), r = o ? a.scrollTop() : 0, l = o ? a.scrollLeft() : 0, h = n.offset(), c = {
            top: h.top - r,
            left: h.left - l,
            height: n.innerHeight(),
            width: n.innerWidth()
        }, d = s.offset(), u = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
            top: d.top - r,
            left: d.left - l,
            height: s.innerHeight(),
            width: s.innerWidth(),
            position: o ? "fixed" : "absolute"
        }).animate(c, e.duration, e.easing, function () {
            u.remove(), i()
        })
    }
}), "function" != typeof Object.create && (Object.create = function (t) {
    function e() {
    }

    return e.prototype = t, new e
}), function (t, e, i) {
    var s = {
        init: function (e, i) {
            this.$elem = t(i), this.options = t.extend({}, t.fn.owlCarousel.options, this.$elem.data(), e), this.userOptions = e, this.loadContent()
        }, loadContent: function () {
            function e(t) {
                var e, i = "";
                if ("function" == typeof s.options.jsonSuccess)s.options.jsonSuccess.apply(this, [t]); else {
                    for (e in t.owl)t.owl.hasOwnProperty(e) && (i += t.owl[e].item);
                    s.$elem.html(i)
                }
                s.logIn()
            }

            var i, s = this;
            "function" == typeof s.options.beforeInit && s.options.beforeInit.apply(this, [s.$elem]), "string" == typeof s.options.jsonPath ? (i = s.options.jsonPath, t.getJSON(i, e)) : s.logIn()
        }, logIn: function () {
            this.$elem.data("owl-originalStyles", this.$elem.attr("style")), this.$elem.data("owl-originalClasses", this.$elem.attr("class")), this.$elem.css({opacity: 0}), this.orignalItems = this.options.items, this.checkBrowser(), this.wrapperWidth = 0, this.checkVisible = null, this.setVars()
        }, setVars: function () {
            return 0 === this.$elem.children().length ? !1 : (this.baseClass(), this.eventTypes(), this.$userItems = this.$elem.children(), this.itemsAmount = this.$userItems.length, this.wrapItems(), this.$owlItems = this.$elem.find(".owl-item"), this.$owlWrapper = this.$elem.find(".owl-wrapper"), this.playDirection = "next", this.prevItem = 0, this.prevArr = [0], this.currentItem = 0, this.customEvents(), void this.onStartup())
        }, onStartup: function () {
            this.updateItems(), this.calculateAll(), this.buildControls(), this.updateControls(), this.response(), this.moveEvents(), this.stopOnHover(), this.owlStatus(), !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle), !0 === this.options.autoPlay && (this.options.autoPlay = 5e3), this.play(), this.$elem.find(".owl-wrapper").css("display", "block"), this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility(), this.onstartup = !1, this.eachMoveUpdate(), "function" == typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
        }, eachMoveUpdate: function () {
            !0 === this.options.lazyLoad && this.lazyLoad(), !0 === this.options.autoHeight && this.autoHeight(), this.onVisibleItems(), "function" == typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])
        }, updateVars: function () {
            "function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]), this.watchVisibility(), this.updateItems(), this.calculateAll(), this.updatePosition(), this.updateControls(), this.eachMoveUpdate(), "function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
        }, reload: function () {
            var t = this;
            e.setTimeout(function () {
                t.updateVars()
            }, 0)
        }, watchVisibility: function () {
            var t = this;
            return !1 !== t.$elem.is(":visible") ? !1 : (t.$elem.css({opacity: 0}), e.clearInterval(t.autoPlayInterval), e.clearInterval(t.checkVisible), void(t.checkVisible = e.setInterval(function () {
                t.$elem.is(":visible") && (t.reload(), t.$elem.animate({opacity: 1}, 200), e.clearInterval(t.checkVisible))
            }, 500)))
        }, wrapItems: function () {
            this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), this.wrapperOuter = this.$elem.find(".owl-wrapper-outer"), this.$elem.css("display", "block")
        }, baseClass: function () {
            var t = this.$elem.hasClass(this.options.baseClass), e = this.$elem.hasClass(this.options.theme);
            t || this.$elem.addClass(this.options.baseClass), e || this.$elem.addClass(this.options.theme)
        }, updateItems: function () {
            var e, i;
            if (!1 === this.options.responsive)return !1;
            if (!0 === this.options.singleItem)return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
            if (e = t(this.options.responsiveBaseWidth).width(), e > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems), !1 !== this.options.itemsCustom)for (this.options.itemsCustom.sort(function (t, e) {
                return t[0] - e[0]
            }), i = 0; i < this.options.itemsCustom.length; i += 1)this.options.itemsCustom[i][0] <= e && (this.options.items = this.options.itemsCustom[i][1]); else e <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), e <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), e <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), e <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), e <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
            this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
        }, response: function () {
            var i, s, n = this;
            return !0 !== n.options.responsive ? !1 : (s = t(e).width(), n.resizer = function () {
                t(e).width() !== s && (!1 !== n.options.autoPlay && e.clearInterval(n.autoPlayInterval), e.clearTimeout(i), i = e.setTimeout(function () {
                    s = t(e).width(), n.updateVars()
                }, n.options.responsiveRefreshRate))
            }, void t(e).resize(n.resizer))
        }, updatePosition: function () {
            this.jumpTo(this.currentItem), !1 !== this.options.autoPlay && this.checkAp()
        }, appendItemsSizes: function () {
            var e = this, i = 0, s = e.itemsAmount - e.options.items;
            e.$owlItems.each(function (n) {
                var o = t(this);
                o.css({width: e.itemWidth}).data("owl-item", Number(n)), (0 === n % e.options.items || n === s) && (n > s || (i += 1)), o.data("owl-roundPages", i)
            })
        }, appendWrapperSizes: function () {
            this.$owlWrapper.css({width: this.$owlItems.length * this.itemWidth * 2, left: 0}), this.appendItemsSizes()
        }, calculateAll: function () {
            this.calculateWidth(), this.appendWrapperSizes(), this.loops(), this.max()
        }, calculateWidth: function () {
            this.itemWidth = Math.round(this.$elem.width() / this.options.items)
        }, max: function () {
            var t = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
            return this.options.items > this.itemsAmount ? this.maximumPixels = t = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = t), t
        }, min: function () {
            return 0
        }, loops: function () {
            var e, i, s = 0, n = 0;
            for (this.positionsInArray = [0], this.pagesInArray = [], e = 0; e < this.itemsAmount; e += 1)n += this.itemWidth, this.positionsInArray.push(-n), !0 === this.options.scrollPerPage && (i = t(this.$owlItems[e]), i = i.data("owl-roundPages"), i !== s && (this.pagesInArray[s] = this.positionsInArray[e], s = i))
        }, buildControls: function () {
            (!0 === this.options.navigation || !0 === this.options.pagination) && (this.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem)), !0 === this.options.pagination && this.buildPagination(), !0 === this.options.navigation && this.buildButtons()
        }, buildButtons: function () {
            var e = this, i = t('<div class="owl-buttons"/>');
            e.owlControls.append(i), e.buttonPrev = t("<div/>", {
                "class": "owl-prev",
                html: e.options.navigationText[0] || ""
            }), e.buttonNext = t("<div/>", {
                "class": "owl-next",
                html: e.options.navigationText[1] || ""
            }), i.append(e.buttonPrev).append(e.buttonNext), i.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (t) {
                t.preventDefault()
            }), i.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (i) {
                i.preventDefault(), t(this).hasClass("owl-next") ? e.next() : e.prev()
            })
        }, buildPagination: function () {
            var e = this;
            e.paginationWrapper = t('<div class="owl-pagination"/>'), e.owlControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (i) {
                i.preventDefault(), Number(t(this).data("owl-page")) !== e.currentItem && e.goTo(Number(t(this).data("owl-page")), !0)
            })
        }, updatePagination: function () {
            var e, i, s, n, o, a;
            if (!1 === this.options.pagination)return !1;
            for (this.paginationWrapper.html(""), e = 0, i = this.itemsAmount - this.itemsAmount % this.options.items, n = 0; n < this.itemsAmount; n += 1)0 === n % this.options.items && (e += 1, i === n && (s = this.itemsAmount - this.options.items), o = t("<div/>", {"class": "owl-page"}), a = t("<span></span>", {
                text: !0 === this.options.paginationNumbers ? e : "",
                "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
            }), o.append(a), o.data("owl-page", i === n ? s : n), o.data("owl-roundPages", e), this.paginationWrapper.append(o));
            this.checkPagination()
        }, checkPagination: function () {
            var e = this;
            return !1 === e.options.pagination ? !1 : void e.paginationWrapper.find(".owl-page").each(function () {
                t(this).data("owl-roundPages") === t(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active"))
            })
        }, checkNavigation: function () {
            return !1 === this.options.navigation ? !1 : void(!1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem === this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled"))))
        }, updateControls: function () {
            this.updatePagination(), this.checkNavigation(), this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
        }, destroyControls: function () {
            this.owlControls && this.owlControls.remove()
        }, next: function (t) {
            if (this.isTransition)return !1;
            if (this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1, this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) {
                if (!0 !== this.options.rewindNav)return this.currentItem = this.maximumItem, !1;
                this.currentItem = 0, t = "rewind"
            }
            this.goTo(this.currentItem, t)
        }, prev: function (t) {
            if (this.isTransition)return !1;
            if (this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1), 0 > this.currentItem) {
                if (!0 !== this.options.rewindNav)return this.currentItem = 0, !1;
                this.currentItem = this.maximumItem, t = "rewind"
            }
            this.goTo(this.currentItem, t)
        }, goTo: function (t, i, s) {
            var n = this;
            return n.isTransition ? !1 : ("function" == typeof n.options.beforeMove && n.options.beforeMove.apply(this, [n.$elem]), t >= n.maximumItem ? t = n.maximumItem : 0 >= t && (t = 0), n.currentItem = n.owl.currentItem = t, !1 !== n.options.transitionStyle && "drag" !== s && 1 === n.options.items && !0 === n.browser.support3d ? (n.swapSpeed(0), !0 === n.browser.support3d ? n.transition3d(n.positionsInArray[t]) : n.css2slide(n.positionsInArray[t], 1), n.afterGo(), n.singleItemTransition(), !1) : (t = n.positionsInArray[t], !0 === n.browser.support3d ? (n.isCss3Finish = !1, !0 === i ? (n.swapSpeed("paginationSpeed"), e.setTimeout(function () {
                n.isCss3Finish = !0
            }, n.options.paginationSpeed)) : "rewind" === i ? (n.swapSpeed(n.options.rewindSpeed), e.setTimeout(function () {
                n.isCss3Finish = !0
            }, n.options.rewindSpeed)) : (n.swapSpeed("slideSpeed"), e.setTimeout(function () {
                n.isCss3Finish = !0
            }, n.options.slideSpeed)), n.transition3d(t)) : !0 === i ? n.css2slide(t, n.options.paginationSpeed) : "rewind" === i ? n.css2slide(t, n.options.rewindSpeed) : n.css2slide(t, n.options.slideSpeed), void n.afterGo()))
        }, jumpTo: function (t) {
            "function" == typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]), t >= this.maximumItem || -1 === t ? t = this.maximumItem : 0 >= t && (t = 0), this.swapSpeed(0), !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[t]) : this.css2slide(this.positionsInArray[t], 1), this.currentItem = this.owl.currentItem = t, this.afterGo()
        }, afterGo: function () {
            this.prevArr.push(this.currentItem), this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2], this.prevArr.shift(0), this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp()), "function" == typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
        }, stop: function () {
            this.apStatus = "stop", e.clearInterval(this.autoPlayInterval)
        }, checkAp: function () {
            "stop" !== this.apStatus && this.play()
        }, play: function () {
            var t = this;
            return t.apStatus = "play", !1 === t.options.autoPlay ? !1 : (e.clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = e.setInterval(function () {
                t.next(!0)
            }, t.options.autoPlay)))
        }, swapSpeed: function (t) {
            "slideSpeed" === t ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === t ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" != typeof t && this.$owlWrapper.css(this.addCssSpeed(t))
        }, addCssSpeed: function (t) {
            return {
                "-webkit-transition": "all " + t + "ms ease",
                "-moz-transition": "all " + t + "ms ease",
                "-o-transition": "all " + t + "ms ease",
                transition: "all " + t + "ms ease"
            }
        }, removeTransition: function () {
            return {"-webkit-transition": "", "-moz-transition": "", "-o-transition": "", transition: ""}
        }, doTranslate: function (t) {
            return {
                "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
                transform: "translate3d(" + t + "px, 0px,0px)"
            }
        }, transition3d: function (t) {
            this.$owlWrapper.css(this.doTranslate(t))
        }, css2move: function (t) {
            this.$owlWrapper.css({left: t})
        }, css2slide: function (t, e) {
            var i = this;
            i.isCssFinish = !1, i.$owlWrapper.stop(!0, !0).animate({left: t}, {
                duration: e || i.options.slideSpeed,
                complete: function () {
                    i.isCssFinish = !0
                }
            })
        }, checkBrowser: function () {
            var t = i.createElement("div");
            t.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)", t = t.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g), this.browser = {
                support3d: null !== t && 1 === t.length,
                isTouch: "ontouchstart"in e || e.navigator.msMaxTouchPoints
            }
        }, moveEvents: function () {
            (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) && (this.gestures(), this.disabledEvents())
        }, eventTypes: function () {
            var t = ["s", "e", "x"];
            this.ev_types = {}, !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), this.ev_types.start = t[0], this.ev_types.move = t[1], this.ev_types.end = t[2]
        }, disabledEvents: function () {
            this.$elem.on("dragstart.owl", function (t) {
                t.preventDefault()
            }), this.$elem.on("mousedown.disableTextSelect", function (e) {
                return t(e.target).is("input, textarea, select, option")
            })
        }, gestures: function () {
            function s(t) {
                if (void 0 !== t.touches)return {x: t.touches[0].pageX, y: t.touches[0].pageY};
                if (void 0 === t.touches) {
                    if (void 0 !== t.pageX)return {x: t.pageX, y: t.pageY};
                    if (void 0 === t.pageX)return {x: t.clientX, y: t.clientY}
                }
            }

            function n(e) {
                "on" === e ? (t(i).on(r.ev_types.move, o), t(i).on(r.ev_types.end, a)) : "off" === e && (t(i).off(r.ev_types.move), t(i).off(r.ev_types.end))
            }

            function o(n) {
                n = n.originalEvent || n || e.event, r.newPosX = s(n).x - l.offsetX, r.newPosY = s(n).y - l.offsetY, r.newRelativeX = r.newPosX - l.relativePos, "function" == typeof r.options.startDragging && !0 !== l.dragging && 0 !== r.newRelativeX && (l.dragging = !0, r.options.startDragging.apply(r, [r.$elem])), (8 < r.newRelativeX || -8 > r.newRelativeX) && !0 === r.browser.isTouch && (void 0 !== n.preventDefault ? n.preventDefault() : n.returnValue = !1, l.sliding = !0), (10 < r.newPosY || -10 > r.newPosY) && !1 === l.sliding && t(i).off("touchmove.owl"), r.newPosX = Math.max(Math.min(r.newPosX, r.newRelativeX / 5), r.maximumPixels + r.newRelativeX / 5), !0 === r.browser.support3d ? r.transition3d(r.newPosX) : r.css2move(r.newPosX)
            }

            function a(i) {
                i = i.originalEvent || i || e.event;
                var s;
                i.target = i.target || i.srcElement, l.dragging = !1, !0 !== r.browser.isTouch && r.$owlWrapper.removeClass("grabbing"), r.dragDirection = 0 > r.newRelativeX ? r.owl.dragDirection = "left" : r.owl.dragDirection = "right", 0 !== r.newRelativeX && (s = r.getNewPosition(), r.goTo(s, !1, "drag"), l.targetElement === i.target && !0 !== r.browser.isTouch && (t(i.target).on("click.disable", function (e) {
                    e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.disable")
                }), i = t._data(i.target, "events").click, s = i.pop(), i.splice(0, 0, s))), n("off")
            }

            var r = this, l = {
                offsetX: 0,
                offsetY: 0,
                baseElWidth: 0,
                relativePos: 0,
                position: null,
                minSwipe: null,
                maxSwipe: null,
                sliding: null,
                dargging: null,
                targetElement: null
            };
            r.isCssFinish = !0, r.$elem.on(r.ev_types.start, ".owl-wrapper", function (i) {
                i = i.originalEvent || i || e.event;
                var o;
                if (3 === i.which)return !1;
                if (!(r.itemsAmount <= r.options.items)) {
                    if (!1 === r.isCssFinish && !r.options.dragBeforeAnimFinish || !1 === r.isCss3Finish && !r.options.dragBeforeAnimFinish)return !1;
                    !1 !== r.options.autoPlay && e.clearInterval(r.autoPlayInterval), !0 === r.browser.isTouch || r.$owlWrapper.hasClass("grabbing") || r.$owlWrapper.addClass("grabbing"), r.newPosX = 0, r.newRelativeX = 0, t(this).css(r.removeTransition()), o = t(this).position(), l.relativePos = o.left, l.offsetX = s(i).x - o.left, l.offsetY = s(i).y - o.top, n("on"), l.sliding = !1, l.targetElement = i.target || i.srcElement
                }
            })
        }, getNewPosition: function () {
            var t = this.closestItem();
            return t > this.maximumItem ? t = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = t = 0), t
        }, closestItem: function () {
            var e = this, i = !0 === e.options.scrollPerPage ? e.pagesInArray : e.positionsInArray, s = e.newPosX, n = null;
            return t.each(i, function (o, a) {
                s - e.itemWidth / 20 > i[o + 1] && s - e.itemWidth / 20 < a && "left" === e.moveDirection() ? (n = a, e.currentItem = !0 === e.options.scrollPerPage ? t.inArray(n, e.positionsInArray) : o) : s + e.itemWidth / 20 < a && s + e.itemWidth / 20 > (i[o + 1] || i[o] - e.itemWidth) && "right" === e.moveDirection() && (!0 === e.options.scrollPerPage ? (n = i[o + 1] || i[i.length - 1], e.currentItem = t.inArray(n, e.positionsInArray)) : (n = i[o + 1], e.currentItem = o + 1))
            }), e.currentItem
        }, moveDirection: function () {
            var t;
            return 0 > this.newRelativeX ? (t = "right", this.playDirection = "next") : (t = "left", this.playDirection = "prev"), t
        }, customEvents: function () {
            var t = this;
            t.$elem.on("owl.next", function () {
                t.next()
            }), t.$elem.on("owl.prev", function () {
                t.prev()
            }), t.$elem.on("owl.play", function (e, i) {
                t.options.autoPlay = i, t.play(), t.hoverStatus = "play"
            }), t.$elem.on("owl.stop", function () {
                t.stop(), t.hoverStatus = "stop"
            }), t.$elem.on("owl.goTo", function (e, i) {
                t.goTo(i)
            }), t.$elem.on("owl.jumpTo", function (e, i) {
                t.jumpTo(i)
            })
        }, stopOnHover: function () {
            var t = this;
            !0 === t.options.stopOnHover && !0 !== t.browser.isTouch && !1 !== t.options.autoPlay && (t.$elem.on("mouseover", function () {
                t.stop()
            }), t.$elem.on("mouseout", function () {
                "stop" !== t.hoverStatus && t.play()
            }))
        }, lazyLoad: function () {
            var e, i, s, n, o;
            if (!1 === this.options.lazyLoad)return !1;
            for (e = 0; e < this.itemsAmount; e += 1)i = t(this.$owlItems[e]), "loaded" !== i.data("owl-loaded") && (s = i.data("owl-item"), n = i.find(".lazyOwl"), "string" != typeof n.data("src") ? i.data("owl-loaded", "loaded") : (void 0 === i.data("owl-loaded") && (n.hide(), i.addClass("loading").data("owl-loaded", "checked")), (o = !0 === this.options.lazyFollow ? s >= this.currentItem : !0) && s < this.currentItem + this.options.items && n.length && this.lazyPreload(i, n)))
        }, lazyPreload: function (t, i) {
            function s() {
                t.data("owl-loaded", "loaded").removeClass("loading"), i.removeAttr("data-src"), "fade" === a.options.lazyEffect ? i.fadeIn(400) : i.show(), "function" == typeof a.options.afterLazyLoad && a.options.afterLazyLoad.apply(this, [a.$elem])
            }

            function n() {
                r += 1, a.completeImg(i.get(0)) || !0 === o ? s() : 100 >= r ? e.setTimeout(n, 100) : s()
            }

            var o, a = this, r = 0;
            "DIV" === i.prop("tagName") ? (i.css("background-image", "url(" + i.data("src") + ")"), o = !0) : i[0].src = i.data("src"), n()
        }, autoHeight: function () {
            function i() {
                var i = t(o.$owlItems[o.currentItem]).height();
                o.wrapperOuter.css("height", i + "px"), o.wrapperOuter.hasClass("autoHeight") || e.setTimeout(function () {
                    o.wrapperOuter.addClass("autoHeight")
                }, 0)
            }

            function s() {
                n += 1, o.completeImg(a.get(0)) ? i() : 100 >= n ? e.setTimeout(s, 100) : o.wrapperOuter.css("height", "")
            }

            var n, o = this, a = t(o.$owlItems[o.currentItem]).find("img");
            void 0 !== a.get(0) ? (n = 0, s()) : i()
        }, completeImg: function (t) {
            return !t.complete || "undefined" != typeof t.naturalWidth && 0 === t.naturalWidth ? !1 : !0
        }, onVisibleItems: function () {
            var e;
            for (!0 === this.options.addClassActive && this.$owlItems.removeClass("active"), this.visibleItems = [], e = this.currentItem; e < this.currentItem + this.options.items; e += 1)this.visibleItems.push(e), !0 === this.options.addClassActive && t(this.$owlItems[e]).addClass("active");
            this.owl.visibleItems = this.visibleItems
        }, transitionTypes: function (t) {
            this.outClass = "owl-" + t + "-out", this.inClass = "owl-" + t + "-in"
        }, singleItemTransition: function () {
            var t = this, e = t.outClass, i = t.inClass, s = t.$owlItems.eq(t.currentItem), n = t.$owlItems.eq(t.prevItem), o = Math.abs(t.positionsInArray[t.currentItem]) + t.positionsInArray[t.prevItem], a = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2;
            t.isTransition = !0, t.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": a + "px",
                "-moz-perspective-origin": a + "px",
                "perspective-origin": a + "px"
            }), n.css({
                position: "relative",
                left: o + "px"
            }).addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
                t.endPrev = !0, n.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), t.clearTransStyle(n, e)
            }), s.addClass(i).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
                t.endCurrent = !0, s.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), t.clearTransStyle(s, i)
            })
        }, clearTransStyle: function (t, e) {
            t.css({
                position: "",
                left: ""
            }).removeClass(e), this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
        }, owlStatus: function () {
            this.owl = {
                userOptions: this.userOptions,
                baseElement: this.$elem,
                userItems: this.$userItems,
                owlItems: this.$owlItems,
                currentItem: this.currentItem,
                prevItem: this.prevItem,
                visibleItems: this.visibleItems,
                isTouch: this.browser.isTouch,
                browser: this.browser,
                dragDirection: this.dragDirection
            }
        }, clearEvents: function () {
            this.$elem.off(".owl owl mousedown.disableTextSelect"), t(i).off(".owl owl"), t(e).off("resize", this.resizer)
        }, unWrap: function () {
            0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove()), this.clearEvents(), this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
        }, destroy: function () {
            this.stop(), e.clearInterval(this.checkVisible), this.unWrap(), this.$elem.removeData()
        }, reinit: function (e) {
            e = t.extend({}, this.userOptions, e), this.unWrap(), this.init(e, this.$elem)
        }, addItem: function (t, e) {
            var i;
            return t ? 0 === this.$elem.children().length ? (this.$elem.append(t), this.setVars(), !1) : (this.unWrap(), i = void 0 === e || -1 === e ? -1 : e, i >= this.$userItems.length || -1 === i ? this.$userItems.eq(-1).after(t) : this.$userItems.eq(i).before(t), void this.setVars()) : !1
        }, removeItem: function (t) {
            return 0 === this.$elem.children().length ? !1 : (t = void 0 === t || -1 === t ? -1 : t, this.unWrap(), this.$userItems.eq(t).remove(), void this.setVars())
        }
    };
    t.fn.owlCarousel = function (e) {
        return this.each(function () {
            if (!0 === t(this).data("owl-init"))return !1;
            t(this).data("owl-init", !0);
            var i = Object.create(s);
            i.init(e, this), t.data(this, "owlCarousel", i)
        })
    }, t.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: e,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    }
}(jQuery, window, document), !function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    "use strict";
    var e = window.Slick || {};
    e = function () {
        function e(e, s) {
            var n, o = this;
            o.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: t(e),
                appendDots: t(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (t, e) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (e + 1) + "</button>"
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !1,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, o.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, t.extend(o, o.initials), o.activeBreakpoint = null, o.animType = null, o.animProp = null, o.breakpoints = [], o.breakpointSettings = [], o.cssTransitions = !1, o.hidden = "hidden", o.paused = !1, o.positionProp = null, o.respondTo = null, o.rowCount = 1, o.shouldClick = !0, o.$slider = t(e), o.$slidesCache = null, o.transformType = null, o.transitionType = null, o.visibilityChange = "visibilitychange", o.windowWidth = 0, o.windowTimer = null, n = t(e).data("slick") || {}, o.options = t.extend({}, o.defaults, n, s), o.currentSlide = o.options.initialSlide, o.originalSettings = o.options, "undefined" != typeof document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"), o.autoPlay = t.proxy(o.autoPlay, o), o.autoPlayClear = t.proxy(o.autoPlayClear, o), o.changeSlide = t.proxy(o.changeSlide, o), o.clickHandler = t.proxy(o.clickHandler, o), o.selectHandler = t.proxy(o.selectHandler, o), o.setPosition = t.proxy(o.setPosition, o), o.swipeHandler = t.proxy(o.swipeHandler, o), o.dragHandler = t.proxy(o.dragHandler, o), o.keyHandler = t.proxy(o.keyHandler, o), o.autoPlayIterator = t.proxy(o.autoPlayIterator, o), o.instanceUid = i++, o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, o.registerBreakpoints(), o.init(!0), o.checkResponsive(!0)
        }

        var i = 0;
        return e
    }(), e.prototype.addSlide = e.prototype.slickAdd = function (e, i, s) {
        var n = this;
        if ("boolean" == typeof i)s = i, i = null; else if (0 > i || i >= n.slideCount)return !1;
        n.unload(), "number" == typeof i ? 0 === i && 0 === n.$slides.length ? t(e).appendTo(n.$slideTrack) : s ? t(e).insertBefore(n.$slides.eq(i)) : t(e).insertAfter(n.$slides.eq(i)) : s === !0 ? t(e).prependTo(n.$slideTrack) : t(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function (e, i) {
            t(i).attr("data-slick-index", e)
        }), n.$slidesCache = n.$slides, n.reinit()
    }, e.prototype.animateHeight = function () {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({height: e}, t.options.speed)
        }
    }, e.prototype.animateSlide = function (e, i) {
        var s = {}, n = this;
        n.animateHeight(), n.options.rtl === !0 && n.options.vertical === !1 && (e = -e), n.transformsEnabled === !1 ? n.options.vertical === !1 ? n.$slideTrack.animate({left: e}, n.options.speed, n.options.easing, i) : n.$slideTrack.animate({top: e}, n.options.speed, n.options.easing, i) : n.cssTransitions === !1 ? (n.options.rtl === !0 && (n.currentLeft = -n.currentLeft), t({animStart: n.currentLeft}).animate({animStart: e}, {
            duration: n.options.speed,
            easing: n.options.easing,
            step: function (t) {
                t = Math.ceil(t), n.options.vertical === !1 ? (s[n.animType] = "translate(" + t + "px, 0px)", n.$slideTrack.css(s)) : (s[n.animType] = "translate(0px," + t + "px)", n.$slideTrack.css(s))
            },
            complete: function () {
                i && i.call()
            }
        })) : (n.applyTransition(), e = Math.ceil(e), n.options.vertical === !1 ? s[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : s[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(s), i && setTimeout(function () {
            n.disableTransition(), i.call()
        }, n.options.speed))
    }, e.prototype.asNavFor = function (e) {
        var i = this, s = i.options.asNavFor;
        s && null !== s && (s = t(s).not(i.$slider)), null !== s && "object" == typeof s && s.each(function () {
            var i = t(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function (t) {
        var e = this, i = {};
        e.options.fade === !1 ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.autoPlay = function () {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function () {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function () {
        var t = this;
        t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (t.currentSlide - 1 === 0 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
    }, e.prototype.buildArrows = function () {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function () {
        var e, i, s = this;
        if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
            for (i = '<ul class="' + s.options.dotsClass + '">', e = 0; e <= s.getDotCount(); e += 1)i += "<li>" + s.options.customPaging.call(this, s, e) + "</li>";
            i += "</ul>", s.$dots = t(i).appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, i) {
            t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function () {
        var t, e, i, s, n, o, a, r = this;
        if (s = document.createDocumentFragment(), o = r.$slider.children(), r.options.rows > 1) {
            for (a = r.options.slidesPerRow * r.options.rows, n = Math.ceil(o.length / a), t = 0; n > t; t++) {
                var l = document.createElement("div");
                for (e = 0; e < r.options.rows; e++) {
                    var h = document.createElement("div");
                    for (i = 0; i < r.options.slidesPerRow; i++) {
                        var c = t * a + (e * r.options.slidesPerRow + i);
                        o.get(c) && h.appendChild(o.get(c))
                    }
                    l.appendChild(h)
                }
                s.appendChild(l)
            }
            r.$slider.html(s), r.$slider.children().children().children().css({
                width: 100 / r.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function (e, i) {
        var s, n, o, a = this, r = !1, l = a.$slider.width(), h = window.innerWidth || t(window).width();
        if ("window" === a.respondTo ? o = h : "slider" === a.respondTo ? o = l : "min" === a.respondTo && (o = Math.min(h, l)), a.options.responsive && a.options.responsive.length && null !== a.options.responsive) {
            n = null;
            for (s in a.breakpoints)a.breakpoints.hasOwnProperty(s) && (a.originalSettings.mobileFirst === !1 ? o < a.breakpoints[s] && (n = a.breakpoints[s]) : o > a.breakpoints[s] && (n = a.breakpoints[s]));
            null !== n ? null !== a.activeBreakpoint ? (n !== a.activeBreakpoint || i) && (a.activeBreakpoint = n, "unslick" === a.breakpointSettings[n] ? a.unslick(n) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[n]), e === !0 && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = n) : (a.activeBreakpoint = n, "unslick" === a.breakpointSettings[n] ? a.unslick(n) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[n]), e === !0 && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = n) : null !== a.activeBreakpoint && (a.activeBreakpoint = null, a.options = a.originalSettings, e === !0 && (a.currentSlide = a.options.initialSlide), a.refresh(e), r = n), e || r === !1 || a.$slider.trigger("breakpoint", [a, r])
        }
    }, e.prototype.changeSlide = function (e, i) {
        var s, n, o, a = this, r = t(e.target);
        switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), o = a.slideCount % a.options.slidesToScroll !== 0, s = o ? 0 : (a.slideCount - a.currentSlide) % a.options.slidesToScroll, e.data.message) {
            case"previous":
                n = 0 === s ? a.options.slidesToScroll : a.options.slidesToShow - s, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide - n, !1, i);
                break;
            case"next":
                n = 0 === s ? a.options.slidesToScroll : s, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide + n, !1, i);
                break;
            case"index":
                var l = 0 === e.data.index ? 0 : e.data.index || r.index() * a.options.slidesToScroll;
                a.slideHandler(a.checkNavigable(l), !1, i), r.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function (t) {
        var e, i, s = this;
        if (e = s.getNavigableIndexes(), i = 0, t > e[e.length - 1])t = e[e.length - 1]; else for (var n in e) {
            if (t < e[n]) {
                t = i;
                break
            }
            i = e[n]
        }
        return t
    }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide), e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).off("mouseenter.slick", t.proxy(e.setPaused, e, !0)).off("mouseleave.slick", t.proxy(e.setPaused, e, !1))), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.$list.off("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpRows = function () {
        var t, e = this;
        e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.html(t))
    }, e.prototype.clickHandler = function (t) {
        var e = this;
        e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
    }, e.prototype.destroy = function (e) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            t(this).attr("style", t(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
    }, e.prototype.disableTransition = function (t) {
        var e = this, i = {};
        i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.fadeSlide = function (t, e) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(t).css({zIndex: i.options.zIndex}), i.$slides.eq(t).animate({opacity: 1}, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), e && setTimeout(function () {
            i.disableTransition(t), e.call()
        }, i.options.speed))
    }, e.prototype.fadeSlideOut = function (t) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        var t = this;
        return t.currentSlide
    }, e.prototype.getDotCount = function () {
        var t = this, e = 0, i = 0, s = 0;
        if (t.options.infinite === !0)for (; e < t.slideCount;)++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow; else if (t.options.centerMode === !0)s = t.slideCount; else for (; e < t.slideCount;)++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return s - 1
    }, e.prototype.getLeft = function (t) {
        var e, i, s, n = this, o = 0;
        return n.slideOffset = 0, i = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, o = i * n.options.slidesToShow * -1), n.slideCount % n.options.slidesToScroll !== 0 && t + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (t > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (t - n.slideCount)) * n.slideWidth * -1, o = (n.options.slidesToShow - (t - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, o = n.slideCount % n.options.slidesToScroll * i * -1))) : t + n.options.slidesToShow > n.slideCount && (n.slideOffset = (t + n.options.slidesToShow - n.slideCount) * n.slideWidth, o = (t + n.options.slidesToShow - n.slideCount) * i), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, o = 0), n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? t * n.slideWidth * -1 + n.slideOffset : t * i * -1 + o, n.options.variableWidth === !0 && (s = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow), e = n.options.rtl === !0 ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, n.options.centerMode === !0 && (s = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, e += (n.$list.width() - s.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function (t) {
        var e = this;
        return e.options[t]
    }, e.prototype.getNavigableIndexes = function () {
        var t, e = this, i = 0, s = 0, n = [];
        for (e.options.infinite === !1 ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, s = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); t > i;)n.push(i), i = s + e.options.slidesToScroll, s += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return n
    }, e.prototype.getSlick = function () {
        return this
    }, e.prototype.getSlideCount = function () {
        var e, i, s, n = this;
        return s = n.options.centerMode === !0 ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function (e, o) {
            return o.offsetLeft - s + t(o).outerWidth() / 2 > -1 * n.swipeLeft ? (i = o, !1) : void 0
        }), e = Math.abs(t(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
        var i = this;
        i.changeSlide({data: {message: "index", index: parseInt(t)}}, e)
    }, e.prototype.init = function (e) {
        var i = this;
        t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots()), e && i.$slider.trigger("init", [i]), i.options.accessibility === !0 && i.initADA()
    }, e.prototype.initArrowEvents = function () {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {message: "previous"}, t.changeSlide), t.$nextArrow.on("click.slick", {message: "next"}, t.changeSlide))
    }, e.prototype.initDotEvents = function () {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {message: "index"}, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.setPaused, e, !0)).on("mouseleave.slick", t.proxy(e.setPaused, e, !1))
    }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.$list.on("touchstart.slick mousedown.slick", {action: "start"}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {action: "move"}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {action: "end"}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), e.$list.on("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.initUI = function () {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
    }, e.prototype.keyHandler = function (t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide({data: {message: "previous"}}) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide({data: {message: "next"}}))
    }, e.prototype.lazyLoad = function () {
        function e(e) {
            t("img[data-lazy]", e).each(function () {
                var e = t(this), i = t(this).attr("data-lazy"), s = document.createElement("img");
                s.onload = function () {
                    e.animate({opacity: 0}, 100, function () {
                        e.attr("src", i).animate({opacity: 1}, 200, function () {
                            e.removeAttr("data-lazy").removeClass("slick-loading")
                        })
                    })
                }, s.src = i
            })
        }

        var i, s, n, o, a = this;
        a.options.centerMode === !0 ? a.options.infinite === !0 ? (n = a.currentSlide + (a.options.slidesToShow / 2 + 1), o = n + a.options.slidesToShow + 2) : (n = Math.max(0, a.currentSlide - (a.options.slidesToShow / 2 + 1)), o = 2 + (a.options.slidesToShow / 2 + 1) + a.currentSlide) : (n = a.options.infinite ? a.options.slidesToShow + a.currentSlide : a.currentSlide, o = n + a.options.slidesToShow, a.options.fade === !0 && (n > 0 && n--, o <= a.slideCount && o++)), i = a.$slider.find(".slick-slide").slice(n, o), e(i), a.slideCount <= a.options.slidesToShow ? (s = a.$slider.find(".slick-slide"), e(s)) : a.currentSlide >= a.slideCount - a.options.slidesToShow ? (s = a.$slider.find(".slick-cloned").slice(0, a.options.slidesToShow), e(s)) : 0 === a.currentSlide && (s = a.$slider.find(".slick-cloned").slice(-1 * a.options.slidesToShow), e(s))
    }, e.prototype.loadSlider = function () {
        var t = this;
        t.setPosition(), t.$slideTrack.css({opacity: 1}), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function () {
        var t = this;
        t.changeSlide({data: {message: "next"}})
    }, e.prototype.orientationChange = function () {
        var t = this;
        t.checkResponsive(), t.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function () {
        var t = this;
        t.autoPlayClear(), t.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function () {
        var t = this;
        t.paused = !1, t.autoPlay()
    }, e.prototype.postSlide = function (t) {
        var e = this;
        e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay === !0 && e.paused === !1 && e.autoPlay(), e.options.accessibility === !0 && e.initADA()
    }, e.prototype.prev = e.prototype.slickPrev = function () {
        var t = this;
        t.changeSlide({data: {message: "previous"}})
    }, e.prototype.preventDefault = function (t) {
        t.preventDefault()
    }, e.prototype.progressiveLazyLoad = function () {
        var e, i, s = this;
        e = t("img[data-lazy]", s.$slider).length, e > 0 && (i = t("img[data-lazy]", s.$slider).first(), i.attr("src", null), i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function () {
            i.removeAttr("data-lazy"), s.progressiveLazyLoad(), s.options.adaptiveHeight === !0 && s.setPosition()
        }).error(function () {
            i.removeAttr("data-lazy"), s.progressiveLazyLoad()
        }))
    }, e.prototype.refresh = function (e) {
        var i, s, n = this;
        s = n.slideCount - n.options.slidesToShow, n.options.infinite || (n.slideCount <= n.options.slidesToShow ? n.currentSlide = 0 : n.currentSlide > s && (n.currentSlide = s)), i = n.currentSlide, n.destroy(!0), t.extend(n, n.initials, {currentSlide: i}), n.init(), e || n.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function () {
        var e, i, s, n = this, o = n.options.responsive || null;
        if ("array" === t.type(o) && o.length) {
            n.respondTo = n.options.respondTo || "window";
            for (e in o)if (s = n.breakpoints.length - 1, i = o[e].breakpoint, o.hasOwnProperty(e)) {
                for (; s >= 0;)n.breakpoints[s] && n.breakpoints[s] === i && n.breakpoints.splice(s, 1), s--;
                n.breakpoints.push(i), n.breakpointSettings[i] = o[e].settings
            }
            n.breakpoints.sort(function (t, e) {
                return n.options.mobileFirst ? t - e : e - t
            })
        }
    }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses(0), e.setPosition(), e.$slider.trigger("reInit", [e]), e.options.autoplay === !0 && e.focusHandler()
    }, e.prototype.resize = function () {
        var e = this;
        t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
            e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, i) {
        var s = this;
        return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : s.slideCount - 1) : t = e === !0 ? --t : t, s.slideCount < 1 || 0 > t || t > s.slideCount - 1 ? !1 : (s.unload(), i === !0 ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(),
            s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, void s.reinit())
    }, e.prototype.setCSS = function (t) {
        var e, i, s = this, n = {};
        s.options.rtl === !0 && (t = -t), e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", n[s.positionProp] = t, s.transformsEnabled === !1 ? s.$slideTrack.css(n) : (n = {}, s.cssTransitions === !1 ? (n[s.animType] = "translate(" + e + ", " + i + ")", s.$slideTrack.css(n)) : (n[s.animType] = "translate3d(" + e + ", " + i + ", 0px)", s.$slideTrack.css(n)))
    }, e.prototype.setDimensions = function () {
        var t = this;
        t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({padding: "0px " + t.options.centerPadding}) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({padding: t.options.centerPadding + " 0px"})), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }, e.prototype.setFade = function () {
        var e, i = this;
        i.$slides.each(function (s, n) {
            e = i.slideWidth * s * -1, i.options.rtl === !0 ? t(n).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : t(n).css({position: "relative", left: e, top: 0, zIndex: i.options.zIndex - 2, opacity: 0})
        }), i.$slides.eq(i.currentSlide).css({zIndex: i.options.zIndex - 1, opacity: 1})
    }, e.prototype.setHeight = function () {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function (e, i, s) {
        var n, o, a = this;
        if ("responsive" === e && "array" === t.type(i))for (o in i)if ("array" !== t.type(a.options.responsive))a.options.responsive = [i[o]]; else {
            for (n = a.options.responsive.length - 1; n >= 0;)a.options.responsive[n].breakpoint === i[o].breakpoint && a.options.responsive.splice(n, 1), n--;
            a.options.responsive.push(i[o])
        } else a.options[e] = i;
        s === !0 && (a.unload(), a.reinit())
    }, e.prototype.setPosition = function () {
        var t = this;
        t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
    }, e.prototype.setProps = function () {
        var t = this, e = document.body.style;
        t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && t.animType !== !1
    }, e.prototype.setSlideClasses = function (t) {
        var e, i, s, n, o = this;
        i = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), o.$slides.eq(t).addClass("slick-current"), o.options.centerMode === !0 ? (e = Math.floor(o.options.slidesToShow / 2), o.options.infinite === !0 && (t >= e && t <= o.slideCount - 1 - e ? o.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = o.options.slidesToShow + t, i.slice(s - e + 1, s + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - o.options.slidesToShow).addClass("slick-center") : t === o.slideCount - 1 && i.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(t, t + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= o.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = o.slideCount % o.options.slidesToShow, s = o.options.infinite === !0 ? o.options.slidesToShow + t : t, o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - t < o.options.slidesToShow ? i.slice(s - (o.options.slidesToShow - n), s + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(s, s + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === o.options.lazyLoad && o.lazyLoad()
    }, e.prototype.setupInfinite = function () {
        var e, i, s, n = this;
        if (n.options.fade === !0 && (n.options.centerMode = !1), n.options.infinite === !0 && n.options.fade === !1 && (i = null, n.slideCount > n.options.slidesToShow)) {
            for (s = n.options.centerMode === !0 ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - s; e -= 1)i = e - 1, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
            for (e = 0; s > e; e += 1)i = e, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
            n.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                t(this).attr("id", "")
            })
        }
    }, e.prototype.setPaused = function (t) {
        var e = this;
        e.options.autoplay === !0 && e.options.pauseOnHover === !0 && (e.paused = t, t ? e.autoPlayClear() : e.autoPlay())
    }, e.prototype.selectHandler = function (e) {
        var i = this, s = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"), n = parseInt(s.attr("data-slick-index"));
        return n || (n = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(n), void i.asNavFor(n)) : void i.slideHandler(n)
    }, e.prototype.slideHandler = function (t, e, i) {
        var s, n, o, a, r = null, l = this;
        return e = e || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (e === !1 && l.asNavFor(t), s = t, r = l.getLeft(s), a = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? a : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, i !== !0 ? l.animateSlide(a, function () {
            l.postSlide(s)
        }) : l.postSlide(s))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (s = l.currentSlide, i !== !0 ? l.animateSlide(a, function () {
            l.postSlide(s)
        }) : l.postSlide(s))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), n = 0 > s ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + s : s >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : s - l.slideCount : s, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, n]), o = l.currentSlide, l.currentSlide = n, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (i !== !0 ? (l.fadeSlideOut(o), l.fadeSlide(n, function () {
            l.postSlide(n)
        })) : l.postSlide(n), void l.animateHeight()) : void(i !== !0 ? l.animateSlide(r, function () {
            l.postSlide(n)
        }) : l.postSlide(n))))
    }, e.prototype.startLoad = function () {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function () {
        var t, e, i, s, n = this;
        return t = n.touchObject.startX - n.touchObject.curX, e = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(e, t), s = Math.round(180 * i / Math.PI), 0 > s && (s = 360 - Math.abs(s)), 45 >= s && s >= 0 ? n.options.rtl === !1 ? "left" : "right" : 360 >= s && s >= 315 ? n.options.rtl === !1 ? "left" : "right" : s >= 135 && 225 >= s ? n.options.rtl === !1 ? "right" : "left" : n.options.verticalSwiping === !0 ? s >= 35 && 135 >= s ? "left" : "right" : "vertical"
    }, e.prototype.swipeEnd = function (t) {
        var e, i = this;
        if (i.dragging = !1, i.shouldClick = i.touchObject.swipeLength > 10 ? !1 : !0, void 0 === i.touchObject.curX)return !1;
        if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe)switch (i.swipeDirection()) {
            case"left":
                e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.slideHandler(e), i.currentDirection = 0, i.touchObject = {}, i.$slider.trigger("swipe", [i, "left"]);
                break;
            case"right":
                e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.slideHandler(e), i.currentDirection = 1, i.touchObject = {}, i.$slider.trigger("swipe", [i, "right"])
        } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
    }, e.prototype.swipeHandler = function (t) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend"in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse")))switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
            case"start":
                e.swipeStart(t);
                break;
            case"move":
                e.swipeMove(t);
                break;
            case"end":
                e.swipeEnd(t)
        }
    }, e.prototype.swipeMove = function (t) {
        var e, i, s, n, o, a = this;
        return o = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !a.dragging || o && 1 !== o.length ? !1 : (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX, a.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), a.options.verticalSwiping === !0 && (a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2)))), i = a.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && t.preventDefault(), n = (a.options.rtl === !1 ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), a.options.verticalSwiping === !0 && (n = a.touchObject.curY > a.touchObject.startY ? 1 : -1), s = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, a.options.infinite === !1 && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (s = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), a.options.vertical === !1 ? a.swipeLeft = e + s * n : a.swipeLeft = e + s * (a.$list.height() / a.listWidth) * n, a.options.verticalSwiping === !0 && (a.swipeLeft = e + s * n), a.options.fade === !0 || a.options.touchMove === !1 ? !1 : a.animating === !0 ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft)) : void 0)
    }, e.prototype.swipeStart = function (t) {
        var e, i = this;
        return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
    }, e.prototype.unload = function () {
        var e = this;
        t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function (t) {
        var e = this;
        e.$slider.trigger("unslick", [e, t]), e.destroy()
    }, e.prototype.updateArrows = function () {
        var t, e = this;
        t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function () {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, e.prototype.visibility = function () {
        var t = this;
        document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function () {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"}), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
            t(this).attr({role: "option", "aria-describedby": "slick-slide" + e.instanceUid + i})
        }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function (i) {
            t(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + i,
                id: "slick-slide" + e.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
    }, e.prototype.activateADA = function () {
        var t = this;
        t.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
    }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.on("focus.slick blur.slick", "*", function (i) {
            i.stopImmediatePropagation();
            var s = t(this);
            setTimeout(function () {
                e.isPlay && (s.is(":focus") ? (e.autoPlayClear(), e.paused = !0) : (e.paused = !1, e.autoPlay()))
            }, 0)
        })
    }, t.fn.slick = function () {
        var t, i, s = this, n = arguments[0], o = Array.prototype.slice.call(arguments, 1), a = s.length;
        for (t = 0; a > t; t++)if ("object" == typeof n || "undefined" == typeof n ? s[t].slick = new e(s[t], n) : i = s[t].slick[n].apply(s[t].slick, o), "undefined" != typeof i)return i;
        return s
    }
}), !function (t) {
    "use strict";
    t(window.jQuery, window, document)
}(function (t, e, i, s) {
    "use strict";
    t.widget("selectBox.selectBoxIt", {
        VERSION: "3.8.0",
        options: {
            showEffect: "none",
            showEffectOptions: {},
            showEffectSpeed: "medium",
            hideEffect: "none",
            hideEffectOptions: {},
            hideEffectSpeed: "medium",
            showFirstOption: !0,
            defaultText: "",
            defaultIcon: "",
            downArrowIcon: "",
            theme: "default",
            keydownOpen: !0,
            isMobile: function () {
                var t = navigator.userAgent || navigator.vendor || e.opera;
                return /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(t)
            },
            "native": !1,
            aggressiveChange: !1,
            selectWhenHidden: !0,
            viewport: t(e),
            similarSearch: !1,
            copyAttributes: ["title", "rel"],
            copyClasses: "button",
            nativeMousedown: !1,
            customShowHideEvent: !1,
            autoWidth: !0,
            html: !0,
            populate: "",
            dynamicPositioning: !0,
            hideCurrent: !1
        },
        getThemes: function () {
            var e = this, i = t(e.element).attr("data-theme") || "c";
            return {
                bootstrap: {
                    focus: "active",
                    hover: "",
                    enabled: "enabled",
                    disabled: "disabled",
                    arrow: "caret",
                    button: "btn",
                    list: "dropdown-menu",
                    container: "bootstrap",
                    open: "open"
                },
                jqueryui: {
                    focus: "ui-state-focus",
                    hover: "ui-state-hover",
                    enabled: "ui-state-enabled",
                    disabled: "ui-state-disabled",
                    arrow: "ui-icon ui-icon-triangle-1-s",
                    button: "ui-widget ui-state-default",
                    list: "ui-widget ui-widget-content",
                    container: "jqueryui",
                    open: "selectboxit-open"
                },
                jquerymobile: {
                    focus: "ui-btn-down-" + i,
                    hover: "ui-btn-hover-" + i,
                    enabled: "ui-enabled",
                    disabled: "ui-disabled",
                    arrow: "ui-icon ui-icon-arrow-d ui-icon-shadow",
                    button: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + i,
                    list: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + i,
                    container: "jquerymobile",
                    open: "selectboxit-open"
                },
                "default": {
                    focus: "selectboxit-focus",
                    hover: "selectboxit-hover",
                    enabled: "selectboxit-enabled",
                    disabled: "selectboxit-disabled",
                    arrow: "selectboxit-default-arrow",
                    button: "selectboxit-btn",
                    list: "selectboxit-list",
                    container: "selectboxit-container",
                    open: "selectboxit-open"
                }
            }
        },
        isDeferred: function (e) {
            return t.isPlainObject(e) && e.promise && e.done
        },
        _create: function (e) {
            var s = this, n = s.options.populate, o = s.options.theme;
            return s.element.is("select") ? (s.widgetProto = t.Widget.prototype, s.originalElem = s.element[0], s.selectBox = s.element, s.options.populate && s.add && !e && s.add(n), s.selectItems = s.element.find("option"), s.firstSelectItem = s.selectItems.slice(0, 1), s.documentHeight = t(i).height(), s.theme = t.isPlainObject(o) ? t.extend({}, s.getThemes()["default"], o) : s.getThemes()[o] ? s.getThemes()[o] : s.getThemes()["default"], s.currentFocus = 0, s.blur = !0, s.textArray = [], s.currentIndex = 0, s.currentText = "", s.flipped = !1, e || (s.selectBoxStyles = s.selectBox.attr("style")), s._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(s.theme)._eventHandlers(), s.originalElem.disabled && s.disable && s.disable(), s._ariaAccessibility && s._ariaAccessibility(), s.isMobile = s.options.isMobile(), s._mobile && s._mobile(), s.options["native"] && this._applyNativeSelect(), s.triggerEvent("create"), s) : void 0
        },
        _createDropdownButton: function () {
            var e = this, i = e.originalElemId = e.originalElem.id || "", s = e.originalElemValue = e.originalElem.value || "", n = e.originalElemName = e.originalElem.name || "", o = e.options.copyClasses, a = e.selectBox.attr("class") || "";
            return e.dropdownText = t("<span/>", {
                id: i && i + "SelectBoxItText",
                "class": "selectboxit-text",
                unselectable: "on",
                text: e.firstSelectItem.text()
            }).attr("data-val", s), e.dropdownImageContainer = t("<span/>", {"class": "selectboxit-option-icon-container"}), e.dropdownImage = t("<i/>", {
                id: i && i + "SelectBoxItDefaultIcon",
                "class": "selectboxit-default-icon",
                unselectable: "on"
            }), e.dropdown = t("<span/>", {
                id: i && i + "SelectBoxIt",
                "class": "selectboxit " + ("button" === o ? a : "") + " " + (e.selectBox.prop("disabled") ? e.theme.disabled : e.theme.enabled),
                name: n,
                tabindex: e.selectBox.attr("tabindex") || "0",
                unselectable: "on"
            }).append(e.dropdownImageContainer.append(e.dropdownImage)).append(e.dropdownText), e.dropdownContainer = t("<span/>", {
                id: i && i + "SelectBoxItContainer",
                "class": "selectboxit-container " + e.theme.container + " " + ("container" === o ? a : "")
            }).append(e.dropdown), e
        },
        _createUnorderedList: function () {
            var e, i, s, n, o, a, r, l, h, c, d, u, p, f = this, m = "", g = f.originalElemId || "", v = t("<ul/>", {
                id: g && g + "SelectBoxItOptions",
                "class": "selectboxit-options",
                tabindex: -1
            });
            if (f.options.showFirstOption || (f.selectItems.first().attr("disabled", "disabled"), f.selectItems = f.selectBox.find("option").slice(1)), f.selectItems.each(function (g) {
                    u = t(this), i = "", s = "", e = u.prop("disabled"), n = u.attr("data-icon") || "", o = u.attr("data-iconurl") || "", a = o ? "selectboxit-option-icon-url" : "", r = o ? "style=\"background-image:url('" + o + "');\"" : "", l = u.attr("data-selectedtext"), h = u.attr("data-text"), d = h ? h : u.text(), p = u.parent(), p.is("optgroup") && (i = "selectboxit-optgroup-option", 0 === u.index() && (s = '<span class="selectboxit-optgroup-header ' + p.first().attr("class") + '"data-disabled="true">' + p.first().attr("label") + "</span>")), m += s + '<li data-id="' + g + '" data-val="' + this.value + '" data-disabled="' + e + '" class="' + i + " selectboxit-option " + (t(this).attr("class") || "") + '"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon ' + n + " " + (a || f.theme.container) + '"' + r + "></i></span>" + (f.options.html ? d : f.htmlEscape(d)) + "</a></li>", c = u.attr("data-search"), f.textArray[g] = e ? "" : c ? c : d, this.selected && (f._setText(f.dropdownText, l || d), f.currentFocus = g)
                }), f.options.defaultText || f.selectBox.attr("data-text")) {
                var b = f.options.defaultText || f.selectBox.attr("data-text");
                f._setText(f.dropdownText, b), f.options.defaultText = b
            }
            return v.append(m), f.list = v, f.dropdownContainer.append(f.list), f.listItems = f.list.children("li"), f.listAnchors = f.list.find("a"), f.listItems.first().addClass("selectboxit-option-first"), f.listItems.last().addClass("selectboxit-option-last"), f.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(f.theme.disabled), f.dropdownImage.addClass(f.selectBox.attr("data-icon") || f.options.defaultIcon || f.listItems.eq(f.currentFocus).find("i").attr("class")), f.dropdownImage.attr("style", f.listItems.eq(f.currentFocus).find("i").attr("style")), f
        },
        _replaceSelectBox: function () {
            var e, i, n, o = this, a = o.originalElem.id || "", r = o.selectBox.attr("data-size"), l = o.listSize = r === s ? "auto" : "0" === r ? "auto" : +r;
            return o.selectBox.css("display", "none").after(o.dropdownContainer), o.dropdownContainer.appendTo("body").addClass("selectboxit-rendering"), e = o.dropdown.height(), o.downArrow = t("<i/>", {
                id: a && a + "SelectBoxItArrow",
                "class": "selectboxit-arrow",
                unselectable: "on"
            }), o.downArrowContainer = t("<span/>", {
                id: a && a + "SelectBoxItArrowContainer",
                "class": "selectboxit-arrow-container",
                unselectable: "on"
            }).append(o.downArrow), o.dropdown.append(o.downArrowContainer), o.listItems.removeClass("selectboxit-selected").eq(o.currentFocus).addClass("selectboxit-selected"), i = o.downArrowContainer.outerWidth(!0), n = o.dropdownImage.outerWidth(!0), o.options.autoWidth && (o.dropdown.css({width: "auto"}).css({width: o.list.outerWidth(!0) + i + n}), o.list.css({"min-width": o.dropdown.width()})), o.dropdownText.css({"max-width": o.dropdownContainer.outerWidth(!0) - (i + n)}), o.selectBox.after(o.dropdownContainer), o.dropdownContainer.removeClass("selectboxit-rendering"), "number" === t.type(l) && (o.maxHeight = o.listAnchors.outerHeight(!0) * l), o
        },
        _scrollToView: function (t) {
            var e = this, i = e.listItems.eq(e.currentFocus), s = e.list.scrollTop(), n = i.height(), o = i.position().top, a = Math.abs(o), r = e.list.height();
            return "search" === t ? n > r - o ? e.list.scrollTop(s + (o - (r - n))) : -1 > o && e.list.scrollTop(o - n) : "up" === t ? -1 > o && e.list.scrollTop(s - a) : "down" === t && n > r - o && e.list.scrollTop(s + (a - r + n)), e
        },
        _callbackSupport: function (e) {
            var i = this;
            return t.isFunction(e) && e.call(i, i.dropdown), i
        },
        _setText: function (t, e) {
            var i = this;
            return i.options.html ? t.html(e) : t.text(e), i
        },
        open: function (t) {
            var e = this, i = e.options.showEffect, s = e.options.showEffectSpeed, n = e.options.showEffectOptions, o = e.options["native"], a = e.isMobile;
            return !e.listItems.length || e.dropdown.hasClass(e.theme.disabled) ? e : (o || a || this.list.is(":visible") || (e.triggerEvent("open"), e._dynamicPositioning && e.options.dynamicPositioning && e._dynamicPositioning(), "none" === i ? e.list.show() : "show" === i || "slideDown" === i || "fadeIn" === i ? e.list[i](s) : e.list.show(i, n, s), e.list.promise().done(function () {
                e._scrollToView("search")
            })), e._callbackSupport(t), e)
        },
        close: function (t) {
            var e = this, i = e.options.hideEffect, s = e.options.hideEffectSpeed, n = e.options.hideEffectOptions, o = e.options["native"], a = e.isMobile;
            return o || a || !e.list.is(":visible") || (e.triggerEvent("close"), "none" === i ? e.list.hide() : "hide" === i || "slideUp" === i || "fadeOut" === i ? e.list[i](s) : e.list.hide(i, n, s)), e._callbackSupport(t), e
        },
        toggle: function () {
            var t = this, e = t.list.is(":visible");
            e ? t.close() : e || t.open()
        },
        _keyMappings: {38: "up", 40: "down", 13: "enter", 8: "backspace", 9: "tab", 32: "space", 27: "esc"},
        _keydownMethods: function () {
            var t = this, e = t.list.is(":visible") || !t.options.keydownOpen;
            return {
                down: function () {
                    t.moveDown && e && t.moveDown()
                }, up: function () {
                    t.moveUp && e && t.moveUp()
                }, enter: function () {
                    var e = t.listItems.eq(t.currentFocus);
                    t._update(e), "true" !== e.attr("data-preventclose") && t.close(), t.triggerEvent("enter")
                }, tab: function () {
                    t.triggerEvent("tab-blur"), t.close()
                }, backspace: function () {
                    t.triggerEvent("backspace")
                }, esc: function () {
                    t.close()
                }
            }
        },
        _eventHandlers: function () {
            var e, i, s = this, n = s.options.nativeMousedown, o = s.options.customShowHideEvent, a = s.focusClass, r = s.hoverClass, l = s.openClass;
            return this.dropdown.on({
                "click.selectBoxIt": function () {
                    s.dropdown.trigger("focus", !0), s.originalElem.disabled || (s.triggerEvent("click"), n || o || s.toggle())
                }, "mousedown.selectBoxIt": function () {
                    t(this).data("mdown", !0), s.triggerEvent("mousedown"), n && !o && s.toggle()
                }, "mouseup.selectBoxIt": function () {
                    s.triggerEvent("mouseup")
                }, "blur.selectBoxIt": function () {
                    s.blur && (s.triggerEvent("blur"), s.close(), t(this).removeClass(a))
                }, "focus.selectBoxIt": function (e, i) {
                    var n = t(this).data("mdown");
                    t(this).removeData("mdown"), n || i || setTimeout(function () {
                        s.triggerEvent("tab-focus")
                    }, 0), i || (t(this).hasClass(s.theme.disabled) || t(this).addClass(a), s.triggerEvent("focus"))
                }, "keydown.selectBoxIt": function (t) {
                    var e = s._keyMappings[t.keyCode], i = s._keydownMethods()[e];
                    i && (i(), !s.options.keydownOpen || "up" !== e && "down" !== e || s.open()), i && "tab" !== e && t.preventDefault()
                }, "keypress.selectBoxIt": function (t) {
                    var e = t.charCode || t.keyCode, i = s._keyMappings[t.charCode || t.keyCode], n = String.fromCharCode(e);
                    s.search && (!i || i && "space" === i) && s.search(n, !0, !0), "space" === i && t.preventDefault()
                }, "mouseenter.selectBoxIt": function () {
                    s.triggerEvent("mouseenter")
                }, "mouseleave.selectBoxIt": function () {
                    s.triggerEvent("mouseleave")
                }
            }), s.list.on({
                "mouseover.selectBoxIt": function () {
                    s.blur = !1
                }, "mouseout.selectBoxIt": function () {
                    s.blur = !0
                }, "focusin.selectBoxIt": function () {
                    s.dropdown.trigger("focus", !0)
                }
            }), s.list.on({
                "mousedown.selectBoxIt": function () {
                    s._update(t(this)), s.triggerEvent("option-click"), "false" === t(this).attr("data-disabled") && "true" !== t(this).attr("data-preventclose") && s.close(), setTimeout(function () {
                        s.dropdown.trigger("focus", !0)
                    }, 0)
                }, "focusin.selectBoxIt": function () {
                    s.listItems.not(t(this)).removeAttr("data-active"), t(this).attr("data-active", "");
                    var e = s.list.is(":hidden");
                    (s.options.searchWhenHidden && e || s.options.aggressiveChange || e && s.options.selectWhenHidden) && s._update(t(this)), t(this).addClass(a)
                }, "mouseup.selectBoxIt": function () {
                    n && !o && (s._update(t(this)), s.triggerEvent("option-mouseup"), "false" === t(this).attr("data-disabled") && "true" !== t(this).attr("data-preventclose") && s.close())
                }, "mouseenter.selectBoxIt": function () {
                    "false" === t(this).attr("data-disabled") && (s.listItems.removeAttr("data-active"), t(this).addClass(a).attr("data-active", ""), s.listItems.not(t(this)).removeClass(a), t(this).addClass(a), s.currentFocus = +t(this).attr("data-id"))
                }, "mouseleave.selectBoxIt": function () {
                    "false" === t(this).attr("data-disabled") && (s.listItems.not(t(this)).removeClass(a).removeAttr("data-active"), t(this).addClass(a), s.currentFocus = +t(this).attr("data-id"))
                }, "blur.selectBoxIt": function () {
                    t(this).removeClass(a)
                }
            }, ".selectboxit-option"), s.list.on({
                "click.selectBoxIt": function (t) {
                    t.preventDefault()
                }
            }, "a"), s.selectBox.on({
                "change.selectBoxIt, internal-change.selectBoxIt": function (t, n) {
                    var o, a;
                    n || (o = s.list.find('li[data-val="' + s.originalElem.value + '"]'), o.length && (s.listItems.eq(s.currentFocus).removeClass(s.focusClass), s.currentFocus = +o.attr("data-id"))), o = s.listItems.eq(s.currentFocus), a = o.attr("data-selectedtext"), e = o.attr("data-text"), i = e ? e : o.find("a").text(), s._setText(s.dropdownText, a || i), s.dropdownText.attr("data-val", s.originalElem.value), o.find("i").attr("class") && (s.dropdownImage.attr("class", o.find("i").attr("class")).addClass("selectboxit-default-icon"), s.dropdownImage.attr("style", o.find("i").attr("style"))), s.triggerEvent("changed")
                }, "disable.selectBoxIt": function () {
                    s.dropdown.addClass(s.theme.disabled)
                }, "enable.selectBoxIt": function () {
                    s.dropdown.removeClass(s.theme.disabled)
                }, "open.selectBoxIt": function () {
                    var t, e = s.list.find("li[data-val='" + s.dropdownText.attr("data-val") + "']");
                    e.length || (e = s.listItems.not("[data-disabled=true]").first()), s.currentFocus = +e.attr("data-id"), t = s.listItems.eq(s.currentFocus), s.dropdown.addClass(l).removeClass(r).addClass(a), s.listItems.removeClass(s.selectedClass).removeAttr("data-active").not(t).removeClass(a), t.addClass(s.selectedClass).addClass(a), s.options.hideCurrent && (s.listItems.show(), t.hide())
                }, "close.selectBoxIt": function () {
                    s.dropdown.removeClass(l)
                }, "blur.selectBoxIt": function () {
                    s.dropdown.removeClass(a)
                }, "mouseenter.selectBoxIt": function () {
                    t(this).hasClass(s.theme.disabled) || s.dropdown.addClass(r)
                }, "mouseleave.selectBoxIt": function () {
                    s.dropdown.removeClass(r)
                }, destroy: function (t) {
                    t.preventDefault(), t.stopPropagation()
                }
            }), s
        },
        _update: function (t) {
            var e, i, s, n = this, o = n.options.defaultText || n.selectBox.attr("data-text"), a = n.listItems.eq(n.currentFocus);
            "false" === t.attr("data-disabled") && (e = n.listItems.eq(n.currentFocus).attr("data-selectedtext"), i = a.attr("data-text"), s = i ? i : a.text(), (o && n.options.html ? n.dropdownText.html() === o : n.dropdownText.text() === o) && n.selectBox.val() === t.attr("data-val") ? n.triggerEvent("change") : (n.selectBox.val(t.attr("data-val")), n.currentFocus = +t.attr("data-id"), n.originalElem.value !== n.dropdownText.attr("data-val") && n.triggerEvent("change")))
        },
        _addClasses: function (t) {
            var e = this, i = (e.focusClass = t.focus, e.hoverClass = t.hover, t.button), s = t.list, n = t.arrow, o = t.container;
            return e.openClass = t.open, e.selectedClass = "selectboxit-selected", e.downArrow.addClass(e.selectBox.attr("data-downarrow") || e.options.downArrowIcon || n), e.dropdownContainer.addClass(o), e.dropdown.addClass(i), e.list.addClass(s), e
        },
        refresh: function (t, e) {
            var i = this;
            return i._destroySelectBoxIt()._create(!0), e || i.triggerEvent("refresh"), i._callbackSupport(t), i
        },
        htmlEscape: function (t) {
            return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        triggerEvent: function (t) {
            var e = this, i = e.options.showFirstOption ? e.currentFocus : e.currentFocus - 1 >= 0 ? e.currentFocus : 0;
            return e.selectBox.trigger(t, {
                selectbox: e.selectBox,
                selectboxOption: e.selectItems.eq(i),
                dropdown: e.dropdown,
                dropdownOption: e.listItems.eq(e.currentFocus)
            }), e
        },
        _copyAttributes: function () {
            var t = this;
            return t._addSelectBoxAttributes && t._addSelectBoxAttributes(), t
        },
        _realOuterWidth: function (t) {
            if (t.is(":visible"))return t.outerWidth(!0);
            var e, i = t.clone();
            return i.css({
                visibility: "hidden",
                display: "block",
                position: "absolute"
            }).appendTo("body"), e = i.outerWidth(!0), i.remove(), e
        }
    });
    var n = t.selectBox.selectBoxIt.prototype;
    n.add = function (e, i) {
        this._populate(e, function (e) {
            var s, n, o = this, a = t.type(e), r = 0, l = [], h = o._isJSON(e), c = h && o._parseJSON(e);
            if (e && ("array" === a || h && c.data && "array" === t.type(c.data)) || "object" === a && e.data && "array" === t.type(e.data)) {
                for (o._isJSON(e) && (e = c), e.data && (e = e.data), n = e.length; n - 1 >= r; r += 1)s = e[r], t.isPlainObject(s) ? l.push(t("<option/>", s)) : "string" === t.type(s) && l.push(t("<option/>", {
                    text: s,
                    value: s
                }));
                o.selectBox.append(l)
            } else e && "string" === a && !o._isJSON(e) ? o.selectBox.append(e) : e && "object" === a ? o.selectBox.append(t("<option/>", e)) : e && o._isJSON(e) && t.isPlainObject(o._parseJSON(e)) && o.selectBox.append(t("<option/>", o._parseJSON(e)));
            return o.dropdown ? o.refresh(function () {
                o._callbackSupport(i)
            }, !0) : o._callbackSupport(i), o
        })
    }, n._parseJSON = function (e) {
        return JSON && JSON.parse && JSON.parse(e) || t.parseJSON(e)
    }, n._isJSON = function (t) {
        var e, i = this;
        try {
            return e = i._parseJSON(t), !0
        } catch (s) {
            return !1
        }
    }, n._populate = function (e, i) {
        var s = this;
        return e = t.isFunction(e) ? e.call() : e, s.isDeferred(e) ? e.done(function (t) {
            i.call(s, t)
        }) : i.call(s, e), s
    }, n._ariaAccessibility = function () {
        var e = this, i = t("label[for='" + e.originalElem.id + "']");
        return e.dropdownContainer.attr({
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-haspopup": "true",
            "aria-expanded": "false",
            "aria-owns": e.list[0].id
        }), e.dropdownText.attr({"aria-live": "polite"}), e.dropdown.on({
            "disable.selectBoxIt": function () {
                e.dropdownContainer.attr("aria-disabled", "true")
            }, "enable.selectBoxIt": function () {
                e.dropdownContainer.attr("aria-disabled", "false");
            }
        }), i.length && e.dropdownContainer.attr("aria-labelledby", i[0].id), e.list.attr({
            role: "listbox",
            "aria-hidden": "true"
        }), e.listItems.attr({role: "option"}), e.selectBox.on({
            "open.selectBoxIt": function () {
                e.list.attr("aria-hidden", "false"), e.dropdownContainer.attr("aria-expanded", "true")
            }, "close.selectBoxIt": function () {
                e.list.attr("aria-hidden", "true"), e.dropdownContainer.attr("aria-expanded", "false")
            }
        }), e
    }, n._addSelectBoxAttributes = function () {
        var e = this;
        return e._addAttributes(e.selectBox.prop("attributes"), e.dropdown), e.selectItems.each(function (i) {
            e._addAttributes(t(this).prop("attributes"), e.listItems.eq(i))
        }), e
    }, n._addAttributes = function (e, i) {
        var s = this, n = s.options.copyAttributes;
        return e.length && t.each(e, function (e, s) {
            var o = s.name.toLowerCase(), a = s.value;
            "null" === a || -1 === t.inArray(o, n) && -1 === o.indexOf("data") || i.attr(o, a)
        }), s
    }, n.destroy = function (t) {
        var e = this;
        return e._destroySelectBoxIt(), e.widgetProto.destroy.call(e), e._callbackSupport(t), e
    }, n._destroySelectBoxIt = function () {
        var e = this;
        return e.dropdown.off(".selectBoxIt"), t.contains(e.dropdownContainer[0], e.originalElem) && e.dropdownContainer.before(e.selectBox), e.dropdownContainer.remove(), e.selectBox.removeAttr("style").attr("style", e.selectBoxStyles), e.selectBox.show(), e.triggerEvent("destroy"), e
    }, n.disable = function (t) {
        var e = this;
        return e.options.disabled || (e.close(), e.selectBox.attr("disabled", "disabled"), e.dropdown.removeAttr("tabindex").removeClass(e.theme.enabled).addClass(e.theme.disabled), e.setOption("disabled", !0), e.triggerEvent("disable")), e._callbackSupport(t), e
    }, n.disableOption = function (e, i) {
        var s, n, o, a = this, r = t.type(e);
        return "number" === r && (a.close(), s = a.selectBox.find("option").eq(e), a.triggerEvent("disable-option"), s.attr("disabled", "disabled"), a.listItems.eq(e).attr("data-disabled", "true").addClass(a.theme.disabled), a.currentFocus === e && (n = a.listItems.eq(a.currentFocus).nextAll("li").not("[data-disabled='true']").first().length, o = a.listItems.eq(a.currentFocus).prevAll("li").not("[data-disabled='true']").first().length, n ? a.moveDown() : o ? a.moveUp() : a.disable())), a._callbackSupport(i), a
    }, n._isDisabled = function (t) {
        var e = this;
        return e.originalElem.disabled && e.disable(), e
    }, n._dynamicPositioning = function () {
        var e = this;
        if ("number" === t.type(e.listSize))e.list.css("max-height", e.maxHeight || "none"); else {
            var i = e.dropdown.offset().top, s = e.list.data("max-height") || e.list.outerHeight(), n = e.dropdown.outerHeight(), o = e.options.viewport, a = o.height(), r = t.isWindow(o.get(0)) ? o.scrollTop() : o.offset().top, l = a + r >= i + n + s, h = !l;
            if (e.list.data("max-height") || e.list.data("max-height", e.list.outerHeight()), h)if (e.dropdown.offset().top - r >= s)e.list.css("max-height", s), e.list.css("top", e.dropdown.position().top - e.list.outerHeight()); else {
                var c = Math.abs(i + n + s - (a + r)), d = Math.abs(e.dropdown.offset().top - r - s);
                d > c ? (e.list.css("max-height", s - c - n / 2), e.list.css("top", "auto")) : (e.list.css("max-height", s - d - n / 2), e.list.css("top", e.dropdown.position().top - e.list.outerHeight()))
            } else e.list.css("max-height", s), e.list.css("top", "auto")
        }
        return e
    }, n.enable = function (t) {
        var e = this;
        return e.options.disabled && (e.triggerEvent("enable"), e.selectBox.removeAttr("disabled"), e.dropdown.attr("tabindex", 0).removeClass(e.theme.disabled).addClass(e.theme.enabled), e.setOption("disabled", !1), e._callbackSupport(t)), e
    }, n.enableOption = function (e, i) {
        var s, n = this, o = t.type(e);
        return "number" === o && (s = n.selectBox.find("option").eq(e), n.triggerEvent("enable-option"), s.removeAttr("disabled"), n.listItems.eq(e).attr("data-disabled", "false").removeClass(n.theme.disabled)), n._callbackSupport(i), n
    }, n.moveDown = function (t) {
        var e = this;
        e.currentFocus += 1;
        var i = "true" === e.listItems.eq(e.currentFocus).attr("data-disabled") ? !0 : !1, s = e.listItems.eq(e.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;
        if (e.currentFocus === e.listItems.length)e.currentFocus -= 1; else {
            if (i && s)return e.listItems.eq(e.currentFocus - 1).blur(), void e.moveDown();
            i && !s ? e.currentFocus -= 1 : (e.listItems.eq(e.currentFocus - 1).blur().end().eq(e.currentFocus).focusin(), e._scrollToView("down"), e.triggerEvent("moveDown"))
        }
        return e._callbackSupport(t), e
    }, n.moveUp = function (t) {
        var e = this;
        e.currentFocus -= 1;
        var i = "true" === e.listItems.eq(e.currentFocus).attr("data-disabled") ? !0 : !1, s = e.listItems.eq(e.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;
        if (-1 === e.currentFocus)e.currentFocus += 1; else {
            if (i && s)return e.listItems.eq(e.currentFocus + 1).blur(), void e.moveUp();
            i && !s ? e.currentFocus += 1 : (e.listItems.eq(this.currentFocus + 1).blur().end().eq(e.currentFocus).focusin(), e._scrollToView("up"), e.triggerEvent("moveUp"))
        }
        return e._callbackSupport(t), e
    }, n._setCurrentSearchOption = function (t) {
        var e = this;
        return (e.options.aggressiveChange || e.options.selectWhenHidden || e.listItems.eq(t).is(":visible")) && e.listItems.eq(t).data("disabled") !== !0 && (e.listItems.eq(e.currentFocus).blur(), e.currentIndex = t, e.currentFocus = t, e.listItems.eq(e.currentFocus).focusin(), e._scrollToView("search"), e.triggerEvent("search")), e
    }, n._searchAlgorithm = function (t, e) {
        var i, s, n, o, a = this, r = !1, l = a.textArray, h = a.currentText;
        for (i = t, n = l.length; n > i; i += 1) {
            for (o = l[i], s = 0; n > s; s += 1)-1 !== l[s].search(e) && (r = !0, s = n);
            if (r || (a.currentText = a.currentText.charAt(a.currentText.length - 1).replace(/[|()\[{.+*?$\\]/g, "\\$0"), h = a.currentText), e = new RegExp(h, "gi"), h.length < 3) {
                if (e = new RegExp(h.charAt(0), "gi"), -1 !== o.charAt(0).search(e))return a._setCurrentSearchOption(i), (o.substring(0, h.length).toLowerCase() !== h.toLowerCase() || a.options.similarSearch) && (a.currentIndex += 1), !1
            } else if (-1 !== o.search(e))return a._setCurrentSearchOption(i), !1;
            if (o.toLowerCase() === a.currentText.toLowerCase())return a._setCurrentSearchOption(i), a.currentText = "", !1
        }
        return !0
    }, n.search = function (t, e, i) {
        var s = this;
        i ? s.currentText += t.replace(/[|()\[{.+*?$\\]/g, "\\$0") : s.currentText = t.replace(/[|()\[{.+*?$\\]/g, "\\$0");
        var n = s._searchAlgorithm(s.currentIndex, new RegExp(s.currentText, "gi"));
        return n && s._searchAlgorithm(0, s.currentText), s._callbackSupport(e), s
    }, n._updateMobileText = function () {
        var t, e, i, s = this;
        t = s.selectBox.find("option").filter(":selected"), e = t.attr("data-text"), i = e ? e : t.text(), s._setText(s.dropdownText, i), s.list.find('li[data-val="' + t.val() + '"]').find("i").attr("class") && s.dropdownImage.attr("class", s.list.find('li[data-val="' + t.val() + '"]').find("i").attr("class")).addClass("selectboxit-default-icon")
    }, n._applyNativeSelect = function () {
        var t = this;
        return t.dropdownContainer.append(t.selectBox), t.dropdown.attr("tabindex", "-1"), t.selectBox.css({
            display: "block",
            visibility: "visible",
            width: t._realOuterWidth(t.dropdown),
            height: t.dropdown.outerHeight(),
            opacity: "0",
            position: "absolute",
            top: "0",
            left: "0",
            cursor: "pointer",
            "z-index": "999999",
            margin: t.dropdown.css("margin"),
            padding: "0",
            "-webkit-appearance": "menulist-button"
        }), t.originalElem.disabled && t.triggerEvent("disable"), this
    }, n._mobileEvents = function () {
        var t = this;
        t.selectBox.on({
            "changed.selectBoxIt": function () {
                t.hasChanged = !0, t._updateMobileText(), t.triggerEvent("option-click")
            }, "mousedown.selectBoxIt": function () {
                t.hasChanged || !t.options.defaultText || t.originalElem.disabled || (t._updateMobileText(), t.triggerEvent("option-click"))
            }, "enable.selectBoxIt": function () {
                t.selectBox.removeClass("selectboxit-rendering")
            }, "disable.selectBoxIt": function () {
                t.selectBox.addClass("selectboxit-rendering")
            }
        })
    }, n._mobile = function (t) {
        var e = this;
        return e.isMobile && (e._applyNativeSelect(), e._mobileEvents()), this
    }, n.remove = function (e, i) {
        var s, n, o = this, a = t.type(e), r = 0, l = "";
        if ("array" === a) {
            for (n = e.length; n - 1 >= r; r += 1)s = e[r], "number" === t.type(s) && (l += l.length ? ", option:eq(" + s + ")" : "option:eq(" + s + ")");
            o.selectBox.find(l).remove()
        } else"number" === a ? o.selectBox.find("option").eq(e).remove() : o.selectBox.find("option").remove();
        return o.dropdown ? o.refresh(function () {
            o._callbackSupport(i)
        }, !0) : o._callbackSupport(i), o
    }, n.selectOption = function (e, i) {
        var s = this, n = t.type(e);
        return "number" === n ? s.selectBox.val(s.selectItems.eq(e).val()).change() : "string" === n && s.selectBox.val(e).change(), s._callbackSupport(i), s
    }, n.setOption = function (e, i, s) {
        var n = this;
        return "string" === t.type(e) && (n.options[e] = i), n.refresh(function () {
            n._callbackSupport(s)
        }, !0), n
    }, n.setOptions = function (e, i) {
        var s = this;
        return t.isPlainObject(e) && (s.options = t.extend({}, s.options, e)), s.refresh(function () {
            s._callbackSupport(i)
        }, !0), s
    }, n.wait = function (t, e) {
        var i = this;
        return i.widgetProto._delay.call(i, e, t), i
    }
}), !function (t, e) {
    "function" == typeof define && define.amd ? define("sifter", e) : "object" == typeof exports ? module.exports = e() : t.Sifter = e()
}(this, function () {
    var t = function (t, e) {
        this.items = t, this.settings = e || {diacritics: !0}
    };
    t.prototype.tokenize = function (t) {
        if (t = s(String(t || "").toLowerCase()), !t || !t.length)return [];
        var e, i, o, r, l = [], h = t.split(/ +/);
        for (e = 0, i = h.length; i > e; e++) {
            if (o = n(h[e]), this.settings.diacritics)for (r in a)a.hasOwnProperty(r) && (o = o.replace(new RegExp(r, "g"), a[r]));
            l.push({string: h[e], regex: new RegExp(o, "i")})
        }
        return l
    }, t.prototype.iterator = function (t, e) {
        var i;
        i = o(t) ? Array.prototype.forEach || function (t) {
            for (var e = 0, i = this.length; i > e; e++)t(this[e], e, this)
        } : function (t) {
            for (var e in this)this.hasOwnProperty(e) && t(this[e], e, this)
        }, i.apply(t, [e])
    }, t.prototype.getScoreFunction = function (t, e) {
        var i, s, n, o;
        i = this, t = i.prepareSearch(t, e), n = t.tokens, s = t.options.fields, o = n.length;
        var a = function (t, e) {
            var i, s;
            return t ? (t = String(t || ""), s = t.search(e.regex), -1 === s ? 0 : (i = e.string.length / t.length, 0 === s && (i += .5), i)) : 0
        }, r = function () {
            var t = s.length;
            return t ? 1 === t ? function (t, e) {
                return a(e[s[0]], t)
            } : function (e, i) {
                for (var n = 0, o = 0; t > n; n++)o += a(i[s[n]], e);
                return o / t
            } : function () {
                return 0
            }
        }();
        return o ? 1 === o ? function (t) {
            return r(n[0], t)
        } : "and" === t.options.conjunction ? function (t) {
            for (var e, i = 0, s = 0; o > i; i++) {
                if (e = r(n[i], t), 0 >= e)return 0;
                s += e
            }
            return s / o
        } : function (t) {
            for (var e = 0, i = 0; o > e; e++)i += r(n[e], t);
            return i / o
        } : function () {
            return 0
        }
    }, t.prototype.getSortFunction = function (t, i) {
        var s, n, o, a, r, l, h, c, d, u, p;
        if (o = this, t = o.prepareSearch(t, i), p = !t.query && i.sort_empty || i.sort, d = function (t, e) {
                return "$score" === t ? e.score : o.items[e.id][t]
            }, r = [], p)for (s = 0, n = p.length; n > s; s++)(t.query || "$score" !== p[s].field) && r.push(p[s]);
        if (t.query) {
            for (u = !0, s = 0, n = r.length; n > s; s++)if ("$score" === r[s].field) {
                u = !1;
                break
            }
            u && r.unshift({field: "$score", direction: "desc"})
        } else for (s = 0, n = r.length; n > s; s++)if ("$score" === r[s].field) {
            r.splice(s, 1);
            break
        }
        for (c = [], s = 0, n = r.length; n > s; s++)c.push("desc" === r[s].direction ? -1 : 1);
        return l = r.length, l ? 1 === l ? (a = r[0].field, h = c[0], function (t, i) {
            return h * e(d(a, t), d(a, i))
        }) : function (t, i) {
            var s, n, o;
            for (s = 0; l > s; s++)if (o = r[s].field, n = c[s] * e(d(o, t), d(o, i)))return n;
            return 0
        } : null
    }, t.prototype.prepareSearch = function (t, e) {
        if ("object" == typeof t)return t;
        e = i({}, e);
        var s = e.fields, n = e.sort, a = e.sort_empty;
        return s && !o(s) && (e.fields = [s]), n && !o(n) && (e.sort = [n]), a && !o(a) && (e.sort_empty = [a]), {
            options: e,
            query: String(t || "").toLowerCase(),
            tokens: this.tokenize(t),
            total: 0,
            items: []
        }
    }, t.prototype.search = function (t, e) {
        var i, s, n, o, a = this;
        return s = this.prepareSearch(t, e), e = s.options, t = s.query, o = e.score || a.getScoreFunction(s), t.length ? a.iterator(a.items, function (t, n) {
            i = o(t), (e.filter === !1 || i > 0) && s.items.push({score: i, id: n})
        }) : a.iterator(a.items, function (t, e) {
            s.items.push({score: 1, id: e})
        }), n = a.getSortFunction(s, e), n && s.items.sort(n), s.total = s.items.length, "number" == typeof e.limit && (s.items = s.items.slice(0, e.limit)), s
    };
    var e = function (t, e) {
        return "number" == typeof t && "number" == typeof e ? t > e ? 1 : e > t ? -1 : 0 : (t = r(String(t || "")), e = r(String(e || "")), t > e ? 1 : e > t ? -1 : 0)
    }, i = function (t, e) {
        var i, s, n, o;
        for (i = 1, s = arguments.length; s > i; i++)if (o = arguments[i])for (n in o)o.hasOwnProperty(n) && (t[n] = o[n]);
        return t
    }, s = function (t) {
        return (t + "").replace(/^\s+|\s+$|/g, "")
    }, n = function (t) {
        return (t + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }, o = Array.isArray || $ && $.isArray || function (t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }, a = {
        a: "[aÀÁÂÃÄÅàáâãäåĀāąĄ]",
        c: "[cÇçćĆčČ]",
        d: "[dđĐďĎ]",
        e: "[eÈÉÊËèéêëěĚĒēęĘ]",
        i: "[iÌÍÎÏìíîïĪī]",
        l: "[lłŁ]",
        n: "[nÑñňŇńŃ]",
        o: "[oÒÓÔÕÕÖØòóôõöøŌō]",
        r: "[rřŘ]",
        s: "[sŠšśŚ]",
        t: "[tťŤ]",
        u: "[uÙÚÛÜùúûüůŮŪū]",
        y: "[yŸÿýÝ]",
        z: "[zŽžżŻźŹ]"
    }, r = function () {
        var t, e, i, s, n = "", o = {};
        for (i in a)if (a.hasOwnProperty(i))for (s = a[i].substring(2, a[i].length - 1), n += s, t = 0, e = s.length; e > t; t++)o[s.charAt(t)] = i;
        var r = new RegExp("[" + n + "]", "g");
        return function (t) {
            return t.replace(r, function (t) {
                return o[t]
            }).toLowerCase()
        }
    }();
    return t
}), function (t, e) {
    "function" == typeof define && define.amd ? define("microplugin", e) : "object" == typeof exports ? module.exports = e() : t.MicroPlugin = e()
}(this, function () {
    var t = {};
    t.mixin = function (t) {
        t.plugins = {}, t.prototype.initializePlugins = function (t) {
            var i, s, n, o = this, a = [];
            if (o.plugins = {
                    names: [],
                    settings: {},
                    requested: {},
                    loaded: {}
                }, e.isArray(t))for (i = 0, s = t.length; s > i; i++)"string" == typeof t[i] ? a.push(t[i]) : (o.plugins.settings[t[i].name] = t[i].options, a.push(t[i].name)); else if (t)for (n in t)t.hasOwnProperty(n) && (o.plugins.settings[n] = t[n], a.push(n));
            for (; a.length;)o.require(a.shift())
        }, t.prototype.loadPlugin = function (e) {
            var i = this, s = i.plugins, n = t.plugins[e];
            if (!t.plugins.hasOwnProperty(e))throw new Error('Unable to find "' + e + '" plugin');
            s.requested[e] = !0, s.loaded[e] = n.fn.apply(i, [i.plugins.settings[e] || {}]), s.names.push(e)
        }, t.prototype.require = function (t) {
            var e = this, i = e.plugins;
            if (!e.plugins.loaded.hasOwnProperty(t)) {
                if (i.requested[t])throw new Error('Plugin has circular dependency ("' + t + '")');
                e.loadPlugin(t)
            }
            return i.loaded[t]
        }, t.define = function (e, i) {
            t.plugins[e] = {name: e, fn: i}
        }
    };
    var e = {
        isArray: Array.isArray || function (t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }
    };
    return t
}), function (t, e) {
    "function" == typeof define && define.amd ? define("selectize", ["jquery", "sifter", "microplugin"], e) : "object" == typeof exports ? module.exports = e(require("jquery"), require("sifter"), require("microplugin")) : t.Selectize = e(t.jQuery, t.Sifter, t.MicroPlugin)
}(this, function (t, e, i) {
    "use strict";
    var s = function (t, e) {
        if ("string" != typeof e || e.length) {
            var i = "string" == typeof e ? new RegExp(e, "i") : e, s = function (t) {
                var e = 0;
                if (3 === t.nodeType) {
                    var n = t.data.search(i);
                    if (n >= 0 && t.data.length > 0) {
                        var o = t.data.match(i), a = document.createElement("span");
                        a.className = "highlight";
                        var r = t.splitText(n), l = (r.splitText(o[0].length), r.cloneNode(!0));
                        a.appendChild(l), r.parentNode.replaceChild(a, r), e = 1
                    }
                } else if (1 === t.nodeType && t.childNodes && !/(script|style)/i.test(t.tagName))for (var h = 0; h < t.childNodes.length; ++h)h += s(t.childNodes[h]);
                return e
            };
            return t.each(function () {
                s(this)
            })
        }
    }, n = function () {
    };
    n.prototype = {
        on: function (t, e) {
            this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(e)
        }, off: function (t, e) {
            var i = arguments.length;
            return 0 === i ? delete this._events : 1 === i ? delete this._events[t] : (this._events = this._events || {}, void(t in this._events != 0 && this._events[t].splice(this._events[t].indexOf(e), 1)))
        }, trigger: function (t) {
            if (this._events = this._events || {}, t in this._events != 0)for (var e = 0; e < this._events[t].length; e++)this._events[t][e].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }, n.mixin = function (t) {
        for (var e = ["on", "off", "trigger"], i = 0; i < e.length; i++)t.prototype[e[i]] = n.prototype[e[i]]
    };
    var o = /Mac/.test(navigator.userAgent), a = 65, r = 13, l = 27, h = 37, c = 38, d = 80, u = 39, p = 40, f = 78, m = 8, g = 46, v = 16, b = o ? 91 : 17, _ = o ? 18 : 17, w = 9, y = 1, x = 2, C = !/android/i.test(window.navigator.userAgent) && !!document.createElement("form").validity, k = function (t) {
        return "undefined" != typeof t
    }, I = function (t) {
        return "undefined" == typeof t || null === t ? null : "boolean" == typeof t ? t ? "1" : "0" : t + ""
    }, T = function (t) {
        return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }, S = function (t) {
        return (t + "").replace(/\$/g, "$$$$")
    }, D = {};
    D.before = function (t, e, i) {
        var s = t[e];
        t[e] = function () {
            return i.apply(t, arguments), s.apply(t, arguments)
        }
    }, D.after = function (t, e, i) {
        var s = t[e];
        t[e] = function () {
            var e = s.apply(t, arguments);
            return i.apply(t, arguments), e
        }
    };
    var P = function (t) {
        var e = !1;
        return function () {
            e || (e = !0, t.apply(this, arguments))
        }
    }, O = function (t, e) {
        var i;
        return function () {
            var s = this, n = arguments;
            window.clearTimeout(i), i = window.setTimeout(function () {
                t.apply(s, n)
            }, e)
        }
    }, A = function (t, e, i) {
        var s, n = t.trigger, o = {};
        t.trigger = function () {
            var i = arguments[0];
            return -1 === e.indexOf(i) ? n.apply(t, arguments) : void(o[i] = arguments)
        }, i.apply(t, []), t.trigger = n;
        for (s in o)o.hasOwnProperty(s) && n.apply(t, o[s])
    }, $ = function (t, e, i, s) {
        t.on(e, i, function (e) {
            for (var i = e.target; i && i.parentNode !== t[0];)i = i.parentNode;
            return e.currentTarget = i, s.apply(this, [e])
        })
    }, M = function (t) {
        var e = {};
        if ("selectionStart"in t)e.start = t.selectionStart, e.length = t.selectionEnd - e.start; else if (document.selection) {
            t.focus();
            var i = document.selection.createRange(), s = document.selection.createRange().text.length;
            i.moveStart("character", -t.value.length), e.start = i.text.length - s, e.length = s
        }
        return e
    }, z = function (t, e, i) {
        var s, n, o = {};
        if (i)for (s = 0, n = i.length; n > s; s++)o[i[s]] = t.css(i[s]); else o = t.css();
        e.css(o)
    }, E = function (e, i) {
        if (!e)return 0;
        var s = t("<test>").css({
            position: "absolute",
            top: -99999,
            left: -99999,
            width: "auto",
            padding: 0,
            whiteSpace: "pre"
        }).text(e).appendTo("body");
        z(i, s, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]);
        var n = s.width();
        return s.remove(), n
    }, H = function (t) {
        var e = null, i = function (i, s) {
            var n, o, a, r, l, h, c, d;
            i = i || window.event || {}, s = s || {}, i.metaKey || i.altKey || (s.force || t.data("grow") !== !1) && (n = t.val(), i.type && "keydown" === i.type.toLowerCase() && (o = i.keyCode, a = o >= 97 && 122 >= o || o >= 65 && 90 >= o || o >= 48 && 57 >= o || 32 === o, o === g || o === m ? (d = M(t[0]), d.length ? n = n.substring(0, d.start) + n.substring(d.start + d.length) : o === m && d.start ? n = n.substring(0, d.start - 1) + n.substring(d.start + 1) : o === g && "undefined" != typeof d.start && (n = n.substring(0, d.start) + n.substring(d.start + 1))) : a && (h = i.shiftKey, c = String.fromCharCode(i.keyCode), c = h ? c.toUpperCase() : c.toLowerCase(), n += c)), r = t.attr("placeholder"), !n && r && (n = r), l = E(n, t) + 4, l !== e && (e = l, t.width(l), t.triggerHandler("resize")))
        };
        t.on("keydown keyup update blur", i), i()
    }, N = function (i, s) {
        var n, o, a, r, l = this;
        r = i[0], r.selectize = l;
        var h = window.getComputedStyle && window.getComputedStyle(r, null);
        if (a = h ? h.getPropertyValue("direction") : r.currentStyle && r.currentStyle.direction, a = a || i.parents("[dir]:first").attr("dir") || "", t.extend(l, {
                order: 0,
                settings: s,
                $input: i,
                tabIndex: i.attr("tabindex") || "",
                tagType: "select" === r.tagName.toLowerCase() ? y : x,
                rtl: /rtl/i.test(a),
                eventNS: ".selectize" + ++N.count,
                highlightedValue: null,
                isOpen: !1,
                isDisabled: !1,
                isRequired: i.is("[required]"),
                isInvalid: !1,
                isLocked: !1,
                isFocused: !1,
                isInputHidden: !1,
                isSetup: !1,
                isShiftDown: !1,
                isCmdDown: !1,
                isCtrlDown: !1,
                ignoreFocus: !1,
                ignoreBlur: !1,
                ignoreHover: !1,
                hasOptions: !1,
                currentResults: null,
                lastValue: "",
                caretPos: 0,
                loading: 0,
                loadedSearches: {},
                $activeOption: null,
                $activeItems: [],
                optgroups: {},
                options: {},
                userOptions: {},
                items: [],
                renderCache: {},
                onSearchChange: null === s.loadThrottle ? l.onSearchChange : O(l.onSearchChange, s.loadThrottle)
            }), l.sifter = new e(this.options, {diacritics: s.diacritics}), l.settings.options) {
            for (n = 0, o = l.settings.options.length; o > n; n++)l.registerOption(l.settings.options[n]);
            delete l.settings.options
        }
        if (l.settings.optgroups) {
            for (n = 0, o = l.settings.optgroups.length; o > n; n++)l.registerOptionGroup(l.settings.optgroups[n]);
            delete l.settings.optgroups
        }
        l.settings.mode = l.settings.mode || (1 === l.settings.maxItems ? "single" : "multi"), "boolean" != typeof l.settings.hideSelected && (l.settings.hideSelected = "multi" === l.settings.mode), l.initializePlugins(l.settings.plugins), l.setupCallbacks(), l.setupTemplates(), l.setup()
    };
    return n.mixin(N), i.mixin(N), t.extend(N.prototype, {
        setup: function () {
            var e, i, s, n, a, r, l, h, c, d = this, u = d.settings, p = d.eventNS, f = t(window), m = t(document), g = d.$input;
            if (l = d.settings.mode, h = g.attr("class") || "", e = t("<div>").addClass(u.wrapperClass).addClass(h).addClass(l), i = t("<div>").addClass(u.inputClass).addClass("items").appendTo(e), s = t('<input type="text" autocomplete="off" />').appendTo(i).attr("tabindex", g.is(":disabled") ? "-1" : d.tabIndex), r = t(u.dropdownParent || e), n = t("<div>").addClass(u.dropdownClass).addClass(l).hide().appendTo(r), a = t("<div>").addClass(u.dropdownContentClass).appendTo(n), d.settings.copyClassesToDropdown && n.addClass(h), e.css({width: g[0].style.width}), d.plugins.names.length && (c = "plugin-" + d.plugins.names.join(" plugin-"), e.addClass(c), n.addClass(c)), (null === u.maxItems || u.maxItems > 1) && d.tagType === y && g.attr("multiple", "multiple"), d.settings.placeholder && s.attr("placeholder", u.placeholder), !d.settings.splitOn && d.settings.delimiter) {
                var w = d.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                d.settings.splitOn = new RegExp("\\s*" + w + "+\\s*")
            }
            g.attr("autocorrect") && s.attr("autocorrect", g.attr("autocorrect")), g.attr("autocapitalize") && s.attr("autocapitalize", g.attr("autocapitalize")), d.$wrapper = e, d.$control = i, d.$control_input = s, d.$dropdown = n, d.$dropdown_content = a, n.on("mouseenter", "[data-selectable]", function () {
                return d.onOptionHover.apply(d, arguments)
            }), n.on("mousedown click", "[data-selectable]", function () {
                return d.onOptionSelect.apply(d, arguments)
            }), $(i, "mousedown", "*:not(input)", function () {
                return d.onItemSelect.apply(d, arguments)
            }), H(s), i.on({
                mousedown: function () {
                    return d.onMouseDown.apply(d, arguments)
                }, click: function () {
                    return d.onClick.apply(d, arguments)
                }
            }), s.on({
                mousedown: function (t) {
                    t.stopPropagation()
                }, keydown: function () {
                    return d.onKeyDown.apply(d, arguments)
                }, keyup: function () {
                    return d.onKeyUp.apply(d, arguments)
                }, keypress: function () {
                    return d.onKeyPress.apply(d, arguments)
                }, resize: function () {
                    d.positionDropdown.apply(d, [])
                }, blur: function () {
                    return d.onBlur.apply(d, arguments)
                }, focus: function () {
                    return d.ignoreBlur = !1, d.onFocus.apply(d, arguments)
                }, paste: function () {
                    return d.onPaste.apply(d, arguments)
                }
            }), m.on("keydown" + p, function (t) {
                d.isCmdDown = t[o ? "metaKey" : "ctrlKey"], d.isCtrlDown = t[o ? "altKey" : "ctrlKey"], d.isShiftDown = t.shiftKey
            }), m.on("keyup" + p, function (t) {
                t.keyCode === _ && (d.isCtrlDown = !1), t.keyCode === v && (d.isShiftDown = !1), t.keyCode === b && (d.isCmdDown = !1)
            }), m.on("mousedown" + p, function (t) {
                if (d.isFocused) {
                    if (t.target === d.$dropdown[0] || t.target.parentNode === d.$dropdown[0])return !1;
                    d.$control.has(t.target).length || t.target === d.$control[0] || d.blur(t.target)
                }
            }), f.on(["scroll" + p, "resize" + p].join(" "), function () {
                d.isOpen && d.positionDropdown.apply(d, arguments)
            }), f.on("mousemove" + p, function () {
                d.ignoreHover = !1
            }), this.revertSettings = {
                $children: g.children().detach(),
                tabindex: g.attr("tabindex")
            }, g.attr("tabindex", -1).hide().after(d.$wrapper), t.isArray(u.items) && (d.setValue(u.items), delete u.items), C && g.on("invalid" + p, function (t) {
                t.preventDefault(), d.isInvalid = !0, d.refreshState()
            }), d.updateOriginalInput(), d.refreshItems(), d.refreshState(), d.updatePlaceholder(), d.isSetup = !0, g.is(":disabled") && d.disable(), d.on("change", this.onChange), g.data("selectize", d), g.addClass("selectized"), d.trigger("initialize"), u.preload === !0 && d.onSearchChange("")
        }, setupTemplates: function () {
            var e = this, i = e.settings.labelField, s = e.settings.optgroupLabelField, n = {
                optgroup: function (t) {
                    return '<div class="optgroup">' + t.html + "</div>"
                }, optgroup_header: function (t, e) {
                    return '<div class="optgroup-header">' + e(t[s]) + "</div>"
                }, option: function (t, e) {
                    return '<div class="option">' + e(t[i]) + "</div>"
                }, item: function (t, e) {
                    return '<div class="item">' + e(t[i]) + "</div>"
                }, option_create: function (t, e) {
                    return '<div class="create">Add <strong>' + e(t.input) + "</strong>&hellip;</div>"
                }
            };
            e.settings.render = t.extend({}, n, e.settings.render)
        }, setupCallbacks: function () {
            var t, e, i = {
                initialize: "onInitialize",
                change: "onChange",
                item_add: "onItemAdd",
                item_remove: "onItemRemove",
                clear: "onClear",
                option_add: "onOptionAdd",
                option_remove: "onOptionRemove",
                option_clear: "onOptionClear",
                optgroup_add: "onOptionGroupAdd",
                optgroup_remove: "onOptionGroupRemove",
                optgroup_clear: "onOptionGroupClear",
                dropdown_open: "onDropdownOpen",
                dropdown_close: "onDropdownClose",
                type: "onType",
                load: "onLoad",
                focus: "onFocus",
                blur: "onBlur"
            };
            for (t in i)i.hasOwnProperty(t) && (e = this.settings[i[t]], e && this.on(t, e))
        }, onClick: function (t) {
            var e = this;
            e.isFocused || (e.focus(), t.preventDefault())
        }, onMouseDown: function (e) {
            var i = this, s = e.isDefaultPrevented();
            if (t(e.target), i.isFocused) {
                if (e.target !== i.$control_input[0])return "single" === i.settings.mode ? i.isOpen ? i.close() : i.open() : s || i.setActiveItem(null), !1
            } else s || window.setTimeout(function () {
                i.focus()
            }, 0)
        }, onChange: function () {
            this.$input.trigger("change")
        }, onPaste: function (e) {
            var i = this;
            i.isFull() || i.isInputHidden || i.isLocked ? e.preventDefault() : i.settings.splitOn && setTimeout(function () {
                for (var e = t.trim(i.$control_input.val() || "").split(i.settings.splitOn), s = 0, n = e.length; n > s; s++)i.createItem(e[s])
            }, 0)
        }, onKeyPress: function (t) {
            if (this.isLocked)return t && t.preventDefault();
            var e = String.fromCharCode(t.keyCode || t.which);
            return this.settings.create && "multi" === this.settings.mode && e === this.settings.delimiter ? (this.createItem(), t.preventDefault(), !1) : void 0
        }, onKeyDown: function (t) {
            var e = (t.target === this.$control_input[0], this);
            if (e.isLocked)return void(t.keyCode !== w && t.preventDefault());
            switch (t.keyCode) {
                case a:
                    if (e.isCmdDown)return void e.selectAll();
                    break;
                case l:
                    return void(e.isOpen && (t.preventDefault(), t.stopPropagation(), e.close()));
                case f:
                    if (!t.ctrlKey || t.altKey)break;
                case p:
                    if (!e.isOpen && e.hasOptions)e.open(); else if (e.$activeOption) {
                        e.ignoreHover = !0;
                        var i = e.getAdjacentOption(e.$activeOption, 1);
                        i.length && e.setActiveOption(i, !0, !0)
                    }
                    return void t.preventDefault();
                case d:
                    if (!t.ctrlKey || t.altKey)break;
                case c:
                    if (e.$activeOption) {
                        e.ignoreHover = !0;
                        var s = e.getAdjacentOption(e.$activeOption, -1);
                        s.length && e.setActiveOption(s, !0, !0)
                    }
                    return void t.preventDefault();
                case r:
                    return void(e.isOpen && e.$activeOption && (e.onOptionSelect({currentTarget: e.$activeOption}), t.preventDefault()));
                case h:
                    return void e.advanceSelection(-1, t);
                case u:
                    return void e.advanceSelection(1, t);
                case w:
                    return e.settings.selectOnTab && e.isOpen && e.$activeOption && (e.onOptionSelect({currentTarget: e.$activeOption}), e.isFull() || t.preventDefault()), void(e.settings.create && e.createItem() && t.preventDefault());
                case m:
                case g:
                    return void e.deleteSelection(t)
            }
            return !e.isFull() && !e.isInputHidden || (o ? t.metaKey : t.ctrlKey) ? void 0 : void t.preventDefault()
        }, onKeyUp: function (t) {
            var e = this;
            if (e.isLocked)return t && t.preventDefault();
            var i = e.$control_input.val() || "";
            e.lastValue !== i && (e.lastValue = i, e.onSearchChange(i), e.refreshOptions(), e.trigger("type", i))
        }, onSearchChange: function (t) {
            var e = this, i = e.settings.load;
            i && (e.loadedSearches.hasOwnProperty(t) || (e.loadedSearches[t] = !0, e.load(function (s) {
                i.apply(e, [t, s])
            })))
        }, onFocus: function (t) {
            var e = this, i = e.isFocused;
            return e.isDisabled ? (e.blur(), t && t.preventDefault(), !1) : void(e.ignoreFocus || (e.isFocused = !0, "focus" === e.settings.preload && e.onSearchChange(""), i || e.trigger("focus"), e.$activeItems.length || (e.showInput(), e.setActiveItem(null), e.refreshOptions(!!e.settings.openOnFocus)), e.refreshState()))
        }, onBlur: function (t, e) {
            var i = this;
            if (i.isFocused && (i.isFocused = !1, !i.ignoreFocus)) {
                if (!i.ignoreBlur && document.activeElement === i.$dropdown_content[0])return i.ignoreBlur = !0, void i.onFocus(t);
                var s = function () {
                    i.close(), i.setTextboxValue(""), i.setActiveItem(null), i.setActiveOption(null), i.setCaret(i.items.length), i.refreshState(), (e || document.body).focus(), i.ignoreFocus = !1, i.trigger("blur")
                };
                i.ignoreFocus = !0, i.settings.create && i.settings.createOnBlur ? i.createItem(null, !1, s) : s()
            }
        }, onOptionHover: function (t) {
            this.ignoreHover || this.setActiveOption(t.currentTarget, !1)
        }, onOptionSelect: function (e) {
            var i, s, n = this;
            e.preventDefault && (e.preventDefault(), e.stopPropagation()), s = t(e.currentTarget), s.hasClass("create") ? n.createItem(null, function () {
                n.settings.closeAfterSelect && n.close()
            }) : (i = s.attr("data-value"), "undefined" != typeof i && (n.lastQuery = null, n.setTextboxValue(""), n.addItem(i), n.settings.closeAfterSelect ? n.close() : !n.settings.hideSelected && e.type && /mouse/.test(e.type) && n.setActiveOption(n.getOption(i))))
        }, onItemSelect: function (t) {
            var e = this;
            e.isLocked || "multi" === e.settings.mode && (t.preventDefault(), e.setActiveItem(t.currentTarget, t))
        }, load: function (t) {
            var e = this, i = e.$wrapper.addClass(e.settings.loadingClass);
            e.loading++, t.apply(e, [function (t) {
                e.loading = Math.max(e.loading - 1, 0), t && t.length && (e.addOption(t), e.refreshOptions(e.isFocused && !e.isInputHidden)), e.loading || i.removeClass(e.settings.loadingClass), e.trigger("load", t)
            }])
        }, setTextboxValue: function (t) {
            var e = this.$control_input, i = e.val() !== t;
            i && (e.val(t).triggerHandler("update"), this.lastValue = t)
        }, getValue: function () {
            return this.tagType === y && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter)
        }, setValue: function (t, e) {
            var i = e ? [] : ["change"];
            A(this, i, function () {
                this.clear(e), this.addItems(t, e)
            })
        }, setActiveItem: function (e, i) {
            var s, n, o, a, r, l, h, c, d = this;
            if ("single" !== d.settings.mode) {
                if (e = t(e), !e.length)return t(d.$activeItems).removeClass("active"), d.$activeItems = [], void(d.isFocused && d.showInput());
                if (s = i && i.type.toLowerCase(), "mousedown" === s && d.isShiftDown && d.$activeItems.length) {
                    for (c = d.$control.children(".active:last"), a = Array.prototype.indexOf.apply(d.$control[0].childNodes, [c[0]]), r = Array.prototype.indexOf.apply(d.$control[0].childNodes, [e[0]]), a > r && (h = a, a = r, r = h), n = a; r >= n; n++)l = d.$control[0].childNodes[n], -1 === d.$activeItems.indexOf(l) && (t(l).addClass("active"), d.$activeItems.push(l));
                    i.preventDefault()
                } else"mousedown" === s && d.isCtrlDown || "keydown" === s && this.isShiftDown ? e.hasClass("active") ? (o = d.$activeItems.indexOf(e[0]), d.$activeItems.splice(o, 1), e.removeClass("active")) : d.$activeItems.push(e.addClass("active")[0]) : (t(d.$activeItems).removeClass("active"), d.$activeItems = [e.addClass("active")[0]]);
                d.hideInput(), this.isFocused || d.focus()
            }
        }, setActiveOption: function (e, i, s) {
            var n, o, a, r, l, h = this;
            h.$activeOption && h.$activeOption.removeClass("active"), h.$activeOption = null, e = t(e), e.length && (h.$activeOption = e.addClass("active"), (i || !k(i)) && (n = h.$dropdown_content.height(), o = h.$activeOption.outerHeight(!0), i = h.$dropdown_content.scrollTop() || 0, a = h.$activeOption.offset().top - h.$dropdown_content.offset().top + i, r = a, l = a - n + o, a + o > n + i ? h.$dropdown_content.stop().animate({scrollTop: l}, s ? h.settings.scrollDuration : 0) : i > a && h.$dropdown_content.stop().animate({scrollTop: r}, s ? h.settings.scrollDuration : 0)))
        }, selectAll: function () {
            var t = this;
            "single" !== t.settings.mode && (t.$activeItems = Array.prototype.slice.apply(t.$control.children(":not(input)").addClass("active")), t.$activeItems.length && (t.hideInput(), t.close()), t.focus())
        }, hideInput: function () {
            var t = this;
            t.setTextboxValue(""), t.$control_input.css({
                opacity: 0,
                position: "absolute",
                left: t.rtl ? 1e4 : -1e4
            }), t.isInputHidden = !0
        }, showInput: function () {
            this.$control_input.css({opacity: 1, position: "relative", left: 0}), this.isInputHidden = !1
        }, focus: function () {
            var t = this;
            t.isDisabled || (t.ignoreFocus = !0, t.$control_input[0].focus(), window.setTimeout(function () {
                t.ignoreFocus = !1, t.onFocus()
            }, 0))
        }, blur: function (t) {
            this.$control_input[0].blur(), this.onBlur(null, t)
        }, getScoreFunction: function (t) {
            return this.sifter.getScoreFunction(t, this.getSearchOptions())
        }, getSearchOptions: function () {
            var t = this.settings, e = t.sortField;
            return "string" == typeof e && (e = [{field: e}]), {
                fields: t.searchField,
                conjunction: t.searchConjunction,
                sort: e
            }
        }, search: function (e) {
            var i, s, n, o = this, a = o.settings, r = this.getSearchOptions();
            if (a.score && (n = o.settings.score.apply(this, [e]), "function" != typeof n))throw new Error('Selectize "score" setting must be a function that returns a function');
            if (e !== o.lastQuery ? (o.lastQuery = e, s = o.sifter.search(e, t.extend(r, {score: n})), o.currentResults = s) : s = t.extend(!0, {}, o.currentResults), a.hideSelected)for (i = s.items.length - 1; i >= 0; i--)-1 !== o.items.indexOf(I(s.items[i].id)) && s.items.splice(i, 1);
            return s
        }, refreshOptions: function (e) {
            var i, n, o, a, r, l, h, c, d, u, p, f, m, g, v, b;
            "undefined" == typeof e && (e = !0);
            var _ = this, w = t.trim(_.$control_input.val()), y = _.search(w), x = _.$dropdown_content, C = _.$activeOption && I(_.$activeOption.attr("data-value"));
            for (a = y.items.length, "number" == typeof _.settings.maxOptions && (a = Math.min(a, _.settings.maxOptions)), r = {}, l = [], i = 0; a > i; i++)for (h = _.options[y.items[i].id], c = _.render("option", h), d = h[_.settings.optgroupField] || "", u = t.isArray(d) ? d : [d], n = 0, o = u && u.length; o > n; n++)d = u[n], _.optgroups.hasOwnProperty(d) || (d = ""), r.hasOwnProperty(d) || (r[d] = [], l.push(d)), r[d].push(c);
            for (this.settings.lockOptgroupOrder && l.sort(function (t, e) {
                var i = _.optgroups[t].$order || 0, s = _.optgroups[e].$order || 0;
                return i - s
            }), p = [], i = 0, a = l.length; a > i; i++)d = l[i], _.optgroups.hasOwnProperty(d) && r[d].length ? (f = _.render("optgroup_header", _.optgroups[d]) || "", f += r[d].join(""),
                p.push(_.render("optgroup", t.extend({}, _.optgroups[d], {html: f})))) : p.push(r[d].join(""));
            if (x.html(p.join("")), _.settings.highlight && y.query.length && y.tokens.length)for (i = 0, a = y.tokens.length; a > i; i++)s(x, y.tokens[i].regex);
            if (!_.settings.hideSelected)for (i = 0, a = _.items.length; a > i; i++)_.getOption(_.items[i]).addClass("selected");
            m = _.canCreate(w), m && (x.prepend(_.render("option_create", {input: w})), b = t(x[0].childNodes[0])), _.hasOptions = y.items.length > 0 || m, _.hasOptions ? (y.items.length > 0 ? (v = C && _.getOption(C), v && v.length ? g = v : "single" === _.settings.mode && _.items.length && (g = _.getOption(_.items[0])), g && g.length || (g = b && !_.settings.addPrecedence ? _.getAdjacentOption(b, 1) : x.find("[data-selectable]:first"))) : g = b, _.setActiveOption(g), e && !_.isOpen && _.open()) : (_.setActiveOption(null), e && _.isOpen && _.close())
        }, addOption: function (e) {
            var i, s, n, o = this;
            if (t.isArray(e))for (i = 0, s = e.length; s > i; i++)o.addOption(e[i]); else(n = o.registerOption(e)) && (o.userOptions[n] = !0, o.lastQuery = null, o.trigger("option_add", n, e))
        }, registerOption: function (t) {
            var e = I(t[this.settings.valueField]);
            return !e || this.options.hasOwnProperty(e) ? !1 : (t.$order = t.$order || ++this.order, this.options[e] = t, e)
        }, registerOptionGroup: function (t) {
            var e = I(t[this.settings.optgroupValueField]);
            return e ? (t.$order = t.$order || ++this.order, this.optgroups[e] = t, e) : !1
        }, addOptionGroup: function (t, e) {
            e[this.settings.optgroupValueField] = t, (t = this.registerOptionGroup(e)) && this.trigger("optgroup_add", t, e)
        }, removeOptionGroup: function (t) {
            this.optgroups.hasOwnProperty(t) && (delete this.optgroups[t], this.renderCache = {}, this.trigger("optgroup_remove", t))
        }, clearOptionGroups: function () {
            this.optgroups = {}, this.renderCache = {}, this.trigger("optgroup_clear")
        }, updateOption: function (e, i) {
            var s, n, o, a, r, l, h, c = this;
            if (e = I(e), o = I(i[c.settings.valueField]), null !== e && c.options.hasOwnProperty(e)) {
                if ("string" != typeof o)throw new Error("Value must be set in option data");
                h = c.options[e].$order, o !== e && (delete c.options[e], a = c.items.indexOf(e), -1 !== a && c.items.splice(a, 1, o)), i.$order = i.$order || h, c.options[o] = i, r = c.renderCache.item, l = c.renderCache.option, r && (delete r[e], delete r[o]), l && (delete l[e], delete l[o]), -1 !== c.items.indexOf(o) && (s = c.getItem(e), n = t(c.render("item", i)), s.hasClass("active") && n.addClass("active"), s.replaceWith(n)), c.lastQuery = null, c.isOpen && c.refreshOptions(!1)
            }
        }, removeOption: function (t, e) {
            var i = this;
            t = I(t);
            var s = i.renderCache.item, n = i.renderCache.option;
            s && delete s[t], n && delete n[t], delete i.userOptions[t], delete i.options[t], i.lastQuery = null, i.trigger("option_remove", t), i.removeItem(t, e)
        }, clearOptions: function () {
            var t = this;
            t.loadedSearches = {}, t.userOptions = {}, t.renderCache = {}, t.options = t.sifter.items = {}, t.lastQuery = null, t.trigger("option_clear"), t.clear()
        }, getOption: function (t) {
            return this.getElementWithValue(t, this.$dropdown_content.find("[data-selectable]"))
        }, getAdjacentOption: function (e, i) {
            var s = this.$dropdown.find("[data-selectable]"), n = s.index(e) + i;
            return n >= 0 && n < s.length ? s.eq(n) : t()
        }, getElementWithValue: function (e, i) {
            if (e = I(e), "undefined" != typeof e && null !== e)for (var s = 0, n = i.length; n > s; s++)if (i[s].getAttribute("data-value") === e)return t(i[s]);
            return t()
        }, getItem: function (t) {
            return this.getElementWithValue(t, this.$control.children())
        }, addItems: function (e, i) {
            for (var s = t.isArray(e) ? e : [e], n = 0, o = s.length; o > n; n++)this.isPending = o - 1 > n, this.addItem(s[n], i)
        }, addItem: function (e, i) {
            var s = i ? [] : ["change"];
            A(this, s, function () {
                var s, n, o, a, r, l = this, h = l.settings.mode;
                return e = I(e), -1 !== l.items.indexOf(e) ? void("single" === h && l.close()) : void(l.options.hasOwnProperty(e) && ("single" === h && l.clear(i), "multi" === h && l.isFull() || (s = t(l.render("item", l.options[e])), r = l.isFull(), l.items.splice(l.caretPos, 0, e), l.insertAtCaret(s), (!l.isPending || !r && l.isFull()) && l.refreshState(), l.isSetup && (o = l.$dropdown_content.find("[data-selectable]"), l.isPending || (n = l.getOption(e), a = l.getAdjacentOption(n, 1).attr("data-value"), l.refreshOptions(l.isFocused && "single" !== h), a && l.setActiveOption(l.getOption(a))), !o.length || l.isFull() ? l.close() : l.positionDropdown(), l.updatePlaceholder(), l.trigger("item_add", e, s), l.updateOriginalInput({silent: i})))))
            })
        }, removeItem: function (t, e) {
            var i, s, n, o = this;
            i = "object" == typeof t ? t : o.getItem(t), t = I(i.attr("data-value")), s = o.items.indexOf(t), -1 !== s && (i.remove(), i.hasClass("active") && (n = o.$activeItems.indexOf(i[0]), o.$activeItems.splice(n, 1)), o.items.splice(s, 1), o.lastQuery = null, !o.settings.persist && o.userOptions.hasOwnProperty(t) && o.removeOption(t, e), s < o.caretPos && o.setCaret(o.caretPos - 1), o.refreshState(), o.updatePlaceholder(), o.updateOriginalInput({silent: e}), o.positionDropdown(), o.trigger("item_remove", t, i))
        }, createItem: function (e, i) {
            var s = this, n = s.caretPos;
            e = e || t.trim(s.$control_input.val() || "");
            var o = arguments[arguments.length - 1];
            if ("function" != typeof o && (o = function () {
                }), "boolean" != typeof i && (i = !0), !s.canCreate(e))return o(), !1;
            s.lock();
            var a = "function" == typeof s.settings.create ? this.settings.create : function (t) {
                var e = {};
                return e[s.settings.labelField] = t, e[s.settings.valueField] = t, e
            }, r = P(function (t) {
                if (s.unlock(), !t || "object" != typeof t)return o();
                var e = I(t[s.settings.valueField]);
                return "string" != typeof e ? o() : (s.setTextboxValue(""), s.addOption(t), s.setCaret(n), s.addItem(e), s.refreshOptions(i && "single" !== s.settings.mode), void o(t))
            }), l = a.apply(this, [e, r]);
            return "undefined" != typeof l && r(l), !0
        }, refreshItems: function () {
            this.lastQuery = null, this.isSetup && this.addItem(this.items), this.refreshState(), this.updateOriginalInput()
        }, refreshState: function () {
            var t, e = this;
            e.isRequired && (e.items.length && (e.isInvalid = !1), e.$control_input.prop("required", t)), e.refreshClasses()
        }, refreshClasses: function () {
            var e = this, i = e.isFull(), s = e.isLocked;
            e.$wrapper.toggleClass("rtl", e.rtl), e.$control.toggleClass("focus", e.isFocused).toggleClass("disabled", e.isDisabled).toggleClass("required", e.isRequired).toggleClass("invalid", e.isInvalid).toggleClass("locked", s).toggleClass("full", i).toggleClass("not-full", !i).toggleClass("input-active", e.isFocused && !e.isInputHidden).toggleClass("dropdown-active", e.isOpen).toggleClass("has-options", !t.isEmptyObject(e.options)).toggleClass("has-items", e.items.length > 0), e.$control_input.data("grow", !i && !s)
        }, isFull: function () {
            return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
        }, updateOriginalInput: function (t) {
            var e, i, s, n, o = this;
            if (t = t || {}, o.tagType === y) {
                for (s = [], e = 0, i = o.items.length; i > e; e++)n = o.options[o.items[e]][o.settings.labelField] || "", s.push('<option value="' + T(o.items[e]) + '" selected="selected">' + T(n) + "</option>");
                s.length || this.$input.attr("multiple") || s.push('<option value="" selected="selected"></option>'), o.$input.html(s.join(""))
            } else o.$input.val(o.getValue()), o.$input.attr("value", o.$input.val());
            o.isSetup && (t.silent || o.trigger("change", o.$input.val()))
        }, updatePlaceholder: function () {
            if (this.settings.placeholder) {
                var t = this.$control_input;
                this.items.length ? t.removeAttr("placeholder") : t.attr("placeholder", this.settings.placeholder), t.triggerHandler("update", {force: !0})
            }
        }, open: function () {
            var t = this;
            t.isLocked || t.isOpen || "multi" === t.settings.mode && t.isFull() || (t.focus(), t.isOpen = !0, t.refreshState(), t.$dropdown.css({
                visibility: "hidden",
                display: "block"
            }), t.positionDropdown(), t.$dropdown.css({visibility: "visible"}), t.trigger("dropdown_open", t.$dropdown))
        }, close: function () {
            var t = this, e = t.isOpen;
            "single" === t.settings.mode && t.items.length && t.hideInput(), t.isOpen = !1, t.$dropdown.hide(), t.setActiveOption(null), t.refreshState(), e && t.trigger("dropdown_close", t.$dropdown)
        }, positionDropdown: function () {
            var t = this.$control, e = "body" === this.settings.dropdownParent ? t.offset() : t.position();
            e.top += t.outerHeight(!0), this.$dropdown.css({width: t.outerWidth(), top: e.top, left: e.left})
        }, clear: function (t) {
            var e = this;
            e.items.length && (e.$control.children(":not(input)").remove(), e.items = [], e.lastQuery = null, e.setCaret(0), e.setActiveItem(null), e.updatePlaceholder(), e.updateOriginalInput({silent: t}), e.refreshState(), e.showInput(), e.trigger("clear"))
        }, insertAtCaret: function (e) {
            var i = Math.min(this.caretPos, this.items.length);
            0 === i ? this.$control.prepend(e) : t(this.$control[0].childNodes[i]).before(e), this.setCaret(i + 1)
        }, deleteSelection: function (e) {
            var i, s, n, o, a, r, l, h, c, d = this;
            if (n = e && e.keyCode === m ? -1 : 1, o = M(d.$control_input[0]), d.$activeOption && !d.settings.hideSelected && (l = d.getAdjacentOption(d.$activeOption, -1).attr("data-value")), a = [], d.$activeItems.length) {
                for (c = d.$control.children(".active:" + (n > 0 ? "last" : "first")), r = d.$control.children(":not(input)").index(c), n > 0 && r++, i = 0, s = d.$activeItems.length; s > i; i++)a.push(t(d.$activeItems[i]).attr("data-value"));
                e && (e.preventDefault(), e.stopPropagation())
            } else(d.isFocused || "single" === d.settings.mode) && d.items.length && (0 > n && 0 === o.start && 0 === o.length ? a.push(d.items[d.caretPos - 1]) : n > 0 && o.start === d.$control_input.val().length && a.push(d.items[d.caretPos]));
            if (!a.length || "function" == typeof d.settings.onDelete && d.settings.onDelete.apply(d, [a]) === !1)return !1;
            for ("undefined" != typeof r && d.setCaret(r); a.length;)d.removeItem(a.pop());
            return d.showInput(), d.positionDropdown(), d.refreshOptions(!0), l && (h = d.getOption(l), h.length && d.setActiveOption(h)), !0
        }, advanceSelection: function (t, e) {
            var i, s, n, o, a, r, l = this;
            0 !== t && (l.rtl && (t *= -1), i = t > 0 ? "last" : "first", s = M(l.$control_input[0]), l.isFocused && !l.isInputHidden ? (o = l.$control_input.val().length, a = 0 > t ? 0 === s.start && 0 === s.length : s.start === o, a && !o && l.advanceCaret(t, e)) : (r = l.$control.children(".active:" + i), r.length && (n = l.$control.children(":not(input)").index(r), l.setActiveItem(null), l.setCaret(t > 0 ? n + 1 : n))))
        }, advanceCaret: function (t, e) {
            var i, s, n = this;
            0 !== t && (i = t > 0 ? "next" : "prev", n.isShiftDown ? (s = n.$control_input[i](), s.length && (n.hideInput(), n.setActiveItem(s), e && e.preventDefault())) : n.setCaret(n.caretPos + t))
        }, setCaret: function (e) {
            var i = this;
            if (e = "single" === i.settings.mode ? i.items.length : Math.max(0, Math.min(i.items.length, e)), !i.isPending) {
                var s, n, o, a;
                for (o = i.$control.children(":not(input)"), s = 0, n = o.length; n > s; s++)a = t(o[s]).detach(), e > s ? i.$control_input.before(a) : i.$control.append(a)
            }
            i.caretPos = e
        }, lock: function () {
            this.close(), this.isLocked = !0, this.refreshState()
        }, unlock: function () {
            this.isLocked = !1, this.refreshState()
        }, disable: function () {
            var t = this;
            t.$input.prop("disabled", !0), t.$control_input.prop("disabled", !0).prop("tabindex", -1), t.isDisabled = !0, t.lock()
        }, enable: function () {
            var t = this;
            t.$input.prop("disabled", !1), t.$control_input.prop("disabled", !1).prop("tabindex", t.tabIndex), t.isDisabled = !1, t.unlock()
        }, destroy: function () {
            var e = this, i = e.eventNS, s = e.revertSettings;
            e.trigger("destroy"), e.off(), e.$wrapper.remove(), e.$dropdown.remove(), e.$input.html("").append(s.$children).removeAttr("tabindex").removeClass("selectized").attr({tabindex: s.tabindex}).show(), e.$control_input.removeData("grow"), e.$input.removeData("selectize"), t(window).off(i), t(document).off(i), t(document.body).off(i), delete e.$input[0].selectize
        }, render: function (t, e) {
            var i, s, n = "", o = !1, a = this, r = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
            return ("option" === t || "item" === t) && (i = I(e[a.settings.valueField]), o = !!i), o && (k(a.renderCache[t]) || (a.renderCache[t] = {}), a.renderCache[t].hasOwnProperty(i)) ? a.renderCache[t][i] : (n = a.settings.render[t].apply(this, [e, T]), ("option" === t || "option_create" === t) && (n = n.replace(r, "<$1 data-selectable")), "optgroup" === t && (s = e[a.settings.optgroupValueField] || "", n = n.replace(r, '<$1 data-group="' + S(T(s)) + '"')), ("option" === t || "item" === t) && (n = n.replace(r, '<$1 data-value="' + S(T(i || "")) + '"')), o && (a.renderCache[t][i] = n), n)
        }, clearCache: function (t) {
            var e = this;
            "undefined" == typeof t ? e.renderCache = {} : delete e.renderCache[t]
        }, canCreate: function (t) {
            var e = this;
            if (!e.settings.create)return !1;
            var i = e.settings.createFilter;
            return t.length && ("function" != typeof i || i.apply(e, [t])) && ("string" != typeof i || new RegExp(i).test(t)) && (!(i instanceof RegExp) || i.test(t))
        }
    }), N.count = 0, N.defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        allowEmptyOption: !1,
        closeAfterSelect: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: !1,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        copyClassesToDropdown: !0,
        render: {}
    }, t.fn.selectize = function (e) {
        var i = t.fn.selectize.defaults, s = t.extend({}, i, e), n = s.dataAttr, o = s.labelField, a = s.valueField, r = s.optgroupField, l = s.optgroupLabelField, h = s.optgroupValueField, c = function (e, i) {
            var r, l, h, c, d = e.attr(n);
            if (d)for (i.options = JSON.parse(d), r = 0, l = i.options.length; l > r; r++)i.items.push(i.options[r][a]); else {
                var u = t.trim(e.val() || "");
                if (!s.allowEmptyOption && !u.length)return;
                for (h = u.split(s.delimiter), r = 0, l = h.length; l > r; r++)c = {}, c[o] = h[r], c[a] = h[r], i.options.push(c);
                i.items = h
            }
        }, d = function (e, i) {
            var c, d, u, p, f = i.options, m = {}, g = function (t) {
                var e = n && t.attr(n);
                return "string" == typeof e && e.length ? JSON.parse(e) : null
            }, v = function (e, n) {
                e = t(e);
                var l = I(e.attr("value"));
                if (l || s.allowEmptyOption)if (m.hasOwnProperty(l)) {
                    if (n) {
                        var h = m[l][r];
                        h ? t.isArray(h) ? h.push(n) : m[l][r] = [h, n] : m[l][r] = n
                    }
                } else {
                    var c = g(e) || {};
                    c[o] = c[o] || e.text(), c[a] = c[a] || l, c[r] = c[r] || n, m[l] = c, f.push(c), e.is(":selected") && i.items.push(l)
                }
            }, b = function (e) {
                var s, n, o, a, r;
                for (e = t(e), o = e.attr("label"), o && (a = g(e) || {}, a[l] = o, a[h] = o, i.optgroups.push(a)), r = t("option", e), s = 0, n = r.length; n > s; s++)v(r[s], o)
            };
            for (i.maxItems = e.attr("multiple") ? null : 1, p = e.children(), c = 0, d = p.length; d > c; c++)u = p[c].tagName.toLowerCase(), "optgroup" === u ? b(p[c]) : "option" === u && v(p[c])
        };
        return this.each(function () {
            if (!this.selectize) {
                var n, o = t(this), a = this.tagName.toLowerCase(), r = o.attr("placeholder") || o.attr("data-placeholder");
                r || s.allowEmptyOption || (r = o.children('option[value=""]').text());
                var l = {placeholder: r, options: [], optgroups: [], items: []};
                "select" === a ? d(o, l) : c(o, l), n = new N(o, t.extend(!0, {}, i, l, e))
            }
        })
    }, t.fn.selectize.defaults = N.defaults, t.fn.selectize.support = {validity: C}, N.define("drag_drop", function (e) {
        if (!t.fn.sortable)throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if ("multi" === this.settings.mode) {
            var i = this;
            i.lock = function () {
                var t = i.lock;
                return function () {
                    var e = i.$control.data("sortable");
                    return e && e.disable(), t.apply(i, arguments)
                }
            }(), i.unlock = function () {
                var t = i.unlock;
                return function () {
                    var e = i.$control.data("sortable");
                    return e && e.enable(), t.apply(i, arguments)
                }
            }(), i.setup = function () {
                var e = i.setup;
                return function () {
                    e.apply(this, arguments);
                    var s = i.$control.sortable({
                        items: "[data-value]",
                        forcePlaceholderSize: !0,
                        disabled: i.isLocked,
                        start: function (t, e) {
                            e.placeholder.css("width", e.helper.css("width")), s.css({overflow: "visible"})
                        },
                        stop: function () {
                            s.css({overflow: "hidden"});
                            var e = i.$activeItems ? i.$activeItems.slice() : null, n = [];
                            s.children("[data-value]").each(function () {
                                n.push(t(this).attr("data-value"))
                            }), i.setValue(n), i.setActiveItem(e)
                        }
                    })
                }
            }()
        }
    }), N.define("dropdown_header", function (e) {
        var i = this;
        e = t.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function (t) {
                return '<div class="' + t.headerClass + '"><div class="' + t.titleRowClass + '"><span class="' + t.labelClass + '">' + t.title + '</span><a href="javascript:void(0)" class="' + t.closeClass + '">&times;</a></div></div>'
            }
        }, e), i.setup = function () {
            var s = i.setup;
            return function () {
                s.apply(i, arguments), i.$dropdown_header = t(e.html(e)), i.$dropdown.prepend(i.$dropdown_header)
            }
        }()
    }), N.define("optgroup_columns", function (e) {
        var i = this;
        e = t.extend({equalizeWidth: !0, equalizeHeight: !0}, e), this.getAdjacentOption = function (e, i) {
            var s = e.closest("[data-group]").find("[data-selectable]"), n = s.index(e) + i;
            return n >= 0 && n < s.length ? s.eq(n) : t()
        }, this.onKeyDown = function () {
            var t = i.onKeyDown;
            return function (e) {
                var s, n, o, a;
                return !this.isOpen || e.keyCode !== h && e.keyCode !== u ? t.apply(this, arguments) : (i.ignoreHover = !0, a = this.$activeOption.closest("[data-group]"), s = a.find("[data-selectable]").index(this.$activeOption), a = e.keyCode === h ? a.prev("[data-group]") : a.next("[data-group]"), o = a.find("[data-selectable]"), n = o.eq(Math.min(o.length - 1, s)), void(n.length && this.setActiveOption(n)))
            }
        }();
        var s = function () {
            var t, e = s.width, i = document;
            return "undefined" == typeof e && (t = i.createElement("div"), t.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>', t = t.firstChild, i.body.appendChild(t), e = s.width = t.offsetWidth - t.clientWidth, i.body.removeChild(t)), e
        }, n = function () {
            var n, o, a, r, l, h, c;
            if (c = t("[data-group]", i.$dropdown_content), o = c.length, o && i.$dropdown_content.width()) {
                if (e.equalizeHeight) {
                    for (a = 0, n = 0; o > n; n++)a = Math.max(a, c.eq(n).height());
                    c.css({height: a})
                }
                e.equalizeWidth && (h = i.$dropdown_content.innerWidth() - s(), r = Math.round(h / o), c.css({width: r}), o > 1 && (l = h - r * (o - 1), c.eq(o - 1).css({width: l})))
            }
        };
        (e.equalizeHeight || e.equalizeWidth) && (D.after(this, "positionDropdown", n), D.after(this, "refreshOptions", n))
    }), N.define("remove_button", function (e) {
        if ("single" !== this.settings.mode) {
            e = t.extend({label: "&times;", title: "Remove", className: "remove", append: !0}, e);
            var i = this, s = '<a href="javascript:void(0)" class="' + e.className + '" tabindex="-1" title="' + T(e.title) + '">' + e.label + "</a>", n = function (t, e) {
                var i = t.search(/(<\/[^>]+>\s*)$/);
                return t.substring(0, i) + e + t.substring(i)
            };
            this.setup = function () {
                var o = i.setup;
                return function () {
                    if (e.append) {
                        var a = i.settings.render.item;
                        i.settings.render.item = function (t) {
                            return n(a.apply(this, arguments), s)
                        }
                    }
                    o.apply(this, arguments), this.$control.on("click", "." + e.className, function (e) {
                        if (e.preventDefault(), !i.isLocked) {
                            var s = t(e.currentTarget).parent();
                            i.setActiveItem(s), i.deleteSelection() && i.setCaret(i.items.length)
                        }
                    })
                }
            }()
        }
    }), N.define("restore_on_backspace", function (t) {
        var e = this;
        t.text = t.text || function (t) {
                return t[this.settings.labelField]
            }, this.onKeyDown = function () {
            var i = e.onKeyDown;
            return function (e) {
                var s, n;
                return e.keyCode === m && "" === this.$control_input.val() && !this.$activeItems.length && (s = this.caretPos - 1, s >= 0 && s < this.items.length) ? (n = this.options[this.items[s]], this.deleteSelection(e) && (this.setTextboxValue(t.text.apply(this, [n])), this.refreshOptions(!0)), void e.preventDefault()) : i.apply(this, arguments)
            }
        }()
    }), N
}), !function (t, e, i) {
    function s(e, i) {
        this.element = e, this.settings = t.extend({}, n, i), this._defaults = n, this._name = o, this.init()
    }

    var n = {
        label: "",
        duplicate: !0,
        duration: 200,
        easingOpen: "swing",
        easingClose: "swing",
        closedSymbol: "&#9658;",
        openedSymbol: "&#9660;",
        prependTo: "body",
        parentTag: "a",
        closeOnClick: !1,
        allowParentLinks: !1,
        init: function () {
        },
        open: function () {
        },
        close: function () {
        }
    }, o = "slicknav", a = "slicknav";
    s.prototype.init = function () {
        var i = this, s = t(this.element), n = this.settings;
        n.duplicate ? (i.mobileNav = s.clone(), i.mobileNav.removeAttr("id"), i.mobileNav.find("*").each(function (e, i) {
            t(i).removeAttr("id")
        })) : i.mobileNav = s;
        var o = a + "_icon";
        "" == n.label && (o += " " + a + "_no-text"), "a" == n.parentTag && (n.parentTag = 'a href="#"'), i.mobileNav.attr("class", a + "_nav");
        var r = t('<div class="' + a + '_menu"></div>');
        i.btn = t("<" + n.parentTag + ' aria-haspopup="true" tabindex="0" class="' + a + "_btn " + a + '_collapsed"><span class="' + a + '_menutxt">' + n.label + '</span><span class="' + o + '"><span class="' + a + '_icon-bar"></span><span class="' + a + '_icon-bar"></span><span class="' + a + '_icon-bar"></span></span></a>'), t(r).append(i.btn), t(n.prependTo).prepend(r), r.append(i.mobileNav);
        var l = i.mobileNav.find("li");
        t(l).each(function () {
            var e = t(this);
            if (data = {}, data.children = e.children("ul").attr("role", "menu"), e.data("menu", data), data.children.length > 0) {
                var s = e.contents(), o = [];
                t(s).each(function () {
                    return t(this).is("ul") ? !1 : void o.push(this)
                }), t(o).wrapAll("<" + n.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + a + '_item"/>').parent(), e.addClass(a + "_collapsed"), e.addClass(a + "_parent"), t(o).last().after('<span class="' + a + '_arrow">' + n.closedSymbol + "</span>")
            } else 0 == e.children().length && e.addClass(a + "_txtnode");
            e.children("a").attr("role", "menuitem").click(function () {
                n.closeOnClick && t(i.btn).click()
            })
        }), t(l).each(function () {
            var e = t(this).data("menu");
            i._visibilityToggle(e.children, !1, null, !0)
        }), i._visibilityToggle(i.mobileNav, !1, "init", !0), i.mobileNav.attr("role", "menu"), t(e).mousedown(function () {
            i._outlines(!1)
        }), t(e).keyup(function () {
            i._outlines(!0)
        }), t(i.btn).click(function (t) {
            t.preventDefault(), i._menuToggle()
        }), i.mobileNav.on("click", "." + a + "_item", function (e) {
            e.preventDefault(), i._itemClick(t(this))
        }), t(i.btn).keydown(function (t) {
            var e = t || event;
            13 == e.keyCode && (t.preventDefault(), i._menuToggle())
        }), i.mobileNav.on("keydown", "." + a + "_item", function (e) {
            var s = e || event;
            13 == s.keyCode && (e.preventDefault(), i._itemClick(t(e.target)))
        }), n.allowParentLinks && t("." + a + "_item a").click(function (t) {
            t.stopImmediatePropagation()
        })
    }, s.prototype._menuToggle = function (t) {
        var e = this, i = e.btn, s = e.mobileNav;
        i.hasClass(a + "_collapsed") ? (i.removeClass(a + "_collapsed"), i.addClass(a + "_open")) : (i.removeClass(a + "_open"), i.addClass(a + "_collapsed")), i.addClass(a + "_animating"), e._visibilityToggle(s, !0, i)
    }, s.prototype._itemClick = function (t) {
        var e = this, i = e.settings, s = t.data("menu");
        s || (s = {}, s.arrow = t.children("." + a + "_arrow"), s.ul = t.next("ul"), s.parent = t.parent(), t.data("menu", s)), s.parent.hasClass(a + "_collapsed") ? (s.arrow.html(i.openedSymbol), s.parent.removeClass(a + "_collapsed"), s.parent.addClass(a + "_open"), s.parent.addClass(a + "_animating"), e._visibilityToggle(s.ul, !0, t)) : (s.arrow.html(i.closedSymbol), s.parent.addClass(a + "_collapsed"), s.parent.removeClass(a + "_open"), s.parent.addClass(a + "_animating"), e._visibilityToggle(s.ul, !0, t))
    }, s.prototype._visibilityToggle = function (e, i, s, n) {
        var o = this, r = o.settings, l = o._getActionItems(e), h = 0;
        i && (h = r.duration), e.hasClass(a + "_hidden") ? (e.removeClass(a + "_hidden"), e.slideDown(h, r.easingOpen, function () {
            t(s).removeClass(a + "_animating"), t(s).parent().removeClass(a + "_animating"), n || r.open(s)
        }), e.attr("aria-hidden", "false"), l.attr("tabindex", "0"), o._setVisAttr(e, !1)) : (e.addClass(a + "_hidden"), e.slideUp(h, this.settings.easingClose, function () {
            e.attr("aria-hidden", "true"), l.attr("tabindex", "-1"), o._setVisAttr(e, !0), e.hide(), t(s).removeClass(a + "_animating"), t(s).parent().removeClass(a + "_animating"), n ? "init" == s && r.init() : r.close(s)
        }))
    }, s.prototype._setVisAttr = function (e, i) {
        var s = this, n = e.children("li").children("ul").not("." + a + "_hidden");
        i ? n.each(function () {
            var e = t(this);
            e.attr("aria-hidden", "true");
            var n = s._getActionItems(e);
            n.attr("tabindex", "-1"), s._setVisAttr(e, i)
        }) : n.each(function () {
            var e = t(this);
            e.attr("aria-hidden", "false");
            var n = s._getActionItems(e);
            n.attr("tabindex", "0"), s._setVisAttr(e, i)
        })
    }, s.prototype._getActionItems = function (t) {
        var e = t.data("menu");
        if (!e) {
            e = {};
            var i = t.children("li"), s = i.children("a");
            e.links = s.add(i.children("." + a + "_item")), t.data("menu", e)
        }
        return e.links
    }, s.prototype._outlines = function (e) {
        e ? t("." + a + "_item, ." + a + "_btn").css("outline", "") : t("." + a + "_item, ." + a + "_btn").css("outline", "none")
    }, s.prototype.toggle = function () {
        $this._menuToggle()
    }, s.prototype.open = function () {
        $this = this, $this.btn.hasClass(a + "_collapsed") && $this._menuToggle()
    }, s.prototype.close = function () {
        $this = this, $this.btn.hasClass(a + "_open") && $this._menuToggle()
    }, t.fn[o] = function (e) {
        var i = arguments;
        if (void 0 === e || "object" == typeof e)return this.each(function () {
            t.data(this, "plugin_" + o) || t.data(this, "plugin_" + o, new s(this, e))
        });
        if ("string" == typeof e && "_" !== e[0] && "init" !== e) {
            var n;
            return this.each(function () {
                var a = t.data(this, "plugin_" + o);
                a instanceof s && "function" == typeof a[e] && (n = a[e].apply(a, Array.prototype.slice.call(i, 1)))
            }), void 0 !== n ? n : this
        }
    }
}(jQuery, document, window);