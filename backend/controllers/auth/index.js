const db = require("../../models");
const { authservice } = require("../../services");
const User = db.User;

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists)
      return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await authservice.hashPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const userResponse = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const refreshTokens = db.UserRefreshToken;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const passwordMatch = await authservice.comparePasswords(
      password,
      user.password
    );

    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const payload = {
      email: user.email,
      id: user.id,
      assignTo: user.firstName + " " + user.lastName,
    };

    const accessToken = authservice.generateToken(payload, true);
    const refreshToken = await refreshTokens.create({ userId: user.id });
    res.cookie("refreshToken", refreshToken.token, { httpOnly: true });
    res.cookie("token", accessToken, { httpOnly: true });
    res.setHeader("Access-Control-Allow-Credentials", true);
    return res.json({ success: true, data: { accessToken, refreshToken } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getToken = async (_, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Token Refreshed successfully" });
};

const logout = async (_, res) => {
  res.set("Set-Cookie", [
    "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;",
    "refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;",
  ]);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = { registerUser, login, getToken, logout};
