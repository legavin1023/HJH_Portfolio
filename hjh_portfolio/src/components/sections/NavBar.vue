<template>
  <nav
    :class="[
      'fixed top-[30px] left-1/2 transform -translate-x-1/2 w-[90%] min-w-[327px] max-w-[640px] tablet:w-[640px] rounded-[30px] bg-black-b40 bg-opacity-80 backdrop-blur-md z-50 transition-all duration-300',
      isDropdownOpen ? 'h-auto ' : 'h-[60px]',
    ]"
  >
    <ul
      class="flex justify-between items-center h-[60px] mr-[18px] ml-[36px] font-800 text-base"
    >
      <li class="flex items-center">
        <img
          src="@/assets/image/logo.svg"
          alt="로고"
          class="h-[18px] w-[62px] object-contain"
        />
      </li>
      <li class="flex tablet:hidden">
        <!-- 햄버거 버튼과 X 버튼 -->
        <img
          v-if="!isDropdownOpen"
          src="@/assets/image/icons/menu.svg"
          alt="메뉴"
          class="h-[18px] w-[62px] object-contain cursor-pointer"
          @click="toggleDropdown"
        />
        <img
          v-else
          src="@/assets/image/icons/closeX.svg"
          alt="닫기"
          class="h-[18px] w-[62px] object-contain cursor-pointer"
          @click="toggleDropdown"
        />
      </li>
      <div class="hidden tablet:flex space-x-[30px] text-black-b900">
        <li @click="scrollToSection('hero')" class="cursor-pointer">홈으로</li>
        <li
          @click="scrollToSection('toolsMe')"
          class="hidden tablet:block cursor-pointer"
        >
          자기소개
        </li>
        <li
          @click="scrollToSection('tools')"
          class="block tablet:hidden cursor-pointer"
        >
          숙련도
        </li>
        <li
          @click="scrollToSection('me')"
          class="block tablet:hidden cursor-pointer"
        >
          자기소개
        </li>
        <li @click="scrollToSection('portfolio')" class="cursor-pointer">
          포트폴리오
        </li>
      </div>
      <li
        class="hidden tablet:flex cursor-pointer px-[21px] py-[9.5px] rounded-full hover:bg-black-b200 bg-black-b700 text-black-b00"
        @click="scrollToSection('contact')"
      >
        연락하기
      </li>
    </ul>
    <!-- 드롭다운 메뉴 -->
    <transition name="dropdown">
      <ul
        v-if="isDropdownOpen"
        class="px-[35px] pt-[px] pb-[22px] font-800 text-[16px]"
      >
        <li
          v-for="item in dropdownItems"
          :key="item.id"
          @click="scrollToSection(item.section)"
          :class="[
            '',
            index !== dropdownItems.length - 1 ? 'mb-[16px]' : '', // 마지막 항목 제외
          ]"
        >
          {{ item.label }}
        </li>
        <li
          class="flex tablet:hidden cursor-pointer w-[96px] px-[21px] py-[9.5px] rounded-full bg-black-b700 text-center text-[14px] text-black-b00"
          @click="scrollToSection('contact')"
        >
          연락하기
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isDropdownOpen: false, // 드롭다운 메뉴 상태
      dropdownItems: [
        { id: 1, label: "홈으로", section: "hero" },
        { id: 2, label: "숙련도", section: "tools" },
        { id: 3, label: "자기소개", section: "me" },
        { id: 4, label: "포트폴리오", section: "portfolio" },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen; // 드롭다운 상태 토글
    },
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        this.isDropdownOpen = false; // 메뉴 클릭 시 드롭다운 닫기
      }
    },
  },
};
</script>
<style>
/* 드롭다운 애니메이션 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}
.dropdown-enter-from {
  transform: translateY(-20px); /* 위에서 아래로 나타남 */
  opacity: 0;
}
.dropdown-enter-to {
  transform: translateY(0); /* 제자리 */
  opacity: 1;
}
.dropdown-leave-from {
  transform: translateY(0); /* 제자리 */
  opacity: 1;
}
.dropdown-leave-to {
  transform: translateY(-20px); /* 위로 사라짐 */
  opacity: 0;
}
</style>
