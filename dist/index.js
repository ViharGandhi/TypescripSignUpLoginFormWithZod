"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./Routes/User"));
const cors_1 = __importDefault(require("cors"));
const Connection_1 = __importDefault(require("./Database/Connection"));
const App_1 = __importDefault(require("./Routes/App"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
const PORT = process.env.PORT;
(0, Connection_1.default)();
app.use("/auth", User_1.default);
app.use("/home", App_1.default);
app.listen(PORT, () => {
    console.log("App running on PORT 3000");
});
