# Cloudflare Pages Deployment Guide

## Overview

This document outlines the process for deploying the ZenReact documentation to Cloudflare Pages using GitHub Actions.

## Prerequisites

- GitHub repository (already set up at lamtran2601/zenreact)
- Cloudflare account
- Cloudflare API token with Pages permissions

## Cloudflare Pages Setup

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to Pages
3. Click "Connect to Git"
4. Select the GitHub repository (lamtran2601/zenreact)
5. Configure build settings:
   - Framework preset: None (custom VitePress setup)
   - Build command: `pnpm install && pnpm docs:build`
   - Build output directory: `docs/.vitepress/dist`
   - Environment variables:
     ```
     NODE_VERSION: 18
     ```

## GitHub Actions Workflow

Create `.github/workflows/deploy-docs.yml` with the following content:

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - '.github/workflows/deploy-docs.yml'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          run_install: false

      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - name: Setup pnpm cache
        uses: actions/cache@v3
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install

      - name: Build Docs
        run: pnpm docs:build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: zenreact
          directory: docs/.vitepress/dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

## Required Secrets

Add the following secrets in GitHub repository settings:

1. `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
2. `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### Creating a Cloudflare API Token

1. Go to Cloudflare Dashboard
2. Navigate to "My Profile" → "API Tokens"
3. Click "Create Token"
4. Use "Custom Token" with the following permissions:
   - Account.Cloudflare Pages: Edit
   - Zone.DNS: Edit (if using custom domains)
5. Copy the token value and add it to GitHub secrets

### Finding Your Cloudflare Account ID

1. Go to Cloudflare Dashboard
2. Copy the Account ID from the bottom right of any page
3. Add it to GitHub secrets

## Post-Deployment Setup

### Custom Domain (Optional)

1. Go to Cloudflare Pages project
2. Click "Custom domains"
3. Add your domain
4. Update DNS settings as instructed

### Environment Variables

If needed, configure the following in Cloudflare Pages:

1. Go to project settings
2. Navigate to "Environment variables"
3. Add any required variables for both production and preview environments

## Continuous Deployment

The workflow will automatically:

- Deploy on pushes to main branch that affect docs
- Allow manual triggers via GitHub Actions UI
- Create preview deployments for pull requests

## Troubleshooting

Common issues and solutions:

1. Build failures

   - Check Node.js version compatibility
   - Verify pnpm installation
   - Review build logs in GitHub Actions

2. Deploy failures

   - Verify API token permissions
   - Check account ID correctness
   - Review Cloudflare Pages logs

3. Preview deployments not working
   - Verify GitHub token permissions
   - Check branch protection rules
   - Review GitHub Actions logs
