const app = Vue.createApp({
  data() {
    return {
      skills: ["css", "html", "javaScript"],
      lvl: [1, 2, 3],
      propValue: "",
      newPropValue: "",
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
    }
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
  },
});

app.mount("#list-of-skills");
