
function convertISOToDateFormat(isoDate) {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDate(nexthop) {
  const today = new Date();
  today.setDate(today.getDate() + nexthop);
  return today;
}

function timeDifference(startDate, endDate) {
  var differenceInTime = endDate.getTime() - startDate.getTime();
  var differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
}

const app = Vue.createApp({
  data() {
    return {
      qInTable: ["Q3 2023", "Q4 2023", "Q1 2024", "Q2 2024"],
      growth: {},
      dateToday: "",
      dateTable: "",
      delData: "",
      isPopupOpen: false,
      skills: {},
      levels: [1, 2, 3, 4],
      formDate: "",
      formSkill: "",
      formLevel: "",
      formDateStart: "",
      isPopupOpenDel: false,
      dateToday2:""    };
  },

  computed: {},

  methods: {
    barSize(index) {
      let size;
      this.dateToday = getDate(0);
      let timestamp = Date.parse(this.growth.data[index].end_date);
      let dateObject = new Date(timestamp);
      this.dateTable = getDate(365);
      let lower = timeDifference(this.dateToday, dateObject);
      let bigger = timeDifference(this.dateToday, this.dateTable);
      size = (lower / bigger) * 100;
      if (size <= 100) {
        return { width: size + "%" };
      } else {
        return { width: 100 + "%" };
      }
    },

    async getGrowth() {
      try {
        const response = await axios.get("/growth-skill");
        if (!Array.isArray(response.data)) {
          window.location.href = "/login.html";
        } else {
          this.growth = response;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getSkills() {
      try {
        const response = await axios.get("/skills");
        if (!Array.isArray(response.data)) {
          window.location.href = "/login.html";
        } else {
          this.skills = response;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async putData() {
      convertISOToDateFormat(this.formDate);
      this.dateToday2 = getDate(0);
            this.dateToday2 = convertISOToDateFormat(this.dateToday2);
      try {
        console.log(this.formSkill);
        console.log(this.formLevel);
        console.log(this.formDate);
        console.log(this.dateToday2);
        const res = await axios.post("/growth-skill", {
          skills_id: this.formSkill,
          level: this.formLevel,
          start_date: this.dateToday2,
          end_date: this.formDate,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteData() {
      try {
        const res = await axios.delete("/growth-skill/" + this.delData);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getGrowth();
    this.getSkills();
  },
});

app.mount("#growth");
