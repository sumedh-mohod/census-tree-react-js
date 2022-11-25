import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const persistStateToLocalStorage = function(prevState) {
    try{
        const serializedState = JSON.stringify(prevState);
        localStorage.setItem("tree_census_state", serializedState);
    } catch(e){
        // console.log(e);
        
    }
}

const fetchPersistedStateFromLocalStorage = function() {
    try {
        const serializedState = localStorage.getItem("tree_census_state");
        if(serializedState === null){
            return undefined;
        } 
        return JSON.parse(serializedState);
    } catch(e){
        // console.log(e);
    }
}

const persistedState = fetchPersistedStateFromLocalStorage();

const dataStore = createStore(
    reducers,
    persistedState,
    applyMiddleware(ReduxThunk)
);

dataStore.subscribe(() => persistStateToLocalStorage(dataStore.getState()));

export default dataStore;