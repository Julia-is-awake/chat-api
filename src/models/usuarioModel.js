const db = require("./db");
async function registrarUsuario(nick) {
  return await db.insertOne("usuario", { nick: nick });
}

let buscarUsuario = async (idUser) => {
  let user = await db.findOne("usuario", idUser);
  if (user == null) return console.log("Usuário null");
  return user;
};

let alterarUsuario = async (user) => {
  return await db.updateOne("usuario", user, { _id: user._id });
};

let deletarUsuario = async (idUser) => {
  return await db.deleteOne("usuario", idUser);
};

module.exports = {
  registrarUsuario,
  buscarUsuario,
  alterarUsuario,
  deletarUsuario,
};
