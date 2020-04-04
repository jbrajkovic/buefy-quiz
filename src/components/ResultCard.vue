<template>
  <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
    <div
      slot="trigger"
      slot-scope="props"
      class="card-header"
      role="button"
      aria-controls="contentIdForA11y3"
    >
      <p class="card-header-title" style="justify-content: space-between">
        <span>{{result.name}}</span>
        <small>{{date}}</small>
      </p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
      </a>
    </div>
    <div class="card-content">
      <div class="content">
        <h2 class="subtitle">Score: {{result.correctCount}} out of {{result.answeredCount}}</h2>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="$emit('editResult')">Edit</a>
      <a class="card-footer-item" @click="$emit('deleteResult')">Delete</a>
    </footer>
  </b-collapse>
</template>

<script>
export default {
  props: ["result"],
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  },
  computed: {
    date() {
      let date = new Date(this.result.date);
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();

      return `${this.months[month]} ${day}, ${year} ${hours}:${minutes}`;
    }
  }
};
</script>