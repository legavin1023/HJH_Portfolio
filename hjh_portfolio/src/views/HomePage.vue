<template>
  <div
    ref="scrollContainer"
    class="relative bottom-0 snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden"
  >
    <!-- bg-red-100 tablet:bg-blue-100 desktop:bg-green-100 largeDesktop:bg-yellow-100 -->
    <NavBar @openContactModal="openContactModal" />
    <div
      class="relative bottom-0 snap-start h-full flex flex-col items-center justify-center"
    >
      <HeroSection id="hero" />
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
      <SiteFooter id="SiteFooter" @openContactModal="openContactModal" />
    </div>
    <ContactModal
      :isContactModalOpen="isContactModalOpen"
      @close="closeContactModal"
    />
  </div>
</template>

<script>
import NavBar from "@/components/sections/NavBar.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import ToolSection from "@/components/sections/ToolSection.vue";
import MeSection from "@/components/sections/MeSection.vue";
import PortfolioSection from "@/components/sections/PortfolioSection.vue";
import SiteFooter from "@/components/sections/SiteFooter.vue";
import ContactModal from "@/components/partials/ContactModal.vue";

export default {
  name: "HomePage",
  components: {
    NavBar,
    HeroSection,

    ToolSection,
    MeSection,
    PortfolioSection,
    SiteFooter,
    ContactModal,
  },
  data() {
    return {
      isContactModalOpen: false,
    };
  },

  methods: {
    openContactModal() {
      this.isContactModalOpen = true;
    },
    closeContactModal() {
      this.isContactModalOpen = false;
    },
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
  mounted() {
    this.enableSmoothScroll();
  },
};
</script>

<style scoped></style>
