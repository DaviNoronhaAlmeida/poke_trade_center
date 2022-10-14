import * as authServices from "../services/authServices.js";

export async function signup(req, res) {
    const user = req.body;
    await authServices.createtUser(user);
    res.sendStatus(201);
}

export async function signin(req, res) {
    const user = req.body;
    const token = await authServices.connectUser(user);

    res.cookie("token", token);
    res.status(200).json(token);
}

export async function getUserData(req, res) {
    const { id } = res.locals.userData;
    const userData = await authServices.getUserData(id);
    res.status(200).json(userData);
}

export async function updateUserData(req, res) {
    const { id } = res.locals.userData;
    const { password, userName } = req.body;
    const userData = await authServices.updateUserData(password, userName, id);
    res.status(200).send(userData);
}

export async function updateUserPic(req, res) {
    const { id } = res.locals.userData;
    const { userImage } = req.body;

    const userData = await authServices.updateUserPic(userImage, id);
    res.status(200).send(userData);
}
