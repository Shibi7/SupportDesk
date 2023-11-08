import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import empService from "./empService";

// Get employee from local storage
const emp = JSON.parse(localStorage.getItem("emp"));

const initialState = {
  emp: emp ? emp : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Login a employee
export const loginEmp = createAsyncThunk("emp/login", async (emp, thunkAPI) => {
  try {
    return await empService.loginEmp(emp);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Logout emp
export const logoutEmp = createAsyncThunk("emp/logout", async () => {
  await empService.logoutEmp();
});

export const empSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEmp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginEmp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.emp = action.payload;
      })
      .addCase(loginEmp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Filled by thunkAPI.rejectWithValue(message)
        state.emp = null;
      })
      .addCase(logoutEmp.fulfilled, (state) => {
        state.emp = null;
      });
  },
});

export const { reset } = empSlice.actions;
export default empSlice.reducer;
