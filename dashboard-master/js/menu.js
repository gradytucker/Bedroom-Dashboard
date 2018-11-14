function initMenu() {
    resources.features.hue = cookieExists("hueIp") && cookieExists("hueUsername") && cookieExists("hueRooms"), window.onkeydown = processKey, resources.features.hue && (cookieEnabled("hueEnabled") && $(".hueIndicator").text("on"), $(".hueHelp").show()), setTimeout(() => {toggleDisplay(".help", !1)}, 3600), Cookies.set("lastUser", $(".music .user").text(), {
        expires: 3650
    }), "transparent" === getBackgroundType() && $("body").css("background-color", "transparent")
}
function processKey(e) {
    if (e.ctrlKey || e.metaKey)
        return;
    switch (e.keyCode) {
    case 72:
        toggleDisplay(".help");
        break;
    case 69:
        {
            let e = !1;
            nowPlaying() && (toggleCookie("extendedOn"), e = void 0), toggleDisplay(".userLine", e);
            break
        }case 76:
        {
            let e = !1;
            resources.features.hue && (toggleCookie("hueEnabled"), e = void 0), toggleHue(e);
            break
        }case 84:
        toggleCookie("datetimeOn"), toggleDisplay(".datetime");
        break;
    case 87:
        {
            let e = !1;
            resources.features.weather && (toggleCookie("weatherOn"), e = void 0), toggleDisplay(".weather", e);
            break
        }
    }
}
function toggleDisplay(e, o) {
    e.constructor !== Array ? (void 0 === o && (o = !$(e).is(":visible")), o ? $(e).fadeIn(750, "linear") : $(e).fadeOut(750, "linear")) : e.forEach(e => {toggleDisplay(e, o)})
}
function toggleHue(e) {
    void 0 === e && (e = "off" === $(".hueIndicator").text()), e ? ($(".hueIndicator").text("on"), updateHue()) : $(".hueIndicator").text("off")
}
//# sourceMappingURL=sourcemaps/menu.js.map
