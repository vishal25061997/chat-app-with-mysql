const { Op } = require("sequelize");
// const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    console.log("email", email);
    if (
      isstringinvalid(name) ||
      isstringinvalid(email) ||
      isstringinvalid(password)
    ) {
      return res
        .status(400)
        .json({ err: "Bad parameters . Something is missing" });
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      console.log(err);
      const user = await User.create({ name, email, password: hash, pic });
      if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          // token: generateToken(user._id),
        });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// const generateToken = (_id) => {
//   return jwt.sign({ id: _id }, "yadav");
// };

// const authUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (isstringinvalid(email) || isstringinvalid(password)) {
//       return res
//         .status(400)
//         .json({ message: "EMail id or password is missing ", success: false });
//     }
//     console.log(password);
//     const user = await User.findAll({ where: { email } });
//     if (user.length > 0) {
//       bcrypt.compare(password, user[0].password, (err, result) => {
//         if (err) {
//           throw new Error("Something went wrong");
//         }
//         if (result === true) {
//           // console.log(user[0].id, user[0].name);
//           return res.status(200).json({
//             _id: user[0].id,
//             name: user[0].name,
//             email: user[0].email,
//             pic: user[0].pic,
//             token: generateToken(user[0].id),
//           });
//         } else {
//           return res
//             .status(400)
//             .json({ success: false, message: "Password is incorrect" });
//         }
//       });
//     } else {
//       return res
//         .status(404)
//         .json({ success: false, message: "User Doesnot exitst" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err, success: false });
//   }
// };

const generateToken = (_id) => {
  return jwt.sign({ id: _id }, "yadav");
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or password is missing", success: false });
    }

    const user = await User.findOne({ where: { email } });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user.id),
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${req.query.search}%` } },
          { email: { [Op.like]: `%${req.query.search}%` } },
        ],
      }
    : {};

  const users = await User.findAll({
    where: {
      id: { [Op.ne]: req.user.id },
      ...keyword,
    },
  });

  res.send(users);
};

module.exports = { registerUser, authUser, allUsers };
