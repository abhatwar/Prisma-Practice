const config = require('./msdb');
const sql = require("mssql");
let pool;

const msConnect = async () => {
    try {
        if (!pool) {
            pool = await sql.connect(config);
        }
        return pool;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}

module.exports = { msConnect };