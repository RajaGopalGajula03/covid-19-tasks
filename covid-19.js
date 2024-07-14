
const express = require('express');
const path = require('path');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const app = express();
const port = 4447;
const dbpath = path.join(__dirname,"covid19India.db");

app.use(express.json());

let db = null;


const initializeDBAndServer = async()=>{
    try{
        db = await open({
            filename:dbpath,
            driver:sqlite3.Database,
        })
        app.listen(port,(req,res)=>{
            console.log(`DB Started \n Server Running at ${port}`);
        })
    }
    catch(error)
    {
        console.log(`Internal Error ${error.message}`);
        process.exit(1);
    }
}

initializeDBAndServer();

// get all states 
app.get("/states",async(req,res)=>{
    try{
        const getStatesQuery = `Select * from State order by state_id`;
        const stateArray = await db.all(getStatesQuery);
        return res.status(200).send(stateArray);
    }
    catch(error)
    {
        console.log("states",error.message);
        return res.status(500).send("Internal Server Error");
    }
})

// getSpecific State
app.get("/states/:stateId",async(req,res)=>{
    const {stateId} = req.params;
    try{
        const getStatesQuery = `Select * from State where state_id = ${stateId}`;
        const stateArray = await db.get(getStatesQuery);
        return res.status(200).send(stateArray);
    }
    catch(error)
    {
        console.log("states/:stateId",error.message);
        return res.status(500).send("Internal Server Error");
    }
})

// district post api

app.post("/add-district",async(req,res)=>{
    const{districtName,stateId,cases,cured,active,deaths} = req.body;
    try{
        const addDistrictQuery = `INSERT INTO District(district_name,state_id,cases,cured,active,deaths)
        VALUES
        (
        '${districtName}',
        ${stateId},
        ${cases},
        ${cured},
        ${active},
        ${deaths}
        );`;
        const district = await db.run(addDistrictQuery);
        const lastId = district.lastID;
        return res.status(200).send(`District Added Successfully with dictrict Id ${lastId}`)
    }
    catch(error)
    {
        console.log("add-district",error.message);
        return res.status(500).send("Internal Server Error");
    }
})

// get Specific district
app.get("/districts/:districtId",async(req,res)=>{
    const {districtId} = req.params;
    try{
        const getDistrictQuery = `Select * from District where district_id = ${districtId}`;
        const districtArray = await db.get(getDistrictQuery);
        return res.status(200).send(districtArray);
    }
    catch(error)
    {
        console.log("districts/:districtId",error.message);
        return res.status(500).send("Internal Server Error");
    }
})

// delete Specific district
app.delete("/delete-district/:districtId",async(req,res)=>{
    const{districtId} = req.params;
    try{
        const deleteDistrictQuery = `DELETE FROM District where district_id = ${districtId};`;
        console.log(deleteDistrictQuery);
        await db.run(deleteDistrictQuery);
        return res.status(200).send(`District Deleted Successfully with id ${districtId}`);
    }
    catch(err)
    {
        console.log("delete-district",err.message);
        res.status(500).send("Internal Server Error");
    }
})

// update specific district 
app.put("/update-district/:districtId",async(req,res)=>{
    const {districtId} = req.params;
    const{districtName,stateId,cases,cured,active,deaths} = req.body;
    try{
        const updateDistrictQuery = `update District set district_name = '${districtName}',state_id = ${stateId},
        cases = ${cases},cured = ${cured},active = ${active},deaths = ${deaths} where district_id = ${districtId}`;
        await db.run(updateDistrictQuery);
        return res.status(200).send(`District Details Updated With Id ${districtId}`);
    }
    catch(err)
    {
        console.log("update-district",err.message);
        return res.status(500).send("Internal Server Error");
    }
})

// get total cases cured from states table and district table

app.get("/states/:stateId/stats",async(req,res)=>{
    const {stateId} = req.params;
    try{
        const getStatsQuery = `SELECT SUM(d.cases) AS total_cases,
        SUM(d.cured) AS total_cured,
        SUM(d.active) AS total_active,
        SUM(d.deaths) AS total_deaths
        FROM 
         State s
        JOIN 
        District d ON s.state_id = d.state_id
        WHERE 
        s.state_id = ${stateId}`

        const Stats = await db.all(getStatsQuery);
        return res.status(200).send(Stats);
    }
    catch(error)
    {
        console.log("states/:stateId/stats",error.message);
        res.status(500).send("Internal Server Error");
    }
})

// get state name using district id

app.get("/districts/:districtId/details",async(req,res)=>{
    const {districtId} = req.params;
    try{
        const getStateQuery = `SELECT s.state_name
        FROM 
         State s
        JOIN 
        District d ON s.state_id = d.state_id
        WHERE 
        d.district_id = ${districtId}`

        const state = await db.get(getStateQuery);
        return res.status(200).send(state);
    }
    catch(error)
    {
        console.log("districts/:districtId/details",error.message);
        res.status(500).send("Internal Server Error");
    }
})