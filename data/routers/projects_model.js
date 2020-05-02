const db = require("../config");

function getProjects() {
    return db("projects");
}

function getResources() {
    return db("resources");
}

function getTaskList(projects_id) {
    return db("tasks as t")
        .leftJoin("projects as p", "p.id", "t.projects_id")
        .where("t.projects_id", projects_id)
        .select("p.name", "t.description", "t.notes");
}
module.exports = {
    getProjects,
    getResources,
};
