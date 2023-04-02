const Joi = require("joi");

const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().allow(null, ""),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{8,30}$/)
      .required(),
    confirm_password: Joi.ref("password"),
  }).with("password", "confirm_password");

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  return next();
};

module.exports = validateRegistration;
