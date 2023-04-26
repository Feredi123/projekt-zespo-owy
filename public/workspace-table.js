function getDate(nexthop) {
  const today = new Date();
  let day = today.getDate() + nexthop;
  let month = today.getMonth();
  let year = today.getFullYear();
  return day + "-" + month + "-" + year;
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
    tableDate() {
      for (let i = 0; i < 3; i++) {
        this.dates.push(getDate(i));
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
      console.log(this.employeesData.data);
      console.log(this.skillsConditions);
    },
    addSkillsCondition(value) {
      let obj1 = { name: value };
      console.log(this.skillsConditions);
      this.skillsConditions.push(obj1);
      console.log(this.skillsConditions.id);
    },
    // async getEmployeesSkill(i) {
    //   try {
    //       let object = {};
    //       object = await axios.get("/employees/skill/" + i);
    //       console.log(object.id);
    //       this.employeesSkills.push(object.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async getUser() {
      try {
        this.employeesData = await axios.get("/dashboard/all/2023-04-25");
        this.tableDate();
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
        console.log(this.processes);
      } catch (error) {
        console.error(error);
      }
    },
    async getProcessesById() {
      try {
        this.processId = await axios.get("/employees/process/1");
        console.log(this.processId.data);
      } catch (error) {
        console.error(error);
      }
    },
    // checkIfIncluded(tablica) {
    //   this.testFunction(tablica);
    //   console.log(this.testTab);
    //   console.log(this.skillsConditions);
    //   if(this.testTab.length>this.employeesSkills.length){
    //           // Iteruj przez elementy pierwszej tablicy
    //   for (let i = 0; i < this.employeesSkills.length; i++) {
    //     // Sprawdź, czy dany element występuje w drugiej tablicy
    //     if (this.testTab.includes(this.employeesSkills[i])) {
    //       // Zwróć wartość true, jeśli przynajmniej jeden element występuje w obu tablicach
    //       console.log(this.testTab);
    //       console.log(this.employeesSkills);
    //       console.log(this.ifTrue);
    //       console.log(i);
    //       return true;
    //     }
    //   }
    //   // Zwróć wartość false, jeśli nie ma wspólnych elementów
    //       console.log(this.testTab);
    //       console.log(this.employeesSkills);
    //       console.log(this.ifFalse);
    //                 console.log(i);
    //   return false;
    //   }
    //   else{
    //     console.log('balls');
    //   }

    // },
    compareObjects(obj1, obj2) {
      console.log(obj1);
      console.log(obj2);

      console.log("balls2");
      for (let skill_name in obj1) {
        for (let name in obj2) {
          console.log(obj1[skill_name].skill_name);
          console.log(obj2[name]);
          if (obj1[skill_name].skill_name === obj2[name].name) {
            console.log("balls1");
            return true;
          }
        }
      }
      console.log("balls3");
      return false;
    },
    testFunction(tablica) {
      for (let element of tablica.skills) {
        console.log(element.skill_name);
        this.testTab.push(element.skill_name);
        console.log(this.testTab);
      }
    },
  },
  beforeMount() {
    this.getUser();
    this.getSkill();
    this.getProcesses();
    // this.getEmployeesSkill();
  },
});

app.mount("#workspace-table");
