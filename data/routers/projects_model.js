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
        .select("t.*", "p.name", "p.description");
}

// function getProjectsById(project_id) {
//     return db("projects as p")
//         .join("projects_resources as pr", "pr.projects_id", "p.id")
//         .where("pr.projects_id", project_id)
//         .join("tasks as t", "t.projects_id", "p.id")
//         .where("t.projects_id", project_id)
//         .join("resources as r", "r.id", "pr.resources_id")
//         .select(
//             "p.id",
//             "p.name",
//             "p.description",
//             "p.completed",
//             "t.description",
//             "t.notes",
//             "r.name",
//             "r.description"
//         );
// }

// function getProjectsById(project_id) {
//     return db("projects as p")
//         .join("projects_resources as pr", "pr.projects_id", "p.id")
//         .where("pr.projects_id", project_id)
//         .select("p.id", "p.name", "p.description", "p.completed");
// }

function getProjectsById(project_id) {
    return db("projects as p")
        .where("p.id", project_id)
        .select("p.id", "p.name")
        .then((project_info) => {
            return db("tasks as t")
                .where("t.projects_id", project_id)
                .select("t.description", "t.notes")
                .then((tasks) => {
                    return db("projects_resources as pr")
                        .where("projects_id", project_id)
                        .join("resources as r", "r.id", "pr.resources_id")
                        .select("r.name")
                        .then((resources) => {
                            return {
                                project_info,
                                tasks,
                                resources,
                            };
                        });
                });
        });
}

// function getProjectTasksById(project_id) {
//     return (
//         db("projects as p")
//             .join("tasks as t")
//             .where("t.projects_id", project_id)
//             .select("t.description", "t.notes")
//     );
// }

// function getProjectResourcesById(project_id) {
//     return db("resources as r")
//         .join("projects_resources as pr", "pr.resources_id", "r.id")
//         .where("pr.projects_id", project_id)
//         .select("r.id", "r.name", "r.description");
// }

module.exports = {
    getProjects,
    getResources,
    getTaskList,
    getProjectsById,
    // getProjectTasksById,
    // getProjectResourcesById,
};
