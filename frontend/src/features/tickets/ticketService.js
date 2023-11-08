import axios from "axios";

const API_URL = "/api/tickets/";

// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

// Get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  // console.log(response.data);
  return response.data;
};

// Get emp tickets
const getEmpTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL+"emp/", config);

  return response.data;
};

// Get user ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};

const getEmpTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "emp/"+ ticketId, config);
  return response.data;
};

// Close ticket
const closeEmpTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(stat);
  const response = await axios.put(
    API_URL+ "emp/" + ticketId,
    { status: "closed" },
    config
  );

  return response.data;
};
const openEmpTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(stat);
  const response = await axios.put(
    API_URL+ "emp/" + ticketId,
    { status: "open" },
    config
  );

  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  openEmpTicket,
  closeEmpTicket,
  getEmpTickets,
  getEmpTicket
};

export default ticketService;
