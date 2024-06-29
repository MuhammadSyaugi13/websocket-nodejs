const express = require('express')
const mysql = require('mysql')
const BodyParser = require('body-parser')
const {Server} = require("socket.io")
const cors = require('cors')

const app =express()

const http = require("http")
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(BodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", "views")


app.get('/', (req, res)=>{
    res.status(200).json({
        "status": "success",
        "data": "berhasil gaes"
    })
})

app.get('/chat', (req, res)=>{
    res.render("chat", {title: "masuk forum"})
})


io.on('connection', (socket)=>{
    socket.on("message", (data) => {
        console.log('data -> ', data)
        socket.broadcast.emit("message", data)
    })
})

server.listen(8000, ()=> {
   console.log('server ready') 
})



// const db = mysql.createConnection({
//     host: 'localhost', 
//     database: 'school', 
//     user: 'root', 
//     password: '', 
// })

// db.connect((err) => {
//     if (err) throw err;

//     console.log('database berhasil connect');
    
    
//     // ambil
//     app.get('/', (req, res)=>{
//         const sql = 'select * from user'
        
//         db.query(sql, (err, result) => {
//             // res.send(users)
//             const users = JSON.parse(JSON.stringify(result))
//             res.render("index", {users, title: 'DAFTAR MURID KELAS'},)
//         })
//     })
    
//     app.post('/tambah', (req, res)=>{
//         const sqlInsert = `insert into user (nama, kelas) values ('${req.body.nama}', '${req.body.kelas}')`
        
//         // insert
//         db.query(sqlInsert, (err, result)=> {
//             if (err) {
//                 console.log('error insert');
//                 throw err
//             }

//             res.redirect('/')
//         })

//         // res.render("index", {users, title: 'DAFTAR MURID KELAS'},)
//     })
//     // console.log('hasil database -> ', result);

// })