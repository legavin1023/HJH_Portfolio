<template>
  <div class="flex justify-center pt-[249px] pb-[45px]">
    <div class="text-box">
      <div>
        <span
          v-for="(text, index) in texts1"
          :key="index"
          class="inline-block w-[84px] h-[35px] rounded-full border border-black-b50 mb-[30px] mr-[8px] text-center text-sm/[33px]"
          :class="{
            'bg-green-p250 text-black-b00 border-green-p250  transition-colors duration-00 ease-in-out':
              highlightClasses[index],
          }"
        >
          {{ text }}
        </span>
      </div>
      <div
        class="mb-[30px] text-[80px] leading-[88px] sticky font-black text-p300"
      >
        <transition-group
          name="fade-move"
          tag="div"
          class="overflow-hidden h-[88px] sticky"
        >
          <p
            v-if="showText1"
            :key="currentText1"
            class="absolute text-move text-green-p300"
          >
            {{ currentText1 }}
          </p>
          <p
            v-if="showmiddleText1"
            :key="middleText1"
            class="absolute text-move next text-green-p300"
          >
            {{ middleText1 }}
          </p>
          <span
            :key="'static-span'"
            class="text-padding font-bold pl-[230px] whitespace-nowrap"
            >을 합니다.</span
          >
        </transition-group>
        <transition-group
          name="fade-move"
          tag="div"
          class="overflow-hidden h-[88px] sticky"
        >
          <p
            v-if="showText2"
            :key="currentText2"
            class="text-move absolute text-green-p300"
          >
            {{ currentText2 }}
          </p>
          <p
            v-if="showmiddleText2"
            :key="middleText2"
            class="text-move absolute next text-2 text-green-p300"
          >
            {{ middleText2 }}
          </p>
          <span
            :key="'static-span'"
            class="font-normal pl-[160px] text-black white space-nowrap"
            >를 합니다.</span
          >
        </transition-group>
      </div>
      <p class="squiggly mt-[10px] font-semibold text-[28px]">
        언제나 디자이너의 본분을 잊지 말자!
      </p>
      <img class="mt-[79px]" src="@/assets/image/backgrounds/tree.svg" alt="" />
    </div>
    <LottieAnimation class="ml-[99px]" />
  </div>
</template>

<script>
import LottieAnimation from "@/components/partials/LottieAnimation.vue";

export default {
  components: {
    LottieAnimation,
  },
  data() {
    return {
      texts1: ["디자인", "HTML", "드로잉"],
      texts2: ["설계", "대화", "아트"],
      currentIndex1: 0,
      currentIndex2: 0,
      showText1: true,
      showText2: true,
      showmiddleText1: false,
      showmiddleText2: false,
      currentText1: "디자인",
      currentText2: "설계",
      middleText1: "디자인",
      middleText2: "설계",
      isFirstLoad: true,
      highlightClasses: [true, false, false], // 첫 번째 요소를 true로 설정
    };
  },
  watch: {
    currentText1(newVal, oldVal) {
      const oldIndex = this.texts1.indexOf(oldVal);
      const newIndex = this.texts1.indexOf(newVal);
      if (oldIndex !== -1) this.highlightClasses.splice(oldIndex, 1, false);
      if (newIndex !== -1) this.highlightClasses.splice(newIndex, 1, true);
      setTimeout(() => {
        if (newIndex !== -1) this.highlightClasses.splice(newIndex, 1, false);
      }, 3000); // 클래스가 유지되는 시간
    },
  },
  methods: {
    rotateText1() {
      const nextIndex1 = (this.currentIndex1 + 1) % this.texts1.length;

      this.middleText1 = this.texts1[nextIndex1];
      this.showText1 = false;

      setTimeout(() => {
        this.showmiddleText1 = true;
      }, 250); // middleText1 페이드 인 시간

      setTimeout(() => {
        this.currentIndex1 = nextIndex1;
        this.currentText1 = this.texts1[nextIndex1];
        this.middleText1 = this.texts1[(nextIndex1 + 1) % this.texts1.length];
        this.showText1 = true;
        this.showmiddleText1 = false;
      }, 1000); // 페이드 아웃 시간
    },
    rotateText2() {
      const nextIndex2 = (this.currentIndex2 + 1) % this.texts2.length;

      this.middleText2 = this.texts2[nextIndex2];
      this.showText2 = false;

      setTimeout(() => {
        this.showmiddleText2 = true;
      }, 250); // middleText2 페이드 인 시간

      setTimeout(() => {
        this.currentIndex2 = nextIndex2;
        this.currentText2 = this.texts2[nextIndex2];
        this.middleText2 = this.texts2[(nextIndex2 + 1) % this.texts2.length];
        this.showText2 = true;
        this.showmiddleText2 = false;
      }, 1000); // 페이드 아웃 시간
    },
  },
  mounted() {
    setTimeout(() => {
      this.rotateText1();
      setInterval(this.rotateText1, 3000); // 이후 3초마다 텍스트 변경
    }, 1000); // 첫 로드 시 1초 후에 텍스트 변경

    setTimeout(() => {
      this.rotateText2();
      setInterval(this.rotateText2, 3000); // 이후 3초마다 텍스트 변경
    }, 1500); // 첫 로드 시 1.5초 후에 텍스트 변경
  },
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

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 3s;
  -moz-animation-duration: 3s;
  animation-duration: 3s;
}
</style>
