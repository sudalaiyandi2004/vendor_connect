import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import saleService from './saleService'

const initialState = {
  sales: [],
  isError2: false,
  isSuccess2: false,
  isLoading2: false,
  message2: '',
  pur: [],
  isError3: false,
  isSuccess3: false,
  isLoading3: false,
  message3: '',
  dri: [],
  isError4: false,
  isSuccess4: false,
  isLoading4: false,
  message4: '',
}
export const createSales = createAsyncThunk(
    'sales/create',
    async (saleData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await saleService.createSales(saleData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const getSales = createAsyncThunk(
    'sales/getAll',
    async (fuser, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token

        return await saleService.getSales(token,fuser)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const getBuy = createAsyncThunk(
    'sales/getAllBuy',
    async (tuser, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        
        return await saleService.getBuy(token,tuser)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const getDri = createAsyncThunk(
    'sales/getAllDri',
    async (duser, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        console.log(duser)
        return await saleService.getDri(token,duser)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
export const saleSlice = createSlice({
    name: 'sale',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createSales.pending, (state) => {
          state.isLoading2 = true
        })
        .addCase(createSales.fulfilled, (state, action) => {
          state.isLoading2 = false
          state.isSuccess2 = true
          state.sales.push(action.payload)
        })
        .addCase(createSales.rejected, (state, action) => {
          state.isLoading2 = false
          state.isError2 = true
          state.message2 = action.payload
        })
        .addCase(getSales.pending, (state) => {
          state.isLoading2 = true
        })
        .addCase(getSales.fulfilled, (state, action) => {
          state.isLoading2 = false
          state.isSuccess2 = true
          state.sales= action.payload
        })
        .addCase(getSales.rejected, (state, action) => {
          state.isLoading2 = false
          state.isError2 = true
          state.message2= action.payload
        })
        .addCase(getBuy.pending, (state) => {
          state.isLoading3 = true
        })
        .addCase(getBuy.fulfilled, (state, action) => {
          state.isLoading3 = false
          state.isSuccess3 = true
          state.pur= action.payload
        })
        .addCase(getBuy.rejected, (state, action) => {
          state.isLoading3 = false
          state.isError3 = true
          state.message3= action.payload
        })
        .addCase(getDri.pending, (state) => {
          state.isLoading4 = true
        })
        .addCase(getDri.fulfilled, (state, action) => {
          state.isLoading4 = false
          state.isSuccess4 = true
          state.dri= action.payload
        })
        .addCase(getDri.rejected, (state, action) => {
          state.isLoading4 = false
          state.isError4 = true
          state.message4= action.payload
        })
    },
})

export const { reset } = saleSlice.actions
export default saleSlice.reducer
