const { formattedDateTime, aliveAtBySeconds } = require("../../../shared/sources/dateFormatter");

class StatusController {

    routes(){
        return "/status";
    }

    status() {
        return function(req, res){

            var status = {};
            
            status.serverName = process.argv[2];
            status.date = formattedDateTime(new Date());
            status.aliveAtms = process.uptime();
            status.aliveAt = aliveAtBySeconds(status.aliveAtms)
            status.nodeVersion = `${process.versions.node} - ${process.release.lts}`;

            return res.json(status);
        }
    }
}

module.exports = StatusController;