"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.createFile = exports.getFile = exports.checkIfFileOrDirectoryExists = void 0;
const fs = require("fs");
const util_1 = require("util");
const checkIfFileOrDirectoryExists = (path) => {
    return fs.existsSync(path);
};
exports.checkIfFileOrDirectoryExists = checkIfFileOrDirectoryExists;
const getFile = async (path, encoding) => {
    const readFile = (0, util_1.promisify)(fs.readFile);
    return encoding ? readFile(path, { encoding }) : readFile(path);
};
exports.getFile = getFile;
const createFile = async (path, fileName, data) => {
    if (!(0, exports.checkIfFileOrDirectoryExists)(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
    const writeFile = (0, util_1.promisify)(fs.writeFile);
    await writeFile(`${path}/${fileName}`, data, 'utf8');
};
exports.createFile = createFile;
const deleteFile = async (path) => {
    const unlink = (0, util_1.promisify)(fs.unlink);
    await unlink(path);
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=fileHelpers.js.map