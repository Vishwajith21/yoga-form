"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExpiry = void 0;
const calculateExpiry = async (req, res, next) => {
    const currentDate = new Date();
    var calculatedExpireDate;
    if (currentDate.getMonth() == 11) {
        calculatedExpireDate = new Date(currentDate.getFullYear() + 1, 0, 1);
    }
    else {
        calculatedExpireDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }
    req.body['expiresAt'] = calculatedExpireDate;
    return exports.calculateExpiry;
};
exports.calculateExpiry = calculateExpiry;
