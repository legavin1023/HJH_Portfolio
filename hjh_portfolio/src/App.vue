<template>
  <div id="app">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none">
      <defs>
        <filter id="squiggly-0">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="0"
          />
          <feDisplacementMap
            id="displacement"
            in="SourceGraphic"
            in2="noise"
            scale="6"
          />
        </filter>
        <filter id="squiggly-1">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="1"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>

        <filter id="squiggly-2">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="2"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>

        <filter id="squiggly-3">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="3"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>

        <filter id="squiggly-4">
          <feTurbulence
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
            seed="4"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
      </defs>
    </svg>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>
<style></style>
