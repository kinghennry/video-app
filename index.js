// require imports
const express = require("express")
const http = require("http")
const cors = require("cors")
const socketio = require("socket.io")

// app config
const app = express()
const server = http.createServer(app)
const io = socketio(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }
})
const port=process.env.PORT || 5000

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// api routes

app.get("/",(req,res) =>{
  res.send("my app is running")
})

// sockets are used for real time connection. like audio,videos and messages.

// the code to connect to the socket
io.on('connection', (socket) => {
  // the first thing to do is to emit a "me" message and pass d socket.id-this is going to give us our own id on the frontend.
  socket.emit("me",socket.id)
  // on disconnect to end the call
  socket.on("disconnect",() =>{
    socket.broadcast.emit("callended")
  })

  //call user
  socket.on("calluser",({userToCall,signalData,from,name}) =>{
    io.to(userToCall).emit("calluser",{signal:signalData,from,name})
  })

  //answer call

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted",data.signal)
  })
})

server.listen(port, () => console.log(`listening on local host:${port}`));

