import express from "express"
import path from "path"

const app = express()

app.get("/", (req, res) => {
  res.render("index.html.ejs", {
    time: new Date().toString()
  })
})

app.listen(3000, () => {
  console.log("Server is running at port 3000")
})
