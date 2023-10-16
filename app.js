import mysql from 'mysql2';
import express, { query } from 'express';
import fs from 'fs';
import path from 'path';
import { isNull } from 'util';

const app = express();

let userInfo ={
    id: '',
    lastName: '',
    firstName: '',
    login: '',
    password: '',
}

let idUpdatePost = 0;

let usersList = [];

let listPost = [];

app.use(express.static(path.join(fs.realpathSync('.'), '/public')));

const urlcodedParser = express.urlencoded({extended: false});

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'siteblog',
});

app.set('view engine', 'hbs');

app.get('/', (_, res)=>{
    res.render('index.hbs')
});

app.post('/home', urlcodedParser, (req, res)=>{
    if(!req.body) return res.statusCode(400);

    pool.query('SELECT * FROM users', (err, data)=>{
        if(err) return console.log(err);

        usersList = data;
    });

    pool.query('SELECT * FROM users', (err, data)=>{
        if(err) return console.log(err);

        let valid = true;

        for (let i = 0; i < data.length; i++) {
            if(req.body.login == data[i].login){

                valid = true;

                break;

            } else {

                valid = false;

            }
        }
                
        if(!valid) return res.render('index.hbs', {errorMessange: 'Пользователь не найден!'});

        for (let i = 0; i < data.length; i++) {
            if(req.body.password == data[i].password){

                valid = true;

                userInfo.id = data[i].id;
                userInfo.login = data[i].login;
                userInfo.password = data[i].password;
                userInfo.lastName = data[i].lastName;
                userInfo.firstName = data[i].firstName;

                break;

            } else {
                valid = false;
            }
        }

        if(!valid) return res.render('index.hbs', {errorMessange: 'Пароль введен неверно!'});

        pool.query('SELECT * FROM post', (err, data)=>{
            if(err) return console.log(err);
    
            listPost = data;
    
            let infoAll = unionData(usersList, listPost);
            res.render('home.hbs', {
                info: infoAll,
            });
        });
    });
});

app.get('/home', (req, res)=>{

    pool.query('SELECT * FROM users', (err, data)=>{
        if(err) return console.log(err);

        usersList = data;
    })

    pool.query('SELECT * FROM post', (err, data)=>{
        if(err) return console.log(err);

        listPost = data;
        let infoAll = unionData(usersList, listPost);
        res.render('home.hbs', {
            info: infoAll,
        });
    });

   
});

app.get('/registration', (req, res)=>{
    res.render('registration.hbs');
});

app.post('/registration', urlcodedParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    pool.query('SELECT * FROM users', (err, data)=>{

        let valid = true;
        
        for (let i = 0; i < data.length; i++) {
            if(req.body.login == data[i].login){
                valid = false;
                break;
            }
        }

        if(valid){
            pool.query('INSERT INTO users (login, password, firstName, lastName) VALUES (?,?,?,?)', [req.body.login, req.body.password, req.body.firstName, req.body.lastName], (err, data)=> {
                if(err) return console.log(err);
                res.redirect('/');
            });
        } else {
            res.render('registration.hbs', {errorMessange: 'Логин занят!'});
        }
    });
});

app.get('/post', (req, res)=>{
    res.render('post.hbs');
});

app.post('/setpost', urlcodedParser, (req, res)=>{
    if(!req.body) return res.statusCode(400);

    pool.query('INSERT INTO post (idUser, title, text, tag) VALUES(?,?,?,?)', [userInfo.id, req.body.postTitle, req.body.postText, req.body.postTag], (err, data)=>{
        if(err) return console.log(err);
        res.redirect('/home');     
    });
});

app.use('/profile', (req, res)=>{

    let userPost = [];

    pool.query('SELECT * FROM post', (err, data)=>{

        for (let i = 0; i < data.length; i++) {
            if(data[i].idUser == userInfo.id) userPost.push(data[i]);
        }

        res.render('profile', {
            lastName: userInfo.lastName,
            firstName: userInfo.firstName,
            login: userInfo.login,
            password: userInfo.password,
            post: userPost,
        });
    });
});

app.post('/delpost/:id', urlcodedParser, (req, res)=>{
    pool.query('DELETE FROM post WHERE id=?', [req.params.id], (err, data)=>{
        if(err) return console.log(err);

        res.redirect('/profile')
    });
});

app.post('/updatepost/:id', urlcodedParser, (req, res)=>{
    pool.query('SELECT * FROM post WHERE id=?', [req.params.id], (err, data)=>{
        if(err) return console.log(err);

        idUpdatePost = req.params.id;

        res.render('upPost.hbs', {
            title: data[0].title,
            text: data[0].text,
        })
    })
});

app.post('/uppost', urlcodedParser, (req, res)=>{
    if(!req.body) return res.statusCode(400);

    pool.query('UPDATE post SET text=?, title=?, tag=? WHERE id=?', [req.body.postText, req.body.postTitle, req.body.postTag, idUpdatePost],(err, data)=>{
        if(err) return console.log(err);

        res.redirect('/profile');
    })
});

app.listen(3000, ()=>{
    console.log('Server active! URL: http://localhost:3000/');
});

function unionData(users, posts){
    let result = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < posts.length; j++) {
            if(users[i].id == posts[j].idUser){
                let obj = {
                    lastName: users[i].lastName,
                    firstName: users[i].firstName,
                    title: posts[j].title,
                    id: posts[j].id,
                    text: posts[j].text,
                    tag: posts[j].tag,
                }
                result.push(obj);

            }            
        }        
    }

    return result;
}


// Подписка
// Редактирование/удаление поста
// Выдача на основе подписки