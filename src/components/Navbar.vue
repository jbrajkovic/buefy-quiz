<template>
  <b-navbar wrapper-class="container">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
        <span class="logo">Quiz</span>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a @click.prevent="$router.push('/')" class="button is-primary">
            <strong>Home</strong>
          </a>
          <a @click.prevent="$router.push('/results')" class="button is-light">Results</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
