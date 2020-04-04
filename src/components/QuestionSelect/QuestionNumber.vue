<template>
  <section>
    <b-field class="my-3">
      <b-radio-button
        v-model="amount"
        v-for="number in numbers"
        :key="number"
        :native-value="number"
      >{{number}}</b-radio-button>
    </b-field>
  </section>
</template>

<script>
import { mutations } from "../../store";

export default {
  data() {
    return {
      amount: 5,
      numbers: [5, 10, 15, 20, 30]
    };
  },
  methods: {
    setQuestionNumber: mutations.setQuestionNumber
  },
  watch: {
    amount: {
      immediate: true,
      handler() {
        this.setQuestionNumber(this.amount);
      }
    }
  }
};
</script>

<style scoped>
.field {
  justify-content: center !important;
}
</style>