<template>
  <div class="absolute bottom-[40px] flex justify-center items-center flex-col">
    <div
      class="pulse-bg absolute top-[-8px] w-[47px] h-[47px] tablet:w-[73px] tablet:h-[73px] rounded-[23px] bg-green-p200 largeDesktop:bg-violet-300 opacity-30"
    ></div>
    <img
      src="@/assets/image/icons/scroll.svg"
      alt="스크롤"
      class="mb-[15px] relative z-10 w-[30px] tablet:w-[55px]"
    />
    <p class="squiggly font-800 text-[22px] text-black-b90 relative z-10">
      스크롤을 내려주세요!
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.pulse-bg {
  transform: translate(-50%, -50%);
  animation: pulse 2s infinite;
}
</style>
