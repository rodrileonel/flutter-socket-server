const express = require('express');

const path = require('path');
require('dotenv').config();

//App de Express
const app = express();

//Node server (socket)
const server = require('http').createServer(app);
//const io = require('socket.io')(server);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//path publico
const public = path.resolve(__dirname,'public');
app.use(express.static(public));

//app.listen(process.env.PORT,(err)=>{
server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err);
    console.log('Servidor corriendo en puerto',process.env.PORT);
});