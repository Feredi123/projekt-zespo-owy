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
      skillList: {},
      processList: {},
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
      document.getElementById("editProcessName").value = processName;
    },
  },
  created() {
    this.getSkills();
    this.getProcesses();
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

  const formData = {
    process_name: newname,
  };
  const id = event.target.elements['editProcessSelect'].value;
  const processName = vm.processList.find(item => item.process_id == id).name;

  if(confirm("Rename skill " + processName + " to " + newname + "?") == false) {
    return;
  }

  axios.put(`/process/${id}`, formData)
    .then(response => {
      if (response.status == '200') {
        alert("Operation compleated successfully");
        document.getElementById("editProcessForm").reset();
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
