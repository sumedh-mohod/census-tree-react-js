import { GET_PROPERTY_BY_COUNCIL_ID, IMPORT_PROPERTIES, RESET_STATE, SHOW_PROPERTY_IMPORT_ERROR } from "../actions/Types";
  
  const INIT_STATE = {
    properties:[],
    pageInfo:{},
    importPropertyLog:false,
    propertyErrorLog:false,
    propertyError:[]
  };
  
  export default function PropertyReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_PROPERTY_BY_COUNCIL_ID:
          return{
              ...state,
              properties: payload.data.data,
              pageInfo: payload.data
        };

        case IMPORT_PROPERTIES:
          return{
              ...state,
              importPropertyLog: !state.importPropertyLog,
        };

        case SHOW_PROPERTY_IMPORT_ERROR:
          return{
              ...state,
              propertyErrorLog: !state.propertyErrorLog,
              propertyError:payload.data
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  