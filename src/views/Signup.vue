<template>
<div>
  <v-row justify="center" v-if="!loading">
    <v-col cols="12" sm="10" md="6" lg="4">
      <v-card ref="form" flat shaped class="mt-2">
        <v-card-title class="primary--text">Signup</v-card-title>
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            label="Name"
            required
            rounded
            filled
            flat
            dense
            lazy-validation
          ></v-text-field>
          <v-text-field
            ref="username"
            v-model="username"
            :rules="[() => !!username || 'Username is required', usernameCheck]"
            :error-messages="errorMessages"
            label="Username"
            @input="usernameCheck"
            required
            rounded
            filled
            flat
            dense
            lazy-validation="true"
          ></v-text-field>
          <v-text-field
            ref="email"
            v-model="email"
            :error-messages="emailErrorMessages"
            :rules="[
              () => !!email || 'Email is required',
              emailCheck
            ]"
            label="Email"
            required
            rounded
            filled
            flat
            dense
            lazy-validation
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, checkPassword]"
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
            lazy-validation
          ></v-text-field>
          <v-text-field
            ref="conPassword"
            v-model="conPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, checkPassword]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm password"
            :error-messages="passwordError"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            rounded
            filled
            flat
            dense
            lazy-validation
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
          <v-btn color="primary" text @click="submit">Signup</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <Loader v-else> Please wait, sending a verification email...</Loader>
</div>
</template>
<script>
import { mapActions } from 'vuex';
import Loader from '@/components/Loader.vue';

export default {
  components: {
    Loader,
  },
  data: () => ({
    loading: false,
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
        email: this.email,
        name: this.name,
        password: this.password,
        conPassword: this.conPassword,
      };
    },
  },

  watch: {
    username() {
      this.errorMessages = '';
    },
    email() {
      this.emailErrorMessages = '';
    },
    conPassword() {
      this.passwordError = '';
    },
    password() {
      this.passwordError = '';
    },
  },

  methods: {
    ...mapActions(['singupRequest', 'usernameCheckRequest']),

    checkPassword() {
      if (this.password !== this.conPassword) {
        this.passwordError = 'Password is not matched';
      }
      return true;
    },
    usernameCheck() {
      if (this.username) {
        if (this.username.length <= 4) {
          this.errorMessages = 'Username length must be greater than 4';
          return false;
        }
        this.usernameCheckRequest({ username: this.username })
          .then((data) => {
            if (data) {
              this.errorMessages = '';
              return true;
            }
            this.errorMessages = 'Username already exist';
            return false;
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
      }
      return true;
    },
    validateEmail(email) {
      // eslint-disable-next-line no-useless-escape
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    emailCheck() {
      if (this.email) {
        this.emailErrorMessages = this.validateEmail(this.email)
          ? ''
          : 'This email is not valid';
      }
      return true;
    },
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
        this.loading = true;
        try {
          await this.singupRequest({
            username: this.username,
            name: this.name,
            password: this.conPassword,
            email: this.email,
          });
          this.$store.dispatch('snackbar/showSnackbar', {
            status: 'success',
            text: 'Please confirm your mail',
          });
          this.$router.push('/login');
        } catch (ex) {
          this.$store.dispatch('snackbar/showSnackbar', {
            status: 'error',
            text: ex.response.data.errors.message,
          });
          this.loading = false;
        }
      }
    },
  },
};
</script>
