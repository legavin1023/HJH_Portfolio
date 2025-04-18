<template>
  <footer
    class="bg-black-b800 w-full h-[194px] tablet:h-[51px] largeDesktop:h-[194px] absolute bottom-0 flex items-center justify-center flex-col tablet:flex-row largeDesktop:flex-col"
  >
    <!-- 이미지와 텍스트를 중앙에 배치 -->
    <div
      class="inset-0 flex items-center justify-center flex-col tablet:flex-row largeDesktop:flex-col"
    >
      <img src="@/assets/image/logo_gray.svg" alt="Logo" class="w-[66px]" />
      <p class="text-black-b300 ml-[16px] text-[16px] leading-[51px]">
        ⓒ2025. Team GGZ all rights reserved.
      </p>
    </div>

    <!-- 드롭다운 버튼 -->
    <div
      class="relative tablet:absolute bottom-0 right-10 largeDesktop:relative h-[51px] tablet:h-[51px] mobile:h-[51px] largeDesktop:h-[51px] left-0 tablet:left-1/2 largeDesktop:left-0 transform translate-x-0 tablet:translate-x-[60%] largeDesktop:translate-x-0 text-[14px] mt-[8px] tablet:mt-0 largeDesktop:mt-[8px]"
    >
      <button
        ref="dropdownButton"
        @click="toggleDropdown"
        class="text-black-b100 bg-black-b900 w-[185px] h-[51px] leading-[51px] flex items-center justify-center"
      >
        <p class="mr-[16px] text-black-b100 font-800">GGZ 더 알아보기</p>
        <img
          :src="getToggleIcon()"
          alt="Toggle Icon"
          class="w-[18px] h-[18px]"
        />
      </button>

      <!-- 드롭다운 메뉴 -->
      <div
        v-if="isDropdownOpen"
        class="absolute z-10 bottom-full flex flex-col bg-black-b900 text-black-b100 text[14px]border-b border-b border-black-b700"
        :style="{ minWidth: dropdownWidth + 'px', padding: '18px 28px' }"
      >
        <div
          v-for="item in dropdownItems"
          :key="item.id"
          :class="[
            'flex items-center mb-[18px] font-800 ',
            item.state === 'disabled' ? 'opacity-50 pointer-events-none' : '',
          ]"
          @mouseenter="changeState(item, 'hover')"
          @mouseleave="changeState(item, 'normal')"
          @click="changeState(item, 'disabled')"
          class="last:mb-0"
        >
          <a
            :href="item.href"
            class="flex items-center w-full"
            :class="{
              'font-900 text-black-b80': item.state === 'hover',
            }"
          >
            {{ item.label }}
            <img
              :src="getIcon(item)"
              alt="Item Icon"
              class="w-[9.75px] h-[9.75px] ml-[5.17px]"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import arrowOutwardNo from "@/assets/image/icons/arrow_outward_no.svg";
import arrowOutwardHover from "@/assets/image/icons/arrow_outward_hover.svg";
import arrowOutward from "@/assets/image/icons/arrow_outward.svg";
import removeIcon from "@/assets/image/icons/remove.svg"; // 버튼에서 사용
import addIcon from "@/assets/image/icons/add.svg"; // 버튼에서 사용

export default {
  name: "SiteFooter",
  data() {
    return {
      isDropdownOpen: false, // 드롭다운 상태
      dropdownWidth: 0, // 드롭다운 메뉴의 최소 너비
      dropdownItems: [
        {
          id: 1,
          label: "개발자 사이트 가기",
          href: "#",
          state: "disabled", // 초기 상태
        },

        // id: 2,
        // label: "깃헙 바로가기",
        // href: "#",
        // state: "normal", // 초기 상태

        {
          id: 3,
          label: "프로젝트 협업 문의",
          href: "#",
          state: "normal", // 초기 상태
        },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        this.updateDropdownWidth();
      }
    },
    updateDropdownWidth() {
      const button = this.$refs.dropdownButton;
      if (button) {
        this.dropdownWidth = button.offsetWidth;
      }
    },
    getIcon(item) {
      switch (item.state) {
        case "disabled":
          return arrowOutwardNo;
        case "hover":
          return arrowOutwardHover;
        default:
          return arrowOutward;
      }
    },
    getToggleIcon() {
      return this.isDropdownOpen ? removeIcon : addIcon;
    },
    changeState(item, newState) {
      item.state = newState;
    },
  },
};
</script>

<style scoped>
/* 드롭다운 메뉴를 감싸는 div의 패딩 */
div[v-if] {
  padding: 18px 30px; /* x: 30px, y: 18px */
}
</style>
