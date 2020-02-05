<template>
  <v-card
    max-width="300"
    min-width="300"
    class="mx-auto mt-2 mb-2 pl-5 pr-5 custom"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :elevation="hover ? 4 : 0"
    shaped
    ripple
    flat
    @click="createNewFlashCard"
  >
    <v-list-item>
      <v-icon
        class="mx-auto pt-5 pb-2"
        color="black"
        right
        x-large
      >
        mdi-plus
      </v-icon>
    </v-list-item>
    <v-card-text class="subtitle-2 text-center">Create a new flashcard</v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    ...mapGetters(['isLogedIn']),
  },
  methods: {
    createNewFlashCard() {
      if (!this.isLogedIn) {
        this.$router.push('/login');
      } else { this.$router.push('/flashcard'); }
    },
  },
};
</script>
