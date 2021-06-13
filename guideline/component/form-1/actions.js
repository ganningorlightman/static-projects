(function () {

	var form = document.getElementById("form");
	form.addEventListener("submit", formSend);

	async function formSend(e) {
		e.preventDefault();
		var error = formValidate(form)

		var formData = new FormData(form);
		formData.append("img", formImage.files[0]);

		if (error === 0) {
			form.classList.add("_sending");
			var response = await fetch("sendmail.php", {
				method: "POST",
				body: formData,
			});
			if (response.ok) {
				var result = await response.json();
				alert(result.message);
				formPreview.innerHTML = "";
				form.reset();
				form.classList.remove("_sending");
			} else {
				alert("Ошибка отправки формы")
				form.classList.remove("_sending");
			}
		} else {
			alert("Заполните обязательные поля")
		}
	}

	function formValidate(form) {
		var error = 0;
		var formReq = document.querySelectorAll("._req")

		for(var index = 0; index < formReq.length; index++) {
			var input = formReq[index];
			formRemoveError(input);
			if (input.classList.contains("_email")) {
				if(emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === "") {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add("_error");
		input.classList.add("_error");
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove("_error");
		input.classList.remove("_error");
	}
	function emailTest(input) {
		return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,8}$/.test(input.value)
	}

	var formImage = document.getElementById("form-image");
	var formPreview = document.getElementById("form-preview");

	formImage.addEventListener("change", function() {
		uploadFile(formImage.files[0]);
	})

	function uploadFile(file) {
		if(!["image/jpg", "image/png", "image/gif"].includes(file.type)) {
			alert("Разрешны только изображения");
			formImage.value = "";
			return;
		}
		if (file.size > 2 * 1024 * 1024) {
			alert("Файл должен быть менее 2 МБ");
			return;
		}
		var reader = new FileReader();
		reader.onload = function(e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото" />`;
		}
		reader.onerror = function(e) {
			alert("Ошибка в чтении фото");
		}
		reader.readAsDataURL(file);
	}

})();