import mongoose from "mongoose";

export async function connectDB(uri) {
    if(!uri) throw new Error("MONGO_URI is missing. Check your .evn file");
    await mongoose.connect(uri);
    console.log("MONGODB is connected");
}