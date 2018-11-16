function initMetadata() {
    $(".music .cover")[0].onload = fetchColors, fetchMetadata(), setInterval(fetchMetadata, 3e3)
}
function fetchMetadata() {
    let t = $(".music .user").text(),
        e = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(t)}&api_key=c1797de6bf0b7e401b623118120cd9e1&limit=1&format=json`;
    $.get(e, t => {
        if (void 0 !== t.error || !t.recenttracks)
            return void resetMetadata();
        let e = t.recenttracks.track[0];
        e["@attr"] && e["@attr"].nowplaying ? setMetadata({
            artist: e.artist["#text"],
            artistId: e.artist.mbid,
            title: e.name,
            link: e.url,
            cover: e.image[e.image.length - 1]["#text"],
            scrobbles: t.recenttracks["@attr"].total
        }) : resetMetadata()
    }).fail(resetMetadata)
}
function setMetadata(t) {
    resources.track.current.artist = t.artist, resources.track.current.artistId = t.artistId, resources.track.current.title = t.title, resources.track.current.link = t.link, resources.track.current.cover = t.cover ? t.cover : "", updateMetadata(t)
}
function resetMetadata() {
    resources.track.current.artist = "", resources.track.current.artistId = "", resources.track.current.title = "", resources.track.current.link = "", resources.track.current.cover = "", updateMetadata()
}
function updateMetadata(t) {
    let e = resources.track.current.artist,
        r = resources.track.current.title,
        a = resources.track.current.link;
    $(".music .artist").text(e || "[Paused]"), $(".music .title").text(r || "  ‍   "), $(".music .songLink").attr("href", a);
    let c = t && t.scrobbles;
    $(".scrobbles .scrobbleCount").text(c ? t.scrobbles : ""), toggleDisplay(".scrobbles", c), nowPlaying() ? (document.title = `"${r}" by ${e}`, cookieEnabled("extendedOn") && toggleDisplay(".userLine", !0)) : (document.title = "Descent", toggleDisplay(".userLine", !1), resetBackground()), fetchImages()
}
function nowPlaying() {
    return "" !== resources.track.current.artist
}
function newTrack() {
    return (resources.track.current.artist !== resources.track.previous.artist || resources.track.current.title !== resources.track.previous.title) && (resources.track.previous.artist = resources.track.current.artist, resources.track.previous.title = resources.track.current.title, !0)
}
//# sourceMappingURL=sourcemaps/metadata.js.map
