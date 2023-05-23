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
  