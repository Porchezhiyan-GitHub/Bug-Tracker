const bcrypt = require("bcrypt");
const express = require("express");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");

const sendMail = require("../mailer");
const { User } = require("../models/User");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("users route");
});


/*
@route GET /api/users/acivate/:id/:hash
@desc marks user active after email verification
 */
router.get("/activate/:id/:verification", async (req, res) => {
  try {
    const { id, verification } = req.params;

    console.log(id, verification);
    user = await User.findById(id);
    console.log(user);
    if (!user || (!user.active && user.verification !== verification)) {
      return res.status(400).send("verification failed.");
    }
    user.active = true;
    delete user.verification;
    await user.save();
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.PROJECTILE_SECRET_KEY
    );
    res.send(token);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("server error");
  }
});

/*
@route POST /api/users/
@desc register the user.
 */
router.post(
  "/",
  [
    check("name", "name is required.").notEmpty(),
    check("email", "invalid email id.").isEmail(),
    check(
      "password",
      "password should have more than five characters."
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).send(JSON.stringify(errors.array()));
      }

      const { name, email, password } = req.body;

      const result = await User.findOne({ email });
      if (result) {
        return res.status(400).send("user already registered");
      }

      const user = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });
      const token = jwt.sign(
        { id: user._id, name },
        process.env.PROJECTILE_SECRET_KEY
      );

      user.verification = Math.round(Math.random() * 100 + 1);

      const activationLink = `http://${req.hostname}:${process.env.PROJECTILE_PORT}/api/users/activate/${user.id}/${user.verification}`;

      sendMail(email, activationLink);

      await user.save();
      res.send(token);
    } catch (ex) {
      console.log(ex);
      res.status(500).send();
    }
  }
);

/*
@route POST /api/users/login
@desc logs in user
 */
router.post(
  "/login",
  [
    check("email", "invalid email id.").isEmail(),
    check(
      "password",
      "password should have more than five characters."
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).send(JSON.stringify(errors.array()));
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("login failed");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("login failed");
      }

      const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.PROJECTILE_SECRET_KEY
      );post
      res.send(token);
    } catch (ex) {
      console.log(ex);
      res.status(500).send();
    }
  }
);

module.exports = router;
