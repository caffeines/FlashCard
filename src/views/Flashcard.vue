<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" flat>
        <v-card-title class="primary--text">New Flashcard</v-card-title>
        <v-card-text>
          <v-text-field
            ref="title"
            v-model="title"
            :rules="[() => !!title || 'Title is required']"
            :error-messages="errorMessages"
            label="Title"
            clearable
            flat
            dense
            filled
            rows="1"
            rounded
            required
            autofocus
          ></v-text-field>
          <v-combobox
            v-model="select"
            ref="select"
            :items="items"
            flat
            hide-selected
            rounded
            filled
            hint="Press Enter and add custom topic"
            label="Topic"
            multiple
            chips
            :error-messages="errorMessages"
            :rules="[minCheck, maxCheck]"
          >
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                @click:close="data.parent.selectItem(data.item)"
                close
              >
                <v-avatar
                  class="accent white--text"
                  left
                  v-text="data.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
          <v-textarea
            ref="description"
            v-model="description"
            :rules="[rules.required, rules.min]"
            :error-messages="errorMessages"
            label="Description"
            clearable
            flat
            dense
            filled
            rounded
            required
            auto-grow
            counter
          ></v-textarea>
          <v-textarea
            ref="url"
            v-model="url"
            label="URL"
            clearable
            flat
            dense
            filled
            rounded
            required
            auto-grow
            hint="FlashCard: flashcard.caffeines.me, google: google.com"
          ></v-textarea>
        </v-card-text>
        <v-divider class="mt-4"></v-divider>
        <v-card-actions>
          <v-btn text @click="$router.go(-1)">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on }">
                <v-btn icon class="my-0" @click="resetForm" v-on="on">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="create">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    errorMessages: '',
    title: null,
    url: '',
    description: '',
    formHasErrors: false,
    show1: false,
    rules: {
      required: value => !!value || 'Description is required',
      min: v => (v && v.length >= 100) || 'Min 100 characters',
    },
    select: [],
    items: [],
  }),

  computed: {
    ...mapGetters(['getTopics']),
    form() {
      return {
        title: this.title,
        description: this.description,
        select: this.select,
      };
    },
  },
  mounted() {
    this.items = this.getTopics;
  },
  watch: {
    title() {
      this.errorMessages = '';
    },
    description() {
      this.descriptionError = '';
    },
    // eslint-disable-next-line no-unused-vars
    select(val) {
      this.selectError = '';
    },
  },

  methods: {
    ...mapActions(['newCardRequest', 'showSnackbar']),
    minCheck() {
      if (!this.select.length) return 'At least one topic is required';
      return true;
    },
    maxCheck() {
      if (this.select.length > 2) return 'Maximum two topics allowed';
      return true;
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      this.url = '';
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    async create() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (!this.formHasErrors) {
        try {
          await this.newCardRequest({
            title: this.title,
            description: this.description,
            url: JSON.stringify(this.url),
            topic: this.select,
          });

          this.showSnackbar({
            status: 'success',
            text: 'New card added successfully',
          });
          this.resetForm();
        } catch ({ errors, status }) {
          this.showSnackbar({
            status: 'error',
            text: errors.message,
          });
          if (status === '401') this.$router.push('/login');
        }
      }
    },
  },
};
</script>
