require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();

const { router: cargo_centerRouter } = require('./api/routes/cargo_center.routes');
const { router: cargo_infoRouter } = require('./api/routes/cargo_info.routes');
const { router: cargo_statusRouter } = require('./api/routes/cargo_status.routes');
const { router: vehicleRouter } = require('./api/routes/vehicle.routes');

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'client/components'))); 

const { connectToDatabase } = require('./database');

app.get("/", (_, res) => {
    res.sendFile("index.html");
});
app.use(cargo_centerRouter);
app.use(cargo_infoRouter);
app.use(cargo_statusRouter);
app.use(vehicleRouter);

connectToDatabase()
    .then(() => {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log('Listening to port ' + PORT);
        });
    })
    .catch((error) => console.error(error));