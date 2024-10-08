/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Mengatur CORS untuk semua routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Mengizinkan semua domain (sesuaikan sesuai kebutuhan)
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
