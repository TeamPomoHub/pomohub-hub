const formattedReturn = require('./helpers/formattedReturn');
const postgresPool = require('./helpers/postgres').pool;





const getAllUsers = async(event) => {
    try {
        const { rows } = await postgresPool.query('SELECT * FROM User');
        return formattedReturn(200, rows);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};

const getUserById = async(event) => {
    try {
        const { id } = event.pathParameters;
        const { rows } = await postgresPool.query(
            'SELECT * FROM User WHERE id = $1',
            [id]
        );
        return formattedReturn(200, rows);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};


const createUser = async(event) => {
    const { username } = JSON.parse(event.body);
    try {
        const { rows } = await postgresPool.query(
            'INSERT INTO User (username) VALUES ($1) RETURNING *', [username]
        );
        return formattedReturn(200, rows[0]);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};

const updateUserById = async(event) => {
    const { id, username } = JSON.parse(event.body);
    try {
        const { rows } = await postgresPool.query(
            'UPDATE User SET username = $1 WHERE id = $2 RETURNING *', [username, id]
        );
        return formattedReturn(200, rows[0]);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};

const deleteUserById = async(event) => {
    const { id } = JSON.parse(event.body);
    try {
        const { rows } = await postgresPool.query(
            'DELETE FROM User WHERE id = $1 RETURNING *', [id]
        );
        return formattedReturn(200, rows[0]);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};
