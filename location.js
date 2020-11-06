const express = require('express');
const app = new express();

const pool = require('./databaseHandler');

app.use(express.json());

//get all locations
app.get('/locations', async(req, res) => {
    try{
        const allLocations = await pool.query('SELECT * FROM location');
        res.json(allLocations.rows);

    }catch(err){
        console.error(err.message);
    }
});

//get a location
app.get('/locations/:loc_id', async(req,res) => {
        const {loc_id} = req.params;
    try{
        const location = await pool.query('SELECT * FROM location WHERE loc_id = $1', [loc_id]);
        res.json(location.rows[0]);   
 
    }catch(err){
        console.error(err.message);
    }
});

//create location
app.post('/locations', async(req, res) => {
    try{
        const {location} = req.body;
        const {address} = req.body;
        const {zipcode} = req.body;

        const newLocation = await pool.query('INSERT INTO location (location, address, zipcode) VALUES ($1, $2,$3)', [location, address, zipcode]);
        res.json(newLocation.rows[0]);
    }
    catch(err){
        console.error(err.message);
    }
});

//update location
app.put('/locations/:loc_id', async(req,res) => {
    try{
        const {loc_id} = req.params;
        const {location} = req.body;
        const {address} = req.body;
        const {zipcode} = req.body;
        
        const updateLocation = await pool.query('UPDATE location SET location = $1, address=$2, zipcode = $3 WHERE loc_id = $4', [location, address, zipcode, loc_id]);
        res.json('Location is updated');

    }catch(err){
        console.error(err.message);
    }
});

//delete location
app.delete('/locations/:loc_id', async(req,res) => {
    try{
        const {loc_id} = req.params;
        
        const deleteLocation = await pool.query('DELETE FROM location WHERE loc_id = $1', [loc_id]);
        res.json('Location deleted');

    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});