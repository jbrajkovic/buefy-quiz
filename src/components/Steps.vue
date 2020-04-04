<template>
  <div class="box">
    <b-steps v-model="activeStep">
      <template v-for="(step, index) in steps">
        <b-step-item v-if="step.displayed" :key="index" :label="step.label">
          <component :is="step.component"></component>
        </b-step-item>
      </template>
    </b-steps>
  </div>
</template>

<script>
import QuestionNumber from "./QuestionSelect/QuestionNumber";
import QuestionType from "./QuestionSelect/QuestionType";
import QuestionDifficulty from "./QuestionSelect/QuestionDifficulty";
import QuestionCategory from "./QuestionSelect/QuestionCategory";
import Submit from "./QuestionSelect/Submit";

export default {
  data() {
    return {
      activeStep: 0
    };
  },
  computed: {
    baseSteps() {
      return [
        {
          label: "Amount",
          displayed: true,
          component: QuestionNumber
        },
        {
          label: "Type",
          displayed: true,
          component: QuestionType
        },
        {
          label: "Difficulty",
          displayed: true,
          component: QuestionDifficulty
        },
        {
          label: "Category",
          displayed: true,
          component: QuestionCategory
        },
        {
          label: "Submit",
          displayed: true,
          component: Submit
        }
      ];
    },
    steps() {
      const steps = [...this.baseSteps];

      return steps;
    }
  }
};
</script>