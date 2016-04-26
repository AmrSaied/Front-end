(function (t) {
    function e(t, e, n) {
        switch (arguments.length) {
            case 2:
                return null != t ? t : e;
            case 3:
                return null != t ? t : null != e ? e : n;
            default:
                throw new Error("Implement me")
        }
    }

    function n(t, e) {
        return Ht.call(t, e)
    }

    function i() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function r(t) {
        Dt.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
    }

    function s(t, e) {
        var n = !0;
        return g(function () {
            return n && (r(t), n = !1), e.apply(this, arguments)
        }, e)
    }

    function o(t, e) {
        ye[t] || (r(e), ye[t] = !0)
    }

    function a(t, e) {
        return function (n) {
            return v(t.call(this, n), e)
        }
    }

    function l(t, e) {
        return function (n) {
            return this.localeData().ordinal(t.call(this, n), e)
        }
    }

    function u(t, e) {
        var n, i, r = 12 * (e.year() - t.year()) + (e.month() - t.month()), s = t.clone().add(r, "months");
        return 0 > e - s ? (n = t.clone().add(r - 1, "months"), i = (e - s) / (s - n)) : (n = t.clone().add(r + 1, "months"), i = (e - s) / (n - s)), -(r + i)
    }

    function c(t, e, n) {
        var i;
        return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? (i = t.isPM(n), i && 12 > e && (e += 12), i || 12 !== e || (e = 0), e) : e
    }

    function d() {
    }

    function h(t, e) {
        e !== !1 && O(t), m(this, t), this._d = new Date(+t._d), Se === !1 && (Se = !0, Dt.updateOffset(this), Se = !1)
    }

    function f(t) {
        var e = C(t), n = e.year || 0, i = e.quarter || 0, r = e.month || 0, s = e.week || 0, o = e.day || 0, a = e.hour || 0, l = e.minute || 0, u = e.second || 0, c = e.millisecond || 0;
        this._milliseconds = +c + 1e3 * u + 6e4 * l + 36e5 * a, this._days = +o + 7 * s, this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = Dt.localeData(), this._bubble()
    }

    function g(t, e) {
        for (var i in e)n(e, i) && (t[i] = e[i]);
        return n(e, "toString") && (t.toString = e.toString), n(e, "valueOf") && (t.valueOf = e.valueOf), t
    }

    function m(t, e) {
        var n, i, r;
        if ("undefined" != typeof e._isAMomentObject && (t._isAMomentObject = e._isAMomentObject), "undefined" != typeof e._i && (t._i = e._i), "undefined" != typeof e._f && (t._f = e._f), "undefined" != typeof e._l && (t._l = e._l), "undefined" != typeof e._strict && (t._strict = e._strict), "undefined" != typeof e._tzm && (t._tzm = e._tzm), "undefined" != typeof e._isUTC && (t._isUTC = e._isUTC), "undefined" != typeof e._offset && (t._offset = e._offset), "undefined" != typeof e._pf && (t._pf = e._pf), "undefined" != typeof e._locale && (t._locale = e._locale), Lt.length > 0)for (n in Lt)i = Lt[n], r = e[i], "undefined" != typeof r && (t[i] = r);
        return t
    }

    function p(t) {
        return 0 > t ? Math.ceil(t) : Math.floor(t)
    }

    function v(t, e, n) {
        for (var i = "" + Math.abs(t), r = t >= 0; i.length < e;)i = "0" + i;
        return (r ? n ? "+" : "" : "-") + i
    }

    function y(t, e) {
        var n = {milliseconds: 0, months: 0};
        return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, n.milliseconds = +e - +t.clone().add(n.months, "M"), n
    }

    function w(t, e) {
        var n;
        return e = P(e, t), t.isBefore(e) ? n = y(t, e) : (n = y(e, t), n.milliseconds = -n.milliseconds, n.months = -n.months), n
    }

    function S(t, e) {
        return function (n, i) {
            var r, s;
            return null === i || isNaN(+i) || (o(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), s = n, n = i, i = s), n = "string" == typeof n ? +n : n, r = Dt.duration(n, i), D(this, r, t), this
        }
    }

    function D(t, e, n, i) {
        var r = e._milliseconds, s = e._days, o = e._months;
        i = null == i ? !0 : i, r && t._d.setTime(+t._d + r * n), s && mt(t, "Date", gt(t, "Date") + s * n), o && ft(t, gt(t, "Month") + o * n), i && Dt.updateOffset(t, s || o)
    }

    function b(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }

    function _(t) {
        return "[object Date]" === Object.prototype.toString.call(t) || t instanceof Date
    }

    function E(t, e, n) {
        var i, r = Math.min(t.length, e.length), s = Math.abs(t.length - e.length), o = 0;
        for (i = 0; r > i; i++)(n && t[i] !== e[i] || !n && M(t[i]) !== M(e[i])) && o++;
        return o + s
    }

    function T(t) {
        if (t) {
            var e = t.toLowerCase().replace(/(.)s$/, "$1");
            t = de[t] || he[e] || e
        }
        return t
    }

    function C(t) {
        var e, i, r = {};
        for (i in t)n(t, i) && (e = T(i), e && (r[e] = t[i]));
        return r
    }

    function H(e) {
        var n, i;
        if (0 === e.indexOf("week"))n = 7, i = "day"; else {
            if (0 !== e.indexOf("month"))return;
            n = 12, i = "month"
        }
        Dt[e] = function (r, s) {
            var o, a, l = Dt._locale[e], u = [];
            if ("number" == typeof r && (s = r, r = t), a = function (t) {
                    var e = Dt().utc().set(i, t);
                    return l.call(Dt._locale, e, r || "")
                }, null != s)return a(s);
            for (o = 0; n > o; o++)u.push(a(o));
            return u
        }
    }

    function M(t) {
        var e = +t, n = 0;
        return 0 !== e && isFinite(e) && (n = e >= 0 ? Math.floor(e) : Math.ceil(e)), n
    }

    function k(t, e) {
        return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
    }

    function x(t, e, n) {
        return ut(Dt([t, 11, 31 + e - n]), e, n).week
    }

    function R(t) {
        return Y(t) ? 366 : 365
    }

    function Y(t) {
        return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
    }

    function O(t) {
        var e;
        t._a && -2 === t._pf.overflow && (e = t._a[kt] < 0 || t._a[kt] > 11 ? kt : t._a[xt] < 1 || t._a[xt] > k(t._a[Mt], t._a[kt]) ? xt : t._a[Rt] < 0 || t._a[Rt] > 24 || 24 === t._a[Rt] && (0 !== t._a[Yt] || 0 !== t._a[Ot] || 0 !== t._a[Ft]) ? Rt : t._a[Yt] < 0 || t._a[Yt] > 59 ? Yt : t._a[Ot] < 0 || t._a[Ot] > 59 ? Ot : t._a[Ft] < 0 || t._a[Ft] > 999 ? Ft : -1, t._pf._overflowDayOfYear && (Mt > e || e > xt) && (e = xt), t._pf.overflow = e)
    }

    function F(e) {
        return null == e._isValid && (e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated, e._strict && (e._isValid = e._isValid && 0 === e._pf.charsLeftOver && 0 === e._pf.unusedTokens.length && e._pf.bigHour === t)), e._isValid
    }

    function G(t) {
        return t ? t.toLowerCase().replace("_", "-") : t
    }

    function L(t) {
        for (var e, n, i, r, s = 0; s < t.length;) {
            for (r = G(t[s]).split("-"), e = r.length, n = G(t[s + 1]), n = n ? n.split("-") : null; e > 0;) {
                if (i = z(r.slice(0, e).join("-")))return i;
                if (n && n.length >= e && E(r, n, !0) >= e - 1)break;
                e--
            }
            s++
        }
        return null
    }

    function z(t) {
        var e = null;
        if (!Gt[t] && zt)try {
            e = Dt.locale(), require("./locale/" + t), Dt.locale(e)
        } catch (n) {
        }
        return Gt[t]
    }

    function P(t, e) {
        var n, i;
        return e._isUTC ? (n = e.clone(), i = (Dt.isMoment(t) || _(t) ? +t : +Dt(t)) - +n, n._d.setTime(+n._d + i), Dt.updateOffset(n, !1), n) : Dt(t).local()
    }

    function I(t) {
        return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
    }

    function A(t) {
        var e, n, i = t.match(Wt);
        for (e = 0, n = i.length; n > e; e++)i[e] = ve[i[e]] ? ve[i[e]] : I(i[e]);
        return function (r) {
            var s = "";
            for (e = 0; n > e; e++)s += i[e]instanceof Function ? i[e].call(r, t) : i[e];
            return s
        }
    }

    function W(t, e) {
        return t.isValid() ? (e = V(e, t.localeData()), fe[e] || (fe[e] = A(e)), fe[e](t)) : t.localeData().invalidDate()
    }

    function V(t, e) {
        function n(t) {
            return e.longDateFormat(t) || t
        }

        var i = 5;
        for (Vt.lastIndex = 0; i >= 0 && Vt.test(t);)t = t.replace(Vt, n), Vt.lastIndex = 0, i -= 1;
        return t
    }

    function N(t, e) {
        var n, i = e._strict;
        switch (t) {
            case"Q":
                return Kt;
            case"DDDD":
                return ee;
            case"YYYY":
            case"GGGG":
            case"gggg":
                return i ? ne : Ut;
            case"Y":
            case"G":
            case"g":
                return re;
            case"YYYYYY":
            case"YYYYY":
            case"GGGGG":
            case"ggggg":
                return i ? ie : Zt;
            case"S":
                if (i)return Kt;
            case"SS":
                if (i)return te;
            case"SSS":
                if (i)return ee;
            case"DDD":
                return Bt;
            case"MMM":
            case"MMMM":
            case"dd":
            case"ddd":
            case"dddd":
                return qt;
            case"a":
            case"A":
                return e._locale._meridiemParse;
            case"x":
                return Jt;
            case"X":
                return Qt;
            case"Z":
            case"ZZ":
                return $t;
            case"T":
                return Xt;
            case"SSSS":
                return jt;
            case"MM":
            case"DD":
            case"YY":
            case"GG":
            case"gg":
            case"HH":
            case"hh":
            case"mm":
            case"ss":
            case"ww":
            case"WW":
                return i ? te : Nt;
            case"M":
            case"D":
            case"d":
            case"H":
            case"h":
            case"m":
            case"s":
            case"w":
            case"W":
            case"e":
            case"E":
                return Nt;
            case"Do":
                return i ? e._locale._ordinalParse : e._locale._ordinalParseLenient;
            default:
                return n = new RegExp(Q(J(t.replace("\\", "")), "i"))
        }
    }

    function B(t) {
        t = t || "";
        var e = t.match($t) || [], n = e[e.length - 1] || [], i = (n + "").match(ue) || ["-", 0, 0], r = +(60 * i[1]) + M(i[2]);
        return "+" === i[0] ? r : -r
    }

    function U(t, e, n) {
        var i, r = n._a;
        switch (t) {
            case"Q":
                null != e && (r[kt] = 3 * (M(e) - 1));
                break;
            case"M":
            case"MM":
                null != e && (r[kt] = M(e) - 1);
                break;
            case"MMM":
            case"MMMM":
                i = n._locale.monthsParse(e, t, n._strict), null != i ? r[kt] = i : n._pf.invalidMonth = e;
                break;
            case"D":
            case"DD":
                null != e && (r[xt] = M(e));
                break;
            case"Do":
                null != e && (r[xt] = M(parseInt(e.match(/\d{1,2}/)[0], 10)));
                break;
            case"DDD":
            case"DDDD":
                null != e && (n._dayOfYear = M(e));
                break;
            case"YY":
                r[Mt] = Dt.parseTwoDigitYear(e);
                break;
            case"YYYY":
            case"YYYYY":
            case"YYYYYY":
                r[Mt] = M(e);
                break;
            case"a":
            case"A":
                n._meridiem = e;
                break;
            case"h":
            case"hh":
                n._pf.bigHour = !0;
            case"H":
            case"HH":
                r[Rt] = M(e);
                break;
            case"m":
            case"mm":
                r[Yt] = M(e);
                break;
            case"s":
            case"ss":
                r[Ot] = M(e);
                break;
            case"S":
            case"SS":
            case"SSS":
            case"SSSS":
                r[Ft] = M(1e3 * ("0." + e));
                break;
            case"x":
                n._d = new Date(M(e));
                break;
            case"X":
                n._d = new Date(1e3 * parseFloat(e));
                break;
            case"Z":
            case"ZZ":
                n._useUTC = !0, n._tzm = B(e);
                break;
            case"dd":
            case"ddd":
            case"dddd":
                i = n._locale.weekdaysParse(e), null != i ? (n._w = n._w || {}, n._w.d = i) : n._pf.invalidWeekday = e;
                break;
            case"w":
            case"ww":
            case"W":
            case"WW":
            case"d":
            case"e":
            case"E":
                t = t.substr(0, 1);
            case"gggg":
            case"GGGG":
            case"GGGGG":
                t = t.substr(0, 2), e && (n._w = n._w || {}, n._w[t] = M(e));
                break;
            case"gg":
            case"GG":
                n._w = n._w || {}, n._w[t] = Dt.parseTwoDigitYear(e)
        }
    }

    function Z(t) {
        var n, i, r, s, o, a, l;
        n = t._w, null != n.GG || null != n.W || null != n.E ? (o = 1, a = 4, i = e(n.GG, t._a[Mt], ut(Dt(), 1, 4).year), r = e(n.W, 1), s = e(n.E, 1)) : (o = t._locale._week.dow, a = t._locale._week.doy, i = e(n.gg, t._a[Mt], ut(Dt(), o, a).year), r = e(n.w, 1), null != n.d ? (s = n.d, o > s && ++r) : s = null != n.e ? n.e + o : o), l = ct(i, r, s, a, o), t._a[Mt] = l.year, t._dayOfYear = l.dayOfYear
    }

    function j(t) {
        var n, i, r, s, o = [];
        if (!t._d) {
            for (r = $(t), t._w && null == t._a[xt] && null == t._a[kt] && Z(t), t._dayOfYear && (s = e(t._a[Mt], r[Mt]), t._dayOfYear > R(s) && (t._pf._overflowDayOfYear = !0), i = st(s, 0, t._dayOfYear), t._a[kt] = i.getUTCMonth(), t._a[xt] = i.getUTCDate()), n = 0; 3 > n && null == t._a[n]; ++n)t._a[n] = o[n] = r[n];
            for (; 7 > n; n++)t._a[n] = o[n] = null == t._a[n] ? 2 === n ? 1 : 0 : t._a[n];
            24 === t._a[Rt] && 0 === t._a[Yt] && 0 === t._a[Ot] && 0 === t._a[Ft] && (t._nextDay = !0, t._a[Rt] = 0), t._d = (t._useUTC ? st : rt).apply(null, o), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[Rt] = 24)
        }
    }

    function q(t) {
        var e;
        t._d || (e = C(t._i), t._a = [e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], j(t))
    }

    function $(t) {
        var e = new Date;
        return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
    }

    function X(e) {
        if (e._f === Dt.ISO_8601)return void tt(e);
        e._a = [], e._pf.empty = !0;
        var n, i, r, s, o, a = "" + e._i, l = a.length, u = 0;
        for (r = V(e._f, e._locale).match(Wt) || [], n = 0; n < r.length; n++)s = r[n], i = (a.match(N(s, e)) || [])[0], i && (o = a.substr(0, a.indexOf(i)), o.length > 0 && e._pf.unusedInput.push(o), a = a.slice(a.indexOf(i) + i.length), u += i.length), ve[s] ? (i ? e._pf.empty = !1 : e._pf.unusedTokens.push(s), U(s, i, e)) : e._strict && !i && e._pf.unusedTokens.push(s);
        e._pf.charsLeftOver = l - u, a.length > 0 && e._pf.unusedInput.push(a), e._pf.bigHour === !0 && e._a[Rt] <= 12 && (e._pf.bigHour = t), e._a[Rt] = c(e._locale, e._a[Rt], e._meridiem), j(e), O(e)
    }

    function J(t) {
        return t.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, n, i, r) {
            return e || n || i || r
        })
    }

    function Q(t) {
        return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function K(t) {
        var e, n, r, s, o;
        if (0 === t._f.length)return t._pf.invalidFormat = !0, void(t._d = new Date(NaN));
        for (s = 0; s < t._f.length; s++)o = 0, e = m({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._pf = i(), e._f = t._f[s], X(e), F(e) && (o += e._pf.charsLeftOver, o += 10 * e._pf.unusedTokens.length, e._pf.score = o, (null == r || r > o) && (r = o, n = e));
        g(t, n || e)
    }

    function tt(t) {
        var e, n, i = t._i, r = se.exec(i);
        if (r) {
            for (t._pf.iso = !0, e = 0, n = ae.length; n > e; e++)if (ae[e][1].exec(i)) {
                t._f = ae[e][0] + (r[6] || " ");
                break
            }
            for (e = 0, n = le.length; n > e; e++)if (le[e][1].exec(i)) {
                t._f += le[e][0];
                break
            }
            i.match($t) && (t._f += "Z"), X(t)
        } else t._isValid = !1
    }

    function et(t) {
        tt(t), t._isValid === !1 && (delete t._isValid, Dt.createFromInputFallback(t))
    }

    function nt(t, e) {
        var n, i = [];
        for (n = 0; n < t.length; ++n)i.push(e(t[n], n));
        return i
    }

    function it(e) {
        var n, i = e._i;
        i === t ? e._d = new Date : _(i) ? e._d = new Date(+i) : null !== (n = Pt.exec(i)) ? e._d = new Date(+n[1]) : "string" == typeof i ? et(e) : b(i) ? (e._a = nt(i.slice(0), function (t) {
            return parseInt(t, 10)
        }), j(e)) : "object" == typeof i ? q(e) : "number" == typeof i ? e._d = new Date(i) : Dt.createFromInputFallback(e)
    }

    function rt(t, e, n, i, r, s, o) {
        var a = new Date(t, e, n, i, r, s, o);
        return 1970 > t && a.setFullYear(t), a
    }

    function st(t) {
        var e = new Date(Date.UTC.apply(null, arguments));
        return 1970 > t && e.setUTCFullYear(t), e
    }

    function ot(t, e) {
        if ("string" == typeof t)if (isNaN(t)) {
            if (t = e.weekdaysParse(t), "number" != typeof t)return null
        } else t = parseInt(t, 10);
        return t
    }

    function at(t, e, n, i, r) {
        return r.relativeTime(e || 1, !!n, t, i)
    }

    function lt(t, e, n) {
        var i = Dt.duration(t).abs(), r = Ct(i.as("s")), s = Ct(i.as("m")), o = Ct(i.as("h")), a = Ct(i.as("d")), l = Ct(i.as("M")), u = Ct(i.as("y")), c = r < ge.s && ["s", r] || 1 === s && ["m"] || s < ge.m && ["mm", s] || 1 === o && ["h"] || o < ge.h && ["hh", o] || 1 === a && ["d"] || a < ge.d && ["dd", a] || 1 === l && ["M"] || l < ge.M && ["MM", l] || 1 === u && ["y"] || ["yy", u];
        return c[2] = e, c[3] = +t > 0, c[4] = n, at.apply({}, c)
    }

    function ut(t, e, n) {
        var i, r = n - e, s = n - t.day();
        return s > r && (s -= 7), r - 7 > s && (s += 7), i = Dt(t).add(s, "d"), {
            week: Math.ceil(i.dayOfYear() / 7),
            year: i.year()
        }
    }

    function ct(t, e, n, i, r) {
        var s, o, a = st(t, 0, 1).getUTCDay();
        return a = 0 === a ? 7 : a, n = null != n ? n : r, s = r - a + (a > i ? 7 : 0) - (r > a ? 7 : 0), o = 7 * (e - 1) + (n - r) + s + 1, {
            year: o > 0 ? t : t - 1,
            dayOfYear: o > 0 ? o : R(t - 1) + o
        }
    }

    function dt(e) {
        var n, i = e._i, r = e._f;
        return e._locale = e._locale || Dt.localeData(e._l), null === i || r === t && "" === i ? Dt.invalid({nullInput: !0}) : ("string" == typeof i && (e._i = i = e._locale.preparse(i)), Dt.isMoment(i) ? new h(i, !0) : (r ? b(r) ? K(e) : X(e) : it(e), n = new h(e), n._nextDay && (n.add(1, "d"), n._nextDay = t), n))
    }

    function ht(t, e) {
        var n, i;
        if (1 === e.length && b(e[0]) && (e = e[0]), !e.length)return Dt();
        for (n = e[0], i = 1; i < e.length; ++i)e[i][t](n) && (n = e[i]);
        return n
    }

    function ft(t, e) {
        var n;
        return "string" == typeof e && (e = t.localeData().monthsParse(e), "number" != typeof e) ? t : (n = Math.min(t.date(), k(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t)
    }

    function gt(t, e) {
        return t._d["get" + (t._isUTC ? "UTC" : "") + e]()
    }

    function mt(t, e, n) {
        return "Month" === e ? ft(t, n) : t._d["set" + (t._isUTC ? "UTC" : "") + e](n)
    }

    function pt(t, e) {
        return function (n) {
            return null != n ? (mt(this, t, n), Dt.updateOffset(this, e), this) : gt(this, t)
        }
    }

    function vt(t) {
        return 400 * t / 146097
    }

    function yt(t) {
        return 146097 * t / 400
    }

    function wt(t) {
        Dt.duration.fn[t] = function () {
            return this._data[t]
        }
    }

    function St(t) {
        "undefined" == typeof ender && (bt = Tt.moment, Tt.moment = t ? s("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", Dt) : Dt)
    }

    for (var Dt, bt, _t, Et = "2.9.0", Tt = "undefined" == typeof global || "undefined" != typeof window && window !== global.window ? this : global, Ct = Math.round, Ht = Object.prototype.hasOwnProperty, Mt = 0, kt = 1, xt = 2, Rt = 3, Yt = 4, Ot = 5, Ft = 6, Gt = {}, Lt = [], zt = "undefined" != typeof module && module && module.exports, Pt = /^\/?Date\((\-?\d+)/i, It = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, At = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Wt = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, Vt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Nt = /\d\d?/, Bt = /\d{1,3}/, Ut = /\d{1,4}/, Zt = /[+\-]?\d{1,6}/, jt = /\d+/, qt = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, $t = /Z|[\+\-]\d\d:?\d\d/gi, Xt = /T/i, Jt = /[\+\-]?\d+/, Qt = /[\+\-]?\d+(\.\d{1,3})?/, Kt = /\d/, te = /\d\d/, ee = /\d{3}/, ne = /\d{4}/, ie = /[+-]?\d{6}/, re = /[+-]?\d+/, se = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, oe = "YYYY-MM-DDTHH:mm:ssZ", ae = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], le = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], ue = /([\+\-]|\d\d)/gi, ce = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }), de = {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        D: "date",
        w: "week",
        W: "isoWeek",
        M: "month",
        Q: "quarter",
        y: "year",
        DDD: "dayOfYear",
        e: "weekday",
        E: "isoWeekday",
        gg: "weekYear",
        GG: "isoWeekYear"
    }, he = {
        dayofyear: "dayOfYear",
        isoweekday: "isoWeekday",
        isoweek: "isoWeek",
        weekyear: "weekYear",
        isoweekyear: "isoWeekYear"
    }, fe = {}, ge = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, me = "DDD w W M D d".split(" "), pe = "M D H h m s w W".split(" "), ve = {
        M: function () {
            return this.month() + 1
        }, MMM: function (t) {
            return this.localeData().monthsShort(this, t)
        }, MMMM: function (t) {
            return this.localeData().months(this, t)
        }, D: function () {
            return this.date()
        }, DDD: function () {
            return this.dayOfYear()
        }, d: function () {
            return this.day()
        }, dd: function (t) {
            return this.localeData().weekdaysMin(this, t)
        }, ddd: function (t) {
            return this.localeData().weekdaysShort(this, t)
        }, dddd: function (t) {
            return this.localeData().weekdays(this, t)
        }, w: function () {
            return this.week()
        }, W: function () {
            return this.isoWeek()
        }, YY: function () {
            return v(this.year() % 100, 2)
        }, YYYY: function () {
            return v(this.year(), 4)
        }, YYYYY: function () {
            return v(this.year(), 5)
        }, YYYYYY: function () {
            var t = this.year(), e = t >= 0 ? "+" : "-";
            return e + v(Math.abs(t), 6)
        }, gg: function () {
            return v(this.weekYear() % 100, 2)
        }, gggg: function () {
            return v(this.weekYear(), 4)
        }, ggggg: function () {
            return v(this.weekYear(), 5)
        }, GG: function () {
            return v(this.isoWeekYear() % 100, 2)
        }, GGGG: function () {
            return v(this.isoWeekYear(), 4)
        }, GGGGG: function () {
            return v(this.isoWeekYear(), 5)
        }, e: function () {
            return this.weekday()
        }, E: function () {
            return this.isoWeekday()
        }, a: function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), !0)
        }, A: function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), !1)
        }, H: function () {
            return this.hours()
        }, h: function () {
            return this.hours() % 12 || 12
        }, m: function () {
            return this.minutes()
        }, s: function () {
            return this.seconds()
        }, S: function () {
            return M(this.milliseconds() / 100)
        }, SS: function () {
            return v(M(this.milliseconds() / 10), 2)
        }, SSS: function () {
            return v(this.milliseconds(), 3)
        }, SSSS: function () {
            return v(this.milliseconds(), 3)
        }, Z: function () {
            var t = this.utcOffset(), e = "+";
            return 0 > t && (t = -t, e = "-"), e + v(M(t / 60), 2) + ":" + v(M(t) % 60, 2)
        }, ZZ: function () {
            var t = this.utcOffset(), e = "+";
            return 0 > t && (t = -t, e = "-"), e + v(M(t / 60), 2) + v(M(t) % 60, 2)
        }, z: function () {
            return this.zoneAbbr()
        }, zz: function () {
            return this.zoneName()
        }, x: function () {
            return this.valueOf()
        }, X: function () {
            return this.unix()
        }, Q: function () {
            return this.quarter()
        }
    }, ye = {}, we = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"], Se = !1; me.length;)_t = me.pop(), ve[_t + "o"] = l(ve[_t], _t);
    for (; pe.length;)_t = pe.pop(), ve[_t + _t] = a(ve[_t], 2);
    ve.DDDD = a(ve.DDD, 3), g(d.prototype, {
        set: function (t) {
            var e, n;
            for (n in t)e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e;
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function (t) {
            return this._months[t.month()]
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function (t) {
            return this._monthsShort[t.month()]
        },
        monthsParse: function (t, e, n) {
            var i, r, s;
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; 12 > i; i++) {
                if (r = Dt.utc([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (s = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[i] = new RegExp(s.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t))return i;
                if (n && "MMM" === e && this._shortMonthsParse[i].test(t))return i;
                if (!n && this._monthsParse[i].test(t))return i
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function (t) {
            return this._weekdays[t.day()]
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function (t) {
            return this._weekdaysShort[t.day()]
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function (t) {
            return this._weekdaysMin[t.day()]
        },
        weekdaysParse: function (t) {
            var e, n, i;
            for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++)if (this._weekdaysParse[e] || (n = Dt([2e3, 1]).day(e), i = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[e] = new RegExp(i.replace(".", ""), "i")), this._weekdaysParse[e].test(t))return e
        },
        _longDateFormat: {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        longDateFormat: function (t) {
            var e = this._longDateFormat[t];
            return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (t) {
                return t.slice(1)
            }), this._longDateFormat[t] = e), e
        },
        isPM: function (t) {
            return "p" === (t + "").toLowerCase().charAt(0)
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function (t, e, n) {
            return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function (t, e, n) {
            var i = this._calendar[t];
            return "function" == typeof i ? i.apply(e, [n]) : i
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function (t, e, n, i) {
            var r = this._relativeTime[n];
            return "function" == typeof r ? r(t, e, n, i) : r.replace(/%d/i, t)
        },
        pastFuture: function (t, e) {
            var n = this._relativeTime[t > 0 ? "future" : "past"];
            return "function" == typeof n ? n(e) : n.replace(/%s/i, e)
        },
        ordinal: function (t) {
            return this._ordinal.replace("%d", t)
        },
        _ordinal: "%d",
        _ordinalParse: /\d{1,2}/,
        preparse: function (t) {
            return t
        },
        postformat: function (t) {
            return t
        },
        week: function (t) {
            return ut(t, this._week.dow, this._week.doy).week
        },
        _week: {dow: 0, doy: 6},
        firstDayOfWeek: function () {
            return this._week.dow
        },
        firstDayOfYear: function () {
            return this._week.doy
        },
        _invalidDate: "Invalid date",
        invalidDate: function () {
            return this._invalidDate
        }
    }), Dt = function (e, n, r, s) {
        var o;
        return "boolean" == typeof r && (s = r, r = t), o = {}, o._isAMomentObject = !0, o._i = e, o._f = n, o._l = r, o._strict = s, o._isUTC = !1, o._pf = i(), dt(o)
    }, Dt.suppressDeprecationWarnings = !1, Dt.createFromInputFallback = s("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (t) {
        t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
    }), Dt.min = function () {
        var t = [].slice.call(arguments, 0);
        return ht("isBefore", t)
    }, Dt.max = function () {
        var t = [].slice.call(arguments, 0);
        return ht("isAfter", t)
    }, Dt.utc = function (e, n, r, s) {
        var o;
        return "boolean" == typeof r && (s = r, r = t), o = {}, o._isAMomentObject = !0, o._useUTC = !0, o._isUTC = !0, o._l = r, o._i = e, o._f = n, o._strict = s, o._pf = i(), dt(o).utc()
    }, Dt.unix = function (t) {
        return Dt(1e3 * t)
    }, Dt.duration = function (t, e) {
        var i, r, s, o, a = t, l = null;
        return Dt.isDuration(t) ? a = {
            ms: t._milliseconds,
            d: t._days,
            M: t._months
        } : "number" == typeof t ? (a = {}, e ? a[e] = t : a.milliseconds = t) : (l = It.exec(t)) ? (i = "-" === l[1] ? -1 : 1, a = {
            y: 0,
            d: M(l[xt]) * i,
            h: M(l[Rt]) * i,
            m: M(l[Yt]) * i,
            s: M(l[Ot]) * i,
            ms: M(l[Ft]) * i
        }) : (l = At.exec(t)) ? (i = "-" === l[1] ? -1 : 1, s = function (t) {
            var e = t && parseFloat(t.replace(",", "."));
            return (isNaN(e) ? 0 : e) * i
        }, a = {
            y: s(l[2]),
            M: s(l[3]),
            d: s(l[4]),
            h: s(l[5]),
            m: s(l[6]),
            s: s(l[7]),
            w: s(l[8])
        }) : null == a ? a = {} : "object" == typeof a && ("from"in a || "to"in a) && (o = w(Dt(a.from), Dt(a.to)), a = {}, a.ms = o.milliseconds, a.M = o.months), r = new f(a), Dt.isDuration(t) && n(t, "_locale") && (r._locale = t._locale), r
    }, Dt.version = Et, Dt.defaultFormat = oe, Dt.ISO_8601 = function () {
    }, Dt.momentProperties = Lt, Dt.updateOffset = function () {
    }, Dt.relativeTimeThreshold = function (e, n) {
        return ge[e] === t ? !1 : n === t ? ge[e] : (ge[e] = n, !0)
    }, Dt.lang = s("moment.lang is deprecated. Use moment.locale instead.", function (t, e) {
        return Dt.locale(t, e)
    }), Dt.locale = function (t, e) {
        var n;
        return t && (n = "undefined" != typeof e ? Dt.defineLocale(t, e) : Dt.localeData(t), n && (Dt.duration._locale = Dt._locale = n)), Dt._locale._abbr
    }, Dt.defineLocale = function (t, e) {
        return null !== e ? (e.abbr = t, Gt[t] || (Gt[t] = new d), Gt[t].set(e), Dt.locale(t), Gt[t]) : (delete Gt[t], null)
    }, Dt.langData = s("moment.langData is deprecated. Use moment.localeData instead.", function (t) {
        return Dt.localeData(t)
    }), Dt.localeData = function (t) {
        var e;
        if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t)return Dt._locale;
        if (!b(t)) {
            if (e = z(t))return e;
            t = [t]
        }
        return L(t)
    }, Dt.isMoment = function (t) {
        return t instanceof h || null != t && n(t, "_isAMomentObject")
    }, Dt.isDuration = function (t) {
        return t instanceof f
    };
    for (_t = we.length - 1; _t >= 0; --_t)H(we[_t]);
    Dt.normalizeUnits = function (t) {
        return T(t)
    }, Dt.invalid = function (t) {
        var e = Dt.utc(NaN);
        return null != t ? g(e._pf, t) : e._pf.userInvalidated = !0, e
    }, Dt.parseZone = function () {
        return Dt.apply(null, arguments).parseZone()
    }, Dt.parseTwoDigitYear = function (t) {
        return M(t) + (M(t) > 68 ? 1900 : 2e3)
    }, Dt.isDate = _, g(Dt.fn = h.prototype, {
        clone: function () {
            return Dt(this)
        },
        valueOf: function () {
            return +this._d - 6e4 * (this._offset || 0)
        },
        unix: function () {
            return Math.floor(+this / 1e3)
        },
        toString: function () {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function () {
            return this._offset ? new Date(+this) : this._d
        },
        toISOString: function () {
            var t = Dt(this).utc();
            return 0 < t.year() && t.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : W(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : W(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },
        toArray: function () {
            var t = this;
            return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
        },
        isValid: function () {
            return F(this)
        },
        isDSTShifted: function () {
            return this._a ? this.isValid() && E(this._a, (this._isUTC ? Dt.utc(this._a) : Dt(this._a)).toArray()) > 0 : !1
        },
        parsingFlags: function () {
            return g({}, this._pf)
        },
        invalidAt: function () {
            return this._pf.overflow
        },
        utc: function (t) {
            return this.utcOffset(0, t)
        },
        local: function (t) {
            return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(this._dateUtcOffset(), "m")), this
        },
        format: function (t) {
            var e = W(this, t || Dt.defaultFormat);
            return this.localeData().postformat(e)
        },
        add: S(1, "add"),
        subtract: S(-1, "subtract"),
        diff: function (t, e, n) {
            var i, r, s = P(t, this), o = 6e4 * (s.utcOffset() - this.utcOffset());
            return e = T(e), "year" === e || "month" === e || "quarter" === e ? (r = u(this, s), "quarter" === e ? r /= 3 : "year" === e && (r /= 12)) : (i = this - s, r = "second" === e ? i / 1e3 : "minute" === e ? i / 6e4 : "hour" === e ? i / 36e5 : "day" === e ? (i - o) / 864e5 : "week" === e ? (i - o) / 6048e5 : i), n ? r : p(r)
        },
        from: function (t, e) {
            return Dt.duration({to: this, from: t}).locale(this.locale()).humanize(!e)
        },
        fromNow: function (t) {
            return this.from(Dt(), t)
        },
        calendar: function (t) {
            var e = t || Dt(), n = P(e, this).startOf("day"), i = this.diff(n, "days", !0), r = -6 > i ? "sameElse" : -1 > i ? "lastWeek" : 0 > i ? "lastDay" : 1 > i ? "sameDay" : 2 > i ? "nextDay" : 7 > i ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(r, this, Dt(e)))
        },
        isLeapYear: function () {
            return Y(this.year())
        },
        isDST: function () {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        },
        day: function (t) {
            var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != t ? (t = ot(t, this.localeData()), this.add(t - e, "d")) : e
        },
        month: pt("Month", !0),
        startOf: function (t) {
            switch (t = T(t)) {
                case"year":
                    this.month(0);
                case"quarter":
                case"month":
                    this.date(1);
                case"week":
                case"isoWeek":
                case"day":
                    this.hours(0);
                case"hour":
                    this.minutes(0);
                case"minute":
                    this.seconds(0);
                case"second":
                    this.milliseconds(0)
            }
            return "week" === t ? this.weekday(0) : "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
        },
        endOf: function (e) {
            return e = T(e), e === t || "millisecond" === e ? this : this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms")
        },
        isAfter: function (t, e) {
            var n;
            return e = T("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = Dt.isMoment(t) ? t : Dt(t), +this > +t) : (n = Dt.isMoment(t) ? +t : +Dt(t), n < +this.clone().startOf(e))
        },
        isBefore: function (t, e) {
            var n;
            return e = T("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = Dt.isMoment(t) ? t : Dt(t), +t > +this) : (n = Dt.isMoment(t) ? +t : +Dt(t), +this.clone().endOf(e) < n)
        },
        isBetween: function (t, e, n) {
            return this.isAfter(t, n) && this.isBefore(e, n)
        },
        isSame: function (t, e) {
            var n;
            return e = T(e || "millisecond"), "millisecond" === e ? (t = Dt.isMoment(t) ? t : Dt(t), +this === +t) : (n = +Dt(t), +this.clone().startOf(e) <= n && n <= +this.clone().endOf(e))
        },
        min: s("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function (t) {
            return t = Dt.apply(null, arguments), this > t ? this : t
        }),
        max: s("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function (t) {
            return t = Dt.apply(null, arguments), t > this ? this : t
        }),
        zone: s("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function (t, e) {
            return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
        }),
        utcOffset: function (t, e) {
            var n, i = this._offset || 0;
            return null != t ? ("string" == typeof t && (t = B(t)), Math.abs(t) < 16 && (t = 60 * t), !this._isUTC && e && (n = this._dateUtcOffset()), this._offset = t, this._isUTC = !0, null != n && this.add(n, "m"), i !== t && (!e || this._changeInProgress ? D(this, Dt.duration(t - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, Dt.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? i : this._dateUtcOffset()
        },
        isLocal: function () {
            return !this._isUTC
        },
        isUtcOffset: function () {
            return this._isUTC
        },
        isUtc: function () {
            return this._isUTC && 0 === this._offset
        },
        zoneAbbr: function () {
            return this._isUTC ? "UTC" : ""
        },
        zoneName: function () {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },
        parseZone: function () {
            return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(B(this._i)), this
        },
        hasAlignedHourOffset: function (t) {
            return t = t ? Dt(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0
        },
        daysInMonth: function () {
            return k(this.year(), this.month())
        },
        dayOfYear: function (t) {
            var e = Ct((Dt(this).startOf("day") - Dt(this).startOf("year")) / 864e5) + 1;
            return null == t ? e : this.add(t - e, "d")
        },
        quarter: function (t) {
            return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
        },
        weekYear: function (t) {
            var e = ut(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return null == t ? e : this.add(t - e, "y")
        },
        isoWeekYear: function (t) {
            var e = ut(this, 1, 4).year;
            return null == t ? e : this.add(t - e, "y")
        },
        week: function (t) {
            var e = this.localeData().week(this);
            return null == t ? e : this.add(7 * (t - e), "d")
        },
        isoWeek: function (t) {
            var e = ut(this, 1, 4).week;
            return null == t ? e : this.add(7 * (t - e), "d")
        },
        weekday: function (t) {
            var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == t ? e : this.add(t - e, "d")
        },
        isoWeekday: function (t) {
            return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
        },
        isoWeeksInYear: function () {
            return x(this.year(), 1, 4)
        },
        weeksInYear: function () {
            var t = this.localeData()._week;
            return x(this.year(), t.dow, t.doy)
        },
        get: function (t) {
            return t = T(t), this[t]()
        },
        set: function (t, e) {
            var n;
            if ("object" == typeof t)for (n in t)this.set(n, t[n]); else t = T(t), "function" == typeof this[t] && this[t](e);
            return this
        },
        locale: function (e) {
            var n;
            return e === t ? this._locale._abbr : (n = Dt.localeData(e), null != n && (this._locale = n), this)
        },
        lang: s("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) {
            return e === t ? this.localeData() : this.locale(e)
        }),
        localeData: function () {
            return this._locale
        },
        _dateUtcOffset: function () {
            return 15 * -Math.round(this._d.getTimezoneOffset() / 15)
        }
    }), Dt.fn.millisecond = Dt.fn.milliseconds = pt("Milliseconds", !1), Dt.fn.second = Dt.fn.seconds = pt("Seconds", !1), Dt.fn.minute = Dt.fn.minutes = pt("Minutes", !1), Dt.fn.hour = Dt.fn.hours = pt("Hours", !0), Dt.fn.date = pt("Date", !0), Dt.fn.dates = s("dates accessor is deprecated. Use date instead.", pt("Date", !0)), Dt.fn.year = pt("FullYear", !0), Dt.fn.years = s("years accessor is deprecated. Use year instead.", pt("FullYear", !0)), Dt.fn.days = Dt.fn.day, Dt.fn.months = Dt.fn.month, Dt.fn.weeks = Dt.fn.week, Dt.fn.isoWeeks = Dt.fn.isoWeek, Dt.fn.quarters = Dt.fn.quarter, Dt.fn.toJSON = Dt.fn.toISOString, Dt.fn.isUTC = Dt.fn.isUtc, g(Dt.duration.fn = f.prototype, {
        _bubble: function () {
            var t, e, n, i = this._milliseconds, r = this._days, s = this._months, o = this._data, a = 0;
            o.milliseconds = i % 1e3, t = p(i / 1e3), o.seconds = t % 60, e = p(t / 60), o.minutes = e % 60, n = p(e / 60), o.hours = n % 24, r += p(n / 24), a = p(vt(r)), r -= p(yt(a)), s += p(r / 30), r %= 30, a += p(s / 12), s %= 12, o.days = r, o.months = s, o.years = a
        },
        abs: function () {
            return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
        },
        weeks: function () {
            return p(this.days() / 7)
        },
        valueOf: function () {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * M(this._months / 12);
        },
        humanize: function (t) {
            var e = lt(this, !t, this.localeData());
            return t && (e = this.localeData().pastFuture(+this, e)), this.localeData().postformat(e)
        },
        add: function (t, e) {
            var n = Dt.duration(t, e);
            return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this._bubble(), this
        },
        subtract: function (t, e) {
            var n = Dt.duration(t, e);
            return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this._bubble(), this
        },
        get: function (t) {
            return t = T(t), this[t.toLowerCase() + "s"]()
        },
        as: function (t) {
            var e, n;
            if (t = T(t), "month" === t || "year" === t)return e = this._days + this._milliseconds / 864e5, n = this._months + 12 * vt(e), "month" === t ? n : n / 12;
            switch (e = this._days + Math.round(yt(this._months / 12)), t) {
                case"week":
                    return e / 7 + this._milliseconds / 6048e5;
                case"day":
                    return e + this._milliseconds / 864e5;
                case"hour":
                    return 24 * e + this._milliseconds / 36e5;
                case"minute":
                    return 24 * e * 60 + this._milliseconds / 6e4;
                case"second":
                    return 24 * e * 60 * 60 + this._milliseconds / 1e3;
                case"millisecond":
                    return Math.floor(24 * e * 60 * 60 * 1e3) + this._milliseconds;
                default:
                    throw new Error("Unknown unit " + t)
            }
        },
        lang: Dt.fn.lang,
        locale: Dt.fn.locale,
        toIsoString: s("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function () {
            return this.toISOString()
        }),
        toISOString: function () {
            var t = Math.abs(this.years()), e = Math.abs(this.months()), n = Math.abs(this.days()), i = Math.abs(this.hours()), r = Math.abs(this.minutes()), s = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (t ? t + "Y" : "") + (e ? e + "M" : "") + (n ? n + "D" : "") + (i || r || s ? "T" : "") + (i ? i + "H" : "") + (r ? r + "M" : "") + (s ? s + "S" : "") : "P0D"
        },
        localeData: function () {
            return this._locale
        },
        toJSON: function () {
            return this.toISOString()
        }
    }), Dt.duration.fn.toString = Dt.duration.fn.toISOString;
    for (_t in ce)n(ce, _t) && wt(_t.toLowerCase());
    Dt.duration.fn.asMilliseconds = function () {
        return this.as("ms")
    }, Dt.duration.fn.asSeconds = function () {
        return this.as("s")
    }, Dt.duration.fn.asMinutes = function () {
        return this.as("m")
    }, Dt.duration.fn.asHours = function () {
        return this.as("h")
    }, Dt.duration.fn.asDays = function () {
        return this.as("d")
    }, Dt.duration.fn.asWeeks = function () {
        return this.as("weeks")
    }, Dt.duration.fn.asMonths = function () {
        return this.as("M")
    }, Dt.duration.fn.asYears = function () {
        return this.as("y")
    }, Dt.locale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (t) {
            var e = t % 10, n = 1 === M(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
            return t + n
        }
    }), zt ? module.exports = Dt : "function" == typeof define && define.amd ? (define(function (t, e, n) {
        return n.config && n.config() && n.config().noGlobal === !0 && (Tt.moment = bt), Dt
    }), St(!0)) : St()
}).call(this), !function (t) {
    "function" == typeof define && define.amd ? define(["jquery", "moment"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("moment")) : t(jQuery, moment)
}(function (t, e) {
    function n(t) {
        return V(t, Nt)
    }

    function i(e) {
        var n, i = {views: e.views || {}};
        return t.each(e, function (e, r) {
            "views" != e && (t.isPlainObject(r) && !/(time|duration|interval)$/i.test(e) && -1 == t.inArray(e, Nt) ? (n = null, t.each(r, function (t, r) {
                /^(month|week|day|default|basic(Week|Day)?|agenda(Week|Day)?)$/.test(t) ? (i.views[t] || (i.views[t] = {}), i.views[t][e] = r) : (n || (n = {}), n[t] = r)
            }), n && (i[e] = n)) : i[e] = r)
        }), i
    }

    function r(t, e) {
        e.left && t.css({"border-left-width": 1, "margin-left": e.left - 1}), e.right && t.css({
            "border-right-width": 1,
            "margin-right": e.right - 1
        })
    }

    function s(t) {
        t.css({"margin-left": "", "margin-right": "", "border-left-width": "", "border-right-width": ""})
    }

    function o() {
        t("body").addClass("fc-not-allowed")
    }

    function a() {
        t("body").removeClass("fc-not-allowed")
    }

    function l(e, n, i) {
        var r = Math.floor(n / e.length), s = Math.floor(n - r * (e.length - 1)), o = [], a = [], l = [], c = 0;
        u(e), e.each(function (n, i) {
            var u = n === e.length - 1 ? s : r, d = t(i).outerHeight(!0);
            u > d ? (o.push(i), a.push(d), l.push(t(i).height())) : c += d
        }), i && (n -= c, r = Math.floor(n / o.length), s = Math.floor(n - r * (o.length - 1))), t(o).each(function (e, n) {
            var i = e === o.length - 1 ? s : r, u = a[e], c = l[e], d = i - (u - c);
            i > u && t(n).height(d)
        })
    }

    function u(t) {
        t.height("")
    }

    function c(e) {
        var n = 0;
        return e.find("> *").each(function (e, i) {
            var r = t(i).outerWidth();
            r > n && (n = r)
        }), n++, e.width(n), n
    }

    function d(t, e) {
        return t.height(e).addClass("fc-scroller"), t[0].scrollHeight - 1 > t[0].clientHeight ? !0 : (h(t), !1)
    }

    function h(t) {
        t.height("").removeClass("fc-scroller")
    }

    function f(e) {
        var n = e.css("position"), i = e.parents().filter(function () {
            var e = t(this);
            return /(auto|scroll)/.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
        }).eq(0);
        return "fixed" !== n && i.length ? i : t(e[0].ownerDocument || document)
    }

    function g(t) {
        var e = t.offset();
        return {left: e.left, right: e.left + t.outerWidth(), top: e.top, bottom: e.top + t.outerHeight()}
    }

    function m(t) {
        var e = t.offset(), n = v(t), i = e.left + S(t, "border-left-width") + n.left, r = e.top + S(t, "border-top-width") + n.top;
        return {left: i, right: i + t[0].clientWidth, top: r, bottom: r + t[0].clientHeight}
    }

    function p(t) {
        var e = t.offset(), n = e.left + S(t, "border-left-width") + S(t, "padding-left"), i = e.top + S(t, "border-top-width") + S(t, "padding-top");
        return {left: n, right: n + t.width(), top: i, bottom: i + t.height()}
    }

    function v(t) {
        var e = t.innerWidth() - t[0].clientWidth, n = {
            left: 0,
            right: 0,
            top: 0,
            bottom: t.innerHeight() - t[0].clientHeight
        };
        return y() && "rtl" == t.css("direction") ? n.left = e : n.right = e, n
    }

    function y() {
        return null === Bt && (Bt = w()), Bt
    }

    function w() {
        var e = t("<div><div/></div>").css({
            position: "absolute",
            top: -1e3,
            left: 0,
            border: 0,
            padding: 0,
            overflow: "scroll",
            direction: "rtl"
        }).appendTo("body"), n = e.children(), i = n.offset().left > e.offset().left;
        return e.remove(), i
    }

    function S(t, e) {
        return parseFloat(t.css(e)) || 0
    }

    function D(t) {
        return 1 == t.which && !t.ctrlKey
    }

    function b(t, e) {
        var n = {
            left: Math.max(t.left, e.left),
            right: Math.min(t.right, e.right),
            top: Math.max(t.top, e.top),
            bottom: Math.min(t.bottom, e.bottom)
        };
        return n.left < n.right && n.top < n.bottom ? n : !1
    }

    function _(t, e) {
        return {left: Math.min(Math.max(t.left, e.left), e.right), top: Math.min(Math.max(t.top, e.top), e.bottom)}
    }

    function E(t) {
        return {left: (t.left + t.right) / 2, top: (t.top + t.bottom) / 2}
    }

    function T(t, e) {
        return {left: t.left - e.left, top: t.top - e.top}
    }

    function C(e) {
        var n, i, r = [], s = [];
        for ("string" == typeof e ? s = e.split(/\s*,\s*/) : "function" == typeof e ? s = [e] : t.isArray(e) && (s = e), n = 0; n < s.length; n++)i = s[n], "string" == typeof i ? r.push("-" == i.charAt(0) ? {
            field: i.substring(1),
            order: -1
        } : {field: i, order: 1}) : "function" == typeof i && r.push({func: i});
        return r
    }

    function H(t, e, n) {
        var i, r;
        for (i = 0; i < n.length; i++)if (r = M(t, e, n[i]))return r;
        return 0
    }

    function M(t, e, n) {
        return n.func ? n.func(t, e) : k(t[n.field], e[n.field]) * (n.order || 1)
    }

    function k(e, n) {
        return e || n ? null == n ? -1 : null == e ? 1 : "string" === t.type(e) || "string" === t.type(n) ? String(e).localeCompare(String(n)) : e - n : 0
    }

    function x(t, e) {
        var n, i, r, s, o = t.start, a = t.end, l = e.start, u = e.end;
        return a > l && u > o ? (o >= l ? (n = o.clone(), r = !0) : (n = l.clone(), r = !1), u >= a ? (i = a.clone(), s = !0) : (i = u.clone(), s = !1), {
            start: n,
            end: i,
            isStart: r,
            isEnd: s
        }) : void 0
    }

    function R(t, n) {
        return e.duration({days: t.clone().stripTime().diff(n.clone().stripTime(), "days"), ms: t.time() - n.time()})
    }

    function Y(t, n) {
        return e.duration({days: t.clone().stripTime().diff(n.clone().stripTime(), "days")})
    }

    function O(t, n, i) {
        return e.duration(Math.round(t.diff(n, i, !0)), i)
    }

    function F(t, e) {
        var n, i, r;
        for (n = 0; n < Zt.length && (i = Zt[n], r = G(i, t, e), !(r >= 1 && et(r))); n++);
        return i
    }

    function G(t, n, i) {
        return null != i ? i.diff(n, t, !0) : e.isDuration(n) ? n.as(t) : n.end.diff(n.start, t, !0)
    }

    function L(t, e, n) {
        var i;
        return I(n) ? (e - t) / n : (i = n.asMonths(), Math.abs(i) >= 1 && et(i) ? e.diff(t, "months", !0) / i : e.diff(t, "days", !0) / n.asDays())
    }

    function z(t, e) {
        var n, i;
        return I(t) || I(e) ? t / e : (n = t.asMonths(), i = e.asMonths(), Math.abs(n) >= 1 && et(n) && Math.abs(i) >= 1 && et(i) ? n / i : t.asDays() / e.asDays())
    }

    function P(t, n) {
        var i;
        return I(t) ? e.duration(t * n) : (i = t.asMonths(), Math.abs(i) >= 1 && et(i) ? e.duration({months: i * n}) : e.duration({days: t.asDays() * n}))
    }

    function I(t) {
        return Boolean(t.hours() || t.minutes() || t.seconds() || t.milliseconds())
    }

    function A(t) {
        return "[object Date]" === Object.prototype.toString.call(t) || t instanceof Date
    }

    function W(t) {
        return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(t)
    }

    function V(t, e) {
        var n, i, r, s, o, a, l = {};
        if (e)for (n = 0; n < e.length; n++) {
            for (i = e[n], r = [], s = t.length - 1; s >= 0; s--)if (o = t[s][i], "object" == typeof o)r.unshift(o); else if (void 0 !== o) {
                l[i] = o;
                break
            }
            r.length && (l[i] = V(r))
        }
        for (n = t.length - 1; n >= 0; n--) {
            a = t[n];
            for (i in a)i in l || (l[i] = a[i])
        }
        return l
    }

    function N(t) {
        var e = function () {
        };
        return e.prototype = t, new e
    }

    function B(t, e) {
        for (var n in t)Z(t, n) && (e[n] = t[n])
    }

    function U(t, e) {
        var n, i, r = ["constructor", "toString", "valueOf"];
        for (n = 0; n < r.length; n++)i = r[n], t[i] !== Object.prototype[i] && (e[i] = t[i])
    }

    function Z(t, e) {
        return Xt.call(t, e)
    }

    function j(e) {
        return /undefined|null|boolean|number|string/.test(t.type(e))
    }

    function q(e, n, i) {
        if (t.isFunction(e) && (e = [e]), e) {
            var r, s;
            for (r = 0; r < e.length; r++)s = e[r].apply(n, i) || s;
            return s
        }
    }

    function $() {
        for (var t = 0; t < arguments.length; t++)if (void 0 !== arguments[t])return arguments[t]
    }

    function X(t) {
        return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function J(t) {
        return t.replace(/&.*?;/g, "")
    }

    function Q(e) {
        var n = [];
        return t.each(e, function (t, e) {
            null != e && n.push(t + ":" + e)
        }), n.join(";")
    }

    function K(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }

    function tt(t, e) {
        return t - e
    }

    function et(t) {
        return t % 1 === 0
    }

    function nt(t, e) {
        var n = t[e];
        return function () {
            return n.apply(t, arguments)
        }
    }

    function it(t, e) {
        var n, i, r, s, o = function () {
            var a = +new Date - s;
            e > a && a > 0 ? n = setTimeout(o, e - a) : (n = null, t.apply(r, i), n || (r = i = null))
        };
        return function () {
            r = this, i = arguments, s = +new Date, n || (n = setTimeout(o, e))
        }
    }

    function rt(n, i, r) {
        var s, o, a, l, u = n[0], c = 1 == n.length && "string" == typeof u;
        return e.isMoment(u) ? (l = e.apply(null, n), ot(u, l)) : A(u) || void 0 === u ? l = e.apply(null, n) : (s = !1, o = !1, c ? Jt.test(u) ? (u += "-01", n = [u], s = !0, o = !0) : (a = Qt.exec(u)) && (s = !a[5], o = !0) : t.isArray(u) && (o = !0), l = i || s ? e.utc.apply(e, n) : e.apply(null, n), s ? (l._ambigTime = !0, l._ambigZone = !0) : r && (o ? l._ambigZone = !0 : c && (l.utcOffset ? l.utcOffset(u) : l.zone(u)))), l._fullCalendar = !0, l
    }

    function st(t, n) {
        var i, r, s = !1, o = !1, a = t.length, l = [];
        for (i = 0; a > i; i++)r = t[i], e.isMoment(r) || (r = Wt.moment.parseZone(r)), s = s || r._ambigTime, o = o || r._ambigZone, l.push(r);
        for (i = 0; a > i; i++)r = l[i], n || !s || r._ambigTime ? o && !r._ambigZone && (l[i] = r.clone().stripZone()) : l[i] = r.clone().stripTime();
        return l
    }

    function ot(t, e) {
        t._ambigTime ? e._ambigTime = !0 : e._ambigTime && (e._ambigTime = !1), t._ambigZone ? e._ambigZone = !0 : e._ambigZone && (e._ambigZone = !1)
    }

    function at(t, e) {
        t.year(e[0] || 0).month(e[1] || 0).date(e[2] || 0).hours(e[3] || 0).minutes(e[4] || 0).seconds(e[5] || 0).milliseconds(e[6] || 0)
    }

    function lt(t, e) {
        return te.format.call(t, e)
    }

    function ut(t, e) {
        return ct(t, mt(e))
    }

    function ct(t, e) {
        var n, i = "";
        for (n = 0; n < e.length; n++)i += dt(t, e[n]);
        return i
    }

    function dt(t, e) {
        var n, i;
        return "string" == typeof e ? e : (n = e.token) ? ee[n] ? ee[n](t) : lt(t, n) : e.maybe && (i = ct(t, e.maybe), i.match(/[1-9]/)) ? i : ""
    }

    function ht(t, e, n, i, r) {
        var s;
        return t = Wt.moment.parseZone(t), e = Wt.moment.parseZone(e), s = (t.localeData || t.lang).call(t), n = s.longDateFormat(n) || n, i = i || " - ", ft(t, e, mt(n), i, r)
    }

    function ft(t, e, n, i, r) {
        var s, o, a, l, u = t.clone().stripZone(), c = e.clone().stripZone(), d = "", h = "", f = "", g = "", m = "";
        for (o = 0; o < n.length && (s = gt(t, e, u, c, n[o]), s !== !1); o++)d += s;
        for (a = n.length - 1; a > o && (s = gt(t, e, u, c, n[a]), s !== !1); a--)h = s + h;
        for (l = o; a >= l; l++)f += dt(t, n[l]), g += dt(e, n[l]);
        return (f || g) && (m = r ? g + i + f : f + i + g), d + m + h
    }

    function gt(t, e, n, i, r) {
        var s, o;
        return "string" == typeof r ? r : (s = r.token) && (o = ne[s.charAt(0)], o && n.isSame(i, o)) ? lt(t, s) : !1
    }

    function mt(t) {
        return t in ie ? ie[t] : ie[t] = pt(t)
    }

    function pt(t) {
        for (var e, n = [], i = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; e = i.exec(t);)e[1] ? n.push(e[1]) : e[2] ? n.push({maybe: pt(e[2])}) : e[3] ? n.push({token: e[3]}) : e[5] && n.push(e[5]);
        return n
    }

    function vt() {
    }

    function yt(t, e) {
        var n;
        return Z(e, "constructor") && (n = e.constructor), "function" != typeof n && (n = e.constructor = function () {
            t.apply(this, arguments)
        }), n.prototype = N(t.prototype), B(e, n.prototype), U(e, n.prototype), B(t, n), n
    }

    function wt(t, e) {
        B(e.prototype || e, t.prototype)
    }

    function St(t, e) {
        return t || e ? t && e ? t.component === e.component && Dt(t, e) && Dt(e, t) : !1 : !0
    }

    function Dt(t, e) {
        for (var n in t)if (!/^(component|left|right|top|bottom)$/.test(n) && t[n] !== e[n])return !1;
        return !0
    }

    function bt(t) {
        var e = Et(t);
        return "background" === e || "inverse-background" === e
    }

    function _t(t) {
        return "inverse-background" === Et(t)
    }

    function Et(t) {
        return $((t.source || {}).rendering, t.rendering)
    }

    function Tt(t) {
        var e, n, i = {};
        for (e = 0; e < t.length; e++)n = t[e], (i[n._id] || (i[n._id] = [])).push(n);
        return i
    }

    function Ct(t, e) {
        return t.start - e.start
    }

    function Ht(n) {
        var i, r, s, o, a = Wt.dataAttrPrefix;
        return a && (a += "-"), i = n.data(a + "event") || null, i && (i = "object" == typeof i ? t.extend({}, i) : {}, r = i.start, null == r && (r = i.time), s = i.duration, o = i.stick, delete i.start, delete i.time, delete i.duration, delete i.stick), null == r && (r = n.data(a + "start")), null == r && (r = n.data(a + "time")), null == s && (s = n.data(a + "duration")), null == o && (o = n.data(a + "stick")), r = null != r ? e.duration(r) : null, s = null != s ? e.duration(s) : null, o = Boolean(o), {
            eventProps: i,
            startTime: r,
            duration: s,
            stick: o
        }
    }

    function Mt(t, e) {
        var n, i;
        for (n = 0; n < e.length; n++)if (i = e[n], i.leftCol <= t.rightCol && i.rightCol >= t.leftCol)return !0;
        return !1
    }

    function kt(t, e) {
        return t.leftCol - e.leftCol
    }

    function xt(t) {
        var e, n, i, r = [];
        for (e = 0; e < t.length; e++) {
            for (n = t[e], i = 0; i < r.length && Ot(n, r[i]).length; i++);
            n.level = i, (r[i] || (r[i] = [])).push(n)
        }
        return r
    }

    function Rt(t) {
        var e, n, i, r, s;
        for (e = 0; e < t.length; e++)for (n = t[e], i = 0; i < n.length; i++)for (r = n[i], r.forwardSegs = [], s = e + 1; s < t.length; s++)Ot(r, t[s], r.forwardSegs)
    }

    function Yt(t) {
        var e, n, i = t.forwardSegs, r = 0;
        if (void 0 === t.forwardPressure) {
            for (e = 0; e < i.length; e++)n = i[e], Yt(n), r = Math.max(r, 1 + n.forwardPressure);
            t.forwardPressure = r
        }
    }

    function Ot(t, e, n) {
        n = n || [];
        for (var i = 0; i < e.length; i++)Ft(t, e[i]) && n.push(e[i]);
        return n
    }

    function Ft(t, e) {
        return t.bottom > e.top && t.top < e.bottom
    }

    function Gt(n, i) {
        function r() {
            Z ? a() && (c(), l()) : s()
        }

        function s() {
            j = A.theme ? "ui" : "fc", n.addClass("fc"), A.isRTL ? n.addClass("fc-rtl") : n.addClass("fc-ltr"), A.theme ? n.addClass("ui-widget") : n.addClass("fc-unthemed"), Z = t("<div class='fc-view-container'/>").prependTo(n), B = I.header = new Pt(I, A), U = B.render(), U && n.prepend(U), l(A.defaultView), A.handleWindowResize && (X = it(h, A.windowResizeDelay), t(window).resize(X))
        }

        function o() {
            q && q.removeElement(), B.removeElement(), Z.remove(), n.removeClass("fc fc-ltr fc-rtl fc-unthemed ui-widget"), X && t(window).unbind("resize", X)
        }

        function a() {
            return n.is(":visible")
        }

        function l(e) {
            nt++, q && e && q.type !== e && (B.deactivateButton(q.type), O(), q.removeElement(), q = I.view = null), !q && e && (q = I.view = et[e] || (et[e] = I.instantiateView(e)), q.setElement(t("<div class='fc-view fc-" + e + "-view' />").appendTo(Z)), B.activateButton(e)), q && (J = q.massageCurrentDate(J), q.displaying && J.isWithin(q.intervalStart, q.intervalEnd) || a() && (q.display(J), F(), S(), D(), p())), F(), nt--
        }

        function u(t) {
            return a() ? (t && d(), nt++, q.updateSize(!0), nt--, !0) : void 0
        }

        function c() {
            a() && d()
        }

        function d() {
            $ = "number" == typeof A.contentHeight ? A.contentHeight : "number" == typeof A.height ? A.height - (U ? U.outerHeight(!0) : 0) : Math.round(Z.width() / Math.max(A.aspectRatio, .5))
        }

        function h(t) {
            !nt && t.target === window && q.start && u(!0) && q.trigger("windowResize", tt)
        }

        function f() {
            m(), v()
        }

        function g() {
            a() && (O(), q.displayEvents(rt), F())
        }

        function m() {
            O(), q.clearEvents(), F()
        }

        function p() {
            !A.lazyFetching || Q(q.start, q.end) ? v() : g()
        }

        function v() {
            K(q.start, q.end)
        }

        function y(t) {
            rt = t, g()
        }

        function w() {
            g()
        }

        function S() {
            B.updateTitle(q.title)
        }

        function D() {
            var t = I.getNow();
            t.isWithin(q.intervalStart, q.intervalEnd) ? B.disableButton("today") : B.enableButton("today")
        }

        function b(t, e) {
            q.select(I.buildSelectSpan.apply(I, arguments))
        }

        function _() {
            q && q.unselect()
        }

        function E() {
            J = q.computePrevDate(J), l()
        }

        function T() {
            J = q.computeNextDate(J), l()
        }

        function C() {
            J.add(-1, "years"), l()
        }

        function H() {
            J.add(1, "years"), l()
        }

        function M() {
            J = I.getNow(), l()
        }

        function k(t) {
            J = I.moment(t).stripZone(), l()
        }

        function x(t) {
            J.add(e.duration(t)), l()
        }

        function R(t, e) {
            var n;
            e = e || "day", n = I.getViewSpec(e) || I.getUnitViewSpec(e), J = t.clone(), l(n ? n.type : null)
        }

        function Y() {
            return I.applyTimezone(J)
        }

        function O() {
            Z.css({width: "100%", height: Z.height(), overflow: "hidden"})
        }

        function F() {
            Z.css({width: "", height: "", overflow: ""})
        }

        function G() {
            return I
        }

        function L() {
            return q
        }

        function z(t, e) {
            return void 0 === e ? A[t] : void(("height" == t || "contentHeight" == t || "aspectRatio" == t) && (A[t] = e, u(!0)))
        }

        function P(t, e) {
            var n = Array.prototype.slice.call(arguments, 2);
            return e = e || tt, this.triggerWith(t, e, n), A[t] ? A[t].apply(e, n) : void 0
        }

        var I = this;
        I.initOptions(i || {});
        var A = this.options;
        I.render = r, I.destroy = o, I.refetchEvents = f, I.reportEvents = y, I.reportEventChange = w, I.rerenderEvents = g, I.changeView = l, I.select = b, I.unselect = _, I.prev = E, I.next = T, I.prevYear = C, I.nextYear = H, I.today = M, I.gotoDate = k, I.incrementDate = x, I.zoomTo = R, I.getDate = Y, I.getCalendar = G, I.getView = L, I.option = z, I.trigger = P;
        var W = N(zt(A.lang));
        if (A.monthNames && (W._months = A.monthNames), A.monthNamesShort && (W._monthsShort = A.monthNamesShort), A.dayNames && (W._weekdays = A.dayNames), A.dayNamesShort && (W._weekdaysShort = A.dayNamesShort), null != A.firstDay) {
            var V = N(W._week);
            V.dow = A.firstDay, W._week = V
        }
        W._fullCalendar_weekCalc = function (t) {
            return "function" == typeof t ? t : "local" === t ? t : "iso" === t || "ISO" === t ? "ISO" : void 0
        }(A.weekNumberCalculation), I.defaultAllDayEventDuration = e.duration(A.defaultAllDayEventDuration), I.defaultTimedEventDuration = e.duration(A.defaultTimedEventDuration), I.moment = function () {
            var t;
            return "local" === A.timezone ? (t = Wt.moment.apply(null, arguments), t.hasTime() && t.local()) : t = "UTC" === A.timezone ? Wt.moment.utc.apply(null, arguments) : Wt.moment.parseZone.apply(null, arguments), "_locale"in t ? t._locale = W : t._lang = W, t
        }, I.getIsAmbigTimezone = function () {
            return "local" !== A.timezone && "UTC" !== A.timezone
        }, I.applyTimezone = function (t) {
            if (!t.hasTime())return t.clone();
            var e, n = I.moment(t.toArray()), i = t.time() - n.time();
            return i && (e = n.clone().add(i), t.time() - e.time() === 0 && (n = e)), n
        }, I.getNow = function () {
            var t = A.now;
            return "function" == typeof t && (t = t()), I.moment(t).stripZone()
        }, I.getEventEnd = function (t) {
            return t.end ? t.end.clone() : I.getDefaultEventEnd(t.allDay, t.start)
        }, I.getDefaultEventEnd = function (t, e) {
            var n = e.clone();
            return t ? n.stripTime().add(I.defaultAllDayEventDuration) : n.add(I.defaultTimedEventDuration), I.getIsAmbigTimezone() && n.stripZone(), n
        }, I.humanizeDuration = function (t) {
            return (t.locale || t.lang).call(t, A.lang).humanize()
        }, It.call(I, A);
        var B, U, Z, j, q, $, X, J, Q = I.isFetchNeeded, K = I.fetchEvents, tt = n[0], et = {}, nt = 0, rt = [];
        J = null != A.defaultDate ? I.moment(A.defaultDate).stripZone() : I.getNow(), I.getSuggestedViewHeight = function () {
            return void 0 === $ && c(), $
        }, I.isHeightAuto = function () {
            return "auto" === A.contentHeight || "auto" === A.height
        }, I.freezeContentHeight = O, I.unfreezeContentHeight = F, I.initialize()
    }

    function Lt(e) {
        t.each(we, function (t, n) {
            null == e[t] && (e[t] = n(e))
        })
    }

    function zt(t) {
        var n = e.localeData || e.langData;
        return n.call(e, t) || n.call(e, "en")
    }

    function Pt(e, n) {
        function i() {
            var e = n.header;
            return f = n.theme ? "ui" : "fc", e ? g = t("<div class='fc-toolbar'/>").append(s("left")).append(s("right")).append(s("center")).append('<div class="fc-clear"/>') : void 0
        }

        function r() {
            g.remove(), g = t()
        }

        function s(i) {
            var r = t('<div class="fc-' + i + '"/>'), s = n.header[i];
            return s && t.each(s.split(" "), function (i) {
                var s, o = t(), a = !0;
                t.each(this.split(","), function (i, r) {
                    var s, l, u, c, d, h, g, p, v, y;
                    "title" == r ? (o = o.add(t("<h2>&nbsp;</h2>")), a = !1) : ((s = (e.options.customButtons || {})[r]) ? (u = function (t) {
                        s.click && s.click.call(y[0], t)
                    }, c = "", d = s.text) : (l = e.getViewSpec(r)) ? (u = function () {
                        e.changeView(r)
                    }, m.push(r), c = l.buttonTextOverride, d = l.buttonTextDefault) : e[r] && (u = function () {
                        e[r]()
                    }, c = (e.overrides.buttonText || {})[r], d = n.buttonText[r]), u && (h = s ? s.themeIcon : n.themeButtonIcons[r], g = s ? s.icon : n.buttonIcons[r], p = c ? X(c) : h && n.theme ? "<span class='ui-icon ui-icon-" + h + "'></span>" : g && !n.theme ? "<span class='fc-icon fc-icon-" + g + "'></span>" : X(d), v = ["fc-" + r + "-button", f + "-button", f + "-state-default"], y = t('<button type="button" class="' + v.join(" ") + '">' + p + "</button>").click(function (t) {
                        y.hasClass(f + "-state-disabled") || (u(t), (y.hasClass(f + "-state-active") || y.hasClass(f + "-state-disabled")) && y.removeClass(f + "-state-hover"))
                    }).mousedown(function () {
                        y.not("." + f + "-state-active").not("." + f + "-state-disabled").addClass(f + "-state-down")
                    }).mouseup(function () {
                        y.removeClass(f + "-state-down")
                    }).hover(function () {
                        y.not("." + f + "-state-active").not("." + f + "-state-disabled").addClass(f + "-state-hover")
                    }, function () {
                        y.removeClass(f + "-state-hover").removeClass(f + "-state-down")
                    }), o = o.add(y)))
                }), a && o.first().addClass(f + "-corner-left").end().last().addClass(f + "-corner-right").end(), o.length > 1 ? (s = t("<div/>"), a && s.addClass("fc-button-group"), s.append(o), r.append(s)) : r.append(o)
            }), r
        }

        function o(t) {
            g.find("h2").text(t)
        }

        function a(t) {
            g.find(".fc-" + t + "-button").addClass(f + "-state-active")
        }

        function l(t) {
            g.find(".fc-" + t + "-button").removeClass(f + "-state-active")
        }

        function u(t) {
            g.find(".fc-" + t + "-button").attr("disabled", "disabled").addClass(f + "-state-disabled")
        }

        function c(t) {
            g.find(".fc-" + t + "-button").removeAttr("disabled").removeClass(f + "-state-disabled")
        }

        function d() {
            return m
        }

        var h = this;
        h.render = i, h.removeElement = r, h.updateTitle = o, h.activateButton = a, h.deactivateButton = l, h.disableButton = u, h.enableButton = c, h.getViewsWithButtons = d;
        var f, g = t(), m = []
    }

    function It(n) {
        function i(t, e) {
            return !z || z > t || e > P
        }

        function r(t, e) {
            z = t, P = e, U = [];
            var n = ++N, i = V.length;
            B = i;
            for (var r = 0; i > r; r++)s(V[r], n)
        }

        function s(e, n) {
            o(e, function (i) {
                var r, s, o, a = t.isArray(e.events);
                if (n == N) {
                    if (i)for (r = 0; r < i.length; r++)s = i[r], o = a ? s : y(s, e), o && U.push.apply(U, b(o));
                    B--, B || I(U)
                }
            })
        }

        function o(e, i) {
            var r, s, a = Wt.sourceFetchers;
            for (r = 0; r < a.length; r++) {
                if (s = a[r].call(L, e, z.clone(), P.clone(), n.timezone, i), s === !0)return;
                if ("object" == typeof s)return void o(s, i)
            }
            var l = e.events;
            if (l)t.isFunction(l) ? (L.pushLoading(), l.call(L, z.clone(), P.clone(), n.timezone, function (t) {
                i(t), L.popLoading()
            })) : t.isArray(l) ? i(l) : i(); else {
                var u = e.url;
                if (u) {
                    var c, d = e.success, h = e.error, f = e.complete;
                    c = t.isFunction(e.data) ? e.data() : e.data;
                    var g = t.extend({}, c || {}), m = $(e.startParam, n.startParam), p = $(e.endParam, n.endParam), v = $(e.timezoneParam, n.timezoneParam);
                    m && (g[m] = z.format()), p && (g[p] = P.format()), n.timezone && "local" != n.timezone && (g[v] = n.timezone), L.pushLoading(), t.ajax(t.extend({}, Se, e, {
                        data: g,
                        success: function (e) {
                            e = e || [];
                            var n = q(d, this, arguments);
                            t.isArray(n) && (e = n), i(e)
                        },
                        error: function () {
                            q(h, this, arguments), i()
                        },
                        complete: function () {
                            q(f, this, arguments), L.popLoading()
                        }
                    }))
                } else i()
            }
        }

        function a(t) {
            var e = l(t);
            e && (V.push(e), B++, s(e, N))
        }

        function l(e) {
            var n, i, r = Wt.sourceNormalizers;
            if (t.isFunction(e) || t.isArray(e) ? n = {events: e} : "string" == typeof e ? n = {url: e} : "object" == typeof e && (n = t.extend({}, e)), n) {
                for (n.className ? "string" == typeof n.className && (n.className = n.className.split(/\s+/)) : n.className = [], t.isArray(n.events) && (n.origArray = n.events, n.events = t.map(n.events, function (t) {
                    return y(t, n)
                })), i = 0; i < r.length; i++)r[i].call(L, n);
                return n
            }
        }

        function u(e) {
            V = t.grep(V, function (t) {
                return !c(t, e)
            }), U = t.grep(U, function (t) {
                return !c(t.source, e)
            }), I(U)
        }

        function c(t, e) {
            return t && e && d(t) == d(e)
        }

        function d(t) {
            return ("object" == typeof t ? t.origArray || t.googleCalendarId || t.url || t.events : null) || t
        }

        function h(t) {
            t.start = L.moment(t.start), t.end ? t.end = L.moment(t.end) : t.end = null, _(t, f(t)), I(U)
        }

        function f(e) {
            var n = {};
            return t.each(e, function (t, e) {
                g(t) && void 0 !== e && j(e) && (n[t] = e)
            }), n
        }

        function g(t) {
            return !/^_|^(id|allDay|start|end)$/.test(t)
        }

        function m(t, e) {
            var n, i, r, s = y(t);
            if (s) {
                for (n = b(s), i = 0; i < n.length; i++)r = n[i], r.source || (e && (A.events.push(r), r.source = A), U.push(r));
                return I(U), n
            }
            return []
        }

        function p(e) {
            var n, i;
            for (null == e ? e = function () {
                return !0
            } : t.isFunction(e) || (n = e + "", e = function (t) {
                return t._id == n
            }), U = t.grep(U, e, !0), i = 0; i < V.length; i++)t.isArray(V[i].events) && (V[i].events = t.grep(V[i].events, e, !0));
            I(U)
        }

        function v(e) {
            return t.isFunction(e) ? t.grep(U, e) : null != e ? (e += "", t.grep(U, function (t) {
                return t._id == e
            })) : U
        }

        function y(i, r) {
            var s, o, a, l = {};
            if (n.eventDataTransform && (i = n.eventDataTransform(i)), r && r.eventDataTransform && (i = r.eventDataTransform(i)), t.extend(l, i), r && (l.source = r), l._id = i._id || (void 0 === i.id ? "_fc" + De++ : i.id + ""), i.className ? "string" == typeof i.className ? l.className = i.className.split(/\s+/) : l.className = i.className : l.className = [], s = i.start || i.date, o = i.end, W(s) && (s = e.duration(s)), W(o) && (o = e.duration(o)), i.dow || e.isDuration(s) || e.isDuration(o))l.start = s ? e.duration(s) : null, l.end = o ? e.duration(o) : null, l._recurring = !0; else {
                if (s && (s = L.moment(s), !s.isValid()))return !1;
                o && (o = L.moment(o), o.isValid() || (o = null)), a = i.allDay, void 0 === a && (a = $(r ? r.allDayDefault : void 0, n.allDayDefault)), w(s, o, a, l)
            }
            return l
        }

        function w(t, e, n, i) {
            i.start = t, i.end = e, i.allDay = n, S(i), At(i)
        }

        function S(t) {
            D(t), t.end && !t.end.isAfter(t.start) && (t.end = null), t.end || (n.forceEventDuration ? t.end = L.getDefaultEventEnd(t.allDay, t.start) : t.end = null)
        }

        function D(t) {
            null == t.allDay && (t.allDay = !(t.start.hasTime() || t.end && t.end.hasTime())), t.allDay ? (t.start.stripTime(), t.end && t.end.stripTime()) : (t.start.hasTime() || (t.start = L.applyTimezone(t.start.time(0))), t.end && !t.end.hasTime() && (t.end = L.applyTimezone(t.end.time(0))))
        }

        function b(e, n, i) {
            var r, s, o, a, l, u, c, d, h, f = [];
            if (n = n || z, i = i || P, e)if (e._recurring) {
                if (s = e.dow)for (r = {}, o = 0; o < s.length; o++)r[s[o]] = !0;
                for (a = n.clone().stripTime(); a.isBefore(i);)(!r || r[a.day()]) && (l = e.start, u = e.end, c = a.clone(), d = null, l && (c = c.time(l)), u && (d = a.clone().time(u)), h = t.extend({}, e), w(c, d, !l && !u, h), f.push(h)), a.add(1, "days")
            } else f.push(e);
            return f
        }

        function _(e, n, i) {
            function r(t, e) {
                return i ? O(t, e, i) : n.allDay ? Y(t, e) : R(t, e)
            }

            var s, o, a, l, u, c, d = {};
            return n = n || {}, n.start || (n.start = e.start.clone()), void 0 === n.end && (n.end = e.end ? e.end.clone() : null), null == n.allDay && (n.allDay = e.allDay), S(n), s = {
                start: e._start.clone(),
                end: e._end ? e._end.clone() : L.getDefaultEventEnd(e._allDay, e._start),
                allDay: n.allDay
            }, S(s), o = null !== e._end && null === n.end, a = r(n.start, s.start), n.end ? (l = r(n.end, s.end), u = l.subtract(a)) : u = null, t.each(n, function (t, e) {
                g(t) && void 0 !== e && (d[t] = e)
            }), c = E(v(e._id), o, n.allDay, a, u, d), {dateDelta: a, durationDelta: u, undo: c}
        }

        function E(e, n, i, r, s, o) {
            var a = L.getIsAmbigTimezone(), l = [];
            return r && !r.valueOf() && (r = null), s && !s.valueOf() && (s = null), t.each(e, function (e, u) {
                var c, d;
                c = {
                    start: u.start.clone(),
                    end: u.end ? u.end.clone() : null,
                    allDay: u.allDay
                }, t.each(o, function (t) {
                    c[t] = u[t]
                }), d = {
                    start: u._start,
                    end: u._end,
                    allDay: i
                }, S(d), n ? d.end = null : s && !d.end && (d.end = L.getDefaultEventEnd(d.allDay, d.start)), r && (d.start.add(r), d.end && d.end.add(r)), s && d.end.add(s), a && !d.allDay && (r || s) && (d.start.stripZone(), d.end && d.end.stripZone()), t.extend(u, o, d), At(u), l.push(function () {
                    t.extend(u, c), At(u)
                })
            }), function () {
                for (var t = 0; t < l.length; t++)l[t]()
            }
        }

        function T(e) {
            var i, r = n.businessHours, s = {
                className: "fc-nonbusiness",
                start: "09:00",
                end: "17:00",
                dow: [1, 2, 3, 4, 5],
                rendering: "inverse-background"
            }, o = L.getView();
            return r && (i = t.extend({}, s, "object" == typeof r ? r : {})), i ? (e && (i.start = null, i.end = null), b(y(i), o.start, o.end)) : []
        }

        function C(t, e) {
            var i = e.source || {}, r = $(e.constraint, i.constraint, n.eventConstraint), s = $(e.overlap, i.overlap, n.eventOverlap);
            return k(t, r, s, e)
        }

        function H(e, n, i) {
            var r, s;
            return i && (r = t.extend({}, i, n), s = b(y(r))[0]), s ? C(e, s) : M(e)
        }

        function M(t) {
            return k(t, n.selectConstraint, n.selectOverlap)
        }

        function k(t, e, n, i) {
            var r, s, o, a, l, u;
            if (null != e) {
                for (r = x(e), s = !1, a = 0; a < r.length; a++)if (F(r[a], t)) {
                    s = !0;
                    break
                }
                if (!s)return !1
            }
            for (o = L.getPeerEvents(t, i), a = 0; a < o.length; a++)if (l = o[a], G(l, t)) {
                if (n === !1)return !1;
                if ("function" == typeof n && !n(l, i))return !1;
                if (i) {
                    if (u = $(l.overlap, (l.source || {}).overlap), u === !1)return !1;
                    if ("function" == typeof u && !u(i, l))return !1
                }
            }
            return !0
        }

        function x(t) {
            return "businessHours" === t ? T() : "object" == typeof t ? b(y(t)) : v(t)
        }

        function F(t, e) {
            var n = t.start.clone().stripZone(), i = L.getEventEnd(t).stripZone();
            return e.start >= n && e.end <= i
        }

        function G(t, e) {
            var n = t.start.clone().stripZone(), i = L.getEventEnd(t).stripZone();
            return e.start < i && e.end > n
        }

        var L = this;
        L.isFetchNeeded = i, L.fetchEvents = r, L.addEventSource = a, L.removeEventSource = u, L.updateEvent = h, L.renderEvent = m, L.removeEvents = p, L.clientEvents = v, L.mutateEvent = _, L.normalizeEventDates = S, L.normalizeEventTimes = D;
        var z, P, I = L.reportEvents, A = {events: []}, V = [A], N = 0, B = 0, U = [];
        t.each((n.events ? [n.events] : []).concat(n.eventSources || []), function (t, e) {
            var n = l(e);
            n && V.push(n)
        }), L.getBusinessHoursEvents = T, L.isEventSpanAllowed = C, L.isExternalSpanAllowed = H, L.isSelectionSpanAllowed = M, L.getEventCache = function () {
            return U
        }
    }

    function At(t) {
        t._allDay = t.allDay, t._start = t.start.clone(), t._end = t.end ? t.end.clone() : null
    }

    var Wt = t.fullCalendar = {version: "2.5.0", internalApiVersion: 1}, Vt = Wt.views = {};
    t.fn.fullCalendar = function (e) {
        var n = Array.prototype.slice.call(arguments, 1), i = this;
        return this.each(function (r, s) {
            var o, a = t(s), l = a.data("fullCalendar");
            "string" == typeof e ? l && t.isFunction(l[e]) && (o = l[e].apply(l, n), r || (i = o), "destroy" === e && a.removeData("fullCalendar")) : l || (l = new me(a, e), a.data("fullCalendar", l), l.render())
        }), i
    };
    var Nt = ["header", "buttonText", "buttonIcons", "themeButtonIcons"];
    Wt.intersectRanges = x, Wt.applyAll = q, Wt.debounce = it, Wt.isInt = et, Wt.htmlEscape = X, Wt.cssToStr = Q, Wt.proxy = nt, Wt.capitaliseFirstLetter = K, Wt.getOuterRect = g, Wt.getClientRect = m, Wt.getContentRect = p, Wt.getScrollbarWidths = v;
    var Bt = null;
    Wt.intersectRects = b, Wt.parseFieldSpecs = C, Wt.compareByFieldSpecs = H, Wt.compareByFieldSpec = M, Wt.flexibleCompare = k, Wt.computeIntervalUnit = F, Wt.divideRangeByDuration = L, Wt.divideDurationByDuration = z, Wt.multiplyDuration = P, Wt.durationHasTime = I;
    var Ut = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], Zt = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    Wt.log = function () {
        var t = window.console;
        return t && t.log ? t.log.apply(t, arguments) : void 0
    }, Wt.warn = function () {
        var t = window.console;
        return t && t.warn ? t.warn.apply(t, arguments) : Wt.log.apply(Wt, arguments)
    };
    var jt, qt, $t, Xt = {}.hasOwnProperty, Jt = /^\s*\d{4}-\d\d$/, Qt = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/, Kt = e.fn, te = t.extend({}, Kt);
    Wt.moment = function () {
        return rt(arguments)
    }, Wt.moment.utc = function () {
        var t = rt(arguments, !0);
        return t.hasTime() && t.utc(), t
    }, Wt.moment.parseZone = function () {
        return rt(arguments, !0, !0)
    }, Kt.clone = function () {
        var t = te.clone.apply(this, arguments);
        return ot(this, t), this._fullCalendar && (t._fullCalendar = !0), t
    }, Kt.week = Kt.weeks = function (t) {
        var e = (this._locale || this._lang)._fullCalendar_weekCalc;
        return null == t && "function" == typeof e ? e(this) : "ISO" === e ? te.isoWeek.apply(this, arguments) : te.week.apply(this, arguments)
    }, Kt.time = function (t) {
        if (!this._fullCalendar)return te.time.apply(this, arguments);
        if (null == t)return e.duration({
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds()
        });
        this._ambigTime = !1, e.isDuration(t) || e.isMoment(t) || (t = e.duration(t));
        var n = 0;
        return e.isDuration(t) && (n = 24 * Math.floor(t.asDays())), this.hours(n + t.hours()).minutes(t.minutes()).seconds(t.seconds()).milliseconds(t.milliseconds())
    }, Kt.stripTime = function () {
        var t;
        return this._ambigTime || (t = this.toArray(), this.utc(), qt(this, t.slice(0, 3)), this._ambigTime = !0, this._ambigZone = !0), this
    }, Kt.hasTime = function () {
        return !this._ambigTime
    }, Kt.stripZone = function () {
        var t, e;
        return this._ambigZone || (t = this.toArray(), e = this._ambigTime, this.utc(), qt(this, t), this._ambigTime = e || !1, this._ambigZone = !0), this
    }, Kt.hasZone = function () {
        return !this._ambigZone
    }, Kt.local = function () {
        var t = this.toArray(), e = this._ambigZone;
        return te.local.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, e && $t(this, t), this
    }, Kt.utc = function () {
        return te.utc.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, this
    }, t.each(["zone", "utcOffset"], function (t, e) {
        te[e] && (Kt[e] = function (t) {
            return null != t && (this._ambigTime = !1, this._ambigZone = !1), te[e].apply(this, arguments)
        })
    }), Kt.format = function () {
        return this._fullCalendar && arguments[0] ? ut(this, arguments[0]) : this._ambigTime ? lt(this, "YYYY-MM-DD") : this._ambigZone ? lt(this, "YYYY-MM-DD[T]HH:mm:ss") : te.format.apply(this, arguments)
    }, Kt.toISOString = function () {
        return this._ambigTime ? lt(this, "YYYY-MM-DD") : this._ambigZone ? lt(this, "YYYY-MM-DD[T]HH:mm:ss") : te.toISOString.apply(this, arguments)
    }, Kt.isWithin = function (t, e) {
        var n = st([this, t, e]);
        return n[0] >= n[1] && n[0] < n[2]
    }, Kt.isSame = function (t, e) {
        var n;
        return this._fullCalendar ? e ? (n = st([this, t], !0), te.isSame.call(n[0], n[1], e)) : (t = Wt.moment.parseZone(t), te.isSame.call(this, t) && Boolean(this._ambigTime) === Boolean(t._ambigTime) && Boolean(this._ambigZone) === Boolean(t._ambigZone)) : te.isSame.apply(this, arguments)
    }, t.each(["isBefore", "isAfter"], function (t, e) {
        Kt[e] = function (t, n) {
            var i;
            return this._fullCalendar ? (i = st([this, t]), te[e].call(i[0], i[1], n)) : te[e].apply(this, arguments)
        }
    }), jt = "_d"in e() && "updateOffset"in e, qt = jt ? function (t, n) {
        t._d.setTime(Date.UTC.apply(Date, n)), e.updateOffset(t, !1)
    } : at, $t = jt ? function (t, n) {
        t._d.setTime(+new Date(n[0] || 0, n[1] || 0, n[2] || 0, n[3] || 0, n[4] || 0, n[5] || 0, n[6] || 0)), e.updateOffset(t, !1)
    } : at;
    var ee = {
        t: function (t) {
            return lt(t, "a").charAt(0)
        }, T: function (t) {
            return lt(t, "A").charAt(0)
        }
    };
    Wt.formatRange = ht;
    var ne = {
        Y: "year",
        M: "month",
        D: "day",
        d: "day",
        A: "second",
        a: "second",
        T: "second",
        t: "second",
        H: "second",
        h: "second",
        m: "second",
        s: "second"
    }, ie = {};
    Wt.Class = vt, vt.extend = function () {
        var t, e, n = arguments.length;
        for (t = 0; n > t; t++)e = arguments[t], n - 1 > t && wt(this, e);
        return yt(this, e || {})
    }, vt.mixin = function (t) {
        wt(this, t)
    };
    var re = Wt.Emitter = vt.extend({
        callbackHash: null, on: function (t, e) {
            return this.getCallbacks(t).add(e), this
        }, off: function (t, e) {
            return this.getCallbacks(t).remove(e), this
        }, trigger: function (t) {
            var e = Array.prototype.slice.call(arguments, 1);
            return this.triggerWith(t, this, e), this
        }, triggerWith: function (t, e, n) {
            var i = this.getCallbacks(t);
            return i.fireWith(e, n), this
        }, getCallbacks: function (e) {
            var n;
            return this.callbackHash || (this.callbackHash = {}), n = this.callbackHash[e], n || (n = this.callbackHash[e] = t.Callbacks()), n
        }
    }), se = vt.extend({
        isHidden: !0,
        options: null,
        el: null,
        documentMousedownProxy: null,
        margin: 10,
        constructor: function (t) {
            this.options = t || {}
        },
        show: function () {
            this.isHidden && (this.el || this.render(), this.el.show(), this.position(), this.isHidden = !1, this.trigger("show"))
        },
        hide: function () {
            this.isHidden || (this.el.hide(), this.isHidden = !0, this.trigger("hide"))
        },
        render: function () {
            var e = this, n = this.options;
            this.el = t('<div class="fc-popover"/>').addClass(n.className || "").css({
                top: 0,
                left: 0
            }).append(n.content).appendTo(n.parentEl), this.el.on("click", ".fc-close", function () {
                e.hide()
            }), n.autoHide && t(document).on("mousedown", this.documentMousedownProxy = nt(this, "documentMousedown"))
        },
        documentMousedown: function (e) {
            this.el && !t(e.target).closest(this.el).length && this.hide()
        },
        removeElement: function () {
            this.hide(), this.el && (this.el.remove(), this.el = null), t(document).off("mousedown", this.documentMousedownProxy)
        },
        position: function () {
            var e, n, i, r, s, o = this.options, a = this.el.offsetParent().offset(), l = this.el.outerWidth(), u = this.el.outerHeight(), c = t(window), d = f(this.el);
            r = o.top || 0, s = void 0 !== o.left ? o.left : void 0 !== o.right ? o.right - l : 0, d.is(window) || d.is(document) ? (d = c, e = 0, n = 0) : (i = d.offset(), e = i.top, n = i.left), e += c.scrollTop(), n += c.scrollLeft(), o.viewportConstrain !== !1 && (r = Math.min(r, e + d.outerHeight() - u - this.margin), r = Math.max(r, e + this.margin), s = Math.min(s, n + d.outerWidth() - l - this.margin), s = Math.max(s, n + this.margin)), this.el.css({
                top: r - a.top,
                left: s - a.left
            })
        },
        trigger: function (t) {
            this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }), oe = Wt.CoordCache = vt.extend({
        els: null,
        forcedOffsetParentEl: null,
        origin: null,
        boundingRect: null,
        isHorizontal: !1,
        isVertical: !1,
        lefts: null,
        rights: null,
        tops: null,
        bottoms: null,
        constructor: function (e) {
            this.els = t(e.els), this.isHorizontal = e.isHorizontal, this.isVertical = e.isVertical, this.forcedOffsetParentEl = e.offsetParent ? t(e.offsetParent) : null
        },
        build: function () {
            var t = this.forcedOffsetParentEl || this.els.eq(0).offsetParent();
            this.origin = t.offset(), this.boundingRect = this.queryBoundingRect(), this.isHorizontal && this.buildElHorizontals(), this.isVertical && this.buildElVerticals()
        },
        clear: function () {
            this.origin = null, this.boundingRect = null, this.lefts = null, this.rights = null, this.tops = null, this.bottoms = null
        },
        queryBoundingRect: function () {
            var t = f(this.els.eq(0));
            return t.is(document) ? void 0 : m(t)
        },
        buildElHorizontals: function () {
            var e = [], n = [];
            this.els.each(function (i, r) {
                var s = t(r), o = s.offset().left, a = s.outerWidth();
                e.push(o), n.push(o + a)
            }), this.lefts = e, this.rights = n
        },
        buildElVerticals: function () {
            var e = [], n = [];
            this.els.each(function (i, r) {
                var s = t(r), o = s.offset().top, a = s.outerHeight();
                e.push(o), n.push(o + a)
            }), this.tops = e, this.bottoms = n
        },
        getHorizontalIndex: function (t) {
            var e, n = this.boundingRect, i = this.lefts, r = this.rights, s = i.length;
            if (!n || t >= n.left && t < n.right)for (e = 0; s > e; e++)if (t >= i[e] && t < r[e])return e
        },
        getVerticalIndex: function (t) {
            var e, n = this.boundingRect, i = this.tops, r = this.bottoms, s = i.length;
            if (!n || t >= n.top && t < n.bottom)for (e = 0; s > e; e++)if (t >= i[e] && t < r[e])return e
        },
        getLeftOffset: function (t) {
            return this.lefts[t]
        },
        getLeftPosition: function (t) {
            return this.lefts[t] - this.origin.left
        },
        getRightOffset: function (t) {
            return this.rights[t]
        },
        getRightPosition: function (t) {
            return this.rights[t] - this.origin.left
        },
        getWidth: function (t) {
            return this.rights[t] - this.lefts[t]
        },
        getTopOffset: function (t) {
            return this.tops[t]
        },
        getTopPosition: function (t) {
            return this.tops[t] - this.origin.top
        },
        getBottomOffset: function (t) {
            return this.bottoms[t]
        },
        getBottomPosition: function (t) {
            return this.bottoms[t] - this.origin.top
        },
        getHeight: function (t) {
            return this.bottoms[t] - this.tops[t]
        }
    }), ae = Wt.DragListener = vt.extend({
        options: null,
        isListening: !1,
        isDragging: !1,
        originX: null,
        originY: null,
        mousemoveProxy: null,
        mouseupProxy: null,
        subjectEl: null,
        subjectHref: null,
        scrollEl: null,
        scrollBounds: null,
        scrollTopVel: null,
        scrollLeftVel: null,
        scrollIntervalId: null,
        scrollHandlerProxy: null,
        scrollSensitivity: 30,
        scrollSpeed: 200,
        scrollIntervalMs: 50,
        constructor: function (t) {
            t = t || {}, this.options = t, this.subjectEl = t.subjectEl
        },
        mousedown: function (t) {
            D(t) && (t.preventDefault(), this.startListening(t), this.options.distance || this.startDrag(t))
        },
        startListening: function (e) {
            var n;
            this.isListening || (e && this.options.scroll && (n = f(t(e.target)), n.is(window) || n.is(document) || (this.scrollEl = n, this.scrollHandlerProxy = it(nt(this, "scrollHandler"), 100), this.scrollEl.on("scroll", this.scrollHandlerProxy))), t(document).on("mousemove", this.mousemoveProxy = nt(this, "mousemove")).on("mouseup", this.mouseupProxy = nt(this, "mouseup")).on("selectstart", this.preventDefault), e ? (this.originX = e.pageX, this.originY = e.pageY) : (this.originX = 0, this.originY = 0), this.isListening = !0, this.listenStart(e))
        },
        listenStart: function (t) {
            this.trigger("listenStart", t)
        },
        mousemove: function (t) {
            var e, n, i = t.pageX - this.originX, r = t.pageY - this.originY;
            this.isDragging || (e = this.options.distance || 1, n = i * i + r * r, n >= e * e && this.startDrag(t)), this.isDragging && this.drag(i, r, t)
        },
        startDrag: function (t) {
            this.isListening || this.startListening(), this.isDragging || (this.isDragging = !0, this.dragStart(t))
        },
        dragStart: function (t) {
            var e = this.subjectEl;
            this.trigger("dragStart", t), (this.subjectHref = e ? e.attr("href") : null) && e.removeAttr("href")
        },
        drag: function (t, e, n) {
            this.trigger("drag", t, e, n), this.updateScroll(n)
        },
        mouseup: function (t) {
            this.stopListening(t)
        },
        stopDrag: function (t) {
            this.isDragging && (this.stopScrolling(), this.dragStop(t), this.isDragging = !1)
        },
        dragStop: function (t) {
            var e = this;
            this.trigger("dragStop", t), setTimeout(function () {
                e.subjectHref && e.subjectEl.attr("href", e.subjectHref)
            }, 0)
        },
        stopListening: function (e) {
            this.stopDrag(e), this.isListening && (this.scrollEl && (this.scrollEl.off("scroll", this.scrollHandlerProxy), this.scrollHandlerProxy = null), t(document).off("mousemove", this.mousemoveProxy).off("mouseup", this.mouseupProxy).off("selectstart", this.preventDefault), this.mousemoveProxy = null, this.mouseupProxy = null, this.isListening = !1, this.listenStop(e))
        },
        listenStop: function (t) {
            this.trigger("listenStop", t)
        },
        trigger: function (t) {
            this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1))
        },
        preventDefault: function (t) {
            t.preventDefault()
        },
        computeScrollBounds: function () {
            var t = this.scrollEl;
            this.scrollBounds = t ? g(t) : null
        },
        updateScroll: function (t) {
            var e, n, i, r, s = this.scrollSensitivity, o = this.scrollBounds, a = 0, l = 0;
            o && (e = (s - (t.pageY - o.top)) / s, n = (s - (o.bottom - t.pageY)) / s, i = (s - (t.pageX - o.left)) / s, r = (s - (o.right - t.pageX)) / s, e >= 0 && 1 >= e ? a = e * this.scrollSpeed * -1 : n >= 0 && 1 >= n && (a = n * this.scrollSpeed), i >= 0 && 1 >= i ? l = i * this.scrollSpeed * -1 : r >= 0 && 1 >= r && (l = r * this.scrollSpeed)), this.setScrollVel(a, l)
        },
        setScrollVel: function (t, e) {
            this.scrollTopVel = t, this.scrollLeftVel = e, this.constrainScrollVel(), !this.scrollTopVel && !this.scrollLeftVel || this.scrollIntervalId || (this.scrollIntervalId = setInterval(nt(this, "scrollIntervalFunc"), this.scrollIntervalMs))
        },
        constrainScrollVel: function () {
            var t = this.scrollEl;
            this.scrollTopVel < 0 ? t.scrollTop() <= 0 && (this.scrollTopVel = 0) : this.scrollTopVel > 0 && t.scrollTop() + t[0].clientHeight >= t[0].scrollHeight && (this.scrollTopVel = 0), this.scrollLeftVel < 0 ? t.scrollLeft() <= 0 && (this.scrollLeftVel = 0) : this.scrollLeftVel > 0 && t.scrollLeft() + t[0].clientWidth >= t[0].scrollWidth && (this.scrollLeftVel = 0)
        },
        scrollIntervalFunc: function () {
            var t = this.scrollEl, e = this.scrollIntervalMs / 1e3;
            this.scrollTopVel && t.scrollTop(t.scrollTop() + this.scrollTopVel * e), this.scrollLeftVel && t.scrollLeft(t.scrollLeft() + this.scrollLeftVel * e), this.constrainScrollVel(), this.scrollTopVel || this.scrollLeftVel || this.stopScrolling()
        },
        stopScrolling: function () {
            this.scrollIntervalId && (clearInterval(this.scrollIntervalId), this.scrollIntervalId = null, this.scrollStop())
        },
        scrollHandler: function () {
            this.scrollIntervalId || this.scrollStop()
        },
        scrollStop: function () {
        }
    }), le = ae.extend({
        component: null, origHit: null, hit: null, coordAdjust: null, constructor: function (t, e) {
            ae.call(this, e), this.component = t
        }, listenStart: function (t) {
            var e, n, i, r = this.subjectEl;
            ae.prototype.listenStart.apply(this, arguments), this.computeCoords(), t ? (n = {
                left: t.pageX,
                top: t.pageY
            }, i = n, r && (e = g(r), i = _(i, e)), this.origHit = this.queryHit(i.left, i.top), r && this.options.subjectCenter && (this.origHit && (e = b(this.origHit, e) || e), i = E(e)), this.coordAdjust = T(i, n)) : (this.origHit = null, this.coordAdjust = null)
        }, computeCoords: function () {
            this.component.prepareHits(), this.computeScrollBounds()
        }, dragStart: function (t) {
            var e;
            ae.prototype.dragStart.apply(this, arguments), e = this.queryHit(t.pageX, t.pageY), e && this.hitOver(e)
        }, drag: function (t, e, n) {
            var i;
            ae.prototype.drag.apply(this, arguments), i = this.queryHit(n.pageX, n.pageY), St(i, this.hit) || (this.hit && this.hitOut(), i && this.hitOver(i))
        }, dragStop: function () {
            this.hitDone(), ae.prototype.dragStop.apply(this, arguments)
        }, hitOver: function (t) {
            var e = St(t, this.origHit);
            this.hit = t, this.trigger("hitOver", this.hit, e, this.origHit)
        }, hitOut: function () {
            this.hit && (this.trigger("hitOut", this.hit), this.hitDone(), this.hit = null)
        }, hitDone: function () {
            this.hit && this.trigger("hitDone", this.hit)
        }, listenStop: function () {
            ae.prototype.listenStop.apply(this, arguments), this.origHit = null, this.hit = null, this.component.releaseHits()
        }, scrollStop: function () {
            ae.prototype.scrollStop.apply(this, arguments), this.computeCoords()
        }, queryHit: function (t, e) {
            return this.coordAdjust && (t += this.coordAdjust.left, e += this.coordAdjust.top), this.component.queryHit(t, e)
        }
    }), ue = vt.extend({
        options: null,
        sourceEl: null,
        el: null,
        parentEl: null,
        top0: null,
        left0: null,
        mouseY0: null,
        mouseX0: null,
        topDelta: null,
        leftDelta: null,
        mousemoveProxy: null,
        isFollowing: !1,
        isHidden: !1,
        isAnimating: !1,
        constructor: function (e, n) {
            this.options = n = n || {}, this.sourceEl = e, this.parentEl = n.parentEl ? t(n.parentEl) : e.parent()
        },
        start: function (e) {
            this.isFollowing || (this.isFollowing = !0, this.mouseY0 = e.pageY, this.mouseX0 = e.pageX, this.topDelta = 0, this.leftDelta = 0, this.isHidden || this.updatePosition(), t(document).on("mousemove", this.mousemoveProxy = nt(this, "mousemove")))
        },
        stop: function (e, n) {
            function i() {
                this.isAnimating = !1, r.removeElement(), this.top0 = this.left0 = null, n && n()
            }

            var r = this, s = this.options.revertDuration;
            this.isFollowing && !this.isAnimating && (this.isFollowing = !1, t(document).off("mousemove", this.mousemoveProxy), e && s && !this.isHidden ? (this.isAnimating = !0, this.el.animate({
                top: this.top0,
                left: this.left0
            }, {duration: s, complete: i})) : i())
        },
        getEl: function () {
            var t = this.el;
            return t || (this.sourceEl.width(), t = this.el = this.sourceEl.clone().css({
                position: "absolute",
                visibility: "",
                display: this.isHidden ? "none" : "",
                margin: 0,
                right: "auto",
                bottom: "auto",
                width: this.sourceEl.width(),
                height: this.sourceEl.height(),
                opacity: this.options.opacity || "",
                zIndex: this.options.zIndex
            }).appendTo(this.parentEl)), t
        },
        removeElement: function () {
            this.el && (this.el.remove(), this.el = null)
        },
        updatePosition: function () {
            var t, e;
            this.getEl(), null === this.top0 && (this.sourceEl.width(), t = this.sourceEl.offset(), e = this.el.offsetParent().offset(), this.top0 = t.top - e.top, this.left0 = t.left - e.left), this.el.css({
                top: this.top0 + this.topDelta,
                left: this.left0 + this.leftDelta
            })
        },
        mousemove: function (t) {
            this.topDelta = t.pageY - this.mouseY0, this.leftDelta = t.pageX - this.mouseX0, this.isHidden || this.updatePosition()
        },
        hide: function () {
            this.isHidden || (this.isHidden = !0, this.el && this.el.hide())
        },
        show: function () {
            this.isHidden && (this.isHidden = !1, this.updatePosition(), this.getEl().show())
        }
    }), ce = Wt.Grid = vt.extend({
        view: null,
        isRTL: null,
        start: null,
        end: null,
        el: null,
        elsByFill: null,
        externalDragStartProxy: null,
        eventTimeFormat: null,
        displayEventTime: null,
        displayEventEnd: null,
        minResizeDuration: null,
        largeUnit: null,
        constructor: function (t) {
            this.view = t, this.isRTL = t.opt("isRTL"), this.elsByFill = {}, this.externalDragStartProxy = nt(this, "externalDragStart")
        },
        computeEventTimeFormat: function () {
            return this.view.opt("smallTimeFormat")
        },
        computeDisplayEventTime: function () {
            return !0
        },
        computeDisplayEventEnd: function () {
            return !0
        },
        setRange: function (t) {
            this.start = t.start.clone(), this.end = t.end.clone(), this.rangeUpdated(), this.processRangeOptions()
        },
        rangeUpdated: function () {
        },
        processRangeOptions: function () {
            var t, e, n = this.view;
            this.eventTimeFormat = n.opt("eventTimeFormat") || n.opt("timeFormat") || this.computeEventTimeFormat(), t = n.opt("displayEventTime"), null == t && (t = this.computeDisplayEventTime()), e = n.opt("displayEventEnd"), null == e && (e = this.computeDisplayEventEnd()), this.displayEventTime = t, this.displayEventEnd = e
        },
        spanToSegs: function (t) {
        },
        diffDates: function (t, e) {
            return this.largeUnit ? O(t, e, this.largeUnit) : R(t, e)
        },
        prepareHits: function () {
        },
        releaseHits: function () {
        },
        queryHit: function (t, e) {
        },
        getHitSpan: function (t) {
        },
        getHitEl: function (t) {
        },
        setElement: function (e) {
            var n = this;
            this.el = e, e.on("mousedown", function (e) {
                t(e.target).is(".fc-event-container *, .fc-more") || t(e.target).closest(".fc-popover").length || n.dayMousedown(e)
            }), this.bindSegHandlers(), this.bindGlobalHandlers()
        },
        removeElement: function () {
            this.unbindGlobalHandlers(), this.el.remove()
        },
        renderSkeleton: function () {
        },
        renderDates: function () {
        },
        unrenderDates: function () {
        },
        bindGlobalHandlers: function () {
            t(document).on("dragstart sortstart", this.externalDragStartProxy)
        },
        unbindGlobalHandlers: function () {
            t(document).off("dragstart sortstart", this.externalDragStartProxy)
        },
        dayMousedown: function (t) {
            var e, n, i = this, r = this.view, s = r.opt("selectable"), l = new le(this, {
                scroll: r.opt("dragScroll"),
                dragStart: function () {
                    r.unselect()
                },
                hitOver: function (t, r, a) {
                    a && (e = r ? t : null, s && (n = i.computeSelection(i.getHitSpan(a), i.getHitSpan(t)), n ? i.renderSelection(n) : n === !1 && o()))
                },
                hitOut: function () {
                    e = null, n = null, i.unrenderSelection(), a()
                },
                listenStop: function (t) {
                    e && r.triggerDayClick(i.getHitSpan(e), i.getHitEl(e), t), n && r.reportSelection(n, t), a()
                }
            });
            l.mousedown(t)
        },
        renderEventLocationHelper: function (t, e) {
            var n = this.fabricateHelperEvent(t, e);
            this.renderHelper(n, e)
        },
        fabricateHelperEvent: function (t, e) {
            var n = e ? N(e.event) : {};
            return n.start = t.start.clone(), n.end = t.end ? t.end.clone() : null, n.allDay = null, this.view.calendar.normalizeEventDates(n), n.className = (n.className || []).concat("fc-helper"), e || (n.editable = !1), n
        },
        renderHelper: function (t, e) {
        },
        unrenderHelper: function () {
        },
        renderSelection: function (t) {
            this.renderHighlight(t)
        },
        unrenderSelection: function () {
            this.unrenderHighlight()
        },
        computeSelection: function (t, e) {
            var n = this.computeSelectionSpan(t, e);
            return n && !this.view.calendar.isSelectionSpanAllowed(n) ? !1 : n
        },
        computeSelectionSpan: function (t, e) {
            var n = [t.start, t.end, e.start, e.end];
            return n.sort(tt), {start: n[0].clone(), end: n[3].clone()}
        },
        renderHighlight: function (t) {
            this.renderFill("highlight", this.spanToSegs(t))
        },
        unrenderHighlight: function () {
            this.unrenderFill("highlight")
        },
        highlightSegClasses: function () {
            return ["fc-highlight"]
        },
        renderFill: function (t, e) {
        },
        unrenderFill: function (t) {
            var e = this.elsByFill[t];
            e && (e.remove(), delete this.elsByFill[t])
        },
        renderFillSegEls: function (e, n) {
            var i, r = this, s = this[e + "SegEl"], o = "", a = [];
            if (n.length) {
                for (i = 0; i < n.length; i++)o += this.fillSegHtml(e, n[i]);
                t(o).each(function (e, i) {
                    var o = n[e], l = t(i);
                    s && (l = s.call(r, o, l)), l && (l = t(l), l.is(r.fillSegTag) && (o.el = l, a.push(o)))
                })
            }
            return a
        },
        fillSegTag: "div",
        fillSegHtml: function (t, e) {
            var n = this[t + "SegClasses"], i = this[t + "SegCss"], r = n ? n.call(this, e) : [], s = Q(i ? i.call(this, e) : {});
            return "<" + this.fillSegTag + (r.length ? ' class="' + r.join(" ") + '"' : "") + (s ? ' style="' + s + '"' : "") + " />"
        },
        getDayClasses: function (t) {
            var e = this.view, n = e.calendar.getNow().stripTime(), i = ["fc-" + Ut[t.day()]];
            return 1 == e.intervalDuration.as("months") && t.month() != e.intervalStart.month() && i.push("fc-other-month"), t.isSame(n, "day") ? i.push("fc-today", e.highlightStateClass) : n > t ? i.push("fc-past") : i.push("fc-future"), i
        }
    });
    ce.mixin({
        mousedOverSeg: null,
        isDraggingSeg: !1,
        isResizingSeg: !1,
        isDraggingExternal: !1,
        segs: null,
        renderEvents: function (t) {
            var e, n = [], i = [];
            for (e = 0; e < t.length; e++)(bt(t[e]) ? n : i).push(t[e]);
            this.segs = [].concat(this.renderBgEvents(n), this.renderFgEvents(i))
        },
        renderBgEvents: function (t) {
            var e = this.eventsToSegs(t);
            return this.renderBgSegs(e) || e
        },
        renderFgEvents: function (t) {
            var e = this.eventsToSegs(t);
            return this.renderFgSegs(e) || e
        },
        unrenderEvents: function () {
            this.triggerSegMouseout(), this.unrenderFgSegs(), this.unrenderBgSegs(), this.segs = null
        },
        getEventSegs: function () {
            return this.segs || []
        },
        renderFgSegs: function (t) {
        },
        unrenderFgSegs: function () {
        },
        renderFgSegEls: function (e, n) {
            var i, r = this.view, s = "", o = [];
            if (e.length) {
                for (i = 0; i < e.length; i++)s += this.fgSegHtml(e[i], n);
                t(s).each(function (n, i) {
                    var s = e[n], a = r.resolveEventEl(s.event, t(i));
                    a && (a.data("fc-seg", s), s.el = a, o.push(s))
                })
            }
            return o
        },
        fgSegHtml: function (t, e) {
        },
        renderBgSegs: function (t) {
            return this.renderFill("bgEvent", t)
        },
        unrenderBgSegs: function () {
            this.unrenderFill("bgEvent")
        },
        bgEventSegEl: function (t, e) {
            return this.view.resolveEventEl(t.event, e)
        },
        bgEventSegClasses: function (t) {
            var e = t.event, n = e.source || {};
            return ["fc-bgevent"].concat(e.className, n.className || [])
        },
        bgEventSegCss: function (t) {
            var e = this.view, n = t.event, i = n.source || {};
            return {"background-color": n.backgroundColor || n.color || i.backgroundColor || i.color || e.opt("eventBackgroundColor") || e.opt("eventColor")}
        },
        businessHoursSegClasses: function (t) {
            return ["fc-nonbusiness", "fc-bgevent"]
        },
        bindSegHandlers: function () {
            var e = this, n = this.view;
            t.each({
                mouseenter: function (t, n) {
                    e.triggerSegMouseover(t, n)
                }, mouseleave: function (t, n) {
                    e.triggerSegMouseout(t, n)
                }, click: function (t, e) {
                    return n.trigger("eventClick", this, t.event, e)
                }, mousedown: function (i, r) {
                    t(r.target).is(".fc-resizer") && n.isEventResizable(i.event) ? e.segResizeMousedown(i, r, t(r.target).is(".fc-start-resizer")) : n.isEventDraggable(i.event) && e.segDragMousedown(i, r)
                }
            }, function (n, i) {
                e.el.on(n, ".fc-event-container > *", function (n) {
                    var r = t(this).data("fc-seg");
                    return !r || e.isDraggingSeg || e.isResizingSeg ? void 0 : i.call(this, r, n)
                })
            })
        },
        triggerSegMouseover: function (t, e) {
            this.mousedOverSeg || (this.mousedOverSeg = t, this.view.trigger("eventMouseover", t.el[0], t.event, e))
        },
        triggerSegMouseout: function (t, e) {
            e = e || {}, this.mousedOverSeg && (t = t || this.mousedOverSeg, this.mousedOverSeg = null, this.view.trigger("eventMouseout", t.el[0], t.event, e))
        },
        segDragMousedown: function (t, e) {
            var n, i = this, r = this.view, s = r.calendar, l = t.el, u = t.event, c = new ue(t.el, {
                parentEl: r.el,
                opacity: r.opt("dragOpacity"),
                revertDuration: r.opt("dragRevertDuration"),
                zIndex: 2
            }), d = new le(r, {
                distance: 5,
                scroll: r.opt("dragScroll"),
                subjectEl: l,
                subjectCenter: !0,
                listenStart: function (t) {
                    c.hide(), c.start(t)
                },
                dragStart: function (e) {
                    i.triggerSegMouseout(t, e), i.segDragStart(t, e), r.hideEvent(u)
                },
                hitOver: function (e, a, l) {
                    t.hit && (l = t.hit), n = i.computeEventDrop(l.component.getHitSpan(l), e.component.getHitSpan(e), u), n && !s.isEventSpanAllowed(i.eventToSpan(n), u) && (o(), n = null), n && r.renderDrag(n, t) ? c.hide() : c.show(), a && (n = null)
                },
                hitOut: function () {
                    r.unrenderDrag(), c.show(), n = null
                },
                hitDone: function () {
                    a()
                },
                dragStop: function (e) {
                    c.stop(!n, function () {
                        r.unrenderDrag(), r.showEvent(u), i.segDragStop(t, e), n && r.reportEventDrop(u, n, this.largeUnit, l, e)
                    })
                },
                listenStop: function () {
                    c.stop()
                }
            });
            d.mousedown(e)
        },
        segDragStart: function (t, e) {
            this.isDraggingSeg = !0, this.view.trigger("eventDragStart", t.el[0], t.event, e, {})
        },
        segDragStop: function (t, e) {
            this.isDraggingSeg = !1, this.view.trigger("eventDragStop", t.el[0], t.event, e, {})
        },
        computeEventDrop: function (t, e, n) {
            var i, r, s = this.view.calendar, o = t.start, a = e.start;
            return o.hasTime() === a.hasTime() ? (i = this.diffDates(a, o), n.allDay && I(i) ? (r = {
                start: n.start.clone(),
                end: s.getEventEnd(n),
                allDay: !1
            }, s.normalizeEventTimes(r)) : r = {
                start: n.start.clone(),
                end: n.end ? n.end.clone() : null,
                allDay: n.allDay
            }, r.start.add(i), r.end && r.end.add(i)) : r = {start: a.clone(), end: null, allDay: !a.hasTime()}, r
        },
        applyDragOpacity: function (t) {
            var e = this.view.opt("dragOpacity");
            null != e && t.each(function (t, n) {
                n.style.opacity = e
            })
        },
        externalDragStart: function (e, n) {
            var i, r, s = this.view;
            s.opt("droppable") && (i = t((n ? n.item : null) || e.target), r = s.opt("dropAccept"), (t.isFunction(r) ? r.call(i[0], i) : i.is(r)) && (this.isDraggingExternal || this.listenToExternalDrag(i, e, n)))
        },
        listenToExternalDrag: function (t, e, n) {
            var i, r = this, s = Ht(t), l = new le(this, {
                listenStart: function () {
                    r.isDraggingExternal = !0
                }, hitOver: function (t) {
                    i = r.computeExternalDrop(t.component.getHitSpan(t), s), i ? r.renderDrag(i) : o()
                }, hitOut: function () {
                    i = null, r.unrenderDrag(), a()
                }, dragStop: function () {
                    r.unrenderDrag(), a(), i && r.view.reportExternalDrop(s, i, t, e, n)
                }, listenStop: function () {
                    r.isDraggingExternal = !1
                }
            });
            l.startDrag(e)
        },
        computeExternalDrop: function (t, e) {
            var n = this.view.calendar, i = {start: n.applyTimezone(t.start), end: null};
            return e.startTime && !i.start.hasTime() && i.start.time(e.startTime), e.duration && (i.end = i.start.clone().add(e.duration)), n.isExternalSpanAllowed(this.eventToSpan(i), i, e.eventProps) ? i : null
        },
        renderDrag: function (t, e) {
        },
        unrenderDrag: function () {
        },
        segResizeMousedown: function (t, e, n) {
            var i, r = this, s = this.view, l = s.calendar, u = t.el, c = t.event, d = l.getEventEnd(c), h = new le(this, {
                distance: 5,
                scroll: s.opt("dragScroll"),
                subjectEl: u,
                dragStart: function (e) {
                    r.triggerSegMouseout(t, e), r.segResizeStart(t, e)
                },
                hitOver: function (e, a, u) {
                    var h = r.getHitSpan(u), f = r.getHitSpan(e);
                    i = n ? r.computeEventStartResize(h, f, c) : r.computeEventEndResize(h, f, c), i && (l.isEventSpanAllowed(r.eventToSpan(i), c) ? i.start.isSame(c.start) && i.end.isSame(d) && (i = null) : (o(), i = null)), i && (s.hideEvent(c), r.renderEventResize(i, t))
                },
                hitOut: function () {
                    i = null
                },
                hitDone: function () {
                    r.unrenderEventResize(), s.showEvent(c), a()
                },
                dragStop: function (e) {
                    r.segResizeStop(t, e), i && s.reportEventResize(c, i, this.largeUnit, u, e)
                }
            });
            h.mousedown(e)
        },
        segResizeStart: function (t, e) {
            this.isResizingSeg = !0, this.view.trigger("eventResizeStart", t.el[0], t.event, e, {})
        },
        segResizeStop: function (t, e) {
            this.isResizingSeg = !1, this.view.trigger("eventResizeStop", t.el[0], t.event, e, {})
        },
        computeEventStartResize: function (t, e, n) {
            return this.computeEventResize("start", t, e, n)
        },
        computeEventEndResize: function (t, e, n) {
            return this.computeEventResize("end", t, e, n)
        },
        computeEventResize: function (t, e, n, i) {
            var r, s, o = this.view.calendar, a = this.diffDates(n[t], e[t]);
            return r = {
                start: i.start.clone(),
                end: o.getEventEnd(i),
                allDay: i.allDay
            }, r.allDay && I(a) && (r.allDay = !1, o.normalizeEventTimes(r)), r[t].add(a), r.start.isBefore(r.end) || (s = this.minResizeDuration || (i.allDay ? o.defaultAllDayEventDuration : o.defaultTimedEventDuration), "start" == t ? r.start = r.end.clone().subtract(s) : r.end = r.start.clone().add(s)), r
        },
        renderEventResize: function (t, e) {
        },
        unrenderEventResize: function () {
        },
        getEventTimeText: function (t, e, n) {
            return null == e && (e = this.eventTimeFormat), null == n && (n = this.displayEventEnd), this.displayEventTime && t.start.hasTime() ? n && t.end ? this.view.formatRange(t, e) : t.start.format(e) : ""
        },
        getSegClasses: function (t, e, n) {
            var i = t.event, r = ["fc-event", t.isStart ? "fc-start" : "fc-not-start", t.isEnd ? "fc-end" : "fc-not-end"].concat(i.className, i.source ? i.source.className : []);
            return e && r.push("fc-draggable"), n && r.push("fc-resizable"), r
        },
        getEventSkinCss: function (t) {
            var e = this.view, n = t.source || {}, i = t.color, r = n.color, s = e.opt("eventColor");
            return {
                "background-color": t.backgroundColor || i || n.backgroundColor || r || e.opt("eventBackgroundColor") || s,
                "border-color": t.borderColor || i || n.borderColor || r || e.opt("eventBorderColor") || s,
                color: t.textColor || n.textColor || e.opt("eventTextColor")
            }
        },
        eventToSegs: function (t) {
            return this.eventsToSegs([t])
        },
        eventToSpan: function (t) {
            var e = this.eventToRange(t);
            return this.transformEventSpan(e, t), e
        },
        eventsToSegs: function (e, n) {
            var i = this, r = Tt(e), s = [];
            return t.each(r, function (t, e) {
                var r, o = [];
                for (r = 0; r < e.length; r++)o.push(i.eventToRange(e[r]));
                if (_t(e[0]))for (o = i.invertRanges(o), r = 0; r < o.length; r++)i.generateEventSegs(o[r], e[0], n, s); else for (r = 0; r < o.length; r++)i.generateEventSegs(o[r], e[r], n, s)
            }), s
        },
        eventToRange: function (t) {
            return {start: t.start.clone().stripZone(), end: this.view.calendar.getEventEnd(t).stripZone()}
        },
        generateEventSegs: function (t, e, n, i) {
            var r, s;
            for (this.transformEventSpan(t, e), r = n ? n(t) : this.spanToSegs(t), s = 0; s < r.length; s++)this.transformEventSeg(r[s], t, e), i.push(r[s])
        },
        transformEventSpan: function (t, e) {
        },
        transformEventSeg: function (t, e, n) {
            t.event = n, t.eventStartMS = +e.start, t.eventDurationMS = e.end - e.start
        },
        invertRanges: function (t) {
            var e, n, i = this.view, r = i.start.clone(), s = i.end.clone(), o = [], a = r;
            for (t.sort(Ct), e = 0; e < t.length; e++)n = t[e], n.start > a && o.push({
                start: a,
                end: n.start
            }), a = n.end;
            return s > a && o.push({start: a, end: s}), o
        },
        sortEventSegs: function (t) {
            t.sort(nt(this, "compareEventSegs"))
        },
        compareEventSegs: function (t, e) {
            return t.eventStartMS - e.eventStartMS || e.eventDurationMS - t.eventDurationMS || e.event.allDay - t.event.allDay || H(t.event, e.event, this.view.eventOrderSpecs)
        }
    }), Wt.dataAttrPrefix = "";
    var de = Wt.DayTableMixin = {
        breakOnWeeks: !1,
        dayDates: null,
        dayIndices: null,
        daysPerRow: null,
        rowCnt: null,
        colCnt: null,
        colHeadFormat: null,
        updateDayTable: function () {
            for (var t, e, n, i = this.view, r = this.start.clone(), s = -1, o = [], a = []; r.isBefore(this.end);)i.isHiddenDay(r) ? o.push(s + .5) : (s++, o.push(s), a.push(r.clone())), r.add(1, "days");
            if (this.breakOnWeeks) {
                for (e = a[0].day(), t = 1; t < a.length && a[t].day() != e; t++);
                n = Math.ceil(a.length / t)
            } else n = 1, t = a.length;
            this.dayDates = a, this.dayIndices = o, this.daysPerRow = t, this.rowCnt = n, this.updateDayTableCols()
        },
        updateDayTableCols: function () {
            this.colCnt = this.computeColCnt(), this.colHeadFormat = this.view.opt("columnFormat") || this.computeColHeadFormat()
        },
        computeColCnt: function () {
            return this.daysPerRow
        },
        getCellDate: function (t, e) {
            return this.dayDates[this.getCellDayIndex(t, e)].clone()
        },
        getCellRange: function (t, e) {
            var n = this.getCellDate(t, e), i = n.clone().add(1, "days");
            return {start: n, end: i}
        },
        getCellDayIndex: function (t, e) {
            return t * this.daysPerRow + this.getColDayIndex(e)
        },
        getColDayIndex: function (t) {
            return this.isRTL ? this.colCnt - 1 - t : t
        },
        getDateDayIndex: function (t) {
            var e = this.dayIndices, n = t.diff(this.start, "days");
            return 0 > n ? e[0] - 1 : n >= e.length ? e[e.length - 1] + 1 : e[n]
        },
        computeColHeadFormat: function () {
            return this.rowCnt > 1 || this.colCnt > 10 ? "ddd" : this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd"
        },
        sliceRangeByRow: function (t) {
            var e, n, i, r, s, o = this.daysPerRow, a = this.view.computeDayRange(t), l = this.getDateDayIndex(a.start), u = this.getDateDayIndex(a.end.clone().subtract(1, "days")), c = [];
            for (e = 0; e < this.rowCnt; e++)n = e * o, i = n + o - 1, r = Math.max(l, n), s = Math.min(u, i), r = Math.ceil(r), s = Math.floor(s), s >= r && c.push({
                row: e,
                firstRowDayIndex: r - n,
                lastRowDayIndex: s - n,
                isStart: r === l,
                isEnd: s === u
            });
            return c
        },
        sliceRangeByDay: function (t) {
            var e, n, i, r, s, o, a = this.daysPerRow, l = this.view.computeDayRange(t), u = this.getDateDayIndex(l.start), c = this.getDateDayIndex(l.end.clone().subtract(1, "days")), d = [];
            for (e = 0; e < this.rowCnt; e++)for (n = e * a, i = n + a - 1, r = n; i >= r; r++)s = Math.max(u, r), o = Math.min(c, r), s = Math.ceil(s), o = Math.floor(o), o >= s && d.push({
                row: e,
                firstRowDayIndex: s - n,
                lastRowDayIndex: o - n,
                isStart: s === u,
                isEnd: o === c
            });
            return d
        },
        renderHeadHtml: function () {
            var t = this.view;
            return '<div class="fc-row ' + t.widgetHeaderClass + '"><table><thead>' + this.renderHeadTrHtml() + "</thead></table></div>"
        },
        renderHeadIntroHtml: function () {
            return this.renderIntroHtml()
        },
        renderHeadTrHtml: function () {
            return "<tr>" + (this.isRTL ? "" : this.renderHeadIntroHtml()) + this.renderHeadDateCellsHtml() + (this.isRTL ? this.renderHeadIntroHtml() : "") + "</tr>"
        },
        renderHeadDateCellsHtml: function () {
            var t, e, n = [];
            for (t = 0; t < this.colCnt; t++)e = this.getCellDate(0, t), n.push(this.renderHeadDateCellHtml(e));
            return n.join("")
        },
        renderHeadDateCellHtml: function (t, e) {
            var n = this.view;
            return '<th class="fc-day-header ' + n.widgetHeaderClass + " fc-" + Ut[t.day()] + '"' + (e > 1 ? ' colspan="' + e + '"' : "") + ">" + X(t.format(this.colHeadFormat)) + "</th>"
        },
        renderBgTrHtml: function (t) {
            return "<tr>" + (this.isRTL ? "" : this.renderBgIntroHtml(t)) + this.renderBgCellsHtml(t) + (this.isRTL ? this.renderBgIntroHtml(t) : "") + "</tr>"
        },
        renderBgIntroHtml: function (t) {
            return this.renderIntroHtml()
        },
        renderBgCellsHtml: function (t) {
            var e, n, i = [];
            for (e = 0; e < this.colCnt; e++)n = this.getCellDate(t, e), i.push(this.renderBgCellHtml(n));
            return i.join("")
        },
        renderBgCellHtml: function (t) {
            var e = this.view, n = this.getDayClasses(t);
            return n.unshift("fc-day", e.widgetContentClass), '<td class="' + n.join(" ") + '" data-date="' + t.format("YYYY-MM-DD") + '"></td>'
        },
        renderIntroHtml: function () {
        },
        bookendCells: function (t) {
            var e = this.renderIntroHtml();
            e && (this.isRTL ? t.append(e) : t.prepend(e))
        }
    }, he = Wt.DayGrid = ce.extend(de, {
        numbersVisible: !1,
        bottomCoordPadding: 0,
        rowEls: null,
        cellEls: null,
        helperEls: null,
        rowCoordCache: null,
        colCoordCache: null,
        renderDates: function (t) {
            var e, n, i = this.view, r = this.rowCnt, s = this.colCnt, o = "";
            for (e = 0; r > e; e++)o += this.renderDayRowHtml(e, t);
            for (this.el.html(o), this.rowEls = this.el.find(".fc-row"), this.cellEls = this.el.find(".fc-day"), this.rowCoordCache = new oe({
                els: this.rowEls,
                isVertical: !0
            }), this.colCoordCache = new oe({
                els: this.cellEls.slice(0, this.colCnt),
                isHorizontal: !0
            }), e = 0; r > e; e++)for (n = 0; s > n; n++)i.trigger("dayRender", null, this.getCellDate(e, n), this.getCellEl(e, n))
        },
        unrenderDates: function () {
            this.removeSegPopover()
        },
        renderBusinessHours: function () {
            var t = this.view.calendar.getBusinessHoursEvents(!0), e = this.eventsToSegs(t);
            this.renderFill("businessHours", e, "bgevent")
        },
        renderDayRowHtml: function (t, e) {
            var n = this.view, i = ["fc-row", "fc-week", n.widgetContentClass];
            return e && i.push("fc-rigid"), '<div class="' + i.join(" ") + '"><div class="fc-bg"><table>' + this.renderBgTrHtml(t) + '</table></div><div class="fc-content-skeleton"><table>' + (this.numbersVisible ? "<thead>" + this.renderNumberTrHtml(t) + "</thead>" : "") + "</table></div></div>"
        },
        renderNumberTrHtml: function (t) {
            return "<tr>" + (this.isRTL ? "" : this.renderNumberIntroHtml(t)) + this.renderNumberCellsHtml(t) + (this.isRTL ? this.renderNumberIntroHtml(t) : "") + "</tr>"
        },
        renderNumberIntroHtml: function (t) {
            return this.renderIntroHtml()
        },
        renderNumberCellsHtml: function (t) {
            var e, n, i = [];
            for (e = 0; e < this.colCnt; e++)n = this.getCellDate(t, e), i.push(this.renderNumberCellHtml(n));
            return i.join("")
        },
        renderNumberCellHtml: function (t) {
            var e;
            return this.view.dayNumbersVisible ? (e = this.getDayClasses(t), e.unshift("fc-day-number"), '<td class="' + e.join(" ") + '" data-date="' + t.format() + '">' + t.date() + "</td>") : "<td/>"
        },
        computeEventTimeFormat: function () {
            return this.view.opt("extraSmallTimeFormat")
        },
        computeDisplayEventEnd: function () {
            return 1 == this.colCnt
        },
        rangeUpdated: function () {
            this.updateDayTable()
        },
        spanToSegs: function (t) {
            var e, n, i = this.sliceRangeByRow(t);
            for (e = 0; e < i.length; e++)n = i[e], this.isRTL ? (n.leftCol = this.daysPerRow - 1 - n.lastRowDayIndex, n.rightCol = this.daysPerRow - 1 - n.firstRowDayIndex) : (n.leftCol = n.firstRowDayIndex, n.rightCol = n.lastRowDayIndex);
            return i
        },
        prepareHits: function () {
            this.colCoordCache.build(), this.rowCoordCache.build(), this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding
        },
        releaseHits: function () {
            this.colCoordCache.clear(), this.rowCoordCache.clear()
        },
        queryHit: function (t, e) {
            var n = this.colCoordCache.getHorizontalIndex(t), i = this.rowCoordCache.getVerticalIndex(e);
            return null != i && null != n ? this.getCellHit(i, n) : void 0
        },
        getHitSpan: function (t) {
            return this.getCellRange(t.row, t.col)
        },
        getHitEl: function (t) {
            return this.getCellEl(t.row, t.col)
        },
        getCellHit: function (t, e) {
            return {
                row: t,
                col: e,
                component: this,
                left: this.colCoordCache.getLeftOffset(e),
                right: this.colCoordCache.getRightOffset(e),
                top: this.rowCoordCache.getTopOffset(t),
                bottom: this.rowCoordCache.getBottomOffset(t)
            }
        },
        getCellEl: function (t, e) {
            return this.cellEls.eq(t * this.colCnt + e)
        },
        renderDrag: function (t, e) {
            return this.renderHighlight(this.eventToSpan(t)), e && !e.el.closest(this.el).length ? (this.renderEventLocationHelper(t, e), this.applyDragOpacity(this.helperEls), !0) : void 0
        },
        unrenderDrag: function () {
            this.unrenderHighlight(), this.unrenderHelper()
        },
        renderEventResize: function (t, e) {
            this.renderHighlight(this.eventToSpan(t)), this.renderEventLocationHelper(t, e)
        },
        unrenderEventResize: function () {
            this.unrenderHighlight(), this.unrenderHelper()
        },
        renderHelper: function (e, n) {
            var i, r = [], s = this.eventToSegs(e);
            s = this.renderFgSegEls(s), i = this.renderSegRows(s), this.rowEls.each(function (e, s) {
                var o, a = t(s), l = t('<div class="fc-helper-skeleton"><table/></div>');
                o = n && n.row === e ? n.el.position().top : a.find(".fc-content-skeleton tbody").position().top, l.css("top", o).find("table").append(i[e].tbodyEl), a.append(l), r.push(l[0])
            }), this.helperEls = t(r)
        },
        unrenderHelper: function () {
            this.helperEls && (this.helperEls.remove(), this.helperEls = null)
        },
        fillSegTag: "td",
        renderFill: function (e, n, i) {
            var r, s, o, a = [];
            for (n = this.renderFillSegEls(e, n), r = 0; r < n.length; r++)s = n[r], o = this.renderFillRow(e, s, i), this.rowEls.eq(s.row).append(o), a.push(o[0]);
            return this.elsByFill[e] = t(a), n
        },
        renderFillRow: function (e, n, i) {
            var r, s, o = this.colCnt, a = n.leftCol, l = n.rightCol + 1;
            return i = i || e.toLowerCase(), r = t('<div class="fc-' + i + '-skeleton"><table><tr/></table></div>'), s = r.find("tr"), a > 0 && s.append('<td colspan="' + a + '"/>'), s.append(n.el.attr("colspan", l - a)), o > l && s.append('<td colspan="' + (o - l) + '"/>'), this.bookendCells(s), r
        }
    });
    he.mixin({
        rowStructs: null, unrenderEvents: function () {
            this.removeSegPopover(), ce.prototype.unrenderEvents.apply(this, arguments)
        }, getEventSegs: function () {
            return ce.prototype.getEventSegs.call(this).concat(this.popoverSegs || [])
        }, renderBgSegs: function (e) {
            var n = t.grep(e, function (t) {
                return t.event.allDay
            });
            return ce.prototype.renderBgSegs.call(this, n)
        }, renderFgSegs: function (e) {
            var n;
            return e = this.renderFgSegEls(e), n = this.rowStructs = this.renderSegRows(e), this.rowEls.each(function (e, i) {
                t(i).find(".fc-content-skeleton > table").append(n[e].tbodyEl)
            }), e
        }, unrenderFgSegs: function () {
            for (var t, e = this.rowStructs || []; t = e.pop();)t.tbodyEl.remove();
            this.rowStructs = null
        }, renderSegRows: function (t) {
            var e, n, i = [];
            for (e = this.groupSegRows(t), n = 0; n < e.length; n++)i.push(this.renderSegRow(n, e[n]));
            return i
        }, fgSegHtml: function (t, e) {
            var n, i, r = this.view, s = t.event, o = r.isEventDraggable(s), a = !e && s.allDay && t.isStart && r.isEventResizableFromStart(s), l = !e && s.allDay && t.isEnd && r.isEventResizableFromEnd(s), u = this.getSegClasses(t, o, a || l), c = Q(this.getEventSkinCss(s)), d = "";
            return u.unshift("fc-day-grid-event", "fc-h-event"), t.isStart && (n = this.getEventTimeText(s), n && (d = '<span class="fc-time">' + X(n) + "</span>")), i = '<span class="fc-title">' + (X(s.title || "") || "&nbsp;") + "</span>", '<a class="' + u.join(" ") + '"' + (s.url ? ' href="' + X(s.url) + '"' : "") + (c ? ' style="' + c + '"' : "") + '><div class="fc-content">' + (this.isRTL ? i + " " + d : d + " " + i) + "</div>" + (a ? '<div class="fc-resizer fc-start-resizer" />' : "") + (l ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        }, renderSegRow: function (e, n) {
            function i(e) {
                for (; e > o;)c = (v[r - 1] || [])[o], c ? c.attr("rowspan", parseInt(c.attr("rowspan") || 1, 10) + 1) : (c = t("<td/>"), a.append(c)), p[r][o] = c, v[r][o] = c, o++
            }

            var r, s, o, a, l, u, c, d = this.colCnt, h = this.buildSegLevels(n), f = Math.max(1, h.length), g = t("<tbody/>"), m = [], p = [], v = [];
            for (r = 0; f > r; r++) {
                if (s = h[r], o = 0, a = t("<tr/>"), m.push([]), p.push([]), v.push([]), s)for (l = 0; l < s.length; l++) {
                    for (u = s[l], i(u.leftCol), c = t('<td class="fc-event-container"/>').append(u.el), u.leftCol != u.rightCol ? c.attr("colspan", u.rightCol - u.leftCol + 1) : v[r][o] = c; o <= u.rightCol;)p[r][o] = c, m[r][o] = u, o++;
                    a.append(c)
                }
                i(d), this.bookendCells(a), g.append(a)
            }
            return {row: e, tbodyEl: g, cellMatrix: p, segMatrix: m, segLevels: h, segs: n}
        }, buildSegLevels: function (t) {
            var e, n, i, r = [];
            for (this.sortEventSegs(t), e = 0; e < t.length; e++) {
                for (n = t[e], i = 0; i < r.length && Mt(n, r[i]); i++);
                n.level = i, (r[i] || (r[i] = [])).push(n)
            }
            for (i = 0; i < r.length; i++)r[i].sort(kt);
            return r
        }, groupSegRows: function (t) {
            var e, n = [];
            for (e = 0; e < this.rowCnt; e++)n.push([]);
            for (e = 0; e < t.length; e++)n[t[e].row].push(t[e]);
            return n
        }
    }), he.mixin({
        segPopover: null, popoverSegs: null, removeSegPopover: function () {
            this.segPopover && this.segPopover.hide()
        }, limitRows: function (t) {
            var e, n, i = this.rowStructs || [];
            for (e = 0; e < i.length; e++)this.unlimitRow(e), n = t ? "number" == typeof t ? t : this.computeRowLevelLimit(e) : !1, n !== !1 && this.limitRow(e, n)
        }, computeRowLevelLimit: function (e) {
            function n(e, n) {
                s = Math.max(s, t(n).outerHeight())
            }

            var i, r, s, o = this.rowEls.eq(e), a = o.height(), l = this.rowStructs[e].tbodyEl.children();
            for (i = 0; i < l.length; i++)if (r = l.eq(i).removeClass("fc-limited"), s = 0, r.find("> td > :first-child").each(n), r.position().top + s > a)return i;
            return !1
        }, limitRow: function (e, n) {
            function i(i) {
                for (; i > b;)u = w.getCellSegs(e, b, n), u.length && (h = s[n - 1][b], y = w.renderMoreLink(e, b, u), v = t("<div/>").append(y), h.append(v), D.push(v[0])), b++
            }

            var r, s, o, a, l, u, c, d, h, f, g, m, p, v, y, w = this, S = this.rowStructs[e], D = [], b = 0;
            if (n && n < S.segLevels.length) {
                for (r = S.segLevels[n - 1], s = S.cellMatrix, o = S.tbodyEl.children().slice(n).addClass("fc-limited").get(), a = 0; a < r.length; a++) {
                    for (l = r[a], i(l.leftCol), d = [], c = 0; b <= l.rightCol;)u = this.getCellSegs(e, b, n), d.push(u), c += u.length, b++;
                    if (c) {
                        for (h = s[n - 1][l.leftCol], f = h.attr("rowspan") || 1, g = [], m = 0; m < d.length; m++)p = t('<td class="fc-more-cell"/>').attr("rowspan", f), u = d[m], y = this.renderMoreLink(e, l.leftCol + m, [l].concat(u)), v = t("<div/>").append(y), p.append(v), g.push(p[0]), D.push(p[0]);
                        h.addClass("fc-limited").after(t(g)), o.push(h[0])
                    }
                }
                i(this.colCnt), S.moreEls = t(D), S.limitedEls = t(o)
            }
        }, unlimitRow: function (t) {
            var e = this.rowStructs[t];
            e.moreEls && (e.moreEls.remove(), e.moreEls = null), e.limitedEls && (e.limitedEls.removeClass("fc-limited"), e.limitedEls = null)
        }, renderMoreLink: function (e, n, i) {
            var r = this, s = this.view;
            return t('<a class="fc-more"/>').text(this.getMoreLinkText(i.length)).on("click", function (o) {
                var a = s.opt("eventLimitClick"), l = r.getCellDate(e, n), u = t(this), c = r.getCellEl(e, n), d = r.getCellSegs(e, n), h = r.resliceDaySegs(d, l), f = r.resliceDaySegs(i, l);
                "function" == typeof a && (a = s.trigger("eventLimitClick", null, {
                    date: l,
                    dayEl: c,
                    moreEl: u,
                    segs: h,
                    hiddenSegs: f
                }, o)), "popover" === a ? r.showSegPopover(e, n, u, h) : "string" == typeof a && s.calendar.zoomTo(l, a)
            })
        }, showSegPopover: function (t, e, n, i) {
            var r, s, o = this, a = this.view, l = n.parent();
            r = 1 == this.rowCnt ? a.el : this.rowEls.eq(t), s = {
                className: "fc-more-popover",
                content: this.renderSegPopoverContent(t, e, i),
                parentEl: this.el,
                top: r.offset().top,
                autoHide: !0,
                viewportConstrain: a.opt("popoverViewportConstrain"),
                hide: function () {
                    o.segPopover.removeElement(), o.segPopover = null, o.popoverSegs = null
                }
            }, this.isRTL ? s.right = l.offset().left + l.outerWidth() + 1 : s.left = l.offset().left - 1, this.segPopover = new se(s), this.segPopover.show()
        }, renderSegPopoverContent: function (e, n, i) {
            var r, s = this.view, o = s.opt("theme"), a = this.getCellDate(e, n).format(s.opt("dayPopoverFormat")), l = t('<div class="fc-header ' + s.widgetHeaderClass + '"><span class="fc-close ' + (o ? "ui-icon ui-icon-closethick" : "fc-icon fc-icon-x") + '"></span><span class="fc-title">' + X(a) + '</span><div class="fc-clear"/></div><div class="fc-body ' + s.widgetContentClass + '"><div class="fc-event-container"></div></div>'), u = l.find(".fc-event-container");
            for (i = this.renderFgSegEls(i, !0), this.popoverSegs = i, r = 0; r < i.length; r++)this.prepareHits(), i[r].hit = this.getCellHit(e, n), this.releaseHits(), u.append(i[r].el);
            return l
        }, resliceDaySegs: function (e, n) {
            var i = t.map(e, function (t) {
                return t.event
            }), r = n.clone(), s = r.clone().add(1, "days"), o = {start: r, end: s};
            return e = this.eventsToSegs(i, function (t) {
                var e = x(t, o);
                return e ? [e] : []
            }), this.sortEventSegs(e), e
        }, getMoreLinkText: function (t) {
            var e = this.view.opt("eventLimitText");
            return "function" == typeof e ? e(t) : "+" + t + " " + e
        }, getCellSegs: function (t, e, n) {
            for (var i, r = this.rowStructs[t].segMatrix, s = n || 0, o = []; s < r.length;)i = r[s][e], i && o.push(i), s++;
            return o
        }
    });
    var fe = Wt.TimeGrid = ce.extend(de, {
        slotDuration: null,
        snapDuration: null,
        snapsPerSlot: null,
        minTime: null,
        maxTime: null,
        labelFormat: null,
        labelInterval: null,
        colEls: null,
        slatEls: null,
        helperEl: null,
        colCoordCache: null,
        slatCoordCache: null,
        businessHourSegs: null,
        constructor: function () {
            ce.apply(this, arguments), this.processOptions()
        },
        renderDates: function () {
            this.el.html(this.renderHtml()), this.colEls = this.el.find(".fc-day"), this.slatEls = this.el.find(".fc-slats tr"), this.colCoordCache = new oe({
                els: this.colEls,
                isHorizontal: !0
            }), this.slatCoordCache = new oe({els: this.slatEls, isVertical: !0})
        },
        renderBusinessHours: function () {
            var t = this.view.calendar.getBusinessHoursEvents();
            this.businessHourSegs = this.renderFill("businessHours", this.eventsToSegs(t), "bgevent")
        },
        renderHtml: function () {
            return '<div class="fc-bg"><table>' + this.renderBgTrHtml(0) + '</table></div><div class="fc-slats"><table>' + this.renderSlatRowHtml() + "</table></div>"
        },
        renderSlatRowHtml: function () {
            for (var t, n, i, r = this.view, s = this.isRTL, o = "", a = e.duration(+this.minTime); a < this.maxTime;)t = this.start.clone().time(a), n = et(z(a, this.labelInterval)), i = '<td class="fc-axis fc-time ' + r.widgetContentClass + '" ' + r.axisStyleAttr() + ">" + (n ? "<span>" + X(t.format(this.labelFormat)) + "</span>" : "") + "</td>", o += "<tr " + (n ? "" : 'class="fc-minor"') + ">" + (s ? "" : i) + '<td class="' + r.widgetContentClass + '"/>' + (s ? i : "") + "</tr>", a.add(this.slotDuration);
            return o
        },
        processOptions: function () {
            var n, i = this.view, r = i.opt("slotDuration"), s = i.opt("snapDuration");
            r = e.duration(r), s = s ? e.duration(s) : r, this.slotDuration = r, this.snapDuration = s, this.snapsPerSlot = r / s, this.minResizeDuration = s, this.minTime = e.duration(i.opt("minTime")), this.maxTime = e.duration(i.opt("maxTime")), n = i.opt("slotLabelFormat"), t.isArray(n) && (n = n[n.length - 1]), this.labelFormat = n || i.opt("axisFormat") || i.opt("smallTimeFormat"), n = i.opt("slotLabelInterval"), this.labelInterval = n ? e.duration(n) : this.computeLabelInterval(r)
        },
        computeLabelInterval: function (t) {
            var n, i, r;
            for (n = ke.length - 1; n >= 0; n--)if (i = e.duration(ke[n]), r = z(i, t), et(r) && r > 1)return i;
            return e.duration(t)
        },
        computeEventTimeFormat: function () {
            return this.view.opt("noMeridiemTimeFormat")
        },
        computeDisplayEventEnd: function () {
            return !0
        },
        prepareHits: function () {
            this.colCoordCache.build(), this.slatCoordCache.build()
        },
        releaseHits: function () {
            this.colCoordCache.clear()
        },
        queryHit: function (t, e) {
            var n = this.snapsPerSlot, i = this.colCoordCache, r = this.slatCoordCache, s = i.getHorizontalIndex(t), o = r.getVerticalIndex(e);
            if (null != s && null != o) {
                var a = r.getTopOffset(o), l = r.getHeight(o), u = (e - a) / l, c = Math.floor(u * n), d = o * n + c, h = a + c / n * l, f = a + (c + 1) / n * l;
                return {
                    col: s,
                    snap: d,
                    component: this,
                    left: i.getLeftOffset(s),
                    right: i.getRightOffset(s),
                    top: h,
                    bottom: f
                }
            }
        },
        getHitSpan: function (t) {
            var e, n = this.getCellDate(0, t.col), i = this.computeSnapTime(t.snap);
            return n.time(i), e = n.clone().add(this.snapDuration), {start: n, end: e}
        },
        getHitEl: function (t) {
            return this.colEls.eq(t.col)
        },
        rangeUpdated: function () {
            this.updateDayTable()
        },
        computeSnapTime: function (t) {
            return e.duration(this.minTime + this.snapDuration * t)
        },
        spanToSegs: function (t) {
            var e, n = this.sliceRangeByTimes(t);
            for (e = 0; e < n.length; e++)this.isRTL ? n[e].col = this.daysPerRow - 1 - n[e].dayIndex : n[e].col = n[e].dayIndex;
            return n
        },
        sliceRangeByTimes: function (t) {
            var e, n, i, r, s = [];
            for (n = 0; n < this.daysPerRow; n++)i = this.dayDates[n].clone(), r = {
                start: i.clone().time(this.minTime),
                end: i.clone().time(this.maxTime)
            }, e = x(t, r), e && (e.dayIndex = n, s.push(e));
            return s
        },
        updateSize: function (t) {
            this.slatCoordCache.build(), t && this.updateSegVerticals()
        },
        computeDateTop: function (t, n) {
            return this.computeTimeTop(e.duration(t - n.clone().stripTime()))
        },
        computeTimeTop: function (t) {
            var e, n, i = this.slatEls.length, r = (t - this.minTime) / this.slotDuration;
            return r = Math.max(0, r), r = Math.min(i, r), e = Math.floor(r), e = Math.min(e, i - 1), n = r - e, this.slatCoordCache.getTopPosition(e) + this.slatCoordCache.getHeight(e) * n
        },
        renderDrag: function (t, e) {
            return e ? (this.renderEventLocationHelper(t, e), this.applyDragOpacity(this.helperEl), !0) : void this.renderHighlight(this.eventToSpan(t))
        },
        unrenderDrag: function () {
            this.unrenderHelper(), this.unrenderHighlight()
        },
        renderEventResize: function (t, e) {
            this.renderEventLocationHelper(t, e)
        },
        unrenderEventResize: function () {
            this.unrenderHelper()
        },
        renderHelper: function (e, n) {
            var i, r, s, o, a = this.eventToSegs(e);
            for (a = this.renderFgSegEls(a), i = this.renderSegTable(a), r = 0; r < a.length; r++)s = a[r], n && n.col === s.col && (o = n.el, s.el.css({
                left: o.css("left"),
                right: o.css("right"),
                "margin-left": o.css("margin-left"),
                "margin-right": o.css("margin-right")
            }));
            this.helperEl = t('<div class="fc-helper-skeleton"/>').append(i).appendTo(this.el)
        },
        unrenderHelper: function () {
            this.helperEl && (this.helperEl.remove(), this.helperEl = null)
        },
        renderSelection: function (t) {
            this.view.opt("selectHelper") ? this.renderEventLocationHelper(t) : this.renderHighlight(t)
        },
        unrenderSelection: function () {
            this.unrenderHelper(), this.unrenderHighlight()
        },
        renderFill: function (e, n, i) {
            var r, s, o, a, l, u, c, d, h, f;
            if (n.length) {
                for (n = this.renderFillSegEls(e, n), r = this.groupSegCols(n), i = i || e.toLowerCase(), s = t('<div class="fc-' + i + '-skeleton"><table><tr/></table></div>'), o = s.find("tr"), a = 0; a < r.length; a++)if (l = r[a], u = t("<td/>").appendTo(o), l.length)for (c = t('<div class="fc-' + i + '-container"/>').appendTo(u), d = this.getCellDate(0, a), h = 0; h < l.length; h++)f = l[h], c.append(f.el.css({
                    top: this.computeDateTop(f.start, d),
                    bottom: -this.computeDateTop(f.end, d)
                }));
                this.bookendCells(o), this.el.append(s), this.elsByFill[e] = s
            }
            return n
        }
    });
    fe.mixin({
        eventSkeletonEl: null, renderFgSegs: function (e) {
            return e = this.renderFgSegEls(e), this.el.append(this.eventSkeletonEl = t('<div class="fc-content-skeleton"/>').append(this.renderSegTable(e))), e
        }, unrenderFgSegs: function (t) {
            this.eventSkeletonEl && (this.eventSkeletonEl.remove(), this.eventSkeletonEl = null)
        }, renderSegTable: function (e) {
            var n, i, r, s, o, a, l = t("<table><tr/></table>"), u = l.find("tr");
            for (n = this.groupSegCols(e), this.computeSegVerticals(e), s = 0; s < n.length; s++) {
                for (o = n[s], this.placeSlotSegs(o), a = t('<div class="fc-event-container"/>'), i = 0; i < o.length; i++)r = o[i], r.el.css(this.generateSegPositionCss(r)), r.bottom - r.top < 30 && r.el.addClass("fc-short"), a.append(r.el);
                u.append(t("<td/>").append(a))
            }
            return this.bookendCells(u), l
        }, placeSlotSegs: function (t) {
            var e, n, i;
            if (this.sortEventSegs(t), e = xt(t), Rt(e), n = e[0]) {
                for (i = 0; i < n.length; i++)Yt(n[i]);
                for (i = 0; i < n.length; i++)this.computeSlotSegCoords(n[i], 0, 0)
            }
        }, computeSlotSegCoords: function (t, e, n) {
            var i, r = t.forwardSegs;
            if (void 0 === t.forwardCoord)for (r.length ? (this.sortForwardSlotSegs(r), this.computeSlotSegCoords(r[0], e + 1, n), t.forwardCoord = r[0].backwardCoord) : t.forwardCoord = 1, t.backwardCoord = t.forwardCoord - (t.forwardCoord - n) / (e + 1), i = 0; i < r.length; i++)this.computeSlotSegCoords(r[i], 0, t.forwardCoord)
        }, updateSegVerticals: function () {
            var t, e = (this.segs || []).concat(this.businessHourSegs || []);
            for (this.computeSegVerticals(e), t = 0; t < e.length; t++)e[t].el.css(this.generateSegVerticalCss(e[t]))
        }, computeSegVerticals: function (t) {
            var e, n;
            for (e = 0; e < t.length; e++)n = t[e], n.top = this.computeDateTop(n.start, n.start), n.bottom = this.computeDateTop(n.end, n.start)
        }, fgSegHtml: function (t, e) {
            var n, i, r, s = this.view, o = t.event, a = s.isEventDraggable(o), l = !e && t.isStart && s.isEventResizableFromStart(o), u = !e && t.isEnd && s.isEventResizableFromEnd(o), c = this.getSegClasses(t, a, l || u), d = Q(this.getEventSkinCss(o));
            return c.unshift("fc-time-grid-event", "fc-v-event"), s.isMultiDayEvent(o) ? (t.isStart || t.isEnd) && (n = this.getEventTimeText(t), i = this.getEventTimeText(t, "LT"), r = this.getEventTimeText(t, null, !1)) : (n = this.getEventTimeText(o), i = this.getEventTimeText(o, "LT"), r = this.getEventTimeText(o, null, !1)), '<a class="' + c.join(" ") + '"' + (o.url ? ' href="' + X(o.url) + '"' : "") + (d ? ' style="' + d + '"' : "") + '><div class="fc-content">' + (n ? '<div class="fc-time" data-start="' + X(r) + '" data-full="' + X(i) + '"><span>' + X(n) + "</span></div>" : "") + (o.title ? '<div class="fc-title">' + X(o.title) + "</div>" : "") + '</div><div class="fc-bg"/>' + (u ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        }, generateSegPositionCss: function (t) {
            var e, n, i = this.view.opt("slotEventOverlap"), r = t.backwardCoord, s = t.forwardCoord, o = this.generateSegVerticalCss(t);
            return i && (s = Math.min(1, r + 2 * (s - r))), this.isRTL ? (e = 1 - s, n = r) : (e = r, n = 1 - s), o.zIndex = t.level + 1, o.left = 100 * e + "%", o.right = 100 * n + "%", i && t.forwardPressure && (o[this.isRTL ? "marginLeft" : "marginRight"] = 20), o
        }, generateSegVerticalCss: function (t) {
            return {top: t.top, bottom: -t.bottom}
        }, groupSegCols: function (t) {
            var e, n = [];
            for (e = 0; e < this.colCnt; e++)n.push([]);
            for (e = 0; e < t.length; e++)n[t[e].col].push(t[e]);
            return n
        }, sortForwardSlotSegs: function (t) {
            t.sort(nt(this, "compareForwardSlotSegs"))
        }, compareForwardSlotSegs: function (t, e) {
            return e.forwardPressure - t.forwardPressure || (t.backwardCoord || 0) - (e.backwardCoord || 0) || this.compareEventSegs(t, e)
        }
    });
    var ge = Wt.View = vt.extend({
        type: null,
        name: null,
        title: null,
        calendar: null,
        options: null,
        el: null,
        displaying: null,
        isSkeletonRendered: !1,
        isEventsRendered: !1,
        start: null,
        end: null,
        intervalStart: null,
        intervalEnd: null,
        intervalDuration: null,
        intervalUnit: null,
        isRTL: !1,
        isSelected: !1,
        eventOrderSpecs: null,
        scrollerEl: null,
        scrollTop: null,
        widgetHeaderClass: null,
        widgetContentClass: null,
        highlightStateClass: null,
        nextDayThreshold: null,
        isHiddenDayHash: null,
        documentMousedownProxy: null,
        constructor: function (t, n, i, r) {
            this.calendar = t, this.type = this.name = n, this.options = i, this.intervalDuration = r || e.duration(1, "day"), this.nextDayThreshold = e.duration(this.opt("nextDayThreshold")), this.initThemingProps(), this.initHiddenDays(), this.isRTL = this.opt("isRTL"), this.eventOrderSpecs = C(this.opt("eventOrder")), this.documentMousedownProxy = nt(this, "documentMousedown"), this.initialize()
        },
        initialize: function () {
        },
        opt: function (t) {
            return this.options[t]
        },
        trigger: function (t, e) {
            var n = this.calendar;
            return n.trigger.apply(n, [t, e || this].concat(Array.prototype.slice.call(arguments, 2), [this]))
        },
        setDate: function (t) {
            this.setRange(this.computeRange(t))
        },
        setRange: function (e) {
            t.extend(this, e), this.updateTitle()
        },
        computeRange: function (t) {
            var e, n, i = F(this.intervalDuration), r = t.clone().startOf(i), s = r.clone().add(this.intervalDuration);
            return /year|month|week|day/.test(i) ? (r.stripTime(), s.stripTime()) : (r.hasTime() || (r = this.calendar.time(0)), s.hasTime() || (s = this.calendar.time(0))), e = r.clone(), e = this.skipHiddenDays(e), n = s.clone(), n = this.skipHiddenDays(n, -1, !0), {
                intervalUnit: i,
                intervalStart: r,
                intervalEnd: s,
                start: e,
                end: n
            }
        },
        computePrevDate: function (t) {
            return this.massageCurrentDate(t.clone().startOf(this.intervalUnit).subtract(this.intervalDuration), -1)
        },
        computeNextDate: function (t) {
            return this.massageCurrentDate(t.clone().startOf(this.intervalUnit).add(this.intervalDuration))
        },
        massageCurrentDate: function (t, e) {
            return this.intervalDuration.as("days") <= 1 && this.isHiddenDay(t) && (t = this.skipHiddenDays(t, e), t.startOf("day")), t
        },
        updateTitle: function () {
            this.title = this.computeTitle()
        },
        computeTitle: function () {
            return this.formatRange({
                start: this.calendar.applyTimezone(this.intervalStart),
                end: this.calendar.applyTimezone(this.intervalEnd)
            }, this.opt("titleFormat") || this.computeTitleFormat(), this.opt("titleRangeSeparator"))
        },
        computeTitleFormat: function () {
            return "year" == this.intervalUnit ? "YYYY" : "month" == this.intervalUnit ? this.opt("monthYearFormat") : this.intervalDuration.as("days") > 1 ? "ll" : "LL"
        },
        formatRange: function (t, e, n) {
            var i = t.end;
            return i.hasTime() || (i = i.clone().subtract(1)), ht(t.start, i, e, n, this.opt("isRTL"))
        },
        setElement: function (t) {
            this.el = t, this.bindGlobalHandlers()
        },
        removeElement: function () {
            this.clear(), this.isSkeletonRendered && (this.unrenderSkeleton(), this.isSkeletonRendered = !1), this.unbindGlobalHandlers(), this.el.remove()
        },
        display: function (e) {
            var n = this, i = null;
            return this.displaying && (i = this.queryScroll()), this.calendar.freezeContentHeight(), this.clear().then(function () {
                return n.displaying = t.when(n.displayView(e)).then(function () {
                    n.forceScroll(n.computeInitialScroll(i)), n.calendar.unfreezeContentHeight(), n.triggerRender()
                })
            })
        },
        clear: function () {
            var e = this, n = this.displaying;
            return n ? n.then(function () {
                return e.displaying = null, e.clearEvents(), e.clearView()
            }) : t.when()
        },
        redisplay: function () {
            if (this.isSkeletonRendered) {
                var t = this.isEventsRendered;
                this.clearEvents(), this.clearView(), this.displayView(), t && this.displayEvents()
            }
        },
        displayView: function (t) {
            this.isSkeletonRendered || (this.renderSkeleton(), this.isSkeletonRendered = !0), t && this.setDate(t), this.render && this.render(), this.renderDates(), this.updateSize(), this.renderBusinessHours()
        },
        clearView: function () {
            this.unselect(), this.triggerUnrender(), this.unrenderBusinessHours(), this.unrenderDates(), this.destroy && this.destroy()
        },
        renderSkeleton: function () {
        },
        unrenderSkeleton: function () {
        },
        renderDates: function () {
        },
        unrenderDates: function () {
        },
        renderBusinessHours: function () {
        },
        unrenderBusinessHours: function () {
        },
        triggerRender: function () {
            this.trigger("viewRender", this, this, this.el)
        },
        triggerUnrender: function () {
            this.trigger("viewDestroy", this, this, this.el)
        },
        bindGlobalHandlers: function () {
            t(document).on("mousedown", this.documentMousedownProxy)
        },
        unbindGlobalHandlers: function () {
            t(document).off("mousedown", this.documentMousedownProxy)
        },
        initThemingProps: function () {
            var t = this.opt("theme") ? "ui" : "fc";
            this.widgetHeaderClass = t + "-widget-header", this.widgetContentClass = t + "-widget-content", this.highlightStateClass = t + "-state-highlight"
        },
        updateSize: function (t) {
            var e;
            t && (e = this.queryScroll()), this.updateHeight(t), this.updateWidth(t), t && this.setScroll(e)
        },
        updateWidth: function (t) {
        },
        updateHeight: function (t) {
            var e = this.calendar;
            this.setHeight(e.getSuggestedViewHeight(), e.isHeightAuto())
        },
        setHeight: function (t, e) {
        },
        computeScrollerHeight: function (t) {
            var e, n, i = this.scrollerEl;
            return e = this.el.add(i), e.css({
                position: "relative",
                left: -1
            }), n = this.el.outerHeight() - i.height(), e.css({position: "", left: ""}), t - n
        },
        computeInitialScroll: function (t) {
            return 0
        },
        queryScroll: function () {
            return this.scrollerEl ? this.scrollerEl.scrollTop() : void 0
        },
        setScroll: function (t) {
            return this.scrollerEl ? this.scrollerEl.scrollTop(t) : void 0
        },
        forceScroll: function (t) {
            var e = this;
            this.setScroll(t), setTimeout(function () {
                e.setScroll(t)
            }, 0)
        },
        displayEvents: function (t) {
            var e = this.queryScroll();
            this.clearEvents(), this.renderEvents(t), this.isEventsRendered = !0, this.setScroll(e), this.triggerEventRender()
        },
        clearEvents: function () {
            this.isEventsRendered && (this.triggerEventUnrender(), this.destroyEvents && this.destroyEvents(), this.unrenderEvents(), this.isEventsRendered = !1)
        },
        renderEvents: function (t) {
        },
        unrenderEvents: function () {
        },
        triggerEventRender: function () {
            this.renderedEventSegEach(function (t) {
                this.trigger("eventAfterRender", t.event, t.event, t.el)
            }), this.trigger("eventAfterAllRender")
        },
        triggerEventUnrender: function () {
            this.renderedEventSegEach(function (t) {
                this.trigger("eventDestroy", t.event, t.event, t.el)
            })
        },
        resolveEventEl: function (e, n) {
            var i = this.trigger("eventRender", e, e, n);
            return i === !1 ? n = null : i && i !== !0 && (n = t(i)), n
        },
        showEvent: function (t) {
            this.renderedEventSegEach(function (t) {
                t.el.css("visibility", "")
            }, t)
        },
        hideEvent: function (t) {
            this.renderedEventSegEach(function (t) {
                t.el.css("visibility", "hidden")
            }, t)
        },
        renderedEventSegEach: function (t, e) {
            var n, i = this.getEventSegs();
            for (n = 0; n < i.length; n++)e && i[n].event._id !== e._id || i[n].el && t.call(this, i[n])
        },
        getEventSegs: function () {
            return []
        },
        isEventDraggable: function (t) {
            var e = t.source || {};
            return $(t.startEditable, e.startEditable, this.opt("eventStartEditable"), t.editable, e.editable, this.opt("editable"))
        },
        reportEventDrop: function (t, e, n, i, r) {
            var s = this.calendar, o = s.mutateEvent(t, e, n), a = function () {
                o.undo(), s.reportEventChange()
            };
            this.triggerEventDrop(t, o.dateDelta, a, i, r), s.reportEventChange()
        },
        triggerEventDrop: function (t, e, n, i, r) {
            this.trigger("eventDrop", i[0], t, e, n, r, {})
        },
        reportExternalDrop: function (e, n, i, r, s) {
            var o, a, l = e.eventProps;
            l && (o = t.extend({}, l, n), a = this.calendar.renderEvent(o, e.stick)[0]), this.triggerExternalDrop(a, n, i, r, s)
        },
        triggerExternalDrop: function (t, e, n, i, r) {
            this.trigger("drop", n[0], e.start, i, r), t && this.trigger("eventReceive", null, t)
        },
        renderDrag: function (t, e) {
        },
        unrenderDrag: function () {
        },
        isEventResizableFromStart: function (t) {
            return this.opt("eventResizableFromStart") && this.isEventResizable(t)
        },
        isEventResizableFromEnd: function (t) {
            return this.isEventResizable(t)
        },
        isEventResizable: function (t) {
            var e = t.source || {};
            return $(t.durationEditable, e.durationEditable, this.opt("eventDurationEditable"), t.editable, e.editable, this.opt("editable"))
        },
        reportEventResize: function (t, e, n, i, r) {
            var s = this.calendar, o = s.mutateEvent(t, e, n), a = function () {
                o.undo(), s.reportEventChange()
            };
            this.triggerEventResize(t, o.durationDelta, a, i, r), s.reportEventChange()
        },
        triggerEventResize: function (t, e, n, i, r) {
            this.trigger("eventResize", i[0], t, e, n, r, {})
        },
        select: function (t, e) {
            this.unselect(e), this.renderSelection(t), this.reportSelection(t, e)
        },
        renderSelection: function (t) {
        },
        reportSelection: function (t, e) {
            this.isSelected = !0, this.triggerSelect(t, e)
        },
        triggerSelect: function (t, e) {
            this.trigger("select", null, this.calendar.applyTimezone(t.start), this.calendar.applyTimezone(t.end), e)
        },
        unselect: function (t) {
            this.isSelected && (this.isSelected = !1, this.destroySelection && this.destroySelection(), this.unrenderSelection(), this.trigger("unselect", null, t))
        },
        unrenderSelection: function () {
        },
        documentMousedown: function (e) {
            var n;
            this.isSelected && this.opt("unselectAuto") && D(e) && (n = this.opt("unselectCancel"), n && t(e.target).closest(n).length || this.unselect(e))
        },
        triggerDayClick: function (t, e, n) {
            this.trigger("dayClick", e, this.calendar.applyTimezone(t.start), n)
        },
        initHiddenDays: function () {
            var e, n = this.opt("hiddenDays") || [], i = [], r = 0;
            for (this.opt("weekends") === !1 && n.push(0, 6), e = 0; 7 > e; e++)(i[e] = -1 !== t.inArray(e, n)) || r++;
            if (!r)throw"invalid hiddenDays";
            this.isHiddenDayHash = i
        },
        isHiddenDay: function (t) {
            return e.isMoment(t) && (t = t.day()), this.isHiddenDayHash[t]
        },
        skipHiddenDays: function (t, e, n) {
            var i = t.clone();
            for (e = e || 1; this.isHiddenDayHash[(i.day() + (n ? e : 0) + 7) % 7];)i.add(e, "days");
            return i
        },
        computeDayRange: function (t) {
            var e, n = t.start.clone().stripTime(), i = t.end, r = null;
            return i && (r = i.clone().stripTime(), e = +i.time(), e && e >= this.nextDayThreshold && r.add(1, "days")), (!i || n >= r) && (r = n.clone().add(1, "days")), {
                start: n,
                end: r
            }
        },
        isMultiDayEvent: function (t) {
            var e = this.computeDayRange(t);
            return e.end.diff(e.start, "days") > 1
        }
    }), me = Wt.Calendar = vt.extend({
        dirDefaults: null,
        langDefaults: null,
        overrides: null,
        options: null,
        viewSpecCache: null,
        view: null,
        header: null,
        loadingLevel: 0,
        constructor: Gt,
        initialize: function () {
        },
        initOptions: function (t) {
            var e, r, s, o;
            t = i(t), e = t.lang, r = pe[e], r || (e = me.defaults.lang, r = pe[e] || {}), s = $(t.isRTL, r.isRTL, me.defaults.isRTL), o = s ? me.rtlDefaults : {}, this.dirDefaults = o, this.langDefaults = r, this.overrides = t, this.options = n([me.defaults, o, r, t]), Lt(this.options), this.viewSpecCache = {}
        },
        getViewSpec: function (t) {
            var e = this.viewSpecCache;
            return e[t] || (e[t] = this.buildViewSpec(t))
        },
        getUnitViewSpec: function (e) {
            var n, i, r;
            if (-1 != t.inArray(e, Zt))for (n = this.header.getViewsWithButtons(), t.each(Wt.views, function (t) {
                n.push(t)
            }), i = 0; i < n.length; i++)if (r = this.getViewSpec(n[i]), r && r.singleUnit == e)return r
        },
        buildViewSpec: function (t) {
            for (var i, r, s, o, a = this.overrides.views || {}, l = [], u = [], c = [], d = t; d;)i = Vt[d], r = a[d], d = null, "function" == typeof i && (i = {"class": i}), i && (l.unshift(i), u.unshift(i.defaults || {}), s = s || i.duration, d = d || i.type), r && (c.unshift(r), s = s || r.duration, d = d || r.type);
            return i = V(l), i.type = t, i["class"] ? (s && (s = e.duration(s), s.valueOf() && (i.duration = s, o = F(s), 1 === s.as(o) && (i.singleUnit = o, c.unshift(a[o] || {})))), i.defaults = n(u), i.overrides = n(c), this.buildViewSpecOptions(i), this.buildViewSpecButtonText(i, t), i) : !1
        },
        buildViewSpecOptions: function (t) {
            t.options = n([me.defaults, t.defaults, this.dirDefaults, this.langDefaults, this.overrides, t.overrides]), Lt(t.options)
        },
        buildViewSpecButtonText: function (t, e) {
            function n(n) {
                var i = n.buttonText || {};
                return i[e] || (t.singleUnit ? i[t.singleUnit] : null)
            }

            t.buttonTextOverride = n(this.overrides) || t.overrides.buttonText, t.buttonTextDefault = n(this.langDefaults) || n(this.dirDefaults) || t.defaults.buttonText || n(me.defaults) || (t.duration ? this.humanizeDuration(t.duration) : null) || e
        },
        instantiateView: function (t) {
            var e = this.getViewSpec(t);
            return new e["class"](this, t, e.options, e.duration)
        },
        isValidViewType: function (t) {
            return Boolean(this.getViewSpec(t))
        },
        pushLoading: function () {
            this.loadingLevel++ || this.trigger("loading", null, !0, this.view)
        },
        popLoading: function () {
            --this.loadingLevel || this.trigger("loading", null, !1, this.view)
        },
        buildSelectSpan: function (t, e) {
            var n, i = this.moment(t).stripZone();
            return n = e ? this.moment(e).stripZone() : i.hasTime() ? i.clone().add(this.defaultTimedEventDuration) : i.clone().add(this.defaultAllDayEventDuration), {
                start: i,
                end: n
            }
        }
    });
    me.mixin(re), me.defaults = {
        titleRangeSeparator: " — ",
        monthYearFormat: "MMMM YYYY",
        defaultTimedEventDuration: "02:00:00",
        defaultAllDayEventDuration: {days: 1},
        forceEventDuration: !1,
        nextDayThreshold: "09:00:00",
        defaultView: "month",
        aspectRatio: 1.35,
        header: {left: "title", center: "", right: "today prev,next"},
        weekends: !0,
        weekNumbers: !1,
        weekNumberTitle: "W",
        weekNumberCalculation: "local",
        scrollTime: "06:00:00",
        lazyFetching: !0,
        startParam: "start",
        endParam: "end",
        timezoneParam: "timezone",
        timezone: !1,
        isRTL: !1,
        buttonText: {
            prev: "prev",
            next: "next",
            prevYear: "prev year",
            nextYear: "next year",
            year: "year",
            today: "today",
            month: "month",
            week: "week",
            day: "day"
        },
        buttonIcons: {
            prev: "left-single-arrow",
            next: "right-single-arrow",
            prevYear: "left-double-arrow",
            nextYear: "right-double-arrow"
        },
        theme: !1,
        themeButtonIcons: {
            prev: "circle-triangle-w",
            next: "circle-triangle-e",
            prevYear: "seek-prev",
            nextYear: "seek-next"
        },
        dragOpacity: .75,
        dragRevertDuration: 500,
        dragScroll: !0,
        unselectAuto: !0,
        dropAccept: "*",
        eventOrder: "title",
        eventLimit: !1,
        eventLimitText: "more",
        eventLimitClick: "popover",
        dayPopoverFormat: "LL",
        handleWindowResize: !0,
        windowResizeDelay: 200
    }, me.englishDefaults = {dayPopoverFormat: "dddd, MMMM D"}, me.rtlDefaults = {
        header: {
            left: "next,prev today",
            center: "",
            right: "title"
        },
        buttonIcons: {
            prev: "right-single-arrow",
            next: "left-single-arrow",
            prevYear: "right-double-arrow",
            nextYear: "left-double-arrow"
        },
        themeButtonIcons: {
            prev: "circle-triangle-e",
            next: "circle-triangle-w",
            nextYear: "seek-prev",
            prevYear: "seek-next"
        }
    };
    var pe = Wt.langs = {};
    Wt.datepickerLang = function (e, n, i) {
        var r = pe[e] || (pe[e] = {});
        r.isRTL = i.isRTL, r.weekNumberTitle = i.weekHeader, t.each(ve, function (t, e) {
            r[t] = e(i)
        }), t.datepicker && (t.datepicker.regional[n] = t.datepicker.regional[e] = i, t.datepicker.regional.en = t.datepicker.regional[""], t.datepicker.setDefaults(i))
    }, Wt.lang = function (e, i) {
        var r, s;
        r = pe[e] || (pe[e] = {}), i && (r = pe[e] = n([r, i])), s = zt(e), t.each(ye, function (t, e) {
            null == r[t] && (r[t] = e(s, r))
        }), me.defaults.lang = e
    };
    var ve = {
        buttonText: function (t) {
            return {prev: J(t.prevText), next: J(t.nextText), today: J(t.currentText)}
        }, monthYearFormat: function (t) {
            return t.showMonthAfterYear ? "YYYY[" + t.yearSuffix + "] MMMM" : "MMMM YYYY[" + t.yearSuffix + "]"
        }
    }, ye = {
        dayOfMonthFormat: function (t, e) {
            var n = t.longDateFormat("l");
            return n = n.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ""), e.isRTL ? n += " ddd" : n = "ddd " + n, n
        }, mediumTimeFormat: function (t) {
            return t.longDateFormat("LT").replace(/\s*a$/i, "a")
        }, smallTimeFormat: function (t) {
            return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "a")
        }, extraSmallTimeFormat: function (t) {
            return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "t")
        }, hourFormat: function (t) {
            return t.longDateFormat("LT").replace(":mm", "").replace(/(\Wmm)$/, "").replace(/\s*a$/i, "a")
        }, noMeridiemTimeFormat: function (t) {
            return t.longDateFormat("LT").replace(/\s*a$/i, "")
        }
    }, we = {
        smallDayDateFormat: function (t) {
            return t.isRTL ? "D dd" : "dd D"
        }, weekFormat: function (t) {
            return t.isRTL ? "w[ " + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + " ]w"
        }, smallWeekFormat: function (t) {
            return t.isRTL ? "w[" + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + "]w"
        }
    };
    Wt.lang("en", me.englishDefaults), Wt.sourceNormalizers = [], Wt.sourceFetchers = [];
    var Se = {dataType: "json", cache: !1}, De = 1;
    me.prototype.getPeerEvents = function (t, e) {
        var n, i, r = this.getEventCache(), s = [];
        for (n = 0; n < r.length; n++)i = r[n], e && e._id === i._id || s.push(i);
        return s
    };
    var be = Wt.BasicView = ge.extend({
        dayGridClass: he,
        dayGrid: null,
        dayNumbersVisible: !1,
        weekNumbersVisible: !1,
        weekNumberWidth: null,
        headContainerEl: null,
        headRowEl: null,
        initialize: function () {
            this.dayGrid = this.instantiateDayGrid()
        },
        instantiateDayGrid: function () {
            var t = this.dayGridClass.extend(_e);
            return new t(this)
        },
        setRange: function (t) {
            ge.prototype.setRange.call(this, t), this.dayGrid.breakOnWeeks = /year|month|week/.test(this.intervalUnit), this.dayGrid.setRange(t)
        },
        computeRange: function (t) {
            var e = ge.prototype.computeRange.call(this, t);
            return /year|month/.test(e.intervalUnit) && (e.start.startOf("week"), e.start = this.skipHiddenDays(e.start), e.end.weekday() && (e.end.add(1, "week").startOf("week"), e.end = this.skipHiddenDays(e.end, -1, !0))), e
        },
        renderDates: function () {
            this.dayNumbersVisible = this.dayGrid.rowCnt > 1, this.weekNumbersVisible = this.opt("weekNumbers"), this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible, this.el.addClass("fc-basic-view").html(this.renderSkeletonHtml()), this.renderHead(), this.scrollerEl = this.el.find(".fc-day-grid-container"), this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(this.hasRigidRows())
        },
        renderHead: function () {
            this.headContainerEl = this.el.find(".fc-head-container").html(this.dayGrid.renderHeadHtml()), this.headRowEl = this.headContainerEl.find(".fc-row")
        },
        unrenderDates: function () {
            this.dayGrid.unrenderDates(), this.dayGrid.removeElement()
        },
        renderBusinessHours: function () {
            this.dayGrid.renderBusinessHours()
        },
        renderSkeletonHtml: function () {
            return '<table><thead class="fc-head"><tr><td class="fc-head-container ' + this.widgetHeaderClass + '"></td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '"><div class="fc-day-grid-container"><div class="fc-day-grid"/></div></td></tr></tbody></table>'
        },
        weekNumberStyleAttr: function () {
            return null !== this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
        },
        hasRigidRows: function () {
            var t = this.opt("eventLimit");
            return t && "number" != typeof t
        },
        updateWidth: function () {
            this.weekNumbersVisible && (this.weekNumberWidth = c(this.el.find(".fc-week-number")))
        },
        setHeight: function (t, e) {
            var n, i = this.opt("eventLimit");
            h(this.scrollerEl), s(this.headRowEl), this.dayGrid.removeSegPopover(), i && "number" == typeof i && this.dayGrid.limitRows(i), n = this.computeScrollerHeight(t), this.setGridHeight(n, e), i && "number" != typeof i && this.dayGrid.limitRows(i), !e && d(this.scrollerEl, n) && (r(this.headRowEl, v(this.scrollerEl)), n = this.computeScrollerHeight(t), this.scrollerEl.height(n))
        },
        setGridHeight: function (t, e) {
            e ? u(this.dayGrid.rowEls) : l(this.dayGrid.rowEls, t, !0)
        },
        prepareHits: function () {
            this.dayGrid.prepareHits()
        },
        releaseHits: function () {
            this.dayGrid.releaseHits()
        },
        queryHit: function (t, e) {
            return this.dayGrid.queryHit(t, e)
        },
        getHitSpan: function (t) {
            return this.dayGrid.getHitSpan(t)
        },
        getHitEl: function (t) {
            return this.dayGrid.getHitEl(t)
        },
        renderEvents: function (t) {
            this.dayGrid.renderEvents(t), this.updateHeight()
        },
        getEventSegs: function () {
            return this.dayGrid.getEventSegs()
        },
        unrenderEvents: function () {
            this.dayGrid.unrenderEvents()
        },
        renderDrag: function (t, e) {
            return this.dayGrid.renderDrag(t, e)
        },
        unrenderDrag: function () {
            this.dayGrid.unrenderDrag()
        },
        renderSelection: function (t) {
            this.dayGrid.renderSelection(t)
        },
        unrenderSelection: function () {
            this.dayGrid.unrenderSelection()
        }
    }), _e = {
        renderHeadIntroHtml: function () {
            var t = this.view;
            return t.weekNumbersVisible ? '<th class="fc-week-number ' + t.widgetHeaderClass + '" ' + t.weekNumberStyleAttr() + "><span>" + X(t.opt("weekNumberTitle")) + "</span></th>" : ""
        }, renderNumberIntroHtml: function (t) {
            var e = this.view;
            return e.weekNumbersVisible ? '<td class="fc-week-number" ' + e.weekNumberStyleAttr() + "><span>" + this.getCellDate(t, 0).format("w") + "</span></td>" : ""
        }, renderBgIntroHtml: function () {
            var t = this.view;
            return t.weekNumbersVisible ? '<td class="fc-week-number ' + t.widgetContentClass + '" ' + t.weekNumberStyleAttr() + "></td>" : ""
        }, renderIntroHtml: function () {
            var t = this.view;
            return t.weekNumbersVisible ? '<td class="fc-week-number" ' + t.weekNumberStyleAttr() + "></td>" : ""
        }
    }, Ee = Wt.MonthView = be.extend({
        computeRange: function (t) {
            var e, n = be.prototype.computeRange.call(this, t);
            return this.isFixedWeeks() && (e = Math.ceil(n.end.diff(n.start, "weeks", !0)), n.end.add(6 - e, "weeks")), n
        }, setGridHeight: function (t, e) {
            e = e || "variable" === this.opt("weekMode"), e && (t *= this.rowCnt / 6), l(this.dayGrid.rowEls, t, !e)
        }, isFixedWeeks: function () {
            var t = this.opt("weekMode");
            return t ? "fixed" === t : this.opt("fixedWeekCount")
        }
    });
    Vt.basic = {"class": be}, Vt.basicDay = {type: "basic", duration: {days: 1}}, Vt.basicWeek = {
        type: "basic",
        duration: {weeks: 1}
    }, Vt.month = {"class": Ee, duration: {months: 1}, defaults: {fixedWeekCount: !0}};
    var Te = Wt.AgendaView = ge.extend({
        timeGridClass: fe,
        timeGrid: null,
        dayGridClass: he,
        dayGrid: null,
        axisWidth: null,
        headContainerEl: null,
        noScrollRowEls: null,
        bottomRuleEl: null,
        bottomRuleHeight: null,
        initialize: function () {
            this.timeGrid = this.instantiateTimeGrid(), this.opt("allDaySlot") && (this.dayGrid = this.instantiateDayGrid())
        },
        instantiateTimeGrid: function () {
            var t = this.timeGridClass.extend(Ce);
            return new t(this)
        },
        instantiateDayGrid: function () {
            var t = this.dayGridClass.extend(He);
            return new t(this)
        },
        setRange: function (t) {
            ge.prototype.setRange.call(this, t), this.timeGrid.setRange(t), this.dayGrid && this.dayGrid.setRange(t)
        },
        renderDates: function () {
            this.el.addClass("fc-agenda-view").html(this.renderSkeletonHtml()), this.renderHead(), this.scrollerEl = this.el.find(".fc-time-grid-container"), this.timeGrid.setElement(this.el.find(".fc-time-grid")), this.timeGrid.renderDates(), this.bottomRuleEl = t('<hr class="fc-divider ' + this.widgetHeaderClass + '"/>').appendTo(this.timeGrid.el), this.dayGrid && (this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(), this.dayGrid.bottomCoordPadding = this.dayGrid.el.next("hr").outerHeight()), this.noScrollRowEls = this.el.find(".fc-row:not(.fc-scroller *)")
        },
        renderHead: function () {
            this.headContainerEl = this.el.find(".fc-head-container").html(this.timeGrid.renderHeadHtml())
        },
        unrenderDates: function () {
            this.timeGrid.unrenderDates(), this.timeGrid.removeElement(), this.dayGrid && (this.dayGrid.unrenderDates(), this.dayGrid.removeElement())
        },
        renderBusinessHours: function () {
            this.timeGrid.renderBusinessHours(), this.dayGrid && this.dayGrid.renderBusinessHours()
        },
        renderSkeletonHtml: function () {
            return '<table><thead class="fc-head"><tr><td class="fc-head-container ' + this.widgetHeaderClass + '"></td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '">' + (this.dayGrid ? '<div class="fc-day-grid"/><hr class="fc-divider ' + this.widgetHeaderClass + '"/>' : "") + '<div class="fc-time-grid-container"><div class="fc-time-grid"/></div></td></tr></tbody></table>'
        },
        axisStyleAttr: function () {
            return null !== this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : ""
        },
        updateSize: function (t) {
            this.timeGrid.updateSize(t), ge.prototype.updateSize.call(this, t)
        },
        updateWidth: function () {
            this.axisWidth = c(this.el.find(".fc-axis"))
        },
        setHeight: function (t, e) {
            var n, i;
            null === this.bottomRuleHeight && (this.bottomRuleHeight = this.bottomRuleEl.outerHeight()), this.bottomRuleEl.hide(), this.scrollerEl.css("overflow", ""), h(this.scrollerEl), s(this.noScrollRowEls), this.dayGrid && (this.dayGrid.removeSegPopover(), n = this.opt("eventLimit"), n && "number" != typeof n && (n = Me), n && this.dayGrid.limitRows(n)), e || (i = this.computeScrollerHeight(t), d(this.scrollerEl, i) ? (r(this.noScrollRowEls, v(this.scrollerEl)), i = this.computeScrollerHeight(t), this.scrollerEl.height(i)) : (this.scrollerEl.height(i).css("overflow", "hidden"), this.bottomRuleEl.show()))
        },
        computeInitialScroll: function () {
            var t = e.duration(this.opt("scrollTime")), n = this.timeGrid.computeTimeTop(t);
            return n = Math.ceil(n), n && n++, n
        },
        prepareHits: function () {
            this.timeGrid.prepareHits(), this.dayGrid && this.dayGrid.prepareHits()
        },
        releaseHits: function () {
            this.timeGrid.releaseHits(), this.dayGrid && this.dayGrid.releaseHits()
        },
        queryHit: function (t, e) {
            var n = this.timeGrid.queryHit(t, e);
            return !n && this.dayGrid && (n = this.dayGrid.queryHit(t, e)), n
        },
        getHitSpan: function (t) {
            return t.component.getHitSpan(t)
        },
        getHitEl: function (t) {
            return t.component.getHitEl(t)
        },
        renderEvents: function (t) {
            var e, n, i = [], r = [], s = [];
            for (n = 0; n < t.length; n++)t[n].allDay ? i.push(t[n]) : r.push(t[n]);
            e = this.timeGrid.renderEvents(r), this.dayGrid && (s = this.dayGrid.renderEvents(i)), this.updateHeight()
        },
        getEventSegs: function () {
            return this.timeGrid.getEventSegs().concat(this.dayGrid ? this.dayGrid.getEventSegs() : [])
        },
        unrenderEvents: function () {
            this.timeGrid.unrenderEvents(), this.dayGrid && this.dayGrid.unrenderEvents()
        },
        renderDrag: function (t, e) {
            return t.start.hasTime() ? this.timeGrid.renderDrag(t, e) : this.dayGrid ? this.dayGrid.renderDrag(t, e) : void 0
        },
        unrenderDrag: function () {
            this.timeGrid.unrenderDrag(), this.dayGrid && this.dayGrid.unrenderDrag()
        },
        renderSelection: function (t) {
            t.start.hasTime() || t.end.hasTime() ? this.timeGrid.renderSelection(t) : this.dayGrid && this.dayGrid.renderSelection(t)
        },
        unrenderSelection: function () {
            this.timeGrid.unrenderSelection(), this.dayGrid && this.dayGrid.unrenderSelection()
        }
    }), Ce = {
        renderHeadIntroHtml: function () {
            var t, e = this.view;
            return e.opt("weekNumbers") ? (t = this.start.format(e.opt("smallWeekFormat")), '<th class="fc-axis fc-week-number ' + e.widgetHeaderClass + '" ' + e.axisStyleAttr() + "><span>" + X(t) + "</span></th>") : '<th class="fc-axis ' + e.widgetHeaderClass + '" ' + e.axisStyleAttr() + "></th>"
        }, renderBgIntroHtml: function () {
            var t = this.view;
            return '<td class="fc-axis ' + t.widgetContentClass + '" ' + t.axisStyleAttr() + "></td>"
        }, renderIntroHtml: function () {
            var t = this.view;
            return '<td class="fc-axis" ' + t.axisStyleAttr() + "></td>"
        }
    }, He = {
        renderBgIntroHtml: function () {
            var t = this.view;
            return '<td class="fc-axis ' + t.widgetContentClass + '" ' + t.axisStyleAttr() + "><span>" + (t.opt("allDayHtml") || X(t.opt("allDayText"))) + "</span></td>"
        }, renderIntroHtml: function () {
            var t = this.view;
            return '<td class="fc-axis" ' + t.axisStyleAttr() + "></td>"
        }
    }, Me = 5, ke = [{hours: 1}, {minutes: 30}, {minutes: 15}, {seconds: 30}, {seconds: 15}];
    return Vt.agenda = {
        "class": Te,
        defaults: {
            allDaySlot: !0,
            allDayText: "all-day",
            slotDuration: "00:30:00",
            minTime: "00:00:00",
            maxTime: "24:00:00",
            slotEventOverlap: !0
        }
    }, Vt.agendaDay = {type: "agenda", duration: {days: 1}}, Vt.agendaWeek = {type: "agenda", duration: {weeks: 1}}, Wt
});