
const appAdmin = Vue.createApp({
  data() {
    return {
      isShown: "",
      isPopupAddSkillOpen: false,
      isPopupDeleteSkillOpen: false,
      isPopupEditSkillOpen: false,
      isPopupAddProcessOpen: false,
      isPopupDeleteProcessOpen: false,
      isPopupEditProcessOpen: false,
      isPopupAddUserOpen: false,
      isPopupDeleteUserOpen: false,
      isPopupEditUserOpen: false,
      isPopupViewUserOpen: false,
      skillList: {},
      processList: {},
      skillsInSelectedProcessList: {},
      numberSkillsInSelectedProcess: 0,
      usersList: {},
      selectedUserData: {},
      selectedViewMode: 0,
      numberSkillsInSelectedUser: 0,
      skillsInSelectedUserList: {},
    };
  },

  methods: {
    async getSkills() {
      try {
        const response = await axios.get("/skills");
        this.skillList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getProcesses() {
      try {
        const response = await axios.get("/processes");
        this.processList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getskillsInSelectedProcess(id) {
      try {
        const response = await axios.get(`/process/${id}`);
        this.skillsInSelectedProcessList = response.data[1];
        this.numberSkillsInSelectedProcess = this.skillsInSelectedProcessList.length;
      } catch (error) {
        console.error(error);
      }
    },
    async getEmployees() {
      try {
        const response = await axios.get('/employees');
        this.usersList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    menuSize() {
      var menuWidth = window.innerWidth;
      if (menuWidth > 600) {
        return true;
      } else {
        return false;
      }
    },
    editSkillOnChange(event){
      const id = event.target.value;
      const skillName = this.skillList.find(item => item.skill_id == id).name;
      document.getElementById("editSkillName").value = skillName;
    },
    editProcessOnChange(event){

      const id = event.target.value;
      const processName = this.processList.find(item => item.process_id == id).name;
      this.getskillsInSelectedProcess(id)
        .then(() =>{
          document.getElementById("editSkillQuantity").value = this.numberSkillsInSelectedProcess;
        })
      
      document.getElementById("editProcessName").value = processName;
    },
    editViewUserOnChange(event){
      const id = event.target.value;
      this.getSelectedUserData(id)
    },
    async getSelectedUserData(id){
      const response = await axios.get(`/user/${id}`);
      this.selectedUserData = response.data;
      this.skillsInSelectedUserList = this.selectedUserData.skills;
      this.numberSkillsInSelectedUser = this.skillsInSelectedUserList.length;
      console.log(this.selectedUserData)
    },
    editProcessQuantityOnChange(event){
      this.numberSkillsInSelectedProcess = Number(document.getElementById("editSkillQuantity").value);
    },
    editUserQuantityOnChange(event){
      this.numberSkillsInSelectedUser = Number(document.getElementById("editSkillUserQuantity").value);
    },
    getDisplayTFValue(input) {
      return input ? true : false;
    },
    togglePasswordVisibility(inputId) {
      var passwordInput = document.getElementById(inputId);
      
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('default', {dateStyle: 'short'}).format(date);
    },
    DeleteAbsence(id) {

      console.log(this.selectedUserData.absences[id])

      if(confirm("Delete Absence " + this.formatDate(this.selectedUserData.absences[id].start_date) + " - " + this.formatDate(this.selectedUserData.absences[id].end_date) + "?") == false) {
        return;
      }

      const user_id = document.getElementById('editUserSelect').value;

      const absence_id = this.selectedUserData.absences[id].absence_id
    
        axios.delete(`/user/${user_id}/absence/${absence_id}}`)
        .then(response => {
          if (response.status == '204') {
            alert("Absence " + this.formatDate(this.selectedUserData.absences[id].start_date) + " - " + this.formatDate(this.selectedUserData.absences[id].end_date) + " deleated");
            this.getSelectedUserData(user_id);
            
          } else {
            alert("Form submission failed.");
          }
        })
        .catch(error => {
          console.error(error);
          alert("An error occurred during form submission.");
        });
      
    },
  },
  created() {
    this.getSkills();
    this.getProcesses();
    this.getEmployees();
  },
});

const vm = appAdmin.mount("#admin");


function submitAddSkill(event) {
  event.preventDefault();

  const formData = {
    skill_name: event.target.elements['addSkillName'].value,
  };
  axios.post('/skills', formData)
    .then(response => {
      if (response.status == '201') {
        alert("Skill "+ formData.skill_name+" created successfully");
        document.getElementById("addSkillForm").reset();
        vm.getSkills();

      } else {
        alert("Form submission failed.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred during form submission.");
    });
}

function submitDeleteSkill(event) {
  event.preventDefault();

  const id = event.target.elements['deleteSkillSelect'].value;
  const skillName = vm.skillList.find(item => item.skill_id == id).name;

  axios.get(`/skills/${id}/dependency`)
  .then(dependency => {
    if(confirm("Delete skill " + skillName + "? \nin use by "+dependency.data.employees.length+" users\nin use by "+dependency.data.processes.length+" processes") == false) {
      return;
    }

    axios.delete(`/skills/${id}`)
    .then(response => {
      if (response.status == '204') {
        alert("Skill " + skillName + " successfully deleted");
        vm.getSkills()
        
      } else {
        alert("Form submission failed.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred during form submission.");
    });
  })
  
}

function submitEditSkill(event){
  event.preventDefault();

  const newname = event.target.elements['editSkillName'].value;

  const formData = {
    skill_name: newname,
  };
  const id = event.target.elements['editSkillSelect'].value;
  const skillName = vm.skillList.find(item => item.skill_id == id).name;

  if(confirm("Rename skill " + skillName + " to " + newname + "?") == false) {
    return;
  }

  axios.put(`/skills/${id}`, formData)
    .then(response => {
      if (response.status == '200') {
        alert("Operation compleated successfully");
        document.getElementById("editSkillForm").reset();
        vm.getSkills();

      } else {
        alert("Form submission failed.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred during form submission.");
    });
}

function submitAddProcess(event) {
  event.preventDefault();

  const formData = {
    process_name: event.target.elements['addProcessName'].value,
  };
  axios.post('/process', formData)
    .then(response => {
      if (response.status == '201') {
        alert("Process "+ formData.process_name+" created successfully");
        document.getElementById("addProcessForm").reset();
        vm.getProcesses();

      } else {
        alert("Form submission failed.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred during form submission.");
    });
}

function submitDeleteProcess(event) {
  event.preventDefault();

  const id = event.target.elements['deleteProcessSelect'].value;
  const processName = vm.processList.find(item => item.process_id == id).name;

  if(confirm("Delete process " + processName + "?") == false) {
     return;
  }

    axios.delete(`/process/${id}`)
    .then(response => {
      if (response.status == '204') {
        alert("Process " + processName + " successfully deleted");
        vm.getProcesses()
        
      } else {
        alert("Form submission failed.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred during form submission.");
    });
  
}

function submitEditProcess(event){
  event.preventDefault();

  const newname = event.target.elements['editProcessName'].value;
  let skillArray = [];

  for(let i =1;i <= vm.numberSkillsInSelectedProcess; i++){
    skillArray.push(document.getElementById(`editProcessSkill${i}`).value);
  }

  const formData = {
    process_name: newname,
    skills: skillArray,
  };
  const id = event.target.elements['editProcessSelect'].value;
  const processName = vm.processList.find(item => item.process_id == id).name;

  if(confirm("Modify process" + processName + "?") == false) {
    return;
  }

  axios.put(`/process/${id}`, formData)
    .then(response => {
      if (response.status == '200') {
        alert("Operation compleated successfully");
        document.getElementById("editProcessForm").reset();
        vm.isPopupEditProcessOpen = false;
        vm.getProcesses();

      } else {
        alert("Form submission failed.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred during form submission.");
    });
}

function submitAddUser(event) {
  event.preventDefault();

  var adminRights = 0;
  if(event.target.elements['addUserAdminRights'].checked){
    adminRights = 1;
  }

  var passwordChange = 0;
  if(event.target.elements['addUserChangePassword'].checked){
    passwordChange = 1;
  }

  const formData = {
    first_name: event.target.elements['addUserFirstName'].value,
    last_name: event.target.elements['addUserLastName'].value,
    email: event.target.elements['addUserEmail'].value,
    phone: event.target.elements['addUserPhone'].value,
    password: event.target.elements['addUserPassword'].value,
    admin_rights: adminRights,
    password_change: passwordChange,

  };
  axios.post('/register', formData)
    .then(response => {
      if (response.status == '201') {
        alert("User " + formData.first_name + " " +formData.last_name+" created successfully");
        document.getElementById("addUserForm").reset();
        vm.getEmployees();
      } else {
        alert("Form submission failed.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred during form submission.");
    });
}

function submitDeleteUser(event) {
  event.preventDefault();

  const id = event.target.elements['deleteUserSelect'].value;
  const item = vm.usersList.find(item => item.employee_id == id);
  const userFirstName = item.first_name;
  const userLastName = item.second_name;
  if(confirm("Delete user " + userFirstName +" "+ userLastName+"?") == false) {
     return;
  }

    axios.delete(`/user/${id}`)
    .then(response => {
      if (response.status == '204') {
        alert("User " + userFirstName +" "+ userLastName+" successfully deleted");
        vm.getEmployees()
        
      } else {
        alert("Form submission failed.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred during form submission.");
    });
  
}

function submitEditUser(event) {
  event.preventDefault();

  const id = event.target.elements['editUserSelect'].value;

  if(vm.selectedViewMode == 1){ //edit user data

    var adminRights = 0;
    console.log(event.target.elements['editUserHaveAdmin'].checked)
    if(event.target.elements['editUserHaveAdmin'].checked){
      adminRights = 1;
    }

    var passwordChange = 0;
    if(event.target.elements['editUserChangePassword'].checked){
      passwordChange = 1;
    }

    const formData = {
      first_name: event.target.elements['editUserFirstName'].value,
      last_name: event.target.elements['editUserLastName'].value,
      email: event.target.elements['editUserEmail'].value,
      phone: event.target.elements['editUserPhone'].value,
      admin_right: adminRights,
      change_password: passwordChange,
    };

    console.log(formData,id)

    axios.put(`/user/${id}`, formData)
      .then(response => {
        if (response.status == '200') {
          alert("User " + formData.first_name + " " + formData.last_name+" modified successfully");
          vm.getEmployees();
        } else {
          alert("Form submission failed.");
        }
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred during form submission.");
      });

  }
  
  if(vm.selectedViewMode == 3){ //edit user Skills

    var skills = [];
    const userName = vm.usersList.find(item => item.employee_id == id).first_name;
    const secondName = vm.usersList.find(item => item.employee_id == id).second_name;

    for(var i = 1 ; i <= vm.numberSkillsInSelectedUser ; i++){
      var element = {
        skills_id: document.getElementById(`editUserSkill${i}`).value,
        level: document.getElementById(`editUserSkillLevel${i}`).value,
      }
      if(element.level>0 && element.level<5 && element.skills_id > 0){
        skills.push(element);
      }
    }

    const formData = {
      skills: skills,
    };
    
    axios.put(`/user/${id}`, formData)
      .then(response => {
        if (response.status == '200') {
          alert("User " + userName + " " + secondName +" modified successfully");
          vm.getEmployees();
        } else {
          alert("Form submission failed.");
        }
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred during form submission.");
      });

  }

}