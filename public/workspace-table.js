function getDate(nexthop) {
  const today = new Date();
  today.setDate(today.getDate() + nexthop);
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  return day + "-" + month + "-" + year;
}

function getStartDate() {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  return year + "-" + month + "-" + day;
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
      checkProcess: "",
      checkProcessTable: {},
      riskTable: [50,50,50,50,50,50],
    };
  },

  computed: {
    // filteredList() {
    //   if (this.skillsConditions.length === 0) {
    //     return this.employeesData.data.filter((item) => {
    //       return (
    //         this.conditions.includes(item.first_name) ||
    //         this.conditions.includes(item.second_name)
    //       );
    //     });
    //   } else {
    //     return this.employeesData.data.filter((item) => {
    //       return (
    //         this.conditions.includes(item.first_name) ||
    //         this.conditions.includes(item.second_name)
    //       );
    //     });
    //   }
    // },
  },

  methods: {
    filteredList() {
      // if (this.skillsConditions.length === 0) {
      return this.employeesData.data.filter((item) => {
        return (
          this.conditions.includes(item.first_name) ||
          this.conditions.includes(item.second_name)
        );
      });
      // } else {
      //   return this.employeesData.data.filter((item) => {
      //     return (
      //       this.conditions.includes(item.first_name) ||
      //       this.conditions.includes(item.second_name)
      //     );
      //   });
      // }
    },
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
        if (!Array.isArray(response.data)) {
          window.location.href = "/login.html";
        } else {
          this.employeesData = response;
        }
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

    compareNames(obj1, obj2) {
      for (let id in obj2) {
        if (obj1 === obj2[id]) {
          return true;
        }
      }
      return false;
    },

    compareProcess(obj1, obj2) {
      for (let id in obj2) {
        if (obj1 === obj2[id].employee_id) {
          this.riskTable.push(Math.floor(obj2[id].average));
          return "styles/" + Math.floor(obj2[id].average) + ".png";
        }
      }
      return "styles/0.png";
    },

    compareRisk(obj1, obj2) {
      for (let id in obj2) {
        if (obj1 === obj2[id].employee_id) {
          this.riskTable.push(Math.floor(obj2[id].average));
          return Math.floor(obj2[id].average);
        }
      }
      this.riskTable.push(0);
      return 0;
    },

    async getProcess() {
      try {
        var methodRiskTable = [0, 0, 0, 0, 0];
        this.checkProcessTable = await axios.get(
          "/employees/process/" + this.checkProcess
        );
        for (let id in this.checkProcessTable.data) {
          if (this.checkProcessTable.data[id].average>=3) {            for (let idAbsence in this.employeesData.data) {
              if (
                this.employeesData.data[idAbsence].employee_id ===
                this.checkProcessTable.data[id].employee_id
              ) {
                for (let idEmployeeAbsence in this.employeesData.data[idAbsence]
                  .absences) {
                  if (
                    !this.employeesData.data[idAbsence].absences[
                      idEmployeeAbsence
                    ]
                  ) {
                    methodRiskTable[idEmployeeAbsence] += 1;
                  }
                }
                //  console.log(this.employeesData.data[idAbsence]);
              }
            }
          // console.log(this.employeesData.data);
          }

        }
        
        this.riskTable=methodRiskTable;
        this.riskTable.unshift(50);
      } catch (error) {
        console.error(error);
      }
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
