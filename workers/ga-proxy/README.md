# ga-proxy

First-party reverse proxy for GA4, so tracking requests go to
`https://stats.signapps.si/m/...` instead of Google domains.

Deploy (needs a Cloudflare account, `signapps.si` zone on Cloudflare):

```sh
cd workers/ga-proxy
npx wrangler login
npx wrangler deploy
```

Then set the GitHub Actions **variable** `GA_PROXY_URL` to
`https://stats.signapps.si/m` (must match `PATH_PREFIX` in `wrangler.toml`) and
redeploy the site. Verify in DevTools -> Network that `lib.js` and `g/collect`
are requested from `stats.signapps.si`, and check geography in GA4 Realtime.

Allowed routes only: `/m/lib.js`, `/m/g/collect`, `/m/j/collect`; requests must
carry the configured measurement ID.
