/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      {
        protocol: "https",
        hostname: "customer-wsgztd71ai7tosc2.cloudflarestream.com",
      },
      {
        protocol: "https",
        hostname: "the--rest.s3.ap-northeast-2.amazonaws.com",
      },
    ],
    domains: ["abc-demo.cdn.prismic.io", "images.prismic.io"],
    dangerouslyAllowSVG: true,
  },
  // reactStrictMode: true,
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"],
  //   });
  //   return config;
  // },
};

export default nextConfig;
