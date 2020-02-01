export default {
  state: {
    text: '',
    status: undefined,
    show: false,
  },
  mutations: {
    setSnackbar(state, payload) {
      const { text, status } = payload;
      state.status = status;
      state.show = true;
      state.text = text;
    },

    setSnackbarOff(state, payload) {
      state.show = payload;
    },
  },
  actions: {
    showSnackbar({ commit }, payload) {
      commit('setSnackbar', payload);
    },
    offSnackbar({ commit }) {
      commit('setSnackbarOff', false);
    },
  },
  getters: {
    getStatus: state => state.status,
    getText: state => state.text,
    getSnackbar: state => state.show,
  },
};
