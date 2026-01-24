# bufo.fun

A searchable gallery of bufo memes, automatically synced and tagged.

## Repository Structure

This repository is organized into two versions:

### v1/ - Original Project (Preserved)
The original state of the repository before the V2 migration. This is kept as a reference and remains unchanged.

### v2/ - Current System
The active system with automated daily syncing and AI-powered tagging. See [v2/README.md](v2/README.md) for details.

**Key Features:**
- Daily automated sync from [all-the-bufo](https://github.com/knobiknows/all-the-bufo)
- AI-powered tagging using Gemini 2.0 Flash Experimental
- JSON-based data format for fast loading
- Searchable web interface with tag filtering

## GitHub Workflows

Workflows are stored at the root level in `.github/workflows/`:
- `azure-static-web-apps-*.yml` - Deployment to Azure
- `sync-bufos.yml` - Daily bufo sync (runs V2 pipeline)

## Quick Start

### Run V2 Site Locally
```bash
cd v2/site
npm install
npm start
```

### Run V2 Pipeline Locally
```bash
cd v2/pipeline
npm install
GEMINI_API_KEY=your_key TEST_MODE=true npm run sync
```

## Contributing

The V2 pipeline automatically processes new bufos from all-the-bufo. To skip a bufo or adjust tags, edit:
- `v2/pipeline/skip-list.json` - Bufos to skip
- `v2/site/public/bufo-data.json` - Existing bufo metadata

## License

This project is for fun and educational purposes.
