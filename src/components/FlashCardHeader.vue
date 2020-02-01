<template>
  <v-card
    width="100%"
    class="mx-auto mt-0 mb-2 pl-5 pr-5 overflow-hidden"
    draggable="false"
    flat
  >
    <v-card-text>
      <h2 class="title mb-2 text-center" color="black">Choose topics</h2>

      <v-row justify="center" align="center">
        <v-chip-group v-model="amenities" column multiple>

          <v-chip
            v-for="(chip, idx) in topics"
            :key="idx"
            filter
            :text-color="flag[idx] ? 'white' : 'black'"
            :color="flag[idx] ? 'black' : '#eee'"
            class="font-weight-black"
            @click="handleChips(idx)"
          >{{ chip }}</v-chip>
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
export default {
  // props: ['topics'],
  data: () => ({
    flag: {},
    amenities: [0],
    neighborhoods: [0],
    searchText: '',
    loading: false,
    topics: ['Data Structure', 'Algorithms', 'Database', 'Node.js'],
  }),
  created() {
    this.flag[0] = true;
  },
  methods: {
    handleChips(idx) {
      this.flag[idx] = !this.flag[idx];
    },
  },
};
</script>
