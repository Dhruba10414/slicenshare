const mongoose = require('mongoose')
const db_url = process.env.DATABASE_REMOTE;

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(db_url, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error("Error in Connecting the Database",error.message);
      process.exit(1);
    }
  }

  module.exports = connectDB;