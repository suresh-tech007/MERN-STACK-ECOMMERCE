import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  
} from "../constants/ProductContants.js";

const backedurl = "https://mern-stack-ecommerce-bh7z.onrender.com"
export const getProduct = (keyword='',currentPage = 1 , price=[0,150000],category,ratings=0) => async (dispatch) => {
  try {
    let link  = `${backedurl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings} ` ;
    if(category){
      link  = `${backedurl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}` ;
    }

 
    dispatch({ type: ALL_PRODUCT_REQUEST });
    

    const { data } = await axios.get(link,{  withCredentials: true, });
     
    

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response?.data.error ,
    });
  }
};
// Create Product == >
export const createproduct = (productData) => async (dispatch) => {
   
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

      const config = {
    headers: {
      "Content-Type": "multipart/form-data"
      
    }, withCredentials: true,
  };

    const { data } = await axios.post(`${backedurl}/api/v1/admin/product/new`,productData,config);
 
    
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
}
// Update  Product == >
export const updateProduct = (id,productData) => async (dispatch) => {
 
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

      const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    }, withCredentials: true,
  };
   

    const { data } = await axios.put(`${backedurl}/api/v1/admin/product/${id}`,productData,config);
     
    
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
   
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
}
// Delete Product == >
export const deleteproduct = (id) => async (dispatch) => {
   
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

      
   
    const config = {   withCredentials: true, };
    const { data } = await axios.delete(`${backedurl}/api/v1/admin/product/${id}` ,config);
 
    
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
}

// get products details 
export const getProductDetails = (id) => async (dispatch) => {
   
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
       
      const config = {   withCredentials: true, };
      const { data } = await axios.get(`${backedurl}/api/v1/product/${id}`,config);
  
 
      
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.Product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.error,
      });
    }
  }
// NEW REVIEW 
export const newReview = (reviewData) => async (dispatch) => {
   
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
      headers: {
        "Content-Type": "application/json",
      }, withCredentials: true,
    };

      const { data } = await axios.put(`${backedurl}/api/v1/review`,reviewData,config);
   
      
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.error,
      });
    }
  }

export const getAdminProduct=() => async(dispatch)=>{
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const config = {  withCredentials: true, credentials:"include"};
    const {data} =  await axios.get(`${backedurl}/api/v1/admin/products`,config);
    
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });

    
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
    
  }
}
// GET ALL  REVIEW OF A PRODUCT
export const getAllreviews = (id) => async (dispatch) => {
   
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
    const config = {   withCredentials: true, };

    const { data } = await axios.get(`${backedurl}/api/v1/reviews?id=${id}` ,config);
  
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.error,
    });
  }
}
// DELETE ALL  REVIEW OF A PRODUCT
export const deleteReviews = (reviewId,productId) => async (dispatch) => {
   
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST});
    const config = {   withCredentials: true, };

    const { data } = await axios.delete(`${backedurl}/api/v1/reviews?id=${reviewId}&productId=${productId}`,config );
 
    
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.error,
    });
  }
}

// Clearing Errors

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
