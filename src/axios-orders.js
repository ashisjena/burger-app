import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-bruger-52303.firebaseio.com"
});

export default instance;
