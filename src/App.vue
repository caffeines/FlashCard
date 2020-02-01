<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary fixed app>
      <v-app-bar flat>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="title" @click="$router.push('/')" class="titleClass" />
      </v-app-bar>
      <v-list>
        <v-list-item v-for="(item, i) in getItems" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" @click="$router.push('/')" class="titleClass" />
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>-->
      <a href="https://github.com/caffeines/FlashCardClient" target="_blank">
        <v-icon large>mdi-github-circle</v-icon>
      </a>
    </v-app-bar>
    <v-content>
      <v-container fluid class="pa-0 ma-0">
        <router-view></router-view>
      </v-container>
    </v-content>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      drawer: false,
      title: 'FlashCard',
      loginStatus: false,
    };
  },
  computed: {
    getItems() {
      if (this.loginStatus) {
        const items = [
          {
            icon: 'mdi-home',
            title: 'Home',
            to: '/',
          },
          {
            icon: 'mdi-user',
            title: 'Profile',
            to: '/profile',
          },
          {
            icon: 'mdi-logout',
            title: 'Logout',
            to: '/logout',
          },
        ];
        return items;
      }
      const items = [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-account-plus',
          title: 'Signup',
          to: '/signup',
        },
        {
          icon: 'mdi-login',
          title: 'Singin',
          to: '/login',
        },
      ];
      return items;
    },
  },
  mounted() {
    this.loginStatus = this.$store.dispatch('auth/isLogedIn');
  },
};
</script>
<style lang="scss" scoped>
.titleClass {
  cursor: pointer !important;
}
#app {
  background-color: rgba(238, 238, 238, 0.726);
}
a {
  text-decoration: none;
  :hover {
    color: #000;
  }
}
</style>
