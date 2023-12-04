
const createUser = (req, res) => {
    res.json({
        message : "create  user"
    })
}


const getAllUser = (req, res) => {
    res.json({
        message : "all  user"
    })
}

module.exports = {
    createUser, 
    getAllUser,
}