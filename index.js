import express from "express";
import fs from "fs";
import { format } from "date-fns";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;
const folderPath = path.join(__dirname, "Timestamp");

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<span style="background-color:Aqua;color:black;font-size:100px">Welcome to our first app in Node.js</span>`
    );
});

app.get("/create", (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
  const filepath = path.join(folderPath, `${today}.txt`);
  fs.writeFileSync(filepath, `${today}`, "utf8");
  res.status(200).send(`File created with timestamp: ${today}`);
});

app.get("/read", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading folder");
    }
    const fileContents = files.map((file) => {
      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, "utf8");
      return { file, content };
    });
    res.status(200).json(fileContents);
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
