export const formatTime = (time) => {
  if (time >= 0 && time <= 23) {
    return `${time.toString().padStart(2, "0")}:00`;
  }
  return "Onbekend";
};
