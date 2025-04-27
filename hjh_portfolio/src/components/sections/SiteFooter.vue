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
        class="absolute z-10 bottom-full flex flex-col bg-black-b900 text-black-b100 text-[14px] border-b border-black-b700"
        :style="{
          minWidth: dropdownWidth + 'px',
          padding: ' 18px 0px 0px 30px',
        }"
      >
        <!-- 정적 드롭다운 항목 -->
        <div
          class="flex items-center mb-[18px] font-800 opacity-50 pointer-events-none text-black-b100"
        >
          <a
            href="#"
            class="flex items-center w-full hover:font-900 hover:text-black-b80"
          >
            개발자 사이트 가기
            <img
              src="@/assets/image/icons/arrow_outward_no.svg"
              alt="Item Icon"
              class="w-[9.75px] h-[9.75px] ml-[5.17px]"
            />
          </a>
        </div>
        <div
          class="flex items-center mb-[18px] font-800"
          @click="$emit('openContactModal')"
        >
          <button
            class="flex items-center w-full hover:font-900 hover:text-black-b80"
          >
            프로젝트 협업 문의
            <img
              src="@/assets/image/icons/arrow_outward.svg"
              alt="Item Icon"
              class="w-[9.75px] h-[9.75px] ml-[5.17px]"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- ContactModal -->
    <ContactModal v-if="isContactModalOpen" @close="closeContactModal" />
  </footer>
</template>
<script>
import ContactModal from "@/components/partials/ContactModal.vue";
import removeIcon from "@/assets/image/icons/remove.svg"; // 버튼에서 사용
import addIcon from "@/assets/image/icons/add.svg"; // 버튼에서 사용

export default {
  name: "SiteFooter",
  components: {
    ContactModal,
  },
  data() {
    return {
      isDropdownOpen: false, // 드롭다운 상태
      isContactModalOpen: false, // ContactModal 상태
      dropdownWidth: 0, // 드롭다운 메뉴의 최소 너비
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
    getToggleIcon() {
      return this.isDropdownOpen ? removeIcon : addIcon;
    },
  },
};
</script>

<style scoped></style>
