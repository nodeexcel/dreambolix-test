const jwt = require("jsonwebtoken");
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const getSecret = (isAccessToken) =>
  isAccessToken ? accessSecret : refreshSecret;
const getExpirey = (isAccessToken) => (isAccessToken ? '15s' : "7d");

const generateToken = (payload, isAccessToken = false) => {
  const secret = getSecret(isAccessToken);
  const expiresIn = getExpirey(isAccessToken);
  const accessToken = jwt.sign(payload, secret, {
    expiresIn,
  });
  return accessToken;
};

const verifyToken = async (token, isAccessToken = false) => {
  const secret = getSecret(isAccessToken);
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return false
  }
};

module.exports = { generateToken, verifyToken };
