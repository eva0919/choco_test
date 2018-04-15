import axios from "axios";
import { GET_DRAMAS } from "./types";

export function getDramas() {
  return function _(dispatch) {
    axios({
      method: "GET",
      url: `/api/dramas`,
      params: {}
    })
      .then(response => {
        const result = response.data.data;
        dispatch({ type: GET_DRAMAS, payload: result });
      })
      .catch(response => {});
  };
}
