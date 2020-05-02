const express = require("express");
const helmet = require("helmet");
const projectRouter = require("./data/routers/projects_router");
const tasksRouter = require("./data/routers/tasks_router");
const resourceRouter = require("./data/routers/resources_router");
const server = express();
const port = process.env.PORT || 4000;

server.use(helmet());
server.use(express.json());

server.use("/projects", projectRouter);
server.use("/tasks", tasksRouter);
server.use("/resources", resourceRouter);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Something went wrong",
    });
});

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
