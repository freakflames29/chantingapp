import axios from "axios";
import {ROOT_URL} from "./Constants";

export const authInstance = axios.create({
    baseURL:ROOT_URL
})