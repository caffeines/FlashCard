<template>
  <div>
    <Loader>Please wait verifying your email...</Loader>
  </div>
</template>
<script>
import Loader from '@/components/Loader.vue';

export default {
  components: {
    Loader,
  },
  async mounted() {
    const { userid, token } = this.$route.query;
    try {
      await this.$store.dispatch('verifyEmail', { userid, token });
      this.$store.dispatch('showSnackbar', { status: 'success', text: 'Email verification successful' });
      this.$router.push('/login');
    } catch (ex) {
      this.$store.dispatch('showSnackbar', { status: 'error', text: 'Email verification failed' });
      this.$router.push('/');
    }
  },
};
</script>
