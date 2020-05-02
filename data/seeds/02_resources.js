exports.seed = async function (knex) {
    await knex("resources").insert([
        {
            name: "Garage Door Handle",
            description: "it's a garage door handle",
        },
        {
            name: "Epoxy",
            description: "sealant for a pipe and an industrial adhesive",
        },
    ]);
};
