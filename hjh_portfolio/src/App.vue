<template>
  <div id="app">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none">
      <defs>
        <filter id="squiggly-0">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="0"
          />
          <feDisplacementMap
            id="displacement"
            in="SourceGraphic"
            in2="noise"
            scale="6"
          />
        </filter>
        <filter id="squiggly-1">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="1"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>

        <filter id="squiggly-2">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="2"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>

        <filter id="squiggly-3">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="3"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>

        <filter id="squiggly-4">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="4"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
      </defs>
    </svg>
    <LoadingScreen v-if="isLoading" :progress="progress" />
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import LoadingScreen from "@/views/LodingScreen.vue";

export default {
  name: "App",
  components: {
    LoadingScreen,
  },
  data() {
    return {
      isLoading: true, // 로딩 상태
      progress: 0, // 진행 바 상태 (0~100)
    };
  },
  mounted() {
    const minimumLoadingTime = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    ); // 최소 1초 로딩
    const progressInterval = new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 10; // 진행 바를 10%씩 증가
        } else {
          clearInterval(interval); // 진행 완료 시 인터벌 정지
          resolve();
        }
      }, 200); // 300ms마다 진행 바 증가
    });

    // 최소 로딩 시간과 진행 바 완료를 병렬로 처리
    Promise.all([minimumLoadingTime, progressInterval]).then(() => {
      this.isLoading = false; // 로딩 완료
    });
  },
};
</script>
