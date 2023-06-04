const appAdmin = Vue.createApp({
  data() {
    return {
      isShown: "",
      isPopupAddSkillOpen: false,
      isPopupDeleteSkillOpen: false,
      isPopupEditSkillOpen: false,
      skillList: {},
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
      console.log(skillName);
    },
  },
  created() {
    this.getSkills();
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