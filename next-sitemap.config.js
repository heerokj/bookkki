/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000/",
  generateRobotsTxt: true, // (optional)
  priority: 1,
  // ...other options
};
