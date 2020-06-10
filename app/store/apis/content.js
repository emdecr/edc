import axios from "axios";

const url = process.env.CMS_API_URL;

export default axios.create({
  baseURL: url
});
