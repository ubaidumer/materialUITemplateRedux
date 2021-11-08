import  { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    view:[]
}

const slice = createSlice({
    name:'view',
    initialState,
    reducers:{
        getData(state,action){
            const post = action.payload;
            state.view = post;
        },
        addData(state,action){
            const post = action.payload;
            state.view = post;
        }
    }
})
export const reducer = slice.reducer;
export const getData = () => async (dispatch) => {
    const response =  await axios.get('http://localhost:4000/post');
    dispatch(slice.actions.getData(response.data));
};
export const addData = (param) => async (dispatch) => {
    const response =  await axios.post('http://localhost:4000/post',{
        userId:param.userId,
        title:param.title,
        body:param.body
    });
    console.log(response.data);
};
export default slice;