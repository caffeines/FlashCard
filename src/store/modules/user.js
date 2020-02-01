import instance from '../../utils/axios';

export default {
  state: {
    profile: '',
  },
  mutations: {
    setProfile(state, payload) {
      state.profile = payload;
    },
  },
  actions: {
    async usernameCheckRequest({ commit }, payload) {
      try {
        const { data } = await instance.get(`auth/is-available?username=${payload.username}`);
        return data.data;
      } catch (error) {
        return Promise.reject(error.response.data || error);
      }
    },
    async profileRequest({ commit }) {
      try {
        const { data } = await instance.get('user/profile');
        commit('setProfile', data.data);
        return data.data;
      } catch (error) {
        return Promise.reject(error.response.data || error);
      }
    },
  },
  getters: {
    profile: state => state.profile,
  },

};
