<template>
  <div
    class="relative overflow-hidden h-full flex flex-col items-center justify-center w-full pb-[51px] xhd_uhd:pb-[194px]"
  >
    <p
      class="squiggly w-full text-black-b600 text-[30px] text-center pt-[70px] mb-[16px]"
    >
      거두절미하고,
    </p>
    <div class="text-center text-6xl mb-[62px]">
      <span class="text-green-p300 font-900">포트폴리오 </span>
      <span class="font-700 text-black-b750">보실까요?</span>
    </div>

    <div class="relative w-[1193px] mx-auto">
      <div class="flex justify-between items-center">
        <div>
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
            :disabled="currentIndex >= filteredSlides.length - visibleSlides"
            :onClick="nextSlide"
          />
        </div>
        <div class="absolute top-[-60px] right-0 group font-800">
          <!-- 드롭다운 버튼 -->
          <button
            @click="toggleDropdown"
            class="inline-flex justify-between items-center w-[88px] h-[40px] pl-[18px] pr-[8px] py-[12px] bg-white text-[14px] font-800 text-black-400 border border-black-b50 rounded-[21px] focus:outline-none"
          >
            <span>{{ selectedOption }}</span>
            <img
              src="@/assets/image/icons/keyboard_arrow_down.svg"
              alt="Dropdown Icon"
              class="w-[24px] transition-transform duration-300 z-50"
              :class="{ 'rotate-180': isDropdownOpen }"
            />
          </button>

          <!-- 드롭다운 메뉴 -->
          <div
            v-if="isDropdownOpen"
            class="absolute left-0 mt-[-40px] text-[14px] w-full border py-[6px] rounded-[21px] bg-white border-black-b50 z-10"
          >
            <ul class="">
              <li
                v-for="option in options"
                :key="option"
                @click="selectOption(option)"
                class="block text-black-b400 pl-[18px] py-[3px] hover:text-black-b700 hover:font-800 cursor-pointer"
              >
                {{ option }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 슬라이드 컨테이너 -->
      <div
        class="flex transition-transform duration-500 ease-in-out gap-[26px]"
        :style="{
          transform: `translateX(-${currentIndex * (slideWidth + gap)}px)`,
        }"
      >
        <div
          v-for="(slide, index) in filteredSlides"
          :key="index"
          class="flex-shrink-0 bg-black-b35 rounded-[16px] overflow-hidden w-[320px] h-[490px] text-black-b800 font-800 relative group"
          :class="{
            'cursor-pointer': !slide.type.includes('준비 중'), // 준비 중이 아닌 경우에만 커서 포인터
          }"
          :style="{ width: `${slideWidth}px` }"
          @click="!slide.type.includes('준비 중') && openModal(slide)"
        >
          <!-- "준비 중" 슬라이드 구분 -->
          <template v-if="slide.type.includes('준비 중')">
            <div
              class="w-full h-[244px] bg-black-b50 flex items-center justify-center"
            >
              <img
                :src="slide.image"
                :alt="slide.alt"
                class="w-[112px] h-[55px]"
              />
            </div>
            <div
              class="flex justify-center items-center max-w-none absolute top-[208px] ml-[278px] w-[80px] h-[80px] rounded-[50%] border-[5px] border-black-b00 bg-black-b40 overflow-hidden"
            >
              <img
                :src="slide.companyLogo"
                :alt="slide.companyLogo"
                class="w-[25.33px] h-auto"
              />
            </div>
            <div
              class="flex flex-col h-[244px] justify-between p-[28px] text-black-b300"
            >
              <div>
                <span
                  v-for="(type, typeIndex) in slide.type"
                  :key="typeIndex"
                  class="px-[10px] py-[4px] rounded-full mr-[10px] bg-black-b35 border border-black-b60 text-black-b70 text-[12px] font-800"
                >
                  {{ type }}
                </span>
                <p class="text-[22px] mt-[14px] mb-[2px] font-800">
                  {{ slide.name }}
                </p>
                <p class="text-[14px] font-700">
                  {{ slide.date }}
                </p>
              </div>
              <button
                click="openModal(slide)"
                class="flex justify-center bg-black-b00 border border-black-b40 w-[336px] h-[50px] leading-[50px] text-[14px] text-center font-800 rounded-full"
                @click="openModal(slide)"
              >
                <span class="font-800 text-black-b80">포트폴리오 보기</span>
                <img
                  class="inline ml-[10px] w-[22px] opacity-60"
                  src="@/assets/image/icons/arrow_forward_black.svg"
                  alt=""
                />
              </button>
            </div>
          </template>

          <template v-else>
            <!-- 일반 슬라이드 -->
            <div class="w-full h-[244px] overflow-hidden">
              <img
                :src="slide.image"
                :alt="slide.alt"
                class="w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div
              class="flex justify-center items-center max-w-none absolute top-[208px] ml-[278px] w-[80px] h-[80px] rounded-[50%] border-[5px] border-black-b00 bg-black-b40 overflow-hidden"
            >
              <img
                :src="slide.companyLogo"
                :alt="slide.companyLogo"
                class="w-[25.33px] h-auto"
              />
            </div>
            <div class="flex flex-col h-[244px] justify-between p-[28px]">
              <div>
                <EmphasisSpan
                  v-for="(type, typeIndex) in slide.type"
                  :key="typeIndex"
                >
                  {{ type }}
                </EmphasisSpan>
                <p
                  class="text-[22px] mt-[14px] mb-[2px] font-800 text-black-b800"
                >
                  {{ slide.name }}
                </p>
                <p class="text-[14px] font-700 text-black-b700">
                  {{ slide.date }}
                </p>
              </div>
              <button
                click="openModal(slide)"
                class="flex justify-center bg-black-b00 border border-black-b40 w-[336px] h-[50px] leading-[50px] text-[14px] text-center font-800 rounded-full"
                @click="openModal(slide)"
              >
                <span class="font-800 text-black-b750">포트폴리오 보기</span>
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
import modalImage1 from "@/assets/image/portfolio/예시.jpg";

