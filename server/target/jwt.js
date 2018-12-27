"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.secret = process.env.JWT_SECRET || 'MYOWNSECRETTOKEN12345678910PLEASEDONTTELL';
const ttl = 3600 * 8;
exports.sign = (data) => jwt.sign(data, exports.secret, { expiresIn: ttl });
exports.verify = (token) => jwt.verify(token, exports.secret);
//# sourceMappingURL=jwt.js.map