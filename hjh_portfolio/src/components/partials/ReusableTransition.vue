<template>
  <transition-group
    name="fade-move"
    tag="div"
    class="h-[88px] sticky overflow-hidden flex items-center"
  >
    <!-- 현재 텍스트 -->
    <p
      v-if="currentText"
      :key="currentText"
      class="text-move text-green-p300 font-900"
      :style="textPositionStyle"
    >
      {{ currentText }}
    </p>

    <!-- 중간 텍스트 -->
    <p
      v-if="middleText"
      :key="middleText"
      class="text-move next text-green-p300 font-900"
      :style="textPositionStyle"
    >
      {{ middleText }}
    </p>

    <!-- 기본 텍스트 -->
    <div v-if="staticText">
      <span
        :key="'static-span'"
        class="space-nowrap font-700"
        :style="{ paddingLeft: `${staticTextPadding}px` }"
      >
        {{ staticText }}
      </span>
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
    staticText: {
      type: String,
      required: false,
      default: "",
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
    staticTextPadding: {
      type: Number,
      required: false,
      default: 0,
    },
    textPosition: {
      type: Object,
      required: false,
      default: () => ({ position: "absolute", top: "0px", left: "0px" }),
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
    next() {
      this.stopAutoRotate(); // 자동 회전 중지
      const nextIndex = (this.currentIndex + 1) % this.texts.length;
      this.rotateText(nextIndex);
      this.startAutoRotate(); // 자동 회전 재시작
    },
    prev() {
      this.stopAutoRotate(); // 자동 회전 중지
      const prevIndex =
        (this.currentIndex - 1 + this.texts.length) % this.texts.length;
      this.rotateText(prevIndex);
      this.startAutoRotate(); // 자동 회전 재시작
    },
  },
  mounted() {
    this.startAutoRotate();
  },
  beforeUnmount() {
    this.stopAutoRotate();
  },
  expose: ["next", "prev"], // expose를 통해 부모 컴포넌트에서 next와 prev 메서드 호출 가능
};
</script>

<style scoped lang="scss">
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
  transform: translateY(-120px);
}

.space-nowrap {
  white-space: nowrap;
}
</style>
