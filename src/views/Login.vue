<template>
  <form @submit.prevent="submitHandler" class="card auth-card">
    <div class="card-content">
      <span class="card-title">{{ 'HomeBookkeeping' | localize }}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">
          {{ 'emptyEmail' | localize }}
        </small>
        <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">
          {{ 'EnterCorrectEmail' | localize }}
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required || $v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{ 'Password' | localize }}</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required">
          {{ 'EnterPassword' | localize }}
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength">
          {{'ThePasswordMustBe' | localize }} {{ ' ' }}{{ $v.password.$params.minLength.min }} {{ ' ' }} {{'ThePasswordMustBe2' | localize }}{{password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ 'Enter' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'NoAccount' | localize }}
        <router-link to="/register">{{ 'Register' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from "@/utils/messages";
export default {
  metaInfo() {
    return {
      title: 'Login'
    }
  },
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    },
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  }
}
</script>

<style scoped>

</style>
