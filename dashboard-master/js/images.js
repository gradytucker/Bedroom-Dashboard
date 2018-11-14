function fetchImages() {
    if (!nowPlaying())
        return resetCover(), resetBackground(), void newTrack();
    if (!newTrack())
        return;
    if (resources.track.current.cover) {
        setCover(`/now/app/cover?url=${encodeURIComponent(resources.track.current.cover)}`)
    } else {
        let e = "/now/app/spotify/track",
            r = `artist=${encodeURIComponent(resources.track.current.artist)}&title=${encodeURIComponent(resources.track.current.title)}`;
        $.post(e, r, e => {e.success ? setCover(e.album.images[0].url) : resetCover()}).fail(resetCover)
    }
    if ("artist" !== getBackgroundType())
        return;
    let e = resources.track.current.artistId,
        r = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${encodeURIComponent(e)}&api_key=c1797de6bf0b7e401b623118120cd9e1&format=json`;
    $.get(r, e => {
        if (!e.artist)
            return void resetBackground();
        if (e.artist.image.length > 0) {
            let r = e.artist.image[e.artist.image.length - 1]["#text"];
            return void $(".background").css("background-image", `url(${r})`)
        }
        let r = `artist=${encodeURIComponent(resources.track.current.artist)}`;
        $.post("/now/app/spotify/artist", r, e => {if (e.success)
                if (e.images.length > 0) {
                    let r = e.images[0].url;
                    $(".background").css("background-image", `url(${r})`)
                } else
                    resetBackground();
            else
                resetBackground()}).fail(resetCover)
    }).fail(resetBackground)
}
function setCover(e) {
    $(".music .cover")[0].crossOrigin = "Anonymous", updateCover(e)
}
function resetCover() {
    $(".music .cover")[0].crossOrigin = null, updateCover("")
}
function updateCover(e) {
    let r = e || getBlankImageData(),
        o = !cookieExists("blur") || cookieEnabled("blur");
    $(".background").toggleClass("blur", o), resources.cover.onload = (() => {"album" == getBackgroundType() && $(".background").css("background-image", `url(${r}`), "" !== e ? $(".music .cover").show() : $(".music .cover").hide(), $(".music .cover").attr("src", r)}), resources.cover.src = r
}
function resetBackground() {
    let e;
    e = nowPlaying() && resources.cover.src !== getBlankImageData() ? resources.cover.src : getDefaultBackground(), $(".background").css("background-image", `url(${e}`)
}
function getBackgroundType() {
    return cookieExists("background") ? Cookies.get("background") : "artist"
}
function hasCover() {
    return $(".cover")[0].src !== getBlankImageData()
}
function fetchColors() {
    if (!hasCover())
        return void resetColors();
    setColors((new ColorThief).getPalette($(".music .cover")[0], 2))
}
function fetchHexColors() {
    if (!hasCover())
        return void resetHexColors();
    let e = resources.colors.regular,
        r = [];
    for (let o = 0; o < e.length; o++) {
        let t = e[o],
            s = 3 * (1 - chroma(t).luminance()),
            c = chroma(t).brighten(s).hex();
        r.push(c)
    }
    setHexColors(r)
}
function setHexColors(e) {
    resources.colors.hex = e, updateColors()
}
function resetHexColors() {
    resources.colors.hex = [], updateColors()
}
function updateColors() {
    let e,
        r;
    hasCover() ? e = resources.colors.hex : (e = ["#f6f5f7", "#f6f5f7"], r = [{
        x: 1 / 3,
        y: 1 / 3
    }], resources.colors.hex = e, resources.colors.hue = r), $(".music .title").css("color", e[0]), $(".music .artist").css("color", e[1]), updateHue()
}
function setColors(e) {
    resources.colors.regular = e, fetchHueColors()
}
function resetColors() {
    resources.colors.regular = [], fetchHueColors()
}
function getDefaultBackground() {
    return Cookies.get("defaultBackground") || getBlankImageData()
}
function getBlankImageData() {
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
}
//# sourceMappingURL=sourcemaps/images.js.map
