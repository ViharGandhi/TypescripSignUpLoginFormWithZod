"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Userschema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});
exports.Usermodel = mongoose_1.default.model("Usermodel", Userschema);
