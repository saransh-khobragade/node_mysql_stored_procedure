const Sp = require('./sproc_base')

class Stored_procedure_helper{
    constructor(name,arg){
        this.sp = new Sp()
        this.name = name
        this.arg = arg
    }
    validate_name(sproc_name){
        const patt = /[.*+?^${}()<>;!@#%&?,|[\]\\]/g;
        const result = patt.test(sproc_name);
        return typeof(sproc_name)==="string" && !result
    }
    validate_arg(arg){
        if(Array.isArray(arg)){
            let flag = true
            for(const x of arg){
                const patt = /[.*+?^${}()<>;!@#%&?,|[\]\\]/g;
                if(x && Array.isArray(x)){
                    return this.validate_arg(x)
                }else if(!x || patt.test(x)){
                    flag = false
                    break
                }
            }
            return flag
        }   
        else{
            return false
        }
    }
    format_arg(arg){
        let result=''
        arg.forEach((x)=>{
            if(Array.isArray(x)){
                let result2=''
                x.forEach((y)=>{
                    result2+=y+','
                })
                result+='"'+result2.slice(0,-1)+'",'
            }else{
                result+='"'+x+'",'
            }
        })
        result = result.slice(0,-1)
        return result
    }
    get_data_by_sp(sproc_name,arg,res = null){
        return new Promise((resolve,reject)=>{
            try{
                console.log(`[Stores][sprocs][sproc_helper][get_data_by_sp]  sproc_name:${sproc_name} arg:${JSON.stringify(arg)}`);
    
                if(this.validate_name(sproc_name) && this.validate_arg(arg)){
                    const formated_arg = this.format_arg(arg)
        
                    console.log(`[Stores][sprocs][sproc_helper][get_data_by_sp] formatted_arg:${formated_arg}`);
                    resolve(this.sp.pool_query(sproc_name,formated_arg,res))
                }else{
                    reject(new Error("Please send valid name and arg"))
                }
            }catch(err){
                console.log(`[Stores][sprocs][sproc_helper][get_data_by_sp] catch err:${err.message}`);
                reject(err)
            }
        })
        
    }
    drop_procedure(sproc_name,res=null){
        return new Promise((resolve,reject)=>{
            try{
                resolve(this.sp.drop_query(sproc_name,res))
                console.log(`[Stores][sprocs][sproc_helper][drop_procedure] `);
            }catch(err){
                console.log(`[Stores][sprocs][sproc_helper][drop_procedure] catch err:${err.message}`);
                reject(err) 
            }
        })
    }
    get_sp_defination(routine_schema,sproc_name,res=null){
        return new Promise((resolve,reject)=>{
            try{
                resolve(this.sp.get_sp_details(routine_schema,sproc_name,res))
                console.log(`[Stores][sprocs][sproc_helper][get_sp_defination]`);
            }catch(err){
                console.log(`[Stores][sprocs][sproc_helper][get_sp_defination] catch err:${err.message}`);
                reject(err) 
            }
        })
    }
}

module.exports =  Stored_procedure_helper;