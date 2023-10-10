const btnSubmitPost = document.getElementById('post-btn-submit');
const postTitle = document.getElementById('post-title');
const postText= document.getElementById('post-text');
const postError= document.getElementById('post-error');

btnSubmitPost.onclick = (e)=>{
    
    if(postTitle.value == '' && postText.value == ''){

        e.preventDefault();

        postError.style.opacity = 1;
        postError.textContent = 'Заполните пустые поля!';

        postText.style.boxShadow = '5px 5px 5px red';
        postTitle.style.boxShadow = '5px 5px 5px red';
    }

    if(postTitle.value == ''){

        e.preventDefault();
        
        postError.style.opacity = 1;
        postError.textContent = 'Укажите заголовок!';

        postTitle.style.boxShadow = '5px 5px 5px red';
    }

    if(postText.value == ''){

        e.preventDefault();
        
        postError.style.opacity = 1;
        postError.textContent = 'Укажите содержание!';

        postText.style.boxShadow = '5px 5px 5px red';
    }
}

postTitle.onclick = (e)=>{
    postTitle.style.boxShadow = 'none';
    postError.style.opacity = 0;
}

postText.onclick = (e)=>{
    postText.style.boxShadow = 'none';
    postError.style.opacity = 0;
}