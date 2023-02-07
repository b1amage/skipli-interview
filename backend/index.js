const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const credentials = require("./firebaseKey.json");

const app = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.json({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

const generateRandomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max - min + 1));

const generateAccessCode = (length) =>
  Array(length)
    .fill()
    .map(() => generateRandomInteger(1, 9))
    .join("");

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;
const ACCESS_CODE_LENGTH = Number(process.env.ACCESS_CODE_LENGTH);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/phone/create", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const accessCode = generateAccessCode(ACCESS_CODE_LENGTH);
    const savedData = { phoneNumber, accessCode };
    const response = await db
      .collection("accounts")
      .doc(phoneNumber)
      .set(savedData);

    res.status(200).json({ message: "OK", response, phoneNumber });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/api/code/validate", async (req, res) => {
  try {
    const { accessCode, phoneNumber } = req.body;
    const query = await db.collection("accounts").doc(phoneNumber).get();
    const accessCodeInDb = query.data().accessCode;

    if (accessCode !== accessCodeInDb) {
      res.status(403).json({ message: "Wrong access code" });
    }

    res.status(200).json({
      message: "Access code match!",
      account: { accessCode, phoneNumber },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} in ${NODE_ENV} mode`);
});
