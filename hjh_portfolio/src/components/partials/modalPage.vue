<template>
  <div
    v-if="isVisible"
    class="fixed top-0 inset-0 bg-black-b900 bg-opacity-50 z-50 flex justify-center items-center"
  >
    <div
      class="z-50 fixed top-0 inset-0 h-[52px] w-full bg-[#eaeaea] border-b-black-b50 flex justify-center items-center tablet:h-[60px] desktop:h-auto desktop:bg-none desktop:bg-opacity-50"
    >
      <button @click="closeModal" class="text-gray-500 hover:text-black">
        <img
          :src="closeIcon"
          alt="Close"
          class="w-[24px] desktop:w-[72px] tablet:h-[72px]"
        />
      </button>
    </div>
    <div class="relative overflow-y-scroll w-full h-full">
      <div
        class="absolute top-[42px] bg-black-b900 w-full w-[100%] tablet:w-[1024px] lg:w-[1400px] mx-auto h-auto rounded-t-[10px]"
        style="left: 50%; transform: translateX(-50%)"
      >
        <div class="sticky">
          <div
            class="w-full top-0 z-10 bg-black-b00 rounded-t-[10px]"
            style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)"
          >
            <div
              class="flex items-center pl-[44px] pt-[30px] pb-[20px] pl-[20px] pt-[15px] pb-[10px] tablet:pl-[30px] tablet:pt-[20px] tablet:pb-[15px]"
            >
              <img
                :src="content.companyLogo"
                alt="Company Logo"
                class="w-[60px] h-[60px] w-[40px] h-[40px] tablet:w-[50px] tablet:h-[50px] rounded-full bg-black-b50"
              />
              <div class="ml-[22px] ml-[10px] tablet:ml-[15px]">
                <p class="text-[26px] text-[18px] tablet:text-[22px] font-700">
                  {{ content.name }}
                </p>
                <p class="text-[16px] text-[14px] tablet:text-[15px]">
                  {{ content.description }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="w-full h-[86px] h-auto tablet:h-[70px] flex items-center justify-between pl-[50px] pr-[43px] pl-[20px] pr-[20px] tablet:pl-[30px] tablet:pr-[30px] bg-green-p25 border-t-black-b50 border-t-[1px]"
          >
            <div
              class="flex flex-col tablet:flex-row flex-wrap justify-start tablet:items-center items-start"
            >
              <p class="mb-[10px] mb-[5px] tablet:mb-[8px]">
                <EmphasisSpan>작업기간</EmphasisSpan>
                <span
                  class="ml-[10px] mr-[36px] text-[14px] text-[12px] tablet:text-[13px]"
                >
                  {{ content.date }}
                </span>
              </p>
              <p class="mb-[10px] mb-[5px] tablet:mb-[8px]">
                <EmphasisSpan>기여도</EmphasisSpan>
                <span
                  class="ml-[10px] mr-[36px] text-[14px] text-[12px] tablet:text-[13px]"
                >
                  {{ content.contribution }}
                </span>
              </p>
              <p class="mb-[10px] mb-[5px] tablet:mb-[8px]">
                <EmphasisSpan>플랫폼</EmphasisSpan>
                <span
                  class="ml-[10px] mr-[36px] text-[14px] text-[12px] tablet:text-[13px]"
                >
                  {{ (content.platform || []).join(", ") }}
                </span>
              </p>
            </div>

            <!-- PortfolioButton 사용 -->
            <PortfolioButton :liveUrl="content.liveUrl">
              실서비스 페이지
            </PortfolioButton>
          </div>
        </div>
        <div class="w-full flex justify-center">
          <img
            v-if="content.modalImage"
            :src="content.modalImage"
            alt="Modal Image"
            class="bg-black-b00 max-w-none h-auto w-[100%] w-[90%] tablet:w-[80%]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmphasisSpan from "@/components/partials/EmphasisSpan.vue";
import PortfolioButton from "@/components/partials/PortfolioButton.vue";

// 이미지 import
import closeLineIcon from "@/assets/image/icons/close_line.svg";
import closeIcon from "@/assets/image/icons/close.svg";

export default {
  components: {
    EmphasisSpan,
    PortfolioButton,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth, // 현재 창 너비
    };
  },
  computed: {
    closeIcon() {
      // 너비가 1024px 이하일 때 close_line.svg, 그 외에는 close.svg
      return this.windowWidth <= 1280 ? closeLineIcon : closeIcon;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateWindowWidth); // 창 크기 변경 이벤트 추가
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth); // 이벤트 제거
  },
};
</script>
<style scoped>
/* 고정된 상단 콘텐츠 스타일 */
.sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
