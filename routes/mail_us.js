const nodemailer = require("nodemailer");
const express = require("express");

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    auth: {
        user: "Support@notifyus.tech",
        pass: "@77jd154ZAFp_ideal",
    },
})


router.post("/", async(req, res) => {
    const message = `<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Notify Us</title><style>body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; text-align: center; } #header { background-color: #3498db; color: #fff; padding:4px; font-weight:bolder;text-transform:uppercase; } #content { padding: 20px;font-weight:bold; } #footer { background-color: #333; color: #fff; padding: 10px; } img { max-width: 100%; height: auto; }</style></head><body><div class='text-light text-uppercase fw-bolder' id='header' style='font-size:30px;'> Noti<span style='color:red;'>fy </span>  </div><div id='content'><p>${req.body.email} <br> </p></p> <p>${req.body.message}</p> <p>Best regards,<br>${req.body.name}</p> </div><div id='footer'> <p>© 2023 <a href='notifyus.tech' target='_blank'>notifyus.tech </a> All rights reserved.</p> </div></body></html>`;

    try {
        const info = await transporter.sendMail({
            from: "Support@notifyus.tech",
            to: "Support@notifyus.tech",
            subject: `FROM ${req.body.name} ${req.body.surname}`,
            html: message,
            replyTo: req.body.email,
        })

        // res.send(info.messageId)
        // Send a success response with a success message
        // res.send({ message: "Email sent successfully", messageId: info.messageId });
        res.render("Email_sucess", { message: "Email sent successfully", message2: `Dear ${req.body.name} ${req.body.surname} Your message has been received and is under review, we will contact you through (${req.body.email}).`, url: "/", messageId: info.messageId });

    } catch (err) {
        console.log(err);
        res.render("error", { error: "Check your internet connection..." })
    }
})

module.exports = router;