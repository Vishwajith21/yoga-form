"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BatchController_1 = require("../controllers/BatchController");
const router = express_1.default.Router();
router.post('/', BatchController_1.createBatch);
router.get('/:id', BatchController_1.getBatch);
router.get('/', BatchController_1.getAllBatches);
router.patch('/:id', BatchController_1.updateBatch);
exports.default = router;
