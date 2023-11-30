import io from 'socket.io-client' 
const socket = io('ws://localhost:4000')
socket.on('receiveMsg',function(data){
    console.log('client receive message from server',  data)
})
socket.emit('sendMsg',{name: 'Tom', data: Date.now()})
console.log('send message to server',{name: 'Tom', data: Date.now()})