import express from "express"
import {  createStudent, getAllStudent, mentorToParticulorStudent, particularStudent } from "../Controller/taskContoller.js";

const router=express.Router();

router. post("/create-student",createStudent);
router.get("/get-student",getAllStudent);
router.post("/:studentId/assign_mentor",mentorToParticulorStudent);
router.get("/:studentId/previous_mentor",particularStudent)

export default router