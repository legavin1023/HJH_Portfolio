<template>
  <div
    class="relative w-full h-full flex flex-col items-center justify-center pt-[20px]"
  >
    <p
      class="full squiggly text-black-b900 text-[20px] tablet:text-[26px] desktop:text-[30px] text-center"
    >
      (당연하겠지만)
    </p>
    <!-- 슬라이드쇼 컨테이너 -->

    <div
      class="w-full flex flex-col items-center justify-center mb-[170px] tablet:mb-[54px]"
    >
      <div
        class="relative overflow-y-hidden w-full h-[50px] tablet:h-[70px] desktop:h-[90px]"
      >
        <div
          class="absolute top-[102px] tablet:top-[142px] desktop:top-[182px] w-full h-full flex flex-col items-center justify-center transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateY(-${currentIndex * 100}%)` }"
        >
          <!-- 슬라이드 텍스트 -->
          <div
            v-for="(text, index) in texts"
            :key="index"
            class="w-full h-[90px] flex items-center justify-center leading-[50px] tablet:leading-[70px] desktop:leading-[90px] text-[38px] tablet:text-[50px] desktop:text-[60px] font-900 text-green-p300 text-nowrap"
          >
            <span> {{ text }} </span>

            <span
              class="font-700 text-black-b900 hidden tablet:block pl-[20px]"
            >
              할 줄 알아요!</span
            >
          </div>
        </div>
      </div>
      <span
        class="mt-[6px] font-700 text-center text-black-b900 tablet:hidden leading-[50px] text-[38px]"
      >
        할 줄 알아요!</span
      >
    </div>

    <div class="relative w-full flex flex-col items-center justify-center">
      <div
        class="flex w-[400px] tablet:w-[1500px] desktop:w-[1706px] absolute bottom-[0px] z-0 flex-row justify-between items-center mt-[50px]"
      >
        <!-- 왼쪽 이미지 그룹 -->
        <div class="w-[80px] tablet:w-[278px] h-[400px] relative">
          <img
            v-for="(image, index) in imagesLeft"
            :key="`left-${index}`"
            :src="image.src"
            :alt="image.alt"
            :class="[
              'floating absolute',
              'w-[34px]',
              'tablet:w-[60px]',
              'desktop:w-[72px]',
            ]"
            :style="{
              animationDuration: `${image.duration}s`,
              top: getPosition(image.positions).top,
              left: getPosition(image.positions).left,
            }"
          />
        </div>
        <!-- 오른쪽 이미지 그룹 -->
        <div class="w-[80px] tablet:w-[278px] h-[400px] relative">
          <img
            v-for="(image, index) in imagesRight"
            :key="`right-${index}`"
            :src="image.src"
            :alt="image.alt"
            :class="[
              'floating absolute',
              'w-[34px]',
              'tablet:w-[60px]',
              'desktop:w-[72px]',
            ]"
            :style="{
              animationDuration: `${image.duration}s`,
              top: getPosition(image.positions).top,
              left: getPosition(image.positions).left,
            }"
          />
        </div>
      </div>

      <div
        class="absolute tablet:relative w-full tablet:w-[724px] desktop:w-[794px] h-[225px] border bg-black-b00 border-black-b40 tablet:rounded-t-[30px] tablet:rounded-b-[40px] flex flex-col overflow-x-hidden"
      >
        <div
          class="relative pl-[10px] flex justify-center items-center w-full font-800 h-[75px] text-center py-4 bg-black-b20 border-b-[1px] border-black-b40"
        >
          <div
            class="transition-transform flex"
            :style="
              isMobile
                ? {
                    transform: `translateX(-${getContainerOffset()}px)`,
                  }
                : {}
            "
          >
            <button
              v-for="(text, index) in texts"
              :key="index"
              @click="goToSlide(index)"
              :style="{
                backgroundColor: currentIndex === index ? '#2B7FFF' : '',
                borderColor: currentIndex === index ? '#2B7FFF' : '',
                color: currentIndex === index ? 'white' : '',
              }"
              class="text-[14px] text-[#3C7BDC] rounded-full border flex-shrink-0 border-blue-b75 mr-[4px] ml-[4px] bg-[#F2F7FF] px-[14px] py-[8px] leading-none transition-colors duration-300 ease-in-out"
            >
              {{ text }}
            </button>
          </div>
        </div>
        <div
          class="relative w-full border-2 h-[152px] flex flex-col justify-center overflow-x-hidden"
        >
          <div
            class="fl w-full h-[90px] flex-shrink-0 flex flex-col tablet:flex-row items-center justify-center"
          >
            <div
              class="flex w-full tablet:w-[76px] items-center justify-center mb-[9px]"
            >
              <img
                class="w-[12.28px] h-[9.56px] mr-[5.44px]"
                src="@/assets/image/icons/check_small.svg"
                alt=""
              />
              <div
                class="min-w-[260px] tablet:min-w-[0px] w-[75%] tablet:w-auto flex justify-start items-start"
              >
                <span class="text-[20px] font-800 text-black-b500">
                  숙련도</span
                >
              </div>
            </div>
            <div
              class="ml-0 tablet:ml-[16px] min-w-[300px] tablet:min-w-[0px] w-[80%] tablet:w-[413px] text-center rounded-full relative"
            >
              <div class="h-[12px] bg-black-b60 rounded-full">
                <div
                  class="h-[12px] bg-green-p250 relative rounded-full"
                  :style="{ width: `${progress}%` }"
                ></div>
              </div>
              <div
                class="w-[69px] h-[48px] absolute top-[-40px] transform translate-x-[-50%] text-black-b0 0 text-xs px-2 py-1 rounded-full bg-cover bg-center"
                :style="{
                  left: `calc(${progress}% - 10px)`,
                }"
              >
                <img src="@/assets/image/backgrounds/bubble.svg" alt="" />
                <span
                  class="absolute bottom-[7px] leading-[48px] text-black-b00 left-1/2 right-0 transform -translate-x-1/2"
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
                    :style="{ width: '100%' }"
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
        <!-- 테스트용 애니메이션 제어 버튼 -->
        <!-- <button
          @click="toggleSlideShow"
          class="fixed bottom-10 right-10 bg-blue-b300 text-white px-4 py-2 rounded-lg z-50"
          :class="
            isPaused
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-b300 hover:bg-blue-b400'
          "
        >
          {{ isPaused ? "슬라이드쇼 시작" : "슬라이드쇼 멈춤" }}
        </button> -->
      </div>
    </div>

    <div
      class="hidden tablet:flex justify-center tablet:w-[680px] desktop:w-[694px] relative bottom-[80px] z-50"
    >
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
      buttonWidth: 120, // 버튼의 너비 (px)
      slideInterval: null, // 슬라이드 타이머
      isPaused: false, // 슬라이드쇼 상태
      scrollOffset: 0, // 현재 스크롤 오프셋
      isMobile: false, // 모바일 여부
      imagesLeft: [
        {
          src: FigmaImage,
          alt: "Figma",
          duration: 5,
          positions: {
            mobile: { top: "80px", left: "90px" }, // 모바일
            tablet: { top: "0px", left: "335px" }, // 태블릿
            desktop: { top: "0px", left: "335px" }, // 데스크톱
          },
        },
        {
          src: AeImage,
          alt: "After Effects",
          duration: 6,
          positions: {
            mobile: { top: "160px", left: "30px" }, // 모바일
            tablet: { top: "325px", left: "275px" }, // 태블릿
            desktop: { top: "325px", left: "275px" }, // 데스크톱
          },
        },
        {
          src: PsImage,
          alt: "Photoshop",
          duration: 7,
          positions: {
            mobile: { top: "240px", left: "70px" }, // 모바일
            tablet: { top: "155px", left: "200px" }, // 태블릿
            desktop: { top: "155px", left: "100px" }, // 데스크톱
          },
        },
      ],
      imagesRight: [
        {
          src: htmlImage,
          alt: "HTML",
          duration: 5,
          positions: {
            mobile: { top: "80px", left: "-40px" }, // 모바일
            tablet: { top: "0px", left: "-80px" }, // 태블릿
            desktop: { top: "0px", left: "-80px" }, // 데스크톱
          },
        },
        {
          src: CssImage,
          alt: "CSS",
          duration: 6,
          positions: {
            mobile: { top: "160px", left: "18px" }, // 모바일
            tablet: { top: "155px", left: "12px" }, // 태블릿
            desktop: { top: "155px", left: "112px" }, // 데스크톱
          },
        },
        {
          src: AiImage,
          alt: "Illustrator",
          duration: 7,
          positions: {
            mobile: { top: "240px", left: "-30px" }, // 모바일
            tablet: { top: "325px", left: "-40px" }, // 태블릿
            desktop: { top: "325px", left: "-40px" }, // 데스크톱
          },
        },
      ],
      floatingClassesLeft: [], // 왼쪽 이미지의 클래스 상태
      floatingClassesRight: [], // 오른쪽 이미지의 클래스 상태
    };
  },
  computed: {
    infiniteTexts() {
      return [
        this.texts[this.texts.length - 1], // 마지막 텍스트를 맨 앞에 추가
        ...this.texts,
        this.texts[0], // 첫 번째 텍스트를 맨 뒤에 추가
      ];
    },
  },
  methods: {
    goToSlide(index) {
      // 슬라이드 이동
      this.currentIndex = index;
      this.updateProgress(); // 진행 상태 업데이트
      this.resetSlideInterval(); // 타이머 초기화
    },
    getButtonOffset(index) {
      // 현재 버튼까지의 너비를 계산하여 왼쪽 기준으로 이동
      const buttonWidths = this.texts.map((text) =>
        this.calculateButtonWidth(text)
      );
      const totalWidth = buttonWidths
        .slice(0, index) // 현재 인덱스 이전 버튼들의 너비 합산
        .reduce((acc, width) => acc + width, 0);
      return totalWidth; // 왼쪽 기준으로 이동
    },
    getContainerOffset() {
      const buttonWidths = this.texts.map((text) =>
        this.calculateButtonWidth(text)
      );
      const containerWidth = this.$el.offsetWidth; // 화면에 보이는 컨테이너 너비
      const currentOffset = buttonWidths
        .slice(0, this.currentIndex) // 현재 인덱스 이전 버튼들의 너비 합산
        .reduce((acc, width) => acc + width, 0);

      // 버튼이 화면을 넘어갈 때만 이동
      if (currentOffset + buttonWidths[this.currentIndex] > containerWidth) {
        return currentOffset + buttonWidths[this.currentIndex] - containerWidth;
      } else if (currentOffset < 0) {
        return 0; // 왼쪽 끝에 고정
      }
      return 0; // 이동하지 않음
    },
    calculateButtonWidth(text) {
      // 글자 수에 따라 버튼 너비 계산 (기본 글자당 14px + 패딩)
      const baseWidth = 14; // 글자당 기본 너비 (px)
      const padding = 32; // 좌우 패딩 (px)
      return text.length * baseWidth + padding;
    },
    getPosition(positions) {
      const width = window.innerWidth;

      if (width <= 959) {
        return {
          ...positions.mobile,
        };
      } else if (width >= 960 && width <= 1279) {
        return {
          ...positions.tablet,
        };
      } else if (width >= 1280) {
        return {
          ...positions.desktop,
        };
      }
    },
    nextSlide() {
      if (!this.isPaused) {
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        this.updateProgress();
        this.resetSlideInterval(); // 타이머 초기화
      }
    },
    prevSlide() {
      if (!this.isPaused) {
        this.currentIndex =
          (this.currentIndex - 1 + this.texts.length) % this.texts.length;
        this.updateProgress();
        this.resetSlideInterval(); // 타이머 초기화
      }
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
      // 슬라이드 타이머 초기화
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
      }
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 4000); // 4초마다 슬라이드 변경
    },

    checkIsMobile() {
      this.isMobile = window.innerWidth <= 960;
    },
  },
  mounted() {
    this.resetSlideInterval(); // 컴포넌트가 마운트될 때 타이머 설정
    this.updateProgress();
    this.checkIsMobile();
    window.addEventListener("resize", this.checkIsMobile); // 창 크기 변경 시 모바일 여부 업데이트
  },
  beforeUnmount() {
    clearInterval(this.slideInterval); // 컴포넌트가 언마운트될 때 타이머 제거
    window.removeEventListener("resize", this.checkIsMobile); // 이벤트 리스너 제거
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
} /* 애니메이션 정의 */
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

<style scoped>
/* 부드러운 이동 애니메이션 */
.transition-transform {
  transition: transform 0.5s ease-in-out;
}
</style>
