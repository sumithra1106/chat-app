const nodemailer = require("nodemailer");

exports.sendMail = async (to, subject, htmlContent) => {
 
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // configurated password in email (app password)
      },
    });
    console.log(transporter,"transporter");
    
    await transporter.verify();
    console.log("SMTP server is ready to take our messages");
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };
    return await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("SMTP verification or sendMail failed:", err.message);
    throw err
  }
};
