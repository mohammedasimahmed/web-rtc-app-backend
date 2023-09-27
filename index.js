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

const socketToRooms = new Map()

io.on("connection",(socket)=>{
    console.log("Connected with client")
    socket.on("join_room",(room)=>{
        socket.join(room)
        socketToRooms.set(socket.id,room)
        socket.to(room).emit("new_user",socket.id)
        console.log("joined room "+room)
    })
    socket.on("leave_room",(room)=>{
        socket.leave(room)
        socket.to(socketToRooms.get(socket.id)).emit("user_left",socket.id)
        socketToRooms.delete(socket.id)
    })
    socket.on("disconnect", () => {
        console.log(socket.id + " left");     
        socket.to(socketToRooms.get(socket.id)).emit("user_left",socket.id)
        socketToRooms.delete(socket.id)
    });
})

server.listen(5000,()=>console.log("Server started at port 5000"))