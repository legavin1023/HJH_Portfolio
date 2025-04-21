<template>
  <button
    :disabled="!liveUrl"
    class="flex justify-between pl-[26px] pr-[16px] w-[200px] h-[46px] rounded-full text-[16px] text-center leading-[46px] transition-colors duration-300 ease-in-out"
    :class="[
      !liveUrl
        ? 'bg-black-b40 text-black-b80 cursor-not-allowed'
        : 'bg-black-b700 text-black-b00 hover:bg-black-b600',
    ]"
    @click="handleClick"
  >
    <slot></slot>
    <img
      :src="!liveUrl ? arrowOutwardNo : arrowForwardLine"
      alt="Arrow"
      class="inline w-[22px] ml-[11px]"
    />
  </button>
</template>

<script>
import arrowForwardLine from "@/assets/image/icons/arrow_forward_line.svg";
import arrowOutwardNo from "@/assets/image/icons/arrow_forward_gray_line.svg";

export default {
  props: {
    liveUrl: {
      type: String,
      default: null, // 기본값은 null
    },
  },
  methods: {
    handleClick() {
      if (this.liveUrl) {
        window.open(this.liveUrl, "_blank"); // liveUrl이 있을 경우 새 창에서 열기
      }
    },
  },
  data() {
    return {
      arrowForwardLine,
      arrowOutwardNo,
    };
  },
};
</script>

<style scoped></style>
