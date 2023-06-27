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
      dateToday2:"",
      userType: 0,
    };
  },

  computed: {},

  methods: {
    barSize(index) {
      let size;
      let dateToday = getDate(0);
      let timestamp = Date.parse(this.growth.data[index].end_date);
      let dateObject = new Date(timestamp);
      let dateTable = getDate(365);
      let lower = timeDifference(dateToday, dateObject);
      let bigger = timeDifference(dateToday, dateTable);
      size = (lower / bigger) * 100;
      if (size <= 100) {
        return { width: size + "%" };
      } else {
        return { width: 100 + "%" };
      }
    },

    async getGrowth() {
      try {
        this.growth = await axios.get("/growth-skill");
      } catch (error) {
        console.error(error);
      }
    },
    async getSkills() {
      try {
        const response = await axios.get("/skills");

        this.skills = response;
      } catch (error) {
        console.error(error);
      }
    },
    async putData() {
      convertISOToDateFormat(this.formDate);
      this.dateToday2 = getDate(0);
            this.dateToday2 = convertISOToDateFormat(this.dateToday2);

      try {
        await axios.post("/growth-skill", {
          skills_id: this.formSkill,
          level: this.formLevel,
          start_date: this.dateToday2,
          end_date: this.formDate,
        })
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteData() {
      try {
        await axios.delete("/growth-skill/" + this.delData);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    async getRaport() {
      try {
        const response = await axios.get("/growth-raport", { responseType: "blob" });
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      } catch (error) {
        console.error(error);
      }
    },
    async getUserType() {
      try {

        const response = await axios.get("/employee");
        this.userType = response.data[0].admin_rights;

      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getGrowth();
    this.getSkills();
    this.getUserType();
  },
});

app.mount("#vm");
