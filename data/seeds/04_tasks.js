exports.seed = async function (knex) {
    await knex("tasks").insert([
        { description: "remove broken handle", projects_id: 1 },
        {
            description: "apply new handle to door with epoxy",
            notes: "epoxy needs to try for 24 hours before heavy use",
            projects_id: 1,
        },
        {
            description: "stop the leak in the bathroom toilet",
            notes: "leak is on the main pipe",
            projects_id: 2,
        },
    ]);
};
