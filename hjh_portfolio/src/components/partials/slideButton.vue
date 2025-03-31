<template>
  <button
    @click="onClick"
    :disabled="disabled"
    class="w-[40px] h-[40px] absolute top-1/2 transform -translate-y-1/2 group"
    :class="positionClass"
  >
    <img
      v-if="disabled"
      src="@/assets/image/icons/arrow_forward_D.svg"
      :alt="altText + ' Disabled'"
      class="w-[40px] h-[40px]"
      :style="directionStyle"
    />
    <img
      v-else
      src="@/assets/image/icons/arrow_forward.svg"
      :alt="altText"
      class="group-hover:hidden w-[40px] h-[40px]"
      :style="directionStyle"
    />
    <img
      v-if="!disabled"
      src="@/assets/image/icons/arrow_forward_black.svg"
      :alt="altText + ' Hover'"
      class="hidden group-hover:block w-[40px] h-[40px]"
      :style="directionStyle"
    />
  </button>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      required: true,
      validator: (value) => ["prev", "next"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  computed: {
    positionClass() {
      return this.direction === "prev" ? "left-0" : "right-0";
    },
    directionStyle() {
      return this.direction === "prev" ? "transform: scaleX(-1)" : "";
    },
    altText() {
      return this.direction === "prev" ? "Previous" : "Next";
    },
  },
};
</script>
