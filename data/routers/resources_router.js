const express = require("express");
const db = require("../config");

const router = express.Router({
    mergeParams: true,
});

router.get("/", async (req, res, next) => {
    try {
        res.json(await db("resources"));
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

        const [id] = await db("resources").insert(payload);
        const message = await db("resources").where("id", id).first();
        res.json(message);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
