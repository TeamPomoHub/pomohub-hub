export interface FormattedReturnInterface {
    statusCode: number;
    body: string;
}

module.exports = (statusCode: number, body: any) => {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
};