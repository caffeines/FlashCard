<template>
  <v-card>
    <v-snackbar v-model="snackShow" :color="status" right :timeout="6000" top>
      {{ text }}
      <v-btn dark :color="!status? 'pink': ''" text @click="makeOff">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  computed: {
    status() {
      return this.$store.state.snackbar.status;
    },
    text() {
      return this.$store.state.snackbar.text;
    },
    snackShow: {
      get() {
        return this.$store.state.snackbar.show;
      },
      set(newVal) {
        if (!newVal) {
          this.$store.dispatch('snackbar/offSnackbar');
        }
      },
    },
  },
  methods: {
    makeOff() {
      this.$store.dispatch('snackbar/offSnackbar');
    },
  },
};
</script>
