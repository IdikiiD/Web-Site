
module.exports = function formatWMID(WMID) {
    return `${WMID.substr(0, 4)}...${WMID.substr(WMID.length-5, 4)}`
 }
 