const User = require("../../models/User");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    async registerUser(_, { registerUserInput: { name, email, password } }) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError(
          "A User is already exist with the same email ",
          "USER_ALREADY_EXISTS"
        );
      }
      const salt = await bcrypt.genSalt(10);

      let encryptedPass = (await bcrypt.hash(password, salt)).toString();

      let newUser = new User({
        name: name,
        email: email.toLowerCase(),
        password: encryptedPass,
        createdBy: "Admin",
        role: "User",
        createdAt: new Date().toISOString(),
      });
      const token = jwt.sign(
        { user_id: newUser._id, email },
        "8751874848kjgadbhxvndkjagsbchfjvadhjasfdhsvfb897654s8d7ass8d48",
        {
          expiresIn: "2h",
        }
      );

      newUser.token = token;

      let res = await newUser.save();
      //let res = await newUser.save();

      //console.log(res);
      return {
        id: res.id,
        token: token,
        ...res._doc,
      };
    },
    async loginUser(_, { loginUserInput: { email, password } }) {
      const user = await User.findOne({ email });

      if (user && bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { user_id: user._id, email },
          "8751874848kjgadbhxvndkjagsbchfjvadhjasfdhsvfb897654s8d7ass8d48",
          {
            expiresIn: "2h",
          }
        );

        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        if (user) {
          throw new ApolloError("Incorrect Password ", "INCORRECT_PASSWORD");
        } else {
          throw new ApolloError(
            "User Does not Exist with this email id ",
            "USER_NOT_EXISTS_ERRORS"
          );
        }
      }
    },
  },
  Query: {
     getUsers : async () => {
      let users = await User.find();

      let returnUsers = [];
      users.forEach((element) => {
        let user = {
          id: element.id,
          ...element._doc,
        };
        returnUsers.push(user);
      });
      return returnUsers;
    },
    async getUser(_, { email }) {
      let user = {};

      if (email) {
        user = await User.findOne({ email });
      } else {
        throw new ApolloError("Email is required ", "REQUIRED_EMAIL");
      }
      if (!user) {
        throw new ApolloError("Email is invalid ", "INVALID_EMAIL");
      }
      return {
        id: user.id,
        ...user._doc,
      };
    },
    async getUserById(_, { id }) {
      let user = {};

      if (id) {
        user = await User.findById({ id });
      } else {
        throw new ApolloError("id is required ", "REQUIRED_USER_ID");
      }
      if (!user) {
        throw new ApolloError("id is invalid ", "INVALID_USER_ID");
      }
      return {
        id: user.id,
        ...user._doc,
      };
    },
  },
};
