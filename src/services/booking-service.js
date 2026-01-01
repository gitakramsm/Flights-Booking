const { StatusCodes } = require("http-status-codes");
const axios = require("axios");
const { BookingRepository } = require("../repositories");
const { ServerConfig, Queue } = require("../config");
const db = require("../models");
const AppError = require("../utils/errors/app-error");

const bookingRepository = new BookingRepository();

async function createBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    //get flight
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
    );
    //check seats availability
    const flightData = flight.data.data;
    if (data.noOfSeats > flightData.totalSeats) {
      throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
    }
    //create booking itenary and return to user so that he proceed to booking
    const totalBillingAmount = data.noOfSeats * flightData.price;
    const bookingPayload = { ...data, totalCost: totalBillingAmount };
    const booking = await bookingRepository.createBooking(
      bookingPayload,
      transaction
    );
    //reserve or update seats for this booking until payment done / not.
    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noOfSeats,
      }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    // console.log(error);
    await transaction.rollback();
    throw error;
  }
}
module.exports = {
  createBooking,
};
