import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleSlice"
import scategoriesReducer from "../features/scategorieSlice"
import cartSliceReducer from "../features/CartSlice"
import authReducer from "../features/AuthSlice"

const store = configureStore({
reducer: {
storearticles:articlesReducer,
storecart:cartSliceReducer,
storescategories:scategoriesReducer,
auth:authReducer,

}
})
export default store