const express = require('express');
const bodyParser = require('body-parser');
const MySql = require('mysql');
const app = express();
app.use(bodyParser.urlencoded({}))

const pool = MySql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'item',
    port:3306
})

app.use('/sel',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log(req.body.state)
        connection.query(`select * from list where state='${req.body.state}'`,(err,data) => {
            if(err) throw err 
            res.send(data)
            connection.release()           
    })
 })
   
})


app.use('/del',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection((err,connection) => {
        if(err) throw err;
        // console.log(req.body.state)
        connection.query(`DELETE FROM list WHERE id='${req.body.state}'`,(err) => {
            if(err) throw err 
            res.send()
            connection.release()           
    })
 })
   
})


app.use('/add',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query(`INSERT INTO list (class,name,state) VALUES ('${req.body.class}','${req.body.name}',2)`,(err,rows) => {
            if(err) throw err;
            connection.release()           
    })
 })
   
})


app.use('/gai',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query(`UPDATE list SET state='${req.body.state}' WHERE id='${req.body.id}'`,(err,rows) => {
            if(err) throw err;
            res.send(rows)
            connection.release()           
    })
 })
   
})
//注册
app.use('/sign',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query(`SELECT * FROM login  WHERE user='${req.body.user}'`,(err,rows) => {
            if(err) throw err;
            if(rows.length == 0){
                connection.query(`INSERT INTO login (user,pass,status) VALUES ('${req.body.user}','${req.body.pass}','1')`,(err,rows)=>{
                    if(err) throw err;
                    connection.query('SELECT * FROM login',(err,rows)=>{
                        if(err) throw err;
                       res.send('注册成功');
                       connection.release();
                    })
                })
            }else{
                res.send('账号已经注册')
                connection.release()  
            }
                     
    })
 })
   
})



//登陆

app.use('/login',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(`SELECT * FROM login WHERE user='${req.body.user}' AND pass='${req.body.pass}'`,(err,rows)=>{
            if(err) throw err;
            if(rows.length != 0 ){
                res.send('登录成功');
                connection.release();
            }else{
                res.send('账号密码错误');
                connection.release();
            }
        })
    })
   
})










app.listen(8000,()=>{
	console.log('ok')
});

