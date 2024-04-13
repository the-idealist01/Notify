const express = require("express");

const router = express.Router();

const User = require("../models/User")

router.get("/", async(req, res) => {
    try {
        const users = await User.find()
        if (!users) return res.status(404).send("No registerd user")

        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) return res.status(404).send("The user with the given ID is not found")

        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post("/", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) return res.status(400).send("This user already exist")

        try {
            const newUser = new User({...req.body });
            await newUser.save()
            res.status(200).send(newUser)
        } catch (err) {
            res.status(500).send(err)
        }
    } catch (err) {
        res.status(500).send(err)
    }
});

router.put("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) return res.status(404).send("The user with the given ID is not found")

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).send(updatedUser)
        } catch (err) {
            res.status(500).send(err)
        }
    } catch (err) {
        res.status(500).send(err)
    }
});


router.delete("/:id", async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send(`The user with ID ${req.params.id} has been deleted`)
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = router