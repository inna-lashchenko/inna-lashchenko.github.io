({
    baseUrl: "./",
    appDir: "./scripts",
    dir: "./build",
    paths: {
        jquery: "../lib/jquery/dist/jquery.min"
    },
    wrapShim: true,
    mainConfigFile: 'scripts/app.js',
    modules: [
        {
            name: "modules/main",
            exclude: ["jquery"]
        }
    ]
})