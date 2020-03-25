const SP_GETMESSAGE = { name:'SP_GETMESSAGE',query:
    `CREATE PROCEDURE SP_GETMESSAGE(
        IN var_name VARCHAR(20),
        IN var_id CHAR(255)
    )
    BEGIN
        SELECT * from Agent where AGENT_NAME = var_name and COMMISSION in (var_id);
    END`}

const all_store_procedure = [
    SP_GETMESSAGE
]

module.exports = all_store_procedure

/* 

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