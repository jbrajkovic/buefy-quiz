<template>
  <section>
    <b-field class="my-3">
      <b-select placeholder="Select a Type" v-model="type">
        <option value="any">Any</option>
        <option value="multiple">Multiple Chioce</option>
        <option value="boolean">True/False</option>
      </b-select>
    </b-field>
  </section>
</template>

<script>
import { mutations } from "../../store";

export default {
  data() {
    return {
      type: "any"
    };
  },
  methods: {
    setQuestionType: mutations.setQuestionType
  },
  watch: {
    type: {
      immediate: true,
      handler() {
        this.setQuestionType(this.type);
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