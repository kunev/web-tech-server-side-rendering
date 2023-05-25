import express from "express"
import path from "path"
import bodyParser from "body-parser"

import {createUser, isUserArgs} from "./controllers"
import {dbConnect} from "./models"

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.render("index.html.ejs", {
    time: new Date().toString()
  })
})

app.get("/signup", (req, res) => {
  res.render("signup.html.ejs")
})

app.post("/signup", async (req, res) => {
  const args = req.body
  if (isUserArgs(args)) {
    try {
      await createUser(args)
    } catch (errors) {
      res.render("signup.html.ejs", {errors})
      return
    }
  } else {
    res.status(400)
    res.send("Missing args")
  }
  res.redirect("/")
})

async function main() {
  await dbConnect()
  await app.listen(3000, () => {
    console.log("Server is running at port 3000")
  })
  console.log("Server shut down...")
}

main()
