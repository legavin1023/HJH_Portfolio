<template>
  <div class="overflow-hidden w-full pb-[60px]">
    <p
      class="squiggly w-full text-black-b600 text-[30px] text-center pt-[100px] mb-6px]"
    >
      거두절미하고,
    </p>
    <div class="text-center text-6xl mb-[62px]">
      <span class="text-green-p300 font-black">포트폴리오 </span>
      <span class="font-medium">보실까요?</span>
    </div>
    <div class="relative w-[1193px] mx-auto">
      <!-- 슬라이드 버튼 -->
      <SlideButton
        class="absolute top-[-40px] left-0 group"
        direction="prev"
        :disabled="currentIndex === 0"
        :onClick="prevSlide"
      />
      <SlideButton
        class="absolute top-[-40px] left-[59px] group"
        direction="next"
        :disabled="currentIndex >= slides.length - visibleSlides"
        :onClick="nextSlide"
      />
      <!-- 슬라이드 컨테이너 -->
      <div
        class="flex transition-transform duration-500 ease-in-out gap-[26px]"
        :style="{
          transform: `translateX(-${currentIndex * (slideWidth + gap)}px)`,
        }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="flex-shrink-0 bg-black-b35 rounded-[16px] overflow-hidden w-[320px] h-[490px]"
          :style="{ width: `${slideWidth}px` }"
        >
          <!-- "준비 중" 슬라이드 구분 -->
          <template v-if="slide.type.includes('준비 중')">
            <div
              class="w-full h-[228px] bg-black-b50 flex items-center justify-center"
            >
              <img
                :src="slide.image"
                :alt="slide.alt"
                class="w-[112px] h-[55px]"
              />
            </div>
            <div
              class="flex justify-center items-center max-w-none object-contain absolute top-[208px] ml-[278px] w-[80px] h-[80px] rounded-[50%] border-[5px] border-black-b00 bg-black-b40"
            >
              <img
                :src="slide.companyLogo"
                :alt="slide.companyLogo"
                class="w-[25.33px] h-auto"
              />
            </div>
            <div class="mt-[26px] ml-[28px] text-black-b300">
              <span
                v-for="(type, typeIndex) in slide.type"
                :key="typeIndex"
                class="px-[10px] py-[4px] rounded-full mr-[10px] bg-black-b35 border border-black-b60 text-black-b70 text-[12px] font-semibold"
              >
                {{ type }}
              </span>
              <p class="text=[22px] mt-[14px] mb-[2px] font-semibold">
                {{ slide.name }}
              </p>
              <p class="font-normal text-[14px]">{{ slide.date }}</p>
              <p
                class="bg-black-b00 border border-black-b40 max-w-[326px] py-[14px] text-[14px] mt-[43px] text-center font-semibold rounded-full"
              >
                <span class="text-black-b80">포트폴리오 보기</span>
                <img
                  class="inline ml-[10px]"
                  src="@/assets/image/icons/arrow_forward_gray.svg"
                  alt=""
                />
              </p>
            </div>
          </template>
          <template v-else>
            <!-- 일반 슬라이드 -->
            <img :src="slide.image" :alt="slide.alt" class="w-full h-[244px]" />
            <div
              class="flex justify-center items-center max-w-none absolute top-[208px] ml-[278px] w-[80px] h-[80px] rounded-[50%] border-[5px] border-black-b00 bg-black-b40 overflow-hidden"
            >
              <img
                :src="slide.companyLogo"
                :alt="slide.companyLogo"
                class="caption-top"
              />
            </div>
            <div class="mt-[26px] ml-[28px]">
              <EmphasisSpan
                v-for="(type, typeIndex) in slide.type"
                :key="typeIndex"
              >
                {{ type }}
              </EmphasisSpan>
              <p class="text=[22px] mt-[14px] mb-[2px] font-semibold">
                {{ slide.name }}
              </p>
              <p class="font-normal text-[14px]">
                {{ slide.date }}
              </p>
              <button
                click="openModal(slide)"
                class="flex justify-center cursor-pointer bg-black-b00 border border-black-b40 w-[336px] h-[50px] leading-[50px] text-[14px] mt-[43px] text-center font-semibold rounded-full"
                @click="openModal(slide)"
              >
                <span>포트폴리오 보기</span>
                <img
                  class="inline ml-[10px] w-[22px]"
                  src="@/assets/image/icons/arrow_forward_black.svg"
                  alt=""
                />
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 모달 -->
    <modalPage
      v-if="activeSlide"
      :content="activeSlide"
      :isVisible="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>
<script>
//---------------슬라이드 내용-----------------

import slide1 from "@/assets/image/portfolio/solas.png";
import companyLogo1 from "@/assets/image/logo.svg";
import modalImage1 from "@/assets/image/portfolio/solas.png";

import slide2 from "@/assets/image/portfolio/solas.png";
import companyLogo2 from "@/assets/image/logo.svg";
import modalImage2 from "@/assets/image/portfolio/solas.png";

import slide3 from "@/assets/image/portfolio/solas.png";
import companyLogo3 from "@/assets/image/logo.svg";
import modalImage3 from "@/assets/image/portfolio/solas.png";

import slide4 from "@/assets/image/portfolio/solas.png";
import companyLogo4 from "@/assets/image/logo.svg";
import modalImage4 from "@/assets/image/portfolio/solas.png";

import slide5 from "@/assets/image/portfolio/solas.png";
import companyLogo5 from "@/assets/image/logo.svg";
import modalImage5 from "@/assets/image/portfolio/solas.png";

