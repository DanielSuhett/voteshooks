const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

exports.login = (req, res) => {
  const { username, password } = req.body;

  userModel
    .findOne({
      username: username
    })
    .then(user => {
      if (!user) {
        res.status(404).send({
          auth: false,
          message: "Usuário não encontrado."
        });
      } else {
        if (bcrypt.hashSync(password, user.salt) == user.password) {
          res.status(200).send({
            auth: true,
            message: "Login efetuado com sucesso!",
            userToken: signToken(user)
          });
        } else {
          res.status(401).send({
            auth: false,
            message: "Senha incorreta!"
          });
        }
      }
    });
};

exports.createUser = (req, res) => {
  const { username, password, passwordConfirm } = req.body;

  return userModel.findOne({ username: username }).then(haveusername => {
    if (haveusername) {
      res.status(401).send({
        message: "User already exists"
      });
    } else {
      if (password && passwordConfirm) {
        if (password != passwordConfirm) {
          res.status(401).send({
            message: "Senhas Incompatíveis"
          });
        } else {
          const user = new userModel();

          user.username = username;
          user.salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(password, user.salt);

          user.create_at = new Date();

          user.save().then(
            res.status(201).send({
              created: true,
              data: {
                user_created: user
              }
            })
          );
        }
      } else {
        res.status(401).send({
          message: "Confirme sua senha!"
        });
      }
    }
  });
};

const signToken = user => {
  const payloadJWT = {
    username: user.username,
    id: user.id
  };

  const signOptions = {
    issuer: "Players",
    expiresIn: "12h",
    algorithm: "HS256"
  };

  return jwt.sign(payloadJWT, process.env.private_key, signOptions);
};
