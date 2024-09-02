const token = require("../util/token");
const usuarioModel = require("../models/usuarioModel");

exports.entrar = async (nick) => {
  let resp = await usuarioModel.registrarUsuario(nick);
  if (resp.insertedId) {
    return {
      idUser: resp.insertedId,
      token: await token.setToken(
        JSON.stringify(resp.insertedId).replace(/"/g, ""),
        nick
      ),
      nick: nick,
    };
  }
};

exports.sair = async (idUser) => {
  let usuarioModel = require("../models/usuarioModel");
  let resp = await usuarioModel.deletarUsuario(idUser);
  return { msg: "Usuário saiu do Chat.", timestamp: (timestamp = Date.now()) };
};
