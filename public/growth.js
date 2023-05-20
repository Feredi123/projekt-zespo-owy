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
      return { width: size + "%" };
    },

    async getGrowth() {
      try {
        this.growth = await axios.get("/growth-skill");
      } catch (error) {
        console.error(error);
      }
    },
    async putData() {
      console.log("abba");
      try {
        console.log("lubie abbe");
        let date = new Date("2023-05-19");
        let date2 =new Date("2023-07-30");
        const res = await axios.post("/growth-skill", {
          skills_id: 4,
          level: 4,
          start_date: date,
          end_date: date2,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  beforeMount() {
    this.getGrowth();
  },
});

app.mount("#growth");
