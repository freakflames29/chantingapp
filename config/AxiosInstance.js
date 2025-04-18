import axios from "axios";
import {ROOT_URL} from "./Constants";
import {useSelector} from "react-redux";

export const authInstance = axios.create({
    baseURL:ROOT_URL
})


