<template>
  <div class="screen">
    <div
      class="screen_inner"
      :style="{
        width: `${
          ((((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 +
            16) *
          Math.sqrt(cardsContext.length)
        }px`,
      }"
    >
      <card-flip
        v-for="(card, index) in cardsContext"
        :key="index"
        ref="cardRefs"
        :imgBackFaceUrl="`images/${card}.png`"
        :cardsContext="cardsContext"
        :card="{ index, value: card }"
        :canFlip="!isProcessing && rules.length < 2"
        @onFlip="checkrules"
      />
    </div>
  </div>
</template>

<script>
import CardFlip from "./CardFlip.vue";

export default {
  name: "InteractScreen",
  components: {
    CardFlip,
  },
  props: {
    cardsContext: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rules: [],
      isProcessing: false,
    };
  },
  methods: {
    checkrules(card) {
      if (this.isProcessing || this.rules.length >= 2) return;
      this.rules.push(card);

      if (this.rules.length === 2) {
        this.isProcessing = true;
        const refs = this.$refs.cardRefs;
        const card1 = refs[this.rules[0].index];
        const card2 = refs[this.rules[1].index];
        if (this.rules[0].value === this.rules[1].value) {
          console.log("right");
          //add class disable to component card
          card1.onEnableDisableMode();
          card2.onEnableDisableMode();
          const disabledElement = document.querySelectorAll(
            ".screen .card.disabled"
          );

          if (
            disabledElement &&
            disabledElement.length === this.cardsContext.length - 2
          ) {
            setTimeout(() => {
              this.$emit("onFinish");
            }, 500);
          }

          //reset rules to []
          this.rules = [];
          this.isProcessing = false;
        } else {
          // console.log('wrong');
          setTimeout(() => {
            if (card1?.onFlipBackCard && card2?.onFlipBackCard) {
              card1.onFlipBackCard();
              card2.onFlipBackCard();
            } else {
              console.warn("Không tìm thấy ref hoặc method onFlipBackCard");
            }
            this.rules = [];
            this.isProcessing = false;
          }, 800);
        }
      }
    },
  },
};
</script>

<style lang="css" scoped>
h1 {
  margin-bottom: 1rem;
}

.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--dark);
  color: var(--light);
}

.screen_inner {
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
}
</style>
