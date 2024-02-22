const socketIOClient = require('socket.io-client');
const io = socketIOClient;

const CONN_LIMIT = 20000
const CONN_DELAY = 10
const messages = []
const sockets = []

const test = async () => {
    let i = 1
    setInterval(async () => {
        if (i > CONN_LIMIT) {
            console.log('limit reached')
            return
        }
        const socket = await io('http://localhost:4000', { 
            reconnectionDelayMax: 5000, 
            autoConnect: true,
            transports: ['websocket', 'polling'],
            forceNew: true,
        })
        socket.on('connect', () => {
            sockets.push(socket)     
        })
        socket.on('new-public-notification', () => {
            console.log(i, 'notification')
        })
    }, CONN_DELAY);
    setInterval(() => {
        console.log('connected - ', sockets.length)
    }, 1000);
}

test()