import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
        // dbName:"MRSHEK97 > MENTOR_STUDENT_TASK"
    }).then(()=>{
        console.log("conected to the database");
    }).catch((err)=>{
        console.log(`can't connected to the database ${err}`);
    })
}