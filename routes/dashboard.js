const express = require("express");
const authMiddleware = require("../middleware/auth")
const router = express.Router();

router.get("/", authMiddleware, async(req, res) => {
    try {
        res.render("dashbaord", { title: "Notify" })
    } catch (err) {
        console.log(err);
        res.render("error", { error: "Check your internet connection..." })
    }
})

module.exports = router;