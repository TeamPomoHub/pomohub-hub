let formattedReturn = (statusCode : any, body : any) => {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
};

module.exports = formattedReturn;