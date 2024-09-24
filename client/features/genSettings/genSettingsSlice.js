import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  origin: "",
  step: 0,
  waypoints: [],
  waypointStr: "",
};

export const genSettingsSlice = createSlice({
  name: "genSettings",
  initialState,
  reducers: {
    updateOrigin: (state, newOrigin) => {
      state.origin = newOrigin.payload;
    },

    updateDestination: (state, newDestination) => {
      state.destination = newDestination.payload;
    },

    updateStep: (state, newStep) => {
      state.step = newStep.payload;
    },

    updateWaypoints: (state, action) => {
      state.waypoints = action.payload;
      state.waypointStr = state.waypoints
        .slice(0, 11)
        .reduce((str, waypoint) => str + waypoint + "|", "&waypoints=")
        .slice(0, -1);
    },

    addWaypoint: (state, action) => {
      state.waypoints.push(action.payload);
      state.waypointStr = state.waypoints
        .slice(0, 11)
        .reduce((str, waypoint) => str + waypoint + "|", "&waypoints=")
        .slice(0, -1);
    },
  },
});

export const {
  updateDestination,
  updateOrigin,
  updateStep,
  updateWaypoints,
  addWaypoint,
} = genSettingsSlice.actions;
export default genSettingsSlice.reducer;
