const appManageSkills = Vue.createApp({
  data() {
    return {
      registerSkills: {},
      registerSkill: "",
      levels: [1, 2, 3, 4],
      registerLevel: "",
      registerCheckbox: "",
      putSkills: {},
      putSkill: "",
      putLevel: "",
      putCheckbox: "",
      deleteSkill: "",
      deleteCheckbox: "",
      // propValue: "",
      // newPropValue: "",
      // employeeData: {},
      // employeeSkills: {},
      // absencesTypes: {},
      // isPopupOpen: false,

      // employeesData: {
      //   type: Object,
      //   employee_id: 0,
      //   first_name: "balls",
      //   second_name: "",
      //   email: null,
      //   phone: null,
      //   password: null,
      //   photo: null,
      //   admin_rights: null,
      //   manager_id: null,
      // },
    };
  },
  computed: {
    GetOptionsChangeSkillLvl() {
      const id = this.selectedChangeSkill;

      for (var i = 0; i < this.employeeSkills.length; i++) {
        if (this.employeeSkills[i].skill_id == id) {
          var lvlel = this.employeeSkills[i].level;
          var msg = "Current Lvl " + lvlel;
          return [{ value: lvlel, message1: msg }];
        }
      }

      return [{ value: 0, message1: "New lvl" }];
    },

    subtractedSkills() {
      const registerSkillsIds = Object.values(this.registerSkills).map(skill => skill.skill_id);
      const putSkillsIds = Object.values(this.putSkills).map(skill => skill.skill_id);
      const subtractedIds = registerSkillsIds.filter(id => !putSkillsIds.includes(id));
      const subtractedSkills = {};
    
      Object.entries(this.registerSkills).forEach(([key, skill]) => {
        if (subtractedIds.includes(skill.skill_id)) {
          subtractedSkills[key] = skill;
        }
      });
    
      return subtractedSkills;
    },
  },

  methods: {
    // addValue(table, value) {
    //   table.push(value);
    // },
    // removeValue(table, tableLvl, index) {
    //   table.splice(index, 1);
    //   tableLvl.splice(index, 1);
    // },
    // addCondition() {
    //   this.conditions.push(this.newCondition);
    //   this.newCondition = "";
    // },
    // removeCondition(index) {
    //   this.conditions.splice(index, 1);
    // },
    // saveEmployeeData(employeeData) {
    //   this.employeesData = Object.assign({}, employeeData);
    // },
    async getMySkills() {
      try {
        const response = await axios.get("/skills");

        if (!Array.isArray(response.data)) {
          window.location.href = "/login.html";
        } else {
          this.registerSkills = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async postRegisterData() {
      console.log(this.registerCheckbox);
      if (this.registerCheckbox) {
        console.log("poszło");
        try {
          const res = await axios.post(
            "/employee-skill/" + this.registerSkill + "/" + this.registerLevel
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("nie poszło");
      }
    },

    async getMyData() {
      try {
        const response = await axios.get("/employee-skill");

        if (!Array.isArray(response.data)) {
          window.location.href = "/login.html";
        } else {
          this.putSkills = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async putRegisterData() {
      if (this.putCheckbox) {
        console.log("poszło");
        try {
          const res = await axios.put(
            "/employee-skill/" + this.putSkill + "/" + this.putLevel
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("nie poszło");
      }
    },

    async deleteRegisterData() {
      if (this.deleteCheckbox) {
        console.log("poszło");
        try {
          const res = await axios.delete("/employee-skill/" + this.deleteSkill);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("nie poszło");
      }
    },

  },

  created() {
    this.getMySkills();
    this.getMyData();
    
  },
});

appManageSkills.mount("#manage-skills");
const app = Vue.createApp({
    data() {
      return {
        skills : {},
        employeeSkills : {},

        selectedChangeSkill: '',
        isPopupOpen: false,
      };
    },

    computed: {
        GetOptionsChangeSkillLvl() {
            
            const id = this.selectedChangeSkill;

            for(var i = 0; i < this.employeeSkills.length;i++){
                if(this.employeeSkills[i].skill_id == id){
                    var lvlel = this.employeeSkills[i].level;
                    var msg = "Current Lvl " + lvlel;
                    return [{value: lvlel, message1: msg,}];
                }
            }
            
            return [{value: 0, message1: "New lvl",}];
            
        }
    },
  
    methods: {
      addValue(table, value){
        table.push(value);
      },
      removeValue(table, tableLvl, index){
        table.splice(index,1);
        tableLvl.splice(index,1);
      },
      async getMySkills(){
        try {
          const response = await axios.get("/employee-skill");
          
          if(!Array.isArray(response.data)){
            window.location.href = '/login.html';
          } else {
            this.employeeSkills = response.data;
          }
        } catch (error) {
          console.error(error);
        }
      },
      async getSkills(){
        try {
          const response = await axios.get("/skills");
          
          if(!Array.isArray(response.data)){
            window.location.href = '/login.html';
          } else {
            this.skills = response.data;
          }
  
        } catch (error) {
          console.error(error);
        }
      },
    },
    
    created() {
      this.getMySkills();
      this.getSkills();

    },
  });
  
  app.mount("#workspace");

  