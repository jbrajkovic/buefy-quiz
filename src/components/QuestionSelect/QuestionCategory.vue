<template>
  <section>
    <b-field class="my-3">
      <b-select placeholder="Select a Category" v-model="category">
        <option value="any">Any</option>
        <option
          v-for="category in categories"
          :key="category.value"
          :value="category.value"
        >{{category.name}}</option>
      </b-select>
    </b-field>
  </section>
</template>

<script>
import { mutations } from "../../store";

export default {
  data() {
    return {
      category: "any",
      categories: [
        { name: "General Knowlege", value: 9 },
        { name: "Entertainment: Books", value: 10 }
      ]
    };
  },
  methods: {
    setQuestionCategory: mutations.setQuestionCategory
  },
  watch: {
    category: {
      immediate: true,
      handler() {
        this.setQuestionCategory(this.category);
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