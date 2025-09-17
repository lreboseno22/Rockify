// SEED ROUTE
router.get("/seed", async (req, res) => {
    try {
        //no doubles
        // .deleteMany({}) // clear out database before reloading new data
        // .create
        res.send("Data sucessfully seeded")
    } catch (err) {
        console.error(err.message)
    }
})