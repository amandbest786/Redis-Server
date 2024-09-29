module.exports = function (DB, key) {
    if (Object.keys(DB.db).includes(key)) {
        const value = DB.delete(key);
        return `+OK\r\n`;
    } else {
        return '$-1\r\n'; // Key not found
    }
};