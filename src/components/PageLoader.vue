<template>
  <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
</template>

<script>
export default {
  props: ["isLoading"],
  data() {
    return {
      isFullPage: true
    };
  }
};
</script>