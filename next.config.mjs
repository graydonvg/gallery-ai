/** @type {import('next').NextConfig} */

import { withAxiom } from "next-axiom";

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/gallery",
        permanent: true,
      },
    ];
  },
};

export default withAxiom(nextConfig);
