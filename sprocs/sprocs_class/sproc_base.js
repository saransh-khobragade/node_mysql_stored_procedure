class Stored_procedure {
    constructor() {
        this.mysql = require('mysql2')  
        this.sproc_config = require('./sproc_config')
        this.pool = this.mysql.createPool( this.sproc_config );
        this.connection_query = this.connection_query.bind(this)
        this.pool_query = this.pool_query.bind(this)

        console.log(`[sprocs][base] sproc_config :${JSON.stringify(this.sproc_config)}`);

    }
    connection_query( query,res = null ){
        return new Promise( ( resolve, reject ) => {
            this.pool.getConnection((err, conn)=>{
                try{
                  if ( err ){
                    console.log(`[sprocs][base][getConnection] err:${err.message}`);
                    return reject( err );
                
                   }else{
                    conn.query(query,( err, result,fields ) => {
                        this.pool.releaseConnection(conn);
                        if ( err ){
                            console.log(`[sprocs][base][getConnection][conn.query] err: ${err.message}`);
                            return reject( err );
                        }
                        resolve( result );
                    } );      
                  }
                }catch(err){
                    console.log(`[sprocs][base][getConnection][conn.query] catch err:${err.message}`);
                    this.pool.releaseConnection(conn);
                    return reject(err);
                }finally{
                    this.pool.releaseConnection(conn);
                }
             })
        })
    }
    pool_query( sproc_name, args ,res = null) {
        return new Promise( ( resolve, reject ) => {
            
            const query = `CALL ${sproc_name}(${args})`
            console.log(`[sprocs][base][pool_query] query:`+JSON.stringify(query));

            this.pool.query(query,( err, result,fields ) => {
                if ( err ){
                    console.log(`[sprocs][base][pool_query] err:${err.message}`);
                    return reject( err );
                }

                console.log(`[sprocs][base][pool_query] query:${query} success`);
                resolve( result );
            } );
        } );
    }
    drop_query(sproc_name,res=null){
        return new Promise( ( resolve, reject ) => {
            
            const query = `DROP PROCEDURE IF EXISTS ${sproc_name};`
            console.log(`[sprocs][base][drop_query] query:`+JSON.stringify(query));

            this.pool.query(query,( err, result,fields ) => {
                if ( err ){
                    console.log(`[sprocs][base][drop_query] err:${err.message}`);
                    return reject( err );
                }

                console.log(`[sprocs][base][drop_query] query:${query} success`);
                resolve( result );
            } );
        } );
    }
    get_sp_details(routine_schema,sproc_name,res=null){
        return new Promise( ( resolve, reject ) => {
            
            const query = `SELECT SPECIFIC_NAME,ROUTINE_DEFINITION  from information_schema.routines where routine_type = 'PROCEDURE' and ROUTINE_SCHEMA='${routine_schema}' and SPECIFIC_NAME = '${sproc_name}';
            `
            console.log(`[sprocs][base][get_sp_details] query:`+JSON.stringify(query));

            this.pool.query(query,( err, result,fields ) => {
                if ( err ){
                    console.log(`[sprocs][base][get_sp_details] err:${err.message}`);
                    return reject( err );
                }

                console.log(`[sprocs][base][get_sp_details] query:${query} success`);
                resolve( result );
            } );
        } );
    }
    connection_close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
module.exports = Stored_procedure;