import 'dotenv/config'

const cors_headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const server = Bun.serve({
    hostname: "0.0.0.0",
    port: process.env.PORT || 3000,
    async fetch(req) {
        const url = new URL(req.url);
        const path = url.pathname;
        if (req.method === 'OPTIONS') {
            return new Response(null, {
              headers: {
                ...cors_headers,
              },
            });
        }
        if (req.method === 'OPTIONS') {
            return new Response(null, {
              headers: {
                ...cors_headers,
              },
            })
        }
        if (path === '/api/v1/validate') {
            const body = await req.json();
            if (body.password === process.env.PASSWORD) {
                return new Response(JSON.stringify({
                    validated: true}), {
                        headers: {
                            ...cors_headers,
                        },
                    })
            } else {
                return new Response(JSON.stringify({
                    validated: false}), {
                        status: 401,
                        headers: {
                            ...cors_headers,
                        },
                    })
            }
        } return new Response('Not found', {
            status: 404,
            headers: {
                ...cors_headers,
            },
        })
    },
})

console.log(`Listening on http://localhost:${server.port}`);
