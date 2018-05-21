var teamData = require("../app/data/teams");

module.exports = function(app) {
    app.get("/api/teams",function(req,res){
        res.json(teamData)
    });

    app.post("/api/teams",function(req,res){
        var curUsr=req.body;
        var totScores=[{}];
        var c=0;
        teamData.forEach(e=>{
            var difs = e.scores.map((ee,i)=>{                
                return Math.abs(ee-parseInt(curUsr.scores[i]))            
            }); 
            totScores[c]={};      
            totScores[c].ind=c;    
            totScores[c].score=difs.reduce((s,c) => s+c);            
            c++;
        });
        totScores.sort(function(a,b){
            return a.score-b.score;
        })
        //console.log(totScores)
        var theTeam =[];
        for (i=0;i<4;i++){
            theTeam.push(teamData[totScores[i].ind]);
        }
        teamData.push(curUsr)
        return res.json(theTeam)
    })
}



