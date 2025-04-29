"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserValidations_1 = __importDefault(require("../middleware/user/UserValidations"));
const UserController_1 = require("../controllers/UserController");
const PaymentController_1 = require("../controllers/PaymentController");
const router = express_1.default.Router();
router.post('/', [UserValidations_1.default], UserController_1.createUser);
router.get('/:id', UserController_1.getUser);
router.get('/', UserController_1.getAllUsers);
router.patch('/:id', UserController_1.updateUser);
router.delete('/:id', UserController_1.deleteUser, PaymentController_1.deletePayment);
exports.default = router;
