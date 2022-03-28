const express = require('express');
const app =  express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "vaccine"

})

app.post('/login', (req, res) => {
    const Hospital_ID = req.body.Hospital_ID;
    const Password = req.body.Password;

    db.query("SELECT Hospital_ID , Password FROM hospital WHERE Hospital_ID = ? AND Password = ?",
    [Hospital_ID,Password],
     (err, result) =>{
        if (err){
            console.log(err);
        }
        if(result.length > 0) {
            res.send(result);
        }else{
            res.send({message: "รหัสหน่วยงานหรือรหัสผ่านไม่ถูกต้อง"});
        }
    })
})

app.get('/dashboard' , (req, res) => {


    db.query("SELECT registervaccine.ID,registervaccine.DoseNumber,registervaccine.ID_Card, registervaccine.Hospital_ID, registervaccine.Hospital_Name, registervaccine.GotVaccine, registervaccine.Vaccine_ID, registervaccine.VaccineName, USER.sex,DATE_FORMAT(USER.DateofBirth,'%d/%m/%Y') AS BirthDay,user.email,user.Telephone,user.address,DATE_FORMAT(registervaccine.Date,'%d/%m/%Y') AS Date, USER.Name, USER.Surname FROM registervaccine INNER JOIN USER ON USER.ID_Card = registervaccine.ID_Card;",
     (err, result) =>{
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.post('/update', (req, res) => {
    const ID = req.body.ID;
    const Hospital_ID = req.body.Hospital_ID;
    const GotVaccine = req.body.GotVaccine;

    db.query("UPDATE registervaccine SET GotVaccine = 'ได้รับวัคซีนแล้ว' , Date = NOW() WHERE registervaccine.ID = ? and GotVaccine = 'ยังไม่ได้รับวัคซีน'", [ID] ,
     (err, result) =>{
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})





app.listen('3301', () =>{
    console.log('server running');
})