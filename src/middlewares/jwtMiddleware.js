import jwt from "jsonwebtoken";


export default async function jwtMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replaceAll('"', "");

  if (!token) {
    throw {
      type: "not_found",
      message: "No token provided, please login to continue",
    };
  }

  try {
    const SECRET = String(process.env.JWT_KEY);
    const decoded = jwt.verify(token, SECRET);

    if (!decoded) {
      throw {
        type: "not_found",
        message: "No token provided, please login to continue",
      };
    }

    const userData = decoded;
    res.locals.userData = userData;
  } catch (error) {
    res
      .status(401)
      .json({ auth: false, message: "Failed to authenticate token." });
    return;
  }
  next();
}
