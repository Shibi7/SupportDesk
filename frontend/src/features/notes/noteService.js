import axios from "axios";

const API_URL = "/api/tickets/";

// Get ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId + "/notes", config);

  // return response.data;
  return response.data;
};

// Create ticket Note
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + ticketId + "/notes",
    {
       "note":noteText,
      // text: noteText,
    },
    config
  );
  return response.data;
};

const getEmpNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "emp/" + ticketId + "/notes" +"/emp", config);

  // console.log(response.data);

  // return response.data;
  return response.data;
};

// Create ticket Note
const createEmpNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "emp/" + ticketId + "/notes/emp",
    {
       "note":noteText,
      // text: noteText,
    },
    config
  );

  return response.data;
};

const noteService = {
  getNotes,
  createNote,
  getEmpNotes,
  createEmpNote,
};

export default noteService;
