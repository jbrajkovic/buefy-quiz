import Vue from "vue";

export const store = Vue.observable({
  quizOptions: {},
  questions: [],
  results: [],
});

export const mutations = {
  setQuestionNumber(n) {
    store.quizOptions.amount = n;
  },
  setQuestionType(t) {
    store.quizOptions.type = t;
  },
  setQuestionDifficulty(d) {
    store.quizOptions.difficulty = d;
  },
  setQuestionCategory(c) {
    store.quizOptions.category = c;
  },
  storeQuestions(q) {
    store.questions = q;
  },
  storeResults(r) {
    store.results.unshift(r);
    localStorage.setItem("results", JSON.stringify(store.results));
  },
  getResults() {
    if (localStorage.getItem("results")) {
      store.results = JSON.parse(localStorage.getItem("results"));
    }

    return store.results
  },
  deleteResult(i) {
    store.results.splice(i, 1);
    localStorage.setItem("results", JSON.stringify(store.results));
  },
  editResult(result, i) {
    store.results.splice(i, 1, result);
  }
};
