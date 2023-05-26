const appSideBar = Vue.createApp({
  data() {
    return {
      isShown: "",
    };
  },

  methods: {
    async getMyData() {
      try {
        const response = await axios.get("/employee");

        if (!Array.isArray(response.data)) {
          window.location.href = "/login.html";
        } else {
          this.isShown = response.data[0].admin_rights;
          console.log(this.isShown);
        }
      } catch (error) {
        console.error(error);
      }
    },
    menuSize() {
      var menuWidth = window.innerWidth;
      if (menuWidth > 600) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.getMyData();
  },
});

appSideBar.mount("#side-bar");
