const Stored_procedure_helper = require('./sprocs_class/sproc_helper')

const run_sp = (name,arg,res = null)=>{
    const sp_helper = new Stored_procedure_helper(name,arg)
    return sp_helper.get_data_by_sp(name,arg,res);
}
const get_sp_def = (routine_schema,sproc_name,res = null)=>{
    const sp_helper = new Stored_procedure_helper(sproc_name)
    return sp_helper.get_sp_defination(routine_schema,sproc_name,res);
}
const drop_sp = (sproc_name,res = null)=>{
    const sp_helper = new Stored_procedure_helper(sproc_name)
    return sp_helper.drop_procedure(sproc_name,res);
}

module.exports = {run_sp,get_sp_def,drop_sp};

/* 

Note:   Currently store procedure middleware only expects number,string,array in para convert them in string only 
        Read log if needed


You can only achieve some fast performance with stored procedure just because it is cached in sql server
in binary form and only function call with para goes to sql every time

Real performance you can achieve with efficient query 

1. Sql partitioning of searching huge data **
2. Instead of update use case
3. Use temperory table for joins and delete them after use
4. Avoid joins instead use sub query if possible **
5. Avoid cursor,triggers
6. Select exact amount of data needed
7. Use stored procedures **
8. Avoid distinct instead use group by self join **
9. Use EXISTS instead of where IN
10. Avoid subquery use CTE

*/