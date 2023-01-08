import mongoose from "mongoose";

export default mongoose.connect(
  "mongodb+srv://Rama:Rama@cluster0.o03sdpa.mongodb.net/Coin?retryWrites=true&w=majority"
);
//mongodb+srv://Rama:Rama@cluster0.o03sdpa.mongodb.net/Coin?retryWrites=true&w=majority
mongoose.connection.on("connected", () => {
  console.log("Connected to Database Successfully,");
});

mongoose.connection.on("error", (err) => {
  console.log("Error while connection to database:" + err);
});

mongoose.connection.on("disconnected", (err) => {
  console.log("Mongodb Connection Disconnected");
});
