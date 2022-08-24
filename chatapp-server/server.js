const { instrument } = require('@socket.io/admin-ui')
const io = require('socket.io')(5000,{
    cors:{
        origin:['http://localhost:3000', 'https://admin.socket.io/']
    }
})

io.on('connection', socket=>{
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({recipients, text}) =>{
        recipients.map(recipient =>{
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})

instrument(io, {auth: false})
