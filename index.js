const express = require('express')
const app = express()
const server = require('http').createServer(app);

const sproc = require('./sprocs/sproc_main')

app.get('/sp_get_message', async (req, res) => {
    try{
        const name = req.query.name
        let id_range = req.query.commision
        id_range = id_range.split(',')
        id_range = id_range.map(x=>parseInt(x))

        const result = await sproc.run_sp('SP_GETMESSAGE',[name,id_range],res)

        return res.status(200).json(result[0])
    }catch(err){
        return res.status(400).json({err:err.message})
    }
});


//Refresh store procedures at app starting
((response = null)=>{
try {
    console.log("[index][sproc_init] start");

    const sprocs_init = require('./sprocs/sprocs_class/sproc_init')
    sprocs_init(response)

} catch(err) {
    console.log("[index][sproc_init] err"+err.message);
}
})()


server.listen(process.env.PORT || 8080,()=>{
    console.log('server running...at 8080');
});


