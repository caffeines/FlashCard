<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="6" lg="4">
      <v-card ref="form" flat shaped class="mt-10">
        <v-card-title class="primary--text">Signin</v-card-title>
        <v-card-text>
          <v-text-field
            ref="username"
            v-model="username"
            :rules="[() => !!username || 'Username is required']"
            :error-messages="errorMessages"
            label="Username"
            required
            rounded
            filled
            flat
            dense
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            rounded
            filled
            flat
            dense
          ></v-text-field>
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
          <v-btn color="primary" text @click="submit">Signin</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    errorMessages: '',
    passwordError: '',
    conPassword: '',
    emailErrorMessages: '',
    username: null,
    email: null,
    name: null,
    password: '',
    formHasErrors: false,
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => "The email and password you entered don't match",
    },
  }),

  computed: {
    form() {
      return {
        username: this.username,
        password: this.password,
      };
    },
  },

  watch: {
    username() {
      this.errorMessages = '';
    },
    word() {
      this.passwordError = '';
    },
  },

  methods: {
    ...mapActions(['showSnackbar', 'loginRequest']),
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    async submit() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (!this.formHasErrors) {
        try {
          await this.loginRequest({
            username: this.username,
            password: this.password,
          });
          this.showSnackbar({
            status: 'success',
            text: 'Login successful',
          });
          this.$router.push('/');
          this.$router.go();
        } catch (ex) {
          this.showSnackbar({
            status: 'error',
            text: ex.errors.message,
          });
        }
      }
    },
  },
};
</script>
