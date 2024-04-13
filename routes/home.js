const express = require("express");

const router = express.Router();

router.get("/", async(req, res) => {
    try {

        res.render("index", { title: "Notify" })
    } catch (err) {
        console.log(err);
        res.render("error", { error: "Check your internet connection..." })
    }
})

module.exports = router;