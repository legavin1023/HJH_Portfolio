<template>
  <div
    ref="scrollContainer"
    class="relative bottom-0 snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden"
  >
    <!-- bg-red-100 tablet:bg-blue-100 desktop:bg-green-100 largeDesktop:bg-yellow-100 -->
    <NavBar />
    <div
      class="relative bottom-0 snap-start h-full flex flex-col items-center justify-center"
    >
      <HeroSection id="hero" />
      <PageScroll />
    </div>
    <div
      class="hidden relative bottom-0 snap-start h-full tablet:flex flex-col items-center justify-center"
    >
      <ToolSection id="toolsMe" />
      <MeSection />
    </div>
    <div
      class="flex relative bottom-0 snap-start h-full tablet:hidden flex-col items-center justify-center"
    >
      <ToolSection id="tools" />
    </div>
    <div
      class="flex relative bottom-0 snap-start h-full tablet:hidden flex-col items-center justify-center"
    >
      <MeSection id="me" />
    </div>
    <div
      class="relative bottom-0 snap-start h-full flex flex-col items-center justify-center"
    >
      <PortfolioSection id="portfolio" />
    </div>
    <div
      class="relative bottom-0 snap-start h-[194px] flex flex-col items-center justify-center"
    >
      <SiteFooter id="SiteFooter" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/sections/NavBar.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import PageScroll from "@/components/partials/PageScroll.vue";
import ToolSection from "@/components/sections/ToolSection.vue";
import MeSection from "@/components/sections/MeSection.vue";
import PortfolioSection from "@/components/sections/PortfolioSection.vue";
import SiteFooter from "@/components/sections/SiteFooter.vue";

export default {
  name: "HomePage",
  components: {
    NavBar,
    HeroSection,
    PageScroll,
    ToolSection,
    MeSection,
    PortfolioSection,
    SiteFooter,
  },

  data() {
    return {
      isScrolling: false, // 스크롤 중인지 여부
    };
  },

  methods: {
    enableSmoothScroll() {
      const container = this.$refs.scrollContainer;

      container.addEventListener("wheel", (event) => {
        const isModalOpen = document.body.classList.contains("no-scroll");
        if (isModalOpen || this.isScrolling) return;

        event.preventDefault();

        const delta = event.deltaY > 0 ? 1 : -1; // 스크롤 방향
        const sectionHeight = window.innerHeight; // 한 섹션의 높이
        const scrollAmount = container.scrollTop + delta * sectionHeight; // 이동 거리 계산

        this.isScrolling = true;

        container.scrollTo({
          top: scrollAmount,
          behavior: "smooth", // 부드러운 스크롤
        });

        setTimeout(() => {
          this.isScrolling = false;
        }, 1500); // 1.5초 딜레이
      });
    },

    adjustForNavBar() {
      const isSafeAreaSupported =
        window.CSS &&
        CSS.supports("padding-bottom: env(safe-area-inset-bottom)");
      if (!isSafeAreaSupported) {
        const navBar = document.querySelector("nav");
        if (navBar) {
          const navBarHeight = navBar.offsetHeight;
          const targetElement = this.$refs.scrollContainer; // 조정할 요소
          if (targetElement) {
            targetElement.style.paddingBottom = `${navBarHeight}px`;
          }
        }
      }
    },
  },

  mounted() {
    this.enableSmoothScroll();
    this.adjustForNavBar(); // 네비게이션 바 높이 조정
    window.addEventListener("resize", this.adjustForNavBar); // 창 크기 변경 시 다시 계산
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.adjustForNavBar); // 이벤트 리스너 제거
  },
};
</script>

<style scoped>
/* 네비게이션 바 높이를 고려한 패딩 추가 */
.target-element {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
