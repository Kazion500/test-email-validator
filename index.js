const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const expressFileUpload = require("express-fileupload");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.use(morgan('short'));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());



app.get("/", async (_, res) => {
  try {
    const user = await prisma.account.findMany({
      include: {
        contact: true,
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post("/", async (req, res) => {
  try {
    const data = req.body;
    const user = await prisma.account.create({
      data,
      select: {
        name: true,
        contact: true,
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await prisma.account.update({
      data,
      where: {
        id: parseInt(id, 10),
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.account.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get("/contact", async (_, res) => {
  try {
    const user = await prisma.contact.findMany();
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post("/contact", async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  createUploadFolder()

  try {
    const fileName = `${Date.now()}_${req.files.photo.name}`;
    const data = req.body;
    await req.files.photo.mv(`./uploads/${fileName}`);
    data["photo"] = `${req.hostname}:3000/uploads/${fileName}`;
    
    const user = await prisma.contact.create({
      data: {
        email: data.email,
        accountId: parseInt(data.account),
        photo: data.photo,
      },
      select: {
        email: true,
        accountId: true,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
});

app.put("/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await prisma.contact.update({
      data,
      where: {
        id: parseInt(id, 10),
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.delete("/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.contact.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

function createUploadFolder() {
  if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
    return true;
  }
  return false
}

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

module.exports = app;