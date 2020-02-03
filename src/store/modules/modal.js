export default {
  state: {
    modal: {
      show: false,
      data: '',
    },
  },
  mutations: {
    toggleModal(state) {
      state.modal.show = false;
    },
    setModal(state, payload) {
      state.modal.data = payload;
      state.modal.show = true;
    },
  },
  getters: {
    getModal: state => state.modal,
  },
};
