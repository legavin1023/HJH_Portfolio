<template>
  <button
    :disabled="!liveUrl"
    class="w-[186px] h-[46px] rounded-full text-[16px] text-center leading-[46px] transition-colors duration-300 ease-in-out"
    :class="[
      !liveUrl
        ? 'bg-black-b40 text-black-b80 cursor-not-allowed'
        : 'bg-black-b700 text-black-b00 hover:bg-black-b600',
    ]"
    @click="handleClick"
  >
    <slot></slot>
    <img
      src="@/assets/image/icons/arrow_forward_line.svg"
      alt="Arrow"
      class="inline w-[22px] ml-[11px]"
    />
  </button>
</template>

<script>
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
};
</script>

<style scoped></style>
