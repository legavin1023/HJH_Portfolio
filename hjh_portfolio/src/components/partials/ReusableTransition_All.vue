<template>
  <transition-group
    name="fade-move"
    tag="div"
    class="sticky w-[620px] items-center tablet:items-start h-[44px] tablet:h-[66px] desktop:h-[88px] overflow-hidden flex flex-col text-left top-0 left-0"
  >
    <!-- 현재 텍스트 -->
    <div
      v-if="currentText"
      :key="`current-${currentText.green}-${currentText.black}`"
      class="flex items-center leading-[44px] tablet:leading-[66px] desktop:leading-[88px] text-[40px] tablet:text-[60px] desktop:text-[80px]"
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
      class="flex items-center leading-[44px] tablet:leading-[66px] desktop:leading-[88px] text-[40px] tablet:text-[60px] desktop:text-[80px] opacity-effect"
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
      default: 2500,
    },
  },
  data() {
    return {
      currentIndex: 0,
      currentText: this.texts[0],
      middleText: null,
      intervalId: null,
    };
  },
  methods: {
    rotateText(nextIndex = null) {
      const targetIndex =
        nextIndex !== null
          ? nextIndex
          : (this.currentIndex + 1) % this.texts.length;

      this.middleText = this.texts[targetIndex];

      setTimeout(() => {
        this.currentText = this.middleText;
        this.middleText = null;
        this.currentIndex = targetIndex;

        this.$emit("update", targetIndex);
      }, this.transitionSpeed);
    },
    startAutoRotate() {
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
      const styleSheet = document.styleSheets[0];
      const windowWidth = window.innerWidth;
      let translateY = "-44px";

      if (windowWidth >= 1024 && windowWidth < 1440) {
        translateY = "-66px";
      } else if (windowWidth >= 1440) {
        translateY = "-88px";
      }

      for (let i = 0; i < styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
        if (
          rule.selectorText === ".fade-move-enter" ||
          rule.selectorText === ".fade-move-leave-to"
        ) {
          styleSheet.deleteRule(i);
          i--;
        }
      }

      styleSheet.insertRule(
        `.fade-move-enter, .fade-move-leave-to {
          transform: translateY(${translateY});
          opacity: 0;
        }`,
        styleSheet.cssRules.length
      );
    },
  },
  mounted() {
    this.startAutoRotate();
    this.updateDynamicStyles();
    window.addEventListener("resize", this.updateDynamicStyles);
  },
  beforeUnmount() {
    this.stopAutoRotate();
    window.removeEventListener("resize", this.updateDynamicStyles);
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

.fade-move-enter-active,
.fade-move-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
</style>
