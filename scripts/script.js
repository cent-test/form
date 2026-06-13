window.onload = function () {
    const formRegistration = document.getElementById("form-registration");
    const labelInputElements = document.getElementsByClassName('input-all');
    const inputFullName = labelInputElements[0].children[0];
    const inputUserName = labelInputElements[1].children[0];

    const dateBirth = document.getElementById("dateBirth");
    const phone = document.getElementById("userPhone");
    const inputEMail = document.getElementById("eMail");

    const inputMyCheckbox = labelInputElements[7].children[0].value;
    let buttonSignUpIn = document.getElementById('btn-signUpIn');

    const linkUserAuthorization = document.getElementById('link-user');


    const popup = document.getElementById('popup-background');
    const popupText = document.getElementById('popup-text');
    const buttonPopup = document.getElementById('btn-popup');

    const popupInput = document.getElementById('popup-background-input');
    const popupTextInput = document.getElementById('popup-text-input');
    const buttonPopupInput = document.getElementById('btn-popup-input');



    /*В поле "Full Name" запретите вводить цифры.*/
    inputFullName.onkeydown = (event) => {
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
        }
    }

    /*В поле "Your username" запретите вводить точки и запятые.*/
    inputUserName.onkeydown = (event) => {
        if (event.key === '.' || event.key === ',') {
            event.preventDefault();
        }
    }

    /*При изменении значения чекбокса выводите в консоль соответствующее сообщение: “Согласен” или “Не согласен”.*/
    inputMyCheckbox.onchange = (event) => {
        console.log(event.target.checked ? "Согласен" : "Не согласен");
    }

    /*Маска ввода для номера телефона, даты и эл почты.*/
    const maskOptionsBirth = {
        mask: Date,
        min: new Date(1936, 0, 1),
        max: new Date(2011, 0, 1)
    };

    dateBirth.onkeydown = (event) => {
        const mask = IMask(dateBirth, maskOptionsBirth);
    }

    const maskOptionsPhone = {
        mask: '+7 (000) 000-00-00',
    }

    phone.onkeydown = (event) => {
        const mask = IMask(phone, maskOptionsPhone);
    }

    const maskOptionsEMail = {
        mask:function (value) {
            if(/^[a-z0-9_\.-]+$/.test(value))
                return true;
            if(/^[a-z0-9_\.-]+@$/.test(value))
                return true;
            if(/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value))
                return true;
            if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value))
                return true;
            if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value))
                return true;
            if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
                return true;
            if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
                return true;
            return false;
        },
    }

    inputEMail.onkeydown = (event) => {
        const mask = IMask(inputEMail, maskOptionsEMail);
    }

    /*Функция валидации*/
    function inputValidation(inputLabel, inputLabelChildren) {

        if (!inputLabel.children[0].value) {
            popupTextInput.innerText = 'Заполните поле ' + inputLabel.innerText;
            popupInput.style.display = 'block';
            return true;
        } else if (inputLabel.children[0].type === 'password' && inputLabel.children[0].value.length < 8) {
            popupTextInput.innerText = 'Пароль должен содержать не менее 8 символов';
            popupInput.style.display = 'block';
            return true;
        } else if (inputLabelChildren && inputLabel.children[0].type === 'password' && inputLabelChildren.children[0].type === 'password'
            && !(inputLabel.children[0].value === inputLabelChildren.children[0].value)) {
            popupTextInput.innerText = 'Пароли не совпадают';
            popupInput.style.display = 'block';
            return true;
        } else if (inputLabel.children[0].type === 'checkbox' && !inputLabel.children[0].checked) {
            popupTextInput.innerText = 'Подтвердите согласие';
            popupInput.style.display = 'block';
            return true;
        } else {
            return false;
        }

    }

    /*Функция изменения страницы с Регистрации на Авторизацию*/
    function authorizationPage() {
        document.getElementById('title').innerText = 'Войдите в систему';

        const removeElements = document.querySelectorAll('.remove');
        removeElements.forEach(item => item.remove());

        buttonSignUpIn.innerText = 'Войти';
        document.getElementById('image').children[0].style.margin = '194px 0 0 11px';

    }

    /*При нажатии на кнопку Sign Up-Sign In*/
    buttonSignUpIn.onclick = (event) => {

        let buttonText = event.target.innerText;
        let calcError = 0;

        if (buttonText === 'Зарегистрироваться'){
            for (let i = 0; i < labelInputElements.length; i++) {
                if (inputValidation(labelInputElements[i], labelInputElements[i + 1])) {
                    calcError += 1;
                    break;
                }
            }
            if (calcError === 0) {
                popupText.innerText = 'Регистрация завершена! Войдите в систему';
                popup.style.display = 'block';
            }
        }

        if (buttonText === 'Войти'){

            for (let i = 0; i < labelInputElements.length; i++) {
                if (inputValidation(labelInputElements[i])) {
                    calcError += 1;
                    break;
                }
            }

            if (calcError === 0) {
                popupText.innerText = 'Добро пожаловать, ' + labelInputElements[0].children[0].value + '!';
                popup.style.display = 'block';
            }

        }

    }

    /*При нажатии на кнопку Ок в Попап-Инпут Валидация*/
    buttonPopupInput.addEventListener('click', () => {
        popupInput.style.display = 'none';
    });

    /*При нажатии на кнопку Ок в Попап-Регистрация*/
    buttonPopup.addEventListener('click', () => {
        popup.style.display = 'none';
        formRegistration.reset();
        authorizationPage();
    });

    /*При нажатии на ссылку Уже зарегистрирован*/
    linkUserAuthorization.addEventListener('click', authorizationPage);

}