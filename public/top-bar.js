const appTopBar = Vue.createApp({
  data() {
    return {
      employeeData: {},
    };
  },

  methods: {
    async getMyData() {
      try {
        const response = await axios.get("/employee");

        if (!Array.isArray(response.data)) {
          window.location.href = "/login.html";
        } else {
          this.employeeData = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getMyData();
  },
});

appTopBar.mount("#top-bar");
