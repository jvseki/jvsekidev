import { Config } from "@remotion/cli/config";

// Reaproveita a mesma pasta public/ do Next.js — o SVG do logo
// (public/logo/j-mark.svg) fica acessível em staticFile("logo/j-mark.svg")
// sem duplicar o arquivo.
Config.setPublicDir("public");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
