// Lightweight diagnostic route. It does not touch Blob storage, so a 200 here
// means the Vercel Functions are deployed even if the store itself is failing.
export function GET() {
  return new Response(
    JSON.stringify({ ok: true, service: 'deepsense-shared-store' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0'
      }
    }
  );
}
