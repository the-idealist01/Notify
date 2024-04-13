const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    try {
        const token = req.header("x-auth-token");


        console.log("Token:", token); // Log token value


        if (!token) return res.status(401).send("Provide a token. You are not authorized to view this page!!!!")

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()
    } catch (err) {
        res.status(401).send("Invalid token")
    }
}

module.exports = verifyToken