const nodemailer = require("nodemailer");
const express = require("express");

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    auth: {
        user: "Notify@notifyus.tech",
        pass: "@77jd154ZAFp_ideal",
    },
})

const message = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Notify Us</title><style>body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; text-align: center; } #header { background-color: #3498db; color: #fff; padding:4px; font-weight:bolder;text-transform:uppercase; } #content { padding: 20px;font-weight:bold; } #footer { background-color: #333; color: #fff; padding: 10px; } img { max-width: 100%; height: auto; }</style></head><body><div class='text-light text-uppercase fw-bolder' id='header' style='font-size:30px;'> Noti<span style='color:red;'>fy </span>  </div><div id='content'> <p>Hello,</p> <p>This is a test mail from <a href='notifyus.tech' target='_blank'> Notify </a>. We deliver in less than 30 seconds. Feel free to register and start using our service now!</p> <p>Best regards,<br>Notify Us</p> </div><div id='footer'> <p>© 2023 <a href='notifyus.tech' target='_blank'>notifyus.tech </a> All rights reserved.</p> </div></body></html>"

router.post("/", async(req, res) => {
    try {
        const info = await transporter.sendMail({
            from: "Notify@notifyus.tech",
            to: req.body.email,
            subject: "TEST MAIL",
            html: message,
            replyTo: "Notify@notifyus.tech",
        })

        // res.send(info.messageId)
        // Send a success response with a success message
        // res.send({ message: "Email sent successfully", messageId: info.messageId });
        res.render("Email_sucess", {
            message: "Email sent successfully",
            message2: `Your test mail has been successfully sent to (${req.body.email}).`,
            url: " / ",
            messageId: info.messageId
        });

    } catch (err) {
        console.log(err);
        res.render("error", { error: "Check your internet connection..." })
    }
})

module.exports = router;