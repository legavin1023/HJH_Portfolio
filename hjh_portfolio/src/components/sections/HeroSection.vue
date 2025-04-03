<template>
  <div class="flex justify-center pt-[249px] pb-[45px]">
    <div class="text-box">
      <div>
        <span
          v-for="(text, index) in texts1"
          :key="index"
          class="inline-block w-[84px] h-[35px] rounded-full border border-black-b50 mb-[30px] mr-[8px] text-center text-sm/[33px]"
          :class="{
            'bg-green-p250 text-black-b00 border-green-p250 transition-colors duration-00 ease-in-out':
              highlightClasses[index],
          }"
        >
          {{ text }}
        </span>
      </div>
      <div class="mb-[30px] text-[80px] leading-[88px]">
        <ReusableTransition
          :texts="texts1"
          staticText="을 합니다."
          :initialDelay="0"
          :transitionSpeed="2000"
          :middleTextDelay="2000"
          :staticTextPadding="230"
          class="space-nowrap"
          mode="staticTogether"
          @update="updateHighlight"
        />
        <ReusableTransition
          :texts="texts2"
          staticText="를 합니다."
          :initialDelay="500"
          :transitionSpeed="2000"
          :middleTextDelay="2000"
          :staticTextPadding="160"
          class="space-nowrap"
          mode="staticTogether"
        />
      </div>
      <p class="squiggly mt-[10px] font-semibold text-[30px]">
        언제나 디자이너의 본분을 잊지 말자!
      </p>
      <img class="mt-[79px]" src="@/assets/image/backgrounds/tree.svg" alt="" />
    </div>
    <LottieAnimation class="ml-[99px]" />
  </div>
</template>

<script>
import LottieAnimation from "@/components/partials/LottieAnimation.vue";
import ReusableTransition from "@/components/partials/ReusableTransition.vue";

export default {
  components: {
    LottieAnimation,
    ReusableTransition,
  },
  data() {
    return {
      texts1: ["디자인", "HTML", "드로잉"],
      texts2: ["설계", "대화", "아트"],
      highlightClasses: [true, false, false], // 첫 번째 요소를 true로 설정
    };
  },
  methods: {
    updateHighlight(currentIndex) {
      // 강조 상태 업데이트
      this.highlightClasses = this.texts1.map(
        (_, index) => index === currentIndex
      );
    },
  },
};
</script>

<style scoped lang="scss"></style>
