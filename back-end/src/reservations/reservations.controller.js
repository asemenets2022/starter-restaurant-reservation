/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_RESERVATION_FIELDS = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]

function isValidReservation(req, res, next) {
  const reservation = req.body.data;

  if (!reservation) {
    return next({ status: 400, message: `Must have data property.` });
  }

  VALID_RESERVATION_FIELDS.forEach((field) => {
    if (!reservation[field]) {
      return next({ status: 400, message: `${field} field required` });
    }
  });

  next();
}

function isNotOnTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const [year, month, day] = reservation_date.split("-");
  const date = new Date(`${month} ${day}, ${year}`);
  res.locals.date = date;
  if (date.getDay() === 2) {
    return next({ status: 400, message: "Location is closed on Tuesdays" });
  }
  next();
}

function isInTheFuture(req, res, next) {
  const date = res.locals.date;
  const today = new Date();
  if (date < today) {
    return next({ status: 400, message: "Must be a future date" });
  }
  next();
}

function list(req, res, next) {
  reservationsService
  .list()
  .then((data) => res.json({ data }))
  .catch(next);
}

async function create(req, res, next) {
  const reservation = req.body.data;
  const { reservation_id } = await reservationsService.create(reservation);
  reservation.reservation_id = reservation_id;
  res.status(201).json({ data: reservation });
}
 
module.exports = {
  list,
  create: [asyncErrorBoundary(isValidReservation),
          isNotOnTuesday,
          isInTheFuture,
        asyncErrorBoundary(create)
      ],
};
