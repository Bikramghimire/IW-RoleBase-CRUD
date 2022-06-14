const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("hello to the application");
});

module.exports = router;
