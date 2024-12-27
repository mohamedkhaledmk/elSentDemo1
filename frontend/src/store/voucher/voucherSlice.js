import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import voucherService from "./voucherService";

export const getAllVouchers=createAsyncThunk("voucher/getAllVouchers",async(_,thunkAPI)=>{
    try {
        const response = await voucherService.getAllVouchers();
        return response;        
    } catch (error) {
        const message = (error.response && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue({ message, isError: true });
    }
})

export const disableAllVouchers=createAsyncThunk("voucher/disableAllVouchers",async(_,thunkAPI)=>{
    try {
        const response = await voucherService.disableAllVouchers();
        return response;        
    } catch (error) {
        const message = (error.response && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue({ message, isError: true });
    }
})

const initialState={
    vouchers:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
}

const voucherSlice = createSlice({
    name:"voucher",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false;
            state.isSuccess=false;
            state.isLoading=false;
            state.message="";
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(getAllVouchers.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getAllVouchers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.vouchers=action.payload;
            state.message="";
        })
        .addCase(getAllVouchers.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(disableAllVouchers.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(disableAllVouchers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(disableAllVouchers.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
    }
})


export const {reset} =voucherSlice.actions;
export default voucherSlice.reducer;