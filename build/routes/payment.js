"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaymentController_1 = require("../controllers/PaymentController");
const CheckBatchAndPrice_1 = require("../middleware/payment/CheckBatchAndPrice");
const MakePayment_1 = require("../middleware/payment/MakePayment");
const CheckExistingUser_1 = require("../middleware/payment/CheckExistingUser");
const router = express_1.default.Router();
router.post('/', [CheckExistingUser_1.CheckExistingUser, CheckBatchAndPrice_1.CheckBatchAndPrice, MakePayment_1.MakePayment], PaymentController_1.createPayment);
router.get('/:id', PaymentController_1.getPayment);
router.get('/', PaymentController_1.getAllPayments);
router.patch('/:id', [CheckBatchAndPrice_1.CheckBatchAndPrice], PaymentController_1.updatePayment);
router.delete('/:id', PaymentController_1.deletePayment);
exports.default = router;
