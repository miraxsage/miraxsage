import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["_old_src/**"],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-key": "warn",
    },
  },
  {
    files: ["src/entities/project/content/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
      "jsx-a11y/alt-text": "off",
    },
  },
  {
    files: ["src/widgets/landing/SimplexNoise.min.js"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
];

export default eslintConfig;
