import { GET_IRIS_DATA, DELETE_ONE_IRIS, SET_EDIT_IRIS, UPDATE_ONE_IRIS, ADD_ONE_IRIS, CLEAR_IRIS_DATA, SET_EDIT_IRIS_CLUSTER } from "../actions/types.js";

const initialState = {
  iris: [],
  editedIris: {
    sepal_len: "",
    sepal_width: "",
    petal_len: "",
    petal_width: "",
    category: ""
  },
  irisCluster: []
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
    case SET_EDIT_IRIS:
      console.log("in reducer SET_EDIT_IRIS is called");
      return {
        ...state,
        editedIris: action.payload
      };
    case SET_EDIT_IRIS_CLUSTER:
      console.log("in reducer SET_EDIT_IRIS_CLUSTER is called");
      console.log(action.payload)
      return {
        ...state,
        irisCluster: action.payload
      };
    case UPDATE_ONE_IRIS:
      return {
        ...state,
        iris: state.iris.map(one_iris => {
                  if ( one_iris.id !== action.payload.id ) {
                    return one_iris;
                  } else {
                    return action.payload;
                  }
                })
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
