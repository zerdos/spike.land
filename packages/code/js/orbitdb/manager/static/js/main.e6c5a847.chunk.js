(this["webpackJsonporbit-db-control-center"] =
  this["webpackJsonporbit-db-control-center"] || []).push([[0], {
    1017: function (e, a) {},
    1084: function (e, a) {},
    1112: function (e, a) {},
    1114: function (e, a) {},
    1143: function (e, a) {},
    1318: function (e, a) {},
    1320: function (e, a) {},
    1328: function (e, a) {},
    1330: function (e, a) {},
    1381: function (e, a) {},
    1394: function (e, a) {},
    1396: function (e, a) {},
    1442: function (e, a) {},
    1597: function (e, a, t) {
      "use strict";
      t.r(a);
      var n,
        r,
        c = t(1),
        o = t.n(c),
        l = t(123),
        i = t.n(l),
        u = t(122),
        s = (t(611), t(73)),
        d = t(335),
        m = t(103),
        p = Object(c.createContext)(),
        f = function (e) {
          var a = e.reducer, t = e.initialState, n = e.children;
          return o.a.createElement(p.Provider, {
            value: Object(c.useReducer)(a, t),
          }, n);
        },
        g = function () {
          return Object(c.useContext)(p);
        },
        E = {
          DB: {
            OPEN_CREATEDB_DIALOG: "OPEN_CREATEDB_DIALOG",
            CLOSE_CREATEDB_DIALOG: "CLOSE_CREATEDB_DIALOG",
            OPEN_ADDDB_DIALOG: "OPEN_ADDDB_DIALOG",
            CLOSE_ADDDB_DIALOG: "CLOSE_ADDDB_DIALOG",
            SET_DB: "SET_DB",
          },
          SYSTEMS: { SET_IPFS: "SET_IPFS", SET_ORBITDB: "SET_ORBITDB" },
          PROGRAMS: {
            SET_PROGRAMS: "SET_PROGRAMS",
            SET_PROGRAMS_LOADING: "SET_PROGRAMS_LOADING",
            SET_PROGRAM: "SET_PROGRAM",
            SET_PROGRAM_LOADING: "SET_PROGRAM_LOADING",
          },
        },
        b = "loading",
        O = t(0),
        v = t.n(O),
        y = t(30),
        h = t(1611),
        D = t(1612),
        S = t(71),
        x = t(1613),
        j = t(180),
        w = t(592),
        A = t.n(w),
        R = t(594),
        B = t.n(R),
        T = {
          ipfs: {
            preload: { enabled: !1 },
            config: {
              Addresses: {
                Swarm: [
                  "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
                  "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
                  "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
                ],
              },
            },
          },
        },
        _ = function () {
          return v.a.async(function (e) {
            for (;;) {
              switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, v.a.awrap(A.a.create(T.ipfs));
                case 2:
                  return e.abrupt("return", e.sent);
                case 3:
                case "end":
                  return e.stop();
              }
            }
          });
        },
        C = function (e) {
          return v.a.async(function (a) {
            for (;;) {
              switch (a.prev = a.next) {
                case 0:
                  return a.next = 2, v.a.awrap(B.a.createInstance(e));
                case 2:
                  return n = a.sent, a.abrupt("return", n);
                case 4:
                case "end":
                  return a.stop();
              }
            }
          });
        },
        G = function () {
          return v.a.async(function (e) {
            for (;;) {
              switch (e.prev = e.next) {
                case 0:
                  if (r || !n) {
                    e.next = 6;
                    break;
                  }
                  return e.next = 3,
                    v.a.awrap(
                      n.feed("network.programs", {
                        accessController: { write: [n.identity.id] },
                        create: !0,
                      }),
                    );
                case 3:
                  return r = e.sent, e.next = 6, v.a.awrap(r.load());
                case 6:
                  return e.abrupt(
                    "return",
                    r ? r.iterator({ limit: -1 }).collect() : [],
                  );
                case 7:
                case "end":
                  return e.stop();
              }
            }
          });
        },
        L = function (e) {
          var a;
          return v.a.async(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  if (!n) {
                    t.next = 6;
                    break;
                  }
                  return t.next = 3, v.a.awrap(n.open(e));
                case 3:
                  return a = t.sent, t.next = 6, v.a.awrap(a.load());
                case 6:
                  return t.abrupt("return", a);
                case 7:
                case "end":
                  return t.stop();
              }
            }
          });
        },
        P = function (e) {
          var a;
          return v.a.async(function (t) {
            for (;;) {
              switch (t.prev = t.next) {
                case 0:
                  return t.next = 2, v.a.awrap(n.open(e));
                case 2:
                  return a = t.sent,
                    t.abrupt(
                      "return",
                      r.add({
                        name: a.dbname,
                        type: a.type,
                        address: e,
                        added: Date.now(),
                      }),
                    );
                case 4:
                case "end":
                  return t.stop();
              }
            }
          });
        },
        k = function (e, a, t) {
          var c, o;
          return v.a.async(function (l) {
            for (;;) {
              switch (l.prev = l.next) {
                case 0:
                  l.t0 = t, l.next = "public" === l.t0 ? 3 : 5;
                  break;
                case 3:
                  return c = { write: ["*"] }, l.abrupt("break", 7);
                case 5:
                  return c = { write: [n.identity.id] }, l.abrupt("break", 7);
                case 7:
                  return l.next = 9,
                    v.a.awrap(n.create(e, a, { accessController: c }));
                case 9:
                  return o = l.sent,
                    l.abrupt(
                      "return",
                      r.add({
                        name: e,
                        type: a,
                        address: o.address.toString(),
                        added: Date.now(),
                      }),
                    );
                case 11:
                case "end":
                  return l.stop();
              }
            }
          });
        },
        I = function (e) {
          return v.a.async(function (a) {
            for (;;) {
              switch (a.prev = a.next) {
                case 0:
                  return a.abrupt("return", r.remove(e));
                case 1:
                case "end":
                  return a.stop();
              }
            }
          });
        };
      var M = function () {
          var e = g(), a = Object(y.a)(e, 2), t = a[0], n = a[1];
          return o.a.useEffect(function () {
            n({ type: E.PROGRAMS.SET_PROGRAMS_LOADING, loading: !0 }),
              _().then(function (e) {
                return v.a.async(function (a) {
                  for (;;) {
                    switch (a.prev = a.next) {
                      case 0:
                        n({ type: E.SYSTEMS.SET_IPFS, ipfsStatus: "Started" }),
                          C(e).then(function (e) {
                            var a;
                            return v.a.async(function (e) {
                              for (;;) {
                                switch (e.prev = e.next) {
                                  case 0:
                                    return n({
                                      type: E.SYSTEMS.SET_ORBITDB,
                                      orbitdbStatus: "Started",
                                    }),
                                      e.next = 3,
                                      v.a.awrap(G());
                                  case 3:
                                    a = e.sent,
                                      n({
                                        type: E.PROGRAMS.SET_PROGRAMS,
                                        programs: a.reverse(),
                                      }),
                                      n({
                                        type: E.PROGRAMS.SET_PROGRAMS_LOADING,
                                        loading: !1,
                                      });
                                  case 6:
                                  case "end":
                                    return e.stop();
                                }
                              }
                            });
                          });
                      case 2:
                      case "end":
                        return a.stop();
                    }
                  }
                });
              });
          }, [n]),
            o.a.createElement(
              d.a,
              { background: "white", elevation: 1 },
              o.a.createElement(
                d.a,
                {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  paddingX: Object(h.a)(6),
                  paddingY: Object(h.a)(1),
                },
                o.a.createElement(
                  D.a,
                  {
                    href: "#/",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "row",
                  },
                  o.a.createElement(S.a, {
                    fontWeight: "600",
                    marginRight: Object(x.a)(1),
                  }, "Systems:"),
                  o.a.createElement(
                    d.a,
                    {
                      display: "flex",
                      alignItems: "center",
                      marginX: Object(x.a)(1),
                    },
                    "Started" === t.ipfsStatus
                      ? o.a.createElement(j.a, {
                        size: 6,
                        icon: "full-circle",
                        color: "success",
                      })
                      : o.a.createElement(j.a, {
                        size: 6,
                        icon: "full-circle",
                        color: "warning",
                      }),
                    o.a.createElement(
                      S.a,
                      { paddingLeft: Object(x.a)(2) },
                      "IPFS",
                    ),
                  ),
                  o.a.createElement(
                    d.a,
                    {
                      display: "flex",
                      alignItems: "center",
                      marginX: Object(h.a)(1),
                    },
                    "Started" === t.orbitdbStatus
                      ? o.a.createElement(j.a, {
                        size: 6,
                        icon: "full-circle",
                        color: "success",
                      })
                      : o.a.createElement(j.a, {
                        size: 6,
                        icon: "full-circle",
                        color: "warning",
                      }),
                    o.a.createElement(
                      S.a,
                      { paddingLeft: Object(x.a)(2) },
                      "OrbitDB",
                    ),
                  ),
                ),
              ),
            );
        },
        N = t(1614),
        X = t(1615);
      var z = function () {
          var e = Object(m.g)();
          return o.a.createElement(
            d.a,
            { background: "white", elevation: 1 },
            o.a.createElement(
              d.a,
              {
                className: "row-wrap",
                display: "flex",
                borderBottom: "default",
              },
              o.a.createElement(
                d.a,
                { className: "align title", display: "flex", flex: "1 1 60%" },
                o.a.createElement(
                  D.a,
                  {
                    href: "#/",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  o.a.createElement("img", {
                    src: "Orbit_round-02.png",
                    width: Object(h.a)(5),
                  }),
                  o.a.createElement(N.a, {
                    size: 800,
                    fontFamily: "Titillium Web",
                    marginX: Object(h.a)(2),
                  }, "CONTROL CENTER"),
                ),
              ),
              o.a.createElement(
                d.a,
                {
                  className: "align search",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                o.a.createElement(X.a, {
                  width: "100%",
                  flex: "1 1 100%",
                  placeholder: "Search...",
                  height: 24,
                  onKeyUp: function (a) {
                    13 === a.keyCode &&
                      e.push("/search?q=".concat(a.target.value));
                  },
                }),
              ),
            ),
          );
        },
        F = t(1599),
        Y = t(1616),
        W = t(1617),
        H = t(600),
        V = t(597);
      var q = function () {
        var e = g(),
          a = Object(y.a)(e, 2),
          t = a[0],
          n = a[1],
          r = o.a.useState(""),
          c = Object(y.a)(r, 2),
          l = c[0],
          i = c[1],
          u = function () {
            var e, a;
            return v.a.async(function (r) {
              for (;;) {
                switch (r.prev = r.next) {
                  case 0:
                    if ("eventlog" === (e = t.db).type) {
                      r.next = 3;
                      break;
                    }
                    throw new Error(
                      "This component can only handle Log databases",
                    );
                  case 3:
                    return r.next = 5, v.a.awrap(e.add(l));
                  case 5:
                    return r.next = 7,
                      v.a.awrap(e.iterator({ limit: 10 }).collect().reverse());
                  case 7:
                    a = r.sent, n({ type: E.DB.SET_DB, db: e, entries: a });
                  case 9:
                  case "end":
                    return r.stop();
                }
              }
            });
          };
        return o.a.createElement(
          d.a,
          { flex: "1" },
          o.a.createElement(
            N.a,
            { marginBottom: Object(h.a)(1) },
            "Add an event to the log",
          ),
          o.a.createElement(H.a, {
            onChange: function (e) {
              i(e.target.value);
            },
            name: "value",
            placeholder: "Value",
            height: 24,
            width: "30%",
          }),
          o.a.createElement(V.a, {
            iconBefore: "plus",
            appearance: "default",
            height: 24,
            marginLeft: Object(h.a)(1),
            onClick: function (e) {
              e && e.preventDefault(), 0 !== l.length && u();
            },
          }, "Add"),
        );
      };
      var J = function () {
        var e = g(),
          a = Object(y.a)(e, 2),
          t = a[0],
          n = a[1],
          r = o.a.useState(""),
          c = Object(y.a)(r, 2),
          l = c[0],
          i = c[1],
          u = function () {
            var e, a;
            return v.a.async(function (r) {
              for (;;) {
                switch (r.prev = r.next) {
                  case 0:
                    if ("feed" === (e = t.db).type) {
                      r.next = 3;
                      break;
                    }
                    throw new Error(
                      "This component can only handle Feed databases",
                    );
                  case 3:
                    return r.next = 5, v.a.awrap(e.add(l));
                  case 5:
                    return r.next = 7,
                      v.a.awrap(e.iterator({ limit: 10 }).collect().reverse());
                  case 7:
                    a = r.sent, n({ type: E.DB.SET_DB, db: e, entries: a });
                  case 9:
                  case "end":
                    return r.stop();
                }
              }
            });
          };
        return o.a.createElement(
          d.a,
          { flex: "1" },
          o.a.createElement(
            N.a,
            { marginBottom: Object(h.a)(1) },
            "Add an entry to the feed",
          ),
          o.a.createElement(H.a, {
            onChange: function (e) {
              i(e.target.value);
            },
            name: "value",
            placeholder: "Data",
            height: 24,
            width: "30%",
          }),
          o.a.createElement(V.a, {
            iconBefore: "plus",
            appearance: "default",
            height: 24,
            marginLeft: Object(h.a)(1),
            onClick: function (e) {
              e && e.preventDefault(), 0 !== l.length && u();
            },
          }, "Add"),
        );
      };
      var K = function () {
        var e = g(),
          a = Object(y.a)(e, 2),
          t = a[0],
          n = a[1],
          r = Object(c.useState)(""),
          l = Object(y.a)(r, 2),
          i = l[0],
          u = l[1],
          s = Object(c.useState)(""),
          m = Object(y.a)(s, 2),
          p = m[0],
          f = m[1],
          b = function () {
            var e, a;
            return v.a.async(function (r) {
              for (;;) {
                switch (r.prev = r.next) {
                  case 0:
                    if ("keyvalue" === (e = t.db).type) {
                      r.next = 3;
                      break;
                    }
                    throw new Error(
                      "This component can only handle Key-Value databases",
                    );
                  case 3:
                    return r.next = 5, v.a.awrap(e.set(i, p));
                  case 5:
                    a = Object.keys(e.all).map(function (a) {
                      return {
                        payload: { value: { key: a, value: e.get(a) } },
                      };
                    }), n({ type: E.DB.SET_DB, db: e, entries: a });
                  case 7:
                  case "end":
                    return r.stop();
                }
              }
            });
          };
        return o.a.createElement(
          d.a,
          { flex: "1" },
          o.a.createElement(
            N.a,
            { marginBottom: Object(h.a)(1) },
            "Set a value for a key",
          ),
          o.a.createElement(H.a, {
            onChange: function (e) {
              u(e.target.value);
            },
            name: "key",
            placeholder: "key",
            height: 24,
            width: "20%",
          }),
          o.a.createElement(H.a, {
            onChange: function (e) {
              f(e.target.value);
            },
            name: "value",
            placeholder: "value",
            height: 24,
            width: "20%",
            marginLeft: Object(h.a)(1),
          }),
          o.a.createElement(V.a, {
            iconBefore: "plus",
            appearance: "default",
            height: 24,
            marginLeft: Object(h.a)(1),
            onClick: function (e) {
              e && e.preventDefault(), 0 !== p.length && 0 !== i.length && b();
            },
          }, "Set"),
        );
      };
      var U = function () {
        var e = g(),
          a = Object(y.a)(e, 2),
          t = a[0],
          n = a[1],
          r = Object(c.useState)(""),
          l = Object(y.a)(r, 2),
          i = l[0],
          u = l[1],
          s = Object(c.useState)(""),
          m = Object(y.a)(s, 2),
          p = m[0],
          f = m[1],
          b = function () {
            var e, a;
            return v.a.async(function (r) {
              for (;;) {
                switch (r.prev = r.next) {
                  case 0:
                    if ("docstore" === (e = t.db).type) {
                      r.next = 3;
                      break;
                    }
                    throw new Error(
                      "This component can only handle Document databases",
                    );
                  case 3:
                    return r.next = 5, v.a.awrap(e.put({ _id: i, value: p }));
                  case 5:
                    a = e.query(function (e) {
                      return null !== e;
                    }, { fullOp: !0 }).reverse(),
                      n({ type: E.DB.SET_DB, db: e, entries: a });
                  case 7:
                  case "end":
                    return r.stop();
                }
              }
            });
          };
        return o.a.createElement(
          d.a,
          { flex: "1" },
          o.a.createElement(
            N.a,
            { marginBottom: Object(h.a)(1) },
            "Add a document to the database",
          ),
          o.a.createElement(H.a, {
            onChange: function (e) {
              u(e.target.value);
            },
            name: "key",
            placeholder: "_id",
            height: 24,
            width: "20%",
          }),
          o.a.createElement(H.a, {
            onChange: function (e) {
              f(e.target.value);
            },
            name: "value",
            placeholder: "document",
            height: 24,
            width: "20%",
            marginLeft: Object(h.a)(1),
          }),
          o.a.createElement(V.a, {
            iconBefore: "plus",
            appearance: "default",
            height: 24,
            marginLeft: Object(h.a)(1),
            onClick: function (e) {
              e && e.preventDefault(), 0 !== p.length && 0 !== i.length && b();
            },
          }, "Put"),
        );
      };
      var $ = function () {
          var e = g(),
            a = Object(y.a)(e, 2),
            t = a[0],
            n = a[1],
            r = Object(c.useState)(1),
            l = Object(y.a)(r, 2),
            i = l[0],
            u = l[1],
            s = function () {
              var e, a, r;
              return v.a.async(function (c) {
                for (;;) {
                  switch (c.prev = c.next) {
                    case 0:
                      if ("counter" === (e = t.db).type) {
                        c.next = 3;
                        break;
                      }
                      throw new Error(
                        "This component can only handle Counter databases",
                      );
                    case 3:
                      if (!((a = parseInt(i) || 0) > 0)) {
                        c.next = 7;
                        break;
                      }
                      return c.next = 7, v.a.awrap(e.inc(a));
                    case 7:
                      r = [{ payload: { value: e.value } }],
                        n({ type: E.DB.SET_DB, db: e, entries: r });
                    case 9:
                    case "end":
                      return c.stop();
                  }
                }
              });
            };
          return o.a.createElement(
            d.a,
            { flex: "1" },
            o.a.createElement(
              N.a,
              { marginBottom: Object(h.a)(1) },
              "Increment the value of the counter",
            ),
            o.a.createElement(H.a, {
              onChange: function (e) {
                u(e.target.value);
              },
              name: "value",
              defaultValue: 1,
              placeholder: "amount",
              height: 24,
              width: "10%",
            }),
            o.a.createElement(V.a, {
              iconBefore: "plus",
              appearance: "default",
              height: 24,
              marginLeft: Object(h.a)(1),
              onClick: function (e) {
                e && e.preventDefault(), 0 !== i.length && s();
              },
            }, "Increment"),
          );
        },
        Q = {
          eventlog: "#47B881",
          feed: "#14B5D0",
          keyvalue: "#1070CA",
          docstore: "#D9822B",
          counter: "#735DD0",
        };
      var Z = function () {
          var e = Object(m.i)(),
            a = e.programName,
            t = e.dbName,
            n = g(),
            r = Object(y.a)(n, 2),
            l = r[0],
            i = r[1],
            u = Object(m.g)(),
            s = o.a.useState(null),
            p = Object(y.a)(s, 2),
            f = p[0],
            b = p[1],
            O = o.a.useState(!1),
            D = Object(y.a)(O, 2),
            x = D[0],
            j = D[1],
            w = o.a.useState("/orbitdb/".concat(a, "/").concat(t)),
            A = Object(y.a)(w, 1)[0],
            R = function (e) {
              b(e !== f ? e : null);
            };
          return Object(c.useEffect)(function () {
            !function (e) {
              var a, t;
              v.a.async(function (n) {
                for (;;) {
                  switch (n.prev = n.next) {
                    case 0:
                      return j(!0), n.next = 3, v.a.awrap(L(e));
                    case 3:
                      if (!(a = n.sent)) {
                        n.next = 14;
                        break;
                      }
                      if ("eventlog" !== a.type && "feed" !== a.type) {
                        n.next = 11;
                        break;
                      }
                      return n.next = 8,
                        v.a.awrap(
                          a.iterator({ limit: 10 }).collect().reverse(),
                        );
                    case 8:
                      t = n.sent, n.next = 12;
                      break;
                    case 11:
                      t = "counter" === a.type
                        ? [{ payload: { value: a.value } }]
                        : "keyvalue" === a.type
                        ? Object.keys(a.all).map(function (e) {
                          return {
                            payload: { value: { key: e, value: a.get(e) } },
                          };
                        })
                        : "docstore" === a.type
                        ? a.query(function (e) {
                          return null !== e;
                        }, { fullOp: !0 }).reverse()
                        : [{ payload: { value: "TODO" } }];
                    case 12:
                      i({ type: E.DB.SET_DB, db: a, entries: t }), j(!1);
                    case 14:
                    case "end":
                      return n.stop();
                  }
                }
              });
            }(A);
            var e = l.programs.find(function (e) {
              return e.payload.value.address === A;
            });
            i({ type: E.PROGRAMS.SET_PROGRAM, program: e });
          }, [i, A, l.programs]),
            o.a.createElement(
              o.a.Fragment,
              null,
              o.a.createElement(
                d.a,
                {
                  marginTop: Object(h.a)(3),
                  marginBottom: Object(h.a)(2),
                  marginX: Object(h.a)(1),
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                },
                o.a.createElement(W.a, {
                  icon: "arrow-left",
                  appearance: "minimal",
                  onClick: function () {
                    l.db && l.db.close().then(function () {
                      i({ type: E.PROGRAMS.SET_PROGRAM, program: null }),
                        i({ type: E.DB.SET_DB, db: null, entries: [] }),
                        u.goBack();
                    });
                  },
                }),
                o.a.createElement(N.a, {
                  marginLeft: Object(h.a)(1),
                  display: "flex",
                  fontFamily: "Titillium Web",
                  color: "#425A70",
                  size: 700,
                  textTransform: "uppercase",
                }, "DATABASE"),
              ),
              o.a.createElement(
                d.a,
                { display: "flex", justifyContent: "center" },
                o.a.createElement(
                  d.a,
                  {
                    flex: "1",
                    overflow: "auto",
                    elevation: 1,
                    background: "white",
                    marginX: Object(h.a)(6),
                    padding: Object(h.a)(4),
                  },
                  o.a.createElement(
                    d.a,
                    { borderBottom: "default" },
                    o.a.createElement(
                      N.a,
                      {
                        size: 500,
                        marginBottom: Object(h.a)(1),
                        borderBottom: "default",
                        overflow: "auto",
                      },
                      "/orbitdb/",
                      a,
                      "/",
                      t,
                    ),
                  ),
                  o.a.createElement(
                    d.a,
                    null,
                    function () {
                      var e = l.program ? l.program.payload.value : null;
                      return o.a.createElement(
                        d.a,
                        { marginTop: Object(h.a)(2) },
                        o.a.createElement(
                          d.a,
                          { flex: "1" },
                          o.a.createElement(
                            S.a,
                            null,
                            "Name: ",
                            e ? e.name : "-",
                          ),
                        ),
                        o.a.createElement(
                          d.a,
                          { flex: "1" },
                          o.a.createElement(S.a, null, "Type: "),
                          e
                            ? o.a.createElement(
                              S.a,
                              { color: Q[e.type] },
                              e.type,
                            )
                            : o.a.createElement(S.a, null, "-"),
                        ),
                        o.a.createElement(
                          d.a,
                          { flex: "1" },
                          o.a.createElement(S.a, null, "Permissions:"),
                          l.db
                            ? o.a.createElement("pre", null, l.db.access.write)
                            : o.a.createElement(S.a, null, "-"),
                        ),
                        o.a.createElement(
                          d.a,
                          { flex: "1", flexDirection: "row" },
                          o.a.createElement(S.a, null, "Entries: "),
                          l.db
                            ? o.a.createElement(S.a, null, l.db._oplog.length)
                            : o.a.createElement(S.a, null, "-"),
                        ),
                        o.a.createElement(
                          d.a,
                          { flex: "1", marginBottom: Object(h.a)(2) },
                          o.a.createElement(
                            N.a,
                            {
                              size: 500,
                              marginTop: Object(h.a)(2),
                              marginBottom: Object(h.a)(1),
                            },
                            function () {
                              var e = l.program
                                ? l.program.payload.value
                                : null;
                              if (e) {
                                return "eventlog" === e.type
                                  ? "Latest 10 events"
                                  : "feed" === e.type
                                  ? "Latest 10 entries"
                                  : "docstore" === e.type
                                  ? "All Documents"
                                  : "keyvalue" === e.type
                                  ? "Keys and Values"
                                  : "counter" === e.type
                                  ? "Count"
                                  : o.a.createElement(
                                    S.a,
                                    { intent: "danger" },
                                    "No input controls found for '",
                                    e.type,
                                    "'",
                                  );
                              }
                            }(),
                          ),
                          x
                            ? o.a.createElement(F.a, {
                              size: Object(h.a)(2),
                              delay: 100,
                              marginY: Object(h.a)(2),
                            })
                            : l.entries.map(function (e, a) {
                              return a += 1,
                                o.a.createElement(
                                  "div",
                                  { key: a },
                                  o.a.createElement(
                                    d.a,
                                    null,
                                    o.a.createElement(
                                      S.a,
                                      {
                                        userSelect: "none",
                                        cursor: "pointer",
                                        onClick: function () {
                                          return R(a);
                                        },
                                      },
                                      JSON.stringify(e.payload.value, null, 2),
                                    ),
                                  ),
                                  o.a.createElement(
                                    d.a,
                                    null,
                                    f && a === f
                                      ? o.a.createElement(Y.a, {
                                        maxWidth: Object(h.a)(96),
                                        overflow: "auto",
                                        fontFamily: "Source Code Pro",
                                        marginY: Object(h.a)(1),
                                        paddingY: Object(h.a)(1),
                                        backgroundColor: "#FEF8E7",
                                      }, JSON.stringify(e, null, 2))
                                      : "",
                                  ),
                                );
                            }),
                        ),
                      );
                    }(),
                  ),
                  o.a.createElement(
                    d.a,
                    null,
                    l.program
                      ? function () {
                        var e = l.db;
                        if (e) {
                          return "eventlog" === e.type
                            ? o.a.createElement(q, null)
                            : "feed" === e.type
                            ? o.a.createElement(J, null)
                            : "docstore" === e.type
                            ? o.a.createElement(U, null)
                            : "keyvalue" === e.type
                            ? o.a.createElement(K, null)
                            : "counter" === e.type
                            ? o.a.createElement($, null)
                            : o.a.createElement(
                              S.a,
                              { intent: "danger" },
                              "No input controls found for '",
                              e.type,
                              "'",
                            );
                        }
                      }()
                      : "",
                  ),
                ),
              ),
            );
        },
        ee = t(1621),
        ae = t(1622),
        te = {
          eventlog: "#47B881",
          feed: "#14B5D0",
          keyvalue: "#1070CA",
          docstore: "#D9822B",
          counter: "#735DD0",
        };
      var ne = function (e) {
          var a = e.programs, t = e.onRemove, n = Object(m.g)();
          return o.a.createElement(
            ee.a,
            null,
            o.a.createElement(
              ee.a.Head,
              { padding: "0" },
              o.a.createElement(
                ee.a.TextHeaderCell,
                {
                  flex: "1 1 2%",
                  textAlign: "center",
                  padding: Object(x.a)(2),
                  alignItems: "baseline",
                },
                o.a.createElement(j.a, {
                  size: Object(h.a)(2),
                  icon: "eye-open",
                }),
              ),
              o.a.createElement(ee.a.TextHeaderCell, {
                flex: "1 1 10%",
                paddingX: 0,
              }, "Name"),
              o.a.createElement(ee.a.TextHeaderCell, {
                flex: "1 1 5%",
                paddingX: Object(x.a)(1),
              }, "Type"),
              o.a.createElement(ee.a.TextHeaderCell, {
                flex: "1 1 40%",
                paddingX: 0,
              }, "Address"),
              o.a.createElement(ee.a.TextHeaderCell, {
                flex: "1 1 10%",
                paddingX: 0,
              }, "Added"),
              o.a.createElement(ee.a.TextHeaderCell, {
                flex: "1 1 2%",
                textAlign: "center",
                padding: Object(x.a)(2),
                alignItems: "baseline",
              }, o.a.createElement(j.a, { size: 12, icon: "trash" })),
            ),
            o.a.createElement(
              ee.a.Body,
              null,
              a.map(function (e) {
                var a = e.payload.value;
                return o.a.createElement(
                  ee.a.Row,
                  { key: "program-id-".concat(a.address) },
                  o.a.createElement(
                    ee.a.Cell,
                    {
                      flex: "1 1 2%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: Object(x.a)(2),
                    },
                    o.a.createElement(W.a, {
                      appearance: "minimal",
                      icon: "database",
                      margin: 0,
                      padding: 0,
                      onClick: function () {
                        return function (e) {
                          n.push(e.address);
                        }(a);
                      },
                    }),
                  ),
                  o.a.createElement(ee.a.TextCell, {
                    flex: "1 1 10%",
                    paddingX: 0,
                  }, a.name),
                  o.a.createElement(ee.a.TextCell, {
                    flex: "1 1 5%",
                    paddingX: Object(x.a)(1),
                    textProps: { color: te[a.type] },
                  }, a.type),
                  o.a.createElement(ee.a.TextCell, {
                    flex: "1 1 40%",
                    paddingX: 0,
                  }, a.address.toString() ? a.address.toString() : a.address),
                  o.a.createElement(ee.a.TextCell, {
                    flex: "1 1 10%",
                    paddingX: 0,
                  }, a.added ? Object(ae.a)(a.added) + " ago" : "Unknown"),
                  o.a.createElement(
                    ee.a.Cell,
                    {
                      flex: "1 1 2%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: Object(x.a)(2),
                    },
                    o.a.createElement(W.a, {
                      appearance: "minimal",
                      icon: "cross",
                      intent: "danger",
                      margin: 0,
                      padding: 0,
                      onClick: function () {
                        return t(e.hash, a);
                      },
                    }),
                  ),
                );
              }),
            ),
          );
        },
        re = t(1624),
        ce = t(1623),
        oe = t(1620);
      var le = function (e) {
        var a = e.onCreate,
          t = g(),
          n = Object(y.a)(t, 2),
          r = n[0],
          c = n[1],
          l = o.a.useState(""),
          i = Object(y.a)(l, 2),
          u = i[0],
          s = i[1],
          d = o.a.useState("eventlog"),
          m = Object(y.a)(d, 2),
          p = m[0],
          f = m[1],
          b = o.a.useState("creator"),
          O = Object(y.a)(b, 2),
          v = O[0],
          h = O[1];
        function D(e) {
          e && e.preventDefault(),
            0 !== u.length &&
            (console.log("Create:", u, p, v),
              a({ name: u, type: p, permissions: v }),
              c({ type: E.DB.CLOSE_CREATEDB_DIALOG }));
        }
        return o.a.createElement(
          re.a,
          {
            isShown: r.createDBDialogOpen,
            title: "Create Database",
            onCloseComplete: function () {
              return c({ type: E.DB.CLOSE_CREATEDB_DIALOG });
            },
            cancelLabel: "Cancel",
            confirmLabel: "Create",
            onConfirm: function (e) {
              return D(null);
            },
          },
          o.a.createElement(
            "form",
            { onSubmit: D },
            o.a.createElement(
              ce.a,
              { label: "Database Name:" },
              o.a.createElement(H.a, {
                onChange: function (e) {
                  s(e.target.value);
                },
                name: "name",
                placeholder: "Database name",
                width: "100%",
              }),
            ),
            o.a.createElement(
              ce.a,
              { label: "Type:" },
              o.a.createElement(
                oe.a,
                {
                  onChange: function (e) {
                    f(e.target.value);
                  },
                },
                o.a.createElement("option", {
                  value: "eventlog",
                  defaultValue: !0,
                }, "Immutable Log"),
                o.a.createElement(
                  "option",
                  { value: "feed" },
                  "A list of entries",
                ),
                o.a.createElement(
                  "option",
                  { value: "keyvalue" },
                  "Key-Value Store",
                ),
                o.a.createElement(
                  "option",
                  { value: "docstore" },
                  "Document Store",
                ),
                o.a.createElement(
                  "option",
                  { value: "counter" },
                  "Counter (CRDT)",
                ),
              ),
            ),
            o.a.createElement(
              ce.a,
              { label: "Write Permissions" },
              o.a.createElement(
                oe.a,
                {
                  onChange: function (e) {
                    h(e.target.value);
                  },
                },
                o.a.createElement(
                  "option",
                  { value: "creator" },
                  "Creator-only: Only you can write, public read",
                ),
                o.a.createElement(
                  "option",
                  { value: "public" },
                  "Public: Anybody can write and write",
                ),
              ),
            ),
          ),
        );
      };
      var ie = function (e) {
        var a = e.onAdd,
          t = g(),
          n = Object(y.a)(t, 2),
          r = n[0],
          c = n[1],
          l = o.a.useState(""),
          i = Object(y.a)(l, 2),
          u = i[0],
          s = i[1];
        function d(e) {
          e && e.preventDefault(),
            0 !== u.length &&
            (console.log("Add:", u),
              a({ address: u }),
              c({ type: E.DB.CLOSE_ADDDB_DIALOG }));
        }
        return o.a.createElement(
          re.a,
          {
            isShown: r.addDBDialogOpen,
            title: "Add Database",
            onCloseComplete: function () {
              return c({ type: E.DB.CLOSE_ADDDB_DIALOG });
            },
            cancelLabel: "Cancel",
            confirmLabel: "Add",
            onConfirm: function (e) {
              return d(null);
            },
          },
          o.a.createElement(
            "form",
            { onSubmit: d },
            o.a.createElement(H.a, {
              onChange: function (e) {
                s(e.target.value);
              },
              name: "address",
              placeholder: "Address",
              width: "100%",
            }),
          ),
        );
      };
      var ue = function () {
        var e = g(), a = Object(y.a)(e, 2), t = a[0], n = a[1];
        function r() {
          var e;
          return v.a.async(function (a) {
            for (;;) {
              switch (a.prev = a.next) {
                case 0:
                  return n({
                    type: E.PROGRAMS.SET_PROGRAMS_LOADING,
                    loading: !0,
                  }),
                    a.next = 3,
                    v.a.awrap(G());
                case 3:
                  return e = a.sent,
                    n({ type: E.PROGRAMS.SET_PROGRAMS, programs: e.reverse() }),
                    n({ type: E.PROGRAMS.SET_PROGRAMS_LOADING, loading: !1 }),
                    a.abrupt("return", e);
                case 7:
                case "end":
                  return a.stop();
              }
            }
          });
        }
        return o.a.createElement(
          o.a.Fragment,
          null,
          o.a.createElement(
            d.a,
            { marginX: Object(h.a)(6) },
            o.a.createElement(N.a, {
              fontFamily: "Titillium Web",
              color: "#425A70",
              size: 700,
              textTransform: "uppercase",
              marginTop: Object(h.a)(3),
              marginBottom: Object(h.a)(2),
            }, "Databases"),
          ),
          o.a.createElement(
            d.a,
            {
              display: "flex",
              flexDirection: "row",
              marginX: Object(h.a)(6),
              marginTop: Object(h.a)(2),
              marginBottom: Object(h.a)(1),
            },
            o.a.createElement(V.a, {
              iconBefore: "document",
              appearance: "default",
              height: 24,
              onClick: function () {
                n({ type: E.DB.OPEN_CREATEDB_DIALOG });
              },
            }, "Create"),
            o.a.createElement(V.a, {
              iconBefore: "plus",
              appearance: "default",
              height: 24,
              marginLeft: Object(x.a)(1),
              onClick: function (e) {
                n({ type: E.DB.OPEN_ADDDB_DIALOG });
              },
            }, "Open"),
          ),
          o.a.createElement(
            d.a,
            { display: "flex", justifyContent: "center", overflow: "auto" },
            o.a.createElement(le, {
              onCreate: function (e) {
                console.log("Create database...", e),
                  k(e.name, e.type, e.permissions).then(function (e) {
                    console.log("Created", e),
                      r().then(function (e) {
                        console.log("Loaded programs", e);
                      });
                  });
              },
            }),
            o.a.createElement(ie, {
              onAdd: function (e) {
                console.log("Add database...", e),
                  P(e.address).then(function (a) {
                    console.log("Added", e.address),
                      r().then(function (e) {
                        console.log("Loaded programs", e);
                      });
                  });
              },
            }),
            o.a.createElement(
              d.a,
              {
                flex: "1",
                overflow: "auto",
                elevation: 1,
                background: "white",
                marginX: Object(h.a)(6),
              },
              t.loading.programs
                ? o.a.createElement(
                  d.a,
                  {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: Object(h.a)(3),
                    marginBottom: Object(h.a)(1),
                  },
                  o.a.createElement(F.a, { size: 24 }),
                  o.a.createElement(
                    S.a,
                    { marginY: Object(h.a)(1) },
                    "Loading...",
                  ),
                )
                : o.a.createElement(ne, {
                  programs: t.programs,
                  onRemove: function (e, a) {
                    console.log("Remove database...", e, a),
                      I(e).then(function () {
                        console.log("Removed"),
                          r().then(function (e) {
                            console.log("Loaded programs", e);
                          });
                      });
                  },
                }),
            ),
          ),
        );
      };
      var se = function () {
        var e = g(),
          a = Object(y.a)(e, 2),
          t = a[0],
          n = a[1],
          r = new URLSearchParams(Object(m.h)().search).get("q");
        if (!(r.length >= 1)) return o.a.createElement(m.a, { to: "/" });
        var c = t.programs;
        return r && (c = c.filter(function (e) {
          var a = e.payload.value, t = a.name, n = a.type, c = a.address;
          return t.includes(r) || n.includes(r) || c.toString().includes(r);
        })),
          o.a.createElement(
            d.a,
            { display: "flex", justifyContent: "center" },
            o.a.createElement(
              d.a,
              {
                flex: "1",
                elevation: 1,
                background: "white",
                margin: Object(h.a)(6),
                padding: Object(h.a)(4),
              },
              o.a.createElement(
                d.a,
                { borderBottom: "default" },
                o.a.createElement(
                  N.a,
                  { size: 600, marginBottom: Object(h.a)(1) },
                  c.length,
                  " programs found",
                ),
              ),
              c !== b
                ? o.a.createElement(ne, {
                  programs: c,
                  onRemove: function (e, a) {
                    console.log("Remove database...", e, a),
                      I(e).then(function () {
                        console.log("Removed"),
                          function () {
                            var e;
                            return v.a.async(function (a) {
                              for (;;) {
                                switch (a.prev = a.next) {
                                  case 0:
                                    return n({
                                      type: E.PROGRAMS.SET_PROGRAMS_LOADING,
                                      loading: !0,
                                    }),
                                      a.next = 3,
                                      v.a.awrap(G());
                                  case 3:
                                    return e = a.sent,
                                      n({
                                        type: E.PROGRAMS.SET_PROGRAMS,
                                        programs: e.reverse(),
                                      }),
                                      n({
                                        type: E.PROGRAMS.SET_PROGRAMS_LOADING,
                                        loading: !1,
                                      }),
                                      a.abrupt("return", e);
                                  case 7:
                                  case "end":
                                    return a.stop();
                                }
                              }
                            });
                          }().then(function (e) {
                            console.log("Loaded programs", e);
                          });
                      });
                  },
                })
                : o.a.createElement(F.a, { marginX: "auto", marginY: 120 }),
            ),
          );
      };
      var de = function () {
        return o.a.createElement(
          f,
          {
            initialState: {
              user: null,
              loginDialogOpen: !1,
              createDBDialogOpen: !1,
              addDBDialogOpen: !1,
              programs: [],
              program: !1,
              db: null,
              entries: [],
              orbitdbStatus: "Starting",
              ipfsStatus: "Starting",
              loading: { programs: !1 },
            },
            reducer: function (e, a) {
              switch (a.type) {
                case E.SYSTEMS.SET_ORBITDB:
                  return Object(s.a)({}, e, { orbitdbStatus: a.orbitdbStatus });
                case E.SYSTEMS.SET_IPFS:
                  return Object(s.a)({}, e, { ipfsStatus: a.ipfsStatus });
                case E.PROGRAMS.SET_PROGRAM:
                  return Object(s.a)({}, e, { program: a.program });
                case E.PROGRAMS.SET_PROGRAM_LOADING:
                  return Object(s.a)({}, e, { program: b });
                case E.PROGRAMS.SET_PROGRAMS:
                  return Object(s.a)({}, e, { programs: a.programs });
                case E.DB.SET_DB:
                  return Object(s.a)({}, e, { db: a.db, entries: a.entries });
                case E.DB.OPEN_CREATEDB_DIALOG:
                  return Object(s.a)({}, e, { createDBDialogOpen: !0 });
                case E.DB.CLOSE_CREATEDB_DIALOG:
                  return Object(s.a)({}, e, { createDBDialogOpen: !1 });
                case E.DB.OPEN_ADDDB_DIALOG:
                  return Object(s.a)({}, e, { addDBDialogOpen: !0 });
                case E.DB.CLOSE_ADDDB_DIALOG:
                  return Object(s.a)({}, e, { addDBDialogOpen: !1 });
                case E.PROGRAMS.SET_PROGRAMS_LOADING:
                  return Object(s.a)({}, e, {
                    loading: Object(s.a)({}, e.loading, {
                      programs: a.loading,
                    }),
                  });
                default:
                  return e;
              }
            },
          },
          o.a.createElement(
            d.a,
            { background: "tint1", height: "100%" },
            o.a.createElement(z, null),
            o.a.createElement(M, null),
            o.a.createElement(
              m.d,
              null,
              o.a.createElement(
                m.b,
                { path: "/search" },
                o.a.createElement(se, null),
              ),
              o.a.createElement(
                m.b,
                { path: "/orbitdb/:programName/:dbName" },
                o.a.createElement(Z, null),
              ),
              o.a.createElement(
                m.b,
                { path: "/" },
                o.a.createElement(ue, null),
              ),
            ),
          ),
        );
      };
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
          ),
      );
      i.a.render(
        o.a.createElement(u.a, null, o.a.createElement(de, null)),
        document.getElementById("root"),
      ),
        "serviceWorker" in navigator &&
        navigator.serviceWorker.ready.then(function (e) {
          e.unregister();
        });
    },
    228: function (e, a) {},
    606: function (e, a, t) {
      e.exports = t(1597);
    },
    611: function (e, a, t) {},
    620: function (e, a) {},
    680: function (e, a) {},
    681: function (e, a) {},
    850: function (e, a) {},
    894: function (e, a) {},
    896: function (e, a) {},
  }, [[606, 1, 2]]]);
//# sourceMappingURL=main.e6c5a847.chunk.js.map
