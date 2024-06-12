const express = require('express')
const mysql = require('mysql')
const BodyParser = require('body-parser')

const app =express()

app.use(BodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host: 'localhost', 
    database: 'school', 
    user: 'root', 
    password: '', 
})

db.connect((err) => {
    if (err) throw err;

    console.log('database berhasil connect');
    
    
    // ambil
    app.get('/', (req, res)=>{
        const sql = 'select * from user'
        
        db.query(sql, (err, result) => {
            // res.send(users)
            const users = JSON.parse(JSON.stringify(result))
            res.render("index", {users, title: 'DAFTAR MURID KELAS'},)
        })
    })

    app.post('/tambah', (req, res)=>{
        const sqlInsert = `insert into user (nama, kelas) values ('${req.body.nama}', '${req.body.kelas}')`
        
        // insert
        db.query(sqlInsert, (err, result)=> {
            if (err) {
                console.log('error insert');
                throw err
            }

            res.redirect('/')
        })

        // res.render("index", {users, title: 'DAFTAR MURID KELAS'},)
    })
    // console.log('hasil database -> ', result);

})


app.listen(8000, ()=> {
   console.log('server ready') 
})