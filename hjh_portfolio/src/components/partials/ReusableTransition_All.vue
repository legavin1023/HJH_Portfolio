<template>
  <transition-group
    name="fade-move"
    tag="div"
    class="w-[600px] h-[88px] sticky overflow-hidden flex flex-col text-left top-0 left-0"
  >
    <!-- 현재 텍스트 -->
    <div
      v-if="currentText"
      :key="`current-${currentText.green}-${currentText.black}`"
      class="flex items-center gap-[10px]"
    >
      <span class="text-green-p300 font-900 text-[80px] leading-[88px]">
        {{ currentText.green }}
      </span>
      <p class="text-black-b750 font-700 text-[80px] leading-[88px]">
        {{ currentText.black }}
      </p>
    </div>

    <!-- 중간 텍스트 -->
    <div
      v-if="middleText"
      :key="`middle-${middleText.green}-${middleText.black}`"
      class="flex items-center gap-[10px] opacity-effect"
    >
      <span class="text-green-p300 font-900 text-[80px] leading-[88px]">
        {{ middleText.green }}
      </span>
      <p class="text-black-b750 font-700 text-[80px] leading-[88px]">
        {{ middleText.black }}
      </p>
    </div>
  </transition-group>
</template>
<script>
export default {
  props: {
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
      currentText: this.texts[0], // 초록색과 검은색 텍스트를 포함한 객체
      middleText: null, // 중간 텍스트 초기값
      intervalId: null,
    };
  },
  computed: {
    textPositionStyle() {
      return {
        position: this.textPosition.position || "absolute", // 기본값으로 "absolute" 설정
        top: this.textPosition.top || "0px",
        left: this.textPosition.left || "0px",
      };
    },
  },
  methods: {
    rotateText(nextIndex = null) {
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
      }, this.transitionSpeed);
    },
    startAutoRotate() {
      // 첫 번째 전환: initialDelay 후 실행
      setTimeout(() => {
        this.rotateText();

        // 이후 전환: transitionSpeed 간격으로 실행
        this.intervalId = setInterval(() => {
          this.rotateText();
        }, this.transitionSpeed + this.middleTextDelay); // 정확한 간격 유지
      }, this.initialDelay);
    },
    stopAutoRotate() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
  },
  mounted() {
    this.startAutoRotate();
  },
  beforeUnmount() {
    this.stopAutoRotate();
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
  transform: translateY(-88px);
}

.space-nowrap {
  white-space: nowrap;
}
</style>
