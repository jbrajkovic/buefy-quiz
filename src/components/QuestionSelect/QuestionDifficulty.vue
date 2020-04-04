<template>
  <section>
    <b-field class="my-3">
      <b-select placeholder="Select a Type" v-model="difficulty">
        <option value="any">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </b-select>
    </b-field>
  </section>
</template>

<script>
import { mutations } from "../../store";

export default {
  data() {
    return {
      difficulty: "any"
    };
  },
  methods: {
    setQuestionDifficulty: mutations.setQuestionDifficulty
  },
  watch: {
    difficulty: {
      immediate: true,
      handler() {
        this.setQuestionDifficulty(this.difficulty);
      }
    }
  }
};
</script>

<style scoped>
.control {
  text-align: center;
}
</style>