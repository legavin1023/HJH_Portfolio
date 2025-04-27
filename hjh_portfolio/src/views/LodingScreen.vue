<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center z-50"
  >
    <!-- 로딩 텍스트 -->
    <h1 class="text-white text-2xl font-bold mb-6 animate-pulse">
      로딩 중입니다...
    </h1>

    <!-- 진행 바 -->
    <div class="w-3/4 h-2 bg-gray-700 rounded overflow-hidden mb-4">
      <div
        class="h-full bg-blue-500 rounded transition-all duration-300"
        :style="{ width: progress + '%' }"
      ></div>
    </div>

    <!-- 퍼센트 표시 -->
    <p class="text-white text-lg font-medium">{{ progress }}%</p>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
/* 배경 애니메이션 */
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient-animation 6s ease infinite;
}
</style>
