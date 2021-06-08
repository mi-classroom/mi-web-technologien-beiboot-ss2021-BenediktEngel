/*
  Modules
*/
require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const exifr = require("exifr");
const stream = require("stream");
const cors = require("cors");
/*
Enviorment-constiables
*/
const FILE_DIRECTORY = process.env.FILE_DIRECTORY || "../data";
const PORT = process.env.PORT || 8000;
const PATTERN = new RegExp(`${process.env.PATTERN}`) || new RegExp("(.*).tif.jpg$");
const JSONPATTERN = new RegExp(".json$", "i");
/*
  Express settings
*/
app.use(express.json());
app.use(cors());
/*
  Routes
*/
app.get("/", (req, res) => {
  res.send(`
    Hello from server! Possible routes: <br/>
     - GET /structure (Returns the directory- & file-tree)<br/>
     - GET /data with body.filepath (Returns Exif & IPTC data for the given path)<br/>
     - GET /image with body.filepath (Returns the image for the given path)`);
});

/*
Route for getting the directory- and file-tree.
*/
app.get("/structure", async (req, res) => {
  res.send(await getTree(FILE_DIRECTORY));
});

/*
Route for getting the mata-data of an image.
body.filepath required
*/
app.post("/data", async (req, res) => {
  // Check if filepath exists
  if (!req.body.filepath) {
    return res.status(400).send("Missing Parameter: filepath");
  }
  // TODO: Check if filepath points to file
  // if (false) {
  //   return  res.status(400).send("Given path doesn't point to file");
  // }
  const filepath = req.body.filepath;
  // Parse meta-data and send it back
  exifr.parse(req.body.filepath, true).then((data) => res.send({ filepath, data }));
});

/*
Route for getting an image.
body.filepath required
*/
app.post("/image", (req, res) => {
  if (!req.body.filepath) {
    return res.status(400).send("Missing Parameter: filepath");
  }
  // TODO: Check if filepath points to file
  // if () {
  //   return  res.status(400).send("Given path doesn't point to file");
  // }
  imageBase64 = fs.readFileSync(req.body.filepath, "base64");
  res.send(imageBase64);
});

/*
Route for getting the Json.
body.filepath required
*/
app.post("/json", (req, res) => {
  if (!req.body.filepath) {
    return res.status(400).send("Missing Parameter: filepath");
  }
  // TODO: Check if filepath points to file
  // if () {
  //   return  res.status(400).send("Given path doesn't point to file");
  // }
  let folder = req.body.filepath.substring(0, req.body.filepath.lastIndexOf("/") + 1);
  let data = JSON.parse(fs.readFileSync(req.body.filepath));
  res.send({ data, folder });
});

/*
  Start the Server
*/
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/*
  Function for getting the tree
*/
function getTree(startpath) {
  const tree = [];
  try {
    // Read all files and directorys in startpath
    const found = fs.readdirSync(startpath, { withFileTypes: true });
    found.forEach((item) => {
      const path = startpath + "/" + item.name;
      const name = item.name;
      if (item.isDirectory()) {
        // If item is directory call getTree() with the new path and push the results in tree
        const type = "directory";
        const includes = getTree(path);
        const json = searchJson(path);

        tree.push({ name, path, type, includes, json });
      } else {
        // Item is a file, check if the filename matches the given pattern, if true push the item in tree
        const type = "file";
        if (PATTERN.test(name)) tree.push({ name, path, type });
      }
    });
    return tree;
  } catch (e) {
    // If error occurs return empty array
    return [];
  }
}

//Search Json-file in given path
function searchJson(thepath) {
  try {
    const found = fs.readdirSync(thepath);
    const jsonFiles = found.filter((item) => JSONPATTERN.test(item));
    if (jsonFiles.length > 0) return thepath + "/" + jsonFiles[jsonFiles.length - 1];
  } catch (e) {}
}
