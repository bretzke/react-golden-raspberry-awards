import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://tools.outsera.com/backend-java/api/movies",
});

