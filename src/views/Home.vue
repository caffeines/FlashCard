<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <FlashCardHeader />
      <div class="d-flex flex-wrap">
        <CreateFlashCard />
        <FlashCard :cardData="card" v-for="(card, idx) in getCards" :key="idx" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FlashCard from '@/components/FlashCard.vue';
import CreateFlashCard from '@/components/CreateFlashCard.vue';
import FlashCardHeader from '@/components/FlashCardHeader.vue';
import Loader from '@/components/Loader.vue';

export default {
  components: {
    Loader,
    FlashCardHeader,
    CreateFlashCard,
    FlashCard,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['getCards']),
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    read() {
      this.$router.push('/roadmap');
    },
  },
};
</script>
