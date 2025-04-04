<template>
  <div
    class="absolute bottom-0 w-full h-[388px] bg-background-green mt-[60px] flex justify-center items-center"
  >
    <div class="flex items-end">
      <div
        class="flex flex-col items-center w-[175px] h-[225px] rounded-[50px] rounded-br-none bg-black-b00"
      >
        <img
          class="w-[129px] h-[129px] mt-[23px] mb-[16px]"
          src="@/assets/image/backgrounds/hong.png"
          alt=""
        />
        <p class="text-[26px] font-semibold">
          <span class="text-black-b80">@ </span>홍지혜
        </p>
      </div>
      <div
        class="flex items-center jc w-[1018px] h-[162px] rounded-[50px] rounded-tl-none rounded-bl-none bg-black-b00"
      >
        <div class="flex items-center flex-wrap w-[93%] ml-[21px]">
          <div
            v-for="(item, index) in items"
            :key="index"
            :class="[
              'relative inline-block items-center space-x-2 mx-[6px] my-[7px] px-[20px] py-[9px] rounded-full overflow-hidden bg-black-b20',
              {
                'active-div': activeIndex === index,
              },
            ]"
          >
            <!-- 텍스트 -->
            <img :src="item.imgSrc" alt="" class="inline relative z-10" />
            <span
              class="text-[18px] p relative z-10 text-black-b600"
              :class="{ 'active-slide-text': activeIndex === index }"
              >{{ item.text }}</span
            >
            <!-- 애니메이션 배경 -->
            <!-- <div
              class="absolute top-0 left-0 w-full h-full bg-background-blue rounded-full opacity-0"
              :class="{ 'active-slide': activeIndex === index }"
            ></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon1 from "@/assets/image/icons/me/deployed_code_account.png";
import icon2 from "@/assets/image/icons/me/experiment.png";
import icon3 from "@/assets/image/icons/me/new_releases.png";
import icon4 from "@/assets/image/icons/me/sms.png";
import icon5 from "@/assets/image/icons/me/trophy.png";
import icon6 from "@/assets/image/icons/me/workspace_premium.png";

export default {
  data() {
    return {
      items: [
        { imgSrc: icon6, text: "5년차 대리급" },
        { imgSrc: icon2, text: "웹/앱 UIUX 개발 경험 다수" },
        { imgSrc: icon6, text: "에이전시 근무 경력" },
        { imgSrc: icon3, text: "자사 브랜드 런칭 경험" },
        { imgSrc: icon4, text: "소통능력 탑재" },
        { imgSrc: icon1, text: "다수의 실서비스" },
        { imgSrc: icon6, text: "인하우스 근무 경력" },
        { imgSrc: icon5, text: "지디웹 수상 5회" },
      ],
      activeIndex: 0, // 현재 활성화된 div의 인덱스
    };
  },
  mounted() {
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.items.length; // 다음 div로 이동
      }, 2500); // 2초 동안 보이고 0.5초 대기 (총 3초)
    },
  },
};
</script>

<style scoped>
/* 기본 상태 */

/* 슬라이드 애니메이션 */
@keyframes slideInOut {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* 활성화된 슬라이드 */
.active-slide {
  animation: slideInOut 2s;
}
</style>