import slide6 from "@/assets/image/portfolio/solas.png";
import companyLogo6 from "@/assets/image/logo.svg";
import modalImage6 from "@/assets/image/portfolio/solas.png";

import slide7 from "@/assets/image/portfolio/solas.png";
import companyLogo7 from "@/assets/image/logo.svg";
import modalImage7 from "@/assets/image/portfolio/solas.png";

//---------------버튼-----------------
import moreHoriz from "@/assets/image/icons/more_horiz.svg";
import teamGGZ from "@/assets/image/icons/teamGGZ.svg";
import EmphasisSpan from "@/components/partials/EmphasisSpan.vue";
import SlideButton from "@/components/partials/slideButton.vue";
import modalPage from "@/components/partials/modalPage.vue";

export default {
  components: {
    SlideButton,
    modalPage,
    EmphasisSpan,
  },
  data() {
    return {
      currentIndex: 0,
      visibleSlides: 3, // 한 번에 보이는 슬라이드 개수
      slideWidth: 380, // 각 슬라이드의 너비 (px)
      gap: 16, // 슬라이드 간의 여백 (px)
      activeSlide: null, // 활성화된 슬라이드 데이터
      isModalVisible: false, // 모달 열림/닫힘 상태
      baseSlides: [
        {
          image: slide1,
          companyLogo: companyLogo1,
          modalImage: modalImage1,
          alt: "Slide 1",
          name: "Web 포트폴리오 1",
          date: "2023.01.01~10.31",
          type: ["Web"],
          platform: ["웹"],
          contribution: "80%",
          liveUrl: null,
          description: "이 프로젝트는 웹 개발을 위한 포트폴리오입니다.",
        },
        {
          image: slide2,
          companyLogo: companyLogo2,
          modalImage: modalImage2,
          alt: "Slide 2",
          name: "Mobile 포트폴리오 2",
          date: "2023.01.01~10.31",
          type: ["Mobile", "Web"],
          platform: ["반응형 웹", "모바일"],
          contribution: "100%",
          liveUrl: "https://example.com/project2",
          description: "이 프로젝트는 모바일 개발을 위한 포트폴리오입니다.",
        },
        {
          image: slide3,
          companyLogo: companyLogo3,
          modalImage: modalImage3,
          alt: "Slide 3",
          name: "Web 포트폴리오 3",
          date: "2023.01.01~10.31",
          type: ["Web"],
          platform: ["웹"],
          contribution: "70%",
          liveUrl: "https://example.com/project3",
          description:
            "이 프로젝트는 웹 애플리케이션 개발을 위한 포트폴리오입니다.",
        },
        {
          image: slide4,
          companyLogo: companyLogo4,
          modalImage: modalImage4,
          alt: "Slide 4",
          name: "Mobile 포트폴리오 4",
          date: "2023.01.01~10.31",
          type: ["Mobile"],
          platform: ["모바일"],
          contribution: "90%",
          liveUrl: "https://example.com/project4",
          description:
            "이 프로젝트는 모바일 애플리케이션 개발을 위한 포트폴리오입니다.",
        },
        {
          image: slide5,
          companyLogo: companyLogo5,
          modalImage: modalImage5,
          alt: "Slide 5",
          name: "Web 포트폴리오 5",
          date: "2023.01.01~10.31",
          type: ["Web"],
          platform: ["웹"],
          contribution: "85%",
          liveUrl: "https://example.com/project5",
          description:
            "이 프로젝트는 프론트엔드와 백엔드 통합 작업을 포함한 포트폴리오입니다.",
        },
        {
          image: slide6,
          companyLogo: companyLogo6,
          modalImage: modalImage6,
          alt: "Slide 6",
          name: "Mobile 포트폴리오 6",
          date: "2023.01.01~10.31",
          type: ["Mobile"],
          platform: ["모바일"],
          contribution: "95%",
          liveUrl: "https://example.com/project6",
          description:
            "이 프로젝트는 모바일 UX/UI 디자인과 개발을 포함한 포트폴리오입니다.",
        },
        {
          image: slide7,
          companyLogo: companyLogo7,
          modalImage: modalImage7,
          alt: "Slide 7",
          name: "Web 포트폴리오 7",
          date: "2023.01.01~10.31",
          type: ["Web"],
          platform: ["웹"],
          contribution: "75%",
          liveUrl: "https://example.com/project7",
          description: "이 프로젝트는 최신 웹 기술을 활용한 포트폴리오입니다.",
        },
      ],
    };
  },
  computed: {
    slides() {
      const requiredSlides = 10; // 최소 슬라이드 개수
      const currentSlides = this.baseSlides.length;
      const missingSlides = requiredSlides - currentSlides;

      // "준비 중" 슬라이드 추가
      const placeholderSlides = Array.from({ length: missingSlides }, () => ({
        image: teamGGZ, // 임시 이미지
        alt: "준비 중",
        name: "준비중입니다.",
        date: "0000.00.00 ~ 00.00",
        companyLogo: moreHoriz, // 임시 서브 이미지
        type: ["준비 중"],
      }));

      return [...this.baseSlides, ...placeholderSlides];
    },
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.slides.length - this.visibleSlides) {
        this.currentIndex++;
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    openModal(slide) {
      this.activeSlide = slide;
      this.isModalVisible = true;
      document.body.classList.add("no-scroll"); // 스크롤 비활성화
    },
    closeModal() {
      this.activeSlide = null;
      this.isModalVisible = false;
      document.body.classList.remove("no-scroll"); // 스크롤 활성화
    },
  },
};
</script>
<style scoped></style>
