(function() {
    var body = document.body;
    var form = document.getElementById("form");

    var modal = document.getElementById("modal");
    var closeIcon = modal.querySelector(".close");

    function openModal() {
        modal.classList.add("open");
        body.style.overflow = "hidden";
    }
    function closeModal() {
        modal.classList.remove("open");
        body.style.overflow = "auto";
    }
    function formAddError(field) {
        field.classList.add("error");
    }
    function formRemoveError(field) {
        field.classList.remove("error");
    }
    function emailTest(input) {
        return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,8}$/.test(input.value)
    }

    var formFile = document.getElementById("form-file");
    var formPreview = document.getElementById("form-file-preview");
    formFile.addEventListener("change", function() {
        uploadFile(formFile.files[0]);
    })
    function uploadFile(file) {
        if (file.size > 2 * 1024 * 1024) {
            alert("Файл должен быть менее 2 МБ");
            formFile.value = "";
            return;
        }
        var reader = new FileReader();
        reader.onerror = function(e) {
            alert("Ошибка в чтении файла");
        }
        var srcUrl = "static/img/icon-txt.png";
        if (
            (file.type === "application/msword")
            || (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        ) {
            srcUrl = "static/img/icon-doc.png";
        }
        if (file.type === "application/pdf") {
            srcUrl = "static/img/icon-pdf.png";
        }
        formPreview.innerHTML = `<img class="file-preview-icon" src="${srcUrl}" alt="Файл" />`;
        reader.readAsDataURL(file);
    }

    function formValidate() {
        var error = 0;
        var formReq = form.querySelectorAll("._req")

        for(var index = 0; index < formReq.length; index++) {
            var field = formReq[index];
            formRemoveError(field);
            if (field.name === "email") {
                if(emailTest(field)) {
                    formAddError(field);
                    error++;
                }
            }  else if (field.getAttribute("type") === "checkbox" && field.checked === false) {
                formAddError(field);
                error++;
            } else {
                if (field.value === "") {
                    formAddError(field);
                    error++;
                }
            }
        }
        return error;
    }

    async function formSend(e) {
        e.preventDefault();

        var error = formValidate();
        if (error === 0) {
            form.classList.add("_sending");
            openModal();
            var formData = new FormData(form);
            formData.append("file", formFile.files[0]);
            try {
                var response = await fetch("//172.31.48.1:35355/api/send-message", {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) {
                    var result = await response.json();
                    console.log(result)
                    form.reset();
                    formPreview.innerHTML = "";
                    form.classList.remove("_sending");
                } else {
                    alert("Ошибка отправки формы")
                    form.classList.remove("_sending");
                }
            } catch(e) {
                console.error('Ошибка:', error)
                form.classList.remove("_sending");
            }
        } else {
            alert("Заполните обязательные поля")
        }
    }


    form.addEventListener("submit", formSend);
    closeIcon.onclick = closeModal;
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    })
})()