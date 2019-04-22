import { GET_IRIS_DATA, DELETE_ONE_IRIS, ADD_ONE_IRIS, CLEAR_IRIS_DATA } from "../actions/types.js";

const initialState = {
  iris: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_IRIS_DATA:
      return {
        ...state,
        iris: action.payload
      };
    case DELETE_ONE_IRIS:
      return {
        ...state,
        iris: state.iris.filter(one_iris => one_iris.id !== action.payload)
      };
    case ADD_ONE_IRIS:
      return {
        ...state,
        iris: [...state.iris, action.payload]
      };
    case CLEAR_IRIS_DATA:
      return {
        ...state,
        iris: []
      };
    default:
      return state;
  }
}