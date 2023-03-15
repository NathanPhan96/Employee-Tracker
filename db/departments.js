const db = require("./connection");

async function viewDepartments() {
   try{ 
    const departments = 
     await db.query("SELECT * FROM department")
        return departments
    } catch (err){
    console.log(err)
    }
}
module.exports = { viewDepartments }