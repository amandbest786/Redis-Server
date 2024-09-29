let DB = {};

module.exports = {
    set: (key, value) => { DB[key] = Buffer.from(value); },
    get: (key) => { return DB[key].toString(); },
    delete: (key) => delete DB[key],
    db: DB
};
