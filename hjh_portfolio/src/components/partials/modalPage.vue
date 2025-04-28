<template>
  <div
    v-if="isVisible"
    class="fixed top-0 inset-0 bg-black-b900 bg-opacity-50 z-50 flex justify-center items-center"
    @click="closeModal"
  >
    <div
      class="z-50 fixed top-[0px] inset-0 h-[52px] w-full border-b-black-b50 desktop:border-none bg-black-b35 desktop:top-[42px] desktop:right-[42px] desktop:h-[72px] desktop:rounded-[10px] desktop:overflow-hidden desktop:border-b-[1px] desktop:bg-b desktop:bg-opacity-0 desktop:bg-none desktop:border-black-b50"
    >
      <button
        @click="closeModal"
        class="fixed top-[15px] right-[24px] desktop:top-[42px] desktop:right-[42px] text-gray-500 hover:text-black"
      >
        <img
          :src="closeIcon"
          alt="Close"
          class="w-[24px] desktop:w-[72px] desktop:h-[72px]"
        />
      </button>
    </div>
    <div class="relative overflow-y-scroll w-full h-full">
      <div
        class="absolute top-[52px] desktop:top-[42px] bg-black-b900 w-full desktop:w-[1400px] mx-auto h-auto desktop:rounded-t-[10px]"
        style="left: 50%; transform: translateX(-50%)"
      >
        <div
          class="w-full top-0 z-10 bg-black-b00 rounded-t-none desktop:rounded-t-[10px]"
          style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)"
        ></div>
        <div class="sticky top-0 z-10">
          <div
            class="bg-black-b00 flex items-center pl-[20px] pt-[15px] pb-[10px] tablet:pl-[30px] tablet:pt-[20px] tablet:pb-[15px] desktop:pl-[44px] desktop:pt-[30px] desktop:pb-[20px]"
          >
            <img
              :src="content.companyLogo"
              alt="Company Logo"
              class="w-[40px] h-[40px] desktop:w-[60px] desktop:h-[60px] tablet:w-[50px] tablet:h-[50px] rounded-full bg-black-b50"
            />
            <div class="ml-[10px] tablet:ml-[15px] desktop:ml-[22px]">
              <p
                class="text-[18px] tablet:text-[22px] desktop:text-[26px] font-700"
              >
                {{ content.name }}
              </p>
              <p class="text-[14px] tablet:text-[15px] desktop:text-[16px]">
                {{ content.description }}
              </p>
            </div>
          </div>
          <div
            class="w-full h-auto tablet:h-[70px] flex flex-col tablet:flex-row items-center justify-between tablet:pl-[30px] tablet:pr-[30px] bg-green-p25 border-t-black-b50 border-t-[1px]"
          >
            <div
              class="flex flex-col py-[24px] tablet:p-0 tablet:flex-row flex-wrap justify-start tablet:items-center items-start"
            >
              <p class="mb-[10px] tablet:mb-0 desktop:p-[0px]">
                <EmphasisSpan>작업기간</EmphasisSpan>
                <span class="ml-[10px] mr-[36px] text-[14px]">
                  {{ content.date }}
                </span>
              </p>
              <p class="mb-[10px] tablet:mb-0 desktop:mb-[0px]">
                <EmphasisSpan>기여도</EmphasisSpan>
                <span class="ml-[10px] mr-[36px] text-[14px]">
                  {{ content.contribution }}
                </span>
              </p>
              <p>
                <EmphasisSpan>플랫폼</EmphasisSpan>
                <span class="ml-[10px] tablet:mb-0 mr-[36px] text-[14px]">
                  {{ (content.platform || []).join(", ") }}
                </span>
              </p>
            </div>
            <div
              class="flex justify-center border-[1px] desktop:border-none w-full tablet:w-auto bg-black-b00 desktop:bg-none tablet:bg-opacity-0 py-[24px]"
            >
              <!-- PortfolioButton 사용 -->
              <PortfolioButton :liveUrl="content.liveUrl">
                실서비스 페이지
              </PortfolioButton>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center">
          <img
            v-if="content.modalImage"
            :src="content.modalImage"
            alt="Modal Image"
            class="bg-black-b00 max-w-none h-auto w-[90%]"
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
      // 너비가 1280 이하일 때 close_line.svg, 그 외에는 close.svg
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
<style scoped></style>
