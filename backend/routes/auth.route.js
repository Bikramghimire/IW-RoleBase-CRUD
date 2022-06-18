const router = require("express").Router();
const User = require("../model/user.model");

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res, next) => {
  res.send("login post");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  try {
    const { email } = req.body;
    const doesExit = await User.findOne({ email });
    if (doesExit) {
      res.redirect("/auth/register");
      return;
    }
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res, next) => {
  res.send("logout");
});
module.exports = router;
