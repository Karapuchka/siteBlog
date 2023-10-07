const login = document.getElementById('login');
const password = document.getElementById('password');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const btnRegistr = document.getElementById('btn-registr');
const btnOpenPassword = document.getElementById('btn-open-password');

const loginErrorMessange = document.getElementById('login-error-messange')
const passwordErrorMessange = document.getElementById('password-error-messange')
const firstNameErrorMessange = document.getElementById('firstName-error-messange')
const lastNameErrorMessange = document.getElementById('lastName-error-messange')

btnRegistr.onclick = (e)=>{

    if(login.value == '' && password.value == '' && firstName.value == '' && lastName.value == '') {

        e.preventDefault();

        login.style.borderColor = 'red';
        loginErrorMessange.textContent = 'Поле пустое. Введите логин.'
        loginErrorMessange.style.opacity = '1';

        password.style.borderColor = 'red';
        passwordErrorMessange.textContent = 'Поле пустое. Введите пароль.'
        passwordErrorMessange.style.opacity = '1';

        firstName.style.borderColor = 'red';
        firstNameErrorMessange.textContent = 'Поле пустое. Введите имя.'
        firstNameErrorMessange.style.opacity = '1';

        lastName.style.borderColor = 'red';
        lastNameErrorMessange.textContent = 'Поле пустое. Введите фамилию.'
        lastNameErrorMessange.style.opacity = '1';
    }

    if(login.value == ''){

        e.preventDefault();

        login.style.borderColor = 'red';
        loginErrorMessange.textContent = 'Поле пустое. Введите логин.'
        loginErrorMessange.style.opacity = '1';
    }

    if(password.value == ''){

        e.preventDefault();

        password.style.borderColor = 'red';
        passwordErrorMessange.textContent = 'Поле пустое. Введите пароль.'
        passwordErrorMessange.style.opacity = '1';
    }

    if(firstName.value == ''){
        
        e.preventDefault();

        firstName.style.borderColor = 'red';
        firstNameErrorMessange.textContent = 'Поле пустое. Введите имя.'
        firstNameErrorMessange.style.opacity = '1';
    }

    if(lastName.value == ''){

        e.preventDefault();

        lastName.style.borderColor = 'red';
        lastNameErrorMessange.textContent = 'Поле пустое. Введите фамилию.'
        lastNameErrorMessange.style.opacity = '1';
    }
}

login.onclick = (e)=> {
    login.style.borderColor = 'gray';
    loginErrorMessange.style.opacity = '0';
}

password.onclick = (e)=> {
    password.style.borderColor = 'gray';
    passwordErrorMessange.style.opacity = '0';
}

firstName.onclick = (e)=> {
    firstName.style.borderColor = 'gray';
    firstNameErrorMessange.style.opacity = '0';
}

lastName.onclick = (e)=> {
    lastName.style.borderColor = 'gray';
    lastNameErrorMessange.style.opacity = '0';
}

btnOpenPassword.onclick = (e)=>{
    if(btnOpenPassword.children[0].getAttribute('src') == '/images/eye-open.png'){
        btnOpenPassword.children[0].setAttribute('src', '/images/eye-closed.png');
        password.setAttribute('type', 'text');
    } else {
        btnOpenPassword.children[0].setAttribute('src', '/images/eye-open.png');
        password.setAttribute('type', 'password');
    }
}