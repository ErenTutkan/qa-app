<template>
  <router-view name="AppHeader" />
  <router-view @click="HideBar" />
  <AppLoading />
</template>
<script>
import AppLoading from "@/components/AppShared/AppLoading";

export default {
  components: { AppLoading },
  mounted() {
    this.$store.dispatch("initApp");
  },
  methods: {
    HideBar() {
      this.$store.commit("setShow", false);
    },
  },
};
</script>
