const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// Register user
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validations
  if (!name) {
    res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!email) {
    res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!password) {
    res.status(422).json({ msg: "A senha é obrigatório!" });
  }
  if (password != confirmPassword) {
    res.status(422).json({ msg: "As senhas não conferem!" });
  }

  // check if user exits

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(422).json({ msg: "Por favor utilize outro email!" });
  }

  // create password

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  //create User
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Aconteceu um erro no servidor tente novamente mais tarde.",
    });
  }
};

//Login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!password) {
    res.status(422).json({ msg: "A senha é obrigatório!" });
  }

  // Check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).json({ msg: "Usuário não encontrado!" });
  }

  // Check if password is correct
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(404).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Aconteceu um erro no servidor tente novamente mais tarde.",
    });
  }
};

// Private user

const privateUser = async (req, res) => {
  //quando o id vem da URL a gente pega pelo req.params.id
  const id = req.params.id;

  // check if user exists
  //-password é um filtro que exclui a senha do user do retorno
  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  res.status(200).json({ user })
};

module.exports = { registerUser, loginUser, privateUser };
