import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  isReady: boolean
}

const initialState: AppState = {
  isReady: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export const appReducer = appSlice.reducer
