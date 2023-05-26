const appAdmin = Vue.createApp({
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
          if(this.isShown!==1){          window.location.href = "/loginfail.html";}
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

appAdmin.mount("#admin");
