const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_KEY = process.env['JWT_SECRET']
const utilities = require('./utilities.js')

// set up the server
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  wsEngine: require("eiows").Server,
  perMessageDeflate: {
    threshold: 32768
  },
  cors: {
    origin: 'https://thefusionclub.in',
  }
});
httpServer.listen(4000)

// define namespaces
const defaultNamespace = io.of('/')
const userNamespace = io.of('/user');
const adminNamespace = io.of('/admin');

// use default namespace for notifications and stats
defaultNamespace.on('connection', (socket) => {

  // increment and send online users count
  utilities.incrementOnlineUsers()
    .then((count) => defaultNamespace.emit('online-count', count))

  // send old public notifications
  utilities.getAllNotifications()
    .then((notifications) => socket.emit('old-public-notifications', notifications))

  // decrement and send online users count
  socket.on('disconnect', () => {
    utilities.decrementOnlineUsers()
      .then((count) => defaultNamespace.emit('online-count', count))
  });
});

// user authentication middleware
userNamespace.use((socket, next) => {
  try {
    // verify jwt
    const user = jwt.verify(socket.handshake.auth.token, JWT_KEY)
    // check if jwt is from registered user
    if (user.regNum) {
      socket.regNum = user.regNum
      socket.role = 'user'
      utilities.log(socket.regNum, 'access', 'info', 'user')
      next()
    }
    // jwt not from registered user
    else {
      utilities.log(socket.handshake.headers['x-forwarded-for'], 'valid jwt invalid regnum', 'error', 'user')
      next(new Error('Unauthorized'))
    }
  }
  catch (e) {
    // log access attempt
    utilities.log(socket.handshake.headers['x-forwarded-for'], 'invalid jwt', 'error', 'user')
    next(new Error('Unauthorized'))
  }
})
// user namespace listeners
userNamespace.on('connection', (socket) => {
  // user connected
  socket.join(socket.regNum)

  // user sends phone number
  socket.on('update-phone', (phone) => {
    utilities.savePhoneNumber(socket.regNum, phone)
      .then(() => userNamespace.to(socket.regNum).emit('update-phone-success', phone))
      .then(() => utilities.log(socket.regNum, 'phone updated', 'info', 'user'))
      .catch(() => socket.emit('update-phone-failure'))
  })
  // user requests phone number
  socket.on('get-phone', () => {
    utilities.getPhoneNumber(socket.regNum)
      .then((phone) => socket.emit('get-phone-success', phone))
  })
  // user requests tickets
  socket.on('get-tickets', () => {
    utilities.getTickets(socket.regNum)
      .then((tickets) => socket.emit('get-tickets-success', tickets))
  })
  // user requests slots
  socket.on('get-slots', () => {
    utilities.getSlots(socket.regNum)
      .then((slots) => socket.emit('get-slots-success', slots))
  })
  // user updates slots
  socket.on('update-slots', (slots) => {
    utilities.saveSlots(socket.regNum, slots)
      .then(() => socket.emit('update-slots-success', slots))
      .then(() => utilities.log(socket.regNum, 'slots updated', 'info', 'user'))
      .catch(() => socket.emit('update-slots-failure'))
  })
  // user requests messages
  socket.on('get-user-messages', () => {
    utilities.getUserMessages(socket.regNum)
      .then((messages) => socket.emit('get-user-messages-success', messages))
      .catch((error) => socket.emit('get-user-messages-failure', error))
  })
  // user updates messages
  socket.on('mark-as-read', (message) => {
    utilities.markMessageRead(socket.regNum, message)
  })
  socket.on('mark-all-as-read', () => {
    utilities.markMessageRead(socket.regNum, 'all')
  })
  // update candidate teams
  socket.on('update-candidate-teams', (teams) => {
    utilities.updateTeams(socket.regNum, teams)
      .then((success) => { 
        if(success) socket.emit('update-teams-success')
        else throw new Error('update teams failed')
      })
      .then(() => utilities.log(socket.regNum, 'candidate teams updated', 'info', 'user'))
      .catch((error) => socket.emit('update-teams-error'))
  })
  // update candidate quiz
  socket.on('update-candidate-quiz', (quiz) => {
    utilities.updateQuiz(socket.regNum, quiz)
      .then((success) => { 
        if(success) socket.emit('update-quiz-success')
        else throw new Error('update quiz failed')
      })
      .then(() => utilities.log(socket.regNum, 'candidate quiz updated', 'info', 'user'))
      .catch((error) => socket.emit('update-quiz-error'))
  })
  // user disconnected
  socket.on('disconnect', () => {
    utilities.log(socket.regNum, 'disconnected', 'info', 'user')
  });
});

