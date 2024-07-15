import express from "express";
import { assignToMentor, createMentor, getAllMentor, particularMentor } from "../Controller/MentorController.js";

const router=express.Router();

router.post("/create-mentor",createMentor);
router.get("/get-mentor",getAllMentor);
router.post("/:mentorId/assign-student",assignToMentor)
router.get("/:mentorId/students",particularMentor);


export default router;