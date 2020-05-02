const express = require("express");
const projectsModel = require("./projects_model");
const db = require("../config");

const router = express.Router({
    mergeParams: true,
});

router.get("/", async (req, res, next) => {
    try {
        res.json(await db("projects"));
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        projectsModel.getProjectsById(id).then((project) => {
            res.json(project);
        });
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            description: req.body.description,
        };

        const [id] = await db("projects").insert(payload);
        const message = await db("projects").where("id", id).first();
        res.json(message);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
