import { createStore, combineReducers } from 'redux';
import quiz from './quiz';

const joyquizApp = combineReducers({
  quiz,
});

export const store = createStore(joyquizApp);

export default joyquizApp;