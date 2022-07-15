import {GET_COUNCIL, ADD_COUNCIL, EDIT_COUNCIL, DELETE_COUNCIL, RESET_STATE, GET_COUNCIL_BY_ID, GET_ACTIVE_COUNCIL} from "../actions/Types";
  
  const INIT_STATE = {
    council:null,
    councilById:null,
    addCouncilLog:false,
    editCouncilLog:false,
    deleteCouncilLog:false,
    pageInfo:{}
  };
  
  export default function CouncilReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_COUNCIL:
          return{
              ...state,
              council: payload.data.data,
              pageInfo: payload.data
        };

        case GET_ACTIVE_COUNCIL:
          return{
              ...state,
              activeCouncil: payload.data,
            
        };

        case GET_COUNCIL_BY_ID:
          return{
              ...state,
              councilById: payload.data,
        };

        case ADD_COUNCIL:
            return{
                ...state,
                addCouncilLog: !state.addCouncilLog,
        };

        case EDIT_COUNCIL:
            return{
                ...state,
                editCouncilLog: !state.editCouncilLog,
        };

        case DELETE_COUNCIL:
            return{
                ...state,
                deleteCouncilLog: !state.deleteCouncilLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  