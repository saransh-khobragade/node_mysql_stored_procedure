const Sp = require('./sproc_base')
const collection = require('../sproc_collection')

//Module which refresh stored procedues body

class Stored_procedure_refresh{
  constructor(){
    this.sprocs = collection
    this.connection = new Sp()
    this.init = this.init.bind(this)
    this.refresh = async (res = null) => {
      try{
        for (let sproc of this.sprocs) {
          const dropped = await this.connection.connection_query(`DROP PROCEDURE IF EXISTS ${sproc.name}`)
          if(dropped){
            console.log(`[sprocs][init] [STORED_PROCEDURES_REFRESH] ${sproc.name} deleted`);

            const updated = await this.connection.connection_query(`${sproc.query}`)
            if(updated){
              console.log(`[sprocs][init] [STORED_PROCEDURES_REFRESH] ${sproc.name} updated`);
            }
          }
        }
      }catch(err){
        console.log(`[sprocs][init] catch err:${err.message}`);
      }finally{
        console.log(`[sprocs][init] finally`);
      }
    }
  }
  init(){
    return this.refresh()
  }
}
const sp = new Stored_procedure_refresh()
module.exports = sp.init
