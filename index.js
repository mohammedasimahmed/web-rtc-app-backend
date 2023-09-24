require("dotenv").config();
const express = require("express")
const cors = require("cors")
const http = require("http")
const app = express()
const server = http.createServer(app)

app.use(cors())

const io = require("socket.io")(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})

io.on("connection",(socket)=>{
    console.log("Connected with client")

})

server.listen(5000,()=>console.log("Server started at port 5000"))