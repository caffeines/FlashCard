<template>
  <v-card width="100%" class="mx-auto mt-0 mb-2 pl-5 pr-5 overflow-hidden" draggable="false" flat>
    <v-card-text>
      <h2 class="title mb-2 text-center" color="black">Choose topics</h2>

      <v-row justify="center" align="center">
        <v-chip-group v-model="selected" column multiple>
          <v-chip
            v-for="(chip, idx) in topics"
            :key="idx"
            :text-color="flag[idx] ? 'white' : 'black'"
            :color="flag[idx] ? 'black' : '#eee'"
            class="font-weight-black"
            @click="handleChips(idx)"
          >
            <v-avatar left v-if="flag[idx]">
              <v-icon>mdi-check</v-icon>
            </v-avatar>
            {{ chip.name || chip }}
          </v-chip>
        </v-chip-group>
      </v-row>
      <v-col cols="12" md="4" sm="12" class="mx-auto mt-5">
        <v-text-field
          append-icon="mdi-search-web"
          v-model="searchText"
          placeholder="Search here"
          rounded
          filled
          :loading="loading"
          flat
          dense
        ></v-text-field>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    flag: {},
    selected: [],
    searchText: '',
    loading: false,
  }),
  computed: {
    ...mapGetters(['getTopics']),
    topics() {
      const hardCoded = ['Own', 'Known', 'Unknown'];
      return [...hardCoded, ...this.getTopics.slice(0, 12)];
    },
  },
  mounted() {
    const selectedTopic = localStorage.getItem('topics');
    this.flag = JSON.parse(selectedTopic) || {};
  },
  methods: {
    handleChips(idx) {
      this.flag[idx] = !this.flag[idx];
      const selectedTopic = JSON.stringify(this.flag);
      localStorage.setItem('topics', selectedTopic);
    },
  },
};
</script>
