const express = require("express");
const cors = require("cors");
const MiniAppEncryption = require("./miniapp");

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "https://fabulous-marigold-7f700b.netlify.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.post("/decrypt", (req, res) => {
  const { key, code, data } = req.body;
  const decrypted = MiniAppEncryption.decryptMiniApp(key, code, data);
  res.json({ data: decrypted });
});

// const key = MiniAppEncryption.generateKeyMiniApp();
// const code = "exampleMiniAppCode";
// const plainText = JSON.stringify(
//     {
//       name: "aaaa",
//       age: "2001",
//     },
//   );

// const encrypted = MiniAppEncryption.encryptMiniApp(key, code, plainText);
// console.log("Encrypted:", encrypted);

// const decrypted = MiniAppEncryption.decryptMiniApp(key, code, encrypted);
// console.log("Decrypted:", decrypted);

// const decrypted = MiniAppEncryption.decryptMiniApp(
//   "nxM6T0yvekXn5bQ8",
//   "HIEN_MAU",
//   "Dh3Bj7DmGqw8AmpjpPgrgxkfcAg9tUMc63Se8/tYTLC7gNy6tdI4PcP/bNnitwnPJlhaQ5o87hKVA9uasx6VVh3jmYIAALbFG1Yud0zeZEThlbsvSiCkbZrJyZiCoh8yzUwEDtViyVpv4+BDHkX2cg=="
// );
// console.log("Decrypted:", decrypted);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
