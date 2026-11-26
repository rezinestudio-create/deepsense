# Making Owner Console changes visible to everyone

The Owner Console used to save products, keys and payment methods into `localStorage`.
That storage is per-browser, so only the owner saw edits.

This version stores the catalog in one shared Vercel Blob file. The public site reads it
from `/api/store`, and the Owner Console writes to it through `/api/owner`.

## Vercel setup (one time)

1. In the Vercel project, go to **Storage â†’ Create Storage â†’ Blob**.
2. Create a **Private** blob store and connect it to the project.
   - The SDK can use the automatically connected OIDC env vars (`BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN`), or
   - enable **Add a read-write token env var** so `BLOB_READ_WRITE_TOKEN` is added.
3. Add an environment variable:
   - `OWNER_PASSWORD` = the master password you want. **Recommended.**
   - If you skip this, the first login uses the legacy bootstrap password. Change it in the Owner Console immediately.
4. Commit/push these files and redeploy:
   - `package.json`, `package-lock.json`
   - `lib/store.js`
   - `api/store.js`, `api/owner.js`, `api/health.js`
   - the updated `storefront.js`

   With the Vercel CLI, run `vercel --prod` **from this folder** â€” the one that contains
   the `api/` and `lib/` directories. If the CLI deploys a different folder, the API
   routes will be missing and the Owner Console will show an error. Vercel detects
   `api/*.js` as functions automatically; no `vercel.json` is needed.

## Troubleshooting "Unable to reach the shared store"

0. If the build fails with `[unused_function]` / "pattern doesn't match any Serverless
   Functions", Vercel cannot see `api/*.js` at the project root. Check the repository:
   `api/health.js`, `api/owner.js`, `api/store.js` and `lib/store.js` must be at the top
   level of the repo, not inside an extra folder such as `deepsense/api/...`. Also clear
   Vercel's **Project Settings â†’ Root Directory** unless your repo really nests the site
   in a subfolder.
1. Open `https://deepsense.online/api/health` in a browser.
   - **`{"ok":true,...}`** â†’ functions are deployed. Go to step 2.
   - **404 / NOT_FOUND** â†’ the functions were not included in the deployment. In Vercel:
     - open the deployment â†’ **Functions** tab and confirm `api/store`, `api/owner` and
       `api/health` are listed;
     - check **Project Settings â†’ Root Directory** is the folder containing `api/`;
     - redeploy with `vercel --prod` from that folder and copy the deployment URL it prints;
     - make sure that deployment is the one aliased to `deepsense.online`.
2. If health works but `/api/store` returns 500, the Blob credentials are missing/wrong.
   Confirm the Blob store is connected to this project in **Production**, and that
   `BLOB_READ_WRITE_TOKEN` (or `BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN`) exists in
   **Project Settings â†’ Environment Variables**. Redeploy after changing env vars.
3. The Owner Console error text now includes the HTTP status, e.g. `HTTP 404` means
   missing function; `HTTP 500` means a server/Blob error; `HTTP 401` means a bad password.

## How updates propagate

- Every visitor fetches `/api/store` on load, every 15 seconds, and whenever the tab regains focus.
- Owner edits are written to Blob and become visible to all visitors on their next refresh/poll.
- License keys are private: `/api/store` never returns them. Only an authenticated owner request can read/write key inventory.

## Local development

Run `vercel dev` (not a plain static server) so `/api/store` and `/api/owner` work locally.
Pull env vars with `vercel env pull` first.

## Security note

`storefront.js` still contains a plaintext SellAuth API token and a Discord webhook URL in the
client-side checkout/reseller code. Anything shipped to the browser can be read by visitors.
Move those calls behind server-side Vercel functions and rotate the exposed credentials.

## Blob connection sync

The shared store uses the private Vercel Blob store connected to this project.
