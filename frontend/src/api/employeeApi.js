import axios from "axios";

const BASE_URL = "http://localhost:9191/api/employees";

export function getAllEmployees() {
    return axios.get(BASE_URL);
}

export function addEmployee(employee) {
    return axios.post(BASE_URL, employee);
}

export function getEmployeeById(id) {
    return axios.get(`${BASE_URL}/${id}`);
}

export function updateEmployee(id, employee) {
    return axios.put(`${BASE_URL}/${id}`, employee);
}

export function deleteEmployee(id) {
    return axios.delete(`${BASE_URL}/${id}`);
}