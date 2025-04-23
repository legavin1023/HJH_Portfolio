<template>
  <div
    class="flex justify-center items-center tablet:items-center flex-col relative w-full h-full tablet:h-[70%] desktop:h-[36%] largeDesktop:h-[60%] desktop:min-h-[278px] tablet:min-h-[388px] tablet:max-h-[447px] desktop:max-h-[500px] largeDesktop:max-h-[600px] box-border bg-background-green tablet:pt-[86px] tablet:pb-[30px] largeDesktop:pt-[69px] largeDesktop:pb-[91px]"
  >
    <div
      class="relative w-full h-full flex justify-center items-center min-h-[278px] tablet:min-h-[388px] desktop:min-h-[447px]"
    >
      <div
        class="relative flex items-end h-full mt-[70px] tablet:mt-[0px] tablet:h-auto tablet:bottom-[34px] w-[322px] tablet:w-[864px] desktop:w-[1193px]"
      >
        <div
          class="relative bottom-[80px] tablet:bottom-[0px] flex flex-col items-center w-[175px] h-[78%] min-h-[225px] max-h-[640px] tablet:h-[340px] tablet:min-h-[340px] desktop:h-[225px] desktop:min-h-[225px] rounded-[50px] rounded-br-none bg-black-b00"
        >
          <img
            class="z-20 w-[129px] h-[129px] mt-[23px] mb-[16px]"
            src="@/assets/image/backgrounds/hong.png"
            alt=""
          />
          <p
            class="z-20 hidden tablet:block absolute left-[182px] tablet:relative tablet:top-[0px] tablet:left-[0px] text-[22px] tablet:text-[26px] font-800 text-black-b800 text-nowrap"
          >
            <span class="text-black-b80">@ </span>홍지혜
          </p>
        </div>
      </div>

      <div
        class="flex justify-end items-end h-full mt-[50px] tablet:h-auto absolute w-[322px] tablet:w-[864px] desktop:w-[1193px]"
      >
        <div
          class="relative flex items-center bottom-[27px] min-w-[322px] tablet:w-[864px] desktop:w-[1193px] h-[78%] min-h-[495px] max-h-[640px] tablet:h-[274px] tablet:min-h-[274px] desktop:h-[162px] desktop:min-h-[162px] tablet:rounded-[50px] rounded-tr-[50px] bg-black-b00"
        >
          <div
            class="flex relative items-start tablet:items-center flex-wrap flex-col tablet:flex-row pt-[100px] tablet:pt-0 pl-[26px] tablet:pl-[196px] desktop:pl-[200px] tablet:pr-[49px]"
          >
            <p
              class="block tablet:hidden absolute top-[29px] right-[14%] text-[22px] tablet:text-[26px] font-800 text-black-b800 text-nowrap"
            >
              <span class="text-black-b80">@ </span>홍지혜
            </p>
            <div
              v-for="(item, index) in items"
              :key="index"
              :class="[
                'relative inline-block items-center space-x-2 mx-[4px] my-[3px] tablet:my-[7px] px-[20px] py-[9px] font-700  rounded-full overflow-hidden bg-black-b30',
                {
                  'active-div': activeIndex === index,
                },
              ]"
            >
              <!-- 텍스트 -->
              <img :src="item.imgSrc" alt="" class="inline relative" />
              <span
                class="text-[14px] tablet:text-[18px] p relative text-black-b800"
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
