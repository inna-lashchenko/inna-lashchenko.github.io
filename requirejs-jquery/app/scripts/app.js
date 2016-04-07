(function() {

    require.config({
        paths: {
            jquery: "../lib/jquery/dist/jquery.min"
        },
        "shim": {
            "../lib/jquery/dist/jquery.min": {
                "exports": "$"
            }
        }
    });

    define(['modules/main']);
})();
