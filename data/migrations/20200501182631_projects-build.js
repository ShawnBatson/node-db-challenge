exports.up = async function (knex) {
    await knex.schema.createTable("projects", (table) => {
        table.increments("id");
        table.text("name").notNullable();
        table.text("description");
    });
    await knex.schema.createTable("resources", (table) => {
        table.increments("id");
        table.text("name").notNullable();
        table.text("description");
    });
    await knex.schema.createTable("projects_resources", (table) => {
        table.integer("projects_id").references("id").inTable("projects");
        table.integer("resources_id").references("id").inTable("resources");
        table.primary(["projects_id", "resources_id"]);
    });
    await knex.schema.createTable("tasks", (table) => {
        table.increments("id");
        table.text("description").notNullable();
        table.text("notes");
        table.integer("projects_id").references("id").inTable("projects");
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("projects_resources");
    await knex.schema.dropTableIfExists("tasks");
    await knex.schema.dropTableIfExists("resources");
    await knex.schema.dropTableIfExists("projects");
};
