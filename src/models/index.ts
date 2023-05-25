import mongoose from "mongoose"

export {User} from "./user"

export async function dbConnect() {
  await mongoose.connect("mongodb://127.0.0.1:27017", {
    user: "wtssr",
    pass: "mongopass",
    dbName: "wtssr",
  })
}