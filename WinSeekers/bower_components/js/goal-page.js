!function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function (e, t) {
    "use strict";
    if (!e.jstree) {
        var i, r, s = 0, n = !1, a = !1, o = !1, d = [], c = e("script:last").attr("src"), l = window.document, h = l.createElement("LI");
        h.setAttribute("role", "treeitem"), i = l.createElement("I"), i.className = "jstree-icon jstree-ocl", i.setAttribute("role", "presentation"), h.appendChild(i), i = l.createElement("A"), i.className = "jstree-anchor", i.setAttribute("href", "#"), i.setAttribute("tabindex", "-1"), r = l.createElement("I"), r.className = "jstree-icon jstree-themeicon", r.setAttribute("role", "presentation"), i.appendChild(r), h.appendChild(i), i = r = null, e.jstree = {
            version: "3.2.1",
            defaults: {plugins: []},
            plugins: {},
            path: c && -1 !== c.indexOf("/") ? c.replace(/\/[^\/]+$/, "") : "",
            idregex: /[\\:&!^|()\[\]<>@*'+~#";.,=\- \/${}%?`]/g,
            root: "#"
        }, e.jstree.create = function (t, i) {
            var r = new e.jstree.core(++s), n = i;
            return i = e.extend(!0, {}, e.jstree.defaults, i), n && n.plugins && (i.plugins = n.plugins), e.each(i.plugins, function (e, t) {
                "core" !== e && (r = r.plugin(t, i[t]))
            }), e(t).data("jstree", r), r.init(t, i), r
        }, e.jstree.destroy = function () {
            e(".jstree:jstree").jstree("destroy"), e(l).off(".jstree")
        }, e.jstree.core = function (e) {
            this._id = e, this._cnt = 0, this._wrk = null, this._data = {
                core: {
                    themes: {name: !1, dots: !1, icons: !1},
                    selected: [],
                    last_error: {},
                    working: !1,
                    worker_queue: [],
                    focused: null
                }
            }
        }, e.jstree.reference = function (t) {
            var i = null, r = null;
            if (!t || !t.id || t.tagName && t.nodeType || (t = t.id), !r || !r.length)try {
                r = e(t)
            } catch (s) {
            }
            if (!r || !r.length)try {
                r = e("#" + t.replace(e.jstree.idregex, "\\$&"))
            } catch (s) {
            }
            return r && r.length && (r = r.closest(".jstree")).length && (r = r.data("jstree")) ? i = r : e(".jstree").each(function () {
                var r = e(this).data("jstree");
                return r && r._model.data[t] ? (i = r, !1) : void 0
            }), i
        }, e.fn.jstree = function (i) {
            var r = "string" == typeof i, s = Array.prototype.slice.call(arguments, 1), n = null;
            return i !== !0 || this.length ? (this.each(function () {
                var a = e.jstree.reference(this), o = r && a ? a[i] : null;
                return n = r && o ? o.apply(a, s) : null, a || r || i !== t && !e.isPlainObject(i) || e.jstree.create(this, i), (a && !r || i === !0) && (n = a || !1), null !== n && n !== t ? !1 : void 0
            }), null !== n && n !== t ? n : this) : !1
        }, e.expr[":"].jstree = e.expr.createPseudo(function (i) {
            return function (i) {
                return e(i).hasClass("jstree") && e(i).data("jstree") !== t
            }
        }), e.jstree.defaults.core = {
            data: !1,
            strings: !1,
            check_callback: !1,
            error: e.noop,
            animation: 200,
            multiple: !0,
            themes: {name: !1, url: !1, dir: !1, dots: !0, icons: !0, stripes: !1, variant: !1, responsive: !1},
            expand_selected_onload: !0,
            worker: !0,
            force_text: !1,
            dblclick_toggle: !0
        }, e.jstree.core.prototype = {
            plugin: function (t, i) {
                var r = e.jstree.plugins[t];
                return r ? (this._data[t] = {}, r.prototype = this, new r(i, this)) : this
            }, init: function (t, i) {
                this._model = {
                    data: {},
                    changed: [],
                    force_full_redraw: !1,
                    redraw_timeout: !1,
                    default_state: {loaded: !0, opened: !1, selected: !1, disabled: !1}
                }, this._model.data[e.jstree.root] = {
                    id: e.jstree.root,
                    parent: null,
                    parents: [],
                    children: [],
                    children_d: [],
                    state: {loaded: !1}
                }, this.element = e(t).addClass("jstree jstree-" + this._id), this.settings = i, this._data.core.ready = !1, this._data.core.loaded = !1, this._data.core.rtl = "rtl" === this.element.css("direction"), this.element[this._data.core.rtl ? "addClass" : "removeClass"]("jstree-rtl"), this.element.attr("role", "tree"), this.settings.core.multiple && this.element.attr("aria-multiselectable", !0), this.element.attr("tabindex") || this.element.attr("tabindex", "0"), this.bind(), this.trigger("init"), this._data.core.original_container_html = this.element.find(" > ul > li").clone(!0), this._data.core.original_container_html.find("li").addBack().contents().filter(function () {
                    return 3 === this.nodeType && (!this.nodeValue || /^\s+$/.test(this.nodeValue))
                }).remove(), this.element.html("<ul class='jstree-container-ul jstree-children' role='group'><li id='j" + this._id + "_loading' class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='tree-item'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>"), this.element.attr("aria-activedescendant", "j" + this._id + "_loading"), this._data.core.li_height = this.get_container_ul().children("li").first().height() || 24, this.trigger("loading"), this.load_node(e.jstree.root)
            }, destroy: function (e) {
                if (this._wrk)try {
                    window.URL.revokeObjectURL(this._wrk), this._wrk = null
                } catch (t) {
                }
                e || this.element.empty(), this.teardown()
            }, teardown: function () {
                this.unbind(), this.element.removeClass("jstree").removeData("jstree").find("[class^='jstree']").addBack().attr("class", function () {
                    return this.className.replace(/jstree[^ ]*|$/gi, "")
                }), this.element = null
            }, bind: function () {
                var t = "", i = null, r = 0;
                this.element.on("dblclick.jstree", function (e) {
                    if (e.target.tagName && "input" === e.target.tagName.toLowerCase())return !0;
                    if (l.selection && l.selection.empty)l.selection.empty(); else if (window.getSelection) {
                        var t = window.getSelection();
                        try {
                            t.removeAllRanges(), t.collapse()
                        } catch (i) {
                        }
                    }
                }).on("mousedown.jstree", e.proxy(function (e) {
                    e.target === this.element[0] && (e.preventDefault(), r = +new Date)
                }, this)).on("mousedown.jstree", ".jstree-ocl", function (e) {
                    e.preventDefault()
                }).on("click.jstree", ".jstree-ocl", e.proxy(function (e) {
                    this.toggle_node(e.target)
                }, this)).on("dblclick.jstree", ".jstree-anchor", e.proxy(function (e) {
                    return e.target.tagName && "input" === e.target.tagName.toLowerCase() ? !0 : void(this.settings.core.dblclick_toggle && this.toggle_node(e.target))
                }, this)).on("click.jstree", ".jstree-anchor", e.proxy(function (t) {
                    t.preventDefault(), t.currentTarget !== l.activeElement && e(t.currentTarget).focus(), this.activate_node(t.currentTarget, t)
                }, this)).on("keydown.jstree", ".jstree-anchor", e.proxy(function (t) {
                    if (t.target.tagName && "input" === t.target.tagName.toLowerCase())return !0;
                    if (32 !== t.which && 13 !== t.which && (t.shiftKey || t.ctrlKey || t.altKey || t.metaKey))return !0;
                    var i = null;
                    switch (this._data.core.rtl && (37 === t.which ? t.which = 39 : 39 === t.which && (t.which = 37)), t.which) {
                        case 32:
                            t.ctrlKey && (t.type = "click", e(t.currentTarget).trigger(t));
                            break;
                        case 13:
                            t.type = "click", e(t.currentTarget).trigger(t);
                            break;
                        case 37:
                            t.preventDefault(), this.is_open(t.currentTarget) ? this.close_node(t.currentTarget) : (i = this.get_parent(t.currentTarget), i && i.id !== e.jstree.root && this.get_node(i, !0).children(".jstree-anchor").focus());
                            break;
                        case 38:
                            t.preventDefault(), i = this.get_prev_dom(t.currentTarget), i && i.length && i.children(".jstree-anchor").focus();
                            break;
                        case 39:
                            t.preventDefault(), this.is_closed(t.currentTarget) ? this.open_node(t.currentTarget, function (e) {
                                this.get_node(e, !0).children(".jstree-anchor").focus()
                            }) : this.is_open(t.currentTarget) && (i = this.get_node(t.currentTarget, !0).children(".jstree-children")[0], i && e(this._firstChild(i)).children(".jstree-anchor").focus());
                            break;
                        case 40:
                            t.preventDefault(), i = this.get_next_dom(t.currentTarget), i && i.length && i.children(".jstree-anchor").focus();
                            break;
                        case 106:
                            this.open_all();
                            break;
                        case 36:
                            t.preventDefault(), i = this._firstChild(this.get_container_ul()[0]), i && e(i).children(".jstree-anchor").filter(":visible").focus();
                            break;
                        case 35:
                            t.preventDefault(), this.element.find(".jstree-anchor").filter(":visible").last().focus()
                    }
                }, this)).on("load_node.jstree", e.proxy(function (t, i) {
                    i.status && (i.node.id !== e.jstree.root || this._data.core.loaded || (this._data.core.loaded = !0, this._firstChild(this.get_container_ul()[0]) && this.element.attr("aria-activedescendant", this._firstChild(this.get_container_ul()[0]).id), this.trigger("loaded")), this._data.core.ready || setTimeout(e.proxy(function () {
                        if (this.element && !this.get_container_ul().find(".jstree-loading").length) {
                            if (this._data.core.ready = !0, this._data.core.selected.length) {
                                if (this.settings.core.expand_selected_onload) {
                                    var t, i, r = [];
                                    for (t = 0, i = this._data.core.selected.length; i > t; t++)r = r.concat(this._model.data[this._data.core.selected[t]].parents);
                                    for (r = e.vakata.array_unique(r), t = 0, i = r.length; i > t; t++)this.open_node(r[t], !1, 0)
                                }
                                this.trigger("changed", {action: "ready", selected: this._data.core.selected})
                            }
                            this.trigger("ready")
                        }
                    }, this), 0))
                }, this)).on("keypress.jstree", e.proxy(function (r) {
                    if (r.target.tagName && "input" === r.target.tagName.toLowerCase())return !0;
                    i && clearTimeout(i), i = setTimeout(function () {
                        t = ""
                    }, 500);
                    var s = String.fromCharCode(r.which).toLowerCase(), n = this.element.find(".jstree-anchor").filter(":visible"), a = n.index(l.activeElement) || 0, o = !1;
                    if (t += s, t.length > 1) {
                        if (n.slice(a).each(e.proxy(function (i, r) {
                                return 0 === e(r).text().toLowerCase().indexOf(t) ? (e(r).focus(), o = !0, !1) : void 0
                            }, this)), o)return;
                        if (n.slice(0, a).each(e.proxy(function (i, r) {
                                return 0 === e(r).text().toLowerCase().indexOf(t) ? (e(r).focus(), o = !0, !1) : void 0
                            }, this)), o)return
                    }
                    if (new RegExp("^" + s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "+$").test(t)) {
                        if (n.slice(a + 1).each(e.proxy(function (t, i) {
                                return e(i).text().toLowerCase().charAt(0) === s ? (e(i).focus(), o = !0, !1) : void 0
                            }, this)), o)return;
                        if (n.slice(0, a + 1).each(e.proxy(function (t, i) {
                                return e(i).text().toLowerCase().charAt(0) === s ? (e(i).focus(), o = !0, !1) : void 0
                            }, this)), o)return
                    }
                }, this)).on("init.jstree", e.proxy(function () {
                    var e = this.settings.core.themes;
                    this._data.core.themes.dots = e.dots, this._data.core.themes.stripes = e.stripes, this._data.core.themes.icons = e.icons, this.set_theme(e.name || "default", e.url), this.set_theme_variant(e.variant)
                }, this)).on("loading.jstree", e.proxy(function () {
                    this[this._data.core.themes.dots ? "show_dots" : "hide_dots"](), this[this._data.core.themes.icons ? "show_icons" : "hide_icons"](), this[this._data.core.themes.stripes ? "show_stripes" : "hide_stripes"]()
                }, this)).on("blur.jstree", ".jstree-anchor", e.proxy(function (t) {
                    this._data.core.focused = null, e(t.currentTarget).filter(".jstree-hovered").mouseleave(), this.element.attr("tabindex", "0")
                }, this)).on("focus.jstree", ".jstree-anchor", e.proxy(function (t) {
                    var i = this.get_node(t.currentTarget);
                    i && i.id && (this._data.core.focused = i.id), this.element.find(".jstree-hovered").not(t.currentTarget).mouseleave(), e(t.currentTarget).mouseenter(), this.element.attr("tabindex", "-1")
                }, this)).on("focus.jstree", e.proxy(function () {
                    if (+new Date - r > 500 && !this._data.core.focused) {
                        r = 0;
                        var e = this.get_node(this.element.attr("aria-activedescendant"), !0);
                        e && e.find("> .jstree-anchor").focus()
                    }
                }, this)).on("mouseenter.jstree", ".jstree-anchor", e.proxy(function (e) {
                    this.hover_node(e.currentTarget)
                }, this)).on("mouseleave.jstree", ".jstree-anchor", e.proxy(function (e) {
                    this.dehover_node(e.currentTarget)
                }, this))
            }, unbind: function () {
                this.element.off(".jstree"), e(l).off(".jstree-" + this._id)
            }, trigger: function (e, t) {
                t || (t = {}), t.instance = this, this.element.triggerHandler(e.replace(".jstree", "") + ".jstree", t)
            }, get_container: function () {
                return this.element
            }, get_container_ul: function () {
                return this.element.children(".jstree-children").first()
            }, get_string: function (t) {
                var i = this.settings.core.strings;
                return e.isFunction(i) ? i.call(this, t) : i && i[t] ? i[t] : t
            }, _firstChild: function (e) {
                for (e = e ? e.firstChild : null; null !== e && 1 !== e.nodeType;)e = e.nextSibling;
                return e
            }, _nextSibling: function (e) {
                for (e = e ? e.nextSibling : null; null !== e && 1 !== e.nodeType;)e = e.nextSibling;
                return e
            }, _previousSibling: function (e) {
                for (e = e ? e.previousSibling : null; null !== e && 1 !== e.nodeType;)e = e.previousSibling;
                return e
            }, get_node: function (t, i) {
                t && t.id && (t = t.id);
                var r;
                try {
                    if (this._model.data[t])t = this._model.data[t]; else if ("string" == typeof t && this._model.data[t.replace(/^#/, "")])t = this._model.data[t.replace(/^#/, "")]; else if ("string" == typeof t && (r = e("#" + t.replace(e.jstree.idregex, "\\$&"), this.element)).length && this._model.data[r.closest(".jstree-node").attr("id")])t = this._model.data[r.closest(".jstree-node").attr("id")]; else if ((r = e(t, this.element)).length && this._model.data[r.closest(".jstree-node").attr("id")])t = this._model.data[r.closest(".jstree-node").attr("id")]; else {
                        if (!(r = e(t, this.element)).length || !r.hasClass("jstree"))return !1;
                        t = this._model.data[e.jstree.root]
                    }
                    return i && (t = t.id === e.jstree.root ? this.element : e("#" + t.id.replace(e.jstree.idregex, "\\$&"), this.element)), t
                } catch (s) {
                    return !1
                }
            }, get_path: function (t, i, r) {
                if (t = t.parents ? t : this.get_node(t), !t || t.id === e.jstree.root || !t.parents)return !1;
                var s, n, a = [];
                for (a.push(r ? t.id : t.text), s = 0, n = t.parents.length; n > s; s++)a.push(r ? t.parents[s] : this.get_text(t.parents[s]));
                return a = a.reverse().slice(1), i ? a.join(i) : a
            }, get_next_dom: function (t, i) {
                var r;
                if (t = this.get_node(t, !0), t[0] === this.element[0]) {
                    for (r = this._firstChild(this.get_container_ul()[0]); r && 0 === r.offsetHeight;)r = this._nextSibling(r);
                    return r ? e(r) : !1
                }
                if (!t || !t.length)return !1;
                if (i) {
                    r = t[0];
                    do r = this._nextSibling(r); while (r && 0 === r.offsetHeight);
                    return r ? e(r) : !1
                }
                if (t.hasClass("jstree-open")) {
                    for (r = this._firstChild(t.children(".jstree-children")[0]); r && 0 === r.offsetHeight;)r = this._nextSibling(r);
                    if (null !== r)return e(r)
                }
                r = t[0];
                do r = this._nextSibling(r); while (r && 0 === r.offsetHeight);
                return null !== r ? e(r) : t.parentsUntil(".jstree", ".jstree-node").nextAll(".jstree-node:visible").first()
            }, get_prev_dom: function (t, i) {
                var r;
                if (t = this.get_node(t, !0), t[0] === this.element[0]) {
                    for (r = this.get_container_ul()[0].lastChild; r && 0 === r.offsetHeight;)r = this._previousSibling(r);
                    return r ? e(r) : !1
                }
                if (!t || !t.length)return !1;
                if (i) {
                    r = t[0];
                    do r = this._previousSibling(r); while (r && 0 === r.offsetHeight);
                    return r ? e(r) : !1
                }
                r = t[0];
                do r = this._previousSibling(r); while (r && 0 === r.offsetHeight);
                if (null !== r) {
                    for (t = e(r); t.hasClass("jstree-open");)t = t.children(".jstree-children").first().children(".jstree-node:visible:last");
                    return t
                }
                return r = t[0].parentNode.parentNode, r && r.className && -1 !== r.className.indexOf("jstree-node") ? e(r) : !1
            }, get_parent: function (t) {
                return t = this.get_node(t), t && t.id !== e.jstree.root ? t.parent : !1
            }, get_children_dom: function (e) {
                return e = this.get_node(e, !0), e[0] === this.element[0] ? this.get_container_ul().children(".jstree-node") : e && e.length ? e.children(".jstree-children").children(".jstree-node") : !1
            }, is_parent: function (e) {
                return e = this.get_node(e), e && (e.state.loaded === !1 || e.children.length > 0)
            }, is_loaded: function (e) {
                return e = this.get_node(e), e && e.state.loaded
            }, is_loading: function (e) {
                return e = this.get_node(e), e && e.state && e.state.loading
            }, is_open: function (e) {
                return e = this.get_node(e), e && e.state.opened
            }, is_closed: function (e) {
                return e = this.get_node(e), e && this.is_parent(e) && !e.state.opened
            }, is_leaf: function (e) {
                return !this.is_parent(e)
            }, load_node: function (t, i) {
                var r, s, n, a, o;
                if (e.isArray(t))return this._load_nodes(t.slice(), i), !0;
                if (t = this.get_node(t), !t)return i && i.call(this, t, !1), !1;
                if (t.state.loaded) {
                    for (t.state.loaded = !1, r = 0, s = t.children_d.length; s > r; r++) {
                        for (n = 0, a = t.parents.length; a > n; n++)this._model.data[t.parents[n]].children_d = e.vakata.array_remove_item(this._model.data[t.parents[n]].children_d, t.children_d[r]);
                        this._model.data[t.children_d[r]].state.selected && (o = !0, this._data.core.selected = e.vakata.array_remove_item(this._data.core.selected, t.children_d[r])), delete this._model.data[t.children_d[r]]
                    }
                    t.children = [], t.children_d = [], o && this.trigger("changed", {
                        action: "load_node",
                        node: t,
                        selected: this._data.core.selected
                    })
                }
                return t.state.failed = !1, t.state.loading = !0, this.get_node(t, !0).addClass("jstree-loading").attr("aria-busy", !0), this._load_node(t, e.proxy(function (e) {
                    t = this._model.data[t.id], t.state.loading = !1, t.state.loaded = e, t.state.failed = !t.state.loaded;
                    var r = this.get_node(t, !0), s = 0, n = 0, a = this._model.data, o = !1;
                    for (s = 0, n = t.children.length; n > s; s++)if (a[t.children[s]] && !a[t.children[s]].state.hidden) {
                        o = !0;
                        break
                    }
                    t.state.loaded && !o && r && r.length && !r.hasClass("jstree-leaf") && r.removeClass("jstree-closed jstree-open").addClass("jstree-leaf"), r.removeClass("jstree-loading").attr("aria-busy", !1), this.trigger("load_node", {
                        node: t,
                        status: e
                    }), i && i.call(this, t, e)
                }, this)), !0
            }, _load_nodes: function (e, t, i) {
                var r, s, n = !0, a = function () {
                    this._load_nodes(e, t, !0)
                }, o = this._model.data, d = [];
                for (r = 0, s = e.length; s > r; r++)!o[e[r]] || (o[e[r]].state.loaded || o[e[r]].state.failed) && i || (this.is_loading(e[r]) || this.load_node(e[r], a), n = !1);
                if (n) {
                    for (r = 0, s = e.length; s > r; r++)o[e[r]] && o[e[r]].state.loaded && d.push(e[r]);
                    t && !t.done && (t.call(this, d), t.done = !0)
                }
            }, load_all: function (t, i) {
                if (t || (t = e.jstree.root), t = this.get_node(t), !t)return !1;
                var r, s, n = [], a = this._model.data, o = a[t.id].children_d;
                for (t.state && !t.state.loaded && n.push(t.id), r = 0, s = o.length; s > r; r++)a[o[r]] && a[o[r]].state && !a[o[r]].state.loaded && n.push(o[r]);
                n.length ? this._load_nodes(n, function () {
                    this.load_all(t, i)
                }) : (i && i.call(this, t), this.trigger("load_all", {node: t}))
            }, _load_node: function (t, i) {
                var r, s = this.settings.core.data;
                return s ? e.isFunction(s) ? s.call(this, t, e.proxy(function (r) {
                    r === !1 && i.call(this, !1), this["string" == typeof r ? "_append_html_data" : "_append_json_data"](t, "string" == typeof r ? e(e.parseHTML(r)).filter(function () {
                        return 3 !== this.nodeType
                    }) : r, function (e) {
                        i.call(this, e)
                    })
                }, this)) : "object" == typeof s ? s.url ? (s = e.extend(!0, {}, s), e.isFunction(s.url) && (s.url = s.url.call(this, t)), e.isFunction(s.data) && (s.data = s.data.call(this, t)), e.ajax(s).done(e.proxy(function (r, s, n) {
                    var a = n.getResponseHeader("Content-Type");
                    return a && -1 !== a.indexOf("json") || "object" == typeof r ? this._append_json_data(t, r, function (e) {
                        i.call(this, e)
                    }) : a && -1 !== a.indexOf("html") || "string" == typeof r ? this._append_html_data(t, e(e.parseHTML(r)).filter(function () {
                        return 3 !== this.nodeType
                    }), function (e) {
                        i.call(this, e)
                    }) : (this._data.core.last_error = {
                        error: "ajax",
                        plugin: "core",
                        id: "core_04",
                        reason: "Could not load node",
                        data: JSON.stringify({id: t.id, xhr: n})
                    }, this.settings.core.error.call(this, this._data.core.last_error), i.call(this, !1))
                }, this)).fail(e.proxy(function (e) {
                    i.call(this, !1), this._data.core.last_error = {
                        error: "ajax",
                        plugin: "core",
                        id: "core_04",
                        reason: "Could not load node",
                        data: JSON.stringify({id: t.id, xhr: e})
                    }, this.settings.core.error.call(this, this._data.core.last_error)
                }, this))) : (r = e.isArray(s) || e.isPlainObject(s) ? JSON.parse(JSON.stringify(s)) : s, t.id === e.jstree.root ? this._append_json_data(t, r, function (e) {
                    i.call(this, e)
                }) : (this._data.core.last_error = {
                    error: "nodata",
                    plugin: "core",
                    id: "core_05",
                    reason: "Could not load node",
                    data: JSON.stringify({id: t.id})
                }, this.settings.core.error.call(this, this._data.core.last_error), i.call(this, !1))) : "string" == typeof s ? t.id === e.jstree.root ? this._append_html_data(t, e(e.parseHTML(s)).filter(function () {
                    return 3 !== this.nodeType
                }), function (e) {
                    i.call(this, e)
                }) : (this._data.core.last_error = {
                    error: "nodata",
                    plugin: "core",
                    id: "core_06",
                    reason: "Could not load node",
                    data: JSON.stringify({id: t.id})
                }, this.settings.core.error.call(this, this._data.core.last_error), i.call(this, !1)) : i.call(this, !1) : t.id === e.jstree.root ? this._append_html_data(t, this._data.core.original_container_html.clone(!0), function (e) {
                    i.call(this, e)
                }) : i.call(this, !1)
            }, _node_changed: function (e) {
                e = this.get_node(e), e && this._model.changed.push(e.id)
            }, _append_html_data: function (t, i, r) {
                t = this.get_node(t), t.children = [], t.children_d = [];
                var s, n, a, o = i.is("ul") ? i.children() : i, d = t.id, c = [], l = [], h = this._model.data, _ = h[d], u = this._data.core.selected.length;
                for (o.each(e.proxy(function (t, i) {
                    s = this._parse_model_from_html(e(i), d, _.parents.concat()), s && (c.push(s), l.push(s), h[s].children_d.length && (l = l.concat(h[s].children_d)))
                }, this)), _.children = c, _.children_d = l, n = 0, a = _.parents.length; a > n; n++)h[_.parents[n]].children_d = h[_.parents[n]].children_d.concat(l);
                this.trigger("model", {
                    nodes: l,
                    parent: d
                }), d !== e.jstree.root ? (this._node_changed(d), this.redraw()) : (this.get_container_ul().children(".jstree-initial-node").remove(), this.redraw(!0)), this._data.core.selected.length !== u && this.trigger("changed", {
                    action: "model",
                    selected: this._data.core.selected
                }), r.call(this, !0)
            }, _append_json_data: function (t, i, r, s) {
                if (null !== this.element) {
                    t = this.get_node(t), t.children = [], t.children_d = [], i.d && (i = i.d, "string" == typeof i && (i = JSON.parse(i))), e.isArray(i) || (i = [i]);
                    var n = null, a = {
                        df: this._model.default_state,
                        dat: i,
                        par: t.id,
                        m: this._model.data,
                        t_id: this._id,
                        t_cnt: this._cnt,
                        sel: this._data.core.selected
                    }, o = function (e, t) {
                        e.data && (e = e.data);
                        var i, r, s, n, a = e.dat, o = e.par, d = [], c = [], l = [], h = e.df, _ = e.t_id, u = e.t_cnt, g = e.m, f = g[o], p = e.sel, m = function (e, i, r) {
                            r = r ? r.concat() : [], i && r.unshift(i);
                            var s, n, a, o, d = e.id.toString(), c = {
                                id: d,
                                text: e.text || "",
                                icon: e.icon !== t ? e.icon : !0,
                                parent: i,
                                parents: r,
                                children: e.children || [],
                                children_d: e.children_d || [],
                                data: e.data,
                                state: {},
                                li_attr: {id: !1},
                                a_attr: {href: "#"},
                                original: !1
                            };
                            for (s in h)h.hasOwnProperty(s) && (c.state[s] = h[s]);
                            if (e && e.data && e.data.jstree && e.data.jstree.icon && (c.icon = e.data.jstree.icon), (c.icon === t || null === c.icon || "" === c.icon) && (c.icon = !0), e && e.data && (c.data = e.data, e.data.jstree))for (s in e.data.jstree)e.data.jstree.hasOwnProperty(s) && (c.state[s] = e.data.jstree[s]);
                            if (e && "object" == typeof e.state)for (s in e.state)e.state.hasOwnProperty(s) && (c.state[s] = e.state[s]);
                            if (e && "object" == typeof e.li_attr)for (s in e.li_attr)e.li_attr.hasOwnProperty(s) && (c.li_attr[s] = e.li_attr[s]);
                            if (c.li_attr.id || (c.li_attr.id = d), e && "object" == typeof e.a_attr)for (s in e.a_attr)e.a_attr.hasOwnProperty(s) && (c.a_attr[s] = e.a_attr[s]);
                            for (e && e.children && e.children === !0 && (c.state.loaded = !1, c.children = [], c.children_d = []), g[c.id] = c, s = 0, n = c.children.length; n > s; s++)a = m(g[c.children[s]], c.id, r), o = g[a], c.children_d.push(a), o.children_d.length && (c.children_d = c.children_d.concat(o.children_d));
                            return delete e.data, delete e.children, g[c.id].original = e, c.state.selected && l.push(c.id), c.id
                        }, v = function (e, i, r) {
                            r = r ? r.concat() : [], i && r.unshift(i);
                            var s, n, a, o, d, c = !1;
                            do c = "j" + _ + "_" + ++u; while (g[c]);
                            d = {
                                id: !1,
                                text: "string" == typeof e ? e : "",
                                icon: "object" == typeof e && e.icon !== t ? e.icon : !0,
                                parent: i,
                                parents: r,
                                children: [],
                                children_d: [],
                                data: null,
                                state: {},
                                li_attr: {id: !1},
                                a_attr: {href: "#"},
                                original: !1
                            };
                            for (s in h)h.hasOwnProperty(s) && (d.state[s] = h[s]);
                            if (e && e.id && (d.id = e.id.toString()), e && e.text && (d.text = e.text), e && e.data && e.data.jstree && e.data.jstree.icon && (d.icon = e.data.jstree.icon), (d.icon === t || null === d.icon || "" === d.icon) && (d.icon = !0), e && e.data && (d.data = e.data, e.data.jstree))for (s in e.data.jstree)e.data.jstree.hasOwnProperty(s) && (d.state[s] = e.data.jstree[s]);
                            if (e && "object" == typeof e.state)for (s in e.state)e.state.hasOwnProperty(s) && (d.state[s] = e.state[s]);
                            if (e && "object" == typeof e.li_attr)for (s in e.li_attr)e.li_attr.hasOwnProperty(s) && (d.li_attr[s] = e.li_attr[s]);
                            if (d.li_attr.id && !d.id && (d.id = d.li_attr.id.toString()), d.id || (d.id = c), d.li_attr.id || (d.li_attr.id = d.id), e && "object" == typeof e.a_attr)for (s in e.a_attr)e.a_attr.hasOwnProperty(s) && (d.a_attr[s] = e.a_attr[s]);
                            if (e && e.children && e.children.length) {
                                for (s = 0, n = e.children.length; n > s; s++)a = v(e.children[s], d.id, r), o = g[a], d.children.push(a), o.children_d.length && (d.children_d = d.children_d.concat(o.children_d));
                                d.children_d = d.children_d.concat(d.children)
                            }
                            return e && e.children && e.children === !0 && (d.state.loaded = !1, d.children = [], d.children_d = []), delete e.data, delete e.children, d.original = e, g[d.id] = d, d.state.selected && l.push(d.id), d.id
                        };
                        if (a.length && a[0].id !== t && a[0].parent !== t) {
                            for (r = 0, s = a.length; s > r; r++)a[r].children || (a[r].children = []), g[a[r].id.toString()] = a[r];
                            for (r = 0, s = a.length; s > r; r++)g[a[r].parent.toString()].children.push(a[r].id.toString()), f.children_d.push(a[r].id.toString());
                            for (r = 0, s = f.children.length; s > r; r++)i = m(g[f.children[r]], o, f.parents.concat()), c.push(i), g[i].children_d.length && (c = c.concat(g[i].children_d));
                            for (r = 0, s = f.parents.length; s > r; r++)g[f.parents[r]].children_d = g[f.parents[r]].children_d.concat(c);
                            n = {cnt: u, mod: g, sel: p, par: o, dpc: c, add: l}
                        } else {
                            for (r = 0, s = a.length; s > r; r++)i = v(a[r], o, f.parents.concat()), i && (d.push(i), c.push(i), g[i].children_d.length && (c = c.concat(g[i].children_d)));
                            for (f.children = d, f.children_d = c, r = 0, s = f.parents.length; s > r; r++)g[f.parents[r]].children_d = g[f.parents[r]].children_d.concat(c);
                            n = {cnt: u, mod: g, sel: p, par: o, dpc: c, add: l}
                        }
                        return "undefined" != typeof window && "undefined" != typeof window.document ? n : void postMessage(n)
                    }, d = function (t, i) {
                        if (null !== this.element) {
                            if (this._cnt = t.cnt, this._model.data = t.mod, i) {
                                var s, n, a = t.add, o = t.sel, d = this._data.core.selected.slice(), c = this._model.data;
                                if (o.length !== d.length || e.vakata.array_unique(o.concat(d)).length !== o.length) {
                                    for (s = 0, n = o.length; n > s; s++)-1 === e.inArray(o[s], a) && -1 === e.inArray(o[s], d) && (c[o[s]].state.selected = !1);
                                    for (s = 0, n = d.length; n > s; s++)-1 === e.inArray(d[s], o) && (c[d[s]].state.selected = !0)
                                }
                            }
                            t.add.length && (this._data.core.selected = this._data.core.selected.concat(t.add)), this.trigger("model", {
                                nodes: t.dpc,
                                parent: t.par
                            }), t.par !== e.jstree.root ? (this._node_changed(t.par), this.redraw()) : this.redraw(!0), t.add.length && this.trigger("changed", {
                                action: "model",
                                selected: this._data.core.selected
                            }), r.call(this, !0)
                        }
                    };
                    if (this.settings.core.worker && window.Blob && window.URL && window.Worker)try {
                        null === this._wrk && (this._wrk = window.URL.createObjectURL(new window.Blob(["self.onmessage = " + o.toString()], {type: "text/javascript"}))), !this._data.core.working || s ? (this._data.core.working = !0, n = new window.Worker(this._wrk), n.onmessage = e.proxy(function (e) {
                            d.call(this, e.data, !0);
                            try {
                                n.terminate(), n = null
                            } catch (t) {
                            }
                            this._data.core.worker_queue.length ? this._append_json_data.apply(this, this._data.core.worker_queue.shift()) : this._data.core.working = !1
                        }, this), a.par ? n.postMessage(a) : this._data.core.worker_queue.length ? this._append_json_data.apply(this, this._data.core.worker_queue.shift()) : this._data.core.working = !1) : this._data.core.worker_queue.push([t, i, r, !0])
                    } catch (c) {
                        d.call(this, o(a), !1), this._data.core.worker_queue.length ? this._append_json_data.apply(this, this._data.core.worker_queue.shift()) : this._data.core.working = !1
                    } else d.call(this, o(a), !1)
                }
            }, _parse_model_from_html: function (i, r, s) {
                s = s ? [].concat(s) : [], r && s.unshift(r);
                var n, a, o, d, c, l = this._model.data, h = {
                    id: !1,
                    text: !1,
                    icon: !0,
                    parent: r,
                    parents: s,
                    children: [],
                    children_d: [],
                    data: null,
                    state: {},
                    li_attr: {id: !1},
                    a_attr: {href: "#"},
                    original: !1
                };
                for (o in this._model.default_state)this._model.default_state.hasOwnProperty(o) && (h.state[o] = this._model.default_state[o]);
                if (d = e.vakata.attributes(i, !0), e.each(d, function (t, i) {
                        return i = e.trim(i), i.length ? (h.li_attr[t] = i, void("id" === t && (h.id = i.toString()))) : !0
                    }), d = i.children("a").first(), d.length && (d = e.vakata.attributes(d, !0), e.each(d, function (t, i) {
                        i = e.trim(i), i.length && (h.a_attr[t] = i)
                    })), d = i.children("a").first().length ? i.children("a").first().clone() : i.clone(), d.children("ins, i, ul").remove(), d = d.html(), d = e("<div />").html(d), h.text = this.settings.core.force_text ? d.text() : d.html(), d = i.data(), h.data = d ? e.extend(!0, {}, d) : null, h.state.opened = i.hasClass("jstree-open"), h.state.selected = i.children("a").hasClass("jstree-clicked"), h.state.disabled = i.children("a").hasClass("jstree-disabled"), h.data && h.data.jstree)for (o in h.data.jstree)h.data.jstree.hasOwnProperty(o) && (h.state[o] = h.data.jstree[o]);
                d = i.children("a").children(".jstree-themeicon"), d.length && (h.icon = d.hasClass("jstree-themeicon-hidden") ? !1 : d.attr("rel")), h.state.icon !== t && (h.icon = h.state.icon), (h.icon === t || null === h.icon || "" === h.icon) && (h.icon = !0), d = i.children("ul").children("li");
                do c = "j" + this._id + "_" + ++this._cnt; while (l[c]);
                return h.id = h.li_attr.id ? h.li_attr.id.toString() : c, d.length ? (d.each(e.proxy(function (t, i) {
                    n = this._parse_model_from_html(e(i), h.id, s), a = this._model.data[n], h.children.push(n), a.children_d.length && (h.children_d = h.children_d.concat(a.children_d))
                }, this)), h.children_d = h.children_d.concat(h.children)) : i.hasClass("jstree-closed") && (h.state.loaded = !1), h.li_attr["class"] && (h.li_attr["class"] = h.li_attr["class"].replace("jstree-closed", "").replace("jstree-open", "")), h.a_attr["class"] && (h.a_attr["class"] = h.a_attr["class"].replace("jstree-clicked", "").replace("jstree-disabled", "")), l[h.id] = h, h.state.selected && this._data.core.selected.push(h.id), h.id
            }, _parse_model_from_flat_json: function (e, i, r) {
                r = r ? r.concat() : [], i && r.unshift(i);
                var s, n, a, o, d = e.id.toString(), c = this._model.data, l = this._model.default_state, h = {
                    id: d,
                    text: e.text || "",
                    icon: e.icon !== t ? e.icon : !0,
                    parent: i,
                    parents: r,
                    children: e.children || [],
                    children_d: e.children_d || [],
                    data: e.data,
                    state: {},
                    li_attr: {id: !1},
                    a_attr: {href: "#"},
                    original: !1
                };
                for (s in l)l.hasOwnProperty(s) && (h.state[s] = l[s]);
                if (e && e.data && e.data.jstree && e.data.jstree.icon && (h.icon = e.data.jstree.icon), (h.icon === t || null === h.icon || "" === h.icon) && (h.icon = !0), e && e.data && (h.data = e.data, e.data.jstree))for (s in e.data.jstree)e.data.jstree.hasOwnProperty(s) && (h.state[s] = e.data.jstree[s]);
                if (e && "object" == typeof e.state)for (s in e.state)e.state.hasOwnProperty(s) && (h.state[s] = e.state[s]);
                if (e && "object" == typeof e.li_attr)for (s in e.li_attr)e.li_attr.hasOwnProperty(s) && (h.li_attr[s] = e.li_attr[s]);
                if (h.li_attr.id || (h.li_attr.id = d), e && "object" == typeof e.a_attr)for (s in e.a_attr)e.a_attr.hasOwnProperty(s) && (h.a_attr[s] = e.a_attr[s]);
                for (e && e.children && e.children === !0 && (h.state.loaded = !1, h.children = [], h.children_d = []), c[h.id] = h, s = 0, n = h.children.length; n > s; s++)a = this._parse_model_from_flat_json(c[h.children[s]], h.id, r), o = c[a], h.children_d.push(a), o.children_d.length && (h.children_d = h.children_d.concat(o.children_d));
                return delete e.data, delete e.children, c[h.id].original = e, h.state.selected && this._data.core.selected.push(h.id), h.id
            }, _parse_model_from_json: function (e, i, r) {
                r = r ? r.concat() : [], i && r.unshift(i);
                var s, n, a, o, d, c = !1, l = this._model.data, h = this._model.default_state;
                do c = "j" + this._id + "_" + ++this._cnt; while (l[c]);
                d = {
                    id: !1,
                    text: "string" == typeof e ? e : "",
                    icon: "object" == typeof e && e.icon !== t ? e.icon : !0,
                    parent: i,
                    parents: r,
                    children: [],
                    children_d: [],
                    data: null,
                    state: {},
                    li_attr: {id: !1},
                    a_attr: {href: "#"},
                    original: !1
                };
                for (s in h)h.hasOwnProperty(s) && (d.state[s] = h[s]);
                if (e && e.id && (d.id = e.id.toString()), e && e.text && (d.text = e.text), e && e.data && e.data.jstree && e.data.jstree.icon && (d.icon = e.data.jstree.icon), (d.icon === t || null === d.icon || "" === d.icon) && (d.icon = !0), e && e.data && (d.data = e.data, e.data.jstree))for (s in e.data.jstree)e.data.jstree.hasOwnProperty(s) && (d.state[s] = e.data.jstree[s]);
                if (e && "object" == typeof e.state)for (s in e.state)e.state.hasOwnProperty(s) && (d.state[s] = e.state[s]);
                if (e && "object" == typeof e.li_attr)for (s in e.li_attr)e.li_attr.hasOwnProperty(s) && (d.li_attr[s] = e.li_attr[s]);
                if (d.li_attr.id && !d.id && (d.id = d.li_attr.id.toString()), d.id || (d.id = c), d.li_attr.id || (d.li_attr.id = d.id), e && "object" == typeof e.a_attr)for (s in e.a_attr)e.a_attr.hasOwnProperty(s) && (d.a_attr[s] = e.a_attr[s]);
                if (e && e.children && e.children.length) {
                    for (s = 0, n = e.children.length; n > s; s++)a = this._parse_model_from_json(e.children[s], d.id, r), o = l[a], d.children.push(a), o.children_d.length && (d.children_d = d.children_d.concat(o.children_d));
                    d.children_d = d.children_d.concat(d.children)
                }
                return e && e.children && e.children === !0 && (d.state.loaded = !1, d.children = [], d.children_d = []), delete e.data, delete e.children, d.original = e, l[d.id] = d, d.state.selected && this._data.core.selected.push(d.id), d.id
            }, _redraw: function () {
                var t, i, r, s = this._model.force_full_redraw ? this._model.data[e.jstree.root].children.concat([]) : this._model.changed.concat([]), n = l.createElement("UL"), a = this._data.core.focused;
                for (i = 0, r = s.length; r > i; i++)t = this.redraw_node(s[i], !0, this._model.force_full_redraw), t && this._model.force_full_redraw && n.appendChild(t);
                this._model.force_full_redraw && (n.className = this.get_container_ul()[0].className, n.setAttribute("role", "group"), this.element.empty().append(n)), null !== a && (t = this.get_node(a, !0), t && t.length && t.children(".jstree-anchor")[0] !== l.activeElement ? t.children(".jstree-anchor").focus() : this._data.core.focused = null), this._model.force_full_redraw = !1, this._model.changed = [], this.trigger("redraw", {nodes: s})
            }, redraw: function (e) {
                e && (this._model.force_full_redraw = !0), this._redraw()
            }, draw_children: function (t) {
                var i = this.get_node(t), r = !1, s = !1, n = !1, a = l;
                if (!i)return !1;
                if (i.id === e.jstree.root)return this.redraw(!0);
                if (t = this.get_node(t, !0), !t || !t.length)return !1;
                if (t.children(".jstree-children").remove(), t = t[0], i.children.length && i.state.loaded) {
                    for (n = a.createElement("UL"), n.setAttribute("role", "group"), n.className = "jstree-children", r = 0, s = i.children.length; s > r; r++)n.appendChild(this.redraw_node(i.children[r], !0, !0));
                    t.appendChild(n)
                }
            }, redraw_node: function (t, i, r, s) {
                var n = this.get_node(t), a = !1, o = !1, d = !1, c = !1, _ = !1, u = !1, g = "", f = l, p = this._model.data, m = !1, v = null, j = 0, y = 0, k = !1, x = !1;
                if (!n)return !1;
                if (n.id === e.jstree.root)return this.redraw(!0);
                if (i = i || 0 === n.children.length, t = l.querySelector ? this.element[0].querySelector("#" + (-1 !== "0123456789".indexOf(n.id[0]) ? "\\3" + n.id[0] + " " + n.id.substr(1).replace(e.jstree.idregex, "\\$&") : n.id.replace(e.jstree.idregex, "\\$&"))) : l.getElementById(n.id))t = e(t), r || (a = t.parent().parent()[0], a === this.element[0] && (a = null), o = t.index()), i || !n.children.length || t.children(".jstree-children").length || (i = !0),
                i || (d = t.children(".jstree-children")[0]), m = t.children(".jstree-anchor")[0] === l.activeElement, t.remove(); else if (i = !0, !r) {
                    if (a = n.parent !== e.jstree.root ? e("#" + n.parent.replace(e.jstree.idregex, "\\$&"), this.element)[0] : null, !(null === a || a && p[n.parent].state.opened))return !1;
                    o = e.inArray(n.id, null === a ? p[e.jstree.root].children : p[n.parent].children)
                }
                t = h.cloneNode(!0), g = "jstree-node ";
                for (c in n.li_attr)if (n.li_attr.hasOwnProperty(c)) {
                    if ("id" === c)continue;
                    "class" !== c ? t.setAttribute(c, n.li_attr[c]) : g += n.li_attr[c]
                }
                for (n.a_attr.id || (n.a_attr.id = n.id + "_anchor"), t.setAttribute("aria-selected", !!n.state.selected), t.setAttribute("aria-level", n.parents.length), t.setAttribute("aria-labelledby", n.a_attr.id), n.state.disabled && t.setAttribute("aria-disabled", !0), c = 0, _ = n.children.length; _ > c; c++)if (!p[n.children[c]].state.hidden) {
                    k = !0;
                    break
                }
                if (null !== n.parent && p[n.parent] && !n.state.hidden && (c = e.inArray(n.id, p[n.parent].children), x = n.id, -1 !== c))for (c++, _ = p[n.parent].children.length; _ > c && (p[p[n.parent].children[c]].state.hidden || (x = p[n.parent].children[c]), x === n.id); c++);
                n.state.hidden && (g += " jstree-hidden"), n.state.loaded && !k ? g += " jstree-leaf" : (g += n.state.opened && n.state.loaded ? " jstree-open" : " jstree-closed", t.setAttribute("aria-expanded", n.state.opened && n.state.loaded)), x === n.id && (g += " jstree-last"), t.id = n.id, t.className = g, g = (n.state.selected ? " jstree-clicked" : "") + (n.state.disabled ? " jstree-disabled" : "");
                for (_ in n.a_attr)if (n.a_attr.hasOwnProperty(_)) {
                    if ("href" === _ && "#" === n.a_attr[_])continue;
                    "class" !== _ ? t.childNodes[1].setAttribute(_, n.a_attr[_]) : g += " " + n.a_attr[_]
                }
                if (g.length && (t.childNodes[1].className = "jstree-anchor " + g), (n.icon && n.icon !== !0 || n.icon === !1) && (n.icon === !1 ? t.childNodes[1].childNodes[0].className += " jstree-themeicon-hidden" : -1 === n.icon.indexOf("/") && -1 === n.icon.indexOf(".") ? t.childNodes[1].childNodes[0].className += " " + n.icon + " jstree-themeicon-custom" : (t.childNodes[1].childNodes[0].style.backgroundImage = "url(" + n.icon + ")", t.childNodes[1].childNodes[0].style.backgroundPosition = "center center", t.childNodes[1].childNodes[0].style.backgroundSize = "auto", t.childNodes[1].childNodes[0].className += " jstree-themeicon-custom")), this.settings.core.force_text ? t.childNodes[1].appendChild(f.createTextNode(n.text)) : t.childNodes[1].innerHTML += n.text, i && n.children.length && (n.state.opened || s) && n.state.loaded) {
                    for (u = f.createElement("UL"), u.setAttribute("role", "group"), u.className = "jstree-children", c = 0, _ = n.children.length; _ > c; c++)u.appendChild(this.redraw_node(n.children[c], i, !0));
                    t.appendChild(u)
                }
                if (d && t.appendChild(d), !r) {
                    for (a || (a = this.element[0]), c = 0, _ = a.childNodes.length; _ > c; c++)if (a.childNodes[c] && a.childNodes[c].className && -1 !== a.childNodes[c].className.indexOf("jstree-children")) {
                        v = a.childNodes[c];
                        break
                    }
                    v || (v = f.createElement("UL"), v.setAttribute("role", "group"), v.className = "jstree-children", a.appendChild(v)), a = v, o < a.childNodes.length ? a.insertBefore(t, a.childNodes[o]) : a.appendChild(t), m && (j = this.element[0].scrollTop, y = this.element[0].scrollLeft, t.childNodes[1].focus(), this.element[0].scrollTop = j, this.element[0].scrollLeft = y)
                }
                return n.state.opened && !n.state.loaded && (n.state.opened = !1, setTimeout(e.proxy(function () {
                    this.open_node(n.id, !1, 0)
                }, this), 0)), t
            }, open_node: function (i, r, s) {
                var n, a, o, d;
                if (e.isArray(i)) {
                    for (i = i.slice(), n = 0, a = i.length; a > n; n++)this.open_node(i[n], r, s);
                    return !0
                }
                return i = this.get_node(i), i && i.id !== e.jstree.root ? (s = s === t ? this.settings.core.animation : s, this.is_closed(i) ? this.is_loaded(i) ? (o = this.get_node(i, !0), d = this, o.length && (s && o.children(".jstree-children").length && o.children(".jstree-children").stop(!0, !0), i.children.length && !this._firstChild(o.children(".jstree-children")[0]) && this.draw_children(i), s ? (this.trigger("before_open", {node: i}), o.children(".jstree-children").css("display", "none").end().removeClass("jstree-closed").addClass("jstree-open").attr("aria-expanded", !0).children(".jstree-children").stop(!0, !0).slideDown(s, function () {
                    this.style.display = "", d.trigger("after_open", {node: i})
                })) : (this.trigger("before_open", {node: i}), o[0].className = o[0].className.replace("jstree-closed", "jstree-open"), o[0].setAttribute("aria-expanded", !0))), i.state.opened = !0, r && r.call(this, i, !0), o.length || this.trigger("before_open", {node: i}), this.trigger("open_node", {node: i}), s && o.length || this.trigger("after_open", {node: i}), !0) : this.is_loading(i) ? setTimeout(e.proxy(function () {
                    this.open_node(i, r, s)
                }, this), 500) : void this.load_node(i, function (e, t) {
                    return t ? this.open_node(e, r, s) : r ? r.call(this, e, !1) : !1
                }) : (r && r.call(this, i, !1), !1)) : !1
            }, _open_to: function (t) {
                if (t = this.get_node(t), !t || t.id === e.jstree.root)return !1;
                var i, r, s = t.parents;
                for (i = 0, r = s.length; r > i; i += 1)i !== e.jstree.root && this.open_node(s[i], !1, 0);
                return e("#" + t.id.replace(e.jstree.idregex, "\\$&"), this.element)
            }, close_node: function (i, r) {
                var s, n, a, o;
                if (e.isArray(i)) {
                    for (i = i.slice(), s = 0, n = i.length; n > s; s++)this.close_node(i[s], r);
                    return !0
                }
                return i = this.get_node(i), i && i.id !== e.jstree.root ? this.is_closed(i) ? !1 : (r = r === t ? this.settings.core.animation : r, a = this, o = this.get_node(i, !0), o.length && (r ? o.children(".jstree-children").attr("style", "display:block !important").end().removeClass("jstree-open").addClass("jstree-closed").attr("aria-expanded", !1).children(".jstree-children").stop(!0, !0).slideUp(r, function () {
                    this.style.display = "", o.children(".jstree-children").remove(), a.trigger("after_close", {node: i})
                }) : (o[0].className = o[0].className.replace("jstree-open", "jstree-closed"), o.attr("aria-expanded", !1).children(".jstree-children").remove())), i.state.opened = !1, this.trigger("close_node", {node: i}), void(r && o.length || this.trigger("after_close", {node: i}))) : !1
            }, toggle_node: function (t) {
                var i, r;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, r = t.length; r > i; i++)this.toggle_node(t[i]);
                    return !0
                }
                return this.is_closed(t) ? this.open_node(t) : this.is_open(t) ? this.close_node(t) : void 0
            }, open_all: function (t, i, r) {
                if (t || (t = e.jstree.root), t = this.get_node(t), !t)return !1;
                var s, n, a, o = t.id === e.jstree.root ? this.get_container_ul() : this.get_node(t, !0);
                if (!o.length) {
                    for (s = 0, n = t.children_d.length; n > s; s++)this.is_closed(this._model.data[t.children_d[s]]) && (this._model.data[t.children_d[s]].state.opened = !0);
                    return this.trigger("open_all", {node: t})
                }
                r = r || o, a = this, o = this.is_closed(t) ? o.find(".jstree-closed").addBack() : o.find(".jstree-closed"), o.each(function () {
                    a.open_node(this, function (e, t) {
                        t && this.is_parent(e) && this.open_all(e, i, r)
                    }, i || 0)
                }), 0 === r.find(".jstree-closed").length && this.trigger("open_all", {node: this.get_node(r)})
            }, close_all: function (t, i) {
                if (t || (t = e.jstree.root), t = this.get_node(t), !t)return !1;
                var r, s, n = t.id === e.jstree.root ? this.get_container_ul() : this.get_node(t, !0), a = this;
                for (n.length && (n = this.is_open(t) ? n.find(".jstree-open").addBack() : n.find(".jstree-open"), e(n.get().reverse()).each(function () {
                    a.close_node(this, i || 0)
                })), r = 0, s = t.children_d.length; s > r; r++)this._model.data[t.children_d[r]].state.opened = !1;
                this.trigger("close_all", {node: t})
            }, is_disabled: function (e) {
                return e = this.get_node(e), e && e.state && e.state.disabled
            }, enable_node: function (t) {
                var i, r;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, r = t.length; r > i; i++)this.enable_node(t[i]);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (t.state.disabled = !1, this.get_node(t, !0).children(".jstree-anchor").removeClass("jstree-disabled").attr("aria-disabled", !1), void this.trigger("enable_node", {node: t})) : !1
            }, disable_node: function (t) {
                var i, r;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, r = t.length; r > i; i++)this.disable_node(t[i]);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (t.state.disabled = !0, this.get_node(t, !0).children(".jstree-anchor").addClass("jstree-disabled").attr("aria-disabled", !0), void this.trigger("disable_node", {node: t})) : !1
            }, hide_node: function (t, i) {
                var r, s;
                if (e.isArray(t)) {
                    for (t = t.slice(), r = 0, s = t.length; s > r; r++)this.hide_node(t[r], !0);
                    return this.redraw(), !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? void(t.state.hidden || (t.state.hidden = !0, this._node_changed(t.parent), i || this.redraw(), this.trigger("hide_node", {node: t}))) : !1
            }, show_node: function (t, i) {
                var r, s;
                if (e.isArray(t)) {
                    for (t = t.slice(), r = 0, s = t.length; s > r; r++)this.show_node(t[r], !0);
                    return this.redraw(), !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? void(t.state.hidden && (t.state.hidden = !1, this._node_changed(t.parent), i || this.redraw(), this.trigger("show_node", {node: t}))) : !1
            }, hide_all: function (t) {
                var i, r = this._model.data, s = [];
                for (i in r)r.hasOwnProperty(i) && i !== e.jstree.root && !r[i].state.hidden && (r[i].state.hidden = !0, s.push(i));
                return this._model.force_full_redraw = !0, t || this.redraw(), this.trigger("hide_all", {nodes: s}), s
            }, show_all: function (t) {
                var i, r = this._model.data, s = [];
                for (i in r)r.hasOwnProperty(i) && i !== e.jstree.root && r[i].state.hidden && (r[i].state.hidden = !1, s.push(i));
                return this._model.force_full_redraw = !0, t || this.redraw(), this.trigger("show_all", {nodes: s}), s
            }, activate_node: function (e, i) {
                if (this.is_disabled(e))return !1;
                if (i && "object" == typeof i || (i = {}), this._data.core.last_clicked = this._data.core.last_clicked && this._data.core.last_clicked.id !== t ? this.get_node(this._data.core.last_clicked.id) : null, this._data.core.last_clicked && !this._data.core.last_clicked.state.selected && (this._data.core.last_clicked = null), !this._data.core.last_clicked && this._data.core.selected.length && (this._data.core.last_clicked = this.get_node(this._data.core.selected[this._data.core.selected.length - 1])), this.settings.core.multiple && (i.metaKey || i.ctrlKey || i.shiftKey) && (!i.shiftKey || this._data.core.last_clicked && this.get_parent(e) && this.get_parent(e) === this._data.core.last_clicked.parent))if (i.shiftKey) {
                    var r, s, n = this.get_node(e).id, a = this._data.core.last_clicked.id, o = this.get_node(this._data.core.last_clicked.parent).children, d = !1;
                    for (r = 0, s = o.length; s > r; r += 1)o[r] === n && (d = !d), o[r] === a && (d = !d), this.is_disabled(o[r]) || !d && o[r] !== n && o[r] !== a ? this.deselect_node(o[r], !0, i) : this.select_node(o[r], !0, !1, i);
                    this.trigger("changed", {
                        action: "select_node",
                        node: this.get_node(e),
                        selected: this._data.core.selected,
                        event: i
                    })
                } else this.is_selected(e) ? this.deselect_node(e, !1, i) : this.select_node(e, !1, !1, i); else!this.settings.core.multiple && (i.metaKey || i.ctrlKey || i.shiftKey) && this.is_selected(e) ? this.deselect_node(e, !1, i) : (this.deselect_all(!0), this.select_node(e, !1, !1, i), this._data.core.last_clicked = this.get_node(e));
                this.trigger("activate_node", {node: this.get_node(e), event: i})
            }, hover_node: function (e) {
                if (e = this.get_node(e, !0), !e || !e.length || e.children(".jstree-hovered").length)return !1;
                var t = this.element.find(".jstree-hovered"), i = this.element;
                t && t.length && this.dehover_node(t), e.children(".jstree-anchor").addClass("jstree-hovered"), this.trigger("hover_node", {node: this.get_node(e)}), setTimeout(function () {
                    i.attr("aria-activedescendant", e[0].id)
                }, 0)
            }, dehover_node: function (e) {
                return e = this.get_node(e, !0), e && e.length && e.children(".jstree-hovered").length ? (e.children(".jstree-anchor").removeClass("jstree-hovered"), void this.trigger("dehover_node", {node: this.get_node(e)})) : !1
            }, select_node: function (t, i, r, s) {
                var n, a, o;
                if (e.isArray(t)) {
                    for (t = t.slice(), a = 0, o = t.length; o > a; a++)this.select_node(t[a], i, r, s);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (n = this.get_node(t, !0), void(t.state.selected || (t.state.selected = !0, this._data.core.selected.push(t.id), r || (n = this._open_to(t)), n && n.length && n.attr("aria-selected", !0).children(".jstree-anchor").addClass("jstree-clicked"), this.trigger("select_node", {
                    node: t,
                    selected: this._data.core.selected,
                    event: s
                }), i || this.trigger("changed", {
                    action: "select_node",
                    node: t,
                    selected: this._data.core.selected,
                    event: s
                })))) : !1
            }, deselect_node: function (t, i, r) {
                var s, n, a;
                if (e.isArray(t)) {
                    for (t = t.slice(), s = 0, n = t.length; n > s; s++)this.deselect_node(t[s], i, r);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (a = this.get_node(t, !0), void(t.state.selected && (t.state.selected = !1, this._data.core.selected = e.vakata.array_remove_item(this._data.core.selected, t.id), a.length && a.attr("aria-selected", !1).children(".jstree-anchor").removeClass("jstree-clicked"), this.trigger("deselect_node", {
                    node: t,
                    selected: this._data.core.selected,
                    event: r
                }), i || this.trigger("changed", {
                    action: "deselect_node",
                    node: t,
                    selected: this._data.core.selected,
                    event: r
                })))) : !1
            }, select_all: function (t) {
                var i, r, s = this._data.core.selected.concat([]);
                for (this._data.core.selected = this._model.data[e.jstree.root].children_d.concat(), i = 0, r = this._data.core.selected.length; r > i; i++)this._model.data[this._data.core.selected[i]] && (this._model.data[this._data.core.selected[i]].state.selected = !0);
                this.redraw(!0), this.trigger("select_all", {selected: this._data.core.selected}), t || this.trigger("changed", {
                    action: "select_all",
                    selected: this._data.core.selected,
                    old_selection: s
                })
            }, deselect_all: function (e) {
                var t, i, r = this._data.core.selected.concat([]);
                for (t = 0, i = this._data.core.selected.length; i > t; t++)this._model.data[this._data.core.selected[t]] && (this._model.data[this._data.core.selected[t]].state.selected = !1);
                this._data.core.selected = [], this.element.find(".jstree-clicked").removeClass("jstree-clicked").parent().attr("aria-selected", !1), this.trigger("deselect_all", {
                    selected: this._data.core.selected,
                    node: r
                }), e || this.trigger("changed", {
                    action: "deselect_all",
                    selected: this._data.core.selected,
                    old_selection: r
                })
            }, is_selected: function (t) {
                return t = this.get_node(t), t && t.id !== e.jstree.root ? t.state.selected : !1
            }, get_selected: function (t) {
                return t ? e.map(this._data.core.selected, e.proxy(function (e) {
                    return this.get_node(e)
                }, this)) : this._data.core.selected.slice()
            }, get_top_selected: function (t) {
                var i, r, s, n, a = this.get_selected(!0), o = {};
                for (i = 0, r = a.length; r > i; i++)o[a[i].id] = a[i];
                for (i = 0, r = a.length; r > i; i++)for (s = 0, n = a[i].children_d.length; n > s; s++)o[a[i].children_d[s]] && delete o[a[i].children_d[s]];
                a = [];
                for (i in o)o.hasOwnProperty(i) && a.push(i);
                return t ? e.map(a, e.proxy(function (e) {
                    return this.get_node(e)
                }, this)) : a
            }, get_bottom_selected: function (t) {
                var i, r, s = this.get_selected(!0), n = [];
                for (i = 0, r = s.length; r > i; i++)s[i].children.length || n.push(s[i].id);
                return t ? e.map(n, e.proxy(function (e) {
                    return this.get_node(e)
                }, this)) : n
            }, get_state: function () {
                var t, i = {
                    core: {
                        open: [],
                        scroll: {left: this.element.scrollLeft(), top: this.element.scrollTop()},
                        selected: []
                    }
                };
                for (t in this._model.data)this._model.data.hasOwnProperty(t) && t !== e.jstree.root && (this._model.data[t].state.opened && i.core.open.push(t), this._model.data[t].state.selected && i.core.selected.push(t));
                return i
            }, set_state: function (i, r) {
                if (i) {
                    if (i.core) {
                        var s, n;
                        if (i.core.open)return e.isArray(i.core.open) && i.core.open.length ? this._load_nodes(i.core.open, function (e) {
                            this.open_node(e, !1, 0), delete i.core.open, this.set_state(i, r)
                        }, !0) : (delete i.core.open, this.set_state(i, r)), !1;
                        if (i.core.scroll)return i.core.scroll && i.core.scroll.left !== t && this.element.scrollLeft(i.core.scroll.left), i.core.scroll && i.core.scroll.top !== t && this.element.scrollTop(i.core.scroll.top), delete i.core.scroll, this.set_state(i, r), !1;
                        if (i.core.selected)return s = this, this.deselect_all(), e.each(i.core.selected, function (e, t) {
                            s.select_node(t, !1, !0)
                        }), delete i.core.selected, this.set_state(i, r), !1;
                        for (n in i)i.hasOwnProperty(n) && "core" !== n && -1 === e.inArray(n, this.settings.plugins) && delete i[n];
                        if (e.isEmptyObject(i.core))return delete i.core, this.set_state(i, r), !1
                    }
                    return e.isEmptyObject(i) ? (i = null, r && r.call(this), this.trigger("set_state"), !1) : !0
                }
                return !1
            }, refresh: function (t, i) {
                this._data.core.state = i === !0 ? {} : this.get_state(), i && e.isFunction(i) && (this._data.core.state = i.call(this, this._data.core.state)), this._cnt = 0, this._model.data = {}, this._model.data[e.jstree.root] = {
                    id: e.jstree.root,
                    parent: null,
                    parents: [],
                    children: [],
                    children_d: [],
                    state: {loaded: !1}
                }, this._data.core.selected = [], this._data.core.last_clicked = null, this._data.core.focused = null;
                var r = this.get_container_ul()[0].className;
                t || (this.element.html("<ul class='" + r + "' role='group'><li class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='treeitem' id='j" + this._id + "_loading'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>"), this.element.attr("aria-activedescendant", "j" + this._id + "_loading")), this.load_node(e.jstree.root, function (t, i) {
                    i && (this.get_container_ul()[0].className = r, this._firstChild(this.get_container_ul()[0]) && this.element.attr("aria-activedescendant", this._firstChild(this.get_container_ul()[0]).id), this.set_state(e.extend(!0, {}, this._data.core.state), function () {
                        this.trigger("refresh")
                    })), this._data.core.state = null
                })
            }, refresh_node: function (t) {
                if (t = this.get_node(t), !t || t.id === e.jstree.root)return !1;
                var i = [], r = [];
                this._data.core.selected.concat([]);
                r.push(t.id), t.state.opened === !0 && i.push(t.id), this.get_node(t, !0).find(".jstree-open").each(function () {
                    i.push(this.id)
                }), this._load_nodes(r, e.proxy(function (e) {
                    this.open_node(i, !1, 0), this.select_node(this._data.core.selected), this.trigger("refresh_node", {
                        node: t,
                        nodes: e
                    })
                }, this))
            }, set_id: function (t, i) {
                if (t = this.get_node(t), !t || t.id === e.jstree.root)return !1;
                var r, s, n = this._model.data;
                for (i = i.toString(), n[t.parent].children[e.inArray(t.id, n[t.parent].children)] = i, r = 0, s = t.parents.length; s > r; r++)n[t.parents[r]].children_d[e.inArray(t.id, n[t.parents[r]].children_d)] = i;
                for (r = 0, s = t.children.length; s > r; r++)n[t.children[r]].parent = i;
                for (r = 0, s = t.children_d.length; s > r; r++)n[t.children_d[r]].parents[e.inArray(t.id, n[t.children_d[r]].parents)] = i;
                return r = e.inArray(t.id, this._data.core.selected), -1 !== r && (this._data.core.selected[r] = i), r = this.get_node(t.id, !0), r && (r.attr("id", i).children(".jstree-anchor").attr("id", i + "_anchor").end().attr("aria-labelledby", i + "_anchor"), this.element.attr("aria-activedescendant") === t.id && this.element.attr("aria-activedescendant", i)), delete n[t.id], t.id = i, t.li_attr.id = i, n[i] = t, !0
            }, get_text: function (t) {
                return t = this.get_node(t), t && t.id !== e.jstree.root ? t.text : !1
            }, set_text: function (t, i) {
                var r, s;
                if (e.isArray(t)) {
                    for (t = t.slice(), r = 0, s = t.length; s > r; r++)this.set_text(t[r], i);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (t.text = i, this.get_node(t, !0).length && this.redraw_node(t.id), this.trigger("set_text", {
                    obj: t,
                    text: i
                }), !0) : !1
            }, get_json: function (t, i, r) {
                if (t = this.get_node(t || e.jstree.root), !t)return !1;
                i && i.flat && !r && (r = []);
                var s, n, a = {
                    id: t.id,
                    text: t.text,
                    icon: this.get_icon(t),
                    li_attr: e.extend(!0, {}, t.li_attr),
                    a_attr: e.extend(!0, {}, t.a_attr),
                    state: {},
                    data: i && i.no_data ? !1 : e.extend(!0, {}, t.data)
                };
                if (i && i.flat ? a.parent = t.parent : a.children = [], !i || !i.no_state)for (s in t.state)t.state.hasOwnProperty(s) && (a.state[s] = t.state[s]);
                if (i && i.no_id && (delete a.id, a.li_attr && a.li_attr.id && delete a.li_attr.id, a.a_attr && a.a_attr.id && delete a.a_attr.id), i && i.flat && t.id !== e.jstree.root && r.push(a), !i || !i.no_children)for (s = 0, n = t.children.length; n > s; s++)i && i.flat ? this.get_json(t.children[s], i, r) : a.children.push(this.get_json(t.children[s], i));
                return i && i.flat ? r : t.id === e.jstree.root ? a.children : a
            }, create_node: function (i, r, s, n, a) {
                if (null === i && (i = e.jstree.root), i = this.get_node(i), !i)return !1;
                if (s = s === t ? "last" : s, !s.toString().match(/^(before|after)$/) && !a && !this.is_loaded(i))return this.load_node(i, function () {
                    this.create_node(i, r, s, n, !0)
                });
                r || (r = {text: this.get_string("New node")}), "string" == typeof r && (r = {text: r}), r.text === t && (r.text = this.get_string("New node"));
                var o, d, c, l;
                switch (i.id === e.jstree.root && ("before" === s && (s = "first"), "after" === s && (s = "last")), s) {
                    case"before":
                        o = this.get_node(i.parent), s = e.inArray(i.id, o.children), i = o;
                        break;
                    case"after":
                        o = this.get_node(i.parent), s = e.inArray(i.id, o.children) + 1, i = o;
                        break;
                    case"inside":
                    case"first":
                        s = 0;
                        break;
                    case"last":
                        s = i.children.length;
                        break;
                    default:
                        s || (s = 0)
                }
                if (s > i.children.length && (s = i.children.length), r.id || (r.id = !0), !this.check("create_node", r, i, s))return this.settings.core.error.call(this, this._data.core.last_error), !1;
                if (r.id === !0 && delete r.id, r = this._parse_model_from_json(r, i.id, i.parents.concat()), !r)return !1;
                for (o = this.get_node(r), d = [], d.push(r), d = d.concat(o.children_d), this.trigger("model", {
                    nodes: d,
                    parent: i.id
                }), i.children_d = i.children_d.concat(d), c = 0, l = i.parents.length; l > c; c++)this._model.data[i.parents[c]].children_d = this._model.data[i.parents[c]].children_d.concat(d);
                for (r = o, o = [], c = 0, l = i.children.length; l > c; c++)o[c >= s ? c + 1 : c] = i.children[c];
                return o[s] = r.id, i.children = o, this.redraw_node(i, !0), n && n.call(this, this.get_node(r)), this.trigger("create_node", {
                    node: this.get_node(r),
                    parent: i.id,
                    position: s
                }), r.id
            }, rename_node: function (t, i) {
                var r, s, n;
                if (e.isArray(t)) {
                    for (t = t.slice(), r = 0, s = t.length; s > r; r++)this.rename_node(t[r], i);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (n = t.text, this.check("rename_node", t, this.get_parent(t), i) ? (this.set_text(t, i), this.trigger("rename_node", {
                    node: t,
                    text: i,
                    old: n
                }), !0) : (this.settings.core.error.call(this, this._data.core.last_error), !1)) : !1
            }, delete_node: function (t) {
                var i, r, s, n, a, o, d, c, l, h, _, u;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, r = t.length; r > i; i++)this.delete_node(t[i]);
                    return !0
                }
                if (t = this.get_node(t), !t || t.id === e.jstree.root)return !1;
                if (s = this.get_node(t.parent), n = e.inArray(t.id, s.children), h = !1, !this.check("delete_node", t, s, n))return this.settings.core.error.call(this, this._data.core.last_error), !1;
                for (-1 !== n && (s.children = e.vakata.array_remove(s.children, n)), a = t.children_d.concat([]), a.push(t.id), c = 0, l = a.length; l > c; c++) {
                    for (o = 0, d = t.parents.length; d > o; o++)n = e.inArray(a[c], this._model.data[t.parents[o]].children_d), -1 !== n && (this._model.data[t.parents[o]].children_d = e.vakata.array_remove(this._model.data[t.parents[o]].children_d, n));
                    this._model.data[a[c]].state.selected && (h = !0, n = e.inArray(a[c], this._data.core.selected), -1 !== n && (this._data.core.selected = e.vakata.array_remove(this._data.core.selected, n)))
                }
                for (this.trigger("delete_node", {
                    node: t,
                    parent: s.id
                }), h && this.trigger("changed", {
                    action: "delete_node",
                    node: t,
                    selected: this._data.core.selected,
                    parent: s.id
                }), c = 0, l = a.length; l > c; c++)delete this._model.data[a[c]];
                return -1 !== e.inArray(this._data.core.focused, a) && (this._data.core.focused = null, _ = this.element[0].scrollTop, u = this.element[0].scrollLeft, s.id === e.jstree.root ? this.get_node(this._model.data[e.jstree.root].children[0], !0).children(".jstree-anchor").focus() : this.get_node(s, !0).children(".jstree-anchor").focus(), this.element[0].scrollTop = _, this.element[0].scrollLeft = u), this.redraw_node(s, !0), !0
            }, check: function (t, i, r, s, n) {
                i = i && i.id ? i : this.get_node(i), r = r && r.id ? r : this.get_node(r);
                var a = t.match(/^move_node|copy_node|create_node$/i) ? r : i, o = this.settings.core.check_callback;
                return "move_node" !== t && "copy_node" !== t || n && n.is_multi || i.id !== r.id && e.inArray(i.id, r.children) !== s && -1 === e.inArray(r.id, i.children_d) ? (a && a.data && (a = a.data), a && a.functions && (a.functions[t] === !1 || a.functions[t] === !0) ? (a.functions[t] === !1 && (this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_02",
                    reason: "Node data prevents function: " + t,
                    data: JSON.stringify({chk: t, pos: s, obj: i && i.id ? i.id : !1, par: r && r.id ? r.id : !1})
                }), a.functions[t]) : o === !1 || e.isFunction(o) && o.call(this, t, i, r, s, n) === !1 || o && o[t] === !1 ? (this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_03",
                    reason: "User config for core.check_callback prevents function: " + t,
                    data: JSON.stringify({chk: t, pos: s, obj: i && i.id ? i.id : !1, par: r && r.id ? r.id : !1})
                }, !1) : !0) : (this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_01",
                    reason: "Moving parent inside child",
                    data: JSON.stringify({chk: t, pos: s, obj: i && i.id ? i.id : !1, par: r && r.id ? r.id : !1})
                }, !1)
            }, last_error: function () {
                return this._data.core.last_error
            }, move_node: function (i, r, s, n, a, o, d) {
                var c, l, h, _, u, g, f, p, m, v, j, y, k, x;
                if (r = this.get_node(r), s = s === t ? 0 : s, !r)return !1;
                if (!s.toString().match(/^(before|after)$/) && !a && !this.is_loaded(r))return this.load_node(r, function () {
                    this.move_node(i, r, s, n, !0, !1, d)
                });
                if (e.isArray(i)) {
                    if (1 !== i.length) {
                        for (c = 0, l = i.length; l > c; c++)(m = this.move_node(i[c], r, s, n, a, !1, d)) && (r = m, s = "after");
                        return this.redraw(), !0
                    }
                    i = i[0]
                }
                if (i = i && i.id ? i : this.get_node(i), !i || i.id === e.jstree.root)return !1;
                if (h = (i.parent || e.jstree.root).toString(), u = s.toString().match(/^(before|after)$/) && r.id !== e.jstree.root ? this.get_node(r.parent) : r, g = d ? d : this._model.data[i.id] ? this : e.jstree.reference(i.id), f = !g || !g._id || this._id !== g._id, _ = g && g._id && h && g._model.data[h] && g._model.data[h].children ? e.inArray(i.id, g._model.data[h].children) : -1, g && g._id && (i = g._model.data[i.id]), f)return (m = this.copy_node(i, r, s, n, a, !1, d)) ? (g && g.delete_node(i), m) : !1;
                switch (r.id === e.jstree.root && ("before" === s && (s = "first"), "after" === s && (s = "last")), s) {
                    case"before":
                        s = e.inArray(r.id, u.children);
                        break;
                    case"after":
                        s = e.inArray(r.id, u.children) + 1;
                        break;
                    case"inside":
                    case"first":
                        s = 0;
                        break;
                    case"last":
                        s = u.children.length;
                        break;
                    default:
                        s || (s = 0)
                }
                if (s > u.children.length && (s = u.children.length), !this.check("move_node", i, u, s, {
                        core: !0,
                        origin: d,
                        is_multi: g && g._id && g._id !== this._id,
                        is_foreign: !g || !g._id
                    }))return this.settings.core.error.call(this, this._data.core.last_error), !1;
                if (i.parent === u.id) {
                    for (p = u.children.concat(), m = e.inArray(i.id, p), -1 !== m && (p = e.vakata.array_remove(p, m), s > m && s--), m = [], v = 0, j = p.length; j > v; v++)m[v >= s ? v + 1 : v] = p[v];
                    m[s] = i.id, u.children = m, this._node_changed(u.id), this.redraw(u.id === e.jstree.root)
                } else {
                    for (m = i.children_d.concat(), m.push(i.id), v = 0, j = i.parents.length; j > v; v++) {
                        for (p = [], x = g._model.data[i.parents[v]].children_d, y = 0, k = x.length; k > y; y++)-1 === e.inArray(x[y], m) && p.push(x[y]);
                        g._model.data[i.parents[v]].children_d = p
                    }
                    for (g._model.data[h].children = e.vakata.array_remove_item(g._model.data[h].children, i.id), v = 0, j = u.parents.length; j > v; v++)this._model.data[u.parents[v]].children_d = this._model.data[u.parents[v]].children_d.concat(m);
                    for (p = [], v = 0, j = u.children.length; j > v; v++)p[v >= s ? v + 1 : v] = u.children[v];
                    for (p[s] = i.id, u.children = p, u.children_d.push(i.id), u.children_d = u.children_d.concat(i.children_d), i.parent = u.id, m = u.parents.concat(), m.unshift(u.id), x = i.parents.length, i.parents = m, m = m.concat(), v = 0, j = i.children_d.length; j > v; v++)this._model.data[i.children_d[v]].parents = this._model.data[i.children_d[v]].parents.slice(0, -1 * x), Array.prototype.push.apply(this._model.data[i.children_d[v]].parents, m);
                    (h === e.jstree.root || u.id === e.jstree.root) && (this._model.force_full_redraw = !0), this._model.force_full_redraw || (this._node_changed(h), this._node_changed(u.id)), o || this.redraw()
                }
                return n && n.call(this, i, u, s), this.trigger("move_node", {
                    node: i,
                    parent: u.id,
                    position: s,
                    old_parent: h,
                    old_position: _,
                    is_multi: g && g._id && g._id !== this._id,
                    is_foreign: !g || !g._id,
                    old_instance: g,
                    new_instance: this
                }), i.id
            }, copy_node: function (i, r, s, n, a, o, d) {
                var c, l, h, _, u, g, f, p, m, v, j;
                if (r = this.get_node(r), s = s === t ? 0 : s, !r)return !1;
                if (!s.toString().match(/^(before|after)$/) && !a && !this.is_loaded(r))return this.load_node(r, function () {
                    this.copy_node(i, r, s, n, !0, !1, d)
                });
                if (e.isArray(i)) {
                    if (1 !== i.length) {
                        for (c = 0, l = i.length; l > c; c++)(_ = this.copy_node(i[c], r, s, n, a, !0, d)) && (r = _, s = "after");
                        return this.redraw(), !0
                    }
                    i = i[0]
                }
                if (i = i && i.id ? i : this.get_node(i), !i || i.id === e.jstree.root)return !1;
                switch (p = (i.parent || e.jstree.root).toString(), m = s.toString().match(/^(before|after)$/) && r.id !== e.jstree.root ? this.get_node(r.parent) : r, v = d ? d : this._model.data[i.id] ? this : e.jstree.reference(i.id), j = !v || !v._id || this._id !== v._id, v && v._id && (i = v._model.data[i.id]), r.id === e.jstree.root && ("before" === s && (s = "first"), "after" === s && (s = "last")), s) {
                    case"before":
                        s = e.inArray(r.id, m.children);
                        break;
                    case"after":
                        s = e.inArray(r.id, m.children) + 1;
                        break;
                    case"inside":
                    case"first":
                        s = 0;
                        break;
                    case"last":
                        s = m.children.length;
                        break;
                    default:
                        s || (s = 0)
                }
                if (s > m.children.length && (s = m.children.length), !this.check("copy_node", i, m, s, {
                        core: !0,
                        origin: d,
                        is_multi: v && v._id && v._id !== this._id,
                        is_foreign: !v || !v._id
                    }))return this.settings.core.error.call(this, this._data.core.last_error), !1;
                if (f = v ? v.get_json(i, {no_id: !0, no_data: !0, no_state: !0}) : i, !f)return !1;
                if (f.id === !0 && delete f.id, f = this._parse_model_from_json(f, m.id, m.parents.concat()), !f)return !1;
                for (_ = this.get_node(f), i && i.state && i.state.loaded === !1 && (_.state.loaded = !1), h = [], h.push(f), h = h.concat(_.children_d), this.trigger("model", {
                    nodes: h,
                    parent: m.id
                }), u = 0, g = m.parents.length; g > u; u++)this._model.data[m.parents[u]].children_d = this._model.data[m.parents[u]].children_d.concat(h);
                for (h = [], u = 0, g = m.children.length; g > u; u++)h[u >= s ? u + 1 : u] = m.children[u];
                return h[s] = _.id, m.children = h, m.children_d.push(_.id), m.children_d = m.children_d.concat(_.children_d), m.id === e.jstree.root && (this._model.force_full_redraw = !0), this._model.force_full_redraw || this._node_changed(m.id), o || this.redraw(m.id === e.jstree.root), n && n.call(this, _, m, s), this.trigger("copy_node", {
                    node: _,
                    original: i,
                    parent: m.id,
                    position: s,
                    old_parent: p,
                    old_position: v && v._id && p && v._model.data[p] && v._model.data[p].children ? e.inArray(i.id, v._model.data[p].children) : -1,
                    is_multi: v && v._id && v._id !== this._id,
                    is_foreign: !v || !v._id,
                    old_instance: v,
                    new_instance: this
                }), _.id
            }, cut: function (t) {
                if (t || (t = this._data.core.selected.concat()), e.isArray(t) || (t = [t]), !t.length)return !1;
                var i, r, s, d = [];
                for (r = 0, s = t.length; s > r; r++)i = this.get_node(t[r]), i && i.id && i.id !== e.jstree.root && d.push(i);
                return d.length ? (n = d, o = this, a = "move_node", void this.trigger("cut", {node: t})) : !1
            }, copy: function (t) {
                if (t || (t = this._data.core.selected.concat()), e.isArray(t) || (t = [t]), !t.length)return !1;
                var i, r, s, d = [];
                for (r = 0, s = t.length; s > r; r++)i = this.get_node(t[r]), i && i.id && i.id !== e.jstree.root && d.push(i);
                return d.length ? (n = d, o = this, a = "copy_node", void this.trigger("copy", {node: t})) : !1
            }, get_buffer: function () {
                return {mode: a, node: n, inst: o}
            }, can_paste: function () {
                return a !== !1 && n !== !1
            }, paste: function (e, t) {
                return e = this.get_node(e), e && a && a.match(/^(copy_node|move_node)$/) && n ? (this[a](n, e, t, !1, !1, !1, o) && this.trigger("paste", {
                    parent: e.id,
                    node: n,
                    mode: a
                }), n = !1, a = !1, void(o = !1)) : !1
            }, clear_buffer: function () {
                n = !1, a = !1, o = !1, this.trigger("clear_buffer")
            }, edit: function (t, i, r) {
                var s, n, a, o, d, c, l, h, _, u = !1;
                return (t = this.get_node(t)) ? this.settings.core.check_callback === !1 ? (this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_07",
                    reason: "Could not edit node because of check_callback"
                }, this.settings.core.error.call(this, this._data.core.last_error), !1) : (_ = t, i = "string" == typeof i ? i : t.text, this.set_text(t, ""), t = this._open_to(t), _.text = i, s = this._data.core.rtl, n = this.element.width(), this._data.core.focused = _.id, a = t.children(".jstree-anchor").focus(), o = e("<span>"), d = i, c = e("<div />", {
                    css: {
                        position: "absolute",
                        top: "-200px",
                        left: s ? "0px" : "-1000px",
                        visibility: "hidden"
                    }
                }).appendTo("body"), l = e("<input />", {
                    value: d,
                    "class": "jstree-rename-input",
                    css: {
                        padding: "0",
                        border: "1px solid silver",
                        "box-sizing": "border-box",
                        display: "inline-block",
                        height: this._data.core.li_height + "px",
                        lineHeight: this._data.core.li_height + "px",
                        width: "150px"
                    },
                    blur: e.proxy(function (i) {
                        i.stopImmediatePropagation(), i.preventDefault();
                        var s, n = o.children(".jstree-rename-input"), l = n.val(), h = this.settings.core.force_text;
                        "" === l && (l = d), c.remove(), o.replaceWith(a), o.remove(), d = h ? d : e("<div></div>").append(e.parseHTML(d)).html(), this.set_text(t, d), s = !!this.rename_node(t, h ? e("<div></div>").text(l).text() : e("<div></div>").append(e.parseHTML(l)).html()), s || this.set_text(t, d), this._data.core.focused = _.id, setTimeout(e.proxy(function () {
                            var e = this.get_node(_.id, !0);
                            e.length && (this._data.core.focused = _.id, e.children(".jstree-anchor").focus())
                        }, this), 0), r && r.call(this, _, s, u)
                    }, this),
                    keydown: function (e) {
                        var t = e.which;
                        27 === t && (u = !0, this.value = d), (27 === t || 13 === t || 37 === t || 38 === t || 39 === t || 40 === t || 32 === t) && e.stopImmediatePropagation(), (27 === t || 13 === t) && (e.preventDefault(), this.blur())
                    },
                    click: function (e) {
                        e.stopImmediatePropagation()
                    },
                    mousedown: function (e) {
                        e.stopImmediatePropagation()
                    },
                    keyup: function (e) {
                        l.width(Math.min(c.text("pW" + this.value).width(), n))
                    },
                    keypress: function (e) {
                        return 13 === e.which ? !1 : void 0
                    }
                }), h = {
                    fontFamily: a.css("fontFamily") || "",
                    fontSize: a.css("fontSize") || "",
                    fontWeight: a.css("fontWeight") || "",
                    fontStyle: a.css("fontStyle") || "",
                    fontStretch: a.css("fontStretch") || "",
                    fontVariant: a.css("fontVariant") || "",
                    letterSpacing: a.css("letterSpacing") || "",
                    wordSpacing: a.css("wordSpacing") || ""
                }, o.attr("class", a.attr("class")).append(a.contents().clone()).append(l), a.replaceWith(o), c.css(h), void l.css(h).width(Math.min(c.text("pW" + l[0].value).width(), n))[0].select()) : !1
            }, set_theme: function (t, i) {
                if (!t)return !1;
                if (i === !0) {
                    var r = this.settings.core.themes.dir;
                    r || (r = e.jstree.path + "/themes"), i = r + "/" + t + "/style.css"
                }
                i && -1 === e.inArray(i, d) && (e("head").append('<link rel="stylesheet" href="' + i + '" type="text/css" />'), d.push(i)), this._data.core.themes.name && this.element.removeClass("jstree-" + this._data.core.themes.name),
                    this._data.core.themes.name = t, this.element.addClass("jstree-" + t), this.element[this.settings.core.themes.responsive ? "addClass" : "removeClass"]("jstree-" + t + "-responsive"), this.trigger("set_theme", {theme: t})
            }, get_theme: function () {
                return this._data.core.themes.name
            }, set_theme_variant: function (e) {
                this._data.core.themes.variant && this.element.removeClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant), this._data.core.themes.variant = e, e && this.element.addClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant)
            }, get_theme_variant: function () {
                return this._data.core.themes.variant
            }, show_stripes: function () {
                this._data.core.themes.stripes = !0, this.get_container_ul().addClass("jstree-striped")
            }, hide_stripes: function () {
                this._data.core.themes.stripes = !1, this.get_container_ul().removeClass("jstree-striped")
            }, toggle_stripes: function () {
                this._data.core.themes.stripes ? this.hide_stripes() : this.show_stripes()
            }, show_dots: function () {
                this._data.core.themes.dots = !0, this.get_container_ul().removeClass("jstree-no-dots")
            }, hide_dots: function () {
                this._data.core.themes.dots = !1, this.get_container_ul().addClass("jstree-no-dots")
            }, toggle_dots: function () {
                this._data.core.themes.dots ? this.hide_dots() : this.show_dots()
            }, show_icons: function () {
                this._data.core.themes.icons = !0, this.get_container_ul().removeClass("jstree-no-icons")
            }, hide_icons: function () {
                this._data.core.themes.icons = !1, this.get_container_ul().addClass("jstree-no-icons")
            }, toggle_icons: function () {
                this._data.core.themes.icons ? this.hide_icons() : this.show_icons()
            }, set_icon: function (i, r) {
                var s, n, a, o;
                if (e.isArray(i)) {
                    for (i = i.slice(), s = 0, n = i.length; n > s; s++)this.set_icon(i[s], r);
                    return !0
                }
                return i = this.get_node(i), i && i.id !== e.jstree.root ? (o = i.icon, i.icon = r === !0 || null === r || r === t || "" === r ? !0 : r, a = this.get_node(i, !0).children(".jstree-anchor").children(".jstree-themeicon"), r === !1 ? this.hide_icon(i) : r === !0 || null === r || r === t || "" === r ? (a.removeClass("jstree-themeicon-custom " + o).css("background", "").removeAttr("rel"), o === !1 && this.show_icon(i)) : -1 === r.indexOf("/") && -1 === r.indexOf(".") ? (a.removeClass(o).css("background", ""), a.addClass(r + " jstree-themeicon-custom").attr("rel", r), o === !1 && this.show_icon(i)) : (a.removeClass(o).css("background", ""), a.addClass("jstree-themeicon-custom").css("background", "url('" + r + "') center center no-repeat").attr("rel", r), o === !1 && this.show_icon(i)), !0) : !1
            }, get_icon: function (t) {
                return t = this.get_node(t), t && t.id !== e.jstree.root ? t.icon : !1
            }, hide_icon: function (t) {
                var i, r;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, r = t.length; r > i; i++)this.hide_icon(t[i]);
                    return !0
                }
                return t = this.get_node(t), t && t !== e.jstree.root ? (t.icon = !1, this.get_node(t, !0).children(".jstree-anchor").children(".jstree-themeicon").addClass("jstree-themeicon-hidden"), !0) : !1
            }, show_icon: function (t) {
                var i, r, s;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, r = t.length; r > i; i++)this.show_icon(t[i]);
                    return !0
                }
                return t = this.get_node(t), t && t !== e.jstree.root ? (s = this.get_node(t, !0), t.icon = s.length ? s.children(".jstree-anchor").children(".jstree-themeicon").attr("rel") : !0, t.icon || (t.icon = !0), s.children(".jstree-anchor").children(".jstree-themeicon").removeClass("jstree-themeicon-hidden"), !0) : !1
            }
        }, e.vakata = {}, e.vakata.attributes = function (t, i) {
            t = e(t)[0];
            var r = i ? {} : [];
            return t && t.attributes && e.each(t.attributes, function (t, s) {
                -1 === e.inArray(s.name.toLowerCase(), ["style", "contenteditable", "hasfocus", "tabindex"]) && null !== s.value && "" !== e.trim(s.value) && (i ? r[s.name] = s.value : r.push(s.name))
            }), r
        }, e.vakata.array_unique = function (e) {
            var i, r, s = [], n = {};
            for (i = 0, r = e.length; r > i; i++)n[e[i]] === t && (s.push(e[i]), n[e[i]] = !0);
            return s
        }, e.vakata.array_remove = function (e, t, i) {
            var r = e.slice((i || t) + 1 || e.length);
            return e.length = 0 > t ? e.length + t : t, e.push.apply(e, r), e
        }, e.vakata.array_remove_item = function (t, i) {
            var r = e.inArray(i, t);
            return -1 !== r ? e.vakata.array_remove(t, r) : t
        }, e.jstree.plugins.changed = function (e, t) {
            var i = [];
            this.trigger = function (e, r) {
                var s, n;
                if (r || (r = {}), "changed" === e.replace(".jstree", "")) {
                    r.changed = {selected: [], deselected: []};
                    var a = {};
                    for (s = 0, n = i.length; n > s; s++)a[i[s]] = 1;
                    for (s = 0, n = r.selected.length; n > s; s++)a[r.selected[s]] ? a[r.selected[s]] = 2 : r.changed.selected.push(r.selected[s]);
                    for (s = 0, n = i.length; n > s; s++)1 === a[i[s]] && r.changed.deselected.push(i[s]);
                    i = r.selected.slice()
                }
                t.trigger.call(this, e, r)
            }, this.refresh = function (e, r) {
                return i = [], t.refresh.apply(this, arguments)
            }
        };
        var _ = l.createElement("I");
        _.className = "jstree-icon jstree-checkbox", _.setAttribute("role", "presentation"), e.jstree.defaults.checkbox = {
            visible: !0,
            three_state: !0,
            whole_node: !0,
            keep_selected_style: !0,
            cascade: "",
            tie_selection: !0
        }, e.jstree.plugins.checkbox = function (i, r) {
            this.bind = function () {
                r.bind.call(this), this._data.checkbox.uto = !1, this._data.checkbox.selected = [], this.settings.checkbox.three_state && (this.settings.checkbox.cascade = "up+down+undetermined"), this.element.on("init.jstree", e.proxy(function () {
                    this._data.checkbox.visible = this.settings.checkbox.visible, this.settings.checkbox.keep_selected_style || this.element.addClass("jstree-checkbox-no-clicked"), this.settings.checkbox.tie_selection && this.element.addClass("jstree-checkbox-selection")
                }, this)).on("loading.jstree", e.proxy(function () {
                    this[this._data.checkbox.visible ? "show_checkboxes" : "hide_checkboxes"]()
                }, this)), -1 !== this.settings.checkbox.cascade.indexOf("undetermined") && this.element.on("changed.jstree uncheck_node.jstree check_node.jstree uncheck_all.jstree check_all.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree", e.proxy(function () {
                    this._data.checkbox.uto && clearTimeout(this._data.checkbox.uto), this._data.checkbox.uto = setTimeout(e.proxy(this._undetermined, this), 50)
                }, this)), this.settings.checkbox.tie_selection || this.element.on("model.jstree", e.proxy(function (e, t) {
                    var i, r, s = this._model.data, n = (s[t.parent], t.nodes);
                    for (i = 0, r = n.length; r > i; i++)s[n[i]].state.checked = s[n[i]].state.checked || s[n[i]].original && s[n[i]].original.state && s[n[i]].original.state.checked, s[n[i]].state.checked && this._data.checkbox.selected.push(n[i])
                }, this)), (-1 !== this.settings.checkbox.cascade.indexOf("up") || -1 !== this.settings.checkbox.cascade.indexOf("down")) && this.element.on("model.jstree", e.proxy(function (t, i) {
                    var r, s, n, a, o, d, c = this._model.data, l = c[i.parent], h = i.nodes, _ = [], u = this.settings.checkbox.cascade, g = this.settings.checkbox.tie_selection;
                    if (-1 !== u.indexOf("down"))if (l.state[g ? "selected" : "checked"]) {
                        for (s = 0, n = h.length; n > s; s++)c[h[s]].state[g ? "selected" : "checked"] = !0;
                        this._data[g ? "core" : "checkbox"].selected = this._data[g ? "core" : "checkbox"].selected.concat(h)
                    } else for (s = 0, n = h.length; n > s; s++)if (c[h[s]].state[g ? "selected" : "checked"]) {
                        for (a = 0, o = c[h[s]].children_d.length; o > a; a++)c[c[h[s]].children_d[a]].state[g ? "selected" : "checked"] = !0;
                        this._data[g ? "core" : "checkbox"].selected = this._data[g ? "core" : "checkbox"].selected.concat(c[h[s]].children_d)
                    }
                    if (-1 !== u.indexOf("up")) {
                        for (s = 0, n = l.children_d.length; n > s; s++)c[l.children_d[s]].children.length || _.push(c[l.children_d[s]].parent);
                        for (_ = e.vakata.array_unique(_), a = 0, o = _.length; o > a; a++)for (l = c[_[a]]; l && l.id !== e.jstree.root;) {
                            for (r = 0, s = 0, n = l.children.length; n > s; s++)r += c[l.children[s]].state[g ? "selected" : "checked"];
                            if (r !== n)break;
                            l.state[g ? "selected" : "checked"] = !0, this._data[g ? "core" : "checkbox"].selected.push(l.id), d = this.get_node(l, !0), d && d.length && d.attr("aria-selected", !0).children(".jstree-anchor").addClass(g ? "jstree-clicked" : "jstree-checked"), l = this.get_node(l.parent)
                        }
                    }
                    this._data[g ? "core" : "checkbox"].selected = e.vakata.array_unique(this._data[g ? "core" : "checkbox"].selected)
                }, this)).on(this.settings.checkbox.tie_selection ? "select_node.jstree" : "check_node.jstree", e.proxy(function (t, i) {
                    var r, s, n, a, o = i.node, d = this._model.data, c = this.get_node(o.parent), l = this.get_node(o, !0), h = this.settings.checkbox.cascade, _ = this.settings.checkbox.tie_selection;
                    if (-1 !== h.indexOf("down"))for (this._data[_ ? "core" : "checkbox"].selected = e.vakata.array_unique(this._data[_ ? "core" : "checkbox"].selected.concat(o.children_d)), r = 0, s = o.children_d.length; s > r; r++)a = d[o.children_d[r]], a.state[_ ? "selected" : "checked"] = !0, a && a.original && a.original.state && a.original.state.undetermined && (a.original.state.undetermined = !1);
                    if (-1 !== h.indexOf("up"))for (; c && c.id !== e.jstree.root;) {
                        for (n = 0, r = 0, s = c.children.length; s > r; r++)n += d[c.children[r]].state[_ ? "selected" : "checked"];
                        if (n !== s)break;
                        c.state[_ ? "selected" : "checked"] = !0, this._data[_ ? "core" : "checkbox"].selected.push(c.id), a = this.get_node(c, !0), a && a.length && a.attr("aria-selected", !0).children(".jstree-anchor").addClass(_ ? "jstree-clicked" : "jstree-checked"), c = this.get_node(c.parent)
                    }
                    -1 !== h.indexOf("down") && l.length && l.find(".jstree-anchor").addClass(_ ? "jstree-clicked" : "jstree-checked").parent().attr("aria-selected", !0)
                }, this)).on(this.settings.checkbox.tie_selection ? "deselect_all.jstree" : "uncheck_all.jstree", e.proxy(function (t, i) {
                    var r, s, n, a = this.get_node(e.jstree.root), o = this._model.data;
                    for (r = 0, s = a.children_d.length; s > r; r++)n = o[a.children_d[r]], n && n.original && n.original.state && n.original.state.undetermined && (n.original.state.undetermined = !1)
                }, this)).on(this.settings.checkbox.tie_selection ? "deselect_node.jstree" : "uncheck_node.jstree", e.proxy(function (t, i) {
                    var r, s, n, a = i.node, o = this.get_node(a, !0), d = this.settings.checkbox.cascade, c = this.settings.checkbox.tie_selection;
                    if (a && a.original && a.original.state && a.original.state.undetermined && (a.original.state.undetermined = !1), -1 !== d.indexOf("down"))for (r = 0, s = a.children_d.length; s > r; r++)n = this._model.data[a.children_d[r]], n.state[c ? "selected" : "checked"] = !1, n && n.original && n.original.state && n.original.state.undetermined && (n.original.state.undetermined = !1);
                    if (-1 !== d.indexOf("up"))for (r = 0, s = a.parents.length; s > r; r++)n = this._model.data[a.parents[r]], n.state[c ? "selected" : "checked"] = !1, n && n.original && n.original.state && n.original.state.undetermined && (n.original.state.undetermined = !1), n = this.get_node(a.parents[r], !0), n && n.length && n.attr("aria-selected", !1).children(".jstree-anchor").removeClass(c ? "jstree-clicked" : "jstree-checked");
                    for (n = [], r = 0, s = this._data[c ? "core" : "checkbox"].selected.length; s > r; r++)-1 !== d.indexOf("down") && -1 !== e.inArray(this._data[c ? "core" : "checkbox"].selected[r], a.children_d) || -1 !== d.indexOf("up") && -1 !== e.inArray(this._data[c ? "core" : "checkbox"].selected[r], a.parents) || n.push(this._data[c ? "core" : "checkbox"].selected[r]);
                    this._data[c ? "core" : "checkbox"].selected = e.vakata.array_unique(n), -1 !== d.indexOf("down") && o.length && o.find(".jstree-anchor").removeClass(c ? "jstree-clicked" : "jstree-checked").parent().attr("aria-selected", !1)
                }, this)), -1 !== this.settings.checkbox.cascade.indexOf("up") && this.element.on("delete_node.jstree", e.proxy(function (t, i) {
                    for (var r, s, n, a, o = this.get_node(i.parent), d = this._model.data, c = this.settings.checkbox.tie_selection; o && o.id !== e.jstree.root && !o.state[c ? "selected" : "checked"];) {
                        for (n = 0, r = 0, s = o.children.length; s > r; r++)n += d[o.children[r]].state[c ? "selected" : "checked"];
                        if (!(s > 0 && n === s))break;
                        o.state[c ? "selected" : "checked"] = !0, this._data[c ? "core" : "checkbox"].selected.push(o.id), a = this.get_node(o, !0), a && a.length && a.attr("aria-selected", !0).children(".jstree-anchor").addClass(c ? "jstree-clicked" : "jstree-checked"), o = this.get_node(o.parent)
                    }
                }, this)).on("move_node.jstree", e.proxy(function (t, i) {
                    var r, s, n, a, o, d = i.is_multi, c = i.old_parent, l = this.get_node(i.parent), h = this._model.data, _ = this.settings.checkbox.tie_selection;
                    if (!d)for (r = this.get_node(c); r && r.id !== e.jstree.root && !r.state[_ ? "selected" : "checked"];) {
                        for (s = 0, n = 0, a = r.children.length; a > n; n++)s += h[r.children[n]].state[_ ? "selected" : "checked"];
                        if (!(a > 0 && s === a))break;
                        r.state[_ ? "selected" : "checked"] = !0, this._data[_ ? "core" : "checkbox"].selected.push(r.id), o = this.get_node(r, !0), o && o.length && o.attr("aria-selected", !0).children(".jstree-anchor").addClass(_ ? "jstree-clicked" : "jstree-checked"), r = this.get_node(r.parent)
                    }
                    for (r = l; r && r.id !== e.jstree.root;) {
                        for (s = 0, n = 0, a = r.children.length; a > n; n++)s += h[r.children[n]].state[_ ? "selected" : "checked"];
                        if (s === a)r.state[_ ? "selected" : "checked"] || (r.state[_ ? "selected" : "checked"] = !0, this._data[_ ? "core" : "checkbox"].selected.push(r.id), o = this.get_node(r, !0), o && o.length && o.attr("aria-selected", !0).children(".jstree-anchor").addClass(_ ? "jstree-clicked" : "jstree-checked")); else {
                            if (!r.state[_ ? "selected" : "checked"])break;
                            r.state[_ ? "selected" : "checked"] = !1, this._data[_ ? "core" : "checkbox"].selected = e.vakata.array_remove_item(this._data[_ ? "core" : "checkbox"].selected, r.id), o = this.get_node(r, !0), o && o.length && o.attr("aria-selected", !1).children(".jstree-anchor").removeClass(_ ? "jstree-clicked" : "jstree-checked")
                        }
                        r = this.get_node(r.parent)
                    }
                }, this))
            }, this._undetermined = function () {
                if (null !== this.element) {
                    var i, r, s, n, a = {}, o = this._model.data, d = this.settings.checkbox.tie_selection, c = this._data[d ? "core" : "checkbox"].selected, l = [], h = this;
                    for (i = 0, r = c.length; r > i; i++)if (o[c[i]] && o[c[i]].parents)for (s = 0, n = o[c[i]].parents.length; n > s; s++)a[o[c[i]].parents[s]] === t && o[c[i]].parents[s] !== e.jstree.root && (a[o[c[i]].parents[s]] = !0, l.push(o[c[i]].parents[s]));
                    for (this.element.find(".jstree-closed").not(":has(.jstree-children)").each(function () {
                        var d, c = h.get_node(this);
                        if (c.state.loaded) {
                            for (i = 0, r = c.children_d.length; r > i; i++)if (d = o[c.children_d[i]], !d.state.loaded && d.original && d.original.state && d.original.state.undetermined && d.original.state.undetermined === !0)for (a[d.id] === t && d.id !== e.jstree.root && (a[d.id] = !0, l.push(d.id)), s = 0, n = d.parents.length; n > s; s++)a[d.parents[s]] === t && d.parents[s] !== e.jstree.root && (a[d.parents[s]] = !0, l.push(d.parents[s]))
                        } else if (c.original && c.original.state && c.original.state.undetermined && c.original.state.undetermined === !0)for (a[c.id] === t && c.id !== e.jstree.root && (a[c.id] = !0, l.push(c.id)), s = 0, n = c.parents.length; n > s; s++)a[c.parents[s]] === t && c.parents[s] !== e.jstree.root && (a[c.parents[s]] = !0, l.push(c.parents[s]))
                    }), this.element.find(".jstree-undetermined").removeClass("jstree-undetermined"), i = 0, r = l.length; r > i; i++)o[l[i]].state[d ? "selected" : "checked"] || (c = this.get_node(l[i], !0), c && c.length && c.children(".jstree-anchor").children(".jstree-checkbox").addClass("jstree-undetermined"))
                }
            }, this.redraw_node = function (t, i, s, n) {
                if (t = r.redraw_node.apply(this, arguments)) {
                    var a, o, d = null, c = null;
                    for (a = 0, o = t.childNodes.length; o > a; a++)if (t.childNodes[a] && t.childNodes[a].className && -1 !== t.childNodes[a].className.indexOf("jstree-anchor")) {
                        d = t.childNodes[a];
                        break
                    }
                    d && (!this.settings.checkbox.tie_selection && this._model.data[t.id].state.checked && (d.className += " jstree-checked"), c = _.cloneNode(!1), this._model.data[t.id].state.checkbox_disabled && (c.className += " jstree-checkbox-disabled"), d.insertBefore(c, d.childNodes[0]))
                }
                return s || -1 === this.settings.checkbox.cascade.indexOf("undetermined") || (this._data.checkbox.uto && clearTimeout(this._data.checkbox.uto), this._data.checkbox.uto = setTimeout(e.proxy(this._undetermined, this), 50)), t
            }, this.show_checkboxes = function () {
                this._data.core.themes.checkboxes = !0, this.get_container_ul().removeClass("jstree-no-checkboxes")
            }, this.hide_checkboxes = function () {
                this._data.core.themes.checkboxes = !1, this.get_container_ul().addClass("jstree-no-checkboxes")
            }, this.toggle_checkboxes = function () {
                this._data.core.themes.checkboxes ? this.hide_checkboxes() : this.show_checkboxes()
            }, this.is_undetermined = function (t) {
                t = this.get_node(t);
                var i, r, s = this.settings.checkbox.cascade, n = this.settings.checkbox.tie_selection, a = this._data[n ? "core" : "checkbox"].selected, o = this._model.data;
                if (!t || t.state[n ? "selected" : "checked"] === !0 || -1 === s.indexOf("undetermined") || -1 === s.indexOf("down") && -1 === s.indexOf("up"))return !1;
                if (!t.state.loaded && t.original.state.undetermined === !0)return !0;
                for (i = 0, r = t.children_d.length; r > i; i++)if (-1 !== e.inArray(t.children_d[i], a) || !o[t.children_d[i]].state.loaded && o[t.children_d[i]].original.state.undetermined)return !0;
                return !1
            }, this.disable_checkbox = function (t) {
                var i, r, s;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, r = t.length; r > i; i++)this.disable_checkbox(t[i]);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (s = this.get_node(t, !0), void(t.state.checkbox_disabled || (t.state.checkbox_disabled = !0, s && s.length && s.children(".jstree-anchor").children(".jstree-checkbox").addClass("jstree-checkbox-disabled"), this.trigger("disable_checkbox", {node: t})))) : !1
            }, this.enable_checkbox = function (t) {
                var i, r, s;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, r = t.length; r > i; i++)this.enable_checkbox(t[i]);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (s = this.get_node(t, !0), void(t.state.checkbox_disabled && (t.state.checkbox_disabled = !1, s && s.length && s.children(".jstree-anchor").children(".jstree-checkbox").removeClass("jstree-checkbox-disabled"), this.trigger("enable_checkbox", {node: t})))) : !1
            }, this.activate_node = function (t, i) {
                return e(i.target).hasClass("jstree-checkbox-disabled") ? !1 : (this.settings.checkbox.tie_selection && (this.settings.checkbox.whole_node || e(i.target).hasClass("jstree-checkbox")) && (i.ctrlKey = !0), this.settings.checkbox.tie_selection || !this.settings.checkbox.whole_node && !e(i.target).hasClass("jstree-checkbox") ? r.activate_node.call(this, t, i) : this.is_disabled(t) ? !1 : (this.is_checked(t) ? this.uncheck_node(t, i) : this.check_node(t, i), void this.trigger("activate_node", {node: this.get_node(t)})))
            }, this.check_node = function (t, i) {
                if (this.settings.checkbox.tie_selection)return this.select_node(t, !1, !0, i);
                var r, s, n;
                if (e.isArray(t)) {
                    for (t = t.slice(), s = 0, n = t.length; n > s; s++)this.check_node(t[s], i);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (r = this.get_node(t, !0), void(t.state.checked || (t.state.checked = !0, this._data.checkbox.selected.push(t.id), r && r.length && r.children(".jstree-anchor").addClass("jstree-checked"), this.trigger("check_node", {
                    node: t,
                    selected: this._data.checkbox.selected,
                    event: i
                })))) : !1
            }, this.uncheck_node = function (t, i) {
                if (this.settings.checkbox.tie_selection)return this.deselect_node(t, !1, i);
                var r, s, n;
                if (e.isArray(t)) {
                    for (t = t.slice(), r = 0, s = t.length; s > r; r++)this.uncheck_node(t[r], i);
                    return !0
                }
                return t = this.get_node(t), t && t.id !== e.jstree.root ? (n = this.get_node(t, !0), void(t.state.checked && (t.state.checked = !1, this._data.checkbox.selected = e.vakata.array_remove_item(this._data.checkbox.selected, t.id), n.length && n.children(".jstree-anchor").removeClass("jstree-checked"), this.trigger("uncheck_node", {
                    node: t,
                    selected: this._data.checkbox.selected,
                    event: i
                })))) : !1
            }, this.check_all = function () {
                if (this.settings.checkbox.tie_selection)return this.select_all();
                var t, i;
                this._data.checkbox.selected.concat([]);
                for (this._data.checkbox.selected = this._model.data[e.jstree.root].children_d.concat(), t = 0, i = this._data.checkbox.selected.length; i > t; t++)this._model.data[this._data.checkbox.selected[t]] && (this._model.data[this._data.checkbox.selected[t]].state.checked = !0);
                this.redraw(!0), this.trigger("check_all", {selected: this._data.checkbox.selected})
            }, this.uncheck_all = function () {
                if (this.settings.checkbox.tie_selection)return this.deselect_all();
                var e, t, i = this._data.checkbox.selected.concat([]);
                for (e = 0, t = this._data.checkbox.selected.length; t > e; e++)this._model.data[this._data.checkbox.selected[e]] && (this._model.data[this._data.checkbox.selected[e]].state.checked = !1);
                this._data.checkbox.selected = [], this.element.find(".jstree-checked").removeClass("jstree-checked"), this.trigger("uncheck_all", {
                    selected: this._data.checkbox.selected,
                    node: i
                })
            }, this.is_checked = function (t) {
                return this.settings.checkbox.tie_selection ? this.is_selected(t) : (t = this.get_node(t), t && t.id !== e.jstree.root ? t.state.checked : !1)
            }, this.get_checked = function (t) {
                return this.settings.checkbox.tie_selection ? this.get_selected(t) : t ? e.map(this._data.checkbox.selected, e.proxy(function (e) {
                    return this.get_node(e)
                }, this)) : this._data.checkbox.selected
            }, this.get_top_checked = function (t) {
                if (this.settings.checkbox.tie_selection)return this.get_top_selected(t);
                var i, r, s, n, a = this.get_checked(!0), o = {};
                for (i = 0, r = a.length; r > i; i++)o[a[i].id] = a[i];
                for (i = 0, r = a.length; r > i; i++)for (s = 0, n = a[i].children_d.length; n > s; s++)o[a[i].children_d[s]] && delete o[a[i].children_d[s]];
                a = [];
                for (i in o)o.hasOwnProperty(i) && a.push(i);
                return t ? e.map(a, e.proxy(function (e) {
                    return this.get_node(e)
                }, this)) : a
            }, this.get_bottom_checked = function (t) {
                if (this.settings.checkbox.tie_selection)return this.get_bottom_selected(t);
                var i, r, s = this.get_checked(!0), n = [];
                for (i = 0, r = s.length; r > i; i++)s[i].children.length || n.push(s[i].id);
                return t ? e.map(n, e.proxy(function (e) {
                    return this.get_node(e)
                }, this)) : n
            }, this.load_node = function (t, i) {
                var s, n, a, o;
                if (!e.isArray(t) && !this.settings.checkbox.tie_selection && (o = this.get_node(t), o && o.state.loaded))for (s = 0, n = o.children_d.length; n > s; s++)this._model.data[o.children_d[s]].state.checked && (a = !0, this._data.checkbox.selected = e.vakata.array_remove_item(this._data.checkbox.selected, o.children_d[s]));
                return r.load_node.apply(this, arguments)
            }, this.get_state = function () {
                var e = r.get_state.apply(this, arguments);
                return this.settings.checkbox.tie_selection ? e : (e.checkbox = this._data.checkbox.selected.slice(), e)
            }, this.set_state = function (t, i) {
                var s = r.set_state.apply(this, arguments);
                if (s && t.checkbox) {
                    if (!this.settings.checkbox.tie_selection) {
                        this.uncheck_all();
                        var n = this;
                        e.each(t.checkbox, function (e, t) {
                            n.check_node(t)
                        })
                    }
                    return delete t.checkbox, this.set_state(t, i), !1
                }
                return s
            }, this.refresh = function (e, t) {
                return this.settings.checkbox.tie_selection || (this._data.checkbox.selected = []), r.refresh.apply(this, arguments)
            }
        }, e.jstree.defaults.conditionalselect = function () {
            return !0
        }, e.jstree.plugins.conditionalselect = function (e, t) {
            this.activate_node = function (e, i) {
                this.settings.conditionalselect.call(this, this.get_node(e), i) && t.activate_node.call(this, e, i)
            }
        }, e.jstree.defaults.contextmenu = {
            select_node: !0, show_at_node: !0, items: function (t, i) {
                return {
                    create: {
                        separator_before: !1,
                        separator_after: !0,
                        _disabled: !1,
                        label: "Create",
                        action: function (t) {
                            var i = e.jstree.reference(t.reference), r = i.get_node(t.reference);
                            i.create_node(r, {}, "last", function (e) {
                                setTimeout(function () {
                                    i.edit(e)
                                }, 0)
                            })
                        }
                    },
                    rename: {
                        separator_before: !1,
                        separator_after: !1,
                        _disabled: !1,
                        label: "Rename",
                        action: function (t) {
                            var i = e.jstree.reference(t.reference), r = i.get_node(t.reference);
                            i.edit(r)
                        }
                    },
                    remove: {
                        separator_before: !1,
                        icon: !1,
                        separator_after: !1,
                        _disabled: !1,
                        label: "Delete",
                        action: function (t) {
                            var i = e.jstree.reference(t.reference), r = i.get_node(t.reference);
                            i.is_selected(r) ? i.delete_node(i.get_selected()) : i.delete_node(r)
                        }
                    },
                    ccp: {
                        separator_before: !0,
                        icon: !1,
                        separator_after: !1,
                        label: "Edit",
                        action: !1,
                        submenu: {
                            cut: {
                                separator_before: !1, separator_after: !1, label: "Cut", action: function (t) {
                                    var i = e.jstree.reference(t.reference), r = i.get_node(t.reference);
                                    i.is_selected(r) ? i.cut(i.get_top_selected()) : i.cut(r)
                                }
                            }, copy: {
                                separator_before: !1,
                                icon: !1,
                                separator_after: !1,
                                label: "Copy",
                                action: function (t) {
                                    var i = e.jstree.reference(t.reference), r = i.get_node(t.reference);
                                    i.is_selected(r) ? i.copy(i.get_top_selected()) : i.copy(r)
                                }
                            }, paste: {
                                separator_before: !1, icon: !1, _disabled: function (t) {
                                    return !e.jstree.reference(t.reference).can_paste()
                                }, separator_after: !1, label: "Paste", action: function (t) {
                                    var i = e.jstree.reference(t.reference), r = i.get_node(t.reference);
                                    i.paste(r)
                                }
                            }
                        }
                    }
                }
            }
        }, e.jstree.plugins.contextmenu = function (i, r) {
            this.bind = function () {
                r.bind.call(this);
                var t, i, s = 0, n = null;
                this.element.on("contextmenu.jstree", ".jstree-anchor", e.proxy(function (e, t) {
                    e.preventDefault(), s = e.ctrlKey ? +new Date : 0, (t || n) && (s = +new Date + 1e4), n && clearTimeout(n), this.is_loading(e.currentTarget) || this.show_contextmenu(e.currentTarget, e.pageX, e.pageY, e)
                }, this)).on("click.jstree", ".jstree-anchor", e.proxy(function (t) {
                    this._data.contextmenu.visible && (!s || +new Date - s > 250) && e.vakata.context.hide(), s = 0
                }, this)).on("touchstart.jstree", ".jstree-anchor", function (r) {
                    r.originalEvent && r.originalEvent.changedTouches && r.originalEvent.changedTouches[0] && (t = r.pageX, i = r.pageY, n = setTimeout(function () {
                        e(r.currentTarget).trigger("contextmenu", !0)
                    }, 750))
                }).on("touchmove.vakata.jstree", function (e) {
                    n && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0] && (Math.abs(t - e.pageX) > 50 || Math.abs(i - e.pageY) > 50) && clearTimeout(n)
                }).on("touchend.vakata.jstree", function (e) {
                    n && clearTimeout(n)
                }), e(l).on("context_hide.vakata.jstree", e.proxy(function () {
                    this._data.contextmenu.visible = !1
                }, this))
            }, this.teardown = function () {
                this._data.contextmenu.visible && e.vakata.context.hide(), r.teardown.call(this)
            }, this.show_contextmenu = function (i, r, s, n) {
                if (i = this.get_node(i), !i || i.id === e.jstree.root)return !1;
                var a = this.settings.contextmenu, o = this.get_node(i, !0), d = o.children(".jstree-anchor"), c = !1, l = !1;
                (a.show_at_node || r === t || s === t) && (c = d.offset(), r = c.left, s = c.top + this._data.core.li_height), this.settings.contextmenu.select_node && !this.is_selected(i) && this.activate_node(i, n), l = a.items, e.isFunction(l) && (l = l.call(this, i, e.proxy(function (e) {
                    this._show_contextmenu(i, r, s, e)
                }, this))), e.isPlainObject(l) && this._show_contextmenu(i, r, s, l)
            }, this._show_contextmenu = function (t, i, r, s) {
                var n = this.get_node(t, !0), a = n.children(".jstree-anchor");
                e(l).one("context_show.vakata.jstree", e.proxy(function (t, i) {
                    var r = "jstree-contextmenu jstree-" + this.get_theme() + "-contextmenu";
                    e(i.element).addClass(r)
                }, this)), this._data.contextmenu.visible = !0, e.vakata.context.show(a, {
                    x: i,
                    y: r
                }, s), this.trigger("show_contextmenu", {node: t, x: i, y: r})
            }
        }, function (e) {
            var t = !1, i = {
                element: !1,
                reference: !1,
                position_x: 0,
                position_y: 0,
                items: [],
                html: "",
                is_visible: !1
            };
            e.vakata.context = {
                settings: {hide_onmouseleave: 0, icons: !0}, _trigger: function (t) {
                    e(l).triggerHandler("context_" + t + ".vakata", {
                        reference: i.reference,
                        element: i.element,
                        position: {x: i.position_x, y: i.position_y}
                    })
                }, _execute: function (t) {
                    return t = i.items[t], t && (!t._disabled || e.isFunction(t._disabled) && !t._disabled({
                        item: t,
                        reference: i.reference,
                        element: i.element
                    })) && t.action ? t.action.call(null, {
                        item: t,
                        reference: i.reference,
                        element: i.element,
                        position: {x: i.position_x, y: i.position_y}
                    }) : !1
                }, _parse: function (t, r) {
                    if (!t)return !1;
                    r || (i.html = "", i.items = []);
                    var s, n = "", a = !1;
                    return r && (n += "<ul>"), e.each(t, function (t, r) {
                        return r ? (i.items.push(r), !a && r.separator_before && (n += "<li class='vakata-context-separator'><a href='#' " + (e.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;</a></li>"), a = !1, n += "<li class='" + (r._class || "") + (r._disabled === !0 || e.isFunction(r._disabled) && r._disabled({
                                item: r,
                                reference: i.reference,
                                element: i.element
                            }) ? " vakata-contextmenu-disabled " : "") + "' " + (r.shortcut ? " data-shortcut='" + r.shortcut + "' " : "") + ">", n += "<a href='#' rel='" + (i.items.length - 1) + "'>", e.vakata.context.settings.icons && (n += "<i ", r.icon && (n += -1 !== r.icon.indexOf("/") || -1 !== r.icon.indexOf(".") ? " style='background:url(\"" + r.icon + "\") center center no-repeat' " : " class='" + r.icon + "' "), n += "></i><span class='vakata-contextmenu-sep'>&#160;</span>"), n += (e.isFunction(r.label) ? r.label({
                                item: t,
                                reference: i.reference,
                                element: i.element
                            }) : r.label) + (r.shortcut ? ' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-' + r.shortcut + '">' + (r.shortcut_label || "") + "</span>" : "") + "</a>", r.submenu && (s = e.vakata.context._parse(r.submenu, !0), s && (n += s)), n += "</li>", void(r.separator_after && (n += "<li class='vakata-context-separator'><a href='#' " + (e.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;</a></li>", a = !0))) : !0
                    }), n = n.replace(/<li class\='vakata-context-separator'\><\/li\>$/, ""), r && (n += "</ul>"), r || (i.html = n, e.vakata.context._trigger("parse")), n.length > 10 ? n : !1
                }, _show_submenu: function (i) {
                    if (i = e(i), i.length && i.children("ul").length) {
                        var r = i.children("ul"), s = i.offset().left + i.outerWidth(), n = i.offset().top, a = r.width(), o = r.height(), d = e(window).width() + e(window).scrollLeft(), c = e(window).height() + e(window).scrollTop();
                        t ? i[s - (a + 10 + i.outerWidth()) < 0 ? "addClass" : "removeClass"]("vakata-context-left") : i[s + a + 10 > d ? "addClass" : "removeClass"]("vakata-context-right"), n + o + 10 > c && r.css("bottom", "-1px"), r.show()
                    }
                }, show: function (r, s, n) {
                    var a, o, d, c, l, h, _, u, g = !0;
                    switch (i.element && i.element.length && i.element.width(""), g) {
                        case!s && !r:
                            return !1;
                        case!!s && !!r:
                            i.reference = r, i.position_x = s.x, i.position_y = s.y;
                            break;
                        case!s && !!r:
                            i.reference = r, a = r.offset(), i.position_x = a.left + r.outerHeight(), i.position_y = a.top;
                            break;
                        case!!s && !r:
                            i.position_x = s.x, i.position_y = s.y
                    }
                    r && !n && e(r).data("vakata_contextmenu") && (n = e(r).data("vakata_contextmenu")), e.vakata.context._parse(n) && i.element.html(i.html), i.items.length && (i.element.appendTo("body"), o = i.element, d = i.position_x, c = i.position_y, l = o.width(), h = o.height(), _ = e(window).width() + e(window).scrollLeft(), u = e(window).height() + e(window).scrollTop(), t && (d -= o.outerWidth() - e(r).outerWidth(), d < e(window).scrollLeft() + 20 && (d = e(window).scrollLeft() + 20)), d + l + 20 > _ && (d = _ - (l + 20)), c + h + 20 > u && (c = u - (h + 20)), i.element.css({
                        left: d,
                        top: c
                    }).show().find("a").first().focus().parent().addClass("vakata-context-hover"), i.is_visible = !0, e.vakata.context._trigger("show"))
                }, hide: function () {
                    i.is_visible && (i.element.hide().find("ul").hide().end().find(":focus").blur().end().detach(), i.is_visible = !1, e.vakata.context._trigger("hide"))
                }
            }, e(function () {
                t = "rtl" === e("body").css("direction");
                var r = !1;
                i.element = e("<ul class='vakata-context'></ul>"), i.element.on("mouseenter", "li", function (t) {
                    t.stopImmediatePropagation(), e.contains(this, t.relatedTarget) || (r && clearTimeout(r), i.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end(), e(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover"), e.vakata.context._show_submenu(this))
                }).on("mouseleave", "li", function (t) {
                    e.contains(this, t.relatedTarget) || e(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")
                }).on("mouseleave", function (t) {
                    e(this).find(".vakata-context-hover").removeClass("vakata-context-hover"), e.vakata.context.settings.hide_onmouseleave && (r = setTimeout(function (t) {
                        return function () {
                            e.vakata.context.hide()
                        }
                    }(this), e.vakata.context.settings.hide_onmouseleave))
                }).on("click", "a", function (t) {
                    t.preventDefault(), e(this).blur().parent().hasClass("vakata-context-disabled") || e.vakata.context._execute(e(this).attr("rel")) === !1 || e.vakata.context.hide()
                }).on("keydown", "a", function (t) {
                    var r = null;
                    switch (t.which) {
                        case 13:
                        case 32:
                            t.type = "mouseup", t.preventDefault(), e(t.currentTarget).trigger(t);
                            break;
                        case 37:
                            i.is_visible && (i.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 38:
                            i.is_visible && (r = i.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first(), r.length || (r = i.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()), r.addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 39:
                            i.is_visible && (i.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 40:
                            i.is_visible && (r = i.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first(), r.length || (r = i.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()), r.addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 27:
                            e.vakata.context.hide(), t.preventDefault()
                    }
                }).on("keydown", function (e) {
                    e.preventDefault();
                    var t = i.element.find(".vakata-contextmenu-shortcut-" + e.which).parent();
                    t.parent().not(".vakata-context-disabled") && t.click()
                }), e(l).on("mousedown.vakata.jstree", function (t) {
                    i.is_visible && !e.contains(i.element[0], t.target) && e.vakata.context.hide()
                }).on("context_show.vakata.jstree", function (e, r) {
                    i.element.find("li:has(ul)").children("a").addClass("vakata-context-parent"), t && i.element.addClass("vakata-context-rtl").css("direction", "rtl"), i.element.find("ul").hide().end()
                })
            })
        }(e), e.jstree.defaults.dnd = {
            copy: !0,
            open_timeout: 500,
            is_draggable: !0,
            check_while_dragging: !0,
            always_copy: !1,
            inside_pos: 0,
            drag_selection: !0,
            touch: !0,
            large_drop_target: !1,
            large_drag_target: !1
        }, e.jstree.plugins.dnd = function (t, i) {
            this.bind = function () {
                i.bind.call(this), this.element.on("mousedown.jstree touchstart.jstree", this.settings.dnd.large_drag_target ? ".jstree-node" : ".jstree-anchor", e.proxy(function (t) {
                    if (this.settings.dnd.large_drag_target && e(t.target).closest(".jstree-node")[0] !== t.currentTarget)return !0;
                    if ("touchstart" === t.type && (!this.settings.dnd.touch || "selected" === this.settings.dnd.touch && !e(t.currentTarget).closest(".jstree-node").children(".jstree-anchor").hasClass("jstree-clicked")))return !0;
                    var i = this.get_node(t.target), r = this.is_selected(i) && this.settings.dnd.drag_selection ? this.get_top_selected().length : 1, s = r > 1 ? r + " " + this.get_string("nodes") : this.get_text(t.currentTarget);
                    return this.settings.core.force_text && (s = e.vakata.html.escape(s)), i && i.id && i.id !== e.jstree.root && (1 === t.which || "touchstart" === t.type) && (this.settings.dnd.is_draggable === !0 || e.isFunction(this.settings.dnd.is_draggable) && this.settings.dnd.is_draggable.call(this, r > 1 ? this.get_top_selected(!0) : [i], t)) ? (this.element.trigger("mousedown.jstree"), e.vakata.dnd.start(t, {
                        jstree: !0,
                        origin: this,
                        obj: this.get_node(i, !0),
                        nodes: r > 1 ? this.get_top_selected() : [i.id]
                    }, '<div id="jstree-dnd" class="jstree-' + this.get_theme() + " jstree-" + this.get_theme() + "-" + this.get_theme_variant() + " " + (this.settings.core.themes.responsive ? " jstree-dnd-responsive" : "") + '"><i class="jstree-icon jstree-er"></i>' + s + '<ins class="jstree-copy" style="display:none;">+</ins></div>')) : void 0
                }, this))
            }
        }, e(function () {
            var t = !1, i = !1, r = !1, s = !1, n = e('<div id="jstree-marker">&#160;</div>').hide();
            e(l).on("dnd_start.vakata.jstree", function (e, i) {
                t = !1, r = !1, i && i.data && i.data.jstree && n.appendTo("body")
            }).on("dnd_move.vakata.jstree", function (a, o) {
                if (s && clearTimeout(s), o && o.data && o.data.jstree && (!o.event.target.id || "jstree-marker" !== o.event.target.id)) {
                    r = o.event;
                    var d, c, l, h, _, u, g, f, p, m, v, j, y, k, x = e.jstree.reference(o.event.target), b = !1, w = !1, C = !1;
                    if (x && x._data && x._data.dnd)if (n.attr("class", "jstree-" + x.get_theme() + (x.settings.core.themes.responsive ? " jstree-dnd-responsive" : "")), o.helper.children().attr("class", "jstree-" + x.get_theme() + " jstree-" + x.get_theme() + "-" + x.get_theme_variant() + " " + (x.settings.core.themes.responsive ? " jstree-dnd-responsive" : "")).find(".jstree-copy").first()[o.data.origin && (o.data.origin.settings.dnd.always_copy || o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey)) ? "show" : "hide"](), o.event.target !== x.element[0] && o.event.target !== x.get_container_ul()[0] || 0 !== x.get_container_ul().children().length) {
                        if (b = x.settings.dnd.large_drop_target ? e(o.event.target).closest(".jstree-node").children(".jstree-anchor") : e(o.event.target).closest(".jstree-anchor"), b && b.length && b.parent().is(".jstree-closed, .jstree-open, .jstree-leaf") && (w = b.offset(), C = o.event.pageY - w.top, l = b.outerHeight(), u = l / 3 > C ? ["b", "i", "a"] : C > l - l / 3 ? ["a", "i", "b"] : C > l / 2 ? ["i", "a", "b"] : ["i", "b", "a"], e.each(u, function (r, a) {
                                switch (a) {
                                    case"b":
                                        d = w.left - 6, c = w.top, h = x.get_parent(b), _ = b.parent().index();
                                        break;
                                    case"i":
                                        y = x.settings.dnd.inside_pos, k = x.get_node(b.parent()), d = w.left - 2, c = w.top + l / 2 + 1, h = k.id, _ = "first" === y ? 0 : "last" === y ? k.children.length : Math.min(y, k.children.length);
                                        break;
                                    case"a":
                                        d = w.left - 6, c = w.top + l, h = x.get_parent(b), _ = b.parent().index() + 1
                                }
                                for (g = !0, f = 0, p = o.data.nodes.length; p > f; f++)if (m = o.data.origin && (o.data.origin.settings.dnd.always_copy || o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey)) ? "copy_node" : "move_node", v = _, "move_node" === m && "a" === a && o.data.origin && o.data.origin === x && h === x.get_parent(o.data.nodes[f]) && (j = x.get_node(h), v > e.inArray(o.data.nodes[f], j.children) && (v -= 1)), g = g && (x && x.settings && x.settings.dnd && x.settings.dnd.check_while_dragging === !1 || x.check(m, o.data.origin && o.data.origin !== x ? o.data.origin.get_node(o.data.nodes[f]) : o.data.nodes[f], h, v, {
                                            dnd: !0,
                                            ref: x.get_node(b.parent()),
                                            pos: a,
                                            origin: o.data.origin,
                                            is_multi: o.data.origin && o.data.origin !== x,
                                            is_foreign: !o.data.origin
                                        })), !g) {
                                    x && x.last_error && (i = x.last_error());
                                    break
                                }
                                return "i" === a && b.parent().is(".jstree-closed") && x.settings.dnd.open_timeout && (s = setTimeout(function (e, t) {
                                    return function () {
                                        e.open_node(t)
                                    }
                                }(x, b), x.settings.dnd.open_timeout)), g ? (t = {
                                    ins: x,
                                    par: h,
                                    pos: "i" !== a || "last" !== y || 0 !== _ || x.is_loaded(k) ? _ : "last"
                                }, n.css({
                                    left: d + "px",
                                    top: c + "px"
                                }).show(), o.helper.find(".jstree-icon").first().removeClass("jstree-er").addClass("jstree-ok"), i = {}, u = !0, !1) : void 0
                            }), u === !0))return
                    } else {
                        for (g = !0, f = 0, p = o.data.nodes.length; p > f && (g = g && x.check(o.data.origin && (o.data.origin.settings.dnd.always_copy || o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey)) ? "copy_node" : "move_node", o.data.origin && o.data.origin !== x ? o.data.origin.get_node(o.data.nodes[f]) : o.data.nodes[f], e.jstree.root, "last", {
                                dnd: !0,
                                ref: x.get_node(e.jstree.root),
                                pos: "i",
                                origin: o.data.origin,
                                is_multi: o.data.origin && o.data.origin !== x,
                                is_foreign: !o.data.origin
                            }), g); f++);
                        if (g)return t = {
                            ins: x,
                            par: e.jstree.root,
                            pos: "last"
                        }, n.hide(), void o.helper.find(".jstree-icon").first().removeClass("jstree-er").addClass("jstree-ok")
                    }
                    t = !1, o.helper.find(".jstree-icon").removeClass("jstree-ok").addClass("jstree-er"), n.hide()
                }
            }).on("dnd_scroll.vakata.jstree", function (e, i) {
                i && i.data && i.data.jstree && (n.hide(), t = !1, r = !1, i.helper.find(".jstree-icon").first().removeClass("jstree-ok").addClass("jstree-er"))
            }).on("dnd_stop.vakata.jstree", function (a, o) {
                if (s && clearTimeout(s), o && o.data && o.data.jstree) {
                    n.hide().detach();
                    var d, c, l = [];
                    if (t) {
                        for (d = 0, c = o.data.nodes.length; c > d; d++)l[d] = o.data.origin ? o.data.origin.get_node(o.data.nodes[d]) : o.data.nodes[d];
                        t.ins[o.data.origin && (o.data.origin.settings.dnd.always_copy || o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey)) ? "copy_node" : "move_node"](l, t.par, t.pos, !1, !1, !1, o.data.origin)
                    } else d = e(o.event.target).closest(".jstree"), d.length && i && i.error && "check" === i.error && (d = d.jstree(!0), d && d.settings.core.error.call(this, i));
                    r = !1, t = !1
                }
            }).on("keyup.jstree keydown.jstree", function (t, i) {
                i = e.vakata.dnd._get(), i && i.data && i.data.jstree && (i.helper.find(".jstree-copy").first()[i.data.origin && (i.data.origin.settings.dnd.always_copy || i.data.origin.settings.dnd.copy && (t.metaKey || t.ctrlKey)) ? "show" : "hide"](), r && (r.metaKey = t.metaKey, r.ctrlKey = t.ctrlKey, e.vakata.dnd._trigger("move", r)))
            })
        }), function (e) {
            e.vakata.html = {
                div: e("<div />"), escape: function (t) {
                    return e.vakata.html.div.text(t).html()
                }, strip: function (t) {
                    return e.vakata.html.div.empty().append(e.parseHTML(t)).text()
                }
            };
            var t = {
                element: !1,
                target: !1,
                is_down: !1,
                is_drag: !1,
                helper: !1,
                helper_w: 0,
                data: !1,
                init_x: 0,
                init_y: 0,
                scroll_l: 0,
                scroll_t: 0,
                scroll_e: !1,
                scroll_i: !1,
                is_touch: !1
            };
            e.vakata.dnd = {
                settings: {
                    scroll_speed: 10,
                    scroll_proximity: 20,
                    helper_left: 5,
                    helper_top: 10,
                    threshold: 5,
                    threshold_touch: 50
                }, _trigger: function (t, i) {
                    var r = e.vakata.dnd._get();
                    r.event = i, e(l).triggerHandler("dnd_" + t + ".vakata", r)
                }, _get: function () {
                    return {data: t.data, element: t.element, helper: t.helper}
                }, _clean: function () {
                    t.helper && t.helper.remove(), t.scroll_i && (clearInterval(t.scroll_i), t.scroll_i = !1), t = {
                        element: !1,
                        target: !1,
                        is_down: !1,
                        is_drag: !1,
                        helper: !1,
                        helper_w: 0,
                        data: !1,
                        init_x: 0,
                        init_y: 0,
                        scroll_l: 0,
                        scroll_t: 0,
                        scroll_e: !1,
                        scroll_i: !1,
                        is_touch: !1
                    }, e(l).off("mousemove.vakata.jstree touchmove.vakata.jstree", e.vakata.dnd.drag), e(l).off("mouseup.vakata.jstree touchend.vakata.jstree", e.vakata.dnd.stop)
                }, _scroll: function (i) {
                    if (!t.scroll_e || !t.scroll_l && !t.scroll_t)return t.scroll_i && (clearInterval(t.scroll_i), t.scroll_i = !1), !1;
                    if (!t.scroll_i)return t.scroll_i = setInterval(e.vakata.dnd._scroll, 100), !1;
                    if (i === !0)return !1;
                    var r = t.scroll_e.scrollTop(), s = t.scroll_e.scrollLeft();
                    t.scroll_e.scrollTop(r + t.scroll_t * e.vakata.dnd.settings.scroll_speed), t.scroll_e.scrollLeft(s + t.scroll_l * e.vakata.dnd.settings.scroll_speed), (r !== t.scroll_e.scrollTop() || s !== t.scroll_e.scrollLeft()) && e.vakata.dnd._trigger("scroll", t.scroll_e)
                }, start: function (i, r, s) {
                    "touchstart" === i.type && i.originalEvent && i.originalEvent.changedTouches && i.originalEvent.changedTouches[0] && (i.pageX = i.originalEvent.changedTouches[0].pageX, i.pageY = i.originalEvent.changedTouches[0].pageY, i.target = l.elementFromPoint(i.originalEvent.changedTouches[0].pageX - window.pageXOffset, i.originalEvent.changedTouches[0].pageY - window.pageYOffset)), t.is_drag && e.vakata.dnd.stop({});
                    try {
                        i.currentTarget.unselectable = "on", i.currentTarget.onselectstart = function () {
                            return !1
                        }, i.currentTarget.style && (i.currentTarget.style.MozUserSelect = "none")
                    } catch (n) {
                    }
                    return t.init_x = i.pageX, t.init_y = i.pageY, t.data = r, t.is_down = !0, t.element = i.currentTarget, t.target = i.target, t.is_touch = "touchstart" === i.type, s !== !1 && (t.helper = e("<div id='vakata-dnd'></div>").html(s).css({
                        display: "block",
                        margin: "0",
                        padding: "0",
                        position: "absolute",
                        top: "-2000px",
                        lineHeight: "16px",
                        zIndex: "10000"
                    })), e(l).on("mousemove.vakata.jstree touchmove.vakata.jstree", e.vakata.dnd.drag), e(l).on("mouseup.vakata.jstree touchend.vakata.jstree", e.vakata.dnd.stop), !1
                }, drag: function (i) {
                    if ("touchmove" === i.type && i.originalEvent && i.originalEvent.changedTouches && i.originalEvent.changedTouches[0] && (i.pageX = i.originalEvent.changedTouches[0].pageX, i.pageY = i.originalEvent.changedTouches[0].pageY, i.target = l.elementFromPoint(i.originalEvent.changedTouches[0].pageX - window.pageXOffset, i.originalEvent.changedTouches[0].pageY - window.pageYOffset)), t.is_down) {
                        if (!t.is_drag) {
                            if (!(Math.abs(i.pageX - t.init_x) > (t.is_touch ? e.vakata.dnd.settings.threshold_touch : e.vakata.dnd.settings.threshold) || Math.abs(i.pageY - t.init_y) > (t.is_touch ? e.vakata.dnd.settings.threshold_touch : e.vakata.dnd.settings.threshold)))return;
                            t.helper && (t.helper.appendTo("body"), t.helper_w = t.helper.outerWidth()), t.is_drag = !0, e.vakata.dnd._trigger("start", i)
                        }
                        var r = !1, s = !1, n = !1, a = !1, o = !1, d = !1, c = !1, h = !1, _ = !1, u = !1;
                        return t.scroll_t = 0, t.scroll_l = 0, t.scroll_e = !1, e(e(i.target).parentsUntil("body").addBack().get().reverse()).filter(function () {
                            return /^auto|scroll$/.test(e(this).css("overflow")) && (this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth)
                        }).each(function () {
                            var r = e(this), s = r.offset();
                            return this.scrollHeight > this.offsetHeight && (s.top + r.height() - i.pageY < e.vakata.dnd.settings.scroll_proximity && (t.scroll_t = 1), i.pageY - s.top < e.vakata.dnd.settings.scroll_proximity && (t.scroll_t = -1)), this.scrollWidth > this.offsetWidth && (s.left + r.width() - i.pageX < e.vakata.dnd.settings.scroll_proximity && (t.scroll_l = 1), i.pageX - s.left < e.vakata.dnd.settings.scroll_proximity && (t.scroll_l = -1)), t.scroll_t || t.scroll_l ? (t.scroll_e = e(this), !1) : void 0
                        }), t.scroll_e || (r = e(l), s = e(window), n = r.height(), a = s.height(), o = r.width(), d = s.width(), c = r.scrollTop(), h = r.scrollLeft(), n > a && i.pageY - c < e.vakata.dnd.settings.scroll_proximity && (t.scroll_t = -1), n > a && a - (i.pageY - c) < e.vakata.dnd.settings.scroll_proximity && (t.scroll_t = 1), o > d && i.pageX - h < e.vakata.dnd.settings.scroll_proximity && (t.scroll_l = -1), o > d && d - (i.pageX - h) < e.vakata.dnd.settings.scroll_proximity && (t.scroll_l = 1), (t.scroll_t || t.scroll_l) && (t.scroll_e = r)), t.scroll_e && e.vakata.dnd._scroll(!0), t.helper && (_ = parseInt(i.pageY + e.vakata.dnd.settings.helper_top, 10), u = parseInt(i.pageX + e.vakata.dnd.settings.helper_left, 10), n && _ + 25 > n && (_ = n - 50), o && u + t.helper_w > o && (u = o - (t.helper_w + 2)), t.helper.css({
                            left: u + "px",
                            top: _ + "px"
                        })), e.vakata.dnd._trigger("move", i), !1
                    }
                }, stop: function (i) {
                    if ("touchend" === i.type && i.originalEvent && i.originalEvent.changedTouches && i.originalEvent.changedTouches[0] && (i.pageX = i.originalEvent.changedTouches[0].pageX, i.pageY = i.originalEvent.changedTouches[0].pageY, i.target = l.elementFromPoint(i.originalEvent.changedTouches[0].pageX - window.pageXOffset, i.originalEvent.changedTouches[0].pageY - window.pageYOffset)), t.is_drag)e.vakata.dnd._trigger("stop", i); else if ("touchend" === i.type && i.target === t.target) {
                        var r = setTimeout(function () {
                            e(i.target).click()
                        }, 100);
                        e(i.target).one("click", function () {
                            r && clearTimeout(r)
                        })
                    }
                    return e.vakata.dnd._clean(), !1
                }
            }
        }(e), e.jstree.defaults.massload = null, e.jstree.plugins.massload = function (t, i) {
            this.init = function (e, t) {
                i.init.call(this, e, t), this._data.massload = {}
            }, this._load_nodes = function (t, r, s) {
                var n = this.settings.massload;
                return s && !e.isEmptyObject(this._data.massload) ? i._load_nodes.call(this, t, r, s) : e.isFunction(n) ? n.call(this, t, e.proxy(function (e) {
                    if (e)for (var n in e)e.hasOwnProperty(n) && (this._data.massload[n] = e[n]);
                    i._load_nodes.call(this, t, r, s)
                }, this)) : "object" == typeof n && n && n.url ? (n = e.extend(!0, {}, n), e.isFunction(n.url) && (n.url = n.url.call(this, t)), e.isFunction(n.data) && (n.data = n.data.call(this, t)), e.ajax(n).done(e.proxy(function (e, n, a) {
                    if (e)for (var o in e)e.hasOwnProperty(o) && (this._data.massload[o] = e[o]);
                    i._load_nodes.call(this, t, r, s)
                }, this)).fail(e.proxy(function (e) {
                    i._load_nodes.call(this, t, r, s)
                }, this))) : i._load_nodes.call(this, t, r, s)
            }, this._load_node = function (t, r) {
                var s = this._data.massload[t.id];
                return s ? this["string" == typeof s ? "_append_html_data" : "_append_json_data"](t, "string" == typeof s ? e(e.parseHTML(s)).filter(function () {
                    return 3 !== this.nodeType
                }) : s, function (e) {
                    r.call(this, e), delete this._data.massload[t.id]
                }) : i._load_node.call(this, t, r)
            }
        }, e.jstree.defaults.search = {
            ajax: !1,
            fuzzy: !1,
            case_sensitive: !1,
            show_only_matches: !1,
            show_only_matches_children: !1,
            close_opened_onclear: !0,
            search_leaves_only: !1,
            search_callback: !1
        }, e.jstree.plugins.search = function (i, r) {
            this.bind = function () {
                r.bind.call(this), this._data.search.str = "", this._data.search.dom = e(), this._data.search.res = [], this._data.search.opn = [], this._data.search.som = !1, this._data.search.smc = !1, this._data.search.hdn = [], this.element.on("search.jstree", e.proxy(function (t, i) {
                    if (this._data.search.som && i.res.length) {
                        var r, s, n = this._model.data, a = [];
                        for (r = 0, s = i.res.length; s > r; r++)n[i.res[r]] && !n[i.res[r]].state.hidden && (a.push(i.res[r]), a = a.concat(n[i.res[r]].parents), this._data.search.smc && (a = a.concat(n[i.res[r]].children_d)));
                        a = e.vakata.array_remove_item(e.vakata.array_unique(a), e.jstree.root), this._data.search.hdn = this.hide_all(!0), this.show_node(a)
                    }
                }, this)).on("clear_search.jstree", e.proxy(function (e, t) {
                    this._data.search.som && t.res.length && this.show_node(this._data.search.hdn)
                }, this))
            }, this.search = function (i, r, s, n, a, o) {
                if (i === !1 || "" === e.trim(i.toString()))return this.clear_search();
                n = this.get_node(n), n = n && n.id ? n.id : null, i = i.toString();
                var d, c, l = this.settings.search, h = l.ajax ? l.ajax : !1, _ = this._model.data, u = null, g = [], f = [];
                if (this._data.search.res.length && !a && this.clear_search(), s === t && (s = l.show_only_matches), o === t && (o = l.show_only_matches_children), !r && h !== !1)return e.isFunction(h) ? h.call(this, i, e.proxy(function (t) {
                    t && t.d && (t = t.d), this._load_nodes(e.isArray(t) ? e.vakata.array_unique(t) : [], function () {
                        this.search(i, !0, s, n, a)
                    }, !0)
                }, this), n) : (h = e.extend({}, h), h.data || (h.data = {}), h.data.str = i, n && (h.data.inside = n), e.ajax(h).fail(e.proxy(function () {
                    this._data.core.last_error = {
                        error: "ajax",
                        plugin: "search",
                        id: "search_01",
                        reason: "Could not load search parents",
                        data: JSON.stringify(h)
                    }, this.settings.core.error.call(this, this._data.core.last_error)
                }, this)).done(e.proxy(function (t) {
                    t && t.d && (t = t.d), this._load_nodes(e.isArray(t) ? e.vakata.array_unique(t) : [], function () {
                        this.search(i, !0, s, n, a)
                    }, !0)
                }, this)));
                if (a || (this._data.search.str = i, this._data.search.dom = e(), this._data.search.res = [], this._data.search.opn = [], this._data.search.som = s, this._data.search.smc = o), u = new e.vakata.search(i, !0, {
                        caseSensitive: l.case_sensitive,
                        fuzzy: l.fuzzy
                    }), e.each(_[n ? n : e.jstree.root].children_d, function (e, t) {
                        var r = _[t];
                        r.text && (!l.search_leaves_only || r.state.loaded && 0 === r.children.length) && (l.search_callback && l.search_callback.call(this, i, r) || !l.search_callback && u.search(r.text).isMatch) && (g.push(t), f = f.concat(r.parents))
                    }), g.length) {
                    for (f = e.vakata.array_unique(f), d = 0, c = f.length; c > d; d++)f[d] !== e.jstree.root && _[f[d]] && this.open_node(f[d], null, 0) === !0 && this._data.search.opn.push(f[d]);
                    a ? (this._data.search.dom = this._data.search.dom.add(e(this.element[0].querySelectorAll("#" + e.map(g, function (t) {
                            return -1 !== "0123456789".indexOf(t[0]) ? "\\3" + t[0] + " " + t.substr(1).replace(e.jstree.idregex, "\\$&") : t.replace(e.jstree.idregex, "\\$&")
                        }).join(", #")))), this._data.search.res = e.vakata.array_unique(this._data.search.res.concat(g))) : (this._data.search.dom = e(this.element[0].querySelectorAll("#" + e.map(g, function (t) {
                            return -1 !== "0123456789".indexOf(t[0]) ? "\\3" + t[0] + " " + t.substr(1).replace(e.jstree.idregex, "\\$&") : t.replace(e.jstree.idregex, "\\$&")
                        }).join(", #"))), this._data.search.res = g), this._data.search.dom.children(".jstree-anchor").addClass("jstree-search")
                }
                this.trigger("search", {
                    nodes: this._data.search.dom,
                    str: i,
                    res: this._data.search.res,
                    show_only_matches: s
                })
            }, this.clear_search = function () {
                this.settings.search.close_opened_onclear && this.close_node(this._data.search.opn, 0), this.trigger("clear_search", {
                    nodes: this._data.search.dom,
                    str: this._data.search.str,
                    res: this._data.search.res
                }), this._data.search.res.length && (this._data.search.dom = e(this.element[0].querySelectorAll("#" + e.map(this._data.search.res, function (t) {
                        return -1 !== "0123456789".indexOf(t[0]) ? "\\3" + t[0] + " " + t.substr(1).replace(e.jstree.idregex, "\\$&") : t.replace(e.jstree.idregex, "\\$&")
                    }).join(", #"))), this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search")), this._data.search.str = "", this._data.search.res = [], this._data.search.opn = [], this._data.search.dom = e()
            }, this.redraw_node = function (t, i, s, n) {
                if (t = r.redraw_node.apply(this, arguments), t && -1 !== e.inArray(t.id, this._data.search.res)) {
                    var a, o, d = null;
                    for (a = 0, o = t.childNodes.length; o > a; a++)if (t.childNodes[a] && t.childNodes[a].className && -1 !== t.childNodes[a].className.indexOf("jstree-anchor")) {
                        d = t.childNodes[a];
                        break
                    }
                    d && (d.className += " jstree-search")
                }
                return t
            }
        }, function (e) {
            e.vakata.search = function (t, i, r) {
                r = r || {}, r = e.extend({}, e.vakata.search.defaults, r), r.fuzzy !== !1 && (r.fuzzy = !0), t = r.caseSensitive ? t : t.toLowerCase();
                var s, n, a, o, d = r.location, c = r.distance, l = r.threshold, h = t.length;
                return h > 32 && (r.fuzzy = !1), r.fuzzy && (s = 1 << h - 1, n = function () {
                    var e = {}, i = 0;
                    for (i = 0; h > i; i++)e[t.charAt(i)] = 0;
                    for (i = 0; h > i; i++)e[t.charAt(i)] |= 1 << h - i - 1;
                    return e
                }(), a = function (e, t) {
                    var i = e / h, r = Math.abs(d - t);
                    return c ? i + r / c : r ? 1 : i
                }), o = function (e) {
                    if (e = r.caseSensitive ? e : e.toLowerCase(), t === e || -1 !== e.indexOf(t))return {
                        isMatch: !0,
                        score: 0
                    };
                    if (!r.fuzzy)return {isMatch: !1, score: 1};
                    var i, o, c, _, u, g, f, p, m, v = e.length, j = l, y = e.indexOf(t, d), k = h + v, x = 1, b = [];
                    for (-1 !== y && (j = Math.min(a(0, y), j), y = e.lastIndexOf(t, d + h), -1 !== y && (j = Math.min(a(0, y), j))), y = -1, i = 0; h > i; i++) {
                        for (c = 0, _ = k; _ > c;)a(i, d + _) <= j ? c = _ : k = _, _ = Math.floor((k - c) / 2 + c);
                        for (k = _, g = Math.max(1, d - _ + 1), f = Math.min(d + _, v) + h, p = new Array(f + 2), p[f + 1] = (1 << i) - 1, o = f; o >= g; o--)if (m = n[e.charAt(o - 1)], 0 === i ? p[o] = (p[o + 1] << 1 | 1) & m : p[o] = (p[o + 1] << 1 | 1) & m | ((u[o + 1] | u[o]) << 1 | 1) | u[o + 1], p[o] & s && (x = a(i, o - 1), j >= x)) {
                            if (j = x, y = o - 1, b.push(y), !(y > d))break;
                            g = Math.max(1, 2 * d - y)
                        }
                        if (a(i + 1, d) > j)break;
                        u = p
                    }
                    return {isMatch: y >= 0, score: x}
                }, i === !0 ? {search: o} : o(i)
            }, e.vakata.search.defaults = {location: 0, distance: 100, threshold: .6, fuzzy: !1, caseSensitive: !1}
        }(e), e.jstree.defaults.sort = function (e, t) {
            return this.get_text(e) > this.get_text(t) ? 1 : -1
        }, e.jstree.plugins.sort = function (t, i) {
            this.bind = function () {
                i.bind.call(this), this.element.on("model.jstree", e.proxy(function (e, t) {
                    this.sort(t.parent, !0)
                }, this)).on("rename_node.jstree create_node.jstree", e.proxy(function (e, t) {
                    this.sort(t.parent || t.node.parent, !1), this.redraw_node(t.parent || t.node.parent, !0)
                }, this)).on("move_node.jstree copy_node.jstree", e.proxy(function (e, t) {
                    this.sort(t.parent, !1), this.redraw_node(t.parent, !0)
                }, this))
            }, this.sort = function (t, i) {
                var r, s;
                if (t = this.get_node(t), t && t.children && t.children.length && (t.children.sort(e.proxy(this.settings.sort, this)), i))for (r = 0, s = t.children_d.length; s > r; r++)this.sort(t.children_d[r], !1)
            }
        };
        var u = !1;
        e.jstree.defaults.state = {
            key: "jstree",
            events: "changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree",
            ttl: !1,
            filter: !1
        }, e.jstree.plugins.state = function (t, i) {
            this.bind = function () {
                i.bind.call(this);
                var t = e.proxy(function () {
                    this.element.on(this.settings.state.events, e.proxy(function () {
                        u && clearTimeout(u), u = setTimeout(e.proxy(function () {
                            this.save_state()
                        }, this), 100)
                    }, this)), this.trigger("state_ready")
                }, this);
                this.element.on("ready.jstree", e.proxy(function (e, i) {
                    this.element.one("restore_state.jstree", t), this.restore_state() || t()
                }, this))
            }, this.save_state = function () {
                var t = {state: this.get_state(), ttl: this.settings.state.ttl, sec: +new Date};
                e.vakata.storage.set(this.settings.state.key, JSON.stringify(t))
            }, this.restore_state = function () {
                var t = e.vakata.storage.get(this.settings.state.key);
                if (t)try {
                    t = JSON.parse(t)
                } catch (i) {
                    return !1
                }
                return t && t.ttl && t.sec && +new Date - t.sec > t.ttl ? !1 : (t && t.state && (t = t.state), t && e.isFunction(this.settings.state.filter) && (t = this.settings.state.filter.call(this, t)), t ? (this.element.one("set_state.jstree", function (i, r) {
                    r.instance.trigger("restore_state", {state: e.extend(!0, {}, t)})
                }), this.set_state(t), !0) : !1)
            }, this.clear_state = function () {
                return e.vakata.storage.del(this.settings.state.key)
            }
        }, function (e, t) {
            e.vakata.storage = {
                set: function (e, t) {
                    return window.localStorage.setItem(e, t)
                }, get: function (e) {
                    return window.localStorage.getItem(e)
                }, del: function (e) {
                    return window.localStorage.removeItem(e)
                }
            }
        }(e), e.jstree.defaults.types = {"default": {}}, e.jstree.defaults.types[e.jstree.root] = {}, e.jstree.plugins.types = function (i, r) {
            this.init = function (i, s) {
                var n, a;
                if (s && s.types && s.types["default"])for (n in s.types)if ("default" !== n && n !== e.jstree.root && s.types.hasOwnProperty(n))for (a in s.types["default"])s.types["default"].hasOwnProperty(a) && s.types[n][a] === t && (s.types[n][a] = s.types["default"][a]);
                r.init.call(this, i, s), this._model.data[e.jstree.root].type = e.jstree.root
            }, this.refresh = function (t, i) {
                r.refresh.call(this, t, i), this._model.data[e.jstree.root].type = e.jstree.root
            }, this.bind = function () {
                this.element.on("model.jstree", e.proxy(function (i, r) {
                    var s, n, a = this._model.data, o = r.nodes, d = this.settings.types, c = "default";
                    for (s = 0, n = o.length; n > s; s++)c = "default", a[o[s]].original && a[o[s]].original.type && d[a[o[s]].original.type] && (c = a[o[s]].original.type), a[o[s]].data && a[o[s]].data.jstree && a[o[s]].data.jstree.type && d[a[o[s]].data.jstree.type] && (c = a[o[s]].data.jstree.type), a[o[s]].type = c, a[o[s]].icon === !0 && d[c].icon !== t && (a[o[s]].icon = d[c].icon);
                    a[e.jstree.root].type = e.jstree.root
                }, this)), r.bind.call(this)
            }, this.get_json = function (t, i, s) {
                var n, a, o = this._model.data, d = i ? e.extend(!0, {}, i, {no_id: !1}) : {}, c = r.get_json.call(this, t, d, s);
                if (c === !1)return !1;
                if (e.isArray(c))for (n = 0, a = c.length; a > n; n++)c[n].type = c[n].id && o[c[n].id] && o[c[n].id].type ? o[c[n].id].type : "default", i && i.no_id && (delete c[n].id, c[n].li_attr && c[n].li_attr.id && delete c[n].li_attr.id, c[n].a_attr && c[n].a_attr.id && delete c[n].a_attr.id); else c.type = c.id && o[c.id] && o[c.id].type ? o[c.id].type : "default", i && i.no_id && (c = this._delete_ids(c));
                return c
            }, this._delete_ids = function (t) {
                if (e.isArray(t)) {
                    for (var i = 0, r = t.length; r > i; i++)t[i] = this._delete_ids(t[i]);
                    return t
                }
                return delete t.id, t.li_attr && t.li_attr.id && delete t.li_attr.id, t.a_attr && t.a_attr.id && delete t.a_attr.id, t.children && e.isArray(t.children) && (t.children = this._delete_ids(t.children)), t
            }, this.check = function (i, s, n, a, o) {
                if (r.check.call(this, i, s, n, a, o) === !1)return !1;
                s = s && s.id ? s : this.get_node(s), n = n && n.id ? n : this.get_node(n);
                var d, c, l, h, _ = s && s.id ? o && o.origin ? o.origin : e.jstree.reference(s.id) : null;
                switch (_ = _ && _._model && _._model.data ? _._model.data : null, i) {
                    case"create_node":
                    case"move_node":
                    case"copy_node":
                        if ("move_node" !== i || -1 === e.inArray(s.id, n.children)) {
                            if (d = this.get_rules(n), d.max_children !== t && -1 !== d.max_children && d.max_children === n.children.length)return this._data.core.last_error = {
                                error: "check",
                                plugin: "types",
                                id: "types_01",
                                reason: "max_children prevents function: " + i,
                                data: JSON.stringify({
                                    chk: i,
                                    pos: a,
                                    obj: s && s.id ? s.id : !1,
                                    par: n && n.id ? n.id : !1
                                })
                            }, !1;
                            if (d.valid_children !== t && -1 !== d.valid_children && -1 === e.inArray(s.type || "default", d.valid_children))return this._data.core.last_error = {
                                error: "check",
                                plugin: "types",
                                id: "types_02",
                                reason: "valid_children prevents function: " + i,
                                data: JSON.stringify({
                                    chk: i,
                                    pos: a,
                                    obj: s && s.id ? s.id : !1,
                                    par: n && n.id ? n.id : !1
                                })
                            }, !1;
                            if (_ && s.children_d && s.parents) {
                                for (c = 0, l = 0, h = s.children_d.length; h > l; l++)c = Math.max(c, _[s.children_d[l]].parents.length);
                                c = c - s.parents.length + 1
                            }
                            (0 >= c || c === t) && (c = 1);
                            do {
                                if (d.max_depth !== t && -1 !== d.max_depth && d.max_depth < c)return this._data.core.last_error = {
                                    error: "check",
                                    plugin: "types",
                                    id: "types_03",
                                    reason: "max_depth prevents function: " + i,
                                    data: JSON.stringify({
                                        chk: i,
                                        pos: a,
                                        obj: s && s.id ? s.id : !1,
                                        par: n && n.id ? n.id : !1
                                    })
                                }, !1;
                                n = this.get_node(n.parent), d = this.get_rules(n), c++
                            } while (n)
                        }
                }
                return !0
            }, this.get_rules = function (e) {
                if (e = this.get_node(e), !e)return !1;
                var i = this.get_type(e, !0);
                return i.max_depth === t && (i.max_depth = -1), i.max_children === t && (i.max_children = -1), i.valid_children === t && (i.valid_children = -1), i
            }, this.get_type = function (t, i) {
                return t = this.get_node(t), t ? i ? e.extend({type: t.type}, this.settings.types[t.type]) : t.type : !1
            }, this.set_type = function (i, r) {
                var s, n, a, o, d;
                if (e.isArray(i)) {
                    for (i = i.slice(), n = 0, a = i.length; a > n; n++)this.set_type(i[n], r);
                    return !0
                }
                return s = this.settings.types, i = this.get_node(i), s[r] && i ? (o = i.type, d = this.get_icon(i), i.type = r, (d === !0 || s[o] && s[o].icon !== t && d === s[o].icon) && this.set_icon(i, s[r].icon !== t ? s[r].icon : !0), !0) : !1
            }
        }, e.jstree.defaults.unique = {
            case_sensitive: !1, duplicate: function (e, t) {
                return e + " (" + t + ")"
            }
        }, e.jstree.plugins.unique = function (i, r) {
            this.check = function (t, i, s, n, a) {
                if (r.check.call(this, t, i, s, n, a) === !1)return !1;
                if (i = i && i.id ? i : this.get_node(i), s = s && s.id ? s : this.get_node(s), !s || !s.children)return !0;
                var o, d, c = "rename_node" === t ? n : i.text, l = [], h = this.settings.unique.case_sensitive, _ = this._model.data;
                for (o = 0, d = s.children.length; d > o; o++)l.push(h ? _[s.children[o]].text : _[s.children[o]].text.toLowerCase());
                switch (h || (c = c.toLowerCase()), t) {
                    case"delete_node":
                        return !0;
                    case"rename_node":
                        return o = -1 === e.inArray(c, l) || i.text && i.text[h ? "toString" : "toLowerCase"]() === c, o || (this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_01",
                            reason: "Child with name " + c + " already exists. Preventing: " + t,
                            data: JSON.stringify({
                                chk: t,
                                pos: n,
                                obj: i && i.id ? i.id : !1,
                                par: s && s.id ? s.id : !1
                            })
                        }), o;
                    case"create_node":
                        return o = -1 === e.inArray(c, l), o || (this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_04",
                            reason: "Child with name " + c + " already exists. Preventing: " + t,
                            data: JSON.stringify({
                                chk: t,
                                pos: n,
                                obj: i && i.id ? i.id : !1,
                                par: s && s.id ? s.id : !1
                            })
                        }), o;
                    case"copy_node":
                        return o = -1 === e.inArray(c, l), o || (this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_02",
                            reason: "Child with name " + c + " already exists. Preventing: " + t,
                            data: JSON.stringify({
                                chk: t,
                                pos: n,
                                obj: i && i.id ? i.id : !1,
                                par: s && s.id ? s.id : !1
                            })
                        }), o;
                    case"move_node":
                        return o = i.parent === s.id && (!a || !a.is_multi) || -1 === e.inArray(c, l), o || (this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_03",
                            reason: "Child with name " + c + " already exists. Preventing: " + t,
                            data: JSON.stringify({
                                chk: t,
                                pos: n,
                                obj: i && i.id ? i.id : !1,
                                par: s && s.id ? s.id : !1
                            })
                        }), o
                }
                return !0
            }, this.create_node = function (i, s, n, a, o) {
                if (!s || s.text === t) {
                    if (null === i && (i = e.jstree.root), i = this.get_node(i), !i)return r.create_node.call(this, i, s, n, a, o);
                    if (n = n === t ? "last" : n, !n.toString().match(/^(before|after)$/) && !o && !this.is_loaded(i))return r.create_node.call(this, i, s, n, a, o);
                    s || (s = {});
                    var d, c, l, h, _, u = this._model.data, g = this.settings.unique.case_sensitive, f = this.settings.unique.duplicate;
                    for (c = d = this.get_string("New node"), l = [], h = 0, _ = i.children.length; _ > h; h++)l.push(g ? u[i.children[h]].text : u[i.children[h]].text.toLowerCase());
                    for (h = 1; -1 !== e.inArray(g ? c : c.toLowerCase(), l);)c = f.call(this, d, ++h).toString();
                    s.text = c
                }
                return r.create_node.call(this, i, s, n, a, o)
            }
        };
        var g = l.createElement("DIV");
        if (g.setAttribute("unselectable", "on"), g.setAttribute("role", "presentation"), g.className = "jstree-wholerow", g.innerHTML = "&#160;", e.jstree.plugins.wholerow = function (t, i) {
                this.bind = function () {
                    i.bind.call(this), this.element.on("ready.jstree set_state.jstree", e.proxy(function () {
                        this.hide_dots()
                    }, this)).on("init.jstree loading.jstree ready.jstree", e.proxy(function () {
                        this.get_container_ul().addClass("jstree-wholerow-ul")
                    }, this)).on("deselect_all.jstree", e.proxy(function (e, t) {
                        this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked")
                    }, this)).on("changed.jstree", e.proxy(function (e, t) {
                        this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked");
                        var i, r, s = !1;
                        for (i = 0, r = t.selected.length; r > i; i++)s = this.get_node(t.selected[i], !0), s && s.length && s.children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
                    }, this)).on("open_node.jstree", e.proxy(function (e, t) {
                        this.get_node(t.node, !0).find(".jstree-clicked").parent().children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
                    }, this)).on("hover_node.jstree dehover_node.jstree", e.proxy(function (e, t) {
                        "hover_node" === e.type && this.is_disabled(t.node) || this.get_node(t.node, !0).children(".jstree-wholerow")["hover_node" === e.type ? "addClass" : "removeClass"]("jstree-wholerow-hovered")
                    }, this)).on("contextmenu.jstree", ".jstree-wholerow", e.proxy(function (t) {
                        t.preventDefault();
                        var i = e.Event("contextmenu", {
                            metaKey: t.metaKey,
                            ctrlKey: t.ctrlKey,
                            altKey: t.altKey,
                            shiftKey: t.shiftKey,
                            pageX: t.pageX,
                            pageY: t.pageY
                        });
                        e(t.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(i)
                    }, this)).on("click.jstree", ".jstree-wholerow", function (t) {
                        t.stopImmediatePropagation();
                        var i = e.Event("click", {
                            metaKey: t.metaKey,
                            ctrlKey: t.ctrlKey,
                            altKey: t.altKey,
                            shiftKey: t.shiftKey
                        });
                        e(t.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(i).focus()
                    }).on("click.jstree", ".jstree-leaf > .jstree-ocl", e.proxy(function (t) {
                        t.stopImmediatePropagation();
                        var i = e.Event("click", {
                            metaKey: t.metaKey,
                            ctrlKey: t.ctrlKey,
                            altKey: t.altKey,
                            shiftKey: t.shiftKey
                        });
                        e(t.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(i).focus()
                    }, this)).on("mouseover.jstree", ".jstree-wholerow, .jstree-icon", e.proxy(function (e) {
                        return e.stopImmediatePropagation(), this.is_disabled(e.currentTarget) || this.hover_node(e.currentTarget), !1
                    }, this)).on("mouseleave.jstree", ".jstree-node", e.proxy(function (e) {
                        this.dehover_node(e.currentTarget)
                    }, this))
                }, this.teardown = function () {
                    this.settings.wholerow && this.element.find(".jstree-wholerow").remove(), i.teardown.call(this)
                }, this.redraw_node = function (t, r, s, n) {
                    if (t = i.redraw_node.apply(this, arguments)) {
                        var a = g.cloneNode(!0);
                        -1 !== e.inArray(t.id, this._data.core.selected) && (a.className += " jstree-wholerow-clicked"), this._data.core.focused && this._data.core.focused === t.id && (a.className += " jstree-wholerow-hovered"), t.insertBefore(a, t.childNodes[0])
                    }
                    return t
                }
            }, l.registerElement && Object && Object.create) {
            var f = Object.create(HTMLElement.prototype);
            f.createdCallback = function () {
                var t, i = {core: {}, plugins: []};
                for (t in e.jstree.plugins)e.jstree.plugins.hasOwnProperty(t) && this.attributes[t] && (i.plugins.push(t), this.getAttribute(t) && JSON.parse(this.getAttribute(t)) && (i[t] = JSON.parse(this.getAttribute(t))));
                for (t in e.jstree.defaults.core)e.jstree.defaults.core.hasOwnProperty(t) && this.attributes[t] && (i.core[t] = JSON.parse(this.getAttribute(t)) || this.getAttribute(t));
                e(this).jstree(i)
            };
            try {
                l.registerElement("vakata-jstree", {prototype: f})
            } catch (p) {
            }
        }
    }
});

!function (e) {
    "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function (e) {
    !function (t) {
        var o = "function" == typeof define && define.amd, a = "undefined" != typeof module && module.exports, n = "https:" == document.location.protocol ? "https:" : "http:", i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
        o || (a ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E"))), t()
    }(function () {
        var t, o = "mCustomScrollbar", a = "mCS", n = ".mCustomScrollbar", i = {
            setTop: 0,
            setLeft: 0,
            axis: "y",
            scrollbarPosition: "inside",
            scrollInertia: 950,
            autoDraggerLength: !0,
            alwaysShowScrollbar: 0,
            snapOffset: 0,
            mouseWheel: {
                enable: !0,
                scrollAmount: "auto",
                axis: "y",
                deltaFactor: "auto",
                disableOver: ["select", "option", "keygen", "datalist", "textarea"]
            },
            scrollButtons: {scrollType: "stepless", scrollAmount: "auto"},
            keyboard: {enable: !0, scrollType: "stepless", scrollAmount: "auto"},
            contentTouchScroll: 25,
            documentTouchScroll: !0,
            advanced: {
                autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                updateOnContentResize: !0,
                updateOnImageLoad: "auto",
                autoUpdateTimeout: 60
            },
            theme: "light",
            callbacks: {onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0}
        }, r = 0, l = {}, s = window.attachEvent && !window.addEventListener ? 1 : 0, c = !1, d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"], u = {
            init: function (t) {
                var t = e.extend(!0, {}, i, t), o = f.call(this);
                if (t.live) {
                    var s = t.liveSelector || this.selector || n, c = e(s);
                    if ("off" === t.live)return void m(s);
                    l[s] = setTimeout(function () {
                        c.mCustomScrollbar(t), "once" === t.live && c.length && m(s)
                    }, 500)
                } else m(s);
                return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : p(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    preventDefault: !1,
                    deltaFactor: "auto",
                    normalizeDelta: !1,
                    invert: !1
                }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), h(t), e(o).each(function () {
                    var o = e(this);
                    if (!o.data(a)) {
                        o.data(a, {
                            idx: ++r,
                            opt: t,
                            scrollRatio: {y: null, x: null},
                            overflowed: null,
                            contentReset: {y: null, x: null},
                            bindEvents: !1,
                            tweenRunning: !1,
                            sequential: {},
                            langDir: o.css("direction"),
                            cbOffsets: null,
                            trigger: null,
                            poll: {size: {o: 0, n: 0}, img: {o: 0, n: 0}, change: {o: 0, n: 0}}
                        });
                        var n = o.data(a), i = n.opt, l = o.data("mcs-axis"), s = o.data("mcs-scrollbar-position"), c = o.data("mcs-theme");
                        l && (i.axis = l), s && (i.scrollbarPosition = s), c && (i.theme = c, h(i)), v.call(this), n && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), e("#mCSB_" + n.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, o)
                    }
                })
            }, update: function (t, o) {
                var n = t || f.call(this);
                return e(n).each(function () {
                    var t = e(this);
                    if (t.data(a)) {
                        var n = t.data(a), i = n.opt, r = e("#mCSB_" + n.idx + "_container"), l = e("#mCSB_" + n.idx), s = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                        if (!r.length)return;
                        n.tweenRunning && N(t), o && n && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), l.css("max-height", "none"), l.height() !== t.height() && l.css("max-height", t.height()), _.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)), n.overflowed = y.call(this), M.call(this), i.autoDraggerLength && S.call(this), b.call(this), T.call(this);
                        var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                        "x" !== i.axis && (n.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) : (V(t, c[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none"
                        }), n.contentReset.y = null) : (B.call(this), "y" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[1] && V(t, c[1].toString(), {
                            dir: "x",
                            dur: 0,
                            overwrite: "none"
                        }))), "y" !== i.axis && (n.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) : (V(t, c[1].toString(), {
                            dir: "x",
                            dur: 0,
                            overwrite: "none"
                        }), n.contentReset.x = null) : (B.call(this), "x" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[0] && V(t, c[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none"
                        }))), o && n && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), X.call(this)
                    }
                })
            }, scrollTo: function (t, o) {
                if ("undefined" != typeof t && null != t) {
                    var n = f.call(this);
                    return e(n).each(function () {
                        var n = e(this);
                        if (n.data(a)) {
                            var i = n.data(a), r = i.opt, l = {
                                trigger: "external",
                                scrollInertia: r.scrollInertia,
                                scrollEasing: "mcsEaseInOut",
                                moveDragger: !1,
                                timeout: 60,
                                callbacks: !0,
                                onStart: !0,
                                onUpdate: !0,
                                onComplete: !0
                            }, s = e.extend(!0, {}, l, o), c = q.call(this, t), d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                            c[0] = Y.call(this, c[0], "y"), c[1] = Y.call(this, c[1], "x"), s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), s.dur = oe() ? 0 : d, setTimeout(function () {
                                null !== c[0] && "undefined" != typeof c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y", s.overwrite = "all", V(n, c[0].toString(), s)), null !== c[1] && "undefined" != typeof c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x", s.overwrite = "none", V(n, c[1].toString(), s))
                            }, s.timeout)
                        }
                    })
                }
            }, stop: function () {
                var t = f.call(this);
                return e(t).each(function () {
                    var t = e(this);
                    t.data(a) && N(t)
                })
            }, disable: function (t) {
                var o = f.call(this);
                return e(o).each(function () {
                    var o = e(this);
                    if (o.data(a)) {
                        o.data(a);
                        X.call(this, "remove"), k.call(this), t && B.call(this), M.call(this, !0), o.addClass(d[3])
                    }
                })
            }, destroy: function () {
                var t = f.call(this);
                return e(t).each(function () {
                    var n = e(this);
                    if (n.data(a)) {
                        var i = n.data(a), r = i.opt, l = e("#mCSB_" + i.idx), s = e("#mCSB_" + i.idx + "_container"), c = e(".mCSB_" + i.idx + "_scrollbar");
                        r.live && m(r.liveSelector || e(t).selector), X.call(this, "remove"), k.call(this), B.call(this), n.removeData(a), K(this, "mcs"), c.remove(), s.find("img." + d[2]).removeClass(d[2]), l.replaceWith(s.contents()), n.removeClass(o + " _" + a + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
                    }
                })
            }
        }, f = function () {
            return "object" != typeof e(this) || e(this).length < 1 ? n : this
        }, h = function (t) {
            var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"], a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"], n = ["minimal", "minimal-dark"], i = ["minimal", "minimal-dark"], r = ["minimal", "minimal-dark"];
            t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition
        }, m = function (e) {
            l[e] && (clearTimeout(l[e]), K(l, e))
        }, p = function (e) {
            return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
        }, g = function (e) {
            return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
        }, v = function () {
            var t = e(this), n = t.data(a), i = n.opt, r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "", l = ["<div id='mCSB_" + n.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + n.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"], s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical", c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0], u = "yx" === i.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "", f = i.autoHideScrollbar ? " " + d[6] : "", h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";
            i.setWidth && t.css("width", i.setWidth), i.setHeight && t.css("height", i.setHeight), i.setLeft = "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft, t.addClass(o + " _" + a + "_" + n.idx + f + h).wrapInner("<div id='mCSB_" + n.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + n.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir=" + n.langDir + " /></div>");
            var m = e("#mCSB_" + n.idx), p = e("#mCSB_" + n.idx + "_container");
            "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)), "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c), p.wrap(u)), w.call(this);
            var g = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
            g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
        }, x = function (t) {
            var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function () {
                return e(this).outerWidth(!0)
            }).get())], a = t.parent().width();
            return o[0] > a ? o[0] : o[1] > a ? o[1] : "100%"
        }, _ = function () {
            var t = e(this), o = t.data(a), n = o.opt, i = e("#mCSB_" + o.idx + "_container");
            if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
                i.css({width: "auto", "min-width": 0, "overflow-x": "scroll"});
                var r = Math.ceil(i[0].scrollWidth);
                3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({
                    width: r,
                    "min-width": "100%",
                    "overflow-x": "inherit"
                }) : i.css({
                    "overflow-x": "inherit",
                    position: "absolute"
                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                    width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left),
                    "min-width": "100%",
                    position: "relative"
                }).unwrap()
            }
        }, w = function () {
            var t = e(this), o = t.data(a), n = o.opt, i = e(".mCSB_" + o.idx + "_scrollbar:first"), r = ee(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : "", l = ["<a href='#' class='" + d[13] + "' oncontextmenu='return false;' " + r + " />", "<a href='#' class='" + d[14] + "' oncontextmenu='return false;' " + r + " />", "<a href='#' class='" + d[15] + "' oncontextmenu='return false;' " + r + " />", "<a href='#' class='" + d[16] + "' oncontextmenu='return false;' " + r + " />"], s = ["x" === n.axis ? l[2] : l[0], "x" === n.axis ? l[3] : l[1], l[2], l[3]];
            n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])
        }, S = function () {
            var t = e(this), o = t.data(a), n = e("#mCSB_" + o.idx), i = e("#mCSB_" + o.idx + "_container"), r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")], l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)], c = [parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width())], d = s && c[1] < c[0] ? c[0] : c[1], u = s && c[3] < c[2] ? c[2] : c[3];
            r[0].css({
                height: d,
                "max-height": r[0].parent().height() - 10
            }).find(".mCSB_dragger_bar").css({"line-height": c[0] + "px"}), r[1].css({
                width: u,
                "max-width": r[1].parent().width() - 10
            })
        }, b = function () {
            var t = e(this), o = t.data(a), n = e("#mCSB_" + o.idx), i = e("#mCSB_" + o.idx + "_container"), r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")], l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()], s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];
            o.scrollRatio = {y: s[0], x: s[1]}
        }, C = function (e, t, o) {
            var a = o ? d[0] + "_expanded" : "", n = e.closest(".mCSB_scrollTools");
            "active" === t ? (e.toggleClass(d[0] + " " + a), n.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), n.removeClass(d[1])) : (e.addClass(d[0]), n.addClass(d[1])))
        }, y = function () {
            var t = e(this), o = t.data(a), n = e("#mCSB_" + o.idx), i = e("#mCSB_" + o.idx + "_container"), r = null == o.overflowed ? i.height() : i.outerHeight(!1), l = null == o.overflowed ? i.width() : i.outerWidth(!1), s = i[0].scrollHeight, c = i[0].scrollWidth;
            return s > r && (r = s), c > l && (l = c), [r > n.height(), l > n.width()]
        }, B = function () {
            var t = e(this), o = t.data(a), n = o.opt, i = e("#mCSB_" + o.idx), r = e("#mCSB_" + o.idx + "_container"), l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
            if (N(t), ("x" !== n.axis && !o.overflowed[0] || "y" === n.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0), V(t, "_resetY")), "y" !== n.axis && !o.overflowed[1] || "x" === n.axis && o.overflowed[1]) {
                var s = dx = 0;
                "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), r.css("left", s), l[1].css("left", dx), V(t, "_resetX")
            }
        }, T = function () {
            function t() {
                r = setTimeout(function () {
                    e.event.special.mousewheel ? (clearTimeout(r), R.call(o[0])) : t()
                }, 100)
            }

            var o = e(this), n = o.data(a), i = n.opt;
            if (!n.bindEvents) {
                if (I.call(this), i.contentTouchScroll && D.call(this), E.call(this), i.mouseWheel.enable) {
                    var r;
                    t()
                }
                L.call(this), P.call(this), i.advanced.autoScrollOnFocus && z.call(this), i.scrollButtons.enable && H.call(this), i.keyboard.enable && U.call(this), n.bindEvents = !0
            }
        }, k = function () {
            var t = e(this), o = t.data(a), n = o.opt, i = a + "_" + o.idx, r = ".mCSB_" + o.idx + "_scrollbar", l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a"), s = e("#mCSB_" + o.idx + "_container");
            n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)), n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)), o.bindEvents && (e(document).add(e(!W() || top.document)).unbind("." + i), l.each(function () {
                e(this).unbind("." + i)
            }), clearTimeout(t[0]._focusTimeout), K(t[0], "_focusTimeout"), clearTimeout(o.sequential.step), K(o.sequential, "step"), clearTimeout(s[0].onCompleteTimeout), K(s[0], "onCompleteTimeout"), o.bindEvents = !1)
        }, M = function (t) {
            var o = e(this), n = o.data(a), i = n.opt, r = e("#mCSB_" + n.idx + "_container_wrapper"), l = r.length ? r : e("#mCSB_" + n.idx + "_container"), s = [e("#mCSB_" + n.idx + "_scrollbar_vertical"), e("#mCSB_" + n.idx + "_scrollbar_horizontal")], c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
            "x" !== i.axis && (n.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass(d[8] + " " + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), l.removeClass(d[10])) : (s[0].css("display", "none"), l.addClass(d[10])), l.addClass(d[8]))), "y" !== i.axis && (n.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass(d[9] + " " + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), l.removeClass(d[11])) : (s[1].css("display", "none"), l.addClass(d[11])), l.addClass(d[9]))), n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5])
        }, O = function (t) {
            var o = t.type, a = t.target.ownerDocument !== document ? [e(frameElement).offset().top, e(frameElement).offset().left] : null, n = W() && t.target.ownerDocument !== top.document ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
            switch (o) {
                case"pointerdown":
                case"MSPointerDown":
                case"pointermove":
                case"MSPointerMove":
                case"pointerup":
                case"MSPointerUp":
                    return a ? [t.originalEvent.pageY - a[0] + n[0], t.originalEvent.pageX - a[1] + n[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
                case"touchstart":
                case"touchmove":
                case"touchend":
                    var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0], r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                    return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];
                default:
                    return a ? [t.pageY - a[0] + n[0], t.pageX - a[1] + n[1], !1] : [t.pageY, t.pageX, !1]
            }
        }, I = function () {
            function t(e) {
                var t = m.find("iframe");
                if (t.length) {
                    var o = e ? "auto" : "none";
                    t.css("pointer-events", o)
                }
            }

            function o(e, t, o, a) {
                if (m[0].idleTimer = u.scrollInertia < 233 ? 250 : 0, n.attr("id") === h[1])var i = "x", r = (n[0].offsetLeft - t + a) * d.scrollRatio.x; else var i = "y", r = (n[0].offsetTop - e + o) * d.scrollRatio.y;
                V(l, r.toString(), {dir: i, drag: !0})
            }

            var n, i, r, l = e(this), d = l.data(a), u = d.opt, f = a + "_" + d.idx, h = ["mCSB_" + d.idx + "_dragger_vertical", "mCSB_" + d.idx + "_dragger_horizontal"], m = e("#mCSB_" + d.idx + "_container"), p = e("#" + h[0] + ",#" + h[1]), g = u.advanced.releaseDraggableSelectors ? p.add(e(u.advanced.releaseDraggableSelectors)) : p, v = u.advanced.extraDraggableSelectors ? e(!W() || top.document).add(e(u.advanced.extraDraggableSelectors)) : e(!W() || top.document);
            p.bind("mousedown." + f + " touchstart." + f + " pointerdown." + f + " MSPointerDown." + f, function (o) {
                if (o.stopImmediatePropagation(), o.preventDefault(), Z(o)) {
                    c = !0, s && (document.onselectstart = function () {
                        return !1
                    }), t(!1), N(l), n = e(this);
                    var a = n.offset(), d = O(o)[0] - a.top, f = O(o)[1] - a.left, h = n.height() + a.top, m = n.width() + a.left;
                    h > d && d > 0 && m > f && f > 0 && (i = d, r = f), C(n, "active", u.autoExpandScrollbar)
                }
            }).bind("touchmove." + f, function (e) {
                e.stopImmediatePropagation(), e.preventDefault();
                var t = n.offset(), a = O(e)[0] - t.top, l = O(e)[1] - t.left;
                o(i, r, a, l)
            }), e(document).add(v).bind("mousemove." + f + " pointermove." + f + " MSPointerMove." + f, function (e) {
                if (n) {
                    var t = n.offset(), a = O(e)[0] - t.top, l = O(e)[1] - t.left;
                    if (i === a && r === l)return;
                    o(i, r, a, l)
                }
            }).add(g).bind("mouseup." + f + " touchend." + f + " pointerup." + f + " MSPointerUp." + f, function (e) {
                n && (C(n, "active", u.autoExpandScrollbar), n = null), c = !1, s && (document.onselectstart = null), t(!0)
            })
        }, D = function () {
            function o(e) {
                if (!$(e) || c || O(e)[2])return void(t = 0);
                t = 1, b = 0, C = 0, d = 1, y.removeClass("mCS_touch_action");
                var o = I.offset();
                u = O(e)[0] - o.top, f = O(e)[1] - o.left, z = [O(e)[0], O(e)[1]]
            }

            function n(e) {
                if ($(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
                    g = G();
                    var t = M.offset(), o = O(e)[0] - t.top, a = O(e)[1] - t.left, n = "mcsLinearOut";
                    if (E.push(o), R.push(a), z[2] = Math.abs(O(e)[0] - z[0]), z[3] = Math.abs(O(e)[1] - z[1]), B.overflowed[0])var i = D[0].parent().height() - D[0].height(), r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * z[3] < z[2] || "yx" === T.axis);
                    if (B.overflowed[1])var l = D[1].parent().width() - D[1].width(), h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * z[2] < z[3] || "yx" === T.axis);
                    r || h ? (U || e.preventDefault(), b = 1) : (C = 1, y.addClass("mCS_touch_action")), U && e.preventDefault(), w = "yx" === T.axis ? [u - o, f - a] : "x" === T.axis ? [null, f - a] : [u - o, null], I[0].idleTimer = 250, B.overflowed[0] && s(w[0], A, n, "y", "all", !0), B.overflowed[1] && s(w[1], A, n, "x", L, !0)
                }
            }

            function i(e) {
                if (!$(e) || c || O(e)[2])return void(t = 0);
                t = 1, e.stopImmediatePropagation(), N(y), p = G();
                var o = M.offset();
                h = O(e)[0] - o.top, m = O(e)[1] - o.left, E = [], R = []
            }

            function r(e) {
                if ($(e) && !c && !O(e)[2]) {
                    d = 0, e.stopImmediatePropagation(), b = 0, C = 0, v = G();
                    var t = M.offset(), o = O(e)[0] - t.top, a = O(e)[1] - t.left;
                    if (!(v - g > 30)) {
                        _ = 1e3 / (v - p);
                        var n = "mcsEaseOut", i = 2.5 > _, r = i ? [E[E.length - 2], R[R.length - 2]] : [0, 0];
                        x = i ? [o - r[0], a - r[1]] : [o - h, a - m];
                        var u = [Math.abs(x[0]), Math.abs(x[1])];
                        _ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];
                        var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];
                        w = "yx" === T.axis ? [f[0], f[1]] : "x" === T.axis ? [null, f[1]] : [f[0], null], S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];
                        var y = parseInt(T.contentTouchScroll) || 0;
                        w[0] = u[0] > y ? w[0] : 0, w[1] = u[1] > y ? w[1] : 0, B.overflowed[0] && s(w[0], S[0], n, "y", L, !1), B.overflowed[1] && s(w[1], S[1], n, "x", L, !1)
                    }
                }
            }

            function l(e, t) {
                var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
                return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
            }

            function s(e, t, o, a, n, i) {
                e && V(y, e.toString(), {dur: t, scrollEasing: o, dir: a, overwrite: n, drag: i})
            }

            var d, u, f, h, m, p, g, v, x, _, w, S, b, C, y = e(this), B = y.data(a), T = B.opt, k = a + "_" + B.idx, M = e("#mCSB_" + B.idx), I = e("#mCSB_" + B.idx + "_container"), D = [e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal")], E = [], R = [], A = 0, L = "yx" === T.axis ? "none" : "all", z = [], P = I.find("iframe"), H = ["touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, "touchmove." + k + " pointermove." + k + " MSPointerMove." + k, "touchend." + k + " pointerup." + k + " MSPointerUp." + k], U = void 0 !== document.body.style.touchAction;
            I.bind(H[0], function (e) {
                o(e)
            }).bind(H[1], function (e) {
                n(e)
            }), M.bind(H[0], function (e) {
                i(e)
            }).bind(H[2], function (e) {
                r(e)
            }), P.length && P.each(function () {
                e(this).load(function () {
                    W(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], function (e) {
                        o(e), i(e)
                    }).bind(H[1], function (e) {
                        n(e)
                    }).bind(H[2], function (e) {
                        r(e)
                    })
                })
            })
        }, E = function () {
            function o() {
                return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
            }

            function n(e, t, o) {
                d.type = o && i ? "stepped" : "stepless", d.scrollAmount = 10, F(r, e, t, "mcsLinearOut", o ? 60 : null)
            }

            var i, r = e(this), l = r.data(a), s = l.opt, d = l.sequential, u = a + "_" + l.idx, f = e("#mCSB_" + l.idx + "_container"), h = f.parent();
            f.bind("mousedown." + u, function (e) {
                t || i || (i = 1, c = !0)
            }).add(document).bind("mousemove." + u, function (e) {
                if (!t && i && o()) {
                    var a = f.offset(), r = O(e)[0] - a.top + f[0].offsetTop, c = O(e)[1] - a.left + f[0].offsetLeft;
                    r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && n("off", null, "stepped") : ("x" !== s.axis && l.overflowed[0] && (0 > r ? n("on", 38) : r > h.height() && n("on", 40)), "y" !== s.axis && l.overflowed[1] && (0 > c ? n("on", 37) : c > h.width() && n("on", 39)))
                }
            }).bind("mouseup." + u + " dragend." + u, function (e) {
                t || (i && (i = 0, n("off", null)), c = !1)
            })
        }, R = function () {
            function t(t, a) {
                if (N(o), !A(o, t.target)) {
                    var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100, d = i.scrollInertia;
                    if ("x" === i.axis || "x" === i.mouseWheel.axis)var u = "x", f = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)], h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? .9 * l.width() : f[0], m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft), p = c[1][0].offsetLeft, g = c[1].parent().width() - c[1].width(), v = t.deltaX || t.deltaY || a; else var u = "y", f = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)], h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? .9 * l.height() : f[0], m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop), p = c[0][0].offsetTop, g = c[0].parent().height() - c[0].height(), v = t.deltaY || a;
                    "y" === u && !n.overflowed[0] || "x" === u && !n.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 2 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor, d = 17), V(o, (m - v * h).toString(), {
                        dir: u,
                        dur: d
                    }))
                }
            }

            if (e(this).data(a)) {
                var o = e(this), n = o.data(a), i = n.opt, r = a + "_" + n.idx, l = e("#mCSB_" + n.idx), c = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")], d = e("#mCSB_" + n.idx + "_container").find("iframe");
                d.length && d.each(function () {
                    e(this).load(function () {
                        W(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function (e, o) {
                            t(e, o)
                        })
                    })
                }), l.bind("mousewheel." + r, function (e, o) {
                    t(e, o)
                })
            }
        }, W = function (e) {
            var t = null;
            if (e) {
                try {
                    var o = e.contentDocument || e.contentWindow.document;
                    t = o.body.innerHTML
                } catch (a) {
                }
                return null !== t
            }
            try {
                var o = top.document;
                t = o.body.innerHTML
            } catch (a) {
            }
            return null !== t
        }, A = function (t, o) {
            var n = o.nodeName.toLowerCase(), i = t.data(a).opt.mouseWheel.disableOver, r = ["select", "textarea"];
            return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"))
        }, L = function () {
            var t, o = e(this), n = o.data(a), i = a + "_" + n.idx, r = e("#mCSB_" + n.idx + "_container"), l = r.parent(), s = e(".mCSB_" + n.idx + "_scrollbar ." + d[12]);
            s.bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function (o) {
                c = !0, e(o.target).hasClass("mCSB_dragger") || (t = 1)
            }).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function (e) {
                c = !1
            }).bind("click." + i, function (a) {
                if (t && (t = 0, e(a.target).hasClass(d[12]) || e(a.target).hasClass("mCSB_draggerRail"))) {
                    N(o);
                    var i = e(this), s = i.find(".mCSB_dragger");
                    if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
                        if (!n.overflowed[1])return;
                        var c = "x", u = a.pageX > s.offset().left ? -1 : 1, f = Math.abs(r[0].offsetLeft) - u * (.9 * l.width())
                    } else {
                        if (!n.overflowed[0])return;
                        var c = "y", u = a.pageY > s.offset().top ? -1 : 1, f = Math.abs(r[0].offsetTop) - u * (.9 * l.height())
                    }
                    V(o, f.toString(), {dir: c, scrollEasing: "mcsEaseInOut"})
                }
            })
        }, z = function () {
            var t = e(this), o = t.data(a), n = o.opt, i = a + "_" + o.idx, r = e("#mCSB_" + o.idx + "_container"), l = r.parent();
            r.bind("focusin." + i, function (o) {
                var a = e(document.activeElement), i = r.find(".mCustomScrollBox").length, s = 0;
                a.is(n.advanced.autoScrollOnFocus) && (N(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = i ? (s + 17) * i : 0, t[0]._focusTimeout = setTimeout(function () {
                    var e = [te(a)[0], te(a)[1]], o = [r[0].offsetTop, r[0].offsetLeft], i = [o[0] + e[0] >= 0 && o[0] + e[0] < l.height() - a.outerHeight(!1), o[1] + e[1] >= 0 && o[0] + e[1] < l.width() - a.outerWidth(!1)], c = "yx" !== n.axis || i[0] || i[1] ? "all" : "none";
                    "x" === n.axis || i[0] || V(t, e[0].toString(), {
                        dir: "y",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: c,
                        dur: s
                    }), "y" === n.axis || i[1] || V(t, e[1].toString(), {
                        dir: "x",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: c,
                        dur: s
                    })
                }, t[0]._focusTimer))
            })
        }, P = function () {
            var t = e(this), o = t.data(a), n = a + "_" + o.idx, i = e("#mCSB_" + o.idx + "_container").parent();
            i.bind("scroll." + n, function (t) {
                (0 !== i.scrollTop() || 0 !== i.scrollLeft()) && e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden")
            })
        }, H = function () {
            var t = e(this), o = t.data(a), n = o.opt, i = o.sequential, r = a + "_" + o.idx, l = ".mCSB_" + o.idx + "_scrollbar", s = e(l + ">a");
            s.bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function (a) {
                function r(e, o) {
                    i.scrollAmount = n.scrollButtons.scrollAmount, F(t, e, o)
                }

                if (a.preventDefault(), Z(a)) {
                    var l = e(this).attr("class");
                    switch (i.type = n.scrollButtons.scrollType, a.type) {
                        case"mousedown":
                        case"touchstart":
                        case"pointerdown":
                        case"MSPointerDown":
                            if ("stepped" === i.type)return;
                            c = !0, o.tweenRunning = !1, r("on", l);
                            break;
                        case"mouseup":
                        case"touchend":
                        case"pointerup":
                        case"MSPointerUp":
                        case"mouseout":
                        case"pointerout":
                        case"MSPointerOut":
                            if ("stepped" === i.type)return;
                            c = !1, i.dir && r("off", l);
                            break;
                        case"click":
                            if ("stepped" !== i.type || o.tweenRunning)return;
                            r("on", l)
                    }
                }
            })
        }, U = function () {
            function t(t) {
                function a(e, t) {
                    r.type = i.keyboard.scrollType, r.scrollAmount = i.keyboard.scrollAmount, "stepped" === r.type && n.tweenRunning || F(o, e, t)
                }

                switch (t.type) {
                    case"blur":
                        n.tweenRunning && r.dir && a("off", null);
                        break;
                    case"keydown":
                    case"keyup":
                        var l = t.keyCode ? t.keyCode : t.which, s = "on";
                        if ("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l)) {
                            if ((38 === l || 40 === l) && !n.overflowed[0] || (37 === l || 39 === l) && !n.overflowed[1])return;
                            "keyup" === t.type && (s = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(s, l))
                        } else if (33 === l || 34 === l) {
                            if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                                N(o);
                                var f = 34 === l ? -1 : 1;
                                if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0])var h = "x", m = Math.abs(c[0].offsetLeft) - f * (.9 * d.width()); else var h = "y", m = Math.abs(c[0].offsetTop) - f * (.9 * d.height());
                                V(o, m.toString(), {dir: h, scrollEasing: "mcsEaseInOut"})
                            }
                        } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                            if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0])var h = "x", m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0; else var h = "y", m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                            V(o, m.toString(), {dir: h, scrollEasing: "mcsEaseInOut"})
                        }
                }
            }

            var o = e(this), n = o.data(a), i = n.opt, r = n.sequential, l = a + "_" + n.idx, s = e("#mCSB_" + n.idx), c = e("#mCSB_" + n.idx + "_container"), d = c.parent(), u = "input,textarea,select,datalist,keygen,[contenteditable='true']", f = c.find("iframe"), h = ["blur." + l + " keydown." + l + " keyup." + l];
            f.length && f.each(function () {
                e(this).load(function () {
                    W(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function (e) {
                        t(e)
                    })
                })
            }), s.attr("tabindex", "0").bind(h[0], function (e) {
                t(e)
            })
        }, F = function (t, o, n, i, r) {
            function l(e) {
                u.snapAmount && (f.scrollAmount = u.snapAmount instanceof Array ? "x" === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);
                var o = "stepped" !== f.type, a = r ? r : e ? o ? p / 1.5 : g : 1e3 / 60, n = e ? o ? 7.5 : 40 : 2.5, s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)], d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x], m = "x" === f.dir[0] ? s[1] + f.dir[1] * (d[1] * n) : s[0] + f.dir[1] * (d[0] * n), v = "x" === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount), x = "auto" !== f.scrollAmount ? v : m, _ = i ? i : e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear", w = e ? !0 : !1;
                return e && 17 > a && (x = "x" === f.dir[0] ? s[1] : s[0]), V(t, x.toString(), {
                    dir: f.dir[0],
                    scrollEasing: _,
                    dur: a,
                    onComplete: w
                }), e ? void(f.dir = !1) : (clearTimeout(f.step), void(f.step = setTimeout(function () {
                    l()
                }, a)))
            }

            function s() {
                clearTimeout(f.step), K(f, "step"), N(t)
            }

            var c = t.data(a), u = c.opt, f = c.sequential, h = e("#mCSB_" + c.idx + "_container"), m = "stepped" === f.type ? !0 : !1, p = u.scrollInertia < 26 ? 26 : u.scrollInertia, g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
            switch (o) {
                case"on":
                    if (f.dir = [n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y", n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1], N(t), ee(n) && "stepped" === f.type)return;
                    l(m);
                    break;
                case"off":
                    s(), (m || c.tweenRunning && f.dir) && l(!0)
            }
        }, q = function (t) {
            var o = e(this).data(a).opt, n = [];
            return "function" == typeof t && (t = t()), t instanceof Array ? n = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t, n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t), "function" == typeof n[0] && (n[0] = n[0]()), "function" == typeof n[1] && (n[1] = n[1]()), n
        }, Y = function (t, o) {
            if (null != t && "undefined" != typeof t) {
                var n = e(this), i = n.data(a), r = i.opt, l = e("#mCSB_" + i.idx + "_container"), s = l.parent(), c = typeof t;
                o || (o = "x" === r.axis ? "x" : "y");
                var d = "x" === o ? l.outerWidth(!1) : l.outerHeight(!1), f = "x" === o ? l[0].offsetLeft : l[0].offsetTop, h = "x" === o ? "left" : "top";
                switch (c) {
                    case"function":
                        return t();
                    case"object":
                        var m = t.jquery ? t : e(t);
                        if (!m.length)return;
                        return "x" === o ? te(m)[1] : te(m)[0];
                    case"string":
                    case"number":
                        if (ee(t))return Math.abs(t);
                        if (-1 !== t.indexOf("%"))return Math.abs(d * parseInt(t) / 100);
                        if (-1 !== t.indexOf("-="))return Math.abs(f - parseInt(t.split("-=")[1]));
                        if (-1 !== t.indexOf("+=")) {
                            var p = f + parseInt(t.split("+=")[1]);
                            return p >= 0 ? 0 : Math.abs(p)
                        }
                        if (-1 !== t.indexOf("px") && ee(t.split("px")[0]))return Math.abs(t.split("px")[0]);
                        if ("top" === t || "left" === t)return 0;
                        if ("bottom" === t)return Math.abs(s.height() - l.outerHeight(!1));
                        if ("right" === t)return Math.abs(s.width() - l.outerWidth(!1));
                        if ("first" === t || "last" === t) {
                            var m = l.find(":" + t);
                            return "x" === o ? te(m)[1] : te(m)[0]
                        }
                        return e(t).length ? "x" === o ? te(e(t))[1] : te(e(t))[0] : (l.css(h, t), void u.update.call(null, n[0]))
                }
            }
        }, X = function (t) {
            function o() {
                return clearTimeout(f[0].autoUpdate), 0 === l.parents("html").length ? void(l = null) : void(f[0].autoUpdate = setTimeout(function () {
                    return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, void r(3)) : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth, s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void r(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (s.poll.img.n = f.find("img").length, s.poll.img.n === s.poll.img.o) ? void((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) : (s.poll.img.o = s.poll.img.n, void f.find("img").each(function () {
                        n(this)
                    }))
                }, c.advanced.autoUpdateTimeout))
            }

            function n(t) {
                function o(e, t) {
                    return function () {
                        return t.apply(e, arguments)
                    }
                }

                function a() {
                    this.onload = null, e(t).addClass(d[2]), r(2)
                }

                if (e(t).hasClass(d[2]))return void r();
                var n = new Image;
                n.onload = o(n, a), n.src = t.src
            }

            function i() {
                c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");
                var e = 0, t = f.find(c.advanced.updateOnSelectorChange);
                return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function () {
                    e += this.offsetHeight + this.offsetWidth
                }), e
            }

            function r(e) {
                clearTimeout(f[0].autoUpdate), u.update.call(null, l[0], e)
            }

            var l = e(this), s = l.data(a), c = s.opt, f = e("#mCSB_" + s.idx + "_container");
            return t ? (clearTimeout(f[0].autoUpdate), void K(f[0], "autoUpdate")) : void o()
        }, j = function (e, t, o) {
            return Math.round(e / t) * t - o
        }, N = function (t) {
            var o = t.data(a), n = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");
            n.each(function () {
                J.call(this)
            })
        }, V = function (t, o, n) {
            function i(e) {
                return s && c.callbacks[e] && "function" == typeof c.callbacks[e]
            }

            function r() {
                return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= w]
            }

            function l() {
                var e = [h[0].offsetTop, h[0].offsetLeft], o = [x[0].offsetTop, x[0].offsetLeft], a = [h.outerHeight(!1), h.outerWidth(!1)], i = [f.height(), f.width()];
                t[0].mcs = {
                    content: h,
                    top: e[0],
                    left: e[1],
                    draggerTop: o[0],
                    draggerLeft: o[1],
                    topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(a[0]) - i[0])),
                    leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(a[1]) - i[1])),
                    direction: n.dir
                }
            }

            var s = t.data(a), c = s.opt, d = {
                trigger: "internal",
                dir: "y",
                scrollEasing: "mcsEaseOut",
                drag: !1,
                dur: c.scrollInertia,
                overwrite: "all",
                callbacks: !0,
                onStart: !0,
                onUpdate: !0,
                onComplete: !0
            }, n = e.extend(d, n), u = [n.dur, n.drag ? 0 : n.dur], f = e("#mCSB_" + s.idx), h = e("#mCSB_" + s.idx + "_container"), m = h.parent(), p = c.callbacks.onTotalScrollOffset ? q.call(t, c.callbacks.onTotalScrollOffset) : [0, 0], g = c.callbacks.onTotalScrollBackOffset ? q.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
            if (s.trigger = n.trigger, (0 !== m.scrollTop() || 0 !== m.scrollLeft()) && (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)), "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o) {
                if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount) {
                    var v = c.snapAmount instanceof Array ? "x" === n.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;
                    o = j(o, v, c.snapOffset)
                }
                switch (n.dir) {
                    case"x":
                        var x = e("#mCSB_" + s.idx + "_dragger_horizontal"), _ = "left", w = h[0].offsetLeft, S = [f.width() - h.outerWidth(!1), x.parent().width() - x.width()], b = [o, 0 === o ? 0 : o / s.scrollRatio.x], y = p[1], B = g[1], T = y > 0 ? y / s.scrollRatio.x : 0, k = B > 0 ? B / s.scrollRatio.x : 0;
                        break;
                    case"y":
                        var x = e("#mCSB_" + s.idx + "_dragger_vertical"), _ = "top", w = h[0].offsetTop, S = [f.height() - h.outerHeight(!1), x.parent().height() - x.height()], b = [o, 0 === o ? 0 : o / s.scrollRatio.y], y = p[0], B = g[0], T = y > 0 ? y / s.scrollRatio.y : 0, k = B > 0 ? B / s.scrollRatio.y : 0
                }
                b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= S[1] ? b = [S[0], S[1]] : b[0] = -b[0], t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(h[0].onCompleteTimeout), Q(x[0], _, Math.round(b[1]), u[1], n.scrollEasing), (s.tweenRunning || !(0 === w && b[0] >= 0 || w === S[0] && b[0] <= S[0])) && Q(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, {
                    onStart: function () {
                        n.callbacks && n.onStart && !s.tweenRunning && (i("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, C(x), s.cbOffsets = r())
                    }, onUpdate: function () {
                        n.callbacks && n.onUpdate && i("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]))
                    }, onComplete: function () {
                        if (n.callbacks && n.onComplete) {
                            "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                            var e = h[0].idleTimer || 0;
                            h[0].onCompleteTimeout = setTimeout(function () {
                                i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])), i("onTotalScroll") && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])), i("onTotalScrollBack") && b[1] <= k && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, h[0].idleTimer = 0, C(x, "hide")
                            }, e)
                        }
                    }
                })
            }
        }, Q = function (e, t, o, a, n, i, r) {
            function l() {
                S.stop || (x || m.call(), x = G() - v, s(), x >= S.time && (S.time = x > S.time ? x + f - (x - S.time) : x + f - 1, S.time < x + 1 && (S.time = x + 1)), S.time < a ? S.id = h(l) : g.call())
            }

            function s() {
                a > 0 ? (S.currVal = u(S.time, _, b, a, n), w[t] = Math.round(S.currVal) + "px") : w[t] = o + "px", p.call()
            }

            function c() {
                f = 1e3 / 60, S.time = x + f, h = window.requestAnimationFrame ? window.requestAnimationFrame : function (e) {
                    return s(), setTimeout(e, .01)
                }, S.id = h(l)
            }

            function d() {
                null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id), S.id = null)
            }

            function u(e, t, o, a, n) {
                switch (n) {
                    case"linear":
                    case"mcsLinear":
                        return o * e / a + t;
                    case"mcsLinearOut":
                        return e /= a, e--, o * Math.sqrt(1 - e * e) + t;
                    case"easeInOutSmooth":
                        return e /= a / 2, 1 > e ? o / 2 * e * e + t : (e--, -o / 2 * (e * (e - 2) - 1) + t);
                    case"easeInOutStrong":
                        return e /= a / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                    case"easeInOut":
                    case"mcsEaseInOut":
                        return e /= a / 2, 1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);
                    case"easeOutSmooth":
                        return e /= a, e--, -o * (e * e * e * e - 1) + t;
                    case"easeOutStrong":
                        return o * (-Math.pow(2, -10 * e / a) + 1) + t;
                    case"easeOut":
                    case"mcsEaseOut":
                    default:
                        var i = (e /= a) * e, r = i * e;
                        return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e)
                }
            }

            e._mTween || (e._mTween = {top: {}, left: {}});
            var f, h, r = r || {}, m = r.onStart || function () {
                }, p = r.onUpdate || function () {
                }, g = r.onComplete || function () {
                }, v = G(), x = 0, _ = e.offsetTop, w = e.style, S = e._mTween[t];
            "left" === t && (_ = e.offsetLeft);
            var b = o - _;
            S.stop = 0, "none" !== i && d(), c()
        }, G = function () {
            return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
        }, J = function () {
            var e = this;
            e._mTween || (e._mTween = {top: {}, left: {}});
            for (var t = ["top", "left"], o = 0; o < t.length; o++) {
                var a = t[o];
                e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id), e._mTween[a].id = null, e._mTween[a].stop = 1)
            }
        }, K = function (e, t) {
            try {
                delete e[t]
            } catch (o) {
                e[t] = null
            }
        }, Z = function (e) {
            return !(e.which && 1 !== e.which)
        }, $ = function (e) {
            var t = e.originalEvent.pointerType;
            return !(t && "touch" !== t && 2 !== t)
        }, ee = function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, te = function (e) {
            var t = e.parents(".mCSB_container");
            return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
        }, oe = function () {
            function e() {
                var e = ["webkit", "moz", "ms", "o"];
                if ("hidden"in document)return "hidden";
                for (var t = 0; t < e.length; t++)if (e[t] + "Hidden"in document)return e[t] + "Hidden";
                return null
            }

            var t = e();
            return t ? document[t] : !1
        };
        e.fn[o] = function (t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[o] = function (t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[o].defaults = i, window[o] = !0, e(window).load(function () {
            e(n)[o](), e.extend(e.expr[":"], {
                mcsInView: e.expr[":"].mcsInView || function (t) {
                    var o, a, n = e(t), i = n.parents(".mCSB_container");
                    if (i.length)return o = i.parent(), a = [i[0].offsetTop, i[0].offsetLeft], a[0] + te(n)[0] >= 0 && a[0] + te(n)[0] < o.height() - n.outerHeight(!1) && a[1] + te(n)[1] >= 0 && a[1] + te(n)[1] < o.width() - n.outerWidth(!1)
                }, mcsOverflow: e.expr[":"].mcsOverflow || function (t) {
                    var o = e(t).data(a);
                    if (o)return o.overflowed[0] || o.overflowed[1]
                }
            })
        })
    })
});