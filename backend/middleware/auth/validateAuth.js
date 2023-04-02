const { authservice } = require("../../services");
const models = require("../../models");
const uuid = require("uuid");

const validateAuth = async (req, res, next) => {
  try {
    const accessToken = req.cookies.refreshToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken || !refreshToken)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });

    const accessPayload = await authservice.verifyToken(accessToken, true);
    if (accessPayload) {
      req.user = accessPayload;
      return next();
    }

    if (uuid.validate(refreshToken) === false) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    const userRefreshToken = await models.UserRefreshToken.findAll({
      where: {
        token: refreshToken,
      },
      include: {
        model: models.User,
        attributes: ["email", "id"],
      },
    });

    if (userRefreshToken.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Refresh Token" });
    }

    const user = {};
    user.email = userRefreshToken[0].User.email;
    user.id = userRefreshToken[0].User.id;

    await models.UserRefreshToken.destroy({
      where: {
        userId: user.id,
      },
    });

    const isRefreshTokenExpired =
      new Date() > new Date(userRefreshToken.expiresAt);

    if (isRefreshTokenExpired) {
      await userRefreshToken.destroy();
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    const token = authservice.generateToken(user, true);
    const validatedToken = await models.UserRefreshToken.create({
      userId: user.id,
    });

    res.cookie("token", token, { httpOnly: true });
    res.cookie("refreshToken", validatedToken.token, { httpOnly: true });
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = validateAuth;
