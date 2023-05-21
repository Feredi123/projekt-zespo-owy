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
      qInTable: ["Q2 2023", "Q3 2023", "Q4 2023", "Q1 2024"],
      growth: {},
      dateToday: "",
      dateTable: "",
      delData: "id do usunięcia",
      bufforDate: "dodaj date w tym formacie 2023-05-19",
    };
  },

  computed: {},

  methods: {
    barSize(index) {
      let size;
      this.dateToday = getDate(0);
      let timestamp = Date.parse(this.growth.data[index].end_date);
      let dateObject = new Date(timestamp);
      this.dateTable = getDate(120);
      let lower = timeDifference(this.dateToday, dateObject);
      let bigger = timeDifference(this.dateToday, this.dateTable);
      size = (lower / bigger) * 100;
      if(size<=100){      return { width: size + "%" };}
      else{return { width: 100 + "%" };}
    },

    async getGrowth() {
      try {
        this.growth = await axios.get("/growth-skill");
      } catch (error) {
        console.error(error);
      }
    },
    async putData() {
      try {
        const res = await axios.post("/growth-skill", {
          skills_id: 4,
          level: 4,
          start_date: "2023-05-19",
          end_date: this.bufforDate,
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
  },
});

app.mount("#growth");
