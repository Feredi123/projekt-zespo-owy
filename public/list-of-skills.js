const app = Vue.createApp({
  data() {
    return {
      skills: ["css", "html", "javaScript"],
      lvl: [1, 2, 3],
      propValue: "",
      newPropValue: "",
      employeeData : {},
      employeeSkills : {},
      absencesTypes : {},
      isPopupOpen: false,

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

  methods: {
    addValue(table, value){
      table.push(value);
    },
    removeValue(table, tableLvl, index){
      table.splice(index,1);
      tableLvl.splice(index,1);
    },
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
    async getMyData(){
      try {
        const response = await axios.get("/employee");
        
        if(!Array.isArray(response.data)){
          window.location.href = '/login.html';
        } else {
          this.employeeData = response.data;
        }

      } catch (error) {
        console.error(error);
      }
    },
    async getAbsenceTypes(){
      try {
        const response = await axios.get("/absence-types");
        
        if(!Array.isArray(response.data)){
          window.location.href = '/login.html';
        } else {
          this.absencesTypes = response.data;
        }

      } catch (error) {
        console.error(error);
      }
    },
  },
  
  created() {
    this.getMySkills();
    this.getMyData();
    this.getAbsenceTypes();
  },
});

app.mount("#list-of-skills");
