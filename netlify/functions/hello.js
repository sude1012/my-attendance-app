export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify Functions!" }),
    headers: { "Content-Type": "application/json" },
  };
}
