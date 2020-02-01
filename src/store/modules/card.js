/* eslint-disable no-unused-vars */
import instance from '../../utils/axios';

export default {
  state: {
    cards: [],
    hasMore: [],
  },
  mutations: {
    setCard(state, payload) {
      state.cards = [...state.cards, ...payload.cards];
      state.hasMore = payload.hasMore;
    },
    addCard(state, payload) {
      state.cards.unshiift(payload);
    },
  },
  actions: {
    async cardsRequest({ commit }, payload) {
      try {
        const { data: { data: { cards: { cards, hasMore } } } } = await instance.get('card');
        commit('setCard', { cards, hasMore });
        return ({ cards, hasMore });
      } catch (err) {
        return Promise.reject(err.response.data || err);
      }
    },
    async newCardRequest({ commit }, payload) {
      try {
        const { data } = await instance.post('/card', { ...payload });
        commit('addCard', data.data);
        return (data.data);
      } catch (err) {
        return Promise.reject(err.response.data || err);
      }
    },
  },
  getters: {
    getCards: state => state.cards,
  },
};
