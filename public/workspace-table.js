function getDate(nexthop) {
  const today = new Date();
  let day = today.getDate()+nexthop;
  let month = today.getMonth();
  let year = today.getFullYear();
  console.log(today);
  console.log(day);
  console.log(month);
  console.log(year);
  return day+'-'+month+'-'+year;
}

const app = Vue.createApp({
  data() {
    return {
      conditions: [],
      newCondition: "",
      skillsConditions: [],
      employeesData: {},
      dates: [""],
      test: {},
    };
  },

  computed: {
    filteredList() {
      return this.employeesData.data.filter((item) => {
        return this.conditions.includes(item.first_name);
      });
    },
    tableDate() {
      for (let i=0; i<3; i++){
      this.dates.push(getDate(i));
      console.log(this.dates);
      };
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
        this.tableDate();
        console.log(this.employeesData.data);
      } catch (error) {
        console.error(this.error);
      }
    },
    async getSkill() {
      try {
        this.test = await axios.get("/skills");
        console.log(this.test.data);
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
