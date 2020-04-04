<template>
  <section class="container px-4 pt-4">
    <b-progress
      :value="percentage"
      size="is-medium"
      :type="progressColor"
      show-value
    >{{correctCount}} out of {{answeredCount}}</b-progress>
  </section>
</template>

<script>
export default {
  props: ["answeredCount", "correctCount"],
  data() {
    return {
      answered: 0,
      correct: 0
    };
  },
  computed: {
    percentage() {
      return (this.correct / this.answered) * 100;
    },
    progressColor() {
      return this.percentage >= 50 ? 'is-success' : 'is-danger'
    }
  },
  watch: {
    answeredCount: {
      immediate: true,
      handler() {
        this.answered = this.answeredCount;
      }
    },
    correctCount: {
      immediate: true,
      handler() {
        this.correct = this.correctCount;
      }
    }
  }
};
</script>