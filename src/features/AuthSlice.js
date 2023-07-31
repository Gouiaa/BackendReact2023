import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {signup,signin} from "../services/Authservice";

export const register = createAsyncThunk(
    "auth/register",
async (user, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await signup(user);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
}});
export const login = createAsyncThunk(
   "auth/login",
async (user, thunkAPI) => {
try {
const res = await signin(user); // besh teba3th user kilada 
return res.data ;
} catch (error) {
return thunkAPI.rejectWithValue();
}});
export const logout = createAsyncThunk("auth/logout", () => {
localStorage.removeItem("CC_Token");  // tfaskh token 
});
export const authSlice = createSlice({  // hana besh tesn3 il slice
name: "auth",
initialState: {
user:null,  // user uarja null 
isLoading: false,
isSuccess: false,
isError: false,
errorMessage: "",
isLoggedIn:false, // kan connectée esh titbedl true hethy nest7a9ouhaa
},
reducers: { // besh ena ki namel déconnexion kol chay yetnaha : user lezem tvidih heka aleh kolhoum false
// Reducer comes here
reset:(state)=>{
state.isLoading=false
state.isSuccess=false 
state.isError=false
state.errorMessage=""
state.isLoggedIn=false
}
},
extraReducers: (builder) => {
//get articles
builder
//insertion user
.addCase(register.pending, (state, action) => {
state.isLoading=true;
state.status=null;
})
.addCase(register.fulfilled,(state, action) => {
state.user=action.payload;
state.isLoading=false;
state.status=null;
state.isSuccess=true
})
.addCase(register.rejected,(state, action) => {
state.isLoading=false;
state.isError=true
state.status=action.payload;
state.user=null
})
.addCase(login.pending, (state, action) => {
state.isLoading=true;
state.status=null;
})
.addCase(login.fulfilled, (state, action) => { // fulfilled besh naraf ili houya connecter
state.isLoggedIn = true;
state.isSuccess= true;
console.log(action.payload);
state.user = action.payload.user;
localStorage.setItem("CC_Token",action.payload.accessToken); // accesstoken ili amelneha fil backend 
console.log( localStorage.getItem("CC_Token"))
})
.addCase(login.rejected, (state, action) => {
state.isLoggedIn = false;
state.user = null;

})
.addCase(logout.fulfilled, (state, action) => {
state.isLoggedIn = false;
state.user = null;
})
}}
)
export const {reset} =authSlice.actions
export default authSlice.reducer;