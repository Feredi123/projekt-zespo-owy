const appSideBar = Vue.createApp({
  data() {
    return {
      isShown: "",
      labels:["Dasboard", "Manage skills", "My account", "Growth"],
      addresses:["index.html","manage-skills.html","my-account.html","growth.html"],
      logos:["dashboard","star","person","growth"],
    };
  },

  methods: {
    changeURL(index){window.location.href = this.addresses[index];},
    checkActiveURL(index){
      let address = "/" + this.addresses[index];
      let color = "rgb(131, 197, 232)";
      if (window.location.pathname === address) {
        return { background: color};
      }
      // console.log(address)
      // console.log(window.location.pathname)
      // console.log(window.location.pathname===address)
      //       return false;
    },
    getLogo(index){
      return 'styles/'+this.logos[index]+'.png'
    },
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
