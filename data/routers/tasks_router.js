const express = require("express");
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
