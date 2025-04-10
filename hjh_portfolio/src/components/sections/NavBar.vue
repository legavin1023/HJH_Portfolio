<template>
  <nav
    class="fixed top-[30px] left-1/2 transform -translate-x-1/2 w-[640px] h-[60px] rounded-full bg-black-b40 bg-opacity-80 backdrop-blur-md z-50"
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
      <div class="flex space-x-[30px] text-black-b900">
        <li @click="scrollToSection('hero')" class="cursor-pointer">홈으로</li>
        <li @click="scrollToSection('tools')" class="cursor-pointer">
          자기소개
        </li>
        <li @click="scrollToSection('portfolio')" class="cursor-pointer">
          포트폴리오
        </li>
      </div>
      <li
        class="cursor-pointer text-sm px-[21px] py-[9.5px] rounded-full hover:bg-black-b200 bg-black-b700 text-black-b00"
        @click="scrollToSection('contact')"
      >
        연락하기
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>
