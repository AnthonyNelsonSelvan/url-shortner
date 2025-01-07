const setIdToUserMap = new Map;

function setUser(id,user){
    setIdToUserMap.set(id,user)
}

function getUser(id){
   return setIdToUserMap.get(id)
}

module.exports = {
    setUser,
    getUser
}