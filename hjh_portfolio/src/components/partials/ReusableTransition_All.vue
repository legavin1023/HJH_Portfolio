<template>
  <transition-group
    name="fade-move"
    tag="div"
    class="sticky w-[620px] items-center tablet:items-start h-[44px] tablet:h-[66px] desktop:h-[99px] overflow-hidden flex flex-col text-left top-0 left-0 text-[0px]"
  >
    <!-- 현재 텍스트 -->
    <div
      v-if="currentText"
      :key="`current-${currentText.green}-${currentText.black}`"
      class="flex items-center leading-[44px] tablet:leading-[66px] desktop:leading-[100px] text-[40px] tablet:text-[60px] desktop:text-[80px]"
    >
      <span class="text-green-p300 font-900">
        {{ currentText.green }}
      </span>
      <p class="text-black-b700 font-700">
        {{ currentText.black }}
      </p>
    </div>

    <!-- 중간 텍스트 -->
    <div
      v-if="middleText"
      :key="`middle-${middleText.green}-${middleText.black}`"
      class="flex items-center leading-[44px] tablet:leading-[66px] desktop:leading-[99px] text-[40px] tablet:text-[60px] desktop:text-[80px] opacity-effect"
    >
      <span class="text-green-p300 font-900">
        {{ middleText.green }}
      </span>
      <p class="text-black-b700 font-700">
        {{ middleText.black }}
      </p>
    </div>
  </transition-group>
</template>
<script>
export default {
  props: {
    isPaused: {
      type: Boolean,
      required: false,
      default: false, // 기본값: 애니메이션 실행
    },
    texts: {
      type: Array,
      required: true,
    },
    initialDelay: {
      type: Number,
      required: false,
      default: 1000,
    },
    transitionSpeed: {
      type: Number,
      required: false,
      default: 2000,
    },
    middleTextDelay: {
      type: Number,
      required: false,
      default: 2000,
    },
  },
  data() {
    return {
      currentIndex: 0,
      currentText: this.texts[0],
      middleText: null, // 중간 텍스트 초기값
      intervalId: null,
    };
  },
  methods: {
    rotateText(nextIndex = null) {
      if (this.isPaused) return; // 애니메이션이 멈춘 상태라면 실행하지 않음

      const targetIndex =
        nextIndex !== null
          ? nextIndex
          : (this.currentIndex + 1) % this.texts.length;

      // 중간 텍스트 표시
      this.middleText = this.texts[targetIndex];

      // 현재 텍스트 업데이트
      setTimeout(() => {
        this.currentText = this.middleText;
        this.middleText = null; // 중간 텍스트 숨김
        this.currentIndex = targetIndex;

        // 부모 컴포넌트에 현재 인덱스 전달
        this.$emit("update", targetIndex);
      }, this.middleTextDelay); // middleTextDelay로 조정
    },
    startAutoRotate() {
      if (this.isPaused) return; // 멈춘 상태에서는 실행하지 않음

      setTimeout(() => {
        this.rotateText();

        this.intervalId = setInterval(() => {
          this.rotateText();
        }, this.transitionSpeed + this.middleTextDelay);
      }, this.initialDelay);
    },
    stopAutoRotate() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    updateDynamicStyles() {
      const styleSheet = document.styleSheets[0]; // 첫 번째 스타일 시트를 가져옴
      const windowWidth = window.innerWidth;
      let translateY = "-44px"; // 기본값 (Mobile)

      // 크기 기준 변경
      if (windowWidth >= 1024 && windowWidth < 1440) {
        translateY = "-66px"; // Tablet
      } else if (windowWidth >= 1440 && windowWidth < 1920) {
        translateY = "-99px"; // FHD
      }

      // 기존 규칙 제거
      for (let i = 0; i < styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
        if (
          rule.selectorText === ".fade-move-enter" ||
          rule.selectorText === ".fade-move-leave-to"
        ) {
          styleSheet.deleteRule(i);
          i--; // 삭제 후 인덱스 조정
        }
      }

      // 새로운 규칙 추가
      styleSheet.insertRule(
        `.fade-move-enter, .fade-move-leave-to {
        transform: translateY(${translateY});
        opacity: 0;
      }`,
        styleSheet.cssRules.length
      );
    },
  },
  watch: {
    isPaused(newVal) {
      if (newVal) {
        this.stopAutoRotate();
      } else {
        this.startAutoRotate();
      }
    },
  },
  mounted() {
    this.startAutoRotate();
    this.updateDynamicStyles();
    window.addEventListener("resize", this.updateDynamicStyles); // 화면 크기 변경 시 업데이트
  },
  beforeUnmount() {
    this.stopAutoRotate();
    window.removeEventListener("resize", this.updateDynamicStyles); // 이벤트 제거
  },
};
</script>

<style scoped lang="scss">
.opacity-effect {
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.text-move {
  transition: opacity 0.5s, transform 0.5s;
  &.next {
    transform: translateY(120px);
    opacity: 0;
    transition: opacity 0.25s, transform 0.25s;
  }
}

.fade-move-enter-active,
.fade-move-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-move-enter,
.fade-move-leave-to {
  opacity: 0;
}
</style>
