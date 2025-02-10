exports.getFutureDate = (minutes) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  };