module.exports = function (DB, key) {
    if (Object.keys(DB.db).includes(key)) {
        const value = DB.get(key);
        return `$${value.length}\r\n${value}\r\n`;
    } else {
        return '$-1\r\n'; // Key not found
    }
};
    