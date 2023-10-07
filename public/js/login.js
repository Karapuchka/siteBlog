const login = document.getElementById('login');
const password = document.getElementById('password');
const btnLogin = document.getElementById('btn-login');
const loginErrorMessange = document.getElementById('login-error-messange')
const passwordErrorMessange = document.getElementById('password-error-messange')

btnLogin.onclick = (e)=>{
    if(login.value == '' && password.value == '') {
        e.preventDefault();

        login.style.borderColor = 'red';
        loginErrorMessange.textContent = 'Поле пустое. Введите логин.'
        loginErrorMessange.style.opacity = '1';

        password.style.borderColor = 'red';
        passwordErrorMessange.textContent = 'Поле пустое. Введите пароль.'
        passwordErrorMessange.style.opacity = '1';
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
}

login.onclick = (e)=> {
    login.style.borderColor = 'gray';
    loginErrorMessange.style.opacity = '0';
}

password.onclick = (e)=> {
    password.style.borderColor = 'gray';
    passwordErrorMessange.style.opacity = '0';
}