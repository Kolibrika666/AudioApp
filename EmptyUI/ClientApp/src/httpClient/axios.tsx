import axios, { HttpStatusCode } from "axios";


export const httpClient = axios.create({
    headers: {
        "Content-type": "application/json"
    },
    baseURL: `${process.env.PUBLIC_URL}/api`
})

