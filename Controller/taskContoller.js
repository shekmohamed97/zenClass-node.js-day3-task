
import Student from "../Models/StudentSchema.js";
import Mentor from "../Models/MentorSchema.js";


//Create A Student
export const createStudent=async(req,res)=>{
    try {
        const {firstName,lastName,email,phone}=req.body;
        const student=new Student({
                    firstName,
                    lastName,
                    email,
                    phone
        });
        await student.save();
        res.status(201).json({message:"student creating successfully !",student});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//get All Student
export const getAllStudent=async(req,res)=>{
   try {
    const student=await Student.find();
    res.json(student);
   } catch (error) {
    res.status(500).json({error:error.message})
   }
}

// API to assign or change mentor for a particular student:

export const mentorToParticulorStudent=async(req,res)=>{
    try {
        const {studentId} =req.params;
        const {mentorId}=req.body;

        const student= await Student.findById(studentId);
        if(!student){
            return res.status(404).json({error:"Student not found"});
        }

        const mentor= await Mentor.findById(mentorId);
        if(!mentor){
            return res.status(404).json({error:"Mentor is not found"});
        }

        student.mentorId=mentorId;
        await student.save();

        res.json({
            message:"Mentor assigned to student successfully !",studentId,mentorId
        });
    } catch (error) {
        res.status(500).json({error:error.message});
    }
} ;


//API to show the previously assigned mentor for a particular student

export const particularStudent=async(req,res)=>{
    try {
        const {studentId}= req.params;

        const student=await Student.findById(studentId).populate("mentorId");
        if( !student){
            return res.status(404).json({
                error:"Student not found"
            })
        }
        if(student.mentorId){
            res.json({studentId,mentorId:student.mentorId._id,mentorName:student.mentorId.name});
        }else{
            res.json({message:"No mentor assigned to the student"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


