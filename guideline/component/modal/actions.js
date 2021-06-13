(function () {
    var containers = document.querySelectorAll('.modal');

    Array.from(containers).map(function (container) {
        var btn = container.querySelector('.button');
		var closeIcon = container.querySelector('.close');
        var modal = container.querySelector('.modal-window');
		var title = container.querySelector('.modal-title');
		var titleText = modal.dataset.title;
		
		if(titleText) {
			title.innerText = titleText
		}
		
		btn.onclick = function () {
			modal.style.display = "block";
		};
		
		closeIcon.onclick = function () {
			modal.style.display = "none";
		};
		
		window.onclick = function(event) {
			if (event.target === modal) {
				modal.style.display = "none";
			}
		}
		
    });
})();

