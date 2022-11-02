const PUT = "PUT";
const DELETE = "DELETE";

const BASE_URL = "https://62a6bb9697b6156bff7e6251.mockapi.io/v1/";

export const API = {
  get: async (apiUrl) => {
    return fetch(`${BASE_URL}${apiUrl}`)
      .then((response) => response.json())
      .then((data) => data);
  },
  post: async (apiUrl, data) => {
    return fetch(`${BASE_URL}${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => data);
  },
  put: async (apiUrl, data) => {
    return fetch(`${BASE_URL}${apiUrl}`, {
      method: PUT,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data);
  },
  delete: async (apiUrl) => {
    return fetch(`${BASE_URL}${apiUrl}`, {
      method: DELETE,
    })
      .then((response) => response.json())
      .then((data) => data);
  },
};
