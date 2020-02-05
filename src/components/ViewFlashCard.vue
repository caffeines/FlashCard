<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="60vw">
      <v-card id="create">
        <v-card-title class="headline">{{ getModal.data.data.title }}</v-card-title>
        <v-card-text>
          {{modal.created}}
          {{modal.topic}}
          <!-- {{modal.url}} -->
          {{modal.state}}
          {{isOwner}}
          <vue-markdown>{{ modal.description }}</vue-markdown>
        </v-card-text>
        <v-card-actions>
          <!--  <v-btn color="green darken-1" text @click="toggleModal()">Close</v-btn> -->
          <v-speed-dial
            v-model="fab"
            :top="top"
            :bottom="bottom"
            :right="right"
            :left="left"
            :direction="direction"
            :open-on-hover="hover"
            :transition="transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="blue darken-2" dark fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-cards</v-icon>
              </v-btn>
            </template>
            <v-btn fab dark small color="#000">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn fab dark small color="green">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <!-- <v-btn fab dark small color="indigo">
              <v-icon>mdi-plus</v-icon>
            </v-btn> -->
            <v-btn fab dark small color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            {{userId}}
          </v-speed-dial>
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
  data: () => ({
    direction: 'left',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: true,
    right: true,
    bottom: false,
    left: false,
    transition: 'slide-y-reverse-transition',
  }),
  computed: {
    ...mapGetters(['getModal']),
    activeFab() {
      switch (this.tabs) {
        case 'one': return { class: 'purple', icon: 'account_circle' };
        case 'two': return { class: 'red', icon: 'edit' };
        case 'three': return { class: 'green', icon: 'keyboard_arrow_up' };
        default: return {};
      }
    },
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
    isOwner() {
      return window.userId === this.modal.createdBy;
    },
  },
  created() {
  },
  methods: {
    ...mapMutations(['toggleModal']),
  },
};
</script>
<style scoped>
 #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
