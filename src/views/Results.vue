<template>
  <div class="results container my-3">
    <div class="box-grid" v-if="results.length">
      <ResultCard
        v-for="(result, i) in results"
        :key="i"
        :result="result"
        @deleteResult="deleteResult(i)"
        @editResult="edit(result, i)"
      />
    </div>
    <section v-else class="hero text-center is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title py-1">EMPTY</h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mutations, store } from "../store";
import ResultCard from "@/components/ResultCard";

export default {
  components: { ResultCard },
  data() {
    return {
      results: []
    };
  },
  computed: {},
  methods: {
    getResults: mutations.getResults,
    deleteResult: mutations.deleteResult,
    editResult: mutations.editResult,

    edit(result, i) {
      this.$buefy.dialog.prompt({
        message: `Change name?`,
        inputAttrs: {
          maxlength: 10
        },
        trapFocus: true,
        onConfirm: name => {
          this.$buefy.toast.open({
            message: `Edited ${name}'s result`,
            type: "is-success"
          });

          let payload = {
            name: name,
            correctCount: result.correctCount,
            answeredCount: result.answeredCount,
            date: result.date
          };

          this.editResult(payload, i);
        }
      });
    }
  },
  watch: {
    store() {
      this.results = store.results;
    }
  },
  mounted() {
    this.results = this.getResults();
  }
};
</script>

<style scoped>
.box-grid {
  margin-top: 15px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
