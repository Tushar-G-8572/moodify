

async function checkBlackList(req,res) {
    const user = req.user;

    res.status(200).json({message:"user fetched",
        user:{
            userId:user.id,
            username:user.username
        }
    })
}

module.exports = {checkBlackList}