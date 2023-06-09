const appSideBar = Vue.createApp({
  data() {
    return {
      isShown: 0,
      labels:["Manage skills", "My account", "Growth"],
      addresses:["manage-skills","my-account","growth"],
      logos:["star","person","growth"],
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
        this.isShown = response.data[0].admin_rights;
        this.menuItems();

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
    menuItems(){
      console.log(this.isShown)
      switch (this.isShown){
        case 0:
          this.labels = ["Manage skills", "My account", "Growth"];
          this.addresses = ["manage-skills","my-account","growth"];
          this.logos = ["star","person","growth"];
          break;
        case 1:
          this.labels = ["Dashboard","Manage skills", "My account", "Growth"];
          this.addresses = ["/","manage-skills","my-account","growth"];
          this.logos = ["dashboard","star","person","growth"];
          break;
        case 2:
          this.labels = ["Dashboard","Manage skills", "My account", "Growth","Admin",];
          this.addresses = ["/","manage-skills","my-account","growth","admin"];
          this.logos = ["dashboard","star","person","growth","admin"];
          break;
        default:
          this.labels = ["Manage skills", "My account", "Growth"];
          this.addresses = ["manage-skills","my-account","growth"];
          this.logos = ["star","person","growth"];
          break;
      }
    },
  },
  computed: {
    
  },
  created() {
    this.getMyData();
  },
});

appSideBar.mount("#side-bar");
