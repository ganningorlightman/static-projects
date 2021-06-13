(function () {
    var burger = document.querySelector('.burger');
    var header = document.querySelector('.header');
    var body = document.body;

    var closeMenu = function () {
        burger.classList.remove("close");
        header.classList.remove("menu-open");
        body.style.overflow = "auto";
    };

    burger.onclick = function () {
        if (burger.className.indexOf("close") === -1) {
            burger.classList.add("close");
            header.classList.add("menu-open");
            body.style.overflow = "hidden";
        } else {
            closeMenu()
        }
    };

    var rows = document.querySelectorAll('.menu-row');
    Array.from(rows).map(function (row) {
        row.onclick = closeMenu;
    });

    var menuButton = document.getElementById("menu-button");
    menuButton.onclick = closeMenu;

})();