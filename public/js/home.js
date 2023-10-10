const listPost = document.getElementById('list-post');
const listTags = document.getElementById('post-tags-list');

let oldPostList = [];

for (let i = 0; i < listPost.children.length; i++) {
    oldPostList.push(listPost.children[i])
}

listTags.onclick = (e)=>{

    repeatList(oldPostList, listPost, false);

    let newList = [];

    for (let i = 0; i < listPost.children.length; i++) {
        newList.push(listPost.children[i])
    }


    switch (e.target.id) {
        case "post-tag-motivation":
            listPost.innerHTML = '';
            repeatList(newList, listPost, 'Мотивация');
            break;

        case "post-tag-travel":
            listPost.innerHTML = '';
            repeatList(newList, listPost, 'Путешествие');
            break;

        case "post-tag-finance":
            listPost.innerHTML = '';
            repeatList(newList, listPost, 'Финансы');
            break;

        case "post-tag-it":
            listPost.innerHTML = '';
            repeatList(newList, listPost, 'IT');
            break;

        case "post-tag-policy":
            listPost.innerHTML = '';
            repeatList(newList, listPost, 'Политика');
            break;

        case "post-tag-Repair":
            listPost.innerHTML = '';
            repeatList(newList, listPost, 'Ремонт');
            break;

        case "post-tag-Hobby":
            listPost.innerHTML = '';
            repeatList(newList, listPost, 'Хобби');
            break;

        case "post-tag-about":
            listPost.innerHTML = '';
            repeatList(newList, listPost, 'О всяком');
            break;
        
        case "post-tag-reset":
            listPost.innerHTML = '';
            repeatList(oldPostList, listPost, false);
            break;
    }
}

function repeatList(newArr, oldArr, index){
    if(!index){
        for (let i = 0; i < newArr.length; i++) {
            oldArr.innerHTML += `<li class="post__main__list__item">${newArr[i].innerHTML}</li>`;
        }
    } else {
        for (let i = 0; i < newArr.length; i++) {
            if(index == newArr[i].children[0].children[2].children[0].innerText) {
                oldArr.innerHTML += `<li class="post__main__list__item">${newArr[i].innerHTML}</li>`;
            }
        }
    }
}
