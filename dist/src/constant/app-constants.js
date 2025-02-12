"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROFILE_PHOTO_UPLOADS = exports.BASE_URL = exports.VALID_UPLOADS_MIME_TYPES = exports.MAX_PROFILE_PICTURE_SIZE = void 0;
const path = require("path");
exports.MAX_PROFILE_PICTURE_SIZE = 2 * 1024 * 1024;
exports.VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png'];
exports.BASE_URL = '';
exports.PROFILE_PHOTO_UPLOADS = path.join(__dirname, '..', 'uploads');
//# sourceMappingURL=app-constants.js.map