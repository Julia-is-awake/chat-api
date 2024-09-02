const jwt = require("jsonwebtoken");

const checktoken = async (token, id, key) => {
  return jwt.verify(token, key, (err, decoded) => {
    if (err) {
      console.log(err);
      return false;
    }
    if (decoded.id === id) {
      console.log("Id identificado");
      return true;
    }
    return false;
  });
};

const setToken = async (id, key) => {
  console.log(id);
  if (id) {
    return jwt.sign({ id }, key, { expiresIn: 28800 });
  }
  return false;
};

module.exports = {
  checktoken,
  setToken,
};
