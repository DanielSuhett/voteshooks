const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "Você não tem permissão!" })
      .redirect("/");

  jwt.verify(token, process.env.private_key, err => {
    if (err) res.status(401).send({ message: err });
  });
  next();
};

module.exports = verifyJWT