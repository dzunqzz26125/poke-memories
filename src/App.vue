<template>
  <div>
    <main-screen
      v-if="statusMatch === 'default'"
      @onStart="onHandleBeforeStart"
    />
    <interact-screen
      v-if="statusMatch === 'inmatch'"
      :cardsContext="setting.cardsContext"
      @onFinish="onGetResult"
    />
    <result-screen
      :timer="timer"
      v-if="statusMatch === 'result'"
      @onStartAgain="statusMatch = 'default'"
    />
    <copy-right-screen />
  </div>
</template>

<script>
import InteractScreen from "./components/InteractScreen.vue";
import MainScreen from "./components/MainScreen.vue";
import { shuffled } from "@/utils/array";
import ResultScreen from "@/components/ResultScreen.vue";
import CopyRightScreen from "./components/CopyRightScreen.vue";

export default {
  name: "App",
  components: {
    MainScreen,
    InteractScreen,
    ResultScreen,
    CopyRightScreen,
  },
  data() {
    return {
      setting: {
        totalOfBlock: 0,
        cardsContext: [],
        startedAt: null,
      },
      statusMatch: "default",
      timer: 0,
    };
  },
  methods: {
    onHandleBeforeStart(config) {
      console.log("running handle before start", config); // ở đây dafault params là config, hay còn gọi là tham số mặc định
      this.setting.totalOfBlock = config.totalOfBlock;
      const totalcard = this.setting.totalOfBlock;
      const firstCard = Array.from({ length: totalcard / 2 }, (_, i) => i + 1);
      const secondCard = [...firstCard];
      const cards = [...firstCard, ...secondCard];
      this.setting.cardsContext = shuffled(cards);
      // console.log(cards);
      this.setting.startedAt = new Date().getTime();

      this.statusMatch = "inmatch";
    },
    onGetResult() {
      this.timer = new Date().getTime() - this.setting.startedAt;
      this.statusMatch = "result";
    },
  },
};
</script>
