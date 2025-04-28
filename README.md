
git remote add origin url
git add .
git commit -m "message"
git push origin branch_name


1. import express - node framework (handle http - req res )

2. cors (allowed port only access api)

3. app.use() - express middleware 

4. express.json() - convert json string to javascript object

5. dotenv.config(); - access environment varible

6. app.use("/", routes); - use routes

7. dbconnect (db connect success only startserver)

8. app.listen - express listen post

9. start server - startServer()

10. config-db.js  

mongoose - Mongoose is a JavaScript library
(mongoose.connect - connect mongodb)

11. create folder structure

-config
    -db.js
-src
    common
        -validation.schema.js
    constants
        -constant.message.js
    controllers
        -auth.controller.js
        -index.js
    middlewares
        -
    models
        -index.js
        -user-model.js
    routes
        -route.js
    services
        -auth.service.js
        -index.js
    utils
        -email.service.js
        -error.handler.js
        -index.js
        -send.verification.email.js
        -success.response.js

-.env
-.gitignore
-app.js
-README.md

12. yup npm - check req.body validation and also handles error

13. create random jwt secret key cmd:

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

14. yop.mail.com - check mail frontend

15. .gitignore 

/dist
/node_modules
/uploads
*.env

16. .env - maintain envionment variables

17. utils - common codes - reusable codes

18. index.js - modules exports here

19. password - bcrypt 

const hashedPassword = await bcrypt.hash(password, 10);

20. jwt - jsonwebtoken (token)

create token :

const token = jwt.sign(
    { userName: userDetials.userName, email: userDetials.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );


verify-token:

  const verifyUser = jwt.verify(req.query.token, process.env.JWT_SECRET);

21. nodemailer - send email


 const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  };  
  await transporter.sendMail(mailOptions);
