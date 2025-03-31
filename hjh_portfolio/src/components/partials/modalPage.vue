<template>
  <div
    v-if="isVisible"
    class="fixed top-0 inset-0 bg-black-b900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="fixed top-0 flex flex-col justify-center items-center bg-black-b900 rounded-lg w-[1400px] h-full overflow-y-auto"
    >
      <div class="bg-black-b00 w-full">
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <div class="flex items-center pl-[44px] mt-[31px] pb-[20px]">
          <img
            :src="content.companyLogo"
            alt="Company Logo"
            class="w-[82px] h-[82px] rounded-full bg-black-b50"
          />
          <div class="ml-[25px]">
            <p class="text-[26px] font-bold">{{ content.name }}</p>
            <p class="text-[16px]">{{ content.description }}</p>
          </div>
        </div>
      </div>
      <div
        class="w-full h-[86px] flex items-center justify-between pl-[50px] pr-[43px] bg-green-p25 border-t-black-b50 border-t-[1px]"
      >
        <div class="flex items-center">
          <p>
            <EmphasisSpan>작업기간</EmphasisSpan
            ><span class="ml-[10px] mr-[36px] text-[14px]">{{
              content.date
            }}</span>
          </p>
          <p>
            <EmphasisSpan>기여도</EmphasisSpan
            ><span class="ml-[10px] mr-[36px] text-[14px]">
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
      <img
        v-if="content.modalImage"
        :src="content.modalImage"
        alt="Modal Image"
        class="bg-black-b00 rounded-lg h-full overflow-y-auto w-[1300px]"
      />
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

<style scoped></style>
