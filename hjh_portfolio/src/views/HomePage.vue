<template>
  <div
    ref="scrollContainer"
    class="relative bottom-0 snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden"
  >
    <NavBar />
    <div
      class="relative bottom-0 snap-start h-full flex flex-col items-center justify-center"
    >
      <HeroSection id="hero" />
      <PageScroll />
    </div>
    <div
      class="relative bottom-0 snap-start h-full flex flex-col items-center justify-center"
    >
      <ToolSection id="tools" />
      <MeSection />
    </div>
    <div
      class="relative bottom-0 snap-start h-full flex flex-col items-center justify-center"
    >
      <PortfolioSection id="portfolio" />
      <SiteFooter />
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
  mounted() {
    this.enableSmoothScroll();
  },
  methods: {
    enableSmoothScroll() {
      const container = this.$refs.scrollContainer;

      let isScrolling;
      container.addEventListener("wheel", (event) => {
        // 모달이 열려 있으면 스크롤 동작을 막지 않음
        const isModalOpen = document.body.classList.contains("no-scroll");
        if (isModalOpen) return;

        event.preventDefault();

        clearTimeout(isScrolling);

        const delta = event.deltaY > 0 ? 1 : -1;
        const scrollAmount = container.scrollTop + delta * window.innerHeight;

        container.scrollTo({
          top: scrollAmount,
          behavior: "smooth",
        });

        // Prevent rapid scrolling
        isScrolling = setTimeout(() => {
          isScrolling = null;
        }, 500);
      });
    },
  },
};
</script>

<style scoped>
/* 홈 페이지 스타일을 여기에 추가할 수 있습니다. */
</style>
