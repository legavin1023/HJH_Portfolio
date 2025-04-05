<template>
  <div class="absolute top-0 flex flex-col items-center justify-center">
    <p class="squiggly text-black-b300 text-[30px] text-center pt-[130px]">
      (당연하겠지만)
    </p>
    <!-- 슬라이드쇼 컨테이너 -->
    <div class="relative overflow-hidden w-full h-[90px] mb-[20px]">
      <div
        class="absolute top-[170px] w-full h-full flex flex-col items-center justify-center transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateY(-${currentIndex * 100}%)` }"
      >
        <!-- 슬라이드 텍스트 -->
        <div
          v-for="(text, index) in texts"
          :key="index"
          class="w-full h-[90px] flex items-center justify-center text-[60px] font-900 text-green-p300"
        >
          {{ text }}
          <span class="font-700 text-black-b900">할 줄 알아요!</span>
        </div>
      </div>
    </div>
    <div class="relative flex flex-col items-center justify-center">
      <div
        class="w-[1706px] absolute bottom-[0px] z-0 flex flex-row justify-between items-center mt-[50px]"
      >
        <!-- 왼쪽 이미지 그룹 -->
        <div class="w-[278px] h-[400px] relative">
          <img
            v-for="(image, index) in imagesLeft"
            :key="`left-${index}`"
            :src="image.src"
            :alt="image.alt"
            class="floating"
            :style="{
              animationDuration: `${image.duration}s`,
              top: image.top,
              left: image.left,
            }"
          />
        </div>

        <!-- 오른쪽 이미지 그룹 -->
        <div class="w-[278px] h-[400px] relative">
          <img
            v-for="(image, index) in imagesRight"
            :key="`right-${index}`"
            :src="image.src"
            :alt="image.alt"
            class="floating"
            :style="{
              animationDuration: `${image.duration}s`,
              top: image.top,
              left: image.left,
            }"
          />
        </div>
      </div>
      <div
        class="relative z-10 w-[675px] h-[225px] border rounded-t-[30px] rounded-b-[40px] flex flex-col overflow-x-hidden"
      >
        <div
          class="flex justify-center items-center w-full font-800 h-[75px] text-center py-4 bg-black-b20 border-b-[1px] border-black-b40"
        >
          <span
            v-for="(text, index) in texts"
            :key="index"
            :style="{
              backgroundColor: currentIndex === index ? '#2B7FFF' : '',
              borderColor: currentIndex === index ? '#2B7FFF' : '',
              color: currentIndex === index ? 'white' : '',
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
            class="fl w-full h-[90px] flex-shrink-0 flex flex-row items-center justify-center"
          >
            <div class="flex items-center justify-center mr-[27px] mb-[14px]">
              <img
                class="w-[12.28px] h-[9.56px] mr-[5.44px]"
                src="@/assets/image/icons/check_small.svg"
                alt=""
              />
              <span class="text-[20px] font-800 text-black-b500"> 숙련도</span>
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
                        i === 1 || i % 5 === 0 ? 'bg-black-b80' : 'bg-black-b60'
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

import FigmaImage from "@/assets/image/tool/Figma.png";
import AeImage from "@/assets/image/tool/Ae.png";
import PsImage from "@/assets/image/tool/Ps.png";
import htmlImage from "@/assets/image/tool/html.png";
import CssImage from "@/assets/image/tool/css.png";
import AiImage from "@/assets/image/tool/Ai.png";

export default {
  components: {
    SlideButton,
  },
  data() {
    return {
      texts: ["포토샵", "일러스트레이터", "피그마", "애프터이펙트", "HTML/CSS"],
      percentages: [99, 80, 90, 60, 60], // 각 슬라이드의 퍼센트 지정
      currentIndex: 0, // 현재 슬라이드 인덱스
      transitionKey: 0, // ReusableTransition을 재생성하기 위한 key
      progress: 0,
      slideInterval: null, // 슬라이드 타이머
      imagesLeft: [
        {
          src: FigmaImage, // 임포트된 이미지 경로
          alt: "Figma",
          marginClass: "ml-[200px]",
          duration: 5,
          top: "0px",
          left: "335px",
        },
        {
          src: AeImage, // 임포트된 이미지 경로
          alt: "After Effects",
          marginClass: "",
          duration: 6,
          top: "155px",
          left: "100px",
        },
        {
          src: PsImage, // 임포트된 이미지 경로
          alt: "Photoshop",
          marginClass: "ml-[200px]",
          duration: 7,
          top: "325px",
          left: "275px",
        },
      ],
      imagesRight: [
        {
          src: htmlImage, // 임포트된 이미지 경로
          alt: "Illustrator",
          duration: 5,
          top: "0px",
          left: "-80px",
        },
        {
          src: CssImage, // 임포트된 이미지 경로
          alt: "VS Code",
          marginClass: "",
          duration: 6,
          top: "155px",
          left: "112px",
        },
        {
          src: AiImage, // 임포트된 이미지 경로
          alt: "Sketch",
          duration: 7,
          top: "325px",
          left: "-40px",
        },
      ],
      floatingClassesLeft: [], // 왼쪽 이미지의 클래스 상태
      floatingClassesRight: [], // 오른쪽 이미지의 클래스 상태
    };
  },
  computed: {
    visibleTexts() {
      // 현재 슬라이드에 해당하는 텍스트만 반환
      return [this.texts[this.currentIndex]];
    },
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.updateProgress();
      this.resetSlideInterval(); // 타이머 초기화
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.texts.length) % this.texts.length;
      this.updateProgress();
      this.resetSlideInterval(); // 타이머 초기화
    },
    resetTransition() {
      this.transitionKey += 1; // key 값을 변경하여 컴포넌트를 재생성
    },

    updateProgress() {
      this.progress = 0; // 슬라이드 변경 시 즉시 0으로 초기화
      const targetProgress = this.percentages[this.currentIndex];
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
  },
};
</script>

<style scoped>
/* 슬라이드 애니메이션 */
.vertical-slide-enter-active,
.vertical-slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.vertical-slide-enter {
  transform: translateY(100%); /* 다음 슬라이드가 아래에서 올라옴 */
  opacity: 0;
}
.vertical-slide-leave-to {
  transform: translateY(-100%); /* 이전 슬라이드가 위로 사라짐 */
  opacity: 0;
}
.floating {
  position: absolute;
  animation-name: floating;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

/* 애니메이션 정의 */
@keyframes floating {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
  75% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
