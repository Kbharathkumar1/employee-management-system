import axios from "axios";

const BASE_URL = "https://employee-management-system-3-ril3.onrender.com/api/employees";

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