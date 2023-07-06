const response_valid = (status,data,message,res)=>{
    res.json({
        payload:{
            status : status,
            data: data
        },
        message: message
    })
}

module.exports= response_valid
