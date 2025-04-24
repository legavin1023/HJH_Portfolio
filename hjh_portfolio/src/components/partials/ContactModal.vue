<template>
  <div
    class="fixed top-0 inset-0 bg-black-b900 bg-opacity-50 z-50 flex justify-center items-center"
  >
    <div
      class="relative bg-black-b00 rounded-[10px] w-[622px] h-[800px] px-[24px] pt-[25px] pb-[24px] tablet:px-[84px] tablet:pt-[94px] tablet:pb-[75px]"
    >
      <div
        class="absolute top-0 left-0 w-full h-[52px] tablet:h-[0px] border-b-[1px] tablet:border-none border-black-b50 flex justify-between items-center mb-[30px] bg-black-b35"
      >
        <button
          @click="closeModal"
          class="absolute top-[15px] right-[13px] tablet:top-[36px] tablet:right-[34px] text-gray-500 hover:text-black"
        >
          <img
            src="@/assets/image/icons/close_line.svg"
            alt="Close"
            class="w-[24px] tablet:w-[40px]"
          />
        </button>
      </div>
      <h3
        class="pt-[77px] tablet:pt-[0px] font-800 text-[26px] tablet:text-[32px] pb-[10px]"
      >
        메일을 보내시겠어요?
      </h3>
      <h4 class="font-700 text-[14px] tablet:text-[16px]">
        홈페이지를 통한 연락은 <span class="font-900">메일로만</span> 받고
        있습니다. <br />
        유선번호는 이력서를 확인해주세요.
      </h4>
      <form
        ref="form"
        @submit.prevent="sendEmail"
        class="w-full mt-[45px] text-[14px]"
      >
        <input
          ref="name"
          v-model="name"
          type="text"
          name="name"
          placeholder="보내시는 분 성함 / 기업명을 입력해주세요."
          class="w-full h-[60px] rounded-[5px] mb-[16px] px-[26px] py-[22px] border transition-colors duration-300"
          :class="getInputClass(name, isNameFocused)"
          @focus="isNameFocused = true"
          @blur="isNameFocused = false"
        />

        <input
          ref="email"
          v-model="email"
          name="email"
          type="text"
          placeholder="연락 받으실 곳을 입력해주세요. ( 메일 주소 / 유선번호 )"
          class="w-full h-[60px] mb-[16px] px-[26px] py-[22px] rounded-[5px] border transition-colors duration-300"
          :class="getInputClass(email, isEmailFocused)"
          @focus="isEmailFocused = true"
          @blur="isEmailFocused = false"
        />

        <textarea
          ref="content"
          v-model="content"
          name="content"
          cols="50"
          rows="10"
          placeholder="내용을 입력해주세요."
          class="w-full h-[244px] px-[26px] py-[22px] rounded-[5px] mb-[29px] border transition-colors duration-300"
          :class="getInputClass(content, isContentFocused)"
          @focus="isContentFocused = true"
          @blur="isContentFocused = false"
        ></textarea>

        <input
          type="submit"
          value="전송하기"
          class="w-full h-[64px] rounded-[10px] text-[20px] font-800"
          :disabled="!formIsValid"
          :class="{
            'bg-green-p300 text-black-b00 cursor-pointer': formIsValid, // 활성화 상태
            'bg-gray-400 text-gray-700 cursor-not-allowed': !formIsValid, // 비활성화 상태
          }"
        />
      </form>
    </div>
  </div>
</template>

<script>
import emailjs from "@emailjs/browser";
export default {
  data() {
    return {
      name: "",
      email: "",
      content: "",
      isNameFocused: false,
      isEmailFocused: false,
      isContentFocused: false,
    };
  },
  computed: {
    formIsValid() {
      return this.name && this.email && this.content;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    getInputClass(value, isFocused) {
      if (isFocused) {
        return " outline-green-p250 text-black-b800";
      } else if (value) {
        return "outline-black-b40 text-black-b800";
      } else {
        return "outline-black-b40 text-black-b90";
      }
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.content = "";
    },
    togglePosition() {
      this.hidePositionOptions = !this.hidePositionOptions;
    },
    selectPosition(text) {
      this.selectedPosition = text;
      this.hidePositionOptions = true;
    },
    sendEmail() {
      // emailjs에 필요한 정보 설정
      const serviceID = "service_h36ou7m";
      const templateID = "template_5tl6mrs";
      const userID = "A9ihk9bDqcoY4u_-X";

      // 폼 데이터 추출
      const formData = {
        name: this.name,
        email: this.email,
        content: this.content,
      };
      // 클릭 여부 확인
      if (this.submitting) {
        return; // 이미 서밋 중인 경우 중단
      }

      // 서밋 중 플래그 설정
      this.submitting = true;
      // emailjs를 사용하여 이메일 전송
      emailjs
        .send(serviceID, templateID, formData, userID)
        .then(() => {
          // 전송 성공 시 처리할 내용
          console.log("이메일이 성공적으로 전송되었습니다.");
          alert("이메일이 성공적으로 전송되었습니다.");
          // 추가적인 처리나 리다이렉션 등을 수행할 수 있습니다.
          this.resetForm();
          this.$emit("closeDialog");
        })
        .catch((error) => {
          // 전송 실패 시 처리할 내용
          console.error("이메일 전송 중 오류가 발생했습니다:", error);
          alert("이메일 전송 중 오류가 발생했습니다:", error);
          // 실패한 경우에 대한 예외 처리를 수행할 수 있습니다.
        })
        .finally(() => {
          // 서밋 완료 후 플래그 초기화 및 버튼 비활성화
          this.submitting = false;
        });
    },
  },
};
</script>
<style></style>
