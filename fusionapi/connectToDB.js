const mongoose = require('mongoose')

const connectToMongoDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    return mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
}

module.exports = {
  connectToMongoDB: connectToMongoDB
}