import slide2 from "@/assets/image/portfolio/solas.png";
import companyLogo2 from "@/assets/image/logo.svg";
import modalImage2 from "@/assets/image/portfolio/예시.jpg";

import slide3 from "@/assets/image/portfolio/solas.png";
import companyLogo3 from "@/assets/image/logo.svg";
import modalImage3 from "@/assets/image/portfolio/예시.jpg";

import slide4 from "@/assets/image/portfolio/solas.png";
import companyLogo4 from "@/assets/image/logo.svg";
import modalImage4 from "@/assets/image/portfolio/예시.jpg";

import slide5 from "@/assets/image/portfolio/solas.png";
import companyLogo5 from "@/assets/image/logo.svg";
import modalImage5 from "@/assets/image/portfolio/예시.jpg";

import slide6 from "@/assets/image/portfolio/solas.png";
import companyLogo6 from "@/assets/image/logo.svg";
import modalImage6 from "@/assets/image/portfolio/예시.jpg";

import slide7 from "@/assets/image/portfolio/solas.png";
import companyLogo7 from "@/assets/image/logo.svg";
import modalImage7 from "@/assets/image/portfolio/예시.jpg";

//---------------버튼-----------------
import moreHoriz from "@/assets/image/icons/more_horiz.svg";
import teamGGZ from "@/assets/image/icons/teamGGZ.svg";
//---------------슬라이드 내용-----------------
import EmphasisSpan from "@/components/partials/EmphasisSpan.vue";
import SlideButton from "@/components/partials/slideButton.vue";
//---------------모달달-----------------
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
      filteredSlides: [], // 필터링된 슬라이드
      isDropdownOpen: false, // 드롭다운 열림 상태
      selectedOption: "전체", // 기본값: 전체
      options: ["전체", "회사", "개인"], // 드롭다운 옵션
      baseSlides: [
        {
          image: slide1,
          companyLogo: companyLogo1,
          modalImage: modalImage1,
          alt: "Slide 1",
          name: "Web 포트폴리오 1",
          date: "2023.01.01~10.31",
          type: ["WEB"],
          platform: ["웹"],
          contribution: "80%",
          liveUrl: null,
          description: "이 프로젝트는 웹 개발을 위한 포트폴리오입니다.",
          companyType: "회사",
        },
        {
          image: slide2,
          companyLogo: companyLogo2,
          modalImage: modalImage2,
          alt: "Slide 2",
          name: "App 포트폴리오 2",
          date: "2023.01.01~10.31",
          type: ["APP", "WEB"],
          platform: ["반응형 웹", "모바일"],
          contribution: "100%",
          liveUrl: "https://example.com/project2",
          description: "이 프로젝트는 모바일 개발을 위한 포트폴리오입니다.",
          companyType: "개인",
        },
        {
          image: slide3,
          companyLogo: companyLogo3,
          modalImage: modalImage3,
          alt: "Slide 3",
          name: "Web 포트폴리오 3",
          date: "2023.01.01~10.31",
          type: ["WEB"],
          platform: ["웹"],
          contribution: "70%",
          liveUrl: "https://example.com/project3",
          description:
            "이 프로젝트는 웹 애플리케이션 개발을 위한 포트폴리오입니다.",
          companyType: "개인",
        },
        {
          image: slide4,
          companyLogo: companyLogo4,
          modalImage: modalImage4,
          alt: "Slide 4",
          name: "App 포트폴리오 4",
          date: "2023.01.01~10.31",
          type: ["APP"],
          platform: ["모바일"],
          contribution: "90%",
          liveUrl: "https://example.com/project4",
          description:
            "이 프로젝트는 모바일 애플리케이션 개발을 위한 포트폴리오입니다.",
          companyType: "개인",
        },
        {
          image: slide5,
          companyLogo: companyLogo5,
          modalImage: modalImage5,
          alt: "Slide 5",
          name: "Web 포트폴리오 5",
          date: "2023.01.01~10.31",
          type: ["WEB"],
          platform: ["웹"],
          contribution: "85%",
          liveUrl: "https://example.com/project5",
          description:
            "이 프로젝트는 프론트엔드와 백엔드 통합 작업을 포함한 포트폴리오입니다.",
          companyType: "회사",
        },
        {
          image: slide6,
          companyLogo: companyLogo6,
          modalImage: modalImage6,
          alt: "Slide 6",
          name: "App 포트폴리오 6",
          date: "2023.01.01~10.31",
          type: ["APP"],
          platform: ["모바일"],
          contribution: "95%",
          liveUrl: "https://example.com/project6",
          description:
            "이 프로젝트는 모바일 UX/UI 디자인과 개발을 포함한 포트폴리오입니다.",
          companyType: "회사",
        },
        {
          image: slide7,
          companyLogo: companyLogo7,
          modalImage: modalImage7,
          alt: "Slide 7",
          name: "Web 포트폴리오 7",
          date: "2023.01.01~10.31",
          type: ["WEB"],
          platform: ["웹"],
          contribution: "75%",
          liveUrl: "https://example.com/project7",
          description: "이 프로젝트는 최신 웹 기술을 활용한 포트폴리오입니다.",
          companyType: "회사",
        },
      ],
    };
  },
  created() {
    this.filterSlides("전체"); // 초기값: 전체 슬라이드
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
      if (this.currentIndex < this.filteredSlides.length - this.visibleSlides) {
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
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen; // 드롭다운 열림 상태 토글
    },
    selectOption(option) {
      this.selectedOption = option; // 선택된 옵션 업데이트
      this.isDropdownOpen = false; // 드롭다운 닫기
      this.filterSlides(option); // 필터링 메서드 호출
    },
    filterSlides(type) {
      this.isDropdownOpen = false; // 드롭다운 닫기
      if (type === "전체") {
        // "전체"일 때 모든 슬라이드 표시
        const requiredSlides = 10; // 최소 슬라이드 개수
        const currentSlides = this.baseSlides.length;
        const missingSlides = requiredSlides - currentSlides;

        // "준비 중" 슬라이드 생성
        const placeholderSlides = Array.from({ length: missingSlides }, () => ({
          image: teamGGZ, // 임시 이미지
          alt: "준비 중",
          name: "준비중입니다.",
          date: "0000.00.00 ~ 00.00",
          companyLogo: moreHoriz, // 임시 서브 이미지
          type: ["준비 중"],
          companyType: "준비 중", // "준비 중" 타입 추가
        }));

        this.filteredSlides = [...this.baseSlides, ...placeholderSlides]; // 모든 슬라이드 + "준비 중" 슬라이드
      } else {
        // "회사" 또는 "개인" 필터링
        this.filteredSlides = this.baseSlides.filter(
          (slide) => slide.companyType === type
        );
      }

      // 슬라이드 인덱스를 맨 앞으로 초기화
      this.currentIndex = 0;
    },
  },
};
</script>
<style scoped></style>
