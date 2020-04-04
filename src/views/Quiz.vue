<template>
  <div class="quiz" v-if="!loading">
    <section class="hero text-center is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 v-if="!finished" class="title py-1">Question {{index + 1}} / {{questions.length}}</h1>
          <h2 v-if="!finished" class="subtitle">{{heDecode(questions[index].question)}}</h2>
          <h1 v-if="finished" class="title py-1">Your Score: {{correctCount}} / {{answeredCount}}</h1>
        </div>
      </div>
    </section>
    <Progress v-if="!finished" :answeredCount="answeredCount" :correctCount="correctCount" />
    <div v-if="!finished" class="answers container p-4">
      <b-button
        type="is-primary"
        size="is-medium"
        expanded
        :outlined="!answered && selected !== answer"
        :class="{'is-success': correct === answer}"
        :disabled="disableAnswers"
        @click="selected = answer"
        v-for="(answer, i) in shuffledAnswers"
        :key="i"
      >
        {{heDecode(answer).length > 22 ? heDecode(answer).substring(0, 22) + '...' : heDecode(answer)}}
        <b-button
          v-if="heDecode(answer).length > 22"
          class="see-more"
          @click.stop="toast(answer)"
          type="is-warning"
        >
          <b-icon icon="eye" size="is-small"></b-icon>
        </b-button>
      </b-button>
    </div>
    <div v-if="!finished" class="actions text-center">
      <b-button
        class="mx-1"
        type="is-success"
        size="is-medium"
        @click="submitAnswer()"
        :disabled="selected == null || answered !== null"
      >Submit</b-button>

      <b-button
        class="mx-1"
        type="is-primary"
        size="is-medium"
        outlined
        :disabled="!answered"
        @click="next()"
      >{{answeredCount === questions.length ? 'Finish' : 'Next'}}</b-button>
    </div>

    <div v-else class="actions text-center my-3">
      <b-button class="mx-1" type="is-dark" size="is-medium" @click="$router.push('/')">Back</b-button>

      <b-button class="mx-1" type="is-primary" size="is-medium" @click="index = 0">Repeat</b-button>

      <b-button
        v-if="!saved"
        class="mx-1"
        type="is-light"
        size="is-medium"
        @click="saveResult()"
      >Save Result</b-button>
    </div>
  </div>
</template>

<script>
import Progress from "@/components/QuizProgress.vue";
import { store, mutations } from "../store";
import _ from "lodash";

var he = require("he");

export default {
  components: { Progress },
  data() {
    return {
      index: 0,
      answered: null,
      selected: null,
      disableAnswers: false,
      answeredCount: 0,
      correctCount: 0,
      showCorrect: null,
      correct: false,
      loading: true,
      saved: false,
    };
  },
  computed: {
    questions() {
      return store.questions;
    },
    finished() {
      return this.index === this.questions.length;
    },
    correctAnswer() {
      return this.questions[this.index].correct_answer;
    },
    incorrectAnswers() {
      return this.questions[this.index].incorrect_answers;
    },
    shuffledAnswers() {
      return _.shuffle([this.correctAnswer, ...this.incorrectAnswers]);
    }
  },
  methods: {
    storeResults: mutations.storeResults,
    heDecode(str) {
      return he.decode(str);
    },
    submitAnswer() {
      this.answered = this.selected;
      this.disableAnswers = true;
      this.correct = this.correctAnswer;

      if (this.answered === this.correctAnswer) {
        this.correctCount++;
      }

      this.answeredCount++;
    },
    next() {
      this.index++;
      this.clearData();
    },
    clearData() {
      this.answered = null;
      this.selected = null;
      this.correct = null;
      this.disableAnswers = false;
    },
    toast(answer) {
      let decoded = he.decode(answer);
      this.$buefy.toast.open(decoded);
    },
    repeat() {
      this.clearData();
      this.correctCount = 0;
      this.answeredCount = 0;
      this.index = 0;
      this.saved = false;
    },
    saveResult() {
      this.$buefy.dialog.prompt({
        message: `What's your name?`,
        inputAttrs: {
          placeholder: "e.g. Walter",
          maxlength: 10
        },
        trapFocus: true,
        onConfirm: name => {
          this.$buefy.toast.open({
            message: `Saved ${name}'s result`,
            type: "is-success"
          });
          this.saved = true;

          this.storeResults({
            name,
            correctCount: this.correctCount,
            answeredCount: this.answeredCount,
            date: new Date()
          });
        }
      });
    }
  },
  created() {
    setTimeout(() => {
      //Avoid possibility of button stay clicked after creating questions
      this.loading = false;
    }, 10);
  },
  watch: {
    index() {
      if (this.index === 0) {
        this.correctCount = 0;
        this.answeredCount = 0;
      }
    }
  }
};
</script>

<style scoped>
.answers {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
}

.see-more {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}

@media (min-width: 769px) {
  .answers {
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
}
</style>