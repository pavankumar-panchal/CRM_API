(function () {
  const u = document.createElement("link").relList;
  if (u && u.supports && u.supports("modulepreload")) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) c(d);
  new MutationObserver((d) => {
    for (const m of d)
      if (m.type === "childList")
        for (const p of m.addedNodes)
          p.tagName === "LINK" && p.rel === "modulepreload" && c(p);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(d) {
    const m = {};
    return (
      d.integrity && (m.integrity = d.integrity),
      d.referrerPolicy && (m.referrerPolicy = d.referrerPolicy),
      d.crossOrigin === "use-credentials"
        ? (m.credentials = "include")
        : d.crossOrigin === "anonymous"
        ? (m.credentials = "omit")
        : (m.credentials = "same-origin"),
      m
    );
  }
  function c(d) {
    if (d.ep) return;
    d.ep = !0;
    const m = o(d);
    fetch(d.href, m);
  }
})();
function mp(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default")
    ? s.default
    : s;
}
var ec = { exports: {} },
  Xn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Am;
function hp() {
  if (Am) return Xn;
  Am = 1;
  var s = Symbol.for("react.transitional.element"),
    u = Symbol.for("react.fragment");
  function o(c, d, m) {
    var p = null;
    if (
      (m !== void 0 && (p = "" + m),
      d.key !== void 0 && (p = "" + d.key),
      "key" in d)
    ) {
      m = {};
      for (var y in d) y !== "key" && (m[y] = d[y]);
    } else m = d;
    return (
      (d = m.ref),
      { $$typeof: s, type: c, key: p, ref: d !== void 0 ? d : null, props: m }
    );
  }
  return (Xn.Fragment = u), (Xn.jsx = o), (Xn.jsxs = o), Xn;
}
var Tm;
function xp() {
  return Tm || ((Tm = 1), (ec.exports = hp())), ec.exports;
}
var i = xp(),
  tc = { exports: {} },
  Qn = {},
  ac = { exports: {} },
  lc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rm;
function pp() {
  return (
    Rm ||
      ((Rm = 1),
      (function (s) {
        function u(w, V) {
          var $ = w.length;
          w.push(V);
          e: for (; 0 < $; ) {
            var ae = ($ - 1) >>> 1,
              N = w[ae];
            if (0 < d(N, V)) (w[ae] = V), (w[$] = N), ($ = ae);
            else break e;
          }
        }
        function o(w) {
          return w.length === 0 ? null : w[0];
        }
        function c(w) {
          if (w.length === 0) return null;
          var V = w[0],
            $ = w.pop();
          if ($ !== V) {
            w[0] = $;
            e: for (var ae = 0, N = w.length, Z = N >>> 1; ae < Z; ) {
              var D = 2 * (ae + 1) - 1,
                K = w[D],
                P = D + 1,
                oe = w[P];
              if (0 > d(K, $))
                P < N && 0 > d(oe, K)
                  ? ((w[ae] = oe), (w[P] = $), (ae = P))
                  : ((w[ae] = K), (w[D] = $), (ae = D));
              else if (P < N && 0 > d(oe, $))
                (w[ae] = oe), (w[P] = $), (ae = P);
              else break e;
            }
          }
          return V;
        }
        function d(w, V) {
          var $ = w.sortIndex - V.sortIndex;
          return $ !== 0 ? $ : w.id - V.id;
        }
        if (
          ((s.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var m = performance;
          s.unstable_now = function () {
            return m.now();
          };
        } else {
          var p = Date,
            y = p.now();
          s.unstable_now = function () {
            return p.now() - y;
          };
        }
        var g = [],
          h = [],
          b = 1,
          T = null,
          E = 3,
          k = !1,
          j = !1,
          R = !1,
          C = !1,
          q = typeof setTimeout == "function" ? setTimeout : null,
          X = typeof clearTimeout == "function" ? clearTimeout : null,
          M = typeof setImmediate < "u" ? setImmediate : null;
        function J(w) {
          for (var V = o(h); V !== null; ) {
            if (V.callback === null) c(h);
            else if (V.startTime <= w)
              c(h), (V.sortIndex = V.expirationTime), u(g, V);
            else break;
            V = o(h);
          }
        }
        function U(w) {
          if (((R = !1), J(w), !j))
            if (o(g) !== null) (j = !0), F || ((F = !0), ve());
            else {
              var V = o(h);
              V !== null && xe(U, V.startTime - w);
            }
        }
        var F = !1,
          ee = -1,
          ie = 5,
          ue = -1;
        function ye() {
          return C ? !0 : !(s.unstable_now() - ue < ie);
        }
        function Me() {
          if (((C = !1), F)) {
            var w = s.unstable_now();
            ue = w;
            var V = !0;
            try {
              e: {
                (j = !1), R && ((R = !1), X(ee), (ee = -1)), (k = !0);
                var $ = E;
                try {
                  t: {
                    for (
                      J(w), T = o(g);
                      T !== null && !(T.expirationTime > w && ye());

                    ) {
                      var ae = T.callback;
                      if (typeof ae == "function") {
                        (T.callback = null), (E = T.priorityLevel);
                        var N = ae(T.expirationTime <= w);
                        if (((w = s.unstable_now()), typeof N == "function")) {
                          (T.callback = N), J(w), (V = !0);
                          break t;
                        }
                        T === o(g) && c(g), J(w);
                      } else c(g);
                      T = o(g);
                    }
                    if (T !== null) V = !0;
                    else {
                      var Z = o(h);
                      Z !== null && xe(U, Z.startTime - w), (V = !1);
                    }
                  }
                  break e;
                } finally {
                  (T = null), (E = $), (k = !1);
                }
                V = void 0;
              }
            } finally {
              V ? ve() : (F = !1);
            }
          }
        }
        var ve;
        if (typeof M == "function")
          ve = function () {
            M(Me);
          };
        else if (typeof MessageChannel < "u") {
          var W = new MessageChannel(),
            ce = W.port2;
          (W.port1.onmessage = Me),
            (ve = function () {
              ce.postMessage(null);
            });
        } else
          ve = function () {
            q(Me, 0);
          };
        function xe(w, V) {
          ee = q(function () {
            w(s.unstable_now());
          }, V);
        }
        (s.unstable_IdlePriority = 5),
          (s.unstable_ImmediatePriority = 1),
          (s.unstable_LowPriority = 4),
          (s.unstable_NormalPriority = 3),
          (s.unstable_Profiling = null),
          (s.unstable_UserBlockingPriority = 2),
          (s.unstable_cancelCallback = function (w) {
            w.callback = null;
          }),
          (s.unstable_forceFrameRate = function (w) {
            0 > w || 125 < w
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (ie = 0 < w ? Math.floor(1e3 / w) : 5);
          }),
          (s.unstable_getCurrentPriorityLevel = function () {
            return E;
          }),
          (s.unstable_next = function (w) {
            switch (E) {
              case 1:
              case 2:
              case 3:
                var V = 3;
                break;
              default:
                V = E;
            }
            var $ = E;
            E = V;
            try {
              return w();
            } finally {
              E = $;
            }
          }),
          (s.unstable_requestPaint = function () {
            C = !0;
          }),
          (s.unstable_runWithPriority = function (w, V) {
            switch (w) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                w = 3;
            }
            var $ = E;
            E = w;
            try {
              return V();
            } finally {
              E = $;
            }
          }),
          (s.unstable_scheduleCallback = function (w, V, $) {
            var ae = s.unstable_now();
            switch (
              (typeof $ == "object" && $ !== null
                ? (($ = $.delay),
                  ($ = typeof $ == "number" && 0 < $ ? ae + $ : ae))
                : ($ = ae),
              w)
            ) {
              case 1:
                var N = -1;
                break;
              case 2:
                N = 250;
                break;
              case 5:
                N = 1073741823;
                break;
              case 4:
                N = 1e4;
                break;
              default:
                N = 5e3;
            }
            return (
              (N = $ + N),
              (w = {
                id: b++,
                callback: V,
                priorityLevel: w,
                startTime: $,
                expirationTime: N,
                sortIndex: -1,
              }),
              $ > ae
                ? ((w.sortIndex = $),
                  u(h, w),
                  o(g) === null &&
                    w === o(h) &&
                    (R ? (X(ee), (ee = -1)) : (R = !0), xe(U, $ - ae)))
                : ((w.sortIndex = N),
                  u(g, w),
                  j || k || ((j = !0), F || ((F = !0), ve()))),
              w
            );
          }),
          (s.unstable_shouldYield = ye),
          (s.unstable_wrapCallback = function (w) {
            var V = E;
            return function () {
              var $ = E;
              E = V;
              try {
                return w.apply(this, arguments);
              } finally {
                E = $;
              }
            };
          });
      })(lc)),
    lc
  );
}
var Cm;
function gp() {
  return Cm || ((Cm = 1), (ac.exports = pp())), ac.exports;
}
var nc = { exports: {} },
  fe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Om;
function yp() {
  if (Om) return fe;
  Om = 1;
  var s = Symbol.for("react.transitional.element"),
    u = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    c = Symbol.for("react.strict_mode"),
    d = Symbol.for("react.profiler"),
    m = Symbol.for("react.consumer"),
    p = Symbol.for("react.context"),
    y = Symbol.for("react.forward_ref"),
    g = Symbol.for("react.suspense"),
    h = Symbol.for("react.memo"),
    b = Symbol.for("react.lazy"),
    T = Symbol.iterator;
  function E(N) {
    return N === null || typeof N != "object"
      ? null
      : ((N = (T && N[T]) || N["@@iterator"]),
        typeof N == "function" ? N : null);
  }
  var k = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    j = Object.assign,
    R = {};
  function C(N, Z, D) {
    (this.props = N),
      (this.context = Z),
      (this.refs = R),
      (this.updater = D || k);
  }
  (C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (N, Z) {
      if (typeof N != "object" && typeof N != "function" && N != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, N, Z, "setState");
    }),
    (C.prototype.forceUpdate = function (N) {
      this.updater.enqueueForceUpdate(this, N, "forceUpdate");
    });
  function q() {}
  q.prototype = C.prototype;
  function X(N, Z, D) {
    (this.props = N),
      (this.context = Z),
      (this.refs = R),
      (this.updater = D || k);
  }
  var M = (X.prototype = new q());
  (M.constructor = X), j(M, C.prototype), (M.isPureReactComponent = !0);
  var J = Array.isArray,
    U = { H: null, A: null, T: null, S: null, V: null },
    F = Object.prototype.hasOwnProperty;
  function ee(N, Z, D, K, P, oe) {
    return (
      (D = oe.ref),
      { $$typeof: s, type: N, key: Z, ref: D !== void 0 ? D : null, props: oe }
    );
  }
  function ie(N, Z) {
    return ee(N.type, Z, void 0, void 0, void 0, N.props);
  }
  function ue(N) {
    return typeof N == "object" && N !== null && N.$$typeof === s;
  }
  function ye(N) {
    var Z = { "=": "=0", ":": "=2" };
    return (
      "$" +
      N.replace(/[=:]/g, function (D) {
        return Z[D];
      })
    );
  }
  var Me = /\/+/g;
  function ve(N, Z) {
    return typeof N == "object" && N !== null && N.key != null
      ? ye("" + N.key)
      : Z.toString(36);
  }
  function W() {}
  function ce(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (
          (typeof N.status == "string"
            ? N.then(W, W)
            : ((N.status = "pending"),
              N.then(
                function (Z) {
                  N.status === "pending" &&
                    ((N.status = "fulfilled"), (N.value = Z));
                },
                function (Z) {
                  N.status === "pending" &&
                    ((N.status = "rejected"), (N.reason = Z));
                }
              )),
          N.status)
        ) {
          case "fulfilled":
            return N.value;
          case "rejected":
            throw N.reason;
        }
    }
    throw N;
  }
  function xe(N, Z, D, K, P) {
    var oe = typeof N;
    (oe === "undefined" || oe === "boolean") && (N = null);
    var le = !1;
    if (N === null) le = !0;
    else
      switch (oe) {
        case "bigint":
        case "string":
        case "number":
          le = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case s:
            case u:
              le = !0;
              break;
            case b:
              return (le = N._init), xe(le(N._payload), Z, D, K, P);
          }
      }
    if (le)
      return (
        (P = P(N)),
        (le = K === "" ? "." + ve(N, 0) : K),
        J(P)
          ? ((D = ""),
            le != null && (D = le.replace(Me, "$&/") + "/"),
            xe(P, Z, D, "", function (ia) {
              return ia;
            }))
          : P != null &&
            (ue(P) &&
              (P = ie(
                P,
                D +
                  (P.key == null || (N && N.key === P.key)
                    ? ""
                    : ("" + P.key).replace(Me, "$&/") + "/") +
                  le
              )),
            Z.push(P)),
        1
      );
    le = 0;
    var Be = K === "" ? "." : K + ":";
    if (J(N))
      for (var Se = 0; Se < N.length; Se++)
        (K = N[Se]), (oe = Be + ve(K, Se)), (le += xe(K, Z, D, oe, P));
    else if (((Se = E(N)), typeof Se == "function"))
      for (N = Se.call(N), Se = 0; !(K = N.next()).done; )
        (K = K.value), (oe = Be + ve(K, Se++)), (le += xe(K, Z, D, oe, P));
    else if (oe === "object") {
      if (typeof N.then == "function") return xe(ce(N), Z, D, K, P);
      throw (
        ((Z = String(N)),
        Error(
          "Objects are not valid as a React child (found: " +
            (Z === "[object Object]"
              ? "object with keys {" + Object.keys(N).join(", ") + "}"
              : Z) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return le;
  }
  function w(N, Z, D) {
    if (N == null) return N;
    var K = [],
      P = 0;
    return (
      xe(N, K, "", "", function (oe) {
        return Z.call(D, oe, P++);
      }),
      K
    );
  }
  function V(N) {
    if (N._status === -1) {
      var Z = N._result;
      (Z = Z()),
        Z.then(
          function (D) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 1), (N._result = D));
          },
          function (D) {
            (N._status === 0 || N._status === -1) &&
              ((N._status = 2), (N._result = D));
          }
        ),
        N._status === -1 && ((N._status = 0), (N._result = Z));
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var $ =
    typeof reportError == "function"
      ? reportError
      : function (N) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var Z = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof N == "object" &&
                N !== null &&
                typeof N.message == "string"
                  ? String(N.message)
                  : String(N),
              error: N,
            });
            if (!window.dispatchEvent(Z)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", N);
            return;
          }
          console.error(N);
        };
  function ae() {}
  return (
    (fe.Children = {
      map: w,
      forEach: function (N, Z, D) {
        w(
          N,
          function () {
            Z.apply(this, arguments);
          },
          D
        );
      },
      count: function (N) {
        var Z = 0;
        return (
          w(N, function () {
            Z++;
          }),
          Z
        );
      },
      toArray: function (N) {
        return (
          w(N, function (Z) {
            return Z;
          }) || []
        );
      },
      only: function (N) {
        if (!ue(N))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return N;
      },
    }),
    (fe.Component = C),
    (fe.Fragment = o),
    (fe.Profiler = d),
    (fe.PureComponent = X),
    (fe.StrictMode = c),
    (fe.Suspense = g),
    (fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = U),
    (fe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (N) {
        return U.H.useMemoCache(N);
      },
    }),
    (fe.cache = function (N) {
      return function () {
        return N.apply(null, arguments);
      };
    }),
    (fe.cloneElement = function (N, Z, D) {
      if (N == null)
        throw Error(
          "The argument must be a React element, but you passed " + N + "."
        );
      var K = j({}, N.props),
        P = N.key,
        oe = void 0;
      if (Z != null)
        for (le in (Z.ref !== void 0 && (oe = void 0),
        Z.key !== void 0 && (P = "" + Z.key),
        Z))
          !F.call(Z, le) ||
            le === "key" ||
            le === "__self" ||
            le === "__source" ||
            (le === "ref" && Z.ref === void 0) ||
            (K[le] = Z[le]);
      var le = arguments.length - 2;
      if (le === 1) K.children = D;
      else if (1 < le) {
        for (var Be = Array(le), Se = 0; Se < le; Se++)
          Be[Se] = arguments[Se + 2];
        K.children = Be;
      }
      return ee(N.type, P, void 0, void 0, oe, K);
    }),
    (fe.createContext = function (N) {
      return (
        (N = {
          $$typeof: p,
          _currentValue: N,
          _currentValue2: N,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (N.Provider = N),
        (N.Consumer = { $$typeof: m, _context: N }),
        N
      );
    }),
    (fe.createElement = function (N, Z, D) {
      var K,
        P = {},
        oe = null;
      if (Z != null)
        for (K in (Z.key !== void 0 && (oe = "" + Z.key), Z))
          F.call(Z, K) &&
            K !== "key" &&
            K !== "__self" &&
            K !== "__source" &&
            (P[K] = Z[K]);
      var le = arguments.length - 2;
      if (le === 1) P.children = D;
      else if (1 < le) {
        for (var Be = Array(le), Se = 0; Se < le; Se++)
          Be[Se] = arguments[Se + 2];
        P.children = Be;
      }
      if (N && N.defaultProps)
        for (K in ((le = N.defaultProps), le))
          P[K] === void 0 && (P[K] = le[K]);
      return ee(N, oe, void 0, void 0, null, P);
    }),
    (fe.createRef = function () {
      return { current: null };
    }),
    (fe.forwardRef = function (N) {
      return { $$typeof: y, render: N };
    }),
    (fe.isValidElement = ue),
    (fe.lazy = function (N) {
      return { $$typeof: b, _payload: { _status: -1, _result: N }, _init: V };
    }),
    (fe.memo = function (N, Z) {
      return { $$typeof: h, type: N, compare: Z === void 0 ? null : Z };
    }),
    (fe.startTransition = function (N) {
      var Z = U.T,
        D = {};
      U.T = D;
      try {
        var K = N(),
          P = U.S;
        P !== null && P(D, K),
          typeof K == "object" &&
            K !== null &&
            typeof K.then == "function" &&
            K.then(ae, $);
      } catch (oe) {
        $(oe);
      } finally {
        U.T = Z;
      }
    }),
    (fe.unstable_useCacheRefresh = function () {
      return U.H.useCacheRefresh();
    }),
    (fe.use = function (N) {
      return U.H.use(N);
    }),
    (fe.useActionState = function (N, Z, D) {
      return U.H.useActionState(N, Z, D);
    }),
    (fe.useCallback = function (N, Z) {
      return U.H.useCallback(N, Z);
    }),
    (fe.useContext = function (N) {
      return U.H.useContext(N);
    }),
    (fe.useDebugValue = function () {}),
    (fe.useDeferredValue = function (N, Z) {
      return U.H.useDeferredValue(N, Z);
    }),
    (fe.useEffect = function (N, Z, D) {
      var K = U.H;
      if (typeof D == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React."
        );
      return K.useEffect(N, Z);
    }),
    (fe.useId = function () {
      return U.H.useId();
    }),
    (fe.useImperativeHandle = function (N, Z, D) {
      return U.H.useImperativeHandle(N, Z, D);
    }),
    (fe.useInsertionEffect = function (N, Z) {
      return U.H.useInsertionEffect(N, Z);
    }),
    (fe.useLayoutEffect = function (N, Z) {
      return U.H.useLayoutEffect(N, Z);
    }),
    (fe.useMemo = function (N, Z) {
      return U.H.useMemo(N, Z);
    }),
    (fe.useOptimistic = function (N, Z) {
      return U.H.useOptimistic(N, Z);
    }),
    (fe.useReducer = function (N, Z, D) {
      return U.H.useReducer(N, Z, D);
    }),
    (fe.useRef = function (N) {
      return U.H.useRef(N);
    }),
    (fe.useState = function (N) {
      return U.H.useState(N);
    }),
    (fe.useSyncExternalStore = function (N, Z, D) {
      return U.H.useSyncExternalStore(N, Z, D);
    }),
    (fe.useTransition = function () {
      return U.H.useTransition();
    }),
    (fe.version = "19.1.1"),
    fe
  );
}
var Mm;
function Nc() {
  return Mm || ((Mm = 1), (nc.exports = yp())), nc.exports;
}
var sc = { exports: {} },
  et = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dm;
function bp() {
  if (Dm) return et;
  Dm = 1;
  var s = Nc();
  function u(g) {
    var h = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        h += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return (
      "Minified React error #" +
      g +
      "; visit " +
      h +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o() {}
  var c = {
      d: {
        f: o,
        r: function () {
          throw Error(u(522));
        },
        D: o,
        C: o,
        L: o,
        m: o,
        X: o,
        S: o,
        M: o,
      },
      p: 0,
      findDOMNode: null,
    },
    d = Symbol.for("react.portal");
  function m(g, h, b) {
    var T =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: T == null ? null : "" + T,
      children: g,
      containerInfo: h,
      implementation: b,
    };
  }
  var p = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function y(g, h) {
    if (g === "font") return "";
    if (typeof h == "string") return h === "use-credentials" ? h : "";
  }
  return (
    (et.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c),
    (et.createPortal = function (g, h) {
      var b =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || (h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11))
        throw Error(u(299));
      return m(g, h, null, b);
    }),
    (et.flushSync = function (g) {
      var h = p.T,
        b = c.p;
      try {
        if (((p.T = null), (c.p = 2), g)) return g();
      } finally {
        (p.T = h), (c.p = b), c.d.f();
      }
    }),
    (et.preconnect = function (g, h) {
      typeof g == "string" &&
        (h
          ? ((h = h.crossOrigin),
            (h =
              typeof h == "string"
                ? h === "use-credentials"
                  ? h
                  : ""
                : void 0))
          : (h = null),
        c.d.C(g, h));
    }),
    (et.prefetchDNS = function (g) {
      typeof g == "string" && c.d.D(g);
    }),
    (et.preinit = function (g, h) {
      if (typeof g == "string" && h && typeof h.as == "string") {
        var b = h.as,
          T = y(b, h.crossOrigin),
          E = typeof h.integrity == "string" ? h.integrity : void 0,
          k = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
        b === "style"
          ? c.d.S(g, typeof h.precedence == "string" ? h.precedence : void 0, {
              crossOrigin: T,
              integrity: E,
              fetchPriority: k,
            })
          : b === "script" &&
            c.d.X(g, {
              crossOrigin: T,
              integrity: E,
              fetchPriority: k,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
      }
    }),
    (et.preinitModule = function (g, h) {
      if (typeof g == "string")
        if (typeof h == "object" && h !== null) {
          if (h.as == null || h.as === "script") {
            var b = y(h.as, h.crossOrigin);
            c.d.M(g, {
              crossOrigin: b,
              integrity: typeof h.integrity == "string" ? h.integrity : void 0,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
          }
        } else h == null && c.d.M(g);
    }),
    (et.preload = function (g, h) {
      if (
        typeof g == "string" &&
        typeof h == "object" &&
        h !== null &&
        typeof h.as == "string"
      ) {
        var b = h.as,
          T = y(b, h.crossOrigin);
        c.d.L(g, b, {
          crossOrigin: T,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          type: typeof h.type == "string" ? h.type : void 0,
          fetchPriority:
            typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
          referrerPolicy:
            typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
          imageSrcSet:
            typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
          media: typeof h.media == "string" ? h.media : void 0,
        });
      }
    }),
    (et.preloadModule = function (g, h) {
      if (typeof g == "string")
        if (h) {
          var b = y(h.as, h.crossOrigin);
          c.d.m(g, {
            as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
            crossOrigin: b,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          });
        } else c.d.m(g);
    }),
    (et.requestFormReset = function (g) {
      c.d.r(g);
    }),
    (et.unstable_batchedUpdates = function (g, h) {
      return g(h);
    }),
    (et.useFormState = function (g, h, b) {
      return p.H.useFormState(g, h, b);
    }),
    (et.useFormStatus = function () {
      return p.H.useHostTransitionStatus();
    }),
    (et.version = "19.1.1"),
    et
  );
}
var zm;
function vp() {
  if (zm) return sc.exports;
  zm = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (u) {
        console.error(u);
      }
  }
  return s(), (sc.exports = bp()), sc.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var km;
function jp() {
  if (km) return Qn;
  km = 1;
  var s = gp(),
    u = Nc(),
    o = vp();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function d(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function m(e) {
    var t = e,
      a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (a = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function p(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (m(e) !== e) throw Error(c(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = m(e)), t === null)) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var a = e, l = t; ; ) {
      var n = a.return;
      if (n === null) break;
      var r = n.alternate;
      if (r === null) {
        if (((l = n.return), l !== null)) {
          a = l;
          continue;
        }
        break;
      }
      if (n.child === r.child) {
        for (r = n.child; r; ) {
          if (r === a) return y(n), e;
          if (r === l) return y(n), t;
          r = r.sibling;
        }
        throw Error(c(188));
      }
      if (a.return !== l.return) (a = n), (l = r);
      else {
        for (var f = !1, x = n.child; x; ) {
          if (x === a) {
            (f = !0), (a = n), (l = r);
            break;
          }
          if (x === l) {
            (f = !0), (l = n), (a = r);
            break;
          }
          x = x.sibling;
        }
        if (!f) {
          for (x = r.child; x; ) {
            if (x === a) {
              (f = !0), (a = r), (l = n);
              break;
            }
            if (x === l) {
              (f = !0), (l = r), (a = n);
              break;
            }
            x = x.sibling;
          }
          if (!f) throw Error(c(189));
        }
      }
      if (a.alternate !== l) throw Error(c(190));
    }
    if (a.tag !== 3) throw Error(c(188));
    return a.stateNode.current === a ? e : t;
  }
  function h(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = h(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign,
    T = Symbol.for("react.element"),
    E = Symbol.for("react.transitional.element"),
    k = Symbol.for("react.portal"),
    j = Symbol.for("react.fragment"),
    R = Symbol.for("react.strict_mode"),
    C = Symbol.for("react.profiler"),
    q = Symbol.for("react.provider"),
    X = Symbol.for("react.consumer"),
    M = Symbol.for("react.context"),
    J = Symbol.for("react.forward_ref"),
    U = Symbol.for("react.suspense"),
    F = Symbol.for("react.suspense_list"),
    ee = Symbol.for("react.memo"),
    ie = Symbol.for("react.lazy"),
    ue = Symbol.for("react.activity"),
    ye = Symbol.for("react.memo_cache_sentinel"),
    Me = Symbol.iterator;
  function ve(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Me && e[Me]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var W = Symbol.for("react.client.reference");
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === W ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case j:
        return "Fragment";
      case C:
        return "Profiler";
      case R:
        return "StrictMode";
      case U:
        return "Suspense";
      case F:
        return "SuspenseList";
      case ue:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case k:
          return "Portal";
        case M:
          return (e.displayName || "Context") + ".Provider";
        case X:
          return (e._context.displayName || "Context") + ".Consumer";
        case J:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case ee:
          return (
            (t = e.displayName || null), t !== null ? t : ce(e.type) || "Memo"
          );
        case ie:
          (t = e._payload), (e = e._init);
          try {
            return ce(e(t));
          } catch {}
      }
    return null;
  }
  var xe = Array.isArray,
    w = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    V = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = { pending: !1, data: null, method: null, action: null },
    ae = [],
    N = -1;
  function Z(e) {
    return { current: e };
  }
  function D(e) {
    0 > N || ((e.current = ae[N]), (ae[N] = null), N--);
  }
  function K(e, t) {
    N++, (ae[N] = e.current), (e.current = t);
  }
  var P = Z(null),
    oe = Z(null),
    le = Z(null),
    Be = Z(null);
  function Se(e, t) {
    switch ((K(le, t), K(oe, e), K(P, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? tm(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          (t = tm(t)), (e = am(t, e));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    D(P), K(P, e);
  }
  function ia() {
    D(P), D(oe), D(le);
  }
  function Hi(e) {
    e.memoizedState !== null && K(Be, e);
    var t = P.current,
      a = am(t, e.type);
    t !== a && (K(oe, e), K(P, a));
  }
  function ts(e) {
    oe.current === e && (D(P), D(oe)),
      Be.current === e && (D(Be), (Hn._currentValue = $));
  }
  var qi = Object.prototype.hasOwnProperty,
    Yi = s.unstable_scheduleCallback,
    Vi = s.unstable_cancelCallback,
    Qh = s.unstable_shouldYield,
    Zh = s.unstable_requestPaint,
    zt = s.unstable_now,
    Kh = s.unstable_getCurrentPriorityLevel,
    Dc = s.unstable_ImmediatePriority,
    zc = s.unstable_UserBlockingPriority,
    as = s.unstable_NormalPriority,
    Jh = s.unstable_LowPriority,
    kc = s.unstable_IdlePriority,
    $h = s.log,
    Fh = s.unstable_setDisableYieldValue,
    Zl = null,
    ot = null;
  function ra(e) {
    if (
      (typeof $h == "function" && Fh(e),
      ot && typeof ot.setStrictMode == "function")
    )
      try {
        ot.setStrictMode(Zl, e);
      } catch {}
  }
  var dt = Math.clz32 ? Math.clz32 : Ih,
    Ph = Math.log,
    Wh = Math.LN2;
  function Ih(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Ph(e) / Wh) | 0)) | 0;
  }
  var ls = 256,
    ns = 4194304;
  function Da(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ss(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var n = 0,
      r = e.suspendedLanes,
      f = e.pingedLanes;
    e = e.warmLanes;
    var x = l & 134217727;
    return (
      x !== 0
        ? ((l = x & ~r),
          l !== 0
            ? (n = Da(l))
            : ((f &= x),
              f !== 0
                ? (n = Da(f))
                : a || ((a = x & ~e), a !== 0 && (n = Da(a)))))
        : ((x = l & ~r),
          x !== 0
            ? (n = Da(x))
            : f !== 0
            ? (n = Da(f))
            : a || ((a = l & ~e), a !== 0 && (n = Da(a)))),
      n === 0
        ? 0
        : t !== 0 &&
          t !== n &&
          (t & r) === 0 &&
          ((r = n & -n),
          (a = t & -t),
          r >= a || (r === 32 && (a & 4194048) !== 0))
        ? t
        : n
    );
  }
  function Kl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function e0(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Uc() {
    var e = ls;
    return (ls <<= 1), (ls & 4194048) === 0 && (ls = 256), e;
  }
  function Lc() {
    var e = ns;
    return (ns <<= 1), (ns & 62914560) === 0 && (ns = 4194304), e;
  }
  function Gi(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Jl(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function t0(e, t, a, l, n, r) {
    var f = e.pendingLanes;
    (e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0);
    var x = e.entanglements,
      v = e.expirationTimes,
      z = e.hiddenUpdates;
    for (a = f & ~a; 0 < a; ) {
      var Y = 31 - dt(a),
        Q = 1 << Y;
      (x[Y] = 0), (v[Y] = -1);
      var L = z[Y];
      if (L !== null)
        for (z[Y] = null, Y = 0; Y < L.length; Y++) {
          var B = L[Y];
          B !== null && (B.lane &= -536870913);
        }
      a &= ~Q;
    }
    l !== 0 && Bc(e, l, 0),
      r !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(f & ~t));
  }
  function Bc(e, t, a) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var l = 31 - dt(t);
    (e.entangledLanes |= t),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (a & 4194090));
  }
  function Hc(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var l = 31 - dt(a),
        n = 1 << l;
      (n & t) | (e[l] & t) && (e[l] |= t), (a &= ~n);
    }
  }
  function Xi(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Qi(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function qc() {
    var e = V.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : jm(e.type));
  }
  function a0(e, t) {
    var a = V.p;
    try {
      return (V.p = e), t();
    } finally {
      V.p = a;
    }
  }
  var ua = Math.random().toString(36).slice(2),
    We = "__reactFiber$" + ua,
    lt = "__reactProps$" + ua,
    tl = "__reactContainer$" + ua,
    Zi = "__reactEvents$" + ua,
    l0 = "__reactListeners$" + ua,
    n0 = "__reactHandles$" + ua,
    Yc = "__reactResources$" + ua,
    $l = "__reactMarker$" + ua;
  function Ki(e) {
    delete e[We], delete e[lt], delete e[Zi], delete e[l0], delete e[n0];
  }
  function al(e) {
    var t = e[We];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[tl] || a[We])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (e = im(e); e !== null; ) {
            if ((a = e[We])) return a;
            e = im(e);
          }
        return t;
      }
      (e = a), (a = e.parentNode);
    }
    return null;
  }
  function ll(e) {
    if ((e = e[We] || e[tl])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Fl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function nl(e) {
    var t = e[Yc];
    return (
      t ||
        (t = e[Yc] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Qe(e) {
    e[$l] = !0;
  }
  var Vc = new Set(),
    Gc = {};
  function za(e, t) {
    sl(e, t), sl(e + "Capture", t);
  }
  function sl(e, t) {
    for (Gc[e] = t, e = 0; e < t.length; e++) Vc.add(t[e]);
  }
  var s0 = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Xc = {},
    Qc = {};
  function i0(e) {
    return qi.call(Qc, e)
      ? !0
      : qi.call(Xc, e)
      ? !1
      : s0.test(e)
      ? (Qc[e] = !0)
      : ((Xc[e] = !0), !1);
  }
  function is(e, t, a) {
    if (i0(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function rs(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function Vt(e, t, a, l) {
    if (l === null) e.removeAttribute(a);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + l);
    }
  }
  var Ji, Zc;
  function il(e) {
    if (Ji === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        (Ji = (t && t[1]) || ""),
          (Zc =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      Ji +
      e +
      Zc
    );
  }
  var $i = !1;
  function Fi(e, t) {
    if (!e || $i) return "";
    $i = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Q = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Q.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Q, []);
                } catch (B) {
                  var L = B;
                }
                Reflect.construct(e, [], Q);
              } else {
                try {
                  Q.call();
                } catch (B) {
                  L = B;
                }
                e.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                L = B;
              }
              (Q = e()) &&
                typeof Q.catch == "function" &&
                Q.catch(function () {});
            }
          } catch (B) {
            if (B && L && typeof B.stack == "string") return [B.stack, L.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      n &&
        n.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var r = l.DetermineComponentFrameRoot(),
        f = r[0],
        x = r[1];
      if (f && x) {
        var v = f.split(`
`),
          z = x.split(`
`);
        for (
          n = l = 0;
          l < v.length && !v[l].includes("DetermineComponentFrameRoot");

        )
          l++;
        for (; n < z.length && !z[n].includes("DetermineComponentFrameRoot"); )
          n++;
        if (l === v.length || n === z.length)
          for (
            l = v.length - 1, n = z.length - 1;
            1 <= l && 0 <= n && v[l] !== z[n];

          )
            n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (v[l] !== z[n]) {
            if (l !== 1 || n !== 1)
              do
                if ((l--, n--, 0 > n || v[l] !== z[n])) {
                  var Y =
                    `
` + v[l].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      Y.includes("<anonymous>") &&
                      (Y = Y.replace("<anonymous>", e.displayName)),
                    Y
                  );
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      ($i = !1), (Error.prepareStackTrace = a);
    }
    return (a = e ? e.displayName || e.name : "") ? il(a) : "";
  }
  function r0(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return il(e.type);
      case 16:
        return il("Lazy");
      case 13:
        return il("Suspense");
      case 19:
        return il("SuspenseList");
      case 0:
      case 15:
        return Fi(e.type, !1);
      case 11:
        return Fi(e.type.render, !1);
      case 1:
        return Fi(e.type, !0);
      case 31:
        return il("Activity");
      default:
        return "";
    }
  }
  function Kc(e) {
    try {
      var t = "";
      do (t += r0(e)), (e = e.return);
      while (e);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  function bt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Jc(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function u0(e) {
    var t = Jc(e) ? "checked" : "value",
      a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      l = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var n = a.get,
        r = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (f) {
            (l = "" + f), r.call(this, f);
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (f) {
            l = "" + f;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function us(e) {
    e._valueTracker || (e._valueTracker = u0(e));
  }
  function $c(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      l = "";
    return (
      e && (l = Jc(e) ? (e.checked ? "true" : "false") : e.value),
      (e = l),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function cs(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var c0 = /[\n"\\]/g;
  function vt(e) {
    return e.replace(c0, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Pi(e, t, a, l, n, r, f, x) {
    (e.name = ""),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (e.type = f)
        : e.removeAttribute("type"),
      t != null
        ? f === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + bt(t))
          : e.value !== "" + bt(t) && (e.value = "" + bt(t))
        : (f !== "submit" && f !== "reset") || e.removeAttribute("value"),
      t != null
        ? Wi(e, f, bt(t))
        : a != null
        ? Wi(e, f, bt(a))
        : l != null && e.removeAttribute("value"),
      n == null && r != null && (e.defaultChecked = !!r),
      n != null &&
        (e.checked = n && typeof n != "function" && typeof n != "symbol"),
      x != null &&
      typeof x != "function" &&
      typeof x != "symbol" &&
      typeof x != "boolean"
        ? (e.name = "" + bt(x))
        : e.removeAttribute("name");
  }
  function Fc(e, t, a, l, n, r, f, x) {
    if (
      (r != null &&
        typeof r != "function" &&
        typeof r != "symbol" &&
        typeof r != "boolean" &&
        (e.type = r),
      t != null || a != null)
    ) {
      if (!((r !== "submit" && r !== "reset") || t != null)) return;
      (a = a != null ? "" + bt(a) : ""),
        (t = t != null ? "" + bt(t) : a),
        x || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (l = l ?? n),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (e.checked = x ? e.checked : !!l),
      (e.defaultChecked = !!l),
      f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (e.name = f);
  }
  function Wi(e, t, a) {
    (t === "number" && cs(e.ownerDocument) === e) ||
      e.defaultValue === "" + a ||
      (e.defaultValue = "" + a);
  }
  function rl(e, t, a, l) {
    if (((e = e.options), t)) {
      t = {};
      for (var n = 0; n < a.length; n++) t["$" + a[n]] = !0;
      for (a = 0; a < e.length; a++)
        (n = t.hasOwnProperty("$" + e[a].value)),
          e[a].selected !== n && (e[a].selected = n),
          n && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + bt(a), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === a) {
          (e[n].selected = !0), l && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Pc(e, t, a) {
    if (
      t != null &&
      ((t = "" + bt(t)), t !== e.value && (e.value = t), a == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + bt(a) : "";
  }
  function Wc(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(c(92));
        if (xe(l)) {
          if (1 < l.length) throw Error(c(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), (t = a);
    }
    (a = bt(t)),
      (e.defaultValue = a),
      (l = e.textContent),
      l === a && l !== "" && l !== null && (e.value = l);
  }
  function ul(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var o0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ic(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? l
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : l
      ? e.setProperty(t, a)
      : typeof a != "number" || a === 0 || o0.has(t)
      ? t === "float"
        ? (e.cssFloat = a)
        : (e[t] = ("" + a).trim())
      : (e[t] = a + "px");
  }
  function eo(e, t, a) {
    if (t != null && typeof t != "object") throw Error(c(62));
    if (((e = e.style), a != null)) {
      for (var l in a)
        !a.hasOwnProperty(l) ||
          (t != null && t.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? e.setProperty(l, "")
            : l === "float"
            ? (e.cssFloat = "")
            : (e[l] = ""));
      for (var n in t)
        (l = t[n]), t.hasOwnProperty(n) && a[n] !== l && Ic(e, n, l);
    } else for (var r in t) t.hasOwnProperty(r) && Ic(e, r, t[r]);
  }
  function Ii(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var d0 = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    f0 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function os(e) {
    return f0.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var er = null;
  function tr(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var cl = null,
    ol = null;
  function to(e) {
    var t = ll(e);
    if (t && (e = t.stateNode)) {
      var a = e[lt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Pi(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === "radio" && t != null)
          ) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + vt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var l = a[t];
              if (l !== e && l.form === e.form) {
                var n = l[lt] || null;
                if (!n) throw Error(c(90));
                Pi(
                  l,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              (l = a[t]), l.form === e.form && $c(l);
          }
          break e;
        case "textarea":
          Pc(e, a.value, a.defaultValue);
          break e;
        case "select":
          (t = a.value), t != null && rl(e, !!a.multiple, t, !1);
      }
    }
  }
  var ar = !1;
  function ao(e, t, a) {
    if (ar) return e(t, a);
    ar = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (
        ((ar = !1),
        (cl !== null || ol !== null) &&
          ($s(), cl && ((t = cl), (e = ol), (ol = cl = null), to(t), e)))
      )
        for (t = 0; t < e.length; t++) to(e[t]);
    }
  }
  function Pl(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[lt] || null;
    if (l === null) return null;
    a = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) ||
          ((e = e.type),
          (l = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !l);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function") throw Error(c(231, t, typeof a));
    return a;
  }
  var Gt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    lr = !1;
  if (Gt)
    try {
      var Wl = {};
      Object.defineProperty(Wl, "passive", {
        get: function () {
          lr = !0;
        },
      }),
        window.addEventListener("test", Wl, Wl),
        window.removeEventListener("test", Wl, Wl);
    } catch {
      lr = !1;
    }
  var ca = null,
    nr = null,
    ds = null;
  function lo() {
    if (ds) return ds;
    var e,
      t = nr,
      a = t.length,
      l,
      n = "value" in ca ? ca.value : ca.textContent,
      r = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++);
    var f = a - e;
    for (l = 1; l <= f && t[a - l] === n[r - l]; l++);
    return (ds = n.slice(e, 1 < l ? 1 - l : void 0));
  }
  function fs(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ms() {
    return !0;
  }
  function no() {
    return !1;
  }
  function nt(e) {
    function t(a, l, n, r, f) {
      (this._reactName = a),
        (this._targetInst = n),
        (this.type = l),
        (this.nativeEvent = r),
        (this.target = f),
        (this.currentTarget = null);
      for (var x in e)
        e.hasOwnProperty(x) && ((a = e[x]), (this[x] = a ? a(r) : r[x]));
      return (
        (this.isDefaultPrevented = (
          r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1
        )
          ? ms
          : no),
        (this.isPropagationStopped = no),
        this
      );
    }
    return (
      b(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = ms));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = ms));
        },
        persist: function () {},
        isPersistent: ms,
      }),
      t
    );
  }
  var ka = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    hs = nt(ka),
    Il = b({}, ka, { view: 0, detail: 0 }),
    m0 = nt(Il),
    sr,
    ir,
    en,
    xs = b({}, Il, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ur,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== en &&
              (en && e.type === "mousemove"
                ? ((sr = e.screenX - en.screenX), (ir = e.screenY - en.screenY))
                : (ir = sr = 0),
              (en = e)),
            sr);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : ir;
      },
    }),
    so = nt(xs),
    h0 = b({}, xs, { dataTransfer: 0 }),
    x0 = nt(h0),
    p0 = b({}, Il, { relatedTarget: 0 }),
    rr = nt(p0),
    g0 = b({}, ka, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    y0 = nt(g0),
    b0 = b({}, ka, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    v0 = nt(b0),
    j0 = b({}, ka, { data: 0 }),
    io = nt(j0),
    N0 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    S0 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    w0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function E0(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = w0[e])
      ? !!t[e]
      : !1;
  }
  function ur() {
    return E0;
  }
  var _0 = b({}, Il, {
      key: function (e) {
        if (e.key) {
          var t = N0[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = fs(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? S0[e.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ur,
      charCode: function (e) {
        return e.type === "keypress" ? fs(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? fs(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
      },
    }),
    A0 = nt(_0),
    T0 = b({}, xs, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    ro = nt(T0),
    R0 = b({}, Il, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ur,
    }),
    C0 = nt(R0),
    O0 = b({}, ka, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    M0 = nt(O0),
    D0 = b({}, xs, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    z0 = nt(D0),
    k0 = b({}, ka, { newState: 0, oldState: 0 }),
    U0 = nt(k0),
    L0 = [9, 13, 27, 32],
    cr = Gt && "CompositionEvent" in window,
    tn = null;
  Gt && "documentMode" in document && (tn = document.documentMode);
  var B0 = Gt && "TextEvent" in window && !tn,
    uo = Gt && (!cr || (tn && 8 < tn && 11 >= tn)),
    co = " ",
    oo = !1;
  function fo(e, t) {
    switch (e) {
      case "keyup":
        return L0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function mo(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var dl = !1;
  function H0(e, t) {
    switch (e) {
      case "compositionend":
        return mo(t);
      case "keypress":
        return t.which !== 32 ? null : ((oo = !0), co);
      case "textInput":
        return (e = t.data), e === co && oo ? null : e;
      default:
        return null;
    }
  }
  function q0(e, t) {
    if (dl)
      return e === "compositionend" || (!cr && fo(e, t))
        ? ((e = lo()), (ds = nr = ca = null), (dl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return uo && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Y0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function ho(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Y0[e.type] : t === "textarea";
  }
  function xo(e, t, a, l) {
    cl ? (ol ? ol.push(l) : (ol = [l])) : (cl = l),
      (t = ti(t, "onChange")),
      0 < t.length &&
        ((a = new hs("onChange", "change", null, a, l)),
        e.push({ event: a, listeners: t }));
  }
  var an = null,
    ln = null;
  function V0(e) {
    Ff(e, 0);
  }
  function ps(e) {
    var t = Fl(e);
    if ($c(t)) return e;
  }
  function po(e, t) {
    if (e === "change") return t;
  }
  var go = !1;
  if (Gt) {
    var or;
    if (Gt) {
      var dr = "oninput" in document;
      if (!dr) {
        var yo = document.createElement("div");
        yo.setAttribute("oninput", "return;"),
          (dr = typeof yo.oninput == "function");
      }
      or = dr;
    } else or = !1;
    go = or && (!document.documentMode || 9 < document.documentMode);
  }
  function bo() {
    an && (an.detachEvent("onpropertychange", vo), (ln = an = null));
  }
  function vo(e) {
    if (e.propertyName === "value" && ps(ln)) {
      var t = [];
      xo(t, ln, e, tr(e)), ao(V0, t);
    }
  }
  function G0(e, t, a) {
    e === "focusin"
      ? (bo(), (an = t), (ln = a), an.attachEvent("onpropertychange", vo))
      : e === "focusout" && bo();
  }
  function X0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ps(ln);
  }
  function Q0(e, t) {
    if (e === "click") return ps(t);
  }
  function Z0(e, t) {
    if (e === "input" || e === "change") return ps(t);
  }
  function K0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var ft = typeof Object.is == "function" ? Object.is : K0;
  function nn(e, t) {
    if (ft(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var a = Object.keys(e),
      l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!qi.call(t, n) || !ft(e[n], t[n])) return !1;
    }
    return !0;
  }
  function jo(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function No(e, t) {
    var a = jo(e);
    e = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (((l = e + a.textContent.length), e <= t && l >= t))
          return { node: a, offset: t - e };
        e = l;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = jo(a);
    }
  }
  function So(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? So(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function wo(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = cs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = cs(e.document);
    }
    return t;
  }
  function fr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var J0 = Gt && "documentMode" in document && 11 >= document.documentMode,
    fl = null,
    mr = null,
    sn = null,
    hr = !1;
  function Eo(e, t, a) {
    var l =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    hr ||
      fl == null ||
      fl !== cs(l) ||
      ((l = fl),
      "selectionStart" in l && fr(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (sn && nn(sn, l)) ||
        ((sn = l),
        (l = ti(mr, "onSelect")),
        0 < l.length &&
          ((t = new hs("onSelect", "select", null, t, a)),
          e.push({ event: t, listeners: l }),
          (t.target = fl))));
  }
  function Ua(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a["Webkit" + e] = "webkit" + t),
      (a["Moz" + e] = "moz" + t),
      a
    );
  }
  var ml = {
      animationend: Ua("Animation", "AnimationEnd"),
      animationiteration: Ua("Animation", "AnimationIteration"),
      animationstart: Ua("Animation", "AnimationStart"),
      transitionrun: Ua("Transition", "TransitionRun"),
      transitionstart: Ua("Transition", "TransitionStart"),
      transitioncancel: Ua("Transition", "TransitionCancel"),
      transitionend: Ua("Transition", "TransitionEnd"),
    },
    xr = {},
    _o = {};
  Gt &&
    ((_o = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ml.animationend.animation,
      delete ml.animationiteration.animation,
      delete ml.animationstart.animation),
    "TransitionEvent" in window || delete ml.transitionend.transition);
  function La(e) {
    if (xr[e]) return xr[e];
    if (!ml[e]) return e;
    var t = ml[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in _o) return (xr[e] = t[a]);
    return e;
  }
  var Ao = La("animationend"),
    To = La("animationiteration"),
    Ro = La("animationstart"),
    $0 = La("transitionrun"),
    F0 = La("transitionstart"),
    P0 = La("transitioncancel"),
    Co = La("transitionend"),
    Oo = new Map(),
    pr =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  pr.push("scrollEnd");
  function Tt(e, t) {
    Oo.set(e, t), za(t, [e]);
  }
  var Mo = new WeakMap();
  function jt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Mo.get(e);
      return a !== void 0
        ? a
        : ((t = { value: e, source: t, stack: Kc(t) }), Mo.set(e, t), t);
    }
    return { value: e, source: t, stack: Kc(t) };
  }
  var Nt = [],
    hl = 0,
    gr = 0;
  function gs() {
    for (var e = hl, t = (gr = hl = 0); t < e; ) {
      var a = Nt[t];
      Nt[t++] = null;
      var l = Nt[t];
      Nt[t++] = null;
      var n = Nt[t];
      Nt[t++] = null;
      var r = Nt[t];
      if (((Nt[t++] = null), l !== null && n !== null)) {
        var f = l.pending;
        f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)),
          (l.pending = n);
      }
      r !== 0 && Do(a, n, r);
    }
  }
  function ys(e, t, a, l) {
    (Nt[hl++] = e),
      (Nt[hl++] = t),
      (Nt[hl++] = a),
      (Nt[hl++] = l),
      (gr |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l);
  }
  function yr(e, t, a, l) {
    return ys(e, t, a, l), bs(e);
  }
  function xl(e, t) {
    return ys(e, null, null, t), bs(e);
  }
  function Do(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, r = e.return; r !== null; )
      (r.childLanes |= a),
        (l = r.alternate),
        l !== null && (l.childLanes |= a),
        r.tag === 22 &&
          ((e = r.stateNode), e === null || e._visibility & 1 || (n = !0)),
        (e = r),
        (r = r.return);
    return e.tag === 3
      ? ((r = e.stateNode),
        n &&
          t !== null &&
          ((n = 31 - dt(a)),
          (e = r.hiddenUpdates),
          (l = e[n]),
          l === null ? (e[n] = [t]) : l.push(t),
          (t.lane = a | 536870912)),
        r)
      : null;
  }
  function bs(e) {
    if (50 < On) throw ((On = 0), (wu = null), Error(c(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var pl = {};
  function W0(e, t, a, l) {
    (this.tag = e),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function mt(e, t, a, l) {
    return new W0(e, t, a, l);
  }
  function br(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Xt(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = mt(e.tag, t, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = t),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function zo(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (t = a.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function vs(e, t, a, l, n, r) {
    var f = 0;
    if (((l = e), typeof e == "function")) br(e) && (f = 1);
    else if (typeof e == "string")
      f = ep(e, a, P.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
    else
      e: switch (e) {
        case ue:
          return (e = mt(31, a, t, n)), (e.elementType = ue), (e.lanes = r), e;
        case j:
          return Ba(a.children, n, r, t);
        case R:
          (f = 8), (n |= 24);
          break;
        case C:
          return (
            (e = mt(12, a, t, n | 2)), (e.elementType = C), (e.lanes = r), e
          );
        case U:
          return (e = mt(13, a, t, n)), (e.elementType = U), (e.lanes = r), e;
        case F:
          return (e = mt(19, a, t, n)), (e.elementType = F), (e.lanes = r), e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case q:
              case M:
                f = 10;
                break e;
              case X:
                f = 9;
                break e;
              case J:
                f = 11;
                break e;
              case ee:
                f = 14;
                break e;
              case ie:
                (f = 16), (l = null);
                break e;
            }
          (f = 29),
            (a = Error(c(130, e === null ? "null" : typeof e, ""))),
            (l = null);
      }
    return (
      (t = mt(f, a, t, n)), (t.elementType = e), (t.type = l), (t.lanes = r), t
    );
  }
  function Ba(e, t, a, l) {
    return (e = mt(7, e, l, t)), (e.lanes = a), e;
  }
  function vr(e, t, a) {
    return (e = mt(6, e, null, t)), (e.lanes = a), e;
  }
  function jr(e, t, a) {
    return (
      (t = mt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var gl = [],
    yl = 0,
    js = null,
    Ns = 0,
    St = [],
    wt = 0,
    Ha = null,
    Qt = 1,
    Zt = "";
  function qa(e, t) {
    (gl[yl++] = Ns), (gl[yl++] = js), (js = e), (Ns = t);
  }
  function ko(e, t, a) {
    (St[wt++] = Qt), (St[wt++] = Zt), (St[wt++] = Ha), (Ha = e);
    var l = Qt;
    e = Zt;
    var n = 32 - dt(l) - 1;
    (l &= ~(1 << n)), (a += 1);
    var r = 32 - dt(t) + n;
    if (30 < r) {
      var f = n - (n % 5);
      (r = (l & ((1 << f) - 1)).toString(32)),
        (l >>= f),
        (n -= f),
        (Qt = (1 << (32 - dt(t) + n)) | (a << n) | l),
        (Zt = r + e);
    } else (Qt = (1 << r) | (a << n) | l), (Zt = e);
  }
  function Nr(e) {
    e.return !== null && (qa(e, 1), ko(e, 1, 0));
  }
  function Sr(e) {
    for (; e === js; )
      (js = gl[--yl]), (gl[yl] = null), (Ns = gl[--yl]), (gl[yl] = null);
    for (; e === Ha; )
      (Ha = St[--wt]),
        (St[wt] = null),
        (Zt = St[--wt]),
        (St[wt] = null),
        (Qt = St[--wt]),
        (St[wt] = null);
  }
  var at = null,
    Ue = null,
    Ne = !1,
    Ya = null,
    kt = !1,
    wr = Error(c(519));
  function Va(e) {
    var t = Error(c(418, ""));
    throw (cn(jt(t, e)), wr);
  }
  function Uo(e) {
    var t = e.stateNode,
      a = e.type,
      l = e.memoizedProps;
    switch (((t[We] = e), (t[lt] = l), a)) {
      case "dialog":
        ge("cancel", t), ge("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ge("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Dn.length; a++) ge(Dn[a], t);
        break;
      case "source":
        ge("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ge("error", t), ge("load", t);
        break;
      case "details":
        ge("toggle", t);
        break;
      case "input":
        ge("invalid", t),
          Fc(
            t,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0
          ),
          us(t);
        break;
      case "select":
        ge("invalid", t);
        break;
      case "textarea":
        ge("invalid", t), Wc(t, l.value, l.defaultValue, l.children), us(t);
    }
    (a = l.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      t.textContent === "" + a ||
      l.suppressHydrationWarning === !0 ||
      em(t.textContent, a)
        ? (l.popover != null && (ge("beforetoggle", t), ge("toggle", t)),
          l.onScroll != null && ge("scroll", t),
          l.onScrollEnd != null && ge("scrollend", t),
          l.onClick != null && (t.onclick = ai),
          (t = !0))
        : (t = !1),
      t || Va(e);
  }
  function Lo(e) {
    for (at = e.return; at; )
      switch (at.tag) {
        case 5:
        case 13:
          kt = !1;
          return;
        case 27:
        case 3:
          kt = !0;
          return;
        default:
          at = at.return;
      }
  }
  function rn(e) {
    if (e !== at) return !1;
    if (!Ne) return Lo(e), (Ne = !0), !1;
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type),
          (a =
            !(a !== "form" && a !== "button") || qu(e.type, e.memoizedProps))),
        (a = !a)),
      a && Ue && Va(e),
      Lo(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(c(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((a = e.data), a === "/$")) {
              if (t === 0) {
                Ue = Ct(e.nextSibling);
                break e;
              }
              t--;
            } else (a !== "$" && a !== "$!" && a !== "$?") || t++;
          e = e.nextSibling;
        }
        Ue = null;
      }
    } else
      t === 27
        ? ((t = Ue), Ea(e.type) ? ((e = Xu), (Xu = null), (Ue = e)) : (Ue = t))
        : (Ue = at ? Ct(e.stateNode.nextSibling) : null);
    return !0;
  }
  function un() {
    (Ue = at = null), (Ne = !1);
  }
  function Bo() {
    var e = Ya;
    return (
      e !== null &&
        (rt === null ? (rt = e) : rt.push.apply(rt, e), (Ya = null)),
      e
    );
  }
  function cn(e) {
    Ya === null ? (Ya = [e]) : Ya.push(e);
  }
  var Er = Z(null),
    Ga = null,
    Kt = null;
  function oa(e, t, a) {
    K(Er, t._currentValue), (t._currentValue = a);
  }
  function Jt(e) {
    (e._currentValue = Er.current), D(Er);
  }
  function _r(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), l !== null && (l.childLanes |= t))
          : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function Ar(e, t, a, l) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var r = n.dependencies;
      if (r !== null) {
        var f = n.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var x = r;
          r = n;
          for (var v = 0; v < t.length; v++)
            if (x.context === t[v]) {
              (r.lanes |= a),
                (x = r.alternate),
                x !== null && (x.lanes |= a),
                _r(r.return, a, e),
                l || (f = null);
              break e;
            }
          r = x.next;
        }
      } else if (n.tag === 18) {
        if (((f = n.return), f === null)) throw Error(c(341));
        (f.lanes |= a),
          (r = f.alternate),
          r !== null && (r.lanes |= a),
          _r(f, a, e),
          (f = null);
      } else f = n.child;
      if (f !== null) f.return = n;
      else
        for (f = n; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (((n = f.sibling), n !== null)) {
            (n.return = f.return), (f = n);
            break;
          }
          f = f.return;
        }
      n = f;
    }
  }
  function on(e, t, a, l) {
    e = null;
    for (var n = t, r = !1; n !== null; ) {
      if (!r) {
        if ((n.flags & 524288) !== 0) r = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var f = n.alternate;
        if (f === null) throw Error(c(387));
        if (((f = f.memoizedProps), f !== null)) {
          var x = n.type;
          ft(n.pendingProps.value, f.value) ||
            (e !== null ? e.push(x) : (e = [x]));
        }
      } else if (n === Be.current) {
        if (((f = n.alternate), f === null)) throw Error(c(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(Hn) : (e = [Hn]));
      }
      n = n.return;
    }
    e !== null && Ar(t, e, a, l), (t.flags |= 262144);
  }
  function Ss(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ft(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Xa(e) {
    (Ga = e),
      (Kt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function Ie(e) {
    return Ho(Ga, e);
  }
  function ws(e, t) {
    return Ga === null && Xa(e), Ho(e, t);
  }
  function Ho(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Kt === null)) {
      if (e === null) throw Error(c(308));
      (Kt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else Kt = Kt.next = t;
    return a;
  }
  var I0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, l) {
                  e.push(l);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                });
            };
          },
    ex = s.unstable_scheduleCallback,
    tx = s.unstable_NormalPriority,
    Ge = {
      $$typeof: M,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Tr() {
    return { controller: new I0(), data: new Map(), refCount: 0 };
  }
  function dn(e) {
    e.refCount--,
      e.refCount === 0 &&
        ex(tx, function () {
          e.controller.abort();
        });
  }
  var fn = null,
    Rr = 0,
    bl = 0,
    vl = null;
  function ax(e, t) {
    if (fn === null) {
      var a = (fn = []);
      (Rr = 0),
        (bl = Ou()),
        (vl = {
          status: "pending",
          value: void 0,
          then: function (l) {
            a.push(l);
          },
        });
    }
    return Rr++, t.then(qo, qo), t;
  }
  function qo() {
    if (--Rr === 0 && fn !== null) {
      vl !== null && (vl.status = "fulfilled");
      var e = fn;
      (fn = null), (bl = 0), (vl = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function lx(e, t) {
    var a = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (n) {
          a.push(n);
        },
      };
    return (
      e.then(
        function () {
          (l.status = "fulfilled"), (l.value = t);
          for (var n = 0; n < a.length; n++) (0, a[n])(t);
        },
        function (n) {
          for (l.status = "rejected", l.reason = n, n = 0; n < a.length; n++)
            (0, a[n])(void 0);
        }
      ),
      l
    );
  }
  var Yo = w.S;
  w.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      ax(e, t),
      Yo !== null && Yo(e, t);
  };
  var Qa = Z(null);
  function Cr() {
    var e = Qa.current;
    return e !== null ? e : Oe.pooledCache;
  }
  function Es(e, t) {
    t === null ? K(Qa, Qa.current) : K(Qa, t.pool);
  }
  function Vo() {
    var e = Cr();
    return e === null ? null : { parent: Ge._currentValue, pool: e };
  }
  var mn = Error(c(460)),
    Go = Error(c(474)),
    _s = Error(c(542)),
    Or = { then: function () {} };
  function Xo(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function As() {}
  function Qo(e, t, a) {
    switch (
      ((a = e[a]),
      a === void 0 ? e.push(t) : a !== t && (t.then(As, As), (t = a)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), Ko(e), e);
      default:
        if (typeof t.status == "string") t.then(As, As);
        else {
          if (((e = Oe), e !== null && 100 < e.shellSuspendCounter))
            throw Error(c(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (l) {
                if (t.status === "pending") {
                  var n = t;
                  (n.status = "fulfilled"), (n.value = l);
                }
              },
              function (l) {
                if (t.status === "pending") {
                  var n = t;
                  (n.status = "rejected"), (n.reason = l);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), Ko(e), e);
        }
        throw ((hn = t), mn);
    }
  }
  var hn = null;
  function Zo() {
    if (hn === null) throw Error(c(459));
    var e = hn;
    return (hn = null), e;
  }
  function Ko(e) {
    if (e === mn || e === _s) throw Error(c(483));
  }
  var da = !1;
  function Mr(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Dr(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function fa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ma(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (we & 2) !== 0)) {
      var n = l.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (l.pending = t),
        (t = bs(e)),
        Do(e, null, a),
        t
      );
    }
    return ys(e, l, t, a), bs(e);
  }
  function xn(e, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
    ) {
      var l = t.lanes;
      (l &= e.pendingLanes), (a |= l), (t.lanes = a), Hc(e, a);
    }
  }
  function zr(e, t) {
    var a = e.updateQueue,
      l = e.alternate;
    if (l !== null && ((l = l.updateQueue), a === l)) {
      var n = null,
        r = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var f = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          r === null ? (n = r = f) : (r = r.next = f), (a = a.next);
        } while (a !== null);
        r === null ? (n = r = t) : (r = r.next = t);
      } else n = r = t;
      (a = {
        baseState: l.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: r,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (e.updateQueue = a);
      return;
    }
    (e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t);
  }
  var kr = !1;
  function pn() {
    if (kr) {
      var e = vl;
      if (e !== null) throw e;
    }
  }
  function gn(e, t, a, l) {
    kr = !1;
    var n = e.updateQueue;
    da = !1;
    var r = n.firstBaseUpdate,
      f = n.lastBaseUpdate,
      x = n.shared.pending;
    if (x !== null) {
      n.shared.pending = null;
      var v = x,
        z = v.next;
      (v.next = null), f === null ? (r = z) : (f.next = z), (f = v);
      var Y = e.alternate;
      Y !== null &&
        ((Y = Y.updateQueue),
        (x = Y.lastBaseUpdate),
        x !== f &&
          (x === null ? (Y.firstBaseUpdate = z) : (x.next = z),
          (Y.lastBaseUpdate = v)));
    }
    if (r !== null) {
      var Q = n.baseState;
      (f = 0), (Y = z = v = null), (x = r);
      do {
        var L = x.lane & -536870913,
          B = L !== x.lane;
        if (B ? (be & L) === L : (l & L) === L) {
          L !== 0 && L === bl && (kr = !0),
            Y !== null &&
              (Y = Y.next =
                {
                  lane: 0,
                  tag: x.tag,
                  payload: x.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var re = e,
              ne = x;
            L = t;
            var Te = a;
            switch (ne.tag) {
              case 1:
                if (((re = ne.payload), typeof re == "function")) {
                  Q = re.call(Te, Q, L);
                  break e;
                }
                Q = re;
                break e;
              case 3:
                re.flags = (re.flags & -65537) | 128;
              case 0:
                if (
                  ((re = ne.payload),
                  (L = typeof re == "function" ? re.call(Te, Q, L) : re),
                  L == null)
                )
                  break e;
                Q = b({}, Q, L);
                break e;
              case 2:
                da = !0;
            }
          }
          (L = x.callback),
            L !== null &&
              ((e.flags |= 64),
              B && (e.flags |= 8192),
              (B = n.callbacks),
              B === null ? (n.callbacks = [L]) : B.push(L));
        } else
          (B = {
            lane: L,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null,
          }),
            Y === null ? ((z = Y = B), (v = Q)) : (Y = Y.next = B),
            (f |= L);
        if (((x = x.next), x === null)) {
          if (((x = n.shared.pending), x === null)) break;
          (B = x),
            (x = B.next),
            (B.next = null),
            (n.lastBaseUpdate = B),
            (n.shared.pending = null);
        }
      } while (!0);
      Y === null && (v = Q),
        (n.baseState = v),
        (n.firstBaseUpdate = z),
        (n.lastBaseUpdate = Y),
        r === null && (n.shared.lanes = 0),
        (ja |= f),
        (e.lanes = f),
        (e.memoizedState = Q);
    }
  }
  function Jo(e, t) {
    if (typeof e != "function") throw Error(c(191, e));
    e.call(t);
  }
  function $o(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++) Jo(a[e], t);
  }
  var jl = Z(null),
    Ts = Z(0);
  function Fo(e, t) {
    (e = ta), K(Ts, e), K(jl, t), (ta = e | t.baseLanes);
  }
  function Ur() {
    K(Ts, ta), K(jl, jl.current);
  }
  function Lr() {
    (ta = Ts.current), D(jl), D(Ts);
  }
  var ha = 0,
    me = null,
    _e = null,
    Ye = null,
    Rs = !1,
    Nl = !1,
    Za = !1,
    Cs = 0,
    yn = 0,
    Sl = null,
    nx = 0;
  function He() {
    throw Error(c(321));
  }
  function Br(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!ft(e[a], t[a])) return !1;
    return !0;
  }
  function Hr(e, t, a, l, n, r) {
    return (
      (ha = r),
      (me = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (w.H = e === null || e.memoizedState === null ? Dd : zd),
      (Za = !1),
      (r = a(l, n)),
      (Za = !1),
      Nl && (r = Wo(t, a, l, n)),
      Po(e),
      r
    );
  }
  function Po(e) {
    w.H = Us;
    var t = _e !== null && _e.next !== null;
    if (((ha = 0), (Ye = _e = me = null), (Rs = !1), (yn = 0), (Sl = null), t))
      throw Error(c(300));
    e === null ||
      Ze ||
      ((e = e.dependencies), e !== null && Ss(e) && (Ze = !0));
  }
  function Wo(e, t, a, l) {
    me = e;
    var n = 0;
    do {
      if ((Nl && (Sl = null), (yn = 0), (Nl = !1), 25 <= n))
        throw Error(c(301));
      if (((n += 1), (Ye = _e = null), e.updateQueue != null)) {
        var r = e.updateQueue;
        (r.lastEffect = null),
          (r.events = null),
          (r.stores = null),
          r.memoCache != null && (r.memoCache.index = 0);
      }
      (w.H = dx), (r = t(a, l));
    } while (Nl);
    return r;
  }
  function sx() {
    var e = w.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? bn(t) : t),
      (e = e.useState()[0]),
      (_e !== null ? _e.memoizedState : null) !== e && (me.flags |= 1024),
      t
    );
  }
  function qr() {
    var e = Cs !== 0;
    return (Cs = 0), e;
  }
  function Yr(e, t, a) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a);
  }
  function Vr(e) {
    if (Rs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      Rs = !1;
    }
    (ha = 0), (Ye = _e = me = null), (Nl = !1), (yn = Cs = 0), (Sl = null);
  }
  function st() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Ye === null ? (me.memoizedState = Ye = e) : (Ye = Ye.next = e), Ye;
  }
  function Ve() {
    if (_e === null) {
      var e = me.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = _e.next;
    var t = Ye === null ? me.memoizedState : Ye.next;
    if (t !== null) (Ye = t), (_e = e);
    else {
      if (e === null)
        throw me.alternate === null ? Error(c(467)) : Error(c(310));
      (_e = e),
        (e = {
          memoizedState: _e.memoizedState,
          baseState: _e.baseState,
          baseQueue: _e.baseQueue,
          queue: _e.queue,
          next: null,
        }),
        Ye === null ? (me.memoizedState = Ye = e) : (Ye = Ye.next = e);
    }
    return Ye;
  }
  function Gr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function bn(e) {
    var t = yn;
    return (
      (yn += 1),
      Sl === null && (Sl = []),
      (e = Qo(Sl, e, t)),
      (t = me),
      (Ye === null ? t.memoizedState : Ye.next) === null &&
        ((t = t.alternate),
        (w.H = t === null || t.memoizedState === null ? Dd : zd)),
      e
    );
  }
  function Os(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return bn(e);
      if (e.$$typeof === M) return Ie(e);
    }
    throw Error(c(438, String(e)));
  }
  function Xr(e) {
    var t = null,
      a = me.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var l = me.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (t = {
              data: l.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = Gr()), (me.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++) a[l] = ye;
    return t.index++, a;
  }
  function $t(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ms(e) {
    var t = Ve();
    return Qr(t, _e, e);
  }
  function Qr(e, t, a) {
    var l = e.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = a;
    var n = e.baseQueue,
      r = l.pending;
    if (r !== null) {
      if (n !== null) {
        var f = n.next;
        (n.next = r.next), (r.next = f);
      }
      (t.baseQueue = n = r), (l.pending = null);
    }
    if (((r = e.baseState), n === null)) e.memoizedState = r;
    else {
      t = n.next;
      var x = (f = null),
        v = null,
        z = t,
        Y = !1;
      do {
        var Q = z.lane & -536870913;
        if (Q !== z.lane ? (be & Q) === Q : (ha & Q) === Q) {
          var L = z.revertLane;
          if (L === 0)
            v !== null &&
              (v = v.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              Q === bl && (Y = !0);
          else if ((ha & L) === L) {
            (z = z.next), L === bl && (Y = !0);
            continue;
          } else
            (Q = {
              lane: 0,
              revertLane: z.revertLane,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              v === null ? ((x = v = Q), (f = r)) : (v = v.next = Q),
              (me.lanes |= L),
              (ja |= L);
          (Q = z.action),
            Za && a(r, Q),
            (r = z.hasEagerState ? z.eagerState : a(r, Q));
        } else
          (L = {
            lane: Q,
            revertLane: z.revertLane,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            v === null ? ((x = v = L), (f = r)) : (v = v.next = L),
            (me.lanes |= Q),
            (ja |= Q);
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (v === null ? (f = r) : (v.next = x),
        !ft(r, e.memoizedState) && ((Ze = !0), Y && ((a = vl), a !== null)))
      )
        throw a;
      (e.memoizedState = r),
        (e.baseState = f),
        (e.baseQueue = v),
        (l.lastRenderedState = r);
    }
    return n === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Zr(e) {
    var t = Ve(),
      a = t.queue;
    if (a === null) throw Error(c(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch,
      n = a.pending,
      r = t.memoizedState;
    if (n !== null) {
      a.pending = null;
      var f = (n = n.next);
      do (r = e(r, f.action)), (f = f.next);
      while (f !== n);
      ft(r, t.memoizedState) || (Ze = !0),
        (t.memoizedState = r),
        t.baseQueue === null && (t.baseState = r),
        (a.lastRenderedState = r);
    }
    return [r, l];
  }
  function Io(e, t, a) {
    var l = me,
      n = Ve(),
      r = Ne;
    if (r) {
      if (a === void 0) throw Error(c(407));
      a = a();
    } else a = t();
    var f = !ft((_e || n).memoizedState, a);
    f && ((n.memoizedState = a), (Ze = !0)), (n = n.queue);
    var x = ad.bind(null, l, n, e);
    if (
      (vn(2048, 8, x, [e]),
      n.getSnapshot !== t || f || (Ye !== null && Ye.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        wl(9, Ds(), td.bind(null, l, n, a, t), null),
        Oe === null)
      )
        throw Error(c(349));
      r || (ha & 124) !== 0 || ed(l, t, a);
    }
    return a;
  }
  function ed(e, t, a) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = me.updateQueue),
      t === null
        ? ((t = Gr()), (me.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e));
  }
  function td(e, t, a, l) {
    (t.value = a), (t.getSnapshot = l), ld(t) && nd(e);
  }
  function ad(e, t, a) {
    return a(function () {
      ld(t) && nd(e);
    });
  }
  function ld(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !ft(e, a);
    } catch {
      return !0;
    }
  }
  function nd(e) {
    var t = xl(e, 2);
    t !== null && yt(t, e, 2);
  }
  function Kr(e) {
    var t = st();
    if (typeof e == "function") {
      var a = e;
      if (((e = a()), Za)) {
        ra(!0);
        try {
          a();
        } finally {
          ra(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $t,
        lastRenderedState: e,
      }),
      t
    );
  }
  function sd(e, t, a, l) {
    return (e.baseState = a), Qr(e, _e, typeof l == "function" ? l : $t);
  }
  function ix(e, t, a, l, n) {
    if (ks(e)) throw Error(c(485));
    if (((e = t.action), e !== null)) {
      var r = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          r.listeners.push(f);
        },
      };
      w.T !== null ? a(!0) : (r.isTransition = !1),
        l(r),
        (a = t.pending),
        a === null
          ? ((r.next = t.pending = r), id(t, r))
          : ((r.next = a.next), (t.pending = a.next = r));
    }
  }
  function id(e, t) {
    var a = t.action,
      l = t.payload,
      n = e.state;
    if (t.isTransition) {
      var r = w.T,
        f = {};
      w.T = f;
      try {
        var x = a(n, l),
          v = w.S;
        v !== null && v(f, x), rd(e, t, x);
      } catch (z) {
        Jr(e, t, z);
      } finally {
        w.T = r;
      }
    } else
      try {
        (r = a(n, l)), rd(e, t, r);
      } catch (z) {
        Jr(e, t, z);
      }
  }
  function rd(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (l) {
            ud(e, t, l);
          },
          function (l) {
            return Jr(e, t, l);
          }
        )
      : ud(e, t, a);
  }
  function ud(e, t, a) {
    (t.status = "fulfilled"),
      (t.value = a),
      cd(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (e.pending = null) : ((a = a.next), (t.next = a), id(e, a)));
  }
  function Jr(e, t, a) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do (t.status = "rejected"), (t.reason = a), cd(t), (t = t.next);
      while (t !== l);
    }
    e.action = null;
  }
  function cd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function od(e, t) {
    return t;
  }
  function dd(e, t) {
    if (Ne) {
      var a = Oe.formState;
      if (a !== null) {
        e: {
          var l = me;
          if (Ne) {
            if (Ue) {
              t: {
                for (var n = Ue, r = kt; n.nodeType !== 8; ) {
                  if (!r) {
                    n = null;
                    break t;
                  }
                  if (((n = Ct(n.nextSibling)), n === null)) {
                    n = null;
                    break t;
                  }
                }
                (r = n.data), (n = r === "F!" || r === "F" ? n : null);
              }
              if (n) {
                (Ue = Ct(n.nextSibling)), (l = n.data === "F!");
                break e;
              }
            }
            Va(l);
          }
          l = !1;
        }
        l && (t = a[0]);
      }
    }
    return (
      (a = st()),
      (a.memoizedState = a.baseState = t),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: od,
        lastRenderedState: t,
      }),
      (a.queue = l),
      (a = Cd.bind(null, me, l)),
      (l.dispatch = a),
      (l = Kr(!1)),
      (r = Ir.bind(null, me, !1, l.queue)),
      (l = st()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (l.queue = n),
      (a = ix.bind(null, me, n, r, a)),
      (n.dispatch = a),
      (l.memoizedState = e),
      [t, a, !1]
    );
  }
  function fd(e) {
    var t = Ve();
    return md(t, _e, e);
  }
  function md(e, t, a) {
    if (
      ((t = Qr(e, t, od)[0]),
      (e = Ms($t)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var l = bn(t);
      } catch (f) {
        throw f === mn ? _s : f;
      }
    else l = t;
    t = Ve();
    var n = t.queue,
      r = n.dispatch;
    return (
      a !== t.memoizedState &&
        ((me.flags |= 2048), wl(9, Ds(), rx.bind(null, n, a), null)),
      [l, r, e]
    );
  }
  function rx(e, t) {
    e.action = t;
  }
  function hd(e) {
    var t = Ve(),
      a = _e;
    if (a !== null) return md(t, a, e);
    Ve(), (t = t.memoizedState), (a = Ve());
    var l = a.queue.dispatch;
    return (a.memoizedState = e), [t, l, !1];
  }
  function wl(e, t, a, l) {
    return (
      (e = { tag: e, create: a, deps: l, inst: t, next: null }),
      (t = me.updateQueue),
      t === null && ((t = Gr()), (me.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((l = a.next), (a.next = e), (e.next = l), (t.lastEffect = e)),
      e
    );
  }
  function Ds() {
    return { destroy: void 0, resource: void 0 };
  }
  function xd() {
    return Ve().memoizedState;
  }
  function zs(e, t, a, l) {
    var n = st();
    (l = l === void 0 ? null : l),
      (me.flags |= e),
      (n.memoizedState = wl(1 | t, Ds(), a, l));
  }
  function vn(e, t, a, l) {
    var n = Ve();
    l = l === void 0 ? null : l;
    var r = n.memoizedState.inst;
    _e !== null && l !== null && Br(l, _e.memoizedState.deps)
      ? (n.memoizedState = wl(t, r, a, l))
      : ((me.flags |= e), (n.memoizedState = wl(1 | t, r, a, l)));
  }
  function pd(e, t) {
    zs(8390656, 8, e, t);
  }
  function gd(e, t) {
    vn(2048, 8, e, t);
  }
  function yd(e, t) {
    return vn(4, 2, e, t);
  }
  function bd(e, t) {
    return vn(4, 4, e, t);
  }
  function vd(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function () {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function jd(e, t, a) {
    (a = a != null ? a.concat([e]) : null), vn(4, 4, vd.bind(null, t, e), a);
  }
  function $r() {}
  function Nd(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Br(t, l[1]) ? l[0] : ((a.memoizedState = [e, t]), e);
  }
  function Sd(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Br(t, l[1])) return l[0];
    if (((l = e()), Za)) {
      ra(!0);
      try {
        e();
      } finally {
        ra(!1);
      }
    }
    return (a.memoizedState = [l, t]), l;
  }
  function Fr(e, t, a) {
    return a === void 0 || (ha & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = Af()), (me.lanes |= e), (ja |= e), a);
  }
  function wd(e, t, a, l) {
    return ft(a, t)
      ? a
      : jl.current !== null
      ? ((e = Fr(e, a, l)), ft(e, t) || (Ze = !0), e)
      : (ha & 42) === 0
      ? ((Ze = !0), (e.memoizedState = a))
      : ((e = Af()), (me.lanes |= e), (ja |= e), t);
  }
  function Ed(e, t, a, l, n) {
    var r = V.p;
    V.p = r !== 0 && 8 > r ? r : 8;
    var f = w.T,
      x = {};
    (w.T = x), Ir(e, !1, t, a);
    try {
      var v = n(),
        z = w.S;
      if (
        (z !== null && z(x, v),
        v !== null && typeof v == "object" && typeof v.then == "function")
      ) {
        var Y = lx(v, l);
        jn(e, t, Y, gt(e));
      } else jn(e, t, l, gt(e));
    } catch (Q) {
      jn(e, t, { then: function () {}, status: "rejected", reason: Q }, gt());
    } finally {
      (V.p = r), (w.T = f);
    }
  }
  function ux() {}
  function Pr(e, t, a, l) {
    if (e.tag !== 5) throw Error(c(476));
    var n = _d(e).queue;
    Ed(
      e,
      n,
      t,
      $,
      a === null
        ? ux
        : function () {
            return Ad(e), a(l);
          }
    );
  }
  function _d(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $t,
        lastRenderedState: $,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: $t,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Ad(e) {
    var t = _d(e).next.queue;
    jn(e, t, {}, gt());
  }
  function Wr() {
    return Ie(Hn);
  }
  function Td() {
    return Ve().memoizedState;
  }
  function Rd() {
    return Ve().memoizedState;
  }
  function cx(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = gt();
          e = fa(a);
          var l = ma(t, e, a);
          l !== null && (yt(l, t, a), xn(l, t, a)),
            (t = { cache: Tr() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function ox(e, t, a) {
    var l = gt();
    (a = {
      lane: l,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ks(e)
        ? Od(t, a)
        : ((a = yr(e, t, a, l)), a !== null && (yt(a, e, l), Md(a, t, l)));
  }
  function Cd(e, t, a) {
    var l = gt();
    jn(e, t, a, l);
  }
  function jn(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ks(e)) Od(t, n);
    else {
      var r = e.alternate;
      if (
        e.lanes === 0 &&
        (r === null || r.lanes === 0) &&
        ((r = t.lastRenderedReducer), r !== null)
      )
        try {
          var f = t.lastRenderedState,
            x = r(f, a);
          if (((n.hasEagerState = !0), (n.eagerState = x), ft(x, f)))
            return ys(e, t, n, 0), Oe === null && gs(), !1;
        } catch {
        } finally {
        }
      if (((a = yr(e, t, n, l)), a !== null))
        return yt(a, e, l), Md(a, t, l), !0;
    }
    return !1;
  }
  function Ir(e, t, a, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: Ou(),
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ks(e))
    ) {
      if (t) throw Error(c(479));
    } else (t = yr(e, a, l, 2)), t !== null && yt(t, e, 2);
  }
  function ks(e) {
    var t = e.alternate;
    return e === me || (t !== null && t === me);
  }
  function Od(e, t) {
    Nl = Rs = !0;
    var a = e.pending;
    a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (e.pending = t);
  }
  function Md(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      (l &= e.pendingLanes), (a |= l), (t.lanes = a), Hc(e, a);
    }
  }
  var Us = {
      readContext: Ie,
      use: Os,
      useCallback: He,
      useContext: He,
      useEffect: He,
      useImperativeHandle: He,
      useLayoutEffect: He,
      useInsertionEffect: He,
      useMemo: He,
      useReducer: He,
      useRef: He,
      useState: He,
      useDebugValue: He,
      useDeferredValue: He,
      useTransition: He,
      useSyncExternalStore: He,
      useId: He,
      useHostTransitionStatus: He,
      useFormState: He,
      useActionState: He,
      useOptimistic: He,
      useMemoCache: He,
      useCacheRefresh: He,
    },
    Dd = {
      readContext: Ie,
      use: Os,
      useCallback: function (e, t) {
        return (st().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: Ie,
      useEffect: pd,
      useImperativeHandle: function (e, t, a) {
        (a = a != null ? a.concat([e]) : null),
          zs(4194308, 4, vd.bind(null, t, e), a);
      },
      useLayoutEffect: function (e, t) {
        return zs(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        zs(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = st();
        t = t === void 0 ? null : t;
        var l = e();
        if (Za) {
          ra(!0);
          try {
            e();
          } finally {
            ra(!1);
          }
        }
        return (a.memoizedState = [l, t]), l;
      },
      useReducer: function (e, t, a) {
        var l = st();
        if (a !== void 0) {
          var n = a(t);
          if (Za) {
            ra(!0);
            try {
              a(t);
            } finally {
              ra(!1);
            }
          }
        } else n = t;
        return (
          (l.memoizedState = l.baseState = n),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (l.queue = e),
          (e = e.dispatch = ox.bind(null, me, e)),
          [l.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = st();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: function (e) {
        e = Kr(e);
        var t = e.queue,
          a = Cd.bind(null, me, t);
        return (t.dispatch = a), [e.memoizedState, a];
      },
      useDebugValue: $r,
      useDeferredValue: function (e, t) {
        var a = st();
        return Fr(a, e, t);
      },
      useTransition: function () {
        var e = Kr(!1);
        return (
          (e = Ed.bind(null, me, e.queue, !0, !1)),
          (st().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, a) {
        var l = me,
          n = st();
        if (Ne) {
          if (a === void 0) throw Error(c(407));
          a = a();
        } else {
          if (((a = t()), Oe === null)) throw Error(c(349));
          (be & 124) !== 0 || ed(l, t, a);
        }
        n.memoizedState = a;
        var r = { value: a, getSnapshot: t };
        return (
          (n.queue = r),
          pd(ad.bind(null, l, r, e), [e]),
          (l.flags |= 2048),
          wl(9, Ds(), td.bind(null, l, r, a, t), null),
          a
        );
      },
      useId: function () {
        var e = st(),
          t = Oe.identifierPrefix;
        if (Ne) {
          var a = Zt,
            l = Qt;
          (a = (l & ~(1 << (32 - dt(l) - 1))).toString(32) + a),
            (t = "«" + t + "R" + a),
            (a = Cs++),
            0 < a && (t += "H" + a.toString(32)),
            (t += "»");
        } else (a = nx++), (t = "«" + t + "r" + a.toString(32) + "»");
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Wr,
      useFormState: dd,
      useActionState: dd,
      useOptimistic: function (e) {
        var t = st();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = a),
          (t = Ir.bind(null, me, !0, a)),
          (a.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: Xr,
      useCacheRefresh: function () {
        return (st().memoizedState = cx.bind(null, me));
      },
    },
    zd = {
      readContext: Ie,
      use: Os,
      useCallback: Nd,
      useContext: Ie,
      useEffect: gd,
      useImperativeHandle: jd,
      useInsertionEffect: yd,
      useLayoutEffect: bd,
      useMemo: Sd,
      useReducer: Ms,
      useRef: xd,
      useState: function () {
        return Ms($t);
      },
      useDebugValue: $r,
      useDeferredValue: function (e, t) {
        var a = Ve();
        return wd(a, _e.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Ms($t)[0],
          t = Ve().memoizedState;
        return [typeof e == "boolean" ? e : bn(e), t];
      },
      useSyncExternalStore: Io,
      useId: Td,
      useHostTransitionStatus: Wr,
      useFormState: fd,
      useActionState: fd,
      useOptimistic: function (e, t) {
        var a = Ve();
        return sd(a, _e, e, t);
      },
      useMemoCache: Xr,
      useCacheRefresh: Rd,
    },
    dx = {
      readContext: Ie,
      use: Os,
      useCallback: Nd,
      useContext: Ie,
      useEffect: gd,
      useImperativeHandle: jd,
      useInsertionEffect: yd,
      useLayoutEffect: bd,
      useMemo: Sd,
      useReducer: Zr,
      useRef: xd,
      useState: function () {
        return Zr($t);
      },
      useDebugValue: $r,
      useDeferredValue: function (e, t) {
        var a = Ve();
        return _e === null ? Fr(a, e, t) : wd(a, _e.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Zr($t)[0],
          t = Ve().memoizedState;
        return [typeof e == "boolean" ? e : bn(e), t];
      },
      useSyncExternalStore: Io,
      useId: Td,
      useHostTransitionStatus: Wr,
      useFormState: hd,
      useActionState: hd,
      useOptimistic: function (e, t) {
        var a = Ve();
        return _e !== null
          ? sd(a, _e, e, t)
          : ((a.baseState = e), [e, a.queue.dispatch]);
      },
      useMemoCache: Xr,
      useCacheRefresh: Rd,
    },
    El = null,
    Nn = 0;
  function Ls(e) {
    var t = Nn;
    return (Nn += 1), El === null && (El = []), Qo(El, e, t);
  }
  function Sn(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function Bs(e, t) {
    throw t.$$typeof === T
      ? Error(c(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          c(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function kd(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Ud(e) {
    function t(A, _) {
      if (e) {
        var O = A.deletions;
        O === null ? ((A.deletions = [_]), (A.flags |= 16)) : O.push(_);
      }
    }
    function a(A, _) {
      if (!e) return null;
      for (; _ !== null; ) t(A, _), (_ = _.sibling);
      return null;
    }
    function l(A) {
      for (var _ = new Map(); A !== null; )
        A.key !== null ? _.set(A.key, A) : _.set(A.index, A), (A = A.sibling);
      return _;
    }
    function n(A, _) {
      return (A = Xt(A, _)), (A.index = 0), (A.sibling = null), A;
    }
    function r(A, _, O) {
      return (
        (A.index = O),
        e
          ? ((O = A.alternate),
            O !== null
              ? ((O = O.index), O < _ ? ((A.flags |= 67108866), _) : O)
              : ((A.flags |= 67108866), _))
          : ((A.flags |= 1048576), _)
      );
    }
    function f(A) {
      return e && A.alternate === null && (A.flags |= 67108866), A;
    }
    function x(A, _, O, G) {
      return _ === null || _.tag !== 6
        ? ((_ = vr(O, A.mode, G)), (_.return = A), _)
        : ((_ = n(_, O)), (_.return = A), _);
    }
    function v(A, _, O, G) {
      var I = O.type;
      return I === j
        ? Y(A, _, O.props.children, G, O.key)
        : _ !== null &&
          (_.elementType === I ||
            (typeof I == "object" &&
              I !== null &&
              I.$$typeof === ie &&
              kd(I) === _.type))
        ? ((_ = n(_, O.props)), Sn(_, O), (_.return = A), _)
        : ((_ = vs(O.type, O.key, O.props, null, A.mode, G)),
          Sn(_, O),
          (_.return = A),
          _);
    }
    function z(A, _, O, G) {
      return _ === null ||
        _.tag !== 4 ||
        _.stateNode.containerInfo !== O.containerInfo ||
        _.stateNode.implementation !== O.implementation
        ? ((_ = jr(O, A.mode, G)), (_.return = A), _)
        : ((_ = n(_, O.children || [])), (_.return = A), _);
    }
    function Y(A, _, O, G, I) {
      return _ === null || _.tag !== 7
        ? ((_ = Ba(O, A.mode, G, I)), (_.return = A), _)
        : ((_ = n(_, O)), (_.return = A), _);
    }
    function Q(A, _, O) {
      if (
        (typeof _ == "string" && _ !== "") ||
        typeof _ == "number" ||
        typeof _ == "bigint"
      )
        return (_ = vr("" + _, A.mode, O)), (_.return = A), _;
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case E:
            return (
              (O = vs(_.type, _.key, _.props, null, A.mode, O)),
              Sn(O, _),
              (O.return = A),
              O
            );
          case k:
            return (_ = jr(_, A.mode, O)), (_.return = A), _;
          case ie:
            var G = _._init;
            return (_ = G(_._payload)), Q(A, _, O);
        }
        if (xe(_) || ve(_))
          return (_ = Ba(_, A.mode, O, null)), (_.return = A), _;
        if (typeof _.then == "function") return Q(A, Ls(_), O);
        if (_.$$typeof === M) return Q(A, ws(A, _), O);
        Bs(A, _);
      }
      return null;
    }
    function L(A, _, O, G) {
      var I = _ !== null ? _.key : null;
      if (
        (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
      )
        return I !== null ? null : x(A, _, "" + O, G);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case E:
            return O.key === I ? v(A, _, O, G) : null;
          case k:
            return O.key === I ? z(A, _, O, G) : null;
          case ie:
            return (I = O._init), (O = I(O._payload)), L(A, _, O, G);
        }
        if (xe(O) || ve(O)) return I !== null ? null : Y(A, _, O, G, null);
        if (typeof O.then == "function") return L(A, _, Ls(O), G);
        if (O.$$typeof === M) return L(A, _, ws(A, O), G);
        Bs(A, O);
      }
      return null;
    }
    function B(A, _, O, G, I) {
      if (
        (typeof G == "string" && G !== "") ||
        typeof G == "number" ||
        typeof G == "bigint"
      )
        return (A = A.get(O) || null), x(_, A, "" + G, I);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case E:
            return (
              (A = A.get(G.key === null ? O : G.key) || null), v(_, A, G, I)
            );
          case k:
            return (
              (A = A.get(G.key === null ? O : G.key) || null), z(_, A, G, I)
            );
          case ie:
            var he = G._init;
            return (G = he(G._payload)), B(A, _, O, G, I);
        }
        if (xe(G) || ve(G)) return (A = A.get(O) || null), Y(_, A, G, I, null);
        if (typeof G.then == "function") return B(A, _, O, Ls(G), I);
        if (G.$$typeof === M) return B(A, _, O, ws(_, G), I);
        Bs(_, G);
      }
      return null;
    }
    function re(A, _, O, G) {
      for (
        var I = null, he = null, te = _, se = (_ = 0), Je = null;
        te !== null && se < O.length;
        se++
      ) {
        te.index > se ? ((Je = te), (te = null)) : (Je = te.sibling);
        var je = L(A, te, O[se], G);
        if (je === null) {
          te === null && (te = Je);
          break;
        }
        e && te && je.alternate === null && t(A, te),
          (_ = r(je, _, se)),
          he === null ? (I = je) : (he.sibling = je),
          (he = je),
          (te = Je);
      }
      if (se === O.length) return a(A, te), Ne && qa(A, se), I;
      if (te === null) {
        for (; se < O.length; se++)
          (te = Q(A, O[se], G)),
            te !== null &&
              ((_ = r(te, _, se)),
              he === null ? (I = te) : (he.sibling = te),
              (he = te));
        return Ne && qa(A, se), I;
      }
      for (te = l(te); se < O.length; se++)
        (Je = B(te, A, se, O[se], G)),
          Je !== null &&
            (e &&
              Je.alternate !== null &&
              te.delete(Je.key === null ? se : Je.key),
            (_ = r(Je, _, se)),
            he === null ? (I = Je) : (he.sibling = Je),
            (he = Je));
      return (
        e &&
          te.forEach(function (Ca) {
            return t(A, Ca);
          }),
        Ne && qa(A, se),
        I
      );
    }
    function ne(A, _, O, G) {
      if (O == null) throw Error(c(151));
      for (
        var I = null, he = null, te = _, se = (_ = 0), Je = null, je = O.next();
        te !== null && !je.done;
        se++, je = O.next()
      ) {
        te.index > se ? ((Je = te), (te = null)) : (Je = te.sibling);
        var Ca = L(A, te, je.value, G);
        if (Ca === null) {
          te === null && (te = Je);
          break;
        }
        e && te && Ca.alternate === null && t(A, te),
          (_ = r(Ca, _, se)),
          he === null ? (I = Ca) : (he.sibling = Ca),
          (he = Ca),
          (te = Je);
      }
      if (je.done) return a(A, te), Ne && qa(A, se), I;
      if (te === null) {
        for (; !je.done; se++, je = O.next())
          (je = Q(A, je.value, G)),
            je !== null &&
              ((_ = r(je, _, se)),
              he === null ? (I = je) : (he.sibling = je),
              (he = je));
        return Ne && qa(A, se), I;
      }
      for (te = l(te); !je.done; se++, je = O.next())
        (je = B(te, A, se, je.value, G)),
          je !== null &&
            (e &&
              je.alternate !== null &&
              te.delete(je.key === null ? se : je.key),
            (_ = r(je, _, se)),
            he === null ? (I = je) : (he.sibling = je),
            (he = je));
      return (
        e &&
          te.forEach(function (fp) {
            return t(A, fp);
          }),
        Ne && qa(A, se),
        I
      );
    }
    function Te(A, _, O, G) {
      if (
        (typeof O == "object" &&
          O !== null &&
          O.type === j &&
          O.key === null &&
          (O = O.props.children),
        typeof O == "object" && O !== null)
      ) {
        switch (O.$$typeof) {
          case E:
            e: {
              for (var I = O.key; _ !== null; ) {
                if (_.key === I) {
                  if (((I = O.type), I === j)) {
                    if (_.tag === 7) {
                      a(A, _.sibling),
                        (G = n(_, O.props.children)),
                        (G.return = A),
                        (A = G);
                      break e;
                    }
                  } else if (
                    _.elementType === I ||
                    (typeof I == "object" &&
                      I !== null &&
                      I.$$typeof === ie &&
                      kd(I) === _.type)
                  ) {
                    a(A, _.sibling),
                      (G = n(_, O.props)),
                      Sn(G, O),
                      (G.return = A),
                      (A = G);
                    break e;
                  }
                  a(A, _);
                  break;
                } else t(A, _);
                _ = _.sibling;
              }
              O.type === j
                ? ((G = Ba(O.props.children, A.mode, G, O.key)),
                  (G.return = A),
                  (A = G))
                : ((G = vs(O.type, O.key, O.props, null, A.mode, G)),
                  Sn(G, O),
                  (G.return = A),
                  (A = G));
            }
            return f(A);
          case k:
            e: {
              for (I = O.key; _ !== null; ) {
                if (_.key === I)
                  if (
                    _.tag === 4 &&
                    _.stateNode.containerInfo === O.containerInfo &&
                    _.stateNode.implementation === O.implementation
                  ) {
                    a(A, _.sibling),
                      (G = n(_, O.children || [])),
                      (G.return = A),
                      (A = G);
                    break e;
                  } else {
                    a(A, _);
                    break;
                  }
                else t(A, _);
                _ = _.sibling;
              }
              (G = jr(O, A.mode, G)), (G.return = A), (A = G);
            }
            return f(A);
          case ie:
            return (I = O._init), (O = I(O._payload)), Te(A, _, O, G);
        }
        if (xe(O)) return re(A, _, O, G);
        if (ve(O)) {
          if (((I = ve(O)), typeof I != "function")) throw Error(c(150));
          return (O = I.call(O)), ne(A, _, O, G);
        }
        if (typeof O.then == "function") return Te(A, _, Ls(O), G);
        if (O.$$typeof === M) return Te(A, _, ws(A, O), G);
        Bs(A, O);
      }
      return (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
        ? ((O = "" + O),
          _ !== null && _.tag === 6
            ? (a(A, _.sibling), (G = n(_, O)), (G.return = A), (A = G))
            : (a(A, _), (G = vr(O, A.mode, G)), (G.return = A), (A = G)),
          f(A))
        : a(A, _);
    }
    return function (A, _, O, G) {
      try {
        Nn = 0;
        var I = Te(A, _, O, G);
        return (El = null), I;
      } catch (te) {
        if (te === mn || te === _s) throw te;
        var he = mt(29, te, null, A.mode);
        return (he.lanes = G), (he.return = A), he;
      } finally {
      }
    };
  }
  var _l = Ud(!0),
    Ld = Ud(!1),
    Et = Z(null),
    Ut = null;
  function xa(e) {
    var t = e.alternate;
    K(Xe, Xe.current & 1),
      K(Et, e),
      Ut === null &&
        (t === null || jl.current !== null || t.memoizedState !== null) &&
        (Ut = e);
  }
  function Bd(e) {
    if (e.tag === 22) {
      if ((K(Xe, Xe.current), K(Et, e), Ut === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Ut = e);
      }
    } else pa();
  }
  function pa() {
    K(Xe, Xe.current), K(Et, Et.current);
  }
  function Ft(e) {
    D(Et), Ut === e && (Ut = null), D(Xe);
  }
  var Xe = Z(0);
  function Hs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (
          a !== null &&
          ((a = a.dehydrated), a === null || a.data === "$?" || Gu(a))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  function eu(e, t, a, l) {
    (t = e.memoizedState),
      (a = a(l, t)),
      (a = a == null ? t : b({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var tu = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var l = gt(),
        n = fa(l);
      (n.payload = t),
        a != null && (n.callback = a),
        (t = ma(e, n, l)),
        t !== null && (yt(t, e, l), xn(t, e, l));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var l = gt(),
        n = fa(l);
      (n.tag = 1),
        (n.payload = t),
        a != null && (n.callback = a),
        (t = ma(e, n, l)),
        t !== null && (yt(t, e, l), xn(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = gt(),
        l = fa(a);
      (l.tag = 2),
        t != null && (l.callback = t),
        (t = ma(e, l, a)),
        t !== null && (yt(t, e, a), xn(t, e, a));
    },
  };
  function Hd(e, t, a, l, n, r, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(l, r, f)
        : t.prototype && t.prototype.isPureReactComponent
        ? !nn(a, l) || !nn(n, r)
        : !0
    );
  }
  function qd(e, t, a, l) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(a, l),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(a, l),
      t.state !== e && tu.enqueueReplaceState(t, t.state, null);
  }
  function Ka(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t) l !== "ref" && (a[l] = t[l]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = b({}, a));
      for (var n in e) a[n] === void 0 && (a[n] = e[n]);
    }
    return a;
  }
  var qs =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Yd(e) {
    qs(e);
  }
  function Vd(e) {
    console.error(e);
  }
  function Gd(e) {
    qs(e);
  }
  function Ys(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Xd(e, t, a) {
    try {
      var l = e.onCaughtError;
      l(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function au(e, t, a) {
    return (
      (a = fa(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Ys(e, t);
      }),
      a
    );
  }
  function Qd(e) {
    return (e = fa(e)), (e.tag = 3), e;
  }
  function Zd(e, t, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var r = l.value;
      (e.payload = function () {
        return n(r);
      }),
        (e.callback = function () {
          Xd(t, a, l);
        });
    }
    var f = a.stateNode;
    f !== null &&
      typeof f.componentDidCatch == "function" &&
      (e.callback = function () {
        Xd(t, a, l),
          typeof n != "function" &&
            (Na === null ? (Na = new Set([this])) : Na.add(this));
        var x = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: x !== null ? x : "",
        });
      });
  }
  function fx(e, t, a, l, n) {
    if (
      ((a.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((t = a.alternate),
        t !== null && on(t, a, n, !0),
        (a = Et.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 13:
            return (
              Ut === null ? _u() : a.alternate === null && Le === 0 && (Le = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = n),
              l === Or
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([l])) : t.add(l),
                  Tu(e, l, n)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              l === Or
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([l])) : a.add(l)),
                  Tu(e, l, n)),
              !1
            );
        }
        throw Error(c(435, a.tag));
      }
      return Tu(e, l, n), _u(), !1;
    }
    if (Ne)
      return (
        (t = Et.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            l !== wr && ((e = Error(c(422), { cause: l })), cn(jt(e, a))))
          : (l !== wr && ((t = Error(c(423), { cause: l })), cn(jt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (l = jt(l, a)),
            (n = au(e.stateNode, l, n)),
            zr(e, n),
            Le !== 4 && (Le = 2)),
        !1
      );
    var r = Error(c(520), { cause: l });
    if (
      ((r = jt(r, a)),
      Cn === null ? (Cn = [r]) : Cn.push(r),
      Le !== 4 && (Le = 2),
      t === null)
    )
      return !0;
    (l = jt(l, a)), (a = t);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = n & -n),
            (a.lanes |= e),
            (e = au(a.stateNode, l, e)),
            zr(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (r = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (r !== null &&
                  typeof r.componentDidCatch == "function" &&
                  (Na === null || !Na.has(r)))))
          )
            return (
              (a.flags |= 65536),
              (n &= -n),
              (a.lanes |= n),
              (n = Qd(n)),
              Zd(n, e, a, l),
              zr(a, n),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Kd = Error(c(461)),
    Ze = !1;
  function $e(e, t, a, l) {
    t.child = e === null ? Ld(t, null, a, l) : _l(t, e.child, a, l);
  }
  function Jd(e, t, a, l, n) {
    a = a.render;
    var r = t.ref;
    if ("ref" in l) {
      var f = {};
      for (var x in l) x !== "ref" && (f[x] = l[x]);
    } else f = l;
    return (
      Xa(t),
      (l = Hr(e, t, a, f, r, n)),
      (x = qr()),
      e !== null && !Ze
        ? (Yr(e, t, n), Pt(e, t, n))
        : (Ne && x && Nr(t), (t.flags |= 1), $e(e, t, l, n), t.child)
    );
  }
  function $d(e, t, a, l, n) {
    if (e === null) {
      var r = a.type;
      return typeof r == "function" &&
        !br(r) &&
        r.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = r), Fd(e, t, r, l, n))
        : ((e = vs(a.type, null, l, t, t.mode, n)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((r = e.child), !ou(e, n))) {
      var f = r.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : nn), a(f, l) && e.ref === t.ref)
      )
        return Pt(e, t, n);
    }
    return (
      (t.flags |= 1),
      (e = Xt(r, l)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Fd(e, t, a, l, n) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (nn(r, l) && e.ref === t.ref)
        if (((Ze = !1), (t.pendingProps = l = r), ou(e, n)))
          (e.flags & 131072) !== 0 && (Ze = !0);
        else return (t.lanes = e.lanes), Pt(e, t, n);
    }
    return lu(e, t, a, l, n);
  }
  function Pd(e, t, a) {
    var l = t.pendingProps,
      n = l.children,
      r = e !== null ? e.memoizedState : null;
    if (l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((l = r !== null ? r.baseLanes | a : a), e !== null)) {
          for (n = t.child = e.child, r = 0; n !== null; )
            (r = r | n.lanes | n.childLanes), (n = n.sibling);
          t.childLanes = r & ~l;
        } else (t.childLanes = 0), (t.child = null);
        return Wd(e, t, l, a);
      }
      if ((a & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Es(t, r !== null ? r.cachePool : null),
          r !== null ? Fo(t, r) : Ur(),
          Bd(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          Wd(e, t, r !== null ? r.baseLanes | a : a, a)
        );
    } else
      r !== null
        ? (Es(t, r.cachePool), Fo(t, r), pa(), (t.memoizedState = null))
        : (e !== null && Es(t, null), Ur(), pa());
    return $e(e, t, n, a), t.child;
  }
  function Wd(e, t, a, l) {
    var n = Cr();
    return (
      (n = n === null ? null : { parent: Ge._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: a, cachePool: n }),
      e !== null && Es(t, null),
      Ur(),
      Bd(t),
      e !== null && on(e, t, l, !0),
      null
    );
  }
  function Vs(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(c(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function lu(e, t, a, l, n) {
    return (
      Xa(t),
      (a = Hr(e, t, a, l, void 0, n)),
      (l = qr()),
      e !== null && !Ze
        ? (Yr(e, t, n), Pt(e, t, n))
        : (Ne && l && Nr(t), (t.flags |= 1), $e(e, t, a, n), t.child)
    );
  }
  function Id(e, t, a, l, n, r) {
    return (
      Xa(t),
      (t.updateQueue = null),
      (a = Wo(t, l, a, n)),
      Po(e),
      (l = qr()),
      e !== null && !Ze
        ? (Yr(e, t, r), Pt(e, t, r))
        : (Ne && l && Nr(t), (t.flags |= 1), $e(e, t, a, r), t.child)
    );
  }
  function ef(e, t, a, l, n) {
    if ((Xa(t), t.stateNode === null)) {
      var r = pl,
        f = a.contextType;
      typeof f == "object" && f !== null && (r = Ie(f)),
        (r = new a(l, r)),
        (t.memoizedState =
          r.state !== null && r.state !== void 0 ? r.state : null),
        (r.updater = tu),
        (t.stateNode = r),
        (r._reactInternals = t),
        (r = t.stateNode),
        (r.props = l),
        (r.state = t.memoizedState),
        (r.refs = {}),
        Mr(t),
        (f = a.contextType),
        (r.context = typeof f == "object" && f !== null ? Ie(f) : pl),
        (r.state = t.memoizedState),
        (f = a.getDerivedStateFromProps),
        typeof f == "function" && (eu(t, a, f, l), (r.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function" ||
          (typeof r.UNSAFE_componentWillMount != "function" &&
            typeof r.componentWillMount != "function") ||
          ((f = r.state),
          typeof r.componentWillMount == "function" && r.componentWillMount(),
          typeof r.UNSAFE_componentWillMount == "function" &&
            r.UNSAFE_componentWillMount(),
          f !== r.state && tu.enqueueReplaceState(r, r.state, null),
          gn(t, l, r, n),
          pn(),
          (r.state = t.memoizedState)),
        typeof r.componentDidMount == "function" && (t.flags |= 4194308),
        (l = !0);
    } else if (e === null) {
      r = t.stateNode;
      var x = t.memoizedProps,
        v = Ka(a, x);
      r.props = v;
      var z = r.context,
        Y = a.contextType;
      (f = pl), typeof Y == "object" && Y !== null && (f = Ie(Y));
      var Q = a.getDerivedStateFromProps;
      (Y =
        typeof Q == "function" ||
        typeof r.getSnapshotBeforeUpdate == "function"),
        (x = t.pendingProps !== x),
        Y ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((x || z !== f) && qd(t, r, l, f)),
        (da = !1);
      var L = t.memoizedState;
      (r.state = L),
        gn(t, l, r, n),
        pn(),
        (z = t.memoizedState),
        x || L !== z || da
          ? (typeof Q == "function" && (eu(t, a, Q, l), (z = t.memoizedState)),
            (v = da || Hd(t, a, v, l, L, z, f))
              ? (Y ||
                  (typeof r.UNSAFE_componentWillMount != "function" &&
                    typeof r.componentWillMount != "function") ||
                  (typeof r.componentWillMount == "function" &&
                    r.componentWillMount(),
                  typeof r.UNSAFE_componentWillMount == "function" &&
                    r.UNSAFE_componentWillMount()),
                typeof r.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof r.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = l),
                (t.memoizedState = z)),
            (r.props = l),
            (r.state = z),
            (r.context = f),
            (l = v))
          : (typeof r.componentDidMount == "function" && (t.flags |= 4194308),
            (l = !1));
    } else {
      (r = t.stateNode),
        Dr(e, t),
        (f = t.memoizedProps),
        (Y = Ka(a, f)),
        (r.props = Y),
        (Q = t.pendingProps),
        (L = r.context),
        (z = a.contextType),
        (v = pl),
        typeof z == "object" && z !== null && (v = Ie(z)),
        (x = a.getDerivedStateFromProps),
        (z =
          typeof x == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function") ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((f !== Q || L !== v) && qd(t, r, l, v)),
        (da = !1),
        (L = t.memoizedState),
        (r.state = L),
        gn(t, l, r, n),
        pn();
      var B = t.memoizedState;
      f !== Q ||
      L !== B ||
      da ||
      (e !== null && e.dependencies !== null && Ss(e.dependencies))
        ? (typeof x == "function" && (eu(t, a, x, l), (B = t.memoizedState)),
          (Y =
            da ||
            Hd(t, a, Y, l, L, B, v) ||
            (e !== null && e.dependencies !== null && Ss(e.dependencies)))
            ? (z ||
                (typeof r.UNSAFE_componentWillUpdate != "function" &&
                  typeof r.componentWillUpdate != "function") ||
                (typeof r.componentWillUpdate == "function" &&
                  r.componentWillUpdate(l, B, v),
                typeof r.UNSAFE_componentWillUpdate == "function" &&
                  r.UNSAFE_componentWillUpdate(l, B, v)),
              typeof r.componentDidUpdate == "function" && (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof r.componentDidUpdate != "function" ||
                (f === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 4),
              typeof r.getSnapshotBeforeUpdate != "function" ||
                (f === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = l),
              (t.memoizedState = B)),
          (r.props = l),
          (r.state = B),
          (r.context = v),
          (l = Y))
        : (typeof r.componentDidUpdate != "function" ||
            (f === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 4),
          typeof r.getSnapshotBeforeUpdate != "function" ||
            (f === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 1024),
          (l = !1));
    }
    return (
      (r = l),
      Vs(e, t),
      (l = (t.flags & 128) !== 0),
      r || l
        ? ((r = t.stateNode),
          (a =
            l && typeof a.getDerivedStateFromError != "function"
              ? null
              : r.render()),
          (t.flags |= 1),
          e !== null && l
            ? ((t.child = _l(t, e.child, null, n)),
              (t.child = _l(t, null, a, n)))
            : $e(e, t, a, n),
          (t.memoizedState = r.state),
          (e = t.child))
        : (e = Pt(e, t, n)),
      e
    );
  }
  function tf(e, t, a, l) {
    return un(), (t.flags |= 256), $e(e, t, a, l), t.child;
  }
  var nu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function su(e) {
    return { baseLanes: e, cachePool: Vo() };
  }
  function iu(e, t, a) {
    return (e = e !== null ? e.childLanes & ~a : 0), t && (e |= _t), e;
  }
  function af(e, t, a) {
    var l = t.pendingProps,
      n = !1,
      r = (t.flags & 128) !== 0,
      f;
    if (
      ((f = r) ||
        (f =
          e !== null && e.memoizedState === null ? !1 : (Xe.current & 2) !== 0),
      f && ((n = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ne) {
        if ((n ? xa(t) : pa(), Ne)) {
          var x = Ue,
            v;
          if ((v = x)) {
            e: {
              for (v = x, x = kt; v.nodeType !== 8; ) {
                if (!x) {
                  x = null;
                  break e;
                }
                if (((v = Ct(v.nextSibling)), v === null)) {
                  x = null;
                  break e;
                }
              }
              x = v;
            }
            x !== null
              ? ((t.memoizedState = {
                  dehydrated: x,
                  treeContext: Ha !== null ? { id: Qt, overflow: Zt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (v = mt(18, null, null, 0)),
                (v.stateNode = x),
                (v.return = t),
                (t.child = v),
                (at = t),
                (Ue = null),
                (v = !0))
              : (v = !1);
          }
          v || Va(t);
        }
        if (
          ((x = t.memoizedState),
          x !== null && ((x = x.dehydrated), x !== null))
        )
          return Gu(x) ? (t.lanes = 32) : (t.lanes = 536870912), null;
        Ft(t);
      }
      return (
        (x = l.children),
        (l = l.fallback),
        n
          ? (pa(),
            (n = t.mode),
            (x = Gs({ mode: "hidden", children: x }, n)),
            (l = Ba(l, n, a, null)),
            (x.return = t),
            (l.return = t),
            (x.sibling = l),
            (t.child = x),
            (n = t.child),
            (n.memoizedState = su(a)),
            (n.childLanes = iu(e, f, a)),
            (t.memoizedState = nu),
            l)
          : (xa(t), ru(t, x))
      );
    }
    if (
      ((v = e.memoizedState), v !== null && ((x = v.dehydrated), x !== null))
    ) {
      if (r)
        t.flags & 256
          ? (xa(t), (t.flags &= -257), (t = uu(e, t, a)))
          : t.memoizedState !== null
          ? (pa(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (pa(),
            (n = l.fallback),
            (x = t.mode),
            (l = Gs({ mode: "visible", children: l.children }, x)),
            (n = Ba(n, x, a, null)),
            (n.flags |= 2),
            (l.return = t),
            (n.return = t),
            (l.sibling = n),
            (t.child = l),
            _l(t, e.child, null, a),
            (l = t.child),
            (l.memoizedState = su(a)),
            (l.childLanes = iu(e, f, a)),
            (t.memoizedState = nu),
            (t = n));
      else if ((xa(t), Gu(x))) {
        if (((f = x.nextSibling && x.nextSibling.dataset), f)) var z = f.dgst;
        (f = z),
          (l = Error(c(419))),
          (l.stack = ""),
          (l.digest = f),
          cn({ value: l, source: null, stack: null }),
          (t = uu(e, t, a));
      } else if (
        (Ze || on(e, t, a, !1), (f = (a & e.childLanes) !== 0), Ze || f)
      ) {
        if (
          ((f = Oe),
          f !== null &&
            ((l = a & -a),
            (l = (l & 42) !== 0 ? 1 : Xi(l)),
            (l = (l & (f.suspendedLanes | a)) !== 0 ? 0 : l),
            l !== 0 && l !== v.retryLane))
        )
          throw ((v.retryLane = l), xl(e, l), yt(f, e, l), Kd);
        x.data === "$?" || _u(), (t = uu(e, t, a));
      } else
        x.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = v.treeContext),
            (Ue = Ct(x.nextSibling)),
            (at = t),
            (Ne = !0),
            (Ya = null),
            (kt = !1),
            e !== null &&
              ((St[wt++] = Qt),
              (St[wt++] = Zt),
              (St[wt++] = Ha),
              (Qt = e.id),
              (Zt = e.overflow),
              (Ha = t)),
            (t = ru(t, l.children)),
            (t.flags |= 4096));
      return t;
    }
    return n
      ? (pa(),
        (n = l.fallback),
        (x = t.mode),
        (v = e.child),
        (z = v.sibling),
        (l = Xt(v, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = v.subtreeFlags & 65011712),
        z !== null ? (n = Xt(z, n)) : ((n = Ba(n, x, a, null)), (n.flags |= 2)),
        (n.return = t),
        (l.return = t),
        (l.sibling = n),
        (t.child = l),
        (l = n),
        (n = t.child),
        (x = e.child.memoizedState),
        x === null
          ? (x = su(a))
          : ((v = x.cachePool),
            v !== null
              ? ((z = Ge._currentValue),
                (v = v.parent !== z ? { parent: z, pool: z } : v))
              : (v = Vo()),
            (x = { baseLanes: x.baseLanes | a, cachePool: v })),
        (n.memoizedState = x),
        (n.childLanes = iu(e, f, a)),
        (t.memoizedState = nu),
        l)
      : (xa(t),
        (a = e.child),
        (e = a.sibling),
        (a = Xt(a, { mode: "visible", children: l.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((f = t.deletions),
          f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function ru(e, t) {
    return (
      (t = Gs({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Gs(e, t) {
    return (
      (e = mt(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function uu(e, t, a) {
    return (
      _l(t, e.child, null, a),
      (e = ru(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function lf(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), _r(e.return, t, a);
  }
  function cu(e, t, a, l, n) {
    var r = e.memoizedState;
    r === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: a,
          tailMode: n,
        })
      : ((r.isBackwards = t),
        (r.rendering = null),
        (r.renderingStartTime = 0),
        (r.last = l),
        (r.tail = a),
        (r.tailMode = n));
  }
  function nf(e, t, a) {
    var l = t.pendingProps,
      n = l.revealOrder,
      r = l.tail;
    if (($e(e, t, l.children, a), (l = Xe.current), (l & 2) !== 0))
      (l = (l & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && lf(e, a, t);
          else if (e.tag === 19) lf(e, a, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      l &= 1;
    }
    switch ((K(Xe, l), n)) {
      case "forwards":
        for (a = t.child, n = null; a !== null; )
          (e = a.alternate),
            e !== null && Hs(e) === null && (n = a),
            (a = a.sibling);
        (a = n),
          a === null
            ? ((n = t.child), (t.child = null))
            : ((n = a.sibling), (a.sibling = null)),
          cu(t, !1, n, a, r);
        break;
      case "backwards":
        for (a = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && Hs(e) === null)) {
            t.child = n;
            break;
          }
          (e = n.sibling), (n.sibling = a), (a = n), (n = e);
        }
        cu(t, !0, a, null, r);
        break;
      case "together":
        cu(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Pt(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (ja |= t.lanes),
      (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((on(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(c(153));
    if (t.child !== null) {
      for (
        e = t.child, a = Xt(e, e.pendingProps), t.child = a, a.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (a = a.sibling = Xt(e, e.pendingProps)),
          (a.return = t);
      a.sibling = null;
    }
    return t.child;
  }
  function ou(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && Ss(e)));
  }
  function mx(e, t, a) {
    switch (t.tag) {
      case 3:
        Se(t, t.stateNode.containerInfo),
          oa(t, Ge, e.memoizedState.cache),
          un();
        break;
      case 27:
      case 5:
        Hi(t);
        break;
      case 4:
        Se(t, t.stateNode.containerInfo);
        break;
      case 10:
        oa(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (xa(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
            ? af(e, t, a)
            : (xa(t), (e = Pt(e, t, a)), e !== null ? e.sibling : null);
        xa(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (
          ((l = (a & t.childLanes) !== 0),
          l || (on(e, t, a, !1), (l = (a & t.childLanes) !== 0)),
          n)
        ) {
          if (l) return nf(e, t, a);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null &&
            ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          K(Xe, Xe.current),
          l)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), Pd(e, t, a);
      case 24:
        oa(t, Ge, e.memoizedState.cache);
    }
    return Pt(e, t, a);
  }
  function sf(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Ze = !0;
      else {
        if (!ou(e, a) && (t.flags & 128) === 0) return (Ze = !1), mx(e, t, a);
        Ze = (e.flags & 131072) !== 0;
      }
    else (Ze = !1), Ne && (t.flags & 1048576) !== 0 && ko(t, Ns, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var l = t.elementType,
            n = l._init;
          if (((l = n(l._payload)), (t.type = l), typeof l == "function"))
            br(l)
              ? ((e = Ka(l, e)), (t.tag = 1), (t = ef(null, t, l, e, a)))
              : ((t.tag = 0), (t = lu(null, t, l, e, a)));
          else {
            if (l != null) {
              if (((n = l.$$typeof), n === J)) {
                (t.tag = 11), (t = Jd(null, t, l, e, a));
                break e;
              } else if (n === ee) {
                (t.tag = 14), (t = $d(null, t, l, e, a));
                break e;
              }
            }
            throw ((t = ce(l) || l), Error(c(306, t, "")));
          }
        }
        return t;
      case 0:
        return lu(e, t, t.type, t.pendingProps, a);
      case 1:
        return (l = t.type), (n = Ka(l, t.pendingProps)), ef(e, t, l, n, a);
      case 3:
        e: {
          if ((Se(t, t.stateNode.containerInfo), e === null))
            throw Error(c(387));
          l = t.pendingProps;
          var r = t.memoizedState;
          (n = r.element), Dr(e, t), gn(t, l, null, a);
          var f = t.memoizedState;
          if (
            ((l = f.cache),
            oa(t, Ge, l),
            l !== r.cache && Ar(t, [Ge], a, !0),
            pn(),
            (l = f.element),
            r.isDehydrated)
          )
            if (
              ((r = { element: l, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = r),
              (t.memoizedState = r),
              t.flags & 256)
            ) {
              t = tf(e, t, l, a);
              break e;
            } else if (l !== n) {
              (n = jt(Error(c(424)), t)), cn(n), (t = tf(e, t, l, a));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                Ue = Ct(e.firstChild),
                  at = t,
                  Ne = !0,
                  Ya = null,
                  kt = !0,
                  a = Ld(t, null, l, a),
                  t.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
            }
          else {
            if ((un(), l === n)) {
              t = Pt(e, t, a);
              break e;
            }
            $e(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Vs(e, t),
          e === null
            ? (a = om(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Ne ||
                ((a = t.type),
                (e = t.pendingProps),
                (l = li(le.current).createElement(a)),
                (l[We] = t),
                (l[lt] = e),
                Pe(l, a, e),
                Qe(l),
                (t.stateNode = l))
            : (t.memoizedState = om(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Hi(t),
          e === null &&
            Ne &&
            ((l = t.stateNode = rm(t.type, t.pendingProps, le.current)),
            (at = t),
            (kt = !0),
            (n = Ue),
            Ea(t.type) ? ((Xu = n), (Ue = Ct(l.firstChild))) : (Ue = n)),
          $e(e, t, t.pendingProps.children, a),
          Vs(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ne &&
            ((n = l = Ue) &&
              ((l = Yx(l, t.type, t.pendingProps, kt)),
              l !== null
                ? ((t.stateNode = l),
                  (at = t),
                  (Ue = Ct(l.firstChild)),
                  (kt = !1),
                  (n = !0))
                : (n = !1)),
            n || Va(t)),
          Hi(t),
          (n = t.type),
          (r = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (l = r.children),
          qu(n, r) ? (l = null) : f !== null && qu(n, f) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((n = Hr(e, t, sx, null, null, a)), (Hn._currentValue = n)),
          Vs(e, t),
          $e(e, t, l, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ne &&
            ((e = a = Ue) &&
              ((a = Vx(a, t.pendingProps, kt)),
              a !== null
                ? ((t.stateNode = a), (at = t), (Ue = null), (e = !0))
                : (e = !1)),
            e || Va(t)),
          null
        );
      case 13:
        return af(e, t, a);
      case 4:
        return (
          Se(t, t.stateNode.containerInfo),
          (l = t.pendingProps),
          e === null ? (t.child = _l(t, null, l, a)) : $e(e, t, l, a),
          t.child
        );
      case 11:
        return Jd(e, t, t.type, t.pendingProps, a);
      case 7:
        return $e(e, t, t.pendingProps, a), t.child;
      case 8:
        return $e(e, t, t.pendingProps.children, a), t.child;
      case 12:
        return $e(e, t, t.pendingProps.children, a), t.child;
      case 10:
        return (
          (l = t.pendingProps),
          oa(t, t.type, l.value),
          $e(e, t, l.children, a),
          t.child
        );
      case 9:
        return (
          (n = t.type._context),
          (l = t.pendingProps.children),
          Xa(t),
          (n = Ie(n)),
          (l = l(n)),
          (t.flags |= 1),
          $e(e, t, l, a),
          t.child
        );
      case 14:
        return $d(e, t, t.type, t.pendingProps, a);
      case 15:
        return Fd(e, t, t.type, t.pendingProps, a);
      case 19:
        return nf(e, t, a);
      case 31:
        return (
          (l = t.pendingProps),
          (a = t.mode),
          (l = { mode: l.mode, children: l.children }),
          e === null
            ? ((a = Gs(l, a)),
              (a.ref = t.ref),
              (t.child = a),
              (a.return = t),
              (t = a))
            : ((a = Xt(e.child, l)),
              (a.ref = t.ref),
              (t.child = a),
              (a.return = t),
              (t = a)),
          t
        );
      case 22:
        return Pd(e, t, a);
      case 24:
        return (
          Xa(t),
          (l = Ie(Ge)),
          e === null
            ? ((n = Cr()),
              n === null &&
                ((n = Oe),
                (r = Tr()),
                (n.pooledCache = r),
                r.refCount++,
                r !== null && (n.pooledCacheLanes |= a),
                (n = r)),
              (t.memoizedState = { parent: l, cache: n }),
              Mr(t),
              oa(t, Ge, n))
            : ((e.lanes & a) !== 0 && (Dr(e, t), gn(t, null, null, a), pn()),
              (n = e.memoizedState),
              (r = t.memoizedState),
              n.parent !== l
                ? ((n = { parent: l, cache: l }),
                  (t.memoizedState = n),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = n),
                  oa(t, Ge, l))
                : ((l = r.cache),
                  oa(t, Ge, l),
                  l !== n.cache && Ar(t, [Ge], a, !0))),
          $e(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function Wt(e) {
    e.flags |= 4;
  }
  function rf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !xm(t))) {
      if (
        ((t = Et.current),
        t !== null &&
          ((be & 4194048) === be
            ? Ut !== null
            : ((be & 62914560) !== be && (be & 536870912) === 0) || t !== Ut))
      )
        throw ((hn = Or), Go);
      e.flags |= 8192;
    }
  }
  function Xs(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Lc() : 536870912), (e.lanes |= t), (Cl |= t));
  }
  function wn(e, t) {
    if (!Ne)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), (t = t.sibling);
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = e.tail;
          for (var l = null; a !== null; )
            a.alternate !== null && (l = a), (a = a.sibling);
          l === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function ke(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      l = 0;
    if (t)
      for (var n = e.child; n !== null; )
        (a |= n.lanes | n.childLanes),
          (l |= n.subtreeFlags & 65011712),
          (l |= n.flags & 65011712),
          (n.return = e),
          (n = n.sibling);
    else
      for (n = e.child; n !== null; )
        (a |= n.lanes | n.childLanes),
          (l |= n.subtreeFlags),
          (l |= n.flags),
          (n.return = e),
          (n = n.sibling);
    return (e.subtreeFlags |= l), (e.childLanes = a), t;
  }
  function hx(e, t, a) {
    var l = t.pendingProps;
    switch ((Sr(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ke(t), null;
      case 1:
        return ke(t), null;
      case 3:
        return (
          (a = t.stateNode),
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Jt(Ge),
          ia(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (rn(t)
              ? Wt(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Bo())),
          ke(t),
          null
        );
      case 26:
        return (
          (a = t.memoizedState),
          e === null
            ? (Wt(t),
              a !== null ? (ke(t), rf(t, a)) : (ke(t), (t.flags &= -16777217)))
            : a
            ? a !== e.memoizedState
              ? (Wt(t), ke(t), rf(t, a))
              : (ke(t), (t.flags &= -16777217))
            : (e.memoizedProps !== l && Wt(t), ke(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        ts(t), (a = le.current);
        var n = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== l && Wt(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(c(166));
            return ke(t), null;
          }
          (e = P.current),
            rn(t) ? Uo(t) : ((e = rm(n, l, a)), (t.stateNode = e), Wt(t));
        }
        return ke(t), null;
      case 5:
        if ((ts(t), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && Wt(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(c(166));
            return ke(t), null;
          }
          if (((e = P.current), rn(t))) Uo(t);
          else {
            switch (((n = li(le.current)), e)) {
              case 1:
                e = n.createElementNS("http://www.w3.org/2000/svg", a);
                break;
              case 2:
                e = n.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                break;
              default:
                switch (a) {
                  case "svg":
                    e = n.createElementNS("http://www.w3.org/2000/svg", a);
                    break;
                  case "math":
                    e = n.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    (e = n.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case "select":
                    (e =
                      typeof l.is == "string"
                        ? n.createElement("select", { is: l.is })
                        : n.createElement("select")),
                      l.multiple
                        ? (e.multiple = !0)
                        : l.size && (e.size = l.size);
                    break;
                  default:
                    e =
                      typeof l.is == "string"
                        ? n.createElement(a, { is: l.is })
                        : n.createElement(a);
                }
            }
            (e[We] = t), (e[lt] = l);
            e: for (n = t.child; n !== null; ) {
              if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
              else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
                (n.child.return = n), (n = n.child);
                continue;
              }
              if (n === t) break e;
              for (; n.sibling === null; ) {
                if (n.return === null || n.return === t) break e;
                n = n.return;
              }
              (n.sibling.return = n.return), (n = n.sibling);
            }
            t.stateNode = e;
            e: switch ((Pe(e, a, l), a)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!l.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Wt(t);
          }
        }
        return ke(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== l && Wt(t);
        else {
          if (typeof l != "string" && t.stateNode === null) throw Error(c(166));
          if (((e = le.current), rn(t))) {
            if (
              ((e = t.stateNode),
              (a = t.memoizedProps),
              (l = null),
              (n = at),
              n !== null)
            )
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            (e[We] = t),
              (e = !!(
                e.nodeValue === a ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                em(e.nodeValue, a)
              )),
              e || Va(t);
          } else (e = li(e).createTextNode(l)), (e[We] = t), (t.stateNode = e);
        }
        return ke(t), null;
      case 13:
        if (
          ((l = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = rn(t)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(c(318));
              if (
                ((n = t.memoizedState),
                (n = n !== null ? n.dehydrated : null),
                !n)
              )
                throw Error(c(317));
              n[We] = t;
            } else
              un(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            ke(t), (n = !1);
          } else
            (n = Bo()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (n = !0);
          if (!n) return t.flags & 256 ? (Ft(t), t) : (Ft(t), null);
        }
        if ((Ft(t), (t.flags & 128) !== 0)) return (t.lanes = a), t;
        if (
          ((a = l !== null), (e = e !== null && e.memoizedState !== null), a)
        ) {
          (l = t.child),
            (n = null),
            l.alternate !== null &&
              l.alternate.memoizedState !== null &&
              l.alternate.memoizedState.cachePool !== null &&
              (n = l.alternate.memoizedState.cachePool.pool);
          var r = null;
          l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (r = l.memoizedState.cachePool.pool),
            r !== n && (l.flags |= 2048);
        }
        return (
          a !== e && a && (t.child.flags |= 8192),
          Xs(t, t.updateQueue),
          ke(t),
          null
        );
      case 4:
        return ia(), e === null && ku(t.stateNode.containerInfo), ke(t), null;
      case 10:
        return Jt(t.type), ke(t), null;
      case 19:
        if ((D(Xe), (n = t.memoizedState), n === null)) return ke(t), null;
        if (((l = (t.flags & 128) !== 0), (r = n.rendering), r === null))
          if (l) wn(n, !1);
          else {
            if (Le !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((r = Hs(e)), r !== null)) {
                  for (
                    t.flags |= 128,
                      wn(n, !1),
                      e = r.updateQueue,
                      t.updateQueue = e,
                      Xs(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;

                  )
                    zo(a, e), (a = a.sibling);
                  return K(Xe, (Xe.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            n.tail !== null &&
              zt() > Ks &&
              ((t.flags |= 128), (l = !0), wn(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!l)
            if (((e = Hs(r)), e !== null)) {
              if (
                ((t.flags |= 128),
                (l = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Xs(t, e),
                wn(n, !0),
                n.tail === null &&
                  n.tailMode === "hidden" &&
                  !r.alternate &&
                  !Ne)
              )
                return ke(t), null;
            } else
              2 * zt() - n.renderingStartTime > Ks &&
                a !== 536870912 &&
                ((t.flags |= 128), (l = !0), wn(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((r.sibling = t.child), (t.child = r))
            : ((e = n.last),
              e !== null ? (e.sibling = r) : (t.child = r),
              (n.last = r));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = zt()),
            (t.sibling = null),
            (e = Xe.current),
            K(Xe, l ? (e & 1) | 2 : e & 1),
            t)
          : (ke(t), null);
      case 22:
      case 23:
        return (
          Ft(t),
          Lr(),
          (l = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== l && (t.flags |= 8192)
            : l && (t.flags |= 8192),
          l
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : ke(t),
          (a = t.updateQueue),
          a !== null && Xs(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (l = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          l !== a && (t.flags |= 2048),
          e !== null && D(Qa),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Jt(Ge),
          ke(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function xx(e, t) {
    switch ((Sr(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Jt(Ge),
          ia(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return ts(t), null;
      case 13:
        if (
          (Ft(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(c(340));
          un();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return D(Xe), null;
      case 4:
        return ia(), null;
      case 10:
        return Jt(t.type), null;
      case 22:
      case 23:
        return (
          Ft(t),
          Lr(),
          e !== null && D(Qa),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return Jt(Ge), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function uf(e, t) {
    switch ((Sr(t), t.tag)) {
      case 3:
        Jt(Ge), ia();
        break;
      case 26:
      case 27:
      case 5:
        ts(t);
        break;
      case 4:
        ia();
        break;
      case 13:
        Ft(t);
        break;
      case 19:
        D(Xe);
        break;
      case 10:
        Jt(t.type);
        break;
      case 22:
      case 23:
        Ft(t), Lr(), e !== null && D(Qa);
        break;
      case 24:
        Jt(Ge);
    }
  }
  function En(e, t) {
    try {
      var a = t.updateQueue,
        l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        a = n;
        do {
          if ((a.tag & e) === e) {
            l = void 0;
            var r = a.create,
              f = a.inst;
            (l = r()), (f.destroy = l);
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (x) {
      Ce(t, t.return, x);
    }
  }
  function ga(e, t, a) {
    try {
      var l = t.updateQueue,
        n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var r = n.next;
        l = r;
        do {
          if ((l.tag & e) === e) {
            var f = l.inst,
              x = f.destroy;
            if (x !== void 0) {
              (f.destroy = void 0), (n = t);
              var v = a,
                z = x;
              try {
                z();
              } catch (Y) {
                Ce(n, v, Y);
              }
            }
          }
          l = l.next;
        } while (l !== r);
      }
    } catch (Y) {
      Ce(t, t.return, Y);
    }
  }
  function cf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        $o(t, a);
      } catch (l) {
        Ce(e, e.return, l);
      }
    }
  }
  function of(e, t, a) {
    (a.props = Ka(e.type, e.memoizedProps)), (a.state = e.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (l) {
      Ce(e, t, l);
    }
  }
  function _n(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof a == "function" ? (e.refCleanup = a(l)) : (a.current = l);
      }
    } catch (n) {
      Ce(e, t, n);
    }
  }
  function Lt(e, t) {
    var a = e.ref,
      l = e.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (n) {
          Ce(e, t, n);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (n) {
          Ce(e, t, n);
        }
      else a.current = null;
  }
  function df(e) {
    var t = e.type,
      a = e.memoizedProps,
      l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && l.focus();
          break e;
        case "img":
          a.src ? (l.src = a.src) : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (n) {
      Ce(e, e.return, n);
    }
  }
  function du(e, t, a) {
    try {
      var l = e.stateNode;
      Ux(l, e.type, a, t), (l[lt] = t);
    } catch (n) {
      Ce(e, e.return, n);
    }
  }
  function ff(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Ea(e.type)) ||
      e.tag === 4
    );
  }
  function fu(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || ff(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && Ea(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function mu(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      (e = e.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
              ? a.ownerDocument.body
              : a
            ).insertBefore(e, t)
          : ((t =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a),
            t.appendChild(e),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = ai));
    else if (
      l !== 4 &&
      (l === 27 && Ea(e.type) && ((a = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (mu(e, t, a), e = e.sibling; e !== null; )
        mu(e, t, a), (e = e.sibling);
  }
  function Qs(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      (e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (
      l !== 4 &&
      (l === 27 && Ea(e.type) && (a = e.stateNode), (e = e.child), e !== null)
    )
      for (Qs(e, t, a), e = e.sibling; e !== null; )
        Qs(e, t, a), (e = e.sibling);
  }
  function mf(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      Pe(t, l, a), (t[We] = e), (t[lt] = a);
    } catch (r) {
      Ce(e, e.return, r);
    }
  }
  var It = !1,
    qe = !1,
    hu = !1,
    hf = typeof WeakSet == "function" ? WeakSet : Set,
    Ke = null;
  function px(e, t) {
    if (((e = e.containerInfo), (Bu = ci), (e = wo(e)), fr(e))) {
      if ("selectionStart" in e)
        var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var l = a.getSelection && a.getSelection();
          if (l && l.rangeCount !== 0) {
            a = l.anchorNode;
            var n = l.anchorOffset,
              r = l.focusNode;
            l = l.focusOffset;
            try {
              a.nodeType, r.nodeType;
            } catch {
              a = null;
              break e;
            }
            var f = 0,
              x = -1,
              v = -1,
              z = 0,
              Y = 0,
              Q = e,
              L = null;
            t: for (;;) {
              for (
                var B;
                Q !== a || (n !== 0 && Q.nodeType !== 3) || (x = f + n),
                  Q !== r || (l !== 0 && Q.nodeType !== 3) || (v = f + l),
                  Q.nodeType === 3 && (f += Q.nodeValue.length),
                  (B = Q.firstChild) !== null;

              )
                (L = Q), (Q = B);
              for (;;) {
                if (Q === e) break t;
                if (
                  (L === a && ++z === n && (x = f),
                  L === r && ++Y === l && (v = f),
                  (B = Q.nextSibling) !== null)
                )
                  break;
                (Q = L), (L = Q.parentNode);
              }
              Q = B;
            }
            a = x === -1 || v === -1 ? null : { start: x, end: v };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      Hu = { focusedElem: e, selectionRange: a }, ci = !1, Ke = t;
      Ke !== null;

    )
      if (
        ((t = Ke), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        (e.return = t), (Ke = e);
      else
        for (; Ke !== null; ) {
          switch (((t = Ke), (r = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && r !== null) {
                (e = void 0),
                  (a = t),
                  (n = r.memoizedProps),
                  (r = r.memoizedState),
                  (l = a.stateNode);
                try {
                  var re = Ka(a.type, n, a.elementType === a.type);
                  (e = l.getSnapshotBeforeUpdate(re, r)),
                    (l.__reactInternalSnapshotBeforeUpdate = e);
                } catch (ne) {
                  Ce(a, a.return, ne);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)
                )
                  Vu(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Vu(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(c(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (Ke = e);
            break;
          }
          Ke = t.return;
        }
  }
  function xf(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        ya(e, a), l & 4 && En(5, a);
        break;
      case 1:
        if ((ya(e, a), l & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              Ce(a, a.return, f);
            }
          else {
            var n = Ka(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Ce(a, a.return, f);
            }
          }
        l & 64 && cf(a), l & 512 && _n(a, a.return);
        break;
      case 3:
        if ((ya(e, a), l & 64 && ((e = a.updateQueue), e !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            $o(e, t);
          } catch (f) {
            Ce(a, a.return, f);
          }
        }
        break;
      case 27:
        t === null && l & 4 && mf(a);
      case 26:
      case 5:
        ya(e, a), t === null && l & 4 && df(a), l & 512 && _n(a, a.return);
        break;
      case 12:
        ya(e, a);
        break;
      case 13:
        ya(e, a),
          l & 4 && yf(e, a),
          l & 64 &&
            ((e = a.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((a = Ex.bind(null, a)), Gx(e, a))));
        break;
      case 22:
        if (((l = a.memoizedState !== null || It), !l)) {
          (t = (t !== null && t.memoizedState !== null) || qe), (n = It);
          var r = qe;
          (It = l),
            (qe = t) && !r ? ba(e, a, (a.subtreeFlags & 8772) !== 0) : ya(e, a),
            (It = n),
            (qe = r);
        }
        break;
      case 30:
        break;
      default:
        ya(e, a);
    }
  }
  function pf(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), pf(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ki(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var De = null,
    it = !1;
  function ea(e, t, a) {
    for (a = a.child; a !== null; ) gf(e, t, a), (a = a.sibling);
  }
  function gf(e, t, a) {
    if (ot && typeof ot.onCommitFiberUnmount == "function")
      try {
        ot.onCommitFiberUnmount(Zl, a);
      } catch {}
    switch (a.tag) {
      case 26:
        qe || Lt(a, t),
          ea(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        qe || Lt(a, t);
        var l = De,
          n = it;
        Ea(a.type) && ((De = a.stateNode), (it = !1)),
          ea(e, t, a),
          kn(a.stateNode),
          (De = l),
          (it = n);
        break;
      case 5:
        qe || Lt(a, t);
      case 6:
        if (
          ((l = De),
          (n = it),
          (De = null),
          ea(e, t, a),
          (De = l),
          (it = n),
          De !== null)
        )
          if (it)
            try {
              (De.nodeType === 9
                ? De.body
                : De.nodeName === "HTML"
                ? De.ownerDocument.body
                : De
              ).removeChild(a.stateNode);
            } catch (r) {
              Ce(a, t, r);
            }
          else
            try {
              De.removeChild(a.stateNode);
            } catch (r) {
              Ce(a, t, r);
            }
        break;
      case 18:
        De !== null &&
          (it
            ? ((e = De),
              sm(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
                a.stateNode
              ),
              Gn(e))
            : sm(De, a.stateNode));
        break;
      case 4:
        (l = De),
          (n = it),
          (De = a.stateNode.containerInfo),
          (it = !0),
          ea(e, t, a),
          (De = l),
          (it = n);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        qe || ga(2, a, t), qe || ga(4, a, t), ea(e, t, a);
        break;
      case 1:
        qe ||
          (Lt(a, t),
          (l = a.stateNode),
          typeof l.componentWillUnmount == "function" && of(a, t, l)),
          ea(e, t, a);
        break;
      case 21:
        ea(e, t, a);
        break;
      case 22:
        (qe = (l = qe) || a.memoizedState !== null), ea(e, t, a), (qe = l);
        break;
      default:
        ea(e, t, a);
    }
  }
  function yf(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Gn(e);
      } catch (a) {
        Ce(t, t.return, a);
      }
  }
  function gx(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new hf()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new hf()),
          t
        );
      default:
        throw Error(c(435, e.tag));
    }
  }
  function xu(e, t) {
    var a = gx(e);
    t.forEach(function (l) {
      var n = _x.bind(null, e, l);
      a.has(l) || (a.add(l), l.then(n, n));
    });
  }
  function ht(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l],
          r = e,
          f = t,
          x = f;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (Ea(x.type)) {
                (De = x.stateNode), (it = !1);
                break e;
              }
              break;
            case 5:
              (De = x.stateNode), (it = !1);
              break e;
            case 3:
            case 4:
              (De = x.stateNode.containerInfo), (it = !0);
              break e;
          }
          x = x.return;
        }
        if (De === null) throw Error(c(160));
        gf(r, f, n),
          (De = null),
          (it = !1),
          (r = n.alternate),
          r !== null && (r.return = null),
          (n.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) bf(t, e), (t = t.sibling);
  }
  var Rt = null;
  function bf(e, t) {
    var a = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ht(t, e),
          xt(e),
          l & 4 && (ga(3, e, e.return), En(3, e), ga(5, e, e.return));
        break;
      case 1:
        ht(t, e),
          xt(e),
          l & 512 && (qe || a === null || Lt(a, a.return)),
          l & 64 &&
            It &&
            ((e = e.updateQueue),
            e !== null &&
              ((l = e.callbacks),
              l !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? l : a.concat(l)))));
        break;
      case 26:
        var n = Rt;
        if (
          (ht(t, e),
          xt(e),
          l & 512 && (qe || a === null || Lt(a, a.return)),
          l & 4)
        ) {
          var r = a !== null ? a.memoizedState : null;
          if (((l = e.memoizedState), a === null))
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  (l = e.type),
                    (a = e.memoizedProps),
                    (n = n.ownerDocument || n);
                  t: switch (l) {
                    case "title":
                      (r = n.getElementsByTagName("title")[0]),
                        (!r ||
                          r[$l] ||
                          r[We] ||
                          r.namespaceURI === "http://www.w3.org/2000/svg" ||
                          r.hasAttribute("itemprop")) &&
                          ((r = n.createElement(l)),
                          n.head.insertBefore(
                            r,
                            n.querySelector("head > title")
                          )),
                        Pe(r, l, a),
                        (r[We] = e),
                        Qe(r),
                        (l = r);
                      break e;
                    case "link":
                      var f = mm("link", "href", n).get(l + (a.href || ""));
                      if (f) {
                        for (var x = 0; x < f.length; x++)
                          if (
                            ((r = f[x]),
                            r.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              r.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              r.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              r.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            f.splice(x, 1);
                            break t;
                          }
                      }
                      (r = n.createElement(l)),
                        Pe(r, l, a),
                        n.head.appendChild(r);
                      break;
                    case "meta":
                      if (
                        (f = mm("meta", "content", n).get(
                          l + (a.content || "")
                        ))
                      ) {
                        for (x = 0; x < f.length; x++)
                          if (
                            ((r = f[x]),
                            r.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              r.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              r.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              r.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              r.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            f.splice(x, 1);
                            break t;
                          }
                      }
                      (r = n.createElement(l)),
                        Pe(r, l, a),
                        n.head.appendChild(r);
                      break;
                    default:
                      throw Error(c(468, l));
                  }
                  (r[We] = e), Qe(r), (l = r);
                }
                e.stateNode = l;
              } else hm(n, e.type, e.stateNode);
            else e.stateNode = fm(n, l, e.memoizedProps);
          else
            r !== l
              ? (r === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : r.count--,
                l === null
                  ? hm(n, e.type, e.stateNode)
                  : fm(n, l, e.memoizedProps))
              : l === null &&
                e.stateNode !== null &&
                du(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        ht(t, e),
          xt(e),
          l & 512 && (qe || a === null || Lt(a, a.return)),
          a !== null && l & 4 && du(e, e.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (
          (ht(t, e),
          xt(e),
          l & 512 && (qe || a === null || Lt(a, a.return)),
          e.flags & 32)
        ) {
          n = e.stateNode;
          try {
            ul(n, "");
          } catch (B) {
            Ce(e, e.return, B);
          }
        }
        l & 4 &&
          e.stateNode != null &&
          ((n = e.memoizedProps), du(e, n, a !== null ? a.memoizedProps : n)),
          l & 1024 && (hu = !0);
        break;
      case 6:
        if ((ht(t, e), xt(e), l & 4)) {
          if (e.stateNode === null) throw Error(c(162));
          (l = e.memoizedProps), (a = e.stateNode);
          try {
            a.nodeValue = l;
          } catch (B) {
            Ce(e, e.return, B);
          }
        }
        break;
      case 3:
        if (
          ((ii = null),
          (n = Rt),
          (Rt = ni(t.containerInfo)),
          ht(t, e),
          (Rt = n),
          xt(e),
          l & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Gn(t.containerInfo);
          } catch (B) {
            Ce(e, e.return, B);
          }
        hu && ((hu = !1), vf(e));
        break;
      case 4:
        (l = Rt),
          (Rt = ni(e.stateNode.containerInfo)),
          ht(t, e),
          xt(e),
          (Rt = l);
        break;
      case 12:
        ht(t, e), xt(e);
        break;
      case 13:
        ht(t, e),
          xt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (ju = zt()),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), xu(e, l)));
        break;
      case 22:
        n = e.memoizedState !== null;
        var v = a !== null && a.memoizedState !== null,
          z = It,
          Y = qe;
        if (
          ((It = z || n),
          (qe = Y || v),
          ht(t, e),
          (qe = Y),
          (It = z),
          xt(e),
          l & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (a === null || v || It || qe || Ja(e)),
              a = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                v = a = t;
                try {
                  if (((r = v.stateNode), n))
                    (f = r.style),
                      typeof f.setProperty == "function"
                        ? f.setProperty("display", "none", "important")
                        : (f.display = "none");
                  else {
                    x = v.stateNode;
                    var Q = v.memoizedProps.style,
                      L =
                        Q != null && Q.hasOwnProperty("display")
                          ? Q.display
                          : null;
                    x.style.display =
                      L == null || typeof L == "boolean" ? "" : ("" + L).trim();
                  }
                } catch (B) {
                  Ce(v, v.return, B);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                v = t;
                try {
                  v.stateNode.nodeValue = n ? "" : v.memoizedProps;
                } catch (B) {
                  Ce(v, v.return, B);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), (t = t.return);
            }
            a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        l & 4 &&
          ((l = e.updateQueue),
          l !== null &&
            ((a = l.retryQueue),
            a !== null && ((l.retryQueue = null), xu(e, a))));
        break;
      case 19:
        ht(t, e),
          xt(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), xu(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ht(t, e), xt(e);
    }
  }
  function xt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (ff(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(c(160));
        switch (a.tag) {
          case 27:
            var n = a.stateNode,
              r = fu(e);
            Qs(e, r, n);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && (ul(f, ""), (a.flags &= -33));
            var x = fu(e);
            Qs(e, x, f);
            break;
          case 3:
          case 4:
            var v = a.stateNode.containerInfo,
              z = fu(e);
            mu(e, z, v);
            break;
          default:
            throw Error(c(161));
        }
      } catch (Y) {
        Ce(e, e.return, Y);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function vf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        vf(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function ya(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) xf(e, t.alternate, t), (t = t.sibling);
  }
  function Ja(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ga(4, t, t.return), Ja(t);
          break;
        case 1:
          Lt(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && of(t, t.return, a),
            Ja(t);
          break;
        case 27:
          kn(t.stateNode);
        case 26:
        case 5:
          Lt(t, t.return), Ja(t);
          break;
        case 22:
          t.memoizedState === null && Ja(t);
          break;
        case 30:
          Ja(t);
          break;
        default:
          Ja(t);
      }
      e = e.sibling;
    }
  }
  function ba(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate,
        n = e,
        r = t,
        f = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          ba(n, r, a), En(4, r);
          break;
        case 1:
          if (
            (ba(n, r, a),
            (l = r),
            (n = l.stateNode),
            typeof n.componentDidMount == "function")
          )
            try {
              n.componentDidMount();
            } catch (z) {
              Ce(l, l.return, z);
            }
          if (((l = r), (n = l.updateQueue), n !== null)) {
            var x = l.stateNode;
            try {
              var v = n.shared.hiddenCallbacks;
              if (v !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < v.length; n++)
                  Jo(v[n], x);
            } catch (z) {
              Ce(l, l.return, z);
            }
          }
          a && f & 64 && cf(r), _n(r, r.return);
          break;
        case 27:
          mf(r);
        case 26:
        case 5:
          ba(n, r, a), a && l === null && f & 4 && df(r), _n(r, r.return);
          break;
        case 12:
          ba(n, r, a);
          break;
        case 13:
          ba(n, r, a), a && f & 4 && yf(n, r);
          break;
        case 22:
          r.memoizedState === null && ba(n, r, a), _n(r, r.return);
          break;
        case 30:
          break;
        default:
          ba(n, r, a);
      }
      t = t.sibling;
    }
  }
  function pu(e, t) {
    var a = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && dn(a));
  }
  function gu(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && dn(e));
  }
  function Bt(e, t, a, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) jf(e, t, a, l), (t = t.sibling);
  }
  function jf(e, t, a, l) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Bt(e, t, a, l), n & 2048 && En(9, t);
        break;
      case 1:
        Bt(e, t, a, l);
        break;
      case 3:
        Bt(e, t, a, l),
          n & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && dn(e)));
        break;
      case 12:
        if (n & 2048) {
          Bt(e, t, a, l), (e = t.stateNode);
          try {
            var r = t.memoizedProps,
              f = r.id,
              x = r.onPostCommit;
            typeof x == "function" &&
              x(
                f,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (v) {
            Ce(t, t.return, v);
          }
        } else Bt(e, t, a, l);
        break;
      case 13:
        Bt(e, t, a, l);
        break;
      case 23:
        break;
      case 22:
        (r = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? r._visibility & 2
              ? Bt(e, t, a, l)
              : An(e, t)
            : r._visibility & 2
            ? Bt(e, t, a, l)
            : ((r._visibility |= 2),
              Al(e, t, a, l, (t.subtreeFlags & 10256) !== 0)),
          n & 2048 && pu(f, t);
        break;
      case 24:
        Bt(e, t, a, l), n & 2048 && gu(t.alternate, t);
        break;
      default:
        Bt(e, t, a, l);
    }
  }
  function Al(e, t, a, l, n) {
    for (n = n && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var r = e,
        f = t,
        x = a,
        v = l,
        z = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Al(r, f, x, v, n), En(8, f);
          break;
        case 23:
          break;
        case 22:
          var Y = f.stateNode;
          f.memoizedState !== null
            ? Y._visibility & 2
              ? Al(r, f, x, v, n)
              : An(r, f)
            : ((Y._visibility |= 2), Al(r, f, x, v, n)),
            n && z & 2048 && pu(f.alternate, f);
          break;
        case 24:
          Al(r, f, x, v, n), n && z & 2048 && gu(f.alternate, f);
          break;
        default:
          Al(r, f, x, v, n);
      }
      t = t.sibling;
    }
  }
  function An(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          l = t,
          n = l.flags;
        switch (l.tag) {
          case 22:
            An(a, l), n & 2048 && pu(l.alternate, l);
            break;
          case 24:
            An(a, l), n & 2048 && gu(l.alternate, l);
            break;
          default:
            An(a, l);
        }
        t = t.sibling;
      }
  }
  var Tn = 8192;
  function Tl(e) {
    if (e.subtreeFlags & Tn)
      for (e = e.child; e !== null; ) Nf(e), (e = e.sibling);
  }
  function Nf(e) {
    switch (e.tag) {
      case 26:
        Tl(e),
          e.flags & Tn &&
            e.memoizedState !== null &&
            ap(Rt, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Tl(e);
        break;
      case 3:
      case 4:
        var t = Rt;
        (Rt = ni(e.stateNode.containerInfo)), Tl(e), (Rt = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = Tn), (Tn = 16777216), Tl(e), (Tn = t))
            : Tl(e));
        break;
      default:
        Tl(e);
    }
  }
  function Sf(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function Rn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          (Ke = l), Ef(l, e);
        }
      Sf(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) wf(e), (e = e.sibling);
  }
  function wf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Rn(e), e.flags & 2048 && ga(9, e, e.return);
        break;
      case 3:
        Rn(e);
        break;
      case 12:
        Rn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Zs(e))
          : Rn(e);
        break;
      default:
        Rn(e);
    }
  }
  function Zs(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          (Ke = l), Ef(l, e);
        }
      Sf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          ga(8, t, t.return), Zs(t);
          break;
        case 22:
          (a = t.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), Zs(t));
          break;
        default:
          Zs(t);
      }
      e = e.sibling;
    }
  }
  function Ef(e, t) {
    for (; Ke !== null; ) {
      var a = Ke;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ga(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          dn(a.memoizedState.cache);
      }
      if (((l = a.child), l !== null)) (l.return = a), (Ke = l);
      else
        e: for (a = e; Ke !== null; ) {
          l = Ke;
          var n = l.sibling,
            r = l.return;
          if ((pf(l), l === a)) {
            Ke = null;
            break e;
          }
          if (n !== null) {
            (n.return = r), (Ke = n);
            break e;
          }
          Ke = r;
        }
    }
  }
  var yx = {
      getCacheForType: function (e) {
        var t = Ie(Ge),
          a = t.data.get(e);
        return a === void 0 && ((a = e()), t.data.set(e, a)), a;
      },
    },
    bx = typeof WeakMap == "function" ? WeakMap : Map,
    we = 0,
    Oe = null,
    pe = null,
    be = 0,
    Ee = 0,
    pt = null,
    va = !1,
    Rl = !1,
    yu = !1,
    ta = 0,
    Le = 0,
    ja = 0,
    $a = 0,
    bu = 0,
    _t = 0,
    Cl = 0,
    Cn = null,
    rt = null,
    vu = !1,
    ju = 0,
    Ks = 1 / 0,
    Js = null,
    Na = null,
    Fe = 0,
    Sa = null,
    Ol = null,
    Ml = 0,
    Nu = 0,
    Su = null,
    _f = null,
    On = 0,
    wu = null;
  function gt() {
    if ((we & 2) !== 0 && be !== 0) return be & -be;
    if (w.T !== null) {
      var e = bl;
      return e !== 0 ? e : Ou();
    }
    return qc();
  }
  function Af() {
    _t === 0 && (_t = (be & 536870912) === 0 || Ne ? Uc() : 536870912);
    var e = Et.current;
    return e !== null && (e.flags |= 32), _t;
  }
  function yt(e, t, a) {
    ((e === Oe && (Ee === 2 || Ee === 9)) || e.cancelPendingCommit !== null) &&
      (Dl(e, 0), wa(e, be, _t, !1)),
      Jl(e, a),
      ((we & 2) === 0 || e !== Oe) &&
        (e === Oe &&
          ((we & 2) === 0 && ($a |= a), Le === 4 && wa(e, be, _t, !1)),
        Ht(e));
  }
  function Tf(e, t, a) {
    if ((we & 6) !== 0) throw Error(c(327));
    var l = (!a && (t & 124) === 0 && (t & e.expiredLanes) === 0) || Kl(e, t),
      n = l ? Nx(e, t) : Au(e, t, !0),
      r = l;
    do {
      if (n === 0) {
        Rl && !l && wa(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), r && !vx(a))) {
          (n = Au(e, t, !1)), (r = !1);
          continue;
        }
        if (n === 2) {
          if (((r = t), e.errorRecoveryDisabledLanes & r)) var f = 0;
          else
            (f = e.pendingLanes & -536870913),
              (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0);
          if (f !== 0) {
            t = f;
            e: {
              var x = e;
              n = Cn;
              var v = x.current.memoizedState.isDehydrated;
              if ((v && (Dl(x, f).flags |= 256), (f = Au(x, f, !1)), f !== 2)) {
                if (yu && !v) {
                  (x.errorRecoveryDisabledLanes |= r), ($a |= r), (n = 4);
                  break e;
                }
                (r = rt),
                  (rt = n),
                  r !== null && (rt === null ? (rt = r) : rt.push.apply(rt, r));
              }
              n = f;
            }
            if (((r = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          Dl(e, 0), wa(e, t, 0, !0);
          break;
        }
        e: {
          switch (((l = e), (r = n), r)) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              wa(l, t, _t, !va);
              break e;
            case 2:
              rt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && ((n = ju + 300 - zt()), 10 < n)) {
            if ((wa(l, t, _t, !va), ss(l, 0, !0) !== 0)) break e;
            l.timeoutHandle = lm(
              Rf.bind(null, l, a, rt, Js, vu, t, _t, $a, Cl, va, r, 2, -0, 0),
              n
            );
            break e;
          }
          Rf(l, a, rt, Js, vu, t, _t, $a, Cl, va, r, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Ht(e);
  }
  function Rf(e, t, a, l, n, r, f, x, v, z, Y, Q, L, B) {
    if (
      ((e.timeoutHandle = -1),
      (Q = t.subtreeFlags),
      (Q & 8192 || (Q & 16785408) === 16785408) &&
        ((Bn = { stylesheets: null, count: 0, unsuspend: tp }),
        Nf(t),
        (Q = lp()),
        Q !== null))
    ) {
      (e.cancelPendingCommit = Q(
        Uf.bind(null, e, t, r, a, l, n, f, x, v, Y, 1, L, B)
      )),
        wa(e, r, f, !z);
      return;
    }
    Uf(e, t, r, a, l, n, f, x, v);
  }
  function vx(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var l = 0; l < a.length; l++) {
          var n = a[l],
            r = n.getSnapshot;
          n = n.value;
          try {
            if (!ft(r(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        (a.return = t), (t = a);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function wa(e, t, a, l) {
    (t &= ~bu),
      (t &= ~$a),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      l && (e.warmLanes |= t),
      (l = e.expirationTimes);
    for (var n = t; 0 < n; ) {
      var r = 31 - dt(n),
        f = 1 << r;
      (l[r] = -1), (n &= ~f);
    }
    a !== 0 && Bc(e, a, t);
  }
  function $s() {
    return (we & 6) === 0 ? (Mn(0), !1) : !0;
  }
  function Eu() {
    if (pe !== null) {
      if (Ee === 0) var e = pe.return;
      else (e = pe), (Kt = Ga = null), Vr(e), (El = null), (Nn = 0), (e = pe);
      for (; e !== null; ) uf(e.alternate, e), (e = e.return);
      pe = null;
    }
  }
  function Dl(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && ((e.timeoutHandle = -1), Bx(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      Eu(),
      (Oe = e),
      (pe = a = Xt(e.current, null)),
      (be = t),
      (Ee = 0),
      (pt = null),
      (va = !1),
      (Rl = Kl(e, t)),
      (yu = !1),
      (Cl = _t = bu = $a = ja = Le = 0),
      (rt = Cn = null),
      (vu = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var n = 31 - dt(l),
          r = 1 << n;
        (t |= e[n]), (l &= ~r);
      }
    return (ta = t), gs(), a;
  }
  function Cf(e, t) {
    (me = null),
      (w.H = Us),
      t === mn || t === _s
        ? ((t = Zo()), (Ee = 3))
        : t === Go
        ? ((t = Zo()), (Ee = 4))
        : (Ee =
            t === Kd
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (pt = t),
      pe === null && ((Le = 1), Ys(e, jt(t, e.current)));
  }
  function Of() {
    var e = w.H;
    return (w.H = Us), e === null ? Us : e;
  }
  function Mf() {
    var e = w.A;
    return (w.A = yx), e;
  }
  function _u() {
    (Le = 4),
      va || ((be & 4194048) !== be && Et.current !== null) || (Rl = !0),
      ((ja & 134217727) === 0 && ($a & 134217727) === 0) ||
        Oe === null ||
        wa(Oe, be, _t, !1);
  }
  function Au(e, t, a) {
    var l = we;
    we |= 2;
    var n = Of(),
      r = Mf();
    (Oe !== e || be !== t) && ((Js = null), Dl(e, t)), (t = !1);
    var f = Le;
    e: do
      try {
        if (Ee !== 0 && pe !== null) {
          var x = pe,
            v = pt;
          switch (Ee) {
            case 8:
              Eu(), (f = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Et.current === null && (t = !0);
              var z = Ee;
              if (((Ee = 0), (pt = null), zl(e, x, v, z), a && Rl)) {
                f = 0;
                break e;
              }
              break;
            default:
              (z = Ee), (Ee = 0), (pt = null), zl(e, x, v, z);
          }
        }
        jx(), (f = Le);
        break;
      } catch (Y) {
        Cf(e, Y);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Kt = Ga = null),
      (we = l),
      (w.H = n),
      (w.A = r),
      pe === null && ((Oe = null), (be = 0), gs()),
      f
    );
  }
  function jx() {
    for (; pe !== null; ) Df(pe);
  }
  function Nx(e, t) {
    var a = we;
    we |= 2;
    var l = Of(),
      n = Mf();
    Oe !== e || be !== t
      ? ((Js = null), (Ks = zt() + 500), Dl(e, t))
      : (Rl = Kl(e, t));
    e: do
      try {
        if (Ee !== 0 && pe !== null) {
          t = pe;
          var r = pt;
          t: switch (Ee) {
            case 1:
              (Ee = 0), (pt = null), zl(e, t, r, 1);
              break;
            case 2:
            case 9:
              if (Xo(r)) {
                (Ee = 0), (pt = null), zf(t);
                break;
              }
              (t = function () {
                (Ee !== 2 && Ee !== 9) || Oe !== e || (Ee = 7), Ht(e);
              }),
                r.then(t, t);
              break e;
            case 3:
              Ee = 7;
              break e;
            case 4:
              Ee = 5;
              break e;
            case 7:
              Xo(r)
                ? ((Ee = 0), (pt = null), zf(t))
                : ((Ee = 0), (pt = null), zl(e, t, r, 7));
              break;
            case 5:
              var f = null;
              switch (pe.tag) {
                case 26:
                  f = pe.memoizedState;
                case 5:
                case 27:
                  var x = pe;
                  if (!f || xm(f)) {
                    (Ee = 0), (pt = null);
                    var v = x.sibling;
                    if (v !== null) pe = v;
                    else {
                      var z = x.return;
                      z !== null ? ((pe = z), Fs(z)) : (pe = null);
                    }
                    break t;
                  }
              }
              (Ee = 0), (pt = null), zl(e, t, r, 5);
              break;
            case 6:
              (Ee = 0), (pt = null), zl(e, t, r, 6);
              break;
            case 8:
              Eu(), (Le = 6);
              break e;
            default:
              throw Error(c(462));
          }
        }
        Sx();
        break;
      } catch (Y) {
        Cf(e, Y);
      }
    while (!0);
    return (
      (Kt = Ga = null),
      (w.H = l),
      (w.A = n),
      (we = a),
      pe !== null ? 0 : ((Oe = null), (be = 0), gs(), Le)
    );
  }
  function Sx() {
    for (; pe !== null && !Qh(); ) Df(pe);
  }
  function Df(e) {
    var t = sf(e.alternate, e, ta);
    (e.memoizedProps = e.pendingProps), t === null ? Fs(e) : (pe = t);
  }
  function zf(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Id(a, t, t.pendingProps, t.type, void 0, be);
        break;
      case 11:
        t = Id(a, t, t.pendingProps, t.type.render, t.ref, be);
        break;
      case 5:
        Vr(t);
      default:
        uf(a, t), (t = pe = zo(t, ta)), (t = sf(a, t, ta));
    }
    (e.memoizedProps = e.pendingProps), t === null ? Fs(e) : (pe = t);
  }
  function zl(e, t, a, l) {
    (Kt = Ga = null), Vr(t), (El = null), (Nn = 0);
    var n = t.return;
    try {
      if (fx(e, n, t, a, be)) {
        (Le = 1), Ys(e, jt(a, e.current)), (pe = null);
        return;
      }
    } catch (r) {
      if (n !== null) throw ((pe = n), r);
      (Le = 1), Ys(e, jt(a, e.current)), (pe = null);
      return;
    }
    t.flags & 32768
      ? (Ne || l === 1
          ? (e = !0)
          : Rl || (be & 536870912) !== 0
          ? (e = !1)
          : ((va = e = !0),
            (l === 2 || l === 9 || l === 3 || l === 6) &&
              ((l = Et.current),
              l !== null && l.tag === 13 && (l.flags |= 16384))),
        kf(t, e))
      : Fs(t);
  }
  function Fs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        kf(t, va);
        return;
      }
      e = t.return;
      var a = hx(t.alternate, t, ta);
      if (a !== null) {
        pe = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        pe = t;
        return;
      }
      pe = t = e;
    } while (t !== null);
    Le === 0 && (Le = 5);
  }
  function kf(e, t) {
    do {
      var a = xx(e.alternate, e);
      if (a !== null) {
        (a.flags &= 32767), (pe = a);
        return;
      }
      if (
        ((a = e.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        pe = e;
        return;
      }
      pe = e = a;
    } while (e !== null);
    (Le = 6), (pe = null);
  }
  function Uf(e, t, a, l, n, r, f, x, v) {
    e.cancelPendingCommit = null;
    do Ps();
    while (Fe !== 0);
    if ((we & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (
        ((r = t.lanes | t.childLanes),
        (r |= gr),
        t0(e, a, r, f, x, v),
        e === Oe && ((pe = Oe = null), (be = 0)),
        (Ol = t),
        (Sa = e),
        (Ml = a),
        (Nu = r),
        (Su = n),
        (_f = l),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Ax(as, function () {
              return Yf(), null;
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || l)
      ) {
        (l = w.T), (w.T = null), (n = V.p), (V.p = 2), (f = we), (we |= 4);
        try {
          px(e, t, a);
        } finally {
          (we = f), (V.p = n), (w.T = l);
        }
      }
      (Fe = 1), Lf(), Bf(), Hf();
    }
  }
  function Lf() {
    if (Fe === 1) {
      Fe = 0;
      var e = Sa,
        t = Ol,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        (a = w.T), (w.T = null);
        var l = V.p;
        V.p = 2;
        var n = we;
        we |= 4;
        try {
          bf(t, e);
          var r = Hu,
            f = wo(e.containerInfo),
            x = r.focusedElem,
            v = r.selectionRange;
          if (
            f !== x &&
            x &&
            x.ownerDocument &&
            So(x.ownerDocument.documentElement, x)
          ) {
            if (v !== null && fr(x)) {
              var z = v.start,
                Y = v.end;
              if ((Y === void 0 && (Y = z), "selectionStart" in x))
                (x.selectionStart = z),
                  (x.selectionEnd = Math.min(Y, x.value.length));
              else {
                var Q = x.ownerDocument || document,
                  L = (Q && Q.defaultView) || window;
                if (L.getSelection) {
                  var B = L.getSelection(),
                    re = x.textContent.length,
                    ne = Math.min(v.start, re),
                    Te = v.end === void 0 ? ne : Math.min(v.end, re);
                  !B.extend && ne > Te && ((f = Te), (Te = ne), (ne = f));
                  var A = No(x, ne),
                    _ = No(x, Te);
                  if (
                    A &&
                    _ &&
                    (B.rangeCount !== 1 ||
                      B.anchorNode !== A.node ||
                      B.anchorOffset !== A.offset ||
                      B.focusNode !== _.node ||
                      B.focusOffset !== _.offset)
                  ) {
                    var O = Q.createRange();
                    O.setStart(A.node, A.offset),
                      B.removeAllRanges(),
                      ne > Te
                        ? (B.addRange(O), B.extend(_.node, _.offset))
                        : (O.setEnd(_.node, _.offset), B.addRange(O));
                  }
                }
              }
            }
            for (Q = [], B = x; (B = B.parentNode); )
              B.nodeType === 1 &&
                Q.push({ element: B, left: B.scrollLeft, top: B.scrollTop });
            for (
              typeof x.focus == "function" && x.focus(), x = 0;
              x < Q.length;
              x++
            ) {
              var G = Q[x];
              (G.element.scrollLeft = G.left), (G.element.scrollTop = G.top);
            }
          }
          (ci = !!Bu), (Hu = Bu = null);
        } finally {
          (we = n), (V.p = l), (w.T = a);
        }
      }
      (e.current = t), (Fe = 2);
    }
  }
  function Bf() {
    if (Fe === 2) {
      Fe = 0;
      var e = Sa,
        t = Ol,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        (a = w.T), (w.T = null);
        var l = V.p;
        V.p = 2;
        var n = we;
        we |= 4;
        try {
          xf(e, t.alternate, t);
        } finally {
          (we = n), (V.p = l), (w.T = a);
        }
      }
      Fe = 3;
    }
  }
  function Hf() {
    if (Fe === 4 || Fe === 3) {
      (Fe = 0), Zh();
      var e = Sa,
        t = Ol,
        a = Ml,
        l = _f;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Fe = 5)
        : ((Fe = 0), (Ol = Sa = null), qf(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (
        (n === 0 && (Na = null),
        Qi(a),
        (t = t.stateNode),
        ot && typeof ot.onCommitFiberRoot == "function")
      )
        try {
          ot.onCommitFiberRoot(Zl, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        (t = w.T), (n = V.p), (V.p = 2), (w.T = null);
        try {
          for (var r = e.onRecoverableError, f = 0; f < l.length; f++) {
            var x = l[f];
            r(x.value, { componentStack: x.stack });
          }
        } finally {
          (w.T = t), (V.p = n);
        }
      }
      (Ml & 3) !== 0 && Ps(),
        Ht(e),
        (n = e.pendingLanes),
        (a & 4194090) !== 0 && (n & 42) !== 0
          ? e === wu
            ? On++
            : ((On = 0), (wu = e))
          : (On = 0),
        Mn(0);
    }
  }
  function qf(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), dn(t)));
  }
  function Ps(e) {
    return Lf(), Bf(), Hf(), Yf();
  }
  function Yf() {
    if (Fe !== 5) return !1;
    var e = Sa,
      t = Nu;
    Nu = 0;
    var a = Qi(Ml),
      l = w.T,
      n = V.p;
    try {
      (V.p = 32 > a ? 32 : a), (w.T = null), (a = Su), (Su = null);
      var r = Sa,
        f = Ml;
      if (((Fe = 0), (Ol = Sa = null), (Ml = 0), (we & 6) !== 0))
        throw Error(c(331));
      var x = we;
      if (
        ((we |= 4),
        wf(r.current),
        jf(r, r.current, f, a),
        (we = x),
        Mn(0, !1),
        ot && typeof ot.onPostCommitFiberRoot == "function")
      )
        try {
          ot.onPostCommitFiberRoot(Zl, r);
        } catch {}
      return !0;
    } finally {
      (V.p = n), (w.T = l), qf(e, t);
    }
  }
  function Vf(e, t, a) {
    (t = jt(a, t)),
      (t = au(e.stateNode, t, 2)),
      (e = ma(e, t, 2)),
      e !== null && (Jl(e, 2), Ht(e));
  }
  function Ce(e, t, a) {
    if (e.tag === 3) Vf(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Vf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (Na === null || !Na.has(l)))
          ) {
            (e = jt(a, e)),
              (a = Qd(2)),
              (l = ma(t, a, 2)),
              l !== null && (Zd(a, l, t, e), Jl(l, 2), Ht(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Tu(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new bx();
      var n = new Set();
      l.set(t, n);
    } else (n = l.get(t)), n === void 0 && ((n = new Set()), l.set(t, n));
    n.has(a) ||
      ((yu = !0), n.add(a), (e = wx.bind(null, e, t, a)), t.then(e, e));
  }
  function wx(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Oe === e &&
        (be & a) === a &&
        (Le === 4 || (Le === 3 && (be & 62914560) === be && 300 > zt() - ju)
          ? (we & 2) === 0 && Dl(e, 0)
          : (bu |= a),
        Cl === be && (Cl = 0)),
      Ht(e);
  }
  function Gf(e, t) {
    t === 0 && (t = Lc()), (e = xl(e, t)), e !== null && (Jl(e, t), Ht(e));
  }
  function Ex(e) {
    var t = e.memoizedState,
      a = 0;
    t !== null && (a = t.retryLane), Gf(e, a);
  }
  function _x(e, t) {
    var a = 0;
    switch (e.tag) {
      case 13:
        var l = e.stateNode,
          n = e.memoizedState;
        n !== null && (a = n.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    l !== null && l.delete(t), Gf(e, a);
  }
  function Ax(e, t) {
    return Yi(e, t);
  }
  var Ws = null,
    kl = null,
    Ru = !1,
    Is = !1,
    Cu = !1,
    Fa = 0;
  function Ht(e) {
    e !== kl &&
      e.next === null &&
      (kl === null ? (Ws = kl = e) : (kl = kl.next = e)),
      (Is = !0),
      Ru || ((Ru = !0), Rx());
  }
  function Mn(e, t) {
    if (!Cu && Is) {
      Cu = !0;
      do
        for (var a = !1, l = Ws; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var r = 0;
            else {
              var f = l.suspendedLanes,
                x = l.pingedLanes;
              (r = (1 << (31 - dt(42 | e) + 1)) - 1),
                (r &= n & ~(f & ~x)),
                (r = r & 201326741 ? (r & 201326741) | 1 : r ? r | 2 : 0);
            }
            r !== 0 && ((a = !0), Kf(l, r));
          } else
            (r = be),
              (r = ss(
                l,
                l === Oe ? r : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (r & 3) === 0 || Kl(l, r) || ((a = !0), Kf(l, r));
          l = l.next;
        }
      while (a);
      Cu = !1;
    }
  }
  function Tx() {
    Xf();
  }
  function Xf() {
    Is = Ru = !1;
    var e = 0;
    Fa !== 0 && (Lx() && (e = Fa), (Fa = 0));
    for (var t = zt(), a = null, l = Ws; l !== null; ) {
      var n = l.next,
        r = Qf(l, t);
      r === 0
        ? ((l.next = null),
          a === null ? (Ws = n) : (a.next = n),
          n === null && (kl = a))
        : ((a = l), (e !== 0 || (r & 3) !== 0) && (Is = !0)),
        (l = n);
    }
    Mn(e);
  }
  function Qf(e, t) {
    for (
      var a = e.suspendedLanes,
        l = e.pingedLanes,
        n = e.expirationTimes,
        r = e.pendingLanes & -62914561;
      0 < r;

    ) {
      var f = 31 - dt(r),
        x = 1 << f,
        v = n[f];
      v === -1
        ? ((x & a) === 0 || (x & l) !== 0) && (n[f] = e0(x, t))
        : v <= t && (e.expiredLanes |= x),
        (r &= ~x);
    }
    if (
      ((t = Oe),
      (a = be),
      (a = ss(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (l = e.callbackNode),
      a === 0 ||
        (e === t && (Ee === 2 || Ee === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && Vi(l),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((a & 3) === 0 || Kl(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((l !== null && Vi(l), Qi(a))) {
        case 2:
        case 8:
          a = zc;
          break;
        case 32:
          a = as;
          break;
        case 268435456:
          a = kc;
          break;
        default:
          a = as;
      }
      return (
        (l = Zf.bind(null, e)),
        (a = Yi(a, l)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      l !== null && l !== null && Vi(l),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Zf(e, t) {
    if (Fe !== 0 && Fe !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null;
    var a = e.callbackNode;
    if (Ps() && e.callbackNode !== a) return null;
    var l = be;
    return (
      (l = ss(
        e,
        e === Oe ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      l === 0
        ? null
        : (Tf(e, l, t),
          Qf(e, zt()),
          e.callbackNode != null && e.callbackNode === a
            ? Zf.bind(null, e)
            : null)
    );
  }
  function Kf(e, t) {
    if (Ps()) return null;
    Tf(e, t, !0);
  }
  function Rx() {
    Hx(function () {
      (we & 6) !== 0 ? Yi(Dc, Tx) : Xf();
    });
  }
  function Ou() {
    return Fa === 0 && (Fa = Uc()), Fa;
  }
  function Jf(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : os("" + e);
  }
  function $f(e, t) {
    var a = t.ownerDocument.createElement("input");
    return (
      (a.name = t.name),
      (a.value = t.value),
      e.id && a.setAttribute("form", e.id),
      t.parentNode.insertBefore(a, t),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function Cx(e, t, a, l, n) {
    if (t === "submit" && a && a.stateNode === n) {
      var r = Jf((n[lt] || null).action),
        f = l.submitter;
      f &&
        ((t = (t = f[lt] || null)
          ? Jf(t.formAction)
          : f.getAttribute("formAction")),
        t !== null && ((r = t), (f = null)));
      var x = new hs("action", "action", null, l, n);
      e.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Fa !== 0) {
                  var v = f ? $f(n, f) : new FormData(n);
                  Pr(
                    a,
                    { pending: !0, data: v, method: n.method, action: r },
                    null,
                    v
                  );
                }
              } else
                typeof r == "function" &&
                  (x.preventDefault(),
                  (v = f ? $f(n, f) : new FormData(n)),
                  Pr(
                    a,
                    { pending: !0, data: v, method: n.method, action: r },
                    r,
                    v
                  ));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var Mu = 0; Mu < pr.length; Mu++) {
    var Du = pr[Mu],
      Ox = Du.toLowerCase(),
      Mx = Du[0].toUpperCase() + Du.slice(1);
    Tt(Ox, "on" + Mx);
  }
  Tt(Ao, "onAnimationEnd"),
    Tt(To, "onAnimationIteration"),
    Tt(Ro, "onAnimationStart"),
    Tt("dblclick", "onDoubleClick"),
    Tt("focusin", "onFocus"),
    Tt("focusout", "onBlur"),
    Tt($0, "onTransitionRun"),
    Tt(F0, "onTransitionStart"),
    Tt(P0, "onTransitionCancel"),
    Tt(Co, "onTransitionEnd"),
    sl("onMouseEnter", ["mouseout", "mouseover"]),
    sl("onMouseLeave", ["mouseout", "mouseover"]),
    sl("onPointerEnter", ["pointerout", "pointerover"]),
    sl("onPointerLeave", ["pointerout", "pointerover"]),
    za(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    za(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    za("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    za(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    za(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    za(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var Dn =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Dx = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Dn)
    );
  function Ff(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a],
        n = l.event;
      l = l.listeners;
      e: {
        var r = void 0;
        if (t)
          for (var f = l.length - 1; 0 <= f; f--) {
            var x = l[f],
              v = x.instance,
              z = x.currentTarget;
            if (((x = x.listener), v !== r && n.isPropagationStopped()))
              break e;
            (r = x), (n.currentTarget = z);
            try {
              r(n);
            } catch (Y) {
              qs(Y);
            }
            (n.currentTarget = null), (r = v);
          }
        else
          for (f = 0; f < l.length; f++) {
            if (
              ((x = l[f]),
              (v = x.instance),
              (z = x.currentTarget),
              (x = x.listener),
              v !== r && n.isPropagationStopped())
            )
              break e;
            (r = x), (n.currentTarget = z);
            try {
              r(n);
            } catch (Y) {
              qs(Y);
            }
            (n.currentTarget = null), (r = v);
          }
      }
    }
  }
  function ge(e, t) {
    var a = t[Zi];
    a === void 0 && (a = t[Zi] = new Set());
    var l = e + "__bubble";
    a.has(l) || (Pf(t, e, 2, !1), a.add(l));
  }
  function zu(e, t, a) {
    var l = 0;
    t && (l |= 4), Pf(a, e, l, t);
  }
  var ei = "_reactListening" + Math.random().toString(36).slice(2);
  function ku(e) {
    if (!e[ei]) {
      (e[ei] = !0),
        Vc.forEach(function (a) {
          a !== "selectionchange" && (Dx.has(a) || zu(a, !1, e), zu(a, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ei] || ((t[ei] = !0), zu("selectionchange", !1, t));
    }
  }
  function Pf(e, t, a, l) {
    switch (jm(t)) {
      case 2:
        var n = ip;
        break;
      case 8:
        n = rp;
        break;
      default:
        n = $u;
    }
    (a = n.bind(null, t, a, e)),
      (n = void 0),
      !lr ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (n = !0),
      l
        ? n !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: n })
          : e.addEventListener(t, a, !0)
        : n !== void 0
        ? e.addEventListener(t, a, { passive: n })
        : e.addEventListener(t, a, !1);
  }
  function Uu(e, t, a, l, n) {
    var r = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var f = l.tag;
        if (f === 3 || f === 4) {
          var x = l.stateNode.containerInfo;
          if (x === n) break;
          if (f === 4)
            for (f = l.return; f !== null; ) {
              var v = f.tag;
              if ((v === 3 || v === 4) && f.stateNode.containerInfo === n)
                return;
              f = f.return;
            }
          for (; x !== null; ) {
            if (((f = al(x)), f === null)) return;
            if (((v = f.tag), v === 5 || v === 6 || v === 26 || v === 27)) {
              l = r = f;
              continue e;
            }
            x = x.parentNode;
          }
        }
        l = l.return;
      }
    ao(function () {
      var z = r,
        Y = tr(a),
        Q = [];
      e: {
        var L = Oo.get(e);
        if (L !== void 0) {
          var B = hs,
            re = e;
          switch (e) {
            case "keypress":
              if (fs(a) === 0) break e;
            case "keydown":
            case "keyup":
              B = A0;
              break;
            case "focusin":
              (re = "focus"), (B = rr);
              break;
            case "focusout":
              (re = "blur"), (B = rr);
              break;
            case "beforeblur":
            case "afterblur":
              B = rr;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              B = so;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              B = x0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              B = C0;
              break;
            case Ao:
            case To:
            case Ro:
              B = y0;
              break;
            case Co:
              B = M0;
              break;
            case "scroll":
            case "scrollend":
              B = m0;
              break;
            case "wheel":
              B = z0;
              break;
            case "copy":
            case "cut":
            case "paste":
              B = v0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              B = ro;
              break;
            case "toggle":
            case "beforetoggle":
              B = U0;
          }
          var ne = (t & 4) !== 0,
            Te = !ne && (e === "scroll" || e === "scrollend"),
            A = ne ? (L !== null ? L + "Capture" : null) : L;
          ne = [];
          for (var _ = z, O; _ !== null; ) {
            var G = _;
            if (
              ((O = G.stateNode),
              (G = G.tag),
              (G !== 5 && G !== 26 && G !== 27) ||
                O === null ||
                A === null ||
                ((G = Pl(_, A)), G != null && ne.push(zn(_, G, O))),
              Te)
            )
              break;
            _ = _.return;
          }
          0 < ne.length &&
            ((L = new B(L, re, null, a, Y)),
            Q.push({ event: L, listeners: ne }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((L = e === "mouseover" || e === "pointerover"),
            (B = e === "mouseout" || e === "pointerout"),
            L &&
              a !== er &&
              (re = a.relatedTarget || a.fromElement) &&
              (al(re) || re[tl]))
          )
            break e;
          if (
            (B || L) &&
            ((L =
              Y.window === Y
                ? Y
                : (L = Y.ownerDocument)
                ? L.defaultView || L.parentWindow
                : window),
            B
              ? ((re = a.relatedTarget || a.toElement),
                (B = z),
                (re = re ? al(re) : null),
                re !== null &&
                  ((Te = m(re)),
                  (ne = re.tag),
                  re !== Te || (ne !== 5 && ne !== 27 && ne !== 6)) &&
                  (re = null))
              : ((B = null), (re = z)),
            B !== re)
          ) {
            if (
              ((ne = so),
              (G = "onMouseLeave"),
              (A = "onMouseEnter"),
              (_ = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ne = ro),
                (G = "onPointerLeave"),
                (A = "onPointerEnter"),
                (_ = "pointer")),
              (Te = B == null ? L : Fl(B)),
              (O = re == null ? L : Fl(re)),
              (L = new ne(G, _ + "leave", B, a, Y)),
              (L.target = Te),
              (L.relatedTarget = O),
              (G = null),
              al(Y) === z &&
                ((ne = new ne(A, _ + "enter", re, a, Y)),
                (ne.target = O),
                (ne.relatedTarget = Te),
                (G = ne)),
              (Te = G),
              B && re)
            )
              t: {
                for (ne = B, A = re, _ = 0, O = ne; O; O = Ul(O)) _++;
                for (O = 0, G = A; G; G = Ul(G)) O++;
                for (; 0 < _ - O; ) (ne = Ul(ne)), _--;
                for (; 0 < O - _; ) (A = Ul(A)), O--;
                for (; _--; ) {
                  if (ne === A || (A !== null && ne === A.alternate)) break t;
                  (ne = Ul(ne)), (A = Ul(A));
                }
                ne = null;
              }
            else ne = null;
            B !== null && Wf(Q, L, B, ne, !1),
              re !== null && Te !== null && Wf(Q, Te, re, ne, !0);
          }
        }
        e: {
          if (
            ((L = z ? Fl(z) : window),
            (B = L.nodeName && L.nodeName.toLowerCase()),
            B === "select" || (B === "input" && L.type === "file"))
          )
            var I = po;
          else if (ho(L))
            if (go) I = Z0;
            else {
              I = X0;
              var he = G0;
            }
          else
            (B = L.nodeName),
              !B ||
              B.toLowerCase() !== "input" ||
              (L.type !== "checkbox" && L.type !== "radio")
                ? z && Ii(z.elementType) && (I = po)
                : (I = Q0);
          if (I && (I = I(e, z))) {
            xo(Q, I, a, Y);
            break e;
          }
          he && he(e, L, z),
            e === "focusout" &&
              z &&
              L.type === "number" &&
              z.memoizedProps.value != null &&
              Wi(L, "number", L.value);
        }
        switch (((he = z ? Fl(z) : window), e)) {
          case "focusin":
            (ho(he) || he.contentEditable === "true") &&
              ((fl = he), (mr = z), (sn = null));
            break;
          case "focusout":
            sn = mr = fl = null;
            break;
          case "mousedown":
            hr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (hr = !1), Eo(Q, a, Y);
            break;
          case "selectionchange":
            if (J0) break;
          case "keydown":
          case "keyup":
            Eo(Q, a, Y);
        }
        var te;
        if (cr)
          e: {
            switch (e) {
              case "compositionstart":
                var se = "onCompositionStart";
                break e;
              case "compositionend":
                se = "onCompositionEnd";
                break e;
              case "compositionupdate":
                se = "onCompositionUpdate";
                break e;
            }
            se = void 0;
          }
        else
          dl
            ? fo(e, a) && (se = "onCompositionEnd")
            : e === "keydown" &&
              a.keyCode === 229 &&
              (se = "onCompositionStart");
        se &&
          (uo &&
            a.locale !== "ko" &&
            (dl || se !== "onCompositionStart"
              ? se === "onCompositionEnd" && dl && (te = lo())
              : ((ca = Y),
                (nr = "value" in ca ? ca.value : ca.textContent),
                (dl = !0))),
          (he = ti(z, se)),
          0 < he.length &&
            ((se = new io(se, e, null, a, Y)),
            Q.push({ event: se, listeners: he }),
            te
              ? (se.data = te)
              : ((te = mo(a)), te !== null && (se.data = te)))),
          (te = B0 ? H0(e, a) : q0(e, a)) &&
            ((se = ti(z, "onBeforeInput")),
            0 < se.length &&
              ((he = new io("onBeforeInput", "beforeinput", null, a, Y)),
              Q.push({ event: he, listeners: se }),
              (he.data = te))),
          Cx(Q, e, z, a, Y);
      }
      Ff(Q, t);
    });
  }
  function zn(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function ti(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var n = e,
        r = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          r === null ||
          ((n = Pl(e, a)),
          n != null && l.unshift(zn(e, n, r)),
          (n = Pl(e, t)),
          n != null && l.push(zn(e, n, r))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function Ul(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Wf(e, t, a, l, n) {
    for (var r = t._reactName, f = []; a !== null && a !== l; ) {
      var x = a,
        v = x.alternate,
        z = x.stateNode;
      if (((x = x.tag), v !== null && v === l)) break;
      (x !== 5 && x !== 26 && x !== 27) ||
        z === null ||
        ((v = z),
        n
          ? ((z = Pl(a, r)), z != null && f.unshift(zn(a, z, v)))
          : n || ((z = Pl(a, r)), z != null && f.push(zn(a, z, v)))),
        (a = a.return);
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var zx = /\r\n?/g,
    kx = /\u0000|\uFFFD/g;
  function If(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        zx,
        `
`
      )
      .replace(kx, "");
  }
  function em(e, t) {
    return (t = If(t)), If(e) === t;
  }
  function ai() {}
  function Ae(e, t, a, l, n, r) {
    switch (a) {
      case "children":
        typeof l == "string"
          ? t === "body" || (t === "textarea" && l === "") || ul(e, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            t !== "body" &&
            ul(e, "" + l);
        break;
      case "className":
        rs(e, "class", l);
        break;
      case "tabIndex":
        rs(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        rs(e, a, l);
        break;
      case "style":
        eo(e, l, r);
        break;
      case "data":
        if (t !== "object") {
          rs(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          e.removeAttribute(a);
          break;
        }
        (l = os("" + l)), e.setAttribute(a, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" &&
            (a === "formAction"
              ? (t !== "input" && Ae(e, t, "name", n.name, n, null),
                Ae(e, t, "formEncType", n.formEncType, n, null),
                Ae(e, t, "formMethod", n.formMethod, n, null),
                Ae(e, t, "formTarget", n.formTarget, n, null))
              : (Ae(e, t, "encType", n.encType, n, null),
                Ae(e, t, "method", n.method, n, null),
                Ae(e, t, "target", n.target, n, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        (l = os("" + l)), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = ai);
        break;
      case "onScroll":
        l != null && ge("scroll", e);
        break;
      case "onScrollEnd":
        l != null && ge("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(c(61));
          if (((a = l.__html), a != null)) {
            if (n.children != null) throw Error(c(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (a = os("" + l)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(a, "" + l)
          : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(a, "")
          : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        l === !0
          ? e.setAttribute(a, "")
          : l !== !1 &&
            l != null &&
            typeof l != "function" &&
            typeof l != "symbol"
          ? e.setAttribute(a, l)
          : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? e.setAttribute(a, l)
          : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? e.removeAttribute(a)
          : e.setAttribute(a, l);
        break;
      case "popover":
        ge("beforetoggle", e), ge("toggle", e), is(e, "popover", l);
        break;
      case "xlinkActuate":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        is(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = d0.get(a) || a), is(e, a, l));
    }
  }
  function Lu(e, t, a, l, n, r) {
    switch (a) {
      case "style":
        eo(e, l, r);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(c(61));
          if (((a = l.__html), a != null)) {
            if (n.children != null) throw Error(c(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? ul(e, l)
          : (typeof l == "number" || typeof l == "bigint") && ul(e, "" + l);
        break;
      case "onScroll":
        l != null && ge("scroll", e);
        break;
      case "onScrollEnd":
        l != null && ge("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = ai);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Gc.hasOwnProperty(a))
          e: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((n = a.endsWith("Capture")),
              (t = a.slice(2, n ? a.length - 7 : void 0)),
              (r = e[lt] || null),
              (r = r != null ? r[a] : null),
              typeof r == "function" && e.removeEventListener(t, r, n),
              typeof l == "function")
            ) {
              typeof r != "function" &&
                r !== null &&
                (a in e
                  ? (e[a] = null)
                  : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, l, n);
              break e;
            }
            a in e
              ? (e[a] = l)
              : l === !0
              ? e.setAttribute(a, "")
              : is(e, a, l);
          }
    }
  }
  function Pe(e, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ge("error", e), ge("load", e);
        var l = !1,
          n = !1,
          r;
        for (r in a)
          if (a.hasOwnProperty(r)) {
            var f = a[r];
            if (f != null)
              switch (r) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  Ae(e, t, r, f, a, null);
              }
          }
        n && Ae(e, t, "srcSet", a.srcSet, a, null),
          l && Ae(e, t, "src", a.src, a, null);
        return;
      case "input":
        ge("invalid", e);
        var x = (r = f = n = null),
          v = null,
          z = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var Y = a[l];
            if (Y != null)
              switch (l) {
                case "name":
                  n = Y;
                  break;
                case "type":
                  f = Y;
                  break;
                case "checked":
                  v = Y;
                  break;
                case "defaultChecked":
                  z = Y;
                  break;
                case "value":
                  r = Y;
                  break;
                case "defaultValue":
                  x = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null) throw Error(c(137, t));
                  break;
                default:
                  Ae(e, t, l, Y, a, null);
              }
          }
        Fc(e, r, x, v, z, f, n, !1), us(e);
        return;
      case "select":
        ge("invalid", e), (l = f = r = null);
        for (n in a)
          if (a.hasOwnProperty(n) && ((x = a[n]), x != null))
            switch (n) {
              case "value":
                r = x;
                break;
              case "defaultValue":
                f = x;
                break;
              case "multiple":
                l = x;
              default:
                Ae(e, t, n, x, a, null);
            }
        (t = r),
          (a = f),
          (e.multiple = !!l),
          t != null ? rl(e, !!l, t, !1) : a != null && rl(e, !!l, a, !0);
        return;
      case "textarea":
        ge("invalid", e), (r = n = l = null);
        for (f in a)
          if (a.hasOwnProperty(f) && ((x = a[f]), x != null))
            switch (f) {
              case "value":
                l = x;
                break;
              case "defaultValue":
                n = x;
                break;
              case "children":
                r = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(c(91));
                break;
              default:
                Ae(e, t, f, x, a, null);
            }
        Wc(e, l, n, r), us(e);
        return;
      case "option":
        for (v in a)
          if (a.hasOwnProperty(v) && ((l = a[v]), l != null))
            switch (v) {
              case "selected":
                e.selected =
                  l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ae(e, t, v, l, a, null);
            }
        return;
      case "dialog":
        ge("beforetoggle", e), ge("toggle", e), ge("cancel", e), ge("close", e);
        break;
      case "iframe":
      case "object":
        ge("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Dn.length; l++) ge(Dn[l], e);
        break;
      case "image":
        ge("error", e), ge("load", e);
        break;
      case "details":
        ge("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ge("error", e), ge("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in a)
          if (a.hasOwnProperty(z) && ((l = a[z]), l != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                Ae(e, t, z, l, a, null);
            }
        return;
      default:
        if (Ii(t)) {
          for (Y in a)
            a.hasOwnProperty(Y) &&
              ((l = a[Y]), l !== void 0 && Lu(e, t, Y, l, a, void 0));
          return;
        }
    }
    for (x in a)
      a.hasOwnProperty(x) && ((l = a[x]), l != null && Ae(e, t, x, l, a, null));
  }
  function Ux(e, t, a, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null,
          r = null,
          f = null,
          x = null,
          v = null,
          z = null,
          Y = null;
        for (B in a) {
          var Q = a[B];
          if (a.hasOwnProperty(B) && Q != null)
            switch (B) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = Q;
              default:
                l.hasOwnProperty(B) || Ae(e, t, B, null, l, Q);
            }
        }
        for (var L in l) {
          var B = l[L];
          if (((Q = a[L]), l.hasOwnProperty(L) && (B != null || Q != null)))
            switch (L) {
              case "type":
                r = B;
                break;
              case "name":
                n = B;
                break;
              case "checked":
                z = B;
                break;
              case "defaultChecked":
                Y = B;
                break;
              case "value":
                f = B;
                break;
              case "defaultValue":
                x = B;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null) throw Error(c(137, t));
                break;
              default:
                B !== Q && Ae(e, t, L, B, l, Q);
            }
        }
        Pi(e, f, x, v, z, Y, r, n);
        return;
      case "select":
        B = f = x = L = null;
        for (r in a)
          if (((v = a[r]), a.hasOwnProperty(r) && v != null))
            switch (r) {
              case "value":
                break;
              case "multiple":
                B = v;
              default:
                l.hasOwnProperty(r) || Ae(e, t, r, null, l, v);
            }
        for (n in l)
          if (
            ((r = l[n]),
            (v = a[n]),
            l.hasOwnProperty(n) && (r != null || v != null))
          )
            switch (n) {
              case "value":
                L = r;
                break;
              case "defaultValue":
                x = r;
                break;
              case "multiple":
                f = r;
              default:
                r !== v && Ae(e, t, n, r, l, v);
            }
        (t = x),
          (a = f),
          (l = B),
          L != null
            ? rl(e, !!a, L, !1)
            : !!l != !!a &&
              (t != null ? rl(e, !!a, t, !0) : rl(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        B = L = null;
        for (x in a)
          if (
            ((n = a[x]),
            a.hasOwnProperty(x) && n != null && !l.hasOwnProperty(x))
          )
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ae(e, t, x, null, l, n);
            }
        for (f in l)
          if (
            ((n = l[f]),
            (r = a[f]),
            l.hasOwnProperty(f) && (n != null || r != null))
          )
            switch (f) {
              case "value":
                L = n;
                break;
              case "defaultValue":
                B = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(c(91));
                break;
              default:
                n !== r && Ae(e, t, f, n, l, r);
            }
        Pc(e, L, B);
        return;
      case "option":
        for (var re in a)
          if (
            ((L = a[re]),
            a.hasOwnProperty(re) && L != null && !l.hasOwnProperty(re))
          )
            switch (re) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ae(e, t, re, null, l, L);
            }
        for (v in l)
          if (
            ((L = l[v]),
            (B = a[v]),
            l.hasOwnProperty(v) && L !== B && (L != null || B != null))
          )
            switch (v) {
              case "selected":
                e.selected =
                  L && typeof L != "function" && typeof L != "symbol";
                break;
              default:
                Ae(e, t, v, L, l, B);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ne in a)
          (L = a[ne]),
            a.hasOwnProperty(ne) &&
              L != null &&
              !l.hasOwnProperty(ne) &&
              Ae(e, t, ne, null, l, L);
        for (z in l)
          if (
            ((L = l[z]),
            (B = a[z]),
            l.hasOwnProperty(z) && L !== B && (L != null || B != null))
          )
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(c(137, t));
                break;
              default:
                Ae(e, t, z, L, l, B);
            }
        return;
      default:
        if (Ii(t)) {
          for (var Te in a)
            (L = a[Te]),
              a.hasOwnProperty(Te) &&
                L !== void 0 &&
                !l.hasOwnProperty(Te) &&
                Lu(e, t, Te, void 0, l, L);
          for (Y in l)
            (L = l[Y]),
              (B = a[Y]),
              !l.hasOwnProperty(Y) ||
                L === B ||
                (L === void 0 && B === void 0) ||
                Lu(e, t, Y, L, l, B);
          return;
        }
    }
    for (var A in a)
      (L = a[A]),
        a.hasOwnProperty(A) &&
          L != null &&
          !l.hasOwnProperty(A) &&
          Ae(e, t, A, null, l, L);
    for (Q in l)
      (L = l[Q]),
        (B = a[Q]),
        !l.hasOwnProperty(Q) ||
          L === B ||
          (L == null && B == null) ||
          Ae(e, t, Q, L, l, B);
  }
  var Bu = null,
    Hu = null;
  function li(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function tm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function am(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function qu(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Yu = null;
  function Lx() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === Yu
        ? !1
        : ((Yu = e), !0)
      : ((Yu = null), !1);
  }
  var lm = typeof setTimeout == "function" ? setTimeout : void 0,
    Bx = typeof clearTimeout == "function" ? clearTimeout : void 0,
    nm = typeof Promise == "function" ? Promise : void 0,
    Hx =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof nm < "u"
        ? function (e) {
            return nm.resolve(null).then(e).catch(qx);
          }
        : lm;
  function qx(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ea(e) {
    return e === "head";
  }
  function sm(e, t) {
    var a = t,
      l = 0,
      n = 0;
    do {
      var r = a.nextSibling;
      if ((e.removeChild(a), r && r.nodeType === 8))
        if (((a = r.data), a === "/$")) {
          if (0 < l && 8 > l) {
            a = l;
            var f = e.ownerDocument;
            if ((a & 1 && kn(f.documentElement), a & 2 && kn(f.body), a & 4))
              for (a = f.head, kn(a), f = a.firstChild; f; ) {
                var x = f.nextSibling,
                  v = f.nodeName;
                f[$l] ||
                  v === "SCRIPT" ||
                  v === "STYLE" ||
                  (v === "LINK" && f.rel.toLowerCase() === "stylesheet") ||
                  a.removeChild(f),
                  (f = x);
              }
          }
          if (n === 0) {
            e.removeChild(r), Gn(t);
            return;
          }
          n--;
        } else
          a === "$" || a === "$?" || a === "$!"
            ? n++
            : (l = a.charCodeAt(0) - 48);
      else l = 0;
      a = r;
    } while (a);
    Gn(t);
  }
  function Vu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Vu(a), Ki(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function Yx(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (l) {
        if (!e[$l])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((r = e.getAttribute("rel")),
                r === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                r !== n.rel ||
                e.getAttribute("href") !==
                  (n.href == null || n.href === "" ? null : n.href) ||
                e.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin) ||
                e.getAttribute("title") !== (n.title == null ? null : n.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((r = e.getAttribute("src")),
                (r !== (n.src == null ? null : n.src) ||
                  e.getAttribute("type") !== (n.type == null ? null : n.type) ||
                  e.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  r &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var r = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === r) return e;
      } else return e;
      if (((e = Ct(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Vx(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !a) ||
        ((e = Ct(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Gu(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function Gx(e, t) {
    var a = e.ownerDocument;
    if (e.data !== "$?" || a.readyState === "complete") t();
    else {
      var l = function () {
        t(), a.removeEventListener("DOMContentLoaded", l);
      };
      a.addEventListener("DOMContentLoaded", l), (e._reactRetry = l);
    }
  }
  function Ct(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var Xu = null;
  function im(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (t === 0) return e;
          t--;
        } else a === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function rm(e, t, a) {
    switch (((t = li(a)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(c(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(c(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function kn(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Ki(e);
  }
  var At = new Map(),
    um = new Set();
  function ni(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
      ? e
      : e.ownerDocument;
  }
  var aa = V.d;
  V.d = { f: Xx, r: Qx, D: Zx, C: Kx, L: Jx, m: $x, X: Px, S: Fx, M: Wx };
  function Xx() {
    var e = aa.f(),
      t = $s();
    return e || t;
  }
  function Qx(e) {
    var t = ll(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ad(t) : aa.r(e);
  }
  var Ll = typeof document > "u" ? null : document;
  function cm(e, t, a) {
    var l = Ll;
    if (l && typeof t == "string" && t) {
      var n = vt(t);
      (n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof a == "string" && (n += '[crossorigin="' + a + '"]'),
        um.has(n) ||
          (um.add(n),
          (e = { rel: e, crossOrigin: a, href: t }),
          l.querySelector(n) === null &&
            ((t = l.createElement("link")),
            Pe(t, "link", e),
            Qe(t),
            l.head.appendChild(t)));
    }
  }
  function Zx(e) {
    aa.D(e), cm("dns-prefetch", e, null);
  }
  function Kx(e, t) {
    aa.C(e, t), cm("preconnect", e, t);
  }
  function Jx(e, t, a) {
    aa.L(e, t, a);
    var l = Ll;
    if (l && e && t) {
      var n = 'link[rel="preload"][as="' + vt(t) + '"]';
      t === "image" && a && a.imageSrcSet
        ? ((n += '[imagesrcset="' + vt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (n += '[imagesizes="' + vt(a.imageSizes) + '"]'))
        : (n += '[href="' + vt(e) + '"]');
      var r = n;
      switch (t) {
        case "style":
          r = Bl(e);
          break;
        case "script":
          r = Hl(e);
      }
      At.has(r) ||
        ((e = b(
          {
            rel: "preload",
            href: t === "image" && a && a.imageSrcSet ? void 0 : e,
            as: t,
          },
          a
        )),
        At.set(r, e),
        l.querySelector(n) !== null ||
          (t === "style" && l.querySelector(Un(r))) ||
          (t === "script" && l.querySelector(Ln(r))) ||
          ((t = l.createElement("link")),
          Pe(t, "link", e),
          Qe(t),
          l.head.appendChild(t)));
    }
  }
  function $x(e, t) {
    aa.m(e, t);
    var a = Ll;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script",
        n =
          'link[rel="modulepreload"][as="' + vt(l) + '"][href="' + vt(e) + '"]',
        r = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = Hl(e);
      }
      if (
        !At.has(r) &&
        ((e = b({ rel: "modulepreload", href: e }, t)),
        At.set(r, e),
        a.querySelector(n) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Ln(r))) return;
        }
        (l = a.createElement("link")),
          Pe(l, "link", e),
          Qe(l),
          a.head.appendChild(l);
      }
    }
  }
  function Fx(e, t, a) {
    aa.S(e, t, a);
    var l = Ll;
    if (l && e) {
      var n = nl(l).hoistableStyles,
        r = Bl(e);
      t = t || "default";
      var f = n.get(r);
      if (!f) {
        var x = { loading: 0, preload: null };
        if ((f = l.querySelector(Un(r)))) x.loading = 5;
        else {
          (e = b({ rel: "stylesheet", href: e, "data-precedence": t }, a)),
            (a = At.get(r)) && Qu(e, a);
          var v = (f = l.createElement("link"));
          Qe(v),
            Pe(v, "link", e),
            (v._p = new Promise(function (z, Y) {
              (v.onload = z), (v.onerror = Y);
            })),
            v.addEventListener("load", function () {
              x.loading |= 1;
            }),
            v.addEventListener("error", function () {
              x.loading |= 2;
            }),
            (x.loading |= 4),
            si(f, t, l);
        }
        (f = { type: "stylesheet", instance: f, count: 1, state: x }),
          n.set(r, f);
      }
    }
  }
  function Px(e, t) {
    aa.X(e, t);
    var a = Ll;
    if (a && e) {
      var l = nl(a).hoistableScripts,
        n = Hl(e),
        r = l.get(n);
      r ||
        ((r = a.querySelector(Ln(n))),
        r ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = At.get(n)) && Zu(e, t),
          (r = a.createElement("script")),
          Qe(r),
          Pe(r, "link", e),
          a.head.appendChild(r)),
        (r = { type: "script", instance: r, count: 1, state: null }),
        l.set(n, r));
    }
  }
  function Wx(e, t) {
    aa.M(e, t);
    var a = Ll;
    if (a && e) {
      var l = nl(a).hoistableScripts,
        n = Hl(e),
        r = l.get(n);
      r ||
        ((r = a.querySelector(Ln(n))),
        r ||
          ((e = b({ src: e, async: !0, type: "module" }, t)),
          (t = At.get(n)) && Zu(e, t),
          (r = a.createElement("script")),
          Qe(r),
          Pe(r, "link", e),
          a.head.appendChild(r)),
        (r = { type: "script", instance: r, count: 1, state: null }),
        l.set(n, r));
    }
  }
  function om(e, t, a, l) {
    var n = (n = le.current) ? ni(n) : null;
    if (!n) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((t = Bl(a.href)),
            (a = nl(n).hoistableStyles),
            (l = a.get(t)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              a.set(t, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          e = Bl(a.href);
          var r = nl(n).hoistableStyles,
            f = r.get(e);
          if (
            (f ||
              ((n = n.ownerDocument || n),
              (f = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              r.set(e, f),
              (r = n.querySelector(Un(e))) &&
                !r._p &&
                ((f.instance = r), (f.state.loading = 5)),
              At.has(e) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                At.set(e, a),
                r || Ix(n, e, a, f.state))),
            t && l === null)
          )
            throw Error(c(528, ""));
          return f;
        }
        if (t && l !== null) throw Error(c(529, ""));
        return null;
      case "script":
        return (
          (t = a.async),
          (a = a.src),
          typeof a == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Hl(a)),
              (a = nl(n).hoistableScripts),
              (l = a.get(t)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(c(444, e));
    }
  }
  function Bl(e) {
    return 'href="' + vt(e) + '"';
  }
  function Un(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function dm(e) {
    return b({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function Ix(e, t, a, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (l.loading = 1)
      : ((t = e.createElement("link")),
        (l.preload = t),
        t.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        Pe(t, "link", a),
        Qe(t),
        e.head.appendChild(t));
  }
  function Hl(e) {
    return '[src="' + vt(e) + '"]';
  }
  function Ln(e) {
    return "script[async]" + e;
  }
  function fm(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var l = e.querySelector('style[data-href~="' + vt(a.href) + '"]');
          if (l) return (t.instance = l), Qe(l), l;
          var n = b({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (e.ownerDocument || e).createElement("style")),
            Qe(l),
            Pe(l, "style", n),
            si(l, a.precedence, e),
            (t.instance = l)
          );
        case "stylesheet":
          n = Bl(a.href);
          var r = e.querySelector(Un(n));
          if (r) return (t.state.loading |= 4), (t.instance = r), Qe(r), r;
          (l = dm(a)),
            (n = At.get(n)) && Qu(l, n),
            (r = (e.ownerDocument || e).createElement("link")),
            Qe(r);
          var f = r;
          return (
            (f._p = new Promise(function (x, v) {
              (f.onload = x), (f.onerror = v);
            })),
            Pe(r, "link", l),
            (t.state.loading |= 4),
            si(r, a.precedence, e),
            (t.instance = r)
          );
        case "script":
          return (
            (r = Hl(a.src)),
            (n = e.querySelector(Ln(r)))
              ? ((t.instance = n), Qe(n), n)
              : ((l = a),
                (n = At.get(r)) && ((l = b({}, a)), Zu(l, n)),
                (e = e.ownerDocument || e),
                (n = e.createElement("script")),
                Qe(n),
                Pe(n, "link", l),
                e.head.appendChild(n),
                (t.instance = n))
          );
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((l = t.instance), (t.state.loading |= 4), si(l, a.precedence, e));
    return t.instance;
  }
  function si(e, t, a) {
    for (
      var l = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        n = l.length ? l[l.length - 1] : null,
        r = n,
        f = 0;
      f < l.length;
      f++
    ) {
      var x = l[f];
      if (x.dataset.precedence === t) r = x;
      else if (r !== n) break;
    }
    r
      ? r.parentNode.insertBefore(e, r.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function Qu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function Zu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var ii = null;
  function mm(e, t, a) {
    if (ii === null) {
      var l = new Map(),
        n = (ii = new Map());
      n.set(a, l);
    } else (n = ii), (l = n.get(a)), l || ((l = new Map()), n.set(a, l));
    if (l.has(e)) return l;
    for (
      l.set(e, null), a = a.getElementsByTagName(e), n = 0;
      n < a.length;
      n++
    ) {
      var r = a[n];
      if (
        !(
          r[$l] ||
          r[We] ||
          (e === "link" && r.getAttribute("rel") === "stylesheet")
        ) &&
        r.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var f = r.getAttribute(t) || "";
        f = e + f;
        var x = l.get(f);
        x ? x.push(r) : l.set(f, [r]);
      }
    }
    return l;
  }
  function hm(e, t, a) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function ep(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function xm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Bn = null;
  function tp() {}
  function ap(e, t, a) {
    if (Bn === null) throw Error(c(475));
    var l = Bn;
    if (
      t.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var n = Bl(a.href),
          r = e.querySelector(Un(n));
        if (r) {
          (e = r._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (l.count++, (l = ri.bind(l)), e.then(l, l)),
            (t.state.loading |= 4),
            (t.instance = r),
            Qe(r);
          return;
        }
        (r = e.ownerDocument || e),
          (a = dm(a)),
          (n = At.get(n)) && Qu(a, n),
          (r = r.createElement("link")),
          Qe(r);
        var f = r;
        (f._p = new Promise(function (x, v) {
          (f.onload = x), (f.onerror = v);
        })),
          Pe(r, "link", a),
          (t.instance = r);
      }
      l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (l.count++,
          (t = ri.bind(l)),
          e.addEventListener("load", t),
          e.addEventListener("error", t));
    }
  }
  function lp() {
    if (Bn === null) throw Error(c(475));
    var e = Bn;
    return (
      e.stylesheets && e.count === 0 && Ku(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var a = setTimeout(function () {
              if ((e.stylesheets && Ku(e, e.stylesheets), e.unsuspend)) {
                var l = e.unsuspend;
                (e.unsuspend = null), l();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(a);
              }
            );
          }
        : null
    );
  }
  function ri() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Ku(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var ui = null;
  function Ku(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (ui = new Map()),
        t.forEach(np, e),
        (ui = null),
        ri.call(e));
  }
  function np(e, t) {
    if (!(t.state.loading & 4)) {
      var a = ui.get(e);
      if (a) var l = a.get(null);
      else {
        (a = new Map()), ui.set(e, a);
        for (
          var n = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            r = 0;
          r < n.length;
          r++
        ) {
          var f = n[r];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
            (a.set(f.dataset.precedence, f), (l = f));
        }
        l && a.set(null, l);
      }
      (n = t.instance),
        (f = n.getAttribute("data-precedence")),
        (r = a.get(f) || l),
        r === l && a.set(null, n),
        a.set(f, n),
        this.count++,
        (l = ri.bind(this)),
        n.addEventListener("load", l),
        n.addEventListener("error", l),
        r
          ? r.parentNode.insertBefore(n, r.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Hn = {
    $$typeof: M,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0,
  };
  function sp(e, t, a, l, n, r, f, x) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Gi(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Gi(0)),
      (this.hiddenUpdates = Gi(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = n),
      (this.onCaughtError = r),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map());
  }
  function pm(e, t, a, l, n, r, f, x, v, z, Y, Q) {
    return (
      (e = new sp(e, t, a, f, x, v, z, Q)),
      (t = 1),
      r === !0 && (t |= 24),
      (r = mt(3, null, null, t)),
      (e.current = r),
      (r.stateNode = e),
      (t = Tr()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (r.memoizedState = { element: l, isDehydrated: a, cache: t }),
      Mr(r),
      e
    );
  }
  function gm(e) {
    return e ? ((e = pl), e) : pl;
  }
  function ym(e, t, a, l, n, r) {
    (n = gm(n)),
      l.context === null ? (l.context = n) : (l.pendingContext = n),
      (l = fa(t)),
      (l.payload = { element: a }),
      (r = r === void 0 ? null : r),
      r !== null && (l.callback = r),
      (a = ma(e, l, t)),
      a !== null && (yt(a, e, t), xn(a, e, t));
  }
  function bm(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Ju(e, t) {
    bm(e, t), (e = e.alternate) && bm(e, t);
  }
  function vm(e) {
    if (e.tag === 13) {
      var t = xl(e, 67108864);
      t !== null && yt(t, e, 67108864), Ju(e, 67108864);
    }
  }
  var ci = !0;
  function ip(e, t, a, l) {
    var n = w.T;
    w.T = null;
    var r = V.p;
    try {
      (V.p = 2), $u(e, t, a, l);
    } finally {
      (V.p = r), (w.T = n);
    }
  }
  function rp(e, t, a, l) {
    var n = w.T;
    w.T = null;
    var r = V.p;
    try {
      (V.p = 8), $u(e, t, a, l);
    } finally {
      (V.p = r), (w.T = n);
    }
  }
  function $u(e, t, a, l) {
    if (ci) {
      var n = Fu(l);
      if (n === null) Uu(e, t, l, oi, a), Nm(e, l);
      else if (cp(n, e, t, a, l)) l.stopPropagation();
      else if ((Nm(e, l), t & 4 && -1 < up.indexOf(e))) {
        for (; n !== null; ) {
          var r = ll(n);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (((r = r.stateNode), r.current.memoizedState.isDehydrated)) {
                  var f = Da(r.pendingLanes);
                  if (f !== 0) {
                    var x = r;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; f; ) {
                      var v = 1 << (31 - dt(f));
                      (x.entanglements[1] |= v), (f &= ~v);
                    }
                    Ht(r), (we & 6) === 0 && ((Ks = zt() + 500), Mn(0));
                  }
                }
                break;
              case 13:
                (x = xl(r, 2)), x !== null && yt(x, r, 2), $s(), Ju(r, 2);
            }
          if (((r = Fu(l)), r === null && Uu(e, t, l, oi, a), r === n)) break;
          n = r;
        }
        n !== null && l.stopPropagation();
      } else Uu(e, t, l, null, a);
    }
  }
  function Fu(e) {
    return (e = tr(e)), Pu(e);
  }
  var oi = null;
  function Pu(e) {
    if (((oi = null), (e = al(e)), e !== null)) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = p(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (oi = e), null;
  }
  function jm(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Kh()) {
          case Dc:
            return 2;
          case zc:
            return 8;
          case as:
          case Jh:
            return 32;
          case kc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Wu = !1,
    _a = null,
    Aa = null,
    Ta = null,
    qn = new Map(),
    Yn = new Map(),
    Ra = [],
    up =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Nm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        _a = null;
        break;
      case "dragenter":
      case "dragleave":
        Aa = null;
        break;
      case "mouseover":
      case "mouseout":
        Ta = null;
        break;
      case "pointerover":
      case "pointerout":
        qn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Yn.delete(t.pointerId);
    }
  }
  function Vn(e, t, a, l, n, r) {
    return e === null || e.nativeEvent !== r
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: l,
          nativeEvent: r,
          targetContainers: [n],
        }),
        t !== null && ((t = ll(t)), t !== null && vm(t)),
        e)
      : ((e.eventSystemFlags |= l),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e);
  }
  function cp(e, t, a, l, n) {
    switch (t) {
      case "focusin":
        return (_a = Vn(_a, e, t, a, l, n)), !0;
      case "dragenter":
        return (Aa = Vn(Aa, e, t, a, l, n)), !0;
      case "mouseover":
        return (Ta = Vn(Ta, e, t, a, l, n)), !0;
      case "pointerover":
        var r = n.pointerId;
        return qn.set(r, Vn(qn.get(r) || null, e, t, a, l, n)), !0;
      case "gotpointercapture":
        return (
          (r = n.pointerId), Yn.set(r, Vn(Yn.get(r) || null, e, t, a, l, n)), !0
        );
    }
    return !1;
  }
  function Sm(e) {
    var t = al(e.target);
    if (t !== null) {
      var a = m(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = p(a)), t !== null)) {
            (e.blockedOn = t),
              a0(e.priority, function () {
                if (a.tag === 13) {
                  var l = gt();
                  l = Xi(l);
                  var n = xl(a, l);
                  n !== null && yt(n, a, l), Ju(a, l);
                }
              });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function di(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Fu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(a.type, a);
        (er = l), a.target.dispatchEvent(l), (er = null);
      } else return (t = ll(a)), t !== null && vm(t), (e.blockedOn = a), !1;
      t.shift();
    }
    return !0;
  }
  function wm(e, t, a) {
    di(e) && a.delete(t);
  }
  function op() {
    (Wu = !1),
      _a !== null && di(_a) && (_a = null),
      Aa !== null && di(Aa) && (Aa = null),
      Ta !== null && di(Ta) && (Ta = null),
      qn.forEach(wm),
      Yn.forEach(wm);
  }
  function fi(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Wu ||
        ((Wu = !0),
        s.unstable_scheduleCallback(s.unstable_NormalPriority, op)));
  }
  var mi = null;
  function Em(e) {
    mi !== e &&
      ((mi = e),
      s.unstable_scheduleCallback(s.unstable_NormalPriority, function () {
        mi === e && (mi = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            l = e[t + 1],
            n = e[t + 2];
          if (typeof l != "function") {
            if (Pu(l || a) === null) continue;
            break;
          }
          var r = ll(a);
          r !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Pr(r, { pending: !0, data: n, method: a.method, action: l }, l, n));
        }
      }));
  }
  function Gn(e) {
    function t(v) {
      return fi(v, e);
    }
    _a !== null && fi(_a, e),
      Aa !== null && fi(Aa, e),
      Ta !== null && fi(Ta, e),
      qn.forEach(t),
      Yn.forEach(t);
    for (var a = 0; a < Ra.length; a++) {
      var l = Ra[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Ra.length && ((a = Ra[0]), a.blockedOn === null); )
      Sm(a), a.blockedOn === null && Ra.shift();
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (l = 0; l < a.length; l += 3) {
        var n = a[l],
          r = a[l + 1],
          f = n[lt] || null;
        if (typeof r == "function") f || Em(a);
        else if (f) {
          var x = null;
          if (r && r.hasAttribute("formAction")) {
            if (((n = r), (f = r[lt] || null))) x = f.formAction;
            else if (Pu(n) !== null) continue;
          } else x = f.action;
          typeof x == "function" ? (a[l + 1] = x) : (a.splice(l, 3), (l -= 3)),
            Em(a);
        }
      }
  }
  function Iu(e) {
    this._internalRoot = e;
  }
  (hi.prototype.render = Iu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(c(409));
      var a = t.current,
        l = gt();
      ym(a, l, e, t, null, null);
    }),
    (hi.prototype.unmount = Iu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          ym(e.current, 2, null, e, null, null), $s(), (t[tl] = null);
        }
      });
  function hi(e) {
    this._internalRoot = e;
  }
  hi.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = qc();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Ra.length && t !== 0 && t < Ra[a].priority; a++);
      Ra.splice(a, 0, e), a === 0 && Sm(e);
    }
  };
  var _m = u.version;
  if (_m !== "19.1.1") throw Error(c(527, _m, "19.1.1"));
  V.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(c(188))
        : ((e = Object.keys(e).join(",")), Error(c(268, e)));
    return (
      (e = g(t)),
      (e = e !== null ? h(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var dp = {
    bundleType: 0,
    version: "19.1.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: w,
    reconcilerVersion: "19.1.1",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var xi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!xi.isDisabled && xi.supportsFiber)
      try {
        (Zl = xi.inject(dp)), (ot = xi);
      } catch {}
  }
  return (
    (Qn.createRoot = function (e, t) {
      if (!d(e)) throw Error(c(299));
      var a = !1,
        l = "",
        n = Yd,
        r = Vd,
        f = Gd,
        x = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (r = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (x = t.unstable_transitionCallbacks)),
        (t = pm(e, 1, !1, null, null, a, l, n, r, f, x, null)),
        (e[tl] = t.current),
        ku(e),
        new Iu(t)
      );
    }),
    (Qn.hydrateRoot = function (e, t, a) {
      if (!d(e)) throw Error(c(299));
      var l = !1,
        n = "",
        r = Yd,
        f = Vd,
        x = Gd,
        v = null,
        z = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (l = !0),
          a.identifierPrefix !== void 0 && (n = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (r = a.onUncaughtError),
          a.onCaughtError !== void 0 && (f = a.onCaughtError),
          a.onRecoverableError !== void 0 && (x = a.onRecoverableError),
          a.unstable_transitionCallbacks !== void 0 &&
            (v = a.unstable_transitionCallbacks),
          a.formState !== void 0 && (z = a.formState)),
        (t = pm(e, 1, !0, t, a ?? null, l, n, r, f, x, v, z)),
        (t.context = gm(null)),
        (a = t.current),
        (l = gt()),
        (l = Xi(l)),
        (n = fa(l)),
        (n.callback = null),
        ma(a, n, l),
        (a = l),
        (t.current.lanes = a),
        Jl(t, a),
        Ht(t),
        (e[tl] = t.current),
        ku(e),
        new hi(t)
      );
    }),
    (Qn.version = "19.1.1"),
    Qn
  );
}
var Um;
function Np() {
  if (Um) return tc.exports;
  Um = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (u) {
        console.error(u);
      }
  }
  return s(), (tc.exports = jp()), tc.exports;
}
var Sp = Np(),
  S = Nc();
const wp = mp(S);
var Zn = {},
  Lm;
function Ep() {
  if (Lm) return Zn;
  (Lm = 1),
    Object.defineProperty(Zn, "__esModule", { value: !0 }),
    (Zn.parse = p),
    (Zn.serialize = h);
  const s = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    u = /^[\u0021-\u003A\u003C-\u007E]*$/,
    o =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    c = /^[\u0020-\u003A\u003D-\u007E]*$/,
    d = Object.prototype.toString,
    m = (() => {
      const E = function () {};
      return (E.prototype = Object.create(null)), E;
    })();
  function p(E, k) {
    const j = new m(),
      R = E.length;
    if (R < 2) return j;
    const C = (k == null ? void 0 : k.decode) || b;
    let q = 0;
    do {
      const X = E.indexOf("=", q);
      if (X === -1) break;
      const M = E.indexOf(";", q),
        J = M === -1 ? R : M;
      if (X > J) {
        q = E.lastIndexOf(";", X - 1) + 1;
        continue;
      }
      const U = y(E, q, X),
        F = g(E, X, U),
        ee = E.slice(U, F);
      if (j[ee] === void 0) {
        let ie = y(E, X + 1, J),
          ue = g(E, J, ie);
        const ye = C(E.slice(ie, ue));
        j[ee] = ye;
      }
      q = J + 1;
    } while (q < R);
    return j;
  }
  function y(E, k, j) {
    do {
      const R = E.charCodeAt(k);
      if (R !== 32 && R !== 9) return k;
    } while (++k < j);
    return j;
  }
  function g(E, k, j) {
    for (; k > j; ) {
      const R = E.charCodeAt(--k);
      if (R !== 32 && R !== 9) return k + 1;
    }
    return j;
  }
  function h(E, k, j) {
    const R = (j == null ? void 0 : j.encode) || encodeURIComponent;
    if (!s.test(E)) throw new TypeError(`argument name is invalid: ${E}`);
    const C = R(k);
    if (!u.test(C)) throw new TypeError(`argument val is invalid: ${k}`);
    let q = E + "=" + C;
    if (!j) return q;
    if (j.maxAge !== void 0) {
      if (!Number.isInteger(j.maxAge))
        throw new TypeError(`option maxAge is invalid: ${j.maxAge}`);
      q += "; Max-Age=" + j.maxAge;
    }
    if (j.domain) {
      if (!o.test(j.domain))
        throw new TypeError(`option domain is invalid: ${j.domain}`);
      q += "; Domain=" + j.domain;
    }
    if (j.path) {
      if (!c.test(j.path))
        throw new TypeError(`option path is invalid: ${j.path}`);
      q += "; Path=" + j.path;
    }
    if (j.expires) {
      if (!T(j.expires) || !Number.isFinite(j.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${j.expires}`);
      q += "; Expires=" + j.expires.toUTCString();
    }
    if (
      (j.httpOnly && (q += "; HttpOnly"),
      j.secure && (q += "; Secure"),
      j.partitioned && (q += "; Partitioned"),
      j.priority)
    )
      switch (
        typeof j.priority == "string" ? j.priority.toLowerCase() : void 0
      ) {
        case "low":
          q += "; Priority=Low";
          break;
        case "medium":
          q += "; Priority=Medium";
          break;
        case "high":
          q += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${j.priority}`);
      }
    if (j.sameSite)
      switch (
        typeof j.sameSite == "string" ? j.sameSite.toLowerCase() : j.sameSite
      ) {
        case !0:
        case "strict":
          q += "; SameSite=Strict";
          break;
        case "lax":
          q += "; SameSite=Lax";
          break;
        case "none":
          q += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${j.sameSite}`);
      }
    return q;
  }
  function b(E) {
    if (E.indexOf("%") === -1) return E;
    try {
      return decodeURIComponent(E);
    } catch {
      return E;
    }
  }
  function T(E) {
    return d.call(E) === "[object Date]";
  }
  return Zn;
}
Ep();
var Bm = "popstate";
function _p(s = {}) {
  function u(c, d) {
    let { pathname: m, search: p, hash: y } = c.location;
    return hc(
      "",
      { pathname: m, search: p, hash: y },
      (d.state && d.state.usr) || null,
      (d.state && d.state.key) || "default"
    );
  }
  function o(c, d) {
    return typeof d == "string" ? d : $n(d);
  }
  return Tp(u, o, null, s);
}
function ze(s, u) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(u);
}
function Ot(s, u) {
  if (!s) {
    typeof console < "u" && console.warn(u);
    try {
      throw new Error(u);
    } catch {}
  }
}
function Ap() {
  return Math.random().toString(36).substring(2, 10);
}
function Hm(s, u) {
  return { usr: s.state, key: s.key, idx: u };
}
function hc(s, u, o = null, c) {
  return {
    pathname: typeof s == "string" ? s : s.pathname,
    search: "",
    hash: "",
    ...(typeof u == "string" ? Yl(u) : u),
    state: o,
    key: (u && u.key) || c || Ap(),
  };
}
function $n({ pathname: s = "/", search: u = "", hash: o = "" }) {
  return (
    u && u !== "?" && (s += u.charAt(0) === "?" ? u : "?" + u),
    o && o !== "#" && (s += o.charAt(0) === "#" ? o : "#" + o),
    s
  );
}
function Yl(s) {
  let u = {};
  if (s) {
    let o = s.indexOf("#");
    o >= 0 && ((u.hash = s.substring(o)), (s = s.substring(0, o)));
    let c = s.indexOf("?");
    c >= 0 && ((u.search = s.substring(c)), (s = s.substring(0, c))),
      s && (u.pathname = s);
  }
  return u;
}
function Tp(s, u, o, c = {}) {
  let { window: d = document.defaultView, v5Compat: m = !1 } = c,
    p = d.history,
    y = "POP",
    g = null,
    h = b();
  h == null && ((h = 0), p.replaceState({ ...p.state, idx: h }, ""));
  function b() {
    return (p.state || { idx: null }).idx;
  }
  function T() {
    y = "POP";
    let C = b(),
      q = C == null ? null : C - h;
    (h = C), g && g({ action: y, location: R.location, delta: q });
  }
  function E(C, q) {
    y = "PUSH";
    let X = hc(R.location, C, q);
    h = b() + 1;
    let M = Hm(X, h),
      J = R.createHref(X);
    try {
      p.pushState(M, "", J);
    } catch (U) {
      if (U instanceof DOMException && U.name === "DataCloneError") throw U;
      d.location.assign(J);
    }
    m && g && g({ action: y, location: R.location, delta: 1 });
  }
  function k(C, q) {
    y = "REPLACE";
    let X = hc(R.location, C, q);
    h = b();
    let M = Hm(X, h),
      J = R.createHref(X);
    p.replaceState(M, "", J),
      m && g && g({ action: y, location: R.location, delta: 0 });
  }
  function j(C) {
    return Rp(C);
  }
  let R = {
    get action() {
      return y;
    },
    get location() {
      return s(d, p);
    },
    listen(C) {
      if (g) throw new Error("A history only accepts one active listener");
      return (
        d.addEventListener(Bm, T),
        (g = C),
        () => {
          d.removeEventListener(Bm, T), (g = null);
        }
      );
    },
    createHref(C) {
      return u(d, C);
    },
    createURL: j,
    encodeLocation(C) {
      let q = j(C);
      return { pathname: q.pathname, search: q.search, hash: q.hash };
    },
    push: E,
    replace: k,
    go(C) {
      return p.go(C);
    },
  };
  return R;
}
function Rp(s, u = !1) {
  let o = "http://localhost";
  typeof window < "u" &&
    (o =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    ze(o, "No window.location.(origin|href) available to create URL");
  let c = typeof s == "string" ? s : $n(s);
  return (
    (c = c.replace(/ $/, "%20")),
    !u && c.startsWith("//") && (c = o + c),
    new URL(c, o)
  );
}
function nh(s, u, o = "/") {
  return Cp(s, u, o, !1);
}
function Cp(s, u, o, c) {
  let d = typeof u == "string" ? Yl(u) : u,
    m = sa(d.pathname || "/", o);
  if (m == null) return null;
  let p = sh(s);
  Op(p);
  let y = null;
  for (let g = 0; y == null && g < p.length; ++g) {
    let h = Vp(m);
    y = qp(p[g], h, c);
  }
  return y;
}
function sh(s, u = [], o = [], c = "") {
  let d = (m, p, y) => {
    let g = {
      relativePath: y === void 0 ? m.path || "" : y,
      caseSensitive: m.caseSensitive === !0,
      childrenIndex: p,
      route: m,
    };
    g.relativePath.startsWith("/") &&
      (ze(
        g.relativePath.startsWith(c),
        `Absolute route path "${g.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (g.relativePath = g.relativePath.slice(c.length)));
    let h = na([c, g.relativePath]),
      b = o.concat(g);
    m.children &&
      m.children.length > 0 &&
      (ze(
        m.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${h}".`
      ),
      sh(m.children, u, b, h)),
      !(m.path == null && !m.index) &&
        u.push({ path: h, score: Bp(h, m.index), routesMeta: b });
  };
  return (
    s.forEach((m, p) => {
      var y;
      if (m.path === "" || !((y = m.path) != null && y.includes("?"))) d(m, p);
      else for (let g of ih(m.path)) d(m, p, g);
    }),
    u
  );
}
function ih(s) {
  let u = s.split("/");
  if (u.length === 0) return [];
  let [o, ...c] = u,
    d = o.endsWith("?"),
    m = o.replace(/\?$/, "");
  if (c.length === 0) return d ? [m, ""] : [m];
  let p = ih(c.join("/")),
    y = [];
  return (
    y.push(...p.map((g) => (g === "" ? m : [m, g].join("/")))),
    d && y.push(...p),
    y.map((g) => (s.startsWith("/") && g === "" ? "/" : g))
  );
}
function Op(s) {
  s.sort((u, o) =>
    u.score !== o.score
      ? o.score - u.score
      : Hp(
          u.routesMeta.map((c) => c.childrenIndex),
          o.routesMeta.map((c) => c.childrenIndex)
        )
  );
}
var Mp = /^:[\w-]+$/,
  Dp = 3,
  zp = 2,
  kp = 1,
  Up = 10,
  Lp = -2,
  qm = (s) => s === "*";
function Bp(s, u) {
  let o = s.split("/"),
    c = o.length;
  return (
    o.some(qm) && (c += Lp),
    u && (c += zp),
    o
      .filter((d) => !qm(d))
      .reduce((d, m) => d + (Mp.test(m) ? Dp : m === "" ? kp : Up), c)
  );
}
function Hp(s, u) {
  return s.length === u.length && s.slice(0, -1).every((c, d) => c === u[d])
    ? s[s.length - 1] - u[u.length - 1]
    : 0;
}
function qp(s, u, o = !1) {
  let { routesMeta: c } = s,
    d = {},
    m = "/",
    p = [];
  for (let y = 0; y < c.length; ++y) {
    let g = c[y],
      h = y === c.length - 1,
      b = m === "/" ? u : u.slice(m.length) || "/",
      T = _i(
        { path: g.relativePath, caseSensitive: g.caseSensitive, end: h },
        b
      ),
      E = g.route;
    if (
      (!T &&
        h &&
        o &&
        !c[c.length - 1].route.index &&
        (T = _i(
          { path: g.relativePath, caseSensitive: g.caseSensitive, end: !1 },
          b
        )),
      !T)
    )
      return null;
    Object.assign(d, T.params),
      p.push({
        params: d,
        pathname: na([m, T.pathname]),
        pathnameBase: Zp(na([m, T.pathnameBase])),
        route: E,
      }),
      T.pathnameBase !== "/" && (m = na([m, T.pathnameBase]));
  }
  return p;
}
function _i(s, u) {
  typeof s == "string" && (s = { path: s, caseSensitive: !1, end: !0 });
  let [o, c] = Yp(s.path, s.caseSensitive, s.end),
    d = u.match(o);
  if (!d) return null;
  let m = d[0],
    p = m.replace(/(.)\/+$/, "$1"),
    y = d.slice(1);
  return {
    params: c.reduce((h, { paramName: b, isOptional: T }, E) => {
      if (b === "*") {
        let j = y[E] || "";
        p = m.slice(0, m.length - j.length).replace(/(.)\/+$/, "$1");
      }
      const k = y[E];
      return (
        T && !k ? (h[b] = void 0) : (h[b] = (k || "").replace(/%2F/g, "/")), h
      );
    }, {}),
    pathname: m,
    pathnameBase: p,
    pattern: s,
  };
}
function Yp(s, u = !1, o = !0) {
  Ot(
    s === "*" || !s.endsWith("*") || s.endsWith("/*"),
    `Route path "${s}" will be treated as if it were "${s.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let c = [],
    d =
      "^" +
      s
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (p, y, g) => (
            c.push({ paramName: y, isOptional: g != null }),
            g ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    s.endsWith("*")
      ? (c.push({ paramName: "*" }),
        (d += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : o
      ? (d += "\\/*$")
      : s !== "" && s !== "/" && (d += "(?:(?=\\/|$))"),
    [new RegExp(d, u ? void 0 : "i"), c]
  );
}
function Vp(s) {
  try {
    return s
      .split("/")
      .map((u) => decodeURIComponent(u).replace(/\//g, "%2F"))
      .join("/");
  } catch (u) {
    return (
      Ot(
        !1,
        `The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${u}).`
      ),
      s
    );
  }
}
function sa(s, u) {
  if (u === "/") return s;
  if (!s.toLowerCase().startsWith(u.toLowerCase())) return null;
  let o = u.endsWith("/") ? u.length - 1 : u.length,
    c = s.charAt(o);
  return c && c !== "/" ? null : s.slice(o) || "/";
}
function Gp(s, u = "/") {
  let {
    pathname: o,
    search: c = "",
    hash: d = "",
  } = typeof s == "string" ? Yl(s) : s;
  return {
    pathname: o ? (o.startsWith("/") ? o : Xp(o, u)) : u,
    search: Kp(c),
    hash: Jp(d),
  };
}
function Xp(s, u) {
  let o = u.replace(/\/+$/, "").split("/");
  return (
    s.split("/").forEach((d) => {
      d === ".." ? o.length > 1 && o.pop() : d !== "." && o.push(d);
    }),
    o.length > 1 ? o.join("/") : "/"
  );
}
function ic(s, u, o, c) {
  return `Cannot include a '${s}' character in a manually specified \`to.${u}\` field [${JSON.stringify(
    c
  )}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Qp(s) {
  return s.filter(
    (u, o) => o === 0 || (u.route.path && u.route.path.length > 0)
  );
}
function Sc(s) {
  let u = Qp(s);
  return u.map((o, c) => (c === u.length - 1 ? o.pathname : o.pathnameBase));
}
function wc(s, u, o, c = !1) {
  let d;
  typeof s == "string"
    ? (d = Yl(s))
    : ((d = { ...s }),
      ze(
        !d.pathname || !d.pathname.includes("?"),
        ic("?", "pathname", "search", d)
      ),
      ze(
        !d.pathname || !d.pathname.includes("#"),
        ic("#", "pathname", "hash", d)
      ),
      ze(!d.search || !d.search.includes("#"), ic("#", "search", "hash", d)));
  let m = s === "" || d.pathname === "",
    p = m ? "/" : d.pathname,
    y;
  if (p == null) y = o;
  else {
    let T = u.length - 1;
    if (!c && p.startsWith("..")) {
      let E = p.split("/");
      for (; E[0] === ".."; ) E.shift(), (T -= 1);
      d.pathname = E.join("/");
    }
    y = T >= 0 ? u[T] : "/";
  }
  let g = Gp(d, y),
    h = p && p !== "/" && p.endsWith("/"),
    b = (m || p === ".") && o.endsWith("/");
  return !g.pathname.endsWith("/") && (h || b) && (g.pathname += "/"), g;
}
var na = (s) => s.join("/").replace(/\/\/+/g, "/"),
  Zp = (s) => s.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Kp = (s) => (!s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s),
  Jp = (s) => (!s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s);
function $p(s) {
  return (
    s != null &&
    typeof s.status == "number" &&
    typeof s.statusText == "string" &&
    typeof s.internal == "boolean" &&
    "data" in s
  );
}
var rh = ["POST", "PUT", "PATCH", "DELETE"];
new Set(rh);
var Fp = ["GET", ...rh];
new Set(Fp);
var Vl = S.createContext(null);
Vl.displayName = "DataRouter";
var Ri = S.createContext(null);
Ri.displayName = "DataRouterState";
var uh = S.createContext({ isTransitioning: !1 });
uh.displayName = "ViewTransition";
var Pp = S.createContext(new Map());
Pp.displayName = "Fetchers";
var Wp = S.createContext(null);
Wp.displayName = "Await";
var Mt = S.createContext(null);
Mt.displayName = "Navigation";
var Pn = S.createContext(null);
Pn.displayName = "Location";
var Yt = S.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Yt.displayName = "Route";
var Ec = S.createContext(null);
Ec.displayName = "RouteError";
function Ip(s, { relative: u } = {}) {
  ze(
    Gl(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: o, navigator: c } = S.useContext(Mt),
    { hash: d, pathname: m, search: p } = Wn(s, { relative: u }),
    y = m;
  return (
    o !== "/" && (y = m === "/" ? o : na([o, m])),
    c.createHref({ pathname: y, search: p, hash: d })
  );
}
function Gl() {
  return S.useContext(Pn) != null;
}
function Ma() {
  return (
    ze(
      Gl(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    S.useContext(Pn).location
  );
}
var ch =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function oh(s) {
  S.useContext(Mt).static || S.useLayoutEffect(s);
}
function Ci() {
  let { isDataRoute: s } = S.useContext(Yt);
  return s ? fg() : eg();
}
function eg() {
  ze(
    Gl(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let s = S.useContext(Vl),
    { basename: u, navigator: o } = S.useContext(Mt),
    { matches: c } = S.useContext(Yt),
    { pathname: d } = Ma(),
    m = JSON.stringify(Sc(c)),
    p = S.useRef(!1);
  return (
    oh(() => {
      p.current = !0;
    }),
    S.useCallback(
      (g, h = {}) => {
        if ((Ot(p.current, ch), !p.current)) return;
        if (typeof g == "number") {
          o.go(g);
          return;
        }
        let b = wc(g, JSON.parse(m), d, h.relative === "path");
        s == null &&
          u !== "/" &&
          (b.pathname = b.pathname === "/" ? u : na([u, b.pathname])),
          (h.replace ? o.replace : o.push)(b, h.state, h);
      },
      [u, o, m, d, s]
    )
  );
}
S.createContext(null);
function Wn(s, { relative: u } = {}) {
  let { matches: o } = S.useContext(Yt),
    { pathname: c } = Ma(),
    d = JSON.stringify(Sc(o));
  return S.useMemo(() => wc(s, JSON.parse(d), c, u === "path"), [s, d, c, u]);
}
function tg(s, u) {
  return dh(s, u);
}
function dh(s, u, o, c) {
  var q;
  ze(
    Gl(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: d } = S.useContext(Mt),
    { matches: m } = S.useContext(Yt),
    p = m[m.length - 1],
    y = p ? p.params : {},
    g = p ? p.pathname : "/",
    h = p ? p.pathnameBase : "/",
    b = p && p.route;
  {
    let X = (b && b.path) || "";
    fh(
      g,
      !b || X.endsWith("*") || X.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${X}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${X}"> to <Route path="${
        X === "/" ? "*" : `${X}/*`
      }">.`
    );
  }
  let T = Ma(),
    E;
  if (u) {
    let X = typeof u == "string" ? Yl(u) : u;
    ze(
      h === "/" || ((q = X.pathname) == null ? void 0 : q.startsWith(h)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${h}" but pathname "${X.pathname}" was given in the \`location\` prop.`
    ),
      (E = X);
  } else E = T;
  let k = E.pathname || "/",
    j = k;
  if (h !== "/") {
    let X = h.replace(/^\//, "").split("/");
    j = "/" + k.replace(/^\//, "").split("/").slice(X.length).join("/");
  }
  let R = nh(s, { pathname: j });
  Ot(
    b || R != null,
    `No routes matched location "${E.pathname}${E.search}${E.hash}" `
  ),
    Ot(
      R == null ||
        R[R.length - 1].route.element !== void 0 ||
        R[R.length - 1].route.Component !== void 0 ||
        R[R.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${E.pathname}${E.search}${E.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let C = ig(
    R &&
      R.map((X) =>
        Object.assign({}, X, {
          params: Object.assign({}, y, X.params),
          pathname: na([
            h,
            d.encodeLocation
              ? d.encodeLocation(X.pathname).pathname
              : X.pathname,
          ]),
          pathnameBase:
            X.pathnameBase === "/"
              ? h
              : na([
                  h,
                  d.encodeLocation
                    ? d.encodeLocation(X.pathnameBase).pathname
                    : X.pathnameBase,
                ]),
        })
      ),
    m,
    o,
    c
  );
  return u && C
    ? S.createElement(
        Pn.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...E,
            },
            navigationType: "POP",
          },
        },
        C
      )
    : C;
}
function ag() {
  let s = dg(),
    u = $p(s)
      ? `${s.status} ${s.statusText}`
      : s instanceof Error
      ? s.message
      : JSON.stringify(s),
    o = s instanceof Error ? s.stack : null,
    c = "rgba(200,200,200, 0.5)",
    d = { padding: "0.5rem", backgroundColor: c },
    m = { padding: "2px 4px", backgroundColor: c },
    p = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", s),
    (p = S.createElement(
      S.Fragment,
      null,
      S.createElement("p", null, "💿 Hey developer 👋"),
      S.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        S.createElement("code", { style: m }, "ErrorBoundary"),
        " or",
        " ",
        S.createElement("code", { style: m }, "errorElement"),
        " prop on your route."
      )
    )),
    S.createElement(
      S.Fragment,
      null,
      S.createElement("h2", null, "Unexpected Application Error!"),
      S.createElement("h3", { style: { fontStyle: "italic" } }, u),
      o ? S.createElement("pre", { style: d }, o) : null,
      p
    )
  );
}
var lg = S.createElement(ag, null),
  ng = class extends S.Component {
    constructor(s) {
      super(s),
        (this.state = {
          location: s.location,
          revalidation: s.revalidation,
          error: s.error,
        });
    }
    static getDerivedStateFromError(s) {
      return { error: s };
    }
    static getDerivedStateFromProps(s, u) {
      return u.location !== s.location ||
        (u.revalidation !== "idle" && s.revalidation === "idle")
        ? { error: s.error, location: s.location, revalidation: s.revalidation }
        : {
            error: s.error !== void 0 ? s.error : u.error,
            location: u.location,
            revalidation: s.revalidation || u.revalidation,
          };
    }
    componentDidCatch(s, u) {
      console.error(
        "React Router caught the following error during render",
        s,
        u
      );
    }
    render() {
      return this.state.error !== void 0
        ? S.createElement(
            Yt.Provider,
            { value: this.props.routeContext },
            S.createElement(Ec.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function sg({ routeContext: s, match: u, children: o }) {
  let c = S.useContext(Vl);
  return (
    c &&
      c.static &&
      c.staticContext &&
      (u.route.errorElement || u.route.ErrorBoundary) &&
      (c.staticContext._deepestRenderedBoundaryId = u.route.id),
    S.createElement(Yt.Provider, { value: s }, o)
  );
}
function ig(s, u = [], o = null, c = null) {
  if (s == null) {
    if (!o) return null;
    if (o.errors) s = o.matches;
    else if (u.length === 0 && !o.initialized && o.matches.length > 0)
      s = o.matches;
    else return null;
  }
  let d = s,
    m = o == null ? void 0 : o.errors;
  if (m != null) {
    let g = d.findIndex(
      (h) => h.route.id && (m == null ? void 0 : m[h.route.id]) !== void 0
    );
    ze(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        m
      ).join(",")}`
    ),
      (d = d.slice(0, Math.min(d.length, g + 1)));
  }
  let p = !1,
    y = -1;
  if (o)
    for (let g = 0; g < d.length; g++) {
      let h = d[g];
      if (
        ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (y = g),
        h.route.id)
      ) {
        let { loaderData: b, errors: T } = o,
          E =
            h.route.loader &&
            !b.hasOwnProperty(h.route.id) &&
            (!T || T[h.route.id] === void 0);
        if (h.route.lazy || E) {
          (p = !0), y >= 0 ? (d = d.slice(0, y + 1)) : (d = [d[0]]);
          break;
        }
      }
    }
  return d.reduceRight((g, h, b) => {
    let T,
      E = !1,
      k = null,
      j = null;
    o &&
      ((T = m && h.route.id ? m[h.route.id] : void 0),
      (k = h.route.errorElement || lg),
      p &&
        (y < 0 && b === 0
          ? (fh(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (E = !0),
            (j = null))
          : y === b &&
            ((E = !0), (j = h.route.hydrateFallbackElement || null))));
    let R = u.concat(d.slice(0, b + 1)),
      C = () => {
        let q;
        return (
          T
            ? (q = k)
            : E
            ? (q = j)
            : h.route.Component
            ? (q = S.createElement(h.route.Component, null))
            : h.route.element
            ? (q = h.route.element)
            : (q = g),
          S.createElement(sg, {
            match: h,
            routeContext: { outlet: g, matches: R, isDataRoute: o != null },
            children: q,
          })
        );
      };
    return o && (h.route.ErrorBoundary || h.route.errorElement || b === 0)
      ? S.createElement(ng, {
          location: o.location,
          revalidation: o.revalidation,
          component: k,
          error: T,
          children: C(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
        })
      : C();
  }, null);
}
function _c(s) {
  return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function rg(s) {
  let u = S.useContext(Vl);
  return ze(u, _c(s)), u;
}
function ug(s) {
  let u = S.useContext(Ri);
  return ze(u, _c(s)), u;
}
function cg(s) {
  let u = S.useContext(Yt);
  return ze(u, _c(s)), u;
}
function Ac(s) {
  let u = cg(s),
    o = u.matches[u.matches.length - 1];
  return (
    ze(
      o.route.id,
      `${s} can only be used on routes that contain a unique "id"`
    ),
    o.route.id
  );
}
function og() {
  return Ac("useRouteId");
}
function dg() {
  var c;
  let s = S.useContext(Ec),
    u = ug("useRouteError"),
    o = Ac("useRouteError");
  return s !== void 0 ? s : (c = u.errors) == null ? void 0 : c[o];
}
function fg() {
  let { router: s } = rg("useNavigate"),
    u = Ac("useNavigate"),
    o = S.useRef(!1);
  return (
    oh(() => {
      o.current = !0;
    }),
    S.useCallback(
      async (d, m = {}) => {
        Ot(o.current, ch),
          o.current &&
            (typeof d == "number"
              ? s.navigate(d)
              : await s.navigate(d, { fromRouteId: u, ...m }));
      },
      [s, u]
    )
  );
}
var Ym = {};
function fh(s, u, o) {
  !u && !Ym[s] && ((Ym[s] = !0), Ot(!1, o));
}
S.memo(mg);
function mg({ routes: s, future: u, state: o }) {
  return dh(s, void 0, o, u);
}
function hg({ to: s, replace: u, state: o, relative: c }) {
  ze(
    Gl(),
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: d } = S.useContext(Mt);
  Ot(
    !d,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: m } = S.useContext(Yt),
    { pathname: p } = Ma(),
    y = Ci(),
    g = wc(s, Sc(m), p, c === "path"),
    h = JSON.stringify(g);
  return (
    S.useEffect(() => {
      y(JSON.parse(h), { replace: u, state: o, relative: c });
    }, [y, h, c, u, o]),
    null
  );
}
function la(s) {
  ze(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function xg({
  basename: s = "/",
  children: u = null,
  location: o,
  navigationType: c = "POP",
  navigator: d,
  static: m = !1,
}) {
  ze(
    !Gl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let p = s.replace(/^\/*/, "/"),
    y = S.useMemo(
      () => ({ basename: p, navigator: d, static: m, future: {} }),
      [p, d, m]
    );
  typeof o == "string" && (o = Yl(o));
  let {
      pathname: g = "/",
      search: h = "",
      hash: b = "",
      state: T = null,
      key: E = "default",
    } = o,
    k = S.useMemo(() => {
      let j = sa(g, p);
      return j == null
        ? null
        : {
            location: { pathname: j, search: h, hash: b, state: T, key: E },
            navigationType: c,
          };
    }, [p, g, h, b, T, E, c]);
  return (
    Ot(
      k != null,
      `<Router basename="${p}"> is not able to match the URL "${g}${h}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    k == null
      ? null
      : S.createElement(
          Mt.Provider,
          { value: y },
          S.createElement(Pn.Provider, { children: u, value: k })
        )
  );
}
function pg({ children: s, location: u }) {
  return tg(xc(s), u);
}
function xc(s, u = []) {
  let o = [];
  return (
    S.Children.forEach(s, (c, d) => {
      if (!S.isValidElement(c)) return;
      let m = [...u, d];
      if (c.type === S.Fragment) {
        o.push.apply(o, xc(c.props.children, m));
        return;
      }
      ze(
        c.type === la,
        `[${
          typeof c.type == "string" ? c.type : c.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        ze(
          !c.props.index || !c.props.children,
          "An index route cannot have child routes."
        );
      let p = {
        id: c.props.id || m.join("-"),
        caseSensitive: c.props.caseSensitive,
        element: c.props.element,
        Component: c.props.Component,
        index: c.props.index,
        path: c.props.path,
        loader: c.props.loader,
        action: c.props.action,
        hydrateFallbackElement: c.props.hydrateFallbackElement,
        HydrateFallback: c.props.HydrateFallback,
        errorElement: c.props.errorElement,
        ErrorBoundary: c.props.ErrorBoundary,
        hasErrorBoundary:
          c.props.hasErrorBoundary === !0 ||
          c.props.ErrorBoundary != null ||
          c.props.errorElement != null,
        shouldRevalidate: c.props.shouldRevalidate,
        handle: c.props.handle,
        lazy: c.props.lazy,
      };
      c.props.children && (p.children = xc(c.props.children, m)), o.push(p);
    }),
    o
  );
}
var ji = "get",
  Ni = "application/x-www-form-urlencoded";
function Oi(s) {
  return s != null && typeof s.tagName == "string";
}
function gg(s) {
  return Oi(s) && s.tagName.toLowerCase() === "button";
}
function yg(s) {
  return Oi(s) && s.tagName.toLowerCase() === "form";
}
function bg(s) {
  return Oi(s) && s.tagName.toLowerCase() === "input";
}
function vg(s) {
  return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey);
}
function jg(s, u) {
  return s.button === 0 && (!u || u === "_self") && !vg(s);
}
var pi = null;
function Ng() {
  if (pi === null)
    try {
      new FormData(document.createElement("form"), 0), (pi = !1);
    } catch {
      pi = !0;
    }
  return pi;
}
var Sg = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function rc(s) {
  return s != null && !Sg.has(s)
    ? (Ot(
        !1,
        `"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ni}"`
      ),
      null)
    : s;
}
function wg(s, u) {
  let o, c, d, m, p;
  if (yg(s)) {
    let y = s.getAttribute("action");
    (c = y ? sa(y, u) : null),
      (o = s.getAttribute("method") || ji),
      (d = rc(s.getAttribute("enctype")) || Ni),
      (m = new FormData(s));
  } else if (gg(s) || (bg(s) && (s.type === "submit" || s.type === "image"))) {
    let y = s.form;
    if (y == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = s.getAttribute("formaction") || y.getAttribute("action");
    if (
      ((c = g ? sa(g, u) : null),
      (o = s.getAttribute("formmethod") || y.getAttribute("method") || ji),
      (d =
        rc(s.getAttribute("formenctype")) ||
        rc(y.getAttribute("enctype")) ||
        Ni),
      (m = new FormData(y, s)),
      !Ng())
    ) {
      let { name: h, type: b, value: T } = s;
      if (b === "image") {
        let E = h ? `${h}.` : "";
        m.append(`${E}x`, "0"), m.append(`${E}y`, "0");
      } else h && m.append(h, T);
    }
  } else {
    if (Oi(s))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (o = ji), (c = null), (d = Ni), (p = s);
  }
  return (
    m && d === "text/plain" && ((p = m), (m = void 0)),
    { action: c, method: o.toLowerCase(), encType: d, formData: m, body: p }
  );
}
function Tc(s, u) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(u);
}
async function Eg(s, u) {
  if (s.id in u) return u[s.id];
  try {
    let o = await import(s.module);
    return (u[s.id] = o), o;
  } catch (o) {
    return (
      console.error(
        `Error loading route module \`${s.module}\`, reloading page...`
      ),
      console.error(o),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function _g(s) {
  return s == null
    ? !1
    : s.href == null
    ? s.rel === "preload" &&
      typeof s.imageSrcSet == "string" &&
      typeof s.imageSizes == "string"
    : typeof s.rel == "string" && typeof s.href == "string";
}
async function Ag(s, u, o) {
  let c = await Promise.all(
    s.map(async (d) => {
      let m = u.routes[d.route.id];
      if (m) {
        let p = await Eg(m, o);
        return p.links ? p.links() : [];
      }
      return [];
    })
  );
  return Og(
    c
      .flat(1)
      .filter(_g)
      .filter((d) => d.rel === "stylesheet" || d.rel === "preload")
      .map((d) =>
        d.rel === "stylesheet"
          ? { ...d, rel: "prefetch", as: "style" }
          : { ...d, rel: "prefetch" }
      )
  );
}
function Vm(s, u, o, c, d, m) {
  let p = (g, h) => (o[h] ? g.route.id !== o[h].route.id : !0),
    y = (g, h) => {
      var b;
      return (
        o[h].pathname !== g.pathname ||
        (((b = o[h].route.path) == null ? void 0 : b.endsWith("*")) &&
          o[h].params["*"] !== g.params["*"])
      );
    };
  return m === "assets"
    ? u.filter((g, h) => p(g, h) || y(g, h))
    : m === "data"
    ? u.filter((g, h) => {
        var T;
        let b = c.routes[g.route.id];
        if (!b || !b.hasLoader) return !1;
        if (p(g, h) || y(g, h)) return !0;
        if (g.route.shouldRevalidate) {
          let E = g.route.shouldRevalidate({
            currentUrl: new URL(d.pathname + d.search + d.hash, window.origin),
            currentParams: ((T = o[0]) == null ? void 0 : T.params) || {},
            nextUrl: new URL(s, window.origin),
            nextParams: g.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof E == "boolean") return E;
        }
        return !0;
      })
    : [];
}
function Tg(s, u, { includeHydrateFallback: o } = {}) {
  return Rg(
    s
      .map((c) => {
        let d = u.routes[c.route.id];
        if (!d) return [];
        let m = [d.module];
        return (
          d.clientActionModule && (m = m.concat(d.clientActionModule)),
          d.clientLoaderModule && (m = m.concat(d.clientLoaderModule)),
          o &&
            d.hydrateFallbackModule &&
            (m = m.concat(d.hydrateFallbackModule)),
          d.imports && (m = m.concat(d.imports)),
          m
        );
      })
      .flat(1)
  );
}
function Rg(s) {
  return [...new Set(s)];
}
function Cg(s) {
  let u = {},
    o = Object.keys(s).sort();
  for (let c of o) u[c] = s[c];
  return u;
}
function Og(s, u) {
  let o = new Set();
  return (
    new Set(u),
    s.reduce((c, d) => {
      let m = JSON.stringify(Cg(d));
      return o.has(m) || (o.add(m), c.push({ key: m, link: d })), c;
    }, [])
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Mg = new Set([100, 101, 204, 205]);
function Dg(s, u) {
  let o =
    typeof s == "string"
      ? new URL(
          s,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : s;
  return (
    o.pathname === "/"
      ? (o.pathname = "_root.data")
      : u && sa(o.pathname, u) === "/"
      ? (o.pathname = `${u.replace(/\/$/, "")}/_root.data`)
      : (o.pathname = `${o.pathname.replace(/\/$/, "")}.data`),
    o
  );
}
function mh() {
  let s = S.useContext(Vl);
  return (
    Tc(
      s,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    s
  );
}
function zg() {
  let s = S.useContext(Ri);
  return (
    Tc(
      s,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    s
  );
}
var Rc = S.createContext(void 0);
Rc.displayName = "FrameworkContext";
function hh() {
  let s = S.useContext(Rc);
  return (
    Tc(s, "You must render this element inside a <HydratedRouter> element"), s
  );
}
function kg(s, u) {
  let o = S.useContext(Rc),
    [c, d] = S.useState(!1),
    [m, p] = S.useState(!1),
    {
      onFocus: y,
      onBlur: g,
      onMouseEnter: h,
      onMouseLeave: b,
      onTouchStart: T,
    } = u,
    E = S.useRef(null);
  S.useEffect(() => {
    if ((s === "render" && p(!0), s === "viewport")) {
      let R = (q) => {
          q.forEach((X) => {
            p(X.isIntersecting);
          });
        },
        C = new IntersectionObserver(R, { threshold: 0.5 });
      return (
        E.current && C.observe(E.current),
        () => {
          C.disconnect();
        }
      );
    }
  }, [s]),
    S.useEffect(() => {
      if (c) {
        let R = setTimeout(() => {
          p(!0);
        }, 100);
        return () => {
          clearTimeout(R);
        };
      }
    }, [c]);
  let k = () => {
      d(!0);
    },
    j = () => {
      d(!1), p(!1);
    };
  return o
    ? s !== "intent"
      ? [m, E, {}]
      : [
          m,
          E,
          {
            onFocus: Kn(y, k),
            onBlur: Kn(g, j),
            onMouseEnter: Kn(h, k),
            onMouseLeave: Kn(b, j),
            onTouchStart: Kn(T, k),
          },
        ]
    : [!1, E, {}];
}
function Kn(s, u) {
  return (o) => {
    s && s(o), o.defaultPrevented || u(o);
  };
}
function Ug({ page: s, ...u }) {
  let { router: o } = mh(),
    c = S.useMemo(() => nh(o.routes, s, o.basename), [o.routes, s, o.basename]);
  return c ? S.createElement(Bg, { page: s, matches: c, ...u }) : null;
}
function Lg(s) {
  let { manifest: u, routeModules: o } = hh(),
    [c, d] = S.useState([]);
  return (
    S.useEffect(() => {
      let m = !1;
      return (
        Ag(s, u, o).then((p) => {
          m || d(p);
        }),
        () => {
          m = !0;
        }
      );
    }, [s, u, o]),
    c
  );
}
function Bg({ page: s, matches: u, ...o }) {
  let c = Ma(),
    { manifest: d, routeModules: m } = hh(),
    { basename: p } = mh(),
    { loaderData: y, matches: g } = zg(),
    h = S.useMemo(() => Vm(s, u, g, d, c, "data"), [s, u, g, d, c]),
    b = S.useMemo(() => Vm(s, u, g, d, c, "assets"), [s, u, g, d, c]),
    T = S.useMemo(() => {
      if (s === c.pathname + c.search + c.hash) return [];
      let j = new Set(),
        R = !1;
      if (
        (u.forEach((q) => {
          var M;
          let X = d.routes[q.route.id];
          !X ||
            !X.hasLoader ||
            ((!h.some((J) => J.route.id === q.route.id) &&
              q.route.id in y &&
              (M = m[q.route.id]) != null &&
              M.shouldRevalidate) ||
            X.hasClientLoader
              ? (R = !0)
              : j.add(q.route.id));
        }),
        j.size === 0)
      )
        return [];
      let C = Dg(s, p);
      return (
        R &&
          j.size > 0 &&
          C.searchParams.set(
            "_routes",
            u
              .filter((q) => j.has(q.route.id))
              .map((q) => q.route.id)
              .join(",")
          ),
        [C.pathname + C.search]
      );
    }, [p, y, c, d, h, u, s, m]),
    E = S.useMemo(() => Tg(b, d), [b, d]),
    k = Lg(b);
  return S.createElement(
    S.Fragment,
    null,
    T.map((j) =>
      S.createElement("link", {
        key: j,
        rel: "prefetch",
        as: "fetch",
        href: j,
        ...o,
      })
    ),
    E.map((j) =>
      S.createElement("link", { key: j, rel: "modulepreload", href: j, ...o })
    ),
    k.map(({ key: j, link: R }) => S.createElement("link", { key: j, ...R }))
  );
}
function Hg(...s) {
  return (u) => {
    s.forEach((o) => {
      typeof o == "function" ? o(u) : o != null && (o.current = u);
    });
  };
}
var xh =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  xh && (window.__reactRouterVersion = "7.6.2");
} catch {}
function qg({ basename: s, children: u, window: o }) {
  let c = S.useRef();
  c.current == null && (c.current = _p({ window: o, v5Compat: !0 }));
  let d = c.current,
    [m, p] = S.useState({ action: d.action, location: d.location }),
    y = S.useCallback(
      (g) => {
        S.startTransition(() => p(g));
      },
      [p]
    );
  return (
    S.useLayoutEffect(() => d.listen(y), [d, y]),
    S.createElement(xg, {
      basename: s,
      children: u,
      location: m.location,
      navigationType: m.action,
      navigator: d,
    })
  );
}
var ph = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  gh = S.forwardRef(function (
    {
      onClick: u,
      discover: o = "render",
      prefetch: c = "none",
      relative: d,
      reloadDocument: m,
      replace: p,
      state: y,
      target: g,
      to: h,
      preventScrollReset: b,
      viewTransition: T,
      ...E
    },
    k
  ) {
    let { basename: j } = S.useContext(Mt),
      R = typeof h == "string" && ph.test(h),
      C,
      q = !1;
    if (typeof h == "string" && R && ((C = h), xh))
      try {
        let ue = new URL(window.location.href),
          ye = h.startsWith("//") ? new URL(ue.protocol + h) : new URL(h),
          Me = sa(ye.pathname, j);
        ye.origin === ue.origin && Me != null
          ? (h = Me + ye.search + ye.hash)
          : (q = !0);
      } catch {
        Ot(
          !1,
          `<Link to="${h}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let X = Ip(h, { relative: d }),
      [M, J, U] = kg(c, E),
      F = Gg(h, {
        replace: p,
        state: y,
        target: g,
        preventScrollReset: b,
        relative: d,
        viewTransition: T,
      });
    function ee(ue) {
      u && u(ue), ue.defaultPrevented || F(ue);
    }
    let ie = S.createElement("a", {
      ...E,
      ...U,
      href: C || X,
      onClick: q || m ? u : ee,
      ref: Hg(k, J),
      target: g,
      "data-discover": !R && o === "render" ? "true" : void 0,
    });
    return M && !R
      ? S.createElement(S.Fragment, null, ie, S.createElement(Ug, { page: X }))
      : ie;
  });
gh.displayName = "Link";
var yh = S.forwardRef(function (
  {
    "aria-current": u = "page",
    caseSensitive: o = !1,
    className: c = "",
    end: d = !1,
    style: m,
    to: p,
    viewTransition: y,
    children: g,
    ...h
  },
  b
) {
  let T = Wn(p, { relative: h.relative }),
    E = Ma(),
    k = S.useContext(Ri),
    { navigator: j, basename: R } = S.useContext(Mt),
    C = k != null && Jg(T) && y === !0,
    q = j.encodeLocation ? j.encodeLocation(T).pathname : T.pathname,
    X = E.pathname,
    M =
      k && k.navigation && k.navigation.location
        ? k.navigation.location.pathname
        : null;
  o ||
    ((X = X.toLowerCase()),
    (M = M ? M.toLowerCase() : null),
    (q = q.toLowerCase())),
    M && R && (M = sa(M, R) || M);
  const J = q !== "/" && q.endsWith("/") ? q.length - 1 : q.length;
  let U = X === q || (!d && X.startsWith(q) && X.charAt(J) === "/"),
    F =
      M != null &&
      (M === q || (!d && M.startsWith(q) && M.charAt(q.length) === "/")),
    ee = { isActive: U, isPending: F, isTransitioning: C },
    ie = U ? u : void 0,
    ue;
  typeof c == "function"
    ? (ue = c(ee))
    : (ue = [
        c,
        U ? "active" : null,
        F ? "pending" : null,
        C ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let ye = typeof m == "function" ? m(ee) : m;
  return S.createElement(
    gh,
    {
      ...h,
      "aria-current": ie,
      className: ue,
      ref: b,
      style: ye,
      to: p,
      viewTransition: y,
    },
    typeof g == "function" ? g(ee) : g
  );
});
yh.displayName = "NavLink";
var Yg = S.forwardRef(
  (
    {
      discover: s = "render",
      fetcherKey: u,
      navigate: o,
      reloadDocument: c,
      replace: d,
      state: m,
      method: p = ji,
      action: y,
      onSubmit: g,
      relative: h,
      preventScrollReset: b,
      viewTransition: T,
      ...E
    },
    k
  ) => {
    let j = Zg(),
      R = Kg(y, { relative: h }),
      C = p.toLowerCase() === "get" ? "get" : "post",
      q = typeof y == "string" && ph.test(y),
      X = (M) => {
        if ((g && g(M), M.defaultPrevented)) return;
        M.preventDefault();
        let J = M.nativeEvent.submitter,
          U = (J == null ? void 0 : J.getAttribute("formmethod")) || p;
        j(J || M.currentTarget, {
          fetcherKey: u,
          method: U,
          navigate: o,
          replace: d,
          state: m,
          relative: h,
          preventScrollReset: b,
          viewTransition: T,
        });
      };
    return S.createElement("form", {
      ref: k,
      method: C,
      action: R,
      onSubmit: c ? g : X,
      ...E,
      "data-discover": !q && s === "render" ? "true" : void 0,
    });
  }
);
Yg.displayName = "Form";
function Vg(s) {
  return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function bh(s) {
  let u = S.useContext(Vl);
  return ze(u, Vg(s)), u;
}
function Gg(
  s,
  {
    target: u,
    replace: o,
    state: c,
    preventScrollReset: d,
    relative: m,
    viewTransition: p,
  } = {}
) {
  let y = Ci(),
    g = Ma(),
    h = Wn(s, { relative: m });
  return S.useCallback(
    (b) => {
      if (jg(b, u)) {
        b.preventDefault();
        let T = o !== void 0 ? o : $n(g) === $n(h);
        y(s, {
          replace: T,
          state: c,
          preventScrollReset: d,
          relative: m,
          viewTransition: p,
        });
      }
    },
    [g, y, h, o, c, u, s, d, m, p]
  );
}
var Xg = 0,
  Qg = () => `__${String(++Xg)}__`;
function Zg() {
  let { router: s } = bh("useSubmit"),
    { basename: u } = S.useContext(Mt),
    o = og();
  return S.useCallback(
    async (c, d = {}) => {
      let { action: m, method: p, encType: y, formData: g, body: h } = wg(c, u);
      if (d.navigate === !1) {
        let b = d.fetcherKey || Qg();
        await s.fetch(b, o, d.action || m, {
          preventScrollReset: d.preventScrollReset,
          formData: g,
          body: h,
          formMethod: d.method || p,
          formEncType: d.encType || y,
          flushSync: d.flushSync,
        });
      } else
        await s.navigate(d.action || m, {
          preventScrollReset: d.preventScrollReset,
          formData: g,
          body: h,
          formMethod: d.method || p,
          formEncType: d.encType || y,
          replace: d.replace,
          state: d.state,
          fromRouteId: o,
          flushSync: d.flushSync,
          viewTransition: d.viewTransition,
        });
    },
    [s, u, o]
  );
}
function Kg(s, { relative: u } = {}) {
  let { basename: o } = S.useContext(Mt),
    c = S.useContext(Yt);
  ze(c, "useFormAction must be used inside a RouteContext");
  let [d] = c.matches.slice(-1),
    m = { ...Wn(s || ".", { relative: u }) },
    p = Ma();
  if (s == null) {
    m.search = p.search;
    let y = new URLSearchParams(m.search),
      g = y.getAll("index");
    if (g.some((b) => b === "")) {
      y.delete("index"),
        g.filter((T) => T).forEach((T) => y.append("index", T));
      let b = y.toString();
      m.search = b ? `?${b}` : "";
    }
  }
  return (
    (!s || s === ".") &&
      d.route.index &&
      (m.search = m.search ? m.search.replace(/^\?/, "?index&") : "?index"),
    o !== "/" && (m.pathname = m.pathname === "/" ? o : na([o, m.pathname])),
    $n(m)
  );
}
function Jg(s, u = {}) {
  let o = S.useContext(uh);
  ze(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: c } = bh("useViewTransitionState"),
    d = Wn(s, { relative: u.relative });
  if (!o.isTransitioning) return !1;
  let m = sa(o.currentLocation.pathname, c) || o.currentLocation.pathname,
    p = sa(o.nextLocation.pathname, c) || o.nextLocation.pathname;
  return _i(d.pathname, p) != null || _i(d.pathname, m) != null;
}
[...Mg];
const $g = ({ listId: s, onClose: u }) => {
    const [o, c] = S.useState([]),
      [d, m] = S.useState(null),
      [p, y] = S.useState(!1),
      [g, h] = S.useState({ page: 1, rowsPerPage: 10, total: 0 }),
      [b, T] = S.useState("all"),
      E = async () => {
        try {
          y(!0);
          const J = await (
            await fetch(
              `/backend/routes/api.php/api/results?csv_list_id=${s}&limit=1000000`,
              { credentials: "include" }
            )
          ).json();
          c(Array.isArray(J.data) ? J.data : []),
            h((U) => ({
              ...U,
              total: Array.isArray(J.data) ? J.data.length : 0,
            })),
            console.log("Fetched emails:", J.data);
        } catch {
          c([]), m({ type: "error", message: "Failed to load list emails" });
        } finally {
          y(!1);
        }
      },
      k = (M) =>
        (M.validation_response || "").toLowerCase().includes("timeout") ||
        (M.validation_response || "")
          .toLowerCase()
          .includes("connection refused") ||
        (M.validation_response || "")
          .toLowerCase()
          .includes("failed to connect"),
      j = o.filter((M) =>
        b === "all"
          ? !0
          : b === "valid"
          ? M.domain_status === 1
          : b === "invalid"
          ? M.domain_status === 0 && !k(M)
          : b === "timeout"
          ? k(M)
          : !0
      ),
      R = j.slice((g.page - 1) * g.rowsPerPage, g.page * g.rowsPerPage);
    S.useEffect(() => {
      E();
    }, [s]),
      S.useEffect(() => {
        h((M) => ({ ...M, page: 1, total: j.length }));
      }, [b, g.rowsPerPage]);
    const C = ({ status: M, onClose: J }) =>
      M &&
      i.jsxs("div", {
        className: `
          fixed top-6 left-1/2 transform -translate-x-1/2 z-50
          px-6 py-3 rounded-xl shadow text-base font-semibold
          flex items-center gap-3
          transition-all duration-300
          backdrop-blur-md
          ${
            M.type === "error"
              ? "bg-red-200/60 border border-red-400 text-red-800"
              : "bg-green-200/60 border border-green-400 text-green-800"
          }
        `,
        style: {
          minWidth: 250,
          maxWidth: 400,
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
          background:
            M.type === "error"
              ? "rgba(255, 0, 0, 0.29)"
              : "rgba(0, 200, 83, 0.29)",
          borderRadius: "16px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        },
        role: "alert",
        children: [
          i.jsx("i", {
            className: `fas text-lg ${
              M.type === "error"
                ? "fa-exclamation-circle text-red-500"
                : "fa-check-circle text-green-500"
            }`,
          }),
          i.jsx("span", { className: "flex-1", children: M.message }),
          i.jsx("button", {
            onClick: J,
            className:
              "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
            "aria-label": "Close",
            children: i.jsx("i", { className: "fas fa-times" }),
          }),
        ],
      });
    S.useEffect(() => {
      if (d) {
        const M = setTimeout(() => m(null), 4e3);
        return () => clearTimeout(M);
      }
    }, [d]);
    const q = (M) => {
        let J = [];
        if (
          (M === "valid"
            ? (J = o.filter((ye) => ye.domain_status === 1))
            : M === "invalid"
            ? (J = o.filter((ye) => ye.domain_status === 0 && !k(ye)))
            : M === "timeout"
            ? (J = o.filter(k))
            : (J = o),
          J.length === 0)
        ) {
          m({ type: "error", message: "No emails found for export." });
          return;
        }
        const F = [
            "EMAILS",
            ...J.map((ye) => `"${ye.email.replace(/"/g, '""')}"`),
          ].join(`
`),
          ee = new Blob([F], { type: "text/csv" }),
          ie = URL.createObjectURL(ee),
          ue = document.createElement("a");
        (ue.href = ie),
          (ue.download = `${M}_emails.csv`),
          document.body.appendChild(ue),
          ue.click(),
          document.body.removeChild(ue),
          URL.revokeObjectURL(ie),
          m({ type: "success", message: "Exported successfully." });
      },
      X = (M) =>
        M === "valid"
          ? o.filter((J) => J.domain_status === 1).length
          : M === "invalid"
          ? o.filter((J) => J.domain_status === 0 && !k(J)).length
          : M === "timeout"
          ? o.filter(k).length
          : o.length;
    return i.jsx("div", {
      className:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md backdrop-saturate-150 p-4",
      children: i.jsxs("div", {
        className:
          "bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] flex flex-col",
        onClick: (M) => M.stopPropagation(),
        children: [
          i.jsxs("div", {
            className: "p-6 pb-0 flex justify-between items-start",
            children: [
              i.jsxs("div", {
                children: [
                  i.jsx("h3", {
                    className: "text-2xl font-bold text-gray-800 mb-2",
                    children: "Email List Details",
                  }),
                  i.jsxs("p", {
                    className: "text-gray-600",
                    children: ["List ID: ", s],
                  }),
                ],
              }),
              i.jsx("button", {
                className:
                  "text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100",
                onClick: u,
                "aria-label": "Close",
                children: i.jsx("i", { className: "fas fa-times text-xl" }),
              }),
            ],
          }),
          i.jsx(C, { status: d, onClose: () => m(null) }),
          i.jsx("div", {
            className: "p-6 pt-4 border-b border-gray-200",
            children: i.jsxs("div", {
              className:
                "flex flex-wrap items-center justify-between gap-4 mb-4",
              children: [
                i.jsxs("div", {
                  className: "flex flex-wrap gap-2",
                  children: [
                    i.jsxs("button", {
                      onClick: () => T("all"),
                      className: `px-4 py-2 rounded-lg font-medium text-sm ${
                        b === "all"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`,
                      children: ["All (", X("all"), ")"],
                    }),
                    i.jsxs("button", {
                      onClick: () => T("valid"),
                      className: `px-4 py-2 rounded-lg font-medium text-sm ${
                        b === "valid"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`,
                      children: ["Valid (", X("valid"), ")"],
                    }),
                    i.jsxs("button", {
                      onClick: () => T("invalid"),
                      className: `px-4 py-2 rounded-lg font-medium text-sm ${
                        b === "invalid"
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`,
                      children: ["Invalid (", X("invalid"), ")"],
                    }),
                    i.jsxs("button", {
                      onClick: () => T("timeout"),
                      className: `px-4 py-2 rounded-lg font-medium text-sm ${
                        b === "timeout"
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`,
                      children: ["Timeout (", X("timeout"), ")"],
                    }),
                  ],
                }),
                i.jsxs("div", {
                  className: "flex flex-wrap gap-2",
                  children: [
                    i.jsxs("button", {
                      onClick: () => q("valid"),
                      className:
                        "px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 flex items-center gap-2",
                      children: [
                        i.jsx("i", { className: "fas fa-file-export" }),
                        "Export Valid",
                      ],
                    }),
                    i.jsxs("button", {
                      onClick: () => q("invalid"),
                      className:
                        "px-4 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 flex items-center gap-2",
                      children: [
                        i.jsx("i", { className: "fas fa-file-export" }),
                        "Export Invalid",
                      ],
                    }),
                    i.jsxs("button", {
                      onClick: () => q("timeout"),
                      className:
                        "px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium text-sm hover:bg-yellow-700 flex items-center gap-2",
                      children: [
                        i.jsx("i", { className: "fas fa-file-export" }),
                        "Export Timeout",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          i.jsx("div", {
            className: "overflow-auto flex-1",
            children: i.jsxs("table", {
              className: "min-w-full divide-y divide-gray-200",
              children: [
                i.jsx("thead", {
                  className: "bg-gray-50 sticky top-0",
                  children: i.jsxs("tr", {
                    children: [
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "ID",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Email",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Account",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Domain",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Verified",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Status",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Response",
                      }),
                    ],
                  }),
                }),
                i.jsx("tbody", {
                  className: "bg-white divide-y divide-gray-200",
                  children: p
                    ? Array.from({ length: g.rowsPerPage }).map((M, J) =>
                        i.jsx(
                          "tr",
                          {
                            className: "animate-pulse",
                            children: Array.from({ length: 7 }).map((U, F) =>
                              i.jsx(
                                "td",
                                {
                                  className: "px-6 py-4",
                                  children: i.jsx("div", {
                                    className:
                                      "h-4 bg-gray-200 rounded w-3/4 mx-auto",
                                  }),
                                },
                                F
                              )
                            ),
                          },
                          J
                        )
                      )
                    : R.length === 0
                    ? i.jsx("tr", {
                        children: i.jsx("td", {
                          colSpan: 7,
                          className: "px-6 py-8 text-center text-gray-500",
                          children:
                            "No emails found matching the current filter",
                        }),
                      })
                    : R.map((M) =>
                        i.jsxs(
                          "tr",
                          {
                            className: "hover:bg-gray-50 transition-colors",
                            children: [
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                children: M.id,
                              }),
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                                children: M.raw_emailid || M.email || "N/A",
                              }),
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                children: M.sp_account,
                              }),
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                children: M.sp_domain,
                              }),
                              i.jsx("td", {
                                className: "px-6 py-4 whitespace-nowrap",
                                children: i.jsx("span", {
                                  className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    M.domain_verified == 1
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`,
                                  children:
                                    M.domain_verified == 1
                                      ? "Verified"
                                      : "Invalid",
                                }),
                              }),
                              i.jsx("td", {
                                className: "px-6 py-4 whitespace-nowrap",
                                children: i.jsx("span", {
                                  className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    k(M)
                                      ? "bg-yellow-100 text-yellow-800"
                                      : M.domain_status == 1
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-orange-100 text-red-800"
                                  }`,
                                  children: k(M)
                                    ? "Timeout"
                                    : M.domain_status == 1
                                    ? "Valid"
                                    : "Invalid",
                                }),
                              }),
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 text-sm text-gray-500 max-w-xs truncate",
                                children: M.validation_response || "N/A",
                              }),
                            ],
                          },
                          M.id
                        )
                      ),
                }),
              ],
            }),
          }),
          i.jsxs("div", {
            className:
              "px-6 py-4 border-t border-gray-200 flex items-center justify-between",
            children: [
              i.jsxs("div", {
                className: "flex-1 flex justify-between sm:hidden",
                children: [
                  i.jsx("button", {
                    onClick: () => h((M) => ({ ...M, page: M.page - 1 })),
                    disabled: g.page === 1,
                    className:
                      "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50",
                    children: "Previous",
                  }),
                  i.jsx("button", {
                    onClick: () => h((M) => ({ ...M, page: M.page + 1 })),
                    disabled: g.page >= Math.ceil(j.length / g.rowsPerPage),
                    className:
                      "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50",
                    children: "Next",
                  }),
                ],
              }),
              i.jsxs("div", {
                className:
                  "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between",
                children: [
                  i.jsx("div", {
                    children: i.jsxs("p", {
                      className: "text-sm text-gray-700",
                      children: [
                        "Showing",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: (g.page - 1) * g.rowsPerPage + 1,
                        }),
                        " ",
                        "to",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: Math.min(g.page * g.rowsPerPage, j.length),
                        }),
                        " ",
                        "of ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: j.length,
                        }),
                        " ",
                        "results",
                      ],
                    }),
                  }),
                  i.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      i.jsxs("div", {
                        className: "flex items-center",
                        children: [
                          i.jsx("label", {
                            htmlFor: "rows-per-page",
                            className: "mr-2 text-sm text-gray-700",
                            children: "Rows per page:",
                          }),
                          i.jsx("select", {
                            id: "rows-per-page",
                            value: g.rowsPerPage,
                            onChange: (M) => {
                              h((J) => ({
                                ...J,
                                page: 1,
                                rowsPerPage: Number(M.target.value),
                                total: j.length,
                              }));
                            },
                            className:
                              "border border-gray-300 rounded-md shadow-sm py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                            children: [10, 25, 50, 100, 200].map((M) =>
                              i.jsx("option", { value: M, children: M }, M)
                            ),
                          }),
                        ],
                      }),
                      i.jsxs("nav", {
                        className:
                          "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                        "aria-label": "Pagination",
                        children: [
                          i.jsxs("button", {
                            onClick: () => h((M) => ({ ...M, page: 1 })),
                            disabled: g.page === 1,
                            className:
                              "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50",
                            children: [
                              i.jsx("span", {
                                className: "sr-only",
                                children: "First",
                              }),
                              i.jsx("i", {
                                className: "fas fa-angle-double-left",
                              }),
                            ],
                          }),
                          i.jsxs("button", {
                            onClick: () =>
                              h((M) => ({ ...M, page: M.page - 1 })),
                            disabled: g.page === 1,
                            className:
                              "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50",
                            children: [
                              i.jsx("span", {
                                className: "sr-only",
                                children: "Previous",
                              }),
                              i.jsx("i", { className: "fas fa-angle-left" }),
                            ],
                          }),
                          i.jsxs("span", {
                            className:
                              "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700",
                            children: [
                              "Page ",
                              g.page,
                              " of",
                              " ",
                              Math.ceil(j.length / g.rowsPerPage),
                            ],
                          }),
                          i.jsxs("button", {
                            onClick: () =>
                              h((M) => ({ ...M, page: M.page + 1 })),
                            disabled:
                              g.page >= Math.ceil(j.length / g.rowsPerPage),
                            className:
                              "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50",
                            children: [
                              i.jsx("span", {
                                className: "sr-only",
                                children: "Next",
                              }),
                              i.jsx("i", { className: "fas fa-angle-right" }),
                            ],
                          }),
                          i.jsxs("button", {
                            onClick: () =>
                              h((M) => ({
                                ...M,
                                page: Math.ceil(j.length / g.rowsPerPage),
                              })),
                            disabled:
                              g.page >= Math.ceil(j.length / g.rowsPerPage),
                            className:
                              "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50",
                            children: [
                              i.jsx("span", {
                                className: "sr-only",
                                children: "Last",
                              }),
                              i.jsx("i", {
                                className: "fas fa-angle-double-right",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  Fg = "/backend/routes/api.php",
  Gm = (s, u = {}) => fetch(s, { ...u, credentials: "include" }),
  Pg = () => {
    const [s, u] = S.useState(null),
      [o, c] = S.useState({ listName: "", fileName: "", csvFile: null }),
      [d, m] = S.useState(null),
      [p, y] = S.useState(!1),
      [g, h] = S.useState({
        processed: 0,
        total: 0,
        percent: 0,
        stage: "domain",
      }),
      [b, T] = S.useState(!1),
      [E, k] = S.useState([]),
      [j, R] = S.useState({ page: 1, rowsPerPage: 10, total: 0, search: "" }),
      [C, q] = S.useState(null),
      X = S.useRef(null),
      M = S.useRef(),
      [J, U] = S.useState(0),
      [F, ee] = S.useState({}),
      [ie, ue] = S.useState("");
    S.useEffect(() => {
      (async () => {
        try {
          const P = await (await Gm(`${Fg}?endpoint=check-auth`)).json();
          P.status === "success" ? u(P.user) : u(null);
        } catch {
          u(null);
        }
      })();
    }, []);
    const ye = async () => {
        try {
          const D = new URLSearchParams({
              page: j.page,
              limit: j.rowsPerPage,
              search: j.search,
            }),
            P = await (
              await fetch(
                `/backend/includes/get_csv_list.php?${D}`,
                { credentials: "include" }
              )
            ).json();
          k(Array.isArray(P.data) ? P.data : []),
            console.log("Fetched lists:", P.data),
            R((oe) => ({ ...oe, total: P.total || 0 }));
        } catch (D) {
          console.error("Error fetching lists:", D),
            k([]),
            R((K) => ({ ...K, total: 0 })),
            m({ type: "error", message: "Failed to load lists" });
        }
      },
      Me = async () => {
        try {
          const K = await (
            await fetch(
              "/backend/includes/get_results.php?retry_failed=1"
            )
          ).json();
          K.status === "success" ? U(K.total) : U(0);
        } catch (D) {
          console.error("Error fetching retry failed count:", D), U(0);
        }
      };
    S.useEffect(() => {
      Me();
    }, [E]),
      S.useEffect(() => {
        const D = setInterval(() => {
          ye(), Me();
        }, 5e3);
        return () => clearInterval(D);
      }, []),
      S.useEffect(() => {
        ye();
      }, [j.page, j.rowsPerPage, j.search]);
    const ve = (D) => {
        const { name: K, value: P } = D.target;
        c((oe) => ({ ...oe, [K]: P }));
      },
      W = 5 * 1024 * 1024,
      ce = (D) => {
        const K = D.target.files[0];
        if (K && K.size > W) {
          m({ type: "error", message: "CSV file size must be 5 MB or less." });
          return;
        }
        c((P) => ({ ...P, csvFile: K }));
      },
      xe = async (D) => {
        if (
          (D.preventDefault(),
          m(null),
          !o.csvFile || !o.listName || !o.fileName)
        ) {
          m({ type: "error", message: "All fields are required" });
          return;
        }
        if (
          (await o.csvFile.text())
            .split(/\r?\n/)
            .filter((le) => le.trim() !== "").length < 2
        ) {
          m({
            type: "error",
            message: "CSV file must contain at least one data row.",
          });
          return;
        }
        const oe = new FormData();
        oe.append("csv_file", o.csvFile),
          oe.append("list_name", o.listName),
          oe.append("file_name", o.fileName);
        try {
          y(!0);
          const Be = await (
            await Gm(
              "/backend/routes/api.php/api/upload",
              { method: "POST", body: oe }
            )
          ).json();
          Be.status === "success"
            ? (m({
                type: "success",
                message: Be.message || "Upload successful",
              }),
              T(!0),
              V(),
              c({ listName: "", fileName: "", csvFile: null }),
              ye(),
              Me())
            : m({ type: "error", message: Be.message || "Upload failed" });
        } catch (le) {
          console.error("Error uploading file:", le),
            m({ type: "error", message: "Network error" });
        } finally {
          y(!1);
        }
      },
      w = async (D, K) => {
        try {
          const P = `/backend/includes/get_results.php?export=${D}&csv_list_id=${K}`,
            le = await (await fetch(P)).blob(),
            Be = window.URL.createObjectURL(le),
            Se = document.createElement("a");
          (Se.href = Be),
            (Se.download = `${D}_emails_list_${K}.csv`),
            document.body.appendChild(Se),
            Se.click(),
            Se.remove(),
            m({ type: "success", message: `Exported ${D} emails list` });
        } catch {
          m({ type: "error", message: `Failed to export ${D} emails` });
        }
      },
      V = () => {
        X.current && clearInterval(X.current),
          (X.current = setInterval(async () => {
            try {
              const K = await (await fetch("/api/verify/progress")).json();
              h(K),
                ye(),
                K.total > 0 &&
                  K.processed >= K.total &&
                  (clearInterval(X.current),
                  setTimeout(() => {
                    T(!1),
                      m({
                        type: "success",
                        message: "Verification completed!",
                      }),
                      ye();
                  }, 1e3));
            } catch (D) {
              console.error("Error fetching progress:", D),
                clearInterval(X.current),
                T(!1);
            }
          }, 2e3));
      },
      $ = ({ status: D, onClose: K }) =>
        D &&
        i.jsxs("div", {
          className: `
          fixed top-6 left-1/2 transform -translate-x-1/2 z-50
          px-6 py-3 rounded-xl shadow text-base font-semibold
          flex items-center gap-3
          transition-all duration-300
          backdrop-blur-md
          ${
            D.type === "error"
              ? "bg-red-200/60 border border-red-400 text-red-800"
              : "bg-green-200/60 border border-green-400 text-green-800"
          }
        `,
          style: {
            minWidth: 250,
            maxWidth: 400,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
            background:
              D.type === "error"
                ? "rgba(255, 0, 0, 0.29)"
                : "rgba(0, 200, 83, 0.29)",
            borderRadius: "16px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          },
          role: "alert",
          children: [
            i.jsx("i", {
              className: `fas text-lg ${
                D.type === "error"
                  ? "fa-exclamation-circle text-red-500"
                  : "fa-check-circle text-green-500"
              }`,
            }),
            i.jsx("span", { className: "flex-1", children: D.message }),
            i.jsx("button", {
              onClick: K,
              className:
                "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
              "aria-label": "Close",
              children: i.jsx("i", { className: "fas fa-times" }),
            }),
          ],
        });
    S.useEffect(() => {
      if (d) {
        const D = setTimeout(() => m(null), 4e3);
        return () => clearTimeout(D);
      }
    }, [d]),
      S.useEffect(() => {
        let D;
        return (
          b &&
            (D = setInterval(() => {
              ye();
            }, 2e3)),
          () => clearInterval(D)
        );
      }, [b]);
    const ae = (D) => {
      const K = D.target.value;
      ue(K),
        clearTimeout(M.current),
        (M.current = setTimeout(() => {
          R((P) => ({ ...P, search: K, page: 1 }));
        }, 400));
    };
    S.useEffect(() => {
      ue(j.search);
    }, [j.search]);
    const N = async (D) => {
        ee((K) => ({ ...K, [D]: !0 })), m(null);
        try {
          const P = await (
            await fetch(
              `/backend/includes/get_results.php?retry_failed=1&csv_list_id=${D}`
            )
          ).json();
          if (!P.total || P.total === 0) {
            m({
              type: "error",
              message: "No failed emails to retry for this list",
            }),
              ee((Be) => ({ ...Be, [D]: !1 }));
            return;
          }
          const le = await (
            await fetch(
              `/backend/includes/retry_smtp.php?csv_list_id=${D}`,
              { method: "POST" }
            )
          ).json();
          if (le.status !== "success")
            throw new Error(le.message || "Failed to start retry");
          m({
            type: "success",
            message: `Retry started for ${P.total} emails in list ${D}`,
          }),
            ye();
        } catch (K) {
          m({ type: "error", message: K.message });
        } finally {
          ee((K) => ({ ...K, [D]: !1 }));
        }
      },
      Z = (D) => {
        switch (D) {
          case "completed":
            return "bg-emerald-100 text-emerald-800";
          case "running":
            return "bg-blue-100 text-blue-800";
          case "pending":
            return "bg-amber-100 text-amber-800";
          case "failed":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
    return (
      E.filter((D) => D.domain_status === 2).length,
      i.jsxs("div", {
        className: "container mx-auto px-4 py-8 max-w-7xl",
        children: [
          i.jsx("div", {
            className: "flex justify-end items-center mb-4",
            children: s
              ? i.jsx("div", {
                  className: "flex items-center gap-4",
                  children: i.jsxs("span", {
                    className: "text-gray-700 font-medium",
                    children: [
                      "Logged in as ",
                      i.jsx("span", {
                        className: "text-blue-600",
                        children: s.name,
                      }),
                    ],
                  }),
                })
              : i.jsx("span", {
                  className: "text-gray-500",
                  children: "Not logged in",
                }),
          }),
          i.jsx($, { status: d, onClose: () => m(null) }),
          i.jsxs("div", {
            className:
              "bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 mt-12",
            children: [
              i.jsxs("div", {
                className: "flex items-center mb-6",
                children: [
                  i.jsx("div", {
                    className: "bg-blue-100 p-2 rounded-lg mr-4",
                    children: i.jsx("svg", {
                      className: "w-6 h-6 text-blue-600",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: i.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
                      }),
                    }),
                  }),
                  i.jsx("h2", {
                    className: "text-xl font-semibold text-gray-800",
                    children: "Upload Email List",
                  }),
                ],
              }),
              i.jsxs("form", {
                onSubmit: xe,
                className: "space-y-6",
                children: [
                  i.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsxs("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: [
                              "List Name",
                              i.jsx("span", {
                                className: "text-red-500 ml-1",
                                children: "*",
                              }),
                            ],
                          }),
                          i.jsx("input", {
                            type: "text",
                            name: "listName",
                            value: o.listName,
                            onChange: ve,
                            className:
                              "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
                            placeholder: "e.g. List_2025",
                            required: !0,
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsxs("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: [
                              "File Name",
                              i.jsx("span", {
                                className: "text-red-500 ml-1",
                                children: "*",
                              }),
                            ],
                          }),
                          i.jsx("input", {
                            type: "text",
                            name: "fileName",
                            value: o.fileName,
                            onChange: ve,
                            className:
                              "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
                            placeholder: "e.g. File_2025.csv",
                            required: !0,
                          }),
                        ],
                      }),
                    ],
                  }),
                  i.jsxs("div", {
                    children: [
                      i.jsxs("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-2",
                        children: [
                          "CSV File",
                          i.jsx("span", {
                            className: "text-red-500 ml-1",
                            children: "*",
                          }),
                        ],
                      }),
                      i.jsx("div", {
                        className:
                          "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors",
                        children: i.jsx("div", {
                          className: "space-y-1 text-center",
                          children: o.csvFile
                            ? i.jsxs("div", {
                                className: "flex items-center justify-center",
                                children: [
                                  i.jsx("div", {
                                    className:
                                      "bg-green-100 p-2 rounded-lg mr-4",
                                    children: i.jsx("svg", {
                                      className: "w-6 h-6 text-green-600",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24",
                                      children: i.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                                      }),
                                    }),
                                  }),
                                  i.jsxs("div", {
                                    className: "text-left",
                                    children: [
                                      i.jsx("p", {
                                        className:
                                          "text-sm font-medium text-gray-700",
                                        children: o.csvFile.name,
                                      }),
                                      i.jsxs("p", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                          (o.csvFile.size / 1024).toFixed(1),
                                          " KB",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx("svg", {
                                    className:
                                      "mx-auto h-12 w-12 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: i.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: "2",
                                      d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
                                    }),
                                  }),
                                  i.jsxs("div", {
                                    className:
                                      "flex text-sm text-gray-600 justify-center",
                                    children: [
                                      i.jsxs("label", {
                                        className:
                                          "relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none",
                                        children: [
                                          i.jsx("span", {
                                            children: "Upload a file",
                                          }),
                                          i.jsx("input", {
                                            type: "file",
                                            name: "csvFile",
                                            className: "sr-only",
                                            accept: ".csv",
                                            onChange: ce,
                                            required: !0,
                                          }),
                                        ],
                                      }),
                                      i.jsx("p", {
                                        className: "pl-1",
                                        children: "or drag and drop",
                                      }),
                                    ],
                                  }),
                                  i.jsx("p", {
                                    className: "text-xs text-gray-500",
                                    children: "Only 5MB CSV files",
                                  }),
                                ],
                              }),
                        }),
                      }),
                    ],
                  }),
                  i.jsx("div", {
                    className: "flex justify-center",
                    children: i.jsx("button", {
                      type: "submit",
                      disabled: p,
                      className:
                        "px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-70",
                      children: p
                        ? i.jsxs(i.Fragment, {
                            children: [
                              i.jsxs("svg", {
                                className:
                                  "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                children: [
                                  i.jsx("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4",
                                  }),
                                  i.jsx("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                  }),
                                ],
                              }),
                              "Processing...",
                            ],
                          })
                        : i.jsxs(i.Fragment, {
                            children: [
                              i.jsx("svg", {
                                className: "w-5 h-5 mr-2 -ml-1",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: i.jsx("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: "2",
                                  d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
                                }),
                              }),
                              "Upload & Verify",
                            ],
                          }),
                    }),
                  }),
                ],
              }),
            ],
          }),
          i.jsxs("div", {
            className:
              "bg-white rounded-xl shadow-sm border border-gray-200 p-6",
            children: [
              i.jsxs("div", {
                className:
                  "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
                children: [
                  i.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      i.jsx("div", {
                        className: "bg-blue-100 p-2 rounded-lg mr-4",
                        children: i.jsx("svg", {
                          className: "w-6 h-6 text-blue-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: i.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                          }),
                        }),
                      }),
                      i.jsx("h2", {
                        className: "text-xl font-semibold text-gray-800",
                        children: "Email Lists",
                      }),
                    ],
                  }),
                  i.jsxs("div", {
                    className:
                      "flex flex-col sm:flex-row gap-3 w-full sm:w-auto",
                    children: [
                      i.jsxs("div", {
                        className: "relative flex-grow max-w-md",
                        children: [
                          i.jsx("div", {
                            className:
                              "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                            children: i.jsx("svg", {
                              className: "h-5 w-5 text-gray-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              children: i.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                              }),
                            }),
                          }),
                          i.jsx("input", {
                            type: "text",
                            placeholder: "Search lists...",
                            className:
                              "pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                            value: ie,
                            onChange: ae,
                          }),
                        ],
                      }),
                      i.jsx("div", { className: "flex gap-2" }),
                    ],
                  }),
                ],
              }),
              i.jsx("div", {
                className: "overflow-x-auto rounded-lg border border-gray-200",
                children: i.jsxs("table", {
                  className: "min-w-full divide-y divide-gray-200",
                  children: [
                    i.jsx("thead", {
                      className: "bg-gray-50",
                      children: i.jsxs("tr", {
                        children: [
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "ID",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "List Name",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "Status",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "Emails",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "Valid/Invalid",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "Actions",
                          }),
                        ],
                      }),
                    }),
                    i.jsx("tbody", {
                      className: "bg-white divide-y divide-gray-200",
                      children:
                        E.length === 0
                          ? i.jsx("tr", {
                              children: i.jsx("td", {
                                colSpan: 6,
                                className:
                                  "px-6 py-4 text-center text-gray-500 text-sm",
                                children: j.search
                                  ? "No lists match your search criteria"
                                  : "No lists found. Upload a CSV file to get started.",
                              }),
                            })
                          : E.map((D) =>
                              i.jsxs(
                                "tr",
                                {
                                  className:
                                    "hover:bg-gray-50 transition-colors",
                                  children: [
                                    i.jsx("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                                      children: D.id,
                                    }),
                                    i.jsx("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                                      children: D.list_name,
                                    }),
                                    i.jsx("td", {
                                      className: "px-6 py-4 whitespace-nowrap",
                                      children: i.jsx("span", {
                                        className: `px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${Z(
                                          D.status
                                        )}`,
                                        children:
                                          D.status.charAt(0).toUpperCase() +
                                          D.status.slice(1),
                                      }),
                                    }),
                                    i.jsxs("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                      children: [D.total_emails, " total"],
                                    }),
                                    i.jsxs("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm",
                                      children: [
                                        i.jsxs("span", {
                                          className:
                                            "text-emerald-600 font-medium",
                                          children: [
                                            D.valid_count || 0,
                                            " valid",
                                          ],
                                        }),
                                        " ",
                                        "/",
                                        " ",
                                        i.jsxs("span", {
                                          className: "text-red-600 font-medium",
                                          children: [
                                            D.invalid_count || 0,
                                            " invalid",
                                          ],
                                        }),
                                      ],
                                    }),
                                    i.jsxs("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2",
                                      children: [
                                        i.jsxs("button", {
                                          onClick: () => q(D.id),
                                          className:
                                            "text-blue-600 hover:text-blue-800 transition-colors flex items-center",
                                          children: [
                                            i.jsxs("svg", {
                                              className: "w-4 h-4 mr-1",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24",
                                              children: [
                                                i.jsx("path", {
                                                  strokeLinecap: "round",
                                                  strokeLinejoin: "round",
                                                  strokeWidth: "2",
                                                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
                                                }),
                                                i.jsx("path", {
                                                  strokeLinecap: "round",
                                                  strokeLinejoin: "round",
                                                  strokeWidth: "2",
                                                  d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                                                }),
                                              ],
                                            }),
                                            "View",
                                          ],
                                        }),
                                        i.jsxs("button", {
                                          onClick: () => w("valid", D.id),
                                          className:
                                            "text-green-600 hover:text-green-800 transition-colors flex items-center",
                                          children: [
                                            i.jsx("svg", {
                                              className: "w-4 h-4 mr-1",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24",
                                              children: i.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                                              }),
                                            }),
                                            "Valid",
                                          ],
                                        }),
                                        i.jsxs("button", {
                                          onClick: () => w("invalid", D.id),
                                          className:
                                            "text-red-600 hover:text-red-800 transition-colors flex items-center",
                                          children: [
                                            i.jsx("svg", {
                                              className: "w-4 h-4 mr-1",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24",
                                              children: i.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                                              }),
                                            }),
                                            "Invalid",
                                          ],
                                        }),
                                        i.jsxs("button", {
                                          onClick: () => N(D.id),
                                          disabled: F[D.id] || !D.failed_count,
                                          className:
                                            "text-yellow-600 hover:text-yellow-800 transition-colors flex items-center border border-yellow-300 rounded px-2 py-1 disabled:opacity-60",
                                          title:
                                            "Retry failed emails for this list",
                                          children: [
                                            i.jsx("svg", {
                                              className: `w-4 h-4 mr-1 ${
                                                F[D.id] ? "animate-spin" : ""
                                              }`,
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24",
                                              children: i.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M4 4v5h5M20 20v-5h-5M5.5 8.5a8 8 0 0113 0M18.5 15.5a8 8 0 01-13 0",
                                              }),
                                            }),
                                            F[D.id]
                                              ? "Retrying..."
                                              : `Retry (${
                                                  D.failed_count || 0
                                                })`,
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                D.id
                              )
                            ),
                    }),
                  ],
                }),
              }),
              E.length > 0 &&
                i.jsxs("div", {
                  className:
                    "flex flex-col items-center justify-center mt-6 px-1 gap-2",
                  children: [
                    i.jsxs("div", {
                      className: "text-sm text-gray-500 mb-2",
                      children: [
                        "Showing",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: (j.page - 1) * j.rowsPerPage + 1,
                        }),
                        " ",
                        "to",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: Math.min(j.page * j.rowsPerPage, j.total),
                        }),
                        " ",
                        "of ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: j.total,
                        }),
                        " ",
                        "lists",
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        i.jsx("button", {
                          onClick: () => R((D) => ({ ...D, page: 1 })),
                          disabled: j.page === 1,
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors font-bold text-gray-900",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-900",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M11 19l-7-7 7-7m8 14l-7-7 7-7",
                            }),
                          }),
                        }),
                        i.jsx("button", {
                          onClick: () => R((D) => ({ ...D, page: D.page - 1 })),
                          disabled: j.page === 1,
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors font-bold text-gray-900",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-900",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M15 19l-7-7 7-7",
                            }),
                          }),
                        }),
                        i.jsxs("span", {
                          className: "text-sm font-bold text-gray-900",
                          children: [
                            "Page ",
                            j.page,
                            " of",
                            " ",
                            Math.max(1, Math.ceil(j.total / j.rowsPerPage)),
                          ],
                        }),
                        i.jsx("button", {
                          onClick: () =>
                            R((D) => ({
                              ...D,
                              page: Math.min(
                                Math.ceil(j.total / j.rowsPerPage),
                                D.page + 1
                              ),
                            })),
                          disabled:
                            j.page >= Math.ceil(j.total / j.rowsPerPage),
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors font-bold text-gray-900",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-900",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M9 5l7 7-7 7",
                            }),
                          }),
                        }),
                        i.jsx("button", {
                          onClick: () =>
                            R((D) => ({
                              ...D,
                              page: Math.ceil(j.total / j.rowsPerPage),
                            })),
                          disabled:
                            j.page >= Math.ceil(j.total / j.rowsPerPage),
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors font-bold text-gray-900",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-900",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M13 5l7 7-7 7M5 5l7 7-7 7",
                            }),
                          }),
                        }),
                        i.jsx("select", {
                          value: j.rowsPerPage,
                          onChange: (D) =>
                            R((K) => ({
                              ...K,
                              rowsPerPage: Number(D.target.value),
                              page: 1,
                            })),
                          className:
                            "border p-2 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          children: [10, 25, 50, 100].map((D) =>
                            i.jsx("option", { value: D, children: D }, D)
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          C && i.jsx($g, { listId: C, onClose: () => q(null) }),
        ],
      })
    );
  },
  ql = "http://localhost/Verify_email/backend/routes/api.php/api/master/smtps",
  gi = {
    name: "",
    host: "",
    port: 465,
    encryption: "ssl",
    is_active: !0,
    received_email: "",
    accounts: [
      {
        email: "",
        password: "",
        daily_limit: 500,
        hourly_limit: 100,
        is_active: !0,
      },
    ],
  },
  Wg = ({ status: s, onClose: u }) =>
    s &&
    i.jsxs("div", {
      className: `
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded-xl shadow text-base font-semibold
        flex items-center gap-3
        transition-all duration-300
        backdrop-blur-md
        ${
          s.type === "error"
            ? "bg-red-200/60 border border-red-400 text-red-800"
            : "bg-green-200/60 border border-green-400 text-green-800"
        }
      `,
      style: {
        minWidth: 250,
        maxWidth: 400,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
        background:
          s.type === "error"
            ? "rgba(255, 0, 0, 0.29)"
            : "rgba(0, 200, 83, 0.29)",
        borderRadius: "16px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      },
      role: "alert",
      children: [
        i.jsx("i", {
          className: `fas text-lg ${
            s.type === "error"
              ? "fa-exclamation-circle text-red-500"
              : "fa-check-circle text-green-500"
          }`,
        }),
        i.jsx("span", { className: "flex-1", children: s.message }),
        i.jsx("button", {
          onClick: u,
          className:
            "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
          "aria-label": "Close",
          children: i.jsx("i", { className: "fas fa-times" }),
        }),
      ],
    }),
  Ig = () => {
    const [s, u] = S.useState([]),
      [o, c] = S.useState(!0),
      [d, m] = S.useState(!1),
      [p, y] = S.useState(!1),
      [g, h] = S.useState(gi),
      [b, T] = S.useState(null),
      [E, k] = S.useState(null),
      [j, R] = S.useState(null),
      [C, q] = S.useState({
        email: "",
        password: "",
        daily_limit: 500,
        hourly_limit: 100,
        is_active: !0,
      }),
      X = async () => {
        c(!0);
        try {
          const V = await (await fetch(ql)).json();
          Array.isArray(V.data) ? u(V.data) : Array.isArray(V) ? u(V) : u([]);
        } catch {
          k({ type: "error", message: "Failed to load SMTP servers." }), u([]);
        }
        c(!1);
      };
    S.useEffect(() => {
      X();
    }, []);
    const M = (w) => {
        const { name: V, value: $, type: ae, checked: N } = w.target;
        h((Z) => ({ ...Z, [V]: ae === "checkbox" ? N : $ }));
      },
      J = (w) => {
        const { name: V, value: $, type: ae, checked: N } = w.target;
        q((Z) => ({ ...Z, [V]: ae === "checkbox" ? N : $ }));
      },
      U = async (w) => {
        w.preventDefault();
        const V = g.accounts.filter(($) => $.email && $.password);
        if (V.length === 0) {
          k({
            type: "error",
            message: "At least one valid account is required.",
          });
          return;
        }
        try {
          const ae = await (
            await fetch(ql, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...g, accounts: V }),
            })
          ).json();
          ae.success
            ? (k({
                type: "success",
                message: "SMTP server added successfully!",
              }),
              m(!1),
              h(gi),
              X())
            : k({
                type: "error",
                message: ae.message || "Failed to add server.",
              });
        } catch {
          k({ type: "error", message: "Failed to add server." });
        }
      },
      F = (w) => {
        T(w.id),
          h({ ...w, is_active: !!w.is_active, accounts: w.accounts || [] }),
          y(!0);
      },
      ee = async (w) => {
        w.preventDefault();
        try {
          const $ = await (
            await fetch(`${ql}?id=${b}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                server: {
                  name: g.name,
                  host: g.host,
                  port: g.port,
                  encryption: g.encryption,
                  is_active: g.is_active,
                  received_email: g.received_email,
                },
                accounts: g.accounts,
              }),
            })
          ).json();
          $.success
            ? (k({
                type: "success",
                message: "SMTP server updated successfully!",
              }),
              y(!1),
              h(gi),
              T(null),
              X())
            : k({
                type: "error",
                message: $.message || "Failed to update server.",
              });
        } catch {
          k({ type: "error", message: "Failed to update server." });
        }
      },
      ie = async (w) => {
        if (window.confirm("Are you sure you want to delete this SMTP server?"))
          try {
            const $ = await (
              await fetch(`${ql}?id=${w}`, { method: "DELETE" })
            ).json();
            $.success
              ? (k({
                  type: "success",
                  message: "SMTP server deleted successfully!",
                }),
                X())
              : k({
                  type: "error",
                  message: $.message || "Failed to delete server.",
                });
          } catch {
            k({ type: "error", message: "Failed to delete server." });
          }
      },
      ue = async (w) => {
        if (!C.email || !C.password) {
          k({ type: "error", message: "Email and password are required." });
          return;
        }
        try {
          const $ = await (
            await fetch(`${ql}/${w}/accounts`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(C),
            })
          ).json();
          $.success
            ? (k({
                type: "success",
                message: "Email account added successfully!",
              }),
              q({
                email: "",
                password: "",
                daily_limit: 500,
                hourly_limit: 100,
                is_active: !0,
              }),
              X())
            : k({
                type: "error",
                message: $.message || "Failed to add email account.",
              });
        } catch {
          k({ type: "error", message: "Failed to add email account." });
        }
      },
      ye = async (w, V) => {
        if (
          window.confirm("Are you sure you want to delete this email account?")
        )
          try {
            const ae = await (
              await fetch(`${ql}/${w}/accounts/${V}`, { method: "DELETE" })
            ).json();
            ae.success
              ? (k({
                  type: "success",
                  message: "Email account deleted successfully!",
                }),
                X())
              : k({
                  type: "error",
                  message: ae.message || "Failed to delete email account.",
                });
          } catch {
            k({ type: "error", message: "Failed to delete email account." });
          }
      },
      Me = (w) => {
        R(j === w ? null : w);
      };
    S.useEffect(() => {
      if (E) {
        const w = setTimeout(() => k(null), 3e3);
        return () => clearTimeout(w);
      }
    }, [E]);
    const ve = (w, V, $) => {
        h((ae) => {
          const N = [...ae.accounts];
          return (N[w] = { ...N[w], [V]: $ }), { ...ae, accounts: N };
        });
      },
      W = () => {
        h((w) => ({
          ...w,
          accounts: [
            ...w.accounts,
            {
              email: "",
              password: "",
              daily_limit: 500,
              hourly_limit: 100,
              is_active: !0,
            },
          ],
        }));
      },
      ce = (w) => {
        h((V) => ({ ...V, accounts: V.accounts.filter(($, ae) => ae !== w) }));
      },
      xe = (w = []) => {
        if (!w.length) return "—";
        const V = w
            .map((ae) => Number(ae.hourly_limit) || 0)
            .reduce((ae, N) => ae + N, 0),
          $ = w
            .map((ae) => Number(ae.daily_limit) || 0)
            .reduce((ae, N) => ae + N, 0);
        return i.jsxs("span", {
          children: [
            i.jsx("span", {
              className: "font-medium text-indigo-700",
              children: V,
            }),
            i.jsx("span", {
              className: "text-xs text-gray-400",
              children: "/hr",
            }),
            " | ",
            i.jsx("span", {
              className: "font-medium text-indigo-700",
              children: $,
            }),
            i.jsx("span", {
              className: "text-xs text-gray-400",
              children: "/day",
            }),
          ],
        });
      };
    return i.jsxs("main", {
      className: "max-w-7xl mx-auto px-2 sm:px-4 mt-10 sm:mt-14 py-4 sm:py-6",
      children: [
        i.jsx(Wg, { status: E, onClose: () => k(null) }),
        i.jsxs("div", {
          className: "flex justify-between items-center mb-6",
          children: [
            i.jsxs("h1", {
              className: "text-2xl font-bold text-gray-900 flex items-center",
              children: [
                i.jsx("i", { className: "fas fa-server mr-3 text-indigo-600" }),
                "SMTP Records",
              ],
            }),
            i.jsxs("button", {
              onClick: () => {
                h(gi), m(!0);
              },
              className:
                "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: [
                i.jsx("i", { className: "fas fa-plus mr-2" }),
                " Add SMTP Server",
              ],
            }),
          ],
        }),
        i.jsx("div", {
          className:
            "card overflow-x-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg",
          children: i.jsx("div", {
            className: "w-full min-w-[350px]",
            children: i.jsxs("table", {
              className: "min-w-full divide-y divide-gray-200",
              children: [
                i.jsx("thead", {
                  className: "bg-gray-50/80",
                  children: i.jsxs("tr", {
                    children: [
                      i.jsx("th", {
                        className:
                          "px-2 sm:px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider",
                        children: "Server",
                      }),
                      i.jsx("th", {
                        className:
                          "px-2 sm:px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider",
                        children: "Accounts",
                      }),
                      i.jsx("th", {
                        className:
                          "px-2 sm:px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider",
                        children: "Status",
                      }),
                      i.jsx("th", {
                        className:
                          "px-2 sm:px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider",
                        children: "Total Limits",
                      }),
                      i.jsx("th", {
                        className:
                          "px-2 sm:px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider",
                        children: "Actions",
                      }),
                    ],
                  }),
                }),
                i.jsx("tbody", {
                  className:
                    "bg-white/60 divide-y divide-gray-200 text-xs sm:text-sm",
                  children: o
                    ? i.jsx("tr", {
                        children: i.jsx("td", {
                          colSpan: 5,
                          className:
                            "px-6 py-8 text-center text-sm text-gray-500",
                          children: i.jsx("div", {
                            className: "flex justify-center",
                            children: i.jsx("div", {
                              className:
                                "animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600",
                            }),
                          }),
                        }),
                      })
                    : s.length === 0
                    ? i.jsx("tr", {
                        children: i.jsx("td", {
                          colSpan: 5,
                          className:
                            "px-6 py-8 text-center text-sm text-gray-500",
                          children:
                            "No SMTP servers found. Add one to get started.",
                        }),
                      })
                    : s.map((w) => {
                        var V, $, ae, N, Z;
                        return i.jsxs(
                          wp.Fragment,
                          {
                            children: [
                              i.jsxs("tr", {
                                className: "hover:bg-indigo-50/30 transition",
                                children: [
                                  i.jsx("td", {
                                    className: "px-6 py-4",
                                    children: i.jsx("div", {
                                      className: "flex items-center",
                                      children: i.jsxs("div", {
                                        children: [
                                          i.jsx("div", {
                                            className:
                                              "text-base font-semibold text-gray-900",
                                            children: w.name,
                                          }),
                                          i.jsxs("div", {
                                            className: "text-xs text-gray-500",
                                            children: [
                                              w.host,
                                              ":",
                                              w.port,
                                              " (",
                                              ((V = w.encryption) == null
                                                ? void 0
                                                : V.toUpperCase()) || "None",
                                              ")",
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                  }),
                                  i.jsxs("td", {
                                    className: "px-6 py-4",
                                    children: [
                                      i.jsxs("div", {
                                        className: "text-sm text-gray-900",
                                        children: [
                                          (($ = w.accounts) == null
                                            ? void 0
                                            : $.length) || 0,
                                          " account(s)",
                                        ],
                                      }),
                                      i.jsx("div", {
                                        className:
                                          "text-xs text-gray-500 truncate max-w-xs",
                                        children:
                                          ((ae = w.accounts) == null
                                            ? void 0
                                            : ae
                                                .map((D) => D.email)
                                                .join(", ")) || "No accounts",
                                      }),
                                    ],
                                  }),
                                  i.jsx("td", {
                                    className: "px-6 py-4",
                                    children: i.jsx("span", {
                                      className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        w.is_active
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                      }`,
                                      children: w.is_active
                                        ? `Active (${
                                            ((N = w.accounts) == null
                                              ? void 0
                                              : N.filter((D) => D.is_active)
                                                  .length) || 0
                                          })`
                                        : "Inactive",
                                    }),
                                  }),
                                  i.jsx("td", {
                                    className:
                                      "px-6 py-4 text-base text-gray-700",
                                    children: xe(w.accounts),
                                  }),
                                  i.jsx("td", {
                                    className:
                                      "px-6 py-4 whitespace-nowrap text-sm font-medium",
                                    children: i.jsxs("div", {
                                      className: "flex items-center space-x-2",
                                      children: [
                                        i.jsx("button", {
                                          onClick: () => Me(w.id),
                                          className:
                                            "text-indigo-600 hover:text-indigo-900",
                                          title: "View accounts",
                                          children: i.jsx("i", {
                                            className: `fas ${
                                              j === w.id
                                                ? "fa-eye-slash"
                                                : "fa-eye"
                                            }`,
                                          }),
                                        }),
                                        i.jsx("button", {
                                          onClick: () => F(w),
                                          className:
                                            "text-indigo-600 hover:text-indigo-900",
                                          title: "Edit server",
                                          children: i.jsx("i", {
                                            className: "fas fa-edit",
                                          }),
                                        }),
                                        i.jsx("button", {
                                          onClick: () => ie(w.id),
                                          className:
                                            "text-red-600 hover:text-red-900",
                                          title: "Delete server",
                                          children: i.jsx("i", {
                                            className: "fas fa-trash",
                                          }),
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                              j === w.id &&
                                i.jsx("tr", {
                                  className: "bg-indigo-50/40",
                                  children: i.jsxs("td", {
                                    colSpan: 5,
                                    className: "px-6 py-6",
                                    children: [
                                      i.jsxs("div", {
                                        className: "mb-4",
                                        children: [
                                          i.jsxs("h4", {
                                            className:
                                              "text-base font-semibold text-indigo-700 mb-2 flex items-center",
                                            children: [
                                              i.jsx("i", {
                                                className: "fas fa-users mr-2",
                                              }),
                                              " Email Accounts",
                                            ],
                                          }),
                                          i.jsx("div", {
                                            className: "space-y-2",
                                            children:
                                              ((Z = w.accounts) == null
                                                ? void 0
                                                : Z.length) > 0
                                                ? i.jsx("div", {
                                                    className:
                                                      "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                    children: w.accounts.map(
                                                      (D) =>
                                                        i.jsxs(
                                                          "div",
                                                          {
                                                            className:
                                                              "flex flex-col md:flex-row items-start md:items-center justify-between bg-white border rounded-lg shadow-sm p-4",
                                                            children: [
                                                              i.jsxs("div", {
                                                                children: [
                                                                  i.jsxs(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "font-semibold text-gray-800 flex items-center",
                                                                      children:
                                                                        [
                                                                          i.jsx(
                                                                            "i",
                                                                            {
                                                                              className:
                                                                                "fas fa-envelope mr-2 text-indigo-500",
                                                                            }
                                                                          ),
                                                                          D.email,
                                                                          D.is_active
                                                                            ? i.jsx(
                                                                                "span",
                                                                                {
                                                                                  className:
                                                                                    "ml-3 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium",
                                                                                  children:
                                                                                    "Active",
                                                                                }
                                                                              )
                                                                            : i.jsx(
                                                                                "span",
                                                                                {
                                                                                  className:
                                                                                    "ml-3 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium",
                                                                                  children:
                                                                                    "Inactive",
                                                                                }
                                                                              ),
                                                                        ],
                                                                    }
                                                                  ),
                                                                  i.jsxs(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "text-xs text-gray-500 mt-1",
                                                                      children:
                                                                        [
                                                                          "Hourly:",
                                                                          " ",
                                                                          i.jsx(
                                                                            "span",
                                                                            {
                                                                              className:
                                                                                "font-medium",
                                                                              children:
                                                                                D.hourly_limit,
                                                                            }
                                                                          ),
                                                                          " ",
                                                                          " |  Daily:",
                                                                          " ",
                                                                          i.jsx(
                                                                            "span",
                                                                            {
                                                                              className:
                                                                                "font-medium",
                                                                              children:
                                                                                D.daily_limit,
                                                                            }
                                                                          ),
                                                                        ],
                                                                    }
                                                                  ),
                                                                ],
                                                              }),
                                                              i.jsxs("button", {
                                                                onClick: () =>
                                                                  ye(
                                                                    w.id,
                                                                    D.id
                                                                  ),
                                                                className:
                                                                  "mt-2 md:mt-0 text-red-500 hover:text-red-700 text-sm flex items-center",
                                                                title:
                                                                  "Delete account",
                                                                children: [
                                                                  i.jsx("i", {
                                                                    className:
                                                                      "fas fa-trash-alt mr-1",
                                                                  }),
                                                                  " Delete",
                                                                ],
                                                              }),
                                                            ],
                                                          },
                                                          D.id
                                                        )
                                                    ),
                                                  })
                                                : i.jsx("div", {
                                                    className:
                                                      "text-sm text-gray-500",
                                                    children:
                                                      "No accounts configured",
                                                  }),
                                          }),
                                        ],
                                      }),
                                      i.jsxs("div", {
                                        className: "border-t pt-4 mt-4",
                                        children: [
                                          i.jsxs("h4", {
                                            className:
                                              "text-base font-semibold text-indigo-700 mb-2 flex items-center",
                                            children: [
                                              i.jsx("i", {
                                                className: "fas fa-plus mr-2",
                                              }),
                                              " Add New Account",
                                            ],
                                          }),
                                          i.jsxs("div", {
                                            className:
                                              "grid grid-cols-1 md:grid-cols-5 gap-4",
                                            children: [
                                              i.jsxs("div", {
                                                children: [
                                                  i.jsx("label", {
                                                    className:
                                                      "block text-xs font-medium text-gray-700 mb-1",
                                                    children: "Email",
                                                  }),
                                                  i.jsx("input", {
                                                    type: "email",
                                                    name: "email",
                                                    value: C.email,
                                                    onChange: J,
                                                    className:
                                                      "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                                    placeholder:
                                                      "user@example.com",
                                                  }),
                                                ],
                                              }),
                                              i.jsxs("div", {
                                                children: [
                                                  i.jsx("label", {
                                                    className:
                                                      "block text-xs font-medium text-gray-700 mb-1",
                                                    children: "Password",
                                                  }),
                                                  i.jsx("input", {
                                                    type: "password",
                                                    name: "password",
                                                    value: C.password,
                                                    onChange: J,
                                                    className:
                                                      "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                                    placeholder: "Password",
                                                  }),
                                                ],
                                              }),
                                              i.jsxs("div", {
                                                children: [
                                                  i.jsx("label", {
                                                    className:
                                                      "block text-xs font-medium text-gray-700 mb-1",
                                                    children: "Hourly Limit",
                                                  }),
                                                  i.jsx("input", {
                                                    type: "number",
                                                    name: "hourly_limit",
                                                    value: C.hourly_limit,
                                                    onChange: J,
                                                    className:
                                                      "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                                  }),
                                                ],
                                              }),
                                              i.jsxs("div", {
                                                children: [
                                                  i.jsx("label", {
                                                    className:
                                                      "block text-xs font-medium text-gray-700 mb-1",
                                                    children: "Daily Limit",
                                                  }),
                                                  i.jsx("input", {
                                                    type: "number",
                                                    name: "daily_limit",
                                                    value: C.daily_limit,
                                                    onChange: J,
                                                    className:
                                                      "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                                  }),
                                                ],
                                              }),
                                              i.jsx("div", {
                                                className: "flex items-end",
                                                children: i.jsxs("button", {
                                                  onClick: () => ue(w.id),
                                                  disabled:
                                                    !C.email || !C.password,
                                                  className: `inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white ${
                                                    !C.email || !C.password
                                                      ? "bg-gray-300 cursor-not-allowed"
                                                      : "bg-indigo-600 hover:bg-indigo-700"
                                                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
                                                  children: [
                                                    i.jsx("i", {
                                                      className:
                                                        "fas fa-plus mr-1",
                                                    }),
                                                    " Add",
                                                  ],
                                                }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                            ],
                          },
                          w.id
                        );
                      }),
                }),
              ],
            }),
          }),
        }),
        d &&
          i.jsx("div", {
            className:
              "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md",
            children: i.jsxs("div", {
              className:
                "relative w-full max-w-lg sm:max-w-2xl mx-auto bg-white rounded-lg shadow-lg flex flex-col",
              style: { maxHeight: "90vh" },
              children: [
                i.jsxs("div", {
                  className:
                    "sticky top-0 z-10 bg-white border-b flex justify-between items-center px-5 py-3 rounded-t-lg",
                  children: [
                    i.jsxs("h3", {
                      className:
                        "text-lg font-medium text-gray-900 flex items-center",
                      children: [
                        i.jsx("i", {
                          className: "fas fa-plus-circle mr-2 text-indigo-600",
                        }),
                        "Add New SMTP Server",
                      ],
                    }),
                    i.jsx("button", {
                      onClick: () => m(!1),
                      className: "text-gray-400 hover:text-gray-500",
                      children: i.jsx("i", { className: "fas fa-times" }),
                    }),
                  ],
                }),
                i.jsxs("form", {
                  className: "overflow-y-auto px-2 sm:px-5 py-4",
                  style: { maxHeight: "75vh" },
                  onSubmit: U,
                  children: [
                    i.jsxs("div", {
                      className: "mb-6",
                      children: [
                        i.jsxs("h4", {
                          className:
                            "text-md font-semibold text-indigo-700 mb-3 flex items-center",
                          children: [
                            i.jsx("i", { className: "fas fa-server mr-2" }),
                            " Server Details",
                          ],
                        }),
                        i.jsxs("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                          children: [
                            i.jsxs("div", {
                              children: [
                                i.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-1",
                                  children: "Name",
                                }),
                                i.jsx("input", {
                                  type: "text",
                                  name: "name",
                                  required: !0,
                                  className:
                                    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                  placeholder: "SMTP1",
                                  value: g.name,
                                  onChange: M,
                                }),
                              ],
                            }),
                            i.jsxs("div", {
                              children: [
                                i.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-1",
                                  children: "Host",
                                }),
                                i.jsx("input", {
                                  type: "text",
                                  name: "host",
                                  required: !0,
                                  className:
                                    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                  placeholder: "smtp.example.com",
                                  value: g.host,
                                  onChange: M,
                                }),
                              ],
                            }),
                            i.jsxs("div", {
                              children: [
                                i.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-1",
                                  children: "Port",
                                }),
                                i.jsx("input", {
                                  type: "number",
                                  name: "port",
                                  required: !0,
                                  className:
                                    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                  placeholder: "465",
                                  value: g.port,
                                  onChange: M,
                                }),
                              ],
                            }),
                            i.jsxs("div", {
                              children: [
                                i.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-1",
                                  children: "Encryption",
                                }),
                                i.jsxs("select", {
                                  name: "encryption",
                                  required: !0,
                                  className:
                                    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                  value: g.encryption,
                                  onChange: M,
                                  children: [
                                    i.jsx("option", {
                                      value: "ssl",
                                      children: "SSL",
                                    }),
                                    i.jsx("option", {
                                      value: "tls",
                                      children: "TLS",
                                    }),
                                    i.jsx("option", {
                                      value: "",
                                      children: "None",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            i.jsxs("div", {
                              children: [
                                i.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-1",
                                  children: "Received Email",
                                }),
                                i.jsx("input", {
                                  type: "email",
                                  name: "received_email",
                                  required: !0,
                                  className:
                                    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                  placeholder: "inbox@example.com",
                                  value: g.received_email,
                                  onChange: M,
                                }),
                              ],
                            }),
                            i.jsxs("div", {
                              className: "flex items-center mt-2",
                              children: [
                                i.jsx("input", {
                                  type: "checkbox",
                                  name: "is_active",
                                  id: "add_is_active",
                                  checked: g.is_active,
                                  onChange: M,
                                  className:
                                    "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded",
                                }),
                                i.jsx("label", {
                                  htmlFor: "add_is_active",
                                  className: "ml-2 block text-sm text-gray-700",
                                  children: "Active",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsxs("h4", {
                          className:
                            "text-md font-semibold text-indigo-700 mb-3 flex items-center",
                          children: [
                            i.jsx("i", { className: "fas fa-users mr-2" }),
                            " Email Accounts",
                          ],
                        }),
                        g.accounts.map((w, V) =>
                          i.jsxs(
                            "div",
                            {
                              className:
                                "border rounded p-3 mb-2 bg-gray-50 relative",
                              children: [
                                i.jsxs("div", {
                                  className:
                                    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
                                  children: [
                                    i.jsxs("div", {
                                      children: [
                                        i.jsx("label", {
                                          className:
                                            "block text-sm font-medium text-gray-700 mb-1",
                                          children: "Email",
                                        }),
                                        i.jsx("input", {
                                          type: "email",
                                          name: "email",
                                          required: !0,
                                          className:
                                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                          placeholder: "user@example.com",
                                          value: w.email,
                                          onChange: ($) =>
                                            ve(V, "email", $.target.value),
                                        }),
                                      ],
                                    }),
                                    i.jsxs("div", {
                                      children: [
                                        i.jsx("label", {
                                          className:
                                            "block text-sm font-medium text-gray-700 mb-1",
                                          children: "Password",
                                        }),
                                        i.jsx("input", {
                                          type: "password",
                                          name: "password",
                                          required: !0,
                                          className:
                                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                          value: w.password,
                                          onChange: ($) =>
                                            ve(V, "password", $.target.value),
                                        }),
                                      ],
                                    }),
                                    i.jsx("div", {
                                      className: "flex items-end",
                                      children: i.jsxs("div", {
                                        className: "flex items-center",
                                        children: [
                                          i.jsx("input", {
                                            type: "checkbox",
                                            checked: w.is_active,
                                            onChange: ($) =>
                                              ve(
                                                V,
                                                "is_active",
                                                $.target.checked
                                              ),
                                            className:
                                              "h-4 w-4 text-indigo-600 border-gray-300 rounded",
                                          }),
                                          i.jsx("label", {
                                            className:
                                              "ml-2 block text-sm text-gray-700",
                                            children: "Active",
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                                i.jsxs("div", {
                                  className:
                                    "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2",
                                  children: [
                                    i.jsxs("div", {
                                      children: [
                                        i.jsx("label", {
                                          className:
                                            "block text-sm font-medium text-gray-700 mb-1",
                                          children: "Hourly Limit",
                                        }),
                                        i.jsx("input", {
                                          type: "number",
                                          name: "hourly_limit",
                                          required: !0,
                                          className:
                                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                          value: w.hourly_limit,
                                          onChange: ($) =>
                                            ve(
                                              V,
                                              "hourly_limit",
                                              $.target.value
                                            ),
                                        }),
                                      ],
                                    }),
                                    i.jsxs("div", {
                                      children: [
                                        i.jsx("label", {
                                          className:
                                            "block text-sm font-medium text-gray-700 mb-1",
                                          children: "Daily Limit",
                                        }),
                                        i.jsx("input", {
                                          type: "number",
                                          name: "daily_limit",
                                          required: !0,
                                          className:
                                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                          value: w.daily_limit,
                                          onChange: ($) =>
                                            ve(
                                              V,
                                              "daily_limit",
                                              $.target.value
                                            ),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                g.accounts.length > 1 &&
                                  i.jsx("button", {
                                    type: "button",
                                    className:
                                      "absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs",
                                    onClick: () => ce(V),
                                    title: "Remove this account",
                                    children: i.jsx("i", {
                                      className: "fas fa-times-circle",
                                    }),
                                  }),
                              ],
                            },
                            V
                          )
                        ),
                        i.jsxs("button", {
                          type: "button",
                          className: "mt-2 text-indigo-600 text-xs",
                          onClick: W,
                          children: [
                            i.jsx("i", { className: "fas fa-plus mr-1" }),
                            " Add Another Account",
                          ],
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex justify-end pt-6 space-x-3",
                      children: [
                        i.jsx("button", {
                          type: "button",
                          onClick: () => m(!1),
                          className:
                            "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                          children: "Cancel",
                        }),
                        i.jsxs("button", {
                          type: "submit",
                          className:
                            "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                          children: [
                            i.jsx("i", { className: "fas fa-save mr-2" }),
                            " Save Server",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        p &&
          i.jsx("div", {
            className:
              "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md",
            children: i.jsxs("div", {
              className:
                "relative w-full max-w-lg sm:max-w-xl mx-auto bg-white rounded-lg shadow-lg flex flex-col",
              style: { maxHeight: "90vh" },
              children: [
                i.jsxs("div", {
                  className:
                    "sticky top-0 z-10 bg-white border-b flex justify-between items-center px-5 py-3 rounded-t-lg",
                  children: [
                    i.jsxs("h3", {
                      className:
                        "text-lg font-medium text-gray-900 flex items-center",
                      children: [
                        i.jsx("i", {
                          className: "fas fa-edit mr-2 text-indigo-600",
                        }),
                        "Edit SMTP Server",
                      ],
                    }),
                    i.jsx("button", {
                      onClick: () => y(!1),
                      className: "text-gray-400 hover:text-gray-500",
                      children: i.jsx("i", { className: "fas fa-times" }),
                    }),
                  ],
                }),
                i.jsxs("form", {
                  className: "overflow-y-auto px-2 sm:px-5 py-4",
                  style: { maxHeight: "75vh" },
                  onSubmit: ee,
                  children: [
                    i.jsxs("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                      children: [
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-1",
                              children: "Name",
                            }),
                            i.jsx("input", {
                              type: "text",
                              name: "name",
                              required: !0,
                              className:
                                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                              value: g.name,
                              onChange: M,
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-1",
                              children: "Host",
                            }),
                            i.jsx("input", {
                              type: "text",
                              name: "host",
                              required: !0,
                              className:
                                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                              value: g.host,
                              onChange: M,
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-1",
                              children: "Port",
                            }),
                            i.jsx("input", {
                              type: "number",
                              name: "port",
                              required: !0,
                              className:
                                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                              value: g.port,
                              onChange: M,
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-1",
                              children: "Encryption",
                            }),
                            i.jsxs("select", {
                              name: "encryption",
                              required: !0,
                              className:
                                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                              value: g.encryption,
                              onChange: M,
                              children: [
                                i.jsx("option", {
                                  value: "ssl",
                                  children: "SSL",
                                }),
                                i.jsx("option", {
                                  value: "tls",
                                  children: "TLS",
                                }),
                                i.jsx("option", {
                                  value: "",
                                  children: "None",
                                }),
                              ],
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-1",
                              children: "Received Email",
                            }),
                            i.jsx("input", {
                              type: "email",
                              name: "received_email",
                              required: !0,
                              className:
                                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                              placeholder: "inbox@example.com",
                              value: g.received_email,
                              onChange: M,
                            }),
                          ],
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "mt-6",
                      children: [
                        i.jsx("h4", {
                          className: "text-md font-semibold text-gray-800 mb-3",
                          children: "Email Accounts",
                        }),
                        g.accounts.map((w, V) =>
                          i.jsxs(
                            "div",
                            {
                              className: "border rounded p-3 mb-2 bg-gray-50",
                              children: [
                                i.jsxs("div", {
                                  className:
                                    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
                                  children: [
                                    i.jsxs("div", {
                                      children: [
                                        i.jsx("label", {
                                          className:
                                            "block text-sm font-medium text-gray-700 mb-1",
                                          children: "Email",
                                        }),
                                        i.jsx("input", {
                                          type: "email",
                                          name: "email",
                                          required: !0,
                                          className:
                                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                          value: w.email,
                                          onChange: ($) =>
                                            ve(V, "email", $.target.value),
                                        }),
                                      ],
                                    }),
                                    i.jsxs("div", {
                                      children: [
                                        i.jsx("label", {
                                          className:
                                            "block text-sm font-medium text-gray-700 mb-1",
                                          children: "Password",
                                        }),
                                        i.jsx("input", {
                                          type: "password",
                                          name: "password",
                                          required: !0,
                                          className:
                                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                          value: w.password,
                                          onChange: ($) =>
                                            ve(V, "password", $.target.value),
                                        }),
                                      ],
                                    }),
                                    i.jsx("div", {
                                      className: "flex items-end",
                                      children: i.jsxs("div", {
                                        className: "flex items-center",
                                        children: [
                                          i.jsx("input", {
                                            type: "checkbox",
                                            checked: w.is_active,
                                            onChange: ($) =>
                                              ve(
                                                V,
                                                "is_active",
                                                $.target.checked
                                              ),
                                            className:
                                              "h-4 w-4 text-indigo-600 border-gray-300 rounded",
                                          }),
                                          i.jsx("label", {
                                            className:
                                              "ml-2 block text-sm text-gray-700",
                                            children: "Active",
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                                i.jsxs("div", {
                                  className:
                                    "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2",
                                  children: [
                                    i.jsxs("div", {
                                      children: [
                                        i.jsx("label", {
                                          className:
                                            "block text-sm font-medium text-gray-700 mb-1",
                                          children: "Hourly Limit",
                                        }),
                                        i.jsx("input", {
                                          type: "number",
                                          name: "hourly_limit",
                                          required: !0,
                                          className:
                                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                          value: w.hourly_limit,
                                          onChange: ($) =>
                                            ve(
                                              V,
                                              "hourly_limit",
                                              $.target.value
                                            ),
                                        }),
                                      ],
                                    }),
                                    i.jsxs("div", {
                                      children: [
                                        i.jsx("label", {
                                          className:
                                            "block text-sm font-medium text-gray-700 mb-1",
                                          children: "Daily Limit",
                                        }),
                                        i.jsx("input", {
                                          type: "number",
                                          name: "daily_limit",
                                          required: !0,
                                          className:
                                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
                                          value: w.daily_limit,
                                          onChange: ($) =>
                                            ve(
                                              V,
                                              "daily_limit",
                                              $.target.value
                                            ),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                g.accounts.length > 1 &&
                                  i.jsx("button", {
                                    type: "button",
                                    className: "mt-2 text-red-600 text-xs",
                                    onClick: () => ce(V),
                                    children: "Remove Account",
                                  }),
                              ],
                            },
                            V
                          )
                        ),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex items-center",
                      children: [
                        i.jsx("input", {
                          type: "checkbox",
                          name: "is_active",
                          id: "edit_is_active",
                          checked: g.is_active,
                          onChange: M,
                          className:
                            "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded",
                        }),
                        i.jsx("label", {
                          htmlFor: "edit_is_active",
                          className: "ml-2 block text-sm text-gray-700",
                          children: "Active",
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex justify-end pt-4 space-x-3",
                      children: [
                        i.jsx("button", {
                          type: "button",
                          onClick: () => y(!1),
                          className:
                            "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                          children: "Cancel",
                        }),
                        i.jsxs("button", {
                          type: "submit",
                          className:
                            "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                          children: [
                            i.jsx("i", { className: "fas fa-save mr-2" }),
                            " Update Server",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    });
  },
  yi = { description: "", mail_subject: "", mail_body: "", attachment: null },
  ey = ({ message: s, onClose: u }) =>
    s &&
    i.jsxs("div", {
      className: `
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded-xl shadow text-base font-semibold
        flex items-center gap-3
        transition-all duration-300
        backdrop-blur-md
        ${
          s.type === "error"
            ? "bg-red-200/60 border border-red-400 text-red-800"
            : "bg-green-200/60 border border-green-400 text-green-800"
        }
      `,
      style: {
        minWidth: 250,
        maxWidth: 400,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
        background:
          s.type === "error"
            ? "rgba(255, 0, 0, 0.29)"
            : "rgba(0, 200, 83, 0.29)",
        borderRadius: "16px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      },
      role: "alert",
      children: [
        i.jsx("i", {
          className: `fas text-lg ${
            s.type === "error"
              ? "fa-exclamation-circle text-red-500"
              : "fa-check-circle text-green-500"
          }`,
        }),
        i.jsx("span", { className: "flex-1", children: s.text }),
        i.jsx("button", {
          onClick: u,
          className:
            "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
          "aria-label": "Close",
          children: i.jsx("i", { className: "fas fa-times" }),
        }),
      ],
    }),
  ty = () => {
    const [s, u] = S.useState([]),
      [o, c] = S.useState(!0),
      [d, m] = S.useState(!1),
      [p, y] = S.useState(!1),
      [g, h] = S.useState(yi),
      [b, T] = S.useState(null),
      [E, k] = S.useState(null),
      [j, R] = S.useState(null),
      [C, q] = S.useState({ page: 1, rowsPerPage: 10, total: 0 }),
      X =
        "http://localhost/Verify_email/backend/routes/api.php/api/master/campaigns",
      M = async () => {
        c(!0);
        try {
          const ce = await (await fetch(X)).json();
          Array.isArray(ce)
            ? (u(ce), q((xe) => ({ ...xe, total: ce.length })))
            : (u([]), q((xe) => ({ ...xe, total: 0 })));
        } catch {
          R({ type: "error", text: "Failed to load campaigns." }),
            u([]),
            q((W) => ({ ...W, total: 0 }));
        }
        c(!1);
      };
    S.useEffect(() => {
      M();
    }, []);
    const J = (W) => {
        const { name: ce, value: xe, files: w } = W.target;
        ce === "attachment" ? T(w[0]) : h((V) => ({ ...V, [ce]: xe }));
      },
      U = async (W) => {
        W.preventDefault();
        const ce = new FormData();
        ce.append("description", g.description),
          ce.append("mail_subject", g.mail_subject),
          ce.append("mail_body", g.mail_body),
          b && ce.append("attachment", b);
        try {
          const w = await (await fetch(X, { method: "POST", body: ce })).json();
          w.success
            ? (R({ type: "success", text: "Campaign added successfully!" }),
              m(!1),
              h(yi),
              T(null),
              M())
            : R({
                type: "error",
                text: w.message || "Failed to add campaign.",
              });
        } catch {
          R({ type: "error", text: "Failed to add campaign." });
        }
      },
      F = (W) => {
        k(W.campaign_id),
          h({
            description: W.description,
            mail_subject: W.mail_subject,
            mail_body: W.mail_body,
            attachment: null,
          }),
          T(null),
          y(!0);
      },
      ee = async (W) => {
        W.preventDefault();
        const ce = new FormData();
        ce.append("description", g.description),
          ce.append("mail_subject", g.mail_subject),
          ce.append("mail_body", g.mail_body),
          b && ce.append("attachment", b),
          ce.append("_method", "PUT");
        try {
          const w = await (
            await fetch(`${X}?id=${E}`, { method: "POST", body: ce })
          ).json();
          w.success
            ? (R({ type: "success", text: "Campaign updated successfully!" }),
              y(!1),
              h(yi),
              T(null),
              M())
            : R({
                type: "error",
                text: w.message || "Failed to update campaign.",
              });
        } catch {
          R({ type: "error", text: "Failed to update campaign." });
        }
      },
      ie = async (W) => {
        u((ce) => ce.filter((xe) => xe.campaign_id !== W)),
          q((ce) => ({ ...ce, total: ce.total - 1 }));
        try {
          const xe = await (
            await fetch(`${X}?id=${W}`, { method: "DELETE" })
          ).json();
          xe.success
            ? R({ type: "success", text: "Campaign deleted successfully!" })
            : (R({
                type: "error",
                text: xe.message || "Failed to delete campaign.",
              }),
              M());
        } catch {
          R({ type: "error", text: "Failed to delete campaign." }), M();
        }
      },
      ue = async (W) => {
        try {
          const xe = await (await fetch(`${X}?id=${W}`)).json();
          h({
            description: xe.description,
            mail_subject: xe.mail_subject,
            mail_body: xe.mail_body,
            attachment: null,
          }),
            k(null),
            T(null),
            m(!0);
        } catch {
          R({ type: "error", text: "Failed to load campaign for reuse." });
        }
      };
    S.useEffect(() => {
      if (j) {
        const W = setTimeout(() => R(null), 3e3);
        return () => clearTimeout(W);
      }
    }, [j]);
    const ye = (W) => {
        const ce = W.split(/\s+/);
        return ce.slice(0, 30).join(" ") + (ce.length > 30 ? "..." : "");
      },
      Me = Math.max(1, Math.ceil(C.total / C.rowsPerPage)),
      ve = s.slice((C.page - 1) * C.rowsPerPage, C.page * C.rowsPerPage);
    return i.jsxs("div", {
      className: "container mx-auto mt-12 px-2 sm:px-4 py-8 max-w-7xl",
      children: [
        i.jsx(ey, { message: j, onClose: () => R(null) }),
        i.jsxs("div", {
          className: "flex justify-between items-center mb-6",
          children: [
            i.jsxs("h1", {
              className: "text-2xl font-bold text-gray-800",
              children: [
                i.jsx("i", { className: "fas fa-bullhorn mr-2 text-blue-600" }),
                "Email Campaigns",
              ],
            }),
            i.jsxs("button", {
              onClick: () => {
                h(yi), m(!0);
              },
              className:
                "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center",
              children: [
                i.jsx("i", { className: "fas fa-plus mr-2" }),
                " Add Campaign",
              ],
            }),
          ],
        }),
        i.jsx("div", {
          className: "block sm:hidden",
          children: ve.map((W) =>
            i.jsxs(
              "div",
              {
                className: "bg-white rounded-2xl shadow p-4 mb-4 flex flex-col",
                children: [
                  i.jsxs("div", {
                    className: "flex justify-between items-start",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsxs("div", {
                            className: "text-lg font-bold text-gray-900 mb-1",
                            children: ["ID: ", W.campaign_id],
                          }),
                          i.jsx("div", {
                            className: "font-semibold text-gray-900",
                            children: "Description:",
                          }),
                          i.jsx("div", {
                            className:
                              "text-gray-600 text-base mb-2 break-words",
                            children: W.description,
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "flex flex-col gap-2 items-end ml-2",
                        children: [
                          i.jsx("button", {
                            onClick: () => F(W),
                            className:
                              "text-blue-600 hover:text-blue-800 p-1 rounded",
                            title: "Edit",
                            children: i.jsx("i", {
                              className: "fas fa-edit text-xl",
                            }),
                          }),
                          i.jsx("button", {
                            onClick: () => ue(W.campaign_id),
                            className:
                              "text-green-600 hover:text-green-800 p-1 rounded",
                            title: "Reuse",
                            children: i.jsx("i", {
                              className: "fas fa-copy text-xl",
                            }),
                          }),
                          i.jsx("button", {
                            onClick: () => {
                              window.confirm(
                                "Are you sure you want to delete this campaign?"
                              ) && ie(W.campaign_id);
                            },
                            className:
                              "text-red-600 hover:text-red-800 p-1 rounded",
                            title: "Delete",
                            children: i.jsx("i", {
                              className: "fas fa-trash text-xl",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  i.jsxs("div", {
                    className: "mt-2",
                    children: [
                      i.jsx("div", {
                        className: "font-semibold text-gray-900",
                        children: "Subject:",
                      }),
                      i.jsx("div", {
                        className: "text-gray-700 text-sm break-words mb-1",
                        children: W.mail_subject,
                      }),
                      i.jsx("div", {
                        className: "font-semibold text-gray-900",
                        children: "Email Preview:",
                      }),
                      i.jsx("div", {
                        className: "text-gray-500 text-sm break-words",
                        children: ye(W.mail_body),
                      }),
                    ],
                  }),
                ],
              },
              W.campaign_id
            )
          ),
        }),
        i.jsx("div", {
          className:
            "hidden sm:block bg-white rounded-lg shadow overflow-hidden",
          children: i.jsx("div", {
            className: "overflow-x-auto",
            children: i.jsxs("table", {
              className: "min-w-full divide-y divide-gray-200",
              children: [
                i.jsx("thead", {
                  className: "bg-gray-50",
                  children: i.jsxs("tr", {
                    children: [
                      i.jsx("th", {
                        className:
                          "w-16 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "ID",
                      }),
                      i.jsx("th", {
                        className:
                          "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Description",
                      }),
                      i.jsx("th", {
                        className:
                          "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Subject",
                      }),
                      i.jsx("th", {
                        className:
                          "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Email Preview",
                      }),
                      i.jsx("th", {
                        className:
                          "w-40 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Actions",
                      }),
                    ],
                  }),
                }),
                i.jsx("tbody", {
                  className: "bg-white divide-y divide-gray-200",
                  children: o
                    ? i.jsx("tr", {
                        children: i.jsx("td", {
                          colSpan: 5,
                          className:
                            "px-6 py-4 text-center text-sm text-gray-500",
                          children: "Loading...",
                        }),
                      })
                    : s.length === 0
                    ? i.jsx("tr", {
                        children: i.jsx("td", {
                          colSpan: 5,
                          className:
                            "px-6 py-4 text-center text-sm text-gray-500",
                          children:
                            "No campaigns found. Add one to get started.",
                        }),
                      })
                    : ve.map((W) =>
                        i.jsxs(
                          "tr",
                          {
                            className:
                              "hover:bg-gray-50 transition-colors duration-150",
                            children: [
                              i.jsx("td", {
                                className:
                                  "px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500",
                                children: W.campaign_id,
                              }),
                              i.jsx("td", {
                                className: "px-4 py-3",
                                children: i.jsx("div", {
                                  className:
                                    "text-sm font-medium text-gray-900 truncate max-w-xs",
                                  children: W.description,
                                }),
                              }),
                              i.jsx("td", {
                                className: "px-4 py-3",
                                children: i.jsx("div", {
                                  className:
                                    "text-sm text-gray-900 truncate max-w-xs",
                                  children: W.mail_subject,
                                }),
                              }),
                              i.jsx("td", {
                                className: "px-4 py-3",
                                children: i.jsx("div", {
                                  className:
                                    "text-sm text-gray-500 truncate max-w-xs",
                                  title: ye(W.mail_body),
                                  children: ye(W.mail_body),
                                }),
                              }),
                              i.jsx("td", {
                                className:
                                  "px-4 py-3 whitespace-nowrap text-right text-sm font-medium",
                                children: i.jsxs("div", {
                                  className: "flex justify-end space-x-2",
                                  children: [
                                    i.jsx("button", {
                                      onClick: () => F(W),
                                      className:
                                        "text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50",
                                      title: "Edit",
                                      children: i.jsx("i", {
                                        className: "fas fa-edit",
                                      }),
                                    }),
                                    i.jsx("button", {
                                      onClick: () => ue(W.campaign_id),
                                      className:
                                        "text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50",
                                      title: "Reuse",
                                      children: i.jsx("i", {
                                        className: "fas fa-copy",
                                      }),
                                    }),
                                    i.jsx("button", {
                                      onClick: () => {
                                        window.confirm(
                                          "Are you sure you want to delete this campaign?"
                                        ) && ie(W.campaign_id);
                                      },
                                      className:
                                        "text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50",
                                      title: "Delete",
                                      children: i.jsx("i", {
                                        className: "fas fa-trash",
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          },
                          W.campaign_id
                        )
                      ),
                }),
              ],
            }),
          }),
        }),
        s.length > 0 &&
          i.jsxs("div", {
            className:
              "flex flex-col items-center justify-center mt-6 px-1 gap-2",
            children: [
              i.jsxs("div", {
                className: "text-xs sm:text-sm text-gray-500 mb-2",
                children: [
                  "Showing",
                  " ",
                  i.jsx("span", {
                    className: "font-medium",
                    children: (C.page - 1) * C.rowsPerPage + 1,
                  }),
                  " ",
                  "to",
                  " ",
                  i.jsx("span", {
                    className: "font-medium",
                    children: Math.min(C.page * C.rowsPerPage, C.total),
                  }),
                  " ",
                  "of ",
                  i.jsx("span", {
                    className: "font-medium",
                    children: C.total,
                  }),
                  " ",
                  "campaigns",
                ],
              }),
              i.jsxs("div", {
                className: "flex flex-wrap items-center gap-2 pb-5",
                children: [
                  i.jsx("button", {
                    onClick: () => q((W) => ({ ...W, page: 1 })),
                    disabled: C.page === 1,
                    className:
                      "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                    children: i.jsx("svg", {
                      className: "w-5 h-5 text-gray-500",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: i.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M11 19l-7-7 7-7m8 14l-7-7 7-7",
                      }),
                    }),
                  }),
                  i.jsx("button", {
                    onClick: () => q((W) => ({ ...W, page: W.page - 1 })),
                    disabled: C.page === 1,
                    className:
                      "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                    children: i.jsx("svg", {
                      className: "w-5 h-5 text-gray-500",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: i.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M15 19l-7-7 7-7",
                      }),
                    }),
                  }),
                  i.jsxs("span", {
                    className: "text-xs sm:text-sm font-medium text-gray-700",
                    children: ["Page ", C.page, " of ", Me],
                  }),
                  i.jsx("button", {
                    onClick: () =>
                      q((W) => ({ ...W, page: Math.min(Me, W.page + 1) })),
                    disabled: C.page >= Me,
                    className:
                      "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                    children: i.jsx("svg", {
                      className: "w-5 h-5 text-gray-500",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: i.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M9 5l7 7-7 7",
                      }),
                    }),
                  }),
                  i.jsx("button", {
                    onClick: () => q((W) => ({ ...W, page: Me })),
                    disabled: C.page >= Me,
                    className:
                      "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                    children: i.jsx("svg", {
                      className: "w-5 h-5 text-gray-500",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: i.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M13 5l7 7-7 7M5 5l7 7-7 7",
                      }),
                    }),
                  }),
                  i.jsx("select", {
                    value: C.rowsPerPage,
                    onChange: (W) =>
                      q((ce) => ({
                        ...ce,
                        rowsPerPage: Number(W.target.value),
                        page: 1,
                      })),
                    className:
                      "border p-2 rounded-lg text-xs sm:text-sm bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors",
                    children: [10, 25, 50, 100].map((W) =>
                      i.jsx("option", { value: W, children: W }, W)
                    ),
                  }),
                ],
              }),
            ],
          }),
        d &&
          i.jsx("div", {
            className:
              "fixed inset-0 bg-gr bg-black/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-xl overflow-y-auto h-full w-full z-50 flex items-center justify-center",
            children: i.jsxs("div", {
              className:
                "relative mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white",
              children: [
                i.jsxs("div", {
                  className: "flex justify-between items-center mb-4",
                  children: [
                    i.jsxs("h3", {
                      className: "text-lg font-medium text-gray-900",
                      children: [
                        i.jsx("i", {
                          className: "fas fa-plus-circle mr-2 text-blue-600",
                        }),
                        "Add New Campaign",
                      ],
                    }),
                    i.jsx("button", {
                      onClick: () => m(!1),
                      className: "text-gray-400 hover:text-gray-500",
                      children: i.jsx("i", { className: "fas fa-times" }),
                    }),
                  ],
                }),
                i.jsxs("form", {
                  className: "space-y-4",
                  onSubmit: U,
                  encType: "multipart/form-data",
                  children: [
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Description",
                        }),
                        i.jsx("input", {
                          type: "text",
                          name: "description",
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                          placeholder: "Campaign description",
                          value: g.description,
                          onChange: J,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Email Subject",
                        }),
                        i.jsx("input", {
                          type: "text",
                          name: "mail_subject",
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                          placeholder: "Your email subject",
                          value: g.mail_subject,
                          onChange: J,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Email Body",
                        }),
                        i.jsx("textarea", {
                          name: "mail_body",
                          rows: 8,
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-sm",
                          placeholder: "Compose your email content here...",
                          value: g.mail_body,
                          onChange: J,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-black-700 mb-1",
                          children: "Attachment",
                        }),
                        i.jsx("input", {
                          type: "file",
                          name: "attachment",
                          className:
                            "block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
                          onChange: J,
                          accept:
                            ".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.csv,.txt",
                          id: "attachment-input",
                        }),
                        i.jsx("div", {
                          className: "text-xs text-gray-500 mt-1",
                          children: b
                            ? `Selected: ${b.name}`
                            : "No file chosen",
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex justify-end pt-4 space-x-3",
                      children: [
                        i.jsx("button", {
                          type: "button",
                          onClick: () => m(!1),
                          className:
                            "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                          children: "Cancel",
                        }),
                        i.jsxs("button", {
                          type: "submit",
                          className:
                            "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                          children: [
                            i.jsx("i", { className: "fas fa-save mr-2" }),
                            " Save Campaign",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        p &&
          i.jsx("div", {
            className:
              "fixed inset-0  bg-black/30 backdrop-blur-md backdrop-saturate-150 overflow-y-auto h-full w-full z-50 flex items-center justify-center",
            children: i.jsxs("div", {
              className:
                "relative mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white",
              children: [
                i.jsxs("div", {
                  className: "flex justify-between items-center mb-4",
                  children: [
                    i.jsxs("h3", {
                      className: "text-lg font-medium text-gray-900",
                      children: [
                        i.jsx("i", {
                          className: "fas fa-edit mr-2 text-blue-600",
                        }),
                        "Edit Campaign",
                      ],
                    }),
                    i.jsx("button", {
                      onClick: () => y(!1),
                      className: "text-gray-400 hover:text-gray-500",
                      children: i.jsx("i", { className: "fas fa-times" }),
                    }),
                  ],
                }),
                i.jsxs("form", {
                  className: "space-y-4",
                  onSubmit: ee,
                  encType: "multipart/form-data",
                  children: [
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Description",
                        }),
                        i.jsx("input", {
                          type: "text",
                          name: "description",
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                          value: g.description,
                          onChange: J,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Email Subject",
                        }),
                        i.jsx("input", {
                          type: "text",
                          name: "mail_subject",
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                          value: g.mail_subject,
                          onChange: J,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Email Body",
                        }),
                        i.jsx("textarea", {
                          name: "mail_body",
                          rows: 8,
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-sm",
                          value: g.mail_body,
                          onChange: J,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Attachment",
                        }),
                        i.jsx("input", {
                          type: "file",
                          name: "attachment",
                          className:
                            "block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
                          onChange: J,
                          accept: "*",
                        }),
                        b &&
                          i.jsxs("div", {
                            className: "text-xs text-gray-500 mt-1",
                            children: ["Selected: ", b.name],
                          }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex justify-end pt-4 space-x-3",
                      children: [
                        i.jsx("button", {
                          type: "button",
                          onClick: () => y(!1),
                          className:
                            "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                          children: "Cancel",
                        }),
                        i.jsxs("button", {
                          type: "submit",
                          className:
                            "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                          children: [
                            i.jsx("i", { className: "fas fa-save mr-2" }),
                            " Update",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    });
  };
function vh(s, u) {
  return function () {
    return s.apply(u, arguments);
  };
}
const { toString: ay } = Object.prototype,
  { getPrototypeOf: Cc } = Object,
  { iterator: Mi, toStringTag: jh } = Symbol,
  Di = ((s) => (u) => {
    const o = ay.call(u);
    return s[o] || (s[o] = o.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Dt = (s) => ((s = s.toLowerCase()), (u) => Di(u) === s),
  zi = (s) => (u) => typeof u === s,
  { isArray: Xl } = Array,
  Fn = zi("undefined");
function ly(s) {
  return (
    s !== null &&
    !Fn(s) &&
    s.constructor !== null &&
    !Fn(s.constructor) &&
    ut(s.constructor.isBuffer) &&
    s.constructor.isBuffer(s)
  );
}
const Nh = Dt("ArrayBuffer");
function ny(s) {
  let u;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (u = ArrayBuffer.isView(s))
      : (u = s && s.buffer && Nh(s.buffer)),
    u
  );
}
const sy = zi("string"),
  ut = zi("function"),
  Sh = zi("number"),
  ki = (s) => s !== null && typeof s == "object",
  iy = (s) => s === !0 || s === !1,
  Si = (s) => {
    if (Di(s) !== "object") return !1;
    const u = Cc(s);
    return (
      (u === null ||
        u === Object.prototype ||
        Object.getPrototypeOf(u) === null) &&
      !(jh in s) &&
      !(Mi in s)
    );
  },
  ry = Dt("Date"),
  uy = Dt("File"),
  cy = Dt("Blob"),
  oy = Dt("FileList"),
  dy = (s) => ki(s) && ut(s.pipe),
  fy = (s) => {
    let u;
    return (
      s &&
      ((typeof FormData == "function" && s instanceof FormData) ||
        (ut(s.append) &&
          ((u = Di(s)) === "formdata" ||
            (u === "object" &&
              ut(s.toString) &&
              s.toString() === "[object FormData]"))))
    );
  },
  my = Dt("URLSearchParams"),
  [hy, xy, py, gy] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Dt
  ),
  yy = (s) =>
    s.trim ? s.trim() : s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function In(s, u, { allOwnKeys: o = !1 } = {}) {
  if (s === null || typeof s > "u") return;
  let c, d;
  if ((typeof s != "object" && (s = [s]), Xl(s)))
    for (c = 0, d = s.length; c < d; c++) u.call(null, s[c], c, s);
  else {
    const m = o ? Object.getOwnPropertyNames(s) : Object.keys(s),
      p = m.length;
    let y;
    for (c = 0; c < p; c++) (y = m[c]), u.call(null, s[y], y, s);
  }
}
function wh(s, u) {
  u = u.toLowerCase();
  const o = Object.keys(s);
  let c = o.length,
    d;
  for (; c-- > 0; ) if (((d = o[c]), u === d.toLowerCase())) return d;
  return null;
}
const Wa =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  Eh = (s) => !Fn(s) && s !== Wa;
function pc() {
  const { caseless: s } = (Eh(this) && this) || {},
    u = {},
    o = (c, d) => {
      const m = (s && wh(u, d)) || d;
      Si(u[m]) && Si(c)
        ? (u[m] = pc(u[m], c))
        : Si(c)
        ? (u[m] = pc({}, c))
        : Xl(c)
        ? (u[m] = c.slice())
        : (u[m] = c);
    };
  for (let c = 0, d = arguments.length; c < d; c++)
    arguments[c] && In(arguments[c], o);
  return u;
}
const by = (s, u, o, { allOwnKeys: c } = {}) => (
    In(
      u,
      (d, m) => {
        o && ut(d) ? (s[m] = vh(d, o)) : (s[m] = d);
      },
      { allOwnKeys: c }
    ),
    s
  ),
  vy = (s) => (s.charCodeAt(0) === 65279 && (s = s.slice(1)), s),
  jy = (s, u, o, c) => {
    (s.prototype = Object.create(u.prototype, c)),
      (s.prototype.constructor = s),
      Object.defineProperty(s, "super", { value: u.prototype }),
      o && Object.assign(s.prototype, o);
  },
  Ny = (s, u, o, c) => {
    let d, m, p;
    const y = {};
    if (((u = u || {}), s == null)) return u;
    do {
      for (d = Object.getOwnPropertyNames(s), m = d.length; m-- > 0; )
        (p = d[m]), (!c || c(p, s, u)) && !y[p] && ((u[p] = s[p]), (y[p] = !0));
      s = o !== !1 && Cc(s);
    } while (s && (!o || o(s, u)) && s !== Object.prototype);
    return u;
  },
  Sy = (s, u, o) => {
    (s = String(s)),
      (o === void 0 || o > s.length) && (o = s.length),
      (o -= u.length);
    const c = s.indexOf(u, o);
    return c !== -1 && c === o;
  },
  wy = (s) => {
    if (!s) return null;
    if (Xl(s)) return s;
    let u = s.length;
    if (!Sh(u)) return null;
    const o = new Array(u);
    for (; u-- > 0; ) o[u] = s[u];
    return o;
  },
  Ey = (
    (s) => (u) =>
      s && u instanceof s
  )(typeof Uint8Array < "u" && Cc(Uint8Array)),
  _y = (s, u) => {
    const c = (s && s[Mi]).call(s);
    let d;
    for (; (d = c.next()) && !d.done; ) {
      const m = d.value;
      u.call(s, m[0], m[1]);
    }
  },
  Ay = (s, u) => {
    let o;
    const c = [];
    for (; (o = s.exec(u)) !== null; ) c.push(o);
    return c;
  },
  Ty = Dt("HTMLFormElement"),
  Ry = (s) =>
    s.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (o, c, d) {
      return c.toUpperCase() + d;
    }),
  Xm = (
    ({ hasOwnProperty: s }) =>
    (u, o) =>
      s.call(u, o)
  )(Object.prototype),
  Cy = Dt("RegExp"),
  _h = (s, u) => {
    const o = Object.getOwnPropertyDescriptors(s),
      c = {};
    In(o, (d, m) => {
      let p;
      (p = u(d, m, s)) !== !1 && (c[m] = p || d);
    }),
      Object.defineProperties(s, c);
  },
  Oy = (s) => {
    _h(s, (u, o) => {
      if (ut(s) && ["arguments", "caller", "callee"].indexOf(o) !== -1)
        return !1;
      const c = s[o];
      if (ut(c)) {
        if (((u.enumerable = !1), "writable" in u)) {
          u.writable = !1;
          return;
        }
        u.set ||
          (u.set = () => {
            throw Error("Can not rewrite read-only method '" + o + "'");
          });
      }
    });
  },
  My = (s, u) => {
    const o = {},
      c = (d) => {
        d.forEach((m) => {
          o[m] = !0;
        });
      };
    return Xl(s) ? c(s) : c(String(s).split(u)), o;
  },
  Dy = () => {},
  zy = (s, u) => (s != null && Number.isFinite((s = +s)) ? s : u);
function ky(s) {
  return !!(s && ut(s.append) && s[jh] === "FormData" && s[Mi]);
}
const Uy = (s) => {
    const u = new Array(10),
      o = (c, d) => {
        if (ki(c)) {
          if (u.indexOf(c) >= 0) return;
          if (!("toJSON" in c)) {
            u[d] = c;
            const m = Xl(c) ? [] : {};
            return (
              In(c, (p, y) => {
                const g = o(p, d + 1);
                !Fn(g) && (m[y] = g);
              }),
              (u[d] = void 0),
              m
            );
          }
        }
        return c;
      };
    return o(s, 0);
  },
  Ly = Dt("AsyncFunction"),
  By = (s) => s && (ki(s) || ut(s)) && ut(s.then) && ut(s.catch),
  Ah = ((s, u) =>
    s
      ? setImmediate
      : u
      ? ((o, c) => (
          Wa.addEventListener(
            "message",
            ({ source: d, data: m }) => {
              d === Wa && m === o && c.length && c.shift()();
            },
            !1
          ),
          (d) => {
            c.push(d), Wa.postMessage(o, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (o) => setTimeout(o))(
    typeof setImmediate == "function",
    ut(Wa.postMessage)
  ),
  Hy =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Wa)
      : (typeof process < "u" && process.nextTick) || Ah,
  qy = (s) => s != null && ut(s[Mi]),
  H = {
    isArray: Xl,
    isArrayBuffer: Nh,
    isBuffer: ly,
    isFormData: fy,
    isArrayBufferView: ny,
    isString: sy,
    isNumber: Sh,
    isBoolean: iy,
    isObject: ki,
    isPlainObject: Si,
    isReadableStream: hy,
    isRequest: xy,
    isResponse: py,
    isHeaders: gy,
    isUndefined: Fn,
    isDate: ry,
    isFile: uy,
    isBlob: cy,
    isRegExp: Cy,
    isFunction: ut,
    isStream: dy,
    isURLSearchParams: my,
    isTypedArray: Ey,
    isFileList: oy,
    forEach: In,
    merge: pc,
    extend: by,
    trim: yy,
    stripBOM: vy,
    inherits: jy,
    toFlatObject: Ny,
    kindOf: Di,
    kindOfTest: Dt,
    endsWith: Sy,
    toArray: wy,
    forEachEntry: _y,
    matchAll: Ay,
    isHTMLForm: Ty,
    hasOwnProperty: Xm,
    hasOwnProp: Xm,
    reduceDescriptors: _h,
    freezeMethods: Oy,
    toObjectSet: My,
    toCamelCase: Ry,
    noop: Dy,
    toFiniteNumber: zy,
    findKey: wh,
    global: Wa,
    isContextDefined: Eh,
    isSpecCompliantForm: ky,
    toJSONObject: Uy,
    isAsyncFn: Ly,
    isThenable: By,
    setImmediate: Ah,
    asap: Hy,
    isIterable: qy,
  };
function de(s, u, o, c, d) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = s),
    (this.name = "AxiosError"),
    u && (this.code = u),
    o && (this.config = o),
    c && (this.request = c),
    d && ((this.response = d), (this.status = d.status ? d.status : null));
}
H.inherits(de, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: H.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Th = de.prototype,
  Rh = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((s) => {
  Rh[s] = { value: s };
});
Object.defineProperties(de, Rh);
Object.defineProperty(Th, "isAxiosError", { value: !0 });
de.from = (s, u, o, c, d, m) => {
  const p = Object.create(Th);
  return (
    H.toFlatObject(
      s,
      p,
      function (g) {
        return g !== Error.prototype;
      },
      (y) => y !== "isAxiosError"
    ),
    de.call(p, s.message, u, o, c, d),
    (p.cause = s),
    (p.name = s.name),
    m && Object.assign(p, m),
    p
  );
};
const Yy = null;
function gc(s) {
  return H.isPlainObject(s) || H.isArray(s);
}
function Ch(s) {
  return H.endsWith(s, "[]") ? s.slice(0, -2) : s;
}
function Qm(s, u, o) {
  return s
    ? s
        .concat(u)
        .map(function (d, m) {
          return (d = Ch(d)), !o && m ? "[" + d + "]" : d;
        })
        .join(o ? "." : "")
    : u;
}
function Vy(s) {
  return H.isArray(s) && !s.some(gc);
}
const Gy = H.toFlatObject(H, {}, null, function (u) {
  return /^is[A-Z]/.test(u);
});
function Ui(s, u, o) {
  if (!H.isObject(s)) throw new TypeError("target must be an object");
  (u = u || new FormData()),
    (o = H.toFlatObject(
      o,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (R, C) {
        return !H.isUndefined(C[R]);
      }
    ));
  const c = o.metaTokens,
    d = o.visitor || b,
    m = o.dots,
    p = o.indexes,
    g = (o.Blob || (typeof Blob < "u" && Blob)) && H.isSpecCompliantForm(u);
  if (!H.isFunction(d)) throw new TypeError("visitor must be a function");
  function h(j) {
    if (j === null) return "";
    if (H.isDate(j)) return j.toISOString();
    if (H.isBoolean(j)) return j.toString();
    if (!g && H.isBlob(j))
      throw new de("Blob is not supported. Use a Buffer instead.");
    return H.isArrayBuffer(j) || H.isTypedArray(j)
      ? g && typeof Blob == "function"
        ? new Blob([j])
        : Buffer.from(j)
      : j;
  }
  function b(j, R, C) {
    let q = j;
    if (j && !C && typeof j == "object") {
      if (H.endsWith(R, "{}"))
        (R = c ? R : R.slice(0, -2)), (j = JSON.stringify(j));
      else if (
        (H.isArray(j) && Vy(j)) ||
        ((H.isFileList(j) || H.endsWith(R, "[]")) && (q = H.toArray(j)))
      )
        return (
          (R = Ch(R)),
          q.forEach(function (M, J) {
            !(H.isUndefined(M) || M === null) &&
              u.append(
                p === !0 ? Qm([R], J, m) : p === null ? R : R + "[]",
                h(M)
              );
          }),
          !1
        );
    }
    return gc(j) ? !0 : (u.append(Qm(C, R, m), h(j)), !1);
  }
  const T = [],
    E = Object.assign(Gy, {
      defaultVisitor: b,
      convertValue: h,
      isVisitable: gc,
    });
  function k(j, R) {
    if (!H.isUndefined(j)) {
      if (T.indexOf(j) !== -1)
        throw Error("Circular reference detected in " + R.join("."));
      T.push(j),
        H.forEach(j, function (q, X) {
          (!(H.isUndefined(q) || q === null) &&
            d.call(u, q, H.isString(X) ? X.trim() : X, R, E)) === !0 &&
            k(q, R ? R.concat(X) : [X]);
        }),
        T.pop();
    }
  }
  if (!H.isObject(s)) throw new TypeError("data must be an object");
  return k(s), u;
}
function Zm(s) {
  const u = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(s).replace(/[!'()~]|%20|%00/g, function (c) {
    return u[c];
  });
}
function Oc(s, u) {
  (this._pairs = []), s && Ui(s, this, u);
}
const Oh = Oc.prototype;
Oh.append = function (u, o) {
  this._pairs.push([u, o]);
};
Oh.toString = function (u) {
  const o = u
    ? function (c) {
        return u.call(this, c, Zm);
      }
    : Zm;
  return this._pairs
    .map(function (d) {
      return o(d[0]) + "=" + o(d[1]);
    }, "")
    .join("&");
};
function Xy(s) {
  return encodeURIComponent(s)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function Mh(s, u, o) {
  if (!u) return s;
  const c = (o && o.encode) || Xy;
  H.isFunction(o) && (o = { serialize: o });
  const d = o && o.serialize;
  let m;
  if (
    (d
      ? (m = d(u, o))
      : (m = H.isURLSearchParams(u) ? u.toString() : new Oc(u, o).toString(c)),
    m)
  ) {
    const p = s.indexOf("#");
    p !== -1 && (s = s.slice(0, p)),
      (s += (s.indexOf("?") === -1 ? "?" : "&") + m);
  }
  return s;
}
class Km {
  constructor() {
    this.handlers = [];
  }
  use(u, o, c) {
    return (
      this.handlers.push({
        fulfilled: u,
        rejected: o,
        synchronous: c ? c.synchronous : !1,
        runWhen: c ? c.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(u) {
    this.handlers[u] && (this.handlers[u] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(u) {
    H.forEach(this.handlers, function (c) {
      c !== null && u(c);
    });
  }
}
const Dh = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Qy = typeof URLSearchParams < "u" ? URLSearchParams : Oc,
  Zy = typeof FormData < "u" ? FormData : null,
  Ky = typeof Blob < "u" ? Blob : null,
  Jy = {
    isBrowser: !0,
    classes: { URLSearchParams: Qy, FormData: Zy, Blob: Ky },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Mc = typeof window < "u" && typeof document < "u",
  yc = (typeof navigator == "object" && navigator) || void 0,
  $y =
    Mc &&
    (!yc || ["ReactNative", "NativeScript", "NS"].indexOf(yc.product) < 0),
  Fy =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Py = (Mc && window.location.href) || "http://localhost",
  Wy = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Mc,
        hasStandardBrowserEnv: $y,
        hasStandardBrowserWebWorkerEnv: Fy,
        navigator: yc,
        origin: Py,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  tt = { ...Wy, ...Jy };
function Iy(s, u) {
  return Ui(
    s,
    new tt.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (o, c, d, m) {
          return tt.isNode && H.isBuffer(o)
            ? (this.append(c, o.toString("base64")), !1)
            : m.defaultVisitor.apply(this, arguments);
        },
      },
      u
    )
  );
}
function eb(s) {
  return H.matchAll(/\w+|\[(\w*)]/g, s).map((u) =>
    u[0] === "[]" ? "" : u[1] || u[0]
  );
}
function tb(s) {
  const u = {},
    o = Object.keys(s);
  let c;
  const d = o.length;
  let m;
  for (c = 0; c < d; c++) (m = o[c]), (u[m] = s[m]);
  return u;
}
function zh(s) {
  function u(o, c, d, m) {
    let p = o[m++];
    if (p === "__proto__") return !0;
    const y = Number.isFinite(+p),
      g = m >= o.length;
    return (
      (p = !p && H.isArray(d) ? d.length : p),
      g
        ? (H.hasOwnProp(d, p) ? (d[p] = [d[p], c]) : (d[p] = c), !y)
        : ((!d[p] || !H.isObject(d[p])) && (d[p] = []),
          u(o, c, d[p], m) && H.isArray(d[p]) && (d[p] = tb(d[p])),
          !y)
    );
  }
  if (H.isFormData(s) && H.isFunction(s.entries)) {
    const o = {};
    return (
      H.forEachEntry(s, (c, d) => {
        u(eb(c), d, o, 0);
      }),
      o
    );
  }
  return null;
}
function ab(s, u, o) {
  if (H.isString(s))
    try {
      return (u || JSON.parse)(s), H.trim(s);
    } catch (c) {
      if (c.name !== "SyntaxError") throw c;
    }
  return (o || JSON.stringify)(s);
}
const es = {
  transitional: Dh,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (u, o) {
      const c = o.getContentType() || "",
        d = c.indexOf("application/json") > -1,
        m = H.isObject(u);
      if ((m && H.isHTMLForm(u) && (u = new FormData(u)), H.isFormData(u)))
        return d ? JSON.stringify(zh(u)) : u;
      if (
        H.isArrayBuffer(u) ||
        H.isBuffer(u) ||
        H.isStream(u) ||
        H.isFile(u) ||
        H.isBlob(u) ||
        H.isReadableStream(u)
      )
        return u;
      if (H.isArrayBufferView(u)) return u.buffer;
      if (H.isURLSearchParams(u))
        return (
          o.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          u.toString()
        );
      let y;
      if (m) {
        if (c.indexOf("application/x-www-form-urlencoded") > -1)
          return Iy(u, this.formSerializer).toString();
        if ((y = H.isFileList(u)) || c.indexOf("multipart/form-data") > -1) {
          const g = this.env && this.env.FormData;
          return Ui(
            y ? { "files[]": u } : u,
            g && new g(),
            this.formSerializer
          );
        }
      }
      return m || d ? (o.setContentType("application/json", !1), ab(u)) : u;
    },
  ],
  transformResponse: [
    function (u) {
      const o = this.transitional || es.transitional,
        c = o && o.forcedJSONParsing,
        d = this.responseType === "json";
      if (H.isResponse(u) || H.isReadableStream(u)) return u;
      if (u && H.isString(u) && ((c && !this.responseType) || d)) {
        const p = !(o && o.silentJSONParsing) && d;
        try {
          return JSON.parse(u);
        } catch (y) {
          if (p)
            throw y.name === "SyntaxError"
              ? de.from(y, de.ERR_BAD_RESPONSE, this, null, this.response)
              : y;
        }
      }
      return u;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: tt.classes.FormData, Blob: tt.classes.Blob },
  validateStatus: function (u) {
    return u >= 200 && u < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
H.forEach(["delete", "get", "head", "post", "put", "patch"], (s) => {
  es.headers[s] = {};
});
const lb = H.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  nb = (s) => {
    const u = {};
    let o, c, d;
    return (
      s &&
        s
          .split(
            `
`
          )
          .forEach(function (p) {
            (d = p.indexOf(":")),
              (o = p.substring(0, d).trim().toLowerCase()),
              (c = p.substring(d + 1).trim()),
              !(!o || (u[o] && lb[o])) &&
                (o === "set-cookie"
                  ? u[o]
                    ? u[o].push(c)
                    : (u[o] = [c])
                  : (u[o] = u[o] ? u[o] + ", " + c : c));
          }),
      u
    );
  },
  Jm = Symbol("internals");
function Jn(s) {
  return s && String(s).trim().toLowerCase();
}
function wi(s) {
  return s === !1 || s == null ? s : H.isArray(s) ? s.map(wi) : String(s);
}
function sb(s) {
  const u = Object.create(null),
    o = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let c;
  for (; (c = o.exec(s)); ) u[c[1]] = c[2];
  return u;
}
const ib = (s) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(s.trim());
function uc(s, u, o, c, d) {
  if (H.isFunction(c)) return c.call(this, u, o);
  if ((d && (u = o), !!H.isString(u))) {
    if (H.isString(c)) return u.indexOf(c) !== -1;
    if (H.isRegExp(c)) return c.test(u);
  }
}
function rb(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (u, o, c) => o.toUpperCase() + c);
}
function ub(s, u) {
  const o = H.toCamelCase(" " + u);
  ["get", "set", "has"].forEach((c) => {
    Object.defineProperty(s, c + o, {
      value: function (d, m, p) {
        return this[c].call(this, u, d, m, p);
      },
      configurable: !0,
    });
  });
}
let ct = class {
  constructor(u) {
    u && this.set(u);
  }
  set(u, o, c) {
    const d = this;
    function m(y, g, h) {
      const b = Jn(g);
      if (!b) throw new Error("header name must be a non-empty string");
      const T = H.findKey(d, b);
      (!T || d[T] === void 0 || h === !0 || (h === void 0 && d[T] !== !1)) &&
        (d[T || g] = wi(y));
    }
    const p = (y, g) => H.forEach(y, (h, b) => m(h, b, g));
    if (H.isPlainObject(u) || u instanceof this.constructor) p(u, o);
    else if (H.isString(u) && (u = u.trim()) && !ib(u)) p(nb(u), o);
    else if (H.isObject(u) && H.isIterable(u)) {
      let y = {},
        g,
        h;
      for (const b of u) {
        if (!H.isArray(b))
          throw TypeError("Object iterator must return a key-value pair");
        y[(h = b[0])] = (g = y[h])
          ? H.isArray(g)
            ? [...g, b[1]]
            : [g, b[1]]
          : b[1];
      }
      p(y, o);
    } else u != null && m(o, u, c);
    return this;
  }
  get(u, o) {
    if (((u = Jn(u)), u)) {
      const c = H.findKey(this, u);
      if (c) {
        const d = this[c];
        if (!o) return d;
        if (o === !0) return sb(d);
        if (H.isFunction(o)) return o.call(this, d, c);
        if (H.isRegExp(o)) return o.exec(d);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(u, o) {
    if (((u = Jn(u)), u)) {
      const c = H.findKey(this, u);
      return !!(c && this[c] !== void 0 && (!o || uc(this, this[c], c, o)));
    }
    return !1;
  }
  delete(u, o) {
    const c = this;
    let d = !1;
    function m(p) {
      if (((p = Jn(p)), p)) {
        const y = H.findKey(c, p);
        y && (!o || uc(c, c[y], y, o)) && (delete c[y], (d = !0));
      }
    }
    return H.isArray(u) ? u.forEach(m) : m(u), d;
  }
  clear(u) {
    const o = Object.keys(this);
    let c = o.length,
      d = !1;
    for (; c--; ) {
      const m = o[c];
      (!u || uc(this, this[m], m, u, !0)) && (delete this[m], (d = !0));
    }
    return d;
  }
  normalize(u) {
    const o = this,
      c = {};
    return (
      H.forEach(this, (d, m) => {
        const p = H.findKey(c, m);
        if (p) {
          (o[p] = wi(d)), delete o[m];
          return;
        }
        const y = u ? rb(m) : String(m).trim();
        y !== m && delete o[m], (o[y] = wi(d)), (c[y] = !0);
      }),
      this
    );
  }
  concat(...u) {
    return this.constructor.concat(this, ...u);
  }
  toJSON(u) {
    const o = Object.create(null);
    return (
      H.forEach(this, (c, d) => {
        c != null && c !== !1 && (o[d] = u && H.isArray(c) ? c.join(", ") : c);
      }),
      o
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([u, o]) => u + ": " + o).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(u) {
    return u instanceof this ? u : new this(u);
  }
  static concat(u, ...o) {
    const c = new this(u);
    return o.forEach((d) => c.set(d)), c;
  }
  static accessor(u) {
    const c = (this[Jm] = this[Jm] = { accessors: {} }).accessors,
      d = this.prototype;
    function m(p) {
      const y = Jn(p);
      c[y] || (ub(d, p), (c[y] = !0));
    }
    return H.isArray(u) ? u.forEach(m) : m(u), this;
  }
};
ct.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
H.reduceDescriptors(ct.prototype, ({ value: s }, u) => {
  let o = u[0].toUpperCase() + u.slice(1);
  return {
    get: () => s,
    set(c) {
      this[o] = c;
    },
  };
});
H.freezeMethods(ct);
function cc(s, u) {
  const o = this || es,
    c = u || o,
    d = ct.from(c.headers);
  let m = c.data;
  return (
    H.forEach(s, function (y) {
      m = y.call(o, m, d.normalize(), u ? u.status : void 0);
    }),
    d.normalize(),
    m
  );
}
function kh(s) {
  return !!(s && s.__CANCEL__);
}
function Ql(s, u, o) {
  de.call(this, s ?? "canceled", de.ERR_CANCELED, u, o),
    (this.name = "CanceledError");
}
H.inherits(Ql, de, { __CANCEL__: !0 });
function Uh(s, u, o) {
  const c = o.config.validateStatus;
  !o.status || !c || c(o.status)
    ? s(o)
    : u(
        new de(
          "Request failed with status code " + o.status,
          [de.ERR_BAD_REQUEST, de.ERR_BAD_RESPONSE][
            Math.floor(o.status / 100) - 4
          ],
          o.config,
          o.request,
          o
        )
      );
}
function cb(s) {
  const u = /^([-+\w]{1,25})(:?\/\/|:)/.exec(s);
  return (u && u[1]) || "";
}
function ob(s, u) {
  s = s || 10;
  const o = new Array(s),
    c = new Array(s);
  let d = 0,
    m = 0,
    p;
  return (
    (u = u !== void 0 ? u : 1e3),
    function (g) {
      const h = Date.now(),
        b = c[m];
      p || (p = h), (o[d] = g), (c[d] = h);
      let T = m,
        E = 0;
      for (; T !== d; ) (E += o[T++]), (T = T % s);
      if (((d = (d + 1) % s), d === m && (m = (m + 1) % s), h - p < u)) return;
      const k = b && h - b;
      return k ? Math.round((E * 1e3) / k) : void 0;
    }
  );
}
function db(s, u) {
  let o = 0,
    c = 1e3 / u,
    d,
    m;
  const p = (h, b = Date.now()) => {
    (o = b), (d = null), m && (clearTimeout(m), (m = null)), s.apply(null, h);
  };
  return [
    (...h) => {
      const b = Date.now(),
        T = b - o;
      T >= c
        ? p(h, b)
        : ((d = h),
          m ||
            (m = setTimeout(() => {
              (m = null), p(d);
            }, c - T)));
    },
    () => d && p(d),
  ];
}
const Ai = (s, u, o = 3) => {
    let c = 0;
    const d = ob(50, 250);
    return db((m) => {
      const p = m.loaded,
        y = m.lengthComputable ? m.total : void 0,
        g = p - c,
        h = d(g),
        b = p <= y;
      c = p;
      const T = {
        loaded: p,
        total: y,
        progress: y ? p / y : void 0,
        bytes: g,
        rate: h || void 0,
        estimated: h && y && b ? (y - p) / h : void 0,
        event: m,
        lengthComputable: y != null,
        [u ? "download" : "upload"]: !0,
      };
      s(T);
    }, o);
  },
  $m = (s, u) => {
    const o = s != null;
    return [(c) => u[0]({ lengthComputable: o, total: s, loaded: c }), u[1]];
  },
  Fm =
    (s) =>
    (...u) =>
      H.asap(() => s(...u)),
  fb = tt.hasStandardBrowserEnv
    ? ((s, u) => (o) => (
        (o = new URL(o, tt.origin)),
        s.protocol === o.protocol &&
          s.host === o.host &&
          (u || s.port === o.port)
      ))(
        new URL(tt.origin),
        tt.navigator && /(msie|trident)/i.test(tt.navigator.userAgent)
      )
    : () => !0,
  mb = tt.hasStandardBrowserEnv
    ? {
        write(s, u, o, c, d, m) {
          const p = [s + "=" + encodeURIComponent(u)];
          H.isNumber(o) && p.push("expires=" + new Date(o).toGMTString()),
            H.isString(c) && p.push("path=" + c),
            H.isString(d) && p.push("domain=" + d),
            m === !0 && p.push("secure"),
            (document.cookie = p.join("; "));
        },
        read(s) {
          const u = document.cookie.match(
            new RegExp("(^|;\\s*)(" + s + ")=([^;]*)")
          );
          return u ? decodeURIComponent(u[3]) : null;
        },
        remove(s) {
          this.write(s, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function hb(s) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(s);
}
function xb(s, u) {
  return u ? s.replace(/\/?\/$/, "") + "/" + u.replace(/^\/+/, "") : s;
}
function Lh(s, u, o) {
  let c = !hb(u);
  return s && (c || o == !1) ? xb(s, u) : u;
}
const Pm = (s) => (s instanceof ct ? { ...s } : s);
function el(s, u) {
  u = u || {};
  const o = {};
  function c(h, b, T, E) {
    return H.isPlainObject(h) && H.isPlainObject(b)
      ? H.merge.call({ caseless: E }, h, b)
      : H.isPlainObject(b)
      ? H.merge({}, b)
      : H.isArray(b)
      ? b.slice()
      : b;
  }
  function d(h, b, T, E) {
    if (H.isUndefined(b)) {
      if (!H.isUndefined(h)) return c(void 0, h, T, E);
    } else return c(h, b, T, E);
  }
  function m(h, b) {
    if (!H.isUndefined(b)) return c(void 0, b);
  }
  function p(h, b) {
    if (H.isUndefined(b)) {
      if (!H.isUndefined(h)) return c(void 0, h);
    } else return c(void 0, b);
  }
  function y(h, b, T) {
    if (T in u) return c(h, b);
    if (T in s) return c(void 0, h);
  }
  const g = {
    url: m,
    method: m,
    data: m,
    baseURL: p,
    transformRequest: p,
    transformResponse: p,
    paramsSerializer: p,
    timeout: p,
    timeoutMessage: p,
    withCredentials: p,
    withXSRFToken: p,
    adapter: p,
    responseType: p,
    xsrfCookieName: p,
    xsrfHeaderName: p,
    onUploadProgress: p,
    onDownloadProgress: p,
    decompress: p,
    maxContentLength: p,
    maxBodyLength: p,
    beforeRedirect: p,
    transport: p,
    httpAgent: p,
    httpsAgent: p,
    cancelToken: p,
    socketPath: p,
    responseEncoding: p,
    validateStatus: y,
    headers: (h, b, T) => d(Pm(h), Pm(b), T, !0),
  };
  return (
    H.forEach(Object.keys(Object.assign({}, s, u)), function (b) {
      const T = g[b] || d,
        E = T(s[b], u[b], b);
      (H.isUndefined(E) && T !== y) || (o[b] = E);
    }),
    o
  );
}
const Bh = (s) => {
    const u = el({}, s);
    let {
      data: o,
      withXSRFToken: c,
      xsrfHeaderName: d,
      xsrfCookieName: m,
      headers: p,
      auth: y,
    } = u;
    (u.headers = p = ct.from(p)),
      (u.url = Mh(
        Lh(u.baseURL, u.url, u.allowAbsoluteUrls),
        s.params,
        s.paramsSerializer
      )),
      y &&
        p.set(
          "Authorization",
          "Basic " +
            btoa(
              (y.username || "") +
                ":" +
                (y.password ? unescape(encodeURIComponent(y.password)) : "")
            )
        );
    let g;
    if (H.isFormData(o)) {
      if (tt.hasStandardBrowserEnv || tt.hasStandardBrowserWebWorkerEnv)
        p.setContentType(void 0);
      else if ((g = p.getContentType()) !== !1) {
        const [h, ...b] = g
          ? g
              .split(";")
              .map((T) => T.trim())
              .filter(Boolean)
          : [];
        p.setContentType([h || "multipart/form-data", ...b].join("; "));
      }
    }
    if (
      tt.hasStandardBrowserEnv &&
      (c && H.isFunction(c) && (c = c(u)), c || (c !== !1 && fb(u.url)))
    ) {
      const h = d && m && mb.read(m);
      h && p.set(d, h);
    }
    return u;
  },
  pb = typeof XMLHttpRequest < "u",
  gb =
    pb &&
    function (s) {
      return new Promise(function (o, c) {
        const d = Bh(s);
        let m = d.data;
        const p = ct.from(d.headers).normalize();
        let { responseType: y, onUploadProgress: g, onDownloadProgress: h } = d,
          b,
          T,
          E,
          k,
          j;
        function R() {
          k && k(),
            j && j(),
            d.cancelToken && d.cancelToken.unsubscribe(b),
            d.signal && d.signal.removeEventListener("abort", b);
        }
        let C = new XMLHttpRequest();
        C.open(d.method.toUpperCase(), d.url, !0), (C.timeout = d.timeout);
        function q() {
          if (!C) return;
          const M = ct.from(
              "getAllResponseHeaders" in C && C.getAllResponseHeaders()
            ),
            U = {
              data:
                !y || y === "text" || y === "json"
                  ? C.responseText
                  : C.response,
              status: C.status,
              statusText: C.statusText,
              headers: M,
              config: s,
              request: C,
            };
          Uh(
            function (ee) {
              o(ee), R();
            },
            function (ee) {
              c(ee), R();
            },
            U
          ),
            (C = null);
        }
        "onloadend" in C
          ? (C.onloadend = q)
          : (C.onreadystatechange = function () {
              !C ||
                C.readyState !== 4 ||
                (C.status === 0 &&
                  !(C.responseURL && C.responseURL.indexOf("file:") === 0)) ||
                setTimeout(q);
            }),
          (C.onabort = function () {
            C &&
              (c(new de("Request aborted", de.ECONNABORTED, s, C)), (C = null));
          }),
          (C.onerror = function () {
            c(new de("Network Error", de.ERR_NETWORK, s, C)), (C = null);
          }),
          (C.ontimeout = function () {
            let J = d.timeout
              ? "timeout of " + d.timeout + "ms exceeded"
              : "timeout exceeded";
            const U = d.transitional || Dh;
            d.timeoutErrorMessage && (J = d.timeoutErrorMessage),
              c(
                new de(
                  J,
                  U.clarifyTimeoutError ? de.ETIMEDOUT : de.ECONNABORTED,
                  s,
                  C
                )
              ),
              (C = null);
          }),
          m === void 0 && p.setContentType(null),
          "setRequestHeader" in C &&
            H.forEach(p.toJSON(), function (J, U) {
              C.setRequestHeader(U, J);
            }),
          H.isUndefined(d.withCredentials) ||
            (C.withCredentials = !!d.withCredentials),
          y && y !== "json" && (C.responseType = d.responseType),
          h && (([E, j] = Ai(h, !0)), C.addEventListener("progress", E)),
          g &&
            C.upload &&
            (([T, k] = Ai(g)),
            C.upload.addEventListener("progress", T),
            C.upload.addEventListener("loadend", k)),
          (d.cancelToken || d.signal) &&
            ((b = (M) => {
              C &&
                (c(!M || M.type ? new Ql(null, s, C) : M),
                C.abort(),
                (C = null));
            }),
            d.cancelToken && d.cancelToken.subscribe(b),
            d.signal &&
              (d.signal.aborted ? b() : d.signal.addEventListener("abort", b)));
        const X = cb(d.url);
        if (X && tt.protocols.indexOf(X) === -1) {
          c(new de("Unsupported protocol " + X + ":", de.ERR_BAD_REQUEST, s));
          return;
        }
        C.send(m || null);
      });
    },
  yb = (s, u) => {
    const { length: o } = (s = s ? s.filter(Boolean) : []);
    if (u || o) {
      let c = new AbortController(),
        d;
      const m = function (h) {
        if (!d) {
          (d = !0), y();
          const b = h instanceof Error ? h : this.reason;
          c.abort(
            b instanceof de ? b : new Ql(b instanceof Error ? b.message : b)
          );
        }
      };
      let p =
        u &&
        setTimeout(() => {
          (p = null), m(new de(`timeout ${u} of ms exceeded`, de.ETIMEDOUT));
        }, u);
      const y = () => {
        s &&
          (p && clearTimeout(p),
          (p = null),
          s.forEach((h) => {
            h.unsubscribe
              ? h.unsubscribe(m)
              : h.removeEventListener("abort", m);
          }),
          (s = null));
      };
      s.forEach((h) => h.addEventListener("abort", m));
      const { signal: g } = c;
      return (g.unsubscribe = () => H.asap(y)), g;
    }
  },
  bb = function* (s, u) {
    let o = s.byteLength;
    if (o < u) {
      yield s;
      return;
    }
    let c = 0,
      d;
    for (; c < o; ) (d = c + u), yield s.slice(c, d), (c = d);
  },
  vb = async function* (s, u) {
    for await (const o of jb(s)) yield* bb(o, u);
  },
  jb = async function* (s) {
    if (s[Symbol.asyncIterator]) {
      yield* s;
      return;
    }
    const u = s.getReader();
    try {
      for (;;) {
        const { done: o, value: c } = await u.read();
        if (o) break;
        yield c;
      }
    } finally {
      await u.cancel();
    }
  },
  Wm = (s, u, o, c) => {
    const d = vb(s, u);
    let m = 0,
      p,
      y = (g) => {
        p || ((p = !0), c && c(g));
      };
    return new ReadableStream(
      {
        async pull(g) {
          try {
            const { done: h, value: b } = await d.next();
            if (h) {
              y(), g.close();
              return;
            }
            let T = b.byteLength;
            if (o) {
              let E = (m += T);
              o(E);
            }
            g.enqueue(new Uint8Array(b));
          } catch (h) {
            throw (y(h), h);
          }
        },
        cancel(g) {
          return y(g), d.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  Li =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  Hh = Li && typeof ReadableStream == "function",
  Nb =
    Li &&
    (typeof TextEncoder == "function"
      ? (
          (s) => (u) =>
            s.encode(u)
        )(new TextEncoder())
      : async (s) => new Uint8Array(await new Response(s).arrayBuffer())),
  qh = (s, ...u) => {
    try {
      return !!s(...u);
    } catch {
      return !1;
    }
  },
  Sb =
    Hh &&
    qh(() => {
      let s = !1;
      const u = new Request(tt.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (s = !0), "half";
        },
      }).headers.has("Content-Type");
      return s && !u;
    }),
  Im = 64 * 1024,
  bc = Hh && qh(() => H.isReadableStream(new Response("").body)),
  Ti = { stream: bc && ((s) => s.body) };
Li &&
  ((s) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((u) => {
      !Ti[u] &&
        (Ti[u] = H.isFunction(s[u])
          ? (o) => o[u]()
          : (o, c) => {
              throw new de(
                `Response type '${u}' is not supported`,
                de.ERR_NOT_SUPPORT,
                c
              );
            });
    });
  })(new Response());
const wb = async (s) => {
    if (s == null) return 0;
    if (H.isBlob(s)) return s.size;
    if (H.isSpecCompliantForm(s))
      return (
        await new Request(tt.origin, { method: "POST", body: s }).arrayBuffer()
      ).byteLength;
    if (H.isArrayBufferView(s) || H.isArrayBuffer(s)) return s.byteLength;
    if ((H.isURLSearchParams(s) && (s = s + ""), H.isString(s)))
      return (await Nb(s)).byteLength;
  },
  Eb = async (s, u) => {
    const o = H.toFiniteNumber(s.getContentLength());
    return o ?? wb(u);
  },
  _b =
    Li &&
    (async (s) => {
      let {
        url: u,
        method: o,
        data: c,
        signal: d,
        cancelToken: m,
        timeout: p,
        onDownloadProgress: y,
        onUploadProgress: g,
        responseType: h,
        headers: b,
        withCredentials: T = "same-origin",
        fetchOptions: E,
      } = Bh(s);
      h = h ? (h + "").toLowerCase() : "text";
      let k = yb([d, m && m.toAbortSignal()], p),
        j;
      const R =
        k &&
        k.unsubscribe &&
        (() => {
          k.unsubscribe();
        });
      let C;
      try {
        if (
          g &&
          Sb &&
          o !== "get" &&
          o !== "head" &&
          (C = await Eb(b, c)) !== 0
        ) {
          let U = new Request(u, { method: "POST", body: c, duplex: "half" }),
            F;
          if (
            (H.isFormData(c) &&
              (F = U.headers.get("content-type")) &&
              b.setContentType(F),
            U.body)
          ) {
            const [ee, ie] = $m(C, Ai(Fm(g)));
            c = Wm(U.body, Im, ee, ie);
          }
        }
        H.isString(T) || (T = T ? "include" : "omit");
        const q = "credentials" in Request.prototype;
        j = new Request(u, {
          ...E,
          signal: k,
          method: o.toUpperCase(),
          headers: b.normalize().toJSON(),
          body: c,
          duplex: "half",
          credentials: q ? T : void 0,
        });
        let X = await fetch(j, E);
        const M = bc && (h === "stream" || h === "response");
        if (bc && (y || (M && R))) {
          const U = {};
          ["status", "statusText", "headers"].forEach((ue) => {
            U[ue] = X[ue];
          });
          const F = H.toFiniteNumber(X.headers.get("content-length")),
            [ee, ie] = (y && $m(F, Ai(Fm(y), !0))) || [];
          X = new Response(
            Wm(X.body, Im, ee, () => {
              ie && ie(), R && R();
            }),
            U
          );
        }
        h = h || "text";
        let J = await Ti[H.findKey(Ti, h) || "text"](X, s);
        return (
          !M && R && R(),
          await new Promise((U, F) => {
            Uh(U, F, {
              data: J,
              headers: ct.from(X.headers),
              status: X.status,
              statusText: X.statusText,
              config: s,
              request: j,
            });
          })
        );
      } catch (q) {
        throw (
          (R && R(),
          q && q.name === "TypeError" && /Load failed|fetch/i.test(q.message)
            ? Object.assign(new de("Network Error", de.ERR_NETWORK, s, j), {
                cause: q.cause || q,
              })
            : de.from(q, q && q.code, s, j))
        );
      }
    }),
  vc = { http: Yy, xhr: gb, fetch: _b };
H.forEach(vc, (s, u) => {
  if (s) {
    try {
      Object.defineProperty(s, "name", { value: u });
    } catch {}
    Object.defineProperty(s, "adapterName", { value: u });
  }
});
const eh = (s) => `- ${s}`,
  Ab = (s) => H.isFunction(s) || s === null || s === !1,
  Yh = {
    getAdapter: (s) => {
      s = H.isArray(s) ? s : [s];
      const { length: u } = s;
      let o, c;
      const d = {};
      for (let m = 0; m < u; m++) {
        o = s[m];
        let p;
        if (
          ((c = o),
          !Ab(o) && ((c = vc[(p = String(o)).toLowerCase()]), c === void 0))
        )
          throw new de(`Unknown adapter '${p}'`);
        if (c) break;
        d[p || "#" + m] = c;
      }
      if (!c) {
        const m = Object.entries(d).map(
          ([y, g]) =>
            `adapter ${y} ` +
            (g === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let p = u
          ? m.length > 1
            ? `since :
` +
              m.map(eh).join(`
`)
            : " " + eh(m[0])
          : "as no adapter specified";
        throw new de(
          "There is no suitable adapter to dispatch the request " + p,
          "ERR_NOT_SUPPORT"
        );
      }
      return c;
    },
    adapters: vc,
  };
function oc(s) {
  if (
    (s.cancelToken && s.cancelToken.throwIfRequested(),
    s.signal && s.signal.aborted)
  )
    throw new Ql(null, s);
}
function th(s) {
  return (
    oc(s),
    (s.headers = ct.from(s.headers)),
    (s.data = cc.call(s, s.transformRequest)),
    ["post", "put", "patch"].indexOf(s.method) !== -1 &&
      s.headers.setContentType("application/x-www-form-urlencoded", !1),
    Yh.getAdapter(s.adapter || es.adapter)(s).then(
      function (c) {
        return (
          oc(s),
          (c.data = cc.call(s, s.transformResponse, c)),
          (c.headers = ct.from(c.headers)),
          c
        );
      },
      function (c) {
        return (
          kh(c) ||
            (oc(s),
            c &&
              c.response &&
              ((c.response.data = cc.call(s, s.transformResponse, c.response)),
              (c.response.headers = ct.from(c.response.headers)))),
          Promise.reject(c)
        );
      }
    )
  );
}
const Vh = "1.10.0",
  Bi = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (s, u) => {
    Bi[s] = function (c) {
      return typeof c === s || "a" + (u < 1 ? "n " : " ") + s;
    };
  }
);
const ah = {};
Bi.transitional = function (u, o, c) {
  function d(m, p) {
    return (
      "[Axios v" +
      Vh +
      "] Transitional option '" +
      m +
      "'" +
      p +
      (c ? ". " + c : "")
    );
  }
  return (m, p, y) => {
    if (u === !1)
      throw new de(
        d(p, " has been removed" + (o ? " in " + o : "")),
        de.ERR_DEPRECATED
      );
    return (
      o &&
        !ah[p] &&
        ((ah[p] = !0),
        console.warn(
          d(
            p,
            " has been deprecated since v" +
              o +
              " and will be removed in the near future"
          )
        )),
      u ? u(m, p, y) : !0
    );
  };
};
Bi.spelling = function (u) {
  return (o, c) => (console.warn(`${c} is likely a misspelling of ${u}`), !0);
};
function Tb(s, u, o) {
  if (typeof s != "object")
    throw new de("options must be an object", de.ERR_BAD_OPTION_VALUE);
  const c = Object.keys(s);
  let d = c.length;
  for (; d-- > 0; ) {
    const m = c[d],
      p = u[m];
    if (p) {
      const y = s[m],
        g = y === void 0 || p(y, m, s);
      if (g !== !0)
        throw new de("option " + m + " must be " + g, de.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (o !== !0) throw new de("Unknown option " + m, de.ERR_BAD_OPTION);
  }
}
const Ei = { assertOptions: Tb, validators: Bi },
  qt = Ei.validators;
let Ia = class {
  constructor(u) {
    (this.defaults = u || {}),
      (this.interceptors = { request: new Km(), response: new Km() });
  }
  async request(u, o) {
    try {
      return await this._request(u, o);
    } catch (c) {
      if (c instanceof Error) {
        let d = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(d)
          : (d = new Error());
        const m = d.stack ? d.stack.replace(/^.+\n/, "") : "";
        try {
          c.stack
            ? m &&
              !String(c.stack).endsWith(m.replace(/^.+\n.+\n/, "")) &&
              (c.stack +=
                `
` + m)
            : (c.stack = m);
        } catch {}
      }
      throw c;
    }
  }
  _request(u, o) {
    typeof u == "string" ? ((o = o || {}), (o.url = u)) : (o = u || {}),
      (o = el(this.defaults, o));
    const { transitional: c, paramsSerializer: d, headers: m } = o;
    c !== void 0 &&
      Ei.assertOptions(
        c,
        {
          silentJSONParsing: qt.transitional(qt.boolean),
          forcedJSONParsing: qt.transitional(qt.boolean),
          clarifyTimeoutError: qt.transitional(qt.boolean),
        },
        !1
      ),
      d != null &&
        (H.isFunction(d)
          ? (o.paramsSerializer = { serialize: d })
          : Ei.assertOptions(
              d,
              { encode: qt.function, serialize: qt.function },
              !0
            )),
      o.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (o.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (o.allowAbsoluteUrls = !0)),
      Ei.assertOptions(
        o,
        {
          baseUrl: qt.spelling("baseURL"),
          withXsrfToken: qt.spelling("withXSRFToken"),
        },
        !0
      ),
      (o.method = (o.method || this.defaults.method || "get").toLowerCase());
    let p = m && H.merge(m.common, m[o.method]);
    m &&
      H.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (j) => {
          delete m[j];
        }
      ),
      (o.headers = ct.concat(p, m));
    const y = [];
    let g = !0;
    this.interceptors.request.forEach(function (R) {
      (typeof R.runWhen == "function" && R.runWhen(o) === !1) ||
        ((g = g && R.synchronous), y.unshift(R.fulfilled, R.rejected));
    });
    const h = [];
    this.interceptors.response.forEach(function (R) {
      h.push(R.fulfilled, R.rejected);
    });
    let b,
      T = 0,
      E;
    if (!g) {
      const j = [th.bind(this), void 0];
      for (
        j.unshift.apply(j, y),
          j.push.apply(j, h),
          E = j.length,
          b = Promise.resolve(o);
        T < E;

      )
        b = b.then(j[T++], j[T++]);
      return b;
    }
    E = y.length;
    let k = o;
    for (T = 0; T < E; ) {
      const j = y[T++],
        R = y[T++];
      try {
        k = j(k);
      } catch (C) {
        R.call(this, C);
        break;
      }
    }
    try {
      b = th.call(this, k);
    } catch (j) {
      return Promise.reject(j);
    }
    for (T = 0, E = h.length; T < E; ) b = b.then(h[T++], h[T++]);
    return b;
  }
  getUri(u) {
    u = el(this.defaults, u);
    const o = Lh(u.baseURL, u.url, u.allowAbsoluteUrls);
    return Mh(o, u.params, u.paramsSerializer);
  }
};
H.forEach(["delete", "get", "head", "options"], function (u) {
  Ia.prototype[u] = function (o, c) {
    return this.request(
      el(c || {}, { method: u, url: o, data: (c || {}).data })
    );
  };
});
H.forEach(["post", "put", "patch"], function (u) {
  function o(c) {
    return function (m, p, y) {
      return this.request(
        el(y || {}, {
          method: u,
          headers: c ? { "Content-Type": "multipart/form-data" } : {},
          url: m,
          data: p,
        })
      );
    };
  }
  (Ia.prototype[u] = o()), (Ia.prototype[u + "Form"] = o(!0));
});
let Rb = class Gh {
  constructor(u) {
    if (typeof u != "function")
      throw new TypeError("executor must be a function.");
    let o;
    this.promise = new Promise(function (m) {
      o = m;
    });
    const c = this;
    this.promise.then((d) => {
      if (!c._listeners) return;
      let m = c._listeners.length;
      for (; m-- > 0; ) c._listeners[m](d);
      c._listeners = null;
    }),
      (this.promise.then = (d) => {
        let m;
        const p = new Promise((y) => {
          c.subscribe(y), (m = y);
        }).then(d);
        return (
          (p.cancel = function () {
            c.unsubscribe(m);
          }),
          p
        );
      }),
      u(function (m, p, y) {
        c.reason || ((c.reason = new Ql(m, p, y)), o(c.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(u) {
    if (this.reason) {
      u(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(u) : (this._listeners = [u]);
  }
  unsubscribe(u) {
    if (!this._listeners) return;
    const o = this._listeners.indexOf(u);
    o !== -1 && this._listeners.splice(o, 1);
  }
  toAbortSignal() {
    const u = new AbortController(),
      o = (c) => {
        u.abort(c);
      };
    return (
      this.subscribe(o),
      (u.signal.unsubscribe = () => this.unsubscribe(o)),
      u.signal
    );
  }
  static source() {
    let u;
    return {
      token: new Gh(function (d) {
        u = d;
      }),
      cancel: u,
    };
  }
};
function Cb(s) {
  return function (o) {
    return s.apply(null, o);
  };
}
function Ob(s) {
  return H.isObject(s) && s.isAxiosError === !0;
}
const jc = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(jc).forEach(([s, u]) => {
  jc[u] = s;
});
function Xh(s) {
  const u = new Ia(s),
    o = vh(Ia.prototype.request, u);
  return (
    H.extend(o, Ia.prototype, u, { allOwnKeys: !0 }),
    H.extend(o, u, null, { allOwnKeys: !0 }),
    (o.create = function (d) {
      return Xh(el(s, d));
    }),
    o
  );
}
const Re = Xh(es);
Re.Axios = Ia;
Re.CanceledError = Ql;
Re.CancelToken = Rb;
Re.isCancel = kh;
Re.VERSION = Vh;
Re.toFormData = Ui;
Re.AxiosError = de;
Re.Cancel = Re.CanceledError;
Re.all = function (u) {
  return Promise.all(u);
};
Re.spread = Cb;
Re.isAxiosError = Ob;
Re.mergeConfig = el;
Re.AxiosHeaders = ct;
Re.formToJSON = (s) => zh(H.isHTMLForm(s) ? new FormData(s) : s);
Re.getAdapter = Yh.getAdapter;
Re.HttpStatusCode = jc;
Re.default = Re;
const {
    Axios: Fb,
    AxiosError: Pb,
    CanceledError: Wb,
    isCancel: Ib,
    CancelToken: ev,
    VERSION: tv,
    all: av,
    Cancel: lv,
    isAxiosError: nv,
    spread: sv,
    toFormData: iv,
    AxiosHeaders: rv,
    HttpStatusCode: uv,
    formToJSON: cv,
    getAdapter: ov,
    mergeConfig: dv,
  } = Re,
  Oa = "http://localhost/Verify_email/backend/routes/api.php",
  Mb = () => {
    const [s, u] = S.useState([]),
      [o, c] = S.useState(!0),
      [d, m] = S.useState(null),
      [p, y] = S.useState({}),
      [g, h] = S.useState({}),
      [b, T] = S.useState({ page: 1, rowsPerPage: 10, total: 0 });
    S.useEffect(() => {
      if (d) {
        const U = setTimeout(() => m(null), 3e3);
        return () => clearTimeout(U);
      }
    }, [d]),
      S.useEffect(() => {
        (async () => {
          try {
            const F = await Re.post(`${Oa}/api/master/campaigns_master`, {
              action: "list",
            });
            u(F.data.data.campaigns || []),
              T((ee) => ({
                ...ee,
                total: (F.data.data.campaigns || []).length,
              })),
              c(!1);
          } catch {
            m({ type: "error", text: "Failed to load data" }), c(!1);
          }
        })();
      }, []);
    const E = Math.max(1, Math.ceil(b.total / b.rowsPerPage)),
      k = s.slice((b.page - 1) * b.rowsPerPage, b.page * b.rowsPerPage),
      j = async (U) => {
        const F = !p[U];
        y((ee) => ({ ...ee, [U]: F })), F && (await R(U));
      },
      R = async (U) => {
        try {
          const F = await Re.post(`${Oa}/api/master/campaigns_master`, {
            action: "email_counts",
            campaign_id: U,
          });
          h((ee) => ({ ...ee, [U]: F.data.data }));
        } catch {
          m({ type: "error", text: "Failed to fetch email counts" });
        }
      },
      C = async (U) => {
        var F, ee;
        try {
          const ie = await Re.post(`${Oa}/api/master/campaigns_master`, {
            action: "start_campaign",
            campaign_id: U,
          });
          m({ type: "success", text: ie.data.message });
          const ue = await Re.post(`${Oa}/api/master/campaigns_master`, {
            action: "list",
          });
          u(ue.data.data.campaigns || []);
        } catch (ie) {
          m({
            type: "error",
            text:
              ((ee = (F = ie.response) == null ? void 0 : F.data) == null
                ? void 0
                : ee.error) || "Failed to start campaign",
          });
        }
      },
      q = async (U) => {
        var F, ee;
        try {
          const ie = await Re.post(`${Oa}/api/master/campaigns_master`, {
            action: "pause_campaign",
            campaign_id: U,
          });
          m({ type: "success", text: ie.data.message });
          const ue = await Re.post(`${Oa}/api/master/campaigns_master`, {
            action: "list",
          });
          u(ue.data.data.campaigns || []);
        } catch (ie) {
          m({
            type: "error",
            text:
              ((ee = (F = ie.response) == null ? void 0 : F.data) == null
                ? void 0
                : ee.error) || "Failed to pause campaign",
          });
        }
      },
      X = async (U) => {
        var F, ee;
        try {
          const ie = await Re.post(`${Oa}/api/master/campaigns_master`, {
            action: "retry_failed",
            campaign_id: U,
          });
          m({ type: "success", text: ie.data.message });
          const ue = await Re.post(`${Oa}/api/master/campaigns_master`, {
            action: "list",
          });
          u(ue.data.data.campaigns || []);
        } catch (ie) {
          m({
            type: "error",
            text:
              ((ee = (F = ie.response) == null ? void 0 : F.data) == null
                ? void 0
                : ee.error) || "Failed to retry failed emails",
          });
        }
      },
      M = ({ status: U }) => {
        const F = (U || "").toLowerCase(),
          ee = U || "Not started";
        return i.jsx("span", {
          className: `px-2 py-1 rounded text-xs font-semibold ${
            F === "running"
              ? "bg-blue-500 text-white"
              : F === "paused"
              ? "bg-gray-500 text-white"
              : F === "completed"
              ? "bg-green-500 text-white"
              : F === "failed"
              ? "bg-red-500 text-white"
              : "bg-yellow-500 text-white"
          }`,
          children: ee,
        });
      },
      J = ({ message: U, onClose: F }) =>
        U
          ? i.jsxs("div", {
              className: `fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded-xl shadow text-base font-semibold
        flex items-center gap-3
        ${
          U.type === "error"
            ? "bg-red-200/60 border border-red-400 text-red-800"
            : "bg-green-200/60 border border-green-400 text-green-800"
        }`,
              style: {
                minWidth: 250,
                maxWidth: 400,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              },
              role: "alert",
              children: [
                i.jsx("i", {
                  className: `fas text-lg ${
                    U.type === "error"
                      ? "fa-exclamation-circle text-red-500"
                      : "fa-check-circle text-green-500"
                  }`,
                }),
                i.jsx("span", { className: "flex-1", children: U.text }),
                i.jsx("button", {
                  onClick: F,
                  className:
                    "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
                  "aria-label": "Close",
                  children: i.jsx("i", { className: "fas fa-times" }),
                }),
              ],
            })
          : null;
    return o
      ? i.jsx("div", {
          className: "flex justify-center items-center h-screen",
          children: i.jsx("div", {
            className:
              "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500",
          }),
        })
      : i.jsx("div", {
          className: "bg-gray-100 min-h-screen mt-14",
          children: i.jsxs("div", {
            className: "container mx-auto px-2 sm:px-4 py-6 w-full max-w-7xl",
            children: [
              i.jsx(J, { message: d, onClose: () => m(null) }),
              i.jsx("div", {
                className: "grid grid-cols-1 gap-4 sm:gap-6",
                children: k.map((U) => {
                  var ee;
                  const F = g[U.campaign_id] || {};
                  return i.jsx(
                    "div",
                    {
                      className:
                        "bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg",
                      children: i.jsxs("div", {
                        className: "p-4 sm:p-6",
                        children: [
                          i.jsxs("div", {
                            className:
                              "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3",
                            children: [
                              i.jsxs("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                  i.jsx("h2", {
                                    className:
                                      "text-lg sm:text-xl font-semibold text-gray-800 mb-1 break-words",
                                    children: U.description,
                                  }),
                                  i.jsx("p", {
                                    className:
                                      "text-xs sm:text-sm text-gray-600 mb-2 break-words",
                                    children: U.mail_subject,
                                  }),
                                  i.jsxs("div", {
                                    className:
                                      "flex flex-wrap items-center gap-2 sm:gap-4",
                                    children: [
                                      i.jsxs("span", {
                                        className:
                                          "inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm font-medium",
                                        children: [
                                          i.jsx("i", {
                                            className: "fas fa-envelope mr-1",
                                          }),
                                          (ee = Number(U.valid_emails)) == null
                                            ? void 0
                                            : ee.toLocaleString(),
                                          " Emails",
                                        ],
                                      }),
                                      i.jsx(M, { status: U.campaign_status }),
                                    ],
                                  }),
                                ],
                              }),
                              i.jsxs("div", {
                                className:
                                  "flex flex-row flex-wrap gap-2 items-center mt-2 sm:mt-0",
                                children: [
                                  i.jsx("button", {
                                    onClick: () => j(U.campaign_id),
                                    className:
                                      "text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg",
                                    children: i.jsx("i", {
                                      className: `fas ${
                                        p[U.campaign_id]
                                          ? "fa-chevron-up"
                                          : "fa-chevron-down"
                                      } text-sm`,
                                    }),
                                  }),
                                  U.campaign_status === "running"
                                    ? i.jsxs("button", {
                                        onClick: () => q(U.campaign_id),
                                        className:
                                          "px-3 sm:px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-xs sm:text-sm font-medium",
                                        children: [
                                          i.jsx("i", {
                                            className: "fas fa-pause mr-1",
                                          }),
                                          " Pause",
                                        ],
                                      })
                                    : U.campaign_status === "completed"
                                    ? i.jsxs("span", {
                                        className:
                                          "px-3 sm:px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-xs sm:text-sm font-medium",
                                        children: [
                                          i.jsx("i", {
                                            className:
                                              "fas fa-check-circle mr-1",
                                          }),
                                          " Completed",
                                        ],
                                      })
                                    : i.jsxs("button", {
                                        onClick: () => C(U.campaign_id),
                                        className:
                                          "px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg text-xs sm:text-sm font-medium",
                                        children: [
                                          i.jsx("i", {
                                            className:
                                              "fas fa-paper-plane mr-1",
                                          }),
                                          " Send",
                                        ],
                                      }),
                                  U.failed_emails > 0 &&
                                    U.campaign_status !== "completed" &&
                                    i.jsxs("button", {
                                      onClick: () => X(U.campaign_id),
                                      className:
                                        "px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium",
                                      children: [
                                        i.jsx("i", {
                                          className: "fas fa-redo mr-1",
                                        }),
                                        " Retry Failed",
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          }),
                          p[U.campaign_id] &&
                            i.jsx("div", {
                              className: "mt-6",
                              children: i.jsxs("div", {
                                className: "space-y-3 mb-4",
                                children: [
                                  i.jsxs("div", {
                                    className: "flex flex-wrap gap-4",
                                    children: [
                                      i.jsxs("div", {
                                        className:
                                          "bg-gray-50 rounded-lg p-3 flex flex-col items-center min-w-[120px]",
                                        children: [
                                          i.jsx("span", {
                                            className: "text-xs text-gray-500",
                                            children: "Pending",
                                          }),
                                          i.jsx("span", {
                                            className:
                                              "font-bold text-lg text-blue-700",
                                            children:
                                              F.pending ||
                                              U.pending_emails ||
                                              0,
                                          }),
                                        ],
                                      }),
                                      i.jsxs("div", {
                                        className:
                                          "bg-gray-50 rounded-lg p-3 flex flex-col items-center min-w-[120px]",
                                        children: [
                                          i.jsx("span", {
                                            className: "text-xs text-gray-500",
                                            children: "Sent",
                                          }),
                                          i.jsx("span", {
                                            className:
                                              "font-bold text-lg text-green-700",
                                            children:
                                              F.sent || U.sent_emails || 0,
                                          }),
                                        ],
                                      }),
                                      i.jsxs("div", {
                                        className:
                                          "bg-gray-50 rounded-lg p-3 flex flex-col items-center min-w-[120px]",
                                        children: [
                                          i.jsx("span", {
                                            className: "text-xs text-gray-500",
                                            children: "Failed",
                                          }),
                                          i.jsx("span", {
                                            className:
                                              "font-bold text-lg text-red-700",
                                            children:
                                              F.failed || U.failed_emails || 0,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  i.jsxs("div", {
                                    className: "mt-4 text-xs text-gray-500",
                                    children: [
                                      "Started: ",
                                      U.start_time ? U.start_time : "N/A",
                                      i.jsx("br", {}),
                                      "Ended: ",
                                      U.end_time ? U.end_time : "N/A",
                                    ],
                                  }),
                                ],
                              }),
                            }),
                        ],
                      }),
                    },
                    U.campaign_id
                  );
                }),
              }),
              s.length > 0 &&
                i.jsxs("div", {
                  className:
                    "flex flex-col items-center justify-center mt-6 px-1 gap-2",
                  children: [
                    i.jsxs("div", {
                      className: "text-xs sm:text-sm text-gray-500 mb-2",
                      children: [
                        "Showing",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: (b.page - 1) * b.rowsPerPage + 1,
                        }),
                        " ",
                        "to",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: Math.min(b.page * b.rowsPerPage, b.total),
                        }),
                        " ",
                        "of ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: b.total,
                        }),
                        " ",
                        "campaigns",
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex flex-wrap items-center gap-2",
                      children: [
                        i.jsx("button", {
                          onClick: () => T((U) => ({ ...U, page: 1 })),
                          disabled: b.page === 1,
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M11 19l-7-7 7-7m8 14l-7-7 7-7",
                            }),
                          }),
                        }),
                        i.jsx("button", {
                          onClick: () => T((U) => ({ ...U, page: U.page - 1 })),
                          disabled: b.page === 1,
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M15 19l-7-7 7-7",
                            }),
                          }),
                        }),
                        i.jsxs("span", {
                          className:
                            "text-xs sm:text-sm font-medium text-gray-700",
                          children: ["Page ", b.page, " of ", E],
                        }),
                        i.jsx("button", {
                          onClick: () =>
                            T((U) => ({ ...U, page: Math.min(E, U.page + 1) })),
                          disabled: b.page >= E,
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M9 5l7 7-7 7",
                            }),
                          }),
                        }),
                        i.jsx("button", {
                          onClick: () => T((U) => ({ ...U, page: E })),
                          disabled: b.page >= E,
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M13 5l7 7-7 7M5 5l7 7-7 7",
                            }),
                          }),
                        }),
                        i.jsx("select", {
                          value: b.rowsPerPage,
                          onChange: (U) =>
                            T((F) => ({
                              ...F,
                              rowsPerPage: Number(U.target.value),
                              page: 1,
                            })),
                          className:
                            "border p-2 rounded-lg text-xs sm:text-sm bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          children: [10, 25, 50, 100].map((U) =>
                            i.jsx("option", { value: U, children: U }, U)
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
        });
  },
  Db = {
    pending: "bg-yellow-500",
    running: "bg-blue-600",
    paused: "bg-gray-500",
    completed: "bg-green-600",
    failed: "bg-red-600",
  },
  zb = 10,
  kb = () => {
    const [s, u] = S.useState([]),
      [o, c] = S.useState(!0),
      [d, m] = S.useState(null),
      p = S.useRef(!0),
      [y, g] = S.useState({ page: 1, rowsPerPage: zb, total: 0 }),
      h = async () => {
        p.current && c(!0);
        try {
          const k = await (
            await fetch(
              "http://localhost/Verify_email/backend/routes/api.php/api/monitor/campaigns"
            )
          ).json();
          u(Array.isArray(k) ? k : []),
            g((j) => ({ ...j, total: Array.isArray(k) ? k.length : 0 }));
        } catch {
          m({ type: "error", text: "Failed to load campaigns." });
        }
        c(!1), (p.current = !1);
      };
    S.useEffect(() => {
      h();
      const E = setInterval(h, 5e3);
      return () => clearInterval(E);
    }, []);
    const b = Math.ceil(y.total / y.rowsPerPage),
      T = s.slice((y.page - 1) * y.rowsPerPage, y.page * y.rowsPerPage);
    return (
      S.useEffect(() => {
        y.page > b && b > 0 && g((E) => ({ ...E, page: 1 }));
      }, [s, b]),
      i.jsxs("div", {
        className: "container mx-auto px-4 py-8 max-w-7xl",
        children: [
          i.jsxs("h1", {
            className:
              "text-2xl font-bold text-gray-800 mb-6 flex items-center",
            children: [
              i.jsx("i", { className: "fas fa-chart-line mr-2 text-blue-600" }),
              "Campaign Monitor",
            ],
          }),
          d &&
            i.jsxs("div", {
              className:
                "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-start",
              children: [
                i.jsx("div", {
                  className: "ml-3",
                  children: i.jsx("p", {
                    className: "text-sm font-medium",
                    children: d.text,
                  }),
                }),
                i.jsx("div", {
                  className: "ml-auto pl-3",
                  children: i.jsx("button", {
                    onClick: () => m(null),
                    className: "text-gray-500 hover:text-gray-700",
                    children: i.jsx("i", { className: "fas fa-times" }),
                  }),
                }),
              ],
            }),
          i.jsx("div", {
            className: "bg-white rounded-lg shadow overflow-hidden",
            children: i.jsx("div", {
              className: "overflow-x-auto",
              children: i.jsxs("table", {
                className: "min-w-full divide-y divide-gray-200",
                children: [
                  i.jsx("thead", {
                    className: "bg-gray-50",
                    children: i.jsxs("tr", {
                      children: [
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "ID",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Description",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Status",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Progress",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Emails",
                        }),
                      ],
                    }),
                  }),
                  i.jsx("tbody", {
                    className: "bg-white divide-y divide-gray-200",
                    children: o
                      ? i.jsx("tr", {
                          children: i.jsx("td", {
                            colSpan: 5,
                            className:
                              "px-6 py-4 text-center text-sm text-gray-500",
                            children: "Loading...",
                          }),
                        })
                      : T.length === 0
                      ? i.jsx("tr", {
                          children: i.jsx("td", {
                            colSpan: 5,
                            className:
                              "px-6 py-4 text-center text-sm text-gray-500",
                            children: "No campaigns found.",
                          }),
                        })
                      : T.map((E) => {
                          const k = Math.max(E.total_emails || 0, 1),
                            j = Math.min(E.sent_emails || 0, k),
                            R = Math.round((j / k) * 100),
                            C = (E.campaign_status || "pending").toLowerCase();
                          return i.jsxs(
                            "tr",
                            {
                              className: "hover:bg-gray-50",
                              children: [
                                i.jsx("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                  children: E.campaign_id,
                                }),
                                i.jsx("td", {
                                  className: "px-6 py-4",
                                  children: i.jsx("div", {
                                    className:
                                      "text-sm font-medium text-gray-900",
                                    children: E.description,
                                  }),
                                }),
                                i.jsx("td", {
                                  className: "px-6 py-4 whitespace-nowrap",
                                  children: i.jsx("span", {
                                    className: `status-badge px-2 py-1 rounded text-xs font-semibold ${
                                      Db[C] || "bg-gray-400"
                                    } text-white`,
                                    children:
                                      E.campaign_status || "Not started",
                                  }),
                                }),
                                i.jsxs("td", {
                                  className: "px-6 py-4 whitespace-nowrap",
                                  children: [
                                    i.jsx("div", {
                                      className:
                                        "progress-bar h-5 bg-gray-200 rounded",
                                      children: i.jsx("div", {
                                        className:
                                          "progress-fill bg-blue-600 h-5 rounded",
                                        style: { width: `${R}%` },
                                      }),
                                    }),
                                    i.jsxs("div", {
                                      className: "text-xs text-gray-500 mt-1",
                                      children: [
                                        R,
                                        "% (",
                                        E.sent_emails || 0,
                                        "/",
                                        E.total_emails || 0,
                                        ")",
                                      ],
                                    }),
                                  ],
                                }),
                                i.jsxs("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                  children: [
                                    i.jsxs("div", {
                                      children: [
                                        "Total: ",
                                        E.total_emails || 0,
                                      ],
                                    }),
                                    i.jsxs("div", {
                                      children: [
                                        "Pending: ",
                                        E.pending_emails || 0,
                                      ],
                                    }),
                                    i.jsxs("div", {
                                      children: ["Sent: ", E.sent_emails || 0],
                                    }),
                                    i.jsxs("div", {
                                      children: [
                                        "Failed: ",
                                        E.failed_emails || 0,
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            E.campaign_id
                          );
                        }),
                  }),
                ],
              }),
            }),
          }),
          y.total > 0 &&
            i.jsxs("div", {
              className:
                "flex flex-col items-center justify-center mt-6 px-1 gap-2",
              children: [
                i.jsx("div", {
                  className: "flex items-center gap-4 mb-2",
                  children: i.jsxs("div", {
                    className: "text-xs sm:text-sm text-gray-500",
                    children: [
                      "Showing",
                      " ",
                      i.jsx("span", {
                        className: "font-medium",
                        children: (y.page - 1) * y.rowsPerPage + 1,
                      }),
                      " ",
                      "to",
                      " ",
                      i.jsx("span", {
                        className: "font-medium",
                        children: Math.min(y.page * y.rowsPerPage, y.total),
                      }),
                      " ",
                      "of ",
                      i.jsx("span", {
                        className: "font-medium",
                        children: y.total,
                      }),
                      " ",
                      "campaigns",
                    ],
                  }),
                }),
                i.jsxs("div", {
                  className: "flex flex-wrap items-center gap-2",
                  children: [
                    i.jsx("button", {
                      onClick: () => g((E) => ({ ...E, page: 1 })),
                      disabled: y.page === 1,
                      className:
                        "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                      children: i.jsx("svg", {
                        className: "w-5 h-5 text-gray-500",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: i.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M11 19l-7-7 7-7m8 14l-7-7 7-7",
                        }),
                      }),
                    }),
                    i.jsx("button", {
                      onClick: () => g((E) => ({ ...E, page: E.page - 1 })),
                      disabled: y.page === 1,
                      className:
                        "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                      children: i.jsx("svg", {
                        className: "w-5 h-5 text-gray-500",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: i.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M15 19l-7-7 7-7",
                        }),
                      }),
                    }),
                    i.jsxs("span", {
                      className: "text-xs sm:text-sm font-medium text-gray-700",
                      children: ["Page ", y.page, " of ", b],
                    }),
                    i.jsx("button", {
                      onClick: () =>
                        g((E) => ({ ...E, page: Math.min(b, E.page + 1) })),
                      disabled: y.page >= b,
                      className:
                        "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                      children: i.jsx("svg", {
                        className: "w-5 h-5 text-gray-500",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: i.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M9 5l7 7-7 7",
                        }),
                      }),
                    }),
                    i.jsx("button", {
                      onClick: () => g((E) => ({ ...E, page: b })),
                      disabled: y.page >= b,
                      className:
                        "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                      children: i.jsx("svg", {
                        className: "w-5 h-5 text-gray-500",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: i.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M13 5l7 7-7 7M5 5l7 7-7 7",
                        }),
                      }),
                    }),
                    i.jsx("div", {
                      className: "flex items-center gap-1 ml-4",
                      children: i.jsx("select", {
                        id: "rowsPerPage",
                        value: y.rowsPerPage,
                        onChange: (E) => {
                          g((k) => ({
                            ...k,
                            rowsPerPage: Number(E.target.value),
                            page: 1,
                          }));
                        },
                        className:
                          "border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm",
                        children: [10, 25, 50, 100].map((E) =>
                          i.jsx("option", { value: E, children: E }, E)
                        ),
                      }),
                    }),
                  ],
                }),
              ],
            }),
        ],
      })
    );
  },
  dc = "http://localhost/Verify_email/backend/app",
  Ub = ({ servers: s, selectedServer: u, onSelectServer: o }) =>
    i.jsxs("div", {
      className: "w-1/5 bg-white border-r border-gray-200 flex flex-col",
      children: [
        i.jsx("div", {
          className: "p-4 border-b border-gray-200",
          children: i.jsx("h1", {
            className: "text-xl font-bold text-gray-800",
            children: "Mail Accounts",
          }),
        }),
        i.jsx("div", {
          className: "flex-1 overflow-y-auto",
          children: s.map((c) =>
            i.jsxs(
              "button",
              {
                onClick: () => o(c.id),
                className: `w-full text-left px-4 py-3 flex items-center transition-colors ${
                  u === c.id
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-500"
                    : "hover:bg-gray-100 text-gray-700"
                }`,
                children: [
                  i.jsx("div", {
                    className:
                      "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3",
                    children: i.jsx("span", {
                      className: "text-sm font-medium text-blue-600",
                      children: c.name
                        ? c.name.charAt(0).toUpperCase()
                        : c.email.charAt(0).toUpperCase(),
                    }),
                  }),
                  i.jsxs("div", {
                    children: [
                      i.jsx("div", {
                        className: "text-sm font-medium truncate",
                        children: c.name || c.email,
                      }),
                      i.jsx("div", {
                        className: "text-xs text-gray-500 truncate",
                        children: c.email,
                      }),
                    ],
                  }),
                ],
              },
              c.id
            )
          ),
        }),
      ],
    }),
  Lb = ({
    emails: s,
    loading: u,
    error: o,
    selectedEmail: c,
    onSelectEmail: d,
  }) =>
    i.jsxs("div", {
      className: "w-1/5 border-r border-gray-200 bg-white overflow-y-auto",
      children: [
        u &&
          i.jsxs("div", {
            className: "flex flex-col items-center justify-center h-64",
            children: [
              i.jsx("div", {
                className:
                  "w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin",
              }),
              i.jsx("p", {
                className: "mt-3 text-sm text-gray-500",
                children: "Loading emails...",
              }),
            ],
          }),
        o &&
          i.jsxs("div", {
            className: "p-4 bg-red-50 text-red-600 text-sm rounded m-4",
            children: [
              i.jsx("svg", {
                className: "w-4 h-4 inline mr-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: i.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0114 0z",
                }),
              }),
              o,
            ],
          }),
        !u &&
          !o &&
          s.length === 0 &&
          i.jsxs("div", {
            className:
              "flex flex-col items-center justify-center h-64 text-gray-400",
            children: [
              i.jsx("svg", {
                className: "w-12 h-12 mb-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: i.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1,
                  d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                }),
              }),
              i.jsx("p", { children: "No emails found" }),
            ],
          }),
        i.jsx("ul", {
          children: s.map((m) =>
            i.jsxs(
              "li",
              {
                onClick: () => d(m),
                className: `border-b border-gray-100 px-4 py-3 cursor-pointer transition-colors ${
                  (c == null ? void 0 : c.uid) === m.uid
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`,
                children: [
                  i.jsxs("div", {
                    className: "flex justify-between items-start mb-1",
                    children: [
                      i.jsx("span", {
                        className: "font-medium text-sm text-gray-900 truncate",
                        children: m.from_name || m.from_email,
                      }),
                      i.jsx("span", {
                        className:
                          "text-xs text-gray-500 whitespace-nowrap ml-2",
                        children: new Date(m.date_received).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        ),
                      }),
                    ],
                  }),
                  i.jsx("div", {
                    className:
                      "text-sm font-semibold text-gray-800 truncate mb-1",
                    children: m.subject || "(No Subject)",
                  }),
                  i.jsx("div", {
                    className: "text-xs text-gray-500 line-clamp-2",
                    children: i.jsx("span", {
                      dangerouslySetInnerHTML: {
                        __html: m.body
                          ? m.body.substring(0, 120) +
                            (m.body.length > 120 ? "..." : "")
                          : "",
                      },
                    }),
                  }),
                ],
              },
              m.uid || m.id
            )
          ),
        }),
      ],
    }),
  Bb = ({ email: s, onReply: u, replyStatus: o }) => {
    const [c, d] = S.useState(""),
      m = () => {
        u(c), d("");
      };
    return s
      ? i.jsxs("div", {
          className: "w-3/5 bg-white overflow-y-auto flex flex-col",
          children: [
            i.jsxs("div", {
              className: "border-b border-gray-200 px-6 py-4",
              children: [
                i.jsx("h1", {
                  className: "text-xl font-bold text-gray-900 mb-2",
                  children: s.subject,
                }),
                i.jsxs("div", {
                  className: "flex items-start",
                  children: [
                    i.jsx("div", {
                      className:
                        "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3",
                      children: i.jsx("span", {
                        className: "text-sm font-medium text-blue-600",
                        children: s.from_name
                          ? s.from_name.charAt(0).toUpperCase()
                          : s.from_email.charAt(0).toUpperCase(),
                      }),
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("div", {
                          className: "text-sm font-medium text-gray-900",
                          children: s.from_name || s.from_email,
                        }),
                        i.jsxs("div", {
                          className: "text-xs text-gray-500",
                          children: [
                            "to me",
                            i.jsx("span", { className: "mx-2", children: "•" }),
                            new Date(s.date_received).toLocaleString(),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            i.jsx("div", {
              className: "flex-1 px-6 py-4",
              children: i.jsx("div", {
                className: "prose max-w-none text-gray-800",
                style: { wordBreak: "break-word" },
                dangerouslySetInnerHTML: { __html: s.body },
              }),
            }),
            i.jsxs("div", {
              className: "border-t border-gray-200 px-6 py-4 bg-gray-50",
              children: [
                i.jsxs("div", {
                  className: "mb-4",
                  children: [
                    i.jsx("label", {
                      className: "block text-sm font-medium text-gray-700 mb-2",
                      children: "Reply",
                    }),
                    i.jsx("textarea", {
                      rows: 6,
                      className:
                        "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      placeholder: "Write your reply here...",
                      value: c,
                      onChange: (p) => d(p.target.value),
                    }),
                  ],
                }),
                i.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    i.jsxs("div", {
                      className: "flex items-center space-x-3",
                      children: [
                        i.jsx("button", {
                          onClick: m,
                          disabled: !c,
                          className:
                            "px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50",
                          children: "Send",
                        }),
                        o &&
                          i.jsx("span", {
                            className: `text-sm ${
                              o.includes("Failed")
                                ? "text-red-600"
                                : "text-green-600"
                            }`,
                            children: o,
                          }),
                      ],
                    }),
                    i.jsx("button", {
                      onClick: () => d(""),
                      className: "text-sm text-gray-500 hover:text-gray-700",
                      children: "Clear",
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      : i.jsx("div", {
          className: "w-3/5 flex items-center justify-center bg-gray-50",
          children: i.jsxs("div", {
            className: "text-center",
            children: [
              i.jsx("svg", {
                className: "w-16 h-16 mx-auto text-gray-300",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: i.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1,
                  d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                }),
              }),
              i.jsx("h3", {
                className: "mt-2 text-sm font-medium text-gray-900",
                children: "No email selected",
              }),
              i.jsx("p", {
                className: "mt-1 text-sm text-gray-500",
                children: "Select an email from the list to view its contents",
              }),
            ],
          }),
        });
  },
  Hb = () => {
    const [s, u] = S.useState([]),
      [o, c] = S.useState(null),
      [d, m] = S.useState([]),
      [p, y] = S.useState(null),
      [g, h] = S.useState(!1),
      [b, T] = S.useState(""),
      [E, k] = S.useState("");
    S.useEffect(() => {
      fetch(`${dc}/servers.php`)
        .then((R) => R.json())
        .then((R) => {
          u(R.servers || []),
            R.servers && R.servers.length > 0 && c(R.servers[0].id);
        })
        .catch(() => T("Failed to load servers"));
    }, []),
      S.useEffect(() => {
        o &&
          (h(!0),
          T(""),
          y(null),
          m([]),
          fetch(`${dc}/received_response.php?account_id=${o}`)
            .then((R) => R.json())
            .then((R) => {
              R.success
                ? m(R.emails || [])
                : (T(R.message || "Failed to fetch emails"), m([])),
                h(!1);
            })
            .catch(() => {
              T("Failed to fetch emails"), h(!1);
            }));
      }, [o]);
    const j = (R) => {
      const C = {
        account_id: o,
        to: p.from_email,
        subject: "Re: " + p.subject,
        body: R,
      };
      console.log("Sending reply payload:", C),
        k("Sending..."),
        fetch(`${dc}/reply.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(C),
        })
          .then((q) => q.json())
          .then((q) => {
            k(q.success ? "Reply sent!" : "Failed to send reply");
          })
          .catch(() => k("Failed to send reply"));
    };
    return i.jsxs("div", {
      className: "flex h-screen bg-gray-50 font-sans pt-16",
      children: [
        i.jsx(Ub, { servers: s, selectedServer: o, onSelectServer: c }),
        i.jsx(Lb, {
          emails: d,
          loading: g,
          error: b,
          selectedEmail: p,
          onSelectEmail: y,
        }),
        i.jsx(Bb, { email: p, onReply: j, replyStatus: E }),
      ],
    });
  },
  qb = "/backend/routes/api.php";
function Yb({ user: s, setUser: u }) {
  const o = Ci(),
    c = async () => {
      try {
        localStorage.removeItem("jwt_token"),
          await fetch(`${qb}?endpoint=logout`, {
            method: "POST",
            credentials: "include",
          }),
          u(null),
          (document.cookie =
            "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"),
          o("/auth");
      } catch (d) {
        console.error("Logout failed:", d);
      }
    };
  return i.jsx("nav", {
    className:
      "fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50",
    children: i.jsx("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      children: i.jsxs("div", {
        className: "flex items-center justify-between h-16",
        children: [
          i.jsxs("div", {
            className: "flex items-center gap-3",
            children: [
              i.jsx("i", {
                className: "fas fa-envelope text-blue-600 text-xl",
              }),
              i.jsx("span", {
                className: "text-xl font-semibold text-gray-900",
                children: "Email System",
              }),
            ],
          }),
          i.jsx("div", {
            className: s
              ? "flex justify-center flex-1"
              : "flex justify-end ml-auto",
            children: i.jsxs(yh, {
              to: "/",
              className: ({ isActive: d }) =>
                `px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 ${
                  d
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                }`,
              children: [
                i.jsx("i", { className: "fas fa-check-circle mr-2" }),
                "Verification",
              ],
            }),
          }),
          i.jsx("div", {
            className: "flex items-center gap-4",
            children: s
              ? i.jsxs("div", {
                  className: "flex items-center gap-4",
                  children: [
                    i.jsxs("div", {
                      className:
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 text-green-800 font-medium border border-green-200 shadow-sm",
                      children: [
                        i.jsx("i", {
                          className: "fas fa-user text-green-600 text-sm",
                        }),
                        i.jsx("span", {
                          className: "text-sm truncate max-w-[150px]",
                          children: s.name,
                        }),
                      ],
                    }),
                    i.jsxs("button", {
                      onClick: c,
                      className:
                        "flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg font-medium shadow-sm hover:bg-red-700 transition-colors duration-200",
                      children: [
                        i.jsx("i", { className: "fas fa-sign-out-alt" }),
                        "Logout",
                      ],
                    }),
                  ],
                })
              : null,
          }),
        ],
      }),
    }),
  });
}
const Vb = () => {
    const [s, u] = S.useState(0),
      [o, c] = S.useState(!1);
    return (
      S.useEffect(() => {
        let d = null;
        const m = async () => {
          try {
            const y = await (
              await fetch(
                "/backend/includes/progress.php"
              )
            ).json();
            y && typeof y.percent == "number" && y.total > 0 && y.percent < 100
              ? (u(y.percent), c(!0))
              : (c(!1), u(0));
          } catch {
            c(!1), u(0);
          }
        };
        return m(), (d = setInterval(m, 2e3)), () => clearInterval(d);
      }, []),
      o
        ? i.jsx("div", {
            className: "fixed top-0 left-0 w-full z-50",
            children: i.jsx("div", {
              className:
                "relative w-full h-1.5 bg-gray-300 overflow-hidden shadow",
              children: i.jsx("div", {
                className:
                  "absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-700 ease-in-out flex items-center",
                style: { width: `${s}%` },
                children: i.jsxs("span", {
                  className:
                    "absolute right-0 mr-2 text-[8.5px] font-bold text-white bg-opacity-90 px-1 py-0.5 rounded-full shadow",
                  style: {
                    transform: "translateY(-50%)",
                    top: "50%",
                    whiteSpace: "nowrap",
                  },
                  children: [s.toFixed(1), "%"],
                }),
              }),
            }),
          })
        : null
    );
  },
  bi = "http://localhost/Verify_email/backend/routes/api.php/api/workers",
  vi = { workername: "", ip: "" },
  fc = ({ status: s, onClose: u }) =>
    s &&
    i.jsxs("div", {
      className: `
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded-xl shadow text-base font-semibold
        flex items-center gap-3
        transition-all duration-300
        backdrop-blur-md
        ${
          s.type === "error"
            ? "bg-red-200/60 border border-red-400 text-red-800"
            : "bg-green-200/60 border border-green-400 text-green-800"
        }
      `,
      style: {
        minWidth: 250,
        maxWidth: 400,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
        background:
          s.type === "error"
            ? "rgba(255, 0, 0, 0.29)"
            : "rgba(0, 200, 83, 0.29)",
        borderRadius: "16px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      },
      role: "alert",
      children: [
        i.jsx("i", {
          className: `fas text-lg ${
            s.type === "error"
              ? "fa-exclamation-circle text-red-500"
              : "fa-check-circle text-green-500"
          }`,
        }),
        i.jsx("span", { className: "flex-1", children: s.message }),
        i.jsx("button", {
          onClick: u,
          className:
            "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
          "aria-label": "Close",
          children: i.jsx("i", { className: "fas fa-times" }),
        }),
      ],
    });
function lh(s) {
  const u =
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
    o = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return u.test(s) || o.test(s);
}
const Gb = () => {
    const [s, u] = S.useState([]),
      [o, c] = S.useState(!0),
      [d, m] = S.useState(!1),
      [p, y] = S.useState(!1),
      [g, h] = S.useState(vi),
      [b, T] = S.useState(null),
      [E, k] = S.useState(null),
      j = async () => {
        c(!0);
        try {
          const U = await (await fetch(bi)).json();
          Array.isArray(U) ? u(U) : Array.isArray(U.data) ? u(U.data) : u([]);
        } catch {
          k({ type: "error", message: "Failed to load workers." }), u([]);
        }
        c(!1);
      };
    S.useEffect(() => {
      j();
    }, []);
    const R = (J) => {
        const { name: U, value: F } = J.target;
        h((ee) => ({ ...ee, [U]: F }));
      },
      C = async (J) => {
        if ((J.preventDefault(), !lh(g.ip))) {
          k({ type: "error", message: "Invalid IP address format." });
          return;
        }
        try {
          const U = await fetch(bi, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(g),
            }),
            F = await U.json();
          U.ok || F.success
            ? (k({
                type: "success",
                message: F.message || "Worker added successfully!",
              }),
              m(!1),
              h(vi),
              j())
            : k({
                type: "error",
                message: F.error || F.message || "Failed to add worker.",
              });
        } catch {
          k({ type: "error", message: "Failed to add worker." });
        }
      },
      q = (J) => {
        T(J.id), h({ workername: J.workername, ip: J.ip }), y(!0);
      },
      X = async (J) => {
        if ((J.preventDefault(), !lh(g.ip))) {
          k({ type: "error", message: "Invalid IP address format." });
          return;
        }
        try {
          const U = await fetch(bi, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: b, ...g }),
            }),
            F = await U.json();
          U.ok || F.success
            ? (k({
                type: "success",
                message: F.message || "Worker updated successfully!",
              }),
              y(!1),
              h(vi),
              T(null),
              j())
            : k({
                type: "error",
                message: F.error || F.message || "Failed to update worker.",
              });
        } catch {
          k({ type: "error", message: "Failed to update worker." });
        }
      },
      M = async (J) => {
        if (window.confirm("Are you sure you want to delete this worker?"))
          try {
            const U = await fetch(bi, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: J }),
              }),
              F = await U.json();
            U.ok || F.success
              ? (k({
                  type: "success",
                  message: F.message || "Worker deleted successfully!",
                }),
                j())
              : k({
                  type: "error",
                  message: F.error || F.message || "Failed to delete worker.",
                });
          } catch {
            k({ type: "error", message: "Failed to delete worker." });
          }
      };
    return (
      S.useEffect(() => {
        if (E) {
          const J = setTimeout(() => k(null), 3e3);
          return () => clearTimeout(J);
        }
      }, [E]),
      i.jsxs("main", {
        className: "max-w-7xl mx-auto px-4 mt-14 sm:px-6 py-6",
        children: [
          i.jsx(fc, { status: E, onClose: () => k(null) }),
          i.jsxs("div", {
            className: "flex justify-between items-center mb-6",
            children: [
              i.jsxs("h1", {
                className: "text-2xl font-bold text-gray-900 flex items-center",
                children: [
                  i.jsx("i", { className: "fas fa-users mr-3 text-blue-600" }),
                  "Workers",
                ],
              }),
              i.jsxs("button", {
                onClick: () => {
                  h(vi), m(!0);
                },
                className:
                  "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                children: [
                  i.jsx("i", { className: "fas fa-plus mr-2" }),
                  " Add Worker",
                ],
              }),
            ],
          }),
          i.jsx("div", {
            className: "card overflow-hidden bg-white rounded-xl shadow",
            children: i.jsx("div", {
              className: "overflow-x-auto",
              children: i.jsxs("table", {
                className: "min-w-full divide-y divide-gray-200",
                children: [
                  i.jsx("thead", {
                    className: "bg-gray-50",
                    children: i.jsxs("tr", {
                      children: [
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "ID",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Worker Name",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "IP Address",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Actions",
                        }),
                      ],
                    }),
                  }),
                  i.jsx("tbody", {
                    className: "bg-white divide-y divide-gray-200",
                    children: o
                      ? i.jsx("tr", {
                          children: i.jsx("td", {
                            colSpan: 4,
                            className:
                              "px-6 py-4 text-center text-sm text-gray-500",
                            children: "Loading...",
                          }),
                        })
                      : s.length === 0
                      ? i.jsx("tr", {
                          children: i.jsx("td", {
                            colSpan: 4,
                            className:
                              "px-6 py-4 text-center text-sm text-gray-500",
                            children:
                              "No workers found. Add one to get started.",
                          }),
                        })
                      : s.map((J) =>
                          i.jsxs(
                            "tr",
                            {
                              children: [
                                i.jsx("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                  children: J.id,
                                }),
                                i.jsx("td", {
                                  className: "px-6 py-4 whitespace-nowrap",
                                  children: i.jsx("div", {
                                    className:
                                      "text-sm font-medium text-gray-900",
                                    children: J.workername,
                                  }),
                                }),
                                i.jsx("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                  children: J.ip,
                                }),
                                i.jsxs("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm font-medium",
                                  children: [
                                    i.jsx("button", {
                                      onClick: () => q(J),
                                      className:
                                        "text-blue-600 hover:text-blue-900 mr-3",
                                      title: "Edit",
                                      children: i.jsx("i", {
                                        className: "fas fa-edit mr-1",
                                      }),
                                    }),
                                    i.jsx("button", {
                                      onClick: () => M(J.id),
                                      className:
                                        "text-red-600 hover:text-red-900",
                                      title: "Delete",
                                      children: i.jsx("i", {
                                        className: "fas fa-trash mr-1",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            },
                            J.id
                          )
                        ),
                  }),
                ],
              }),
            }),
          }),
          d &&
            i.jsxs("div", {
              className:
                "fixed inset-0 bg-black/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-xl overflow-y-auto h-full w-full z-50 flex items-center justify-center",
              children: [
                i.jsx(fc, { status: E, onClose: () => k(null) }),
                i.jsxs("div", {
                  className:
                    "relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white",
                  children: [
                    i.jsxs("div", {
                      className: "flex justify-between items-center mb-4",
                      children: [
                        i.jsxs("h3", {
                          className: "text-lg font-medium text-gray-900",
                          children: [
                            i.jsx("i", {
                              className:
                                "fas fa-plus-circle mr-2 text-blue-600",
                            }),
                            "Add New Worker",
                          ],
                        }),
                        i.jsx("button", {
                          onClick: () => m(!1),
                          className: "text-gray-400 hover:text-gray-500",
                          children: i.jsx("i", { className: "fas fa-times" }),
                        }),
                      ],
                    }),
                    i.jsxs("form", {
                      className: "space-y-4",
                      onSubmit: C,
                      children: [
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-1",
                              children: "Worker Name",
                            }),
                            i.jsx("input", {
                              type: "text",
                              name: "workername",
                              required: !0,
                              maxLength: 50,
                              className:
                                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                              placeholder: "Enter worker name",
                              value: g.workername,
                              onChange: R,
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-1",
                              children: "IP Address",
                            }),
                            i.jsx("input", {
                              type: "text",
                              name: "ip",
                              required: !0,
                              maxLength: 39,
                              className:
                                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                              placeholder: "Enter IP address",
                              value: g.ip,
                              onChange: R,
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          className: "flex justify-end pt-4 space-x-3",
                          children: [
                            i.jsx("button", {
                              type: "button",
                              onClick: () => m(!1),
                              className:
                                "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                              children: "Cancel",
                            }),
                            i.jsxs("button", {
                              type: "submit",
                              className:
                                "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                              children: [
                                i.jsx("i", { className: "fas fa-save mr-2" }),
                                " Save Worker",
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          p &&
            i.jsxs("div", {
              className:
                "fixed inset-0 bg-black/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-xl overflow-y-auto h-full w-full z-50 flex items-center justify-center",
              children: [
                i.jsx(fc, { status: E, onClose: () => k(null) }),
                i.jsxs("div", {
                  className:
                    "relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white",
                  children: [
                    i.jsxs("div", {
                      className: "flex justify-between items-center mb-4",
                      children: [
                        i.jsxs("h3", {
                          className: "text-lg font-medium text-gray-900",
                          children: [
                            i.jsx("i", {
                              className: "fas fa-edit mr-2 text-blue-600",
                            }),
                            "Edit Worker",
                          ],
                        }),
                        i.jsx("button", {
                          onClick: () => y(!1),
                          className: "text-gray-400 hover:text-gray-500",
                          children: i.jsx("i", { className: "fas fa-times" }),
                        }),
                      ],
                    }),
                    i.jsxs("form", {
                      className: "space-y-4",
                      onSubmit: X,
                      children: [
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-1",
                              children: "Worker Name",
                            }),
                            i.jsx("input", {
                              type: "text",
                              name: "workername",
                              required: !0,
                              maxLength: 50,
                              className:
                                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                              placeholder: "Enter worker name",
                              value: g.workername,
                              onChange: R,
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", {
                              className:
                                "block text-sm font-medium text-gray-700 mb-1",
                              children: "IP Address",
                            }),
                            i.jsx("input", {
                              type: "text",
                              name: "ip",
                              required: !0,
                              maxLength: 39,
                              className:
                                "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                              placeholder: "Enter IP address",
                              value: g.ip,
                              onChange: R,
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          className: "flex justify-end pt-4 space-x-3",
                          children: [
                            i.jsx("button", {
                              type: "button",
                              onClick: () => y(!1),
                              className:
                                "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                              children: "Cancel",
                            }),
                            i.jsxs("button", {
                              type: "submit",
                              className:
                                "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                              children: [
                                i.jsx("i", { className: "fas fa-save mr-2" }),
                                " Update Worker",
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
        ],
      })
    );
  },
  mc = "/backend/routes/api.php",
  Xb = ({ setUser: s }) => {
    const [u, o] = S.useState("register"),
      [c, d] = S.useState({ email: "", password: "", name: "" }),
      [m, p] = S.useState(null),
      [y, g] = S.useState(!1),
      h = Ci(),
      b = (j) => {
        const { name: R, value: C } = j.target;
        d((q) => ({ ...q, [R]: C }));
      },
      T = async (j) => {
        if ((j.preventDefault(), p(null), !c.email || !c.password || !c.name)) {
          p({ type: "error", message: "All fields are required" });
          return;
        }
        g(!0);
        try {
          const C = await (
            await fetch(`${mc}?endpoint=register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(c),
            })
          ).json();
          C.status === "success"
            ? (p({
                type: "success",
                message: "Registration successful! Please login.",
              }),
              d({ email: "", password: "", name: "" }),
              o("login"))
            : p({ type: "error", message: C.message || "Registration failed" });
        } catch {
          p({ type: "error", message: "Network error" });
        } finally {
          g(!1);
        }
      },
      E = async (j) => {
        if ((j.preventDefault(), p(null), !c.email || !c.password)) {
          p({ type: "error", message: "All fields are required" });
          return;
        }
        g(!0);
        try {
          const C = await (
            await fetch(`${mc}?endpoint=login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(c),
            })
          ).json();
          if (C.status === "success") {
            const X = await (
              await fetch(`${mc}?endpoint=check-auth`, {
                credentials: "include",
              })
            ).json();
            X.status === "success" && s(X.user),
              p({ type: "success", message: "Login successful!" }),
              h("/");
          } else p({ type: "error", message: C.message || "Login failed" });
        } catch {
          p({ type: "error", message: "Network error" });
        } finally {
          g(!1);
        }
      },
      k = ({ status: j, onClose: R }) =>
        j &&
        i.jsxs("div", {
          className: `
          fixed top-6 left-1/2 transform -translate-x-1/2 z-50
          px-6 py-3 rounded-xl shadow text-base font-semibold
          flex items-center gap-3
          transition-all duration-300
          backdrop-blur-md
          ${
            j.type === "error"
              ? "bg-red-200/60 border border-red-400 text-red-800"
              : "bg-green-200/60 border border-green-400 text-green-800"
          }
        `,
          style: {
            minWidth: 250,
            maxWidth: 400,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
            background:
              j.type === "error"
                ? "rgba(255, 0, 0, 0.29)"
                : "rgba(0, 200, 83, 0.29)",
            borderRadius: "16px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          },
          role: "alert",
          children: [
            i.jsx("i", {
              className: `fas text-lg ${
                j.type === "error"
                  ? "fa-exclamation-circle text-red-500"
                  : "fa-check-circle text-green-500"
              }`,
            }),
            i.jsx("span", { className: "flex-1", children: j.message }),
            i.jsx("button", {
              onClick: R,
              className:
                "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
              "aria-label": "Close",
              children: i.jsx("i", { className: "fas fa-times" }),
            }),
          ],
        });
    return i.jsxs("div", {
      className: "container mx-auto px-4 py-8 max-w-md",
      children: [
        i.jsx(k, { status: m, onClose: () => p(null) }),
        i.jsxs("div", {
          className:
            "bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-12",
          children: [
            i.jsxs("div", {
              className: "flex items-center mb-6",
              children: [
                i.jsx("div", {
                  className: "bg-blue-100 p-2 rounded-lg mr-4",
                  children: i.jsx("svg", {
                    className: "w-6 h-6 text-blue-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: i.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z",
                    }),
                  }),
                }),
                i.jsx("h2", {
                  className: "text-xl font-semibold text-gray-800",
                  children: u === "register" ? "Register" : "Login",
                }),
              ],
            }),
            u === "register"
              ? i.jsxs("form", {
                  onSubmit: T,
                  className: "space-y-6",
                  children: [
                    i.jsxs("div", {
                      children: [
                        i.jsxs("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-2",
                          children: [
                            "Name ",
                            i.jsx("span", {
                              className: "text-red-500 ml-1",
                              children: "*",
                            }),
                          ],
                        }),
                        i.jsx("input", {
                          type: "text",
                          name: "name",
                          value: c.name,
                          onChange: b,
                          className:
                            "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          placeholder: "Your Name",
                          required: !0,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsxs("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-2",
                          children: [
                            "Email ",
                            i.jsx("span", {
                              className: "text-red-500 ml-1",
                              children: "*",
                            }),
                          ],
                        }),
                        i.jsx("input", {
                          type: "email",
                          name: "email",
                          value: c.email,
                          onChange: b,
                          className:
                            "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          placeholder: "you@example.com",
                          required: !0,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsxs("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-2",
                          children: [
                            "Password ",
                            i.jsx("span", {
                              className: "text-red-500 ml-1",
                              children: "*",
                            }),
                          ],
                        }),
                        i.jsx("input", {
                          type: "password",
                          name: "password",
                          value: c.password,
                          onChange: b,
                          className:
                            "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          placeholder: "••••••••",
                          required: !0,
                        }),
                      ],
                    }),
                    i.jsx("div", {
                      className: "flex justify-center",
                      children: i.jsx("button", {
                        type: "submit",
                        disabled: y,
                        className:
                          "px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-70",
                        children: y
                          ? i.jsxs(i.Fragment, {
                              children: [
                                i.jsxs("svg", {
                                  className:
                                    "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  children: [
                                    i.jsx("circle", {
                                      className: "opacity-25",
                                      cx: "12",
                                      cy: "12",
                                      r: "10",
                                      stroke: "currentColor",
                                      strokeWidth: "4",
                                    }),
                                    i.jsx("path", {
                                      className: "opacity-75",
                                      fill: "currentColor",
                                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                    }),
                                  ],
                                }),
                                "Processing...",
                              ],
                            })
                          : i.jsx(i.Fragment, { children: "Register" }),
                      }),
                    }),
                    i.jsxs("div", {
                      className: "mt-6 text-center",
                      children: [
                        " Already have an account?",
                        " ",
                        i.jsx("button", {
                          className:
                            "text-blue-600 hover:underline focus:outline-none",
                          type: "button",
                          onClick: () => {
                            o("login"),
                              p(null),
                              d({ email: "", password: "", name: "" });
                          },
                          children: "Login",
                        }),
                      ],
                    }),
                  ],
                })
              : i.jsxs("form", {
                  onSubmit: E,
                  className: "space-y-6",
                  children: [
                    i.jsxs("div", {
                      children: [
                        i.jsxs("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-2",
                          children: [
                            "Email ",
                            i.jsx("span", {
                              className: "text-red-500 ml-1",
                              children: "*",
                            }),
                          ],
                        }),
                        i.jsx("input", {
                          type: "email",
                          name: "email",
                          value: c.email,
                          onChange: b,
                          className:
                            "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          placeholder: "you@example.com",
                          required: !0,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsxs("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-2",
                          children: [
                            "Password ",
                            i.jsx("span", {
                              className: "text-red-500 ml-1",
                              children: "*",
                            }),
                          ],
                        }),
                        i.jsx("input", {
                          type: "password",
                          name: "password",
                          value: c.password,
                          onChange: b,
                          className:
                            "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          placeholder: "••••••••",
                          required: !0,
                        }),
                      ],
                    }),
                    i.jsx("div", {
                      className: "flex justify-center",
                      children: i.jsx("button", {
                        type: "submit",
                        disabled: y,
                        className:
                          "px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-70",
                        children: y
                          ? i.jsxs(i.Fragment, {
                              children: [
                                i.jsxs("svg", {
                                  className:
                                    "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  children: [
                                    i.jsx("circle", {
                                      className: "opacity-25",
                                      cx: "12",
                                      cy: "12",
                                      r: "10",
                                      stroke: "currentColor",
                                      strokeWidth: "4",
                                    }),
                                    i.jsx("path", {
                                      className: "opacity-75",
                                      fill: "currentColor",
                                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                    }),
                                  ],
                                }),
                                "Processing...",
                              ],
                            })
                          : i.jsx(i.Fragment, { children: "Login" }),
                      }),
                    }),
                    i.jsxs("div", {
                      className: "mt-6 text-center",
                      children: [
                        "Don't have an account?",
                        " ",
                        i.jsx("button", {
                          className:
                            "text-blue-600 hover:underline focus:outline-none",
                          type: "button",
                          onClick: () => {
                            o("register"),
                              p(null),
                              d({ email: "", password: "", name: "" });
                          },
                          children: "Register",
                        }),
                      ],
                    }),
                  ],
                }),
          ],
        }),
      ],
    });
  },
  Qb = "/backend/routes/api.php";
function Pa({ children: s }) {
  const [u, o] = S.useState(null);
  return (
    S.useEffect(() => {
      (async () => {
        try {
          const m = await (
            await fetch(`${Qb}?endpoint=check-auth`, { credentials: "include" })
          ).json();
          o(m.status === "success");
        } catch {
          o(!1);
        }
      })();
    }, []),
    u === null
      ? i.jsx("div", { children: "Loading..." })
      : u
      ? s
      : i.jsx(hg, { to: "/auth", replace: !0 })
  );
}
const Zb = "/backend/routes/api.php";
function Kb() {
  const [s, u] = S.useState(null);
  return (
    S.useEffect(() => {
      (async () => {
        try {
          const d = await (
            await fetch(`${Zb}?endpoint=check-auth`, { credentials: "include" })
          ).json();
          d.status === "success" ? u(d.user) : u(null);
        } catch {
          u(null);
        }
      })();
    }, []),
    i.jsxs(qg, {
      children: [
        i.jsx(Yb, { user: s, setUser: u }),
        i.jsx(Vb, {}),
        i.jsxs(pg, {
          children: [
            i.jsx(la, { path: "/auth", element: i.jsx(Xb, { setUser: u }) }),
            i.jsx(la, {
              path: "/",
              element: i.jsx(Pa, { children: i.jsx(Pg, {}) }),
            }),
            i.jsx(la, {
              path: "/smtp",
              element: i.jsx(Pa, { children: i.jsx(Ig, {}) }),
            }),
            i.jsx(la, {
              path: "/campaigns",
              element: i.jsx(Pa, { children: i.jsx(ty, {}) }),
            }),
            i.jsx(la, {
              path: "/master",
              element: i.jsx(Pa, { children: i.jsx(Mb, {}) }),
            }),
            i.jsx(la, {
              path: "/monitor/email-sent",
              element: i.jsx(Pa, { children: i.jsx(kb, {}) }),
            }),
            i.jsx(la, {
              path: "/monitor/received-response",
              element: i.jsx(Pa, { children: i.jsx(Hb, {}) }),
            }),
            i.jsx(la, {
              path: "/workers",
              element: i.jsx(Pa, { children: i.jsx(Gb, {}) }),
            }),
          ],
        }),
      ],
    })
  );
}
Sp.createRoot(document.getElementById("root")).render(i.jsx(Kb, {}));
