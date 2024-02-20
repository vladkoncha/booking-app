export const isReservationConflicting = (
  newCheckIn: Date,
  newCheckOut: Date,
  existingCheckIn: Date,
  existingCheckOut: Date
) => {
  return (
    (newCheckOut >= existingCheckIn && newCheckOut <= existingCheckOut) ||
    (newCheckIn <= existingCheckIn && newCheckOut >= existingCheckOut)
  );
};
