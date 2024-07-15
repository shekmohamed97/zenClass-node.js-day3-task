import Mentor from "../Models/MentorSchema.js";
import Student from "../Models/StudentSchema.js";


export const createMentor=async(req,res)=>{
    try {
         const{firstName,lastName,email,phone}=req.body;
         const mentor=new Mentor({
            firstName,
            lastName,
            email,
            phone
         });
         await mentor.save();       
         res.status(201).json({message:"Mentor created successfully !", mentor});
        } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const getAllMentor=async(req,res)=>{
    try {
        const mentor= await Mentor.find();
        res.json(mentor)
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//API to assign multiple student to a mentor
export const assignToMentor=async(req,res)=>{
    try {
        const{mentorId}=req.params;
        const{studentId}=req.body;

        const mentor=await Mentor.findById(mentorId);
        if(!mentor){
            return res.status(404).json({error:"Mentor not Found"});
        }

       const assignedStudents=[];
       for(const studentIds of studentId){
        const student=await Student.findById(studentIds);
        if(student&& ! student.mentorId){
            student.mentorId=mentorId;
            await student.save();
            assignedStudents.push(studentId);
        }
       } 
       res.json({message:"Student assigned to mentor Successfullt",studentId,mentorId});
    }catch(error){
        res.status(500).json({error:error.message});
    }}



export const particularMentor=async(req,res)=>{
    try {
        const {mentorId} =req.params;

        const mentor=await Mentor.findById(mentorId);
        if(!mentor){
            return res.status(404).json({
                error:"Mentor not Found"
            });
        }

        const students=await Student.find({mentorId});
        res.json({mentorId,students});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

