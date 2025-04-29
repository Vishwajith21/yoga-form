"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const batch_1 = __importDefault(require("./routes/batch"));
const payment_1 = __importDefault(require("./routes/payment"));
const app = (0, express_1.default)();
const PORT = 3300;
exports.prisma = new client_1.PrismaClient();
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/user', user_1.default);
app.use('/batch', batch_1.default);
app.use('/payment', payment_1.default);
app.listen(PORT, () => {
    console.log(`Yoga server is running on port ${PORT}`);
});
exports.default = exports.prisma;
