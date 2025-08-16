(function (window, document) {
    function animateHearts() {
        for (var i = 0; i < hearts.length; i++)
            hearts[i].alpha <= 0
                ? (document.body.removeChild(hearts[i].el), hearts.splice(i, 1))
                : (hearts[i].y--,
                    (hearts[i].scale += 0.004),
                    (hearts[i].alpha -= 0.013),
                    (hearts[i].el.style.cssText =
                        "left:" +
                        hearts[i].x +
                        "px;top:" +
                        hearts[i].y +
                        "px;opacity:" +
                        hearts[i].alpha +
                        ";transform:scale(" +
                        hearts[i].scale +
                        "," +
                        hearts[i].scale +
                        ") rotate(45deg);background:" +
                        hearts[i].color +
                        ";z-index:99999"));
        requestAnimationFrame(animateHearts);
    }

    function bindClick() {
        var oldClick = typeof window.onclick === "function" && window.onclick;
        window.onclick = function (e) {
            oldClick && oldClick(e);
            createHeart(e);
        };
    }

    function createHeart(e) {
        var heart = document.createElement("div");
        heart.className = "heart";
        hearts.push({
            el: heart,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: randomColor(),
        });
        document.body.appendChild(heart);
    }

    function injectStyle(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch (err) {
            style.styleSheet.cssText = css;
        }
        document.head.appendChild(style);
    }

    function randomColor() {
        return (
            "rgb(" +
            ~~(255 * Math.random()) +
            "," +
            ~~(255 * Math.random()) +
            "," +
            ~~(255 * Math.random()) +
            ")"
        );
    }

    var hearts = [];
    window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (cb) {
            setTimeout(cb, 1000 / 60);
        };

    injectStyle(
        ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
    );
    bindClick();
    animateHearts();
})(window, document);