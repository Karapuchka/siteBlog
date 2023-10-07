import mysql from 'mysql2';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

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
        if(err) return res.sendStatus(400);

        if(req.body.login != data[0].login) return res.render('index.hbs', {errorMessange: 'Пользователь не найден!'});

        if(req.body.password != data[0].password) return res.render('index.hbs', {errorMessange: 'Пароль введен неверно!'});

        res.render('home.hbs');
    });
});

app.get('/home', (_, res)=>{
    res.render('home.hbs');
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

app.listen(3000, ()=>{
    console.log('Server active!');
});