import MutationTypes from '../../MutationTypes';

export default {
  [MutationTypes.SET_IS_MOBILE]: (state, payload) => {
    state.isMobile = payload.isMobile;
  },
};
