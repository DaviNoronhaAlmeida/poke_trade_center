import { errorTypeToStatusCode, isAppError } from "../utils/errorUtils.js";

export default function errorMiddleware(err, req, res, next) {
  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).json(err.message);
  }

  return res.sendStatus(500);
}
