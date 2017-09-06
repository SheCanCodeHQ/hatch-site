import Requests from "libs/utils/Requests";
import * as constants from "../constants/competitionConstants";

export const setIsFetchingCompetition = () => ({
  type: constants.SET_IS_FETCHING_COMPETITION,
});

export const fetchCompetitionSuccess = competition => ({
  type: constants.FETCH_COMPETITION_SUCCESS,
  competition,
});

export const fetchCompetitionFailure = error => ({
  type: constants.FETCH_COMPETITION_FAILURE,
  error,
});

export const fetchCompetition = () => async dispatch => {
  dispatch(setIsFetchingCompetition());
  try {
    const json = await Requests.jsonGetRequest(constants.COMPETITION_PATH);
    return dispatch(fetchCompetitionSuccess(json));
  } catch (error) {
    return dispatch(
      fetchCompetitionFailure(
        typeof error === "string" ? error : error.message,
      ),
    );
  }
};

export const setIsSavingCompetition = () => ({
  type: constants.SET_IS_SAVING_COMPETITION,
});

export const saveCompetitionSuccess = competition => ({
  type: constants.SAVE_COMPETITION_SUCCESS,
  competition,
});

export const saveCompetitionFailure = error => ({
  type: constants.SAVE_COMPETITION_FAILURE,
  error,
});

export const saveCompetition = competition => async dispatch => {
  dispatch(setIsSavingCompetition());
  try {
    const json = await Requests.jsonPostRequest(
      constants.COMPETITION_PATH,
      competition,
    );
    return dispatch(saveCompetitionSuccess(json));
  } catch (error) {
    return dispatch(
      saveCompetitionFailure(typeof error === "string" ? error : error.message),
    );
  }
};

export const setIsDeletingCompetition = () => ({
  type: constants.SET_IS_DELETING_COMPETITION,
});

export const deleteCompetitionSuccess = () => ({
  type: constants.DELETE_COMPETITION_SUCCESS,
});

export const deleteCompetitionFailure = () => ({
  type: constants.DELETE_COMPETITION_FAILURE,
});

export const deleteCompetition = () => async dispatch => {
  dispatch(setIsDeletingCompetition());
  try {
    await Requests.jsonDeleteRequest(constants.COMPETITION_PATH);
    return dispatch(deleteCompetitionSuccess());
  } catch (error) {
    return dispatch(
      deleteCompetitionFailure(
        typeof error === "string" ? error : error.message,
      ),
    );
  }
};
