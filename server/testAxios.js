const axios = require("axios");

axios.get("https://www.alphavantage.co/query", {
  params: {
    function: "TIME_SERIES_DAILY_ADJUSTED",
    symbol: "AAPL",
    apikey: "YOUR_API_KEY_HERE"
  }
})
.then(res => console.log("✅ Success", res.data))
.catch(err => console.error("❌ Error", err.message));
