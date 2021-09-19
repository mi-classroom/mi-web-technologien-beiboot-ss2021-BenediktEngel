/*
  Modules
*/
require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const exiftool = require('node-exiftool')
const exiftoolBin = require('dist-exiftool')
const ep = new exiftool.ExiftoolProcess(exiftoolBin)
const archiver = require("archiver");

/*
Enviorment-constiables
*/
const FILE_DIRECTORY = process.env.FILE_DIRECTORY || "../data";
const PORT = process.env.PORT || 8000;
const PATTERN = new RegExp(`${process.env.PATTERN}`) || new RegExp("(.*).tif.jpg$");
const JSONPATTERN = new RegExp(".json$", "i");
const FIELDS = JSON.parse(process.env.FIELDS);

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
     - POST /structure (Returns the directory- & file-tree)<br/>
     - POST /data with body.filepath (Returns IPTC data for the given path)<br/>
     - POST /image with body.filepath (Returns the image for the given path)<br/>
     - POST /json with body.filepath (Returns JSON-File at the given path)<br/>
     - PUT /data with body.filepath & body.data (Safes the IPTC data  for the given path)<br/>
  `);
});

/*
Route for getting the directory- and file-tree.
*/
app.post("/structure", async (req, res) => {
  let path = FILE_DIRECTORY;
  if (req.body.filepath === undefined) {
    return res.status(400).send("Missing Parameter: filepath");
  } else if(req.body.filepath !== ""){
    path = req.body.filepath;
  }
  res.send({filepath: path, structure: await getTree(path)});
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
  let output;
  await ep.open()
          .then((pid) => console.log('Started exiftool process %s', pid))
          .then(() => ep.readMetadata(filepath, ['-File:all']))
          .then((resp) => output = resp.data)
          .then(() => ep.close())
          .then(() => console.log('Closed exiftool'))
          .catch(console.error);
  let imageData = [];
  // Parse meta-data and send it back
  FIELDS.forEach(el => {
    imageData.push({
      field: el.field,
      label: el.label,
      data: output && output[0][el.field] ? output[0][el.field] : "",
      type: el.type, 
      write: el.write,
      multilang: el.multilang,
      maxChars: el.maxChars
    })
  })
  console.log(imageData)

  res.send({
    filepath,
    imageData
  })
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
  res.send({
    data,
    folder
  });
});

app.put("/data", async (req, res) => {
  if(!req.body.filepath || !req.body.data){
    return res.status(400).send("Missing Parameter: filepath and/or data");
  }
  ep.open()
    .then(() => ep.writeMetadata(req.body.filepath, {all: '', ...req.body.data}, ['overwrite_original']))
    .then(console.log, console.error)
    .then(() => ep.close())
    .then(res.status(200).send())
    .catch((err) => res.status(400).send(err));
  
})

app.post("/download", async (req, res) =>{
  if (req.body.filepath === undefined) {
    res.status(400).send("Fehlender Parameter: filepath");
  }
    await zipDirectory(req.body.filepath, "./download/folder.zip");
    res.download("./download/folder.zip");
})

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
    const found = fs.readdirSync(startpath, {
      withFileTypes: true
    });
    found.forEach((item) => {
      const path = startpath + "/" + item.name;
      const name = item.name;
      if (item.isDirectory()) {
        // If item is directory call getTree() with the new path and push the results in tree
        const type = "directory";
        const includes = getTree(path);
        const json = searchJson(path);

        tree.push({
          name,
          path,
          type,
          includes,
          json
        });
      } else {
        // Item is a file, check if the filename matches the given pattern, if true push the item in tree
        const type = "file";
        if (PATTERN.test(name)) tree.push({
          name,
          path,
          type
        });
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

//Zip the given folder
async function zipDirectory(source, out) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}
