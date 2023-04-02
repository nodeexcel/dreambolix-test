const { comparePasswords, hashPassword } = require("./auth/hashPassword");
const { generateToken, verifyToken } = require("./auth/tokenservice");
const authservice = {
  comparePasswords,
  hashPassword,
  generateToken,
  verifyToken,
};

module.exports = { authservice };
