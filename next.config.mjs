/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint infra will be wired up separately; never let it block a build.
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Jogos HTML5 em public/jogos/<slug>/jogar/ — o index.html deles usa
  // caminhos relativos (./assets/…). Com cleanUrls + trailingSlash:false
  // na Vercel, /jogar/index.html pode virar /jogar, e aí ./assets
  // resolveria um nível acima. Estes rewrites fazem as três formas
  // (/jogar, /jogar/, /jogar/index.html) carregarem o jogo inteiro.
  async rewrites() {
    return [
      { source: "/jogos/:slug/jogar", destination: "/jogos/:slug/jogar/index.html" },
      { source: "/jogos/:slug/assets/:path*", destination: "/jogos/:slug/jogar/assets/:path*" },
    ];
  },
};

export default nextConfig;
