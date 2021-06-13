(function () {
    var containers = document.querySelectorAll('.popover');

    Array.from(containers).map(function (container) {
        var btn = container.querySelector('.button');
        var toggle = container.querySelector('.popover-toggle');
        var trigger = container.dataset.trigger;

        if (trigger === 'click') {
            btn.onclick = function () {
                if (toggle.className.indexOf('hidden') === -1) {
                    toggle.classList.add('hidden');
                } else {
                    toggle.classList.remove('hidden');
                }
            };
        } else {
            btn.onmouseover = function () { toggle.classList.remove('hidden'); };
            btn.onmouseout = function () { toggle.classList.add('hidden'); };
        }
    });
})();
