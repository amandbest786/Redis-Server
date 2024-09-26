const net = require('net');

module.exports = () => {
    console.log('Server created.');
    connection.on('data', (bufferData) => {
        console.log(bufferData.toString());
    });
}