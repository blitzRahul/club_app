/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'thefusionclub.blr1.cdn.digitaloceanspaces.com',
                port: '',
            },
            {
                protocol:'http',
                hostname:'localhost',
                port:'3000'
            },
            {
                protocol:'http',
                hostname:'thefusionclub.in',
                port:'',
            },
            {
                protocol:'https',
                hostname:'thefusionclub.in',
                port:'',
            },
        ]
    }
}

module.exports = nextConfig
