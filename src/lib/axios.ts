import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://challenge.outsera.tech/api/movies",
});

