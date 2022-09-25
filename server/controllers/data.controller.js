const db = require("../db.js");

class DataController {
  async getAllData(req, res) {
    try {
      const { condition, sort_by, value } = req.query;
      let response;

      if (value) {
        let markCondition;
        if (condition === "more") markCondition = ">";
        if (condition === "less") markCondition = "<";
        if (condition === "equally") markCondition = "=";
        if (condition === "contains") markCondition = "LIKE";
        response = await db.query(
          `SELECT * FROM data WHERE ${sort_by} ${markCondition} ${condition === "contains" ? `'%${value}%'` : value}`
        );
      } else {
        response = await db.query("SELECT * FROM data");
      }

      res.json(response.rows);
    } catch (err) {
      console.log(err);
    }
  }
  async getFilteredData(req, res) {
    try {
      const { condition, sort_by, value, page, limit } = req.query;
      let response;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      if (value) {
        let markCondition;
        if (condition === "more") markCondition = ">";
        if (condition === "less") markCondition = "<";
        if (condition === "equally") markCondition = "=";
        if (condition === "contains") markCondition = "LIKE";
        response = await db.query(
          `SELECT * FROM data WHERE ${sort_by} ${markCondition} ${condition === "contains" ? `'%${value}%'` : value}`
        );
      } else {
        response = await db.query("SELECT * FROM data");
      }

      const result = response.rows.slice(startIndex, endIndex);
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new DataController();
