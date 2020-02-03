<template>
   <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="60vw">
      <v-card>
        <v-card-title class="headline"> {{ getModal.data.data.title }}</v-card-title>
        <v-card-text>
          {{modal.created}}
            {{modal.topic}}
            <!-- {{modal.url}} -->
            {{modal.state}}
          <vue-markdown>
            {{ modal.description }}
          </vue-markdown>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="toggleModal()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    VueMarkdown,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['getModal']),
    dialog: {
      get() {
        return this.getModal.show;
      },
      set() {
        this.toggleModal();
      },
    },
    modal() {
      return this.getModal.data.data;
    },
  },
  methods: {
    ...mapMutations(['toggleModal']),
  },
};
</script>
