<template>
  <div class="flex justify-center">
    <div class="text-box">
      <div>
        <span
          v-for="(text, index) in texts"
          :key="index"
          class="inline-block w-[84px] h-[35px] leading-[35px] rounded-full border font-800 text-black-b700 border-black-b50 mb-[30px] mr-[8px] text-center text-[14px]"
          :class="{
            '!bg-green-p250 !text-black-b00 !border-green-p250 transition-colors duration-300 ease-in-out':
              highlightClasses[index],
          }"
        >
          {{ text }}
        </span>
      </div>
      <div class="mb-[30px] text-[80px] leading-[88px]">
        <!-- <ReusableTransition_All
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
        <ReusableTransition_All
          :texts="texts2"
          staticText="를 합니다."
          :initialDelay="500"
          :transitionSpeed="2000"
          :middleTextDelay="2000"
          :staticTextPadding="160"
          class="space-nowrap text-black-b750"
          mode="staticTogether"
        /> -->
        <!-- 첫 번째 ReusableTransition -->
        <ReusableTransition_All
          :texts="texts1"
          :initialDelay="0"
          :transitionSpeed="2000"
          :middleTextDelay="2000"
          :isPaused="isPaused"
          @update="updateHighlight"
          class="space-nowrap mb-[17px]"
        />
        <!-- 두 번째 ReusableTransition -->
        <ReusableTransition_All
          :texts="texts2"
          :initialDelay="500"
          :transitionSpeed="2000"
          :middleTextDelay="2000"
          :isPaused="isPaused"
          class="space-nowrap"
        />
      </div>
      <p class="squiggly mt-[10px] font-800 text-[30px] text-black-b600">
        언제나 디자이너의 본분을 잊지 말자!
      </p>
      <img class="mt-[79px]" src="@/assets/image/backgrounds/tree.svg" alt="" />
    </div>
    <LottieAnimation class="ml-[99px]" />
    <!-- 애니메이션 제어 버튼 -->
    <button
      @click="toggleAnimation"
      class="fixed bottom-10 right-[200px] bg-blue-b300 text-white px-4 py-2 rounded-lg z-50"
      :class="
        isPaused
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-blue-b300 hover:bg-blue-b400'
      "
    >
      {{ isPaused ? "메인페이지 시작" : "메인페이지 멈춤" }}
    </button>
  </div>
</template>

<script>
import LottieAnimation from "@/components/partials/LottieAnimation.vue";
import ReusableTransition_All from "@/components/partials/ReusableTransition_All.vue";

export default {
  components: {
    LottieAnimation,
    ReusableTransition_All,
  },
  data() {
    return {
      texts: ["디자인", "HTML", "드로잉"],
      texts1: [
        { green: "디자인", black: "을 합니다." },
        { green: "HTML", black: "을 합니다." },
        { green: "드로잉", black: "을 합니다." },
      ],
      texts2: [
        { green: "설계", black: "를 합니다." },
        { green: "대화", black: "를 합니다." },
        { green: "아트", black: "를 합니다." },
      ],
      // texts1: ["디자인", "HTML", "드로잉"],
      // texts2: ["설계", "대화", "아트"],
      highlightClasses: [true, false, false], // 강조 상태
      isPaused: false, // 애니메이션 상태
    };
  },
  methods: {
    updateHighlight(currentIndex) {
      // 첫 번째 강조 상태 업데이트
      this.highlightClasses = this.texts1.map(
        (_, index) => index === currentIndex
      );
    },
    toggleAnimation() {
      this.isPaused = !this.isPaused;
    },
  },
};
</script>

<style scoped lang="scss"></style>
