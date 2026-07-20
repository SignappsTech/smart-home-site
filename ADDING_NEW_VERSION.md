# Adding a new site version

This repo is a pnpm workspace of **completely separate Next.js sites**, one per
design version, under `sites/`:

```
sites/
├── v1/   ← current production site (package name: site-v1)
└── v2/   ← experiment (package name: site-v2)
```

Each version is a full, standalone Next.js app — its own `package.json`,
`src/`, `public/`, Tailwind/TypeScript configs, and env files. Editing one
version never affects another. When we've compared them, the winner ships to
signapps.si.

## Create a new version

From the repo root:

```sh
pnpm new-site v3        # clones sites/v1 → sites/v3
pnpm install            # registers the new workspace package
```

To start from a different base, pass it as the second argument:

```sh
pnpm new-site v4 v2     # clones sites/v2 → sites/v4
```

The script (`scripts/new-site.mjs`) copies everything except `node_modules`
and build output, and renames the package to `site-<name>`.

## Run a version

```sh
pnpm dev                              # runs site-v1 (default)
pnpm --filter site-v3 dev             # runs a specific version
pnpm --filter site-v3 dev -- -p 3001  # …on another port, to compare side by side
```

## Check / build

```sh
pnpm --filter site-v3 typecheck
pnpm --filter site-v3 test
pnpm --filter site-v3 build      # static export → sites/v3/out
```

Root-level `pnpm lint` / `typecheck` / `test` run across **all** versions.

## Ship the winner

Deployment is controlled by one line in
[.github/workflows/deploy.yml](.github/workflows/deploy.yml):

```yaml
env:
  PROD_SITE: v1 # which sites/<name> variant deploys to signapps.si
```

Change it to the winning version and push to `prod`. Optionally update the
root `package.json` `dev`/`build` scripts to point at the same version.

## Remove a version

Delete its folder and re-sync the lockfile:

```sh
rm -rf sites/v3
pnpm install
```
