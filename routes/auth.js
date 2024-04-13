const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const authMiddleware = require("../middleware/auth")
    // const path = require("path");
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.random() + file.originalname)
    }
})

const upload = multer({ storage })

router.post("/profile", upload.single("avatar"), (req, res) => {
    res.status(200).send("uploaded")
})

//create a new user
router.post("/register", async(req, res) => {
    const hashedPassword = CryptoJS.AES.encrypt(req.body.password, "houwhuo0824u92083743802948920482094").toString()
    try {
        const email = await User.findOne({ email: req.body.email, username: req.body.username, phone_no: req.body.phone_no })

        // if (email) return res.status(400).send("User already exists. Please login");
        if (email) return res.status(400).render("user_exist", { error: "User Already Exists!" }

        )

        try {
            const newUser = new User({...req.body, password: hashedPassword });
            await newUser.save()
            const { password, ...other } = newUser._doc;

            res.status(200).render("sucess_reg", {
                user_details: other
            });

        } catch (err) {
            res.status(500).send("error")
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

//login 
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return res.status(400).render("login", {
                message: "Username Does Not Exist"
            });
        }
        const originalPassword = CryptoJS.AES.decrypt(user.password, "houwhuo0824u92083743802948920482094").toString(CryptoJS.enc.Utf8)

        if (originalPassword !== req.body.password) return res.status(400).render("login", {
            message: "Invalid Password"
        });

        const token = user.generateAuthToken()
        console.log("Token:", token); // Log token value
        const { password, ...other } = user._doc;

        // res.header("x-auth-token", token).status(200).render({...other, token })
        // res.header("x-auth-token", token).status(200).redirect("/dashboard");
        res.header("x-auth-token", token).status(200).render("dashboard", { username: other.username, name: other.name, acc_type: other.acc_type })
            // res.header("x-auth-token", token).status(200).send({ token }).redirect("/dashboard");

    } catch (err) {
        res.status(500).send(err)
    }


});

module.exports = router;