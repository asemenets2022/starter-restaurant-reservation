const knex = require("../db/connection");

function list() {
    return knex("reservations")
    .select("*")
    .orderBy("reservation_time");
}

function listByDate(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time");
}

function create(newReservation) {
    return knex("reservations")
    .insert({...newReservation, status: "booked"})
    .returning("*")
    .then((newReservation) => newReservation[0]);
}

function read(reservation_id) {
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .then((result) => result[0]);
}

function update(reservation_id) {
    return knex("reservations")
    .where({reservation_id})
    .update({ status: "seated"})
}

module.exports = {
    list,
    listByDate,
    create,
    read,
    update,
}