/**
 * @description ESLint configuration scoped to the web app, extending Next.js defaults.
 */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    "@next/next/no-html-link-for-pages": "off"
  }
};

