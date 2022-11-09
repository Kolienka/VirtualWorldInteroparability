const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);


const PORT = 3000;

app.get('/', (req,res) => {
    res.send('<h1> Hello world </h1>');
});

io.on('conenction', socket => {
    console.log('client connected')
});

server.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`)
});