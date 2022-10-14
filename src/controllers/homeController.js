import * as homeServices from "../services/homeServices.js";

export async function getMyHomepage(req, res) {
  const { id, userName, userImage } = res.locals.userData;
  const home = await homeServices.getMyHomepage(id, userName, userImage);
  res.status(200).send(home);
}