export const initialState = {
  apis: [],
  isLoading: false,
  isError: false,
};

export const actions = {
  API_START: "API_START",
  GET_ALL_APIS: "GET_ALL_APIS",
  UPDATE_API_DATA: "UPDATE_API_DATA",
  DELETE_API_DATA: "DELETE_API_DATA",
  CREATE_NEW_API: "CREATE_NEW_API",
  API_ERROR: "API_ERROR",
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.API_START:
      return { ...state, isLoading: true, isError: false };
    case actions.GET_ALL_APIS:
      return {
        ...state,
        apis: action.payload,
        isLoading: false,
        isError: false,
      };
    case actions.UPDATE_API_DATA:
      const updatedApis = state.apis.map((item) => {
        if (item.id === action.id) {
          return action.payload;
        }
        return item;
      });

      return {
        ...state,
        apis: updatedApis,
        isLoading: false,
        isError: false,
      };
    case actions.DELETE_API_DATA:
      const filteredApis = state.apis.filter((item) => item.id !== action.id);
      return { ...state, apis: filteredApis, isLoading: false, isError: false };
    case actions.CREATE_NEW_API:
      const newApis = [...state.apis, action.payload];
      return { ...state, apis: newApis, isLoading: false, isError: false };
    case actions.API_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
