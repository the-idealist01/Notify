const express = require("express");

const router = express.Router();


router.post("/", async(req, res) => {

    res.render("sms_error", { message: "Daily quota exceeded", message2: "sorry our SMS demo for today has already been used up..our Email did deliver right on time right???,that is so cool😎", url: "/" });


})

module.exports = router;