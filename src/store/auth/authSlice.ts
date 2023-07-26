import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents the initial state of the authentication slice.
 */
type InitialState = {
  /**
   * The authentication token.
   */
  token: string | null;
};

/**
 * The initial state for the authentication slice.
 */
const initialState: InitialState = {
  token: null,
};

/**
 * Redux slice for handling authentication token.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Action to store the authentication token in the state.
     * @param state - The current state of the authentication slice.
     * @param action - The action containing the payload with the token.
     */
    storeToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
  },
});

export default authSlice.reducer;
export const { storeToken } = authSlice.actions;
