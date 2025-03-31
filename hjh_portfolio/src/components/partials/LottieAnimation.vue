<template>
  <div id="lottie" ref="lottieContainer"></div>
</template>

<script>
import lottie from "lottie-web";
import animationData from "@/assets/chracter_movin_hong/chracter_movin_hong.json";

export default {
  name: "HongAnimation",
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
