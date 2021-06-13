(function () {
	var containers = document.querySelectorAll('.dropdown');
	
	Array.from(containers).map(function (container) {
		var btn = container.querySelector('.dropbtn');
		var content = container.querySelector('.dropdown-content');
		var items = container.querySelectorAll('.dropdown-item');

		btn.onclick = function () {
			if (content.className.indexOf('show') === -1) {
				content.classList.add('show');
				btn.classList.add('show');
			} else {
				content.classList.remove('show');
				btn.classList.remove('show');
			}
		};
		Array.from(items).map(function (item){
			item.onclick = function () {
				btn.innerText = item.innerText;
				content.classList.remove('show');
				btn.classList.remove('show');
			};
		});
    });
})();