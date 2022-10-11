import {formattedReturn, postgresPool} from './utils';
import { Handler } from '@netlify/functions';
import {FormattedReturnInterface} from './helpers/formattedReturn';

const handler: Handler = async(event): Promise<FormattedReturnInterface> => {
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

export { handler }

const getAllUsers: Function = async(event: any): Promise<FormattedReturnInterface> => {
    try {
        const { rows } = await postgresPool.query('SELECT * FROM users');
        return formattedReturn(200, rows);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};

const getUserById: Function = async(event: any): Promise<FormattedReturnInterface> => {
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


const createUser: Function = async(event: any): Promise<FormattedReturnInterface> => {
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

const updateUserById: Function = async(event: any): Promise<FormattedReturnInterface> => {
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

const deleteUserById: Function = async(event: any): Promise<FormattedReturnInterface> => {
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

