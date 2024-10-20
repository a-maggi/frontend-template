export enum Day {
  Lunes,
  Martes,
  "Miércoles",
  Jueves,
  Viernes,
  "Sábado",
  Domingo
}

export const getCurrentDayName = (): string => {
  const date = new Date(); // Current date in UTC
  const dateString = date.toLocaleDateString("en-US", {
    timeZone: "America/Argentina/Buenos_Aires"
  });
  const dateInArgentina = new Date(dateString);

  // Adjusting date calculation because toLocaleDateString resets time to midnight
  dateInArgentina.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const dayIndex = dateInArgentina.getDay();

  return Day[(dayIndex + 6) % 7];
};

export const currentDayName = getCurrentDayName();

export const days = Object.values(Day).filter((day) => typeof day === "string") as string[];
