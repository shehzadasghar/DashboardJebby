import { combineReducers } from 'redux';
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import dropdownReducer from './Dropdownreducer'
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}
const mainReducer = combineReducers({
    dropdownReducer: dropdownReducer,
})
export default persistReducer(persistConfig, mainReducer);
// code for scoop solutions