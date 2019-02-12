/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.0-1 (2019-02-04)
 */
! function() {
    "use strict";
    var Q = function() {
            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n]
        },
        g = function(e, o) {
            return function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e(o.apply(null, t))
            }
        },
        Z = function(t) {
            return function() {
                return t
            }
        },
        d = function(t) {
            return t
        };

    function v(o) {
        for (var r = [], t = 1; t < arguments.length; t++) r[t - 1] = arguments[t];
        return function() {
            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
            var e = r.concat(t);
            return o.apply(null, e)
        }
    }
    var t, n, e, o, r, s, i, m = function(e) {
            return function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return !e.apply(null, t)
            }
        },
        u = function(t) {
            return function() {
                throw new Error(t)
            }
        },
        a = Z(!1),
        c = Z(!0),
        l = a,
        f = c,
        h = function() {
            return p
        },
        p = (o = {
            fold: function(t, n) {
                return t()
            },
            is: l,
            isSome: l,
            isNone: f,
            getOr: e = function(t) {
                return t
            },
            getOrThunk: n = function(t) {
                return t()
            },
            getOrDie: function(t) {
                throw new Error(t || "error: getOrDie called on none.")
            },
            getOrNull: function() {
                return null
            },
            getOrUndefined: function() {
                return undefined
            },
            or: e,
            orThunk: n,
            map: h,
            ap: h,
            each: function() {},
            bind: h,
            flatten: h,
            exists: l,
            forall: f,
            filter: h,
            equals: t = function(t) {
                return t.isNone()
            },
            equals_: t,
            toArray: function() {
                return []
            },
            toString: Z("none()")
        }, Object.freeze && Object.freeze(o), o),
        b = function(e) {
            var t = function() {
                    return e
                },
                n = function() {
                    return r
                },
                o = function(t) {
                    return t(e)
                },
                r = {
                    fold: function(t, n) {
                        return n(e)
                    },
                    is: function(t) {
                        return e === t
                    },
                    isSome: f,
                    isNone: l,
                    getOr: t,
                    getOrThunk: t,
                    getOrDie: t,
                    getOrNull: t,
                    getOrUndefined: t,
                    or: n,
                    orThunk: n,
                    map: function(t) {
                        return b(t(e))
                    },
                    ap: function(t) {
                        return t.fold(h, function(t) {
                            return b(t(e))
                        })
                    },
                    each: function(t) {
                        t(e)
                    },
                    bind: o,
                    flatten: t,
                    exists: o,
                    forall: o,
                    filter: function(t) {
                        return t(e) ? r : p
                    },
                    equals: function(t) {
                        return t.is(e)
                    },
                    equals_: function(t, n) {
                        return t.fold(l, function(t) {
                            return n(e, t)
                        })
                    },
                    toArray: function() {
                        return [e]
                    },
                    toString: function() {
                        return "some(" + e + ")"
                    }
                };
            return r
        },
        tt = {
            some: b,
            none: h,
            from: function(t) {
                return null === t || t === undefined ? p : b(t)
            }
        },
        y = function(n) {
            return function(t) {
                return function(t) {
                    if (null === t) return "null";
                    var n = typeof t;
                    return "object" === n && Array.prototype.isPrototypeOf(t) ? "array" : "object" === n && String.prototype.isPrototypeOf(t) ? "string" : n
                }(t) === n
            }
        },
        x = y("string"),
        w = y("object"),
        O = y("array"),
        z = y("boolean"),
        S = y("function"),
        k = y("number"),
        C = (r = Array.prototype.indexOf) === undefined ? function(t, n) {
            return I(t, n)
        } : function(t, n) {
            return r.call(t, n)
        },
        M = function(t, n) {
            return -1 < C(t, n)
        },
        H = function(t, n) {
            return F(t, n).isSome()
        },
        E = function(t, n) {
            for (var e = [], o = 0; o < t.length; o += n) {
                var r = t.slice(o, o + n);
                e.push(r)
            }
            return e
        },
        V = function(t, n) {
            for (var e = t.length, o = new Array(e), r = 0; r < e; r++) {
                var i = t[r];
                o[r] = n(i, r, t)
            }
            return o
        },
        T = function(t, n) {
            for (var e = 0, o = t.length; e < o; e++) n(t[e], e, t)
        },
        A = function(t, n) {
            for (var e = [], o = 0, r = t.length; o < r; o++) {
                var i = t[o];
                n(i, o, t) && e.push(i)
            }
            return e
        },
        B = function(t, n, e) {
            return function(t, n) {
                for (var e = t.length - 1; 0 <= e; e--) n(t[e], e, t)
            }(t, function(t) {
                e = n(e, t)
            }), e
        },
        D = function(t, n, e) {
            return T(t, function(t) {
                e = n(e, t)
            }), e
        },
        _ = function(t, n) {
            for (var e = 0, o = t.length; e < o; e++) {
                var r = t[e];
                if (n(r, e, t)) return tt.some(r)
            }
            return tt.none()
        },
        F = function(t, n) {
            for (var e = 0, o = t.length; e < o; e++)
                if (n(t[e], e, t)) return tt.some(e);
            return tt.none()
        },
        I = function(t, n) {
            for (var e = 0, o = t.length; e < o; ++e)
                if (t[e] === n) return e;
            return -1
        },
        L = Array.prototype.push,
        R = function(t) {
            for (var n = [], e = 0, o = t.length; e < o; ++e) {
                if (!Array.prototype.isPrototypeOf(t[e])) throw new Error("Arr.flatten item " + e + " was not an array, input: " + t);
                L.apply(n, t[e])
            }
            return n
        },
        N = function(t, n) {
            var e = V(t, n);
            return R(e)
        },
        P = function(t, n) {
            for (var e = 0, o = t.length; e < o; ++e)
                if (!0 !== n(t[e], e, t)) return !1;
            return !0
        },
        j = Array.prototype.slice,
        U = function(t) {
            var n = j.call(t, 0);
            return n.reverse(), n
        },
        W = function(t, n) {
            return A(t, function(t) {
                return !M(n, t)
            })
        },
        G = function(t) {
            return [t]
        },
        X = function(t) {
            return 0 === t.length ? tt.none() : tt.some(t[0])
        },
        Y = function(t) {
            return 0 === t.length ? tt.none() : tt.some(t[t.length - 1])
        },
        q = S(Array.from) ? Array.from : function(t) {
            return j.call(t)
        },
        K = Object.keys,
        J = Object.hasOwnProperty,
        $ = function(t, n) {
            for (var e = K(t), o = 0, r = e.length; o < r; o++) {
                var i = e[o];
                n(t[i], i, t)
            }
        },
        nt = function(t, o) {
            return et(t, function(t, n, e) {
                return {
                    k: n,
                    v: o(t, n, e)
                }
            })
        },
        et = function(o, r) {
            var i = {};
            return $(o, function(t, n) {
                var e = r(t, n, o);
                i[e.k] = e.v
            }), i
        },
        ot = function(t, e) {
            var o = [];
            return $(t, function(t, n) {
                o.push(e(t, n))
            }), o
        },
        rt = function(t) {
            return ot(t, function(t) {
                return t
            })
        },
        it = function(t, n) {
            return ut(t, n) ? tt.some(t[n]) : tt.none()
        },
        ut = function(t, n) {
            return J.call(t, n)
        },
        at = function(n) {
            return function(t) {
                return ut(t, n) ? tt.from(t[n]) : tt.none()
            }
        },
        ct = function(t, n) {
            return at(n)(t)
        },
        st = function(t, n) {
            var e = {};
            return e[t] = n, e
        },
        lt = function(e) {
            return {
                is: function(t) {
                    return e === t
                },
                isValue: c,
                isError: a,
                getOr: Z(e),
                getOrThunk: Z(e),
                getOrDie: Z(e),
                or: function(t) {
                    return lt(e)
                },
                orThunk: function(t) {
                    return lt(e)
                },
                fold: function(t, n) {
                    return n(e)
                },
                map: function(t) {
                    return lt(t(e))
                },
                mapError: function(t) {
                    return lt(e)
                },
                each: function(t) {
                    t(e)
                },
                bind: function(t) {
                    return t(e)
                },
                exists: function(t) {
                    return t(e)
                },
                forall: function(t) {
                    return t(e)
                },
                toOption: function() {
                    return tt.some(e)
                }
            }
        },
        ft = function(e) {
            return {
                is: a,
                isValue: a,
                isError: c,
                getOr: d,
                getOrThunk: function(t) {
                    return t()
                },
                getOrDie: function() {
                    return u(String(e))()
                },
                or: function(t) {
                    return t
                },
                orThunk: function(t) {
                    return t()
                },
                fold: function(t, n) {
                    return t(e)
                },
                map: function(t) {
                    return ft(e)
                },
                mapError: function(t) {
                    return ft(t(e))
                },
                each: Q,
                bind: function(t) {
                    return ft(e)
                },
                exists: a,
                forall: c,
                toOption: tt.none
            }
        },
        dt = {
            value: lt,
            error: ft
        },
        mt = function(u) {
            if (!O(u)) throw new Error("cases must be an array");
            if (0 === u.length) throw new Error("there must be at least one case");
            var a = [],
                e = {};
            return T(u, function(t, o) {
                var n = K(t);
                if (1 !== n.length) throw new Error("one and only one name per case");
                var r = n[0],
                    i = t[r];
                if (e[r] !== undefined) throw new Error("duplicate key detected:" + r);
                if ("cata" === r) throw new Error("cannot have a case named cata (sorry)");
                if (!O(i)) throw new Error("case arguments must be an array");
                a.push(r), e[r] = function() {
                    var t = arguments.length;
                    if (t !== i.length) throw new Error("Wrong number of arguments to case " + r + ". Expected " + i.length + " (" + i + "), got " + t);
                    for (var e = new Array(t), n = 0; n < e.length; n++) e[n] = arguments[n];
                    return {
                        fold: function() {
                            if (arguments.length !== u.length) throw new Error("Wrong number of arguments to fold. Expected " + u.length + ", got " + arguments.length);
                            return arguments[o].apply(null, e)
                        },
                        match: function(t) {
                            var n = K(t);
                            if (a.length !== n.length) throw new Error("Wrong number of arguments to match. Expected: " + a.join(",") + "\nActual: " + n.join(","));
                            if (!P(a, function(t) {
                                    return M(n, t)
                                })) throw new Error("Not all branches were specified when using match. Specified: " + n.join(", ") + "\nRequired: " + a.join(", "));
                            return t[r].apply(null, e)
                        },
                        log: function(t) {
                            console.log(t, {
                                constructors: a,
                                constructor: r,
                                params: e
                            })
                        }
                    }
                }
            }), e
        },
        ht = (mt([{
            bothErrors: ["error1", "error2"]
        }, {
            firstError: ["error1", "value2"]
        }, {
            secondError: ["value1", "error2"]
        }, {
            bothValues: ["value1", "value2"]
        }]), Object.prototype.hasOwnProperty),
        gt = function(u) {
            return function() {
                for (var t = new Array(arguments.length), n = 0; n < t.length; n++) t[n] = arguments[n];
                if (0 === t.length) throw new Error("Can't merge zero objects");
                for (var e = {}, o = 0; o < t.length; o++) {
                    var r = t[o];
                    for (var i in r) ht.call(r, i) && (e[i] = u(e[i], r[i]))
                }
                return e
            }
        },
        vt = gt(function(t, n) {
            return w(t) && w(n) ? vt(t, n) : n
        }),
        pt = gt(function(t, n) {
            return n
        }),
        bt = function(t, n) {
            return e = n, o = {}, $(t, function(t, n) {
                M(e, n) || (o[n] = t)
            }), o;
            var e, o
        },
        yt = function(t) {
            return at(t)
        },
        xt = function(t, n) {
            return e = t, o = n,
                function(t) {
                    return ut(t, e) ? t[e] : o
                };
            var e, o
        },
        wt = function(t, n) {
            return ct(t, n)
        },
        zt = function(t, n) {
            return st(t, n)
        },
        St = function(t) {
            return n = {}, T(t, function(t) {
                n[t.key] = t.value
            }), n;
            var n
        },
        kt = function(t, n) {
            var e, o, r, i, u, a = (e = [], o = [], T(t, function(t) {
                t.fold(function(t) {
                    e.push(t)
                }, function(t) {
                    o.push(t)
                })
            }), {
                errors: e,
                values: o
            });
            return 0 < a.errors.length ? (u = a.errors, g(dt.error, R)(u)) : (i = n, 0 === (r = a.values).length ? dt.value(i) : dt.value(vt(i, pt.apply(undefined, r))))
        },
        Ct = function(t, n) {
            return ut(e = t, o = n) && e[o] !== undefined && null !== e[o];
            var e, o
        },
        Ot = function(t) {
            var n = t,
                e = function() {
                    return n
                };
            return {
                get: e,
                set: function(t) {
                    n = t
                },
                clone: function() {
                    return Ot(e())
                }
            }
        },
        Mt = function(t) {
            for (var n = [], e = function(t) {
                    n.push(t)
                }, o = 0; o < t.length; o++) t[o].each(e);
            return n
        },
        Ht = function(t, n) {
            for (var e = 0; e < t.length; e++) {
                var o = n(t[e], e);
                if (o.isSome()) return o
            }
            return tt.none()
        },
        Et = Z("touchstart"),
        Vt = Z("touchmove"),
        Tt = Z("touchend"),
        At = Z("mousedown"),
        Bt = Z("mousemove"),
        Dt = Z("mouseout"),
        _t = Z("mouseup"),
        Ft = Z("mouseover"),
        It = Z("focusin"),
        Lt = Z("focusout"),
        Rt = Z("keydown"),
        Nt = Z("keyup"),
        Pt = Z("input"),
        jt = Z("change"),
        Ut = Z("click"),
        Wt = Z("transitionend"),
        Gt = Z("selectstart"),
        Xt = function(e) {
            var o, r = !1;
            return function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return r || (r = !0, o = e.apply(null, t)), o
            }
        },
        Yt = function(t, n) {
            var e = function(t, n) {
                for (var e = 0; e < t.length; e++) {
                    var o = t[e];
                    if (o.test(n)) return o
                }
                return undefined
            }(t, n);
            if (!e) return {
                major: 0,
                minor: 0
            };
            var o = function(t) {
                return Number(n.replace(e, "$" + t))
            };
            return Kt(o(1), o(2))
        },
        qt = function() {
            return Kt(0, 0)
        },
        Kt = function(t, n) {
            return {
                major: t,
                minor: n
            }
        },
        Jt = {
            nu: Kt,
            detect: function(t, n) {
                var e = String(n).toLowerCase();
                return 0 === t.length ? qt() : Yt(t, e)
            },
            unknown: qt
        },
        $t = "Firefox",
        Qt = function(t, n) {
            return function() {
                return n === t
            }
        },
        Zt = function(t) {
            var n = t.current;
            return {
                current: n,
                version: t.version,
                isEdge: Qt("Edge", n),
                isChrome: Qt("Chrome", n),
                isIE: Qt("IE", n),
                isOpera: Qt("Opera", n),
                isFirefox: Qt($t, n),
                isSafari: Qt("Safari", n)
            }
        },
        tn = {
            unknown: function() {
                return Zt({
                    current: undefined,
                    version: Jt.unknown()
                })
            },
            nu: Zt,
            edge: Z("Edge"),
            chrome: Z("Chrome"),
            ie: Z("IE"),
            opera: Z("Opera"),
            firefox: Z($t),
            safari: Z("Safari")
        },
        nn = "Windows",
        en = "Android",
        on = "Solaris",
        rn = "FreeBSD",
        un = function(t, n) {
            return function() {
                return n === t
            }
        },
        an = function(t) {
            var n = t.current;
            return {
                current: n,
                version: t.version,
                isWindows: un(nn, n),
                isiOS: un("iOS", n),
                isAndroid: un(en, n),
                isOSX: un("OSX", n),
                isLinux: un("Linux", n),
                isSolaris: un(on, n),
                isFreeBSD: un(rn, n)
            }
        },
        cn = {
            unknown: function() {
                return an({
                    current: undefined,
                    version: Jt.unknown()
                })
            },
            nu: an,
            windows: Z(nn),
            ios: Z("iOS"),
            android: Z(en),
            linux: Z("Linux"),
            osx: Z("OSX"),
            solaris: Z(on),
            freebsd: Z(rn)
        },
        sn = function(t, n) {
            var e = String(n).toLowerCase();
            return _(t, function(t) {
                return t.search(e)
            })
        },
        ln = function(t, e) {
            return sn(t, e).map(function(t) {
                var n = Jt.detect(t.versionRegexes, e);
                return {
                    current: t.name,
                    version: n
                }
            })
        },
        fn = function(t, e) {
            return sn(t, e).map(function(t) {
                var n = Jt.detect(t.versionRegexes, e);
                return {
                    current: t.name,
                    version: n
                }
            })
        },
        dn = function(t, n) {
            return -1 !== t.indexOf(n)
        },
        mn = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        hn = function(n) {
            return function(t) {
                return dn(t, n)
            }
        },
        gn = [{
            name: "Edge",
            versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
            search: function(t) {
                return dn(t, "edge/") && dn(t, "chrome") && dn(t, "safari") && dn(t, "applewebkit")
            }
        }, {
            name: "Chrome",
            versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, mn],
            search: function(t) {
                return dn(t, "chrome") && !dn(t, "chromeframe")
            }
        }, {
            name: "IE",
            versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
            search: function(t) {
                return dn(t, "msie") || dn(t, "trident")
            }
        }, {
            name: "Opera",
            versionRegexes: [mn, /.*?opera\/([0-9]+)\.([0-9]+).*/],
            search: hn("opera")
        }, {
            name: "Firefox",
            versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
            search: hn("firefox")
        }, {
            name: "Safari",
            versionRegexes: [mn, /.*?cpu os ([0-9]+)_([0-9]+).*/],
            search: function(t) {
                return (dn(t, "safari") || dn(t, "mobile/")) && dn(t, "applewebkit")
            }
        }],
        vn = [{
            name: "Windows",
            search: hn("win"),
            versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
        }, {
            name: "iOS",
            search: function(t) {
                return dn(t, "iphone") || dn(t, "ipad")
            },
            versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
        }, {
            name: "Android",
            search: hn("android"),
            versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
        }, {
            name: "OSX",
            search: hn("os x"),
            versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
        }, {
            name: "Linux",
            search: hn("linux"),
            versionRegexes: []
        }, {
            name: "Solaris",
            search: hn("sunos"),
            versionRegexes: []
        }, {
            name: "FreeBSD",
            search: hn("freebsd"),
            versionRegexes: []
        }],
        pn = {
            browsers: Z(gn),
            oses: Z(vn)
        },
        bn = function(t) {
            var n, e, o, r, i, u, a, c, s, l, f, d = pn.browsers(),
                m = pn.oses(),
                h = ln(d, t).fold(tn.unknown, tn.nu),
                g = fn(m, t).fold(cn.unknown, cn.nu);
            return {
                browser: h,
                os: g,
                deviceType: (e = h, o = t, r = (n = g).isiOS() && !0 === /ipad/i.test(o), i = n.isiOS() && !r, u = n.isAndroid() && 3 === n.version.major, a = n.isAndroid() && 4 === n.version.major, c = r || u || a && !0 === /mobile/i.test(o), s = n.isiOS() || n.isAndroid(), l = s && !c, f = e.isSafari() && n.isiOS() && !1 === /safari/i.test(o), {
                    isiPad: Z(r),
                    isiPhone: Z(i),
                    isTablet: Z(c),
                    isPhone: Z(l),
                    isTouch: Z(s),
                    isAndroid: n.isAndroid,
                    isiOS: n.isiOS,
                    isWebView: Z(f)
                })
            }
        },
        yn = {
            detect: Xt(function() {
                var t = navigator.userAgent;
                return bn(t)
            })
        },
        xn = {
            tap: Z("alloy.tap")
        },
        wn = Z("alloy.focus"),
        zn = Z("alloy.blur.post"),
        Sn = Z("alloy.paste.post"),
        kn = Z("alloy.receive"),
        Cn = Z("alloy.execute"),
        On = Z("alloy.focus.item"),
        Mn = xn.tap,
        Hn = yn.detect().deviceType.isTouch() ? xn.tap : Ut,
        En = Z("alloy.longpress"),
        Vn = Z("alloy.sandbox.close"),
        Tn = Z("alloy.typeahead.cancel"),
        An = Z("alloy.system.init"),
        Bn = Z("alloy.system.scroll"),
        Dn = Z("alloy.system.resize"),
        _n = Z("alloy.system.attached"),
        Fn = Z("alloy.system.detached"),
        In = Z("alloy.system.dismissRequested"),
        Ln = Z("alloy.focusmanager.shifted"),
        Rn = Z("alloy.slotcontainer.visibility"),
        Nn = Z("alloy.change.tab"),
        Pn = Z("alloy.dismiss.tab"),
        jn = Z("alloy.highlight"),
        Un = Z("alloy.dehighlight"),
        Wn = function(t) {
            if (null === t || t === undefined) throw new Error("Node cannot be null or undefined");
            return {
                dom: Z(t)
            }
        },
        Gn = {
            fromHtml: function(t, n) {
                var e = (n || document).createElement("div");
                if (e.innerHTML = t, !e.hasChildNodes() || 1 < e.childNodes.length) throw console.error("HTML does not have a single root node", t), new Error("HTML must have a single root node");
                return Wn(e.childNodes[0])
            },
            fromTag: function(t, n) {
                var e = (n || document).createElement(t);
                return Wn(e)
            },
            fromText: function(t, n) {
                var e = (n || document).createTextNode(t);
                return Wn(e)
            },
            fromDom: Wn,
            fromPoint: function(t, n, e) {
                var o = t.dom();
                return tt.from(o.elementFromPoint(n, e)).map(Wn)
            }
        },
        Xn = function() {
            for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
            return function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (n.length !== e.length) throw new Error('Wrong number of arguments to struct. Expected "[' + n.length + ']", got ' + e.length + " arguments");
                var o = {};
                return T(n, function(t, n) {
                    o[t] = Z(e[n])
                }), o
            }
        },
        Yn = function(t) {
            return t.slice(0).sort()
        },
        qn = function(n, t) {
            if (!O(t)) throw new Error("The " + n + " fields must be an array. Was: " + t + ".");
            T(t, function(t) {
                if (!x(t)) throw new Error("The value " + t + " in the " + n + " fields was not a string.")
            })
        },
        Kn = function(r, i) {
            var e, u = r.concat(i);
            if (0 === u.length) throw new Error("You must specify at least one required or optional field.");
            return qn("required", r), qn("optional", i), e = Yn(u), _(e, function(t, n) {
                    return n < e.length - 1 && t === e[n + 1]
                }).each(function(t) {
                    throw new Error("The field: " + t + " occurs more than once in the combined fields: [" + e.join(", ") + "].")
                }),
                function(n) {
                    var e = K(n);
                    P(r, function(t) {
                        return M(e, t)
                    }) || function(t, n) {
                        throw new Error("All required keys (" + Yn(t).join(", ") + ") were not specified. Specified keys were: " + Yn(n).join(", ") + ".")
                    }(r, e);
                    var t = A(e, function(t) {
                        return !M(u, t)
                    });
                    0 < t.length && function(t) {
                        throw new Error("Unsupported keys for object: " + Yn(t).join(", "))
                    }(t);
                    var o = {};
                    return T(r, function(t) {
                        o[t] = Z(n[t])
                    }), T(i, function(t) {
                        o[t] = Z(Object.prototype.hasOwnProperty.call(n, t) ? tt.some(n[t]) : tt.none())
                    }), o
                }
        },
        Jn = "undefined" != typeof window ? window : Function("return this;")(),
        $n = function(t, n) {
            return function(t, n) {
                for (var e = n !== undefined && null !== n ? n : Jn, o = 0; o < t.length && e !== undefined && null !== e; ++o) e = e[t[o]];
                return e
            }(t.split("."), n)
        },
        Qn = {
            getOrDie: function(t, n) {
                var e = $n(t, n);
                if (e === undefined || null === e) throw t + " not available on this browser";
                return e
            }
        },
        Zn = (Node.ATTRIBUTE_NODE, Node.CDATA_SECTION_NODE, Node.COMMENT_NODE, Node.DOCUMENT_NODE),
        te = (Node.DOCUMENT_TYPE_NODE, Node.DOCUMENT_FRAGMENT_NODE, Node.ELEMENT_NODE),
        ne = Node.TEXT_NODE,
        ee = (Node.PROCESSING_INSTRUCTION_NODE, Node.ENTITY_REFERENCE_NODE, Node.ENTITY_NODE, Node.NOTATION_NODE, te),
        oe = Zn,
        re = function(t, n) {
            var e = t.dom();
            if (e.nodeType !== ee) return !1;
            if (e.matches !== undefined) return e.matches(n);
            if (e.msMatchesSelector !== undefined) return e.msMatchesSelector(n);
            if (e.webkitMatchesSelector !== undefined) return e.webkitMatchesSelector(n);
            if (e.mozMatchesSelector !== undefined) return e.mozMatchesSelector(n);
            throw new Error("Browser lacks native selectors")
        },
        ie = function(t) {
            return t.nodeType !== ee && t.nodeType !== oe || 0 === t.childElementCount
        },
        ue = function(t, n) {
            var e = n === undefined ? document : n.dom();
            return ie(e) ? [] : V(e.querySelectorAll(t), Gn.fromDom)
        },
        ae = function(t, n) {
            return t.dom() === n.dom()
        },
        ce = (yn.detect().browser.isIE(), function(t) {
            return Gn.fromDom(t.dom().ownerDocument)
        }),
        se = function(t) {
            var n = t.dom().ownerDocument.defaultView;
            return Gn.fromDom(n)
        },
        le = function(t) {
            var n = t.dom();
            return tt.from(n.parentNode).map(Gn.fromDom)
        },
        fe = function(t) {
            var n = t.dom();
            return tt.from(n.offsetParent).map(Gn.fromDom)
        },
        de = function(t) {
            var n = t.dom();
            return V(n.childNodes, Gn.fromDom)
        },
        me = function(t, n) {
            var e = t.dom().childNodes;
            return tt.from(e[n]).map(Gn.fromDom)
        },
        he = (Xn("element", "offset"), function(n, e) {
            le(n).each(function(t) {
                t.dom().insertBefore(e.dom(), n.dom())
            })
        }),
        ge = function(t, n) {
            var e;
            (e = t.dom(), tt.from(e.nextSibling).map(Gn.fromDom)).fold(function() {
                le(t).each(function(t) {
                    pe(t, n)
                })
            }, function(t) {
                he(t, n)
            })
        },
        ve = function(n, e) {
            me(n, 0).fold(function() {
                pe(n, e)
            }, function(t) {
                n.dom().insertBefore(e.dom(), t.dom())
            })
        },
        pe = function(t, n) {
            t.dom().appendChild(n.dom())
        },
        be = function(n, t) {
            T(t, function(t) {
                pe(n, t)
            })
        },
        ye = function(t) {
            t.dom().textContent = "", T(de(t), function(t) {
                xe(t)
            })
        },
        xe = function(t) {
            var n = t.dom();
            null !== n.parentNode && n.parentNode.removeChild(n)
        },
        we = function(t) {
            return t.dom().innerHTML
        },
        ze = function(t, n) {
            var e, o, r = ce(t).dom(),
                i = Gn.fromDom(r.createDocumentFragment()),
                u = (e = n, (o = (r || document).createElement("div")).innerHTML = e, de(Gn.fromDom(o)));
            be(i, u), ye(t), pe(t, i)
        },
        Se = function(t) {
            return t.dom().nodeName.toLowerCase()
        },
        ke = function(n) {
            return function(t) {
                return t.dom().nodeType === n
            }
        },
        Ce = ke(te),
        Oe = ke(ne),
        Me = ke(Zn),
        He = function(t, n, e) {
            if (!(x(e) || z(e) || k(e))) throw console.error("Invalid call to Attr.set. Key ", n, ":: Value ", e, ":: Element ", t), new Error("Attribute value was not simple");
            t.setAttribute(n, e + "")
        },
        Ee = function(t, n, e) {
            He(t.dom(), n, e)
        },
        Ve = function(t, n) {
            var e = t.dom();
            $(n, function(t, n) {
                He(e, n, t)
            })
        },
        Te = function(t, n) {
            var e = t.dom().getAttribute(n);
            return null === e ? undefined : e
        },
        Ae = function(t, n) {
            var e = t.dom();
            return !(!e || !e.hasAttribute) && e.hasAttribute(n)
        },
        Be = function(t, n) {
            t.dom().removeAttribute(n)
        },
        De = function(t) {
            return n = t, e = !1, Gn.fromDom(n.dom().cloneNode(e));
            var n, e
        },
        _e = function(t) {
            var n, e, o, r = De(t);
            return n = r, e = Gn.fromTag("div"), o = Gn.fromDom(n.dom().cloneNode(!0)), pe(e, o), we(e)
        },
        Fe = function(t) {
            return _e(t)
        },
        Ie = "unknown",
        Le = "__CHROME_INSPECTOR_CONNECTION_TO_ALLOY__";
    (i = s || (s = {}))[i.STOP = 0] = "STOP", i[i.NORMAL = 1] = "NORMAL", i[i.LOGGING = 2] = "LOGGING";
    var Re = Ot({}),
        Ne = function(n, t, e) {
            var o, r, i, u;
            switch (wt(Re.get(), n).orThunk(function() {
                var t = K(Re.get());
                return Ht(t, function(t) {
                    return -1 < n.indexOf(t) ? tt.some(Re.get()[t]) : tt.none()
                })
            }).getOr(s.NORMAL)) {
                case s.NORMAL:
                    return e(Ge());
                case s.LOGGING:
                    var a = (o = n, r = t, i = [], u = (new Date).getTime(), {
                            logEventCut: function(t, n, e) {
                                i.push({
                                    outcome: "cut",
                                    target: n,
                                    purpose: e
                                })
                            },
                            logEventStopped: function(t, n, e) {
                                i.push({
                                    outcome: "stopped",
                                    target: n,
                                    purpose: e
                                })
                            },
                            logNoParent: function(t, n, e) {
                                i.push({
                                    outcome: "no-parent",
                                    target: n,
                                    purpose: e
                                })
                            },
                            logEventNoHandlers: function(t, n) {
                                i.push({
                                    outcome: "no-handlers-left",
                                    target: n
                                })
                            },
                            logEventResponse: function(t, n, e) {
                                i.push({
                                    outcome: "response",
                                    purpose: e,
                                    target: n
                                })
                            },
                            write: function() {
                                var t = (new Date).getTime();
                                M(["mousemove", "mouseover", "mouseout", An()], o) || console.log(o, {
                                    event: o,
                                    time: t - u,
                                    target: r.dom(),
                                    sequence: V(i, function(t) {
                                        return M(["cut", "stopped", "response"], t.outcome) ? "{" + t.purpose + "} " + t.outcome + " at (" + Fe(t.target) + ")" : t.outcome
                                    })
                                })
                            }
                        }),
                        c = e(a);
                    return a.write(), c;
                case s.STOP:
                    return !0
            }
        },
        Pe = ["alloy/data/Fields", "alloy/debugging/Debugging"],
        je = function(t, n, e) {
            return Ne(t, n, e)
        },
        Ue = function() {
            if (window[Le] !== undefined) return window[Le];
            var n = function(t, n) {
                var e = Re.get();
                e[t] = n, Re.set(e)
            };
            return window[Le] = {
                systems: {},
                lookup: function(n) {
                    var e = window[Le].systems,
                        t = K(e);
                    return Ht(t, function(t) {
                        return e[t].getByUid(n).toOption().map(function(t) {
                            return zt(Fe(t.element()), (n = function(e) {
                                var t = e.spec();
                                return {
                                    "(original.spec)": t,
                                    "(dom.ref)": e.element().dom(),
                                    "(element)": Fe(e.element()),
                                    "(initComponents)": V(t.components !== undefined ? t.components : [], n),
                                    "(components)": V(e.components(), n),
                                    "(bound.events)": ot(e.events(), function(t, n) {
                                        return [n]
                                    }).join(", "),
                                    "(behaviours)": t.behaviours !== undefined ? nt(t.behaviours, function(t, n) {
                                        return t === undefined ? "--revoked--" : {
                                            config: t.configAsRaw(),
                                            "original-config": t.initialConfig,
                                            state: e.readState(n)
                                        }
                                    }) : "none"
                                }
                            })(t));
                            var n
                        })
                    }).orThunk(function() {
                        return tt.some({
                            error: "Systems (" + t.join(", ") + ") did not contain uid: " + n
                        })
                    })
                },
                events: {
                    setToNormal: function(t) {
                        n(t, s.NORMAL)
                    },
                    setToLogging: function(t) {
                        n(t, s.LOGGING)
                    },
                    setToStop: function(t) {
                        n(t, s.STOP)
                    }
                }
            }, window[Le]
        },
        We = function(t, n) {
            Ue().systems[t] = n
        },
        Ge = Z({
            logEventCut: Q,
            logEventStopped: Q,
            logNoParent: Q,
            logEventNoHandlers: Q,
            logEventResponse: Q,
            write: Q
        }),
        Xe = 0,
        Ye = function(t) {
            var n = (new Date).getTime();
            return t + "_" + Math.floor(1e9 * Math.random()) + ++Xe + String(n)
        },
        qe = tinymce.util.Tools.resolve("tinymce.ThemeManager"),
        Ke = function() {
            return (Ke = Object.assign || function(t) {
                for (var n, e = 1, o = arguments.length; e < o; e++)
                    for (var r in n = arguments[e]) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
                return t
            }).apply(this, arguments)
        };

    function Je(t, n) {
        var e = {};
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && n.indexOf(o) < 0 && (e[o] = t[o]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (o = Object.getOwnPropertySymbols(t); r < o.length; r++) n.indexOf(o[r]) < 0 && (e[o[r]] = t[o[r]])
        }
        return e
    }
    var $e, Qe, Ze = mt([{
            strict: []
        }, {
            defaultedThunk: ["fallbackThunk"]
        }, {
            asOption: []
        }, {
            asDefaultedOptionThunk: ["fallbackThunk"]
        }, {
            mergeWithThunk: ["baseThunk"]
        }]),
        to = function(t) {
            return Ze.defaultedThunk(Z(t))
        },
        no = Ze.strict,
        eo = Ze.asOption,
        oo = Ze.defaultedThunk,
        ro = Ze.mergeWithThunk;
    (Qe = $e || ($e = {}))[Qe.Error = 0] = "Error", Qe[Qe.Value = 1] = "Value";
    var io = function(t, n, e) {
            return t.stype === $e.Error ? n(t.serror) : e(t.svalue)
        },
        uo = function(t) {
            return {
                stype: $e.Value,
                svalue: t
            }
        },
        ao = function(t) {
            return {
                stype: $e.Error,
                serror: t
            }
        },
        co = function(t) {
            return t.fold(ao, uo)
        },
        so = function(t) {
            return io(t, dt.error, dt.value)
        },
        lo = uo,
        fo = function(t) {
            var n = [],
                e = [];
            return T(t, function(t) {
                io(t, function(t) {
                    return e.push(t)
                }, function(t) {
                    return n.push(t)
                })
            }), {
                values: n,
                errors: e
            }
        },
        mo = ao,
        ho = function(t, n) {
            return t.stype === $e.Value ? n(t.svalue) : t
        },
        go = function(t, n) {
            return t.stype === $e.Error ? n(t.serror) : t
        },
        vo = function(t, n) {
            return t.stype === $e.Value ? {
                stype: $e.Value,
                svalue: n(t.svalue)
            } : t
        },
        po = function(t, n) {
            return t.stype === $e.Error ? {
                stype: $e.Error,
                serror: n(t.serror)
            } : t
        },
        bo = function(t) {
            return g(mo, R)(t)
        },
        yo = function(t, n) {
            var e, o, r = fo(t);
            return 0 < r.errors.length ? bo(r.errors) : (e = r.values, o = n, 0 < e.length ? lo(vt(o, pt.apply(undefined, e))) : lo(o))
        },
        xo = function(t) {
            var n = fo(t);
            return 0 < n.errors.length ? bo(n.errors) : lo(n.values)
        },
        wo = mt([{
            setOf: ["validator", "valueType"]
        }, {
            arrOf: ["valueType"]
        }, {
            objOf: ["fields"]
        }, {
            itemOf: ["validator"]
        }, {
            choiceOf: ["key", "branches"]
        }, {
            thunk: ["description"]
        }, {
            func: ["args", "outputSchema"]
        }]),
        zo = mt([{
            field: ["name", "presence", "type"]
        }, {
            state: ["name"]
        }]),
        So = function() {
            return Qn.getOrDie("JSON")
        },
        ko = function(t, n, e) {
            return So().stringify(t, n, e)
        },
        Co = function(t) {
            return w(t) && 100 < K(t).length ? " removed due to size" : ko(t, null, 2)
        },
        Oo = function(t, n) {
            return mo([{
                path: t,
                getErrorInfo: n
            }])
        },
        Mo = mt([{
            field: ["key", "okey", "presence", "prop"]
        }, {
            state: ["okey", "instantiator"]
        }]),
        Ho = function(e, o, r) {
            return ct(o, r).fold(function() {
                return t = r, n = o, Oo(e, function() {
                    return 'Could not find valid *strict* value for "' + t + '" in ' + Co(n)
                });
                var t, n
            }, lo)
        },
        Eo = function(t, n, e) {
            var o = ct(t, n).fold(function() {
                return e(t)
            }, d);
            return lo(o)
        },
        Vo = function(a, c, t, s) {
            return t.fold(function(r, e, t, o) {
                var i = function(t) {
                        var n = o.extract(a.concat([r]), s, t);
                        return vo(n, function(t) {
                            return st(e, s(t))
                        })
                    },
                    u = function(t) {
                        return t.fold(function() {
                            var t = st(e, s(tt.none()));
                            return lo(t)
                        }, function(t) {
                            var n = o.extract(a.concat([r]), s, t);
                            return vo(n, function(t) {
                                return st(e, s(tt.some(t)))
                            })
                        })
                    };
                return t.fold(function() {
                    return ho(Ho(a, c, r), i)
                }, function(t) {
                    return ho(Eo(c, r, t), i)
                }, function() {
                    return ho(lo(ct(c, r)), u)
                }, function(t) {
                    return ho((e = t, o = ct(n = c, r).map(function(t) {
                        return !0 === t ? e(n) : t
                    }), lo(o)), u);
                    var n, e, o
                }, function(t) {
                    var n = t(c),
                        e = vo(Eo(c, r, Z({})), function(t) {
                            return vt(n, t)
                        });
                    return ho(e, i)
                })
            }, function(t, n) {
                var e = n(c);
                return lo(st(t, s(e)))
            })
        },
        To = function(o) {
            return {
                extract: function(e, t, n) {
                    return go(o(n, t), function(t) {
                        return n = t, Oo(e, function() {
                            return n
                        });
                        var n
                    })
                },
                toString: function() {
                    return "val"
                },
                toDsl: function() {
                    return wo.itemOf(o)
                }
            }
        },
        Ao = function(t) {
            var c = Bo(t),
                s = B(t, function(n, t) {
                    return t.fold(function(t) {
                        return vt(n, zt(t, !0))
                    }, Z(n))
                }, {});
            return {
                extract: function(t, n, e) {
                    var o, r, i, u = z(e) ? [] : (r = K(o = e), A(r, function(t) {
                            return Ct(o, t)
                        })),
                        a = A(u, function(t) {
                            return !Ct(s, t)
                        });
                    return 0 === a.length ? c.extract(t, n, e) : (i = a, Oo(t, function() {
                        return "There are unsupported fields: [" + i.join(", ") + "] specified"
                    }))
                },
                toString: c.toString,
                toDsl: c.toDsl
            }
        },
        Bo = function(a) {
            return {
                extract: function(t, n, e) {
                    return o = t, r = e, i = n, u = V(a, function(t) {
                        return Vo(o, r, t, i)
                    }), yo(u, {});
                    var o, r, i, u
                },
                toString: function() {
                    return "obj{\n" + V(a, function(t) {
                        return t.fold(function(t, n, e, o) {
                            return t + " -> " + o.toString()
                        }, function(t, n) {
                            return "state(" + t + ")"
                        })
                    }).join("\n") + "}"
                },
                toDsl: function() {
                    return wo.objOf(V(a, function(t) {
                        return t.fold(function(t, n, e, o) {
                            return zo.field(t, e, o)
                        }, function(t, n) {
                            return zo.state(t)
                        })
                    }))
                }
            }
        },
        Do = function(r) {
            return {
                extract: function(e, o, t) {
                    var n = V(t, function(t, n) {
                        return r.extract(e.concat(["[" + n + "]"]), o, t)
                    });
                    return xo(n)
                },
                toString: function() {
                    return "array(" + r.toString() + ")"
                },
                toDsl: function() {
                    return wo.arrOf(r)
                }
            }
        },
        _o = function(a, c) {
            return {
                extract: function(e, o, r) {
                    var t, n, i = K(r),
                        u = (t = e, n = i, Do(To(a)).extract(t, d, n));
                    return ho(u, function(t) {
                        var n = V(t, function(t) {
                            return Mo.field(t, t, no(), c)
                        });
                        return Bo(n).extract(e, o, r)
                    })
                },
                toString: function() {
                    return "setOf(" + c.toString() + ")"
                },
                toDsl: function() {
                    return wo.setOf(a, c)
                }
            }
        },
        Fo = Z(To(lo)),
        Io = g(Do, Bo),
        Lo = Mo.state,
        Ro = Mo.field,
        No = function(e, n, o, r, i) {
            return wt(r, i).fold(function() {
                return t = r, n = i, Oo(e, function() {
                    return 'The chosen schema: "' + n + '" did not exist in branches: ' + Co(t)
                });
                var t, n
            }, function(t) {
                return Bo(t).extract(e.concat(["branch: " + i]), n, o)
            })
        },
        Po = function(r, i) {
            return {
                extract: function(n, e, o) {
                    return wt(o, r).fold(function() {
                        return t = r, Oo(n, function() {
                            return 'Choice schema did not contain choice key: "' + t + '"'
                        });
                        var t
                    }, function(t) {
                        return No(n, e, o, i, t)
                    })
                },
                toString: function() {
                    return "chooseOn(" + r + "). Possible values: " + K(i)
                },
                toDsl: function() {
                    return wo.choiceOf(r, i)
                }
            }
        },
        jo = To(lo),
        Uo = function(n) {
            return To(function(t) {
                return n(t).fold(mo, lo)
            })
        },
        Wo = function(n, t) {
            return _o(function(t) {
                return co(n(t))
            }, t)
        },
        Go = function(t, n, e) {
            return so((o = t, r = d, i = e, u = n.extract([o], r, i), po(u, function(t) {
                return {
                    input: i,
                    errors: t
                }
            })));
            var o, r, i, u
        },
        Xo = function(t) {
            return t.fold(function(t) {
                throw new Error(qo(t))
            }, d)
        },
        Yo = function(t, n, e) {
            return Xo(Go(t, n, e))
        },
        qo = function(t) {
            return "Errors: \n" + (n = t.errors, e = 10 < n.length ? n.slice(0, 10).concat([{
                path: [],
                getErrorInfo: function() {
                    return "... (only showing first ten failures)"
                }
            }]) : n, V(e, function(t) {
                return "Failed path: (" + t.path.join(" > ") + ")\n" + t.getErrorInfo()
            })) + "\n\nInput object: " + Co(t.input);
            var n, e
        },
        Ko = function(t, n) {
            return Po(t, n)
        },
        Jo = Z(jo),
        $o = function(e, o) {
            return To(function(t) {
                var n = typeof t;
                return e(t) ? lo(t) : mo("Expected type: " + o + " but got: " + n)
            })
        },
        Qo = $o(k, "number"),
        Zo = $o(x, "string"),
        tr = $o(z, "boolean"),
        nr = $o(S, "function"),
        er = function(n) {
            return Uo(function(t) {
                return M(n, t) ? dt.value(t) : dt.error('Unsupported value: "' + t + '", choose one of "' + n.join(", ") + '".')
            })
        },
        or = function(t) {
            return Ro(t, t, no(), Fo())
        },
        rr = function(t, n) {
            return Ro(t, t, no(), n)
        },
        ir = function(t) {
            return rr(t, Zo)
        },
        ur = function(t, n) {
            return Ro(t, t, no(), er(n))
        },
        ar = function(t) {
            return rr(t, nr)
        },
        cr = function(t, n) {
            return Ro(t, t, no(), Bo(n))
        },
        sr = function(t, n) {
            return Ro(t, t, no(), Io(n))
        },
        lr = function(t, n) {
            return Ro(t, t, no(), Do(n))
        },
        fr = function(t) {
            return Ro(t, t, eo(), Fo())
        },
        dr = function(t, n) {
            return Ro(t, t, eo(), n)
        },
        mr = function(t) {
            return dr(t, Zo)
        },
        hr = function(t) {
            return dr(t, nr)
        },
        gr = function(t, n) {
            return Ro(t, t, eo(), Bo(n))
        },
        vr = function(t, n) {
            return Ro(t, t, to(n), Fo())
        },
        pr = function(t, n, e) {
            return Ro(t, t, to(n), e)
        },
        br = function(t, n) {
            return pr(t, n, Qo)
        },
        yr = function(t, n) {
            return pr(t, n, Zo)
        },
        xr = function(t, n, e) {
            return pr(t, n, er(e))
        },
        wr = function(t, n) {
            return pr(t, n, tr)
        },
        zr = function(t, n) {
            return pr(t, n, nr)
        },
        Sr = function(t, n, e) {
            return Ro(t, t, to(n), Bo(e))
        },
        kr = function(t, n) {
            return Lo(t, n)
        },
        Cr = function(t, n) {
            return ae(t.element(), n.event().target())
        },
        Or = function(t) {
            if (!Ct(t, "can") && !Ct(t, "abort") && !Ct(t, "run")) throw new Error("EventHandler defined by: " + ko(t, null, 2) + " does not have can, abort, or run!");
            return Yo("Extracting event.handler", Ao([vr("can", Z(!0)), vr("abort", Z(!1)), vr("run", Q)]), t)
        },
        Mr = function(e) {
            var n, o, r, i, t = (n = e, o = function(t) {
                    return t.can
                }, function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return D(n, function(t, n) {
                        return t && o(n).apply(undefined, e)
                    }, !0)
                }),
                u = (r = e, i = function(t) {
                    return t.abort
                }, function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return D(r, function(t, n) {
                        return t || i(n).apply(undefined, e)
                    }, !1)
                });
            return Or({
                can: t,
                abort: u,
                run: function() {
                    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
                    T(e, function(t) {
                        t.run.apply(undefined, n)
                    })
                }
            })
        },
        Hr = function(t, n) {
            Ar(t, t.element(), n, {})
        },
        Er = function(t, n, e) {
            Ar(t, t.element(), n, e)
        },
        Vr = function(t) {
            Hr(t, Cn())
        },
        Tr = function(t, n, e) {
            Ar(t, n, e, {})
        },
        Ar = function(t, n, e, o) {
            var r = Ke({
                target: n
            }, o);
            t.getSystem().triggerEvent(e, n, nt(r, Z))
        },
        Br = function(t, n, e, o) {
            t.getSystem().triggerEvent(e, n, o.event())
        };

    function Dr(t, n, e, o, r) {
        return t(e, o) ? tt.some(e) : S(r) && r(e) ? tt.none() : n(e, o, r)
    }
    var _r, Fr, Ir, Lr = function(t) {
            var n = Oe(t) ? t.dom().parentNode : t.dom();
            return n !== undefined && null !== n && n.ownerDocument.body.contains(n)
        },
        Rr = Xt(function() {
            return Nr(Gn.fromDom(document))
        }),
        Nr = function(t) {
            var n = t.dom().body;
            if (null === n || n === undefined) throw new Error("Body is not available yet");
            return Gn.fromDom(n)
        },
        Pr = function(t, n, e) {
            for (var o = t.dom(), r = S(e) ? e : Z(!1); o.parentNode;) {
                o = o.parentNode;
                var i = Gn.fromDom(o);
                if (n(i)) return tt.some(i);
                if (r(i)) break
            }
            return tt.none()
        },
        jr = function(t, n, e) {
            return Dr(function(t) {
                return n(t)
            }, Pr, t, n, e)
        },
        Ur = function(t, o) {
            var r = function(t) {
                for (var n = 0; n < t.childNodes.length; n++) {
                    if (o(Gn.fromDom(t.childNodes[n]))) return tt.some(Gn.fromDom(t.childNodes[n]));
                    var e = r(t.childNodes[n]);
                    if (e.isSome()) return e
                }
                return tt.none()
            };
            return r(t.dom())
        },
        Wr = function(t, n, e) {
            return jr(t, function(t) {
                return n(t).isSome()
            }, e).bind(n)
        },
        Gr = function(t) {
            return St(t)
        },
        Xr = function(t, n) {
            return {
                key: t,
                value: Or({
                    abort: n
                })
            }
        },
        Yr = function(t) {
            return {
                key: t,
                value: Or({
                    run: function(t, n) {
                        n.event().prevent()
                    }
                })
            }
        },
        qr = function(t, n) {
            return {
                key: t,
                value: Or({
                    run: n
                })
            }
        },
        Kr = function(t, n, e) {
            return {
                key: t,
                value: Or({
                    run: function(t) {
                        n.apply(undefined, [t].concat(e))
                    }
                })
            }
        },
        Jr = function(t) {
            return function(e) {
                return {
                    key: t,
                    value: Or({
                        run: function(t, n) {
                            Cr(t, n) && e(t, n)
                        }
                    })
                }
            }
        },
        $r = function(t, n, e) {
            var o, r, i = n.partUids[e];
            return r = i, qr(o = t, function(t, n) {
                t.getSystem().getByUid(r).each(function(t) {
                    Br(t, t.element(), o, n)
                })
            })
        },
        Qr = function(t, r) {
            return qr(t, function(n, t) {
                var e = t.event(),
                    o = n.getSystem().getByDom(e.target()).fold(function() {
                        return Wr(e.target(), function(t) {
                            return n.getSystem().getByDom(t).toOption()
                        }, Z(!1)).getOr(n)
                    }, function(t) {
                        return t
                    });
                r(n, o, t)
            })
        },
        Zr = function(t) {
            return qr(t, function(t, n) {
                n.cut()
            })
        },
        ti = function(t) {
            return qr(t, function(t, n) {
                n.stop()
            })
        },
        ni = function(t, n) {
            return Jr(t)(n)
        },
        ei = Jr(_n()),
        oi = Jr(Fn()),
        ri = Jr(An()),
        ii = (_r = Cn(), function(t) {
            return qr(_r, t)
        }),
        ui = Gr([(Fr = wn(), Ir = function(t, n) {
            var e, o, r = n.event().originator(),
                i = n.event().target();
            return o = i, !(ae(e = r, t.element()) && !ae(e, o) && (console.warn(wn() + " did not get interpreted by the desired target. \nOriginator: " + Fe(r) + "\nTarget: " + Fe(i) + "\nCheck the " + wn() + " event handlers"), 1))
        }, {
            key: Fr,
            value: Or({
                can: Ir
            })
        })]),
        ai = /* */ Object.freeze({
            events: ui
        }),
        ci = Z("alloy-id-"),
        si = Z("data-alloy-id"),
        li = ci(),
        fi = si(),
        di = function(t, n) {
            Object.defineProperty(t.dom(), fi, {
                value: n,
                writable: !0
            })
        },
        mi = function(t) {
            var n = Ce(t) ? t.dom()[fi] : null;
            return tt.from(n)
        },
        hi = function(t) {
            return Ye(t)
        },
        gi = d,
        vi = function(n) {
            var t = function(t) {
                return function() {
                    throw new Error("The component must be in a context to send: " + t + "\n" + Fe(n().element()) + " is not in context.")
                }
            };
            return {
                debugInfo: Z("fake"),
                triggerEvent: t("triggerEvent"),
                triggerFocus: t("triggerFocus"),
                triggerEscape: t("triggerEscape"),
                build: t("build"),
                addToWorld: t("addToWorld"),
                removeFromWorld: t("removeFromWorld"),
                addToGui: t("addToGui"),
                removeFromGui: t("removeFromGui"),
                getByUid: t("getByUid"),
                getByDom: t("getByDom"),
                broadcast: t("broadcast"),
                broadcastOn: t("broadcastOn"),
                broadcastEvent: t("broadcastEvent"),
                isConnected: Z(!1)
            }
        },
        pi = vi(),
        bi = function(t) {
            return V(t, function(t) {
                return o = n = "/*", r = (e = t).length - n.length, "" !== o && (e.length < o.length || e.substr(r, r + o.length) !== o) ? t : t.substring(0, t.length - "/*".length);
                var n, e, o, r
            })
        },
        yi = function(t, n) {
            var e = t.toString(),
                o = e.indexOf(")") + 1,
                r = e.indexOf("("),
                i = e.substring(r + 1, o - 1).split(/,\s*/);
            return t.toFunctionAnnotation = function() {
                return {
                    name: n,
                    parameters: bi(i)
                }
            }, t
        },
        xi = Ye("alloy-premade"),
        wi = function(t) {
            return zt(xi, t)
        },
        zi = function(o) {
            return t = function(t) {
                for (var n = [], e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
                return o.apply(undefined, [t.getApis()].concat([t].concat(n)))
            }, n = o.toString(), e = n.indexOf(")") + 1, r = n.indexOf("("), i = n.substring(r + 1, e - 1).split(/,\s*/), t.toFunctionAnnotation = function() {
                return {
                    name: "OVERRIDE",
                    parameters: bi(i.slice(1))
                }
            }, t;
            var t, n, e, r, i
        },
        Si = {
            init: function() {
                return ki({
                    readState: function() {
                        return "No State required"
                    }
                })
            }
        },
        ki = function(t) {
            return t
        },
        Ci = function(t, r) {
            var i = {};
            return $(t, function(t, o) {
                $(t, function(t, n) {
                    var e = xt(n, [])(i);
                    i[n] = e.concat([r(o, t)])
                })
            }), i
        },
        Oi = function(t) {
            return {
                classes: t.classes !== undefined ? t.classes : [],
                attributes: t.attributes !== undefined ? t.attributes : {},
                styles: t.styles !== undefined ? t.styles : {}
            }
        },
        Mi = function(t, n) {
            return e = v.apply(undefined, [t.handler].concat(n)), o = t.purpose(), {
                cHandler: e,
                purpose: Z(o)
            };
            var e, o
        },
        Hi = function(t) {
            return t.cHandler
        },
        Ei = function(t, n) {
            return {
                name: Z(t),
                handler: Z(n)
            }
        },
        Vi = function(t, n, e) {
            var o, r, i = Ke({}, e, (o = t, r = {}, T(n, function(t) {
                r[t.name()] = t.handlers(o)
            }), r));
            return Ci(i, Ei)
        },
        Ti = function(t) {
            var n, i = S(n = t) ? {
                can: Z(!0),
                abort: Z(!1),
                run: n
            } : n;
            return function(t, n) {
                for (var e = [], o = 2; o < arguments.length; o++) e[o - 2] = arguments[o];
                var r = [t, n].concat(e);
                i.abort.apply(undefined, r) ? n.stop() : i.can.apply(undefined, r) && i.run.apply(undefined, r)
            }
        },
        Ai = function(t, n, e) {
            var o, r, i = n[e];
            return i ? function(u, a, t, c) {
                var n = t.slice(0);
                try {
                    var e = n.sort(function(t, n) {
                        var e = t[a](),
                            o = n[a](),
                            r = c.indexOf(e),
                            i = c.indexOf(o);
                        if (-1 === r) throw new Error("The ordering for " + u + " does not have an entry for " + e + ".\nOrder specified: " + ko(c, null, 2));
                        if (-1 === i) throw new Error("The ordering for " + u + " does not have an entry for " + o + ".\nOrder specified: " + ko(c, null, 2));
                        return r < i ? -1 : i < r ? 1 : 0
                    });
                    return dt.value(e)
                } catch (o) {
                    return dt.error([o])
                }
            }("Event: " + e, "name", t, i).map(function(t) {
                var n = V(t, function(t) {
                    return t.handler()
                });
                return Mr(n)
            }) : (o = e, r = t, dt.error(["The event (" + o + ') has more than one behaviour that listens to it.\nWhen this occurs, you must specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that can trigger it are: ' + ko(V(r, function(t) {
                return t.name()
            }), null, 2)]))
        },
        Bi = function(t, i) {
            var n = ot(t, function(o, r) {
                return (1 === o.length ? dt.value(o[0].handler()) : Ai(o, i, r)).map(function(t) {
                    var n = Ti(t),
                        e = 1 < o.length ? A(i, function(n) {
                            return M(o, function(t) {
                                return t.name() === n
                            })
                        }).join(" > ") : o[0].name();
                    return zt(r, {
                        handler: n,
                        purpose: Z(e)
                    })
                })
            });
            return kt(n, {})
        },
        Di = function(t) {
            return Go("custom.definition", Bo([Ro("dom", "dom", no(), Bo([or("tag"), vr("styles", {}), vr("classes", []), vr("attributes", {}), fr("value"), fr("innerHtml")])), or("components"), or("uid"), vr("events", {}), vr("apis", {}), Ro("eventOrder", "eventOrder", (n = {
                "alloy.execute": ["disabling", "alloy.base.behaviour", "toggling", "typeaheadevents"],
                "alloy.focus": ["alloy.base.behaviour", "focusing", "keying"],
                "alloy.system.init": ["alloy.base.behaviour", "disabling", "toggling", "representing"],
                input: ["alloy.base.behaviour", "representing", "streaming", "invalidating"],
                "alloy.system.detached": ["alloy.base.behaviour", "representing", "item-events", "tooltipping"],
                mousedown: ["focusing", "alloy.base.behaviour", "item-type-events"],
                mouseover: ["item-type-events", "tooltipping"]
            }, Ze.mergeWithThunk(Z(n))), Jo()), fr("domModification")]), t);
            var n
        },
        _i = function(t, n) {
            var e = Te(t, n);
            return e === undefined || "" === e ? [] : e.split(" ")
        },
        Fi = function(t) {
            return t.dom().classList !== undefined
        },
        Ii = function(t, n) {
            return r = n, i = _i(e = t, o = "class").concat([r]), Ee(e, o, i.join(" ")), !0;
            var e, o, r, i
        },
        Li = function(t, n) {
            return r = n, 0 < (i = A(_i(e = t, o = "class"), function(t) {
                return t !== r
            })).length ? Ee(e, o, i.join(" ")) : Be(e, o), !1;
            var e, o, r, i
        },
        Ri = function(t, n) {
            Fi(t) ? t.dom().classList.add(n) : Ii(t, n)
        },
        Ni = function(t) {
            0 === (Fi(t) ? t.dom().classList : _i(t, "class")).length && Be(t, "class")
        },
        Pi = function(t, n) {
            Fi(t) ? t.dom().classList.remove(n) : Li(t, n), Ni(t)
        },
        ji = function(t, n) {
            return Fi(t) && t.dom().classList.contains(n)
        },
        Ui = function(n, t) {
            T(t, function(t) {
                Ri(n, t)
            })
        },
        Wi = function(n, t) {
            T(t, function(t) {
                Pi(n, t)
            })
        },
        Gi = function(t) {
            return t.style !== undefined
        },
        Xi = function(t, n, e) {
            if (!x(e)) throw console.error("Invalid call to CSS.set. Property ", n, ":: Value ", e, ":: Element ", t), new Error("CSS value must be a string: " + e);
            Gi(t) && t.style.setProperty(n, e)
        },
        Yi = function(t, n) {
            Gi(t) && t.style.removeProperty(n)
        },
        qi = function(t, n, e) {
            var o = t.dom();
            Xi(o, n, e)
        },
        Ki = function(t, n) {
            var e = t.dom();
            $(n, function(t, n) {
                Xi(e, n, t)
            })
        },
        Ji = function(t, n) {
            var e = t.dom(),
                o = window.getComputedStyle(e).getPropertyValue(n),
                r = "" !== o || Lr(t) ? o : $i(e, n);
            return null === r ? undefined : r
        },
        $i = function(t, n) {
            return Gi(t) ? t.style.getPropertyValue(n) : ""
        },
        Qi = function(t, n) {
            var e = t.dom(),
                o = $i(e, n);
            return tt.from(o).filter(function(t) {
                return 0 < t.length
            })
        },
        Zi = function(t, n, e) {
            var o = Gn.fromTag(t);
            return qi(o, n, e), Qi(o, n).isSome()
        },
        tu = function(t, n) {
            var e = t.dom();
            Yi(e, n), Ae(t, "style") && "" === Te(t, "style").replace(/^\s+|\s+$/g, "") && Be(t, "style")
        },
        nu = function(t) {
            return t.dom().offsetWidth
        },
        eu = function(t) {
            return t.dom().value
        },
        ou = function(t, n) {
            if (n === undefined) throw new Error("Value.set was undefined");
            t.dom().value = n
        },
        ru = function(t, n) {
            return e = t, r = V(o = n, function(t) {
                return gr(t.name(), [or("config"), vr("state", Si)])
            }), i = Go("component.behaviours", Bo(r), e.behaviours).fold(function(t) {
                throw new Error(qo(t) + "\nComplete spec:\n" + ko(e, null, 2))
            }, function(t) {
                return t
            }), {
                list: o,
                data: nt(i, function(t) {
                    var n = t.map(function(t) {
                        return {
                            config: t.config,
                            state: t.state.init(t.config)
                        }
                    });
                    return function() {
                        return n
                    }
                })
            };
            var e, o, r, i
        },
        iu = function(t) {
            var n, e, o, r = (n = t, e = xt("behaviours", {})(n), o = A(K(e), function(t) {
                return e[t] !== undefined
            }), V(o, function(t) {
                return e[t].me
            }));
            return ru(t, r)
        },
        uu = function(t, n, e) {
            var o, r, i, u = Ke({}, (o = t).dom, {
                    uid: o.uid,
                    domChildren: V(o.components, function(t) {
                        return t.element()
                    })
                }),
                a = t.domModification.fold(function() {
                    return Oi({})
                }, Oi),
                c = {
                    "alloy.base.modification": a
                },
                s = 0 < n.length ? function(n, t, e, o) {
                    var r = Ke({}, t);
                    T(e, function(t) {
                        r[t.name()] = t.exhibit(n, o)
                    });
                    var i = Ci(r, function(t, n) {
                            return {
                                name: t,
                                modification: n
                            }
                        }),
                        u = function(t) {
                            return B(t, function(t, n) {
                                return Ke({}, n.modification, t)
                            }, {})
                        },
                        a = B(i.classes, function(t, n) {
                            return n.modification.concat(t)
                        }, []),
                        c = u(i.attributes),
                        s = u(i.styles);
                    return Oi({
                        classes: a,
                        attributes: c,
                        styles: s
                    })
                }(e, c, n, u) : a;
            return i = s, Ke({}, r = u, {
                attributes: Ke({}, r.attributes, i.attributes),
                styles: Ke({}, r.styles, i.styles),
                classes: r.classes.concat(i.classes)
            })
        },
        au = function(t, n, e) {
            var o, r, i, u, a, c, s = {
                "alloy.base.behaviour": (o = t, o.events)
            };
            return (r = e, i = t.eventOrder, u = n, a = s, c = Vi(r, u, a), Bi(c, i)).getOrDie()
        },
        cu = function(e) {
            var t = function() {
                    return l
                },
                o = Ot(pi),
                n = Xo(Di(e)),
                r = iu(e),
                i = r.list,
                u = r.data,
                a = function(t) {
                    var n = Gn.fromTag(t.tag);
                    Ve(n, t.attributes), Ui(n, t.classes), Ki(n, t.styles), t.innerHtml.each(function(t) {
                        return ze(n, t)
                    });
                    var e = t.domChildren;
                    return be(n, e), t.value.each(function(t) {
                        ou(n, t)
                    }), t.uid, di(n, t.uid), n
                }(uu(n, i, u)),
                c = au(n, i, u),
                s = Ot(n.components),
                l = {
                    getSystem: o.get,
                    config: function(t) {
                        var n = u;
                        return (S(n[t.name()]) ? n[t.name()] : function() {
                            throw new Error("Could not find " + t.name() + " in " + ko(e, null, 2))
                        })()
                    },
                    hasConfigured: function(t) {
                        return S(u[t.name()])
                    },
                    spec: Z(e),
                    readState: function(t) {
                        return u[t]().map(function(t) {
                            return t.state.readState()
                        }).getOr("not enabled")
                    },
                    getApis: function() {
                        return n.apis
                    },
                    connect: function(t) {
                        o.set(t)
                    },
                    disconnect: function() {
                        o.set(vi(t))
                    },
                    element: Z(a),
                    syncComponents: function() {
                        var t = de(a),
                            n = N(t, function(t) {
                                return o.get().getByDom(t).fold(function() {
                                    return []
                                }, function(t) {
                                    return [t]
                                })
                            });
                        s.set(n)
                    },
                    components: s.get,
                    events: Z(c)
                };
            return l
        },
        su = function(t) {
            var n, e, o = gi(t),
                r = o.events,
                i = Je(o, ["events"]),
                u = (n = i, e = xt("components", [])(n), V(e, mu)),
                a = Ke({}, i, {
                    events: Ke({}, ai, r),
                    components: u
                });
            return dt.value(cu(a))
        },
        lu = function(t) {
            var n = Gn.fromText(t);
            return fu({
                element: n
            })
        },
        fu = function(t) {
            var n = Yo("external.component", Ao([or("element"), fr("uid")]), t),
                e = Ot(vi());
            n.uid.each(function(t) {
                di(n.element, t)
            });
            var o = {
                getSystem: e.get,
                config: tt.none,
                hasConfigured: Z(!1),
                connect: function(t) {
                    e.set(t)
                },
                disconnect: function() {
                    e.set(vi(function() {
                        return o
                    }))
                },
                getApis: function() {
                    return {}
                },
                element: Z(n.element),
                spec: Z(t),
                readState: Z("No state"),
                syncComponents: Q,
                components: Z([]),
                events: Z({})
            };
            return wi(o)
        },
        du = hi,
        mu = function(n) {
            return (t = n, wt(t, xi)).fold(function() {
                var t = n.hasOwnProperty("uid") ? n : Ke({
                    uid: du("")
                }, n);
                return su(t).getOrDie()
            }, function(t) {
                return t
            });
            var t
        },
        hu = wi,
        gu = function(t, n, e) {
            return Pr(t, function(t) {
                return re(t, n)
            }, e)
        },
        vu = function(t, n) {
            return e = n, r = (o = t) === undefined ? document : o.dom(), ie(r) ? tt.none() : tt.from(r.querySelector(e)).map(Gn.fromDom);
            var e, o, r
        },
        pu = function(t, n, e) {
            return Dr(re, gu, t, n, e)
        },
        bu = function(n, t) {
            return (e = t, jr(e, function(t) {
                if (!Ce(t)) return !1;
                var n = Te(t, "id");
                return n !== undefined && -1 < n.indexOf("aria-owns")
            }).bind(function(t) {
                var n = Te(t, "id"),
                    e = ce(t);
                return vu(e, '[aria-owns="' + n + '"]')
            })).exists(function(t) {
                return yu(n, t)
            });
            var e
        },
        yu = function(n, t) {
            return e = t, r = Z(!(o = function(t) {
                return ae(t, n.element())
            })), jr(e, o, r).isSome() || bu(n, t);
            var e, o, r
        },
        xu = Z([or("menu"), or("selectedMenu")]),
        wu = Z([or("item"), or("selectedItem")]),
        zu = (Z(Bo(wu().concat(xu()))), Z(Bo(wu()))),
        Su = cr("initSize", [or("numColumns"), or("numRows")]),
        ku = function() {
            return cr("markers", [or("backgroundMenu")].concat(xu()).concat(wu()))
        },
        Cu = function(t) {
            return cr("markers", V(t, or))
        },
        Ou = function(t, n, e) {
            return function() {
                var t = new Error;
                if (t.stack !== undefined) {
                    var n = t.stack.split("\n");
                    _(n, function(n) {
                        return 0 < n.indexOf("alloy") && !H(Pe, function(t) {
                            return -1 < n.indexOf(t)
                        })
                    }).getOr(Ie)
                }
            }(), Ro(n, n, e, Uo(function(e) {
                return dt.value(function() {
                    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                    return e.apply(undefined, t)
                })
            }))
        },
        Mu = function(t) {
            return Ou(0, t, to(Q))
        },
        Hu = function(t) {
            return Ou(0, t, to(tt.none))
        },
        Eu = function(t) {
            return Ou(0, t, no())
        },
        Vu = function(t) {
            return Ou(0, t, no())
        },
        Tu = function(t, n) {
            return kr(t, Z(n))
        },
        Au = function(t) {
            return kr(t, d)
        },
        Bu = Z(Su),
        Du = function(e, o, r) {
            return ri(function(t, n) {
                r(t, e, o)
            })
        },
        _u = function(t, n, e, o, r, i) {
            var u, a, c = Ao(t),
                s = gr(n, [(u = "config", a = t, Ro(u, u, eo(), Ao(a)))]);
            return Lu(c, s, n, e, o, r, i)
        },
        Fu = function(r, i, u) {
            var t, n, e, o, a, c;
            return t = function(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                var o = [e].concat(t);
                return e.config({
                    name: Z(r)
                }).fold(function() {
                    throw new Error("We could not find any behaviour configuration for: " + r + ". Using API: " + u)
                }, function(t) {
                    var n = Array.prototype.slice.call(o, 1);
                    return i.apply(undefined, [e, t.config, t.state].concat(n))
                })
            }, n = u, e = i.toString(), o = e.indexOf(")") + 1, a = e.indexOf("("), c = e.substring(a + 1, o - 1).split(/,\s*/), t.toFunctionAnnotation = function() {
                return {
                    name: n,
                    parameters: bi(c.slice(0, 1).concat(c.slice(3)))
                }
            }, t
        },
        Iu = function(t) {
            return {
                key: t,
                value: undefined
            }
        },
        Lu = function(e, t, o, r, n, i, u) {
            var a = function(t) {
                    return Ct(t, o) ? t[o]() : tt.none()
                },
                c = nt(n, function(t, n) {
                    return Fu(o, t, n)
                }),
                s = nt(i, function(t, n) {
                    return yi(t, n)
                }),
                l = Ke({}, s, c, {
                    revoke: v(Iu, o),
                    config: function(t) {
                        var n = Yo(o + "-config", e, t);
                        return {
                            key: o,
                            value: {
                                config: n,
                                me: l,
                                configAsRaw: Xt(function() {
                                    return Yo(o + "-config", e, t)
                                }),
                                initialConfig: t,
                                state: u
                            }
                        }
                    },
                    schema: function() {
                        return t
                    },
                    exhibit: function(t, e) {
                        return a(t).bind(function(n) {
                            return wt(r, "exhibit").map(function(t) {
                                return t(e, n.config, n.state)
                            })
                        }).getOr(Oi({}))
                    },
                    name: function() {
                        return o
                    },
                    handlers: function(t) {
                        return a(t).map(function(t) {
                            return xt("events", function(t, n) {
                                return {}
                            })(r)(t.config, t.state)
                        }).getOr({})
                    }
                });
            return l
        },
        Ru = function(t) {
            return St(t)
        },
        Nu = Ao([or("fields"), or("name"), vr("active", {}), vr("apis", {}), vr("state", Si), vr("extra", {})]),
        Pu = function(t) {
            var n = Yo("Creating behaviour: " + t.name, Nu, t);
            return _u(n.fields, n.name, n.active, n.apis, n.extra, n.state)
        },
        ju = Ao([or("branchKey"), or("branches"), or("name"), vr("active", {}), vr("apis", {}), vr("state", Si), vr("extra", {})]),
        Uu = function(t) {
            var n, e, o, r, i, u, a, c, s = Yo("Creating behaviour: " + t.name, ju, t);
            return n = Ko(s.branchKey, s.branches), e = s.name, o = s.active, r = s.apis, i = s.extra, u = s.state, c = gr(e, [dr("config", a = n)]), Lu(a, c, e, o, r, i, u)
        },
        Wu = Z(undefined),
        Gu = /* */ Object.freeze({
            events: function(a) {
                return Gr([qr(kn(), function(r, i) {
                    var t, n, u = a.channels,
                        e = K(u),
                        o = (t = e, (n = i).universal() ? t : A(t, function(t) {
                            return M(n.channels(), t)
                        }));
                    T(o, function(t) {
                        var n = u[t],
                            e = n.schema,
                            o = Yo("channel[" + t + "] data\nReceiver: " + Fe(r.element()), e, i.data());
                        n.onReceive(r, o)
                    })
                })])
            }
        }),
        Xu = [rr("channels", Wo(dt.value, Ao([Eu("onReceive"), vr("schema", Jo())])))],
        Yu = Pu({
            fields: Xu,
            name: "receiving",
            active: Gu
        }),
        qu = /* */ Object.freeze({
            exhibit: function(t, n) {
                return Oi({
                    classes: [],
                    styles: n.useFixed ? {} : {
                        position: "relative"
                    }
                })
            }
        }),
        Ku = function(e, o) {
            return {
                left: Z(e),
                top: Z(o),
                translate: function(t, n) {
                    return Ku(e + t, o + n)
                }
            }
        },
        Ju = Ku,
        $u = function(t, n) {
            return t !== undefined ? t : n !== undefined ? n : 0
        },
        Qu = function(t) {
            var n, e, o = t.dom().ownerDocument,
                r = o.body,
                i = (n = Gn.fromDom(o), (e = n.dom()) === e.window && n instanceof Window ? n : Me(n) ? e.defaultView || e.parentWindow : null),
                u = o.documentElement,
                a = $u(i.pageYOffset, u.scrollTop),
                c = $u(i.pageXOffset, u.scrollLeft),
                s = $u(u.clientTop, r.clientTop),
                l = $u(u.clientLeft, r.clientLeft);
            return Zu(t).translate(c - l, a - s)
        },
        Zu = function(t) {
            var n, e, o, r = t.dom(),
                i = r.ownerDocument,
                u = i.body,
                a = Gn.fromDom(i.documentElement);
            return u === r ? Ju(u.offsetLeft, u.offsetTop) : (n = t, e = a || Gn.fromDom(document.documentElement), Pr(n, v(ae, e)).isSome() ? (o = r.getBoundingClientRect(), Ju(o.left, o.top)) : Ju(0, 0))
        },
        ta = (yn.detect().browser.isSafari(), function(t) {
            var n = t !== undefined ? t.dom() : document,
                e = n.body.scrollLeft || n.documentElement.scrollLeft,
                o = n.body.scrollTop || n.documentElement.scrollTop;
            return Ju(e, o)
        });

    function na(o, r) {
        var t = function(t) {
                var n = r(t);
                if (n <= 0 || null === n) {
                    var e = Ji(t, o);
                    return parseFloat(e) || 0
                }
                return n
            },
            i = function(r, t) {
                return D(t, function(t, n) {
                    var e = Ji(r, n),
                        o = e === undefined ? 0 : parseInt(e, 10);
                    return isNaN(o) ? t : t + o
                }, 0)
            };
        return {
            set: function(t, n) {
                if (!k(n) && !n.match(/^[0-9]+$/)) throw new Error(o + ".set accepts only positive integer values. Value was " + n);
                var e = t.dom();
                Gi(e) && (e.style[o] = n + "px")
            },
            get: t,
            getOuter: t,
            aggregate: i,
            max: function(t, n, e) {
                var o = i(t, e);
                return o < n ? n - o : 0
            }
        }
    }
    var ea, oa, ra = na("width", function(t) {
            return t.dom().offsetWidth
        }),
        ia = function(t) {
            return ra.get(t)
        },
        ua = function(t) {
            return ra.getOuter(t)
        },
        aa = na("height", function(t) {
            var n = t.dom();
            return Lr(t) ? n.getBoundingClientRect().height : n.offsetHeight
        }),
        ca = function(t) {
            return aa.get(t)
        },
        sa = function(t) {
            return aa.getOuter(t)
        },
        la = Kn(["x", "y", "width", "height", "maxHeight", "direction", "classes", "label", "candidateYforTest"], []),
        fa = Xn("position", "left", "top", "right", "bottom"),
        da = mt([{
            southeast: []
        }, {
            southwest: []
        }, {
            northeast: []
        }, {
            northwest: []
        }, {
            south: []
        }, {
            north: []
        }, {
            east: []
        }, {
            west: []
        }]),
        ma = da.southeast,
        ha = da.southwest,
        ga = da.northeast,
        va = da.northwest,
        pa = da.south,
        ba = da.north,
        ya = da.east,
        xa = da.west,
        wa = Xn("point", "width", "height"),
        za = Xn("x", "y", "width", "height"),
        Sa = function(t, n, e, o) {
            return {
                x: Z(t),
                y: Z(n),
                width: Z(e),
                height: Z(o),
                right: Z(t + e),
                bottom: Z(n + o)
            }
        },
        ka = function(t) {
            var n = Qu(t),
                e = ua(t),
                o = sa(t);
            return Sa(n.left(), n.top(), e, o)
        },
        Ca = function(o, t) {
            return o.view(t).fold(Z([]), function(t) {
                var n = o.owner(t),
                    e = Ca(o, n);
                return [t].concat(e)
            })
        },
        Oa = /* */ Object.freeze({
            view: function(t) {
                return (t.dom() === document ? tt.none() : tt.from(t.dom().defaultView.frameElement)).map(Gn.fromDom)
            },
            owner: function(t) {
                return ce(t)
            }
        }),
        Ma = function(o) {
            var t, n, e, r, i = Gn.fromDom(document),
                u = ta(i);
            return (t = o, e = (n = Oa).owner(t), r = Ca(n, e), tt.some(r)).fold(v(Qu, o), function(t) {
                var n = Zu(o),
                    e = B(t, function(t, n) {
                        var e = Zu(n);
                        return {
                            left: t.left + e.left(),
                            top: t.top + e.top()
                        }
                    }, {
                        left: 0,
                        top: 0
                    });
                return Ju(e.left + n.left() + u.left(), e.top + n.top() + u.top())
            })
        },
        Ha = function() {
            var t = window.innerWidth,
                n = window.innerHeight,
                e = Gn.fromDom(document),
                o = ta(e);
            return Sa(o.left(), o.top(), t, n)
        },
        Ea = mt([{
            none: []
        }, {
            relative: ["x", "y", "width", "height"]
        }, {
            fixed: ["x", "y", "width", "height"]
        }]),
        Va = function(t, n, e, o, r, i) {
            var u, a, c, s, l, f, d, m, h, g = n.x() - e,
                v = n.y() - o,
                p = r - (g + n.width()),
                b = i - (v + n.height()),
                y = tt.some(g),
                x = tt.some(v),
                w = tt.some(p),
                z = tt.some(b),
                S = tt.none();
            return u = n.direction(), a = function() {
                return fa(t, y, x, S, S)
            }, c = function() {
                return fa(t, S, x, w, S)
            }, s = function() {
                return fa(t, y, S, S, z)
            }, l = function() {
                return fa(t, S, S, w, z)
            }, f = function() {
                return fa(t, y, x, S, S)
            }, d = function() {
                return fa(t, y, S, S, z)
            }, m = function() {
                return fa(t, y, x, S, S)
            }, h = function() {
                return fa(t, S, x, w, S)
            }, u.fold(a, c, s, l, f, d, m, h)
        },
        Ta = function(t, n) {
            var e = v(Ma, n),
                o = t.fold(e, e, function() {
                    var t = ta();
                    return Ma(n).translate(-t.left(), -t.top())
                }),
                r = ua(n),
                i = sa(n);
            return Sa(o.left(), o.top(), r, i)
        },
        Aa = Ea.relative,
        Ba = Ea.fixed,
        Da = Xn("anchorBox", "origin"),
        _a = mt([{
            fit: ["reposition"]
        }, {
            nofit: ["reposition", "deltaW", "deltaH"]
        }]),
        Fa = function(t, I, L, R, N) {
            var P = L.width(),
                j = L.height(),
                o = function(t, o, r, i) {
                    var n, e, u, a, c, s, l, f, d, m, h, g, v, p, b, y, x, w, z, S, k, C, O, M, H, E, V, T, A, B, D, _, F = t(I, L, R);
                    return (e = P, u = j, a = N, d = (n = F).x(), m = n.y(), h = n.bubble().offset().left(), g = n.bubble().offset().top(), v = a.x(), p = a.y(), b = a.width(), y = a.height(), S = p <= (w = m + g), k = (z = v <= (x = d + h)) && S, C = x + e <= v + b && w + u <= p + y, O = z ? Math.min(e, v + b - x) : Math.abs(v - (x + e)), M = S ? Math.min(u, p + y - w) : Math.abs(p - (w + u)), H = a.x() + a.width(), E = Math.max(a.x(), x), V = Math.min(E, H), A = Z((T = S ? w : w + (u - M)) + M - p), B = Z(p + y - T), c = n.direction(), l = s = B, f = A, D = c.fold(s, s, f, f, s, f, l, l), _ = la({
                        x: V,
                        y: T,
                        width: O,
                        height: M,
                        maxHeight: D,
                        direction: n.direction(),
                        classes: {
                            on: n.bubble().classesOn(),
                            off: n.bubble().classesOff()
                        },
                        label: n.label(),
                        candidateYforTest: w
                    }), k && C ? _a.fit(_) : _a.nofit(_, O, M)).fold(_a.fit, function(t, n, e) {
                        return i < e || r < n ? _a.nofit(t, n, e) : _a.nofit(o, r, i)
                    })
                };
            return D(t, function(t, n) {
                var e = v(o, n);
                return t.fold(_a.fit, e)
            }, _a.nofit(la({
                x: I.x(),
                y: I.y(),
                width: L.width(),
                height: L.height(),
                maxHeight: L.height(),
                direction: ma(),
                classes: [],
                label: "none",
                candidateYforTest: I.y()
            }), -1, -1)).fold(d, d)
        },
        Ia = function(t, n, e, o) {
            tu(n, "max-height");
            var r, i = {
                width: Z(ua(r = n)),
                height: Z(sa(r))
            };
            return Fa(o.preference(), t, i, e, o.bounds())
        },
        La = function(t, n, e) {
            var o, r, i, u, a, c = function(t) {
                    return t + "px"
                },
                s = (o = e.origin(), r = n, o.fold(function() {
                    return fa("absolute", tt.some(r.x()), tt.some(r.y()), tt.none(), tt.none())
                }, function(t, n, e, o) {
                    return Va("absolute", r, t, n, e, o)
                }, function(t, n, e, o) {
                    return Va("fixed", r, t, n, e, o)
                }));
            i = t, u = {
                position: tt.some(s.position()),
                left: s.left().map(c),
                top: s.top().map(c),
                right: s.right().map(c),
                bottom: s.bottom().map(c)
            }, a = i.dom(), $(u, function(t, n) {
                t.fold(function() {
                    Yi(a, n)
                }, function(t) {
                    Xi(a, n, t)
                })
            })
        },
        Ra = function(t, n) {
            var e, o, r;
            e = t, o = Math.floor(n), r = aa.max(e, o, ["margin-top", "border-top-width", "padding-top", "padding-bottom", "border-bottom-width", "margin-bottom"]), qi(e, "max-height", r + "px")
        },
        Na = Z(function(t, n) {
            Ra(t, n), Ki(t, {
                "overflow-x": "hidden",
                "overflow-y": "auto"
            })
        }),
        Pa = Z(function(t, n) {
            Ra(t, n)
        }),
        ja = Kn(["bounds", "origin", "preference", "maxHeightFunction"], []),
        Ua = function(t, n, e, o, r, i) {
            var u, a, c, s, l, f = (u = i, a = "maxHeightFunction", c = Na(), u[a] === undefined ? c : u[a]),
                d = t.anchorBox(),
                m = t.origin(),
                h = ja({
                    bounds: (s = m, l = r, l.fold(function() {
                        return s.fold(Ha, Ha, Sa)
                    }, function(t) {
                        return s.fold(t, t, Sa)
                    })),
                    origin: m,
                    preference: o,
                    maxHeightFunction: f
                });
            Wa(d, n, e, h)
        },
        Wa = function(t, n, e, o) {
            var r, i, u, a, c = Ia(t, n, e, o);
            La(n, c, o), r = n, i = c.classes(), Wi(r, i.off), Ui(r, i.on), u = n, a = c, o.maxHeightFunction()(u, a.maxHeight())
        },
        Ga = ["valignCentre", "alignLeft", "alignRight", "alignCentre", "top", "bottom", "left", "right"],
        Xa = function(t, n, e) {
            var r = function(t) {
                    return wt(e, t).getOr([])
                },
                o = function(t, n, e) {
                    var o = W(Ga, e);
                    return {
                        offset: function() {
                            return Ju(t, n)
                        },
                        classesOn: function() {
                            return N(e, r)
                        },
                        classesOff: function() {
                            return N(o, r)
                        }
                    }
                };
            return {
                southeast: function() {
                    return o(-t, n, ["top", "alignLeft"])
                },
                southwest: function() {
                    return o(t, n, ["top", "alignRight"])
                },
                south: function() {
                    return o(-t / 2, n, ["top", "alignCentre"])
                },
                northeast: function() {
                    return o(-t, -n, ["bottom", "alignLeft"])
                },
                northwest: function() {
                    return o(t, -n, ["bottom", "alignRight"])
                },
                north: function() {
                    return o(-t / 2, -n, ["bottom", "alignCentre"])
                },
                east: function() {
                    return o(t, -n / 2, ["valignCentre", "left"])
                },
                west: function() {
                    return o(-t, -n / 2, ["valignCentre", "right"])
                }
            }
        },
        Ya = function() {
            return Xa(0, 0, {})
        },
        qa = Xn("x", "y", "bubble", "direction", "label"),
        Ka = function(t) {
            return t.x()
        },
        Ja = function(t, n) {
            return t.x() + t.width() / 2 - n.width() / 2
        },
        $a = function(t, n) {
            return t.x() + t.width() - n.width()
        },
        Qa = function(t, n) {
            return t.y() - n.height()
        },
        Za = function(t) {
            return t.y() + t.height()
        },
        tc = function(t, n) {
            return t.y() + t.height() / 2 - n.height() / 2
        },
        nc = function(t, n, e) {
            return qa(Ka(t), Za(t), e.southeast(), ma(), "layout-se")
        },
        ec = function(t, n, e) {
            return qa($a(t, n), Za(t), e.southwest(), ha(), "layout-sw")
        },
        oc = function(t, n, e) {
            return qa(Ka(t), Qa(t, n), e.northeast(), ga(), "layout-ne")
        },
        rc = function(t, n, e) {
            return qa($a(t, n), Qa(t, n), e.northwest(), va(), "layout-nw")
        },
        ic = function(t, n, e) {
            return qa(Ja(t, n), Qa(t, n), e.north(), ba(), "layout-n")
        },
        uc = function(t, n, e) {
            return qa(Ja(t, n), Za(t), e.south(), pa(), "layout-s")
        },
        ac = function(t, n, e) {
            return qa((o = t).x() + o.width(), tc(t, n), e.east(), ya(), "layout-e");
            var o
        },
        cc = function(t, n, e) {
            return qa((o = n, t.x() - o.width()), tc(t, n), e.west(), xa(), "layout-w");
            var o
        },
        sc = function() {
            return [nc, ec, oc, rc, uc, ic, ac, cc]
        },
        lc = function() {
            return [ec, nc, rc, oc, uc, ic, ac, cc]
        },
        fc = function(t) {
            return t
        },
        dc = function(n, e) {
            return function(t) {
                return "rtl" === mc(t) ? e : n
            }
        },
        mc = function(t) {
            return "rtl" === Ji(t, "direction") ? "rtl" : "ltr"
        },
        hc = function() {
            return gr("layouts", [or("onLtr"), or("onRtl")])
        },
        gc = function(n, t, e, o) {
            var r = t.layouts.map(function(t) {
                    return t.onLtr(n)
                }).getOr(e),
                i = t.layouts.map(function(t) {
                    return t.onRtl(n)
                }).getOr(o);
            return dc(r, i)(n)
        },
        vc = [or("hotspot"), fr("bubble"), hc(), Tu("placement", function(t, n, e) {
            var o = n.hotspot,
                r = Ta(e, o.element()),
                i = gc(t.element(), n, sc(), lc());
            return tt.some(fc({
                anchorBox: r,
                bubble: n.bubble.getOr(Ya()),
                overrides: {},
                layouts: i,
                placer: tt.none()
            }))
        })],
        pc = [or("x"), or("y"), vr("height", 0), vr("width", 0), vr("bubble", Ya()), hc(), Tu("placement", function(t, n, e) {
            var o = Sa(n.x, n.y, n.width, n.height),
                r = gc(t.element(), n, sc(), lc());
            return tt.some(fc({
                anchorBox: o,
                bubble: n.bubble,
                overrides: {},
                layouts: r,
                placer: tt.none()
            }))
        })],
        bc = (mt([{
            before: ["element"]
        }, {
            on: ["element", "offset"]
        }, {
            after: ["element"]
        }]), mt([{
            domRange: ["rng"]
        }, {
            relative: ["startSitu", "finishSitu"]
        }, {
            exact: ["start", "soffset", "finish", "foffset"]
        }])),
        yc = Xn("start", "soffset", "finish", "foffset"),
        xc = (bc.domRange, bc.relative, bc.exact),
        wc = function(t, n, e, o) {
            var r, i, u, a, c, s = (i = n, u = e, a = o, (c = ce(r = t).dom().createRange()).setStart(r.dom(), i), c.setEnd(u.dom(), a), c),
                l = ae(t, e) && n === o;
            return s.collapsed && !l
        },
        zc = function(t, n, e) {
            var o, r, i = t.document.createRange();
            return o = i, n.fold(function(t) {
                o.setStartBefore(t.dom())
            }, function(t, n) {
                o.setStart(t.dom(), n)
            }, function(t) {
                o.setStartAfter(t.dom())
            }), r = i, e.fold(function(t) {
                r.setEndBefore(t.dom())
            }, function(t, n) {
                r.setEnd(t.dom(), n)
            }, function(t) {
                r.setEndAfter(t.dom())
            }), i
        },
        Sc = function(t, n, e, o, r) {
            var i = t.document.createRange();
            return i.setStart(n.dom(), e), i.setEnd(o.dom(), r), i
        },
        kc = function(t) {
            return {
                left: Z(t.left),
                top: Z(t.top),
                right: Z(t.right),
                bottom: Z(t.bottom),
                width: Z(t.width),
                height: Z(t.height)
            }
        },
        Cc = mt([{
            ltr: ["start", "soffset", "finish", "foffset"]
        }, {
            rtl: ["start", "soffset", "finish", "foffset"]
        }]),
        Oc = function(t, n, e) {
            return n(Gn.fromDom(e.startContainer), e.startOffset, Gn.fromDom(e.endContainer), e.endOffset)
        },
        Mc = function(t, n) {
            var r, e, o, i = (r = t, n.match({
                domRange: function(t) {
                    return {
                        ltr: Z(t),
                        rtl: tt.none
                    }
                },
                relative: function(t, n) {
                    return {
                        ltr: Xt(function() {
                            return zc(r, t, n)
                        }),
                        rtl: Xt(function() {
                            return tt.some(zc(r, n, t))
                        })
                    }
                },
                exact: function(t, n, e, o) {
                    return {
                        ltr: Xt(function() {
                            return Sc(r, t, n, e, o)
                        }),
                        rtl: Xt(function() {
                            return tt.some(Sc(r, e, o, t, n))
                        })
                    }
                }
            }));
            return (o = (e = i).ltr()).collapsed ? e.rtl().filter(function(t) {
                return !1 === t.collapsed
            }).map(function(t) {
                return Cc.rtl(Gn.fromDom(t.endContainer), t.endOffset, Gn.fromDom(t.startContainer), t.startOffset)
            }).getOrThunk(function() {
                return Oc(0, Cc.ltr, o)
            }) : Oc(0, Cc.ltr, o)
        },
        Hc = function wE(e, o) {
            var r = function(t) {
                    return e(t) ? tt.from(t.dom().nodeValue) : tt.none()
                },
                t = yn.detect().browser,
                n = t.isIE() && 10 === t.version.major ? function(t) {
                    try {
                        return r(t)
                    } catch (n) {
                        return tt.none()
                    }
                } : r;
            return {
                get: function(t) {
                    if (!e(t)) throw new Error("Can only get " + o + " value of a " + o + " node");
                    return n(t).getOr("")
                },
                getOption: n,
                set: function(t, n) {
                    if (!e(t)) throw new Error("Can only set raw " + o + " value of a " + o + " node");
                    t.dom().nodeValue = n
                }
            }
        }(Oe, "text"),
        Ec = function(t) {
            return Hc.get(t)
        },
        Vc = (document.caretPositionFromPoint || document.caretRangeFromPoint, function(t, n) {
            return ue(n, t)
        }),
        Tc = function(t) {
            var n = Gn.fromDom(t.anchorNode),
                e = Gn.fromDom(t.focusNode);
            return wc(n, t.anchorOffset, e, t.focusOffset) ? tt.some(yc(Gn.fromDom(t.anchorNode), t.anchorOffset, Gn.fromDom(t.focusNode), t.focusOffset)) : function(t) {
                if (0 < t.rangeCount) {
                    var n = t.getRangeAt(0),
                        e = t.getRangeAt(t.rangeCount - 1);
                    return tt.some(yc(Gn.fromDom(n.startContainer), n.startOffset, Gn.fromDom(e.endContainer), e.endOffset))
                }
                return tt.none()
            }(t)
        },
        Ac = function(t, n) {
            var i, e, o, r, u = Mc(i = t, n).match({
                ltr: function(t, n, e, o) {
                    var r = i.document.createRange();
                    return r.setStart(t.dom(), n), r.setEnd(e.dom(), o), r
                },
                rtl: function(t, n, e, o) {
                    var r = i.document.createRange();
                    return r.setStart(e.dom(), o), r.setEnd(t.dom(), n), r
                }
            });
            return o = (e = u).getClientRects(), 0 < (r = 0 < o.length ? o[0] : e.getBoundingClientRect()).width || 0 < r.height ? tt.some(r).map(kc) : tt.none()
        },
        Bc = Xn("element", "offset"),
        Dc = mt([{
            screen: ["point"]
        }, {
            absolute: ["point", "scrollLeft", "scrollTop"]
        }]),
        _c = function(t) {
            return t.fold(function(t) {
                return t
            }, function(t, n, e) {
                return t.translate(-n, -e)
            })
        },
        Fc = function(t) {
            return t.fold(function(t) {
                return t
            }, function(t, n, e) {
                return t
            })
        },
        Ic = function(t) {
            return D(t, function(t, n) {
                return t.translate(n.left(), n.top())
            }, Ju(0, 0))
        },
        Lc = function(t) {
            var n = V(t, Fc);
            return Ic(n)
        },
        Rc = Dc.screen,
        Nc = Dc.absolute,
        Pc = function(t, n, e) {
            var o, r, i, u = ce(t.element()),
                a = ta(u),
                c = (o = t, r = e, i = se(r.root).dom(), tt.from(i.frameElement).map(Gn.fromDom).filter(function(t) {
                    var n = ce(t),
                        e = ce(o.element());
                    return ae(n, e)
                }).map(Qu)).getOr(a);
            return Nc(c, a.left(), a.top())
        },
        jc = function(t, n, e, o) {
            var r = t,
                i = n,
                u = e,
                a = o;
            t < 0 && (r = 0, u = e + t), n < 0 && (i = 0, a = o + n);
            var c = Rc(Ju(r, i));
            return tt.some(wa(c, u, a))
        },
        Uc = function(t, c, s, l, f) {
            return t.map(function(t) {
                var n, e, o, r = [c, t.point()],
                    i = (n = function() {
                        return Lc(r)
                    }, e = function() {
                        return Lc(r)
                    }, o = function() {
                        return t = V(r, _c), Ic(t);
                        var t
                    }, l.fold(n, e, o)),
                    u = za(i.left(), i.top(), t.width(), t.height()),
                    a = gc(f, s, s.showAbove ? [oc, rc, nc, ec, ic, uc] : [nc, ec, oc, rc, uc, uc], s.showAbove ? [rc, oc, ec, nc, ic, uc] : [ec, nc, rc, oc, uc, ic]);
                return fc({
                    anchorBox: u,
                    bubble: s.bubble.getOr(Ya()),
                    overrides: s.overrides,
                    layouts: a,
                    placer: tt.none()
                })
            })
        },
        Wc = Xn("element", "offset"),
        Gc = function(t, n) {
            return Oe(t) ? Wc(t, n) : function(t, n) {
                var e = de(t);
                if (0 === e.length) return Bc(t, n);
                if (n < e.length) return Bc(e[n], 0);
                var o = e[e.length - 1],
                    r = Oe(o) ? Ec(o).length : de(o).length;
                return Bc(o, r)
            }(t, n)
        },
        Xc = function(n, t) {
            return t.getSelection.getOrThunk(function() {
                return function() {
                    return t = n, tt.from(t.getSelection()).filter(function(t) {
                        return 0 < t.rangeCount
                    }).bind(Tc);
                    var t
                }
            })().map(function(t) {
                var n = Gc(t.start(), t.soffset()),
                    e = Gc(t.finish(), t.foffset());
                return yc(n.element(), n.offset(), e.element(), e.offset())
            })
        },
        Yc = [fr("getSelection"), or("root"), fr("bubble"), hc(), vr("overrides", {}), vr("showAbove", !1), Tu("placement", function(t, n, e) {
            var o = se(n.root).dom(),
                r = Pc(t, 0, n),
                i = Xc(o, n).bind(function(t) {
                    var n;
                    return Ac(o, (n = t, bc.exact(n.start(), n.soffset(), n.finish(), n.foffset()))).orThunk(function() {
                        var n = Gn.fromText("\ufeff");
                        return he(t.start(), n), Ac(o, xc(n, 0, n, 1)).map(function(t) {
                            return xe(n), t
                        })
                    }).bind(function(t) {
                        return jc(t.left(), t.top(), t.width(), t.height())
                    })
                }),
                u = Xc(o, n).bind(function(t) {
                    return Ce(t.start()) ? tt.some(t.start()) : le(t.start())
                }).getOr(t.element());
            return Uc(i, r, n, e, u)
        })],
        qc = [or("node"), or("root"), fr("bubble"), hc(), vr("overrides", {}), vr("showAbove", !1), Tu("placement", function(r, i, u) {
            var a = Pc(r, 0, i);
            return i.node.bind(function(t) {
                var n = t.dom().getBoundingClientRect(),
                    e = jc(n.left, n.top, n.width, n.height),
                    o = i.node.getOr(r.element());
                return Uc(e, a, i, u, o)
            })
        })],
        Kc = function(t) {
            return t.x() + t.width()
        },
        Jc = function(t, n) {
            return t.x() - n.width()
        },
        $c = function(t, n) {
            return t.y() - n.height() + t.height()
        },
        Qc = function(t) {
            return t.y()
        },
        Zc = function(t, n, e) {
            return qa(Kc(t), Qc(t), e.southeast(), ma(), "link-layout-se")
        },
        ts = function(t, n, e) {
            return qa(Jc(t, n), Qc(t), e.southwest(), ha(), "link-layout-sw")
        },
        ns = function(t, n, e) {
            return qa(Kc(t), $c(t, n), e.northeast(), ga(), "link-layout-ne")
        },
        es = function(t, n, e) {
            return qa(Jc(t, n), $c(t, n), e.northwest(), va(), "link-layout-nw")
        },
        os = [or("item"), hc(), Tu("placement", function(t, n, e) {
            var o = Ta(e, n.item.element()),
                r = gc(t.element(), n, [Zc, ts, ns, es], [ts, Zc, es, ns]);
            return tt.some(fc({
                anchorBox: o,
                bubble: Ya(),
                overrides: {},
                layouts: r,
                placer: tt.none()
            }))
        })],
        rs = Ko("anchor", {
            selection: Yc,
            node: qc,
            hotspot: vc,
            submenu: os,
            makeshift: pc
        }),
        is = function(t, n, e, o, r) {
            var i, u = (i = e.anchorBox, Da(i, n));
            Ua(u, r.element(), e.bubble, e.layouts, o, e.overrides)
        },
        us = function(n, t, e, o, r, i) {
            var u = Yo("positioning anchor.info", rs, o);
            qi(r.element(), "position", "fixed");
            var a = Qi(r.element(), "visibility");
            qi(r.element(), "visibility", "hidden");
            var c, s, l, f = t.useFixed ? Ba(0, 0, window.innerWidth, window.innerHeight) : (s = Qu((c = n).element()), l = c.element().dom().getBoundingClientRect(), Aa(s.left(), s.top(), l.width, l.height)),
                d = u.placement,
                m = i.map(function(t) {
                    return function() {
                        return ka(t)
                    }
                }).or(t.getBounds);
            d(n, u, f).each(function(t) {
                t.placer.getOr(is)(n, f, t, m, r)
            }), a.fold(function() {
                tu(r.element(), "visibility")
            }, function(t) {
                qi(r.element(), "visibility", t)
            }), Qi(r.element(), "left").isNone() && Qi(r.element(), "top").isNone() && Qi(r.element(), "right").isNone() && Qi(r.element(), "bottom").isNone() && Qi(r.element(), "position").is("fixed") && tu(r.element(), "position")
        },
        as = /* */ Object.freeze({
            position: function(t, n, e, o, r) {
                var i = tt.none();
                us(t, n, e, o, r, i)
            },
            positionWithin: us,
            getMode: function(t, n, e) {
                return n.useFixed ? "fixed" : "absolute"
            }
        }),
        cs = [vr("useFixed", !1), fr("getBounds")],
        ss = Pu({
            fields: cs,
            name: "positioning",
            active: qu,
            apis: as
        }),
        ls = function(t) {
            Hr(t, Fn());
            var n = t.components();
            T(n, ls)
        },
        fs = function(t) {
            var n = t.components();
            T(n, fs), Hr(t, _n())
        },
        ds = function(t, n) {
            ms(t, n, pe)
        },
        ms = function(t, n, e) {
            t.getSystem().addToWorld(n), e(t.element(), n.element()), Lr(t.element()) && fs(n), t.syncComponents()
        },
        hs = function(t) {
            ls(t), xe(t.element()), t.getSystem().removeFromWorld(t)
        },
        gs = function(n) {
            var t = le(n.element()).bind(function(t) {
                return n.getSystem().getByDom(t).fold(tt.none, tt.some)
            });
            hs(n), t.each(function(t) {
                t.syncComponents()
            })
        },
        vs = function(t) {
            var n = t.components();
            T(n, hs), ye(t.element()), t.syncComponents()
        },
        ps = function(t, n) {
            bs(t, n, pe)
        },
        bs = function(t, n, e) {
            e(t, n.element());
            var o = de(n.element());
            T(o, function(t) {
                n.getByDom(t).each(fs)
            })
        },
        ys = function(n) {
            var t = de(n.element());
            T(t, function(t) {
                n.getByDom(t).each(ls)
            }), xe(n.element())
        },
        xs = function(t, n, e, o) {
            var r = function(n, t, e, o) {
                e.get().each(function(t) {
                    vs(n)
                });
                var r = t.getAttachPoint(n);
                ds(r, n);
                var i = n.getSystem().build(o);
                return ds(n, i), e.set(i), i
            }(t, n, e, o);
            return n.onOpen(t, r), r
        },
        ws = function(n, e, o) {
            o.get().each(function(t) {
                vs(n), gs(n), e.onClose(n, t), o.clear()
            })
        },
        zs = function(t, n, e) {
            return e.isOpen()
        },
        Ss = function(t, n, e) {
            var o, r, i, u, a = n.getAttachPoint(t);
            qi(t.element(), "position", ss.getMode(a)), o = t, r = "visibility", i = n.cloakVisibilityAttr, u = "hidden", Qi(o.element(), r).fold(function() {
                Be(o.element(), i)
            }, function(t) {
                Ee(o.element(), i, t)
            }), qi(o.element(), r, u)
        },
        ks = function(t, n, e) {
            var o;
            o = t.element(), H(["top", "left", "right", "bottom"], function(t) {
                    return Qi(o, t).isSome()
                }) || tu(t.element(), "position"),
                function(t, n, e) {
                    if (Ae(t.element(), e)) {
                        var o = Te(t.element(), e);
                        qi(t.element(), n, o)
                    } else tu(t.element(), n)
                }(t, "visibility", n.cloakVisibilityAttr)
        },
        Cs = /* */ Object.freeze({
            cloak: Ss,
            decloak: ks,
            open: xs,
            openWhileCloaked: function(t, n, e, o, r) {
                Ss(t, n, e), xs(t, n, e, o), r(), ks(t, n, e)
            },
            close: ws,
            isOpen: zs,
            isPartOf: function(n, e, t, o) {
                return zs(0, 0, t) && t.get().exists(function(t) {
                    return e.isPartOf(n, t, o)
                })
            },
            getState: function(t, n, e) {
                return e.get()
            }
        }),
        Os = /* */ Object.freeze({
            events: function(e, o) {
                return Gr([qr(Vn(), function(t, n) {
                    ws(t, e, o)
                })])
            }
        }),
        Ms = [Mu("onOpen"), Mu("onClose"), or("isPartOf"), or("getAttachPoint"), vr("cloakVisibilityAttr", "data-precloak-visibility")],
        Hs = Pu({
            fields: Ms,
            name: "sandboxing",
            active: Os,
            apis: Cs,
            state: /* */ Object.freeze({
                init: function() {
                    var n = Ot(tt.none()),
                        t = Z("not-implemented");
                    return ki({
                        readState: t,
                        isOpen: function() {
                            return n.get().isSome()
                        },
                        clear: function() {
                            n.set(tt.none())
                        },
                        set: function(t) {
                            n.set(tt.some(t))
                        },
                        get: function(t) {
                            return n.get()
                        }
                    })
                }
            })
        }),
        Es = Z("dismiss.popups"),
        Vs = Z("mouse.released"),
        Ts = Ao([vr("isExtraPart", Z(!1)), gr("fireEventInstead", [vr("event", In())])]),
        As = function(t) {
            var n = Bs(t);
            return Yu.config(n)
        },
        Bs = function(t) {
            var e = Yo("Dismissal", Ts, t);
            return {
                channels: zt(Es(), {
                    schema: Ao([or("target")]),
                    onReceive: function(n, t) {
                        Hs.isOpen(n) && (Hs.isPartOf(n, t.target) || e.isExtraPart(n, t.target) || e.fireEventInstead.fold(function() {
                            return Hs.close(n)
                        }, function(t) {
                            return Hr(n, t.event)
                        }))
                    }
                })
            }
        },
        Ds = function(o, t) {
            return Sr(o, {}, V(t, function(t) {
                return n = t.name(), e = "Cannot configure " + t.name() + " for " + o, Ro(n, n, eo(), To(function(t) {
                    return mo("The field: " + n + " is forbidden. " + e)
                }));
                var n, e
            }).concat([kr("dump", d)]))
        },
        _s = function(t) {
            return t.dump
        },
        Fs = function(t, n) {
            return Ke({}, t.dump, Ru(n))
        },
        Is = Ds,
        Ls = Fs,
        Rs = "placeholder",
        Ns = mt([{
            single: ["required", "valueThunk"]
        }, {
            multiple: ["required", "valueThunks"]
        }]),
        Ps = function(t, n, e, o) {
            return e.uiType === Rs ? (i = e, u = o, (r = t).exists(function(t) {
                return t !== i.owner
            }) ? Ns.single(!0, Z(i)) : wt(u, i.name).fold(function() {
                throw new Error("Unknown placeholder component: " + i.name + "\nKnown: [" + K(u) + "]\nNamespace: " + r.getOr("none") + "\nSpec: " + ko(i, null, 2))
            }, function(t) {
                return t.replace()
            })) : Ns.single(!1, Z(e));
            var r, i, u
        },
        js = function(i, u, a, c) {
            return Ps(i, 0, a, c).fold(function(t, n) {
                var e = n(u, a.config, a.validated),
                    o = wt(e, "components").getOr([]),
                    r = N(o, function(t) {
                        return js(i, u, t, c)
                    });
                return [Ke({}, e, {
                    components: r
                })]
            }, function(t, n) {
                var e = n(u, a.config, a.validated);
                return a.validated.preprocess.getOr(d)(e)
            })
        },
        Us = function(n, e, t, o) {
            var r, i, u, a = nt(o, function(t, n) {
                    return o = t, r = !1, {
                        name: Z(e = n),
                        required: function() {
                            return o.fold(function(t, n) {
                                return t
                            }, function(t, n) {
                                return t
                            })
                        },
                        used: function() {
                            return r
                        },
                        replace: function() {
                            if (!0 === r) throw new Error("Trying to use the same placeholder more than once: " + e);
                            return r = !0, o
                        }
                    };
                    var e, o, r
                }),
                c = (r = n, i = e, u = a, N(t, function(t) {
                    return js(r, i, t, u)
                }));
            return $(a, function(t) {
                if (!1 === t.used() && t.required()) throw new Error("Placeholder: " + t.name() + " was not found in components list\nNamespace: " + n.getOr("none") + "\nComponents: " + ko(e.components, null, 2))
            }), c
        },
        Ws = Ns.single,
        Gs = Ns.multiple,
        Xs = Z(Rs),
        Ys = mt([{
            required: ["data"]
        }, {
            external: ["data"]
        }, {
            optional: ["data"]
        }, {
            group: ["data"]
        }]),
        qs = vr("factory", {
            sketch: d
        }),
        Ks = vr("schema", []),
        Js = or("name"),
        $s = Ro("pname", "pname", oo(function(t) {
            return "<alloy." + Ye(t.name) + ">"
        }), Jo()),
        Qs = kr("schema", function() {
            return [fr("preprocess")]
        }),
        Zs = vr("defaults", Z({})),
        tl = vr("overrides", Z({})),
        nl = Bo([qs, Ks, Js, $s, Zs, tl]),
        el = Bo([qs, Ks, Js, Zs, tl]),
        ol = Bo([qs, Ks, Js, $s, Zs, tl]),
        rl = Bo([qs, Qs, Js, or("unit"), $s, Zs, tl]),
        il = function(t) {
            return t.fold(tt.some, tt.none, tt.some, tt.some)
        },
        ul = function(t) {
            var n = function(t) {
                return t.name
            };
            return t.fold(n, n, n, n)
        },
        al = function(e, o) {
            return function(t) {
                var n = Yo("Converting part type", o, t);
                return e(n)
            }
        },
        cl = al(Ys.required, nl),
        sl = al(Ys.external, el),
        ll = al(Ys.optional, ol),
        fl = al(Ys.group, rl),
        dl = Z("entirety"),
        ml = /* */ Object.freeze({
            required: cl,
            external: sl,
            optional: ll,
            group: fl,
            asNamedPart: il,
            name: ul,
            asCommon: function(t) {
                return t.fold(d, d, d, d)
            },
            original: dl
        }),
        hl = function(t, n, e, o) {
            return vt(n.defaults(t, e, o), e, {
                uid: t.partUids[n.name]
            }, n.overrides(t, e, o))
        },
        gl = function(r, t) {
            var n = {};
            return T(t, function(t) {
                il(t).each(function(e) {
                    var o = vl(r, e.pname);
                    n[e.name] = function(t) {
                        var n = Yo("Part: " + e.name + " in " + r, Bo(e.schema), t);
                        return Ke({}, o, {
                            config: t,
                            validated: n
                        })
                    }
                })
            }), n
        },
        vl = function(t, n) {
            return {
                uiType: Xs(),
                owner: t,
                name: n
            }
        },
        pl = function(t, n, e) {
            return {
                uiType: Xs(),
                owner: t,
                name: n,
                config: e,
                validated: {}
            }
        },
        bl = function(t) {
            return N(t, function(t) {
                return t.fold(tt.none, tt.some, tt.none, tt.none).map(function(t) {
                    return cr(t.name, t.schema.concat([Au(dl())]))
                }).toArray()
            })
        },
        yl = function(t) {
            return V(t, ul)
        },
        xl = function(t, n, e) {
            return o = n, i = {}, r = {}, T(e, function(t) {
                t.fold(function(o) {
                    i[o.pname] = Ws(!0, function(t, n, e) {
                        return o.factory.sketch(hl(t, o, n, e))
                    })
                }, function(t) {
                    var n = o.parts[t.name];
                    r[t.name] = Z(t.factory.sketch(hl(o, t, n[dl()]), n))
                }, function(o) {
                    i[o.pname] = Ws(!1, function(t, n, e) {
                        return o.factory.sketch(hl(t, o, n, e))
                    })
                }, function(r) {
                    i[r.pname] = Gs(!0, function(n, t, e) {
                        var o = n[r.name];
                        return V(o, function(t) {
                            return r.factory.sketch(vt(r.defaults(n, t, e), t, r.overrides(n, t)))
                        })
                    })
                })
            }), {
                internals: Z(i),
                externals: Z(r)
            };
            var o, i, r
        },
        wl = function(t, n, e) {
            return Us(tt.some(t), n, n.components, e)
        },
        zl = function(t, n, e) {
            var o = n.partUids[e];
            return t.getSystem().getByUid(o).toOption()
        },
        Sl = function(t, n, e) {
            return zl(t, n, e).getOrDie("Could not find part: " + e)
        },
        kl = function(t, n, e) {
            var o = {},
                r = n.partUids,
                i = t.getSystem();
            return T(e, function(t) {
                o[t] = i.getByUid(r[t])
            }), nt(o, Z)
        },
        Cl = function(t, n) {
            var e = t.getSystem();
            return nt(n.partUids, function(t, n) {
                return Z(e.getByUid(t))
            })
        },
        Ol = function(t) {
            return K(t.partUids)
        },
        Ml = function(t, n, e) {
            var o = {},
                r = n.partUids,
                i = t.getSystem();
            return T(e, function(t) {
                o[t] = i.getByUid(r[t]).getOrDie()
            }), nt(o, Z)
        },
        Hl = function(n, t) {
            var e = yl(t);
            return St(V(e, function(t) {
                return {
                    key: t,
                    value: n + "-" + t
                }
            }))
        },
        El = function(n) {
            return Ro("partUids", "partUids", ro(function(t) {
                return Hl(t.uid, n)
            }), Jo())
        },
        Vl = /* */ Object.freeze({
            generate: gl,
            generateOne: pl,
            schemas: bl,
            names: yl,
            substitutes: xl,
            components: wl,
            defaultUids: Hl,
            defaultUidsSchema: El,
            getAllParts: Cl,
            getAllPartNames: Ol,
            getPart: zl,
            getPartOrDie: Sl,
            getParts: kl,
            getPartsOrDie: Ml
        }),
        Tl = function(t, n, e, o, r) {
            var i, u, a = (u = r, (0 < (i = o).length ? [cr("parts", i)] : []).concat([or("uid"), vr("dom", {}), vr("components", []), Au("originalSpec"), vr("debug.sketcher", {})]).concat(u));
            return Yo(t + " [SpecSchema]", Ao(a.concat(n)), e)
        },
        Al = function(t, n, e, o, r) {
            var i = Bl(r),
                u = bl(e),
                a = El(e),
                c = Tl(t, n, i, u, [a]),
                s = xl(0, c, e);
            return o(c, wl(t, c, s.internals()), i, s.externals())
        },
        Bl = function(t) {
            return t.hasOwnProperty("uid") ? t : Ke({}, t, {
                uid: hi("uid")
            })
        },
        Dl = Ao([or("name"), or("factory"), or("configFields"), vr("apis", {}), vr("extraApis", {})]),
        _l = Ao([or("name"), or("factory"), or("configFields"), or("partFields"), vr("apis", {}), vr("extraApis", {})]),
        Fl = function(t) {
            var i = Yo("Sketcher for " + t.name, Dl, t),
                n = nt(i.apis, zi),
                e = nt(i.extraApis, function(t, n) {
                    return yi(t, n)
                });
            return Ke({
                name: Z(i.name),
                partFields: Z([]),
                configFields: Z(i.configFields),
                sketch: function(t) {
                    return n = i.name, e = i.configFields, o = i.factory, r = Bl(t), o(Tl(n, e, r, [], []), r);
                    var n, e, o, r
                }
            }, n, e)
        },
        Il = function(t) {
            var n = Yo("Sketcher for " + t.name, _l, t),
                e = gl(n.name, n.partFields),
                o = nt(n.apis, zi),
                r = nt(n.extraApis, function(t, n) {
                    return yi(t, n)
                });
            return Ke({
                name: Z(n.name),
                partFields: Z(n.partFields),
                configFields: Z(n.configFields),
                sketch: function(t) {
                    return Al(n.name, n.configFields, n.partFields, n.factory, t)
                },
                parts: Z(e)
            }, o, r)
        },
        Ll = function(t) {
            return "input" === Se(t) && "radio" !== Te(t, "type") || "textarea" === Se(t)
        },
        Rl = /* */ Object.freeze({
            getCurrent: function(t, n, e) {
                return n.find(t)
            }
        }),
        Nl = [or("find")],
        Pl = Pu({
            fields: Nl,
            name: "composing",
            apis: Rl
        }),
        jl = function(t, n, e, o) {
            var r = t + n;
            return o < r ? e : r < e ? o : r
        },
        Ul = function(t, n, e) {
            return t <= n ? n : e <= t ? e : t
        },
        Wl = function(e, o, t, r) {
            var n = Vc(e.element(), "." + o.highlightClass);
            T(n, function(n) {
                H(r, function(t) {
                    return t.element() === n
                }) || (Pi(n, o.highlightClass), e.getSystem().getByDom(n).each(function(t) {
                    o.onDehighlight(e, t), Hr(t, Un())
                }))
            })
        },
        Gl = function(t, n, e, o) {
            Wl(t, n, 0, [o]), Xl(t, n, e, o) || (Ri(o.element(), n.highlightClass), n.onHighlight(t, o), Hr(o, jn()))
        },
        Xl = function(t, n, e, o) {
            return ji(o.element(), n.highlightClass)
        },
        Yl = function(t, n, e, o) {
            var r = Vc(t.element(), "." + n.itemClass);
            return tt.from(r[o]).fold(function() {
                return dt.error("No element found with index " + o)
            }, t.getSystem().getByDom)
        },
        ql = function(n, t, e) {
            return vu(n.element(), "." + t.itemClass).bind(function(t) {
                return n.getSystem().getByDom(t).toOption()
            })
        },
        Kl = function(n, t, e) {
            var o = Vc(n.element(), "." + t.itemClass);
            return (0 < o.length ? tt.some(o[o.length - 1]) : tt.none()).bind(function(t) {
                return n.getSystem().getByDom(t).toOption()
            })
        },
        Jl = function(e, n, t, o) {
            var r = Vc(e.element(), "." + n.itemClass);
            return F(r, function(t) {
                return ji(t, n.highlightClass)
            }).bind(function(t) {
                var n = jl(t, o, 0, r.length - 1);
                return e.getSystem().getByDom(r[n]).toOption()
            })
        },
        $l = function(n, t, e) {
            var o = Vc(n.element(), "." + t.itemClass);
            return Mt(V(o, function(t) {
                return n.getSystem().getByDom(t).toOption()
            }))
        },
        Ql = /* */ Object.freeze({
            dehighlightAll: function(t, n, e) {
                return Wl(t, n, 0, [])
            },
            dehighlight: function(t, n, e, o) {
                Xl(t, n, e, o) && (Pi(o.element(), n.highlightClass), n.onDehighlight(t, o), Hr(o, Un()))
            },
            highlight: Gl,
            highlightFirst: function(n, e, o) {
                ql(n, e, o).each(function(t) {
                    Gl(n, e, o, t)
                })
            },
            highlightLast: function(n, e, o) {
                Kl(n, e, o).each(function(t) {
                    Gl(n, e, o, t)
                })
            },
            highlightAt: function(n, e, o, t) {
                Yl(n, e, o, t).fold(function(t) {
                    throw new Error(t)
                }, function(t) {
                    Gl(n, e, o, t)
                })
            },
            highlightBy: function(n, e, o, t) {
                var r = $l(n, e, o);
                _(r, t).each(function(t) {
                    Gl(n, e, o, t)
                })
            },
            isHighlighted: Xl,
            getHighlighted: function(n, t, e) {
                return vu(n.element(), "." + t.highlightClass).bind(function(t) {
                    return n.getSystem().getByDom(t).toOption()
                })
            },
            getFirst: ql,
            getLast: Kl,
            getPrevious: function(t, n, e) {
                return Jl(t, n, 0, -1)
            },
            getNext: function(t, n, e) {
                return Jl(t, n, 0, 1)
            },
            getCandidates: $l
        }),
        Zl = [or("highlightClass"), or("itemClass"), Mu("onHighlight"), Mu("onDehighlight")],
        tf = Pu({
            fields: Zl,
            name: "highlighting",
            apis: Ql
        }),
        nf = function(t, n, e) {
            var o = U(t.slice(0, n)),
                r = U(t.slice(n + 1));
            return _(o.concat(r), e)
        },
        ef = function(t, n, e) {
            var o = U(t.slice(0, n));
            return _(o, e)
        },
        of = function(t, n, e) {
            var o = t.slice(0, n),
                r = t.slice(n + 1);
            return _(r.concat(o), e)
        },
        rf = function(t, n, e) {
            var o = t.slice(n + 1);
            return _(o, e)
        },
        uf = function(e) {
            return function(t) {
                var n = t.raw();
                return M(e, n.which)
            }
        },
        af = function(t) {
            return function(n) {
                return P(t, function(t) {
                    return t(n)
                })
            }
        },
        cf = function(t) {
            return !0 === t.raw().shiftKey
        },
        sf = function(t) {
            return !0 === t.raw().ctrlKey
        },
        lf = m(cf),
        ff = function(t, n) {
            return {
                matches: t,
                classification: n
            }
        },
        df = function(t) {
            t.dom().focus()
        },
        mf = function(t) {
            var n = t !== undefined ? t.dom() : document;
            return tt.from(n.activeElement).map(Gn.fromDom)
        },
        hf = function(n) {
            return mf(ce(n)).filter(function(t) {
                return n.dom().contains(t.dom())
            })
        },
        gf = function(t, n, e) {
            n.exists(function(n) {
                return e.exists(function(t) {
                    return ae(t, n)
                })
            }) || Er(t, Ln(), {
                prevFocus: n,
                newFocus: e
            })
        },
        vf = function() {
            var r = function(t) {
                return hf(t.element())
            };
            return {
                get: r,
                set: function(t, n) {
                    var e = r(t);
                    t.getSystem().triggerFocus(n, t.element());
                    var o = r(t);
                    gf(t, e, o)
                }
            }
        },
        pf = function() {
            var r = function(t) {
                return tf.getHighlighted(t).map(function(t) {
                    return t.element()
                })
            };
            return {
                get: r,
                set: function(n, t) {
                    var e = r(n);
                    n.getSystem().getByDom(t).fold(Q, function(t) {
                        tf.highlight(n, t)
                    });
                    var o = r(n);
                    gf(n, e, o)
                }
            }
        };
    (oa = ea || (ea = {})).OnFocusMode = "onFocus", oa.OnEnterOrSpaceMode = "onEnterOrSpace", oa.OnApiMode = "onApi";
    var bf = function(t, n, e, o, a) {
            var c = function(n, e, t, o, r) {
                    var i, u, a = t(n, e, o, r);
                    return (i = a, u = e.event(), _(i, function(t) {
                        return t.matches(u)
                    }).map(function(t) {
                        return t.classification
                    })).bind(function(t) {
                        return t(n, e, o, r)
                    })
                },
                r = {
                    schema: function() {
                        return t.concat([vr("focusManager", vf()), pr("focusInside", "onFocus", Uo(function(t) {
                            return M(["onFocus", "onEnterOrSpace", "onApi"], t) ? dt.value(t) : dt.error("Invalid value for focusInside")
                        })), Tu("handler", r), Tu("state", n), Tu("sendFocusIn", a)])
                    },
                    processKey: c,
                    toEvents: function(i, u) {
                        var t = i.focusInside !== ea.OnFocusMode ? tt.none() : a(i).map(function(e) {
                            return qr(wn(), function(t, n) {
                                e(t, i, u), n.stop()
                            })
                        });
                        return Gr(t.toArray().concat([qr(Rt(), function(o, r) {
                            c(o, r, e, i, u).fold(function() {
                                var n, e, t;
                                n = o, e = r, t = uf([32].concat([13]))(e.event()), i.focusInside === ea.OnEnterOrSpaceMode && t && Cr(n, e) && a(i).each(function(t) {
                                    t(n, i, u), e.stop()
                                })
                            }, function(t) {
                                r.stop()
                            })
                        }), qr(Nt(), function(t, n) {
                            c(t, n, o, i, u).each(function(t) {
                                n.stop()
                            })
                        })]))
                    }
                };
            return r
        },
        yf = function(t) {
            var n = [fr("onEscape"), fr("onEnter"), vr("selector", '[data-alloy-tabstop="true"]'), vr("firstTabstop", 0), vr("useTabstopAt", Z(!0)), fr("visibilitySelector")].concat([t]),
                u = function(t, n) {
                    var e = t.visibilitySelector.bind(function(t) {
                        return pu(n, t)
                    }).getOr(n);
                    return 0 < ca(e)
                },
                e = function(n, e) {
                    var t, o, r, i;
                    (t = n, o = e, r = Vc(t.element(), o.selector), i = A(r, function(t) {
                        return u(o, t)
                    }), tt.from(i[o.firstTabstop])).each(function(t) {
                        e.focusManager.set(n, t)
                    })
                },
                a = function(n, t, e, o, r) {
                    return r(t, e, function(t) {
                        return u(n = o, e = t) && n.useTabstopAt(e);
                        var n, e
                    }).fold(function() {
                        return o.cyclic ? tt.some(!0) : tt.none()
                    }, function(t) {
                        return o.focusManager.set(n, t), tt.some(!0)
                    })
                },
                i = function(n, t, e, o) {
                    var r, i, u = Vc(n.element(), e.selector);
                    return (r = n, i = e, i.focusManager.get(r).bind(function(t) {
                        return pu(t, i.selector)
                    })).bind(function(t) {
                        return F(u, v(ae, t)).bind(function(t) {
                            return a(n, u, t, e, o)
                        })
                    })
                },
                o = Z([ff(af([cf, uf([9])]), function(t, n, e, o) {
                    var r = e.cyclic ? nf : ef;
                    return i(t, 0, e, r)
                }), ff(uf([9]), function(t, n, e, o) {
                    var r = e.cyclic ? of : rf;
                    return i(t, 0, e, r)
                }), ff(uf([27]), function(n, e, t, o) {
                    return t.onEscape.bind(function(t) {
                        return t(n, e)
                    })
                }), ff(af([lf, uf([13])]), function(n, e, t, o) {
                    return t.onEnter.bind(function(t) {
                        return t(n, e)
                    })
                })]),
                r = Z([]);
            return bf(n, Si.init, o, r, function() {
                return tt.some(e)
            })
        },
        xf = yf(kr("cyclic", Z(!1))),
        wf = yf(kr("cyclic", Z(!0))),
        zf = function(t, n, e) {
            return Ll(e) && uf([32])(n.event()) ? tt.none() : (Tr(t, e, Cn()), tt.some(!0))
        },
        Sf = function(t, n) {
            return tt.some(!0)
        },
        kf = [vr("execute", zf), vr("useSpace", !1), vr("useEnter", !0), vr("useControlEnter", !1), vr("useDown", !1)],
        Cf = function(t, n, e) {
            return e.execute(t, n, t.element())
        },
        Of = bf(kf, Si.init, function(t, n, e, o) {
            var r = e.useSpace && !Ll(t.element()) ? [32] : [],
                i = e.useEnter ? [13] : [],
                u = e.useDown ? [40] : [],
                a = r.concat(i).concat(u);
            return [ff(uf(a), Cf)].concat(e.useControlEnter ? [ff(af([sf, uf([13])]), Cf)] : [])
        }, function(t, n, e, o) {
            return e.useSpace && !Ll(t.element()) ? [ff(uf([32]), Sf)] : []
        }, function() {
            return tt.none()
        }),
        Mf = function(t) {
            var e = Ot(tt.none());
            return ki({
                readState: function() {
                    return e.get().map(function(t) {
                        return {
                            numRows: t.numRows(),
                            numColumns: t.numColumns()
                        }
                    }).getOr({
                        numRows: "?",
                        numColumns: "?"
                    })
                },
                setGridSize: function(t, n) {
                    e.set(tt.some({
                        numRows: Z(t),
                        numColumns: Z(n)
                    }))
                },
                getNumRows: function() {
                    return e.get().map(function(t) {
                        return t.numRows()
                    })
                },
                getNumColumns: function() {
                    return e.get().map(function(t) {
                        return t.numColumns()
                    })
                }
            })
        },
        Hf = /* */ Object.freeze({
            flatgrid: Mf,
            init: function(t) {
                return t.state(t)
            }
        }),
        Ef = function(i) {
            return function(t, n, e, o) {
                var r = i(t.element());
                return Bf(r, t, n, e, o)
            }
        },
        Vf = function(t, n) {
            var e = dc(t, n);
            return Ef(e)
        },
        Tf = function(t, n) {
            var e = dc(n, t);
            return Ef(e)
        },
        Af = function(r) {
            return function(t, n, e, o) {
                return Bf(r, t, n, e, o)
            }
        },
        Bf = function(n, e, t, o, r) {
            return o.focusManager.get(e).bind(function(t) {
                return n(e.element(), t, o, r)
            }).map(function(t) {
                return o.focusManager.set(e, t), !0
            })
        },
        Df = Af,
        _f = Af,
        Ff = Af,
        If = function(t) {
            var n, e = t.dom();
            return !((n = e).offsetWidth <= 0 && n.offsetHeight <= 0)
        },
        Lf = Kn(["index", "candidates"], []),
        Rf = function(t, n, e) {
            return Nf(t, n, e, If)
        },
        Nf = function(t, n, e, o) {
            var r, i = v(ae, n),
                u = Vc(t, e),
                a = A(u, If);
            return F(r = a, i).map(function(t) {
                return Lf({
                    index: t,
                    candidates: r
                })
            })
        },
        Pf = function(t, n) {
            return F(t, function(t) {
                return ae(n, t)
            })
        },
        jf = function(e, t, o, n) {
            return n(Math.floor(t / o), t % o).bind(function(t) {
                var n = t.row() * o + t.column();
                return 0 <= n && n < e.length ? tt.some(e[n]) : tt.none()
            })
        },
        Uf = function(r, t, i, u, a) {
            return jf(r, t, u, function(t, n) {
                var e = t === i - 1 ? r.length - t * u : u,
                    o = jl(n, a, 0, e - 1);
                return tt.some({
                    row: Z(t),
                    column: Z(o)
                })
            })
        },
        Wf = function(i, t, u, a, c) {
            return jf(i, t, a, function(t, n) {
                var e = jl(t, c, 0, u - 1),
                    o = e === u - 1 ? i.length - e * a : a,
                    r = Ul(n, 0, o - 1);
                return tt.some({
                    row: Z(e),
                    column: Z(r)
                })
            })
        },
        Gf = [or("selector"), vr("execute", zf), Hu("onEscape"), vr("captureTab", !1), Bu()],
        Xf = function(n, e, t) {
            vu(n.element(), e.selector).each(function(t) {
                e.focusManager.set(n, t)
            })
        },
        Yf = function(r) {
            return function(t, n, e, o) {
                return Rf(t, n, e.selector).bind(function(t) {
                    return r(t.candidates(), t.index(), o.getNumRows().getOr(e.initSize.numRows), o.getNumColumns().getOr(e.initSize.numColumns))
                })
            }
        },
        qf = function(t, n, e, o) {
            return e.captureTab ? tt.some(!0) : tt.none()
        },
        Kf = Yf(function(t, n, e, o) {
            return Uf(t, n, e, o, -1)
        }),
        Jf = Yf(function(t, n, e, o) {
            return Uf(t, n, e, o, 1)
        }),
        $f = Yf(function(t, n, e, o) {
            return Wf(t, n, e, o, -1)
        }),
        Qf = Yf(function(t, n, e, o) {
            return Wf(t, n, e, o, 1)
        }),
        Zf = Z([ff(uf([37]), Vf(Kf, Jf)), ff(uf([39]), Tf(Kf, Jf)), ff(uf([38]), Df($f)), ff(uf([40]), _f(Qf)), ff(af([cf, uf([9])]), qf), ff(af([lf, uf([9])]), qf), ff(uf([27]), function(t, n, e, o) {
            return e.onEscape(t, n)
        }), ff(uf([32].concat([13])), function(n, e, o, t) {
            return (r = n, i = o, i.focusManager.get(r).bind(function(t) {
                return pu(t, i.selector)
            })).bind(function(t) {
                return o.execute(n, e, t)
            });
            var r, i
        })]),
        td = Z([ff(uf([32]), Sf)]),
        nd = bf(Gf, Mf, Zf, td, function() {
            return tt.some(Xf)
        }),
        ed = function(t, n, e, i) {
            var u = function(t, n, e) {
                var o, r = jl(n, i, 0, e.length - 1);
                return r === t ? tt.none() : (o = e[r], "button" === Se(o) && "disabled" === Te(o, "disabled") ? u(t, r, e) : tt.from(e[r]))
            };
            return Rf(t, e, n).bind(function(t) {
                var n = t.index(),
                    e = t.candidates();
                return u(n, n, e)
            })
        },
        od = [or("selector"), vr("getInitial", tt.none), vr("execute", zf), Hu("onEscape"), vr("executeOnMove", !1), vr("allowVertical", !0)],
        rd = function(n, e, o) {
            return (t = n, r = o, r.focusManager.get(t).bind(function(t) {
                return pu(t, r.selector)
            })).bind(function(t) {
                return o.execute(n, e, t)
            });
            var t, r
        },
        id = function(n, e) {
            e.getInitial(n).orThunk(function() {
                return vu(n.element(), e.selector)
            }).each(function(t) {
                e.focusManager.set(n, t)
            })
        },
        ud = function(t, n, e) {
            return ed(t, e.selector, n, -1)
        },
        ad = function(t, n, e) {
            return ed(t, e.selector, n, 1)
        },
        cd = function(o) {
            return function(t, n, e) {
                return o(t, n, e).bind(function() {
                    return e.executeOnMove ? rd(t, n, e) : tt.some(!0)
                })
            }
        },
        sd = function(t, n, e, o) {
            return e.onEscape(t, n)
        },
        ld = Z([ff(uf([32]), Sf)]),
        fd = bf(od, Si.init, function(t, n, e, o) {
            var r = [37].concat(e.allowVertical ? [38] : []),
                i = [39].concat(e.allowVertical ? [40] : []);
            return [ff(uf(r), cd(Vf(ud, ad))), ff(uf(i), cd(Tf(ud, ad))), ff(uf([13]), rd), ff(uf([32]), rd), ff(uf([27]), sd)]
        }, ld, function() {
            return tt.some(id)
        }),
        dd = Kn(["rowIndex", "columnIndex", "cell"], []),
        md = function(t, n, e) {
            return tt.from(t[n]).bind(function(t) {
                return tt.from(t[e]).map(function(t) {
                    return dd({
                        rowIndex: n,
                        columnIndex: e,
                        cell: t
                    })
                })
            })
        },
        hd = function(t, n, e, o) {
            var r = t[n].length,
                i = jl(e, o, 0, r - 1);
            return md(t, n, i)
        },
        gd = function(t, n, e, o) {
            var r = jl(e, o, 0, t.length - 1),
                i = t[r].length,
                u = Ul(n, 0, i - 1);
            return md(t, r, u)
        },
        vd = function(t, n, e, o) {
            var r = t[n].length,
                i = Ul(e + o, 0, r - 1);
            return md(t, n, i)
        },
        pd = function(t, n, e, o) {
            var r = Ul(e + o, 0, t.length - 1),
                i = t[r].length,
                u = Ul(n, 0, i - 1);
            return md(t, r, u)
        },
        bd = [cr("selectors", [or("row"), or("cell")]), vr("cycles", !0), vr("previousSelector", tt.none), vr("execute", zf)],
        yd = function(n, e) {
            e.previousSelector(n).orThunk(function() {
                var t = e.selectors;
                return vu(n.element(), t.cell)
            }).each(function(t) {
                e.focusManager.set(n, t)
            })
        },
        xd = function(t, n) {
            return function(e, o, i) {
                var u = i.cycles ? t : n;
                return pu(o, i.selectors.row).bind(function(t) {
                    var n = Vc(t, i.selectors.cell);
                    return Pf(n, o).bind(function(o) {
                        var r = Vc(e, i.selectors.row);
                        return Pf(r, t).bind(function(t) {
                            var n, e = (n = i, V(r, function(t) {
                                return Vc(t, n.selectors.cell)
                            }));
                            return u(e, t, o).map(function(t) {
                                return t.cell()
                            })
                        })
                    })
                })
            }
        },
        wd = xd(function(t, n, e) {
            return hd(t, n, e, -1)
        }, function(t, n, e) {
            return vd(t, n, e, -1)
        }),
        zd = xd(function(t, n, e) {
            return hd(t, n, e, 1)
        }, function(t, n, e) {
            return vd(t, n, e, 1)
        }),
        Sd = xd(function(t, n, e) {
            return gd(t, e, n, -1)
        }, function(t, n, e) {
            return pd(t, e, n, -1)
        }),
        kd = xd(function(t, n, e) {
            return gd(t, e, n, 1)
        }, function(t, n, e) {
            return pd(t, e, n, 1)
        }),
        Cd = Z([ff(uf([37]), Vf(wd, zd)), ff(uf([39]), Tf(wd, zd)), ff(uf([38]), Df(Sd)), ff(uf([40]), _f(kd)), ff(uf([32].concat([13])), function(n, e, o) {
            return hf(n.element()).bind(function(t) {
                return o.execute(n, e, t)
            })
        })]),
        Od = Z([ff(uf([32]), Sf)]),
        Md = bf(bd, Si.init, Cd, Od, function() {
            return tt.some(yd)
        }),
        Hd = [or("selector"), vr("execute", zf), vr("moveOnTab", !1)],
        Ed = function(n, e, o) {
            return o.focusManager.get(n).bind(function(t) {
                return o.execute(n, e, t)
            })
        },
        Vd = function(n, e) {
            vu(n.element(), e.selector).each(function(t) {
                e.focusManager.set(n, t)
            })
        },
        Td = function(t, n, e) {
            return ed(t, e.selector, n, -1)
        },
        Ad = function(t, n, e) {
            return ed(t, e.selector, n, 1)
        },
        Bd = Z([ff(uf([38]), Ff(Td)), ff(uf([40]), Ff(Ad)), ff(af([cf, uf([9])]), function(t, n, e) {
            return e.moveOnTab ? Ff(Td)(t, n, e) : tt.none()
        }), ff(af([lf, uf([9])]), function(t, n, e) {
            return e.moveOnTab ? Ff(Ad)(t, n, e) : tt.none()
        }), ff(uf([13]), Ed), ff(uf([32]), Ed)]),
        Dd = Z([ff(uf([32]), Sf)]),
        _d = bf(Hd, Si.init, Bd, Dd, function() {
            return tt.some(Vd)
        }),
        Fd = [Hu("onSpace"), Hu("onEnter"), Hu("onShiftEnter"), Hu("onLeft"), Hu("onRight"), Hu("onTab"), Hu("onShiftTab"), Hu("onUp"), Hu("onDown"), Hu("onEscape"), vr("stopSpaceKeyup", !1), fr("focusIn")],
        Id = bf(Fd, Si.init, function(t, n, e) {
            return [ff(uf([32]), e.onSpace), ff(af([lf, uf([13])]), e.onEnter), ff(af([cf, uf([13])]), e.onShiftEnter), ff(af([cf, uf([9])]), e.onShiftTab), ff(af([lf, uf([9])]), e.onTab), ff(uf([38]), e.onUp), ff(uf([40]), e.onDown), ff(uf([37]), e.onLeft), ff(uf([39]), e.onRight), ff(uf([32]), e.onSpace), ff(uf([27]), e.onEscape)]
        }, function(t, n, e) {
            return e.stopSpaceKeyup ? [ff(uf([32]), Sf)] : []
        }, function(t) {
            return t.focusIn
        }),
        Ld = xf.schema(),
        Rd = wf.schema(),
        Nd = fd.schema(),
        Pd = nd.schema(),
        jd = Md.schema(),
        Ud = Of.schema(),
        Wd = _d.schema(),
        Gd = Id.schema(),
        Xd = Uu({
            branchKey: "mode",
            branches: /* */ Object.freeze({
                acyclic: Ld,
                cyclic: Rd,
                flow: Nd,
                flatgrid: Pd,
                matrix: jd,
                execution: Ud,
                menu: Wd,
                special: Gd
            }),
            name: "keying",
            active: {
                events: function(t, n) {
                    return t.handler.toEvents(t, n)
                }
            },
            apis: {
                focusIn: function(n, e, o) {
                    e.sendFocusIn(e).fold(function() {
                        n.getSystem().triggerFocus(n.element(), n.element())
                    }, function(t) {
                        t(n, e, o)
                    })
                },
                setGridSize: function(t, n, e, o, r) {
                    Ct(e, "setGridSize") ? e.setGridSize(o, r) : console.error("Layout does not support setGridSize")
                }
            },
            state: Hf
        }),
        Yd = function(t, n, e, o) {
            var r = t.getSystem().build(o);
            ms(t, r, e)
        },
        qd = function(t, n, e, o) {
            var r = Kd(t, n);
            _(r, function(t) {
                return ae(o.element(), t.element())
            }).each(gs)
        },
        Kd = function(t, n) {
            return t.components()
        },
        Jd = function(n, e, t, r, o) {
            var i = Kd(n, e);
            return tt.from(i[r]).map(function(t) {
                return qd(n, e, 0, t), o.each(function(t) {
                    Yd(n, 0, function(t, n) {
                        var e, o;
                        o = n, me(e = t, r).fold(function() {
                            pe(e, o)
                        }, function(t) {
                            he(t, o)
                        })
                    }, t)
                }), t
            })
        },
        $d = Pu({
            fields: [],
            name: "replacing",
            apis: /* */ Object.freeze({
                append: function(t, n, e, o) {
                    Yd(t, 0, pe, o)
                },
                prepend: function(t, n, e, o) {
                    Yd(t, 0, ve, o)
                },
                remove: qd,
                replaceAt: Jd,
                replaceBy: function(n, e, t, o, r) {
                    var i = Kd(n, e);
                    return F(i, o).bind(function(t) {
                        return Jd(n, e, 0, t, r)
                    })
                },
                set: function(n, t, e, o) {
                    var r, i, u, a;
                    vs(n), r = function() {
                        var t = V(o, n.getSystem().build);
                        T(t, function(t) {
                            ds(n, t)
                        })
                    }, i = n.element(), u = ce(i), a = mf(u).bind(function(n) {
                        var t = function(t) {
                            return ae(n, t)
                        };
                        return t(i) ? tt.some(i) : Ur(i, t)
                    }), r(i), a.each(function(n) {
                        mf(u).filter(function(t) {
                            return ae(t, n)
                        }).fold(function() {
                            df(n)
                        }, Q)
                    })
                },
                contents: Kd
            })
        }),
        Qd = function(t, n, e) {
            n.store.manager.onLoad(t, n, e)
        },
        Zd = function(t, n, e) {
            n.store.manager.onUnload(t, n, e)
        },
        tm = /* */ Object.freeze({
            onLoad: Qd,
            onUnload: Zd,
            setValue: function(t, n, e, o) {
                n.store.manager.setValue(t, n, e, o)
            },
            getValue: function(t, n, e) {
                return n.store.manager.getValue(t, n, e)
            },
            getState: function(t, n, e) {
                return e
            }
        }),
        nm = /* */ Object.freeze({
            events: function(e, o) {
                var t = e.resetOnDom ? [ei(function(t, n) {
                    Qd(t, e, o)
                }), oi(function(t, n) {
                    Zd(t, e, o)
                })] : [Du(e, o, Qd)];
                return Gr(t)
            }
        }),
        em = function() {
            var t = Ot(null);
            return ki({
                set: t.set,
                get: t.get,
                isNotSet: function() {
                    return null === t.get()
                },
                clear: function() {
                    t.set(null)
                },
                readState: function() {
                    return {
                        mode: "memory",
                        value: t.get()
                    }
                }
            })
        },
        om = function() {
            var i = Ot({}),
                u = Ot({});
            return ki({
                readState: function() {
                    return {
                        mode: "dataset",
                        dataByValue: i.get(),
                        dataByText: u.get()
                    }
                },
                lookup: function(t) {
                    return wt(i.get(), t).orThunk(function() {
                        return wt(u.get(), t)
                    })
                },
                update: function(t) {
                    var n = i.get(),
                        e = u.get(),
                        o = {},
                        r = {};
                    T(t, function(n) {
                        o[n.value] = n, wt(n, "meta").each(function(t) {
                            wt(t, "text").each(function(t) {
                                r[t] = n
                            })
                        })
                    }), i.set(Ke({}, n, o)), u.set(Ke({}, e, r))
                },
                clear: function() {
                    i.set({}), u.set({})
                }
            })
        },
        rm = /* */ Object.freeze({
            memory: em,
            dataset: om,
            manual: function() {
                return ki({
                    readState: function() {}
                })
            },
            init: function(t) {
                return t.store.manager.state(t)
            }
        }),
        im = function(t, n, e, o) {
            var r = n.store;
            e.update([o]), r.setValue(t, o), n.onSetValue(t, o)
        },
        um = [fr("initialValue"), or("getFallbackEntry"), or("getDataKey"), or("setValue"), Tu("manager", {
            setValue: im,
            getValue: function(t, n, e) {
                var o = n.store,
                    r = o.getDataKey(t);
                return e.lookup(r).fold(function() {
                    return o.getFallbackEntry(r)
                }, function(t) {
                    return t
                })
            },
            onLoad: function(n, e, o) {
                e.store.initialValue.each(function(t) {
                    im(n, e, o, t)
                })
            },
            onUnload: function(t, n, e) {
                e.clear()
            },
            state: om
        })],
        am = [or("getValue"), vr("setValue", Q), fr("initialValue"), Tu("manager", {
            setValue: function(t, n, e, o) {
                n.store.setValue(t, o), n.onSetValue(t, o)
            },
            getValue: function(t, n, e) {
                return n.store.getValue(t)
            },
            onLoad: function(n, e, t) {
                e.store.initialValue.each(function(t) {
                    e.store.setValue(n, t)
                })
            },
            onUnload: Q,
            state: Si.init
        })],
        cm = [fr("initialValue"), Tu("manager", {
            setValue: function(t, n, e, o) {
                e.set(o), n.onSetValue(t, o)
            },
            getValue: function(t, n, e) {
                return e.get()
            },
            onLoad: function(t, n, e) {
                n.store.initialValue.each(function(t) {
                    e.isNotSet() && e.set(t)
                })
            },
            onUnload: function(t, n, e) {
                e.clear()
            },
            state: em
        })],
        sm = [pr("store", {
            mode: "memory"
        }, Ko("mode", {
            memory: cm,
            manual: am,
            dataset: um
        })), Mu("onSetValue"), vr("resetOnDom", !1)],
        lm = Pu({
            fields: sm,
            name: "representing",
            active: nm,
            apis: tm,
            extra: {
                setValueFrom: function(t, n) {
                    var e = lm.getValue(n);
                    lm.setValue(t, e)
                }
            },
            state: rm
        }),
        fm = function(t, n) {
            n.ignore || (df(t.element()), n.onFocus(t))
        },
        dm = /* */ Object.freeze({
            focus: fm,
            blur: function(t, n) {
                n.ignore || t.element().dom().blur()
            },
            isFocused: function(t) {
                return n = t.element(), e = ce(n).dom(), n.dom() === e.activeElement;
                var n, e
            }
        }),
        mm = /* */ Object.freeze({
            exhibit: function(t, n) {
                var e = n.ignore ? {} : {
                    attributes: {
                        tabindex: "-1"
                    }
                };
                return Oi(e)
            },
            events: function(e) {
                return Gr([qr(wn(), function(t, n) {
                    fm(t, e), n.stop()
                })].concat(e.stopMousedown ? [qr(At(), function(t, n) {
                    n.event().prevent()
                })] : []))
            }
        }),
        hm = [Mu("onFocus"), vr("stopMousedown", !1), vr("ignore", !1)],
        gm = Pu({
            fields: hm,
            name: "focusing",
            active: mm,
            apis: dm
        }),
        vm = function(t, n, e) {
            var o = n.aria;
            o.update(t, o, e.get())
        },
        pm = function(n, t, e) {
            t.toggleClass.each(function(t) {
                e.get() ? Ri(n.element(), t) : Pi(n.element(), t)
            })
        },
        bm = function(t, n, e) {
            wm(t, n, e, !e.get())
        },
        ym = function(t, n, e) {
            e.set(!0), pm(t, n, e), vm(t, n, e)
        },
        xm = function(t, n, e) {
            e.set(!1), pm(t, n, e), vm(t, n, e)
        },
        wm = function(t, n, e, o) {
            (o ? ym : xm)(t, n, e)
        },
        zm = function(t, n, e) {
            wm(t, n, e, n.selected)
        },
        Sm = /* */ Object.freeze({
            onLoad: zm,
            toggle: bm,
            isOn: function(t, n, e) {
                return e.get()
            },
            on: ym,
            off: xm,
            set: wm
        }),
        km = /* */ Object.freeze({
            exhibit: function(t, n, e) {
                return Oi({})
            },
            events: function(t, n) {
                var e, o, r, i = (e = t, o = n, r = bm, ii(function(t) {
                        r(t, e, o)
                    })),
                    u = Du(t, n, zm);
                return Gr(R([t.toggleOnExecute ? [i] : [],
                    [u]
                ]))
            }
        }),
        Cm = /* */ Object.freeze({
            init: function(t) {
                var n = Ot(!1);
                return {
                    readState: function() {
                        return n.get()
                    },
                    get: function() {
                        return n.get()
                    },
                    set: function(t) {
                        return n.set(t)
                    },
                    clear: function() {
                        return n.set(!1)
                    }
                }
            }
        }),
        Om = function(t, n, e) {
            Ee(t.element(), "aria-expanded", e)
        },
        Mm = [vr("selected", !1), fr("toggleClass"), vr("toggleOnExecute", !0), pr("aria", {
            mode: "none"
        }, Ko("mode", {
            pressed: [vr("syncWithExpanded", !1), Tu("update", function(t, n, e) {
                Ee(t.element(), "aria-pressed", e), n.syncWithExpanded && Om(t, n, e)
            })],
            checked: [Tu("update", function(t, n, e) {
                Ee(t.element(), "aria-checked", e)
            })],
            expanded: [Tu("update", Om)],
            selected: [Tu("update", function(t, n, e) {
                Ee(t.element(), "aria-selected", e)
            })],
            none: [Tu("update", Q)]
        }))],
        Hm = Pu({
            fields: Mm,
            name: "toggling",
            active: km,
            apis: Sm,
            state: Cm
        }),
        Em = "alloy.item-hover",
        Vm = "alloy.item-focus",
        Tm = function(t) {
            (hf(t.element()).isNone() || gm.isFocused(t)) && (gm.isFocused(t) || gm.focus(t), Er(t, Em, {
                item: t
            }))
        },
        Am = function(t) {
            Er(t, Vm, {
                item: t
            })
        },
        Bm = Z(Em),
        Dm = Z(Vm),
        _m = function(t, n) {
            var e, o;
            return {
                key: t,
                value: {
                    config: {},
                    me: (e = t, o = Gr(n), Pu({
                        fields: [or("enabled")],
                        name: e,
                        active: {
                            events: Z(o)
                        }
                    })),
                    configAsRaw: Z({}),
                    initialConfig: {},
                    state: Si
                }
            }
        },
        Fm = [or("data"), or("components"), or("dom"), vr("hasSubmenu", !1), fr("toggling"), Is("itemBehaviours", [Hm, gm, Xd, lm]), vr("ignoreFocus", !1), vr("domModification", {}), Tu("builder", function(t) {
            return {
                dom: t.dom,
                domModification: Ke({}, t.domModification, {
                    attributes: Ke({
                        role: t.toggling.isSome() ? "menuitemcheckbox" : "menuitem"
                    }, t.domModification.attributes, {
                        "aria-haspopup": t.hasSubmenu
                    }, t.hasSubmenu ? {
                        "aria-expanded": !1
                    } : {})
                }),
                behaviours: Ls(t.itemBehaviours, [t.toggling.fold(Hm.revoke, function(t) {
                    return Hm.config(Ke({
                        aria: {
                            mode: "checked"
                        }
                    }, t))
                }), gm.config({
                    ignore: t.ignoreFocus,
                    stopMousedown: t.ignoreFocus,
                    onFocus: function(t) {
                        Am(t)
                    }
                }), Xd.config({
                    mode: "execution"
                }), lm.config({
                    store: {
                        mode: "memory",
                        initialValue: t.data
                    }
                }), _m("item-type-events", [qr(Hn(), Vr), Zr(At()), qr(Ft(), Tm), qr(On(), gm.focus)])]),
                components: t.components,
                eventOrder: t.eventOrder
            }
        }), vr("eventOrder", {})],
        Im = [or("dom"), or("components"), Tu("builder", function(t) {
            return {
                dom: t.dom,
                components: t.components,
                events: Gr([ti(On())])
            }
        })],
        Lm = Z([cl({
            name: "widget",
            overrides: function(n) {
                return {
                    behaviours: Ru([lm.config({
                        store: {
                            mode: "manual",
                            getValue: function(t) {
                                return n.data
                            },
                            setValue: function() {}
                        }
                    })])
                }
            }
        })]),
        Rm = [or("uid"), or("data"), or("components"), or("dom"), vr("autofocus", !1), vr("ignoreFocus", !1), Is("widgetBehaviours", [lm, gm, Xd]), vr("domModification", {}), El(Lm()), Tu("builder", function(e) {
            var t = xl(0, e, Lm()),
                n = wl("item-widget", e, t.internals()),
                o = function(t) {
                    return zl(t, e, "widget").map(function(t) {
                        return Xd.focusIn(t), t
                    })
                },
                r = function(t, n) {
                    return Ll(n.event().target()) || e.autofocus && n.setSource(t.element()), tt.none()
                };
            return {
                dom: e.dom,
                components: n,
                domModification: e.domModification,
                events: Gr([ii(function(t, n) {
                    o(t).each(function(t) {
                        n.stop()
                    })
                }), qr(Ft(), Tm), qr(On(), function(t, n) {
                    e.autofocus ? o(t) : gm.focus(t)
                })]),
                behaviours: Ls(e.widgetBehaviours, [lm.config({
                    store: {
                        mode: "memory",
                        initialValue: e.data
                    }
                }), gm.config({
                    ignore: e.ignoreFocus,
                    onFocus: function(t) {
                        Am(t)
                    }
                }), Xd.config({
                    mode: "special",
                    focusIn: e.autofocus ? function(t) {
                        o(t)
                    } : Wu(),
                    onLeft: r,
                    onRight: r,
                    onEscape: function(t, n) {
                        return gm.isFocused(t) || e.autofocus ? (e.autofocus && n.setSource(t.element()), tt.none()) : (gm.focus(t), tt.some(!0))
                    }
                })])
            }
        })],
        Nm = Ko("type", {
            widget: Rm,
            item: Fm,
            separator: Im
        }),
        Pm = Z([fl({
            factory: {
                sketch: function(t) {
                    var n = Yo("menu.spec item", Nm, t);
                    return n.builder(n)
                }
            },
            name: "items",
            unit: "item",
            defaults: function(t, n) {
                return n.hasOwnProperty("uid") ? n : Ke({}, n, {
                    uid: hi("item")
                })
            },
            overrides: function(t, n) {
                return {
                    type: n.type,
                    ignoreFocus: t.fakeFocus,
                    domModification: {
                        classes: [t.markers.item]
                    }
                }
            }
        })]),
        jm = Z([or("value"), or("items"), or("dom"), or("components"), vr("eventOrder", {}), Ds("menuBehaviours", [tf, lm, Pl, Xd]), pr("movement", {
            mode: "menu",
            moveOnTab: !0
        }, Ko("mode", {
            grid: [Bu(), Tu("config", function(t, n) {
                return {
                    mode: "flatgrid",
                    selector: "." + t.markers.item,
                    initSize: {
                        numColumns: n.initSize.numColumns,
                        numRows: n.initSize.numRows
                    },
                    focusManager: t.focusManager
                }
            })],
            matrix: [Tu("config", function(t, n) {
                return {
                    mode: "matrix",
                    selectors: {
                        row: n.rowSelector,
                        cell: "." + t.markers.item
                    },
                    focusManager: t.focusManager
                }
            }), or("rowSelector")],
            menu: [vr("moveOnTab", !0), Tu("config", function(t, n) {
                return {
                    mode: "menu",
                    selector: "." + t.markers.item,
                    moveOnTab: n.moveOnTab,
                    focusManager: t.focusManager
                }
            })]
        })), rr("markers", zu()), vr("fakeFocus", !1), vr("focusManager", vf()), Mu("onHighlight")]),
        Um = Z("alloy.menu-focus"),
        Wm = Il({
            name: "Menu",
            configFields: jm(),
            partFields: Pm(),
            factory: function(t, n, e, o) {
                return {
                    uid: t.uid,
                    dom: t.dom,
                    markers: t.markers,
                    behaviours: Fs(t.menuBehaviours, [tf.config({
                        highlightClass: t.markers.selectedItem,
                        itemClass: t.markers.item,
                        onHighlight: t.onHighlight
                    }), lm.config({
                        store: {
                            mode: "memory",
                            initialValue: t.value
                        }
                    }), Pl.config({
                        find: tt.some
                    }), Xd.config(t.movement.config(t, t.movement))]),
                    events: Gr([qr(Dm(), function(n, e) {
                        var t = e.event();
                        n.getSystem().getByDom(t.target()).each(function(t) {
                            tf.highlight(n, t), e.stop(), Er(n, Um(), {
                                menu: n,
                                item: t
                            })
                        })
                    }), qr(Bm(), function(t, n) {
                        var e = n.event().item();
                        tf.highlight(t, e)
                    })]),
                    components: n,
                    eventOrder: t.eventOrder,
                    domModification: {
                        attributes: {
                            role: "menu"
                        }
                    }
                }
            }
        }),
        Gm = function(e, o, r, t) {
            return wt(r, t).bind(function(t) {
                return wt(e, t).bind(function(t) {
                    var n = Gm(e, o, r, t);
                    return tt.some([t].concat(n))
                })
            }).getOr([])
        },
        Xm = function(t, n) {
            var e = {};
            $(t, function(t, n) {
                T(t, function(t) {
                    e[t] = n
                })
            });
            var o = n,
                r = et(n, function(t, n) {
                    return {
                        k: t,
                        v: n
                    }
                }),
                i = nt(r, function(t, n) {
                    return [n].concat(Gm(e, o, r, n))
                });
            return nt(e, function(t) {
                return wt(i, t).getOr([t])
            })
        },
        Ym = function() {
            var i = Ot({}),
                u = Ot({}),
                a = Ot({}),
                c = Ot(tt.none()),
                s = Ot({}),
                n = function(t) {
                    return wt(u.get(), t)
                };
            return {
                setMenuBuilt: function(t, n) {
                    var e;
                    u.set(Ke({}, u.get(), ((e = {})[t] = {
                        type: "prepared",
                        menu: n
                    }, e)))
                },
                setContents: function(t, n, e, o) {
                    c.set(tt.some(t)), i.set(e), u.set(n), s.set(o);
                    var r = Xm(o, e);
                    a.set(r)
                },
                expand: function(e) {
                    return wt(i.get(), e).map(function(t) {
                        var n = wt(a.get(), e).getOr([]);
                        return [t].concat(n)
                    })
                },
                refresh: function(t) {
                    return wt(a.get(), t)
                },
                collapse: function(t) {
                    return wt(a.get(), t).bind(function(t) {
                        return 1 < t.length ? tt.some(t.slice(1)) : tt.none()
                    })
                },
                lookupMenu: n,
                otherMenus: function(t) {
                    var n = s.get();
                    return W(K(n), t)
                },
                getPrimary: function() {
                    return c.get().bind(function(t) {
                        return n(t).bind(function(t) {
                            return "prepared" === t.type ? tt.some(t.menu) : tt.none()
                        })
                    })
                },
                getMenus: function() {
                    return u.get()
                },
                clear: function() {
                    i.set({}), u.set({}), a.set({}), c.set(tt.none())
                },
                isClear: function() {
                    return c.get().isNone()
                }
            }
        },
        qm = Z("collapse-item"),
        Km = Fl({
            name: "TieredMenu",
            configFields: [Vu("onExecute"), Vu("onEscape"), Eu("onOpenMenu"), Eu("onOpenSubmenu"), Mu("onCollapseMenu"), vr("highlightImmediately", !0), cr("data", [or("primary"), or("menus"), or("expansions")]), vr("fakeFocus", !1), Mu("onHighlight"), Mu("onHover"), ku(), or("dom"), vr("navigateOnHover", !0), vr("stayInDom", !1), Ds("tmenuBehaviours", [Xd, tf, Pl, $d]), vr("eventOrder", {})],
            apis: {
                collapseMenu: function(t, n) {
                    t.collapseMenu(n)
                },
                highlightPrimary: function(t, n) {
                    t.highlightPrimary(n)
                }
            },
            factory: function(a, t) {
                var c, n, i = Ot(tt.none()),
                    s = Ym(),
                    e = function(t) {
                        var o, r, n, e = (o = t, r = a.data.primary, n = a.data.menus, nt(n, function(t, n) {
                                var e = function() {
                                    return Wm.sketch(Ke({
                                        dom: t.dom
                                    }, t, {
                                        value: n,
                                        items: t.items,
                                        markers: a.markers,
                                        fakeFocus: a.fakeFocus,
                                        onHighlight: a.onHighlight,
                                        focusManager: a.fakeFocus ? pf() : vf()
                                    }))
                                };
                                return n === r ? {
                                    type: "prepared",
                                    menu: o.getSystem().build(e())
                                } : {
                                    type: "notbuilt",
                                    nbMenu: e
                                }
                            })),
                            i = u(t);
                        return s.setContents(a.data.primary, e, a.data.expansions, i), s.getPrimary()
                    },
                    l = function(t) {
                        return lm.getValue(t).value
                    },
                    u = function(t) {
                        return nt(a.data.menus, function(t, n) {
                            return N(t.items, function(t) {
                                return "separator" === t.type ? [] : [t.data.value]
                            })
                        })
                    },
                    f = function(n, t) {
                        tf.highlight(n, t), tf.getHighlighted(t).orThunk(function() {
                            return tf.getFirst(t)
                        }).each(function(t) {
                            Tr(n, t.element(), On())
                        })
                    },
                    d = function(n, t) {
                        return Mt(V(t, function(t) {
                            return n.lookupMenu(t).bind(function(t) {
                                return "prepared" === t.type ? tt.some(t.menu) : tt.none()
                            })
                        }))
                    },
                    m = function(n, t, e) {
                        var o = d(t, t.otherMenus(e));
                        T(o, function(t) {
                            Wi(t.element(), [a.markers.backgroundMenu]), a.stayInDom || $d.remove(n, t)
                        })
                    },
                    h = function(t, o) {
                        var r, n = (r = t, i.get().getOrThunk(function() {
                            var e = {},
                                t = Vc(r.element(), "." + a.markers.item),
                                n = A(t, function(t) {
                                    return "true" === Te(t, "aria-haspopup")
                                });
                            return T(n, function(t) {
                                r.getSystem().getByDom(t).each(function(t) {
                                    var n = l(t);
                                    e[n] = t
                                })
                            }), i.set(tt.some(e)), e
                        }));
                        $(n, function(t, n) {
                            var e = M(o, n);
                            Ee(t.element(), "aria-expanded", e)
                        })
                    },
                    g = function(o, r, i) {
                        return tt.from(i[0]).bind(function(t) {
                            return r.lookupMenu(t).bind(function(t) {
                                if ("notbuilt" === t.type) return tt.none();
                                var n = t.menu,
                                    e = d(r, i.slice(1));
                                return T(e, function(t) {
                                    Ri(t.element(), a.markers.backgroundMenu)
                                }), Lr(n.element()) || $d.append(o, hu(n)), Wi(n.element(), [a.markers.backgroundMenu]), f(o, n), m(o, r, i), tt.some(n)
                            })
                        })
                    };
                (n = c || (c = {}))[n.HighlightSubmenu = 0] = "HighlightSubmenu", n[n.HighlightParent = 1] = "HighlightParent";
                var v = function(r, i, u) {
                        void 0 === u && (u = c.HighlightSubmenu);
                        var t = l(i);
                        return s.expand(t).bind(function(o) {
                            return h(r, o), tt.from(o[0]).bind(function(e) {
                                return s.lookupMenu(e).bind(function(t) {
                                    var n = function(t, n, e) {
                                        if ("notbuilt" !== e.type) return e.menu;
                                        var o = t.getSystem().build(e.nbMenu());
                                        return s.setMenuBuilt(n, o), o
                                    }(r, e, t);
                                    return Lr(n.element()) || $d.append(r, hu(n)), a.onOpenSubmenu(r, i, n), u === c.HighlightSubmenu ? (tf.highlightFirst(n), g(r, s, o)) : (tf.dehighlightAll(n), tt.some(i))
                                })
                            })
                        })
                    },
                    o = function(n, e) {
                        var t = l(e);
                        return s.collapse(t).bind(function(t) {
                            return h(n, t), g(n, s, t).map(function(t) {
                                return a.onCollapseMenu(n, e, t), t
                            })
                        })
                    },
                    r = function(e) {
                        return function(n, t) {
                            return pu(t.getSource(), "." + a.markers.item).bind(function(t) {
                                return n.getSystem().getByDom(t).toOption().bind(function(t) {
                                    return e(n, t).map(function() {
                                        return !0
                                    })
                                })
                            })
                        }
                    },
                    p = Gr([qr(Um(), function(n, t) {
                        var e = t.event().menu();
                        tf.highlight(n, e);
                        var o = l(t.event().item());
                        s.refresh(o).each(function(t) {
                            return m(n, s, t)
                        })
                    }), ii(function(n, t) {
                        var e = t.event().target();
                        n.getSystem().getByDom(e).each(function(t) {
                            0 === l(t).indexOf("collapse-item") && o(n, t), v(n, t, c.HighlightSubmenu).fold(function() {
                                a.onExecute(n, t)
                            }, function() {})
                        })
                    }), ei(function(n, t) {
                        e(n).each(function(t) {
                            $d.append(n, hu(t)), a.onOpenMenu(n, t), a.highlightImmediately && f(n, t)
                        })
                    })].concat(a.navigateOnHover ? [qr(Bm(), function(t, n) {
                        var e, o, r = n.event().item();
                        e = t, o = l(r), s.refresh(o).bind(function(t) {
                            return h(e, t), g(e, s, t)
                        }), v(t, r, c.HighlightParent), a.onHover(t, r)
                    })] : [])),
                    b = {
                        collapseMenu: function(n) {
                            tf.getHighlighted(n).each(function(t) {
                                tf.getHighlighted(t).each(function(t) {
                                    o(n, t)
                                })
                            })
                        },
                        highlightPrimary: function(n) {
                            s.getPrimary().each(function(t) {
                                f(n, t)
                            })
                        }
                    };
                return {
                    uid: a.uid,
                    dom: a.dom,
                    markers: a.markers,
                    behaviours: Fs(a.tmenuBehaviours, [Xd.config({
                        mode: "special",
                        onRight: r(function(t, n) {
                            return Ll(n.element()) ? tt.none() : v(t, n, c.HighlightSubmenu)
                        }),
                        onLeft: r(function(t, n) {
                            return Ll(n.element()) ? tt.none() : o(t, n)
                        }),
                        onEscape: r(function(t, n) {
                            return o(t, n).orThunk(function() {
                                return a.onEscape(t, n).map(function() {
                                    return t
                                })
                            })
                        }),
                        focusIn: function(n, t) {
                            s.getPrimary().each(function(t) {
                                Tr(n, t.element(), On())
                            })
                        }
                    }), tf.config({
                        highlightClass: a.markers.selectedMenu,
                        itemClass: a.markers.menu
                    }), Pl.config({
                        find: function(t) {
                            return tf.getHighlighted(t)
                        }
                    }), $d.config({})]),
                    eventOrder: a.eventOrder,
                    apis: b,
                    events: p
                }
            },
            extraApis: {
                tieredData: function(t, n, e) {
                    return {
                        primary: t,
                        menus: n,
                        expansions: e
                    }
                },
                singleData: function(t, n) {
                    return {
                        primary: t,
                        menus: zt(t, n),
                        expansions: {}
                    }
                },
                collapseItem: function(t) {
                    return {
                        value: Ye(qm()),
                        meta: {
                            text: t
                        }
                    }
                }
            }
        }),
        Jm = Fl({
            name: "InlineView",
            configFields: [or("lazySink"), Mu("onShow"), Mu("onHide"), hr("onEscape"), Ds("inlineBehaviours", [Hs, Yu]), gr("fireDismissalEventInstead", [vr("event", In())]), vr("getRelated", tt.none), vr("eventOrder", tt.none)],
            factory: function(s, t) {
                var r = function(t, n, e, o) {
                        var r = s.lazySink(t).getOrDie();
                        Hs.openWhileCloaked(t, e, function() {
                            return ss.positionWithin(r, n, t, o)
                        }), s.onShow(t)
                    },
                    n = {
                        setContent: function(t, n) {
                            Hs.open(t, n)
                        },
                        showAt: function(t, n, e) {
                            var o = tt.none();
                            r(t, n, e, o)
                        },
                        showWithin: r,
                        showMenuAt: function(t, n, e) {
                            var o, r, i, u, a, c = (o = s, r = t, i = n, u = e, a = function() {
                                return o.lazySink(r)
                            }, Km.sketch({
                                dom: {
                                    tag: "div"
                                },
                                data: u.data,
                                markers: u.menu.markers,
                                onEscape: function() {
                                    return Hs.close(r), o.onEscape.map(function(t) {
                                        return t(r)
                                    }), tt.some(!0)
                                },
                                onExecute: function() {
                                    return tt.some(!0)
                                },
                                onOpenMenu: function(t, n) {
                                    ss.position(a().getOrDie(), i, n)
                                },
                                onOpenSubmenu: function(t, n, e) {
                                    var o = a().getOrDie();
                                    ss.position(o, {
                                        anchor: "submenu",
                                        item: n
                                    }, e)
                                }
                            }));
                            Hs.open(t, c), s.onShow(t)
                        },
                        hide: function(t) {
                            Hs.close(t), s.onHide(t)
                        },
                        getContent: function(t) {
                            return Hs.getState(t)
                        },
                        isOpen: Hs.isOpen
                    };
                return {
                    uid: s.uid,
                    dom: s.dom,
                    behaviours: Fs(s.inlineBehaviours, [Hs.config({
                        isPartOf: function(t, n, e) {
                            return yu(n, e) || (o = t, r = e, s.getRelated(o).exists(function(t) {
                                return yu(t, r)
                            }));
                            var o, r
                        },
                        getAttachPoint: function(t) {
                            return s.lazySink(t).getOrDie()
                        }
                    }), As(Ke({
                        isExtraPart: Z(!1)
                    }, s.fireDismissalEventInstead.map(function(t) {
                        return {
                            fireEventInstead: {
                                event: t.event
                            }
                        }
                    }).getOr({})))]),
                    eventOrder: s.eventOrder,
                    apis: n
                }
            },
            apis: {
                showAt: function(t, n, e, o) {
                    t.showAt(n, e, o)
                },
                showWithin: function(t, n, e, o, r) {
                    t.showWithin(n, e, o, r)
                },
                showMenuAt: function(t, n, e, o) {
                    t.showMenuAt(n, e, o)
                },
                hide: function(t, n) {
                    t.hide(n)
                },
                isOpen: function(t, n) {
                    return t.isOpen(n)
                },
                getContent: function(t, n) {
                    return t.getContent(n)
                },
                setContent: function(t, n, e) {
                    t.setContent(n, e)
                }
            }
        }),
        $m = function(t) {
            var n = function(t, n) {
                    n.stop(), Vr(t)
                },
                e = yn.detect().deviceType.isTouch() ? [qr(Mn(), n)] : [qr(Ut(), n), qr(At(), function(t, n) {
                    n.cut()
                })];
            return Gr(R([t.map(function(e) {
                return qr(Cn(), function(t, n) {
                    e(t), n.stop()
                })
            }).toArray(), e]))
        },
        Qm = Fl({
            name: "Button",
            factory: function(t) {
                var n = $m(t.action),
                    e = t.dom.tag,
                    o = function(n) {
                        return wt(t.dom, "attributes").bind(function(t) {
                            return wt(t, n)
                        })
                    };
                return {
                    uid: t.uid,
                    dom: t.dom,
                    components: t.components,
                    events: n,
                    behaviours: Ls(t.buttonBehaviours, [gm.config({}), Xd.config({
                        mode: "execution",
                        useSpace: !0,
                        useEnter: !0
                    })]),
                    domModification: {
                        attributes: function() {
                            if ("button" !== e) return {
                                role: o("role").getOr("button")
                            };
                            var t = o("type").getOr("button"),
                                n = o("role").map(function(t) {
                                    return {
                                        role: t
                                    }
                                }).getOr({});
                            return Ke({
                                type: t
                            }, n)
                        }()
                    },
                    eventOrder: t.eventOrder
                }
            },
            configFields: [vr("uid", undefined), or("dom"), vr("components", []), Is("buttonBehaviours", [gm, Xd]), fr("action"), fr("role"), vr("eventOrder", {})]
        }),
        Zm = function(t) {
            var n = function e(t) {
                return t.uid !== undefined
            }(t) && Ct(t, "uid") ? t.uid : hi("memento");
            return {
                get: function(t) {
                    return t.getSystem().getByUid(n).getOrDie()
                },
                getOpt: function(t) {
                    return t.getSystem().getByUid(n).fold(tt.none, tt.some)
                },
                asSpec: function() {
                    return Ke({}, t, {
                        uid: n
                    })
                }
            }
        },
        th = {
            "accessibility-check": '<svg width="24" height="24"><path d="M12 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2zm8 7h-5v12c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-5c0-.6-.4-1-1-1a1 1 0 0 0-1 1v5c0 .6-.4 1-1 1a1 1 0 0 1-1-1V9H4a1 1 0 1 1 0-2h16c.6 0 1 .4 1 1s-.4 1-1 1z" fill-rule="nonzero"/></svg>',
            "align-center": '<svg width="24" height="24"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm3 4h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 1 1 0-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2zm-3-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
            "align-justify": '<svg width="24" height="24"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
            "align-left": '<svg width="24" height="24"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 4h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2zm0-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
            "align-none": '<svg width="24" height="24"><path d="M14.2 5L13 7H5a1 1 0 1 1 0-2h9.2zm4 0h.8a1 1 0 0 1 0 2h-2l1.2-2zm-6.4 4l-1.2 2H5a1 1 0 0 1 0-2h6.8zm4 0H19a1 1 0 0 1 0 2h-4.4l1.2-2zm-6.4 4l-1.2 2H5a1 1 0 0 1 0-2h4.4zm4 0H19a1 1 0 0 1 0 2h-6.8l1.2-2zM7 17l-1.2 2H5a1 1 0 0 1 0-2h2zm4 0h8a1 1 0 0 1 0 2H9.8l1.2-2zm5.2-13.5l1.3.7-9.7 16.3-1.3-.7 9.7-16.3z" fill-rule="evenodd"/></svg>',
            "align-right": '<svg width="24" height="24"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm6 4h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm-6-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
            "arrow-left": '<svg width="24" height="24"><path d="M5.6 13l12 6a1 1 0 0 0 1.4-1V6a1 1 0 0 0-1.4-.9l-12 6a1 1 0 0 0 0 1.8z" fill-rule="evenodd"/></svg>',
            "arrow-right": '<svg width="24" height="24"><path d="M18.5 13l-12 6A1 1 0 0 1 5 18V6a1 1 0 0 1 1.4-.9l12 6a1 1 0 0 1 0 1.8z" fill-rule="evenodd"/></svg>',
            bold: '<svg width="24" height="24"><path d="M7.8 19c-.3 0-.5 0-.6-.2l-.2-.5V5.7c0-.2 0-.4.2-.5l.6-.2h5c1.5 0 2.7.3 3.5 1 .7.6 1.1 1.4 1.1 2.5a3 3 0 0 1-.6 1.9c-.4.6-1 1-1.6 1.2.4.1.9.3 1.3.6s.8.7 1 1.2c.4.4.5 1 .5 1.6 0 1.3-.4 2.3-1.3 3-.8.7-2.1 1-3.8 1H7.8zm5-8.3c.6 0 1.2-.1 1.6-.5.4-.3.6-.7.6-1.3 0-1.1-.8-1.7-2.3-1.7H9.3v3.5h3.4zm.5 6c.7 0 1.3-.1 1.7-.4.4-.4.6-.9.6-1.5s-.2-1-.7-1.4c-.4-.3-1-.4-2-.4H9.4v3.8h4z" fill-rule="evenodd"/></svg>',
            bookmark: '<svg width="24" height="24"><path d="M6 4v17l6-4 6 4V4c0-.6-.4-1-1-1H7a1 1 0 0 0-1 1z" fill-rule="nonzero"/></svg>',
            "border-width": '<svg width="24" height="24"><path d="M5 14.8h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm-.5 3.7h15c.3 0 .5.2.5.5s-.2.5-.5.5h-15a.5.5 0 1 1 0-1zm.5-8.3h14c.6 0 1 .4 1 1v1c0 .5-.4 1-1 1H5a1 1 0 0 1-1-1v-1c0-.6.4-1 1-1zm0-5.7h14c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1v-2c0-.6.4-1 1-1z" fill-rule="evenodd"/></svg>',
            brightness: '<svg width="24" height="24"><path d="M12 17c.3 0 .5.1.7.3.2.2.3.4.3.7v1c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7v-1c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3zm0-10a1 1 0 0 1-.7-.3A1 1 0 0 1 11 6V5c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3.3 0 .5.1.7.3.2.2.3.4.3.7v1c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3zm7 4c.3 0 .5.1.7.3.2.2.3.4.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3h-1a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h1zM7 12c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3H5a1 1 0 0 1-.7-.3A1 1 0 0 1 4 12c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h1c.3 0 .5.1.7.3.2.2.3.4.3.7zm10 3.5l.7.8c.2.1.3.4.3.6 0 .3-.1.6-.3.8a1 1 0 0 1-.8.3 1 1 0 0 1-.6-.3l-.8-.7a1 1 0 0 1-.3-.8c0-.2.1-.5.3-.7a1 1 0 0 1 1.4 0zm-10-7l-.7-.8a1 1 0 0 1-.3-.6c0-.3.1-.6.3-.8.2-.2.5-.3.8-.3.2 0 .5.1.7.3l.7.7c.2.2.3.5.3.8 0 .2-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.8-.3zm10 0a1 1 0 0 1-.8.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.3.1-.6.3-.8l.8-.7c.1-.2.4-.3.6-.3.3 0 .6.1.8.3.2.2.3.5.3.8 0 .2-.1.5-.3.7l-.7.7zm-10 7c.2-.2.5-.3.8-.3.2 0 .5.1.7.3a1 1 0 0 1 0 1.4l-.8.8a1 1 0 0 1-.6.3 1 1 0 0 1-.8-.3 1 1 0 0 1-.3-.8c0-.2.1-.5.3-.6l.7-.8zM12 8a4 4 0 0 1 3.7 2.4 4 4 0 0 1 0 3.2A4 4 0 0 1 12 16a4 4 0 0 1-3.7-2.4 4 4 0 0 1 0-3.2A4 4 0 0 1 12 8zm0 6.5c.7 0 1.3-.2 1.8-.7.5-.5.7-1.1.7-1.8s-.2-1.3-.7-1.8c-.5-.5-1.1-.7-1.8-.7s-1.3.2-1.8.7c-.5.5-.7 1.1-.7 1.8s.2 1.3.7 1.8c.5.5 1.1.7 1.8.7z" fill-rule="evenodd"/></svg>',
            browse: '<svg width="24" height="24"><path d="M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4v-2h4V8H5v10h4v2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14zm-8 9.4l-2.3 2.3a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L13 13.4V20a1 1 0 0 1-2 0v-6.6z" fill-rule="nonzero"/></svg>',
            cancel: '<svg width="24" height="24"><path d="M12 4.6a7.4 7.4 0 1 1 0 14.8 7.4 7.4 0 0 1 0-14.8zM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 8L14.8 8l1 1.1-2.7 2.8 2.7 2.7-1.1 1.1-2.7-2.7-2.7 2.7-1-1.1 2.6-2.7-2.7-2.7 1-1.1 2.8 2.7z" fill-rule="nonzero"/></svg>',
            "change-case": '<svg width="24" height="24"><path d="M18.4 18.2v-.6c-.5.8-1.3 1.2-2.4 1.2-2.2 0-3.3-1.6-3.3-4.8 0-3.1 1-4.7 3.3-4.7 1.1 0 1.8.3 2.4 1.1v-.6c0-.5.4-.8.8-.8s.8.3.8.8v8.4c0 .5-.4.8-.8.8a.8.8 0 0 1-.8-.8zm-2-7.4c-1.3 0-1.8.9-1.8 3.2 0 2.4.5 3.3 1.7 3.3 1.3 0 1.8-.9 1.8-3.2 0-2.4-.5-3.3-1.7-3.3zM10 15.7H5.5l-.8 2.6a1 1 0 0 1-1 .7h-.2a.7.7 0 0 1-.7-1l4-12a1 1 0 1 1 2 0l4 12a.7.7 0 0 1-.8 1h-.2a1 1 0 0 1-1-.7l-.8-2.6zm-.3-1.5l-2-6.5-1.9 6.5h3.9z" fill-rule="evenodd"/></svg>',
            "character-count": '<svg width="24" height="24"><path d="M4 11.5h16v1H4v-1zm4.8-6.8V10H7.7V5.8h-1v-1h2zM11 8.3V9h2v1h-3V7.7l2-1v-.9h-2v-1h3v2.4l-2 1zm6.3-3.4V10h-3.1V9h2.1V8h-2.1V6.8h2.1v-1h-2.1v-1h3.1zM5.8 16.4c0-.5.2-.8.5-1 .2-.2.6-.3 1.2-.3l.8.1c.2 0 .4.2.5.3l.4.4v2.8l.2.3H8.2v-.1-.2l-.6.3H7c-.4 0-.7 0-1-.2a1 1 0 0 1-.3-.9c0-.3 0-.6.3-.8.3-.2.7-.4 1.2-.4l.6-.2h.3v-.2l-.1-.2a.8.8 0 0 0-.5-.1 1 1 0 0 0-.4 0l-.3.4h-1zm2.3.8h-.2l-.2.1-.4.1a1 1 0 0 0-.4.2l-.2.2.1.3.5.1h.4l.4-.4v-.6zm2-3.4h1.2v1.7l.5-.3h.5c.5 0 .9.1 1.2.5.3.4.5.8.5 1.4 0 .6-.2 1.1-.5 1.5-.3.4-.7.6-1.3.6l-.6-.1-.4-.4v.4h-1.1v-5.4zm1.1 3.3c0 .3 0 .6.2.8a.7.7 0 0 0 1.2 0l.2-.8c0-.4 0-.6-.2-.8a.7.7 0 0 0-.6-.3l-.6.3-.2.8zm6.1-.5c0-.2 0-.3-.2-.4a.8.8 0 0 0-.5-.2c-.3 0-.5.1-.6.3l-.2.9c0 .3 0 .6.2.8.1.2.3.3.6.3.2 0 .4 0 .5-.2l.2-.4h1.1c0 .5-.3.8-.6 1.1a2 2 0 0 1-1.3.4c-.5 0-1-.2-1.3-.6a2 2 0 0 1-.5-1.4c0-.6.1-1.1.5-1.5.3-.4.8-.5 1.4-.5.5 0 1 0 1.2.3.4.3.5.7.5 1.2h-1v-.1z" fill-rule="evenodd"/></svg>',
            checklist: '<svg width="24" height="24"><path d="M11 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8a1 1 0 0 1 0 2h-8a1 1 0 0 1 0-2zM7.2 16c.2-.4.6-.5.9-.3.3.2.4.6.2 1L6 20c-.2.3-.7.4-1 0l-1.3-1.3a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8zm0-6c.2-.4.6-.5.9-.3.3.2.4.6.2 1L6 14c-.2.3-.7.4-1 0l-1.3-1.3a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8zm0-6c.2-.4.6-.5.9-.3.3.2.4.6.2 1L6 8c-.2.3-.7.4-1 0L3.8 6.9a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8z" fill-rule="evenodd"/></svg>',
            checkmark: '<svg width="24" height="24"><path d="M18.2 5.4a1 1 0 0 1 1.6 1.2l-8 12a1 1 0 0 1-1.5.1l-5-5a1 1 0 1 1 1.4-1.4l4.1 4.1 7.4-11z" fill-rule="nonzero"/></svg>',
            "chevron-down": '<svg width="10" height="10"><path d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z" fill-rule="nonzero"/></svg>',
            "chevron-left": '<svg width="10" height="10"><path d="M7.8 1.3L4 5l3.8 3.7c.3.3.3.8 0 1-.4.4-.9.4-1.2 0L2.2 5.7a.8.8 0 0 1 0-1.2L6.6.2C7 0 7.4 0 7.8.2c.3.3.3.8 0 1.1z" fill-rule="nonzero"/></svg>',
            "chevron-right": '<svg width="10" height="10"><path d="M2.2 1.3a.8.8 0 0 1 0-1c.4-.4.9-.4 1.2 0l4.4 4.1c.3.4.3.9 0 1.2L3.4 9.8c-.3.3-.8.3-1.2 0a.8.8 0 0 1 0-1.1L6 5 2.2 1.3z" fill-rule="nonzero"/></svg>',
            "chevron-up": '<svg width="10" height="10"><path d="M8.7 7.8L5 4 1.3 7.8c-.3.3-.8.3-1 0a.8.8 0 0 1 0-1.2l4.1-4.4c.3-.3.9-.3 1.2 0l4.2 4.4c.3.3.3.9 0 1.2-.3.3-.8.3-1.1 0z" fill-rule="nonzero"/></svg>',
            close: '<svg width="24" height="24"><path d="M17.3 8.2L13.4 12l3.9 3.8a1 1 0 0 1-1.5 1.5L12 13.4l-3.8 3.9a1 1 0 0 1-1.5-1.5l3.9-3.8-3.9-3.8a1 1 0 0 1 1.5-1.5l3.8 3.9 3.8-3.9a1 1 0 0 1 1.5 1.5z" fill-rule="evenodd"/></svg>',
            "code-sample": '<svg width="24" height="26"><path d="M7.1 11a2.8 2.8 0 0 1-.8 2 2.8 2.8 0 0 1 .8 2v1.7c0 .3.1.6.4.8.2.3.5.4.8.4.3 0 .4.2.4.4v.8c0 .2-.1.4-.4.4-.7 0-1.4-.3-2-.8-.5-.6-.8-1.3-.8-2V15c0-.3-.1-.6-.4-.8-.2-.3-.5-.4-.8-.4a.4.4 0 0 1-.4-.4v-.8c0-.2.2-.4.4-.4.3 0 .6-.1.8-.4.3-.2.4-.5.4-.8V9.3c0-.7.3-1.4.8-2 .6-.5 1.3-.8 2-.8.3 0 .4.2.4.4v.8c0 .2-.1.4-.4.4-.3 0-.6.1-.8.4-.3.2-.4.5-.4.8V11zm9.8 0V9.3c0-.3-.1-.6-.4-.8-.2-.3-.5-.4-.8-.4a.4.4 0 0 1-.4-.4V7c0-.2.1-.4.4-.4.7 0 1.4.3 2 .8.5.6.8 1.3.8 2V11c0 .3.1.6.4.8.2.3.5.4.8.4.2 0 .4.2.4.4v.8c0 .2-.2.4-.4.4-.3 0-.6.1-.8.4-.3.2-.4.5-.4.8v1.7c0 .7-.3 1.4-.8 2-.6.5-1.3.8-2 .8a.4.4 0 0 1-.4-.4v-.8c0-.2.1-.4.4-.4.3 0 .6-.1.8-.4.3-.2.4-.5.4-.8V15a2.8 2.8 0 0 1 .8-2 2.8 2.8 0 0 1-.8-2zm-3.3-.4c0 .4-.1.8-.5 1.1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5-.4-.3-.5-.7-.5-1.1 0-.5.1-.9.5-1.2.3-.3.7-.4 1.1-.4.4 0 .8.1 1.1.4.4.3.5.7.5 1.2zM12 13c.4 0 .8.1 1.1.5.4.3.5.7.5 1.1 0 1-.1 1.6-.5 2a3 3 0 0 1-1.1 1c-.4.3-.8.4-1.1.4a.5.5 0 0 1-.5-.5V17a3 3 0 0 0 1-.2l.6-.6c-.6 0-1-.2-1.3-.5-.2-.3-.3-.7-.3-1 0-.5.1-1 .5-1.2.3-.4.7-.5 1.1-.5z" fill-rule="evenodd"/></svg>',
            "color-levels": '<svg width="24" height="24"><path d="M17.5 11.4A9 9 0 0 1 18 14c0 .5 0 1-.2 1.4 0 .4-.3.9-.5 1.3a6.2 6.2 0 0 1-3.7 3 5.7 5.7 0 0 1-3.2 0A5.9 5.9 0 0 1 7.6 18a6.2 6.2 0 0 1-1.4-2.6 6.7 6.7 0 0 1 0-2.8c0-.4.1-.9.3-1.3a13.6 13.6 0 0 1 2.3-4A20 20 0 0 1 12 4a26.4 26.4 0 0 1 3.2 3.4 18.2 18.2 0 0 1 2.3 4zm-2 4.5c.4-.7.5-1.4.5-2a7.3 7.3 0 0 0-1-3.2c.2.6.2 1.2.2 1.9a4.5 4.5 0 0 1-1.3 3 5.3 5.3 0 0 1-2.3 1.5 4.9 4.9 0 0 1-2 .1 4.3 4.3 0 0 0 2.4.8 4 4 0 0 0 2-.6 4 4 0 0 0 1.5-1.5z" fill-rule="evenodd"/></svg>',
            "color-picker": '<svg width="24" height="24"><path d="M12 3a9 9 0 0 0 0 18 1.5 1.5 0 0 0 1.1-2.5c-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill-rule="nonzero"/></svg>',
            "color-swatch-remove-color": '<svg width="24" height="24"><path stroke="#000" stroke-width="2" d="M21 3L3 21" fill-rule="evenodd"/></svg>',
            "color-swatch": '<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd"/></svg>',
            comment: '<svg width="24" height="24"><path d="M9 19l3-2h7c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h4v2zm-2 4v-4H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-6.4L7 23z" fill-rule="nonzero"/></svg>',
            contrast: '<svg width="24" height="24"><path d="M12 4a7.8 7.8 0 0 1 5.7 2.3A8 8 0 1 1 12 4zm-6 8a6 6 0 0 0 6 6V6a6 6 0 0 0-6 6z" fill-rule="evenodd"/></svg>',
            copy: '<svg width="24" height="24"><path d="M16 3H6a2 2 0 0 0-2 2v11h2V5h10V3zm1 4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9c0-1.2.9-2 2-2h7zm0 12V9h-7v10h7z" fill-rule="nonzero"/></svg>',
            crop: '<svg width="24" height="24"><path d="M17 8v7h2c.6 0 1 .4 1 1s-.4 1-1 1h-2v2c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-2H7V9H5a1 1 0 1 1 0-2h2V5c0-.6.4-1 1-1s1 .4 1 1v2h7l3-3 1 1-3 3zM9 9v5l5-5H9zm1 6h5v-5l-5 5z" fill-rule="evenodd"/></svg>',
            cut: '<svg width="24" height="24"><path d="M18 15c.6.7 1 1.4 1 2.3 0 .8-.2 1.5-.7 2l-.8.5-1 .2c-.4 0-.8 0-1.2-.3a3.9 3.9 0 0 1-2.1-2.2c-.2-.5-.3-1-.2-1.5l-1-1-1 1c0 .5 0 1-.2 1.5-.1.5-.4 1-.9 1.4-.3.4-.7.6-1.2.8l-1.2.3c-.4 0-.7 0-1-.2-.3 0-.6-.3-.8-.5-.5-.5-.8-1.2-.7-2 0-.9.4-1.6 1-2.2A3.7 3.7 0 0 1 8.6 14H9l1-1-4-4-.5-1a3.3 3.3 0 0 1 0-2c0-.4.3-.7.5-1l6 6 6-6 .5 1a3.3 3.3 0 0 1 0 2c0 .4-.3.7-.5 1l-4 4 1 1h.5c.4 0 .8 0 1.2.3.5.2.9.4 1.2.8zm-8.5 2.2l.1-.4v-.3-.4a1 1 0 0 0-.2-.5 1 1 0 0 0-.4-.2 1.6 1.6 0 0 0-.8 0 2.6 2.6 0 0 0-.8.3 2.5 2.5 0 0 0-.9 1.1l-.1.4v.7l.2.5.5.2h.7a2.5 2.5 0 0 0 .8-.3 2.8 2.8 0 0 0 1-1zm2.5-2.8c.4 0 .7-.1 1-.4.3-.3.4-.6.4-1s-.1-.7-.4-1c-.3-.3-.6-.4-1-.4s-.7.1-1 .4c-.3.3-.4.6-.4 1s.1.7.4 1c.3.3.6.4 1 .4zm5.4 4l.2-.5v-.4-.3a2.6 2.6 0 0 0-.3-.8 2.4 2.4 0 0 0-.7-.7 2.5 2.5 0 0 0-.8-.3 1.5 1.5 0 0 0-.8 0 1 1 0 0 0-.4.2 1 1 0 0 0-.2.5 1.5 1.5 0 0 0 0 .7v.4l.3.4.3.4a2.8 2.8 0 0 0 .8.5l.4.1h.7l.5-.2z" fill-rule="evenodd"/></svg>',
            "document-properties": '<svg width="24" height="24"><path d="M14.4 3H7a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7.6L14.4 3zM17 19H7V5h6v4h4v10z" fill-rule="nonzero"/></svg>',
            drag: '<svg width="24" height="24"><path d="M13 5h2v2h-2V5zm0 4h2v2h-2V9zM9 9h2v2H9V9zm4 4h2v2h-2v-2zm-4 0h2v2H9v-2zm0 4h2v2H9v-2zm4 0h2v2h-2v-2zM9 5h2v2H9V5z" fill-rule="evenodd"/></svg>',
            duplicate: '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M16 3v2H6v11H4V5c0-1.1.9-2 2-2h10zm3 8h-2V9h-7v10h9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9c0-1.2.9-2 2-2h7a2 2 0 0 1 2 2v2z"/><path d="M17 14h1a1 1 0 0 1 0 2h-1v1a1 1 0 0 1-2 0v-1h-1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 2 0v1z"/></g></svg>',
            "edit-image": '<svg width="24" height="24"><path d="M18 16h2V7a2 2 0 0 0-2-2H7v2h11v9zM6 17h15a1 1 0 0 1 0 2h-1v1a1 1 0 0 1-2 0v-1H6a2 2 0 0 1-2-2V7H3a1 1 0 1 1 0-2h1V4a1 1 0 1 1 2 0v13zm3-5.3l1.3 2 3-4.7 3.7 6H7l2-3.3z" fill-rule="nonzero"/></svg>',
            "embed-page": '<svg width="24" height="24"><path d="M19 6V5H5v14h2A13 13 0 0 1 19 6zm0 1.4c-.8.8-1.6 2.4-2.2 4.6H19V7.4zm0 5.6h-2.4c-.4 1.8-.6 3.8-.6 6h3v-6zm-4 6c0-2.2.2-4.2.6-6H13c-.7 1.8-1.1 3.8-1.1 6h3zm-4 0c0-2.2.4-4.2 1-6H9.6A12 12 0 0 0 8 19h3zM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm11.8 9c.4-1.9 1-3.4 1.8-4.5a9.2 9.2 0 0 0-4 4.5h2.2zm-3.4 0a12 12 0 0 1 2.8-4 12 12 0 0 0-5 4h2.2z" fill-rule="nonzero"/></svg>',
            embed: '<svg width="24" height="24"><path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm1 2v14h14V5H5zm4.8 2.6l5.6 4a.5.5 0 0 1 0 .8l-5.6 4A.5.5 0 0 1 9 16V8a.5.5 0 0 1 .8-.4z" fill-rule="nonzero"/></svg>',
            emoji: '<svg width="24" height="24"><path d="M9 11c.6 0 1-.4 1-1s-.4-1-1-1a1 1 0 0 0-1 1c0 .6.4 1 1 1zm6 0c.6 0 1-.4 1-1s-.4-1-1-1a1 1 0 0 0-1 1c0 .6.4 1 1 1zm-3 5.5c2.1 0 4-1.5 4.4-3.5H7.6c.5 2 2.3 3.5 4.4 3.5zM12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill-rule="nonzero"/></svg>',
            fill: '<svg width="24" height="26"><path d="M16.6 12l-9-9-1.4 1.4 2.4 2.4-5.2 5.1c-.5.6-.5 1.6 0 2.2L9 19.6a1.5 1.5 0 0 0 2.2 0l5.5-5.5c.5-.6.5-1.6 0-2.2zM5.2 13L10 8.2l4.8 4.8H5.2zM19 14.5s-2 2.2-2 3.5c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.3-2-3.5-2-3.5z" fill-rule="nonzero"/></svg>',
            "flip-horizontally": '<svg width="24" height="24"><path d="M14 19h2v-2h-2v2zm4-8h2V9h-2v2zM4 7v10c0 1.1.9 2 2 2h3v-2H6V7h3V5H6a2 2 0 0 0-2 2zm14-2v2h2a2 2 0 0 0-2-2zm-7 16h2V3h-2v18zm7-6h2v-2h-2v2zm-4-8h2V5h-2v2zm4 12a2 2 0 0 0 2-2h-2v2z" fill-rule="nonzero"/></svg>',
            "flip-vertically": '<svg width="24" height="24"><path d="M5 14v2h2v-2H5zm8 4v2h2v-2h-2zm4-14H7a2 2 0 0 0-2 2v3h2V6h10v3h2V6a2 2 0 0 0-2-2zm2 14h-2v2a2 2 0 0 0 2-2zM3 11v2h18v-2H3zm6 7v2h2v-2H9zm8-4v2h2v-2h-2zM5 18c0 1.1.9 2 2 2v-2H5z" fill-rule="nonzero"/></svg>',
            "format-painter": '<svg width="24" height="24"><path d="M18 5V4c0-.5-.4-1-1-1H5a1 1 0 0 0-1 1v4c0 .6.5 1 1 1h12c.6 0 1-.4 1-1V7h1v4H9v9c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-7h8V5h-3z" fill-rule="nonzero"/></svg>',
            fullscreen: '<svg width="24" height="24"><path d="M15.3 10l-1.2-1.3 2.9-3h-2.3a.9.9 0 1 1 0-1.7H19c.5 0 .9.4.9.9v4.4a.9.9 0 1 1-1.8 0V7l-2.9 3zm0 4l3 3v-2.3a.9.9 0 1 1 1.7 0V19c0 .5-.4.9-.9.9h-4.4a.9.9 0 1 1 0-1.8H17l-3-2.9 1.3-1.2zM10 15.4l-2.9 3h2.3a.9.9 0 1 1 0 1.7H5a.9.9 0 0 1-.9-.9v-4.4a.9.9 0 1 1 1.8 0V17l2.9-3 1.2 1.3zM8.7 10L5.7 7v2.3a.9.9 0 0 1-1.7 0V5c0-.5.4-.9.9-.9h4.4a.9.9 0 0 1 0 1.8H7l3 2.9-1.3 1.2z" fill-rule="nonzero"/></svg>',
            gamma: '<svg width="24" height="24"><path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm1 2v14h14V5H5zm6.5 11.8V14L9.2 8.7a5.1 5.1 0 0 0-.4-.8l-.1-.2H8 8v-1l.3-.1.3-.1h.7a1 1 0 0 1 .6.5l.1.3a8.5 8.5 0 0 1 .3.6l1.9 4.6 2-5.2a1 1 0 0 1 1-.6.5.5 0 0 1 .5.6L13 14v2.8a.7.7 0 0 1-1.4 0z" fill-rule="nonzero"/></svg>',
            help: '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M12 5.5a6.5 6.5 0 0 0-6 9 6.3 6.3 0 0 0 1.4 2l1 1a6.3 6.3 0 0 0 3.6 1 6.5 6.5 0 0 0 6-9 6.3 6.3 0 0 0-1.4-2l-1-1a6.3 6.3 0 0 0-3.6-1zM12 4a7.8 7.8 0 0 1 5.7 2.3A8 8 0 1 1 12 4z"/><path d="M9.6 9.7a.7.7 0 0 1-.7-.8c0-1.1 1.5-1.8 3.2-1.8 1.8 0 3.2.8 3.2 2.4 0 1.4-.4 2.1-1.5 2.8-.2 0-.3.1-.3.2a2 2 0 0 0-.8.8.8.8 0 0 1-1.4-.6c.3-.7.8-1 1.3-1.5l.4-.2c.7-.4.8-.6.8-1.5 0-.5-.6-.9-1.7-.9-.5 0-1 .1-1.4.3-.2 0-.3.1-.3.2v-.2c0 .4-.4.8-.8.8z" fill-rule="nonzero"/><circle cx="12" cy="16" r="1"/></g></svg>',
            "highlight-bg-color": '<svg width="24" height="24"><g fill-rule="evenodd"><path id="tox-icon-highlight-bg-color__color" d="M3 18h18v3H3z"/><path fill-rule="nonzero" d="M7.7 16.7H3l3.3-3.3-.7-.8L10.2 8l4 4.1-4 4.2c-.2.2-.6.2-.8 0l-.6-.7-1.1 1.1zm5-7.5L11 7.4l3-2.9a2 2 0 0 1 2.6 0L18 6c.7.7.7 2 0 2.7l-2.9 2.9-1.8-1.8-.5-.6"/></g></svg>',
            home: '<svg width="24" height="24"><path fill-rule="nonzero" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
            "horizontal-rule": '<svg width="24" height="24"><path d="M4 11h16v2H4z" fill-rule="evenodd"/></svg>',
            "image-options": '<svg width="24" height="24"><path d="M6 10a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2zm12 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2zm-6 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z" fill-rule="nonzero"/></svg>',
            image: '<svg width="24" height="24"><path d="M5 15.7l3.3-3.2c.3-.3.7-.3 1 0L12 15l4.1-4c.3-.4.8-.4 1 0l2 1.9V5H5v10.7zM5 18V19h3l2.8-2.9-2-2L5 17.9zm14-3l-2.5-2.4-6.4 6.5H19v-4zM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill-rule="nonzero"/></svg>',
            indent: '<svg width="24" height="24"><path d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2zm-2.6-3.8L6.2 12l-1.8-1.2a1 1 0 0 1 1.2-1.6l3 2a1 1 0 0 1 0 1.6l-3 2a1 1 0 1 1-1.2-1.6z" fill-rule="evenodd"/></svg>',
            indeterminate: '<svg width="24" height="24"><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM9 11a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9z" fill-rule="evenodd"/></svg>',
            info: '<svg width="24" height="24"><path d="M12 4a7.8 7.8 0 0 1 5.7 2.3A8 8 0 1 1 12 4zm-1 3v2h2V7h-2zm3 10v-1h-1v-5h-3v1h1v4h-1v1h4z" fill-rule="evenodd"/></svg>',
            "insert-character": '<svg width="24" height="24"><path d="M15 18h4l1-2v4h-6v-3.3l1.4-1a6 6 0 0 0 1.8-2.9 6.3 6.3 0 0 0-.1-4.1 5.8 5.8 0 0 0-3-3.2c-.6-.3-1.3-.5-2.1-.5a5.1 5.1 0 0 0-3.9 1.8 6.3 6.3 0 0 0-1.3 6 6.2 6.2 0 0 0 1.8 3l1.4.9V20H4v-4l1 2h4v-.5l-2-1L5.4 15A6.5 6.5 0 0 1 4 11c0-1 .2-1.9.6-2.7A7 7 0 0 1 6.3 6C7.1 5.4 8 5 9 4.5c1-.3 2-.5 3.1-.5a8.8 8.8 0 0 1 5.7 2 7 7 0 0 1 1.7 2.3 6 6 0 0 1 .2 4.8c-.2.7-.6 1.3-1 1.9a7.6 7.6 0 0 1-3.6 2.5v.5z" fill-rule="evenodd"/></svg>',
            "insert-time": '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M19 2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm-7 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><path d="M15 12h-3V7a.5.5 0 0 0-1 0v6h4a.5.5 0 0 0 0-1z"/></g></svg>',
            invert: '<svg width="24" height="24"><path d="M18 19.3L16.5 18a5.8 5.8 0 0 1-3.1 1.9 6.1 6.1 0 0 1-5.5-1.6A5.8 5.8 0 0 1 6 14v-.3l.1-1.2A13.9 13.9 0 0 1 7.7 9l-3-3 .7-.8 2.8 2.9 9 8.9 1.5 1.6-.7.6zm0-5.5v.3l-.1 1.1-.4 1-1.2-1.2a4.3 4.3 0 0 0 .2-1v-.2c0-.4 0-.8-.2-1.3l-.5-1.4a14.8 14.8 0 0 0-3-4.2L12 6a26.1 26.1 0 0 0-2.2 2.5l-1-1a20.9 20.9 0 0 1 2.9-3.3L12 4l1 .8a22.2 22.2 0 0 1 4 5.4c.6 1.2 1 2.4 1 3.6z" fill-rule="evenodd"/></svg>',
            italic: '<svg width="24" height="24"><path d="M16.7 4.7l-.1.9h-.3c-.6 0-1 0-1.4.3-.3.3-.4.6-.5 1.1l-2.1 9.8v.6c0 .5.4.8 1.4.8h.2l-.2.8H8l.2-.8h.2c1.1 0 1.8-.5 2-1.5l2-9.8.1-.5c0-.6-.4-.8-1.4-.8h-.3l.2-.9h5.8z" fill-rule="evenodd"/></svg>',
            line: '<svg width="24" height="24"><path d="M15 9l-8 8H4v-3l8-8 3 3zm1-1l-3-3 1-1h1c-.2 0 0 0 0 0l2 2s0 .2 0 0v1l-1 1zM4 18h16v2H4v-2z" fill-rule="evenodd"/></svg>',
            link: '<svg width="24" height="24"><path d="M6.2 12.3a1 1 0 0 1 1.4 1.4l-2.1 2a2 2 0 1 0 2.7 2.8l4.8-4.8a1 1 0 0 0 0-1.4 1 1 0 1 1 1.4-1.3 2.9 2.9 0 0 1 0 4L9.6 20a3.9 3.9 0 0 1-5.5-5.5l2-2zm11.6-.6a1 1 0 0 1-1.4-1.4l2-2a2 2 0 1 0-2.6-2.8L11 10.3a1 1 0 0 0 0 1.4A1 1 0 1 1 9.6 13a2.9 2.9 0 0 1 0-4L14.4 4a3.9 3.9 0 0 1 5.5 5.5l-2 2z" fill-rule="nonzero"/></svg>',
            "list-bull-circle": '<svg width="48" height="48"><g fill-rule="evenodd"><path d="M11 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM11 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM11 36a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill-rule="nonzero"/><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/></g></svg>',
            "list-bull-default": '<svg width="48" height="48"><g fill-rule="evenodd"><circle cx="11" cy="14" r="3"/><circle cx="11" cy="24" r="3"/><circle cx="11" cy="34" r="3"/><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/></g></svg>',
            "list-bull-square": '<svg width="48" height="48"><g fill-rule="evenodd"><path d="M8 11h6v6H8zM8 21h6v6H8zM8 31h6v6H8z"/><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/></g></svg>',
            "list-num-default": '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M10 17v-4.8l-1.5 1v-1.1l1.6-1h1.2V17h-1.2zm3.6.1c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .7.3.7.7 0 .4-.2.7-.7.7zm-5 5.7c0-1.2.8-2 2.1-2s2.1.8 2.1 1.8c0 .7-.3 1.2-1.4 2.2l-1.1 1v.2h2.6v1H8.6v-.9l2-1.9c.8-.8 1-1.1 1-1.5 0-.5-.4-.8-1-.8-.5 0-.9.3-.9.9H8.5zm6.3 4.3c-.5 0-.7-.3-.7-.7 0-.4.2-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zM10 34.4v-1h.7c.6 0 1-.3 1-.8 0-.4-.4-.7-1-.7s-1 .3-1 .8H8.6c0-1.1 1-1.8 2.2-1.8 1.3 0 2.1.6 2.1 1.6 0 .7-.4 1.2-1 1.3v.1c.8.1 1.3.7 1.3 1.4 0 1-1 1.9-2.4 1.9-1.3 0-2.2-.8-2.3-2h1.2c0 .6.5 1 1.1 1 .7 0 1-.4 1-1 0-.5-.3-.8-1-.8h-.7zm4.7 2.7c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .8.3.8.7 0 .4-.3.7-.8.7z"/></g></svg>',
            "list-num-lower-alpha": '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M10.3 15.2c.5 0 1-.4 1-.9V14h-1c-.5.1-.8.3-.8.6 0 .4.3.6.8.6zm-.4.9c-1 0-1.5-.6-1.5-1.4 0-.8.6-1.3 1.7-1.4h1.1v-.4c0-.4-.2-.6-.7-.6-.5 0-.8.1-.9.4h-1c0-.8.8-1.4 2-1.4 1.1 0 1.8.6 1.8 1.6V16h-1.1v-.6h-.1c-.2.4-.7.7-1.3.7zm4.6 0c-.5 0-.7-.3-.7-.7 0-.4.2-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm-3.2 10c-.6 0-1.2-.3-1.4-.8v.7H8.5v-6.3H10v2.5c.3-.5.8-.9 1.4-.9 1.2 0 1.9 1 1.9 2.4 0 1.5-.7 2.4-1.9 2.4zm-.4-3.7c-.7 0-1 .5-1 1.3s.3 1.4 1 1.4c.6 0 1-.6 1-1.4 0-.8-.4-1.3-1-1.3zm4 3.7c-.5 0-.7-.3-.7-.7 0-.4.2-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm-2.2 7h-1.2c0-.5-.4-.8-.9-.8-.6 0-1 .5-1 1.4 0 1 .4 1.4 1 1.4.5 0 .8-.2 1-.7h1c0 1-.8 1.7-2 1.7-1.4 0-2.2-.9-2.2-2.4s.8-2.4 2.2-2.4c1.2 0 2 .7 2 1.7zm1.8 3c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z"/></g></svg>',
            "list-num-lower-greek": '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M10.5 15c.7 0 1-.5 1-1.3s-.3-1.3-1-1.3c-.5 0-.9.5-.9 1.3s.4 1.4 1 1.4zm-.3 1c-1.1 0-1.8-.8-1.8-2.3 0-1.5.7-2.4 1.8-2.4.7 0 1.1.4 1.3 1h.1v-.9h1.2v3.2c0 .4.1.5.4.5h.2v.9h-.6c-.6 0-1-.2-1.1-.7h-.1c-.2.4-.7.8-1.4.8zm5 .1c-.5 0-.8-.3-.8-.7 0-.4.3-.7.7-.7.5 0 .8.3.8.7 0 .4-.3.7-.8.7zm-4.9 7v-1h.3c.6 0 1-.2 1-.7 0-.5-.4-.8-1-.8-.5 0-.8.3-.8 1v2.2c0 .8.4 1.3 1.1 1.3.6 0 1-.4 1-1s-.5-1-1.3-1h-.3zM8.6 22c0-1.5.7-2.3 2-2.3 1.2 0 2 .6 2 1.6 0 .6-.3 1-.8 1.3.8.3 1.3.8 1.3 1.7 0 1.2-.8 1.9-1.9 1.9-.6 0-1.1-.3-1.3-.8v2.2H8.5V22zm6.2 4.2c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .7.3.7.7 0 .4-.2.7-.7.7zm-4.5 8.5L8 30h1.4l1.7 3.5 1.7-3.5h1.1l-2.2 4.6v.1c.5.8.7 1.4.7 1.8 0 .4-.1.8-.4 1-.2.2-.6.3-1 .3-.9 0-1.3-.4-1.3-1.2 0-.5.2-1 .5-1.7l.1-.2zm.7 1a2 2 0 0 0-.4.9c0 .3.1.4.4.4.3 0 .4-.1.4-.4 0-.2-.1-.6-.4-1zm4.5.5c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z"/></g></svg>',
            "list-num-lower-roman": '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M15.1 16v-1.2h1.3V16H15zm0 10v-1.2h1.3V26H15zm0 10v-1.2h1.3V36H15z"/><path fill-rule="nonzero" d="M12 21h1.5v5H12zM12 31h1.5v5H12zM9 21h1.5v5H9zM9 31h1.5v5H9zM6 31h1.5v5H6zM12 11h1.5v5H12zM12 19h1.5v1H12zM12 29h1.5v1H12zM9 19h1.5v1H9zM9 29h1.5v1H9zM6 29h1.5v1H6zM12 9h1.5v1H12z"/></g></svg>',
            "list-num-upper-alpha": '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M12.6 17l-.5-1.4h-2L9.5 17H8.3l2-6H12l2 6h-1.3zM11 12.3l-.7 2.3h1.6l-.8-2.3zm4.7 4.8c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .7.3.7.7 0 .4-.2.7-.7.7zM11.4 27H8.7v-6h2.6c1.2 0 1.9.6 1.9 1.5 0 .6-.5 1.2-1 1.3.7.1 1.3.7 1.3 1.5 0 1-.8 1.7-2 1.7zM10 22v1.5h1c.6 0 1-.3 1-.8 0-.4-.4-.7-1-.7h-1zm0 4H11c.7 0 1.1-.3 1.1-.8 0-.6-.4-.9-1.1-.9H10V26zm5.4 1.1c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm-4.1 10c-1.8 0-2.8-1.1-2.8-3.1s1-3.1 2.8-3.1c1.4 0 2.5.9 2.6 2.2h-1.3c0-.7-.6-1.1-1.3-1.1-1 0-1.6.7-1.6 2s.6 2 1.6 2c.7 0 1.2-.4 1.4-1h1.2c-.1 1.3-1.2 2.2-2.6 2.2zm4.5 0c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z"/></g></svg>',
            "list-num-upper-roman": '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M15.1 17v-1.2h1.3V17H15zm0 10v-1.2h1.3V27H15zm0 10v-1.2h1.3V37H15z"/><path fill-rule="nonzero" d="M12 20h1.5v7H12zM12 30h1.5v7H12zM9 20h1.5v7H9zM9 30h1.5v7H9zM6 30h1.5v7H6zM12 10h1.5v7H12z"/></g></svg>',
            lock: '<svg width="24" height="24"><path d="M16.3 11c.2 0 .3 0 .5.2l.2.6v7.4c0 .3 0 .4-.2.6l-.6.2H7.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6v-7.4c0-.3 0-.4.2-.6l.5-.2H8V8c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9h2c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v3h.3zM10 8v3h4V8a1 1 0 0 0-.3-.7A1 1 0 0 0 13 7h-2a1 1 0 0 0-.7.3 1 1 0 0 0-.3.7z" fill-rule="evenodd"/></svg>',
            ltr: '<svg width="24" height="24"><path d="M11 5h7a1 1 0 0 1 0 2h-1v11a1 1 0 0 1-2 0V7h-2v11a1 1 0 0 1-2 0v-6c-.5 0-1 0-1.4-.3A3.4 3.4 0 0 1 7.8 10a3.3 3.3 0 0 1 0-2.8 3.4 3.4 0 0 1 1.8-1.8L11 5zM4.4 16.2L6.2 15l-1.8-1.2a1 1 0 0 1 1.2-1.6l3 2a1 1 0 0 1 0 1.6l-3 2a1 1 0 1 1-1.2-1.6z" fill-rule="evenodd"/></svg>',
            "new-document": '<svg width="24" height="24"><path d="M14.4 3H7a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7.6L14.4 3zM17 19H7V5h6v4h4v10z" fill-rule="nonzero"/></svg>',
            "new-tab": '<svg width="24" height="24"><path d="M15 13l2-2v8H5V7h8l-2 2H7v8h8v-4zm4-8v5.5l-2-2-5.6 5.5H10v-1.4L15.5 7l-2-2H19z" fill-rule="evenodd"/></svg>',
            "non-breaking": '<svg width="24" height="24"><path d="M11 11H8a1 1 0 1 1 0-2h3V6c0-.6.4-1 1-1s1 .4 1 1v3h3c.6 0 1 .4 1 1s-.4 1-1 1h-3v3c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-3zm10 4v5H3v-5c0-.6.4-1 1-1s1 .4 1 1v3h14v-3c0-.6.4-1 1-1s1 .4 1 1z" fill-rule="evenodd"/></svg>',
            notice: '<svg width="24" height="24"><path d="M17.8 9.8L15.4 4 20 8.5v7L15.5 20h-7L4 15.5v-7L8.5 4h7l2.3 5.8zm0 0l2.2 5.7-2.3-5.8zM13 17v-2h-2v2h2zm0-4V7h-2v6h2z" fill-rule="evenodd"/></svg>',
            "ordered-list": '<svg width="24" height="24"><path d="M10 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 1 1 0-2zM6 4v3.5c0 .3-.2.5-.5.5a.5.5 0 0 1-.5-.5V5h-.5a.5.5 0 0 1 0-1H6zm-1 8.8l.2.2h1.3c.3 0 .5.2.5.5s-.2.5-.5.5H4.9a1 1 0 0 1-.9-1V13c0-.4.3-.8.6-1l1.2-.4.2-.3a.2.2 0 0 0-.2-.2H4.5a.5.5 0 0 1-.5-.5c0-.3.2-.5.5-.5h1.6c.5 0 .9.4.9 1v.1c0 .4-.3.8-.6 1l-1.2.4-.2.3zM7 17v2c0 .6-.4 1-1 1H4.5a.5.5 0 0 1 0-1h1.2c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.4a.4.4 0 1 1 0-.8h1.3c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.5a.5.5 0 1 1 0-1H6c.6 0 1 .4 1 1z" fill-rule="evenodd"/></svg>',
            orientation: '<svg width="24" height="24"><path d="M7.3 6.4L1 13l6.4 6.5 6.5-6.5-6.5-6.5zM3.7 13l3.6-3.7L11 13l-3.7 3.7-3.6-3.7zM12 6l2.8 2.7c.3.3.3.8 0 1-.3.4-.9.4-1.2 0L9.2 5.7a.8.8 0 0 1 0-1.2L13.6.2c.3-.3.9-.3 1.2 0 .3.3.3.8 0 1.1L12 4h1a9 9 0 1 1-4.3 16.9l1.5-1.5A7 7 0 1 0 13 6h-1z" fill-rule="nonzero"/></svg>',
            outdent: '<svg width="24" height="24"><path d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2zm1.6-3.8a1 1 0 0 1-1.2 1.6l-3-2a1 1 0 0 1 0-1.6l3-2a1 1 0 0 1 1.2 1.6L6.8 12l1.8 1.2z" fill-rule="evenodd"/></svg>',
            "page-break": '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M5 11c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h1c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2zm4 0c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h1c.6 0 1 .4 1 1s-.4 1-1 1h-1a1 1 0 0 1 0-2zm4 0c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zM7 3v5h10V3c0-.6.4-1 1-1s1 .4 1 1v7H5V3c0-.6.4-1 1-1s1 .4 1 1zM6 22a1 1 0 0 1-1-1v-7h14v7c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-5H7v5c0 .6-.4 1-1 1z"/></g></svg>',
            paragraph: '<svg width="24" height="24"><path d="M10 5h7a1 1 0 0 1 0 2h-1v11a1 1 0 0 1-2 0V7h-2v11a1 1 0 0 1-2 0v-6c-.5 0-1 0-1.4-.3A3.4 3.4 0 0 1 6.8 10a3.3 3.3 0 0 1 0-2.8 3.4 3.4 0 0 1 1.8-1.8L10 5z" fill-rule="evenodd"/></svg>',
            "paste-text": '<svg width="24" height="24"><path d="M18 9V5h-2v1c0 .6-.4 1-1 1H9a1 1 0 0 1-1-1V5H6v13h3V9h9zM9 20H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.2A3 3 0 0 1 12 1a3 3 0 0 1 2.8 2H18a2 2 0 0 1 2 2v4h1v12H9v-1zm1.5-9.5v9h9v-9h-9zM12 3a1 1 0 0 0-1 1c0 .5.4 1 1 1s1-.5 1-1-.4-1-1-1zm0 9h6v2h-.5l-.5-1h-1v4h.8v1h-3.6v-1h.8v-4h-1l-.5 1H12v-2z" fill-rule="nonzero"/></svg>',
            paste: '<svg width="24" height="24"><path d="M18 9V5h-2v1c0 .6-.4 1-1 1H9a1 1 0 0 1-1-1V5H6v13h3V9h9zM9 20H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.2A3 3 0 0 1 12 1a3 3 0 0 1 2.8 2H18a2 2 0 0 1 2 2v4h1v12H9v-1zm1.5-9.5v9h9v-9h-9zM12 3a1 1 0 0 0-1 1c0 .5.4 1 1 1s1-.5 1-1-.4-1-1-1z" fill-rule="nonzero"/></svg>',
            "permanent-pen": '<svg width="24" height="24"><path d="M10.5 17.5L8 20H3v-3l3.5-3.5a2 2 0 0 1 0-3L14 3l1 1-7.3 7.3a1 1 0 0 0 0 1.4l3.6 3.6c.4.4 1 .4 1.4 0L20 9l1 1-7.6 7.6a2 2 0 0 1-2.8 0l-.1-.1z" fill-rule="nonzero"/></svg>',
            plus: '<svg width="24" height="24"><g fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#000" stroke-width="2"><path d="M12 5v14M5 12h14"/></g></svg>',
            preferences: '<svg width="24" height="24"><path d="M20.1 13.5l-1.9.2a5.8 5.8 0 0 1-.6 1.5l1.2 1.5c.4.4.3 1 0 1.4l-.7.7a1 1 0 0 1-1.4 0l-1.5-1.2a6.2 6.2 0 0 1-1.5.6l-.2 1.9c0 .5-.5.9-1 .9h-1a1 1 0 0 1-1-.9l-.2-1.9a5.8 5.8 0 0 1-1.5-.6l-1.5 1.2a1 1 0 0 1-1.4 0l-.7-.7a1 1 0 0 1 0-1.4l1.2-1.5a6.2 6.2 0 0 1-.6-1.5l-1.9-.2a1 1 0 0 1-.9-1v-1c0-.5.4-1 .9-1l1.9-.2a5.8 5.8 0 0 1 .6-1.5L5.2 7.3a1 1 0 0 1 0-1.4l.7-.7a1 1 0 0 1 1.4 0l1.5 1.2a6.2 6.2 0 0 1 1.5-.6l.2-1.9c0-.5.5-.9 1-.9h1c.5 0 1 .4 1 .9l.2 1.9a5.8 5.8 0 0 1 1.5.6l1.5-1.2a1 1 0 0 1 1.4 0l.7.7c.3.4.4 1 0 1.4l-1.2 1.5a6.2 6.2 0 0 1 .6 1.5l1.9.2c.5 0 .9.5.9 1v1c0 .5-.4 1-.9 1zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill-rule="evenodd"/></svg>',
            preview: '<svg width="24" height="24"><path d="M3.5 12.5c.5.8 1.1 1.6 1.8 2.3 2 2 4.2 3.2 6.7 3.2s4.7-1.2 6.7-3.2a16.2 16.2 0 0 0 2.1-2.8 15.7 15.7 0 0 0-2.1-2.8c-2-2-4.2-3.2-6.7-3.2a9.3 9.3 0 0 0-6.7 3.2A16.2 16.2 0 0 0 3.2 12c0 .2.2.3.3.5zm-2.4-1l.7-1.2L4 7.8C6.2 5.4 8.9 4 12 4c3 0 5.8 1.4 8.1 3.8a18.2 18.2 0 0 1 2.8 3.7v1l-.7 1.2-2.1 2.5c-2.3 2.4-5 3.8-8.1 3.8-3 0-5.8-1.4-8.1-3.8a18.2 18.2 0 0 1-2.8-3.7 1 1 0 0 1 0-1zm12-3.3a2 2 0 1 0 2.7 2.6 4 4 0 1 1-2.6-2.6z" fill-rule="nonzero"/></svg>',
            print: '<svg width="24" height="24"><path d="M18 8H6a3 3 0 0 0-3 3v6h2v3h14v-3h2v-6a3 3 0 0 0-3-3zm-1 10H7v-4h10v4zm.5-5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm.5-8H6v2h12V5z" fill-rule="nonzero"/></svg>',
            quote: '<svg width="24" height="24"><path d="M7.5 17h.9c.4 0 .7-.2.9-.6L11 13V8c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h2l-1.3 2.7a1 1 0 0 0 .8 1.3zm8 0h.9c.4 0 .7-.2.9-.6L19 13V8c0-.6-.4-1-1-1h-4a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h2l-1.3 2.7a1 1 0 0 0 .8 1.3z" fill-rule="nonzero"/></svg>',
            redo: '<svg width="24" height="24"><path d="M17.6 10H12c-2.8 0-4.4 1.4-4.9 3.5-.4 2 .3 4 1.4 4.6a1 1 0 1 1-1 1.8c-2-1.2-2.9-4.1-2.3-6.8.6-3 3-5.1 6.8-5.1h5.6l-3.3-3.3a1 1 0 1 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3z" fill-rule="nonzero"/></svg>',
            reload: '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M5 22.1l-1.2-4.7v-.2a1 1 0 0 1 1-1l5 .4a1 1 0 1 1-.2 2l-2.2-.2a7.8 7.8 0 0 0 8.4.2 7.5 7.5 0 0 0 3.5-6.4 1 1 0 1 1 2 0 9.5 9.5 0 0 1-4.5 8 9.9 9.9 0 0 1-10.2 0l.4 1.4a1 1 0 1 1-2 .5zM13.6 7.4c0-.5.5-1 1-.9l2.8.2a8 8 0 0 0-9.5-1 7.5 7.5 0 0 0-3.6 7 1 1 0 0 1-2 0 9.5 9.5 0 0 1 4.5-8.6 10 10 0 0 1 10.9.3l-.3-1a1 1 0 0 1 2-.5l1.1 4.8a1 1 0 0 1-1 1.2l-5-.4a1 1 0 0 1-.9-1z"/></g></svg>',
            "remove-formatting": '<svg width="24" height="24"><path d="M13.2 6a1 1 0 0 1 0 .2l-2.6 10a1 1 0 0 1-1 .8h-.2a.8.8 0 0 1-.8-1l2.6-10H8a1 1 0 1 1 0-2h9a1 1 0 0 1 0 2h-3.8zM5 18h7a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm13 1.5L16.5 18 15 19.5a.7.7 0 0 1-1-1l1.5-1.5-1.5-1.5a.7.7 0 0 1 1-1l1.5 1.5 1.5-1.5a.7.7 0 0 1 1 1L17.5 17l1.5 1.5a.7.7 0 0 1-1 1z" fill-rule="evenodd"/></svg>',
            remove: '<svg width="24" height="24"><path d="M16 7h3a1 1 0 0 1 0 2h-1v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9H5a1 1 0 1 1 0-2h3V6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1zm-2 0V6c0-.6-.4-1-1-1h-2a1 1 0 0 0-1 1v1h4zm2 2H8v9c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V9zm-7 3a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4zm4 0a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4z" fill-rule="nonzero"/></svg>',
            "resize-handle": '<svg width="10" height="10"><g fill-rule="nonzero"><path d="M8.1 1.1A.5.5 0 1 1 9 2l-7 7A.5.5 0 1 1 1 8l7-7zM8.1 5.1A.5.5 0 1 1 9 6l-3 3A.5.5 0 1 1 5 8l3-3z"/></g></svg>',
            resize: '<svg width="24" height="24"><path d="M4 5c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h6c.3 0 .5.1.7.3.2.2.3.4.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3H7.4L18 16.6V13c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3.3 0 .5.1.7.3.2.2.3.4.3.7v6c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3h-6a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h3.6L6 7.4V11c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3A1 1 0 0 1 4 11V5z" fill-rule="evenodd"/></svg>',
            "restore-draft": '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M17 13c0 .6-.4 1-1 1h-4V8c0-.6.4-1 1-1s1 .4 1 1v4h2c.6 0 1 .4 1 1z"/><path d="M4.7 10H9a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v3l2.5-2.4a9.2 9.2 0 0 1 10.8-1.5A9 9 0 0 1 13.4 21c-2.4.1-4.7-.7-6.5-2.2a1 1 0 1 1 1.3-1.5 7.2 7.2 0 0 0 11.6-3.7 7 7 0 0 0-3.5-7.7A7.2 7.2 0 0 0 8 7L4.7 10z" fill-rule="nonzero"/></g></svg>',
            "rotate-left": '<svg width="24" height="24"><path d="M4.7 10H9a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v3l2.5-2.4a9.2 9.2 0 0 1 10.8-1.5A9 9 0 0 1 13.4 21c-2.4.1-4.7-.7-6.5-2.2a1 1 0 1 1 1.3-1.5 7.2 7.2 0 0 0 11.6-3.7 7 7 0 0 0-3.5-7.7A7.2 7.2 0 0 0 8 7L4.7 10z" fill-rule="nonzero"/></svg>',
            "rotate-right": '<svg width="24" height="24"><path d="M20 8V5a1 1 0 0 1 2 0v6c0 .6-.4 1-1 1h-6a1 1 0 0 1 0-2h4.3L16 7A7.2 7.2 0 0 0 7.7 6a7 7 0 0 0 3 13.1c1.9.1 3.7-.5 5-1.7a1 1 0 0 1 1.4 1.5A9.2 9.2 0 0 1 2.2 14c-.9-3.9 1-8 4.5-9.9 3.5-1.9 8-1.3 10.8 1.5L20 8z" fill-rule="nonzero"/></svg>',
            rtl: '<svg width="24" height="24"><path d="M8 5h8v2h-2v12h-2V7h-2v12H8v-7c-.5 0-1 0-1.4-.3A3.4 3.4 0 0 1 4.8 10a3.3 3.3 0 0 1 0-2.8 3.4 3.4 0 0 1 1.8-1.8L8 5zm12 11.2a1 1 0 1 1-1 1.6l-3-2a1 1 0 0 1 0-1.6l3-2a1 1 0 1 1 1 1.6L18.4 15l1.8 1.2z" fill-rule="evenodd"/></svg>',
            save: '<svg width="24" height="24"><path d="M5 16h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2zm0 2v2h14v-2H5zm10 0h2v2h-2v-2zm-4-6.4L8.7 9.3a1 1 0 1 0-1.4 1.4l4 4c.4.4 1 .4 1.4 0l4-4a1 1 0 1 0-1.4-1.4L13 11.6V4a1 1 0 0 0-2 0v7.6z" fill-rule="nonzero"/></svg>',
            search: '<svg width="24" height="24"><path d="M16 17.3a8 8 0 1 1 1.4-1.4l4.3 4.4a1 1 0 0 1-1.4 1.4l-4.4-4.3zm-5-.3a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" fill-rule="nonzero"/></svg>',
            "select-all": '<svg width="24" height="24"><path d="M3 5h2V3a2 2 0 0 0-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2a2 2 0 0 0-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8a2 2 0 0 0 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z" fill-rule="nonzero"/></svg>',
            selected: '<svg width="24" height="24"><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm-2.4-6.1L7 12.3a.7.7 0 0 0-1 1L9.6 17 18 8.6a.7.7 0 0 0 0-1 .7.7 0 0 0-1 0l-7.4 7.3z" fill-rule="evenodd"/></svg>',
            settings: '<svg width="24" height="24"><path d="M11 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8v.3c0 .2 0 .3-.2.5l-.6.2H7.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6V8H5a1 1 0 1 1 0-2h2v-.3c0-.2 0-.3.2-.5l.5-.2h2.5c.3 0 .4 0 .6.2l.2.5V6zM8 8h2V6H8v2zm9 2.8v.2h2c.6 0 1 .4 1 1s-.4 1-1 1h-2v.3c0 .2 0 .3-.2.5l-.6.2h-2.4c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6V13H5a1 1 0 0 1 0-2h8v-.3c0-.2 0-.3.2-.5l.6-.2h2.4c.3 0 .4 0 .6.2l.2.6zM14 13h2v-2h-2v2zm-3 2.8v.2h8c.6 0 1 .4 1 1s-.4 1-1 1h-8v.3c0 .2 0 .3-.2.5l-.6.2H7.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6V18H5a1 1 0 0 1 0-2h2v-.3c0-.2 0-.3.2-.5l.5-.2h2.5c.3 0 .4 0 .6.2l.2.6zM8 18h2v-2H8v2z" fill-rule="evenodd"/></svg>',
            sharpen: '<svg width="24" height="24"><path d="M16 6l4 4-8 9-8-9 4-4h8zm-4 10.2l5.5-6.2-.1-.1H12v-.3h5.1l-.2-.2H12V9h4.6l-.2-.2H12v-.3h4.1l-.2-.2H12V8h3.6l-.2-.2H8.7L6.5 10l.1.1H12v.3H6.9l.2.2H12v.3H7.3l.2.2H12v.3H7.7l.3.2h4v.3H8.2l.2.2H12v.3H8.6l.3.2H12v.3H9l.3.2H12v.3H9.5l.2.2H12v.3h-2l.2.2H12v.3h-1.6l.2.2H12v.3h-1.1l.2.2h.9v.3h-.7l.2.2h.5v.3h-.3l.3.2z" fill-rule="evenodd"/></svg>',
            sourcecode: '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M9.8 15.7c.3.3.3.8 0 1-.3.4-.9.4-1.2 0l-4.4-4.1a.8.8 0 0 1 0-1.2l4.4-4.2c.3-.3.9-.3 1.2 0 .3.3.3.8 0 1.1L6 12l3.8 3.7zM14.2 15.7c-.3.3-.3.8 0 1 .4.4.9.4 1.2 0l4.4-4.1c.3-.3.3-.9 0-1.2l-4.4-4.2a.8.8 0 0 0-1.2 0c-.3.3-.3.8 0 1.1L18 12l-3.8 3.7z"/></g></svg>',
            "spell-check": '<svg width="24" height="24"><path d="M6 8v3H5V5c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h2c.3 0 .5.1.7.3.2.2.3.4.3.7v6H8V8H6zm0-3v2h2V5H6zm13 0h-3v5h3v1h-3a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7V5c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h3v1zm-5 1.5l-.1.7c-.1.2-.3.3-.6.3.3 0 .5.1.6.3l.1.7V10c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3h-3V4h3c.3 0 .5.1.7.3.2.2.3.4.3.7v1.5zM13 10V8h-2v2h2zm0-3V5h-2v2h2zm3 5l1 1-6.5 7L7 15.5l1.3-1 2.2 2.2L16 12z" fill-rule="evenodd"/></svg>',
            "strike-through": '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M15.6 8.5c-.5-.7-1-1.1-1.3-1.3-.6-.4-1.3-.6-2-.6-2.7 0-2.8 1.7-2.8 2.1 0 1.6 1.8 2 3.2 2.3 4.4.9 4.6 2.8 4.6 3.9 0 1.4-.7 4.1-5 4.1A6.2 6.2 0 0 1 7 16.4l1.5-1.1c.4.6 1.6 2 3.7 2 1.6 0 2.5-.4 3-1.2.4-.8.3-2-.8-2.6-.7-.4-1.6-.7-2.9-1-1-.2-3.9-.8-3.9-3.6C7.6 6 10.3 5 12.4 5c2.9 0 4.2 1.6 4.7 2.4l-1.5 1.1z"/><path d="M5 11h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z" fill-rule="nonzero"/></g></svg>',
            subscript: '<svg width="24" height="24"><path d="M10.4 10l4.6 4.6-1.4 1.4L9 11.4 4.4 16 3 14.6 7.6 10 3 5.4 4.4 4 9 8.6 13.6 4 15 5.4 10.4 10zM21 19h-5v-1l1-.8 1.7-1.6c.3-.4.5-.8.5-1.2 0-.3 0-.6-.2-.7-.2-.2-.5-.3-.9-.3a2 2 0 0 0-.8.2l-.7.3-.4-1.1 1-.6 1.2-.2c.8 0 1.4.3 1.8.7.4.4.6.9.6 1.5s-.2 1.1-.5 1.6a8 8 0 0 1-1.3 1.3l-.6.6h2.6V19z" fill-rule="nonzero"/></svg>',
            superscript: '<svg width="24" height="24"><path d="M15 9.4L10.4 14l4.6 4.6-1.4 1.4L9 15.4 4.4 20 3 18.6 7.6 14 3 9.4 4.4 8 9 12.6 13.6 8 15 9.4zm5.9 1.6h-5v-1l1-.8 1.7-1.6c.3-.5.5-.9.5-1.3 0-.3 0-.5-.2-.7-.2-.2-.5-.3-.9-.3l-.8.2-.7.4-.4-1.2c.2-.2.5-.4 1-.5.3-.2.8-.2 1.2-.2.8 0 1.4.2 1.8.6.4.4.6 1 .6 1.6 0 .5-.2 1-.5 1.5l-1.3 1.4-.6.5h2.6V11z" fill-rule="nonzero"/></svg>',
            "table-cell-properties": '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm10 10h-4v3h4v-3zm0-8h-4v3h4V7zM9 7H5v3h4V7zm-4 4v3h4v-3H5zm10 0v3h4v-3h-4zm0-1h4V7h-4v3zM5 15v3h4v-3H5zm10 3h4v-3h-4v3z" fill-rule="evenodd"/></svg>',
            "table-cell-select-all": '<svg width="24" height="24"><path d="M12.5 5.5v6h6v-6h-6zm-1 0h-6v6h6v-6zm1 13h6v-6h-6v6zm-1 0v-6h-6v6h6zm-7-14h15v15h-15v-15z" fill-rule="nonzero"/></svg>',
            "table-cell-select-inner": '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M5.5 5.5v13h13v-13h-13zm-1-1h15v15h-15v-15z" opacity=".2"/><path d="M11.5 11.5v-7h1v7h7v1h-7v7h-1v-7h-7v-1h7z"/></g></svg>',
            "table-delete-column": '<svg width="24" height="24"><path d="M9 11.2l1 1v.2l-1 1v-2.2zm5 1l1-1v2.2l-1-1v-.2zM20 5v14H4V5h16zm-1 2h-4v.8l-.2-.2-.8.8V7h-4v1.4l-.8-.8-.2.2V7H5v11h4v-1.8l.5.5.5-.4V18h4v-1.8l.8.8.2-.3V18h4V7zm-3.9 3.4l-1.8 1.9 1.8 1.9c.4.3.4.9 0 1.2-.3.3-.8.3-1.2 0L12 13.5l-1.8 1.9a.8.8 0 0 1-1.2 0 .9.9 0 0 1 0-1.2l1.8-1.9-1.9-2a.9.9 0 0 1 1.2-1.2l2 2 1.8-1.8c.3-.4.9-.4 1.2 0a.8.8 0 0 1 0 1.1z" fill-rule="evenodd"/></svg>',
            "table-delete-row": '<svg width="24" height="24"><path d="M16.7 8.8l1.1 1.2-2.4 2.5L18 15l-1.2 1.2-2.5-2.5-2.4 2.5-1.3-1.2 2.5-2.5-2.5-2.5 1.2-1.3 2.6 2.6 2.4-2.5zM4 5h16v14H4V5zm15 5V7H5v3h4.8l1 1H5v3h5.8l-1 1H5v3h14v-3h-.4l-1-1H19v-3h-1.3l1-1h.3z" fill-rule="evenodd"/></svg>',
            "table-delete-table": '<svg width="24" height="26"><path d="M4 6h16v14H4V6zm1 2v11h14V8H5zm11.7 8.7l-1.5 1.5L12 15l-3.3 3.2-1.4-1.5 3.2-3.2-3.3-3.2 1.5-1.5L12 12l3.2-3.2 1.5 1.5-3.2 3.2 3.2 3.2z" fill-rule="evenodd"/></svg>',
            "table-insert-column-after": '<svg width="24" height="24"><path d="M14.3 9c.4 0 .7.3.7.6v2.2h2.1c.4 0 .7.3.7.7 0 .4-.3.7-.7.7H15v2.2c0 .3-.3.6-.7.6a.7.7 0 0 1-.6-.6v-2.2h-2.2a.7.7 0 0 1 0-1.4h2.2V9.6c0-.3.3-.6.6-.6zM4 5h16v14H4V5zm5 13v-3H5v3h4zm0-4v-3H5v3h4zm0-4V7H5v3h4zm10 8V7h-9v11h9z" fill-rule="evenodd"/></svg>',
            "table-insert-column-before": '<svg width="24" height="24"><path d="M9.7 16a.7.7 0 0 1-.7-.6v-2.2H6.9a.7.7 0 0 1 0-1.4H9V9.6c0-.3.3-.6.7-.6.3 0 .6.3.6.6v2.2h2.2c.4 0 .8.3.8.7 0 .4-.4.7-.8.7h-2.2v2.2c0 .3-.3.6-.6.6zM4 5h16v14H4V5zm10 13V7H5v11h9zm5 0v-3h-4v3h4zm0-4v-3h-4v3h4zm0-4V7h-4v3h4z" fill-rule="evenodd"/></svg>',
            "table-insert-row-above": '<svg width="24" height="24"><path d="M14.8 10.5c0 .3-.2.5-.5.5h-1.8v1.8c0 .3-.2.5-.5.5a.5.5 0 0 1-.5-.6V11H9.7a.5.5 0 0 1 0-1h1.8V8.3c0-.3.2-.6.5-.6s.5.3.5.6V10h1.8c.3 0 .5.2.5.5zM4 5h16v14H4V5zm5 13v-3H5v3h4zm5 0v-3h-4v3h4zm5 0v-3h-4v3h4zm0-4V7H5v7h14z" fill-rule="evenodd"/></svg>',
            "table-insert-row-after": '<svg width="24" height="24"><path d="M9.2 14.5c0-.3.2-.5.5-.5h1.8v-1.8c0-.3.2-.5.5-.5s.5.2.5.6V14h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8v1.7c0 .3-.2.6-.5.6a.5.5 0 0 1-.5-.6V15H9.7a.5.5 0 0 1-.5-.5zM4 5h16v14H4V5zm6 2v3h4V7h-4zM5 7v3h4V7H5zm14 11v-7H5v7h14zm0-8V7h-4v3h4z" fill-rule="evenodd"/></svg>',
            "table-left-header": '<svg width="24" height="24"><path d="M4 5h16v13H4V5zm10 12v-3h-4v3h4zm0-4v-3h-4v3h4zm0-4V6h-4v3h4zm5 8v-3h-4v3h4zm0-4v-3h-4v3h4zm0-4V6h-4v3h4z" fill-rule="evenodd"/></svg>',
            "table-merge-cells": '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm6 13h9v-7h-9v7zm4-11h-4v3h4V7zM9 7H5v3h4V7zm-4 4v3h4v-3H5zm10-1h4V7h-4v3zM5 15v3h4v-3H5z" fill-rule="evenodd"/></svg>',
            "table-row-properties": '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm10 10h-4v3h4v-3zm0-8h-4v3h4V7zM9 7H5v3h4V7zm6 3h4V7h-4v3zM5 15v3h4v-3H5zm10 3h4v-3h-4v3z" fill-rule="evenodd"/></svg>',
            "table-split-cells": '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm6 2v3h4V7h-4zM9 18v-3H5v3h4zm0-4v-3H5v3h4zm0-4V7H5v3h4zm10 8v-7h-9v7h9zm0-8V7h-4v3h4zm-3.5 4.5l1.5 1.6c.3.2.3.7 0 1-.2.2-.7.2-1 0l-1.5-1.6-1.6 1.5c-.2.3-.7.3-1 0a.7.7 0 0 1 0-1l1.6-1.5-1.5-1.6a.7.7 0 0 1 1-1l1.5 1.6 1.6-1.5c.2-.3.7-.3 1 0 .2.2.2.7 0 1l-1.6 1.5z" fill-rule="evenodd"/></svg>',
            "table-top-header": '<svg width="24" height="24"><path d="M4 5h16v13H4V5zm5 12v-3H5v3h4zm0-4v-3H5v3h4zm5 4v-3h-4v3h4zm0-4v-3h-4v3h4zm5 4v-3h-4v3h4zm0-4v-3h-4v3h4z" fill-rule="evenodd"/></svg>',
            table: '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm6 9h4v-3h-4v3zm4 1h-4v3h4v-3zm0-8h-4v3h4V7zM9 7H5v3h4V7zm-4 4v3h4v-3H5zm10 0v3h4v-3h-4zm0-1h4V7h-4v3zM5 15v3h4v-3H5zm10 3h4v-3h-4v3z" fill-rule="evenodd"/></svg>',
            template: '<svg width="24" height="24"><path d="M19 19v-1H5v1h14zM9 16v-4a5 5 0 1 1 6 0v4h4a2 2 0 0 1 2 2v3H3v-3c0-1.1.9-2 2-2h4zm4 0v-5l.8-.6a3 3 0 1 0-3.6 0l.8.6v5h2z" fill-rule="nonzero"/></svg>',
            "temporary-placeholder": '<svg width="24" height="24"><path d="M20.5 2.5c-.8 0-1.5.7-1.5 1.5a1.5 1.5 0 0 1-3 0 3 3 0 0 0-6 0v2H8.5c-.3 0-.5.2-.5.5v1a8 8 0 1 0 6 0v-1c0-.3-.2-.5-.5-.5H11V4a2 2 0 0 1 4 0 2.5 2.5 0 0 0 5 0c0-.3.2-.5.5-.5a.5.5 0 0 0 0-1zM8.1 10.9a5 5 0 0 0-1.2 7 .5.5 0 0 1-.8.5 6 6 0 0 1 1.5-8.3.5.5 0 1 1 .5.8z" fill-rule="nonzero"/></svg>',
            "text-color": '<svg width="24" height="24"><g fill-rule="evenodd"><path id="tox-icon-text-color__color" d="M3 18h18v3H3z"/><path d="M8.7 16h-.8a.5.5 0 0 1-.5-.6l2.7-9c.1-.3.3-.4.5-.4h2.8c.2 0 .4.1.5.4l2.7 9a.5.5 0 0 1-.5.6h-.8a.5.5 0 0 1-.4-.4l-.7-2.2c0-.3-.3-.4-.5-.4h-3.4c-.2 0-.4.1-.5.4l-.7 2.2c0 .3-.2.4-.4.4zm2.6-7.6l-.6 2a.5.5 0 0 0 .5.6h1.6a.5.5 0 0 0 .5-.6l-.6-2c0-.3-.3-.4-.5-.4h-.4c-.2 0-.4.1-.5.4z"/></g></svg>',
            toc: '<svg width="24" height="24"><path d="M5 5c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 1 1 0-2zm3 0h11c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 1 1 0-2zm-3 8c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h11c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2zm0-4c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 1 1 0-2zm3 0h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm-3 8c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
            translate: '<svg width="24" height="24"><path d="M12.7 14.3l-.3.7-.4.7-2.2-2.2-3.1 3c-.3.4-.8.4-1 0a.7.7 0 0 1 0-1l3.1-3A12.4 12.4 0 0 1 6.7 9H8a10.1 10.1 0 0 0 1.7 2.4c.5-.5 1-1.1 1.4-1.8l.9-2H4.7a.7.7 0 1 1 0-1.5h4.4v-.7c0-.4.3-.8.7-.8.4 0 .7.4.7.8v.7H15c.4 0 .8.3.8.7 0 .4-.4.8-.8.8h-1.4a12.3 12.3 0 0 1-1 2.4 13.5 13.5 0 0 1-1.7 2.3l1.9 1.8zm4.3-3l2.7 7.3a.5.5 0 0 1-.4.7 1 1 0 0 1-1-.7l-.6-1.5h-3.4l-.6 1.5a1 1 0 0 1-1 .7.5.5 0 0 1-.4-.7l2.7-7.4a1 1 0 1 1 2 0zm-2.2 4.4h2.4L16 12.5l-1.2 3.2z" fill-rule="evenodd"/></svg>',
            underline: '<svg width="24" height="24"><path d="M16 5c.6 0 1 .4 1 1v5.5a4 4 0 0 1-.4 1.8l-1 1.4a5.3 5.3 0 0 1-5.5 1 5 5 0 0 1-1.6-1c-.5-.4-.8-.9-1.1-1.4a4 4 0 0 1-.4-1.8V6c0-.6.4-1 1-1s1 .4 1 1v5.5c0 .3 0 .6.2 1l.6.7a3.3 3.3 0 0 0 2.2.8 3.4 3.4 0 0 0 2.2-.8c.3-.2.4-.5.6-.8l.2-.9V6c0-.6.4-1 1-1zM8 17h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
            undo: '<svg width="24" height="24"><path d="M6.4 8H12c3.7 0 6.2 2 6.8 5.1.6 2.7-.4 5.6-2.3 6.8a1 1 0 0 1-1-1.8c1.1-.6 1.8-2.7 1.4-4.6-.5-2.1-2.1-3.5-4.9-3.5H6.4l3.3 3.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 1.4L6.4 8z" fill-rule="nonzero"/></svg>',
            unlink: '<svg width="24" height="24"><path d="M6.2 12.3a1 1 0 0 1 1.4 1.4l-2 2a2 2 0 1 0 2.6 2.8l4.8-4.8a1 1 0 0 0 0-1.4 1 1 0 1 1 1.4-1.3 2.9 2.9 0 0 1 0 4L9.6 20a3.9 3.9 0 0 1-5.5-5.5l2-2zm11.6-.6a1 1 0 0 1-1.4-1.4l2.1-2a2 2 0 1 0-2.7-2.8L11 10.3a1 1 0 0 0 0 1.4A1 1 0 1 1 9.6 13a2.9 2.9 0 0 1 0-4L14.4 4a3.9 3.9 0 0 1 5.5 5.5l-2 2zM7.6 6.3a.8.8 0 0 1-1 1.1L3.3 4.2a.7.7 0 1 1 1-1l3.2 3.1zM5.1 8.6a.8.8 0 0 1 0 1.5H3a.8.8 0 0 1 0-1.5H5zm5-3.5a.8.8 0 0 1-1.5 0V3a.8.8 0 0 1 1.5 0V5zm6 11.8a.8.8 0 0 1 1-1l3.2 3.2a.8.8 0 0 1-1 1L16 17zm-2.2 2a.8.8 0 0 1 1.5 0V21a.8.8 0 0 1-1.5 0V19zm5-3.5a.7.7 0 1 1 0-1.5H21a.8.8 0 0 1 0 1.5H19z" fill-rule="nonzero"/></svg>',
            unlock: '<svg width="24" height="24"><path d="M16 5c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v3h-2V8a1 1 0 0 0-.3-.7A1 1 0 0 0 16 7h-2a1 1 0 0 0-.7.3 1 1 0 0 0-.3.7v3h.3c.2 0 .3 0 .5.2l.2.6v7.4c0 .3 0 .4-.2.6l-.6.2H4.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6v-7.4c0-.3 0-.4.2-.6l.5-.2H11V8c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9h2z" fill-rule="evenodd"/></svg>',
            "unordered-list": '<svg width="24" height="24"><path d="M11 5h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zM4.5 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1z" fill-rule="evenodd"/></svg>',
            unselected: '<svg width="24" height="24"><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-1a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill-rule="evenodd"/></svg>',
            upload: '<svg width="24" height="24"><path d="M18 19v-2a1 1 0 0 1 2 0v3c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 2 0v2h12zM11 6.4L8.7 8.7a1 1 0 0 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.4L13 6.4V16a1 1 0 0 1-2 0V6.4z" fill-rule="nonzero"/></svg>',
            user: '<svg width="24" height="24"><path d="M12 24a12 12 0 1 1 0-24 12 12 0 0 1 0 24zm-8.7-5.3a11 11 0 0 0 17.4 0C19.4 16.3 14.6 15 12 15c-2.6 0-7.4 1.3-8.7 3.7zM12 13c2.2 0 4-2 4-4.5S14.2 4 12 4 8 6 8 8.5 9.8 13 12 13z" fill-rule="nonzero"/></svg>',
            warning: '<svg width="24" height="24"><path d="M19.8 18.3c.2.5.3.9 0 1.2-.1.3-.5.5-1 .5H5.2c-.5 0-.9-.2-1-.5-.3-.3-.2-.7 0-1.2L11 4.7l.5-.5.5-.2c.2 0 .3 0 .5.2.2 0 .3.3.5.5l6.8 13.6zM12 18c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7a1 1 0 0 0-.3-.7 1 1 0 0 0-.7-.3 1 1 0 0 0-.7.3 1 1 0 0 0-.3.7c0 .3.1.5.3.7.2.2.4.3.7.3zm.7-3l.3-4a1 1 0 0 0-.3-.7 1 1 0 0 0-.7-.3 1 1 0 0 0-.7.3 1 1 0 0 0-.3.7l.3 4h1.4z" fill-rule="evenodd"/></svg>',
            "zoom-in": '<svg width="24" height="24"><path d="M16 17.3a8 8 0 1 1 1.4-1.4l4.3 4.4a1 1 0 0 1-1.4 1.4l-4.4-4.3zm-5-.3a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm-1-9a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0V8zm-2 4a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2H8z" fill-rule="nonzero"/></svg>',
            "zoom-out": '<svg width="24" height="24"><path d="M16 17.3a8 8 0 1 1 1.4-1.4l4.3 4.4a1 1 0 0 1-1.4 1.4l-4.4-4.3zm-5-.3a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm-3-5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2H8z" fill-rule="nonzero"/></svg>'
        },
        nh = tt.from(th["temporary-placeholder"]).getOr("!not found!"),
        eh = function(n, t) {
            return tt.from(t()[n]).getOrThunk(function() {
                return t = n, tt.from(th[t]).getOr(nh);
                var t
            })
        },
        oh = function(e, t, o) {
            return tt.from(t()[e]).getOrThunk(function() {
                return t = e, n = o, tt.from(th[t]).getOrThunk(function() {
                    return n.getOr(nh)
                });
                var t, n
            })
        },
        rh = function(t, n) {
            return Ht(t, function(t) {
                return tt.from(n()[t])
            }).getOrThunk(function() {
                return Ht(t, function(t) {
                    return tt.from(th[t])
                }).getOr(nh)
            })
        },
        ih = {
            success: "checkmark",
            error: "warning",
            err: "error",
            warning: "warning",
            warn: "warning",
            info: "info"
        },
        uh = Fl({
            name: "Notification",
            factory: function(n) {
                var o = Zm({
                        dom: {
                            tag: "p",
                            innerHtml: n.translationProvider(n.text)
                        },
                        behaviours: Ru([$d.config({})])
                    }),
                    e = function(t) {
                        return {
                            dom: {
                                tag: "div",
                                classes: ["tox-bar"],
                                attributes: {
                                    style: "width: " + t + "%"
                                }
                            }
                        }
                    },
                    r = function(t) {
                        return {
                            dom: {
                                tag: "div",
                                classes: ["tox-text"],
                                innerHtml: t + "%"
                            }
                        }
                    },
                    i = Zm({
                        dom: {
                            tag: "div",
                            classes: n.progress ? ["tox-progress-bar", "tox-progress-indicator"] : ["tox-progress-bar"]
                        },
                        components: [{
                            dom: {
                                tag: "div",
                                classes: ["tox-bar-container"]
                            },
                            components: [e(0)]
                        }, r(0)],
                        behaviours: Ru([$d.config({})])
                    }),
                    t = {
                        updateProgress: function(t, n) {
                            t.getSystem().isConnected() && i.getOpt(t).each(function(t) {
                                $d.set(t, [{
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-bar-container"]
                                    },
                                    components: [e(n)]
                                }, r(n)])
                            })
                        },
                        updateText: function(t, n) {
                            if (t.getSystem().isConnected()) {
                                var e = o.get(t);
                                $d.set(e, [lu(n)])
                            }
                        }
                    },
                    u = R([n.icon.toArray(), n.level.toArray(), n.level.bind(function(t) {
                        return tt.from(ih[t])
                    }).toArray()]);
                return {
                    uid: n.uid,
                    dom: {
                        tag: "div",
                        attributes: {
                            role: "alert"
                        },
                        classes: n.level.map(function(t) {
                            return ["tox-notification", "tox-notification--in", "tox-notification--" + t]
                        }).getOr(["tox-notification", "tox-notification--in"])
                    },
                    components: [{
                        dom: {
                            tag: "div",
                            classes: ["tox-notification__icon"],
                            innerHtml: rh(u, n.iconProvider)
                        }
                    }, {
                        dom: {
                            tag: "div",
                            classes: ["tox-notification__body"]
                        },
                        components: [o.asSpec()],
                        behaviours: Ru([$d.config({})])
                    }].concat(n.progress ? [i.asSpec()] : []).concat(Qm.sketch({
                        dom: {
                            tag: "button",
                            classes: ["tox-notification__dismiss", "tox-button", "tox-button--naked", "tox-button--icon"]
                        },
                        components: [{
                            dom: {
                                tag: "div",
                                classes: ["tox-icon"],
                                innerHtml: eh("close", n.iconProvider),
                                attributes: {
                                    "aria-label": n.translationProvider("Close")
                                }
                            }
                        }],
                        action: function(t) {
                            n.onAction(t)
                        }
                    })),
                    apis: t
                }
            },
            configFields: [fr("level"), or("progress"), or("icon"), or("onAction"), or("text"), or("iconProvider"), or("translationProvider")],
            apis: {
                updateProgress: function(t, n, e) {
                    t.updateProgress(n, e)
                },
                updateText: function(t, n, e) {
                    t.updateText(n, e)
                }
            }
        });

    function ah(r, i, u) {
        var a = i.backstage;
        return {
            open: function(t, n) {
                var e = function() {
                        n(), Jm.hide(r)
                    },
                    o = mu(uh.sketch({
                        text: t.text,
                        level: M(["success", "error", "warning", "info"], t.type) ? t.type : undefined,
                        progress: !0 === t.progressBar,
                        icon: tt.from(t.icon),
                        onAction: e,
                        iconProvider: a.shared.providers.icons,
                        translationProvider: a.shared.providers.translate
                    })),
                    r = mu(Jm.sketch({
                        dom: {
                            tag: "div",
                            classes: ["tox-notifications-container"]
                        },
                        lazySink: i.backstage.shared.getSink,
                        fireDismissalEventInstead: {}
                    }));
                return u.add(r), t.timeout && setTimeout(function() {
                    e()
                }, t.timeout), {
                    close: e,
                    moveTo: function(t, n) {
                        Jm.showAt(r, {
                            anchor: "makeshift",
                            x: t,
                            y: n
                        }, hu(o))
                    },
                    moveRel: function(t, n) {
                        Jm.showAt(r, i.backstage.shared.anchors.banner(), hu(o))
                    },
                    text: function(t) {
                        uh.updateText(o, t)
                    },
                    settings: t,
                    getEl: function() {},
                    progressBar: {
                        value: function(t) {
                            uh.updateProgress(o, t)
                        }
                    }
                }
            },
            close: function(t) {
                t.close()
            },
            reposition: function(t) {
                T(t, function(t) {
                        t.moveTo(0, 0)
                    }),
                    function(e) {
                        if (0 < e.length) {
                            var t = e.slice(0, 1)[0],
                                n = (o = r).inline ? o.getElement() : o.getContentAreaContainer();
                            t.moveRel(n, "tc-tc"), T(e, function(t, n) {
                                0 < n && t.moveRel(e[n - 1].getEl(), "bc-tc")
                            })
                        }
                        var o
                    }(t)
            },
            getArgs: function(t) {
                return t.settings
            }
        }
    }
    var ch, sh, lh = function(e, o) {
            var r = null;
            return {
                cancel: function() {
                    null !== r && (clearTimeout(r), r = null)
                },
                throttle: function() {
                    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                    null !== r && clearTimeout(r), r = setTimeout(function() {
                        e.apply(null, t), r = null
                    }, o)
                }
            }
        },
        fh = /[\u00a0 \t\r\n]/,
        dh = function(e, t, n, o, r) {
            return void 0 === r && (r = 0), (i = e).collapsed && 3 === i.startContainer.nodeType ? function(t, n, e, o) {
                var r;
                for (r = n - 1; 0 <= r; r--) {
                    if (fh.test(t.charAt(r))) return tt.none();
                    if (t.charAt(r) === e) break
                }
                return -1 === r || n - r < o ? tt.none() : tt.some(t.substring(r + 1, n))
            }(n, o, t, r).map(function(t) {
                var n = e.cloneRange();
                return n.setStart(e.startContainer, e.startOffset - t.length - 1), n.setEnd(e.startContainer, e.startOffset), {
                    text: t,
                    rng: n
                }
            }) : tt.none();
            var i
        },
        mh = function(e, t) {
            t.on("keypress", e.onKeypress.throttle), t.on("remove", e.onKeypress.cancel);
            var o = function(t, n) {
                Er(t, Rt(), {
                    raw: n
                })
            };
            t.on("keydown", function(n) {
                var t = function() {
                    return e.getView().bind(tf.getHighlighted)
                };
                8 === n.which && e.onKeypress.throttle(n), e.isActive() && (27 === n.which ? e.closeIfNecessary() : 32 === n.which ? e.closeIfNecessary() : 13 === n.which ? (t().each(Vr), n.preventDefault()) : 40 === n.which ? (t().fold(function() {
                    e.getView().each(tf.highlightFirst)
                }, function(t) {
                    o(t, n)
                }), n.preventDefault()) : 37 !== n.which && 38 !== n.which && 39 !== n.which || t().each(function(t) {
                    o(t, n), n.preventDefault()
                }))
            })
        },
        hh = tinymce.util.Tools.resolve("tinymce.util.Promise"),
        gh = function(t, n) {
            var e, o, r, i = n(),
                u = t.selection.getRng(),
                a = u.startContainer.nodeValue;
            return (e = u, o = a, r = i, Ht(r.triggerChars, function(n) {
                return dh(e, n, o, e.startOffset).map(function(t) {
                    return {
                        range: t.rng,
                        text: t.text,
                        triggerChar: n
                    }
                })
            })).map(function(e) {
                var t = A(i.lookupByChar(e.triggerChar), function(t) {
                    return e.text.length >= t.minChars && t.matches(e.range, a, e.text)
                });
                return {
                    lookupData: hh.all(V(t, function(n) {
                        return n.fetch(e.text, n.maxResults).then(function(t) {
                            return {
                                items: t,
                                columns: n.columns,
                                onAction: n.onAction
                            }
                        })
                    })),
                    triggerChar: e.triggerChar,
                    range: e.range
                }
            })
        },
        vh = Bo([kr("type", function() {
            return "autocompleteitem"
        }), kr("active", function() {
            return !1
        }), kr("disabled", function() {
            return !1
        }), vr("meta", {}), ir("value"), mr("text"), mr("icon")]),
        ph = Bo([ir("type"), ir("ch"), br("minChars", 0), vr("columns", 1), br("maxResults", 10), zr("matches", function() {
            return !0
        }), ar("fetch"), ar("onAction")]),
        bh = function(t) {
            var n, e, o = t.ui.registry.getAll().popups,
                r = nt(o, function(t) {
                    return (n = t, Go("Autocompleter", ph, n)).fold(function(t) {
                        throw new Error(qo(t))
                    }, function(t) {
                        return t
                    });
                    var n
                }),
                i = (n = ot(r, function(t) {
                    return t.ch
                }), e = {}, T(n, function(t) {
                    e[t] = {}
                }), K(e)),
                u = rt(r);
            return {
                dataset: r,
                triggerChars: i,
                lookupByChar: function(n) {
                    return A(u, function(t) {
                        return t.ch === n
                    })
                }
            }
        },
        yh = [wr("disabled", !1), mr("text"), mr("shortcut"), Ro("value", "value", oo(function() {
            return Ye("menuitem-value")
        }), Jo()), vr("meta", {})],
        xh = Bo([ir("type"), zr("onSetup", function() {
            return Q
        }), zr("onAction", Q), mr("icon")].concat(yh)),
        wh = Bo([ir("type"), ar("getSubmenuItems"), zr("onSetup", function() {
            return Q
        }), mr("icon")].concat(yh)),
        zh = Bo([ir("type"), wr("active", !1), zr("onSetup", function() {
            return Q
        }), ar("onAction")].concat(yh)),
        Sh = Bo([ir("type"), wr("active", !1), mr("icon")].concat(yh)),
        kh = Bo([ir("type"), mr("text")]),
        Ch = Bo([ir("type"), ur("fancytype", ["inserttable"]), zr("onAction", Q)]),
        Oh = function(t, o, n) {
            var r = Vc(t.element(), "." + n);
            if (0 < r.length) {
                var e = F(r, function(t) {
                    var n = t.dom().getBoundingClientRect().top,
                        e = r[0].dom().getBoundingClientRect().top;
                    return Math.abs(n - e) > o
                }).getOr(r.length);
                return tt.some({
                    numColumns: e,
                    numRows: Math.ceil(r.length / e)
                })
            }
            return tt.none()
        },
        Mh = function(t, n) {
            return Ru([_m(t, n)])
        },
        Hh = function(t) {
            return Mh(Ye("unnamed-events"), t)
        },
        Eh = ["input", "button", "textarea"],
        Vh = function(t, n, e) {
            n.disabled && Fh(t, n, e)
        },
        Th = function(t) {
            return M(Eh, Se(t.element()))
        },
        Ah = function(t) {
            Ee(t.element(), "disabled", "disabled")
        },
        Bh = function(t) {
            Be(t.element(), "disabled")
        },
        Dh = function(t) {
            Ee(t.element(), "aria-disabled", "true")
        },
        _h = function(t) {
            Ee(t.element(), "aria-disabled", "false")
        },
        Fh = function(n, t, e) {
            t.disableClass.each(function(t) {
                Ri(n.element(), t)
            }), (Th(n) ? Ah : Dh)(n)
        },
        Ih = function(t) {
            return Th(t) ? Ae(t.element(), "disabled") : "true" === Te(t.element(), "aria-disabled")
        },
        Lh = /* */ Object.freeze({
            enable: function(n, t, e) {
                t.disableClass.each(function(t) {
                    Pi(n.element(), t)
                }), (Th(n) ? Bh : _h)(n)
            },
            disable: Fh,
            isDisabled: Ih,
            onLoad: Vh
        }),
        Rh = /* */ Object.freeze({
            exhibit: function(t, n, e) {
                return Oi({
                    classes: n.disabled ? n.disableClass.map(G).getOr([]) : []
                })
            },
            events: function(t, n) {
                return Gr([Xr(Cn(), function(t, n) {
                    return Ih(t)
                }), Du(t, n, Vh)])
            }
        }),
        Nh = [vr("disabled", !1), fr("disableClass")],
        Ph = Pu({
            fields: Nh,
            name: "disabling",
            active: Rh,
            apis: Lh
        }),
        jh = [or("lazySink"), or("tooltipDom"), vr("exclusive", !0), vr("tooltipComponents", []), vr("delay", 300), xr("mode", "normal", ["normal", "follow-highlight"]), vr("anchor", function(t) {
            return {
                anchor: "hotspot",
                hotspot: t,
                layouts: {
                    onLtr: Z([uc, ic, nc, oc, ec, rc]),
                    onRtl: Z([uc, ic, nc, oc, ec, rc])
                }
            }
        }), Mu("onHide"), Mu("onShow")],
        Uh = /* */ Object.freeze({
            init: function() {
                var e = Ot(tt.none()),
                    n = Ot(tt.none()),
                    o = function() {
                        e.get().each(function(t) {
                            clearTimeout(t)
                        })
                    },
                    t = Z("not-implemented");
                return ki({
                    getTooltip: function() {
                        return n.get()
                    },
                    isShowing: function() {
                        return n.get().isSome()
                    },
                    setTooltip: function(t) {
                        n.set(tt.some(t))
                    },
                    clearTooltip: function() {
                        n.set(tt.none())
                    },
                    clearTimer: o,
                    resetTimer: function(t, n) {
                        o(), e.set(tt.some(setTimeout(function() {
                            t()
                        }, n)))
                    },
                    readState: t
                })
            }
        }),
        Wh = Ye("tooltip.exclusive"),
        Gh = Ye("tooltip.show"),
        Xh = Ye("tooltip.hide"),
        Yh = function(t, n, e) {
            t.getSystem().broadcastOn([Wh], {})
        },
        qh = /* */ Object.freeze({
            hideAllExclusive: Yh,
            setComponents: function(t, n, e, o) {
                e.getTooltip().each(function(t) {
                    t.getSystem().isConnected() && $d.set(t, o)
                })
            }
        }),
        Kh = Pu({
            fields: jh,
            name: "tooltipping",
            active: /* */ Object.freeze({
                events: function(o, r) {
                    var e = function(n) {
                        r.getTooltip().each(function(t) {
                            gs(t), o.onHide(n, t), r.clearTooltip()
                        }), r.clearTimer()
                    };
                    return Gr(R([
                        [qr(Gh, function(t) {
                            r.resetTimer(function() {
                                ! function(n) {
                                    if (!r.isShowing()) {
                                        Yh(n);
                                        var t = o.lazySink(n).getOrDie(),
                                            e = n.getSystem().build({
                                                dom: o.tooltipDom,
                                                components: o.tooltipComponents,
                                                events: Gr("normal" === o.mode ? [qr(Ft(), function(t) {
                                                    Hr(n, Gh)
                                                }), qr(Dt(), function(t) {
                                                    Hr(n, Xh)
                                                })] : []),
                                                behaviours: Ru([$d.config({})])
                                            });
                                        r.setTooltip(e), ds(t, e), o.onShow(n, e), ss.position(t, o.anchor(n), e)
                                    }
                                }(t)
                            }, o.delay)
                        }), qr(Xh, function(t) {
                            r.resetTimer(function() {
                                e(t)
                            }, o.delay)
                        }), qr(kn(), function(t, n) {
                            M(n.channels(), Wh) && e(t)
                        }), oi(function(t) {
                            e(t)
                        })], "normal" === o.mode ? [qr(It(), function(t) {
                            Hr(t, Gh)
                        }), qr(zn(), function(t) {
                            Hr(t, Xh)
                        }), qr(Ft(), function(t) {
                            Hr(t, Gh)
                        }), qr(Dt(), function(t) {
                            Hr(t, Xh)
                        })] : [qr(jn(), function(t, n) {
                            Hr(t, Gh)
                        }), qr(Un(), function(t) {
                            Hr(t, Xh)
                        })]
                    ]))
                }
            }),
            state: Uh,
            apis: qh
        }),
        Jh = "tox-menu-nav__js",
        $h = "tox-collection__item",
        Qh = "tox-swatch",
        Zh = {
            normal: Jh,
            color: Qh
        },
        tg = "tox-collection__item--enabled",
        ng = "tox-collection__item-icon",
        eg = "tox-collection__item-label",
        og = "tox-collection__item--active",
        rg = function(t) {
            return wt(Zh, t).getOr(Jh)
        },
        ig = tinymce.util.Tools.resolve("tinymce.util.I18n"),
        ug = tinymce.util.Tools.resolve("tinymce.Env"),
        ag = function(t) {
            var e = ug.mac ? {
                    alt: "&#x2325;",
                    ctrl: "&#x2303;",
                    shift: "&#x21E7;",
                    meta: "&#x2318;"
                } : {
                    meta: "Ctrl"
                },
                n = t.split("+"),
                o = V(n, function(t) {
                    var n = t.toLowerCase().trim();
                    return ut(e, n) ? e[n] : t
                });
            return ug.mac ? o.join("") : o.join("+")
        },
        cg = function(t) {
            return {
                dom: {
                    tag: "span",
                    classes: [ng],
                    innerHtml: t
                }
            }
        },
        sg = function(t) {
            return {
                dom: {
                    tag: "span",
                    classes: [eg]
                },
                components: [lu(ig.translate(t))]
            }
        },
        lg = function(t, n) {
            return {
                dom: {
                    tag: "span",
                    classes: [eg]
                },
                components: [{
                    dom: {
                        tag: t.tag,
                        attributes: {
                            style: t.styleAttr
                        }
                    },
                    components: [lu(ig.translate(n))]
                }]
            }
        },
        fg = function(t) {
            return {
                dom: {
                    tag: "span",
                    classes: ["tox-collection__item-accessory"],
                    innerHtml: ag(t)
                }
            }
        },
        dg = function(t) {
            return {
                dom: {
                    tag: "span",
                    classes: [ng, "tox-collection__item-checkmark"],
                    innerHtml: eh("checkmark", t)
                }
            }
        },
        mg = function(t) {
            var n, e, o, r = Gn.fromHtml(t),
                i = de(r),
                u = (e = (n = r).dom().attributes !== undefined ? n.dom().attributes : [], D(e, function(t, n) {
                    var e;
                    return "class" === n.name ? t : Ke({}, t, ((e = {})[n.name] = n.value, e))
                }, {})),
                a = (o = r, Array.prototype.slice.call(o.dom().classList, 0)),
                c = 0 === i.length ? {} : {
                    innerHtml: we(r)
                };
            return Ke({
                tag: Se(r),
                classes: a,
                attributes: u
            }, c)
        },
        hg = function(t, n, e, o) {
            void 0 === o && (o = tt.none());
            var r, i, u, a, c, s, l, f, d, m, h = t.iconContent.map(function(t) {
                    return oh(t, n.icons, o)
                }),
                g = tt.from(t.meta).fold(function() {
                    return sg
                }, function(t) {
                    return ut(t, "style") ? v(lg, t.style) : sg
                });
            return "color" === t.presets ? (s = t.ariaLabel, l = t.value, {
                dom: (f = Qh, d = h.getOr(""), m = s.map(function(t) {
                    return ' title="' + t + '"'
                }).getOr(""), mg("custom" === l ? '<button class="' + f + ' tox-swatches__picker-btn"' + m + ">" + d + "</button>" : "remove" === l ? '<div class="' + f + ' tox-swatch--remove"' + m + ">" + d + "</div>" : '<div class="' + f + '" style="background-color: ' + l + '" data-mce-color="' + l + '"' + m + "></div>")),
                optComponents: []
            }) : (r = t, i = h, u = g, a = e ? r.checkMark.orThunk(function() {
                return i.or(tt.some("")).map(cg)
            }) : tt.none(), c = r.ariaLabel.map(function(t) {
                return {
                    attributes: {
                        title: ig.translate(t)
                    }
                }
            }).getOr({}), {
                dom: pt({
                    tag: "div",
                    classes: [Jh, $h]
                }, c),
                optComponents: [a, r.textContent.map(u), r.shortcutContent.map(fg), r.caret]
            })
        },
        gg = function(t) {
            return Ph.config({
                disabled: t,
                disableClass: "tox-collection__item--state-disabled"
            })
        },
        vg = function(t) {
            return Ph.config({
                disabled: t
            })
        },
        pg = function(t) {
            return Ph.config({
                disabled: t,
                disableClass: "tox-tbtn--disabled"
            })
        },
        bg = function(t, n) {
            var e = t.getApi(n);
            return function(t) {
                t(e)
            }
        },
        yg = function(e, o) {
            return ei(function(t) {
                bg(e, t)(function(t) {
                    var n = e.onSetup(t);
                    null !== n && n !== undefined && o.set(n)
                })
            })
        },
        xg = function(n, e) {
            return oi(function(t) {
                return bg(n, t)(e.get())
            })
        };
    (sh = ch || (ch = {}))[sh.CLOSE_ON_EXECUTE = 0] = "CLOSE_ON_EXECUTE", sh[sh.BUBBLE_TO_SANDBOX = 1] = "BUBBLE_TO_SANDBOX";
    var wg, zg, Sg = ch,
        kg = {
            "alloy.execute": ["disabling", "alloy.base.behaviour", "toggling", "item-events"]
        },
        Cg = function(t) {
            return N(t, function(t) {
                return t.toArray()
            })
        },
        Og = function(t, n, e) {
            var o, r, i = Ot(Q);
            return {
                type: "item",
                dom: n.dom,
                components: Cg(n.optComponents),
                data: t.data,
                eventOrder: kg,
                hasSubmenu: t.triggersSubmenu,
                itemBehaviours: Ru([_m("item-events", [(o = t, r = e, ii(function(t, n) {
                    bg(o, t)(o.onAction), o.triggersSubmenu || r !== Sg.CLOSE_ON_EXECUTE || (Hr(t, Vn()), n.stop())
                })), yg(t, i), xg(t, i)]), gg(t.disabled), $d.config({})].concat(t.itemBehaviours))
            }
        },
        Mg = function(t) {
            return {
                value: t.value,
                meta: pt({
                    text: t.text.getOr("")
                }, t.meta)
            }
        },
        Hg = Z(gl("item-widget", Lm())),
        Eg = Ye("cell-over"),
        Vg = Ye("cell-execute"),
        Tg = function(n, e, t) {
            var o, r = function(t) {
                return Er(t, Vg, {
                    row: n,
                    col: e
                })
            };
            return mu({
                dom: {
                    tag: "div",
                    attributes: (o = {
                        role: "button"
                    }, o["aria-labelledby"] = t, o)
                },
                behaviours: Ru([_m("insert-table-picker-cell", [qr(Ft(), gm.focus), qr(Cn(), r), qr(Hn(), r)]), Hm.config({
                    toggleClass: "tox-insert-table-picker__selected",
                    toggleOnExecute: !1
                }), gm.config({
                    onFocus: function(t) {
                        return Er(t, Eg, {
                            row: n,
                            col: e
                        })
                    }
                })])
            })
        },
        Ag = {
            inserttable: function zE(o) {
                var t, n = Ye("size-label"),
                    a = function(t, n, e) {
                        for (var o = [], r = 0; r < n; r++) {
                            for (var i = [], u = 0; u < e; u++) i.push(Tg(r, u, t));
                            o.push(i)
                        }
                        return o
                    }(n, 10, 10),
                    c = Zm({
                        dom: {
                            tag: "span",
                            classes: ["tox-insert-table-picker__label"],
                            attributes: {
                                id: n
                            }
                        },
                        components: [lu("0x0")],
                        behaviours: Ru([$d.config({})])
                    });
                return {
                    type: "widget",
                    data: {
                        value: Ye("widget-id")
                    },
                    dom: {
                        tag: "div",
                        classes: ["tox-fancymenuitem"]
                    },
                    autofocus: !0,
                    components: [Hg().widget({
                        dom: {
                            tag: "div",
                            classes: ["tox-insert-table-picker"]
                        },
                        components: (t = a, N(t, function(t) {
                            return V(t, hu)
                        })).concat(c.asSpec()),
                        behaviours: Ru([_m("insert-table-picker", [Qr(Eg, function(t, n, e) {
                            var o, r, i = e.event().row(),
                                u = e.event().col();
                            ! function(t, n, e, o, r) {
                                for (var i = 0; i < o; i++)
                                    for (var u = 0; u < r; u++) Hm.set(t[i][u], i <= n && u <= e)
                            }(a, i, u, 10, 10), $d.set(c.get(t), [(o = i, r = u, lu(r + 1 + "x" + (o + 1)))])
                        }), Qr(Vg, function(t, n, e) {
                            o.onAction({
                                numRows: e.event().row() + 1,
                                numColumns: e.event().col() + 1
                            }), Hr(t, Vn())
                        })]), Xd.config({
                            initSize: {
                                numRows: 10,
                                numColumns: 10
                            },
                            mode: "flatgrid",
                            selector: '[role="button"]'
                        })])
                    })]
                }
            }
        },
        Bg = function(n, t, e, o, r, i, u) {
            var a = hg({
                presets: e,
                textContent: t ? n.text : tt.none(),
                ariaLabel: n.text,
                iconContent: n.icon,
                shortcutContent: t ? n.shortcut : tt.none(),
                checkMark: t ? tt.some(dg(u.icons)) : tt.none(),
                caret: tt.none(),
                value: n.value
            }, u, !0);
            return vt(Og({
                data: Mg(n),
                disabled: n.disabled,
                getApi: function(n) {
                    return {
                        setActive: function(t) {
                            Hm.set(n, t)
                        },
                        isActive: function() {
                            return Hm.isOn(n)
                        },
                        isDisabled: function() {
                            return Ph.isDisabled(n)
                        },
                        setDisabled: function(t) {
                            return t ? Ph.disable(n) : Ph.enable(n)
                        }
                    }
                },
                onAction: function(t) {
                    return o(n.value)
                },
                onSetup: function(t) {
                    return t.setActive(r),
                        function() {}
                },
                triggersSubmenu: !1,
                itemBehaviours: []
            }, a, i), {
                toggling: {
                    toggleClass: tg,
                    toggleOnExecute: !1,
                    selected: n.active
                }
            })
        },
        Dg = function(n, t, e, o, r, i) {
            var u, a, c = hg({
                presets: e,
                textContent: t ? n.text : tt.none(),
                ariaLabel: n.text,
                iconContent: n.icon,
                shortcutContent: tt.none(),
                checkMark: tt.none(),
                caret: tt.none(),
                value: n.value
            }, i.providers, !0, n.icon);
            return Og({
                data: Mg(n),
                disabled: n.disabled,
                getApi: function() {
                    return {}
                },
                onAction: function(t) {
                    return o(n.value, n.meta)
                },
                onSetup: function() {
                    return function() {}
                },
                triggersSubmenu: !1,
                itemBehaviours: (u = n.meta, a = i, it(u, "tooltipWorker").map(function(e) {
                    return [Kh.config({
                        lazySink: a.getSink,
                        tooltipDom: {
                            tag: "div"
                        },
                        tooltipComponents: [],
                        anchor: function(t) {
                            return {
                                anchor: "submenu",
                                item: t
                            }
                        },
                        mode: "follow-highlight",
                        onShow: function(n, t) {
                            e(function(t) {
                                Kh.setComponents(n, [fu({
                                    element: Gn.fromDom(t)
                                })])
                            })
                        }
                    })]
                }).getOr([]))
            }, c, r)
        },
        _g = function(t) {
            var n = t.text.fold(function() {
                return {}
            }, function(t) {
                return {
                    innerHtml: t
                }
            });
            return {
                type: "separator",
                dom: Ke({
                    tag: "div",
                    classes: [$h, "tox-collection__group-heading"]
                }, n),
                components: []
            }
        },
        Fg = function(t, n, e, o) {
            void 0 === o && (o = !0);
            var r = hg({
                presets: "normal",
                iconContent: t.icon,
                textContent: t.text,
                ariaLabel: t.text,
                caret: tt.none(),
                checkMark: tt.none(),
                shortcutContent: t.shortcut
            }, e, o);
            return Og({
                data: Mg(t),
                getApi: function(n) {
                    return {
                        isDisabled: function() {
                            return Ph.isDisabled(n)
                        },
                        setDisabled: function(t) {
                            return t ? Ph.disable(n) : Ph.enable(n)
                        }
                    }
                },
                disabled: t.disabled,
                onAction: t.onAction,
                onSetup: t.onSetup,
                triggersSubmenu: !1,
                itemBehaviours: []
            }, r, n)
        },
        Ig = function(t, n, e, o) {
            void 0 === o && (o = !0);
            var r, i = (r = e.icons, {
                    dom: {
                        tag: "span",
                        classes: ["tox-collection__item-caret"],
                        innerHtml: eh("chevron-right", r)
                    }
                }),
                u = hg({
                    presets: "normal",
                    iconContent: t.icon,
                    textContent: t.text,
                    ariaLabel: t.text,
                    caret: tt.some(i),
                    checkMark: tt.none(),
                    shortcutContent: t.shortcut
                }, e, o);
            return Og({
                data: Mg(t),
                getApi: function(n) {
                    return {
                        isDisabled: function() {
                            return Ph.isDisabled(n)
                        },
                        setDisabled: function(t) {
                            return t ? Ph.disable(n) : Ph.enable(n)
                        }
                    }
                },
                disabled: t.disabled,
                onAction: Q,
                onSetup: t.onSetup,
                triggersSubmenu: !0,
                itemBehaviours: []
            }, u, n)
        },
        Lg = function(t, n, e) {
            var o = hg({
                iconContent: tt.none(),
                textContent: t.text,
                ariaLabel: t.text,
                checkMark: tt.some(dg(e.icons)),
                caret: tt.none(),
                shortcutContent: t.shortcut,
                presets: "normal",
                meta: t.meta
            }, e, !0);
            return vt(Og({
                data: Mg(t),
                disabled: t.disabled,
                getApi: function(n) {
                    return {
                        setActive: function(t) {
                            Hm.set(n, t)
                        },
                        isActive: function() {
                            return Hm.isOn(n)
                        },
                        isDisabled: function() {
                            return Ph.isDisabled(n)
                        },
                        setDisabled: function(t) {
                            return t ? Ph.disable(n) : Ph.enable(n)
                        }
                    }
                },
                onAction: t.onAction,
                onSetup: t.onSetup,
                triggersSubmenu: !1,
                itemBehaviours: []
            }, o, n), {
                toggling: {
                    toggleClass: tg,
                    toggleOnExecute: !1,
                    selected: t.active
                }
            })
        },
        Rg = function(n) {
            return (t = Ag, e = n.fancytype, Object.prototype.hasOwnProperty.call(t, e) ? tt.some(t[e]) : tt.none()).map(function(t) {
                return t(n)
            });
            var t, e
        },
        Ng = function(t) {
            return {
                backgroundMenu: "tox-background-menu",
                selectedMenu: "tox-selected-menu",
                selectedItem: "tox-collection__item--active",
                hasIcons: "tox-menu--has-icons",
                menu: (n = t, "color" === n ? "tox-swatches" : "tox-menu"),
                tieredMenu: "tox-tiered-menu"
            };
            var n
        },
        Pg = function(t) {
            var n = Ng(t);
            return {
                backgroundMenu: n.backgroundMenu,
                selectedMenu: n.selectedMenu,
                menu: n.menu,
                selectedItem: n.selectedItem,
                item: rg(t)
            }
        },
        jg = [Wm.parts().items({})],
        Ug = function(t, n, e) {
            var o = Ng(e);
            return {
                dom: {
                    tag: "div",
                    classes: R([
                        [o.tieredMenu]
                    ])
                },
                markers: Pg(e)
            }
        },
        Wg = function(t, n) {
            var e = Pg(n);
            return 1 === t ? {
                mode: "menu",
                moveOnTab: !0
            } : "auto" === t ? {
                mode: "grid",
                selector: "." + e.item,
                initSize: {
                    numColumns: 1,
                    numRows: 1
                }
            } : {
                mode: "matrix",
                rowSelector: "." + ("color" === n ? "tox-swatches__row" : "tox-collection__group")
            }
        },
        Gg = function(e, o) {
            return function(t) {
                var n = E(t, o);
                return V(n, function(t) {
                    return {
                        dom: e,
                        components: t
                    }
                })
            }
        },
        Xg = function(n, i, t) {
            return void 0 === t && (t = !0), {
                dom: {
                    tag: "div",
                    classes: ["tox-menu", "tox-collection"].concat(1 === n ? ["tox-collection--list"] : ["tox-collection--grid"])
                },
                components: [Wm.parts().items({
                    preprocess: function(t) {
                        return "auto" !== n && 1 < n ? Gg({
                            tag: "div",
                            classes: ["tox-collection__group"]
                        }, n)(t) : (e = function(t, n) {
                            return "separator" === i[n].type
                        }, o = [], r = [], T(t, function(t, n) {
                            e(t, n) ? (0 < r.length && o.push(r), r = [], ut(t.dom, "innerHtml") && r.push(t)) : r.push(t)
                        }), 0 < r.length && o.push(r), V(o, function(t) {
                            return {
                                dom: {
                                    tag: "div",
                                    classes: ["tox-collection__group"]
                                },
                                components: t
                            }
                        }));
                        var e, o, r
                    }
                })]
            }
        };
    (zg = wg || (wg = {}))[zg.ContentFocus = 0] = "ContentFocus", zg[zg.UiFocus = 1] = "UiFocus";
    var Yg = function(t) {
            return console.error(qo(t)), console.log(t), tt.none()
        },
        qg = function(t) {
            return t.icon !== undefined || "togglemenuitem" === t.type || "choicemenuitem" === t.type
        },
        Kg = function(t) {
            return H(t, qg)
        },
        Jg = function(t, n, e, o) {
            switch (void 0 === o && (o = !0), t.type) {
                case "menuitem":
                    return (c = t, Go("menuitem", xh, c)).fold(Yg, function(t) {
                        return tt.some(Fg(t, n, e, o))
                    });
                case "nestedmenuitem":
                    return (a = t, Go("nestedmenuitem", wh, a)).fold(Yg, function(t) {
                        return tt.some(Ig(t, n, e, o))
                    });
                case "togglemenuitem":
                    return (u = t, Go("togglemenuitem", zh, u)).fold(Yg, function(t) {
                        return tt.some(Lg(t, n, e))
                    });
                case "separator":
                    return (i = t, Go("separatormenuitem", kh, i)).fold(Yg, function(t) {
                        return tt.some(_g(t))
                    });
                case "fancymenuitem":
                    return (r = t, Go("fancymenuitem", Ch, r)).fold(Yg, function(t) {
                        return Rg(t)
                    });
                default:
                    return console.error("Unknown item in general menu", t), tt.none()
            }
            var r, i, u, a, c
        },
        $g = function(t, n, e, o, r) {
            var i, u, a, c, s, l, f;
            return "color" === r ? {
                value: t,
                dom: (i = o, f = {
                    dom: {
                        tag: "div",
                        classes: ["tox-menu"]
                    },
                    components: [{
                        dom: {
                            tag: "div",
                            classes: ["tox-swatches"]
                        },
                        components: [Wm.parts().items({
                            preprocess: "auto" !== i ? Gg({
                                tag: "div",
                                classes: ["tox-swatches__row"]
                            }, i) : d
                        })]
                    }]
                }).dom,
                components: f.components,
                items: e
            } : "normal" === r && "auto" === o ? {
                value: t,
                dom: (f = Xg(o, e)).dom,
                components: f.components,
                items: e
            } : "normal" === r && 1 === o ? {
                value: t,
                dom: (f = Xg(1, e)).dom,
                components: f.components,
                items: e
            } : "normal" === r ? {
                value: t,
                dom: (f = Xg(o, e)).dom,
                components: f.components,
                items: e
            } : "toolbar" !== r || "auto" === o ? {
                value: t,
                dom: (a = n, c = o, s = r, l = Ng(s), {
                    tag: "div",
                    classes: R([
                        [l.menu, "tox-menu-" + c + "-column"], a ? [l.hasIcons] : []
                    ])
                }),
                components: jg,
                items: e
            } : {
                value: t,
                dom: (u = o, f = {
                    dom: {
                        tag: "div",
                        classes: ["tox-menu", "tox-collection", "tox-collection--toolbar", "tox-collection--toolbar-lg"]
                    },
                    components: [Wm.parts().items({
                        preprocess: Gg({
                            tag: "div",
                            classes: ["tox-collection__group"]
                        }, u)
                    })]
                }).dom,
                components: f.components,
                items: e
            }
        },
        Qg = function(t, e, o, r, i, u, a) {
            return Mt(V(t, function(n) {
                return "choiceitem" === n.type ? (t = n, Go("choicemenuitem", Sh, t)).fold(Yg, function(t) {
                    return tt.some(Bg(t, 1 === o, r, e, u(n.value), i, a))
                }) : tt.none();
                var t
            }))
        },
        Zg = function(t, e, o, r, i) {
            return Mt(V(t, function(t) {
                return (n = t, Go("Autocompleter.Item", vh, n)).fold(Yg, function(t) {
                    return tt.some(Dg(t, 1 === o, "normal", e, r, i))
                });
                var n
            }))
        },
        tv = function(t, n, e, o, r, i, u, a) {
            var c = Kg(n),
                s = Qg(n, e, o, "color" !== r ? "normal" : "color", i, u, a);
            return $g(t, c, s, o, r)
        },
        nv = function(t, n, e, o) {
            var r = Kg(n),
                i = Mt(V(n, function(t) {
                    return Jg(t, e, o, r)
                }));
            return $g(t, r, i, 1, "normal")
        },
        ev = function(t) {
            return Km.singleData(t.value, t)
        },
        ov = function(h, g) {
            var v = mu(Jm.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-autocompleter"]
                    },
                    components: [],
                    lazySink: g.getSink
                })),
                t = function() {
                    return Jm.isOpen(v)
                },
                p = function() {
                    t() && Jm.hide(v)
                },
                n = Xt(function() {
                    return bh(h)
                }),
                e = lh(function(t) {
                    (" " === t.key ? tt.none() : gh(h, n)).fold(p, function(m) {
                        m.lookupData.then(function(t) {
                            var e, n, o, r, i, u, a, c, s, l, f = (e = m.triggerChar, o = Ht(n = t, function(t) {
                                return tt.from(t.columns)
                            }).getOr(1), N(n, function(i) {
                                var t = i.items;
                                return Zg(t, function(o, r) {
                                    var t = h.selection.getRng(),
                                        n = t.startContainer;
                                    dh(t, e, n.data, t.startOffset).fold(function() {
                                        return console.error("Lost context. Cursor probably moved")
                                    }, function(t) {
                                        var n = t.rng,
                                            e = {
                                                hide: p
                                            };
                                        i.onAction(e, n, o, r)
                                    })
                                }, o, Sg.BUBBLE_TO_SANDBOX, g)
                            }));
                            if (0 < f.length) {
                                var d = Ht(t, function(t) {
                                    return tt.from(t.columns)
                                }).getOr(1);
                                Jm.showAt(v, {
                                    anchor: "selection",
                                    root: Gn.fromDom(h.getBody()),
                                    getSelection: function() {
                                        return tt.some({
                                            start: function() {
                                                return Gn.fromDom(m.range.startContainer)
                                            },
                                            soffset: function() {
                                                return m.range.startOffset
                                            },
                                            finish: function() {
                                                return Gn.fromDom(m.range.endContainer)
                                            },
                                            foffset: function() {
                                                return m.range.endOffset
                                            }
                                        })
                                    }
                                }, Wm.sketch((r = $g("autocompleter-value", !0, f, d, "normal"), i = d, u = wg.ContentFocus, a = "normal", c = u === wg.ContentFocus ? pf() : vf(), s = Wg(i, a), l = Pg(a), {
                                    dom: r.dom,
                                    components: r.components,
                                    items: r.items,
                                    value: r.value,
                                    markers: {
                                        selectedItem: l.selectedItem,
                                        item: l.item
                                    },
                                    movement: s,
                                    fakeFocus: u === wg.ContentFocus,
                                    focusManager: c,
                                    menuBehaviours: Hh("auto" !== i ? [] : [ei(function(o, t) {
                                        Oh(o, 4, l.item).each(function(t) {
                                            var n = t.numColumns,
                                                e = t.numRows;
                                            Xd.setGridSize(o, e, n)
                                        })
                                    })])
                                }))), Jm.getContent(v).each(tf.highlightFirst)
                            } else p()
                        })
                    })
                }, 50);
            mh({
                onKeypress: e,
                closeIfNecessary: p,
                isActive: t,
                getView: function() {
                    return Jm.getContent(v)
                }
            }, h)
        },
        rv = function(m, h) {
            return function(t) {
                if (m(t)) {
                    var n, e, o, r, i, u, a, c = Gn.fromDom(t.target),
                        s = function() {
                            t.stopPropagation()
                        },
                        l = function() {
                            t.preventDefault()
                        },
                        f = g(l, s),
                        d = (n = c, e = t.clientX, o = t.clientY, r = s, i = l, u = f, a = t, {
                            target: Z(n),
                            x: Z(e),
                            y: Z(o),
                            stop: r,
                            prevent: i,
                            kill: u,
                            raw: Z(a)
                        });
                    h(d)
                }
            }
        },
        iv = function(t, n, e, o, r) {
            var i = rv(e, o);
            return t.dom().addEventListener(n, i, r), {
                unbind: v(uv, t, n, i, r)
            }
        },
        uv = function(t, n, e, o) {
            t.dom().removeEventListener(n, e, o)
        },
        av = Z(!0),
        cv = function(t, n, e) {
            return iv(t, n, av, e, !1)
        },
        sv = function(t, n, e) {
            return iv(t, n, av, e, !0)
        },
        lv = function(t, n, e) {
            return pu(t, n, e).isSome()
        };

    function fv(e, o) {
        var r = null;
        return {
            cancel: function() {
                null !== r && (clearTimeout(r), r = null)
            },
            schedule: function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                r = setTimeout(function() {
                    e.apply(null, t), r = null
                }, o)
            }
        }
    }
    var dv = function(t) {
            var n = t.raw();
            return n.touches === undefined || 1 !== n.touches.length ? tt.none() : tt.some(n.touches[0])
        },
        mv = function(e) {
            var u = Ot(tt.none()),
                o = fv(function(t) {
                    u.set(tt.none()), e.triggerEvent(En(), t)
                }, 400),
                r = St([{
                    key: Et(),
                    value: function(e) {
                        return dv(e).each(function(t) {
                            o.cancel();
                            var n = {
                                x: Z(t.clientX),
                                y: Z(t.clientY),
                                target: e.target
                            };
                            o.schedule(e), u.set(tt.some(n))
                        }), tt.none()
                    }
                }, {
                    key: Vt(),
                    value: function(t) {
                        return o.cancel(), dv(t).each(function(i) {
                            u.get().each(function(t) {
                                var n, e, o, r;
                                n = i, e = t, o = Math.abs(n.clientX - e.x()), r = Math.abs(n.clientY - e.y()), (5 < o || 5 < r) && u.set(tt.none())
                            })
                        }), tt.none()
                    }
                }, {
                    key: Tt(),
                    value: function(n) {
                        return o.cancel(), u.get().filter(function(t) {
                            return ae(t.target(), n.target())
                        }).map(function(t) {
                            return e.triggerEvent(Mn(), n)
                        })
                    }
                }]);
            return {
                fireIfReady: function(n, t) {
                    return wt(r, t).bind(function(t) {
                        return t(n)
                    })
                }
            }
        },
        hv = yn.detect().browser.isFirefox(),
        gv = Ao([ar("triggerEvent"), vr("stopBackspace", !0)]),
        vv = function(n, t) {
            var e, o, r, i, u = Yo("Getting GUI events settings", gv, t),
                a = yn.detect().deviceType.isTouch() ? ["touchstart", "touchmove", "touchend", "gesturestart"] : ["mousedown", "mouseup", "mouseover", "mousemove", "mouseout", "click"],
                c = mv(u),
                s = V(a.concat(["selectstart", "input", "contextmenu", "change", "transitionend", "drag", "dragstart", "dragend", "dragenter", "dragleave", "dragover", "drop", "keyup"]), function(t) {
                    return cv(n, t, function(n) {
                        c.fireIfReady(n, t).each(function(t) {
                            t && n.kill()
                        }), u.triggerEvent(t, n) && n.kill()
                    })
                }),
                l = Ot(tt.none()),
                f = cv(n, "paste", function(n) {
                    c.fireIfReady(n, "paste").each(function(t) {
                        t && n.kill()
                    }), u.triggerEvent("paste", n) && n.kill(), l.set(tt.some(setTimeout(function() {
                        u.triggerEvent(Sn(), n)
                    }, 0)))
                }),
                d = cv(n, "keydown", function(t) {
                    var n;
                    u.triggerEvent("keydown", t) ? t.kill() : !0 !== u.stopBackspace || 8 !== (n = t).raw().which || M(["input", "textarea"], Se(n.target())) || lv(n.target(), '[contenteditable="true"]') || t.prevent()
                }),
                m = (e = n, o = function(t) {
                    u.triggerEvent("focusin", t) && t.kill()
                }, hv ? sv(e, "focus", o) : cv(e, "focusin", o)),
                h = Ot(tt.none()),
                g = (r = n, i = function(t) {
                    u.triggerEvent("focusout", t) && t.kill(), h.set(tt.some(setTimeout(function() {
                        u.triggerEvent(zn(), t)
                    }, 0)))
                }, hv ? sv(r, "blur", i) : cv(r, "focusout", i));
            return {
                unbind: function() {
                    T(s, function(t) {
                        t.unbind()
                    }), d.unbind(), m.unbind(), g.unbind(), f.unbind(), l.get().each(clearTimeout), h.get().each(clearTimeout)
                }
            }
        },
        pv = function(t, n) {
            var e = wt(t, "target").map(function(t) {
                return t()
            }).getOr(n);
            return Ot(e)
        },
        bv = mt([{
            stopped: []
        }, {
            resume: ["element"]
        }, {
            complete: []
        }]),
        yv = function(t, o, n, e, r, i) {
            var u, a, c, s, l = t(o, e),
                f = (u = n, a = r, c = Ot(!1), s = Ot(!1), {
                    stop: function() {
                        c.set(!0)
                    },
                    cut: function() {
                        s.set(!0)
                    },
                    isStopped: c.get,
                    isCut: s.get,
                    event: Z(u),
                    setSource: a.set,
                    getSource: a.get
                });
            return l.fold(function() {
                return i.logEventNoHandlers(o, e), bv.complete()
            }, function(n) {
                var e = n.descHandler();
                return Hi(e)(f), f.isStopped() ? (i.logEventStopped(o, n.element(), e.purpose()), bv.stopped()) : f.isCut() ? (i.logEventCut(o, n.element(), e.purpose()), bv.complete()) : le(n.element()).fold(function() {
                    return i.logNoParent(o, n.element(), e.purpose()), bv.complete()
                }, function(t) {
                    return i.logEventResponse(o, n.element(), e.purpose()), bv.resume(t)
                })
            })
        },
        xv = function(n, e, o, t, r, i) {
            return yv(n, e, o, t, r, i).fold(function() {
                return !0
            }, function(t) {
                return xv(n, e, o, t, r, i)
            }, function() {
                return !1
            })
        },
        wv = function(t, n, e) {
            var o, r, i = (o = n, r = Ot(!1), {
                stop: function() {
                    r.set(!0)
                },
                cut: Q,
                isStopped: r.get,
                isCut: Z(!1),
                event: Z(o),
                setSource: u("Cannot set source of a broadcasted event"),
                getSource: u("Cannot get source of a broadcasted event")
            });
            return T(t, function(t) {
                var n = t.descHandler();
                Hi(n)(i)
            }), i.isStopped()
        },
        zv = function(t, n, e, o, r) {
            var i = pv(e, o);
            return xv(t, n, e, o, i, r)
        },
        Sv = Xn("element", "descHandler"),
        kv = function(t, n) {
            return {
                id: Z(t),
                descHandler: Z(n)
            }
        };

    function Cv() {
        var i = {};
        return {
            registerId: function(o, r, t) {
                $(t, function(t, n) {
                    var e = i[n] !== undefined ? i[n] : {};
                    e[r] = Mi(t, o), i[n] = e
                })
            },
            unregisterId: function(e) {
                $(i, function(t, n) {
                    t.hasOwnProperty(e) && delete t[e]
                })
            },
            filterByType: function(t) {
                return wt(i, t).map(function(t) {
                    return ot(t, function(t, n) {
                        return kv(n, t)
                    })
                }).getOr([])
            },
            find: function(t, n, e) {
                var r = yt(n)(i);
                return Wr(e, function(t) {
                    return e = r, mi(o = t).fold(function() {
                        return tt.none()
                    }, function(t) {
                        var n = yt(t);
                        return e.bind(n).map(function(t) {
                            return Sv(o, t)
                        })
                    });
                    var e, o
                }, t)
            }
        }
    }

    function Ov() {
        var o = Cv(),
            r = {},
            i = function(o) {
                var t = o.element();
                return mi(t).fold(function() {
                    return t = "uid-", n = o.element(), e = Ye(li + t), di(n, e), e;
                    var t, n, e
                }, function(t) {
                    return t
                })
            },
            u = function(t) {
                mi(t.element()).each(function(t) {
                    r[t] = undefined, o.unregisterId(t)
                })
            };
        return {
            find: function(t, n, e) {
                return o.find(t, n, e)
            },
            filter: function(t) {
                return o.filterByType(t)
            },
            register: function(t) {
                var n = i(t);
                Ct(r, n) && function(t, n) {
                    var e = r[n];
                    if (e !== t) throw new Error('The tagId "' + n + '" is already used by: ' + Fe(e.element()) + "\nCannot use it for: " + Fe(t.element()) + "\nThe conflicting element is" + (Lr(e.element()) ? " " : " not ") + "already in the DOM");
                    u(t)
                }(t, n);
                var e = [t];
                o.registerId(e, n, t.events()), r[n] = t
            },
            unregister: u,
            getById: function(t) {
                return yt(t)(r)
            }
        }
    }
    var Mv, Hv, Ev = Fl({
            name: "Container",
            factory: function(t) {
                var n = t.dom,
                    e = n.attributes,
                    o = Je(n, ["attributes"]);
                return {
                    uid: t.uid,
                    dom: Ke({
                        tag: "div",
                        attributes: Ke({
                            role: "presentation"
                        }, e)
                    }, o),
                    components: t.components,
                    behaviours: _s(t.containerBehaviours),
                    events: t.events,
                    domModification: t.domModification,
                    eventOrder: t.eventOrder
                }
            },
            configFields: [vr("components", []), Ds("containerBehaviours", []), vr("events", {}), vr("domModification", {}), vr("eventOrder", {})]
        }),
        Vv = function(e) {
            var o = function(n) {
                    return le(e.element()).fold(function() {
                        return !0
                    }, function(t) {
                        return ae(n, t)
                    })
                },
                r = Ov(),
                s = function(t, n) {
                    return r.find(o, t, n)
                },
                t = vv(e.element(), {
                    triggerEvent: function(u, a) {
                        return je(u, a.target(), function(t) {
                            return n = s, e = u, r = t, i = (o = a).target(), zv(n, e, o, i, r);
                            var n, e, o, r, i
                        })
                    }
                }),
                i = {
                    debugInfo: Z("real"),
                    triggerEvent: function(n, e, o) {
                        je(n, e, function(t) {
                            zv(s, n, o, e, t)
                        })
                    },
                    triggerFocus: function(a, c) {
                        mi(a).fold(function() {
                            df(a)
                        }, function(t) {
                            je(wn(), a, function(t) {
                                var n, e, o, r, i, u;
                                n = s, e = wn(), o = {
                                    originator: Z(c),
                                    kill: Q,
                                    prevent: Q,
                                    target: Z(a)
                                }, i = t, u = pv(o, r = a), yv(n, e, o, r, u, i)
                            })
                        })
                    },
                    triggerEscape: function(t, n) {
                        i.triggerEvent("keydown", t.element(), n.event())
                    },
                    getByUid: function(t) {
                        return h(t)
                    },
                    getByDom: function(t) {
                        return g(t)
                    },
                    build: mu,
                    addToGui: function(t) {
                        a(t)
                    },
                    removeFromGui: function(t) {
                        c(t)
                    },
                    addToWorld: function(t) {
                        n(t)
                    },
                    removeFromWorld: function(t) {
                        u(t)
                    },
                    broadcast: function(t) {
                        f(t)
                    },
                    broadcastOn: function(t, n) {
                        d(t, n)
                    },
                    broadcastEvent: function(t, n) {
                        m(t, n)
                    },
                    isConnected: Z(!0)
                },
                n = function(t) {
                    t.connect(i), Oe(t.element()) || (r.register(t), T(t.components(), n), i.triggerEvent(An(), t.element(), {
                        target: Z(t.element())
                    }))
                },
                u = function(t) {
                    Oe(t.element()) || (T(t.components(), u), r.unregister(t)), t.disconnect()
                },
                a = function(t) {
                    ds(e, t)
                },
                c = function(t) {
                    gs(t)
                },
                l = function(e) {
                    var t = r.filter(kn());
                    T(t, function(t) {
                        var n = t.descHandler();
                        Hi(n)(e)
                    })
                },
                f = function(t) {
                    l({
                        universal: Z(!0),
                        data: Z(t)
                    })
                },
                d = function(t, n) {
                    l({
                        universal: Z(!1),
                        channels: Z(t),
                        data: Z(n)
                    })
                },
                m = function(t, n) {
                    var e = r.filter(t);
                    return wv(e, n)
                },
                h = function(t) {
                    return r.getById(t).fold(function() {
                        return dt.error(new Error('Could not find component with uid: "' + t + '" in system.'))
                    }, dt.value)
                },
                g = function(t) {
                    var n = mi(t).getOr("not found");
                    return h(n)
                };
            return n(e), {
                root: Z(e),
                element: e.element,
                destroy: function() {
                    t.unbind(), xe(e.element())
                },
                add: a,
                remove: c,
                getByUid: h,
                getByDom: g,
                addToWorld: n,
                removeFromWorld: u,
                broadcast: f,
                broadcastOn: d,
                broadcastEvent: m
            }
        },
        Tv = tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),
        Av = tinymce.util.Tools.resolve("tinymce.EditorManager"),
        Bv = function(t) {
            return tt.from(t.settings.min_width).filter(k)
        },
        Dv = function(t) {
            return tt.from(t.settings.min_height).filter(k)
        },
        _v = function(n) {
            var t = K(n.settings),
                e = A(t, function(t) {
                    return /^toolbar([1-9])$/.test(t)
                }),
                o = V(e, function(t) {
                    return n.getParam(t, !1, "string")
                }),
                r = A(o, function(t) {
                    return "string" == typeof t
                });
            return 0 < r.length ? tt.some(r) : tt.none()
        },
        Fv = Ye("form-component-change"),
        Iv = Ye("form-close"),
        Lv = Ye("form-cancel"),
        Rv = Ye("form-action"),
        Nv = Ye("form-submit"),
        Pv = Ye("form-block"),
        jv = Ye("form-unblock"),
        Uv = Ye("form-tabchange"),
        Wv = Ye("form-resize"),
        Gv = Z([vr("prefix", "form-field"), Ds("fieldBehaviours", [Pl, lm])]),
        Xv = Z([ll({
            schema: [or("dom")],
            name: "label"
        }), ll({
            factory: {
                sketch: function(t) {
                    return {
                        uid: t.uid,
                        dom: {
                            tag: "span",
                            styles: {
                                display: "none"
                            },
                            attributes: {
                                "aria-hidden": "true"
                            },
                            innerHtml: t.text
                        }
                    }
                }
            },
            schema: [or("text")],
            name: "aria-descriptor"
        }), cl({
            factory: {
                sketch: function(t) {
                    var n = bt(t, ["factory"]);
                    return t.factory.sketch(n)
                }
            },
            schema: [or("factory")],
            name: "field"
        })]),
        Yv = Il({
            name: "FormField",
            configFields: Gv(),
            partFields: Xv(),
            factory: function(r, t, n, e) {
                var o = Fs(r.fieldBehaviours, [Pl.config({
                        find: function(t) {
                            return zl(t, r, "field")
                        }
                    }), lm.config({
                        store: {
                            mode: "manual",
                            getValue: function(t) {
                                return Pl.getCurrent(t).bind(lm.getValue)
                            },
                            setValue: function(t, n) {
                                Pl.getCurrent(t).each(function(t) {
                                    lm.setValue(t, n)
                                })
                            }
                        }
                    })]),
                    i = Gr([ei(function(t, n) {
                        var o = kl(t, r, ["label", "field", "aria-descriptor"]);
                        o.field().each(function(e) {
                            var n = Ye(r.prefix);
                            o.label().each(function(t) {
                                Ee(t.element(), "for", n), Ee(e.element(), "id", n)
                            }), o["aria-descriptor"]().each(function(t) {
                                var n = Ye(r.prefix);
                                Ee(t.element(), "id", n), Ee(e.element(), "aria-describedby", n)
                            })
                        })
                    })]),
                    u = {
                        getField: function(t) {
                            return zl(t, r, "field")
                        },
                        getLabel: function(t) {
                            return zl(t, r, "label")
                        }
                    };
                return {
                    uid: r.uid,
                    dom: r.dom,
                    components: t,
                    behaviours: o,
                    events: i,
                    apis: u
                }
            },
            apis: {
                getField: function(t, n) {
                    return t.getField(n)
                },
                getLabel: function(t, n) {
                    return t.getLabel(n)
                }
            }
        }),
        qv = /* */ Object.freeze({
            getCoupled: function(t, n, e, o) {
                return e.getOrCreate(t, n, o)
            }
        }),
        Kv = [rr("others", Wo(dt.value, Jo()))],
        Jv = Pu({
            fields: Kv,
            name: "coupling",
            apis: qv,
            state: /* */ Object.freeze({
                init: function(t) {
                    var i = {},
                        n = Z({});
                    return ki({
                        readState: n,
                        getOrCreate: function(e, o, r) {
                            var t = K(o.others);
                            if (t) return wt(i, r).getOrThunk(function() {
                                var t = wt(o.others, r).getOrDie("No information found for coupled component: " + r)(e),
                                    n = e.getSystem().build(t);
                                return i[r] = n
                            });
                            throw new Error("Cannot find coupled component: " + r + ". Known coupled components: " + ko(t, null, 2))
                        }
                    })
                }
            })
        }),
        $v = /* */ Object.freeze({
            events: function(t, n) {
                var e = t.stream.streams.setup(t, n);
                return Gr([qr(t.event, e), oi(function() {
                    return n.cancel()
                })].concat(t.cancelEvent.map(function(t) {
                    return [qr(t, function() {
                        return n.cancel()
                    })]
                }).getOr([])))
            }
        }),
        Qv = function(t) {
            var n = Ot(null);
            return ki({
                readState: function() {
                    return {
                        timer: null !== n.get() ? "set" : "unset"
                    }
                },
                setTimer: function(t) {
                    n.set(t)
                },
                cancel: function() {
                    var t = n.get();
                    null !== t && t.cancel()
                }
            })
        },
        Zv = /* */ Object.freeze({
            throttle: Qv,
            init: function(t) {
                return t.stream.streams.state(t)
            }
        }),
        tp = [rr("stream", Ko("mode", {
            throttle: [or("delay"), vr("stopEvent", !0), Tu("streams", {
                setup: function(t, n) {
                    var e = t.stream,
                        o = lh(t.onStream, e.delay);
                    return n.setTimer(o),
                        function(t, n) {
                            o.throttle(t, n), e.stopEvent && n.stop()
                        }
                },
                state: Qv
            })]
        })), vr("event", "input"), fr("cancelEvent"), Eu("onStream")],
        np = Pu({
            fields: tp,
            name: "streaming",
            active: $v,
            state: Zv
        }),
        ep = function(t) {
            var e = tt.none(),
                n = [],
                o = function(t) {
                    r() ? u(t) : n.push(t)
                },
                r = function() {
                    return e.isSome()
                },
                i = function(t) {
                    T(t, u)
                },
                u = function(n) {
                    e.each(function(t) {
                        setTimeout(function() {
                            n(t)
                        }, 0)
                    })
                };
            return t(function(t) {
                e = tt.some(t), i(n), n = []
            }), {
                get: o,
                map: function(e) {
                    return ep(function(n) {
                        o(function(t) {
                            n(e(t))
                        })
                    })
                },
                isReady: r
            }
        },
        op = {
            nu: ep,
            pure: function(n) {
                return ep(function(t) {
                    t(n)
                })
            }
        },
        rp = function(n) {
            var t = function(t) {
                    var o;
                    n((o = t, function() {
                        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                        var e = this;
                        setTimeout(function() {
                            o.apply(e, t)
                        }, 0)
                    }))
                },
                e = function() {
                    return op.nu(t)
                };
            return {
                map: function(o) {
                    return rp(function(e) {
                        t(function(t) {
                            var n = o(t);
                            e(n)
                        })
                    })
                },
                bind: function(e) {
                    return rp(function(n) {
                        t(function(t) {
                            e(t).get(n)
                        })
                    })
                },
                anonBind: function(e) {
                    return rp(function(n) {
                        t(function(t) {
                            e.get(n)
                        })
                    })
                },
                toLazy: e,
                toCached: function() {
                    var n = null;
                    return rp(function(t) {
                        null === n && (n = e()), n.get(t)
                    })
                },
                get: t
            }
        },
        ip = {
            nu: rp,
            pure: function(n) {
                return rp(function(t) {
                    t(n)
                })
            }
        },
        up = Z("sink"),
        ap = Z(ll({
            name: up(),
            overrides: Z({
                dom: {
                    tag: "div"
                },
                behaviours: Ru([ss.config({
                    useFixed: !0
                })]),
                events: Gr([Zr(Rt()), Zr(At()), Zr(Ut())])
            })
        }));
    (Hv = Mv || (Mv = {}))[Hv.HighlightFirst = 0] = "HighlightFirst", Hv[Hv.HighlightNone = 1] = "HighlightNone";
    var cp = function(t, n) {
            var e = t.getHotspot(n).getOr(n);
            return t.layouts.fold(function() {
                return {
                    anchor: "hotspot",
                    hotspot: e
                }
            }, function(t) {
                return {
                    anchor: "hotspot",
                    hotspot: e,
                    layouts: t
                }
            })
        },
        sp = function(t, n, e, o, r, i, u) {
            var a, c, s, l, f, d, m, h, g, v, p = cp(t, e);
            return (c = p, l = o, f = r, d = u, m = n, h = s = e, g = (0, (a = t).fetch)(h).map(m), v = mp(s, a), g.map(function(t) {
                return t.bind(function(t) {
                    return tt.from(Km.sketch(Ke({}, f.menu(), {
                        uid: hi(""),
                        data: t,
                        highlightImmediately: d === Mv.HighlightFirst,
                        onOpenMenu: function(t, n) {
                            var e = v().getOrDie();
                            ss.position(e, c, n), Hs.decloak(l)
                        },
                        onOpenSubmenu: function(t, n, e) {
                            var o = v().getOrDie();
                            ss.position(o, {
                                anchor: "submenu",
                                item: n
                            }, e), Hs.decloak(l)
                        },
                        onEscape: function() {
                            return gm.focus(s), Hs.close(l), tt.some(!0)
                        }
                    })))
                })
            })).map(function(t) {
                return t.fold(function() {
                    Hs.isOpen(o) && Hs.close(o)
                }, function(t) {
                    Hs.cloak(o), Hs.open(o, t), i(o)
                }), o
            })
        },
        lp = function(t, n, e, o, r, i, u) {
            return Hs.close(o), ip.pure(o)
        },
        fp = function(t, n, e, o, r, i) {
            var u = Jv.getCoupled(e, "sandbox");
            return (Hs.isOpen(u) ? lp : sp)(t, n, e, u, o, r, i)
        },
        dp = function(t, n, e) {
            var o, r, i = Pl.getCurrent(n).getOr(n),
                u = ia(t.element());
            e ? qi(i.element(), "min-width", u + "px") : (o = i.element(), r = u, ra.set(o, r))
        },
        mp = function(n, t) {
            return n.getSystem().getByUid(t.uid + "-" + up()).map(function(t) {
                return function() {
                    return dt.value(t)
                }
            }).getOrThunk(function() {
                return t.lazySink.fold(function() {
                    return function() {
                        return dt.error(new Error("No internal sink is specified, nor could an external sink be found"))
                    }
                }, function(t) {
                    return function() {
                        return t(n)
                    }
                })
            })
        },
        hp = function(o, r, i) {
            var n, u = (n = Ye("aria-owns"), {
                    id: Z(n),
                    link: function(t) {
                        Ee(t, "aria-owns", n)
                    },
                    unlink: function(t) {
                        Be(t, "aria-owns")
                    }
                }),
                t = mp(r, o);
            return {
                dom: {
                    tag: "div",
                    classes: o.sandboxClasses,
                    attributes: {
                        id: u.id()
                    }
                },
                behaviours: Ls(o.sandboxBehaviours, [lm.config({
                    store: {
                        mode: "memory",
                        initialValue: r
                    }
                }), Hs.config({
                    onOpen: function(t, n) {
                        var e = cp(o, r);
                        u.link(r.element()), o.matchWidth && dp(e.hotspot, n, o.useMinWidth), o.onOpen(e, t, n), i !== undefined && i.onOpen !== undefined && i.onOpen(t, n)
                    },
                    onClose: function(t, n) {
                        u.unlink(r.element()), i !== undefined && i.onClose !== undefined && i.onClose(t, n)
                    },
                    isPartOf: function(t, n, e) {
                        return yu(n, e) || yu(r, e)
                    },
                    getAttachPoint: function() {
                        return t().getOrDie()
                    }
                }), Pl.config({
                    find: function(t) {
                        return Hs.getState(t).bind(function(t) {
                            return Pl.getCurrent(t)
                        })
                    }
                }), As({
                    isExtraPart: Z(!1)
                })])
            }
        },
        gp = function(t, n, e) {
            var o = lm.getValue(e);
            lm.setValue(n, o), pp(n)
        },
        vp = function(t, n) {
            var e = t.element(),
                o = eu(e),
                r = e.dom();
            "number" !== Te(e, "type") && n(r, o)
        },
        pp = function(t) {
            vp(t, function(t, n) {
                return t.setSelectionRange(n.length, n.length)
            })
        },
        bp = function(t, n, o) {
            if (t.selectsOver) {
                var e = lm.getValue(n),
                    r = t.getDisplayText(e),
                    i = lm.getValue(o);
                return 0 === t.getDisplayText(i).indexOf(r) ? tt.some(function() {
                    var t, e;
                    gp(0, n, o), t = n, e = r.length, vp(t, function(t, n) {
                        return t.setSelectionRange(e, n.length)
                    })
                }) : tt.none()
            }
            return tt.none()
        },
        yp = Z([fr("data"), vr("inputAttributes", {}), vr("inputStyles", {}), vr("tag", "input"), vr("inputClasses", []), Mu("onSetValue"), vr("styles", {}), vr("eventOrder", {}), Ds("inputBehaviours", [lm, gm]), vr("selectOnFocus", !0)]),
        xp = function(t) {
            return Ru([gm.config({
                onFocus: !1 === t.selectOnFocus ? Q : function(t) {
                    var n = t.element(),
                        e = eu(n);
                    n.dom().setSelectionRange(0, e.length)
                }
            })])
        },
        wp = function(t) {
            return {
                tag: t.tag,
                attributes: Ke({
                    type: "input"
                }, t.inputAttributes),
                styles: t.inputStyles,
                classes: t.inputClasses
            }
        },
        zp = Z("alloy.typeahead.itemexecute"),
        Sp = function() {
            return [vr("sandboxClasses", []), Is("sandboxBehaviours", [Pl, Yu, Hs, lm])]
        },
        kp = Z([fr("lazySink"), or("fetch"), vr("minChars", 5), vr("responseTime", 1e3), Mu("onOpen"), vr("getHotspot", tt.some), vr("layouts", tt.none()), vr("eventOrder", {}), Sr("model", {}, [vr("getDisplayText", function(t) {
            return t.meta !== undefined && t.meta.text !== undefined ? t.meta.text : t.value
        }), vr("selectsOver", !0), vr("populateFromBrowse", !0)]), Mu("onSetValue"), Hu("onExecute"), Mu("onItemExecute"), vr("inputClasses", []), vr("inputAttributes", {}), vr("inputStyles", {}), vr("matchWidth", !0), vr("useMinWidth", !1), vr("dismissOnBlur", !0), Cu(["openClass"]), fr("initialData"), Ds("typeaheadBehaviours", [gm, lm, np, Xd, Hm, Jv]), kr("previewing", function() {
            return Ot(!0)
        })].concat(yp()).concat(Sp())),
        Cp = Z([sl({
            schema: [ku()],
            name: "menu",
            overrides: function(o) {
                return {
                    fakeFocus: !0,
                    onHighlight: function(n, e) {
                        o.previewing.get() ? n.getSystem().getByUid(o.uid).each(function(t) {
                            bp(o.model, t, e).fold(function() {
                                return tf.dehighlight(n, e)
                            }, function(t) {
                                return t()
                            })
                        }) : n.getSystem().getByUid(o.uid).each(function(t) {
                            o.model.populateFromBrowse && gp(o.model, t, e)
                        }), o.previewing.set(!1)
                    },
                    onExecute: function(t, n) {
                        return t.getSystem().getByUid(o.uid).toOption().map(function(t) {
                            return Er(t, zp(), {
                                item: n
                            }), !0
                        })
                    },
                    onHover: function(t, n) {
                        o.previewing.set(!1), t.getSystem().getByUid(o.uid).each(function(t) {
                            o.model.populateFromBrowse && gp(o.model, t, n)
                        })
                    }
                }
            }
        })]),
        Op = Il({
            name: "Typeahead",
            configFields: kp(),
            partFields: Cp(),
            factory: function(r, t, n, i) {
                var e = function(t, n, e) {
                        r.previewing.set(!1);
                        var o = Jv.getCoupled(t, "sandbox");
                        Hs.isOpen(o) ? Pl.getCurrent(o).each(function(t) {
                            tf.getHighlighted(t).fold(function() {
                                e(t)
                            }, function() {
                                Br(o, t.element(), "keydown", n)
                            })
                        }) : sp(r, u(t), t, o, i, function(t) {
                            Pl.getCurrent(t).each(e)
                        }, Mv.HighlightFirst).get(Q)
                    },
                    o = xp(r),
                    u = function(o) {
                        return function(t) {
                            return t.map(function(t) {
                                var n = rt(t.menus),
                                    e = N(n, function(t) {
                                        return A(t.items, function(t) {
                                            return "item" === t.type
                                        })
                                    });
                                return lm.getState(o).update(V(e, function(t) {
                                    return t.data
                                })), t
                            })
                        }
                    },
                    a = [gm.config({}), lm.config({
                        onSetValue: r.onSetValue,
                        store: Ke({
                            mode: "dataset",
                            getDataKey: function(t) {
                                return eu(t.element())
                            },
                            getFallbackEntry: function(t) {
                                return {
                                    value: t,
                                    meta: {}
                                }
                            },
                            setValue: function(t, n) {
                                ou(t.element(), r.model.getDisplayText(n))
                            }
                        }, r.initialData.map(function(t) {
                            return zt("initialValue", t)
                        }).getOr({}))
                    }), np.config({
                        stream: {
                            mode: "throttle",
                            delay: r.responseTime,
                            stopEvent: !1
                        },
                        onStream: function(t, n) {
                            var e = Jv.getCoupled(t, "sandbox");
                            if (gm.isFocused(t) && eu(t.element()).length >= r.minChars) {
                                var o = Pl.getCurrent(e).bind(function(t) {
                                    return tf.getHighlighted(t).map(lm.getValue)
                                });
                                r.previewing.set(!0), sp(r, u(t), t, e, i, function(t) {
                                    Pl.getCurrent(e).each(function(t) {
                                        o.fold(function() {
                                            r.model.selectsOver && tf.highlightFirst(t)
                                        }, function(n) {
                                            tf.highlightBy(t, function(t) {
                                                return lm.getValue(t).value === n.value
                                            }), tf.getHighlighted(t).orThunk(function() {
                                                return tf.highlightFirst(t), tt.none()
                                            })
                                        })
                                    })
                                }, Mv.HighlightFirst).get(Q)
                            }
                        },
                        cancelEvent: Tn()
                    }), Xd.config({
                        mode: "special",
                        onDown: function(t, n) {
                            return e(t, n, tf.highlightFirst), tt.some(!0)
                        },
                        onEscape: function(t) {
                            var n = Jv.getCoupled(t, "sandbox");
                            return Hs.isOpen(n) ? (Hs.close(n), tt.some(!0)) : tt.none()
                        },
                        onUp: function(t, n) {
                            return e(t, n, tf.highlightLast), tt.some(!0)
                        },
                        onEnter: function(n) {
                            var t = Jv.getCoupled(n, "sandbox"),
                                e = Hs.isOpen(t);
                            if (e && !r.previewing.get()) return Pl.getCurrent(t).bind(function(t) {
                                return tf.getHighlighted(t)
                            }).map(function(t) {
                                return Er(n, zp(), {
                                    item: t
                                }), !0
                            });
                            var o = lm.getValue(n);
                            return Hr(n, Tn()), r.onExecute(t, n, o), e && Hs.close(t), tt.some(!0)
                        }
                    }), Hm.config({
                        toggleClass: r.markers.openClass,
                        aria: {
                            mode: "pressed",
                            syncWithExpanded: !0
                        }
                    }), Jv.config({
                        others: {
                            sandbox: function(t) {
                                return hp(r, t, {
                                    onOpen: d,
                                    onClose: d
                                })
                            }
                        }
                    }), _m("typeaheadevents", [ii(function(t) {
                        var n = Q;
                        fp(r, u(t), t, i, n, Mv.HighlightFirst).get(Q)
                    }), qr(zp(), function(t, n) {
                        var e = Jv.getCoupled(t, "sandbox");
                        gp(r.model, t, n.event().item()), Hr(t, Tn()), r.onItemExecute(t, e, n.event().item(), lm.getValue(t)), Hs.close(e), pp(t)
                    })].concat(r.dismissOnBlur ? [qr(zn(), function(t) {
                        var n = Jv.getCoupled(t, "sandbox");
                        hf(n.element()).isNone() && Hs.close(n)
                    })] : []))];
                return {
                    uid: r.uid,
                    dom: wp(r),
                    behaviours: Ke({}, o, Fs(r.typeaheadBehaviours, a)),
                    eventOrder: r.eventOrder
                }
            }
        }),
        Mp = function(t, n, e) {
            var o = Ep(t, n, e);
            return Yv.sketch(o)
        },
        Hp = function(t, n) {
            return Mp(t, n, [])
        },
        Ep = function(t, n, e) {
            return {
                dom: Vp(e),
                components: t.toArray().concat([n])
            }
        },
        Vp = function(t) {
            return {
                tag: "div",
                classes: ["tox-form__group"].concat(t)
            }
        },
        Tp = function(t, n) {
            return Yv.parts().label({
                dom: {
                    tag: "label",
                    classes: ["tox-label"],
                    innerHtml: n.translate(t)
                }
            })
        },
        Ap = function(t) {
            return "separator" === t.type
        },
        Bp = {
            type: "separator"
        },
        Dp = function(t, e) {
            var n = D(t, function(t, n) {
                return x(n) ? "" === n ? t : "|" === n ? 0 < t.length && !Ap(t[t.length - 1]) ? t.concat([Bp]) : t : ut(e, n.toLowerCase()) ? t.concat([e[n.toLowerCase()]]) : t : t.concat([n])
            }, []);
            return 0 < n.length && Ap(n[n.length - 1]) && n.pop(), n
        },
        _p = function(t, n) {
            return ut(t, "getSubmenuItems") ? (o = n, r = (e = t).getSubmenuItems(), i = Fp(r, o), {
                item: e,
                menus: vt(i.menus, zt(e.value, i.items)),
                expansions: vt(i.expansions, zt(e.value, e.value))
            }) : {
                item: t,
                menus: {},
                expansions: {}
            };
            var e, o, r, i
        },
        Fp = function(t, r) {
            var n = Dp(x(t) ? t.split(" ") : t, r);
            return B(n, function(t, n) {
                var e = function(t) {
                        if (Ap(t)) return t;
                        var n = wt(t, "value").getOrThunk(function() {
                            return Ye("generated-menu-item")
                        });
                        return vt({
                            value: n
                        }, t)
                    }(n),
                    o = _p(e, r);
                return {
                    menus: vt(t.menus, o.menus),
                    items: [o.item].concat(t.items),
                    expansions: vt(t.expansions, o.expansions)
                }
            }, {
                menus: {},
                expansions: {},
                items: []
            })
        },
        Ip = function(t, e, o) {
            var n = Ye("primary-menu"),
                r = Fp(t, o.menuItems());
            if (0 === r.items.length) return tt.none();
            var i = nv(n, r.items, e, o),
                u = nt(r.menus, function(t, n) {
                    return nv(n, t, e, o)
                }),
                a = vt(u, zt(n, i));
            return tt.from(Km.tieredData(n, a, r.expansions))
        },
        Lp = Fl({
            name: "Input",
            configFields: yp(),
            factory: function(t, n) {
                return {
                    uid: t.uid,
                    dom: wp(t),
                    components: [],
                    behaviours: (e = t, Ke({}, xp(e), Fs(e.inputBehaviours, [lm.config({
                        store: {
                            mode: "manual",
                            initialValue: e.data.getOr(undefined),
                            getValue: function(t) {
                                return eu(t.element())
                            },
                            setValue: function(t, n) {
                                eu(t.element()) !== n && ou(t.element(), n)
                            }
                        },
                        onSetValue: e.onSetValue
                    })]))),
                    eventOrder: t.eventOrder
                };
                var e
            }
        }),
        Rp = yn.detect().browser.isFirefox(),
        Np = {
            position: "absolute",
            left: "-9999px"
        },
        Pp = function(t, n, e) {
            var o, r, i, u = function(t, n) {
                var e = Gn.fromTag("span", t.dom());
                Ee(e, "role", "presentation");
                var o = Gn.fromText(n, t.dom());
                return pe(e, o), e
            }(ce(n), e);
            Rp && (o = n, r = u, i = Ye("ephox-alloy-aria-voice"), Ee(r, "id", i), Ee(o, "aria-describedby", i)), Ve(u, t(e)), Ki(u, Np), pe(n, u), setTimeout(function() {
                Be(u, "aria-live"), xe(u)
            }, 1e3)
        },
        jp = function(t) {
            return {
                "aria-live": "assertive",
                "aria-atomic": "true",
                role: "alert"
            }
        },
        Up = ["input", "textarea"],
        Wp = function(t) {
            var n = Se(t);
            return M(Up, n)
        },
        Gp = function(t, n) {
            var e = n.getRoot(t).getOr(t.element());
            Pi(e, n.invalidClass), n.notify.each(function(n) {
                Wp(t.element()) && Be(e, "title"), n.getContainer(t).each(function(t) {
                    ze(t, n.validHtml)
                }), n.onValid(t)
            })
        },
        Xp = function(e, t, n, o) {
            var r = t.getRoot(e).getOr(e.element());
            Ri(r, t.invalidClass), t.notify.each(function(t) {
                var n;
                Wp(e.element()) && Ee(e.element(), "title", o), n = Rr(), Pp(jp, n, o), t.getContainer(e).each(function(t) {
                    ze(t, o)
                }), t.onInvalid(e, o)
            })
        },
        Yp = function(n, t, e) {
            return t.validator.fold(function() {
                return ip.pure(dt.value(!0))
            }, function(t) {
                return t.validate(n)
            })
        },
        qp = function(n, e, t) {
            return e.notify.each(function(t) {
                t.onValidate(n)
            }), Yp(n, e).map(function(t) {
                return n.getSystem().isConnected() ? t.fold(function(t) {
                    return Xp(n, e, 0, t), dt.error(t)
                }, function(t) {
                    return Gp(n, e), dt.value(t)
                }) : dt.error("No longer in system")
            })
        },
        Kp = /* */ Object.freeze({
            markValid: Gp,
            markInvalid: Xp,
            query: Yp,
            run: qp,
            isInvalid: function(t, n) {
                var e = n.getRoot(t).getOr(t.element());
                return ji(e, n.invalidClass)
            }
        }),
        Jp = /* */ Object.freeze({
            events: function(n, t) {
                return n.validator.map(function(t) {
                    return Gr([qr(t.onEvent, function(t) {
                        qp(t, n).get(d)
                    })].concat(t.validateOnLoad ? [ei(function(t) {
                        qp(t, n).get(Q)
                    })] : []))
                }).getOr({})
            }
        }),
        $p = [or("invalidClass"), vr("getRoot", tt.none), gr("notify", [vr("aria", "alert"), vr("getContainer", tt.none), vr("validHtml", ""), Mu("onValid"), Mu("onInvalid"), Mu("onValidate")]), gr("validator", [or("validate"), vr("onEvent", "input"), vr("validateOnLoad", !0)])],
        Qp = Pu({
            fields: $p,
            name: "invalidating",
            active: Jp,
            apis: Kp,
            extra: {
                validation: function(e) {
                    return function(t) {
                        var n = lm.getValue(t);
                        return ip.pure(e(n))
                    }
                }
            }
        }),
        Zp = /* */ Object.freeze({
            exhibit: function(t, n) {
                return Oi({
                    attributes: St([{
                        key: n.tabAttr,
                        value: "true"
                    }])
                })
            }
        }),
        tb = [vr("tabAttr", "data-alloy-tabstop")],
        nb = Pu({
            fields: tb,
            name: "tabstopping",
            active: Zp
        }),
        eb = function(t) {
            return {
                value: Z(t)
            }
        },
        ob = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        rb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
        ib = function(t) {
            return ob.test(t) || rb.test(t)
        },
        ub = function(t) {
            var n, e = (n = t.value().replace(ob, function(t, n, e, o) {
                return n + n + e + e + o + o
            }), {
                value: Z(n)
            });
            return rb.exec(e.value())
        },
        ab = function(t) {
            var n = t.toString(16);
            return 1 == n.length ? "0" + n : n
        },
        cb = function(t) {
            var n = ab(t.red()) + ab(t.green()) + ab(t.blue());
            return eb(n)
        },
        sb = Math.min,
        lb = Math.max,
        fb = Math.round,
        db = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
        mb = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d?(?:\.\d+)?)\)/,
        hb = function(t, n, e, o) {
            return {
                red: Z(t),
                green: Z(n),
                blue: Z(e),
                alpha: Z(o)
            }
        },
        gb = function(t) {
            var n = parseInt(t, 10);
            return n.toString() === t && 0 <= n && n <= 255
        },
        vb = function(t) {
            var n, e, o, r, i, u, a, c, s, l;
            if (i = (t.hue() || 0) % 360, u = t.saturation() / 100, a = t.value() / 100, u = lb(0, sb(u, 1)), a = lb(0, sb(a, 1)), 0 === u) return c = s = l = fb(255 * a), hb(c, s, l, 1);
            switch (n = i / 60, o = (e = a * u) * (1 - Math.abs(n % 2 - 1)), r = a - e, Math.floor(n)) {
                case 0:
                    c = e, s = o, l = 0;
                    break;
                case 1:
                    c = o, s = e, l = 0;
                    break;
                case 2:
                    c = 0, s = e, l = o;
                    break;
                case 3:
                    c = 0, s = o, l = e;
                    break;
                case 4:
                    c = o, s = 0, l = e;
                    break;
                case 5:
                    c = e, s = 0, l = o;
                    break;
                default:
                    c = s = l = 0
            }
            return c = fb(255 * (c + r)), s = fb(255 * (s + r)), l = fb(255 * (l + r)), hb(c, s, l, 1)
        },
        pb = function(t) {
            var n = ub(t),
                e = parseInt(n[1], 16),
                o = parseInt(n[2], 16),
                r = parseInt(n[3], 16);
            return hb(e, o, r, 1)
        },
        bb = function(t, n, e, o) {
            var r = parseInt(t, 10),
                i = parseInt(n, 10),
                u = parseInt(e, 10),
                a = parseFloat(o);
            return hb(r, i, u, a)
        },
        yb = function(t) {
            return "rgba(" + t.red() + "," + t.green() + "," + t.blue() + "," + t.alpha() + ")"
        },
        xb = Z(hb(255, 0, 0, 1)),
        wb = tinymce.util.Tools.resolve("tinymce.util.LocalStorage"),
        zb = "tinymce-custom-colors",
        Sb = "choiceitem",
        kb = [{
            type: Sb,
            text: "Turquoise",
            value: "#18BC9B"
        }, {
            type: Sb,
            text: "Green",
            value: "#2FCC71"
        }, {
            type: Sb,
            text: "Blue",
            value: "#3598DB"
        }, {
            type: Sb,
            text: "Purple",
            value: "#9B59B6"
        }, {
            type: Sb,
            text: "Navy Blue",
            value: "#34495E"
        }, {
            type: Sb,
            text: "Dark Turquoise",
            value: "#18A085"
        }, {
            type: Sb,
            text: "Dark Green",
            value: "#27AE60"
        }, {
            type: Sb,
            text: "Medium Blue",
            value: "#2880B9"
        }, {
            type: Sb,
            text: "Medium Purple",
            value: "#8E44AD"
        }, {
            type: Sb,
            text: "Midnight Blue",
            value: "#2B3E50"
        }, {
            type: Sb,
            text: "Yellow",
            value: "#F1C40F"
        }, {
            type: Sb,
            text: "Orange",
            value: "#E67E23"
        }, {
            type: Sb,
            text: "Red",
            value: "#E74C3C"
        }, {
            type: Sb,
            text: "Light Gray",
            value: "#ECF0F1"
        }, {
            type: Sb,
            text: "Gray",
            value: "#95A5A6"
        }, {
            type: Sb,
            text: "Dark Yellow",
            value: "#F29D12"
        }, {
            type: Sb,
            text: "Dark Orange",
            value: "#D35400"
        }, {
            type: Sb,
            text: "Dark Red",
            value: "#E74C3C"
        }, {
            type: Sb,
            text: "Medium Gray",
            value: "#BDC3C7"
        }, {
            type: Sb,
            text: "Dark Gray",
            value: "#7E8C8D"
        }, {
            type: Sb,
            text: "Black",
            value: "#000000"
        }, {
            type: Sb,
            text: "White",
            value: "#ffffff"
        }],
        Cb = function SE(r) {
            void 0 === r && (r = 10);
            var t, n = wb.getItem(zb),
                e = x(n) ? JSON.parse(n) : [],
                i = r - (t = e).length < 0 ? t.slice(0, r) : t,
                u = function(t) {
                    i.splice(t, 1)
                };
            return {
                add: function(t) {
                    var n, e, o;
                    (n = i, e = t, o = C(n, e), -1 === o ? tt.none() : tt.some(o)).each(u), i.unshift(t), i.length > r && i.pop(), wb.setItem(zb, JSON.stringify(i))
                },
                state: function() {
                    return i.slice(0)
                }
            }
        }(10),
        Ob = function(t) {
            var n, e = [];
            for (n = 0; n < t.length; n += 2) e.push({
                text: t[n + 1],
                value: "#" + t[n],
                type: "choiceitem"
            });
            return e
        },
        Mb = function(t) {
            return t.getParam("color_map")
        },
        Hb = function(t, n) {
            return t.getParam("color_cols", n, "number")
        },
        Eb = function(t) {
            return !1 !== t.getParam("custom_colors")
        },
        Vb = function(t) {
            var n = Mb(t);
            return n !== undefined ? Ob(n) : kb
        },
        Tb = function() {
            return V(Cb.state(), function(t) {
                return {
                    type: Sb,
                    text: t,
                    value: t
                }
            })
        },
        Ab = function(t) {
            Cb.add(t)
        },
        Bb = function(t, e) {
            var o;
            return t.dom.getParents(t.selection.getStart(), function(t) {
                var n;
                (n = t.style["forecolor" === e ? "color" : "background-color"]) && (o = o || n)
            }), o
        },
        Db = function(t) {
            return Math.max(5, Math.ceil(Math.sqrt(t)))
        },
        _b = function(t) {
            var n = Vb(t),
                e = Db(n.length);
            return Hb(t, e)
        },
        Fb = function(n, e, t, o) {
            "custom" === t ? Nb(n)(function(t) {
                t.each(function(t) {
                    Ab(t), n.execCommand("mceApplyTextcolor", e, t), o(t)
                })
            }, "#000000") : "remove" === t ? (o(""), n.execCommand("mceRemoveTextcolor", e)) : (o(t), n.execCommand("mceApplyTextcolor", e, t))
        },
        Ib = function(o, r) {
            return function(t) {
                var n, e;
                t(o.concat(Tb().concat((e = {
                    type: n = "choiceitem",
                    text: "Remove color",
                    icon: "color-swatch-remove-color",
                    value: "remove"
                }, r ? [e, {
                    type: n,
                    text: "Custom color",
                    icon: "color-picker",
                    value: "custom"
                }] : [e]))))
            }
        },
        Lb = function(t, n, e) {
            var o, r;
            o = "forecolor" === n ? "tox-icon-text-color__color" : "tox-icon-highlight-bg-color__color", r = e, t.setIconFill(o, r), t.setIconStroke(o, r)
        },
        Rb = function(o, e, r, t, i) {
            o.ui.registry.addSplitButton(e, {
                tooltip: t,
                presets: "color",
                icon: "forecolor" === e ? "text-color" : "highlight-bg-color",
                select: function(e) {
                    return tt.from(Bb(o, r)).bind(function(t) {
                        return function(t) {
                            if ("transparent" === t) return tt.some(hb(0, 0, 0, 0));
                            if (db.test(t)) {
                                var n = db.exec(t);
                                return tt.some(bb(n[1], n[2], n[3], "1"))
                            }
                            if (mb.test(t)) {
                                var e = db.exec(t);
                                return tt.some(bb(e[1], e[2], e[3], e[4]))
                            }
                            return tt.none()
                        }(t).map(function(t) {
                            var n = cb(t).value();
                            return dn(e.toLowerCase(), n)
                        })
                    }).getOr(!1)
                },
                columns: _b(o),
                fetch: Ib(Vb(o), Eb(o)),
                onAction: function(t) {
                    null !== i.get() && Fb(o, r, i.get(), function() {})
                },
                onItemAction: function(n, t) {
                    Fb(o, r, t, function(t) {
                        i.set(t), Lb(n, e, t)
                    })
                },
                onSetup: function(t) {
                    return null !== i.get() && Lb(t, e, i.get()),
                        function() {}
                }
            })
        },
        Nb = function(i) {
            return function(t, n) {
                var e, o = {
                        colorpicker: n
                    },
                    r = (e = t, function(t) {
                        var n = t.getData();
                        e(tt.from(n.colorpicker)), t.close()
                    });
                i.windowManager.open({
                    title: "Color Picker",
                    size: "normal",
                    body: {
                        type: "panel",
                        items: [{
                            type: "colorpicker",
                            name: "colorpicker",
                            label: "Color"
                        }]
                    },
                    buttons: [{
                        type: "cancel",
                        name: "cancel",
                        text: "Cancel"
                    }, {
                        type: "submit",
                        name: "save",
                        text: "Save",
                        primary: !0
                    }],
                    initialData: o,
                    onAction: function(t, n) {
                        "hex-valid" === n.name && (n.value ? t.enable("ok") : t.disable("ok"))
                    },
                    onSubmit: r,
                    onClose: function() {},
                    onCancel: function() {
                        t(tt.none())
                    }
                })
            }
        },
        Pb = {
            register: function(t) {
                var i;
                (i = t).addCommand("mceApplyTextcolor", function(t, n) {
                    var e, o, r;
                    o = t, r = n, (e = i).undoManager.transact(function() {
                        e.focus(), e.formatter.apply(o, {
                            value: r
                        }), e.nodeChanged()
                    })
                }), i.addCommand("mceRemoveTextcolor", function(t) {
                    var n, e;
                    e = t, (n = i).undoManager.transact(function() {
                        n.focus(), n.formatter.remove(e, {
                            value: null
                        }, null, !0), n.nodeChanged()
                    })
                });
                var n = Ot(null),
                    e = Ot(null);
                Rb(t, "forecolor", "forecolor", "Text color", n), Rb(t, "backcolor", "hilitecolor", "Background color", e)
            },
            getFetch: Ib,
            colorPickerDialog: Nb,
            getCurrentColor: Bb,
            getColorCols: _b,
            calcCols: Db
        },
        jb = Z([or("dom"), or("fetch"), Mu("onOpen"), Hu("onExecute"), vr("getHotspot", tt.some), vr("layouts", tt.none()), Ds("dropdownBehaviours", [Hm, Jv, Xd, gm]), or("toggleClass"), vr("eventOrder", {}), fr("lazySink"), vr("matchWidth", !1), vr("useMinWidth", !1), fr("role")].concat(Sp())),
        Ub = Z([sl({
            schema: [ku()],
            name: "menu",
            defaults: function(t) {
                return {
                    onExecute: t.onExecute
                }
            }
        }), ap()]),
        Wb = Il({
            name: "Dropdown",
            configFields: jb(),
            partFields: Ub(),
            factory: function(n, t, e, o) {
                var r, i, u = function(t) {
                        Hs.getState(t).each(function(t) {
                            Km.highlightPrimary(t)
                        })
                    },
                    a = {
                        expand: function(t) {
                            Hm.isOn(t) || fp(n, function(t) {
                                return t
                            }, t, o, Q, Mv.HighlightNone).get(Q)
                        },
                        open: function(t) {
                            Hm.isOn(t) || fp(n, function(t) {
                                return t
                            }, t, o, Q, Mv.HighlightFirst).get(Q)
                        },
                        isOpen: Hm.isOn,
                        close: function(t) {
                            Hm.isOn(t) && fp(n, function(t) {
                                return t
                            }, t, o, Q, Mv.HighlightFirst).get(Q)
                        }
                    },
                    c = function(t, n) {
                        return Vr(t), tt.some(!0)
                    };
                return {
                    uid: n.uid,
                    dom: n.dom,
                    components: t,
                    behaviours: Fs(n.dropdownBehaviours, [Hm.config({
                        toggleClass: n.toggleClass,
                        aria: {
                            mode: "expanded"
                        }
                    }), Jv.config({
                        others: {
                            sandbox: function(t) {
                                return hp(n, t, {
                                    onOpen: function() {
                                        Hm.on(t)
                                    },
                                    onClose: function() {
                                        Hm.off(t)
                                    }
                                })
                            }
                        }
                    }), Xd.config({
                        mode: "special",
                        onSpace: c,
                        onEnter: c,
                        onDown: function(t, n) {
                            if (Wb.isOpen(t)) {
                                var e = Jv.getCoupled(t, "sandbox");
                                u(e)
                            } else Wb.open(t);
                            return tt.some(!0)
                        },
                        onEscape: function(t, n) {
                            return Wb.isOpen(t) ? (Wb.close(t), tt.some(!0)) : tt.none()
                        }
                    }), gm.config({})]),
                    events: $m(tt.some(function(t) {
                        fp(n, function(t) {
                            return t
                        }, t, o, u, Mv.HighlightFirst).get(Q)
                    })),
                    eventOrder: Ke({}, n.eventOrder, (r = {}, r[Cn()] = ["disabling", "toggling", "alloy.base.behaviour"], r)),
                    apis: a,
                    domModification: {
                        attributes: Ke({
                            "aria-haspopup": "true"
                        }, n.role.fold(function() {
                            return {}
                        }, function(t) {
                            return {
                                role: t
                            }
                        }), "button" === n.dom.tag ? {
                            type: (i = "type", wt(n.dom, "attributes").bind(function(t) {
                                return wt(t, i)
                            })).getOr("button")
                        } : {})
                    }
                }
            },
            apis: {
                open: function(t, n) {
                    return t.open(n)
                },
                expand: function(t, n) {
                    return t.expand(n)
                },
                close: function(t, n) {
                    return t.close(n)
                },
                isOpen: function(t, n) {
                    return t.isOpen(n)
                }
            }
        }),
        Gb = Pu({
            fields: [],
            name: "unselecting",
            active: /* */ Object.freeze({
                events: function(t) {
                    return Gr([Xr(Gt(), Z(!0))])
                },
                exhibit: function(t, n) {
                    return Oi({
                        styles: {
                            "-webkit-user-select": "none",
                            "user-select": "none",
                            "-ms-user-select": "none",
                            "-moz-user-select": "-moz-none"
                        },
                        attributes: {
                            unselectable: "on"
                        }
                    })
                }
            })
        }),
        Xb = Ye("color-input-change"),
        Yb = Ye("color-swatch-change"),
        qb = Ye("color-picker-cancel"),
        Kb = function(t, n, o) {
            var e, r, i = Yv.parts().field({
                    factory: Lp,
                    inputClasses: ["tox-textfield"],
                    onSetValue: function(t) {
                        return Qp.run(t).get(function() {})
                    },
                    inputBehaviours: Ru([nb.config({}), Qp.config({
                        invalidClass: "tox-textbox-field-invalid",
                        getRoot: function(t) {
                            return le(t.element())
                        },
                        notify: {
                            onValid: function(t) {
                                var n = lm.getValue(t);
                                Er(t, Xb, {
                                    color: n
                                })
                            }
                        },
                        validator: {
                            validateOnLoad: !1,
                            validate: function(t) {
                                var n = lm.getValue(t);
                                if (0 === n.length) return ip.pure(dt.value(!0));
                                var e = Gn.fromTag("span");
                                qi(e, "background-color", n);
                                var o = Qi(e, "background-color").fold(function() {
                                    return dt.error("blah")
                                }, function(t) {
                                    return dt.value(n)
                                });
                                return ip.pure(o)
                            }
                        }
                    })]),
                    selectOnFocus: !1
                }),
                u = t.label.map(function(t) {
                    return Tp(t, n.providers)
                }),
                a = function(t, n) {
                    Er(t, Yb, {
                        value: n
                    })
                },
                c = Zm((e = {
                    dom: {
                        tag: "span",
                        attributes: {
                            "aria-label": n.providers.translate("Color swatch")
                        }
                    },
                    layouts: tt.some({
                        onRtl: function() {
                            return [nc]
                        },
                        onLtr: function() {
                            return [ec]
                        }
                    }),
                    components: [],
                    fetch: Pb.getFetch(o.getColors(), o.hasCustomColors()),
                    onItemAction: function(e) {
                        n.getSink().each(function(t) {
                            c.getOpt(t).each(function(n) {
                                "custom" === e ? o.colorPicker(function(t) {
                                    t.fold(function() {
                                        return Hr(n, qb)
                                    }, function(t) {
                                        a(n, t), Ab(t)
                                    })
                                }, "#ffffff") : a(n, "remove" === e ? "" : e)
                            })
                        })
                    }
                }, r = n, Wb.sketch({
                    dom: e.dom,
                    components: e.components,
                    toggleClass: "mce-active",
                    dropdownBehaviours: Ru([Gb.config({}), nb.config({})]),
                    layouts: e.layouts,
                    sandboxClasses: ["tox-dialog__popups"],
                    lazySink: r.getSink,
                    fetch: function() {
                        return ip.nu(function(t) {
                            return e.fetch(t)
                        }).map(function(t) {
                            return tt.from(ev(vt(tv(Ye("menu-value"), t, function(t) {
                                e.onItemAction(t)
                            }, 5, "color", Sg.CLOSE_ON_EXECUTE, function() {
                                return !1
                            }, r.providers), {
                                movement: Wg(5, "color")
                            })))
                        })
                    },
                    parts: {
                        menu: Ug(0, 0, "color")
                    }
                })));
            return Yv.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-form__group"]
                },
                components: u.toArray().concat([{
                    dom: {
                        tag: "div",
                        classes: ["tox-color-input"]
                    },
                    components: [i, c.asSpec()]
                }]),
                fieldBehaviours: Ru([_m("form-field-events", [qr(Xb, function(t, n) {
                    c.getOpt(t).each(function(t) {
                        qi(t.element(), "background-color", n.event().color())
                    })
                }), qr(Yb, function(n, e) {
                    Yv.getField(n).each(function(t) {
                        lm.setValue(t, e.event().value()), Pl.getCurrent(n).each(gm.focus)
                    })
                }), qr(qb, function(n, t) {
                    Yv.getField(n).each(function(t) {
                        Pl.getCurrent(n).each(gm.focus)
                    })
                })])])
            })
        },
        Jb = yn.detect().deviceType.isTouch(),
        $b = ll({
            schema: [or("dom")],
            name: "label"
        }),
        Qb = function(t) {
            return ll({
                name: t + "-edge",
                overrides: function(o) {
                    return o.model.manager.edgeActions[t].fold(function() {
                        return {}
                    }, function(e) {
                        var t = Gr([Kr(Et(), e, [o])]),
                            n = Gr([Kr(At(), e, [o]), Kr(Bt(), function(t, n) {
                                n.mouseIsDown.get() && e(t, n)
                            }, [o])]);
                        return {
                            events: Jb ? t : n
                        }
                    })
                }
            })
        },
        Zb = Qb("top-left"),
        ty = Qb("top"),
        ny = Qb("top-right"),
        ey = Qb("right"),
        oy = Qb("bottom-right"),
        ry = Qb("bottom"),
        iy = Qb("bottom-left"),
        uy = [$b, Qb("left"), ey, ty, ry, Zb, ny, iy, oy, cl({
            name: "thumb",
            defaults: Z({
                dom: {
                    styles: {
                        position: "absolute"
                    }
                }
            }),
            overrides: function(t) {
                return {
                    events: Gr([$r(Et(), t, "spectrum"), $r(Vt(), t, "spectrum"), $r(Tt(), t, "spectrum"), $r(At(), t, "spectrum"), $r(Bt(), t, "spectrum"), $r(_t(), t, "spectrum")])
                }
            }
        }), cl({
            schema: [kr("mouseIsDown", function() {
                return Ot(!1)
            })],
            name: "spectrum",
            overrides: function(e) {
                var o = e.model.manager,
                    r = function(n, t) {
                        return o.getValueFromEvent(t).map(function(t) {
                            return o.setValueFrom(n, e, t)
                        })
                    },
                    t = Gr([qr(Et(), r), qr(Vt(), r)]),
                    n = Gr([qr(At(), r), qr(Bt(), function(t, n) {
                        e.mouseIsDown.get() && r(t, n)
                    })]);
                return {
                    behaviours: Ru(Jb ? [] : [Xd.config({
                        mode: "special",
                        onLeft: function(t) {
                            return o.onLeft(t, e)
                        },
                        onRight: function(t) {
                            return o.onRight(t, e)
                        },
                        onUp: function(t) {
                            return o.onUp(t, e)
                        },
                        onDown: function(t) {
                            return o.onDown(t, e)
                        }
                    }), gm.config({})]),
                    events: Jb ? t : n
                }
            }
        })],
        ay = yn.detect().deviceType.isTouch(),
        cy = Z("slider.change.value"),
        sy = function(t) {
            var n = t.event().raw();
            if (ay) {
                var e = n;
                return e.touches !== undefined && 1 === e.touches.length ? tt.some(e.touches[0]).map(function(t) {
                    return Ju(t.clientX, t.clientY)
                }) : tt.none()
            }
            var o = n;
            return o.clientX !== undefined ? tt.some(o).map(function(t) {
                return Ju(t.clientX, t.clientY)
            }) : tt.none()
        },
        ly = function(t, n, e, o) {
            return t < n ? t : e < t ? e : t === n ? n - 1 : Math.max(n, t - o)
        },
        fy = function(t, n, e, o) {
            return e < t ? t : t < n ? n : t === e ? e + 1 : Math.min(e, t + o)
        },
        dy = function(t, n, e) {
            return Math.max(n, Math.min(e, t))
        },
        my = function(t) {
            var n = t.min,
                e = t.max,
                o = t.range,
                r = t.value,
                i = t.step,
                u = t.snap,
                a = t.snapStart,
                c = t.rounded,
                s = t.hasMinEdge,
                l = t.hasMaxEdge,
                f = t.minBound,
                d = t.maxBound,
                m = t.screenRange,
                h = s ? n - 1 : n,
                g = l ? e + 1 : e;
            if (r < f) return h;
            if (d < r) return g;
            var v, p, b, y, x, w, z, S = (x = r, w = f, z = d, Math.min(z, Math.max(x, w)) - w),
                k = dy(S / m * o + n, h, g);
            return u && n <= k && k <= e ? (v = k, p = n, b = e, y = i, a.fold(function() {
                var t = v - p,
                    n = Math.round(t / y) * y;
                return dy(p + n, p - 1, b + 1)
            }, function(t) {
                var n = (v - t) % y,
                    e = Math.round(n / y),
                    o = Math.floor((v - t) / y),
                    r = Math.floor((b - t) / y),
                    i = t + Math.min(r, o + e) * y;
                return Math.max(t, i)
            })) : c ? Math.round(k) : k
        },
        hy = function(t) {
            var n = t.min,
                e = t.max,
                o = t.range,
                r = t.value,
                i = t.hasMinEdge,
                u = t.hasMaxEdge,
                a = t.maxBound,
                c = t.maxOffset,
                s = t.centerMinEdge,
                l = t.centerMaxEdge;
            return r < n ? i ? 0 : s : e < r ? u ? a : l : (r - n) / o * c
        },
        gy = function(t) {
            return t.model.minX
        },
        vy = function(t) {
            return t.model.minY
        },
        py = function(t) {
            return t.model.minX - 1
        },
        by = function(t) {
            return t.model.minY - 1
        },
        yy = function(t) {
            return t.model.maxX
        },
        xy = function(t) {
            return t.model.maxY
        },
        wy = function(t) {
            return t.model.maxX + 1
        },
        zy = function(t) {
            return t.model.maxY + 1
        },
        Sy = function(t, n, e) {
            return n(t) - e(t)
        },
        ky = function(t) {
            return Sy(t, yy, gy)
        },
        Cy = function(t) {
            return Sy(t, xy, vy)
        },
        Oy = function(t) {
            return ky(t) / 2
        },
        My = function(t) {
            return Cy(t) / 2
        },
        Hy = function(t) {
            return t.stepSize
        },
        Ey = function(t) {
            return t.snapToGrid
        },
        Vy = function(t) {
            return t.snapStart
        },
        Ty = function(t) {
            return t.rounded
        },
        Ay = function(t, n) {
            return t[n + "-edge"] !== undefined
        },
        By = function(t) {
            return Ay(t, "left")
        },
        Dy = function(t) {
            return Ay(t, "right")
        },
        _y = function(t) {
            return Ay(t, "top")
        },
        Fy = function(t) {
            return Ay(t, "bottom")
        },
        Iy = function(t) {
            return t.model.value.get()
        },
        Ly = function(t) {
            return {
                x: Z(t)
            }
        },
        Ry = function(t) {
            return {
                y: Z(t)
            }
        },
        Ny = function(t, n) {
            return {
                x: Z(t),
                y: Z(n)
            }
        },
        Py = function(t, n) {
            Er(t, cy(), {
                value: n
            })
        },
        jy = "left",
        Uy = function(t) {
            return t.element().dom().getBoundingClientRect()
        },
        Wy = function(t, n) {
            return t[n]
        },
        Gy = function(t) {
            var n = Uy(t);
            return Wy(n, jy)
        },
        Xy = function(t) {
            var n = Uy(t);
            return Wy(n, "right")
        },
        Yy = function(t) {
            var n = Uy(t);
            return Wy(n, "top")
        },
        qy = function(t) {
            var n = Uy(t);
            return Wy(n, "bottom")
        },
        Ky = function(t) {
            var n = Uy(t);
            return Wy(n, "width")
        },
        Jy = function(t) {
            var n = Uy(t);
            return Wy(n, "height")
        },
        $y = function(t, n, e) {
            return (t + n) / 2 - e
        },
        Qy = function(t, n) {
            var e = Uy(t),
                o = Uy(n),
                r = Wy(e, jy),
                i = Wy(e, "right"),
                u = Wy(o, jy);
            return $y(r, i, u)
        },
        Zy = function(t, n) {
            var e = Uy(t),
                o = Uy(n),
                r = Wy(e, "top"),
                i = Wy(e, "bottom"),
                u = Wy(o, "top");
            return $y(r, i, u)
        },
        tx = function(t, n) {
            Er(t, cy(), {
                value: n
            })
        },
        nx = function(t) {
            return {
                x: Z(t)
            }
        },
        ex = function(t, n, e) {
            var o = {
                min: gy(n),
                max: yy(n),
                range: ky(n),
                value: e,
                step: Hy(n),
                snap: Ey(n),
                snapStart: Vy(n),
                rounded: Ty(n),
                hasMinEdge: By(n),
                hasMaxEdge: Dy(n),
                minBound: Gy(t),
                maxBound: Xy(t),
                screenRange: Ky(t)
            };
            return my(o)
        },
        ox = function(u) {
            return function(t, n) {
                return (e = u, o = t, r = n, i = (0 < e ? fy : ly)(Iy(r).x(), gy(r), yy(r), Hy(r)), tx(o, nx(i)), tt.some(i)).map(function() {
                    return !0
                });
                var e, o, r, i
            }
        },
        rx = function(t, n, e, o, r, i) {
            var u, a, c, s, l, f, d, m, h, g = (a = i, c = e, s = o, l = r, f = Ky(u = n), d = s.bind(function(t) {
                return tt.some(Qy(t, u))
            }).getOr(0), m = l.bind(function(t) {
                return tt.some(Qy(t, u))
            }).getOr(f), h = {
                min: gy(a),
                max: yy(a),
                range: ky(a),
                value: c,
                hasMinEdge: By(a),
                hasMaxEdge: Dy(a),
                minBound: Gy(u),
                minOffset: 0,
                maxBound: Xy(u),
                maxOffset: f,
                centerMinEdge: d,
                centerMaxEdge: m
            }, hy(h));
            return Gy(n) - Gy(t) + g
        },
        ix = ox(-1),
        ux = ox(1),
        ax = tt.none,
        cx = tt.none,
        sx = {
            "top-left": tt.none(),
            top: tt.none(),
            "top-right": tt.none(),
            right: tt.some(function(t, n) {
                Py(t, Ly(wy(n)))
            }),
            "bottom-right": tt.none(),
            bottom: tt.none(),
            "bottom-left": tt.none(),
            left: tt.some(function(t, n) {
                Py(t, Ly(py(n)))
            })
        },
        lx = /* */ Object.freeze({
            setValueFrom: function(t, n, e) {
                var o = ex(t, n, e),
                    r = nx(o);
                return tx(t, r), o
            },
            setToMin: function(t, n) {
                var e = gy(n);
                tx(t, nx(e))
            },
            setToMax: function(t, n) {
                var e = yy(n);
                tx(t, nx(e))
            },
            findValueOfOffset: ex,
            getValueFromEvent: function(t) {
                return sy(t).map(function(t) {
                    return t.left()
                })
            },
            findPositionOfValue: rx,
            setPositionFromValue: function(t, n, e, o) {
                var r = Iy(e),
                    i = rx(t, o.getSpectrum(t), r.x(), o.getLeftEdge(t), o.getRightEdge(t), e),
                    u = ia(n.element()) / 2;
                qi(n.element(), "left", i - u + "px")
            },
            onLeft: ix,
            onRight: ux,
            onUp: ax,
            onDown: cx,
            edgeActions: sx
        }),
        fx = function(t, n) {
            Er(t, cy(), {
                value: n
            })
        },
        dx = function(t) {
            return {
                y: Z(t)
            }
        },
        mx = function(t, n, e) {
            var o = {
                min: vy(n),
                max: xy(n),
                range: Cy(n),
                value: e,
                step: Hy(n),
                snap: Ey(n),
                snapStart: Vy(n),
                rounded: Ty(n),
                hasMinEdge: _y(n),
                hasMaxEdge: Fy(n),
                minBound: Yy(t),
                maxBound: qy(t),
                screenRange: Jy(t)
            };
            return my(o)
        },
        hx = function(u) {
            return function(t, n) {
                return (e = u, o = t, r = n, i = (0 < e ? fy : ly)(Iy(r).y(), vy(r), xy(r), Hy(r)), fx(o, dx(i)), tt.some(i)).map(function() {
                    return !0
                });
                var e, o, r, i
            }
        },
        gx = function(t, n, e, o, r, i) {
            var u, a, c, s, l, f, d, m, h, g = (a = i, c = e, s = o, l = r, f = Jy(u = n), d = s.bind(function(t) {
                return tt.some(Zy(t, u))
            }).getOr(0), m = l.bind(function(t) {
                return tt.some(Zy(t, u))
            }).getOr(f), h = {
                min: vy(a),
                max: xy(a),
                range: Cy(a),
                value: c,
                hasMinEdge: _y(a),
                hasMaxEdge: Fy(a),
                minBound: Yy(u),
                minOffset: 0,
                maxBound: qy(u),
                maxOffset: f,
                centerMinEdge: d,
                centerMaxEdge: m
            }, hy(h));
            return Yy(n) - Yy(t) + g
        },
        vx = tt.none,
        px = tt.none,
        bx = hx(-1),
        yx = hx(1),
        xx = {
            "top-left": tt.none(),
            top: tt.some(function(t, n) {
                Py(t, Ry(by(n)))
            }),
            "top-right": tt.none(),
            right: tt.none(),
            "bottom-right": tt.none(),
            bottom: tt.some(function(t, n) {
                Py(t, Ry(zy(n)))
            }),
            "bottom-left": tt.none(),
            left: tt.none()
        },
        wx = /* */ Object.freeze({
            setValueFrom: function(t, n, e) {
                var o = mx(t, n, e),
                    r = dx(o);
                return fx(t, r), o
            },
            setToMin: function(t, n) {
                var e = vy(n);
                fx(t, dx(e))
            },
            setToMax: function(t, n) {
                var e = xy(n);
                fx(t, dx(e))
            },
            findValueOfOffset: mx,
            getValueFromEvent: function(t) {
                return sy(t).map(function(t) {
                    return t.top()
                })
            },
            findPositionOfValue: gx,
            setPositionFromValue: function(t, n, e, o) {
                var r = Iy(e),
                    i = gx(t, o.getSpectrum(t), r.y(), o.getTopEdge(t), o.getBottomEdge(t), e),
                    u = ca(n.element()) / 2;
                qi(n.element(), "top", i - u + "px")
            },
            onLeft: vx,
            onRight: px,
            onUp: bx,
            onDown: yx,
            edgeActions: xx
        }),
        zx = function(t, n) {
            Er(t, cy(), {
                value: n
            })
        },
        Sx = function(t, n) {
            return {
                x: Z(t),
                y: Z(n)
            }
        },
        kx = function(s, l) {
            return function(t, n) {
                return (e = s, o = l, r = t, i = n, u = 0 < e ? fy : ly, a = o ? Iy(i).x() : u(Iy(i).x(), gy(i), yy(i), Hy(i)), c = o ? u(Iy(i).y(), vy(i), xy(i), Hy(i)) : Iy(i).y(), zx(r, Sx(a, c)), tt.some(a)).map(function() {
                    return !0
                });
                var e, o, r, i, u, a, c
            }
        },
        Cx = kx(-1, !1),
        Ox = kx(1, !1),
        Mx = kx(-1, !0),
        Hx = kx(1, !0),
        Ex = {
            "top-left": tt.some(function(t, n) {
                Py(t, Ny(py(n), by(n)))
            }),
            top: tt.some(function(t, n) {
                Py(t, Ny(Oy(n), by(n)))
            }),
            "top-right": tt.some(function(t, n) {
                Py(t, Ny(wy(n), by(n)))
            }),
            right: tt.some(function(t, n) {
                Py(t, Ny(wy(n), My(n)))
            }),
            "bottom-right": tt.some(function(t, n) {
                Py(t, Ny(wy(n), zy(n)))
            }),
            bottom: tt.some(function(t, n) {
                Py(t, Ny(Oy(n), zy(n)))
            }),
            "bottom-left": tt.some(function(t, n) {
                Py(t, Ny(py(n), zy(n)))
            }),
            left: tt.some(function(t, n) {
                Py(t, Ny(py(n), My(n)))
            })
        },
        Vx = /* */ Object.freeze({
            setValueFrom: function(t, n, e) {
                var o = ex(t, n, e.left()),
                    r = mx(t, n, e.top()),
                    i = Sx(o, r);
                return zx(t, i), i
            },
            setToMin: function(t, n) {
                var e = gy(n),
                    o = vy(n);
                zx(t, Sx(e, o))
            },
            setToMax: function(t, n) {
                var e = yy(n),
                    o = xy(n);
                zx(t, Sx(e, o))
            },
            getValueFromEvent: function(t) {
                return sy(t)
            },
            setPositionFromValue: function(t, n, e, o) {
                var r = Iy(e),
                    i = rx(t, o.getSpectrum(t), r.x(), o.getLeftEdge(t), o.getRightEdge(t), e),
                    u = gx(t, o.getSpectrum(t), r.y(), o.getTopEdge(t), o.getBottomEdge(t), e),
                    a = ia(n.element()) / 2,
                    c = ca(n.element()) / 2;
                qi(n.element(), "left", i - a + "px"), qi(n.element(), "top", u - c + "px")
            },
            onLeft: Cx,
            onRight: Ox,
            onUp: Mx,
            onDown: Hx,
            edgeActions: Ex
        }),
        Tx = yn.detect().deviceType.isTouch(),
        Ax = [vr("stepSize", 1), vr("onChange", Q), vr("onChoose", Q), vr("onInit", Q), vr("onDragStart", Q), vr("onDragEnd", Q), vr("snapToGrid", !1), vr("rounded", !0), fr("snapStart"), rr("model", Ko("mode", {
            x: [vr("minX", 0), vr("maxX", 100), kr("value", function(t) {
                return Ot(t.mode.minX)
            }), or("getInitialValue"), Tu("manager", lx)],
            y: [vr("minY", 0), vr("maxY", 100), kr("value", function(t) {
                return Ot(t.mode.minY)
            }), or("getInitialValue"), Tu("manager", wx)],
            xy: [vr("minX", 0), vr("maxX", 100), vr("minY", 0), vr("maxY", 100), kr("value", function(t) {
                return Ot({
                    x: Z(t.mode.minX),
                    y: Z(t.mode.minY)
                })
            }), or("getInitialValue"), Tu("manager", Vx)]
        })), Ds("sliderBehaviours", [Xd, lm])].concat(Tx ? [] : [kr("mouseIsDown", function() {
            return Ot(!1)
        })]),
        Bx = yn.detect().deviceType.isTouch(),
        Dx = Il({
            name: "Slider",
            configFields: Ax,
            partFields: uy,
            factory: function(i, t, n, e) {
                var u = function(t) {
                        return Sl(t, i, "thumb")
                    },
                    a = function(t) {
                        return Sl(t, i, "spectrum")
                    },
                    o = function(t) {
                        return zl(t, i, "left-edge")
                    },
                    r = function(t) {
                        return zl(t, i, "right-edge")
                    },
                    c = function(t) {
                        return zl(t, i, "top-edge")
                    },
                    s = function(t) {
                        return zl(t, i, "bottom-edge")
                    },
                    l = i.model,
                    f = l.manager,
                    d = function(t, n) {
                        f.setPositionFromValue(t, n, i, {
                            getLeftEdge: o,
                            getRightEdge: r,
                            getTopEdge: c,
                            getBottomEdge: s,
                            getSpectrum: a
                        })
                    },
                    m = function(t, n) {
                        l.value.set(n);
                        var e = u(t);
                        return d(t, e), i.onChange(t, e, n), tt.some(!0)
                    },
                    h = [qr(Et(), function(t, n) {
                        i.onDragStart(t, u(t))
                    }), qr(Tt(), function(t, n) {
                        i.onDragEnd(t, u(t))
                    })],
                    g = [qr(At(), function(t, n) {
                        n.stop(), i.onDragStart(t, u(t)), i.mouseIsDown.set(!0)
                    }), qr(_t(), function(t, n) {
                        i.onDragEnd(t, u(t))
                    })],
                    v = Bx ? h : g;
                return {
                    uid: i.uid,
                    dom: i.dom,
                    components: t,
                    behaviours: Fs(i.sliderBehaviours, R([Bx ? [] : [Xd.config({
                            mode: "special",
                            focusIn: function(t) {
                                return zl(t, i, "spectrum").map(Xd.focusIn).map(Z(!0))
                            }
                        })],
                        [lm.config({
                            store: {
                                mode: "manual",
                                getValue: function(t) {
                                    return l.value.get()
                                }
                            }
                        }), Yu.config({
                            channels: {
                                "mouse.released": {
                                    onReceive: function(e, t) {
                                        var n = i.mouseIsDown.get();
                                        i.mouseIsDown.set(!1), n && zl(e, i, "thumb").each(function(t) {
                                            var n = l.value.get();
                                            i.onChoose(e, t, n)
                                        })
                                    }
                                }
                            }
                        })]
                    ])),
                    events: Gr([qr(cy(), function(t, n) {
                        m(t, n.event().value())
                    }), ei(function(t, n) {
                        var e = l.getInitialValue();
                        l.value.set(e);
                        var o = u(t);
                        d(t, o);
                        var r = a(t);
                        i.onInit(t, o, r, l.value.get())
                    })].concat(v)),
                    apis: {
                        resetToMin: function(t) {
                            f.setToMin(t, i)
                        },
                        resetToMax: function(t) {
                            f.setToMax(t, i)
                        },
                        changeValue: m,
                        refresh: d
                    },
                    domModification: {
                        styles: {
                            position: "relative"
                        }
                    }
                }
            },
            apis: {
                resetToMin: function(t, n) {
                    t.resetToMin(n)
                },
                resetToMax: function(t, n) {
                    t.resetToMax(n)
                },
                refresh: function(t, n) {
                    t.refresh(n)
                }
            }
        }),
        _x = Z(Ye("rgb-hex-update")),
        Fx = Z(Ye("slider-update")),
        Ix = Z(Ye("palette-update")),
        Lx = function(t, o) {
            var r = Dx.parts().spectrum({
                    dom: {
                        tag: "canvas",
                        attributes: {
                            role: "presentation"
                        },
                        classes: [o("sv-palette-spectrum")]
                    }
                }),
                i = Dx.parts().thumb({
                    dom: {
                        tag: "div",
                        attributes: {
                            role: "presentation"
                        },
                        classes: [o("sv-palette-thumb")],
                        innerHtml: "<div class=" + o("sv-palette-inner-thumb") + ' role="presentation"></div>'
                    }
                }),
                u = function(t, n) {
                    var e = t.width,
                        o = t.height,
                        r = t.getContext("2d");
                    r.fillStyle = n, r.fillRect(0, 0, e, o);
                    var i = r.createLinearGradient(0, 0, e, 0);
                    i.addColorStop(0, "rgba(255,255,255,1)"), i.addColorStop(1, "rgba(255,255,255,0)"), r.fillStyle = i, r.fillRect(0, 0, e, o);
                    var u = r.createLinearGradient(0, 0, 0, o);
                    u.addColorStop(0, "rgba(0,0,0,0)"), u.addColorStop(1, "rgba(0,0,0,1)"), r.fillStyle = u, r.fillRect(0, 0, e, o)
                };
            return Fl({
                factory: function(t) {
                    var n = Z({
                            x: Z(0),
                            y: Z(0)
                        }),
                        e = Ru([Pl.config({
                            find: tt.some
                        }), gm.config({})]);
                    return Dx.sketch({
                        dom: {
                            tag: "div",
                            attributes: {
                                role: "presentation"
                            },
                            classes: [o("sv-palette")]
                        },
                        model: {
                            mode: "xy",
                            getInitialValue: n
                        },
                        rounded: !1,
                        components: [r, i],
                        onChange: function(t, n, e) {
                            Er(t, Ix(), {
                                value: e
                            })
                        },
                        onInit: function(t, n, e, o) {
                            u(e.element().dom(), yb(xb()))
                        },
                        sliderBehaviours: e
                    })
                },
                name: "SaturationBrightnessPalette",
                configFields: [],
                apis: {
                    setRgba: function(t, n, e) {
                        var o, r;
                        o = e, r = n.components()[0].element().dom(), u(r, yb(o))
                    }
                },
                extraApis: {}
            })
        },
        Rx = function(t, n) {
            var e = Dx.parts().spectrum({
                    dom: {
                        tag: "div",
                        classes: [n("hue-slider-spectrum")],
                        attributes: {
                            role: "presentation"
                        }
                    }
                }),
                o = Dx.parts().thumb({
                    dom: {
                        tag: "div",
                        classes: [n("hue-slider-thumb")],
                        attributes: {
                            role: "presentation"
                        }
                    }
                });
            return Dx.sketch({
                dom: {
                    tag: "div",
                    classes: [n("hue-slider")],
                    attributes: {
                        role: "presentation"
                    }
                },
                rounded: !1,
                model: {
                    mode: "y",
                    getInitialValue: Z({
                        y: Z(0)
                    })
                },
                components: [e, o],
                sliderBehaviours: Ru([gm.config({})]),
                onChange: function(t, n, e) {
                    Er(t, Fx(), {
                        value: e
                    })
                }
            })
        },
        Nx = [Ds("formBehaviours", [lm])],
        Px = function(t) {
            return "<alloy.field." + t + ">"
        },
        jx = function(o, t, n) {
            return {
                uid: o.uid,
                dom: o.dom,
                components: t,
                behaviours: Fs(o.formBehaviours, [lm.config({
                    store: {
                        mode: "manual",
                        getValue: function(t) {
                            var n = Cl(t, o);
                            return nt(n, function(t, n) {
                                return t().bind(function(t) {
                                    var n, e = Pl.getCurrent(t);
                                    return n = "missing current", e.fold(function() {
                                        return dt.error(n)
                                    }, dt.value)
                                }).map(lm.getValue)
                            })
                        },
                        setValue: function(e, t) {
                            $(t, function(n, t) {
                                zl(e, o, t).each(function(t) {
                                    Pl.getCurrent(t).each(function(t) {
                                        lm.setValue(t, n)
                                    })
                                })
                            })
                        }
                    }
                })]),
                apis: {
                    getField: function(t, n) {
                        return zl(t, o, n).bind(Pl.getCurrent)
                    }
                }
            }
        },
        Ux = {
            getField: zi(function(t, n, e) {
                return t.getField(n, e)
            }),
            sketch: function(t) {
                var e, n = (e = [], {
                        field: function(t, n) {
                            return e.push(t), pl("form", Px(t), n)
                        },
                        record: function() {
                            return e
                        }
                    }),
                    o = t(n),
                    r = n.record(),
                    i = V(r, function(t) {
                        return cl({
                            name: t,
                            pname: Px(t)
                        })
                    });
                return Al("form", Nx, i, jx, o)
            }
        },
        Wx = Ye("valid-input"),
        Gx = Ye("invalid-input"),
        Xx = Ye("validating-input"),
        Yx = "colorcustom.rgb.",
        qx = function(m, h, g, v) {
            var p = function(t, n, e, o, r) {
                    var i, u, a = m(Yx + "range"),
                        c = [Yv.parts().label({
                            dom: {
                                tag: "label",
                                innerHtml: e,
                                attributes: {
                                    "aria-label": o
                                }
                            }
                        }), Yv.parts().field({
                            data: r,
                            factory: Lp,
                            inputAttributes: Ke({
                                type: "text"
                            }, "hex" === n ? {
                                "aria-live": "polite"
                            } : {}),
                            inputClasses: [h("textfield")],
                            inputBehaviours: Ru([(i = n, u = t, Qp.config({
                                invalidClass: h("invalid"),
                                notify: {
                                    onValidate: function(t) {
                                        Er(t, Xx, {
                                            type: i
                                        })
                                    },
                                    onValid: function(t) {
                                        Er(t, Wx, {
                                            type: i,
                                            value: lm.getValue(t)
                                        })
                                    },
                                    onInvalid: function(t) {
                                        Er(t, Gx, {
                                            type: i,
                                            value: lm.getValue(t)
                                        })
                                    }
                                },
                                validator: {
                                    validate: function(t) {
                                        var n = lm.getValue(t),
                                            e = u(n) ? dt.value(!0) : dt.error(m("aria.input.invalid"));
                                        return ip.pure(e)
                                    },
                                    validateOnLoad: !1
                                }
                            })), nb.config({})]),
                            onSetValue: function(t) {
                                Qp.isInvalid(t) && Qp.run(t).get(Q)
                            }
                        })],
                        s = "hex" !== n ? [Yv.parts()["aria-descriptor"]({
                            text: a
                        })] : [];
                    return {
                        dom: {
                            tag: "div",
                            attributes: {
                                role: "presentation"
                            }
                        },
                        components: c.concat(s)
                    }
                },
                b = function(t, n) {
                    var e = n.red(),
                        o = n.green(),
                        r = n.blue();
                    lm.setValue(t, {
                        red: e,
                        green: o,
                        blue: r
                    })
                },
                y = Zm({
                    dom: {
                        tag: "div",
                        classes: [h("rgba-preview")],
                        styles: {
                            "background-color": "white"
                        },
                        attributes: {
                            role: "presentation"
                        }
                    }
                }),
                x = function(t, n) {
                    y.getOpt(t).each(function(t) {
                        qi(t.element(), "background-color", "#" + n.value())
                    })
                };
            return Fl({
                factory: function(t) {
                    var e = {
                            red: Z(Ot(tt.some(255))),
                            green: Z(Ot(tt.some(255))),
                            blue: Z(Ot(tt.some(255))),
                            hex: Z(Ot(tt.some("ffffff")))
                        },
                        o = function(t) {
                            return e[t]().get()
                        },
                        i = function(t, n) {
                            e[t]().set(n)
                        },
                        r = function(t) {
                            var n = t.red(),
                                e = t.green(),
                                o = t.blue();
                            i("red", tt.some(n)), i("green", tt.some(e)), i("blue", tt.some(o))
                        },
                        n = function(t, n) {
                            var e = n.event();
                            "hex" !== e.type() ? i(e.type(), tt.none()) : v(t)
                        },
                        u = function(r, t, n) {
                            var e = parseInt(n, 10);
                            i(t, tt.some(e)), o("red").bind(function(e) {
                                return o("green").bind(function(n) {
                                    return o("blue").map(function(t) {
                                        return hb(e, n, t, 1)
                                    })
                                })
                            }).each(function(t) {
                                var n, e, o = (n = r, e = cb(t), Ux.getField(n, "hex").each(function(t) {
                                    gm.isFocused(t) || lm.setValue(n, {
                                        hex: e.value()
                                    })
                                }), e);
                                x(r, o)
                            })
                        },
                        a = function(t, n) {
                            var e = n.event();
                            "hex" === e.type() ? function(t, n) {
                                g(t);
                                var e = eb(n);
                                i("hex", tt.some(n));
                                var o = pb(e);
                                b(t, o), r(o), Er(t, _x(), {
                                    hex: e
                                }), x(t, e)
                            }(t, e.value()) : u(t, e.type(), e.value())
                        },
                        c = function(t) {
                            return {
                                label: m(Yx + t + ".label"),
                                description: m(Yx + t + ".description")
                            }
                        },
                        s = c("red"),
                        l = c("green"),
                        f = c("blue"),
                        d = c("hex");
                    return vt(Ux.sketch(function(t) {
                        return {
                            dom: {
                                tag: "form",
                                classes: [h("rgb-form")],
                                attributes: {
                                    "aria-label": m("aria.color.picker")
                                }
                            },
                            components: [t.field("red", Yv.sketch(p(gb, "red", s.label, s.description, 255))), t.field("green", Yv.sketch(p(gb, "green", l.label, l.description, 255))), t.field("blue", Yv.sketch(p(gb, "blue", f.label, f.description, 255))), t.field("hex", Yv.sketch(p(ib, "hex", d.label, d.description, "ffffff"))), y.asSpec()],
                            formBehaviours: Ru([Qp.config({
                                invalidClass: h("form-invalid")
                            }), _m("rgb-form-events", [qr(Wx, a), qr(Gx, n), qr(Xx, n)])])
                        }
                    }), {
                        apis: {
                            updateHex: function(t, n) {
                                var e, o;
                                lm.setValue(t, {
                                    hex: n.value()
                                }), e = t, o = pb(n), b(e, o), r(o), x(t, n)
                            }
                        }
                    })
                },
                name: "RgbForm",
                configFields: [],
                apis: {
                    updateHex: function(t, n, e) {
                        t.updateHex(n, e)
                    }
                },
                extraApis: {}
            })
        },
        Kx = function(t, n, e) {
            return {
                hue: Z(t),
                saturation: Z(n),
                value: Z(e)
            }
        },
        Jx = function(c, s) {
            return Fl({
                name: "ColourPicker",
                configFields: [vr("onValidHex", Q), vr("onInvalidHex", Q), mr("formChangeEvent")],
                factory: function(t) {
                    var a, p, e = qx(c, s, t.onValidHex, t.onInvalidHex),
                        o = Lx(c, s),
                        b = {
                            paletteRgba: Z(Ot(xb()))
                        },
                        n = Zm(o.sketch({})),
                        r = Zm(e.sketch({})),
                        i = function(t, e) {
                            n.getOpt(t).each(function(t) {
                                var n = pb(e);
                                b.paletteRgba().set(n), o.setRgba(t, n)
                            })
                        },
                        u = function(t, n) {
                            r.getOpt(t).each(function(t) {
                                e.updateHex(t, n)
                            })
                        },
                        y = function(n, e, t) {
                            T(t, function(t) {
                                t(n, e)
                            })
                        };
                    return {
                        uid: t.uid,
                        dom: t.dom,
                        components: [n.asSpec(), Rx(c, s), r.asSpec()],
                        behaviours: Ru([_m("colour-picker-events", [qr(Ix(), (p = [u], function(t, n) {
                            var e, o, r, i, u, a, c, s, l, f = n.event().value(),
                                d = b.paletteRgba().get(),
                                m = (c = u = 0, o = (e = d).red() / 255, r = e.green() / 255, i = e.blue() / 255, (s = Math.min(o, Math.min(r, i))) === (l = Math.max(o, Math.max(r, i))) ? Kx(0, 0, 100 * (c = s)) : (u = 60 * ((u = o === s ? 3 : i === s ? 1 : 5) - (o === s ? r - i : i === s ? o - r : i - o) / (l - s)), a = (l - s) / l, c = l, Kx(Math.round(u), Math.round(100 * a), Math.round(100 * c)))),
                                h = Kx(m.hue(), f.x(), 100 - f.y()),
                                g = vb(h),
                                v = cb(g);
                            y(t, v, p)
                        })), qr(Fx(), (a = [i, u], function(t, n) {
                            var e, o, r, i = n.event().value(),
                                u = (e = i.y(), o = Kx(360 * (100 - e / 100), 100, 100), r = vb(o), cb(r));
                            y(t, u, a)
                        }))]), Pl.config({
                            find: function(t) {
                                return r.getOpt(t)
                            }
                        }), Xd.config({
                            mode: "acyclic"
                        })])
                    }
                }
            })
        },
        $x = function() {
            return Pl.config({
                find: tt.some
            })
        },
        Qx = function(t) {
            return Pl.config({
                find: t.getOpt
            })
        },
        Zx = function(t) {
            return Pl.config({
                find: function(n) {
                    return me(n.element(), t).bind(function(t) {
                        return n.getSystem().getByDom(t).toOption()
                    })
                }
            })
        },
        tw = {
            "colorcustom.rgb.red.label": "R",
            "colorcustom.rgb.red.description": "Red component",
            "colorcustom.rgb.green.label": "G",
            "colorcustom.rgb.green.description": "Green component",
            "colorcustom.rgb.blue.label": "B",
            "colorcustom.rgb.blue.description": "Blue component",
            "colorcustom.rgb.hex.label": "#",
            "colorcustom.rgb.hex.description": "Hex color code",
            "colorcustom.rgb.range": "Range 0 to 255",
            "colorcustom.sb.saturation": "Saturation",
            "colorcustom.sb.brightness": "Brightness",
            "colorcustom.sb.picker": "Saturation and Brightness Picker",
            "colorcustom.sb.palette": "Saturation and Brightness Palette",
            "colorcustom.sb.instructions": "Use arrow keys to select saturation and brightness, on x and y axes",
            "colorcustom.hue.hue": "Hue",
            "colorcustom.hue.slider": "Hue Slider",
            "colorcustom.hue.palette": "Hue Palette",
            "colorcustom.hue.instructions": "Use arrow keys to select a hue",
            "aria.color.picker": "Color Picker",
            "aria.input.invalid": "Invalid input"
        },
        nw = function(t) {
            return tw[t]
        },
        ew = Bo([vr("preprocess", d), vr("postprocess", d)]),
        ow = function(t, n, e) {
            return lm.config(vt({
                store: {
                    mode: "manual",
                    getValue: n,
                    setValue: e
                }
            }, t.map(function(t) {
                return {
                    store: {
                        initialValue: t
                    }
                }
            }).getOr({})))
        },
        rw = function(t, n, e) {
            return ow(t, function(t) {
                return n(t.element())
            }, function(t, n) {
                return e(t.element(), n)
            })
        },
        iw = function(r, t) {
            var i = Yo("RepresentingConfigs.memento processors", ew, t);
            return lm.config({
                store: {
                    mode: "manual",
                    getValue: function(t) {
                        var n = r.get(t),
                            e = lm.getValue(n);
                        return i.postprocess(e)
                    },
                    setValue: function(t, n) {
                        var e = i.preprocess(n),
                            o = r.get(t);
                        lm.setValue(o, e)
                    }
                }
            })
        },
        uw = ow,
        aw = function(t) {
            return rw(t, we, ze)
        },
        cw = function(t) {
            return lm.config({
                store: {
                    mode: "memory",
                    initialValue: t
                }
            })
        },
        sw = function(r, n) {
            var e = function(t, n) {
                    n.stop()
                },
                o = function(t) {
                    return function(n, e) {
                        T(t, function(t) {
                            t(n, e)
                        })
                    }
                },
                i = function(t, n) {
                    if (!Ph.isDisabled(t)) {
                        var e = n.event().raw();
                        a(t, e.dataTransfer.files)
                    }
                },
                u = function(t, n) {
                    var e = n.event().raw().target.files;
                    a(t, e)
                },
                a = function(t, n) {
                    var e, o;
                    lm.setValue(t, (e = n, o = new RegExp("(" + ".jpg,.jpeg,.png,.gif".split(/\s*,\s*/).join("|") + ")$", "i"), A(q(e), function(t) {
                        return o.test(t.name)
                    }))), Er(t, Fv, {
                        name: r.name
                    })
                },
                c = Zm({
                    dom: {
                        tag: "input",
                        attributes: {
                            type: "file",
                            multiple: "multiple"
                        },
                        styles: {
                            display: "none"
                        }
                    },
                    behaviours: Ru([_m("input-file-events", [Zr(Ut())])])
                }),
                t = r.label.map(function(t) {
                    return Tp(t, n)
                }),
                s = Yv.parts().field({
                    factory: {
                        sketch: function(t) {
                            return {
                                uid: t.uid,
                                dom: {
                                    tag: "div",
                                    classes: ["tox-dropzone-container"]
                                },
                                behaviours: Ru([cw([]), $x(), Ph.config({}), Hm.config({
                                    toggleClass: "dragenter",
                                    toggleOnExecute: !1
                                }), _m("dropzone-events", [qr("dragenter", o([e, Hm.toggle])), qr("dragleave", o([e, Hm.toggle])), qr("dragover", e), qr("drop", o([e, i])), qr(jt(), u)])]),
                                components: [{
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-dropzone"],
                                        styles: {}
                                    },
                                    components: [{
                                        dom: {
                                            tag: "p",
                                            innerHtml: n.translate("Drop an image here")
                                        }
                                    }, Qm.sketch({
                                        dom: {
                                            tag: "button",
                                            innerHtml: n.translate("Browse for an image"),
                                            styles: {
                                                position: "relative"
                                            },
                                            classes: ["tox-button", "tox-button--secondary"]
                                        },
                                        components: [c.asSpec()],
                                        action: function(t) {
                                            c.get(t).element().dom().click()
                                        },
                                        buttonBehaviours: Ru([nb.config({})])
                                    })]
                                }]
                            }
                        }
                    }
                });
            return Mp(t, s, ["tox-form__group--stretched"])
        },
        lw = Ye("alloy-fake-before-tabstop"),
        fw = Ye("alloy-fake-after-tabstop"),
        dw = function(t) {
            return {
                dom: {
                    tag: "div",
                    styles: {
                        width: "1px",
                        height: "1px",
                        outline: "none"
                    },
                    attributes: {
                        tabindex: "0"
                    },
                    classes: t
                },
                behaviours: Ru([gm.config({
                    ignore: !0
                }), nb.config({})])
            }
        },
        mw = function(t, n) {
            Er(t, Rt(), {
                raw: {
                    which: 9,
                    shiftKey: n
                }
            })
        },
        hw = function(t) {
            return lv(t, ["." + lw, "." + fw].join(","), Z(!1))
        },
        gw = function(t, n) {
            var e = n.element();
            ji(e, lw) ? mw(t, !0) : ji(e, fw) && mw(t, !1)
        },
        vw = function(t) {
            return {
                dom: {
                    tag: "div",
                    classes: ["tox-navobj"]
                },
                components: [dw([lw]), t, dw([fw])],
                behaviours: Ru([Zx(1)])
            }
        },
        pw = !(yn.detect().browser.isIE() || yn.detect().browser.isEdge()),
        bw = function(t, n) {
            var o, r, e = pw && t.sandboxed,
                i = Ke({}, t.label.map(function(t) {
                    return {
                        title: t
                    }
                }).getOr({}), e ? {
                    sandbox: "allow-scripts"
                } : {}),
                u = (o = e, r = Ot(""), {
                    getValue: function(t) {
                        return r.get()
                    },
                    setValue: function(t, n) {
                        if (o) Ee(t.element(), "src", "data:text/html;charset=utf-8," + encodeURIComponent(n));
                        else {
                            Ee(t.element(), "src", "javascript:''");
                            var e = t.element().dom().contentWindow.document;
                            e.open(), e.write(n), e.close()
                        }
                        r.set(n)
                    }
                }),
                a = t.label.map(function(t) {
                    return Tp(t, n)
                }),
                c = Yv.parts().field({
                    factory: {
                        sketch: function(t) {
                            return vw({
                                uid: t.uid,
                                dom: {
                                    tag: "iframe",
                                    attributes: i
                                },
                                behaviours: Ru([nb.config({}), gm.config({}), uw(tt.none(), u.getValue, u.setValue)])
                            })
                        }
                    }
                });
            return Mp(a, c, ["tox-form__group--stretched"])
        };

    function yw(t, n) {
        return ww(document.createElement("canvas"), t, n)
    }

    function xw(t) {
        return t.getContext("2d")
    }

    function ww(t, n, e) {
        return t.width = n, t.height = e, t
    }
    var zw = {
            create: yw,
            clone: function kE(t) {
                var n;
                return xw(n = yw(t.width, t.height)).drawImage(t, 0, 0), n
            },
            resize: ww,
            get2dContext: xw,
            get3dContext: function CE(t) {
                var n = null;
                try {
                    n = t.getContext("webgl") || t.getContext("experimental-webgl")
                } catch (e) {}
                return n || (n = null), n
            }
        },
        Sw = {
            getWidth: function OE(t) {
                return t.naturalWidth || t.width
            },
            getHeight: function ME(t) {
                return t.naturalHeight || t.height
            }
        },
        kw = window.Promise ? window.Promise : function() {
            var t = function(t) {
                    if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof t) throw new TypeError("not a function");
                    this._state = null, this._value = null, this._deferreds = [], s(t, o(r, this), o(u, this))
                },
                n = t.immediateFn || "function" == typeof window.setImmediate && window.setImmediate || function(t) {
                    setTimeout(t, 1)
                };

            function o(t, n) {
                return function() {
                    t.apply(n, arguments)
                }
            }
            var e = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            };

            function i(o) {
                var r = this;
                null !== this._state ? n(function() {
                    var t = r._state ? o.onFulfilled : o.onRejected;
                    if (null !== t) {
                        var n;
                        try {
                            n = t(r._value)
                        } catch (e) {
                            return void o.reject(e)
                        }
                        o.resolve(n)
                    } else(r._state ? o.resolve : o.reject)(r._value)
                }) : this._deferreds.push(o)
            }

            function r(t) {
                try {
                    if (t === this) throw new TypeError("A promise cannot be resolved with itself.");
                    if (t && ("object" == typeof t || "function" == typeof t)) {
                        var n = t.then;
                        if ("function" == typeof n) return void s(o(n, t), o(r, this), o(u, this))
                    }
                    this._state = !0, this._value = t, a.call(this)
                } catch (e) {
                    u.call(this, e)
                }
            }

            function u(t) {
                this._state = !1, this._value = t, a.call(this)
            }

            function a() {
                for (var t = 0, n = this._deferreds.length; t < n; t++) i.call(this, this._deferreds[t]);
                this._deferreds = null
            }

            function c(t, n, e, o) {
                this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof n ? n : null, this.resolve = e, this.reject = o
            }

            function s(t, n, e) {
                var o = !1;
                try {
                    t(function(t) {
                        o || (o = !0, n(t))
                    }, function(t) {
                        o || (o = !0, e(t))
                    })
                } catch (r) {
                    if (o) return;
                    o = !0, e(r)
                }
            }
            return t.prototype["catch"] = function(t) {
                return this.then(null, t)
            }, t.prototype.then = function(e, o) {
                var r = this;
                return new t(function(t, n) {
                    i.call(r, new c(e, o, t, n))
                })
            }, t.all = function() {
                var c = Array.prototype.slice.call(1 === arguments.length && e(arguments[0]) ? arguments[0] : arguments);
                return new t(function(r, i) {
                    if (0 === c.length) return r([]);
                    var u = c.length;

                    function a(n, t) {
                        try {
                            if (t && ("object" == typeof t || "function" == typeof t)) {
                                var e = t.then;
                                if ("function" == typeof e) return void e.call(t, function(t) {
                                    a(n, t)
                                }, i)
                            }
                            c[n] = t, 0 == --u && r(c)
                        } catch (o) {
                            i(o)
                        }
                    }
                    for (var t = 0; t < c.length; t++) a(t, c[t])
                })
            }, t.resolve = function(n) {
                return n && "object" == typeof n && n.constructor === t ? n : new t(function(t) {
                    t(n)
                })
            }, t.reject = function(e) {
                return new t(function(t, n) {
                    n(e)
                })
            }, t.race = function(r) {
                return new t(function(t, n) {
                    for (var e = 0, o = r.length; e < o; e++) r[e].then(t, n)
                })
            }, t
        }();

    function Cw() {
        return new(Qn.getOrDie("FileReader"))
    }
    var Ow = {
        atob: function(t) {
            return Qn.getOrDie("atob")(t)
        },
        requestAnimationFrame: function(t) {
            Qn.getOrDie("requestAnimationFrame")(t)
        }
    };

    function Mw(a) {
        return new kw(function(t, n) {
            var e = URL.createObjectURL(a),
                o = new Image,
                r = function() {
                    o.removeEventListener("load", i), o.removeEventListener("error", u)
                };

            function i() {
                r(), t(o)
            }

            function u() {
                r(), n("Unable to load data of type " + a.type + ": " + e)
            }
            o.addEventListener("load", i), o.addEventListener("error", u), o.src = e, o.complete && i()
        })
    }

    function Hw(o) {
        return new kw(function(t, e) {
            var n = new XMLHttpRequest;
            n.open("GET", o, !0), n.responseType = "blob", n.onload = function() {
                200 == this.status && t(this.response)
            }, n.onerror = function() {
                var t, n = this;
                e(0 === this.status ? ((t = new Error("No access to download image")).code = 18, t.name = "SecurityError", t) : new Error("Error " + n.status + " downloading image"))
            }, n.send()
        })
    }

    function Ew(t) {
        var n = t.split(","),
            e = /data:([^;]+)/.exec(n[0]);
        if (!e) return tt.none();
        for (var o, r = e[1], i = n[1], u = Ow.atob(i), a = u.length, c = Math.ceil(a / 1024), s = new Array(c), l = 0; l < c; ++l) {
            for (var f = 1024 * l, d = Math.min(f + 1024, a), m = new Array(d - f), h = f, g = 0; h < d; ++g, ++h) m[g] = u[h].charCodeAt(0);
            s[l] = (o = m, new(Qn.getOrDie("Uint8Array"))(o))
        }
        return tt.some(function v(t, n) {
            return new(Qn.getOrDie("Blob"))(t, n)
        }(s, {
            type: r
        }))
    }

    function Vw(e) {
        return new kw(function(t, n) {
            Ew(e).fold(function() {
                n("uri is not base64: " + e)
            }, t)
        })
    }

    function Tw(e) {
        return new kw(function(t) {
            var n = Cw();
            n.onloadend = function() {
                t(n.result)
            }, n.readAsDataURL(e)
        })
    }
    var Aw = {
        blobToImage: Mw,
        imageToBlob: function HE(t) {
            var n = t.src;
            return 0 === n.indexOf("data:") ? Vw(n) : Hw(n)
        },
        blobToArrayBuffer: function EE(e) {
            return new kw(function(t) {
                var n = Cw();
                n.onloadend = function() {
                    t(n.result)
                }, n.readAsArrayBuffer(e)
            })
        },
        blobToDataUri: Tw,
        blobToBase64: function VE(t) {
            return Tw(t).then(function(t) {
                return t.split(",")[1]
            })
        },
        dataUriToBlobSync: Ew,
        canvasToBlob: function TE(t, e, o) {
            return e = e || "image/png", HTMLCanvasElement.prototype.toBlob ? new kw(function(n) {
                t.toBlob(function(t) {
                    n(t)
                }, e, o)
            }) : Vw(t.toDataURL(e, o))
        },
        canvasToDataURL: function AE(t, n, e) {
            return n = n || "image/png", t.then(function(t) {
                return t.toDataURL(n, e)
            })
        },
        blobToCanvas: function BE(t) {
            return Mw(t).then(function(t) {
                var n;
                return function e(t) {
                    URL.revokeObjectURL(t.src)
                }(t), n = zw.create(Sw.getWidth(t), Sw.getHeight(t)), zw.get2dContext(n).drawImage(t, 0, 0), n
            })
        },
        uriToBlob: function DE(t) {
            return 0 === t.indexOf("blob:") ? Hw(t) : 0 === t.indexOf("data:") ? Vw(t) : null
        }
    };

    function Bw(t, n, e) {
        var o = n.type;

        function r(n, e) {
            return t.then(function(t) {
                return Aw.canvasToDataURL(t, n, e)
            })
        }
        return {
            getType: Z(o),
            toBlob: function i() {
                return kw.resolve(n)
            },
            toDataURL: function u() {
                return e
            },
            toBase64: function a() {
                return e.split(",")[1]
            },
            toAdjustedBlob: function c(n, e) {
                return t.then(function(t) {
                    return Aw.canvasToBlob(t, n, e)
                })
            },
            toAdjustedDataURL: r,
            toAdjustedBase64: function s(t, n) {
                return r(t, n).then(function(t) {
                    return t.split(",")[1]
                })
            },
            toCanvas: function l() {
                return t.then(zw.clone)
            }
        }
    }

    function Dw(n) {
        return Aw.blobToDataUri(n).then(function(t) {
            return Bw(Aw.blobToCanvas(n), n, t)
        })
    }
    var _w = {
            fromBlob: Dw,
            fromCanvas: function _E(n, t) {
                return Aw.canvasToBlob(n, t).then(function(t) {
                    return Bw(kw.resolve(n), t, n.toDataURL())
                })
            },
            fromImage: function FE(t) {
                return Aw.imageToBlob(t).then(function(t) {
                    return Dw(t)
                })
            },
            fromBlobAndUrlSync: function(t, n) {
                return Bw(Aw.blobToCanvas(t), t, n)
            }
        },
        Fw = function(t) {
            return _w.fromBlob(t)
        };

    function Iw(t, n, e) {
        return e < (t = parseFloat(t)) ? t = e : t < n && (t = n), t
    }
    var Lw = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10];

    function Rw(t, n) {
        var e, o, r, i, u = [],
            a = new Array(10);
        for (e = 0; e < 5; e++) {
            for (o = 0; o < 5; o++) u[o] = n[o + 5 * e];
            for (o = 0; o < 5; o++) {
                for (r = i = 0; r < 5; r++) i += t[o + 5 * r] * u[r];
                a[o + 5 * e] = i
            }
        }
        return a
    }

    function Nw(t, e) {
        return e = Iw(e, 0, 1), t.map(function(t, n) {
            return n % 6 == 0 ? t = 1 - (1 - t) * e : t *= e, Iw(t, 0, 1)
        })
    }
    var Pw = {
        identity: function IE() {
            return [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]
        },
        adjust: Nw,
        multiply: Rw,
        adjustContrast: function LE(t, n) {
            var e;
            return n = Iw(n, -1, 1), Rw(t, [(e = (n *= 100) < 0 ? 127 + n / 100 * 127 : 127 * (e = 0 == (e = n % 1) ? Lw[n] : Lw[Math.floor(n)] * (1 - e) + Lw[Math.floor(n) + 1] * e) + 127) / 127, 0, 0, 0, .5 * (127 - e), 0, e / 127, 0, 0, .5 * (127 - e), 0, 0, e / 127, 0, .5 * (127 - e), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustBrightness: function RE(t, n) {
            return Rw(t, [1, 0, 0, 0, n = Iw(255 * n, -255, 255), 0, 1, 0, 0, n, 0, 0, 1, 0, n, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustSaturation: function NE(t, n) {
            var e;
            return Rw(t, [.3086 * (1 - (e = 1 + (0 < (n = Iw(n, -1, 1)) ? 3 * n : n))) + e, .6094 * (1 - e), .082 * (1 - e), 0, 0, .3086 * (1 - e), .6094 * (1 - e) + e, .082 * (1 - e), 0, 0, .3086 * (1 - e), .6094 * (1 - e), .082 * (1 - e) + e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustHue: function PE(t, n) {
            var e, o;
            return n = Iw(n, -180, 180) / 180 * Math.PI, Rw(t, [.213 + .787 * (e = Math.cos(n)) + -.213 * (o = Math.sin(n)), .715 + -.715 * e + -.715 * o, .072 + -.072 * e + .928 * o, 0, 0, .213 + -.213 * e + .143 * o, .715 + e * (1 - .715) + .14 * o, .072 + -.072 * e + -.283 * o, 0, 0, .213 + -.213 * e + -.787 * o, .715 + -.715 * e + .715 * o, .072 + .928 * e + .072 * o, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustColors: function jE(t, n, e, o) {
            return Rw(t, [n = Iw(n, 0, 2), 0, 0, 0, 0, 0, e = Iw(e, 0, 2), 0, 0, 0, 0, 0, o = Iw(o, 0, 2), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        },
        adjustSepia: function UE(t, n) {
            return Rw(t, Nw([.393, .769, .189, 0, 0, .349, .686, .168, 0, 0, .272, .534, .131, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], n = Iw(n, 0, 1)))
        },
        adjustGrayscale: function WE(t, n) {
            return Rw(t, Nw([.33, .34, .33, 0, 0, .33, .34, .33, 0, 0, .33, .34, .33, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], n = Iw(n, 0, 1)))
        }
    };

    function jw(n, e) {
        return n.toCanvas().then(function(t) {
            return function i(t, n, e) {
                var o, r = zw.get2dContext(t);
                return o = function H(t, n) {
                    var e, o, r, i, u, a = t.data,
                        c = n[0],
                        s = n[1],
                        l = n[2],
                        f = n[3],
                        d = n[4],
                        m = n[5],
                        h = n[6],
                        g = n[7],
                        v = n[8],
                        p = n[9],
                        b = n[10],
                        y = n[11],
                        x = n[12],
                        w = n[13],
                        z = n[14],
                        S = n[15],
                        k = n[16],
                        C = n[17],
                        O = n[18],
                        M = n[19];
                    for (u = 0; u < a.length; u += 4) e = a[u], o = a[u + 1], r = a[u + 2], i = a[u + 3], a[u] = e * c + o * s + r * l + i * f + d, a[u + 1] = e * m + o * h + r * g + i * v + p, a[u + 2] = e * b + o * y + r * x + i * w + z, a[u + 3] = e * S + o * k + r * C + i * O + M;
                    return t
                }(r.getImageData(0, 0, t.width, t.height), e), r.putImageData(o, 0, 0), _w.fromCanvas(t, n)
            }(t, n.getType(), e)
        })
    }

    function Uw(n, e) {
        return n.toCanvas().then(function(t) {
            return function u(t, n, e) {
                var o, r, i = zw.get2dContext(t);
                return o = i.getImageData(0, 0, t.width, t.height), r = i.getImageData(0, 0, t.width, t.height), r = function w(t, n, e) {
                    var o, r, i, u, a, c, s, l, f, d, m, h, g, v, p, b, y;

                    function x(t, n, e) {
                        return e < t ? t = e : t < n && (t = n), t
                    }
                    for (i = Math.round(Math.sqrt(e.length)), u = Math.floor(i / 2), o = t.data, r = n.data, b = t.width, y = t.height, c = 0; c < y; c++)
                        for (a = 0; a < b; a++) {
                            for (s = l = f = 0, m = 0; m < i; m++)
                                for (d = 0; d < i; d++) h = x(a + d - u, 0, b - 1), g = x(c + m - u, 0, y - 1), v = 4 * (g * b + h), p = e[m * i + d], s += o[v] * p, l += o[v + 1] * p, f += o[v + 2] * p;
                            r[v = 4 * (c * b + a)] = x(s, 0, 255), r[v + 1] = x(l, 0, 255), r[v + 2] = x(f, 0, 255)
                        }
                    return n
                }(o, r, e), i.putImageData(r, 0, 0), _w.fromCanvas(t, n)
            }(t, n.getType(), e)
        })
    }

    function Ww(c) {
        return function(n, e) {
            return n.toCanvas().then(function(t) {
                return function(t, n, e) {
                    var o, r, i = zw.get2dContext(t),
                        u = new Array(256);
                    for (r = 0; r < u.length; r++) u[r] = c(r, e);
                    return o = function a(t, n) {
                        var e, o = t.data;
                        for (e = 0; e < o.length; e += 4) o[e] = n[o[e]], o[e + 1] = n[o[e + 1]], o[e + 2] = n[o[e + 2]];
                        return t
                    }(i.getImageData(0, 0, t.width, t.height), u), i.putImageData(o, 0, 0), _w.fromCanvas(t, n)
                }(t, n.getType(), e)
            })
        }
    }

    function Gw(e) {
        return function(t, n) {
            return jw(t, e(Pw.identity(), n))
        }
    }

    function Xw(n) {
        return function(t) {
            return Uw(t, n)
        }
    }
    var Yw = {
            invert: function GE(n) {
                return function(t) {
                    return jw(t, n)
                }
            }([-1, 0, 0, 0, 255, 0, -1, 0, 0, 255, 0, 0, -1, 0, 255, 0, 0, 0, 1, 0]),
            brightness: Gw(Pw.adjustBrightness),
            hue: Gw(Pw.adjustHue),
            saturate: Gw(Pw.adjustSaturation),
            contrast: Gw(Pw.adjustContrast),
            grayscale: Gw(Pw.adjustGrayscale),
            sepia: Gw(Pw.adjustSepia),
            colorize: function(t, n, e, o) {
                return jw(t, Pw.adjustColors(Pw.identity(), n, e, o))
            },
            sharpen: Xw([0, -1, 0, -1, 5, -1, 0, -1, 0]),
            emboss: Xw([-2, -1, 0, -1, 1, 1, 0, 1, 2]),
            gamma: Ww(function(t, n) {
                return 255 * Math.pow(t / 255, 1 - n)
            }),
            exposure: Ww(function(t, n) {
                return 255 * (1 - Math.exp(-t / 255 * n))
            }),
            colorFilter: jw,
            convoluteFilter: Uw
        },
        qw = {
            scale: function XE(t, n, e) {
                var o = Sw.getWidth(t),
                    r = Sw.getHeight(t),
                    i = n / o,
                    u = e / r,
                    a = !1;
                (i < .5 || 2 < i) && (i = i < .5 ? .5 : 2, a = !0), (u < .5 || 2 < u) && (u = u < .5 ? .5 : 2, a = !0);
                var c = function l(a, c, s) {
                    return new kw(function(t) {
                        var n = Sw.getWidth(a),
                            e = Sw.getHeight(a),
                            o = Math.floor(n * c),
                            r = Math.floor(e * s),
                            i = zw.create(o, r),
                            u = zw.get2dContext(i);
                        u.drawImage(a, 0, 0, n, e, 0, 0, o, r), t(i)
                    })
                }(t, i, u);
                return a ? c.then(function(t) {
                    return XE(t, n, e)
                }) : c
            }
        },
        Kw = {
            rotate: function YE(n, e) {
                return n.toCanvas().then(function(t) {
                    return function a(t, n, e) {
                        var o = zw.create(t.width, t.height),
                            r = zw.get2dContext(o),
                            i = 0,
                            u = 0;
                        return 90 != (e = e < 0 ? 360 + e : e) && 270 != e || zw.resize(o, o.height, o.width), 90 != e && 180 != e || (i = o.width), 270 != e && 180 != e || (u = o.height), r.translate(i, u), r.rotate(e * Math.PI / 180), r.drawImage(t, 0, 0), _w.fromCanvas(o, n)
                    }(t, n.getType(), e)
                })
            },
            flip: function qE(n, e) {
                return n.toCanvas().then(function(t) {
                    return function i(t, n, e) {
                        var o = zw.create(t.width, t.height),
                            r = zw.get2dContext(o);
                        return "v" == e ? (r.scale(1, -1), r.drawImage(t, 0, -o.height)) : (r.scale(-1, 1), r.drawImage(t, -o.width, 0)), _w.fromCanvas(o, n)
                    }(t, n.getType(), e)
                })
            },
            crop: function KE(n, e, o, r, i) {
                return n.toCanvas().then(function(t) {
                    return function a(t, n, e, o, r, i) {
                        var u = zw.create(r, i);
                        return zw.get2dContext(u).drawImage(t, -e, -o), _w.fromCanvas(u, n)
                    }(t, n.getType(), e, o, r, i)
                })
            },
            resize: function JE(n, e, o) {
                return n.toCanvas().then(function(t) {
                    return qw.scale(t, e, o).then(function(t) {
                        return _w.fromCanvas(t, n.getType())
                    })
                })
            }
        },
        Jw = (function() {
            function t(t) {
                this.littleEndian = !1, this._dv = new DataView(t)
            }
            t.prototype.readByteAt = function(t) {
                return this._dv.getUint8(t)
            }, t.prototype.read = function(t, n) {
                if (t + n > this.length()) return null;
                for (var e = this.littleEndian ? 0 : -8 * (n - 1), o = 0, r = 0; o < n; o++) r |= this.readByteAt(t + o) << Math.abs(e + 8 * o);
                return r
            }, t.prototype.BYTE = function(t) {
                return this.read(t, 1)
            }, t.prototype.SHORT = function(t) {
                return this.read(t, 2)
            }, t.prototype.LONG = function(t) {
                return this.read(t, 4)
            }, t.prototype.SLONG = function(t) {
                var n = this.read(t, 4);
                return 2147483647 < n ? n - 4294967296 : n
            }, t.prototype.CHAR = function(t) {
                return String.fromCharCode(this.read(t, 1))
            }, t.prototype.STRING = function(t, n) {
                return this.asArray("CHAR", t, n).join("")
            }, t.prototype.SEGMENT = function(t, n) {
                var e = this._dv.buffer;
                switch (arguments.length) {
                    case 2:
                        return e.slice(t, t + n);
                    case 1:
                        return e.slice(t);
                    default:
                        return e
                }
            }, t.prototype.asArray = function(t, n, e) {
                for (var o = [], r = 0; r < e; r++) o[r] = this[t](n + r);
                return o
            }, t.prototype.length = function() {
                return this._dv ? this._dv.byteLength : 0
            }
        }(), function(t, n) {
            return Kw.rotate(t, n)
        }),
        $w = function(t) {
            return Yw.invert(t)
        },
        Qw = function(t) {
            return Yw.sharpen(t)
        },
        Zw = function(t, n) {
            return Yw.brightness(t, n)
        },
        tz = function(t, n) {
            return Yw.contrast(t, n)
        },
        nz = function(t, n, e, o) {
            return Yw.colorize(t, n, e, o)
        },
        ez = function(t, n) {
            return Yw.gamma(t, n)
        },
        oz = function(t, n) {
            return Kw.flip(t, n)
        },
        rz = function(t, n, e, o, r) {
            return Kw.crop(t, n, e, o, r)
        },
        iz = function(t, n, e) {
            return Kw.resize(t, n, e)
        },
        uz = Jw,
        az = function(t, n) {
            return Ke({
                dom: {
                    tag: "span",
                    innerHtml: t,
                    classes: ["tox-icon", "tox-tbtn__icon-wrap"]
                }
            }, n)
        },
        cz = function(t, n) {
            return az(eh(t, n), {})
        },
        sz = function(t, n) {
            return az(eh(t, n), {
                behaviours: Ru([$d.config({})])
            })
        },
        lz = function(t, n, e) {
            return {
                dom: {
                    tag: "span",
                    innerHtml: e.translate(t),
                    classes: [n + "__select-label"]
                },
                behaviours: Ru([$d.config({})])
            }
        },
        fz = function(t, n, e, o, r) {
            void 0 === e && (e = []);
            var i = {
                    buttonBehaviours: Ru([vg(t.disabled), nb.config({}), _m("button press", [Yr("click"), Yr("mousedown")])].concat(e)),
                    eventOrder: {
                        click: ["button press", "alloy.base.behaviour"],
                        mousedown: ["button press", "alloy.base.behaviour"]
                    },
                    action: n
                },
                u = vt(i, {
                    dom: o
                }),
                a = vt(u, {
                    components: r
                });
            return Qm.sketch(a)
        },
        dz = function(t, n, e, o) {
            void 0 === o && (o = []);
            var r = {
                    tag: "button",
                    classes: ["tox-tbtn"],
                    attributes: t.tooltip.map(function(t) {
                        return {
                            "aria-label": e.translate(t),
                            title: e.translate(t)
                        }
                    }).getOr({})
                },
                i = t.icon.map(function(t) {
                    return cz(t, e.icons)
                }),
                u = Cg([i]);
            return fz(t, n, o, r, u)
        },
        mz = function(t, n, e, o) {
            void 0 === o && (o = []);
            var r = e.translate(t.text),
                i = t.icon ? t.icon.map(function(t) {
                    return cz(t, e.icons)
                }) : tt.none(),
                u = i.isSome() ? Cg([i]) : [],
                a = i.isSome() ? {} : {
                    innerHtml: r
                },
                c = (t.primary ? ["tox-button"] : ["tox-button", "tox-button--secondary"]).concat(i.isSome() ? ["tox-button--icon"] : []),
                s = Ke({
                    tag: "button",
                    classes: c
                }, a, {
                    attributes: {
                        title: r
                    }
                });
            return fz(t, n, o, s, u)
        },
        hz = function(n, e) {
            return function(t) {
                "custom" === e ? Er(t, Rv, {
                    name: n,
                    value: {}
                }) : "submit" === e ? Hr(t, Nv) : "cancel" === e ? Hr(t, Lv) : console.error("Unknown button type: ", e)
            }
        },
        gz = function(t, n, e) {
            var o = hz(t.name, n);
            return mz(t, o, e, [])
        },
        vz = Z([vr("field1Name", "field1"), vr("field2Name", "field2"), Eu("onLockedChange"), Cu(["lockClass"]), vr("locked", !1), Is("coupledFieldBehaviours", [Pl, lm])]),
        pz = function(t, i) {
            return cl({
                factory: Yv,
                name: t,
                overrides: function(r) {
                    return {
                        fieldBehaviours: Ru([_m("coupled-input-behaviour", [qr(Pt(), function(e) {
                            var t, n, o;
                            (t = e, n = r, o = i, zl(t, n, o).bind(Pl.getCurrent)).each(function(n) {
                                zl(e, r, "lock").each(function(t) {
                                    Hm.isOn(t) && r.onLockedChange(e, n, t)
                                })
                            })
                        })])])
                    }
                }
            })
        },
        bz = Z([pz("field1", "field2"), pz("field2", "field1"), cl({
            factory: Qm,
            schema: [or("dom")],
            name: "lock",
            overrides: function(t) {
                return {
                    buttonBehaviours: Ru([Hm.config({
                        selected: t.locked,
                        toggleClass: t.markers.lockClass,
                        aria: {
                            mode: "pressed"
                        }
                    })])
                }
            }
        })]),
        yz = Il({
            name: "FormCoupledInputs",
            configFields: vz(),
            partFields: bz(),
            factory: function(o, t, n, e) {
                return {
                    uid: o.uid,
                    dom: o.dom,
                    components: t,
                    behaviours: Ls(o.coupledFieldBehaviours, [Pl.config({
                        find: tt.some
                    }), lm.config({
                        store: {
                            mode: "manual",
                            getValue: function(t) {
                                var n, e = Ml(t, o, ["field1", "field2"]);
                                return (n = {})[o.field1Name] = lm.getValue(e.field1()), n[o.field2Name] = lm.getValue(e.field2()), n
                            },
                            setValue: function(t, n) {
                                var e = Ml(t, o, ["field1", "field2"]);
                                Ct(n, o.field1Name) && lm.setValue(e.field1(), n[o.field1Name]), Ct(n, o.field2Name) && lm.setValue(e.field2(), n[o.field2Name])
                            }
                        }
                    })]),
                    apis: {
                        getField1: function(t) {
                            return zl(t, o, "field1")
                        },
                        getField2: function(t) {
                            return zl(t, o, "field2")
                        },
                        getLock: function(t) {
                            return zl(t, o, "lock")
                        }
                    }
                }
            },
            apis: {
                getField1: function(t, n) {
                    return t.getField1(n)
                },
                getField2: function(t, n) {
                    return t.getField2(n)
                },
                getLock: function(t, n) {
                    return t.getLock(n)
                }
            }
        }),
        xz = function(t) {
            var n = /^\s*(\d+(?:\.\d+)?)\s*(|cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax|%)\s*$/.exec(t);
            if (null === n) return dt.error(t);
            var e = parseFloat(n[1]),
                o = n[2];
            return dt.value({
                value: e,
                unit: o
            })
        },
        wz = function(t, n) {
            var e = {
                    "": 96,
                    px: 96,
                    pt: 72,
                    cm: 2.54,
                    pc: 12,
                    mm: 25.4,
                    "in": 1
                },
                o = function(t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                };
            return t.unit === n ? tt.some(t.value) : o(t.unit) && o(n) ? e[t.unit] === e[n] ? tt.some(t.value) : tt.some(t.value / e[t.unit] * e[n]) : tt.none()
        },
        zz = function(t) {
            return tt.none()
        },
        Sz = function(t, n) {
            return function(t, n) {
                for (var e = [], o = 0; o < t.length; o++) {
                    var r = t[o];
                    if (!r.isSome()) return tt.none();
                    e.push(r.getOrDie())
                }
                return tt.some(n.apply(null, e))
            }([xz(t).toOption(), xz(n).toOption()], function(t, o) {
                return wz(t, o.unit).map(function(t) {
                    return o.value / t
                }).map(function(t) {
                    return n = t, e = o.unit,
                        function(t) {
                            return wz(t, e).map(function(t) {
                                return {
                                    value: t * n,
                                    unit: e
                                }
                            })
                        };
                    var n, e
                }).getOr(zz)
            }).getOr(zz)
        },
        kz = function(o, n) {
            var a = zz,
                r = Ye("ratio-event"),
                t = yz.parts().lock({
                    dom: {
                        tag: "button",
                        classes: ["tox-lock", "tox-button", "tox-button--naked", "tox-button--icon"],
                        attributes: {
                            title: n.translate(o.label.getOr("Constrain proportions"))
                        }
                    },
                    components: [{
                        dom: {
                            tag: "span",
                            classes: ["tox-icon", "tox-lock-icon__lock"],
                            innerHtml: eh("lock", n.icons)
                        }
                    }, {
                        dom: {
                            tag: "span",
                            classes: ["tox-icon", "tox-lock-icon__unlock"],
                            innerHtml: eh("unlock", n.icons)
                        }
                    }],
                    buttonBehaviours: Ru([nb.config({})])
                }),
                e = function(t) {
                    return {
                        dom: {
                            tag: "div",
                            classes: ["tox-form__group"]
                        },
                        components: t
                    }
                },
                i = function(e) {
                    return Yv.parts().field({
                        factory: Lp,
                        inputClasses: ["tox-textfield"],
                        inputBehaviours: Ru([nb.config({}), _m("size-input-events", [qr(It(), function(t, n) {
                            Er(t, r, {
                                isField1: e
                            })
                        }), qr(jt(), function(t, n) {
                            Er(t, Fv, {
                                name: o.name
                            })
                        })])]),
                        selectOnFocus: !1
                    })
                },
                u = function(t) {
                    return {
                        dom: {
                            tag: "label",
                            classes: ["tox-label"],
                            innerHtml: n.translate(t)
                        }
                    }
                },
                c = yz.parts().field1(e([Yv.parts().label(u("Width")), i(!0)])),
                s = yz.parts().field2(e([Yv.parts().label(u("Height")), i(!1)]));
            return yz.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-form__group"]
                },
                components: [{
                    dom: {
                        tag: "div",
                        classes: ["tox-form__controls-h-stack"]
                    },
                    components: [c, s, e([u("&nbsp;"), t])]
                }],
                field1Name: "width",
                field2Name: "height",
                locked: !0,
                markers: {
                    lockClass: "tox-locked"
                },
                onLockedChange: function(t, i, n) {
                    xz(lm.getValue(t)).each(function(t) {
                        a(t).each(function(t) {
                            var n, e, o, r;
                            lm.setValue(i, (o = {
                                "": 0,
                                px: 0,
                                pt: 1,
                                mm: 1,
                                pc: 2,
                                ex: 2,
                                em: 2,
                                ch: 2,
                                rem: 2,
                                cm: 3,
                                "in": 4,
                                "%": 4
                            }, -1 !== (r = (n = t).value.toFixed((e = n.unit) in o ? o[e] : 1)).indexOf(".") && (r = r.replace(/\.?0*$/, "")), r + n.unit))
                        })
                    })
                },
                coupledFieldBehaviours: Ru([Ph.config({}), _m("size-input-events2", [qr(r, function(t, n) {
                    var e = n.event().isField1(),
                        o = e ? yz.getField1(t) : yz.getField2(t),
                        r = e ? yz.getField2(t) : yz.getField1(t),
                        i = o.map(lm.getValue).getOr(""),
                        u = r.map(lm.getValue).getOr("");
                    a = Sz(i, u)
                })])])
            })
        },
        Cz = {
            undo: Z(Ye("undo")),
            redo: Z(Ye("redo")),
            zoom: Z(Ye("zoom")),
            back: Z(Ye("back")),
            apply: Z(Ye("apply")),
            swap: Z(Ye("swap")),
            transform: Z(Ye("transform")),
            tempTransform: Z(Ye("temp-transform")),
            transformApply: Z(Ye("transform-apply"))
        },
        Oz = Z("save-state"),
        Mz = Z("disable"),
        Hz = Z("enable"),
        Ez = {
            formActionEvent: Rv,
            saveState: Oz,
            disable: Mz,
            enable: Hz
        },
        Vz = function(r, c) {
            var t = function(t, n, e, o) {
                    return Zm(mz({
                        name: t,
                        text: t,
                        disabled: e,
                        primary: o
                    }, n, c))
                },
                n = function(t, n, e, o) {
                    return Zm(dz({
                        name: t,
                        icon: tt.some(t),
                        tooltip: tt.some(n),
                        disabled: o
                    }, e, c))
                },
                u = function(t, e) {
                    t.map(function(t) {
                        var n = t.get(e);
                        n.hasConfigured(Ph) && Ph.disable(n)
                    })
                },
                a = function(t, e) {
                    t.map(function(t) {
                        var n = t.get(e);
                        n.hasConfigured(Ph) && Ph.enable(n)
                    })
                },
                s = {
                    tag: "div",
                    classes: ["tox-image-tools__toolbar", "tox-image-tools-edit-panel"]
                },
                e = tt.none(),
                o = Q,
                i = function(t, n, e) {
                    Er(t, n, e)
                },
                l = function(t) {
                    return Hr(t, Ez.disable())
                },
                f = function(t) {
                    return Hr(t, Ez.enable())
                },
                d = function(t, n) {
                    l(t), i(t, Cz.transform(), {
                        transform: n
                    }), f(t)
                },
                m = function(t) {
                    return function() {
                        $.getOpt(t).each(function(t) {
                            $d.set(t, [K])
                        })
                    }
                },
                h = function(t, n) {
                    l(t), i(t, Cz.transformApply(), {
                        transform: n,
                        swap: m(t)
                    }), f(t)
                },
                g = function() {
                    return t("Back", function(t) {
                        return i(t, Cz.back(), {
                            swap: m(t)
                        })
                    }, !1, !1)
                },
                v = function() {
                    return Zm({
                        dom: {
                            tag: "div",
                            classes: ["tox-spacer"]
                        },
                        behaviours: Ru([Ph.config({})])
                    })
                },
                p = function() {
                    return t("Apply", function(t) {
                        return i(t, Cz.apply(), {
                            swap: m(t)
                        })
                    }, !0, !0)
                },
                b = [g(), v(), t("Apply", function(t) {
                    h(t, function(t) {
                        var n = r.getRect();
                        return rz(t, n.x, n.y, n.w, n.h)
                    }), r.hideCrop()
                }, !1, !0)],
                y = Ev.sketch({
                    dom: s,
                    components: b.map(function(t) {
                        return t.asSpec()
                    }),
                    containerBehaviours: Ru([_m("image-tools-crop-buttons-events", [qr(Ez.disable(), function(t, n) {
                        u(b, t)
                    }), qr(Ez.enable(), function(t, n) {
                        a(b, t)
                    })])])
                }),
                x = Zm(kz({
                    name: "size",
                    label: e,
                    type: "sizeinput",
                    constrain: !0
                }, c)),
                w = [g(), v(), x, v(), t("Apply", function(a) {
                    x.getOpt(a).each(function(t) {
                        var n, e, o = lm.getValue(t),
                            r = parseInt(o.width, 10),
                            i = parseInt(o.height, 10),
                            u = (n = r, e = i, function(t) {
                                return iz(t, n, e)
                            });
                        h(a, u)
                    })
                }, !1, !0)],
                z = Ev.sketch({
                    dom: s,
                    components: w.map(function(t) {
                        return t.asSpec()
                    }),
                    containerBehaviours: Ru([_m("image-tools-resize-buttons-events", [qr(Ez.disable(), function(t, n) {
                        u(w, t)
                    }), qr(Ez.enable(), function(t, n) {
                        a(w, t)
                    })])])
                }),
                S = function(n, e) {
                    return function(t) {
                        return n(t, e)
                    }
                },
                k = S(oz, "h"),
                C = S(oz, "v"),
                O = S(uz, -90),
                M = S(uz, 90),
                H = function(t, n) {
                    var e, o;
                    o = n, l(e = t), i(e, Cz.tempTransform(), {
                        transform: o
                    }), f(e)
                },
                E = [g(), v(), n("flip-horizontally", "Flip horizontally", function(t) {
                    H(t, k)
                }, !1), n("flip-vertically", "Flip vertically", function(t) {
                    H(t, C)
                }, !1), n("rotate-left", "Rotate counterclockwise", function(t) {
                    H(t, O)
                }, !1), n("rotate-right", "Rotate clockwise", function(t) {
                    H(t, M)
                }, !1), v(), p()],
                V = Ev.sketch({
                    dom: s,
                    components: E.map(function(t) {
                        return t.asSpec()
                    }),
                    containerBehaviours: Ru([_m("image-tools-fliprotate-buttons-events", [qr(Ez.disable(), function(t, n) {
                        u(E, t)
                    }), qr(Ez.enable(), function(t, n) {
                        a(E, t)
                    })])])
                }),
                T = function(t, n, e, o, r) {
                    var i = Dx.parts().label({
                            dom: {
                                tag: "label",
                                classes: ["tox-label"],
                                innerHtml: c.translate(t)
                            }
                        }),
                        u = Dx.parts().spectrum({
                            dom: {
                                tag: "div",
                                classes: ["tox-slider__rail"],
                                attributes: {
                                    role: "presentation"
                                }
                            }
                        }),
                        a = Dx.parts().thumb({
                            dom: {
                                tag: "div",
                                classes: ["tox-slider__handle"],
                                attributes: {
                                    role: "presentation"
                                }
                            }
                        });
                    return Zm(Dx.sketch({
                        dom: {
                            tag: "div",
                            classes: ["tox-slider"],
                            attributes: {
                                role: "presentation"
                            }
                        },
                        model: {
                            mode: "x",
                            minX: e,
                            maxX: r,
                            getInitialValue: Z({
                                x: Z(o)
                            })
                        },
                        components: [i, u, a],
                        sliderBehaviours: Ru([gm.config({})]),
                        onChoose: n
                    }))
                },
                A = function(t, n, e, o, r) {
                    return [g(), (i = t, u = n, a = e, c = o, s = r, T(i, function(t, n, e) {
                        var o = S(u, e.x() / 100);
                        d(t, o)
                    }, a, c, s)), p()];
                    var i, u, a, c, s
                },
                B = function(t, n, e, o, r) {
                    var i = A(t, n, e, o, r);
                    return Ev.sketch({
                        dom: s,
                        components: i.map(function(t) {
                            return t.asSpec()
                        }),
                        containerBehaviours: Ru([_m("image-tools-filter-panel-buttons-events", [qr(Ez.disable(), function(t, n) {
                            u(i, t)
                        }), qr(Ez.enable(), function(t, n) {
                            a(i, t)
                        })])])
                    })
                },
                D = [g(), v(), p()],
                _ = Ev.sketch({
                    dom: s,
                    components: D.map(function(t) {
                        return t.asSpec()
                    })
                }),
                F = B("Brightness", Zw, -100, 0, 100),
                I = B("Contrast", tz, -100, 0, 100),
                L = B("Gamma", ez, -100, 0, 100),
                R = function(t) {
                    return T(t, function(l, t, n) {
                        var e = N.getOpt(l),
                            o = j.getOpt(l),
                            r = P.getOpt(l);
                        e.each(function(s) {
                            o.each(function(c) {
                                r.each(function(t) {
                                    var n, e, o, r = lm.getValue(s).x() / 100,
                                        i = lm.getValue(t).x() / 100,
                                        u = lm.getValue(c).x() / 100,
                                        a = (n = r, e = i, o = u, function(t) {
                                            return nz(t, n, e, o)
                                        });
                                    d(l, a)
                                })
                            })
                        })
                    }, 0, 100, 200)
                },
                N = R("R"),
                P = R("G"),
                j = R("B"),
                U = [g(), N, P, j, p()],
                W = Ev.sketch({
                    dom: s,
                    components: U.map(function(t) {
                        return t.asSpec()
                    })
                }),
                G = function(n, e, o) {
                    return function(t) {
                        i(t, Cz.swap(), {
                            transform: e,
                            swap: function() {
                                $.getOpt(t).each(function(t) {
                                    $d.set(t, [n]), o(t)
                                })
                            }
                        })
                    }
                },
                X = tt.some(Qw),
                Y = tt.some($w),
                q = [n("crop", "Crop", G(y, e, function(t) {
                    r.showCrop()
                }), !1), n("resize", "Resize", G(z, e, function(t) {
                    x.getOpt(t).each(function(t) {
                        var n = r.getMeasurements(),
                            e = n.width,
                            o = n.height;
                        lm.setValue(t, {
                            width: e,
                            height: o
                        })
                    })
                }), !1), n("orientation", "Orientation", G(V, e, o), !1), n("brightness", "Brightness", G(F, e, o), !1), n("sharpen", "Sharpen", G(_, X, o), !1), n("contrast", "Contrast", G(I, e, o), !1), n("color-levels", "Color levels", G(W, e, o), !1), n("gamma", "Gamma", G(L, e, o), !1), n("invert", "Invert", G(_, Y, o), !1)],
                K = Ev.sketch({
                    dom: s,
                    components: q.map(function(t) {
                        return t.asSpec()
                    })
                }),
                J = Ev.sketch({
                    dom: {
                        tag: "div"
                    },
                    components: [K],
                    containerBehaviours: Ru([$d.config({})])
                }),
                $ = Zm(J);
            return {
                memContainer: $,
                getApplyButton: function(t) {
                    return $.getOpt(t).map(function(t) {
                        var n = t.components()[0];
                        return n.components()[n.components().length - 1]
                    })
                }
            }
        },
        Tz = tinymce.util.Tools.resolve("tinymce.dom.DomQuery"),
        Az = tinymce.util.Tools.resolve("tinymce.geom.Rect"),
        Bz = tinymce.util.Tools.resolve("tinymce.util.Observable"),
        Dz = tinymce.util.Tools.resolve("tinymce.util.Tools"),
        _z = tinymce.util.Tools.resolve("tinymce.util.VK");

    function Fz(t) {
        var n, e;
        if (t.changedTouches)
            for (n = "screenX screenY pageX pageY clientX clientY".split(" "), e = 0; e < n.length; e++) t[n[e]] = t.changedTouches[0][n[e]]
    }

    function Iz(t, r) {
        var i, u, n, a, c, l, f, d = r.document || document;
        r = r || {};
        var m = d.getElementById(r.handle || t);
        n = function(t) {
            var n, e, o = function s(t) {
                var n, e, o, r, i, u, a, c = Math.max;
                return n = t.documentElement, e = t.body, o = c(n.scrollWidth, e.scrollWidth), r = c(n.clientWidth, e.clientWidth), i = c(n.offsetWidth, e.offsetWidth), u = c(n.scrollHeight, e.scrollHeight), a = c(n.clientHeight, e.clientHeight), {
                    width: o < i ? r : o,
                    height: u < c(n.offsetHeight, e.offsetHeight) ? a : u
                }
            }(d);
            Fz(t), t.preventDefault(), u = t.button, n = m, l = t.screenX, f = t.screenY, e = window.getComputedStyle ? window.getComputedStyle(n, null).getPropertyValue("cursor") : n.runtimeStyle.cursor, i = Tz("<div></div>").css({
                position: "absolute",
                top: 0,
                left: 0,
                width: o.width,
                height: o.height,
                zIndex: 2147483647,
                opacity: 1e-4,
                cursor: e
            }).appendTo(d.body), Tz(d).on("mousemove touchmove", c).on("mouseup touchend", a), r.start(t)
        }, c = function(t) {
            if (Fz(t), t.button !== u) return a(t);
            t.deltaX = t.screenX - l, t.deltaY = t.screenY - f, t.preventDefault(), r.drag(t)
        }, a = function(t) {
            Fz(t), Tz(d).off("mousemove touchmove", c).off("mouseup touchend", a), i.remove(), r.stop && r.stop(t)
        }, this.destroy = function() {
            Tz(m).off()
        }, Tz(m).on("mousedown touchstart", n)
    }
    var Lz, Rz, Nz, Pz = 0,
        jz = function(n) {
            var l = Zm({
                    dom: {
                        tag: "div",
                        classes: ["tox-image-tools__image-bg"],
                        attributes: {
                            role: "presentation"
                        }
                    }
                }),
                f = Ot(1),
                d = Ot(tt.none()),
                m = Ot({
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1
                }),
                c = Ot({
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1
                }),
                s = function(t, s) {
                    h.getOpt(t).each(function(t) {
                        var e = f.get(),
                            o = ia(t.element()),
                            r = ca(t.element()),
                            i = s.dom().naturalWidth * e,
                            u = s.dom().naturalHeight * e,
                            a = Math.max(0, o / 2 - i / 2),
                            c = Math.max(0, r / 2 - u / 2),
                            n = {
                                left: a.toString() + "px",
                                top: c.toString() + "px",
                                width: i.toString() + "px",
                                height: u.toString() + "px",
                                position: "absolute"
                            };
                        Ki(s, n), l.getOpt(t).each(function(t) {
                            Ki(t.element(), n)
                        }), d.get().each(function(t) {
                            var n = m.get();
                            t.setRect({
                                x: n.x * e + a,
                                y: n.y * e + c,
                                w: n.w * e,
                                h: n.h * e
                            }), t.setClampRect({
                                x: a,
                                y: c,
                                w: i,
                                h: u
                            }), t.setViewPortRect({
                                x: 0,
                                y: 0,
                                w: o,
                                h: r
                            })
                        })
                    })
                },
                e = function(t, n) {
                    var e, a = Gn.fromTag("img");
                    return Ee(a, "src", n), (e = a.dom(), new hh(function(t) {
                        var n = function() {
                            e.removeEventListener("load", n), t(e)
                        };
                        e.complete ? t(e) : e.addEventListener("load", n)
                    })).then(function() {
                        return h.getOpt(t).map(function(t) {
                            var n = fu({
                                element: a
                            });
                            $d.replaceAt(t, 1, tt.some(n));
                            var e = c.get(),
                                o = {
                                    x: 0,
                                    y: 0,
                                    w: a.dom().naturalWidth,
                                    h: a.dom().naturalHeight
                                };
                            c.set(o);
                            var r, u, i = Az.inflate(o, -20, -20);
                            return m.set(i), e.w === o.w && e.h === o.h || (r = t, u = a, h.getOpt(r).each(function(t) {
                                var n = ia(t.element()),
                                    e = ca(t.element()),
                                    o = u.dom().naturalWidth,
                                    r = u.dom().naturalHeight,
                                    i = Math.min(n / o, e / r);
                                1 <= i ? f.set(1) : f.set(i)
                            })), s(t, a), a
                        })
                    })
                },
                t = Ev.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-image-tools__image"]
                    },
                    components: [l.asSpec(), {
                        dom: {
                            tag: "img",
                            attributes: {
                                src: n
                            }
                        }
                    }, {
                        dom: {
                            tag: "div"
                        },
                        behaviours: Ru([_m("image-panel-crop-events", [ei(function(t) {
                            h.getOpt(t).each(function(t) {
                                var n = function z(s, e, l, o, r) {
                                    var f, u, n, i, a = "tox-",
                                        c = "tox-crid-" + Pz++;

                                    function d(t, n) {
                                        return {
                                            x: n.x - t.x,
                                            y: n.y - t.y,
                                            w: n.w,
                                            h: n.h
                                        }
                                    }

                                    function m(t, n, e, o) {
                                        var r, i, u, a, c;
                                        r = n.x, i = n.y, u = n.w, a = n.h, r += e * t.deltaX, i += o * t.deltaY, (u += e * t.deltaW) < 20 && (u = 20), (a += o * t.deltaH) < 20 && (a = 20), c = s = Az.clamp({
                                            x: r,
                                            y: i,
                                            w: u,
                                            h: a
                                        }, l, "move" === t.name), c = d(l, c), f.fire("updateRect", {
                                            rect: c
                                        }), v(c)
                                    }

                                    function h(n) {
                                        function t(t, n) {
                                            n.h < 0 && (n.h = 0), n.w < 0 && (n.w = 0), Tz("#" + c + "-" + t, o).css({
                                                left: n.x,
                                                top: n.y,
                                                width: n.w,
                                                height: n.h
                                            })
                                        }
                                        Dz.each(u, function(t) {
                                            Tz("#" + c + "-" + t.name, o).css({
                                                left: n.w * t.xMul + n.x,
                                                top: n.h * t.yMul + n.y
                                            })
                                        }), t("top", {
                                            x: e.x,
                                            y: e.y,
                                            w: e.w,
                                            h: n.y - e.y
                                        }), t("right", {
                                            x: n.x + n.w,
                                            y: n.y,
                                            w: e.w - n.x - n.w + e.x,
                                            h: n.h
                                        }), t("bottom", {
                                            x: e.x,
                                            y: n.y + n.h,
                                            w: e.w,
                                            h: e.h - n.y - n.h + e.y
                                        }), t("left", {
                                            x: e.x,
                                            y: n.y,
                                            w: n.x - e.x,
                                            h: n.h
                                        }), t("move", n)
                                    }

                                    function g(t) {
                                        h(s = t)
                                    }

                                    function v(t) {
                                        g(function e(t, n) {
                                            return {
                                                x: n.x + t.x,
                                                y: n.y + t.y,
                                                w: n.w,
                                                h: n.h
                                            }
                                        }(l, t))
                                    }
                                    return u = [{
                                            name: "move",
                                            xMul: 0,
                                            yMul: 0,
                                            deltaX: 1,
                                            deltaY: 1,
                                            deltaW: 0,
                                            deltaH: 0,
                                            label: "Crop Mask"
                                        }, {
                                            name: "nw",
                                            xMul: 0,
                                            yMul: 0,
                                            deltaX: 1,
                                            deltaY: 1,
                                            deltaW: -1,
                                            deltaH: -1,
                                            label: "Top Left Crop Handle"
                                        }, {
                                            name: "ne",
                                            xMul: 1,
                                            yMul: 0,
                                            deltaX: 0,
                                            deltaY: 1,
                                            deltaW: 1,
                                            deltaH: -1,
                                            label: "Top Right Crop Handle"
                                        }, {
                                            name: "sw",
                                            xMul: 0,
                                            yMul: 1,
                                            deltaX: 1,
                                            deltaY: 0,
                                            deltaW: -1,
                                            deltaH: 1,
                                            label: "Bottom Left Crop Handle"
                                        }, {
                                            name: "se",
                                            xMul: 1,
                                            yMul: 1,
                                            deltaX: 0,
                                            deltaY: 0,
                                            deltaW: 1,
                                            deltaH: 1,
                                            label: "Bottom Right Crop Handle"
                                        }], i = ["top", "right", "bottom", "left"],
                                        function p() {
                                            Tz('<div id="' + c + '" class="' + a + 'croprect-container" role="grid" aria-dropeffect="execute">').appendTo(o), Dz.each(i, function(t) {
                                                Tz("#" + c, o).append('<div id="' + c + "-" + t + '"class="' + a + 'croprect-block" style="display: none" data-mce-bogus="all">')
                                            }), Dz.each(u, function(t) {
                                                Tz("#" + c, o).append('<div id="' + c + "-" + t.name + '" class="' + a + "croprect-handle " + a + "croprect-handle-" + t.name + '"style="display: none" data-mce-bogus="all" role="gridcell" tabindex="-1" aria-label="' + t.label + '" aria-grabbed="false" title="' + t.label + '">')
                                            }), n = Dz.map(u, function t(n) {
                                                var e;
                                                return new Iz(c, {
                                                    document: o.ownerDocument,
                                                    handle: c + "-" + n.name,
                                                    start: function() {
                                                        e = s
                                                    },
                                                    drag: function(t) {
                                                        m(n, e, t.deltaX, t.deltaY)
                                                    }
                                                })
                                            }), h(s), Tz(o).on("focusin focusout", function(t) {
                                                Tz(t.target).attr("aria-grabbed", "focus" === t.type)
                                            }), Tz(o).on("keydown", function(n) {
                                                var i;

                                                function t(t, n, e, o, r) {
                                                    t.stopPropagation(), t.preventDefault(), m(i, e, o, r)
                                                }
                                                switch (Dz.each(u, function(t) {
                                                    if (n.target.id === c + "-" + t.name) return i = t, !1
                                                }), n.keyCode) {
                                                    case _z.LEFT:
                                                        t(n, 0, s, -10, 0);
                                                        break;
                                                    case _z.RIGHT:
                                                        t(n, 0, s, 10, 0);
                                                        break;
                                                    case _z.UP:
                                                        t(n, 0, s, 0, -10);
                                                        break;
                                                    case _z.DOWN:
                                                        t(n, 0, s, 0, 10);
                                                        break;
                                                    case _z.ENTER:
                                                    case _z.SPACEBAR:
                                                        n.preventDefault(), r()
                                                }
                                            })
                                        }(), f = Dz.extend({
                                            toggleVisibility: function b(t) {
                                                var n;
                                                n = Dz.map(u, function(t) {
                                                    return "#" + c + "-" + t.name
                                                }).concat(Dz.map(i, function(t) {
                                                    return "#" + c + "-" + t
                                                })).join(","), t ? Tz(n, o).show() : Tz(n, o).hide()
                                            },
                                            setClampRect: function y(t) {
                                                l = t, h(s)
                                            },
                                            setRect: g,
                                            getInnerRect: function t() {
                                                return d(l, s)
                                            },
                                            setInnerRect: v,
                                            setViewPortRect: function x(t) {
                                                e = t, h(s)
                                            },
                                            destroy: function w() {
                                                Dz.each(n, function(t) {
                                                    t.destroy()
                                                }), n = []
                                            }
                                        }, Bz)
                                }({
                                    x: 10,
                                    y: 10,
                                    w: 100,
                                    h: 100
                                }, {
                                    x: 0,
                                    y: 0,
                                    w: 200,
                                    h: 200
                                }, {
                                    x: 0,
                                    y: 0,
                                    w: 200,
                                    h: 200
                                }, t.element().dom(), function() {});
                                n.toggleVisibility(!1), n.on("updateRect", function(t) {
                                    var n = t.rect,
                                        e = f.get(),
                                        o = {
                                            x: Math.round(n.x / e),
                                            y: Math.round(n.y / e),
                                            w: Math.round(n.w / e),
                                            h: Math.round(n.h / e)
                                        };
                                    m.set(o)
                                }), d.set(tt.some(n))
                            })
                        })])])
                    }],
                    containerBehaviours: Ru([$d.config({}), _m("image-panel-events", [ei(function(t) {
                        e(t, n)
                    })])])
                }),
                h = Zm(t);
            return {
                memContainer: h,
                updateSrc: e,
                zoom: function(t, n) {
                    var e = f.get(),
                        o = 0 < n ? Math.min(2, e + .1) : Math.max(.1, e - .1);
                    f.set(o), h.getOpt(t).each(function(t) {
                        var n = t.components()[1].element();
                        s(t, n)
                    })
                },
                showCrop: function() {
                    d.get().each(function(t) {
                        t.toggleVisibility(!0)
                    })
                },
                hideCrop: function() {
                    d.get().each(function(t) {
                        t.toggleVisibility(!1)
                    })
                },
                getRect: function() {
                    return m.get()
                },
                getMeasurements: function() {
                    var t = c.get();
                    return {
                        width: t.w,
                        height: t.h
                    }
                }
            }
        },
        Uz = function(t, n, e, o, r) {
            return dz({
                name: t,
                icon: tt.some(n),
                disabled: e,
                tooltip: tt.some(t)
            }, o, r)
        },
        Wz = function(t, n) {
            n ? Ph.enable(t) : Ph.disable(t)
        },
        Gz = function() {
            return Qn.getOrDie("URL")
        },
        Xz = function(t) {
            return Gz().createObjectURL(t)
        },
        Yz = function(t) {
            Gz().revokeObjectURL(t)
        },
        qz = function(t) {
            var n = Ot(t),
                e = Ot(tt.none()),
                r = function s() {
                    var e = [],
                        o = -1;

                    function t() {
                        return 0 < o
                    }

                    function n() {
                        return -1 !== o && o < e.length - 1
                    }
                    return {
                        data: e,
                        add: function r(t) {
                            var n;
                            return n = e.splice(++o), e.push(t), {
                                state: t,
                                removed: n
                            }
                        },
                        undo: function i() {
                            if (t()) return e[--o]
                        },
                        redo: function u() {
                            if (n()) return e[++o]
                        },
                        canUndo: t,
                        canRedo: n
                    }
                }();
            r.add(t);
            var i = function(t) {
                    n.set(t)
                },
                u = function(t) {
                    return {
                        blob: t,
                        url: Xz(t)
                    }
                },
                a = function(t) {
                    Yz(t.url)
                },
                o = function() {
                    e.get().each(a), e.set(tt.none())
                },
                c = function(t) {
                    var n = u(t);
                    i(n);
                    var e, o = r.add(n).removed;
                    return e = o, Dz.each(e, a), n.url
                };
            return {
                getBlobState: function() {
                    return n.get()
                },
                setBlobState: i,
                addBlobState: c,
                getTempState: function() {
                    return e.get().fold(function() {
                        return n.get()
                    }, function(t) {
                        return t
                    })
                },
                updateTempState: function(t) {
                    var n = u(t);
                    return o(), e.set(tt.some(n)), n.url
                },
                addTempState: function(t) {
                    var n = u(t);
                    return e.set(tt.some(n)), n.url
                },
                applyTempState: function(n) {
                    return e.get().fold(function() {}, function(t) {
                        c(t.blob), n()
                    })
                },
                destroyTempState: o,
                undo: function() {
                    var t = r.undo();
                    return i(t), t.url
                },
                redo: function() {
                    var t = r.redo();
                    return i(t), t.url
                },
                getHistoryStates: function() {
                    return {
                        undoEnabled: r.canUndo(),
                        redoEnabled: r.canRedo()
                    }
                }
            }
        },
        Kz = function(t, n) {
            var e, o, r, u = qz(t.currentState),
                i = function(t) {
                    var n = u.getHistoryStates();
                    g.updateButtonUndoStates(t, n.undoEnabled, n.redoEnabled), Er(t, Ez.formActionEvent, {
                        name: Ez.saveState(),
                        value: n.undoEnabled
                    })
                },
                a = function(t) {
                    return t.toBlob()
                },
                c = function(t) {
                    Er(t, Ez.formActionEvent, {
                        name: Ez.disable(),
                        value: {}
                    })
                },
                s = function(t) {
                    v.getApplyButton(t).each(function(t) {
                        Ph.enable(t)
                    }), Er(t, Ez.formActionEvent, {
                        name: Ez.enable(),
                        value: {}
                    })
                },
                l = function(t, n) {
                    return c(t), h.updateSrc(t, n)
                },
                f = function(n, t, e, o, r) {
                    return c(n), Fw(t).then(e).then(a).then(o).then(function(t) {
                        return l(n, t).then(function(t) {
                            return i(n), r(), s(n), t
                        })
                    })["catch"](function(t) {
                        console.log(t), s(n)
                    })
                },
                d = function(t, n, e) {
                    var o = u.getBlobState().blob;
                    f(t, o, n, function(t) {
                        return u.updateTempState(t)
                    }, e)
                },
                m = function(t) {
                    var n = u.getBlobState().url;
                    return u.destroyTempState(), i(t), n
                },
                h = jz(t.currentState.url),
                g = (o = Zm(Uz("Undo", "undo", !0, function(t) {
                    Er(t, Cz.undo(), {
                        direction: 1
                    })
                }, e = n)), r = Zm(Uz("Redo", "redo", !0, function(t) {
                    Er(t, Cz.redo(), {
                        direction: 1
                    })
                }, e)), {
                    container: Ev.sketch({
                        dom: {
                            tag: "div",
                            classes: ["tox-image-tools__toolbar", "tox-image-tools__sidebar"]
                        },
                        components: [o.asSpec(), r.asSpec(), Uz("Zoom in", "zoom-in", !1, function(t) {
                            Er(t, Cz.zoom(), {
                                direction: 1
                            })
                        }, e), Uz("Zoom out", "zoom-out", !1, function(t) {
                            Er(t, Cz.zoom(), {
                                direction: -1
                            })
                        }, e)]
                    }),
                    updateButtonUndoStates: function(t, n, e) {
                        o.getOpt(t).each(function(t) {
                            Wz(t, n)
                        }), r.getOpt(t).each(function(t) {
                            Wz(t, e)
                        })
                    }
                }),
                v = Vz(h, n);
            return {
                dom: {
                    tag: "div",
                    attributes: {
                        role: "presentation"
                    }
                },
                components: [v.memContainer.asSpec(), h.memContainer.asSpec(), g.container],
                behaviours: Ru([lm.config({
                    store: {
                        mode: "manual",
                        getValue: function() {
                            return u.getBlobState()
                        }
                    }
                }), _m("image-tools-events", [qr(Cz.undo(), function(n, t) {
                    var e = u.undo();
                    l(n, e).then(function(t) {
                        s(n), i(n)
                    })
                }), qr(Cz.redo(), function(n, t) {
                    var e = u.redo();
                    l(n, e).then(function(t) {
                        s(n), i(n)
                    })
                }), qr(Cz.zoom(), function(t, n) {
                    var e = n.event().direction();
                    h.zoom(t, e)
                }), qr(Cz.back(), function(t, n) {
                    var e, o;
                    o = m(e = t), l(e, o).then(function(t) {
                        s(e)
                    }), n.event().swap()(), h.hideCrop()
                }), qr(Cz.apply(), function(t, n) {
                    u.applyTempState(function() {
                        m(t), n.event().swap()()
                    })
                }), qr(Cz.transform(), function(t, n) {
                    return d(t, n.event().transform(), Q)
                }), qr(Cz.tempTransform(), function(t, n) {
                    return e = t, o = n.event().transform(), r = u.getTempState().blob, void f(e, r, o, function(t) {
                        return u.addTempState(t)
                    }, Q);
                    var e, o, r
                }), qr(Cz.transformApply(), function(t, n) {
                    return e = t, o = n.event().transform(), r = n.event().swap(), i = u.getBlobState().blob, void f(e, i, o, function(t) {
                        var n = u.addBlobState(t);
                        return m(e), n
                    }, r);
                    var e, o, r, i
                }), qr(Cz.swap(), function(n, t) {
                    var e;
                    e = n, g.updateButtonUndoStates(e, !1, !1);
                    var o = t.event().transform(),
                        r = t.event().swap();
                    o.fold(function() {
                        r()
                    }, function(t) {
                        d(n, t, r)
                    })
                })]), $x()])
            }
        },
        Jz = Fl({
            name: "HtmlSelect",
            configFields: [or("options"), Ds("selectBehaviours", [gm, lm]), vr("selectClasses", []), vr("selectAttributes", {}), fr("data")],
            factory: function(e, t) {
                var n = V(e.options, function(t) {
                        return {
                            dom: {
                                tag: "option",
                                value: t.value,
                                innerHtml: t.text
                            }
                        }
                    }),
                    o = e.data.map(function(t) {
                        return zt("initialValue", t)
                    }).getOr({});
                return {
                    uid: e.uid,
                    dom: {
                        tag: "select",
                        classes: e.selectClasses,
                        attributes: e.selectAttributes
                    },
                    components: n,
                    behaviours: Fs(e.selectBehaviours, [gm.config({}), lm.config({
                        store: Ke({
                            mode: "manual",
                            getValue: function(t) {
                                return eu(t.element())
                            },
                            setValue: function(t, n) {
                                _(e.options, function(t) {
                                    return t.value === n
                                }).isSome() && ou(t.element(), n)
                            }
                        }, o)
                    })])
                }
            }
        }),
        $z = function(e, n) {
            var t = e.label.map(function(t) {
                    return Tp(t, n)
                }),
                o = [Xd.config({
                    mode: "execution",
                    useEnter: !0 !== e.multiline,
                    useControlEnter: !0 === e.multiline,
                    execute: function(t) {
                        return Hr(t, Nv), tt.some(!0)
                    }
                }), _m("textfield-change", [qr(Pt(), function(t, n) {
                    Er(t, Fv, {
                        name: e.name
                    })
                }), qr(Sn(), function(t, n) {
                    Er(t, Fv, {
                        name: e.name
                    })
                })]), nb.config({})],
                r = e.validation.map(function(o) {
                    return Qp.config({
                        getRoot: function(t) {
                            return le(t.element())
                        },
                        invalidClass: "tox-invalid",
                        validator: {
                            validate: function(t) {
                                var n = lm.getValue(t),
                                    e = o.validator(n);
                                return ip.pure(!0 === e ? dt.value(n) : dt.error(e))
                            },
                            validateOnLoad: o.validateOnLoad
                        }
                    })
                }).toArray(),
                i = Yv.parts().field({
                    tag: !0 === e.multiline ? "textarea" : "input",
                    inputAttributes: e.placeholder.fold(function() {}, function(t) {
                        return {
                            placeholder: n.translate(t)
                        }
                    }),
                    inputClasses: [e.classname],
                    inputBehaviours: Ru(R([o, r])),
                    selectOnFocus: !1,
                    factory: Lp
                }),
                u = e.flex ? ["tox-form__group--stretched"] : [];
            return Mp(t, i, u)
        },
        Qz = function(i) {
            return Ke({}, i, {
                toCached: function() {
                    return Qz(i.toCached())
                },
                bindFuture: function(n) {
                    return Qz(i.bind(function(t) {
                        return t.fold(function(t) {
                            return ip.pure(dt.error(t))
                        }, function(t) {
                            return n(t)
                        })
                    }))
                },
                bindResult: function(n) {
                    return Qz(i.map(function(t) {
                        return t.bind(n)
                    }))
                },
                mapResult: function(n) {
                    return Qz(i.map(function(t) {
                        return t.map(n)
                    }))
                },
                mapError: function(n) {
                    return Qz(i.map(function(t) {
                        return t.mapError(n)
                    }))
                },
                foldResult: function(n, e) {
                    return i.map(function(t) {
                        return t.fold(n, e)
                    })
                },
                withTimeout: function(t, r) {
                    return Qz(ip.nu(function(n) {
                        var e = !1,
                            o = window.setTimeout(function() {
                                e = !0, n(dt.error(r()))
                            }, t);
                        i.get(function(t) {
                            e || (window.clearTimeout(o), n(t))
                        })
                    }))
                }
            })
        },
        Zz = function(t) {
            return Qz(ip.nu(t))
        },
        tS = Zz,
        nS = {
            type: "separator"
        },
        eS = function(t) {
            return {
                type: "menuitem",
                value: t.url,
                text: t.title,
                meta: {
                    attach: t.attach
                },
                onAction: function() {}
            }
        },
        oS = function(t, n) {
            return {
                type: "menuitem",
                value: n,
                text: t,
                meta: {
                    attach: Q
                },
                onAction: function() {}
            }
        },
        rS = function(t, n) {
            return o = t, e = A(n, function(t) {
                return t.type === o
            }), V(e, eS);
            var e, o
        },
        iS = function(t, n) {
            var e = t.toLowerCase();
            return A(n, function(t) {
                var n = t.meta !== undefined && t.meta.text !== undefined ? t.meta.text : t.text;
                return dn(n.toLowerCase(), e) || dn(t.value.toLowerCase(), e)
            })
        },
        uS = function(c, t, s) {
            var n = lm.getValue(t),
                l = n.meta.text !== undefined ? n.meta.text : n.value;
            return s.getLinkInformation().fold(function() {
                return []
            }, function(t) {
                var n, e, o, r, i, u, a = iS(l, (n = s.getHistory(c), V(n, function(t) {
                    return oS(t, t)
                })));
                return "file" === c ? (e = [a, iS(l, (u = t, rS("header", u.targets))), iS(l, R([(i = t, i.anchorTop.map(function(t) {
                    return oS("<top>", t)
                }).toArray()), (r = t, rS("anchor", r.targets)), (o = t, o.anchorBottom.map(function(t) {
                    return oS("<bottom>", t)
                }).toArray())]))], D(e, function(t, n) {
                    return 0 === t.length || 0 === n.length ? t.concat(n) : t.concat(nS, n)
                }, [])) : a
            })
        },
        aS = function(i, u, o) {
            var t, r = function(t) {
                    var n = lm.getValue(t);
                    o.addToHistory(n.value, i.filetype)
                },
                n = Yv.parts().field({
                    factory: Op,
                    dismissOnBlur: !0,
                    inputClasses: ["tox-textfield"],
                    sandboxClasses: ["tox-dialog__popups"],
                    minChars: 0,
                    responseTime: 0,
                    fetch: function(t) {
                        var n = uS(i.filetype, t, o),
                            e = Ip(n, Sg.BUBBLE_TO_SANDBOX, u.providers);
                        return ip.pure(e)
                    },
                    getHotspot: function(t) {
                        return f.getOpt(t)
                    },
                    onSetValue: function(t, n) {
                        t.hasConfigured(Qp) && Qp.run(t).get(Q)
                    },
                    typeaheadBehaviours: Ru(R([o.getValidationHandler().map(function(o) {
                        return Qp.config({
                            getRoot: function(t) {
                                return le(t.element())
                            },
                            invalidClass: "tox-control-wrap--status-invalid",
                            notify: {},
                            validator: {
                                validate: function(n) {
                                    var e = lm.getValue(n);
                                    return tS(function(t) {
                                        o({
                                            type: i.filetype,
                                            url: e.value
                                        }, function(e) {
                                            f.getOpt(n).each(function(t) {
                                                var n = function(t, n, e) {
                                                    (e ? Ri : Pi)(t.element(), n)
                                                };
                                                n(t, "tox-control-wrap--status-valid", "valid" === e.status), n(t, "tox-control-wrap--status-unknown", "unknown" === e.status)
                                            }), t(("invalid" === e.status ? dt.error : dt.value)(e.message))
                                        })
                                    })
                                },
                                validateOnLoad: !1
                            }
                        })
                    }).toArray(), [nb.config({}), _m("urlinput-events", R(["file" === i.filetype ? [qr(Pt(), function(t) {
                            Er(t, Fv, {
                                name: i.name
                            })
                        })] : [],
                        [qr(jt(), function(t) {
                            Er(t, Fv, {
                                name: i.name
                            }), r(t)
                        }), qr(Sn(), function(t) {
                            Er(t, Fv, {
                                name: i.name
                            }), r(t)
                        })]
                    ]))]])),
                    eventOrder: (t = {}, t[Pt()] = ["streaming", "urlinput-events", "invalidating"], t),
                    model: {
                        getDisplayText: function(t) {
                            return t.value
                        },
                        selectsOver: !1,
                        populateFromBrowse: !1
                    },
                    markers: {
                        openClass: "dog"
                    },
                    lazySink: u.getSink,
                    parts: {
                        menu: Ug(0, 0, "normal")
                    },
                    onExecute: function(t, n, e) {
                        Er(n, Nv, {})
                    },
                    onItemExecute: function(t, n, e, o) {
                        r(t), Er(t, Fv, {
                            name: i.name
                        })
                    }
                }),
                e = i.label.map(function(t) {
                    return Tp(t, u.providers)
                }),
                a = function(t, n, e) {
                    return void 0 === n && (n = t), void 0 === e && (e = t), {
                        dom: {
                            tag: "div",
                            classes: ["tox-icon", "tox-control-wrap__status-icon-" + t],
                            innerHtml: eh(n, u.providers.icons),
                            attributes: {
                                title: u.providers.translate(e)
                            }
                        }
                    }
                },
                c = Zm({
                    dom: {
                        tag: "div",
                        classes: ["tox-control-wrap__status-icon-wrap"]
                    },
                    components: [a("valid", "checkmark", "valid"), a("unknown", "warning"), a("invalid", "warning")]
                }),
                s = o.getUrlPicker(i.filetype),
                l = Ye("browser.url.event"),
                f = Zm({
                    dom: {
                        tag: "div",
                        classes: ["tox-control-wrap"]
                    },
                    components: [n, c.asSpec()]
                });
            return Yv.sketch({
                dom: Vp([]),
                components: e.toArray().concat([{
                    dom: {
                        tag: "div",
                        classes: ["tox-form__controls-h-stack"]
                    },
                    components: R([
                        [f.asSpec()], s.map(function() {
                            return t = i.label, n = l, e = "tox-browse-url", o = "browse", r = u.providers, Qm.sketch({
                                dom: {
                                    tag: "button",
                                    classes: ["tox-tbtn", e],
                                    innerHtml: eh(o, r.icons),
                                    attributes: {
                                        title: r.translate(t.getOr(""))
                                    }
                                },
                                buttonBehaviours: Ru([nb.config({})]),
                                action: function(t) {
                                    Hr(t, n)
                                }
                            });
                            var t, n, e, o, r
                        }).toArray()
                    ])
                }]),
                fieldBehaviours: Ru([_m("url-input-events", [qr(l, function(o) {
                    Pl.getCurrent(o).each(function(n) {
                        var e = lm.getValue(n);
                        s.each(function(t) {
                            t(e).get(function(t) {
                                lm.setValue(n, t), Er(o, Fv, {
                                    name: i.name
                                })
                            })
                        })
                    })
                })])])
            })
        },
        cS = function(u, n) {
            var t, e, o = u.label.map(function(t) {
                    return Tp(t, n)
                }),
                r = function(e) {
                    return function(n, t) {
                        pu(t.event().target(), "[data-collection-item-value]").each(function(t) {
                            e(n, t, Te(t, "data-collection-item-value"))
                        })
                    }
                },
                i = [qr(Ft(), r(function(t, n) {
                    df(n)
                })), qr(Ut(), r(function(t, n, e) {
                    Er(t, Rv, {
                        name: u.name,
                        value: e
                    })
                })), qr(It(), r(function(t, n, e) {
                    vu(t.element(), "." + og).each(function(t) {
                        Pi(t, og)
                    }), Ri(n, og)
                })), qr(Lt(), r(function(t, n, e) {
                    vu(t.element(), "." + og).each(function(t) {
                        Pi(t, og)
                    })
                })), ii(r(function(t, n, e) {
                    Er(t, Rv, {
                        name: u.name,
                        value: e
                    })
                }))],
                a = Yv.parts().field({
                    dom: {
                        tag: "div",
                        classes: ["tox-collection"].concat(1 !== u.columns ? ["tox-collection--grid"] : ["tox-collection--list"])
                    },
                    components: [],
                    factory: {
                        sketch: d
                    },
                    behaviours: Ru([$d.config({}), lm.config({
                        store: {
                            mode: "memory",
                            initialValue: []
                        },
                        onSetValue: function(o, t) {
                            var n, e, r, i;
                            n = o, e = V(t, function(t) {
                                var n, e = 1 === u.columns ? t.text.map(function(t) {
                                        return '<span class="tox-collection__item-label">' + t + "</span>"
                                    }).getOr("") : "",
                                    o = t.icon.map(function(t) {
                                        return '<span class="tox-collection__item-icon">' + t + "</span>"
                                    }).getOr(""),
                                    r = {
                                        _: " ",
                                        " - ": " ",
                                        "-": " "
                                    },
                                    i = t.text.getOr("").replace(/\_| \- |\-/g, function(t) {
                                        return r[t]
                                    });
                                return '<div class="tox-collection__item" tabindex="-1" data-collection-item-value="' + ('"' === (n = t.value) ? "&quot;" : n) + '" title="' + i + '" aria-label="' + i + '">' + o + e + "</div>"
                            }), r = 1 < u.columns && "auto" !== u.columns ? E(e, u.columns) : [e], i = V(r, function(t) {
                                return '<div class="tox-collection__group">' + t.join("") + "</div>"
                            }), ze(n.element(), i.join("")), "auto" === u.columns && Oh(o, 5, "tox-collection__item").each(function(t) {
                                var n = t.numRows,
                                    e = t.numColumns;
                                Xd.setGridSize(o, n, e)
                            }), Hr(o, Wv)
                        }
                    }), nb.config({}), Xd.config((t = u.columns, e = "normal", 1 === t ? {
                        mode: "menu",
                        moveOnTab: !1,
                        selector: ".tox-collection__item"
                    } : "auto" === t ? {
                        mode: "flatgrid",
                        selector: ".tox-collection__item",
                        initSize: {
                            numColumns: 1,
                            numRows: 1
                        }
                    } : {
                        mode: "matrix",
                        selectors: {
                            row: "color" === e ? ".tox-swatches__row" : ".tox-collection__group",
                            cell: "color" === e ? "." + Qh : "." + $h
                        }
                    })), _m("collection-events", i)])
                });
            return Mp(o, a, ["tox-form__group--collection"])
        },
        sS = function(r) {
            return function(n, e, o) {
                return wt(e, "name").fold(function() {
                    return r(e, o)
                }, function(t) {
                    return n.field(t, r(e, o))
                })
            }
        },
        lS = {
            bar: sS(function(t, n) {
                return e = t, o = n.shared, {
                    dom: {
                        tag: "div",
                        classes: ["tox-bar"]
                    },
                    components: V(e.items, o.interpreter)
                };
                var e, o
            }),
            collection: sS(function(t, n) {
                return cS(t, n.shared.providers)
            }),
            alloy: sS(d),
            alertbanner: sS(function(t, n) {
                return e = t, o = n.shared.providers, Ev.sketch({
                    dom: {
                        tag: "div",
                        attributes: {
                            role: "alert"
                        },
                        classes: ["tox-notification", "tox-notification--in", "tox-notification--" + e.level]
                    },
                    components: [{
                        dom: {
                            tag: "div",
                            classes: ["tox-notification__icon"]
                        },
                        components: [Qm.sketch({
                            dom: {
                                tag: "button",
                                classes: ["tox-button", "tox-button--naked", "tox-button--icon"],
                                innerHtml: eh(e.icon, o.icons),
                                attributes: {
                                    title: o.translate(e.actionLabel)
                                }
                            },
                            action: function(t) {
                                Er(t, Rv, {
                                    name: "alert-banner",
                                    value: e.url
                                })
                            }
                        })]
                    }, {
                        dom: {
                            tag: "div",
                            classes: ["tox-notification__body"],
                            innerHtml: o.translate(e.text)
                        }
                    }]
                });
                var e, o
            }),
            input: sS(function(t, n) {
                return e = t, o = n.shared.providers, $z({
                    name: e.name,
                    multiline: !1,
                    label: e.label,
                    placeholder: e.placeholder,
                    flex: !1,
                    classname: "tox-textfield",
                    validation: tt.none()
                }, o);
                var e, o
            }),
            textarea: sS(function(t, n) {
                return e = t, o = n.shared.providers, $z({
                    name: e.name,
                    multiline: !0,
                    label: e.label,
                    placeholder: e.placeholder,
                    flex: !0,
                    classname: "tox-textarea",
                    validation: tt.none()
                }, o);
                var e, o
            }),
            listbox: sS(function(t, n) {
                return e = t, o = n.shared.providers, r = Tp(e.label, o), i = Yv.parts().field({
                    factory: Jz,
                    dom: {
                        classes: ["mce-select-field"]
                    },
                    selectBehaviours: Ru([nb.config({})]),
                    options: e.values,
                    data: e.initialValue.getOr(undefined)
                }), Hp(tt.some(r), i);
                var e, o, r, i
            }),
            label: sS(function(t, n) {
                return e = t, o = n.shared, r = {
                    dom: {
                        tag: "label",
                        innerHtml: o.providers.translate(e.label),
                        classes: ["tox-label"]
                    }
                }, i = V(e.items, o.interpreter), {
                    dom: {
                        tag: "div",
                        classes: ["tox-form__group"]
                    },
                    components: [r].concat(i),
                    behaviours: Ru([$x(), $d.config({}), aw(tt.none()), Xd.config({
                        mode: "acyclic"
                    })])
                };
                var e, o, r, i
            }),
            iframe: (Lz = function(t, n) {
                return bw(t, n.shared.providers)
            }, function(t, n, e) {
                var o = vt(n, {
                    source: "dynamic"
                });
                return sS(Lz)(t, o, e)
            }),
            autocomplete: sS(function(t, n) {
                return r = t, i = n.shared, e = Tp(r.label.getOr("?"), i.providers), o = Yv.parts().field({
                    factory: Op,
                    dismissOnBlur: !1,
                    inputClasses: ["tox-textfield"],
                    minChars: 1,
                    fetch: function(t) {
                        var n = lm.getValue(t),
                            e = r.getItems(n),
                            o = Ip(e, Sg.BUBBLE_TO_SANDBOX, i.providers);
                        return ip.pure(o)
                    },
                    markers: {
                        openClass: "dog"
                    },
                    lazySink: i.getSink,
                    parts: {
                        menu: Ug(0, 0, "normal")
                    }
                }), Hp(tt.some(e), o);
                var r, i, e, o
            }),
            button: sS(function(t, n) {
                return e = t, o = n.shared.providers, r = hz(e.name, "custom"), mz(e, r, o, [cw(""), $x()]);
                var e, o, r
            }),
            checkbox: sS(function(t, n) {
                return e = t, o = n.shared.providers, r = lm.config({
                    store: {
                        mode: "manual",
                        getValue: function(t) {
                            return t.element().dom().checked
                        },
                        setValue: function(t, n) {
                            t.element().dom().checked = n
                        }
                    }
                }), i = function(t) {
                    return t.element().dom().click(), tt.some(!0)
                }, u = Yv.parts().field({
                    factory: {
                        sketch: d
                    },
                    dom: {
                        tag: "input",
                        classes: ["tox-checkbox__input"],
                        attributes: {
                            type: "checkbox"
                        }
                    },
                    behaviours: Ru([$x(), nb.config({}), gm.config({}), r, Xd.config({
                        mode: "special",
                        onEnter: i,
                        onSpace: i,
                        stopSpaceKeyup: !0
                    }), _m("checkbox-events", [qr(jt(), function(t, n) {
                        Er(t, Fv, {
                            name: e.name
                        })
                    })])])
                }), a = Yv.parts().label({
                    dom: {
                        tag: "span",
                        classes: ["tox-checkbox__label"],
                        innerHtml: o.translate(e.label)
                    },
                    behaviours: Ru([Gb.config({})])
                }), s = Zm({
                    dom: {
                        tag: "div",
                        classes: ["tox-checkbox__icons"]
                    },
                    components: [(c = function(t) {
                        return {
                            dom: {
                                tag: "span",
                                classes: ["tox-icon", "tox-checkbox-icon__" + t],
                                innerHtml: eh("checked" === t ? "selected" : "unselected", o.icons)
                            }
                        }
                    })("checked"), c("unchecked")]
                }), Yv.sketch({
                    dom: {
                        tag: "label",
                        classes: ["tox-checkbox"]
                    },
                    components: [u, s.asSpec(), a]
                });
                var e, o, r, i, u, a, c, s
            }),
            colorinput: sS(function(t, n) {
                return Kb(t, n.shared, n.colorinput)
            }),
            colorpicker: sS(function(t) {
                var n = function(t) {
                        return "tox-" + t
                    },
                    e = Jx(nw, n),
                    r = Zm(e.sketch({
                        dom: {
                            tag: "div",
                            classes: [n("color-picker-container")],
                            attributes: {
                                role: "presentation"
                            }
                        },
                        onValidHex: function(t) {
                            Er(t, Rv, {
                                name: "hex-valid",
                                value: !0
                            })
                        },
                        onInvalidHex: function(t) {
                            Er(t, Rv, {
                                name: "hex-valid",
                                value: !1
                            })
                        }
                    }));
                return {
                    dom: {
                        tag: "div"
                    },
                    components: [r.asSpec()],
                    behaviours: Ru([lm.config({
                        store: {
                            mode: "manual",
                            getValue: function(t) {
                                var n = r.get(t);
                                return Pl.getCurrent(n).bind(function(t) {
                                    return lm.getValue(t).hex
                                }).map(function(t) {
                                    return "#" + t
                                }).getOr("")
                            },
                            setValue: function(t, n) {
                                var e = /^#([a-fA-F0-9]{3}(?:[a-fA-F0-9]{3})?)/.exec(n),
                                    o = r.get(t);
                                Pl.getCurrent(o).fold(function() {
                                    console.log("Can not find form")
                                }, function(t) {
                                    lm.setValue(t, {
                                        hex: tt.from(e[1]).getOr("")
                                    }), Ux.getField(t, "hex").each(function(t) {
                                        Hr(t, Pt())
                                    })
                                })
                            }
                        }
                    }), $x()])
                }
            }),
            dropzone: sS(function(t, n) {
                return sw(t, n.shared.providers)
            }),
            grid: sS(function(t, n) {
                return e = t, o = n.shared, {
                    dom: {
                        tag: "div",
                        classes: ["tox-form__grid", "tox-form__grid--" + e.columns + "col"]
                    },
                    components: V(e.items, o.interpreter)
                };
                var e, o
            }),
            selectbox: sS(function(t, n) {
                return e = t, o = n.shared.providers, r = e.label.map(function(t) {
                    return Tp(t, o)
                }), i = Yv.parts().field({
                    dom: {},
                    selectAttributes: {
                        size: e.size
                    },
                    options: e.items,
                    factory: Jz,
                    selectBehaviours: Ru([nb.config({}), _m("selectbox-change", [qr(jt(), function(t, n) {
                        Er(t, Fv, {
                            name: e.name
                        })
                    })])])
                }), u = 1 < e.size ? tt.none() : tt.some({
                    dom: {
                        tag: "div",
                        classes: ["tox-selectfield__icon-js"],
                        innerHtml: eh("chevron-down", o.icons)
                    }
                }), a = {
                    dom: {
                        tag: "div",
                        classes: ["tox-selectfield"]
                    },
                    components: R([
                        [i], u.toArray()
                    ])
                }, Yv.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-form__group"]
                    },
                    components: R([r.toArray(), [a]])
                });
                var e, o, r, i, u, a
            }),
            sizeinput: sS(function(t, n) {
                return kz(t, n.shared.providers)
            }),
            urlinput: sS(function(t, n) {
                return aS(t, n.shared, n.urlinput)
            }),
            customeditor: sS(function(n) {
                var e = Ot(tt.none()),
                    o = Zm({
                        dom: {
                            tag: n.tag
                        }
                    }),
                    r = Ot(tt.none());
                return {
                    dom: {
                        tag: "div",
                        classes: ["tox-custom-editor"]
                    },
                    behaviours: Ru([_m("editor-foo-events", [ei(function(t) {
                        o.getOpt(t).each(function(t) {
                            n.init(t.element().dom()).then(function(n) {
                                r.get().each(function(t) {
                                    n.setValue(t)
                                }), r.set(tt.none()), e.set(tt.some(n))
                            })
                        })
                    })]), lm.config({
                        store: {
                            mode: "manual",
                            getValue: function() {
                                return e.get().fold(function() {
                                    return r.get().getOr("")
                                }, function(t) {
                                    return t.getValue()
                                })
                            },
                            setValue: function(t, n) {
                                e.get().fold(function() {
                                    r.set(tt.some(n))
                                }, function(t) {
                                    return t.setValue(n)
                                })
                            }
                        }
                    }), $x()]),
                    components: [o.asSpec()]
                }
            }),
            htmlpanel: sS(function(t) {
                return Ev.sketch({
                    dom: {
                        tag: "div",
                        innerHtml: t.html
                    },
                    containerBehaviours: Ru([nb.config({}), gm.config({})])
                })
            }),
            imagetools: sS(function(t, n) {
                return Kz(t, n.shared.providers)
            }),
            table: sS(function(t, n) {
                return e = t, o = n.shared.providers, u = function(t) {
                    return {
                        dom: {
                            tag: "th",
                            innerHtml: o.translate(t)
                        }
                    }
                }, a = function(t) {
                    return {
                        dom: {
                            tag: "td",
                            innerHtml: o.translate(t)
                        }
                    }
                }, c = function(t) {
                    return {
                        dom: {
                            tag: "tr"
                        },
                        components: V(t, a)
                    }
                }, {
                    dom: {
                        tag: "table",
                        classes: ["tox-dialog__table"]
                    },
                    components: [(i = e.header, {
                        dom: {
                            tag: "thead"
                        },
                        components: [{
                            dom: {
                                tag: "tr"
                            },
                            components: V(i, u)
                        }]
                    }), (r = e.cells, {
                        dom: {
                            tag: "tbody"
                        },
                        components: V(r, c)
                    })],
                    behaviours: Ru([nb.config({}), gm.config({})])
                };
                var e, o, r, i, u, a, c
            })
        },
        fS = {
            field: function(t, n) {
                return n
            }
        },
        dS = function(n, t, e) {
            var o = vt(e, {
                shared: {
                    interpreter: function(t) {
                        return mS(n, t, o)
                    }
                }
            });
            return mS(n, t, o)
        },
        mS = function(n, e, o) {
            return wt(lS, e.type).fold(function() {
                return console.error('Unknown factory type "' + e.type + '", defaulting to container: ', e), e
            }, function(t) {
                return t(n, e, o)
            })
        },
        hS = function(t) {
            return {
                colorPicker: (o = t, function(t, n) {
                    Pb.colorPickerDialog(o)(t, n)
                }),
                hasCustomColors: (e = t, function() {
                    return Eb(e)
                }),
                getColors: (n = t, function() {
                    return Vb(n)
                })
            };
            var n, e, o
        },
        gS = [{
            title: "Headings",
            items: [{
                title: "Heading 1",
                format: "h1"
            }, {
                title: "Heading 2",
                format: "h2"
            }, {
                title: "Heading 3",
                format: "h3"
            }, {
                title: "Heading 4",
                format: "h4"
            }, {
                title: "Heading 5",
                format: "h5"
            }, {
                title: "Heading 6",
                format: "h6"
            }]
        }, {
            title: "Inline",
            items: [{
                title: "Bold",
                icon: "bold",
                format: "bold"
            }, {
                title: "Italic",
                icon: "italic",
                format: "italic"
            }, {
                title: "Underline",
                icon: "underline",
                format: "underline"
            }, {
                title: "Strikethrough",
                icon: "strike-through",
                format: "strikethrough"
            }, {
                title: "Superscript",
                icon: "superscript",
                format: "superscript"
            }, {
                title: "Subscript",
                icon: "subscript",
                format: "subscript"
            }, {
                title: "Code",
                icon: "code",
                format: "code"
            }]
        }, {
            title: "Blocks",
            items: [{
                title: "Paragraph",
                format: "p"
            }, {
                title: "Blockquote",
                format: "blockquote"
            }, {
                title: "Div",
                format: "div"
            }, {
                title: "Pre",
                format: "pre"
            }]
        }, {
            title: "Align",
            items: [{
                title: "Left",
                icon: "align-left",
                format: "alignleft"
            }, {
                title: "Center",
                icon: "align-center",
                format: "aligncenter"
            }, {
                title: "Right",
                icon: "align-right",
                format: "alignright"
            }, {
                title: "Justify",
                icon: "align-justify",
                format: "alignjustify"
            }]
        }],
        vS = function(t) {
            return D(t, function(t, n) {
                if (ut(n, "items")) {
                    var e = vS(n.items);
                    return {
                        customFormats: t.customFormats.concat(e.customFormats),
                        formats: t.formats.concat([{
                            title: n.title,
                            items: e.formats
                        }])
                    }
                }
                if (ut(n, "inline") || ut(n, "block") || ut(n, "selector")) {
                    var o = "custom-" + n.title.toLowerCase();
                    return {
                        customFormats: t.customFormats.concat([{
                            name: o,
                            format: n
                        }]),
                        formats: t.formats.concat([{
                            title: n.title,
                            format: o,
                            icon: n.icon
                        }])
                    }
                }
                return Ke({}, t, {
                    formats: t.formats.concat(n)
                })
            }, {
                customFormats: [],
                formats: []
            })
        },
        pS = function(i) {
            return (t = i, tt.from(t.getParam("style_formats")).filter(O)).map(function(t) {
                var n, e, o, r = (n = i, e = vS(t), o = function(t) {
                    T(t, function(t) {
                        n.formatter.has(t.name) || n.formatter.register(t.name, t.format)
                    })
                }, n.formatter ? o(e.customFormats) : n.on("init", function() {
                    o(e.customFormats)
                }), e.formats);
                return i.getParam("style_formats_merge", !1, "boolean") ? gS.concat(r) : r
            }).getOr(gS);
            var t
        },
        bS = function(t, n, e) {
            var o = {
                type: "formatter",
                isSelected: n(t.format),
                getStylePreview: e(t.format)
            };
            return vt(t, o)
        },
        yS = function(s, t, l, f) {
            var d = function(t) {
                return V(t, function(t) {
                    var n, e, o, r, i, u, a = K(t);
                    if (Ct(t, "items")) {
                        var c = d(t.items);
                        return vt((i = t, u = {
                            type: "submenu",
                            isSelected: Z(!1),
                            getStylePreview: function() {
                                return tt.none()
                            }
                        }, vt(i, u)), {
                            getStyleItems: function() {
                                return c
                            }
                        })
                    }
                    return Ct(t, "format") ? bS(t, l, f) : 1 === a.length && M(a, "title") ? vt(t, {
                        type: "separator"
                    }) : (e = Ye((n = t).title), o = {
                        type: "formatter",
                        format: e,
                        isSelected: l(e),
                        getStylePreview: f(e)
                    }, r = vt(n, o), s.formatter.register(e, r), r)
                })
            };
            return d(t)
        },
        xS = Dz.trim,
        wS = function(n) {
            return function(t) {
                if (t && 1 === t.nodeType) {
                    if (t.contentEditable === n) return !0;
                    if (t.getAttribute("data-mce-contenteditable") === n) return !0
                }
                return !1
            }
        },
        zS = wS("true"),
        SS = wS("false"),
        kS = function(t, n, e, o, r) {
            return {
                type: t,
                title: n,
                url: e,
                level: o,
                attach: r
            }
        },
        CS = function(t) {
            return t.innerText || t.textContent
        },
        OS = function(t) {
            return (n = t) && "A" === n.nodeName && (n.id || n.name) !== undefined && HS(t);
            var n
        },
        MS = function(t) {
            return t && /^(H[1-6])$/.test(t.nodeName)
        },
        HS = function(t) {
            return function(t) {
                for (; t = t.parentNode;) {
                    var n = t.contentEditable;
                    if (n && "inherit" !== n) return zS(t)
                }
                return !1
            }(t) && !SS(t)
        },
        ES = function(t) {
            return MS(t) && HS(t)
        },
        VS = function(t) {
            var n, e, o = (n = t).id ? n.id : Ye("h");
            return kS("header", CS(t), "#" + o, MS(e = t) ? parseInt(e.nodeName.substr(1), 10) : 0, function() {
                t.id = o
            })
        },
        TS = function(t) {
            var n = t.id || t.name,
                e = CS(t);
            return kS("anchor", e || "#" + n, "#" + n, 0, Q)
        },
        AS = function(t) {
            var n, e;
            return n = "h1,h2,h3,h4,h5,h6,a:not([href])", e = t, V(Vc(Gn.fromDom(e), n), function(t) {
                return t.dom()
            })
        },
        BS = function(t) {
            return 0 < xS(t.title).length
        },
        DS = function(t) {
            var n, e = AS(t);
            return A((n = e, V(A(n, ES), VS)).concat(V(A(e, OS), TS)), BS)
        },
        _S = "tinymce-url-history",
        FS = function(t) {
            return x(t) && /^https?/.test(t)
        },
        IS = function(t) {
            return w(t) && function(t, n) {
                for (var e = K(t), o = 0, r = e.length; o < r; o++) {
                    var i = e[o],
                        u = t[i];
                    if (n(u, i, t)) return tt.some(u)
                }
                return tt.none()
            }(t, function(t) {
                return !(O(n = t) && n.length <= 5 && P(n, FS));
                var n
            }).isNone()
        },
        LS = function() {
            var t, n = localStorage.getItem(_S);
            if (null === n) return {};
            try {
                t = JSON.parse(n)
            } catch (e) {
                if (e instanceof SyntaxError) return console.log("Local storage " + _S + " was not valid JSON", e), {};
                throw e
            }
            return IS(t) ? t : (console.log("Local storage " + _S + " was not valid format", t), {})
        },
        RS = function(t) {
            var n = LS();
            return Object.prototype.hasOwnProperty.call(n, t) ? n[t] : []
        },
        NS = function(n, t) {
            if (FS(n)) {
                var e = LS(),
                    o = Object.prototype.hasOwnProperty.call(e, t) ? e[t] : [],
                    r = A(o, function(t) {
                        return t !== n
                    });
                e[t] = [n].concat(r).slice(0, 5),
                    function(t) {
                        if (!IS(t)) throw new Error("Bad format for history:\n" + JSON.stringify(t));
                        localStorage.setItem(_S, JSON.stringify(t))
                    }(e)
            }
        },
        PS = Object.prototype.hasOwnProperty,
        jS = function(t) {
            return !!t
        },
        US = function(t) {
            return nt(Dz.makeMap(t, /[, ]/), jS)
        },
        WS = function(t, n) {
            return PS.call(t, n) ? tt.some(t[n]) : tt.none()
        },
        GS = function(t, n, e) {
            var o = WS(t, n).getOr(e);
            return x(o) ? tt.some(o) : tt.none()
        },
        XS = function(a) {
            return function(r) {
                return (t = a.settings, n = r, e = tt.some(t.file_picker_types).filter(jS), o = tt.some(t.file_browser_callback_types).filter(jS), i = e.or(o).map(US).fold(function() {
                    return !0
                }, function(t) {
                    return WS(t, n).getOr(!1)
                }), u = tt.some(t.file_picker_callback).filter(S), i ? u : tt.none()).map(function(o) {
                    return function(n) {
                        return ip.nu(function(e) {
                            var t = Dz.extend({
                                filetype: r
                            }, tt.from(n.meta).getOr({}));
                            o.call(a, function(t, n) {
                                if (!x(t)) throw new Error("Expected value to be string");
                                if (n !== undefined && !w(n)) throw new Error("Expected meta to be a object");
                                e({
                                    value: t,
                                    meta: n
                                })
                            }, n.value, t)
                        })
                    }
                });
                var t, n, e, o, i, u
            }
        },
        YS = function(t) {
            return {
                getHistory: RS,
                addToHistory: NS,
                getLinkInformation: (e = t, function() {
                    return !1 === e.settings.typeahead_urls ? tt.none() : tt.some({
                        targets: DS(e.getBody()),
                        anchorTop: GS(e.settings, "anchor_top", "#top"),
                        anchorBottom: GS(e.settings, "anchor_bottom", "#bottom")
                    })
                }),
                getValidationHandler: (n = t, function() {
                    var t = n.settings.filepicker_validator_handler;
                    return S(t) ? tt.some(t) : tt.none()
                }),
                getUrlPicker: XS(t)
            };
            var n, e
        },
        qS = {
            valignCentre: [],
            alignCentre: [],
            alignLeft: [],
            alignRight: [],
            right: [],
            left: [],
            bottom: [],
            top: []
        },
        KS = function(t, n, e) {
            var o, r, i, u, a, c, s, l, f, d = {
                shared: {
                    providers: {
                        icons: function() {
                            return n.ui.registry.getAll().icons
                        },
                        menuItems: function() {
                            return n.ui.registry.getAll().menuItems
                        },
                        translate: ig.translate
                    },
                    interpreter: function(t) {
                        return mS(fS, t, d)
                    },
                    anchors: {
                        toolbar: function() {
                            return {
                                anchor: "hotspot",
                                hotspot: e(),
                                bubble: Xa(-12, 12, qS),
                                layouts: {
                                    onRtl: function() {
                                        return [nc]
                                    },
                                    onLtr: function() {
                                        return [ec]
                                    }
                                }
                            }
                        },
                        banner: function() {
                            return {
                                anchor: "hotspot",
                                hotspot: e(),
                                layouts: {
                                    onRtl: function() {
                                        return [uc]
                                    },
                                    onLtr: function() {
                                        return [uc]
                                    }
                                }
                            }
                        },
                        cursor: function() {
                            return {
                                anchor: "selection",
                                root: Gn.fromDom(n.getBody()),
                                getSelection: function() {
                                    var t = n.selection.getRng();
                                    return tt.some(yc(Gn.fromDom(t.startContainer), t.startOffset, Gn.fromDom(t.endContainer), t.endOffset))
                                }
                            }
                        },
                        node: function(t) {
                            return {
                                anchor: "node",
                                root: Gn.fromDom(n.getBody()),
                                node: t
                            }
                        }
                    },
                    getSink: function() {
                        return dt.value(t)
                    }
                },
                urlinput: YS(n),
                styleselect: (o = n, r = function(t) {
                    return function() {
                        return o.formatter.match(t)
                    }
                }, i = function(n) {
                    return function() {
                        var t = o.formatter.get(n);
                        return t !== undefined ? tt.some({
                            tag: 0 < t.length && (t[0].inline || t[0].block) || "div",
                            styleAttr: o.formatter.getCssText(n)
                        }) : tt.none()
                    }
                }, u = function(t) {
                    var n = t.items;
                    return n !== undefined && 0 < n.length ? N(n, u) : [t.format]
                }, a = Ot([]), c = Ot([]), s = Ot([]), l = Ot([]), f = Ot(!1), o.on("init", function() {
                    var t = pS(o),
                        n = yS(o, t, r, i);
                    a.set(n), c.set(N(n, u))
                }), o.on("addStyleModifications", function(t) {
                    var n = yS(o, t.items, r, i);
                    s.set(n), f.set(t.replace), l.set(N(n, u))
                }), {
                    getData: function() {
                        var t = f.get() ? [] : a.get(),
                            n = s.get();
                        return t.concat(n)
                    },
                    getFlattenedKeys: function() {
                        var t = f.get() ? [] : c.get(),
                            n = l.get();
                        return t.concat(n)
                    }
                }),
                colorinput: hS(n)
            };
            return d
        },
        JS = tinymce.util.Tools.resolve("tinymce.util.Delay"),
        $S = Z([vr("shell", !0), Ds("toolbarBehaviours", [$d])]),
        QS = Z([ll({
            name: "groups",
            overrides: function(t) {
                return {
                    behaviours: Ru([$d.config({})])
                }
            }
        })]),
        ZS = Il({
            name: "Toolbar",
            configFields: $S(),
            partFields: QS(),
            factory: function(n, t, e, o) {
                var r = function(t) {
                        return n.shell ? tt.some(t) : zl(t, n, "groups")
                    },
                    i = n.shell ? {
                        behaviours: [$d.config({})],
                        components: []
                    } : {
                        behaviours: [],
                        components: t
                    };
                return {
                    uid: n.uid,
                    dom: n.dom,
                    components: i.components,
                    behaviours: Fs(n.toolbarBehaviours, i.behaviours),
                    apis: {
                        setGroups: function(t, n) {
                            r(t).fold(function() {
                                throw console.error("Toolbar was defined to not be a shell, but no groups container was specified in components"), new Error("Toolbar was defined to not be a shell, but no groups container was specified in components")
                            }, function(t) {
                                $d.set(t, n)
                            })
                        }
                    },
                    domModification: {
                        attributes: {
                            role: "group"
                        }
                    }
                }
            },
            apis: {
                setGroups: function(t, n, e) {
                    t.setGroups(n, e)
                }
            }
        }),
        tk = Z([or("items"), Cu(["itemSelector"]), Ds("tgroupBehaviours", [Xd])]),
        nk = Z([fl({
            name: "items",
            unit: "item"
        })]),
        ek = Il({
            name: "ToolbarGroup",
            configFields: tk(),
            partFields: nk(),
            factory: function(t, n, e, o) {
                return {
                    uid: t.uid,
                    dom: t.dom,
                    components: n,
                    behaviours: Fs(t.tgroupBehaviours, [Xd.config({
                        mode: "flow",
                        selector: t.markers.itemSelector
                    })]),
                    domModification: {
                        attributes: {
                            role: "toolbar"
                        }
                    }
                }
            }
        }),
        ok = function(t) {
            var n = t.title.fold(function() {
                return {}
            }, function(t) {
                return {
                    attributes: {
                        title: t
                    }
                }
            });
            return ek.sketch({
                dom: Ke({
                    tag: "div",
                    classes: ["tox-toolbar__group"]
                }, n),
                components: [ek.parts().items({})],
                items: t.items,
                markers: {
                    itemSelector: "*:not(.tox-split-button) > .tox-tbtn:not([disabled]), .tox-split-button:not([disabled]), .tox-toolbar-nav-js:not([disabled])"
                },
                tgroupBehaviours: Ru([nb.config({}), gm.config({})])
            })
        },
        rk = function(e) {
            var t = e.cyclicKeying ? "cyclic" : "acyclic";
            return ZS.sketch({
                uid: e.uid,
                dom: {
                    tag: "div",
                    classes: ["tox-toolbar"]
                },
                components: [ZS.parts().groups({})],
                toolbarBehaviours: Ru([Xd.config({
                    mode: t,
                    onEscape: e.onEscape,
                    selector: ".tox-toolbar__group"
                }), _m("toolbar-events", [ei(function(t) {
                    var n = V(e.initGroups, ok);
                    ZS.setGroups(t, n)
                })])])
            })
        },
        ik = [wr("disabled", !1), mr("tooltip"), mr("icon"), mr("text"), zr("onSetup", function() {
            return Q
        })],
        uk = Bo([ir("type"), ar("onAction")].concat(ik)),
        ak = function(t) {
            return Go("toolbarbutton", uk, t)
        },
        ck = Bo([ir("type"), mr("tooltip"), mr("icon"), mr("text"), ar("fetch"), zr("onSetup", function() {
            return Q
        })]),
        sk = Bo([ir("type"), mr("tooltip"), mr("icon"), mr("text"), hr("select"), ar("fetch"), zr("onSetup", function() {
            return Q
        }), xr("presets", "normal", ["normal", "color", "toolbar"]), vr("columns", 1), ar("onAction"), ar("onItemAction")]),
        lk = [wr("active", !1)].concat(ik),
        fk = Bo(lk.concat([ir("type"), ar("onAction")])),
        dk = function(t) {
            return Go("ToggleButton", fk, t)
        },
        mk = [zr("predicate", function() {
            return !1
        }), xr("scope", "node", ["node", "editor"]), xr("position", "selection", ["node", "selection", "line"])],
        hk = ik.concat([vr("type", "contextformbutton"), vr("primary", !1), ar("onAction"), kr("original", d)]),
        gk = lk.concat([vr("type", "contextformbutton"), vr("primary", !1), ar("onAction"), kr("original", d)]),
        vk = ik.concat([vr("type", "contextformbutton")]),
        pk = lk.concat([vr("type", "contextformtogglebutton")]),
        bk = Ko("type", {
            contextformbutton: hk,
            contextformtogglebutton: gk
        }),
        yk = Bo([vr("type", "contextform"), zr("initValue", function() {
            return ""
        }), mr("label"), lr("commands", bk), dr("launch", Ko("type", {
            contextformbutton: vk,
            contextformtogglebutton: pk
        }))].concat(mk)),
        xk = Bo([vr("type", "contexttoolbar"), ir("items")].concat(mk)),
        wk = Ye("toolbar.button.execute"),
        zk = {
            "alloy.execute": ["disabling", "alloy.base.behaviour", "toggling", "toolbar-button-events"]
        },
        Sk = /* */ Object.freeze({
            getState: function(t, n, e) {
                return e
            }
        }),
        kk = /* */ Object.freeze({
            events: function(r, i) {
                var o = function(e, o) {
                    r.updateState.each(function(t) {
                        var n = t(e, o);
                        i.set(n)
                    }), r.renderComponents.each(function(t) {
                        var n = t(o, i.get());
                        vs(e), T(n, function(t) {
                            ds(e, e.getSystem().build(t))
                        })
                    })
                };
                return Gr([qr(kn(), function(t, n) {
                    var e = r.channel;
                    M(n.channels(), e) && o(t, n.data())
                }), ei(function(n, t) {
                    r.initialData.each(function(t) {
                        o(n, t)
                    })
                })])
            }
        }),
        Ck = /* */ Object.freeze({
            init: function(t) {
                var n = Ot(tt.none());
                return {
                    readState: function() {
                        return n.get().getOr("none")
                    },
                    get: function() {
                        return n.get()
                    },
                    set: function(t) {
                        return n.set(t)
                    },
                    clear: function() {
                        return n.set(tt.none())
                    }
                }
            }
        }),
        Ok = [or("channel"), fr("renderComponents"), fr("updateState"), fr("initialData")],
        Mk = Pu({
            fields: Ok,
            name: "reflecting",
            active: kk,
            apis: Sk,
            state: Ck
        }),
        Hk = Z([or("toggleClass"), or("fetch"), Eu("onExecute"), vr("getHotspot", tt.some), vr("layouts", tt.none()), Eu("onItemExecute"), fr("lazySink"), or("dom"), Mu("onOpen"), Ds("splitDropdownBehaviours", [Jv, Xd, gm]), vr("matchWidth", !1), vr("useMinWidth", !1), vr("eventOrder", {}), fr("role")].concat(Sp())),
        Ek = cl({
            factory: Qm,
            schema: [or("dom")],
            name: "arrow",
            defaults: function(t) {
                return {
                    buttonBehaviours: Ru([gm.revoke()])
                }
            },
            overrides: function(n) {
                return {
                    dom: {
                        tag: "span",
                        attributes: {
                            role: "presentation"
                        }
                    },
                    action: function(t) {
                        t.getSystem().getByUid(n.uid).each(Vr)
                    },
                    buttonBehaviours: Ru([Hm.config({
                        toggleOnExecute: !1,
                        toggleClass: n.toggleClass
                    })])
                }
            }
        }),
        Vk = cl({
            factory: Qm,
            schema: [or("dom")],
            name: "button",
            defaults: function(t) {
                return {
                    buttonBehaviours: Ru([gm.revoke()])
                }
            },
            overrides: function(e) {
                return {
                    dom: {
                        tag: "span",
                        attributes: {
                            role: "presentation"
                        }
                    },
                    action: function(n) {
                        n.getSystem().getByUid(e.uid).each(function(t) {
                            e.onExecute(t, n)
                        })
                    }
                }
            }
        }),
        Tk = Z([Ek, Vk, ll({
            factory: {
                sketch: function(t) {
                    return {
                        uid: t.uid,
                        dom: {
                            tag: "span",
                            styles: {
                                display: "none"
                            },
                            attributes: {
                                "aria-hidden": "true"
                            },
                            innerHtml: t.text
                        }
                    }
                }
            },
            schema: [or("text")],
            name: "aria-descriptor"
        }), sl({
            schema: [ku()],
            name: "menu",
            defaults: function(o) {
                return {
                    onExecute: function(n, e) {
                        n.getSystem().getByUid(o.uid).each(function(t) {
                            o.onItemExecute(t, n, e)
                        })
                    }
                }
            }
        }), ap()]),
        Ak = Il({
            name: "SplitDropdown",
            configFields: Hk(),
            partFields: Tk(),
            factory: function(o, t, n, e) {
                var r = function(t) {
                        Pl.getCurrent(t).each(function(t) {
                            tf.highlightFirst(t), Xd.focusIn(t)
                        })
                    },
                    i = function(t) {
                        fp(o, function(t) {
                            return t
                        }, t, e, r, Mv.HighlightFirst).get(Q)
                    },
                    u = function(t) {
                        var n = Sl(t, o, "button");
                        return Vr(n), tt.some(!0)
                    },
                    a = pt(Gr([ei(function(e, t) {
                        zl(e, o, "aria-descriptor").each(function(t) {
                            var n = Ye("aria");
                            Ee(t.element(), "id", n), Ee(e.element(), "aria-describedby", n)
                        })
                    })]), $m(tt.some(i)));
                return {
                    uid: o.uid,
                    dom: o.dom,
                    components: t,
                    eventOrder: Ke({}, o.eventOrder, {
                        "alloy.execute": ["disabling", "toggling", "alloy.base.behaviour"]
                    }),
                    events: a,
                    behaviours: Fs(o.splitDropdownBehaviours, [Jv.config({
                        others: {
                            sandbox: function(t) {
                                var n = Sl(t, o, "arrow");
                                return hp(o, t, {
                                    onOpen: function() {
                                        Hm.on(n), Hm.on(t)
                                    },
                                    onClose: function() {
                                        Hm.off(n), Hm.off(t)
                                    }
                                })
                            }
                        }
                    }), Xd.config({
                        mode: "special",
                        onSpace: u,
                        onEnter: u,
                        onDown: function(t) {
                            return i(t), tt.some(!0)
                        }
                    }), gm.config({}), Hm.config({
                        toggleOnExecute: !1,
                        aria: {
                            mode: "expanded"
                        }
                    })]),
                    domModification: {
                        attributes: {
                            role: o.role.getOr("button"),
                            "aria-haspopup": !0
                        }
                    }
                }
            }
        }),
        Bk = function(n) {
            return {
                isDisabled: function() {
                    return Ph.isDisabled(n)
                },
                setDisabled: function(t) {
                    return t ? Ph.disable(n) : Ph.enable(n)
                }
            }
        },
        Dk = function(n) {
            return {
                setActive: function(t) {
                    Hm.set(n, t)
                },
                isActive: function() {
                    return Hm.isOn(n)
                },
                isDisabled: function() {
                    return Ph.isDisabled(n)
                },
                setDisabled: function(t) {
                    return t ? Ph.disable(n) : Ph.enable(n)
                }
            }
        },
        _k = function(t, n) {
            return t.map(function(t) {
                return {
                    "aria-label": n.translate(t),
                    title: n.translate(t)
                }
            }).getOr({})
        },
        Fk = Ye("focus-button"),
        Ik = function(n, e, t, o, r, i) {
            var u;
            return {
                dom: {
                    tag: "button",
                    classes: ["tox-tbtn"].concat(e.isSome() ? ["tox-tbtn--select"] : []),
                    attributes: _k(t, i)
                },
                components: Cg([n.map(function(t) {
                    return cz(t, i.icons)
                }), e.map(function(t) {
                    return lz(t, "tox-tbtn", i)
                })]),
                eventOrder: (u = {}, u[At()] = ["focusing", "alloy.base.behaviour", "common-button-display-events"], u),
                buttonBehaviours: Ru([_m("common-button-display-events", [qr(At(), function(t, n) {
                    n.event().prevent(), Hr(t, Fk)
                })])].concat(o.map(function(t) {
                    return Mk.config({
                        channel: t,
                        initialData: {
                            icon: n,
                            text: e
                        },
                        renderComponents: function(t, n) {
                            return Cg([t.icon.map(function(t) {
                                return cz(t, i.icons)
                            }), t.text.map(function(t) {
                                return lz(t, "tox-tbtn", i)
                            })])
                        }
                    })
                }).toArray()).concat(r.getOr([])))
            }
        },
        Lk = function(t, n, e) {
            var o, r = Ot(Q),
                i = Ik(t.icon, t.text, t.tooltip, tt.none(), tt.none(), e);
            return Qm.sketch({
                dom: i.dom,
                components: i.components,
                eventOrder: zk,
                buttonBehaviours: Ru([_m("toolbar-button-events", [(o = {
                    onAction: t.onAction,
                    getApi: n.getApi
                }, ii(function(n, t) {
                    bg(o, n)(function(t) {
                        Er(n, wk, {
                            buttonApi: t
                        }), o.onAction(t)
                    })
                })), yg(n, r), xg(n, r)]), vg(t.disabled)].concat(n.toolbarButtonBehaviours))
            })
        },
        Rk = function(t, n, e) {
            return Lk(t, {
                toolbarButtonBehaviours: [].concat(0 < e.length ? [_m("toolbarButtonWith", e)] : []),
                getApi: Bk,
                onSetup: t.onSetup
            }, n)
        },
        Nk = function(t, n, e) {
            return vt(Lk(t, {
                toolbarButtonBehaviours: [$d.config({}), Hm.config({
                    toggleClass: "tox-tbtn--enabled",
                    aria: {
                        mode: "pressed"
                    },
                    toggleOnExecute: !1
                })].concat(0 < e.length ? [_m("toolbarToggleButtonWith", e)] : []),
                getApi: Dk,
                onSetup: t.onSetup
            }, n))
        },
        Pk = function(n, t) {
            var e, o, r, i, u = Ye("channel-update-split-dropdown-display"),
                a = function(e) {
                    return {
                        isDisabled: function() {
                            return Ph.isDisabled(e)
                        },
                        setDisabled: function(t) {
                            return t ? Ph.disable(e) : Ph.enable(e)
                        },
                        setIconFill: function(t, n) {
                            vu(e.element(), 'svg path[id="' + t + '"], rect[id="' + t + '"]').each(function(t) {
                                Ee(t, "fill", n)
                            })
                        },
                        setIconStroke: function(t, n) {
                            vu(e.element(), 'svg path[id="' + t + '"], rect[id="' + t + '"]').each(function(t) {
                                Ee(t, "stroke", n)
                            })
                        },
                        setActive: function(n) {
                            Ee(e.element(), "aria-pressed", n), vu(e.element(), "span").each(function(t) {
                                e.getSystem().getByDom(t).each(function(t) {
                                    return Hm.set(t, n)
                                })
                            })
                        },
                        isActive: function() {
                            return vu(e.element(), "span").exists(function(t) {
                                return e.getSystem().getByDom(t).exists(Hm.isOn)
                            })
                        }
                    }
                },
                c = Ot(Q),
                s = {
                    getApi: a,
                    onSetup: n.onSetup
                };
            return Ak.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-split-button"],
                    attributes: pt({
                        "aria-pressed": !1
                    }, _k(n.tooltip, t.providers))
                },
                onExecute: function(t) {
                    n.onAction(a(t))
                },
                onItemExecute: function(t, n, e) {},
                splitDropdownBehaviours: Ru([pg(!1), _m("split-dropdown-events", [qr(Fk, gm.focus), yg(s, c), xg(s, c)])]),
                eventOrder: (e = {}, e[_n()] = ["alloy.base.behaviour", "split-dropdown-events"], e),
                toggleClass: "tox-tbtn--enabled",
                lazySink: t.getSink,
                fetch: (o = a, r = n, i = t.providers, function(n) {
                    return ip.nu(function(t) {
                        return r.fetch(t)
                    }).map(function(t) {
                        return tt.from(ev(vt(tv(Ye("menu-value"), t, function(t) {
                            r.onItemAction(o(n), t)
                        }, r.columns, r.presets, Sg.CLOSE_ON_EXECUTE, r.select.getOr(function() {
                            return !1
                        }), i), {
                            movement: Wg(r.columns, r.presets),
                            menuBehaviours: Hh("auto" !== r.columns ? [] : [ei(function(o, t) {
                                Oh(o, 4, rg(r.presets)).each(function(t) {
                                    var n = t.numRows,
                                        e = t.numColumns;
                                    Xd.setGridSize(o, n, e)
                                })
                            })])
                        })))
                    })
                }),
                parts: {
                    menu: Ug(0, n.columns, n.presets)
                },
                components: [Ak.parts().button(Ik(n.icon, n.text, tt.none(), tt.some(u), tt.some([Hm.config({
                    toggleClass: "tox-tbtn--enabled",
                    toggleOnExecute: !1
                })]), t.providers)), Ak.parts().arrow({
                    dom: {
                        tag: "button",
                        classes: ["tox-tbtn", "tox-split-button__chevron"],
                        innerHtml: eh("chevron-down", t.providers.icons)
                    }
                }), Ak.parts()["aria-descriptor"]({
                    text: t.providers.translate("To open the popup, press Shift+Enter")
                })]
            })
        },
        jk = function(i, u) {
            return qr(wk, function(t, n) {
                var e, o = i.get(t),
                    r = (e = o, {
                        hide: function() {
                            return Hr(e, Vn())
                        },
                        getValue: function() {
                            return lm.getValue(e)
                        }
                    });
                u.onAction(r, n.event().buttonApi())
            })
        },
        Uk = function(t, n, e) {
            var o, r, i, u, a, c, s, l, f, d, m, h, g = {
                backstage: {
                    shared: {
                        providers: e
                    }
                }
            };
            return "contextformtogglebutton" === n.type ? (s = t, f = g, (d = (l = n).original).primary, m = Je(d, ["primary"]), h = Xo(dk(Ke({}, m, {
                type: "togglebutton",
                onAction: function() {}
            }))), Nk(h, f.backstage.shared.providers, [jk(s, l)])) : (o = t, i = g, (u = (r = n).original).primary, a = Je(u, ["primary"]), c = Xo(ak(Ke({}, a, {
                type: "button",
                onAction: function() {}
            }))), Rk(c, i.backstage.shared.providers, [jk(o, r)]))
        },
        Wk = function(t, n) {
            var e, o, r, i, u = t.label.fold(function() {
                    return {}
                }, function(t) {
                    return {
                        "aria-label": t
                    }
                }),
                a = Zm(Lp.sketch({
                    inputClasses: ["tox-toolbar-textfield", "tox-toolbar-nav-js"],
                    data: t.initValue(),
                    inputAttributes: u,
                    selectOnFocus: !0,
                    inputBehaviours: Ru([Xd.config({
                        mode: "special",
                        onEnter: function(t) {
                            return c.findPrimary(t).map(function(t) {
                                return Vr(t), !0
                            })
                        },
                        onLeft: function(t, n) {
                            return n.cut(), tt.none()
                        },
                        onRight: function(t, n) {
                            return n.cut(), tt.none()
                        }
                    })])
                })),
                c = (e = a, o = t.commands, r = n, i = V(o, function(t) {
                    return Zm(Uk(e, t, r))
                }), {
                    asSpecs: function() {
                        return V(i, function(t) {
                            return t.asSpec()
                        })
                    },
                    findPrimary: function(e) {
                        return Ht(o, function(t, n) {
                            return t.primary ? tt.from(i[n]).bind(function(t) {
                                return t.getOpt(e)
                            }).filter(m(Ph.isDisabled)) : tt.none()
                        })
                    }
                });
            return rk({
                uid: Ye("context-toolbar"),
                initGroups: [{
                    title: tt.none(),
                    items: [a.asSpec()]
                }, {
                    title: tt.none(),
                    items: c.asSpecs()
                }],
                onEscape: tt.none,
                cyclicKeying: !0
            })
        },
        Gk = Ye("forward-slide"),
        Xk = Ye("backward-slide"),
        Yk = Ye("change-slide-event"),
        qk = "tox-pop--resizing",
        Kk = function(n, t) {
            return Ht(t, function(t) {
                return t.predicate(n.dom()) ? tt.some({
                    toolbarApi: t,
                    elem: n
                }) : tt.none()
            })
        },
        Jk = function(n, e) {
            var t = function(t) {
                    return t.dom() === e.getBody()
                },
                o = Gn.fromDom(e.selection.getNode());
            return Kk(o, n.inNodeScope).orThunk(function() {
                return Kk(o, n.inEditorScope).orThunk(function() {
                    return function(t, n, e) {
                        for (var o = t.dom(), r = S(e) ? e : Z(!1); o.parentNode;) {
                            o = o.parentNode;
                            var i = Gn.fromDom(o),
                                u = n(i);
                            if (u.isSome()) return u;
                            if (r(i)) break
                        }
                        return tt.none()
                    }(o, function(t) {
                        return Kk(t, n.inNodeScope)
                    }, t)
                })
            })
        },
        $k = function(e, r) {
            var t = {},
                i = [],
                u = [],
                a = {},
                c = {},
                o = function(n, e) {
                    var o = Xo(Go("ContextForm", yk, e));
                    (t[n] = o).launch.map(function(t) {
                        a["form:" + n] = Ke({}, e.launch, {
                            type: "contextformtogglebutton" === t.type ? "togglebutton" : "button",
                            onAction: function() {
                                r(o)
                            }
                        })
                    }), "editor" === o.scope ? u.push(o) : i.push(o), c[n] = o
                },
                s = function(n, e) {
                    var t;
                    (t = e, Go("ContextToolbar", xk, t)).each(function(t) {
                        "editor" === e.scope ? u.push(t) : i.push(t), c[n] = t
                    })
                },
                n = K(e);
            return T(n, function(t) {
                var n = e[t];
                "contextform" === n.type ? o(t, n) : "contexttoolbar" === n.type && s(t, n)
            }), {
                forms: t,
                inNodeScope: i,
                inEditorScope: u,
                lookupTable: c,
                formNavigators: a
            }
        },
        Qk = Ye("update-menu-text"),
        Zk = Ye("update-menu-icon"),
        tC = function(t, n, o) {
            var r = t.text.map(function(t) {
                    return Zm(lz(t, n, o.providers))
                }),
                i = t.icon.map(function(t) {
                    return Zm(sz(t, o.providers.icons))
                }),
                e = function(t, n) {
                    var e = lm.getValue(t);
                    return gm.focus(e), Er(e, "keydown", {
                        raw: n.event().raw()
                    }), Wb.close(e), tt.some(!0)
                },
                u = t.role.fold(function() {
                    return {}
                }, function(t) {
                    return {
                        role: t
                    }
                }),
                a = t.tooltip.fold(function() {
                    return {}
                }, function(t) {
                    var n = o.providers.translate(t);
                    return {
                        title: n,
                        "aria-label": n
                    }
                });
            return Zm(Wb.sketch(Ke({}, u, {
                dom: {
                    tag: "button",
                    classes: [n, n + "--select"].concat(V(t.classes, function(t) {
                        return n + "--" + t
                    })),
                    attributes: Ke({}, a)
                },
                components: Cg([i.map(function(t) {
                    return t.asSpec()
                }), r.map(function(t) {
                    return t.asSpec()
                }), tt.some({
                    dom: {
                        tag: "div",
                        classes: [n + "__select-chevron"],
                        innerHtml: eh("chevron-down", o.providers.icons)
                    }
                })]),
                matchWidth: !0,
                useMinWidth: !0,
                dropdownBehaviours: Ru([vg(t.disabled), Gb.config({}), $d.config({}), _m("menubutton-update-display-text", [ei(t.onAttach), oi(t.onDetach), qr(Qk, function(n, e) {
                    r.bind(function(t) {
                        return t.getOpt(n)
                    }).each(function(t) {
                        $d.set(t, [lu(o.providers.translate(e.event().text()))])
                    })
                }), qr(Zk, function(n, e) {
                    i.bind(function(t) {
                        return t.getOpt(n)
                    }).each(function(t) {
                        $d.set(t, [sz(e.event().icon(), o.providers.icons)])
                    })
                })])]),
                eventOrder: vt(zk, {
                    mousedown: ["focusing", "alloy.base.behaviour", "item-type-events", "normal-dropdown-events"]
                }),
                sandboxBehaviours: Ru([Xd.config({
                    mode: "special",
                    onLeft: e,
                    onRight: e
                })]),
                lazySink: o.getSink,
                toggleClass: n + "--active",
                parts: {
                    menu: Ug(0, t.columns, t.presets)
                },
                fetch: function() {
                    return ip.nu(t.fetch)
                }
            }))).asSpec()
        },
        nC = function(t, n, e, o) {
            var r, i, u, a, c, s = "basic" === e.type ? function() {
                return V(e.data, function(t) {
                    return bS(t, o.isSelectedFor, o.getPreviewFor)
                })
            } : e.getData;
            return {
                items: (r = n, i = o, u = function(t, n, e) {
                    var o = r.shared.providers.translate(t.title);
                    return "separator" === t.type ? {
                        type: "separator",
                        text: o
                    } : "submenu" === t.type ? {
                        type: "nestedmenuitem",
                        text: o,
                        disabled: e,
                        getSubmenuItems: function() {
                            return N(t.getStyleItems(), function(t) {
                                return a(t, n)
                            })
                        }
                    } : Ke({
                        type: "togglemenuitem",
                        text: o,
                        active: t.isSelected(),
                        disabled: e,
                        onAction: i.onAction(t)
                    }, t.getStylePreview().fold(function() {
                        return {}
                    }, function(t) {
                        return {
                            meta: {
                                style: t
                            }
                        }
                    }))
                }, a = function(t, n) {
                    var e = "formatter" === t.type && i.isInvalid(t);
                    return 0 === n ? e ? [] : [u(t, n, !1)] : [u(t, n, e)]
                }, c = function(t) {
                    var n = i.shouldHide ? 0 : 1;
                    return N(t, function(t) {
                        return a(t, n)
                    })
                }, {
                    validateItems: c,
                    getFetch: function(o, r) {
                        return function(t) {
                            var n = r(),
                                e = c(n);
                            t(Ip(e, Sg.CLOSE_ON_EXECUTE, o.shared.providers))
                        }
                    }
                }),
                getStyleItems: s
            }
        },
        eC = function(e, t, n, o) {
            var r = nC(0, t, n, o),
                i = r.items,
                u = r.getStyleItems;
            return tC({
                text: o.icon.isSome() ? tt.none() : tt.some(""),
                icon: o.icon,
                tooltip: tt.from(o.tooltip),
                role: tt.none(),
                fetch: i.getFetch(t, u),
                onAttach: o.nodeChangeHandler.map(function(n) {
                    return function(t) {
                        return e.on("nodeChange", n(t))
                    }
                }).getOr(function() {}),
                onDetach: o.nodeChangeHandler.map(function(n) {
                    return function(t) {
                        return e.off("nodeChange", n(t))
                    }
                }).getOr(function() {}),
                columns: 1,
                presets: "normal",
                classes: o.icon.isSome() ? [] : ["bespoke"]
            }, "tox-tbtn", t.shared)
        };
    (Nz = Rz || (Rz = {}))[Nz.SemiColon = 0] = "SemiColon", Nz[Nz.Space = 1] = "Space";
    var oC, rC, iC = function(t, n, e, o) {
            var r, i, u = wt(t.settings, n).getOr(e);
            return {
                type: "basic",
                data: (i = u, r = o === Rz.SemiColon ? i.replace(/;$/, "").split(";") : i.split(" "), V(r, function(t) {
                    var n = t,
                        e = t,
                        o = t.split("=");
                    return 1 < o.length && (n = o[0], e = o[1]), {
                        title: n,
                        format: e
                    }
                }))
            }
        },
        uC = [{
            title: "Left",
            icon: "align-left",
            format: "alignleft"
        }, {
            title: "Center",
            icon: "align-center",
            format: "aligncenter"
        }, {
            title: "Right",
            icon: "align-right",
            format: "alignright"
        }, {
            title: "Justify",
            icon: "align-justify",
            format: "alignjustify"
        }],
        aC = function(e) {
            var t = tt.some(function(n) {
                    return function() {
                        var t = _(uC, function(t) {
                            return e.formatter.match(t.format)
                        }).fold(function() {
                            return "left"
                        }, function(t) {
                            return t.title.toLowerCase()
                        });
                        Er(n, Zk, {
                            icon: "align-" + t
                        })
                    }
                }),
                n = {
                    type: "basic",
                    data: uC
                };
            return {
                tooltip: "Align",
                icon: tt.some("align-left"),
                isSelectedFor: function(t) {
                    return function() {
                        return e.formatter.match(t)
                    }
                },
                getPreviewFor: function(t) {
                    return function() {
                        return tt.none()
                    }
                },
                onAction: function(t) {
                    return function() {
                        e.undoManager.transact(function() {
                            e.focus(), e.formatter.match(t.format) ? e.formatter.remove(t.format) : e.formatter.apply(t.format)
                        })
                    }
                },
                nodeChangeHandler: t,
                dataset: n,
                shouldHide: !1,
                isInvalid: function(t) {
                    return !e.formatter.canApply(t.format)
                }
            }
        },
        cC = ["-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "sans-serif"],
        sC = function(r) {
            var o = function() {
                    var e = function(t) {
                            return t ? t.split(",")[0] : ""
                        },
                        t = r.queryCommandValue("FontName"),
                        n = i.data,
                        o = t ? t.toLowerCase() : "";
                    return _(n, function(t) {
                        var n = t.format;
                        return n.toLowerCase() === o || e(n).toLowerCase() === e(o).toLowerCase()
                    }).orThunk(function() {
                        return 0 === (t = o).indexOf("-apple-system") && (n = t.toLowerCase().split(/['"]?\s*,\s*['"]?/), P(cC, function(t) {
                            return -1 < n.indexOf(t.toLowerCase())
                        })) ? tt.from({
                            title: "System Font",
                            format: o
                        }) : tt.none();
                        var t, n
                    })
                },
                t = tt.some(function(e) {
                    return function() {
                        var t = r.queryCommandValue("FontName"),
                            n = o().fold(function() {
                                return t
                            }, function(t) {
                                return t.title
                            });
                        Er(e, Qk, {
                            text: n
                        })
                    }
                }),
                i = iC(r, "font_formats", "Andale Mono=andale mono,monospace;Arial=arial,helvetica,sans-serif;Arial Black=arial black,sans-serif;Book Antiqua=book antiqua,palatino,serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,palatino,serif;Helvetica=helvetica,arial,sans-serif;Impact=impact,sans-serif;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco,monospace;Times New Roman=times new roman,times,serif;Trebuchet MS=trebuchet ms,geneva,sans-serif;Verdana=verdana,geneva,sans-serif;Webdings=webdings;Wingdings=wingdings,zapf dingbats", Rz.SemiColon);
            return {
                tooltip: "Fonts",
                icon: tt.none(),
                isSelectedFor: function(n) {
                    return function() {
                        return o().exists(function(t) {
                            return t.format === n
                        })
                    }
                },
                getPreviewFor: function(t) {
                    return function() {
                        return tt.some({
                            tag: "div",
                            styleAttr: -1 === t.indexOf("dings") ? "font-family:" + t : ""
                        })
                    }
                },
                onAction: function(t) {
                    return function() {
                        r.undoManager.transact(function() {
                            r.focus(), r.execCommand("FontName", !1, t.format)
                        })
                    }
                },
                nodeChangeHandler: t,
                dataset: i,
                shouldHide: !1,
                isInvalid: function() {
                    return !1
                }
            }
        },
        lC = function(t, n) {
            return /[0-9.]+px$/.test(t) ? (e = 72 * parseInt(t, 10) / 96, o = n || 0, r = Math.pow(10, o), Math.round(e * r) / r + "pt") : t;
            var e, o, r
        },
        fC = function(i) {
            var u = function() {
                    var e = tt.none(),
                        o = a.data,
                        r = i.queryCommandValue("FontSize");
                    if (r)
                        for (var t = function(t) {
                                var n = lC(r, t);
                                e = _(o, function(t) {
                                    return t.format === r || t.format === n
                                })
                            }, n = 3; e.isNone() && 0 <= n; n--) t(n);
                    return {
                        matchOpt: e,
                        px: r
                    }
                },
                t = tt.some(function(r) {
                    return function() {
                        var t = u(),
                            n = t.matchOpt,
                            e = t.px,
                            o = n.fold(function() {
                                return e
                            }, function(t) {
                                return t.title
                            });
                        Er(r, Qk, {
                            text: o
                        })
                    }
                }),
                a = iC(i, "fontsize_formats", "8pt 10pt 12pt 14pt 18pt 24pt 36pt", Rz.Space);
            return {
                tooltip: "Font sizes",
                icon: tt.none(),
                isSelectedFor: function(n) {
                    return function() {
                        return u().matchOpt.exists(function(t) {
                            return t.format === n
                        })
                    }
                },
                getPreviewFor: function() {
                    return function() {
                        return tt.none()
                    }
                },
                onAction: function(t) {
                    return function() {
                        i.undoManager.transact(function() {
                            i.focus(), i.execCommand("FontSize", !1, t.format)
                        })
                    }
                },
                nodeChangeHandler: t,
                dataset: a,
                shouldHide: !1,
                isInvalid: function() {
                    return !1
                }
            }
        },
        dC = function(e, t, n) {
            var o = n.parents,
                r = t();
            return Ht(o, function(n) {
                return _(r, function(t) {
                    return e.formatter.matchNode(n, t.format)
                })
            }).orThunk(function() {
                return e.formatter.match("p") ? tt.some({
                    title: "Paragraph",
                    format: "p"
                }) : tt.none()
            })
        },
        mC = function(o) {
            var t = tt.some(function(e) {
                    return function(t) {
                        var n = dC(o, function() {
                            return r.data
                        }, t).fold(function() {
                            return "Paragraph"
                        }, function(t) {
                            return t.title
                        });
                        Er(e, Qk, {
                            text: n
                        })
                    }
                }),
                r = iC(o, "block_formats", "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre", Rz.SemiColon);
            return {
                tooltip: "Blocks",
                icon: tt.none(),
                isSelectedFor: function(t) {
                    return function() {
                        return o.formatter.match(t)
                    }
                },
                getPreviewFor: function(n) {
                    return function() {
                        var t = o.formatter.get(n);
                        return tt.some({
                            tag: 0 < t.length && (t[0].inline || t[0].block) || "div",
                            styleAttr: o.formatter.getCssText(n)
                        })
                    }
                },
                onAction: function(t) {
                    return function() {
                        o.undoManager.transact(function() {
                            o.focus(), o.formatter.match(t.format) ? o.formatter.remove(t.format) : o.formatter.apply(t.format)
                        })
                    }
                },
                nodeChangeHandler: t,
                dataset: r,
                shouldHide: !1,
                isInvalid: function(t) {
                    return !o.formatter.canApply(t.format)
                }
            }
        },
        hC = function(i) {
            var t = tt.some(function(e) {
                var o = function(t) {
                        var n = t.items;
                        return n !== undefined && 0 < n.length ? N(n, o) : [{
                            title: t.title,
                            format: t.format
                        }]
                    },
                    r = N(pS(i), o);
                return function(t) {
                    var n = dC(i, function() {
                        return r
                    }, t).fold(function() {
                        return "Paragraph"
                    }, function(t) {
                        return t.title
                    });
                    Er(e, Qk, {
                        text: n
                    })
                }
            });
            return {
                tooltip: "Formats",
                icon: tt.none(),
                isSelectedFor: function(t) {
                    return function() {
                        return i.formatter.match(t)
                    }
                },
                getPreviewFor: function(n) {
                    return function() {
                        var t = i.formatter.get(n);
                        return t !== undefined ? tt.some({
                            tag: 0 < t.length && (t[0].inline || t[0].block) || "div",
                            styleAttr: i.formatter.getCssText(n)
                        }) : tt.none()
                    }
                },
                onAction: function(t) {
                    return function() {
                        i.undoManager.transact(function() {
                            i.focus(), i.formatter.match(t.format) ? i.formatter.remove(t.format) : i.formatter.apply(t.format)
                        })
                    }
                },
                nodeChangeHandler: t,
                shouldHide: i.getParam("style_formats_autohide", !1, "boolean"),
                isInvalid: function(t) {
                    return !i.formatter.canApply(t.format)
                }
            }
        },
        gC = {
            file: {
                title: "File",
                items: "newdocument restoredraft | preview | print | deleteallconversations"
            },
            edit: {
                title: "Edit",
                items: "undo redo | cut copy paste pastetext | selectall | searchreplace"
            },
            view: {
                title: "View",
                items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments"
            },
            insert: {
                title: "Insert",
                items: "image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime"
            },
            format: {
                title: "Format",
                items: "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | removeformat"
            },
            tools: {
                title: "Tools",
                items: "spellchecker spellcheckerlanguage | a11ycheck code wordcount"
            },
            table: {
                title: "Table",
                items: "inserttable tableprops deletetable row column cell"
            },
            help: {
                title: "Help",
                items: "help"
            }
        },
        vC = function(t, n, e, o) {
            return tC({
                text: t.text,
                icon: t.icon,
                tooltip: t.tooltip,
                role: o,
                fetch: function(n) {
                    t.fetch(function(t) {
                        n(Ip(t, Sg.CLOSE_ON_EXECUTE, e.providers))
                    })
                },
                onAttach: function() {},
                onDetach: function() {},
                columns: 1,
                presets: "normal",
                classes: []
            }, n, e)
        },
        pC = function(t) {
            return "string" == typeof t ? t.split(" ") : t
        },
        bC = function(u, a) {
            var c = pt(gC, a.menus),
                n = 0 < K(a.menus).length,
                t = a.menubar === undefined || !0 === a.menubar ? pC("file edit view insert format tools table help") : pC(!1 === a.menubar ? "" : a.menubar),
                e = A(t, function(t) {
                    return n && a.menus.hasOwnProperty(t) && a.menus[t].hasOwnProperty("items") || gC.hasOwnProperty(t)
                }),
                o = V(e, function(t) {
                    var n, e, o, r, i = c[t];
                    return n = {
                        title: i.title,
                        items: pC(i.items)
                    }, e = a, r = (o = u, o.getParam("removed_menuitems", "")).split(/[ ,]/), {
                        text: n.title,
                        getItems: function() {
                            return N(n.items, function(t) {
                                var n = t.toLowerCase();
                                return 0 === n.trim().length ? [] : H(r, function(t) {
                                    return t === n
                                }) ? [] : "separator" === n || "|" === n ? [{
                                    type: "separator"
                                }] : e.menuItems[n] ? [e.menuItems[n]] : []
                            })
                        }
                    }
                });
            return A(o, function(t) {
                return 0 < t.getItems().length && H(t.getItems(), function(t) {
                    return "separator" !== t.type
                })
            })
        },
        yC = [{
            name: "history",
            items: ["undo", "redo"]
        }, {
            name: "styles",
            items: ["styleselect"]
        }, {
            name: "formatting",
            items: ["bold", "italic"]
        }, {
            name: "alignment",
            items: ["alignleft", "aligncenter", "alignright", "alignjustify"]
        }, {
            name: "indentation",
            items: ["outdent", "indent"]
        }, {
            name: "permanent pen",
            items: ["permanentpen"]
        }, {
            name: "comments",
            items: ["addcomment"]
        }],
        xC = function(o, r) {
            return function(t, n) {
                var e = o(t).fold(g(dt.error, qo), dt.value).getOrDie();
                return r(e, n)
            }
        },
        wC = {
            button: xC(ak, function(t, n) {
                return e = t, o = n.backstage.shared.providers, Rk(e, o, []);
                var e, o
            }),
            togglebutton: xC(dk, function(t, n) {
                return e = t, o = n.backstage.shared.providers, Nk(e, o, []);
                var e, o
            }),
            menubutton: xC(function(t) {
                return Go("menubutton", ck, t)
            }, function(t, n) {
                return vC(t, "tox-tbtn", n.backstage.shared, tt.none())
            }),
            splitbutton: xC(function(t) {
                return Go("SplitButton", sk, t)
            }, function(t, n) {
                return Pk(t, n.backstage.shared)
            }),
            styleSelectButton: function(t, n) {
                return e = t, o = n.backstage, r = o.styleselect, eC(e, o, r, hC(e));
                var e, o, r
            },
            fontsizeSelectButton: function(t, n) {
                return e = t, o = n.backstage, r = fC(e), eC(e, o, r.dataset, r);
                var e, o, r
            },
            fontSelectButton: function(t, n) {
                return e = t, o = n.backstage, r = sC(e), eC(e, o, r.dataset, r);
                var e, o, r
            },
            formatButton: function(t, n) {
                return e = t, o = n.backstage, r = mC(e), eC(e, o, r.dataset, r);
                var e, o, r
            },
            alignMenuButton: function(t, n) {
                return e = t, o = n.backstage, r = aC(e), eC(e, o, r.dataset, r);
                var e, o, r
            }
        },
        zC = {
            styleselect: wC.styleSelectButton,
            fontsizeselect: wC.fontsizeSelectButton,
            fontselect: wC.fontSelectButton,
            formatselect: wC.formatButton,
            align: wC.alignMenuButton
        },
        SC = function(t) {
            var n = t.split("|");
            return V(n, function(t) {
                return {
                    items: t.trim().split(" ")
                }
            })
        },
        kC = function(t) {
            return !1 === t.toolbar ? [] : t.toolbar === undefined || !0 === t.toolbar ? (e = t.buttons, n = V(yC, function(t) {
                var n = A(t.items, function(t) {
                    return ut(e, t) || ut(zC, t)
                });
                return {
                    name: t.name,
                    items: n
                }
            }), A(n, function(t) {
                return 0 < t.items.length
            })) : x(t.toolbar) ? SC(t.toolbar) : O(t.toolbar) && x(t.toolbar[0]) ? SC(t.toolbar.join(" | ")) : t.toolbar;
            var e, n
        },
        CC = function(e, o, r) {
            var t = kC(o),
                n = V(t, function(t) {
                    var n = N(t.items, function(t) {
                        return 0 === t.trim().length ? [] : wt(o.buttons, t.toLowerCase()).fold(function() {
                            return wt(zC, t.toLowerCase()).map(function(t) {
                                return t(e, r)
                            }).orThunk(function() {
                                return tt.none()
                            })
                        }, function(t) {
                            return e = r, wt(wC, (n = t).type).fold(function() {
                                return console.error("skipping button defined by", n), tt.none()
                            }, function(t) {
                                return tt.some(t(n, e))
                            });
                            var n, e
                        }).toArray()
                    });
                    return {
                        title: tt.from(e.translate(t.name)),
                        items: n
                    }
                });
            return A(n, function(t) {
                return 0 < t.items.length
            })
        },
        OC = function(i, t, u, c) {
            var e, o, s = mu((e = {
                    sink: u,
                    onEscape: function() {
                        return i.focus(), tt.some(!0)
                    }
                }, o = Ot([]), Jm.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox-pop"]
                    },
                    fireDismissalEventInstead: {
                        event: "doNotDismissYet"
                    },
                    onShow: function(t) {
                        o.set([]), Jm.getContent(t).each(function(t) {
                            tu(t.element(), "visibility")
                        }), Pi(t.element(), qk), tu(t.element(), "width")
                    },
                    inlineBehaviours: Ru([_m("context-toolbar-events", [ni(Wt(), function(t, n) {
                        Jm.getContent(t).each(function(t) {}), Pi(t.element(), qk), tu(t.element(), "width")
                    }), qr(Yk, function(n, e) {
                        tu(n.element(), "width");
                        var t = ia(n.element());
                        Jm.setContent(n, e.event().contents()), Ri(n.element(), qk);
                        var o = ia(n.element());
                        qi(n.element(), "width", t + "px"), Jm.getContent(n).each(function(t) {
                            e.event().focus().bind(function(t) {
                                return df(t), hf(n.element())
                            }).orThunk(function() {
                                return Xd.focusIn(t), mf()
                            })
                        }), setTimeout(function() {
                            qi(n.element(), "width", o + "px")
                        }, 0)
                    }), qr(Gk, function(t, n) {
                        Jm.getContent(t).each(function(t) {
                            o.set(o.get().concat([{
                                bar: t,
                                focus: mf()
                            }]))
                        }), Er(t, Yk, {
                            contents: n.event().forwardContents(),
                            focus: tt.none()
                        })
                    }), qr(Xk, function(n, t) {
                        Y(o.get()).each(function(t) {
                            o.set(o.get().slice(0, o.get().length - 1)), Er(n, Yk, {
                                contents: hu(t.bar),
                                focus: t.focus
                            })
                        })
                    })]), Xd.config({
                        mode: "special",
                        onEscape: function(n) {
                            return Y(o.get()).fold(function() {
                                return e.onEscape()
                            }, function(t) {
                                return Hr(n, Xk), tt.some(!0)
                            })
                        }
                    })]),
                    lazySink: function() {
                        return dt.value(e.sink)
                    }
                }))),
                l = function() {
                    return tt.some(Gn.fromDom(i.contentAreaContainer))
                };
            i.on("init", function() {
                var t = i.getBody().ownerDocument.defaultView,
                    n = cv(Gn.fromDom(t), "scroll", function() {
                        f.get().each(function(t) {
                            var n = d.get().getOr(i.selection.getNode()).getBoundingClientRect(),
                                e = i.contentAreaContainer.getBoundingClientRect(),
                                o = n.bottom < 0,
                                r = n.top > e.height;
                            o || r ? qi(s.element(), "display", "none") : (tu(s.element(), "display"), ss.positionWithin(u, t, s, l()))
                        })
                    });
                i.on("remove", function() {
                    n.unbind()
                })
            });
            var f = Ot(tt.none()),
                d = Ot(tt.none()),
                n = Ot(null),
                m = function(t) {
                    return {
                        dom: {
                            tag: "div",
                            classes: ["tox-pop__dialog"]
                        },
                        components: [t],
                        behaviours: Ru([Xd.config({
                            mode: "acyclic"
                        }), _m("pop-dialog-wrap-events", [ei(function(t) {
                            i.shortcuts.add("ctrl+F9", "focus statusbar", function() {
                                return Xd.focusIn(t)
                            })
                        }), oi(function(t) {
                            i.shortcuts.remove("ctrl+F9")
                        })])])
                    }
                },
                a = Xt(function() {
                    return $k(t, function(t) {
                        var n = h(t);
                        Er(s, Gk, {
                            forwardContents: m(n)
                        })
                    })
                }),
                h = function(t) {
                    var n, e, o = i.ui.registry.getAll().buttons,
                        r = a();
                    return "contexttoolbar" === t.type ? (n = pt(o, r.formNavigators), e = CC(i, {
                        buttons: n,
                        toolbar: t.items
                    }, c), rk({
                        uid: Ye("context-toolbar"),
                        initGroups: e,
                        onEscape: tt.none,
                        cyclicKeying: !0
                    })) : Wk(t, c.backstage.shared.providers)
                };
            i.on("contexttoolbar-show", function(n) {
                var t = a();
                wt(t.lookupTable, n.toolbarKey).each(function(t) {
                    b(t, n.target === i ? tt.none() : tt.some(n)), Jm.getContent(s).each(Xd.focusIn)
                })
            });
            var r = {
                    valignCentre: [],
                    alignCentre: [],
                    alignLeft: ["tox-pop--align-left"],
                    alignRight: ["tox-pop--align-right"],
                    right: ["tox-pop--right"],
                    left: ["tox-pop--left"],
                    bottom: ["tox-pop--bottom"],
                    top: ["tox-pop--top"]
                },
                g = {
                    maxHeightFunction: Pa()
                },
                v = {
                    bubble: Xa(12, 0, r),
                    layouts: {
                        onLtr: function() {
                            return [ac]
                        },
                        onRtl: function() {
                            return [cc]
                        }
                    },
                    overrides: g
                },
                p = {
                    bubble: Xa(0, 12, r),
                    layouts: {
                        onLtr: function() {
                            return [ic, uc, oc, nc, rc, ec]
                        },
                        onRtl: function() {
                            return [ic, uc, rc, ec, oc, nc]
                        }
                    },
                    overrides: g
                },
                b = function(t, n) {
                    x();
                    var e, o, r, i = h(t),
                        u = n.map(Gn.fromDom),
                        a = (e = t.position, o = u, r = "node" === e ? c.backstage.shared.anchors.node(o) : c.backstage.shared.anchors.cursor(), vt(r, "line" === e ? v : p));
                    f.set(tt.some(a)), d.set(n), Jm.showWithin(s, a, m(i), l()), tu(s.element(), "display")
                },
                y = function() {
                    var t = a();
                    Jk(t, i).fold(function() {
                        f.set(tt.none()), Jm.hide(s)
                    }, function(t) {
                        b(t.toolbarApi, tt.some(t.elem.dom()))
                    })
                },
                x = function() {
                    var t = n.get();
                    null !== t && (clearTimeout(t), n.set(null))
                },
                w = function(t) {
                    x(), n.set(t)
                };
            i.on("click keyup setContent ObjectResized ResizeEditor", function(t) {
                w(JS.setEditorTimeout(i, y, 0))
            }), i.on("nodeChange", function(t) {
                hf(s.element()).fold(function() {
                    w(JS.setEditorTimeout(i, y, 0))
                }, function(t) {})
            })
        },
        MC = function(t, e, o) {
            var n = cv(Gn.fromDom(document), "mousedown", function(n) {
                    T([e, o], function(t) {
                        t.broadcastOn([Es()], {
                            target: n.target()
                        })
                    })
                }),
                r = cv(Gn.fromDom(document), "touchstart", function(n) {
                    T([e, o], function(t) {
                        t.broadcastOn([Es()], {
                            target: n.target()
                        })
                    })
                }),
                i = cv(Gn.fromDom(document), "mouseup", function(n) {
                    0 === n.raw().button && T([e, o], function(t) {
                        t.broadcastOn([Vs()], {
                            target: n.target()
                        })
                    })
                }),
                u = function(n) {
                    T([e, o], function(t) {
                        t.broadcastOn([Es()], {
                            target: Gn.fromDom(n.target)
                        })
                    })
                };
            t.on("mousedown", u), t.on("touchstart", u);
            var a = function(n) {
                0 === n.button && T([e, o], function(t) {
                    t.broadcastOn([Vs()], {
                        target: Gn.fromDom(n.target)
                    })
                })
            };
            t.on("mouseup", a);
            var c = function(n) {
                T([e, o], function(t) {
                    t.broadcastEvent(Bn(), n)
                })
            };
            t.on("ScrollWindow", c);
            var s = function(n) {
                T([e, o], function(t) {
                    t.broadcastEvent(Dn(), n)
                })
            };
            t.on("ResizeWindow", s), t.on("remove", function() {
                t.off("mousedown", u), t.off("touchstart", u), t.off("mouseup", a), t.off("ResizeWindow", s), t.off("ScrollWindow", c), n.unbind(), r.unbind(), i.unbind()
            }), t.on("detach", function() {
                ys(e), ys(o), e.destroy(), o.destroy()
            })
        },
        HC = Vl,
        EC = ml,
        VC = Fl({
            factory: function(o, t) {
                var n = {
                    focus: Xd.focusIn,
                    setMenus: function(t, n) {
                        var e = V(n, function(n) {
                            var t = {
                                text: tt.some(n.text),
                                icon: tt.none(),
                                tooltip: tt.none(),
                                fetch: function(t) {
                                    t(n.getItems())
                                }
                            };
                            return vC(t, "tox-mbtn", {
                                getSink: o.getSink,
                                providers: o.providers
                            }, tt.some("menuitem"))
                        });
                        $d.set(t, e)
                    }
                };
                return {
                    uid: o.uid,
                    dom: o.dom,
                    components: [],
                    behaviours: Ru([$d.config({}), _m("menubar-events", [ei(function(t) {
                        o.onSetup(t)
                    }), qr(Ft(), function(e, t) {
                        vu(e.element(), ".tox-mbtn--active").each(function(n) {
                            pu(t.event().target(), ".tox-mbtn").each(function(t) {
                                ae(n, t) || e.getSystem().getByDom(n).each(function(n) {
                                    e.getSystem().getByDom(t).each(function(t) {
                                        Wb.expand(t), Wb.close(n), gm.focus(t)
                                    })
                                })
                            })
                        })
                    }), qr(Ln(), function(e, t) {
                        t.event().prevFocus().bind(function(t) {
                            return e.getSystem().getByDom(t).toOption()
                        }).each(function(n) {
                            t.event().newFocus().bind(function(t) {
                                return e.getSystem().getByDom(t).toOption()
                            }).each(function(t) {
                                Wb.isOpen(n) && (Wb.expand(t), Wb.close(n))
                            })
                        })
                    })]), Xd.config({
                        mode: "flow",
                        selector: ".tox-mbtn",
                        onEscape: function(t) {
                            return o.onEscape(t), tt.some(!0)
                        }
                    }), nb.config({})]),
                    apis: n,
                    domModification: {
                        attributes: {
                            role: "menubar"
                        }
                    }
                }
            },
            name: "silver.Menubar",
            configFields: [or("dom"), or("uid"), or("onEscape"), or("getSink"), or("providers"), vr("onSetup", Q)],
            apis: {
                focus: function(t, n) {
                    t.focus(n)
                },
                setMenus: function(t, n, e) {
                    t.setMenus(n, e)
                }
            }
        }),
        TC = function(n, t) {
            return t.getAnimationRoot.fold(function() {
                return n.element()
            }, function(t) {
                return t(n)
            })
        },
        AC = function(t) {
            return t.dimension.property
        },
        BC = function(t, n) {
            return t.dimension.getDimension(n)
        },
        DC = function(t, n) {
            var e = TC(t, n);
            Wi(e, [n.shrinkingClass, n.growingClass])
        },
        _C = function(t, n) {
            Pi(t.element(), n.openClass), Ri(t.element(), n.closedClass), qi(t.element(), AC(n), "0px"), nu(t.element())
        },
        FC = function(t, n) {
            Pi(t.element(), n.closedClass), Ri(t.element(), n.openClass), tu(t.element(), AC(n))
        },
        IC = function(t, n, e, o) {
            e.setCollapsed(), qi(t.element(), AC(n), BC(n, t.element())), nu(t.element()), DC(t, n), _C(t, n), n.onStartShrink(t), n.onShrunk(t)
        },
        LC = function(t, n, e, o) {
            var r = o.getOrThunk(function() {
                return BC(n, t.element())
            });
            e.setCollapsed(), qi(t.element(), AC(n), r), nu(t.element());
            var i = TC(t, n);
            Pi(i, n.growingClass), Ri(i, n.shrinkingClass), _C(t, n), n.onStartShrink(t)
        },
        RC = function(t, n, e) {
            var o = BC(n, t.element());
            ("0px" === o ? IC : LC)(t, n, e, tt.some(o))
        },
        NC = function(t, n, e) {
            var o = TC(t, n),
                r = ji(o, n.shrinkingClass),
                i = BC(n, t.element());
            FC(t, n);
            var u = BC(n, t.element());
            (r ? function() {
                qi(t.element(), AC(n), i), nu(t.element())
            } : function() {
                _C(t, n)
            })(), Pi(o, n.shrinkingClass), Ri(o, n.growingClass), FC(t, n), qi(t.element(), AC(n), u), e.setExpanded(), n.onStartGrow(t)
        },
        PC = function(t, n, e) {
            var o = TC(t, n);
            return !0 === ji(o, n.growingClass)
        },
        jC = function(t, n, e) {
            var o = TC(t, n);
            return !0 === ji(o, n.shrinkingClass)
        },
        UC = /* */ Object.freeze({
            grow: function(t, n, e) {
                e.isExpanded() || NC(t, n, e)
            },
            shrink: function(t, n, e) {
                e.isExpanded() && RC(t, n, e)
            },
            immediateShrink: function(t, n, e) {
                e.isExpanded() && IC(t, n, e, tt.none())
            },
            hasGrown: function(t, n, e) {
                return e.isExpanded()
            },
            hasShrunk: function(t, n, e) {
                return e.isCollapsed()
            },
            isGrowing: PC,
            isShrinking: jC,
            isTransitioning: function(t, n, e) {
                return !0 === PC(t, n) || !0 === jC(t, n)
            },
            toggleGrow: function(t, n, e) {
                (e.isExpanded() ? RC : NC)(t, n, e)
            },
            disableTransitions: DC
        }),
        WC = /* */ Object.freeze({
            exhibit: function(t, n) {
                var e = n.expanded;
                return Oi(e ? {
                    classes: [n.openClass],
                    styles: {}
                } : {
                    classes: [n.closedClass],
                    styles: zt(n.dimension.property, "0px")
                })
            },
            events: function(e, o) {
                return Gr([ni(Wt(), function(t, n) {
                    n.event().raw().propertyName === e.dimension.property && (DC(t, e), o.isExpanded() && tu(t.element(), e.dimension.property), (o.isExpanded() ? e.onGrown : e.onShrunk)(t))
                })])
            }
        }),
        GC = [or("closedClass"), or("openClass"), or("shrinkingClass"), or("growingClass"), fr("getAnimationRoot"), Mu("onShrunk"), Mu("onStartShrink"), Mu("onGrown"), Mu("onStartGrow"), vr("expanded", !1), rr("dimension", Ko("property", {
            width: [Tu("property", "width"), Tu("getDimension", function(t) {
                return ia(t) + "px"
            })],
            height: [Tu("property", "height"), Tu("getDimension", function(t) {
                return ca(t) + "px"
            })]
        }))],
        XC = Pu({
            fields: GC,
            name: "sliding",
            active: WC,
            apis: UC,
            state: /* */ Object.freeze({
                init: function(t) {
                    var n = Ot(t.expanded);
                    return ki({
                        isExpanded: function() {
                            return !0 === n.get()
                        },
                        isCollapsed: function() {
                            return !1 === n.get()
                        },
                        setCollapsed: v(n.set, !1),
                        setExpanded: v(n.set, !0),
                        readState: function() {
                            return "expanded: " + n.get()
                        }
                    })
                }
            })
        }),
        YC = "container",
        qC = [Ds("slotBehaviours", [])],
        KC = function(t) {
            return "<alloy.field." + t + ">"
        },
        JC = function(r, t, n) {
            var e, o = function(t) {
                    return Ol(r)
                },
                i = function(e, o) {
                    return void 0 === o && (o = undefined),
                        function(t, n) {
                            return zl(t, r, n).map(function(t) {
                                return e(t, n)
                            }).getOr(o)
                        }
                },
                u = function(t, n) {
                    return "true" !== Te(t.element(), "aria-hidden")
                },
                a = i(u, !1),
                c = i(function(t, n) {
                    if (u(t)) {
                        var e = t.element();
                        qi(e, "display", "none"), Ee(e, "aria-hidden", "true"), Er(t, Rn(), {
                            name: n,
                            visible: !1
                        })
                    }
                }),
                s = (e = c, function(n, t) {
                    T(t, function(t) {
                        return e(n, t)
                    })
                }),
                l = i(function(t, n) {
                    if (!u(t)) {
                        var e = t.element();
                        tu(e, "display"), Be(e, "aria-hidden"), Er(t, Rn(), {
                            name: n,
                            visible: !0
                        })
                    }
                }),
                f = {
                    getSlotNames: o,
                    getSlot: function(t, n) {
                        return zl(t, r, n)
                    },
                    isShowing: a,
                    hideSlot: c,
                    hideAllSlots: function(t) {
                        return s(t, o())
                    },
                    showSlot: l
                };
            return {
                uid: r.uid,
                dom: r.dom,
                components: t,
                behaviours: _s(r.slotBehaviours),
                apis: f
            }
        },
        $C = nt({
            getSlotNames: function(t, n) {
                return t.getSlotNames(n)
            },
            getSlot: function(t, n, e) {
                return t.getSlot(n, e)
            },
            isShowing: function(t, n, e) {
                return t.isShowing(n, e)
            },
            hideSlot: function(t, n, e) {
                return t.hideSlot(n, e)
            },
            hideAllSlots: function(t, n) {
                return t.hideAllSlots(n)
            },
            showSlot: function(t, n, e) {
                return t.showSlot(n, e)
            }
        }, zi),
        QC = Ke({}, $C, {
            sketch: function(t) {
                var e, n = (e = [], {
                        slot: function(t, n) {
                            return e.push(t), pl(YC, KC(t), n)
                        },
                        record: function() {
                            return e
                        }
                    }),
                    o = t(n),
                    r = n.record(),
                    i = V(r, function(t) {
                        return cl({
                            name: t,
                            pname: KC(t)
                        })
                    });
                return Al(YC, qC, i, JC, o)
            }
        }),
        ZC = Bo([mr("icon"), mr("tooltip"), zr("onShow", Q), zr("onHide", Q), zr("onSetup", function() {
            return Q
        })]),
        tO = function(t) {
            return {
                element: function() {
                    return t.element().dom()
                }
            }
        },
        nO = function(e, o) {
            var r = V(K(o), function(t) {
                var n = o[t],
                    e = Xo(Go("sidebar", ZC, n));
                return {
                    name: t,
                    getApi: tO,
                    onSetup: e.onSetup,
                    onShow: e.onShow,
                    onHide: e.onHide
                }
            });
            return V(r, function(t) {
                var n = Ot(Q);
                return e.slot(t.name, {
                    dom: {
                        tag: "div",
                        classes: ["tox-sidebar__pane"]
                    },
                    behaviours: Hh([yg(t, n), xg(t, n), qr(Rn(), function(n, t) {
                        var e = t.event();
                        _(r, function(t) {
                            return t.name === e.name()
                        }).each(function(t) {
                            (e.visible() ? t.onShow : t.onHide)(t.getApi(n))
                        })
                    })])
                })
            })
        },
        eO = function(t, e) {
            Pl.getCurrent(t).each(function(t) {
                return $d.set(t, [(n = e, QC.sketch(function(t) {
                    return {
                        dom: {
                            tag: "div",
                            classes: ["tox-sidebar__pane-container"]
                        },
                        components: nO(t, n),
                        slotBehaviours: Hh([ei(function(t) {
                            return QC.hideAllSlots(t)
                        })])
                    }
                }))]);
                var n
            })
        },
        oO = function(t) {
            return Pl.getCurrent(t).bind(function(t) {
                return XC.isGrowing(t) || XC.hasGrown(t) ? Pl.getCurrent(t).bind(function(n) {
                    return _(QC.getSlotNames(n), function(t) {
                        return QC.isShowing(n, t)
                    })
                }) : tt.none()
            })
        },
        rO = Ye("FixSizeEvent"),
        iO = Ye("AutoSizeEvent"),
        uO = EC.optional({
            factory: VC,
            name: "menubar",
            schema: [or("dom"), or("getSink")]
        }),
        aO = EC.optional({
            factory: {
                sketch: function(t) {
                    return rk({
                        uid: t.uid,
                        onEscape: function() {
                            return t.onEscape(), tt.some(!0)
                        },
                        cyclicKeying: !1,
                        initGroups: []
                    })
                }
            },
            name: "toolbar",
            schema: [or("dom"), or("onEscape")]
        }),
        cO = EC.optional({
            name: "socket",
            schema: [or("dom")]
        }),
        sO = EC.optional({
            factory: {
                sketch: function(t) {
                    return {
                        uid: t.uid,
                        dom: {
                            tag: "div",
                            classes: ["tox-sidebar"],
                            attributes: {
                                role: "complementary"
                            }
                        },
                        components: [{
                            dom: {
                                tag: "div",
                                classes: ["tox-sidebar__slider"]
                            },
                            components: [],
                            behaviours: Ru([nb.config({}), gm.config({}), XC.config({
                                dimension: {
                                    property: "width"
                                },
                                closedClass: "tox-sidebar--sliding-closed",
                                openClass: "tox-sidebar--sliding-open",
                                shrinkingClass: "tox-sidebar--sliding-shrinking",
                                growingClass: "tox-sidebar--sliding-growing",
                                onShrunk: function(t) {
                                    Pl.getCurrent(t).each(QC.hideAllSlots), Hr(t, iO)
                                },
                                onGrown: function(t) {
                                    Hr(t, iO)
                                },
                                onStartGrow: function(t) {
                                    Er(t, rO, {
                                        width: Qi(t.element(), "width").getOr("")
                                    })
                                },
                                onStartShrink: function(t) {
                                    Er(t, rO, {
                                        width: ia(t.element()) + "px"
                                    })
                                }
                            }), $d.config({}), Pl.config({
                                find: function(t) {
                                    var n = $d.contents(t);
                                    return X(n)
                                }
                            })])
                        }],
                        behaviours: Ru([Zx(0), _m("sidebar-sliding-events", [qr(rO, function(t, n) {
                            qi(t.element(), "width", n.event().width())
                        }), qr(iO, function(t, n) {
                            tu(t.element(), "width")
                        })])])
                    }
                }
            },
            name: "sidebar",
            schema: [or("dom")]
        }),
        lO = Il({
            name: "OuterContainer",
            factory: function(e, t, n) {
                var o = {
                    getSocket: function(t) {
                        return HC.getPart(t, e, "socket")
                    },
                    setSidebar: function(t, n) {
                        HC.getPart(t, e, "sidebar").each(function(t) {
                            return eO(t, n)
                        })
                    },
                    toggleSidebar: function(t, o) {
                        HC.getPart(t, e, "sidebar").each(function(t) {
                            return n = t, e = o, void Pl.getCurrent(n).each(function(n) {
                                Pl.getCurrent(n).each(function(t) {
                                    XC.hasGrown(n) ? QC.isShowing(t, e) ? XC.shrink(n) : (QC.hideAllSlots(t), QC.showSlot(t, e)) : (QC.hideAllSlots(t), QC.showSlot(t, e), XC.grow(n))
                                })
                            });
                            var n, e
                        })
                    },
                    whichSidebar: function(t) {
                        return HC.getPart(t, e, "sidebar").bind(oO).getOrNull()
                    },
                    getToolbar: function(t) {
                        return HC.getPart(t, e, "toolbar")
                    },
                    setToolbar: function(t, n) {
                        HC.getPart(t, e, "toolbar").each(function(t) {
                            ZS.setGroups(t, n)
                        })
                    },
                    focusToolbar: function(t) {
                        HC.getPart(t, e, "toolbar").each(function(t) {
                            Xd.focusIn(t)
                        })
                    },
                    setMenubar: function(t, n) {
                        HC.getPart(t, e, "menubar").each(function(t) {
                            VC.setMenus(t, n)
                        })
                    },
                    focusMenubar: function(t) {
                        HC.getPart(t, e, "menubar").each(function(t) {
                            VC.focus(t)
                        })
                    }
                };
                return {
                    uid: e.uid,
                    dom: e.dom,
                    components: t,
                    apis: o,
                    behaviours: e.behaviours
                }
            },
            configFields: [or("dom"), or("behaviours")],
            partFields: [uO, aO, cO, sO],
            apis: {
                getSocket: function(t, n) {
                    return t.getSocket(n)
                },
                setSidebar: function(t, n, e) {
                    t.setSidebar(n, e)
                },
                toggleSidebar: function(t, n, e) {
                    t.toggleSidebar(n, e)
                },
                whichSidebar: function(t, n) {
                    return t.whichSidebar(n)
                },
                getToolbar: function(t, n) {
                    return t.getToolbar(n)
                },
                setToolbar: function(t, n, e) {
                    var o = V(e, function(t) {
                        return ok(t)
                    });
                    t.setToolbar(n, o)
                },
                setMenubar: function(t, n, e) {
                    t.setMenubar(n, e)
                },
                focusMenubar: function(t, n) {
                    t.focusMenubar(n)
                },
                focusToolbar: function(t, n) {
                    t.focusToolbar(n)
                }
            }
        }),
        fO = function(t) {
            return t.fire("SkinLoaded")
        },
        dO = function(t) {
            return t.fire("ResizeEditor")
        },
        mO = function(t) {
            var n = function() {
                t._skinLoaded = !0, fO(t)
            };
            return function() {
                t.initialized ? n() : t.on("init", n)
            }
        },
        hO = function(t, n) {
            var e, o = function(t) {
                var n = t.settings,
                    e = n.skin,
                    o = n.skin_url;
                if (!1 !== e) {
                    var r = e || "oxide";
                    o = o ? t.documentBaseURI.toAbsolute(o) : Av.baseURL + "/skins/ui/" + r
                }
                return o
            }(n);
            o && (e = o + "/skin.min.css", n.contentCSS.push(o + (t ? "/content.inline" : "/content") + ".min.css")), 0 == (!1 === n.getParam("skin")) && e ? Tv.DOM.styleSheetLoader.load(e, mO(n)) : mO(n)()
        },
        gO = v(hO, !1),
        vO = v(hO, !0),
        pO = function(t) {
            return function(n) {
                var e = t.outerContainer;
                ue("*", e.element()).forEach(function(t) {
                    e.getSystem().getByDom(t).each(function(t) {
                        t.hasConfigured(Ph) && ("readonly" === n.mode ? Ph.disable(t) : Ph.enable(t))
                    })
                })
            }
        },
        bO = {
            render: function(e, o, t, n, r) {
                var i, u;
                gO(e), i = Gn.fromDom(r.targetNode), u = o.mothership, bs(i, u, ge), ps(Rr(), o.uiMothership), e.on("init", function() {
                    lO.setToolbar(o.outerContainer, CC(e, t, {
                        backstage: n
                    })), lO.setMenubar(o.outerContainer, bC(e, t)), lO.setSidebar(o.outerContainer, t.sidebar), e.readonly && pO(o)({
                        mode: "readonly"
                    })
                });
                var a = lO.getSocket(o.outerContainer).getOrDie("Could not find expected socket element");
                return e.on("SwitchMode", pO(o)), e.getParam("readonly", !1, "boolean") && e.setMode("readonly"), e.addCommand("ToggleSidebar", function(t, n) {
                    lO.toggleSidebar(o.outerContainer, n), e.fire("ToggleSidebar")
                }), e.addQueryValueHandler("ToggleSidebar", function() {
                    return lO.whichSidebar(o.outerContainer)
                }), {
                    iframeContainer: a.element().dom(),
                    editorContainer: o.outerContainer.element().dom()
                }
            },
            getBehaviours: function(t) {
                return []
            }
        },
        yO = function(e, n) {
            return fe(e).orThunk(function() {
                var t = Gn.fromTag("span");
                he(e, t);
                var n = fe(t);
                return xe(t), n
            }).map(function(t) {
                return Qu(t).translate(-n.left(), -n.top())
            }).getOrThunk(function() {
                return Ju(0, 0)
            })
        },
        xO = mt([{
            offset: ["x", "y"]
        }, {
            absolute: ["x", "y"]
        }, {
            fixed: ["x", "y"]
        }]),
        wO = function(n) {
            return function(t) {
                return t.translate(-n.left(), -n.top())
            }
        },
        zO = function(n) {
            return function(t) {
                return t.translate(n.left(), n.top())
            }
        },
        SO = function(e) {
            return function(t, n) {
                return D(e, function(t, n) {
                    return n(t)
                }, Ju(t, n))
            }
        },
        kO = function(t, n, e) {
            return t.fold(SO([zO(e), wO(n)]), SO([wO(n)]), SO([]))
        },
        CO = function(t, n, e) {
            return t.fold(SO([zO(e)]), SO([]), SO([zO(n)]))
        },
        OO = function(t, n, e) {
            return t.fold(SO([]), SO([wO(e)]), SO([zO(n), wO(e)]))
        },
        MO = function(t, n, e) {
            return t.fold(function(t, n) {
                return {
                    position: "absolute",
                    left: t + "px",
                    top: n + "px"
                }
            }, function(t, n) {
                return {
                    position: "absolute",
                    left: t - e.left() + "px",
                    top: n - e.top() + "px"
                }
            }, function(t, n) {
                return {
                    position: "fixed",
                    left: t + "px",
                    top: n + "px"
                }
            })
        },
        HO = xO.offset,
        EO = xO.absolute,
        VO = xO.fixed,
        TO = function(t, n) {
            Ri(t.element(), n.transitionClass), Pi(t.element(), n.fadeOutClass), Ri(t.element(), n.fadeInClass)
        },
        AO = function(t, n) {
            Ri(t.element(), n.transitionClass), Pi(t.element(), n.fadeInClass), Ri(t.element(), n.fadeOutClass)
        },
        BO = function(t, n) {
            return t.y() >= n.y() && t.bottom() <= n.bottom()
        },
        DO = function(t, n) {
            return Ae(t, n) ? tt.some(parseInt(Te(t, n), 10)) : tt.none()
        },
        _O = function(o, r, i) {
            return (u = o, t = r, n = u.element(), DO(n, t.leftAttr).bind(function(o) {
                return DO(n, t.topAttr).map(function(t) {
                    var n = ia(u.element()),
                        e = ca(u.element());
                    return Sa(o, t, n, e)
                })
            })).bind(function(t) {
                return BO(t, i) ? (n = r, e = o.element(), Be(e, n.leftAttr), Be(e, n.topAttr), tt.some(EO(t.x(), t.y()))) : tt.none();
                var n, e
            });
            var u, t, n
        },
        FO = function(t, n, e, o, r) {
            var i = Qu(t.element()),
                u = Sa(i.left(), i.top(), ia(t.element()), ca(t.element()));
            if (BO(u, e)) return tt.none();
            a = t, c = n, s = i.left(), l = i.top(), f = a.element(), Ee(f, c.leftAttr, s), Ee(f, c.topAttr, l);
            var a, c, s, l, f, d = EO(i.left(), i.top()),
                m = kO(d, o, r),
                h = EO(e.x(), e.y()),
                g = kO(h, o, r),
                v = u.y() <= e.y() ? g.top() : g.top() + e.height() - u.height();
            return tt.some(VO(m.left(), v))
        },
        IO = function(i, t, n) {
            var u = t.lazyViewport(i);
            t.contextual.each(function(r) {
                r.lazyContext(i).each(function(t) {
                    var n, e, o = ka(t);
                    e = u, ((n = o).y() < e.bottom() && n.bottom() > e.y() ? TO : AO)(i, r)
                })
            });
            var e, o, r, a, c, s = ce(i.element()),
                l = ta(s),
                f = yO(i.element(), l);
            (e = i, o = t, r = u, a = l, c = f, Qi(e.element(), "position").is("fixed") ? _O(e, o, r) : FO(e, o, r, a, c)).each(function(t) {
                var n = MO(t, 0, f);
                Ki(i.element(), n)
            })
        },
        LO = /* */ Object.freeze({
            refresh: IO
        }),
        RO = /* */ Object.freeze({
            events: function(o, t) {
                return Gr([qr(Wt(), function(n, e) {
                    o.contextual.each(function(t) {
                        ae(n.element(), e.event().target()) && (Pi(n.element(), t.transitionClass), e.stop())
                    })
                }), qr(Bn(), function(t, n) {
                    IO(t, o)
                })])
            }
        }),
        NO = [gr("contextual", [or("fadeInClass"), or("fadeOutClass"), or("transitionClass"), or("lazyContext")]), vr("lazyViewport", function(t) {
            var n = ta();
            return Sa(n.left(), n.top(), window.innerWidth, window.innerHeight)
        }), or("leftAttr"), or("topAttr")],
        PO = Pu({
            fields: NO,
            name: "docking",
            active: RO,
            apis: LO
        }),
        jO = {
            render: function(t, n, e, o, r) {
                var i, u = Tv.DOM;
                vO(t);
                var a = function() {
                        Qi(i.element(), "position").is("fixed") || Ki(i.element(), {
                            top: Qu(Gn.fromDom(t.getBody())).top() - ca(i.element()) + "px",
                            left: Qu(Gn.fromDom(t.getBody())).left() + "px"
                        }), PO.refresh(i)
                    },
                    c = function() {
                        qi(n.outerContainer.element(), "display", "flex"), u.addClass(t.getBody(), "mce-edit-focus"), a(), PO.refresh(i)
                    },
                    s = function() {
                        n.outerContainer && (qi(n.outerContainer.element(), "display", "none"), u.removeClass(t.getBody(), "mce-edit-focus"))
                    };
                return t.on("focus", function() {
                    i ? c() : (i = n.outerContainer, ps(Rr(), n.mothership), ps(Rr(), n.uiMothership), lO.setToolbar(n.outerContainer, CC(t, e, {
                        backstage: o
                    })), lO.setMenubar(n.outerContainer, bC(t, e)), Ki(i.element(), {
                        position: "absolute",
                        top: Qu(Gn.fromDom(t.getBody())).top() - ca(i.element()) + "px",
                        left: Qu(Gn.fromDom(t.getBody())).left() + "px"
                    }), a(), c(), t.on("nodeChange ResizeWindow", a), t.on("activate", c), t.on("deactivate", s), t.nodeChanged())
                }), t.on("blur hide", s), {
                    editorContainer: n.outerContainer.element().dom()
                }
            },
            getBehaviours: function(n) {
                return [PO.config({
                    leftAttr: "data-dock-left",
                    topAttr: "data-dock-top",
                    contextual: {
                        lazyContext: function(t) {
                            return tt.from(n).map(function(t) {
                                return Gn.fromDom(t.getBody())
                            })
                        },
                        fadeInClass: "tox-toolbar-dock-fadein",
                        fadeOutClass: "tox-toolbar-dock-fadeout",
                        transitionClass: "tox-toolbar-dock-transition"
                    }
                }), gm.config({})]
            }
        },
        UO = function(t, n) {
            return {
                anchor: "makeshift",
                x: t,
                y: n
            }
        },
        WO = function(t, n) {
            var e, o, r, i = Tv.DOM.getPos(t);
            return e = n, o = i.x, r = i.y, UO(e.x + o, e.y + r)
        },
        GO = function(t, n) {
            return "contextmenu" === n.type ? t.inline ? UO((o = n).pageX, o.pageY) : WO(t.getContentAreaContainer(), UO((e = n).clientX, e.clientY)) : XO(t);
            var e, o
        },
        XO = function(t) {
            return {
                anchor: "selection",
                root: Gn.fromDom(t.selection.getNode())
            }
        },
        YO = function(t) {
            return "string" == typeof t ? t.split(/[ ,]/) : t
        },
        qO = function(t) {
            return t.settings.contextmenu_never_use_native || !1
        },
        KO = function(t) {
            return e = "contextmenu", o = "link image imagetools table spellchecker configurepermanentpen", r = (n = t).ui.registry.getAll().contextMenus, it(n.settings, e).map(YO).getOrThunk(function() {
                return A(YO(o), function(t) {
                    return ut(r, t)
                })
            });
            var n, e, o, r
        },
        JO = function(t) {
            return x(t) ? "|" === t : "separator" === t.type
        },
        $O = {
            type: "separator"
        },
        QO = function(n) {
            if (x(n)) return n;
            switch (n.type) {
                case "separator":
                    return $O;
                case "submenu":
                    return {
                        type: "nestedmenuitem",
                        text: n.text,
                        icon: n.icon,
                        getSubmenuItems: function() {
                            var t = n.getSubmenuItems();
                            return x(t) ? t : V(t, QO)
                        }
                    };
                default:
                    return {
                        type: "menuitem",
                        text: n.text,
                        icon: n.icon,
                        onAction: (e = n.onAction, function() {
                            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                            return e()
                        })
                    }
            }
            var e
        },
        ZO = function(t, n) {
            if (0 === n.length) return t;
            var e = Y(t).filter(function(t) {
                return !JO(t)
            }).fold(function() {
                return []
            }, function(t) {
                return [$O]
            });
            return t.concat(e).concat(n).concat([$O])
        },
        tM = function(d, t, m) {
            var h = mu(Jm.sketch({
                dom: {
                    tag: "div"
                },
                lazySink: t,
                onEscape: function() {
                    return d.focus()
                },
                fireDismissalEventInstead: {},
                inlineBehaviours: Ru([_m("dismissContextMenu", [qr(In(), function(t, n) {
                    Hs.close(t), d.focus()
                })])])
            }));
            d.on("contextmenu", function(n) {
                if (t = d, !n.ctrlKey || qO(t)) {
                    var t, e, r, i, o, u = 2 !== n.button || n.target === d.getBody(),
                        a = u ? (e = d, {
                            anchor: "node",
                            node: tt.some(Gn.fromDom(e.selection.getNode())),
                            root: Gn.fromDom(e.getBody())
                        }) : GO(d, n),
                        c = d.ui.registry.getAll(),
                        s = KO(d),
                        l = u ? d.selection.getStart(!0) : n.target,
                        f = (r = c.contextMenus, i = l, 0 < (o = D(s, function(t, n) {
                            if (ut(r, n)) {
                                var e = r[n].update(i);
                                if (x(e)) return ZO(t, e.split(" "));
                                if (0 < e.length) {
                                    var o = V(e, QO);
                                    return ZO(t, o)
                                }
                                return t
                            }
                            return t.concat([n])
                        }, [])).length && JO(o[o.length - 1]) && o.pop(), o);
                    Ip(f, Sg.CLOSE_ON_EXECUTE, m.providers).map(function(t) {
                        n.preventDefault(), Jm.showMenuAt(h, a, {
                            menu: {
                                markers: Pg("normal")
                            },
                            data: t
                        })
                    })
                }
            })
        },
        nM = function(t) {
            return /^[0-9\.]+(|px)$/i.test("" + t) ? tt.some(parseInt(t, 10)) : tt.none()
        },
        eM = function(t) {
            return k(t) ? t + "px" : t
        },
        oM = "data-initial-z-index",
        rM = function(t, n) {
            var e;
            t.getSystem().addToGui(n), le((e = n).element()).each(function(n) {
                Qi(n, "z-index").each(function(t) {
                    Ee(n, oM, t)
                }), qi(n, "z-index", Ji(e.element(), "z-index"))
            })
        },
        iM = function(t) {
            le(t.element()).each(function(t) {
                var n = Te(t, oM);
                Ae(t, oM) ? qi(t, "z-index", n) : tu(t, "z-index"), Be(t, oM)
            }), t.getSystem().removeFromGui(t)
        },
        uM = function(t, n, e, o) {
            return (r = t, i = n, u = r.element(), a = parseInt(Te(u, i.leftAttr), 10), c = parseInt(Te(u, i.topAttr), 10), isNaN(a) || isNaN(c) ? tt.none() : tt.some(Ju(a, c))).fold(function() {
                return e
            }, function(t) {
                return VO(t.left() + o.left(), t.top() + o.top())
            });
            var r, i, u, a, c
        },
        aM = function(t, n, e, o, r, i) {
            var u, a, c, s = uM(t, n, e, o),
                l = sM(t, n, s, r, i),
                f = kO(s, r, i);
            return u = n, a = f, c = t.element(), Ee(c, u.leftAttr, a.left() + "px"), Ee(c, u.topAttr, a.top() + "px"), l.fold(function() {
                return {
                    coord: VO(f.left(), f.top()),
                    extra: tt.none()
                }
            }, function(t) {
                return {
                    coord: t.output(),
                    extra: t.extra()
                }
            })
        },
        cM = function(t, n) {
            var e, o;
            e = n, o = t.element(), Be(o, e.leftAttr), Be(o, e.topAttr)
        },
        sM = function(t, n, g, v, p) {
            var e = n.getSnapPoints(t);
            return Ht(e, function(t) {
                var n, e, o, r, i, u, a, c, s, l, f, d, m, h = t.sensor();
                return n = g, e = h, o = t.range().left(), r = t.range().top(), a = CO(n, i = v, u = p), c = CO(e, i, u), Math.abs(a.left() - c.left()) <= o && Math.abs(a.top() - c.top()) <= r ? tt.some({
                    output: Z((s = t.output(), l = g, f = v, d = p, m = function(o, r) {
                        return function(t, n) {
                            var e = o(l, f, d);
                            return r(t.getOr(e.left()), n.getOr(e.top()))
                        }
                    }, s.fold(m(OO, xO.offset), m(CO, xO.absolute), m(kO, xO.fixed)))),
                    extra: t.extra
                }) : tt.none()
            })
        },
        lM = function(e, t, i, u, a, c) {
            return t.fold(function() {
                var t, e, o, n = (t = i, e = c.left(), o = c.top(), t.fold(function(t, n) {
                        return xO.offset(t + e, n + o)
                    }, function(t, n) {
                        return xO.absolute(t + e, n + o)
                    }, function(t, n) {
                        return xO.fixed(t + e, n + o)
                    })),
                    r = kO(n, u, a);
                return VO(r.left(), r.top())
            }, function(n) {
                var t = aM(e, n, i, c, u, a);
                return t.extra.each(function(t) {
                    n.onSensor(e, t)
                }), t.coord
            })
        },
        fM = function(t, n, e) {
            var o, r = n.getTarget(t.element());
            if (n.repositionTarget) {
                var i = ce(t.element()),
                    u = ta(i),
                    a = yO(r, u),
                    c = Qi(o = r, "left").bind(function(e) {
                        return Qi(o, "top").bind(function(n) {
                            return Qi(o, "position").map(function(t) {
                                return ("fixed" === t ? VO : HO)(parseInt(e, 10), parseInt(n, 10))
                            })
                        })
                    }).getOrThunk(function() {
                        var t = Qu(o);
                        return EO(t.left(), t.top())
                    }),
                    s = lM(t, n.snaps, c, u, a, e),
                    l = MO(s, 0, a);
                Ki(r, l)
            }
            n.onDrag(t, r, e)
        },
        dM = gr("snaps", [or("getSnapPoints"), Mu("onSensor"), or("leftAttr"), or("topAttr"), vr("lazyViewport", function() {
            var t = ta();
            return {
                x: t.left,
                y: t.top,
                width: Z(window.innerWidth),
                height: Z(window.innerHeight),
                bottom: Z(t.top() + window.innerHeight),
                right: Z(t.left() + window.innerWidth)
            }
        })]),
        mM = /* */ Object.freeze({
            getData: function(t) {
                return tt.from(Ju(t.x(), t.y()))
            },
            getDelta: function(t, n) {
                return Ju(n.left() - t.left(), n.top() - t.top())
            }
        }),
        hM = [vr("useFixed", !1), or("blockerClass"), vr("getTarget", d), vr("onDrag", Q), vr("repositionTarget", !0), Mu("onDrop"), dM, Tu("dragger", {
            handlers: function(a, c) {
                return Gr([qr(At(), function(n, t) {
                    if (0 === t.event().raw().button) {
                        t.stop();
                        var e, o = {
                                drop: function() {
                                    i()
                                },
                                delayDrop: function() {
                                    u.schedule()
                                },
                                forceDrop: function() {
                                    i()
                                },
                                move: function(t) {
                                    u.cancel(), c.update(mM, t).each(function(t) {
                                        fM(n, a, t)
                                    })
                                }
                            },
                            r = n.getSystem().build(Ev.sketch({
                                dom: {
                                    styles: {
                                        left: "0px",
                                        top: "0px",
                                        width: "100%",
                                        height: "100%",
                                        position: "fixed",
                                        "z-index": "1000000000000000"
                                    },
                                    classes: [a.blockerClass]
                                },
                                events: (e = o, Gr([qr(At(), e.forceDrop), qr(_t(), e.drop), qr(Bt(), function(t, n) {
                                    e.move(n.event())
                                }), qr(Dt(), e.delayDrop)]))
                            })),
                            i = function() {
                                iM(r), a.snaps.each(function(t) {
                                    cM(n, t)
                                });
                                var t = a.getTarget(n.element());
                                a.onDrop(n, t)
                            },
                            u = fv(i, 200);
                        c.reset(), rM(n, r)
                    }
                })])
            }
        })],
        gM = /* */ Object.freeze({
            getData: function(t) {
                var n, e = t.raw().touches;
                return 1 === e.length ? (n = e[0], tt.some(Ju(n.clientX, n.clientY))) : tt.none()
            },
            getDelta: function(t, n) {
                return Ju(n.left() - t.left(), n.top() - t.top())
            }
        }),
        vM = hM,
        pM = [vr("useFixed", !1), vr("getTarget", d), vr("onDrag", Q), vr("repositionTarget", !0), vr("onDrop", Q), dM, Tu("dragger", {
            handlers: function(o, r) {
                return Gr([ti(Et()), qr(Vt(), function(n, t) {
                    t.stop(), r.update(gM, t.event()).each(function(t) {
                        fM(n, o, t)
                    })
                }), qr(Tt(), function(n, t) {
                    o.snaps.each(function(t) {
                        cM(n, t)
                    });
                    var e = o.getTarget(n.element());
                    r.reset(), o.onDrop(n, e)
                })])
            }
        })],
        bM = /* */ Object.freeze({
            mouse: vM,
            touch: pM
        }),
        yM = /* */ Object.freeze({
            init: function() {
                var i = tt.none(),
                    t = Z({});
                return ki({
                    readState: t,
                    reset: function() {
                        i = tt.none()
                    },
                    update: function(r, t) {
                        return r.getData(t).bind(function(t) {
                            return n = r, e = t, o = i.map(function(t) {
                                return n.getDelta(t, e)
                            }), i = tt.some(e), o;
                            var n, e, o
                        })
                    }
                })
            }
        }),
        xM = Uu({
            branchKey: "mode",
            branches: bM,
            name: "dragging",
            active: {
                events: function(t, n) {
                    return t.dragger.handlers(t, n)
                }
            },
            extra: {
                snap: Kn(["sensor", "range", "output"], ["extra"])
            },
            state: yM
        });
    (rC = oC || (oC = {}))[rC.None = 0] = "None", rC[rC.Both = 1] = "Both", rC[rC.Vertical = 2] = "Vertical";
    var wM, zM, SM, kM, CM, OM = function(t, n, e, o) {
            var r = t + n,
                i = e.filter(function(t) {
                    return r < t
                }),
                u = o.filter(function(t) {
                    return t < r
                });
            return i.or(u).getOr(r)
        },
        MM = function(t, n, e, o, r) {
            var i, u, a = {};
            return a.height = OM(o, n.top(), Dv(t), (i = t, tt.from(i.getParam("max_height")).filter(k))), e === oC.Both && (a.width = OM(r, n.left(), Bv(t), (u = t, tt.from(u.getParam("max_width")).filter(k)))), a
        },
        HM = function(t) {
            if (1 === t.nodeType) {
                if ("BR" === t.nodeName || t.getAttribute("data-mce-bogus")) return !0;
                if ("bookmark" === t.getAttribute("data-mce-type")) return !0
            }
            return !1
        },
        EM = function(i, u) {
            return u.delimiter || (u.delimiter = "\xbb"), {
                dom: {
                    tag: "div",
                    classes: ["tox-statusbar__path"],
                    attributes: {
                        role: "navigation"
                    }
                },
                behaviours: Ru([Xd.config({
                    mode: "flow",
                    selector: "div[role=button]"
                }), nb.config({}), $d.config({}), _m("elementPathEvents", [ei(function(r, t) {
                    i.shortcuts.add("alt+F11", "focus statusbar elementpath", function() {
                        return Xd.focusIn(r)
                    }), i.on("nodeChange", function(t) {
                        var n, o, e = function(t) {
                            for (var n = [], e = t.length; 0 < e--;) {
                                var o = t[e];
                                if (1 === o.nodeType && !HM(o)) {
                                    var r = i.fire("ResolveName", {
                                        name: o.nodeName.toLowerCase(),
                                        target: o
                                    });
                                    if (r.isDefaultPrevented() || n.push({
                                            name: r.name,
                                            element: o
                                        }), r.isPropagationStopped()) break
                                }
                            }
                            return n
                        }(t.parents);
                        0 < e.length && $d.set(r, (n = V(e || [], function(n, t) {
                            return Qm.sketch({
                                dom: {
                                    tag: "div",
                                    classes: ["tox-statusbar__path-item"],
                                    attributes: {
                                        role: "button",
                                        "data-index": t,
                                        "tab-index": -1,
                                        "aria-level": t + 1
                                    },
                                    innerHtml: n.name
                                },
                                action: function(t) {
                                    i.focus(), i.selection.select(n.element), i.nodeChanged()
                                }
                            })
                        }), o = {
                            dom: {
                                tag: "div",
                                classes: ["tox-statusbar__path-divider"],
                                attributes: {
                                    "aria-hidden": !0
                                },
                                innerHtml: " " + u.delimiter + " "
                            }
                        }, D(n.slice(1), function(t, n) {
                            var e = t;
                            return e.push(o), e.push(n), e
                        }, [n[0]])))
                    })
                })])]),
                components: []
            }
        },
        VM = function(s, t) {
            var n, e, o, r, i, u, a, c, l, f, d, m = function(c) {
                return {
                    dom: {
                        tag: "div",
                        classes: ["tox-statusbar__resize-handle"],
                        attributes: {
                            title: t.translate("Resize")
                        },
                        innerHtml: eh("resize-handle", t.icons)
                    },
                    behaviours: Ru([xM.config({
                        mode: "mouse",
                        repositionTarget: !1,
                        onDrag: function(t, n, e) {
                            var o, r, i, u, a;
                            o = s, r = e, i = c, u = Gn.fromDom(o.getContainer()), a = MM(o, r, i, ca(u), ia(u)), $(a, function(t, n) {
                                return qi(u, n, eM(t))
                            }), dO(o)
                        },
                        blockerClass: "tox-blocker"
                    })])
                }
            };
            return {
                dom: {
                    tag: "div",
                    classes: ["tox-statusbar"]
                },
                components: (d = [], s.getParam("elementpath", !0, "boolean") && d.push(EM(s, {})), dn(s.settings.plugins, "wordcount") && d.push((u = s, a = t, l = function(t, n, e) {
                    return $d.set(t, [lu(a.translate(["{0} " + e, n[e]]))])
                }, Qm.sketch({
                    dom: {
                        tag: "button",
                        classes: ["tox-statusbar__wordcount"]
                    },
                    components: [],
                    buttonBehaviours: Ru([nb.config({}), $d.config({}), lm.config({
                        store: {
                            mode: "memory",
                            initialValue: {
                                mode: "words",
                                count: {
                                    words: 0,
                                    characters: 0
                                }
                            }
                        }
                    }), _m("wordcount-events", [qr(Ut(), function(t) {
                        var n = lm.getValue(t),
                            e = "words" === n.mode ? "characters" : "words";
                        lm.setValue(t, {
                            mode: e,
                            count: n.count
                        }), l(t, n.count, e)
                    }), ei(function(e) {
                        u.on("wordCountUpdate", function(t) {
                            var n = lm.getValue(e).mode;
                            lm.setValue(e, {
                                mode: n,
                                count: t.wordCount
                            }), l(e, t.wordCount, n)
                        })
                    })])]),
                    eventOrder: (c = {}, c[Ut()] = ["wordcount-events", "alloy.base.behaviour"], c)
                }))), s.getParam("branding", !0, "boolean") && d.push((f = '<a href="https://www.tiny.cloud/?utm_campaign=editor_referral&amp;utm_medium=poweredby&amp;utm_source=tinymce&amp;utm_content=v5" rel="noopener" target="_blank" tabindex="-1" aria-label="' + ig.translate(["Powered by {0}", "Tiny"]) + '">Tiny</a>', {
                    dom: {
                        tag: "span",
                        classes: ["tox-statusbar__branding"],
                        innerHtml: ig.translate(["Powered by {0}", f])
                    }
                })), r = 0 < d.length ? [{
                    dom: {
                        tag: "div",
                        classes: ["tox-statusbar__text-container"]
                    },
                    components: d
                }] : [], e = !dn((n = s).settings.plugins, "autoresize"), i = !1 === (o = n.getParam("resize", e)) ? oC.None : "both" === o ? oC.Both : oC.Vertical, i !== oC.None && r.push(m(i)), r)
            }
        },
        TM = function(d) {
            var t, n, e = d.getParam("inline", !1, "boolean"),
                m = e ? jO : bO,
                o = tt.none(),
                r = ig.isRtl() ? {
                    attributes: {
                        dir: "rtl"
                    }
                } : {},
                h = mu({
                    dom: Ke({
                        tag: "div",
                        classes: ["tox", "tox-silver-sink", "tox-tinymce-aux"]
                    }, r),
                    behaviours: Ru([ss.config({
                        useFixed: !1
                    })])
                }),
                i = Zm({
                    dom: {
                        tag: "div",
                        classes: ["tox-anchorbar"]
                    }
                }),
                g = KS(h, d, function() {
                    return o.bind(function(t) {
                        return i.getOpt(t)
                    }).getOrDie("Could not find a toolbar element")
                }),
                v = function() {
                    return dt.value(h)
                },
                u = lO.parts().menubar({
                    dom: {
                        tag: "div",
                        classes: ["tox-menubar"]
                    },
                    getSink: v,
                    providers: g.shared.providers,
                    onEscape: function() {
                        d.focus()
                    }
                }),
                a = lO.parts().toolbar({
                    dom: {
                        tag: "div",
                        classes: ["tox-toolbar"]
                    },
                    onEscape: function() {
                        d.focus()
                    }
                }),
                c = lO.parts().socket({
                    dom: {
                        tag: "div",
                        classes: ["tox-edit-area"]
                    }
                }),
                s = lO.parts().sidebar({
                    dom: {
                        tag: "div",
                        classes: ["tox-sidebar"]
                    }
                }),
                l = d.getParam("statusbar", !0, "boolean") && !e ? tt.some(VM(d, g.shared.providers)) : tt.none(),
                f = {
                    dom: {
                        tag: "div",
                        classes: ["tox-sidebar-wrap"]
                    },
                    components: [c, s]
                },
                p = (n = (t = d).getParam("toolbar"), (O(n) ? 0 < n.length : !1 !== t.getParam("toolbar", !0, "boolean")) || _v(d).isSome()),
                b = !1 !== d.getParam("menubar", !0, "boolean"),
                y = R([b ? [u] : [], p ? [a] : [],
                    [i.asSpec()], e ? [] : [f]
                ]),
                x = R([
                    [{
                        dom: {
                            tag: "div",
                            classes: ["tox-editor-container"]
                        },
                        components: y
                    }], e ? [] : l.toArray()
                ]),
                w = Ke({
                    role: "application"
                }, ig.isRtl() ? {
                    dir: "rtl"
                } : {}),
                z = mu(lO.sketch({
                    dom: {
                        tag: "div",
                        classes: ["tox", "tox-tinymce"].concat(e ? ["tox-tinymce-inline"] : []),
                        styles: {
                            visibility: "hidden"
                        },
                        attributes: w
                    },
                    components: x,
                    behaviours: Ru(m.getBehaviours(d).concat([Xd.config({
                        mode: "cyclic",
                        selector: ".tox-menubar, .tox-toolbar, .tox-sidebar--sliding-open, .tox-statusbar__path, .tox-statusbar__wordcount, .tox-statusbar__branding a"
                    })]))
                }));
            o = tt.some(z), d.shortcuts.add("alt+F9", "focus menubar", function() {
                lO.focusMenubar(z)
            }), d.shortcuts.add("alt+F10", "focus toolbar", function() {
                lO.focusToolbar(z)
            });
            var S = Vv(z),
                k = Vv(h);
            MC(d, S, k);
            var C = function(t) {
                var n, e = Tv.DOM,
                    o = d.getParam("width", e.getStyle(t, "width")),
                    r = (n = d).getParam("height", Math.max(n.getElement().offsetHeight, 200)),
                    i = Bv(d),
                    u = Dv(d),
                    a = nM(o).bind(function(n) {
                        return eM(i.map(function(t) {
                            return Math.max(n, t)
                        }))
                    }).getOr(eM(o)),
                    c = nM(r).bind(function(n) {
                        return u.map(function(t) {
                            return Math.max(n, t)
                        })
                    }).getOr(r),
                    s = eM(a);
                if (Zi("div", "width", s) && qi(z.element(), "width", s), !d.inline) {
                    var l = eM(c);
                    Zi("div", "height", l) ? qi(z.element(), "height", l) : qi(z.element(), "height", "200px")
                }
                return c
            };
            return {
                mothership: S,
                uiMothership: k,
                backstage: g,
                renderUI: function() {
                    var o, r;
                    tM(d, v, g.shared), r = (o = d).ui.registry.getAll().sidebars, T(K(r), function(n) {
                        var t = r[n],
                            e = function() {
                                return tt.from(o.queryCommandValue("ToggleSidebar")).is(n)
                            };
                        o.ui.registry.addToggleButton(n, {
                            icon: t.icon,
                            tooltip: t.tooltip,
                            onAction: function(t) {
                                o.execCommand("ToggleSidebar", !1, n), t.setActive(e())
                            },
                            onSetup: function(t) {
                                var n = function() {
                                    return t.setActive(e())
                                };
                                return o.on("ToggleSidebar", n),
                                    function() {
                                        o.off("ToggleSidebar", n)
                                    }
                            }
                        })
                    });
                    var t = d.ui.registry.getAll(),
                        n = t.buttons,
                        e = t.menuItems,
                        i = t.contextToolbars,
                        u = t.sidebars,
                        a = {
                            menuItems: e,
                            buttons: n,
                            menus: d.settings.menu ? nt(d.settings.menu, function(t) {
                                return pt(t, {
                                    items: t.items
                                })
                            }) : {},
                            menubar: d.settings.menubar,
                            toolbar: _v(d).getOr(d.getParam("toolbar", !0)),
                            sidebar: u
                        };
                    OC(d, i, h, {
                        backstage: g
                    });
                    var c = d.getElement(),
                        s = C(c),
                        l = {
                            mothership: S,
                            uiMothership: k,
                            outerContainer: z
                        },
                        f = {
                            targetNode: c,
                            height: s
                        };
                    return m.render(d, l, a, g, f)
                },
                getUi: function() {
                    return {
                        channels: {
                            broadcastAll: k.broadcast,
                            broadcastOn: k.broadcastOn,
                            register: function() {}
                        }
                    }
                }
            }
        },
        AM = function(o) {
            Dz.each([{
                name: "alignleft",
                text: "Align left",
                cmd: "JustifyLeft",
                icon: "align-left"
            }, {
                name: "aligncenter",
                text: "Align center",
                cmd: "JustifyCenter",
                icon: "align-center"
            }, {
                name: "alignright",
                text: "Align right",
                cmd: "JustifyRight",
                icon: "align-right"
            }, {
                name: "alignjustify",
                text: "Justify",
                cmd: "JustifyFull",
                icon: "align-justify"
            }], function(t) {
                var e;
                o.ui.registry.addToggleButton(t.name, {
                    tooltip: t.text,
                    onAction: function() {
                        return o.execCommand(t.cmd)
                    },
                    icon: t.icon,
                    onSetup: (e = t, function(n) {
                        var t = function(t) {
                            n.setActive(t)
                        };
                        return o.formatter ? (n.setActive(o.formatter.match(e.name)), o.formatter.formatChanged(e.name, t)) : o.on("init", function() {
                                n.setActive(o.formatter.match(e.name)), o.formatter.formatChanged(e.name, t)
                            }),
                            function() {}
                    })
                })
            });
            var t = "alignnone",
                n = "No alignment",
                e = "JustifyNone",
                r = "align-none";
            o.ui.registry.addButton(t, {
                tooltip: n,
                onAction: function() {
                    return o.execCommand(e)
                },
                icon: r
            })
        },
        BM = function(t, n) {
            return function() {
                t.execCommand("mceToggleFormat", !1, n)
            }
        },
        DM = function(e, o) {
            return function(n) {
                var t = function(t) {
                    n.setActive(t)
                };
                return e.formatter ? (n.setActive(e.formatter.match(o)), e.formatter.formatChanged(o, t)) : e.on("init", function() {
                        n.setActive(e.formatter.match(o)), e.formatter.formatChanged(o, t)
                    }),
                    function() {}
            }
        },
        _M = function(t) {
            var n, e, o;
            n = t, Dz.each([{
                name: "bold",
                text: "Bold",
                icon: "bold"
            }, {
                name: "italic",
                text: "Italic",
                icon: "italic"
            }, {
                name: "underline",
                text: "Underline",
                icon: "underline"
            }, {
                name: "strikethrough",
                text: "Strikethrough",
                icon: "strike-through"
            }, {
                name: "subscript",
                text: "Subscript",
                icon: "subscript"
            }, {
                name: "superscript",
                text: "Superscript",
                icon: "superscript"
            }], function(t) {
                n.ui.registry.addToggleButton(t.name, {
                    tooltip: t.text,
                    icon: t.icon,
                    onSetup: DM(n, t.name),
                    onAction: BM(n, t.name)
                })
            }), e = t, Dz.each([{
                name: "cut",
                text: "Cut",
                action: "Cut",
                icon: "cut"
            }, {
                name: "copy",
                text: "Copy",
                action: "Copy",
                icon: "copy"
            }, {
                name: "paste",
                text: "Paste",
                action: "Paste",
                icon: "paste"
            }, {
                name: "help",
                text: "Help",
                action: "mceHelp",
                icon: "help"
            }, {
                name: "selectall",
                text: "Select all",
                action: "SelectAll",
                icon: "select-all"
            }, {
                name: "newdocument",
                text: "New document",
                action: "mceNewDocument",
                icon: "new-document"
            }, {
                name: "removeformat",
                text: "Clear formatting",
                action: "RemoveFormat",
                icon: "remove-formatting"
            }, {
                name: "remove",
                text: "Remove",
                action: "Delete",
                icon: "remove"
            }], function(t) {
                e.ui.registry.addButton(t.name, {
                    tooltip: t.text,
                    icon: t.icon,
                    onAction: function() {
                        return e.execCommand(t.action)
                    }
                })
            }), o = t, Dz.each([{
                name: "blockquote",
                text: "Blockquote",
                action: "mceBlockQuote",
                icon: "quote"
            }], function(t) {
                o.ui.registry.addToggleButton(t.name, {
                    tooltip: t.text,
                    icon: t.icon,
                    onAction: function() {
                        return o.execCommand(t.action)
                    },
                    onSetup: DM(o, t.name)
                })
            })
        },
        FM = function(t) {
            var n;
            _M(t), n = t, Dz.each([{
                name: "bold",
                text: "Bold",
                action: "Bold",
                icon: "bold",
                shortcut: "Meta+B"
            }, {
                name: "italic",
                text: "Italic",
                action: "Italic",
                icon: "italic",
                shortcut: "Meta+I"
            }, {
                name: "underline",
                text: "Underline",
                action: "Underline",
                icon: "underline",
                shortcut: "Meta+U"
            }, {
                name: "strikethrough",
                text: "Strikethrough",
                action: "Strikethrough",
                icon: "strike-through",
                shortcut: ""
            }, {
                name: "subscript",
                text: "Subscript",
                action: "Subscript",
                icon: "subscript",
                shortcut: ""
            }, {
                name: "superscript",
                text: "Superscript",
                action: "Superscript",
                icon: "superscript",
                shortcut: ""
            }, {
                name: "removeformat",
                text: "Clear formatting",
                action: "RemoveFormat",
                icon: "remove-formatting",
                shortcut: ""
            }, {
                name: "newdocument",
                text: "New document",
                action: "mceNewDocument",
                icon: "new-document",
                shortcut: ""
            }, {
                name: "cut",
                text: "Cut",
                action: "Cut",
                icon: "cut",
                shortcut: "Meta+X"
            }, {
                name: "copy",
                text: "Copy",
                action: "Copy",
                icon: "copy",
                shortcut: "Meta+C"
            }, {
                name: "paste",
                text: "Paste",
                action: "Paste",
                icon: "paste",
                shortcut: "Meta+V"
            }, {
                name: "selectall",
                text: "Select all",
                action: "SelectAll",
                icon: "select-all",
                shortcut: "Meta+A"
            }], function(t) {
                n.ui.registry.addMenuItem(t.name, {
                    text: t.text,
                    icon: t.icon,
                    shortcut: t.shortcut,
                    onAction: function() {
                        return n.execCommand(t.action)
                    }
                })
            }), n.ui.registry.addMenuItem("codeformat", {
                text: "Code",
                icon: "sourcecode",
                onAction: BM(n, "code")
            })
        },
        IM = function(t, n, e) {
            var o = function() {
                    return !!n.undoManager && n.undoManager[e]()
                },
                r = function() {
                    t.setDisabled(n.readonly || !o())
                };
            return t.setDisabled(!o()), n.on("Undo Redo AddUndo TypingUndo ClearUndos SwitchMode", r),
                function() {
                    return n.off("Undo Redo AddUndo TypingUndo ClearUndos SwitchMode", r)
                }
        },
        LM = function(t) {
            var n, e;
            (n = t).ui.registry.addMenuItem("undo", {
                text: "Undo",
                icon: "undo",
                shortcut: "Meta+Z",
                onSetup: function(t) {
                    return IM(t, n, "hasUndo")
                },
                onAction: function() {
                    return n.execCommand("undo")
                }
            }), n.ui.registry.addMenuItem("redo", {
                text: "Redo",
                icon: "redo",
                shortcut: "Meta+Y",
                onSetup: function(t) {
                    return IM(t, n, "hasRedo")
                },
                onAction: function() {
                    return n.execCommand("redo")
                }
            }), (e = t).ui.registry.addButton("undo", {
                tooltip: "Undo",
                icon: "undo",
                onSetup: function(t) {
                    return IM(t, e, "hasUndo")
                },
                onAction: function() {
                    return e.execCommand("undo")
                }
            }), e.ui.registry.addButton("redo", {
                tooltip: "Redo",
                icon: "redo",
                onSetup: function(t) {
                    return IM(t, e, "hasRedo")
                },
                onAction: function() {
                    return e.execCommand("redo")
                }
            })
        },
        RM = function(t) {
            var n, e;
            (n = t).ui.registry.addButton("visualaid", {
                tooltip: "Visual aids",
                text: "Visual aids",
                onAction: function() {
                    return n.execCommand("mceToggleVisualAid")
                }
            }), (e = t).ui.registry.addToggleMenuItem("visualaid", {
                text: "Visual aids",
                onSetup: function(t) {
                    return function(n, t) {
                        n.setActive(t.hasVisual);
                        var e = function(t) {
                            n.setActive(t.hasVisual)
                        };
                        return t.on("VisualAid", e),
                            function() {
                                return t.off("VisualAid", e)
                            }
                    }(t, e)
                },
                onAction: function() {
                    e.execCommand("mceToggleVisualAid")
                }
            })
        },
        NM = function(t) {
            var n;
            (n = t).ui.registry.addButton("outdent", {
                tooltip: "Decrease indent",
                icon: "outdent",
                onSetup: function(t) {
                    return function(t, n) {
                        t.setDisabled(!n.queryCommandState("outdent"));
                        var e = function() {
                            t.setDisabled(!n.queryCommandState("outdent"))
                        };
                        return n.on("NodeChange", e),
                            function() {
                                return n.off("NodeChange", e)
                            }
                    }(t, n)
                },
                onAction: function() {
                    return n.execCommand("outdent")
                }
            }), n.ui.registry.addButton("indent", {
                tooltip: "Increase indent",
                icon: "indent",
                onAction: function() {
                    return n.execCommand("indent")
                }
            })
        },
        PM = function(t, n) {
            var e, o, r, i, u, a, c, s, l, f, d, m, h, g, v, p, b, y, x, w;
            o = n, r = aC(e = t), i = nC(0, o, r.dataset, r), e.ui.registry.addNestedMenuItem("align", {
                text: o.shared.providers.translate("Align"),
                getSubmenuItems: function() {
                    return i.items.validateItems(i.getStyleItems())
                }
            }), a = n, c = sC(u = t), s = nC(0, a, c.dataset, c), u.ui.registry.addNestedMenuItem("fontformats", {
                text: a.shared.providers.translate("Fonts"),
                getSubmenuItems: function() {
                    return s.items.validateItems(s.getStyleItems())
                }
            }), l = t, d = (f = n).styleselect, m = nC(0, f, d, hC(l)), l.ui.registry.addNestedMenuItem("formats", {
                text: "Formats",
                getSubmenuItems: function() {
                    return m.items.validateItems(m.getStyleItems())
                }
            }), g = n, v = mC(h = t), p = nC(0, g, v.dataset, v), h.ui.registry.addNestedMenuItem("blockformats", {
                text: "Blocks",
                getSubmenuItems: function() {
                    return p.items.validateItems(p.getStyleItems())
                }
            }), y = n, x = fC(b = t), w = nC(0, y, x.dataset, x), b.ui.registry.addNestedMenuItem("fontsizes", {
                text: "Font sizes",
                getSubmenuItems: function() {
                    return w.items.validateItems(w.getStyleItems())
                }
            })
        },
        jM = function(t, n) {
            AM(t), FM(t), PM(t, n), LM(t), Pb.register(t), RM(t), NM(t)
        },
        UM = function(t, n) {
            var e = tt.from(Te(t, "id")).fold(function() {
                var t = Ye("dialog-label");
                return Ee(n, "id", t), t
            }, d);
            Ee(t, "aria-labelledby", e)
        },
        WM = Z([or("lazySink"), fr("dragBlockClass"), vr("useTabstopAt", Z(!0)), vr("eventOrder", {}), Ds("modalBehaviours", [Xd]), Hu("onExecute"), Vu("onEscape")]),
        GM = {
            sketch: d
        },
        XM = Z([ll({
            name: "draghandle",
            overrides: function(t, n) {
                return {
                    behaviours: Ru([xM.config({
                        mode: "mouse",
                        getTarget: function(t) {
                            return gu(t, '[role="dialog"]').getOr(t)
                        },
                        blockerClass: t.dragBlockClass.getOrDie(new Error("The drag blocker class was not specified for a dialog with a drag handle: \n" + ko(n, null, 2)).message)
                    })])
                }
            }
        }), cl({
            schema: [or("dom")],
            name: "title"
        }), cl({
            factory: GM,
            schema: [or("dom")],
            name: "close"
        }), cl({
            factory: GM,
            schema: [or("dom")],
            name: "body"
        }), cl({
            factory: GM,
            schema: [or("dom")],
            name: "footer"
        }), sl({
            factory: {
                sketch: function(t, n) {
                    return Ke({}, t, {
                        dom: n.dom,
                        components: n.components
                    })
                }
            },
            schema: [vr("dom", {
                tag: "div",
                styles: {
                    position: "fixed",
                    left: "0px",
                    top: "0px",
                    right: "0px",
                    bottom: "0px"
                }
            }), vr("components", [])],
            name: "blocker"
        })]),
        YM = Il({
            name: "ModalDialog",
            configFields: WM(),
            partFields: XM(),
            factory: function(o, t, n, r) {
                var a = Ye("alloy.dialog.busy"),
                    c = Ye("alloy.dialog.idle"),
                    s = Ru([Xd.config({
                        mode: "special",
                        onTab: function() {
                            return tt.some(!0)
                        },
                        onShiftTab: function() {
                            return tt.some(!0)
                        }
                    }), gm.config({})]),
                    e = Ye("modal-events"),
                    i = Ke({}, o.eventOrder, {
                        "alloy.system.attached": [e].concat(o.eventOrder["alloy.system.attached"] || [])
                    });
                return {
                    uid: o.uid,
                    dom: o.dom,
                    components: t,
                    apis: {
                        show: function(i) {
                            var t = o.lazySink(i).getOrDie(),
                                u = Ot(tt.none()),
                                n = r.blocker(),
                                e = t.getSystem().build(Ke({}, n, {
                                    components: n.components.concat([hu(i)]),
                                    behaviours: Ru([_m("dialog-blocker-events", [qr(c, function(t, n) {
                                        Ae(i.element(), "aria-busy") && (Be(i.element(), "aria-busy"), u.get().each(function(t) {
                                            return $d.remove(i, t)
                                        }))
                                    }), qr(a, function(t, n) {
                                        Ee(i.element(), "aria-busy", "true");
                                        var e = n.event().getBusySpec();
                                        u.get().each(function(t) {
                                            $d.remove(i, t)
                                        });
                                        var o = e(i, s),
                                            r = t.getSystem().build(o);
                                        u.set(tt.some(r)), $d.append(i, hu(r)), r.hasConfigured(Xd) && Xd.focusIn(r)
                                    })])])
                                }));
                            ds(t, e), Xd.focusIn(i)
                        },
                        hide: function(n) {
                            le(n.element()).each(function(t) {
                                n.getSystem().getByDom(t).each(function(t) {
                                    gs(t)
                                })
                            })
                        },
                        getBody: function(t) {
                            return Sl(t, o, "body")
                        },
                        getFooter: function(t) {
                            return Sl(t, o, "footer")
                        },
                        setIdle: function(t) {
                            Hr(t, c)
                        },
                        setBusy: function(t, n) {
                            Er(t, a, {
                                getBusySpec: n
                            })
                        }
                    },
                    eventOrder: i,
                    domModification: {
                        attributes: {
                            role: "dialog",
                            "aria-modal": "true"
                        }
                    },
                    behaviours: Fs(o.modalBehaviours, [$d.config({}), Xd.config({
                        mode: "cyclic",
                        onEnter: o.onExecute,
                        onEscape: o.onEscape,
                        useTabstopAt: o.useTabstopAt
                    }), _m(e, [ei(function(t) {
                        UM(t.element(), Sl(t, o, "title").element())
                    })])])
                }
            },
            apis: {
                show: function(t, n) {
                    t.show(n)
                },
                hide: function(t, n) {
                    t.hide(n)
                },
                getBody: function(t, n) {
                    return t.getBody(n)
                },
                getFooter: function(t, n) {
                    return t.getFooter(n)
                },
                setBusy: function(t, n, e) {
                    t.setBusy(n, e)
                },
                setIdle: function(t, n) {
                    t.setIdle(n)
                }
            }
        }),
        qM = [ir("type"), ir("text"), ur("level", ["info", "warn", "error", "success"]), ir("icon"), vr("url", "")],
        KM = [ir("type"), ir("text"), wr("primary", !1), Ro("name", "name", oo(function() {
            return Ye("button-name")
        }), Zo), mr("icon")],
        JM = [ir("type"), ir("name"), ir("label")],
        $M = tr,
        QM = [ir("type"), ir("name"), mr("label")],
        ZM = QM,
        tH = Zo,
        nH = QM,
        eH = Zo,
        oH = QM,
        rH = Do(jo),
        iH = QM.concat([wr("sandboxed", !0)]),
        uH = Zo,
        aH = QM.concat([mr("placeholder")]),
        cH = Zo,
        sH = QM.concat([sr("items", [ir("text"), ir("value")]), br("size", 1)]),
        lH = Zo,
        fH = QM.concat([wr("constrain", !0)]),
        dH = Bo([ir("width"), ir("height")]),
        mH = QM.concat([mr("placeholder")]),
        hH = Zo,
        gH = QM.concat([xr("filetype", "file", ["image", "media", "file"])]),
        vH = Bo([ir("value"), vr("meta", {})]),
        pH = QM.concat([ir("type"), yr("tag", "textarea"), ar("init")]),
        bH = Zo,
        yH = [ir("type"), ir("html")],
        xH = QM.concat([rr("currentState", Bo([or("blob"), ir("url")]))]),
        wH = QM.concat([vr("columns", "auto")]),
        zH = (wM = [ir("value"), mr("text"), mr("icon")], Io(wM)),
        SH = [ir("type"), lr("header", Zo), lr("cells", Do(Zo))],
        kH = function(n) {
            return Ro("items", "items", no(), Do(Uo(function(t) {
                return Go("Checking item of " + n, CH, t).fold(function(t) {
                    return dt.error(qo(t))
                }, function(t) {
                    return dt.value(t)
                })
            })))
        },
        CH = Ko("type", {
            alertbanner: qM,
            bar: (CM = kH("bar"), [ir("type"), CM]),
            button: KM,
            checkbox: JM,
            colorinput: ZM,
            colorpicker: nH,
            dropzone: oH,
            grid: (SM = kH("grid"), [ir("type"), (kM = "columns", rr(kM, Qo)), SM]),
            iframe: iH,
            input: aH,
            selectbox: sH,
            sizeinput: fH,
            textarea: mH,
            urlinput: gH,
            customeditor: pH,
            htmlpanel: yH,
            imagetools: xH,
            collection: wH,
            label: (zM = kH("label"), [ir("type"), ir("label"), zM]),
            table: SH
        }),
        OH = [ir("type"), lr("items", CH)],
        MH = [ir("title"), lr("items", CH)],
        HH = [ir("type"), sr("tabs", MH)],
        EH = Bo([ur("type", ["submit", "cancel", "custom"]), Ro("name", "name", oo(function() {
            return Ye("button-name")
        }), Zo), ir("text"), mr("icon"), xr("align", "end", ["start", "end"]), wr("primary", !1), wr("disabled", !1)]),
        VH = Bo([ir("title"), rr("body", Ko("type", {
            panel: OH,
            tabpanel: HH
        })), yr("size", "normal"), lr("buttons", EH), vr("initialData", {}), zr("onAction", Q), zr("onChange", Q), zr("onSubmit", Q), zr("onClose", Q), zr("onCancel", Q), vr("onTabChange", Q)]),
        TH = function(t) {
            return w(t) ? [t].concat(N(rt(t), TH)) : O(t) ? N(t, TH) : []
        },
        AH = function(t) {
            return x(t.type) && x(t.name)
        },
        BH = {
            checkbox: $M,
            colorinput: tH,
            colorpicker: eH,
            dropzone: rH,
            input: cH,
            iframe: uH,
            sizeinput: dH,
            selectbox: lH,
            size: dH,
            textarea: hH,
            urlinput: vH,
            customeditor: bH,
            collection: zH
        },
        DH = function(t) {
            var n = N(A(TH(t), AH), function(n) {
                return (t = n, tt.from(BH[t.type])).fold(function() {
                    return []
                }, function(t) {
                    return [rr(n.name, t)]
                });
                var t
            });
            return Bo(n)
        },
        _H = function(t) {
            return {
                internalDialog: Xo(Go("dialog", VH, t)),
                dataValidator: DH(t),
                initialData: t.initialData
            }
        },
        FH = {
            open: function(t, n) {
                var e = _H(n);
                return t(e.internalDialog, e.initialData, e.dataValidator)
            },
            redial: function(t) {
                return _H(t)
            }
        },
        IH = Ye("update-dialog"),
        LH = Ye("update-title"),
        RH = Ye("update-body"),
        NH = Ye("update-footer"),
        PH = function(t) {
            var e = [],
                o = {};
            return $(t, function(t, n) {
                t.fold(function() {
                    e.push(n)
                }, function(t) {
                    o[n] = t
                })
            }), 0 < e.length ? dt.error(e) : dt.value(o)
        },
        jH = Fl({
            name: "TabButton",
            configFields: [vr("uid", undefined), or("value"), Ro("dom", "dom", ro(function(t) {
                return {
                    attributes: {
                        role: "tab",
                        id: Ye("aria"),
                        "aria-selected": "false"
                    }
                }
            }), Jo()), fr("action"), vr("domModification", {}), Ds("tabButtonBehaviours", [gm, Xd, lm]), or("view")],
            factory: function(t, n) {
                return {
                    uid: t.uid,
                    dom: t.dom,
                    components: t.components,
                    events: $m(t.action),
                    behaviours: Fs(t.tabButtonBehaviours, [gm.config({}), Xd.config({
                        mode: "execution",
                        useSpace: !0,
                        useEnter: !0
                    }), lm.config({
                        store: {
                            mode: "memory",
                            initialValue: t.value
                        }
                    })]),
                    domModification: t.domModification
                }
            }
        }),
        UH = Z([or("tabs"), or("dom"), vr("clickToDismiss", !1), Ds("tabbarBehaviours", [tf, Xd]), Cu(["tabClass", "selectedClass"])]),
        WH = fl({
            factory: jH,
            name: "tabs",
            unit: "tab",
            overrides: function(o, t) {
                var r = function(t, n) {
                        tf.dehighlight(t, n), Er(t, Pn(), {
                            tabbar: t,
                            button: n
                        })
                    },
                    i = function(t, n) {
                        tf.highlight(t, n), Er(t, Nn(), {
                            tabbar: t,
                            button: n
                        })
                    };
                return {
                    action: function(t) {
                        var n = t.getSystem().getByUid(o.uid).getOrDie(),
                            e = tf.isHighlighted(n, t);
                        (e && o.clickToDismiss ? r : e ? Q : i)(n, t)
                    },
                    domModification: {
                        classes: [o.markers.tabClass]
                    }
                }
            }
        }),
        GH = Z([WH]),
        XH = Il({
            name: "Tabbar",
            configFields: UH(),
            partFields: GH(),
            factory: function(t, n, e, o) {
                return {
                    uid: t.uid,
                    dom: t.dom,
                    components: n,
                    "debug.sketcher": "Tabbar",
                    domModification: {
                        attributes: {
                            role: "tablist"
                        }
                    },
                    behaviours: Fs(t.tabbarBehaviours, [tf.config({
                        highlightClass: t.markers.selectedClass,
                        itemClass: t.markers.tabClass,
                        onHighlight: function(t, n) {
                            Ee(n.element(), "aria-selected", "true")
                        },
                        onDehighlight: function(t, n) {
                            Ee(n.element(), "aria-selected", "false")
                        }
                    }), Xd.config({
                        mode: "flow",
                        getInitial: function(t) {
                            return tf.getHighlighted(t).map(function(t) {
                                return t.element()
                            })
                        },
                        selector: "." + t.markers.tabClass,
                        executeOnMove: !0
                    })])
                }
            }
        }),
        YH = Fl({
            name: "Tabview",
            configFields: [Ds("tabviewBehaviours", [$d])],
            factory: function(t, n) {
                return {
                    uid: t.uid,
                    dom: t.dom,
                    behaviours: Fs(t.tabviewBehaviours, [$d.config({})]),
                    domModification: {
                        attributes: {
                            role: "tabpanel"
                        }
                    }
                }
            }
        }),
        qH = Z([vr("selectFirst", !0), Mu("onChangeTab"), Mu("onDismissTab"), vr("tabs", []), Ds("tabSectionBehaviours", [])]),
        KH = cl({
            factory: XH,
            schema: [or("dom"), cr("markers", [or("tabClass"), or("selectedClass")])],
            name: "tabbar",
            defaults: function(t) {
                return {
                    tabs: t.tabs
                }
            }
        }),
        JH = cl({
            factory: YH,
            name: "tabview"
        }),
        $H = Z([KH, JH]),
        QH = Il({
            name: "TabSection",
            configFields: qH(),
            partFields: $H(),
            factory: function(i, t, n, e) {
                var o = function(t, n) {
                    zl(t, i, "tabbar").each(function(t) {
                        n(t).each(Vr)
                    })
                };
                return {
                    uid: i.uid,
                    dom: i.dom,
                    components: t,
                    behaviours: _s(i.tabSectionBehaviours),
                    events: Gr(R([i.selectFirst ? [ei(function(t, n) {
                            o(t, tf.getFirst)
                        })] : [],
                        [qr(Nn(), function(t, n) {
                            var o, r, e = n.event().button();
                            o = e, r = lm.getValue(o), zl(o, i, "tabview").each(function(e) {
                                _(i.tabs, function(t) {
                                    return t.value === r
                                }).each(function(t) {
                                    var n = t.view();
                                    Ee(e.element(), "aria-labelledby", Te(o.element(), "id")), $d.set(e, n), i.onChangeTab(e, o, n)
                                })
                            })
                        }), qr(Pn(), function(t, n) {
                            var e = n.event().button();
                            i.onDismissTab(t, e)
                        })]
                    ])),
                    apis: {
                        getViewItems: function(t) {
                            return zl(t, i, "tabview").map(function(t) {
                                return $d.contents(t)
                            }).getOr([])
                        },
                        showTab: function(t, e) {
                            o(t, function(n) {
                                var t = tf.getCandidates(n);
                                return _(t, function(t) {
                                    return lm.getValue(t) === e
                                }).filter(function(t) {
                                    return !tf.isHighlighted(n, t)
                                })
                            })
                        }
                    }
                }
            },
            apis: {
                getViewItems: function(t, n) {
                    return t.getViewItems(n)
                },
                showTab: function(t, n, e) {
                    t.showTab(n, e)
                }
            }
        }),
        ZH = function(t) {
            return X((n = t, e = function(t, n) {
                return n < t ? -1 : t < n ? 1 : 0
            }, (o = j.call(n, 0)).sort(e), o));
            var n, e, o
        },
        tE = function(i, u, t) {
            gu(i, '[role="dialog"]').each(function(r) {
                t.get().map(function(t) {
                    return qi(u, "height", "0"), Math.min(t, (e = i, o = gu(n = r, ".tox-dialog-wrap").getOr(n), ("fixed" === Ji(o, "position") ? Math.max(document.documentElement.clientHeight, window.innerHeight) : Math.max(document.documentElement.offsetHeight, document.documentElement.scrollHeight)) - (n.dom().getBoundingClientRect().height - e.dom().getBoundingClientRect().height)));
                    var n, e, o
                }).each(function(t) {
                    qi(u, "height", t + "px")
                })
            })
        },
        nE = function(a) {
            var c;
            return {
                smartTabHeight: (c = Ot(tt.none()), {
                    extraEvents: [ei(function(t) {
                        vu(t.element(), '[role="tabpanel"]').each(function(u) {
                            var n;
                            qi(u, "visibility", "hidden"), t.getSystem().getByDom(u).toOption().each(function(t) {
                                var o, r, i, n = (r = u, i = t, V(o = a, function(t, n) {
                                        $d.set(i, o[n].view());
                                        var e = r.dom().getBoundingClientRect();
                                        return $d.set(i, []), e.height
                                    })),
                                    e = ZH(n);
                                c.set(e)
                            }), tE(t.element(), u, c), tu(u, "visibility"), n = t, X(a).each(function(t) {
                                return QH.showTab(n, t.value)
                            }), JS.requestAnimationFrame(function() {
                                tE(t.element(), u, c)
                            })
                        })
                    }), qr(Dn(), function(n) {
                        vu(n.element(), '[role="tabpanel"]').each(function(t) {
                            tE(n.element(), t, c)
                        })
                    }), qr(Wv, function(r, t) {
                        vu(r.element(), '[role="tabpanel"]').each(function(n) {
                            var t = mf();
                            qi(n, "visibility", "hidden");
                            var e = Qi(n, "height").map(function(t) {
                                return parseInt(t, 10)
                            });
                            tu(n, "height");
                            var o = n.dom().getBoundingClientRect().height;
                            e.forall(function(t) {
                                return t < o
                            }) ? (c.set(tt.from(o)), tE(r.element(), n, c)) : e.each(function(t) {
                                qi(n, "height", t + "px")
                            }), tu(n, "visibility"), t.each(df)
                        })
                    })],
                    selectFirst: !1
                }),
                naiveTabHeight: {
                    extraEvents: [],
                    selectFirst: !0
                }
            }
        },
        eE = "send-data-to-section",
        oE = "send-data-to-view",
        rE = function(t, d) {
            return {
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__content-js"]
                },
                components: [],
                behaviours: Ru([Zx(0), Mk.config({
                    channel: RH,
                    updateState: function(t, n) {
                        return tt.some({
                            isTabPanel: function() {
                                return "tabpanel" === n.body.type
                            }
                        })
                    },
                    renderComponents: function(t) {
                        switch (t.body.type) {
                            case "tabpanel":
                                return [(r = {
                                    tabs: t.body.tabs
                                }, i = d, u = Ot({}), a = function(t) {
                                    var n = lm.getValue(t),
                                        e = PH(n).getOr({}),
                                        o = u.get(),
                                        r = vt(o, e);
                                    u.set(r)
                                }, c = function(t) {
                                    var n = u.get();
                                    lm.setValue(t, n)
                                }, s = Ot(null), l = V(r.tabs, function(t) {
                                    return {
                                        value: t.title,
                                        dom: {
                                            tag: "div",
                                            classes: ["tox-dialog__body-nav-item"],
                                            innerHtml: i.shared.providers.translate(t.title)
                                        },
                                        view: function() {
                                            return [Ux.sketch(function(n) {
                                                return {
                                                    dom: {
                                                        tag: "div",
                                                        classes: ["tox-form"]
                                                    },
                                                    components: V(t.items, function(t) {
                                                        return dS(n, t, i)
                                                    }),
                                                    formBehaviours: Ru([Xd.config({
                                                        mode: "acyclic",
                                                        useTabstopAt: m(hw)
                                                    }), _m("TabView.form.events", [ei(c), oi(a)]), Yu.config({
                                                        channels: St([{
                                                            key: eE,
                                                            value: {
                                                                onReceive: a
                                                            }
                                                        }, {
                                                            key: oE,
                                                            value: {
                                                                onReceive: c
                                                            }
                                                        }])
                                                    })])
                                                }
                                            })]
                                        }
                                    }
                                }), f = nE(l).smartTabHeight, QH.sketch({
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-dialog__body"]
                                    },
                                    onChangeTab: function(t, n, e) {
                                        var o = lm.getValue(n);
                                        Er(t, Uv, {
                                            title: o,
                                            oldTitle: s.get()
                                        }), s.set(o)
                                    },
                                    tabs: l,
                                    components: [QH.parts().tabbar({
                                        dom: {
                                            tag: "div",
                                            classes: ["tox-dialog__body-nav"]
                                        },
                                        components: [XH.parts().tabs({})],
                                        markers: {
                                            tabClass: "tox-tab",
                                            selectedClass: "tox-dialog__body-nav-item--active"
                                        },
                                        tabbarBehaviours: Ru([nb.config({})])
                                    }), QH.parts().tabview({
                                        dom: {
                                            tag: "div",
                                            classes: ["tox-dialog__body-content"]
                                        }
                                    })],
                                    selectFirst: f.selectFirst,
                                    tabSectionBehaviours: Ru([_m("tabpanel", f.extraEvents), Xd.config({
                                        mode: "acyclic"
                                    }), Pl.config({
                                        find: function(t) {
                                            return X(QH.getViewItems(t))
                                        }
                                    }), lm.config({
                                        store: {
                                            mode: "manual",
                                            getValue: function(t) {
                                                return t.getSystem().broadcastOn([eE], {}), u.get()
                                            },
                                            setValue: function(t, n) {
                                                u.set(n), t.getSystem().broadcastOn([oE], {})
                                            }
                                        }
                                    })])
                                }))];
                            default:
                                return [(e = {
                                    items: t.body.items
                                }, o = d, n = Zm(Ux.sketch(function(n) {
                                    return {
                                        dom: {
                                            tag: "div",
                                            classes: ["tox-dialog__body-content"]
                                        },
                                        components: V(e.items, function(t) {
                                            return dS(n, t, o)
                                        })
                                    }
                                })), {
                                    dom: {
                                        tag: "div",
                                        classes: ["tox-dialog__body"]
                                    },
                                    components: [n.asSpec()],
                                    behaviours: Ru([Xd.config({
                                        mode: "acyclic",
                                        useTabstopAt: m(hw)
                                    }), Qx(n), iw(n, {
                                        postprocess: function(t) {
                                            return PH(t).fold(function(t) {
                                                return console.error(t), {}
                                            }, function(t) {
                                                return t
                                            })
                                        }
                                    })])
                                })]
                        }
                        var e, o, n, r, i, u, a, c, s, l, f
                    },
                    initialData: t
                })])
            }
        },
        iE = function(o, e) {
            var t = function(t, r) {
                    return qr(t, function(e, o) {
                        n(e, function(t, n) {
                            r(t, o.event(), e)
                        })
                    })
                },
                n = function(n, e) {
                    Mk.getState(n).get().each(function(t) {
                        e(t.internalDialog, n)
                    })
                };
            return [Qr(It(), gw), t(Nv, function(t) {
                return t.onSubmit(o())
            }), t(Fv, function(t, n) {
                t.onChange(o(), {
                    name: n.name()
                })
            }), t(Rv, function(t, n) {
                t.onAction(o(), {
                    name: n.name(),
                    value: n.value()
                })
            }), t(Uv, function(t, n) {
                t.onTabChange(o(), n.title())
            }), t(Iv, function(t) {
                e.onClose(), t.onClose()
            }), t(Lv, function(t, n, e) {
                t.onCancel(o()), Hr(e, Iv)
            }), oi(function(t) {
                var n = o();
                lm.setValue(t, n.getData())
            }), qr(jv, function(t, n) {
                return e.onUnblock()
            }), qr(Pv, function(t, n) {
                return e.onBlock(n.event())
            })]
        },
        uE = function(t, n) {
            var e = function(t, n) {
                    for (var e = [], o = [], r = 0, i = t.length; r < i; r++) {
                        var u = t[r];
                        (n(u, r, t) ? e : o).push(u)
                    }
                    return {
                        pass: e,
                        fail: o
                    }
                }(n.map(function(t) {
                    return t.footerButtons
                }).getOr([]), function(t) {
                    return "start" === t.align
                }),
                o = function(t, n) {
                    return Ev.sketch({
                        dom: {
                            tag: "div",
                            classes: ["tox-dialog__footer-" + t]
                        },
                        components: V(n, function(t) {
                            return t.memento.asSpec()
                        })
                    })
                };
            return [o("start", e.pass), o("end", e.fail)]
        },
        aE = function(t, i) {
            return {
                dom: mg('<div class="tox-dialog__footer"></div>'),
                components: [],
                behaviours: Ru([Mk.config({
                    channel: NH,
                    initialData: t,
                    updateState: function(t, n) {
                        var r = V(n.buttons, function(t) {
                            var n, e, o = Zm((e = i, gz(n = t, n.type, e)));
                            return {
                                name: t.name,
                                align: t.align,
                                memento: o
                            }
                        });
                        return tt.some({
                            lookupByName: function(t, n) {
                                return e = t, o = n, _(r, function(t) {
                                    return t.name === o
                                }).bind(function(t) {
                                    return t.memento.getOpt(e)
                                });
                                var e, o
                            },
                            footerButtons: r
                        })
                    },
                    renderComponents: uE
                })])
            }
        },
        cE = function(t) {
            return Qm.sketch({
                dom: {
                    tag: "button",
                    classes: ["tox-button", "tox-button--icon", "tox-button--naked"],
                    attributes: {
                        type: "button",
                        "aria-label": t.translate("Close"),
                        title: t.translate("Close")
                    }
                },
                components: [{
                    dom: {
                        tag: "div",
                        classes: ["tox-icon"],
                        innerHtml: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.953 7.453L13.422 12l4.531 4.547-1.406 1.406L12 13.422l-4.547 4.531-1.406-1.406L10.578 12 6.047 7.453l1.406-1.406L12 10.578l4.547-4.531z" fill-rule="evenodd"></path></svg>'
                    }
                }],
                action: function(t) {
                    Hr(t, Lv)
                }
            })
        },
        sE = function(t, n, e) {
            var o = function(t) {
                return [lu(e.translate(t.title))]
            };
            return {
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__title"],
                    attributes: Ke({}, n.map(function(t) {
                        return {
                            id: t
                        }
                    }).getOr({}))
                },
                components: o(t),
                behaviours: Ru([Mk.config({
                    channel: LH,
                    renderComponents: o
                })])
            }
        },
        lE = function(n, e) {
            if (n.getRoot().getSystem().isConnected()) {
                var o = Pl.getCurrent(n.getFormWrapper()).getOr(n.getFormWrapper());
                return Ux.getField(o, e).fold(function() {
                    var t = n.getFooter();
                    return Mk.getState(t).get().bind(function(t) {
                        return t.lookupByName(o, e)
                    })
                }, function(t) {
                    return tt.some(t)
                })
            }
            return tt.none()
        },
        fE = function(c, o) {
            var t = function(t) {
                    var n = c.getRoot();
                    n.getSystem().isConnected() && t(n)
                },
                s = {
                    getData: function() {
                        var t = c.getRoot(),
                            n = t.getSystem().isConnected() ? c.getFormWrapper() : t;
                        return lm.getValue(n)
                    },
                    setData: function(a) {
                        t(function(t) {
                            var n, e, o = s.getData(),
                                r = pt(o, a),
                                i = (n = r, e = c.getRoot(), Mk.getState(e).get().map(function(t) {
                                    return Xo(Go("data", t.dataValidator, n))
                                }).getOr(n)),
                                u = c.getFormWrapper();
                            lm.setValue(u, i)
                        })
                    },
                    disable: function(t) {
                        lE(c, t).each(Ph.disable)
                    },
                    enable: function(t) {
                        lE(c, t).each(Ph.enable)
                    },
                    focus: function(t) {
                        lE(c, t).each(gm.focus)
                    },
                    block: function(n) {
                        if (!x(n)) throw new Error("The dialogInstanceAPI.block function should be passed a blocking message of type string as an argument");
                        t(function(t) {
                            Er(t, Pv, {
                                message: n
                            })
                        })
                    },
                    unblock: function() {
                        t(function(t) {
                            Hr(t, jv)
                        })
                    },
                    showTab: function(e) {
                        t(function(t) {
                            var n = c.getBody();
                            Mk.getState(n).get().exists(function(t) {
                                return t.isTabPanel()
                            }) && Pl.getCurrent(n).each(function(t) {
                                QH.showTab(t, e)
                            })
                        })
                    },
                    redial: function(e) {
                        t(function(t) {
                            var n = o(e);
                            t.getSystem().broadcastOn([IH], n), t.getSystem().broadcastOn([LH], n.internalDialog), t.getSystem().broadcastOn([RH], n.internalDialog), t.getSystem().broadcastOn([NH], n.internalDialog), s.setData(n.initialData)
                        })
                    },
                    close: function() {
                        t(function(t) {
                            Hr(t, Iv)
                        })
                    }
                };
            return s
        },
        dE = function(t, n, e) {
            var o, r, i, u, a, c, s, l, f, d, m, h = (r = {
                    title: e.shared.providers.translate(t.internalDialog.title),
                    draggable: !0
                }, i = e.shared.providers, u = YM.parts().title(sE(r, tt.none(), i)), a = YM.parts().draghandle({
                    dom: mg('<div class="tox-dialog__draghandle"></div>')
                }), c = YM.parts().close(cE(i)), s = [u].concat(r.draggable ? [a] : []).concat([c]), Ev.sketch({
                    dom: mg('<div class="tox-dialog__header"></div>'),
                    components: s
                })),
                g = (l = {
                    body: t.internalDialog.body
                }, f = e, YM.parts().body(rE(l, f))),
                v = (d = {
                    buttons: t.internalDialog.buttons
                }, m = e.shared.providers, YM.parts().footer(aE(d, m))),
                p = iE(function() {
                    return x
                }, {
                    onClose: function() {
                        return n.closeWindow()
                    },
                    onBlock: function(e) {
                        YM.setBusy(y, function(t, n) {
                            return {
                                dom: {
                                    tag: "div",
                                    classes: ["tox-dialog__busy-spinner"],
                                    attributes: {
                                        "aria-label": e.message()
                                    },
                                    styles: {
                                        left: "0px",
                                        right: "0px",
                                        bottom: "0px",
                                        top: "0px",
                                        position: "absolute"
                                    }
                                },
                                behaviours: n,
                                components: [{
                                    dom: mg('<div class="tox-spinner"><div></div><div></div><div></div></div>')
                                }]
                            }
                        })
                    },
                    onUnblock: function() {
                        YM.setIdle(y)
                    }
                }),
                b = "normal" !== t.internalDialog.size ? "large" === t.internalDialog.size ? "tox-dialog--width-lg" : "tox-dialog--width-md" : [],
                y = mu(YM.sketch({
                    lazySink: e.shared.getSink,
                    onEscape: function(t) {
                        return Hr(t, Lv), tt.some(!0)
                    },
                    useTabstopAt: function(t) {
                        return !hw(t) && ("button" !== Se(t) || "disabled" !== Te(t, "disabled"))
                    },
                    modalBehaviours: Ru([Mk.config({
                        channel: IH,
                        updateState: function(t, n) {
                            return tt.some(n)
                        },
                        initialData: t
                    }), gm.config({}), _m("execute-on-form", p.concat([ni(It(), function(t, n) {
                        Xd.focusIn(t)
                    })])), cw({})]),
                    eventOrder: (o = {}, o[Cn()] = ["execute-on-form"], o[_n()] = ["reflecting", "execute-on-form"], o),
                    dom: {
                        tag: "div",
                        classes: ["tox-dialog"].concat(b),
                        styles: {
                            position: "relative"
                        }
                    },
                    components: [h, g, v],
                    dragBlockClass: "tox-dialog-wrap",
                    parts: {
                        blocker: {
                            dom: mg('<div class="tox-dialog-wrap"></div>'),
                            components: [{
                                dom: {
                                    tag: "div",
                                    classes: ["tox-dialog-wrap__backdrop"]
                                }
                            }]
                        }
                    }
                })),
                x = fE({
                    getRoot: function() {
                        return y
                    },
                    getBody: function() {
                        return YM.getBody(y)
                    },
                    getFooter: function() {
                        return YM.getFooter(y)
                    },
                    getFormWrapper: function() {
                        var t = YM.getBody(y);
                        return Pl.getCurrent(t).getOr(t)
                    }
                }, n.redial);
            return {
                dialog: y,
                instanceApi: x
            }
        },
        mE = function(t, n, e) {
            var o, r, i, u, a, c, s, l, f = Ye("dialog-label"),
                d = Zm((i = {
                    title: t.internalDialog.title,
                    draggable: !0
                }, u = f, a = e.shared.providers, Ev.sketch({
                    dom: mg('<div class="tox-dialog__header"></div>'),
                    components: [sE(i, tt.some(u), a), cE(a)],
                    containerBehaviours: Ru([xM.config({
                        mode: "mouse",
                        blockerClass: "blocker",
                        getTarget: function(t) {
                            return pu(t, '[role="dialog"]').getOrDie()
                        },
                        snaps: {
                            getSnapPoints: function() {
                                return []
                            },
                            leftAttr: "data-drag-left",
                            topAttr: "data-drag-top"
                        }
                    })])
                }))),
                m = Zm((c = {
                    body: t.internalDialog.body
                }, rE(c, e))),
                h = Zm((s = {
                    buttons: t.internalDialog.buttons
                }, l = e.shared.providers, aE(s, l))),
                g = iE(function() {
                    return p
                }, {
                    onBlock: function() {},
                    onUnblock: function() {},
                    onClose: function() {
                        return n.closeWindow()
                    }
                }),
                v = mu({
                    dom: {
                        tag: "div",
                        classes: ["tox-dialog"],
                        attributes: (o = {
                            role: "dialog"
                        }, o["aria-labelledby"] = f, o)
                    },
                    eventOrder: (r = {}, r[kn()] = [Mk.name(), Yu.name()], r[Cn()] = ["execute-on-form"], r[_n()] = ["reflecting", "execute-on-form"], r),
                    behaviours: Ru([Xd.config({
                        mode: "cyclic",
                        onEscape: function(t) {
                            return Hr(t, Iv), tt.some(!0)
                        },
                        useTabstopAt: function(t) {
                            return !hw(t) && ("button" !== Se(t) || "disabled" !== Te(t, "disabled"))
                        }
                    }), Mk.config({
                        channel: IH,
                        updateState: function(t, n) {
                            return tt.some(n)
                        },
                        initialData: t
                    }), _m("execute-on-form", g), cw({})]),
                    components: [d.asSpec(), m.asSpec(), h.asSpec()]
                }),
                p = fE({
                    getRoot: function() {
                        return v
                    },
                    getFooter: function() {
                        return h.get(v)
                    },
                    getBody: function() {
                        return m.get(v)
                    },
                    getFormWrapper: function() {
                        var t = m.get(v);
                        return Pl.getCurrent(t).getOr(t)
                    }
                }, n.redial);
            return {
                dialog: v,
                instanceApi: p
            }
        },
        hE = function(t, n) {
            return YM.parts().close(Qm.sketch({
                dom: {
                    tag: "button",
                    classes: ["tox-button", "tox-button--icon", "tox-button--naked"],
                    attributes: {
                        type: "button",
                        "aria-label": n.translate("Close")
                    }
                },
                action: t,
                buttonBehaviours: Ru([nb.config({})])
            }))
        },
        gE = function() {
            return YM.parts().title({
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__title"],
                    innerHtml: "",
                    styles: {
                        display: "none"
                    }
                }
            })
        },
        vE = function(t, n) {
            return YM.parts().body({
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__body", "todo-tox-fit"]
                },
                components: [{
                    dom: mg("<p>" + n.translate(t) + "</p>")
                }]
            })
        },
        pE = function(t) {
            return YM.parts().footer({
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__footer"]
                },
                components: t
            })
        },
        bE = function(t, n) {
            return [Ev.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__footer-start"]
                },
                components: t
            }), Ev.sketch({
                dom: {
                    tag: "div",
                    classes: ["tox-dialog__footer-end"]
                },
                components: n
            })]
        },
        yE = function(e) {
            return YM.sketch({
                lazySink: e.lazySink,
                onEscape: function() {
                    return e.onCancel(), tt.some(!0)
                },
                dom: {
                    tag: "div",
                    classes: ["tox-dialog"].concat(e.extraClasses)
                },
                components: [{
                    dom: {
                        tag: "div",
                        classes: ["tox-dialog__header"]
                    },
                    components: [e.partSpecs.title, e.partSpecs.close]
                }, e.partSpecs.body, e.partSpecs.footer],
                parts: {
                    blocker: {
                        dom: mg('<div class="tox-dialog-wrap"></div>'),
                        components: [{
                            dom: {
                                tag: "div",
                                classes: ["tox-dialog-wrap__backdrop"]
                            }
                        }]
                    }
                },
                modalBehaviours: Ru([_m("basic-dialog-events", [qr(Lv, function(t, n) {
                    e.onCancel()
                }), qr(Nv, function(t, n) {
                    e.onSubmit()
                })])])
            })
        },
        xE = function(c) {
            var u, a, e = (u = c.backstage.shared, {
                    open: function(t, n) {
                        var e = function() {
                                YM.hide(r), n()
                            },
                            o = Zm(gz({
                                name: "close-alert",
                                text: "OK",
                                primary: !0,
                                icon: tt.none()
                            }, "cancel", u.providers)),
                            r = mu(yE({
                                lazySink: function() {
                                    return u.getSink()
                                },
                                partSpecs: {
                                    title: gE(),
                                    close: hE(function() {
                                        e()
                                    }, u.providers),
                                    body: vE(t, u.providers),
                                    footer: pE(bE([], [o.asSpec()]))
                                },
                                onCancel: function() {
                                    return e()
                                },
                                onSubmit: Q,
                                extraClasses: ["tox-alert-dialog"]
                            }));
                        YM.show(r);
                        var i = o.get(r);
                        gm.focus(i)
                    }
                }),
                o = (a = c.backstage.shared, {
                    open: function(t, n) {
                        var e = function(t) {
                                YM.hide(i), n(t)
                            },
                            o = Zm(gz({
                                name: "yes",
                                text: "Yes",
                                primary: !0,
                                icon: tt.none()
                            }, "submit", a.providers)),
                            r = gz({
                                name: "no",
                                text: "No",
                                primary: !0,
                                icon: tt.none()
                            }, "cancel", a.providers),
                            i = mu(yE({
                                lazySink: function() {
                                    return a.getSink()
                                },
                                partSpecs: {
                                    title: gE(),
                                    close: hE(function() {
                                        e(!1)
                                    }, a.providers),
                                    body: vE(t, a.providers),
                                    footer: pE(bE([], [r, o.asSpec()]))
                                },
                                onCancel: function() {
                                    return e(!1)
                                },
                                onSubmit: function() {
                                    return e(!0)
                                },
                                extraClasses: ["tox-confirm-dialog"]
                            }));
                        YM.show(i);
                        var u = o.get(i);
                        gm.focus(u)
                    }
                }),
                r = function(t, i) {
                    return FH.open(function(t, n, e) {
                        var o = n,
                            r = dE({
                                dataValidator: e,
                                initialData: o,
                                internalDialog: t
                            }, {
                                redial: FH.redial,
                                closeWindow: function() {
                                    YM.hide(r.dialog), i(r.instanceApi)
                                }
                            }, c.backstage);
                        return YM.show(r.dialog), r.instanceApi.setData(o), r.instanceApi
                    }, t)
                },
                i = function(t, u, a) {
                    return FH.open(function(t, n, e) {
                        var o = Xo(Go("data", e, n)),
                            r = mE({
                                dataValidator: e,
                                initialData: o,
                                internalDialog: t
                            }, {
                                redial: FH.redial,
                                closeWindow: function() {
                                    Jm.hide(i), a(r.instanceApi)
                                }
                            }, c.backstage),
                            i = mu(Jm.sketch({
                                lazySink: c.backstage.shared.getSink,
                                dom: {
                                    tag: "div",
                                    classes: []
                                },
                                fireDismissalEventInstead: {},
                                inlineBehaviours: Ru([_m("window-manager-inline-events", [qr(In(), function(t, n) {
                                    Hr(r.dialog, Lv)
                                })])])
                            }));
                        return Jm.showAt(i, u, hu(r.dialog)), r.instanceApi.setData(o), Xd.focusIn(r.dialog), r.instanceApi
                    }, t)
                };
            return {
                open: function(t, n, e) {
                    return n !== undefined && "toolbar" === n.inline ? i(t, c.backstage.shared.anchors.toolbar(), e) : n !== undefined && "cursor" === n.inline ? i(t, c.backstage.shared.anchors.cursor(), e) : r(t, e)
                },
                alert: function(t, n) {
                    e.open(t, function() {
                        n()
                    })
                },
                close: function(t) {
                    t.close()
                },
                confirm: function(t, n) {
                    o.open(t, function(t) {
                        n(t)
                    })
                }
            }
        };
    qe.add("silver", function(t) {
            var n = TM(t),
                e = n.mothership,
                o = n.uiMothership,
                r = n.backstage,
                i = n.renderUI,
                u = n.getUi;
            jM(t, r), We(Ye("silver-demo"), e), We(Ye("silver-ui-demo"), o), ov(t, r.shared);
            var a = xE({
                backstage: r
            });
            return {
                renderUI: i,
                getWindowManagerImpl: Z(a),
                getNotificationManagerImpl: function() {
                    return ah(t, {
                        backstage: r
                    }, o)
                },
                ui: u()
            }
        }),
        function $E() {}
}();