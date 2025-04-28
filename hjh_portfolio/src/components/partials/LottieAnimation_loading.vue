<template>
  <div :class="customClass">
    <div id="lottie" ref="lottieContainer"></div>
  </div>
</template>

<script>
import lottie from "lottie-web";
import animationData from "@/assets/loading/loading.json";
export default {
  name: "HongAnimation",
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  },
};
</script>

<style scoped></style>
