<template>
  <div class="flex flex-col items-center justify-center">
    <p
      class="squiggly text-black-b300 text-3xl text-center pt-[130px] pb-[16px] mb-[12px]"
    >
      (당연하겠지만)
    </p>
    <div class="overflow-x-hidden">
      <div
        class="flex transition-transform duration-500 ease-in-out pb-[50px]"
        :style="{ transform: `translateX(-${currentIndex1 * 100}%)` }"
      >
        <div
          v-for="(text, index) in texts"
          :key="index"
          class="w-full flex-col flex-shrink-0 flex flcol items-center justify-center"
        >
          <div class="text-center text-6xl">
            <span class="text-green-p300 font-black">{{ text }}</span>
            <span class="font-medium"> 할 줄 알아요!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="relative flex flex-col items-center justify-center">
      <div
        class="w-[1706px] absolute bottom-[-40px] z-0 flex flex-row justify-between items-center mt-[50px]"
      >
        <div class="w-[278px] h-[400px] flex flex-col justify-between">
          <img
            src="@/assets/image/tool/Figma.png"
            alt="figma"
            :style="generateFloatingStyle()"
            class="w-[72px] ml-[200px] floating"
          />
          <img
            src="@/assets/image/tool/Ae.png"
            alt="Ae"
            :style="generateFloatingStyle()"
            class="w-[72px] floating"
          />
          <img
            src="@/assets/image/tool/Ps.png"
            alt="Ps"
            :style="generateFloatingStyle()"
            class="w-[72px] ml-[200px] floating"
          />
        </div>
        <div
          class="w-[278px] h-[441px] flex flex-col justify-between items-end"
        >
          <img
            src="@/assets/image/tool/Ae.png"
            alt="Ae"
            :style="generateFloatingStyle()"
            class="w-[72px] mr-[200px] floating"
          />
          <img
            src="@/assets/image/tool/Ai.png"
            alt="Ai"
            :style="generateFloatingStyle()"
            class="w-[72px] floating"
          />
          <img
            src="@/assets/image/tool/vsCode.png"
            alt="vsCode"
            :style="generateFloatingStyle()"
            class="w-[72px] mr-[200px] floating"
          />
        </div>
      </div>
      <div
        class="relative z-10 w-[675px] h-[225px] border rounded-[60px] flex flex-col overflow-x-hidden"
      >
        <div
          class="flex justify-center items-center w-full h-[75px] text-center py-4 bg-black-b20 border-b-[1px] border-black-b40"
        >
          <span
            v-for="(text, index) in texts"
            :key="index"
            :style="{
              backgroundColor: currentIndex1 === index ? '#2B7FFF' : '',
              borderColor: currentIndex1 === index ? '#2B7FFF' : '',
              color: currentIndex1 === index ? 'white' : '',
            }"
            class="text-sm text-blue-b300 rounded-full border border-blue-b75 mr-[4px] ml-[4px] bg-[#F2F7FF] px-[14px] py-[8px]"
          >
            {{ text }}
          </span>
        </div>
        <div
          class="relative w-[675px] h-[152px] flex flex-col overflow-x-hidden mt-8"
        >
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex2 * 100}%)` }"
          >
            <div
              v-for="(text, index) in texts"
              :key="index"
              class="fl w-full h-[90px] flex-shrink-0 flex flex-row items-center justify-center"
            >
              <div class="flex items-center justify-center mr-[27px] mb-[14px]">
                <img
                  class="w-[12.28px] h-[9.56px] mr-[5.44px]"
                  src="@/assets/image/icons/check_small.svg"
                  alt=""
                />
                <span class="text-[20px] font-medium"> 숙련도</span>
              </div>
              <div class="w-[413px] text-center rounded-full relative">
                <div class="h-[12px] bg-black-b60 rounded-full">
                  <div
                    class="h-[12px] bg-green-p250 relative rounded-full"
                    :style="{ width: `${progress}%` }"
                  ></div>
                </div>
                <div
                  class="w-[49px] h-[28px] absolute top-[-26px] transform translate-x-[-50%] text-black-b0 0 text-xs px-2 py-1 rounded-full bg-cover bg-center"
                  :style="{
                    left: `calc(${progress}% - 10px)`,
                  }"
                >
                  <img src="@/assets/image/backgrounds/bubble.svg" alt="" />
                  <span
                    class="absolute bottom-[9px] text-black-b00 left-1/2 right-0 transform -translate-x-1/2"
                  >
                    {{ Math.round(progress) }}</span
                  >
                </div>
                <div class="flex items-center mt-[6px]">
                  <div class="relative w-full flex">
                    <div
                      v-for="i in 50"
                      :key="i"
                      class="flex flex-col items-center justify-center"
                      :style="{ width: '2%' }"
                    >
                      <!-- 눈금 -->
                      <div
                        :class="
                          i === 1 || i % 5 === 0
                            ? 'bg-black-b80'
                            : 'bg-black-b60'
                        "
                        :style="{
                          width: i === 1 || i % 5 === 0 ? '2px' : '1px',
                          height: i === 1 || i % 5 === 0 ? '10px' : '6px',
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center w-[820px] relative bottom-[100px]">
      <!-- 이전 슬라이드 버튼 -->
      <SlideButton direction="prev" :onClick="prevSlide" />
      <!-- 다음 슬라이드 버튼 -->
      <SlideButton direction="next" :onClick="nextSlide" />
    </div>
  </div>
</template>

<script>
import SlideButton from "@/components/partials/slideButton.vue";

export default {
  components: {
    SlideButton,
  },
  data() {
    return {
      texts: ["포토샵", "일러스트레이터", "피그마", "애프터이펙트", "HTML/CSS"],
      percentages: [99, 80, 90, 60, 60], // 각 슬라이드의 퍼센트 지정
      currentIndex1: 0,
      currentIndex2: 0,
      progress: 0,
      slideInterval: null, // 슬라이드 타이머
      imageStyles: [], // 각 이미지의 스타일을 저장 (툴)
    };
  },
  methods: {
    generateFloatingStyle() {
      const depth = 20; // 고정된 높이
      const duration = 5; // 고정된 지속 시간
      const delay = Math.random() * 2; // 0초에서 2초 사이의 랜덤 지연 시간
      const direction = Math.random() > 0.5 ? "normal" : "reverse"; // 위/아래 방향 랜덤 설정
      return {
        animation: `float ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) infinite`,
        animationDelay: `${delay}s`,
        animationDirection: direction, // 위/아래 방향 설정
        "--float-depth": `${depth}px`, // 고정된 높이 전달
      };
    },
    nextSlide() {
      this.currentIndex1 = (this.currentIndex1 + 1) % this.texts.length;
      this.currentIndex2 = (this.currentIndex2 + 1) % this.texts.length;
      this.updateProgress();
      this.resetSlideInterval(); // 타이머 초기화
    },
    prevSlide() {
      this.currentIndex1 =
        (this.currentIndex1 - 1 + this.texts.length) % this.texts.length;
      this.currentIndex2 =
        (this.currentIndex2 - 1 + this.texts.length) % this.texts.length;
      this.updateProgress();
      this.resetSlideInterval(); // 타이머 초기화
    },
    updateProgress() {
      this.progress = 0; // 슬라이드 변경 시 즉시 0으로 초기화
      const targetProgress = this.percentages[this.currentIndex1];
      setTimeout(() => {
        const interval = setInterval(() => {
          if (this.progress < targetProgress) {
            this.progress += targetProgress / 40; // 2초 동안 목표 퍼센트로 증가
            if (this.progress > targetProgress) {
              this.progress = targetProgress; // 목표 퍼센트를 초과하지 않도록 설정
            }
          } else {
            clearInterval(interval);
          }
        }, 50);
      }, 0); // 0ms 지연 후 진행 시작
    },
    resetSlideInterval() {
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
      }
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 4000); // 4초마다 슬라이드 변경
    },
  },
  mounted() {
    this.resetSlideInterval(); // 컴포넌트가 마운트될 때 타이머 설정
    this.updateProgress();
    // 이미지 스타일 초기화
    this.imageStyles = Array.from({ length: 6 }, () =>
      this.generateFloatingStyle()
    );
  },
  beforeUnmount() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval); // 컴포넌트가 파괴될 때 타이머 해제
    }
  },
};
</script>
<style scoped>
@keyframes float {
  0% {
    transform: translateY(0); /* 원래 위치 */
  }
  50% {
    transform: translateY(calc(var(--float-depth, 20px) * -1)); /* 위로 이동 */
  }
  100% {
    transform: translateY(0); /* 원래 위치로 돌아옴 */
  }
}

.floating {
  animation: float 4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite !important; /* 부드러운 애니메이션 */
}
</style>
