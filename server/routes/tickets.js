const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("tickets route");
});

module.exports = router;
