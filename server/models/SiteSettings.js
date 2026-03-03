const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    // Identity
    siteName: {
      type: String,
      default: "Ellis Edens",
    },
    siteTitle: {
      type: String,
      default: "Full-Stack Developer & Digital Marketer",
    },
    siteDescription: {
      type: String,
      default: "",
    },

    // Social Links
    githubUrl: {
      type: String,
      default: "",
    },
    linkedinUrl: {
      type: String,
      default: "",
    },
    twitterUrl: {
      type: String,
      default: "",
    },
    websiteUrl: {
      type: String,
      default: "",
    },

    // Colors
    colorPrimary: {
      type: String,
      default: "#2b7cb3",
    },
    colorPrimaryDark: {
      type: String,
      default: "#1e6a9e",
    },
    colorPrimaryLight: {
      type: String,
      default: "#9aceeb",
    },
    colorAccent: {
      type: String,
      default: "#9aceeb",
    },
    colorCharcoal: {
      type: String,
      default: "#4d4f48",
    },
    colorCharcoalLight: {
      type: String,
      default: "#595a54",
    },
    colorBackground: {
      type: String,
      default: "#f6f4f7",
    },
    colorSurface: {
      type: String,
      default: "#ffffff",
    },
    colorSurfaceAlt: {
      type: String,
      default: "#efeeef",
    },
    colorText: {
      type: String,
      default: "#4d4f48",
    },
    colorTextMuted: {
      type: String,
      default: "#595a54",
    },
    colorTextLight: {
      type: String,
      default: "#8a8b86",
    },
    colorTextInverse: {
      type: String,
      default: "#f6f4f7",
    },

    // Fonts
    fontHeading: {
      type: String,
      default: "Source Code Pro",
    },
    fontBody: {
      type: String,
      default: "Inter",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);