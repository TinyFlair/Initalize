const fs = require("fs")
const https = require("https")
const dotenv = require("dotenv")

dotenv.config()

const { apiKey, fileId } = process.env
const options = {
    hostname: "www.googleapis.com",
    path: `/drive/v3/files/${fileId}?alt=media&key=${apiKey}`,
    method: "GET"
}

const fileStream = fs.createWriteStream("../Files/Main/GatesMap.rbxlx")
const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`)

    res.pipe(fileStream)

    fileStream.on("finish", () => {
        console.log("File downloaded.")
    })
})

req.on("socket", () => {
    console.log("Request sent.");
})

req.on("error", (error) => {
    console.error("Request error:", error)
})

req.end()