exports.seed = async function (knex) {
    await knex("projects").insert([
        {
            name: "Fix the garage door",
            description: "replace the external handle",
        },
        { name: "Fix the toilet", description: "seal the pipe" },
    ]);
};
