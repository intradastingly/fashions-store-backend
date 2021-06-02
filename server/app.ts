import express, { NextFunction, Request, Response } from "express";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
/* const fileUpload = require('express-fileupload'); */
const port = process.env.PORT || 6969;
const app = express();
const cookieSession = require("cookie-session");
const productRouter = require("./resources/product/router");
const accountRouter = require("./resources/account/router");
const orderRouter = require("./resources/order/router");
const loginRouter = require("./resources/login/router");
const shippingRouter = require("./resources/shipping/router");
const uploadRouter = require("./resources/fileUpload/router");

const uri =
  "mongodb+srv://admin:admin@cluster0.4v0hr.mongodb.net/yousef?retryWrites=true&w=majority";

// error catcher
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}



mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.use(express.json());
    app.use(
      cookieSession({
        name: "session",
        secret: "SuperSecretKey",
        secure: false,
        maxAge: 100000 * 10,
        httpOnly: false,
        path: "/",
      })
    );
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    app.use("/api", errorHandler)
    app.use("/api", uploadRouter)

    app.use("/api", loginRouter);
    app.use("/api", productRouter);
    app.use("/api", accountRouter);
    app.use("/api", orderRouter);
    app.use("/api", shippingRouter);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
