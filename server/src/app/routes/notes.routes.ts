import express from "express";
import { createUser, getUserData, loginUser} from "../controllers/users.controller";
import {  userValidator } from "../utils/validators";
import { validateRequest } from "../middlewares/validate-request";
import { deleteNote, fetchNotes, saveNotes, updateNote, updatePosition } from "../controllers/notes.controller";

const router = express.Router();


router.post("/",
    saveNotes
);
router.get("/:id",
    fetchNotes 
);
router.put("/:id/position",
    updatePosition
);
router.put("/:id",
    updateNote
);
router.delete("/:id",
    deleteNote
);


export {router as notesRouter};