(function () {
	window.onscroll = function() {
		var header =  document.querySelector('.header');
		var serviceBlock = document.getElementById('service');
		var agencyBlock = document.getElementById('agency');
		var loginBtn = document.getElementById('loginBtn');
		var darkLogo = document.querySelector('.logo-on-dark');
		var whiteLogo = document.querySelector('.logo-on-white');

		if(header && serviceBlock && agencyBlock && loginBtn && darkLogo && whiteLogo) {
			var serviceBlockTop = window.scrollY + serviceBlock.getBoundingClientRect().top - 1;
			var agencyBlockTop = window.scrollY + agencyBlock.getBoundingClientRect().top - 1;

			if ((window.pageYOffset > serviceBlockTop) && (window.pageYOffset <= agencyBlockTop)){
				header.classList.add('on-service');
				loginBtn.classList.add('white');
				darkLogo.style.display='none'
				whiteLogo.style.display='block'

				header.classList.remove('on-agency');
			}
			else if (window.pageYOffset > agencyBlockTop) {
				header.classList.add('on-agency');
				darkLogo.style.display='block'
				whiteLogo.style.display='none'

				loginBtn.classList.remove('white');
				header.classList.remove('on-service');
			} else {
				darkLogo.style.display='block'
				whiteLogo.style.display='none'

				loginBtn.classList.remove('white');
				header.classList.remove('on-service');
				header.classList.remove('on-agency');
			}
		}
	};
})();