module.exports = function (DB, key, value, ttl) {
    DB.set(key, value);
    if (ttl) {
        console.log(`Setting key "${key}" with expiration of ${ttl} seconds.`);
        setTimeout(() => {
            console.log(`Key "${key}" expired.`);
            delete DB.db[key];
        }, ttl * 1000);
    }
    return '+OK\r\n';
};
