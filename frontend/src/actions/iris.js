import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_IRIS_DATA, DELETE_ONE_IRIS, UPDATE_ONE_IRIS, ADD_ONE_IRIS, SET_EDIT_IRIS, SET_EDIT_IRIS_CLUSTER } from "./types";

// GET IRIS DATA
export const getIris = () => (dispatch, getState) => {
  axios
    .get("/api/iris/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_IRIS_DATA,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE one iris
export const deleteOneIris = id => (dispatch, getState) => {
  axios
    .delete(`/api/iris/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteOneIris: "iris Deleted" }));
      dispatch({
        type: DELETE_ONE_IRIS,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const setEditedIris = iris => (dispatch, getState) => {
  console.log("setEditedIris called");
  dispatch({
    type: SET_EDIT_IRIS,
    payload: iris
  })
}


export const setIrisCluster = irisCluster => (dispatch, getState) => {
  console.log("setIrisCluster called");
  dispatch({
    type: SET_EDIT_IRIS_CLUSTER,
    payload: irisCluster
  })
}


// UPDATE one iris
export const updateOneIris = iris => (dispatch, getState) => {
  axios
    .put(`/api/iris/${iris.id}/`, iris, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateOneIris: "iris Updated" }));
      dispatch({
        type: UPDATE_ONE_IRIS,
        payload: iris
      });
    })
    .catch(err => console.log(err));
};

// ADD one iris
export const addOneIris = iris => (dispatch, getState) => {
  axios
    .post("/api/iris/", iris, tokenConfig(getState))
    .then(res => {
      console.log("add one iris success", res.data);

      dispatch(createMessage({ addOneIris: "iris Added" }));
      
      dispatch({
        type: ADD_ONE_IRIS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
