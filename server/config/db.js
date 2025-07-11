const mongoose = require('mongoose');
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB Connected successfully');
  } catch (error) {
    console.error('MongoDB  Connection is failed  :', error.message);
    process.exit(1);
  }
};
module.exports =  connectMongo;


