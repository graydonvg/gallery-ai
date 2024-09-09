import { Resource } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  data: Resource[];
};

const initialState: State = {
  data: [],
};

const resourceSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    resourcesAdded(state, action: PayloadAction<Resource[]>) {
      state.data = action.payload;
    },
    favoriteRemoved(state, action: PayloadAction<{ publicId: string }>) {
      state.data = state.data.filter(
        (resource) => resource.public_id !== action.payload.publicId,
      );
    },
  },
});

const { actions, reducer } = resourceSlice;

export const { resourcesAdded, favoriteRemoved } = actions;

export const resourceReducer = reducer;