// admin authentication middleware
adminNamespace.use((socket, next) => {
  const adminRoles = ['core', 'lead', 'star']
  try {
    // verify jwt
    const user = jwt.verify(socket.handshake.auth.token, JWT_KEY)
    // check if jwt is from admin
    if(!user.regNum) throw new Error('Unauthorised')
    if (adminRoles.includes(user.role)) {
      // log admin access
      utilities.log(user.regNum, 'privileged access', 'warn', user.role)
      // associate regnum and role with socket to track each action
      socket.regNum = user.regNum
      socket.role = user.role
      next()
    }
    else {
      // log failed access attempt
      utilities.log(user.regNum, 'valid jwt invalid role', 'warn', 'star')
      next(new Error('Unauthorised'))
    }
  }
  catch (e) {
    // log failed access attempt
    utilities.log(socket.handshake.headers['x-forwarded-for'], 'invalid jwt', 'error', 'star')
    next(new Error('Unauthorised'))
  }
})
// admin namespace listeners
adminNamespace.on('connection', (socket) => {
  // admin connected
  socket.join(socket.regNum)
  // admin sends notification
  socket.on('send-notification', async (title, message, regNum) => {
    utilities.log(socket.regNum, `sent notification to ${regNum}`, 'info', socket.role)
    const notification = {
      title: title,
      message: message,
      regNum: regNum,
      sender: socket.regNum,
      date: new Date(),
    }
    const savedNotification = await utilities.saveNotification(notification)
    if (savedNotification) {
      if (regNum === 'all') defaultNamespace.emit('new-public-notification', savedNotification);
      else userNamespace.to(regNum).emit('new-private-notification', savedNotification);
      socket.emit('send-notification-success')
    }
    else {
      socket.emit('send-notification-failure')
      utilities.log(socket.regNum, `attempted notification to ${regNum}`, 'info', socket.role)
      utilities.log(socket.regNum, `notification failed`, 'error', socket.role)
    }
  })
  // admin requests logs
  socket.on('get-logs', () => {
    utilities.getLogs()
      .then((logs) => {
        socket.emit('get-logs-success', logs)
        utilities.log(socket.regNum, `retrieved logs`, 'info', socket.role)
      })
      .catch((error) => {
        socket.emit('get-logs-failure', error)
        utilities.log(socket.regNum, `retrieve logs failed`, 'error', socket.role)
      })
  })
  // admin searches logs
  socket.on('search-logs', (regNums, roles, levels, actions, from, to) => {
    utilities.searchLogs(regNums, roles, levels, actions, from, to)
      .then((logs) => {
        socket.emit('search-logs-success', logs)
        utilities.log(socket.regNum, `searched logs`, 'info', socket.role)
      })
      .catch((error) => {
        utilities.log(socket.regNum, `search logs failed`, 'error', socket.role)
        console.log(error)
      })
  })
  // admin searcher for users
  socket.on('suggest-power-search', (field, value) => {
    utilities.suggestPowerSearch(field, value)
      .then((results) => {
        socket.emit('power-search-suggestions', results)
      })
      .catch((error) => {
        console.log(error)
      })
  })
  // admin requests users tickets
  socket.on('get-user-tickets', (regNum) => {
    utilities.getTickets(regNum)
      .then((tickets) => {
        socket.emit('get-user-tickets-success', tickets)
        utilities.log(socket.regNum, `retrieved tickets of ${regNum}`, 'info', socket.role)
      })
      .catch((error) => {
        socket.emit('get-user-tickets-failure', error)
        utilities.log(socket.regNum, `retrieve tickets of ${regNum} failed`, 'error', socket.role)
      })
  })
  // admin disconnected
  socket.on('disconnect', () => {
    utilities.log(socket.regNum, `disconnected`, 'info', socket.role)
  })
});

