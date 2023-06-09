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

    selectedSkillLevel() {
      let selectedSkill;
      for (let i = 0; i < this.putSkills.length; i++) {
        if (this.putSkills[i].skill_id === this.putSkill) {
          selectedSkill = this.putSkills[i];
          break;
        }
      }
      return selectedSkill ? selectedSkill.level : '';
    },
  },

  methods: {
    async getMySkills() {
      try {
        const response = await axios.get("/skills");
        this.registerSkills = response.data;

      } catch (error) {
        console.error(error);
      }
    },

    async postRegisterData() {
      console.log(this.registerCheckbox);
      if (this.registerCheckbox) {
        console.log("poszło");
        try {
          axios.post("/employee-skill/" + this.registerSkill + "/" + this.registerLevel)
            .then(response => {
              if (response.status == '201') {
                alert("Skill registered");
                this.getMyData();
                this.registerSkill = '';
                this.registerLevel = '';
                this.resetCheckboxes();
                
              } else {
                alert("Form submission failed.");
              }
            })

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
        this.putSkills = response.data;
        console.log(this.putSkills)

      } catch (error) {
        console.error(error);
      }
    },

    async putRegisterData() {
      if (this.putCheckbox) {
        console.log("poszło");
        try {
          axios.put("/employee-skill/" + this.putSkill + "/" + this.putLevel)
          .then(response => {
            if (response.status == '200') {
              alert("Skill modified successfully");
              this.getMyData();
              this.resetCheckboxes();
              this.putSkill = '';
              this.putLevel = '';
            } else {
              alert("Form submission failed.");
            }
          })
          .catch(error => {
            console.error(error);
            alert("An error occurred during form submission.");
          });

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
          axios.delete("/employee-skill/" + this.deleteSkill)
            .then(response => {
              if (response.status == '204') {
                alert("Skill successfully deleted");
                this.getMyData();
                this.resetCheckboxes();
                this.deleteSkill= '';
                
              } else {
                alert("Form submission failed.");
              }
            })
            .catch(error => {
              console.error(error);
              alert("An error occurred during form submission.");
            });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("nie poszło");
      }
    },

    resetCheckboxes() {
      this.putCheckbox = false;
      this.deleteCheckbox = false;
      this.registerCheckbox = false;
    },

  },

  created() {
    this.getMySkills();
    this.getMyData();
    
  },
});

appManageSkills.mount("#manage-skills");