<template>
  <section>
    <b-field class="my-3">
      <b-select placeholder="Select a Category" v-model="category">
        <option value="any">Any</option>
        <option
          v-for="category in categories"
          :key="category.value"
          :value="category.value"
          >{{ category.name }}</option
        >
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
        { name: "Entertainment: Books", value: 10 },
        { name: "Entertainment: Film", value: 11 },
        { name: "Entertainment: Music", value: 12 },
        { name: "Television", value: 14 },
        { name: "Video Games", value: 15 },
        { name: "Science & Nature: Books", value: 17 },
        { name: "Science: Computers", value: 18 },
        { name: "Science: Mathematics", value: 19 },
        { name: "Mythology", value: 20 },
        { name: "Sports", value: 21 },
        { name: "Geography", value: 22 },
        { name: "History", value: 23 },
        { name: "Politics", value: 24 },
      ],
    };
  },
  methods: {
    setQuestionCategory: mutations.setQuestionCategory,
  },
  watch: {
    category: {
      immediate: true,
      handler() {
        let selectedCategory = this.categories.find(
          (category) => category.value === this.category
        );
        let categoryValue = selectedCategory ? selectedCategory.value : ""
        this.setQuestionCategory(categoryValue);
      },
    },
  },
};
</script>

<style scoped>
.control {
  text-align: center;
}
</style>
