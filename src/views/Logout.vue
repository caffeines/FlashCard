<template>
<div></div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  created() {
    this.logoutRequest();
    this.$router.go();
  },
  methods: {
    ...mapActions(['logoutRequest']),
  },
};
</script>
