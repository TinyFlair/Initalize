const fs = require("fs")
const https = require("https")
const dotenv = require("dotenv")

dotenv.config()

const settings = {
    universeId: 4779030550,
    placeId: 13775785596,
    xApiKey: process.env["x-api-key-qaTest"]
}
const options = {
    hostname: "apis.roblox.com",
    path: `/universes/v1/${settings.universeId}/places/${settings.placeId}/versions?versionType=Published`,
    method: "POST",
    headers: {
        "Content-Type": "application/xml",
        "x-api-key": settings.xApiKey
    }
}

const fileStream = fs.createReadStream("../Files/Dev/Merge.rbxlx")
const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`)

    let responseData = ""

    res.on("data", (chunk) => {
        responseData += chunk
    })

    res.on("end", () => {
        const parsedData = JSON.parse(responseData)

        console.log("Version number:", parsedData.versionNumber)
    })
})

req.on("socket", () => {
    console.log("Request sent.");
})

req.on("error", (error) => {
    console.error("Request error:", error)
})

fileStream.pipe(req)