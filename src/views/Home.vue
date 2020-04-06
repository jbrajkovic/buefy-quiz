<template>
  <div class="home text-center container my-3">
    <div class="my-3">
      <h1 class="title">Welcome to BuefyQuiz</h1>
      <h2 class="subtitle my-2">Choose Question Options</h2>
    </div>
    <Steps class="step-box py-3" />
    <h2 class="subtitle my-3 line">
      <span class="line-text-center">OR</span>
    </h2>
    <b-button
      class="my-3"
      type="is-primary"
      size="is-large"
      @click.stop="startRandomQuiz()"
    >Start Random Quiz</b-button>
  </div>
</template>

<script>
import Steps from "@/components/Steps.vue";
import { mutations } from "../store";

export default {
  name: "Home",
  components: {
    Steps
  },
  data() {
    return {
      isLoading: false,
      questionNumbers: [10, 15, 20, 30]
    };
  },
  methods: {
    storeQuestions: mutations.storeQuestions,

    startRandomQuiz() {
      this.isLoading = true;
      const loadingComponent = this.$buefy.loading.open({
        container: this.isLoading ? null : this.$refs.element.$el
      });

      let randomIndex = Math.floor(Math.random() * this.questionNumbers.length);
      let randomNumber = this.questionNumbers[randomIndex];

      fetch(`https://opentdb.com/api.php?amount=${randomNumber}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.storeQuestions(data.results);
          this.isLoading = false;
          loadingComponent.close();
          this.$router.push("/quiz");
        });
    }
  }
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
}

.line {
  position: relative;
  border-bottom: 1px solid #eee;
}

.line-text-center {
  position: absolute;
  top: -22px;
  padding: 10px;
  transform: translate(-50%, 0);
  background: #f9f9f9;
}

@media (min-width: 769px) {
  .step-box {
    padding: 80px !important;
    margin: 40px 0 !important;
  }
}
</style>
