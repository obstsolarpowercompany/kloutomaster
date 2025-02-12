"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
async function findAvailablePort(startPort) {
    let port = startPort;
    const checkPort = (port) => {
        return new Promise((resolve, reject) => {
            const server = net.createServer();
            server.once('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    resolve(false);
                }
                else {
                    reject(err);
                }
            });
            server.once('listening', () => {
                server.close();
                resolve(true);
            });
            server.listen(port);
        });
    };
    while (!(await checkPort(port))) {
        port++;
    }
    return port;
}
exports.default = findAvailablePort;
//# sourceMappingURL=find-port.js.map