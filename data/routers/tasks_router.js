const express = require("express");
const taskRouter = require("./projects_model");
const db = require("../config");

const router = express.Router({
    mergeParams: true,
});

router.get("/", async (req, res, next) => {
    try {
        res.json(await db("tasks"));
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        taskRouter.getTaskList(id).then((tasks) => {
            res.json(tasks);
        });
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const payload = {
            description: req.body.description,
            notes: req.body.notes,
        };

        const [id] = await db("tasks").insert(payload);
        const message = await db("tasks").where("id", id).first();
        res.json(message);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
