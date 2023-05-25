import bcrypt from "bcrypt"
import {User} from "../models"

interface UserArgs {
  username: string
  email: string
  password: string
  password_confirmation: string
}

export function isUserArgs(args:object):args is UserArgs {
  return (
    "username" in args
    && "email" in args
    && "password" in args
    && "password_confirmation" in args
  )
}

export async function createUser({username, email, password, password_confirmation}:UserArgs) {
  if (password !== password_confirmation) {
    throw {
      password: "passwords differ",
      password_confirmation: "passwords differ",
    }
  }

  const salt = await bcrypt.genSalt(10)
  const password_hash = await bcrypt.hash(password, salt)
  const user = new User({username, email, password_hash, salt})
  await user.save()
}
