import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// базовые настройки от Next.js
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // собственная настройка для разрешения any
  {
    files: ["**/utils/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]

export default eslintConfig
