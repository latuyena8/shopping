import {combineReducers} from 'redux';
import store from './store'
import cart from './cart'
import user from './user'
import order from './order'

const rootReducer = combineReducers({
  //toàn bộ data(state) chứa ở đây
  store,
  cart,
  user,
  order
});

export default rootReducer;