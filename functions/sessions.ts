import {formattedReturn, postgresPool} from './utils';
import { Handler } from '@netlify/functions';
import {FormattedReturnInterface} from './helpers/formattedReturn';

const handler: Handler = async(event, context) => {
    if (event.httpMethod === 'GET' && event.path.includes('id')) {
        return getSessionById(event);
    } else if (event.httpMethod === 'GET') {
        return getAllSessions(event);
    } else if (event.httpMethod === 'POST') {
        return createSession(event);
    } else {
        return formattedReturn(405, {});
    }
};

export { handler}

const getAllSessions: Function = async(event: any): Promise<FormattedReturnInterface> => {
    try {
        const { rows } = await postgresPool.query('SELECT * FROM session');
        return formattedReturn(200, rows);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};

const getSessionById: Function = async(event: any): Promise<FormattedReturnInterface> => {
    try {
        const { id } = event.pathParameters;
        const { rows } = await postgresPool.query(
            'SELECT * FROM session WHERE id = $1',
            [id]
        );
        return formattedReturn(200, rows);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};


const createSession: Function = async(event: any): Promise<FormattedReturnInterface> => {
    const { username, startDate } = JSON.parse(event.body);
    try {
        const { rows } = await postgresPool.query(
            'INSERT INTO session (username, startDate) VALUES ($1, $2) RETURNING *', [username, startDate]
        );
        return formattedReturn(200, rows[0]);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};

