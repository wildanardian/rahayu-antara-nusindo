let pengunjung = 0;

module.exports = {
    getPengunjung: (req, res) => {
        res.json({
            data : pengunjung
        })
    },
    
    hitungPengunjung: (req, res) => {
        pengunjung++;
        console.log("pengunjung : ", pengunjung)
        return res.send("seep")
    }
}
