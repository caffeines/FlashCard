import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import user from './modules/user';
import card from './modules/card';
import snackbar from './modules/snackbar';
import topic from './modules/topic';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    auth,
    topic,
    snackbar,
    card,
  },
});
