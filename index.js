const net = require('net');
const Parser = require('redis-parser');

let DB = {};

const server = net.createServer(connection => {
    console.log('Server created.');

    const parser = new Parser({
        returnReply: (data) => {
            const command = data[0]?.toLowerCase();
            const key = data[1];
            const value = data[2];

            if (!command || !key) {
                connection.write('-ERR missing command or key\r\n');
                return;
            }

            switch (command) {
                case 'set':
                    DB[key] = value;

                    if (data[3]?.toLowerCase() === 'ex' && !isNaN(data[4])) {
                        const ttl = Number(data[4]);
                        console.log(`Setting key "${key}" with expiration of ${ttl} seconds.`);

                        setTimeout(() => {
                            delete DB[key];
                        }, ttl * 1000);
                    }

                    connection.write('+OK\r\n');
                    break;

                case 'get':
                    if (key in DB) {
                        const storedValue = DB[key];
                        connection.write(`$${storedValue.length}\r\n${storedValue}\r\n`);
                    } else {
                        connection.write('$-1\r\n'); // Key not found
                    }
                    break;

                default:
                    connection.write(`-ERR unknown command "${command}"\r\n`);
            }
        },
        returnError: (err) => {
            console.log('Error parsing data:', err.message);
            connection.write('-ERR parsing error\r\n');
        }
    });

    connection.on('data', (bufferData) => {
        try {
            parser.execute(bufferData);
        } catch (err) {
            console.log('Error during execution:', err.message);
            connection.write('-ERR execution error\r\n');
        }
    });

    connection.on('error', (err) => {
        console.log('Connection error:', err.message);
    });
});

server.listen(8090, () => {
    console.log('Server Running at PORT:8090');
});
