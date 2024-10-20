module.exports = {
  // uncomment this line to enable debug mode
  // logging: {
  //   level: "verbose",
  //   fullUrl: true,
  //   fetches: {
  //     fullUrl: true
  //   }
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "*.twimg.com"
      }
    ]
  },
  output: "standalone"
};
