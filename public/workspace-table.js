const app = Vue.createApp({
  data() {
    return {
      conditions: [],
      newCondition: "",
      test: {},
      employeesData: {
        employee_id: 0,
        first_name: "ballisław",
        second_name: "",
        email: null,
        phone: null,
        password: null,
        photo: null,
        admin_rights: null,
        manager_id: null,
      },
    };
  },

  methods: {
    addCondition() {
      this.conditions.push(this.newCondition);
      this.newCondition = "";
    },
    removeCondition(index) {
      this.conditions.splice(index, 1);
    },
    async getUser() {
        try {
          this.test = await axios.get("/dashboard");
          console.log(tes.data);
        } catch (error) {
          console.error(error);
        }
    },
  },
  beforeMount(){
    this.getUser()
  }
});

app.mount("#workspace-table");

