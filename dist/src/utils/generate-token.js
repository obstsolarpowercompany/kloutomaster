"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSixDigitToken = generateSixDigitToken;
const crypto = require("crypto");
function generateSixDigitToken() {
    const min = 100000;
    const max = 999999;
    const range = max - min + 1;
    const randomNumber = (crypto.randomBytes(3).readUIntBE(0, 3) % range) + min;
    return randomNumber.toString();
}
//# sourceMappingURL=generate-token.js.map