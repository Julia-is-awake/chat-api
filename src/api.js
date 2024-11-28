const express = require("express");
const app = express();
const token = require("./util/token");
const salaController = require("./controllers/salaController");
const usuarioController = require("./controllers/usuarioController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

var cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173/template-chat",
  })
);

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

app.use(
  "/",
  router.get("/", (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>");
  })
);

app.use(
  "/",
  router.get("/sobre", (req, res) => {
    res.status(200).send({
      nome: "API - CHAT",
      versão: "0.1.0",
      autor: "Julia Sorgetz",
    });
  })
);

app.use(
  "/",
  router.get("/salas", async (req, res) => {
    const salaController = require("./controllers/salaController");
    console.log(req.headers);
    if (
      await token.checktoken(
        req.headers.token,
        req.headers.iduser,
        req.headers.nick
      )
    ) {
      let resp = await salaController.get();
      res.status(200).send(resp);
    } else {
      res.status(400).send({ msg: "Usuário não autorizado!" });
    }
  })
);

app.use(
  "/entrar",
  router.post("/entrar", async (req, res) => {
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
  })
);

app.use(
  "/sala/entrar",
  router.put("/sala/entrar", async (req, res) => {
    if (
      !token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)
    )
      return false;
    let resp = await salaController.entrar(
      req.headers.iduser,
      req.query.idsala
    );
    res.status(200).send(resp);
  })
);

app.use(
  "/sala/sair",
  router.put("/sala/sair", async (req, res) => {
    if (
      !token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)
    )
      return false;
    let resp = await salaController.sair(req.headers.iduser);
    res.status(200).send(resp);
  })
);

app.use(
  "/sala/mensagem/",
  router.post("/sala/mensagem", async (req, res) => {
    if (
      !token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)
    )
      return false;
    let resp = await salaController.enviarMensagem(
      req.headers.nick,
      req.body.msg,
      req.body.idSala
    );
    res.status(200).send(resp);
  })
);

app.use(
  "/sala/mensagens/",
  router.get("/sala/mensagens", async (req, res) => {
    if (
      !token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)
    )
      return false;
    let resp = await salaController.buscarMensagens(
      req.query.idSala,
      req.query.timestamp
    );
    res.status(200).send(resp);
  })
);

app.use(
  "/sair",
  router.delete("/sair", async (req, res) => {
    if (
      !token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)
    )
      return false;
    let resp = await usuarioController.sair(req.headers.iduser);
    res.status(200).send(resp);
  })
);

module.exports = app;
