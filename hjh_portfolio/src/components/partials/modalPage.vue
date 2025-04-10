<template>
  <div
    v-if="isVisible"
    class="fixed top-0 inset-0 bg-black-b900 bg-opacity-50 z-50 flex justify-center items-center"
  >
    <button
      @click="closeModal"
      class="z-50 fixed top-[42px] right-[42px] text-gray-500 hover:text-black"
    >
      <img
        src="@/assets/image/icons/close.svg"
        alt="Close"
        class="w-[72px] h-[72px]"
      />
    </button>
    <div class="relative overflow-y-scroll w-full h-full">
      <div
        class="absolute top-[42px] bg-black-b900 w-[1400px] mx-auto h-auto rounded-t-[10px]"
        style="left: 50%; transform: translateX(-50%)"
      >
        <div class="sticky">
          <div
            class="w-full top-0 z-10 bg-black-b00 rounded-t-[10px]"
            style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)"
          >
            <div class="flex items-center pl-[44px] pt-[38px] pb-[20px]">
              <img
                :src="content.companyLogo"
                alt="Company Logo"
                class="w-[60px] h-[60px] rounded-full bg-black-b50"
              />
              <div class="ml-[22px]">
                <p class="text-[26px] font-700">{{ content.name }}</p>
                <p class="text-[16px]">{{ content.description }}</p>
              </div>
            </div>
          </div>

          <div
            class="w-full h-[86px] flex items-center justify-between pl-[50px] pr-[43px] bg-green-p25 border-t-black-b50 border-t-[1px]"
          >
            <div class="flex items-center">
              <p>
                <EmphasisSpan class="mr-[0px]">작업기간</EmphasisSpan>
                <span class="ml-[10px] mr-[36px] text-[14px]">{{
                  content.date
                }}</span>
              </p>
              <p>
                <EmphasisSpan>기여도</EmphasisSpan>
                <span class="ml-[10px] mr-[36px] text-[14px]">
                  {{ content.contribution }}</span
                >
              </p>
              <p>
                <EmphasisSpan> 플랫폼</EmphasisSpan>
                <span class="ml-[10px] mr-[36px] text-[14px]">
                  {{ (content.platform || []).join(", ") }}</span
                >
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
            class="bg-black-b00 max-w-none h-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmphasisSpan from "@/components/partials/EmphasisSpan.vue";
import PortfolioButton from "@/components/partials/PortfolioButton.vue";

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
  methods: {
    closeModal() {
      this.$emit("close");
    },
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
