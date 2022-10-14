export function isAppError(error) {
    console.log(error);
    return error.type !== undefined;
}

export function errorTypeToStatusCode(type) {
    if (type === "bad_request") return 400;
    if (type === "unauthorized") return 401;
    if (type === "not_found") return 404;
    if (type === "conflict") return 409;
    if (type === "unprocessable_entity") return 422;
    return 500;
}
