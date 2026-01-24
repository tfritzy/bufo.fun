# Bufo.fun V2

This is the V2 version of bufo.fun with automated daily syncing from [all-the-bufo](https://github.com/knobiknows/all-the-bufo).

## Structure

- `site/` - React web application that displays bufos from JSON data
- `pipeline/` - Automated sync pipeline that tags and processes new bufos

## Pipeline

The pipeline runs daily via GitHub Actions (workflow at `/.github/workflows/sync-bufos.yml`).

### What it does:
1. Clones the all-the-bufo repository
2. Compares against existing bufos in `site/public/bufo-data.json`
3. For new bufos:
   - Uses **Gemini 3 Flash Preview** (`gemini-3-flash-preview`) to analyze the image and filename
   - Determines if it should be skipped (e.g., tiling bufos like bigbufo_0_0.png)
   - Assigns appropriate tags from the known tag list
   - Creates a small version for thumbnails
   - Adds to the JSON data file
4. Commits and pushes changes back to the repository

### Local Development

```bash
cd pipeline
npm install

# Run in test mode (processes max 10 bufos)
GEMINI_API_KEY=your_key TEST_MODE=true npm run sync

# Run in production mode (processes all new bufos)
GEMINI_API_KEY=your_key TEST_MODE=false npm run sync
```

## Site

The site loads bufo data from `site/public/bufo-data.json` and displays them in a searchable grid.

### Local Development

```bash
cd site
npm install
npm start
```

The site will open at http://localhost:3000

## Model Information

The pipeline uses **Gemini 3 Flash Preview** (`gemini-3-flash-preview`), which is excellent for:
- Image analysis
- Understanding context from filenames
- Consistent tag generation
- Detecting tiling patterns

## Configuration

- `pipeline/skip-list.json` - List of intentionally skipped bufos with reasons
- `site/public/bufo-data.json` - Main data file with all bufo metadata
- Known tags are defined in `pipeline/sync-bufos.ts`
