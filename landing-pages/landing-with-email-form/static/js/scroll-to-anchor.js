(function () {
    var links = document.querySelectorAll("a[href*='#']");
    var body = document.documentElement; // not document.body

    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
        }, 0);
    }

    Array.from(links).map(function (link) {
        link.addEventListener("click", e => {
            e.preventDefault();
            var target = link.getAttribute("href");
            var targetOffset = document.querySelector(target).offsetTop;
            var indent = target.includes("form") ? 300 : 80;
            if (window.matchMedia("(max-width: 768px)").matches) {
                indent = target.includes("form") ? 150 : 56;
            } else if (window.matchMedia("(max-width: 992px)").matches) {
                indent = target.includes("form") ? 190 : 72;
            }
            scrollTo(body, targetOffset - indent, 100);
        });
    });
})();