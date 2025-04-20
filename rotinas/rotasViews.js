const path = require("path");

var views = (view)=>{
    return path.join(__dirname, "../", "../", "front", "public", "view", view)
}


module.exports = {
    views
}