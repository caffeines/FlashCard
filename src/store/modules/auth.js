import instance from '../../utils/axios';
import LocalStorage from '../../utils/localstorage';
import router from '../../router/index';

const LS = new LocalStorage();

export default {
  state: {
    token: '',
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async singupRequest({ commit }, payload) {
      try {
        const { data } = await instance.post('/auth/signup', { ...payload });
        return data;
      } catch (error) {
        return Promise.reject(error.response.data || error);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async verifyEmail({ commit }, payload) {
      try {
        const { userid, token } = payload;
        const resp = await instance.get(`auth/confirm-email?token=${token}&userid=${userid}`);
        return (resp.data);
      } catch (error) {
        return Promise.reject(error.response.data || error);
      }
    },

    async loginRequest({ commit }, payload) {
      try {
        const { data } = await instance.post('auth/login', { ...payload });
        LS.addItem('authtoken', data.data.jwtToken);
        commit('setToken', data.data.jwtToken);
        return data.data;
      } catch (error) {
        return Promise.reject(error.response.data || error);
      }
    },

    isLogedIn({ commit }) {
      const token = LS.getItem('authtoken');
      if (token) {
        commit('setToken', token);
        return true;
      }
      return false;
    },

    logoutRequest() {
      LS.removeAll();
      router.go(1);
      router.push('/');
    },
  },
  getters: {
    isLogedIn: state => !!state.token,
    profile: state => state.profile,
  },
};
