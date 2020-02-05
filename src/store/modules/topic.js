/* eslint-disable consistent-return */
import instance from '../../utils/axios';

export default {
  state: {
    topics: [],
    hasMore: false,
  },
  mutations: {
    setTopics(state, payload) {
      payload.topics.forEach((topic) => {
        const { name } = topic;
        state.topics.push(name);
      });
      state.hasMore = payload.hasMore;
    },
    addTopics(state, payload) {
      payload.forEach((topic) => {
        if (!state.topics.includes(topic)) {
          state.topics.push(topic);
        }
      });
    },
  },
  actions: {
    async topicsRequest({ commit, state }, payload) {
      try {
        const page = payload ? payload.page : 1;
        if (!payload) {
          state.topics = [];
        }
        const { data } = await instance.get(`topic?page=${page}`);
        commit('setTopics', data.data);
        return data;
      } catch (error) {
        return Promise.reject(error.response.data || error);
      }
    },
  },
  getters: {
    getTopics: state => state.topics,
  },
};
