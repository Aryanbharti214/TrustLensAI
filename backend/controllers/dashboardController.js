const recommendations =
require("../../ai-engine/outputs/recommendations.json");

exports.getDashboardStats = (req,res)=>{

    const stats = {

        total_alerts:
        recommendations.length,

        critical:
        recommendations.filter(
            r=>r.severity==="Critical"
        ).length,

        high:
        recommendations.filter(
            r=>r.severity==="High"
        ).length,

        medium:
        recommendations.filter(
            r=>r.severity==="Medium"
        ).length
    };

    res.json(stats);
};