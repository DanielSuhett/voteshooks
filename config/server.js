require("dotenv").config();

module.exports = app => {
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Players API on ${process.env.PORT || 3001}`)
    });
}