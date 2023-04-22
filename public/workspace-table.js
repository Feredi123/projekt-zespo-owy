const app = Vue.createApp({
  data() {
    return {
      conditions: [],
      newCondition: "",
      employeesData: {},
      test: {},
    };
  },

  computed: {
    filteredList() {
      return this.employeesData.data.filter((item) => {
        return this.conditions.includes(item.first_name);
      });
    },
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
        this.employeesData = await axios.get("/dashboard");
        console.log(employeesData.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getSkill() {
      try {
        this.test = await axios.get("/skills");
        console.log(test.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  beforeMount() {
    this.getUser();
    this.getSkill();
  },
});

app.mount("#workspace-table");
