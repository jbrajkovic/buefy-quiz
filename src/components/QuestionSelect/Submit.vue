<template>
  <section>
    <button class="button is-medium is-success" @click="confirm">Create</button>
  </section>
</template>

<script>
import { store, mutations } from "../../store";

export default {
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    quizOptions() {
      return store.quizOptions;
    }
  },
  methods: {
    storeQuestions: mutations.storeQuestions,

    infoBox(key) {
      return `
        <button class="button is-primary is-fullwidth my-2">
          ${key.slice(0, 1).toUpperCase() + key.slice(1)} - 
          ${this.quizOptions[key]}
        </button>`;
    },

    confirm() {
      let output = ``;

      Object.keys(this.quizOptions).forEach(key => {
        output += this.infoBox(key);
      });

      this.$buefy.dialog.confirm({
        title: "Selected options",
        message: output,
        onConfirm: () => {
          this.createQuiz(this.quizOptions);
        }
      });
    },

    createQuiz(options) {
      this.isLoading = true;

      const loadingComponent = this.$buefy.loading.open({
        container: this.isLoading ? null : this.$refs.element.$el
      });
      const query = Object.keys(options)
        .filter(option => options[option] !== "any")
        .map(option => `${option}=${options[option]}`)
        .join("&");


      fetch(`https://opentdb.com/api.php?${query}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.storeQuestions(data.results);
          this.isLoading = false;
          loadingComponent.close()
          this.$router.push("/quiz");
        });
    }
  }
};
</script>