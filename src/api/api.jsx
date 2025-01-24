import axios from 'axios';

export const baseUrl = "https://photo-sharing-api-bootcamp.do.dibimbing.id";
export const userID = "dcc662d1-a1ea-40f7-984b-346729162ef0";
export const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF1cm9yYTAyQGdtYWlsLmNvbSIsInVzZXJJZCI6ImRjYzY2MmQxLWExZWEtNDBmNy05ODRiLTM0NjcyOTE2MmVmMCIsInJvbGUiOiJnZW5lcmFsIiwiaWF0IjoxNzM3MTg0NDM5fQ.gIFYw9Mo8YVc4zZ7RayiDHbY-lXH8CI7vJWlEw-kOXc";

export const apiKey = "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b";



export const apiClient = axios.create({
    baseURL: `${baseUrl}`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        apiKey: `${apiKey}`,
    },
});