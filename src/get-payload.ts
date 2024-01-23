import dotenv from "dotenv"
import path from "path"
import payload, { Payload } from "payload"
import type { InitOptions } from "payload/config"
import nodemailer from "nodemailer"

// Load environment variables from a .env file
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
})

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
})

// Global caching object for the Payload client
let cached = (global as any).payload

// If the cache doesn't exist, create it with client and promise properties set to null
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

// Define an interface for function arguments
interface Args {
  initOptions?: Partial<InitOptions>
}

// Export a function to get or initialize the Payload client
export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing")
  }

  if (cached.client) {
    return cached.client
  }

  // If the promise is not created yet, initialize Payload with options
  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "hello@codedbyigor.com",
        fromName: "Digital Sea",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    })
  }

  try {
    // Await the promise to initialize the client and store it in the cache
    cached.client = await cached.promise
  } catch (err: unknown) {
    // If an error occurs during initialization, clear the promise and throw the error
    cached.promise = null
    throw err
  }

  return cached.client
}
