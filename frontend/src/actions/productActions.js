import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
} from "../constants/productConstants"
import Axios from "axios";



export const detailsProduct = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.get(`/api/task/tasks?userId=${userInfo._id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const createProduct = (inputDoc) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST, });
    const { userSignin: { userInfo } } = getState();
    try {
        //  2nd & 3rd parameters are optional. request-payload and header values.
        const { data } = await Axios.post('/api/task/create',inputDoc, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateProduct = (doc) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.post(`/api/task/edit`,doc, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const deleteProduct = (taskId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.post(`/api/task/delete?taskId=${taskId}`,{}, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

