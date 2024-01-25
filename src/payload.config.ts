import dotenv from "dotenv"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { slateEditor } from "@payloadcms/richtext-slate"
import { webpackBundler } from "@payloadcms/bundler-webpack"
import { buildConfig } from "payload/config"
import path from "path"
import { Users } from "./collections/Users"
import { Media } from "./collections/Media"
import { Products } from "./collections/Products/Products"
import { ProductFiles } from "./collections/ProductFile"
import { Orders } from "./collections/Orders"

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders], //Orders, products, product files, users, etc...
  routes: {
    admin: "/sell",
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Digital Sea",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
})
