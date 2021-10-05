// importing mongoose for conecting database
import mongoose from 'mongoose';

// option will pass while connecting with mongodb
const connOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

// getting mongo uri form the environment variable
const MONGO_URI = process.env.MONGO_URI || ''
// function to connect with mongo-database
const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI, connOptions);
    if (connect) console.log("Mongodb successfully connected! ");
  } catch (err) {
    console.log(`Database error ${err}`);
  }
};


export default connectToDB ;
