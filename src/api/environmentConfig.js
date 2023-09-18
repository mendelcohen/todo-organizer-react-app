export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEVELOPMENT
    : "";

console.log(process.env.NODE_ENV);
