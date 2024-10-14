"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const Usermodel_1 = require("../Database/Usermodel");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const userSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "Username must be at least 3 characters long"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
});
router.post("/signup", (req, res) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: result.error.issues.map((issue) => issue.message).join(", ")
        });
        return;
    }
    const { username, password } = result.data;
    Usermodel_1.Usermodel.create({ username, password })
        .then((User) => {
        res.status(201).json(User);
    })
        .catch((error) => {
        res.status(500).json({
            error: "Something went wrong"
        });
    });
});
router.post("/login", (req, res) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: result.error.issues.map((issue) => issue.message).join(", ")
        });
        return;
    }
    const { username, password } = result.data;
    Usermodel_1.Usermodel.findOne({ username: username })
        .then((User) => {
        if (!User) {
            res.status(401).json({
                error: "User doesn't exist"
            });
            return;
        }
        if (User.password === password) {
            const token = jsonwebtoken_1.default.sign({ id: User._id }, process.env.SECRET_KEY || "Secret", { expiresIn: "1h" });
            res.status(200).json({
                message: "Logged in Successfully",
                username: User.username,
                token: token
            });
        }
        else {
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
exports.default = router;
