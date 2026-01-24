# Repository Structure

This repository has been restructured with v1 and v2 folders:

## v1/ - Original Project (Preserved)
Exact copy of the original repository state before the v2 migration.
- `site/` - Original React site
- `data/pipeline/` - Original pipeline tools

## v2/ - New System
New pipeline and site with JSON-based data loading:
- `site/` - React app that loads bufos from JSON
- `pipeline/` - Automated sync pipeline using Gemini 3 Flash Preview (gemini-3-flash-preview)

## Workflows
GitHub Actions workflows are stored at the root level in `.github/workflows/`:
- `azure-static-web-apps-agreeable-water-09545c210.yml` - Azure deployment
- `sync-bufos.yml` - Daily bufo sync workflow (runs v2 pipeline)

