// import essential
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const credentials = require("./firebaseKey.json");
dotenv.config();

const accountId = process.env.ID;
const token = process.env.TOKEN;
const client = require("twilio")(accountId, token);

const app = express();

// CORS and use json format
app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Firebase config
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

// Helpers
const generateRandomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max - min + 1));

const generateAccessCode = (length) =>
  Array(length)
    .fill()
    .map(() => generateRandomInteger(1, 9))
    .join("");

// Constants
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;
const ACCESS_CODE_LENGTH = Number(process.env.ACCESS_CODE_LENGTH);

// Create phone
app.post("/api/phone/create", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const accessCode = generateAccessCode(ACCESS_CODE_LENGTH);
    const savedData = { phoneNumber, accessCode };
    await db.collection("accounts").doc(phoneNumber).set(savedData);
    client.messages
      .create({
        body: `Access code: ${accessCode}`,
        from: process.env.TWILIO_NUMBER,
        to: phoneNumber,
      })
      .then((message) => console.log(message.sid));

    res.status(200).json({
      isSuccess: true,
      message: `Your access code is sent to ${phoneNumber}`,
    });
  } catch (err) {
    res.status(400).send({ isSuccess: false, message: "Error" });
  }
});

// Validate access code
app.post("/api/code/validate", async (req, res) => {
  try {
    const { accessCode, phoneNumber } = req.body;
    const query = await db.collection("accounts").doc(phoneNumber).get();
    const accessCodeInDb = query.data().accessCode;

    if (accessCode !== accessCodeInDb) {
      res.status(200).json({ isSuccess: false, message: "Wrong access code" });
    } else {
      res.status(200).json({
        isSuccess: true,
        message: "Access code match!",
        account: { accessCode, phoneNumber },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ isSuccess: false, message: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} in ${NODE_ENV} mode`);
});
