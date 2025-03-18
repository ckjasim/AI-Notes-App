import express from "express";
import { createUser, getUserData, loginUser} from "../controllers/users.controller";
import {  userValidator } from "../utils/validators";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();


router.post("/",
    userValidator,
    validateRequest, 
    createUser
);
router.post("/login",
    loginUser
);


export {router as authRouter};