const knex = require("../db/connection");

function list() {
    return knex("reservations")
    .select("*")
    .whereNot({status: "finished"})
    .orderBy("reservation_time");
}

function listByDate(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({status: "finished"})
    .orderBy("reservation_time");
}

function search(mobile_number) {
    return knex("reservations")
    .whereRaw("translate(mobile_number, '() -', '') like ?",
    `%${mobile_number.replace(/\D/g, "")}%`)
    .orderBy("reservation_date");
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
    .update({ status: "seated"});
}

function updateReservationStatus(reservation_id, newStatus) {
    return knex("reservations")
    .where({ reservation_id })
    .update({ status: newStatus })
    .returning("*")
    .then(result => result[0]);
}

function updateReservation(reservation) {
    const {
        reservation_id,
        first_name,
        last_name,
        mobile_number, 
        reservation_date,
        reservation_time,
        people
    } = reservation;
    return knex("reservations")
    .where({reservation_id})
    .update(reservation, "*")
    .returning("*")
    .then((updated) => updated[0]);
}

module.exports = {
    list,
    listByDate,
    search,
    create,
    read,
    update,
    updateReservationStatus,
    updateReservation,
}