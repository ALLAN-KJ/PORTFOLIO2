/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'lenis'],
  devIndicators: false,
  experimental: {
    agentUpgrade: 'security',
  },
};

export default nextConfig;
