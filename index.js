const net = require('net');
const Parser = require('redis-parser');

let DB = {};
// $45\r\n {"name":"AMAN","age":24,"location":"BANGALORE"}\r\n

const server = net.createServer(connection => {
    console.log('Server created.');

    const parser = new Parser({
        returnReply: (data) => {
            switch (data[0]) {
                case 'SET':
                    const value = JSON.parse(JSON.stringify(data[2])); // Parse the value, as it is a String.
                    const key = data[1];
                    DB[key] = value;
                    console.log(DB);
                    connection.write('+OK\r\n');
                    break;
                case 'GET':
                    const ask = DB[data[1]];
                    if (ask !== undefined) {
                        connection.write(`$${ask.length}\r\n${ask}\r\n`);
                    } else {
                        connection.write('$-1\r\n');
                    }
                    break;
                default:
                    connection.write('-ERR unknown command\r\n');
            }
        },
        returnError: (err) => {
            console.log(err);
        }
    });

    connection.on('data', (bufferData) => {
        parser.execute(bufferData);
    });

    connection.on('error', function (err) {
        console.log('Error from server:', err.message);
    });

    connection.write('+OK\r\n'); // Initial acknowledgment when the connection is established
});

server.listen(6378, () => {
    console.log('Server Running at PORT:6378');
});



// to improve
// 1. setting the simple string as string, and any object as object only, not in string format.
// 2. Check whether why the swaitch case is not working, as in first input, if it is a get request also. it returns OK.
// 3. scale this up