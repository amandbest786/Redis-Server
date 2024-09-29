const net = require('net');
const Parser = require('redis-parser');
const setCommand = require('./commands/setCommand');
const getCommand = require('./commands/getCommand');
const deleteCommand = require('./commands/deleteCommand');
const DB = require('./db');

const server = net.createServer(connection => {
    console.log('Server created.');

    const parser = new Parser({
        returnReply: (data) => {
            const command = data[0]?.toLowerCase();
            const key = data[1];
            const value = data[2];
            const ttl = data[4] && !isNaN(data[4]) ? Number(data[4]) : null;

            if (!command || !key) {
                connection.write('-ERR missing command or key\r\n');
                return;
            }

            switch (command) {
                case 'set':
                    connection.write(setCommand(DB, key, value, ttl));
                    console.log(DB.db);
                    break;
                case 'get':
                    connection.write(getCommand(DB, key));
                    break;
                case 'del':
                    connection.write(deleteCommand(DB, key));
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
