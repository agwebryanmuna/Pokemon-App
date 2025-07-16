import mongoose, { Mongoose } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn?: Mongoose | null;
  promise?: Promise<Mongoose> | null;
}

// @ts-expect-error: allow global mongoose cache
const cached: MongooseCache = global.mongoose || {};

async function dbConnect() {
  try {
    if (cached.conn) return cached.conn;
    
    if (!cached.promise) {
      
      if (!MONGODB_URI) {
        throw new Error(
          'Please define the MONGODB_URI environment variable inside .env.local',
        );
      }
      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      }).then((mongoose) => {
        console.log('Database connected successfully 🎉');
        return mongoose
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.log('Problem connecting to MongoDB:', error);
  }
}

export default dbConnect;
