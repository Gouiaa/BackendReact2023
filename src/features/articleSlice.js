import { createSlice,createAsyncThunk } from '@reduxjs/toolkit' // create khater bech temchi lil backend
import {fetchArticles,addArticle,deleteArticle,editArticle,fetchArticlePageServ, fetchArticleById} from"../Service/ArticleService"

export const getArticles = createAsyncThunk(
    "article/getArticles",
    async (_, thunkAPI) => {
const { rejectWithValue } = thunkAPI
try {
const res = await fetchArticles();
return res.data;  //yetsama payload 
}
catch (error) {
return rejectWithValue(error.message); // kan pading w manjehtich irajali error 
}
}
); 

export const getArticlespages = createAsyncThunk(
    "article/getArticlespages",
    async (mesParams, thunkAPI) => {
const { rejectWithValue } = thunkAPI
try {
const res = await fetchArticlePageServ(mesParams.currentpage,mesParams.itemsPerPage);
return res.data;  //yetsama payload 
}
catch (error) {
return rejectWithValue(error.message); // kan pading w manjehtich irajali error 
}
}
);
export const createArticle = createAsyncThunk("article/createArticle",
async (article, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await addArticle(article);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const delArticle = createAsyncThunk(
"article/delArticle",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
await deleteArticle(id);
return id ;
}
catch (error) {
return rejectWithValue(error.message);
}
});
export const updateArticle = createAsyncThunk("article/updateArticle",
async (article, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await editArticle(article);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
}
}

);
export const findArticleByID = createAsyncThunk(
"article/findArticleByID",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res = await fetchArticleById(id);
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
});
export const articleSlice = createSlice({
name: 'article',
initialState:{
articles:[],
article:{},
isLoading: false,
success:null,
error:null,
},

extraReducers: (builder) => {
//get articles
builder
.addCase(getArticles.pending, (state, action) => { /// besh yebath pending
    state.isLoading=true;
    state.error=null;
    })
    .addCase(getArticles.fulfilled, (state, action) => {
    state.isLoading=false;
    state.error = null;
    state.articles=action.payload;
    })
    .addCase(getArticles.rejected, (state, action) => {
    state.isLoading=false;
    state.error=action.payload;
    console.log("impossible de se connecter au serveur")
    })

.addCase(getArticlespages.pending, (state, action) => { /// besh yebath pending
state.isLoading=true;
state.error=null;
})
.addCase(getArticlespages.fulfilled, (state, action) => {
state.isLoading=false;
state.error = null;
state.articles=action.payload;
})
.addCase(getArticlespages.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})
//insertion article
.addCase(createArticle.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(createArticle.fulfilled, (state, action) => {
    state.articles = [ action.payload,...state.articles];
///state.articles.push(action.payload);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
.addCase(createArticle.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
state.success=null;
})
//Modification article
.addCase(updateArticle.pending, (state, action) => {
state.isLoading=true; //besh fil composant yamel en cours de modification : un petit mesg : nijem ikoun réseau
state.error=null;
state.success=null;
})
.addCase(updateArticle.fulfilled, (state, action) => {
state.articles = state.articles.map((item) =>
item._id === action.payload._id ? action.payload : item
);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
//Delete article
.addCase(delArticle.pending, (state, action) => {
state.isLoading=true;
state.error=null;
})
.addCase(delArticle.fulfilled, (state, action) => {
state.isLoading=false;
state.error=null;
state.articles=state.articles.filter((item)=> item._id!==action.payload)
})
.addCase(delArticle.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
})
//Fectch article
.addCase(findArticleByID.pending, (state, action) => {
state.isLoading = true
state.error=null;
})
.addCase(
findArticleByID.fulfilled,(state, action) => {
state.isLoading = false
state.error = null
state.article=action.payload;
})
}
}
)

export default articleSlice.reducer;
/// il existe 3 actions : article/getartcle/pending || article/getarticles/fulfilled || article//getarticles/rejected