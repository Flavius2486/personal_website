import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import bcrypt from "bcrypt";
import fs from "fs";

import databaseConnection from "./database/connection.js";
import upload from "./storage/multer.js";

import aboutMe from "./database/schema/about_me.js";
import admin from "./database/schema/admin.js";
import projects from "./database/schema/projects.js";
import skills from "./database/schema/skills.js";

databaseConnection();

const app = express();
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  sessions({
    secret: "lvwaeffawef49wefgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //one day
    resave: false,
  })
);

/*---------------------------------------*\
              Home page
/*---------------------------------------*/

app.get("/", async (req, res) => {
  Promise.all([aboutMe.find({}), projects.find({}), skills.find({})])
    .then((data) => {
      res.render("index.hbs", {
        layout: false,
        data: { about: data[0][0], projects: data[1], skills: data[2] },
      });
    })
    .catch((err) => console.log(err));
});

/*---------------------------------------*\
              Admin page
/*---------------------------------------*/

app.get("/admin", (req, res) => {
  const session = req.session;
  if (session.password && session.username) {
    Promise.all([aboutMe.find({}), projects.find({}), skills.find({})])
      .then((data) => {
        data[0][0].instagram = {
          link: data[0][0].instagram,
          username: data[0][0].instagram.split("/")[3],
        };
        data[0][0].github = {
          link: data[0][0].github,
          username: data[0][0].github.split("/")[3],
        };
        res.render("admin.hbs", {
          layout: false,
          data: { about: data[0][0], projects: data[1], skills: data[2] },
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/login");
  }
});

/*---------------------------------------*\
              Project page
/*---------------------------------------*/

app.get("/projects/:id", (req, res) => {
  projects
    .findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        res.render("pageNotFound.hbs", {
          layout: false,
        });
      } else {
        res.render("projects.hbs", { layout: false, project: data });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

/*---------Update description--------*/

app.post("/admin/update-detalies", (req, res) => {
  const { fullName, firstName, description } = req.body;
  //update the text inside database got from the api
  aboutMe
    .findOneAndUpdate(
      {},
      {
        $set: {
          firstName: firstName,
          fullName: fullName,
          description: description,
        },
      },
      {
        returnOriginal: false,
        projection: { _id: 0, firstName: 0, fullName: 0, description: 0 },
      }
    )
    .catch((err) => {
      throw err;
    });
});

/*-------------Add skill-----------------*/

app.post("/admin/add-skill", upload.single("icon"), (req, res) => {
  const textData = JSON.parse(req.headers["text-data"]);
  //pushing the object inide the skills array fro database
  skills
    .create({
      iconPath: req.file.path.substring(7).replace(/\\/g, "/"),
      technologyName: textData.technologyName,
    })
    .then((result) => {
      res.json("New skill added successfully");
    })
    .catch((err) => {
      throw err;
    });
});

/*-------------Delete skill----------------*/

app.post("/admin/delete-skill", (req, res) => {
  const { iconPath } = req.body;
  //verifying if the file actually exists
  console.log(iconPath);
  fs.access("public/" + iconPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.json("Icon file could not be found");
    } else {
      skills
        .findOneAndDelete({ iconPath: iconPath })
        .then((result) => {
          //deleting the file
          fs.unlink("public/" + result.iconPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            res.json("Skill removed successfully");
          });
        })
        .catch((err) => {
          throw err;
        });
    }
  });
});

/*-------------Add project-----------------*/

app.post("/admin/add-project", upload.array("projectImg"), (req, res) => {
  const textData = JSON.parse(req.headers["text-data"]);
  const projectImages = req.files;
  let newProjectImagesPath = [];
  projectImages.forEach((projectImage) => {
    newProjectImagesPath.push(projectImage.path.substring(7));
  });
  projects
    .create({
      title: textData.title,
      contribution: textData.contribution,
      detalies: textData.detalies,
      technologiesUsed: textData.technologies,
      imagesPath: newProjectImagesPath,
      projectLink: textData.projectLink,
    })
    .then(() => {
      res.json("Project added successfully");
    })
    .catch((err) => {
      throw err;
    });
});

/*----------Delete rpoject -------------*/

app.post("/admin/delete-project", (req, res) => {
  const { id } = req.body;
  projects
    .findOneAndDelete({ _id: id }) //delete the project
    .then((deletedProject) => {
      deletedProject.imagesPath.forEach((imgPath) => {
        fs.unlink("public/" + imgPath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
      res.json("Project deleted successfully");
    })
    .catch((err) => {
      throw err;
    });
});

/*-----------Edit contact links-----------*/

app.post("/admin/edit-contact", (req, res) => {
  const {
    instagram,
    github,
    mail,
  } = req.body;
  aboutMe
    .findOneAndUpdate(
      {},
      {
        $set: {
          instagram: instagram,
          github: github,
          mail: mail,
        },
      }
    )
    .then(() => {
      res.json("Links updated successfully");
    })
    .catch((error) => {
      throw error;
    });
});

/*-----------------------------------*\
              Log In form
/*-----------------------------------*/

app.get("/login", (req, res) => {
  res.render("adminLogin.hbs", { layout: false });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let session = req.session;
  if(username && password){
    admin
    .findOne({})
    .then((data) => {
      bcrypt.compare(username, data.password, (err, result) => {
        if (err) throw err;
        else if (result == true) {
          bcrypt.genSalt(10, function (err, salt) {
            if (err) throw err;
            else {
              bcrypt.hash(password, salt, function (err, cryptedPassword) {
                if (err) throw err;
                admin
                  .findOneAndUpdate(
                    {},
                    { $set: { password: cryptedPassword } },
                    {
                      returnOriginal: false,
                      projection: { _id: 0, password: 1 },
                    }
                  )
                  .then((result) => {
                    session.password = result.password;
                    session.username = username;
                    res.json({ login: true });
                  })
                  .catch((err) => {
                    throw err;
                  });
              });
            }
          });
        } else {
          bcrypt.compare(password, data.password, (err, result) => {
            if (err) throw err;
            else if (result === true && username === data.username) {
              session.password = password;
              session.username = username;
              res.json({ login: true });
            } else res.json("Invalid password");
          });
        }
      });
    })
    .catch((err) => {
      throw err;
    });
  }else{
    res.json({ login: false });
  }
});

app.get("/*", (req, res) => {
  res.render("pageNotFound.hbs", {
    layout: false,
  });
});

app.listen(3000, (req, res) => {
  console.log(`listening on port 3000......`);
});
