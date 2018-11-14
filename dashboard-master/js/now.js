function init() {
    initCursor(), initMenu(), initMetadata(), initWeather(), initDatetime()
}
$(() => {window.resources = {
        features: {
            weather: !1,
            hue: !1
        },
        cover: new Image,
        cursorTimeout: 3,
        track: {
            current: {
                artist: "",
                artistId: "",
                title: "",
                link: "",
                cover: ""
            },
            previous: {
                artist: "",
                title: ""
            }
        },
        colors: {
            regular: [],
            hex: [],
            hue: []
        }
    }, init()});
//# sourceMappingURL=sourcemaps/now.js.map
