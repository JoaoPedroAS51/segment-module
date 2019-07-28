<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        Segment Analytics v{{ version }}
      </h1>
      <h2 class="subtitle">
        The {{ description }}
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >GitHub</a>
      </div>
      <p class="debug">
        Look the console to see Debug
      </p>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import pkg from '../../package.json'

export default {
  components: {
    Logo
  },

  computed: {
    description: () => pkg.description,
    version: () => pkg.version
  }
}
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 60px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 35px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .debug {
    margin-top: 50px;
    font-weight: 300;
    font-size: 28px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
