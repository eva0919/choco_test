import { GET_DRAMAS } from "../actions/types";

export default function dramasReducer(
  state = { drama_list: [], page: 0 },
  action
) {
  switch (action.type) {
    case GET_DRAMAS:
      return { ...state, drama_list: action.payload };
    default:
      return state;
  }
}
