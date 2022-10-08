const formattedReturn = require('./helpers/formattedReturn');
const postgresPool = require('./helpers/postgres').pool;

exports.handler = async(event) => {
    if (event.httpMethod === 'GET' && event.path.includes('id')) {
        return getUserById(event);
    } else if (event.httpMethod === 'GET') {
        return getAllUsers(event);
    } else if (event.httpMethod === 'POST') {
        return createUser(event);
    } else if (event.httpMethod === 'PUT') {
        return updateUserById(event);
    } else if (event.httpMethod === 'DELETE') {
        return deleteUserById(event);
    } else {
        return formattedReturn(405, {});
    }
};

const getAllUsers = async(event) => {
    try {
        const { rows } = await postgresPool.query('SELECT * FROM users');
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
            'SELECT * FROM users WHERE id = $1',
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
            'INSERT INTO users (username) VALUES ($1) RETURNING *', [username]
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
            'UPDATE users SET username = $1 WHERE id = $2 RETURNING *', [username, id]
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
            'DELETE FROM users WHERE id = $1 RETURNING *', [id]
        );
        return formattedReturn(200, rows[0]);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};

