const { User, Stats, Notification, Log, Ticket, Candidate } = require('./models.js');
const { connectToMongoDB } = require('./connectToDB.js');

// page stats
async function incrementOnlineUsers() {
  await connectToMongoDB()
  const stats = await Stats.findOneAndUpdate({ name: 'online-users' }, { $inc: { count: 1 } }, { new: true })
  await Stats.findOneAndUpdate({ name: 'total-visits' }, { $inc: { count: 1 } }, { new: true })
  return stats.count.toString()
}
async function decrementOnlineUsers() {
  await connectToMongoDB()
  const stats = await Stats.findOneAndUpdate({ name: 'online-users' }, { $inc: { count: -1 } }, { new: true })
  return stats.count.toString()
}

// public notifications
async function getAllNotifications() {
  await connectToMongoDB();
  const notifications = await Notification.find({ regNum: 'all' });
  return notifications;
}
async function saveNotification(message) {
  await connectToMongoDB();
  const notification = new Notification(message);
  notification.save()
  return notification
}

// user socket - dashboard data
async function savePhoneNumber(regNum, phone) {
  await connectToMongoDB();
  const isSuccess = await User.findOneAndUpdate({ regNum: regNum }, { phone: phone }, { new: false })
  .then((user) => { user.phone = phone; return true })
  .catch(() =>{ return false })
}
async function saveSlots(regNum, slots) {
  await connectToMongoDB();
  const isSuccess = await User.findOneAndUpdate({ regNum: regNum }, { slots: slots }, { new: false })
  .then((user) => { user.slots = slots; return true })
  .catch(() =>{ return false })
}
async function getPhoneNumber(regNum) {
  await connectToMongoDB();
  const user = await User.findOne({ regNum: regNum });
  return user.phone;
}
async function getSlots(regNum) {
  await connectToMongoDB();
  const user = await User.findOne({ regNum: regNum });
  return user.slots;
}
async function getUserMessages(regNum) {
  await connectToMongoDB();
  const notifications = await Notification.find({ regNum: regNum, isRead: false });
  return notifications;
}
async function markMessageRead(regNum, message) {
  await connectToMongoDB();
  if(message === 'all') {
    await Notification.updateMany({ regNum: regNum }, { isRead: true })
  }
  else {
    await Notification.updateOne(message, { isRead: true })
  }
}

// admin socket
async function log(regNum='undefined', action, level, role='star') {
  await connectToMongoDB();
  const log = new Log({ action: action, role: role, regNum: regNum, level: level, timestamp: (new Date().getTime()) });
  log.save()
}
async function getLogs() {
  await connectToMongoDB();
  const logs = await Log.find({}).sort({ timestamp: -1 }).limit(50);
  return logs;
}
async function getTickets(regNum) {
  await connectToMongoDB();
  const tickets = await Ticket.find({ members: regNum });
  return tickets
}
async function searchLogs(regNums, roles, levels, actions, from, to) {
  let query = { 
    regNum: { $in: regNums }, 
    role: { $in: roles }, 
    level: { $in: levels }, 
    action: { $regex: actions }, 
    timestamp: { $gte: from, $lte: to },
  }

  if(regNums.length === 0) delete query.regNum
  if(roles.length === 0) delete query.role
  if(levels.length === 0) delete query.level
  if(actions.length === 0) delete query.action
  if(!from) delete query.timestamp.$gte
  if(!to) delete query.timestamp.$lte
  if(!from && !to) delete query.timestamp

  await connectToMongoDB();
  const logs = await Log.find(query).sort({ timestamp: -1 }).limit(100);
  return logs;
}
async function suggestPowerSearch(field, value) {
  await connectToMongoDB();
  const query = {
    [field]: { $regex: value, $options: 'i' }
  }
  const results = await User.find(query).limit(20);
  return results;
}
async function updateTeams(regNum, teams) {
  await connectToMongoDB();
  try {
    const candidate = await Candidate.findOneAndUpdate({ regNum: regNum }, { teams: teams }, { new: false })
    if(candidate.teams = teams) return true
    else return false
  }
  catch(error) {
    console.log(error)
    return false
  }
}
async function updateQuiz(regNum, responses) {
  await connectToMongoDB();
  try {
    const candidate = await Candidate.findOneAndUpdate({ regNum: regNum }, { $set: { "responses.personality": responses } }, { new: false })
    if(candidate.responses.personality = responses) return true
    else return false
  }
  catch(error) {
    console.log(error)
    return false
  }
}

// use this as a menu card
module.exports = {
  incrementOnlineUsers,
  decrementOnlineUsers,
  getAllNotifications,
  saveNotification,
  savePhoneNumber,
  getPhoneNumber,
  getSlots,
  saveSlots,
  getUserMessages,
  markMessageRead,
  log,
  getLogs,
  getTickets,
  searchLogs,
  suggestPowerSearch,
  updateTeams,
  updateQuiz,
}