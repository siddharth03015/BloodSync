/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    config.resolve.alias['shared'] = path.resolve(__dirname, 'src/app/lib/shared.ts');
    return config;
  }
};

export default nextConfig;
