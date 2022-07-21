 const knex = require("../db/connection");

 function list() {
    return knex("tables").select("*").orderBy("table_name");
 }

 function create(newTable) {
    return knex("tables")
      .insert({
        ...newTable,
        table_status: newTable.reservation_id ? "occupied" : "free",
      })
      .returning("*")
      .then((result) => result[0]);
  }

 module.exports = {
    list,
    create,
 }