import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      const exisitingPastes = JSON.parse(localStorage.getItem("pastes"));
      if(exisitingPastes!==null){
        const existing = exisitingPastes.find((p) => {
          return p.title === paste.title && p.content === paste.content;
        });
        if (existing !== undefined) {
          toast.error("paste already exists");
          return;
        }
      }
      

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Saved Successfully!");
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((p) => p.id === paste.id);
      

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated!");
      }
    },
    resetAllPastes: (state, action) => {
      localStorage.removeItem("pastes");
      state.pastes = [];
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((p) => p.id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Succesfully Deleted!");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPastes, removeFromPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
