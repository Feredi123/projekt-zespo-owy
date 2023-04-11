const app = Vue.createApp({
  data() {
    return {
      conditions: [],
      newCondition: "",
      employeesData: {
        type: Object,
        employee_id: 0,
        first_name: "balls",
        second_name: "",
        email: null,
        phone: null,
        password: null,
        photo: null,
        admin_rights: null,
        manager_id: null,
      },
    };
  },

  methods: {
    addCondition() {
      this.conditions.push(this.newCondition);
      this.newCondition = '';
    },
    removeCondition(index) {
      this.conditions.splice(index,1);
    },
    saveEmployeeData(employeeData){
      this.employeesData=Object.assign({}, employeeData);
    }
  },
});

app.mount("#workspace-table");
