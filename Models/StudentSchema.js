import mongoose, { mongo } from "mongoose";

 const studentSchema=new mongoose .Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    mentorId:{type:mongoose.Schema.Types.ObjectId,ref:"Mentor"}
 })


 const Student=mongoose.model("Student",studentSchema);


export default Student;