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

    pool.query('SELECT * FROM users', [req.body.login], (err, data)=>{
        if(err) return res.sendStatus(400);

        if(req.body.login != data[0].login) return res.render('index.hbs', {errorMessange: 'Пользователь не найден!'});

        if(req.body.password != data[0].password) return res.render('index.hbs', {errorMessange: 'Пароль введен неверно!'})

        res.render('home.hbs');
    })
})

app.get('/home', (_, res)=>{
    res.render('home.hbs')
});


app.listen(3000, ()=>{
    console.log('Server active!');
});