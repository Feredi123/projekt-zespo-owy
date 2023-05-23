const appSideBar = Vue.createApp({
  data() {
    return {
      isShown: true,
    };
  },

  methods: {
    toggleMenu() {
      this.isShown = !this.isShown;
      console.log(this.isShown);
    },
  },
});

appSideBar.mount("#side-bar");
