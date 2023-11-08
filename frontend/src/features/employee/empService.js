import axios from "axios";

const API_URL = "/api/emp/";

// // Register employee
// const register = async (userData) => {
//   const response = await axios.post(API_URL, userData);

//   if (response.data) {
//     localStorage.setItem("user", JSON.stringify(response.data));
//   }
//   return response.data;
// };

// Login employee
const loginEmp = async (empData) => {
  const response = await axios.post(API_URL + "login", empData);

  if (response.data) {
    localStorage.setItem("emp", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout employee
const logoutEmp = () => localStorage.removeItem("emp");

const empService = {
  logoutEmp,
  loginEmp,
};

export default empService;
