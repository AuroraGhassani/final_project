import axios from 'axios';

export const baseUrl = "https://photo-sharing-api-bootcamp.do.dibimbing.id";
export const userID = "628bbfda-a143-46a3-ab22-ef7e0456505a";
export const jwtToken = localStorage.getItem("jwtToken");

export const apiKey = "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b";



export const apiClient = axios.create({
    baseURL: `${baseUrl}`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        apiKey: `${apiKey}`,
    },
});