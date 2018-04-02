console.log("Last modification time: 2018-3-14 10:34:55"), webpackJsonp([0], {
    "./node_modules/bulma/css/bulma.css": function(e, n) {},
    "./src/assets/css/icons.css": function(e, n) {},
    "./src/assets/global.css": function(e, n) {},
    "./src/pages/meeting/meeting.css": function(e, n) {},
    "./src/pages/meeting/meeting.js": function(e, n, t) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
            function(e, n) {
                var o, s, a, i, l, c, r, d, u, g, p, f, m, b = t("./node_modules/bulma/css/bulma.css"),
                    y = (t.n(b), t("./node_modules/lodash/lodash.js")),
                    v = (t.n(y), t("./src/assets/css/icons.css")),
                    h = (t.n(v), t("./src/assets/global.css")),
                    j = (t.n(h), t("./src/pages/meeting/meeting.css")),
                    S = (t.n(j), t("./src/utils/StreamWatcher.js"), t("./src/utils/ButtonControl.js")),
                    M = t("./src/utils/Notify.js"),
                    k = t("./src/utils/Storage.js"),
                    w = t("./src/utils/Render.js"),
                    B = t("./src/utils/Settings.js");
                o = e, s = {}, a = {}, i = {}, l = [], c = null, r = null, d = function(e, n) {
                    return new Promise(function(t, o) {
                        e.init(n.key, function() {
                            console.log("AgoraRTC client initialized"), e.join(n.key, n.channel, n.uid, function(e) {
                                console.log("User " + e + " join channel successfully"), console.log((new Date).toLocaleTimeString()), t(e)
                            })
                        })
                    })
                }, u = function(e, n, t) {
                    var o = {
                        streamID: e,
                        audio: !0,
                        video: !0,
                        screen: !1
                    };
                    switch (n.attendeeMode) {
                        case "audio-only":
                            o.video = !1;
                            break;
                        case "audience":
                            o.video = !1, o.audio = !1;
                            break;
                        default:
                        case "video":
                    }
                    var s = AgoraRTC.createStream(Object(y.merge)(o, t));
                    return s.setVideoProfile(n.videoProfile), s
                }, g = function() {
                    try {
                        c && c.unpublish(r), r && r.close(), c && c.leave(function() {
                            console.log("Share client succeed to leave.")
                        }, function() {
                            console.log("Share client failed to leave.")
                        })
                    } finally {
                        c = null, r = null
                    }
                }, p = function(e) {
                    l.map(function(n, t) {
                        n.getId() === e && (l[t].close(), o("#ag-item-" + e).remove(), l.splice(t, 1))
                    }), l.length <= 4 && 2 !== s.displayMode && S.a.enable(".displayModeBtn"), e === B.b && (s.displayMode = 0, "video" === s.attendeeMode && S.a.enable(".shareScreenBtn"), S.a.enable([".displayModeBtn", ".disableRemoteBtn"]), g()), Object(w.a)(l, s.displayMode, s.resolution)
                }, f = function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    l.some(function(n) {
                        return n.getId() === e.getId()
                    }) || (n ? l.push(e) : l.unshift(e), l.length > 4 && (s.displayMode = 1 === s.displayMode ? 0 : s.displayMode, S.a.disable([".displayModeBtn", ".disableRemoteBtn"])), e.getId() === B.b && (s.displayMode = 2, c || S.a.disable(".shareScreenBtn"), S.a.disable([".displayModeBtn", ".disableRemoteBtn"])), Object(w.a)(l, s.displayMode, s.resolution))
                }, m = function() {
                    o(".displayModeBtn").on("click", function(e) {
                        e.currentTarget.classList.contains("disabled") || l.length <= 1 || (1 === s.displayMode ? (s.displayMode = 0, S.a.disable(".disableRemoteBtn")) : 0 === s.displayMode && (s.displayMode = 1, S.a.enable(".disableRemoteBtn")), Object(w.a)(l, s.displayMode, s.resolution))
                    }), o(".exitBtn").on("click", function() {
                        try {
                            c && g(), a && a.unpublish(i), i && i.close(), a && a.leave(function() {
                                console.log("Client succeed to leave.")
                            }, function() {
                                console.log("Client failed to leave.")
                            })
                        } finally {
                            window.location.href = "index.html"
                        }
                    }), o(".videoControlBtn").on("click", function() {
                        o(".videoControlBtn").toggleClass("off"), i.isVideoOn() ? i.disableVideo() : i.enableVideo()
                    }), o(".audioControlBtn").on("click", function() {
                        o(".audioControlBtn").toggleClass("off"), i.isAudioOn() ? i.disableAudio() : i.enableAudio()
                    }), o(".shareScreenBtn").on("click", function(e) {
                        e.currentTarget.classList.contains("disabled") || (c ? g() : function() {
                            c = AgoraRTC.createClient({
                                mode: s.transcode
                            });
                            var e = Object(y.merge)(s, {
                                uid: B.b
                            });
                            d(c, e).then(function(n) {
                                (r = u(n, e, {
                                    screen: !0,
                                    video: !1,
                                    audio: !1,
                                    extensionId: "minllpmhdgpndnkomcoccfekfegnlikg"
                                })).init(function() {
                                    r.on("stopScreenSharing", function() {
                                        g(), console.log("Stop Screen Sharing at" + new Date)
                                    }), c.publish(r, function(e) {
                                        console.log("Publish share stream error: " + e), console.log("getUserMedia failed", e)
                                    })
                                }, function(e) {
                                    M.a.danger('Please check if you have properly installed Agora Share\n                                Extension, then try again. <a target="_blank" \n                                style="text-decoration: underline" \n                                href="https://chrome.google.com/webstore/detail/agora-web-screensharing/minllpmhdgpndnkomcoccfekfegnlikg?utm_source=chrome-ntp-icon">\n                                The extension can be found here.</a>', 3e3), console.log("getUserMedia failed", e), g()
                                })
                            })
                        }())
                    }), o(".disableRemoteBtn").on("click", function(e) {
                        if (!(e.currentTarget.classList.contains("disabled") || l.length <= 1)) {
                            o(".disableRemoteBtn").toggleClass("off");
                            var n = i.getId();
                            Array.from(document.querySelectorAll(".ag-item:not(#ag-item-" + n + ")")).map(function(e) {
                                "none" !== e.style.display ? e.style.display = "none" : e.style.display = "block"
                            })
                        }
                    }), o(window).resize(function(e) {
                        Object(w.a)(l, s.displayMode, s.resolution)
                    }), o(document).mousemove(function(e) {
                        n._toolbarToggle && clearTimeout(n._toolbarToggle), o(".ag-btn-group").addClass("active"), n._toolbarToggle = setTimeout(function() {
                            o(".ag-btn-group").removeClass("active")
                        }, 2500)
                    })
                },
                    function(e) {
                        switch (o("#room-name").html(e.channel), e.attendeeMode) {
                            case "audio-only":
                                S.a.hide([".videoControlBtn", ".shareScreenBtn"]);
                                break;
                            case "audience":
                                S.a.hide([".videoControlBtn", ".audioControlBtn", ".shareScreenBtn"]);
                                break;
                            default:
                            case "video":
                        }
                    }(s = function() {
                        var e = {
                                videoProfile: Object(k.a)("videoProfile").split(",")[0] || "480p_4",
                                channel: Object(k.a)("channel") || "test",
                                transcode: Object(k.a)("transcode") || "interop",
                                attendeeMode: Object(k.a)("attendeeMode") || "video",
                                baseMode: Object(k.a)("baseMode") || "avc",
                                displayMode: 1,
                                uid: void 0,
                                resolution: void 0
                            },
                            n = B.a[Object(k.a)("videoProfile")];
                        return e.resolution = n[0] / n[1] || 4 / 3, "avc" === e.baseMode ? e.key = "74a0b7bb5d3e47c7abca0533d17b0afa" : e.key = "f4637604af81440596a54254d53ade20", e
                    }()), a = AgoraRTC.createClient({
                    mode: s.transcode
                }), m(), a.on("stream-added", function(e) {
                    var n = e.stream;
                    console.log("New stream added: " + n.getId()), console.log((new Date).toLocaleTimeString()), console.log("Subscribe ", n), a.subscribe(n, function(e) {
                        console.log("Subscribe stream failed", e)
                    })
                }), a.on("peer-leave", function(e) {
                    console.log("Peer has left: " + e.uid), console.log((new Date).toLocaleTimeString()), console.log(e), p(e.uid)
                }), a.on("stream-subscribed", function(e) {
                    var n = e.stream;
                    console.log("Got stream-subscribed event"), console.log((new Date).toLocaleTimeString()), console.log("Subscribe remote stream successfully: " + n.getId()), console.log(e), f(n)
                }), a.on("stream-removed", function(e) {
                    var n = e.stream;
                    console.log("Stream removed: " + n.getId()), console.log((new Date).toLocaleTimeString()), console.log(e), p(n.getId())
                }), d(a, s).then(function(e) {
                    i = u(e, s), console.log(i), i.init(function() {
                        "audience" !== s.attendeeMode && (f(i, !0), a.publish(i, function(e) {
                            console.log("Publish local stream error: " + e)
                        }))
                    }, function(e) {
                        console.log("getUserMedia failed", e)
                    })
                })
            }.call(n, t("./node_modules/jquery/dist/jquery.js"), t("./node_modules/webpack/buildin/global.js"))
    },
    "./src/utils/ButtonControl.js": function(e, n, t) {
        "use strict";
        (function(e) {
            var t, o = (t = function(e, n) {
                e instanceof Array ? e.map(function(e) {
                    n(e)
                }) : n(e)
            }, {
                hide: function(n) {
                    t(n, function(n) {
                        e(n).hide()
                    })
                },
                show: function(n) {
                    t(n, function(n) {
                        e(n).show()
                    })
                },
                toggle: function(n) {
                    t(n, function(n) {
                        e(n).toggle()
                    })
                },
                enable: function(n) {
                    t(n, function(n) {
                        e(n).removeClass("disabled")
                    })
                },
                disable: function(n) {
                    t(n, function(n) {
                        e(n).addClass("disabled")
                    })
                }
            });
            n.a = o
        }).call(n, t("./node_modules/jquery/dist/jquery.js"))
    },
    "./src/utils/Notify.js": function(e, n, t) {
        "use strict";
        (function(e) {
            var t = function() {
                var n = e(".notification-container");
                n.length || (e("body").append('<div class="notification-container" \n                    style="z-index: 12;position: absolute;\n                    width: 38.2%;max-width: 450px; \n                    min-width: 300px;left: 0;\n                    bottom: 0;"></div>'), n = e(".notification-container"));
                var t = function(t, o, s) {
                    var a = (new Date).getTime(),
                        i = '<div id="notify-' + a + '" class="notification is-' + t + '">\n                                <button class="delete"></button>\n                                ' + o + "\n                            </div>";
                    n.append(i), e("#notify-" + a + " .delete").on("click", function() {
                        e("#notify-" + a).remove()
                    }), setTimeout(function() {
                        e("#notify-" + a).remove()
                    }, s)
                };
                return {
                    primary: function(e, n) {
                        t("primary", e, n)
                    },
                    link: function(e, n) {
                        t("link", e, n)
                    },
                    info: function(e, n) {
                        t("info", e, n)
                    },
                    success: function(e, n) {
                        t("success", e, n)
                    },
                    warning: function(e, n) {
                        t("warning", e, n)
                    },
                    danger: function(e, n) {
                        t("danger", e, n)
                    }
                }
            }();
            n.a = t
        }).call(n, t("./node_modules/jquery/dist/jquery.js"))
    },
    "./src/utils/Render.js": function(e, n, t) {
        "use strict";
        (function(e) {
            t.d(n, "a", function() {
                return a
            });
            var o = t("./src/utils/Settings.js"),
                s = {
                    1: ["span 12/span 24"],
                    2: ["span 12/span 12/13/25", "span 12/span 12/13/13"],
                    3: ["span 6/span 12", "span 6/span 12", "span 6/span 12/7/19"],
                    4: ["span 6/span 12", "span 6/span 12", "span 6/span 12", "span 6/span 12/7/13"],
                    5: ["span 3/span 4/13/9", "span 3/span 4/13/13", "span 3/span 4/13/17", "span 3/span 4/13/21", "span 9/span 16/10/21"],
                    6: ["span 3/span 4/13/7", "span 3/span 4/13/11", "span 3/span 4/13/15", "span 3/span 4/13/19", "span 3/span 4/13/23", "span 9/span 16/10/21"],
                    7: ["span 3/span 4/13/5", "span 3/span 4/13/9", "span 3/span 4/13/13", "span 3/span 4/13/17", "span 3/span 4/13/21", "span 3/span 4/13/25", "span 9/span 16/10/21"]
                },
                a = function(n, t, a) {
                    var l = document.querySelector("#ag-canvas");
                    if (2 !== t && e("#ag-resize-container").remove(), 0 === t) {
                        var c = n.length;
                        if (c > 7) return;
                        n.map(function(e, n) {
                            var t = e.getId(),
                                o = document.querySelector("#ag-item-" + t);
                            o || ((o = document.createElement("section")).setAttribute("id", "ag-item-" + t), o.setAttribute("class", "ag-item"), l.appendChild(o), e.play("ag-item-" + t)), o.setAttribute("style", "grid-area: " + s[c][n]), e.player.resize && e.player.resize()
                        })
                    } else if (1 === t) {
                        var r = n.length;
                        if (r > 4) return;
                        n.map(function(e, n) {
                            var t = e.getId(),
                                o = document.querySelector("#ag-item-" + t);
                            o || ((o = document.createElement("section")).setAttribute("id", "ag-item-" + t), o.setAttribute("class", "ag-item"), l.appendChild(o), e.play("ag-item-" + t)), n === r - 1 ? o.setAttribute("style", "grid-area: span 12/span 24/13/25") : o.setAttribute("style", "grid-area: span 3/span 4/" + (4 + 3 * n) + "/25;\n                z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)"), e.player.resize && e.player.resize()
                        })
                    } else if (2 === t) {
                        var d = n.length;
                        if (d > 8) return;
                        for (var u = d - 1; u >= 0; u--) {
                            var g = n[u],
                                p = g.getId(),
                                f = document.querySelector("#ag-item-" + p);
                            if (f || ((f = document.createElement("section")).setAttribute("id", "ag-item-" + p), f.setAttribute("class", "ag-item"), l.appendChild(f), g.play("ag-item-" + p)), p === o.b) {
                                var m = l.clientWidth,
                                    b = l.clientHeight;
                                if (d < 5) {
                                    var y = i(20 / 24 * m, b, a);
                                    f.setAttribute("style", "background-color:#000; grid-area: span 12/span 20/13/25; padding: " + y)
                                } else {
                                    var v = i(16 / 24 * m, b, a);
                                    f.setAttribute("style", "background-color:#000; grid-area: span 12/span 16/13/21; padding: " + v)
                                }
                            } else 8 === d && index === d - 1 ? f.setAttribute("style", "display: none") : f.setAttribute("style", "grid-area: span 4/span 4");
                            g.player.resize && g.player.resize()
                        }
                    }
                },
                i = function(e, n, t) {
                    return e / n >= t ? "0 " + (e - t * n) / 2 + "px" : (n - 1 / t * e) / 2 + "px 0"
                }
        }).call(n, t("./node_modules/jquery/dist/jquery.js"))
    },
    "./src/utils/Settings.js": function(e, n, t) {
        "use strict";
        t.d(n, "a", function() {
            return o
        }), t.d(n, "b", function() {
            return s
        });
        var o = {
                "360p_4": [640, 360, 30, 600],
                "480p_4": [640, 480, 30, 750],
                "720p_3": [1280, 720, 30, 1710]
            },
            s = 1
    },
    "./src/utils/Storage.js": function(e, n, t) {
        "use strict";
        n.b = s, n.a = a;
        var o = window.sessionStorage;

        function s(e, n) {
            o.setItem(e, n)
        }

        function a(e) {
            return o.getItem(e)
        }
    },
    "./src/utils/StreamWatcher.js": function(e, n, t) {
        "use strict"
    }
}, ["./src/pages/meeting/meetingOLD.js"]);
//# sourceMappingURL=meeting.a29f50d.js.map