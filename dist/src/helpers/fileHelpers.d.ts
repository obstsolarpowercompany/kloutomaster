export declare const checkIfFileOrDirectoryExists: (path: string) => boolean;
export declare const getFile: (path: string, encoding?: BufferEncoding) => Promise<string | Buffer>;
export declare const createFile: (path: string, fileName: string, data: string) => Promise<void>;
export declare const deleteFile: (path: string) => Promise<void>;
