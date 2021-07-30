import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Games extends BaseSchema {
  protected tableName = "games";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("type").notNullable();
      table.string("description").notNullable();
      table.string("color").notNullable();
      table.integer("range").notNullable();
      table.float("price").notNullable();
      table.integer("max_number").notNullable();
      table.float("min_cart_value").notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
