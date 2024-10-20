export const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent"
});

export const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  year: "numeric",
  month: "short",
  day: "numeric"
});

export const currencyFormat = (value: number | string, currency: string = "ARS") => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value));
};

export const percentFormat = (value: number | string) => {
  return percentFormatter.format(Number(value));
};

export const dateFormat = (value: Date | string) => {
  let date = value;
  if (typeof date === "string") {
    date = new Date(date);
  }
  // remove utc offset
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  return dateFormatter.format(date);
};
