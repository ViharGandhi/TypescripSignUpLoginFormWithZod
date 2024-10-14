import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import express, { Router, Request, Response } from "express";
import { Usermodel } from "../Database/Usermodel";
import { z } from "zod";

const router: Router = Router();

const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

type UserStructure = z.infer<typeof userSchema>;

router.post("/signup", (req: Request, res: Response) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            error: result.error.issues.map((issue) => issue.message).join(", ")
        });
        return;
    }

    const { username, password } = result.data;

    Usermodel.create({ username, password })
        .then((User) => {
            res.status(201).json(User);
        })
        .catch((error) => {
            res.status(500).json({
                error: "Something went wrong"
            });
        });
});

router.post("/login", (req: Request, res: Response) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            error: result.error.issues.map((issue) => issue.message).join(", ")
        });
        return;
    }

    const { username, password } = result.data;
    
    Usermodel.findOne({ username: username })
        .then((User) => {
            if (!User) {
                res.status(401).json({
                    error: "User doesn't exist"
                });
                return;
            }
            if (User.password === password) {
                const token = jwt.sign({ id: User._id }, process.env.SECRET_KEY || "Secret", { expiresIn: "1h" });
                res.status(200).json({
                    message: "Logged in Successfully",
                    username: User.username,
                    token: token
                });
            } else {
                res.status(401).json({
                    error: "Username or password don't match"
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "Something went wrong"
            });
        });
});

export default router;