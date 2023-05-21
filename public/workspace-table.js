function getDate(nexthop) {
  const today = new Date();
  today.setDate(today.getDate() + nexthop);
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  return day + "-" + month + "-" + year;
}


function tableDate(datesTable) {
      for (let i = 0; i < 5; i++) {
        datesTable.push(getDate(i));
      }
    }

const app = Vue.createApp({
  data() {
    return {
      conditions: [],
      newCondition: "",
      skillsConditions: [],
      newSkillsCondition: {},
      employeesData: {},
      dates: [""],
      skills: [],
      employeesSkills: [],
      processes: [],
      processCondition: "",
      newProcessCondition: {},
      processId: [],
    };
  },
  

  computed: {
    filteredList() {
      if (this.skillsConditions.length === 0) {
        return this.employeesData.data.filter((item) => {
          return (
            this.conditions.includes(item.first_name) ||
            this.conditions.includes(item.second_name)
          );
        });
      } else {
        return this.employeesData.data.filter((item) => {
          return (
            this.conditions.includes(item.first_name) ||
            this.conditions.includes(item.second_name)
          );
        });
      }
    },
  },

  methods: {
    addCondition() {
      this.conditions.push(this.newCondition);
      this.newCondition = "";
    },
    removeCondition(table, index) {
      table.splice(index, 1);
    },
    addSkillsCondition(value) {
      let obj1 = { name: value };
      this.skillsConditions.push(obj1);
    },
    async getUser() {
      try {
        const response = await axios.get("/dashboard/all/" + getStartDate());
        if(!Array.isArray(response.data)){
          window.location.href = '/login.html';
        } else {
          this.employeesData = response;
        }
        this.employeesData = await axios.get("/dashboard/all/" + getDate());
      } catch (error) {
        console.error(error);
      }
    },
    async getSkill() {
      try {
        this.skills = await axios.get("/skills");
      } catch (error) {
        console.error(error);
      }
    },
    async getProcesses() {
      try {
        this.processes = await axios.get("/processes");
      } catch (error) {
        console.error(error);
      }
    },
    async getProcessesById() {
      try {
        this.processId = await axios.get("/employees/process/1");
      } catch (error) {
        console.error(error);
      }
    },
    compareObjects(obj1, obj2) {
      for (let skill_name in obj1) {
        for (let name in obj2) {
          if (obj1[skill_name].skill_name === obj2[name].name) {
            return true;
          }
        }
      }
      return false;
    },
  },
  created() {
    tableDate(this.dates);
    this.getUser();
    this.getSkill();
    this.getProcesses();
    // this.getEmployeesSkill();
  },
});

app.mount("#workspace-table");
