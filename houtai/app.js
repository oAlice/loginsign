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
        connection.query(`INSERT INTO list (class,name,state) VALUES ('${req.body.class}','${req.body.name}',1)`,(err,rows) => {
            if(err) throw err;
            connection.release()           
    })
 })
   
})


app.use('/gai',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log(req.body.id)
        connection.query(`UPDATE list SET state='${req.body.state}' WHERE id='${req.body.id}'`,(err,rows) => {
            if(err) throw err;
            res.send(rows)
            connection.release()           
    })
 })
   
})


app.listen(8000,()=>{
	console.log('ok')
});

