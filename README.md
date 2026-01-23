# bufo.fun

A bufo emoji/sticker management and sync system.

## GitHub Actions Workflows

### Sync Bufos Workflow

The **Sync Bufos** workflow automatically syncs bufo images from the [all-the-bufo](https://github.com/knobiknows/all-the-bufo) repository.

#### Running the Workflow Manually

You can manually trigger this workflow from the GitHub Actions UI:

1. Go to the **Actions** tab in the GitHub repository
2. Select **"Sync Bufos from all-the-bufo"** from the workflows list
3. Click **"Run workflow"** button
4. Choose the test mode option:
   - **true** (default): Process at most 10 new bufos (recommended for testing)
   - **false**: Process all new bufos

#### Test Mode

When `test_mode` is set to `true`, the workflow will:
- Process a maximum of 10 new bufos
- Useful for testing the pipeline without processing the entire backlog
- Prevents excessive API usage during testing

#### Automatic Scheduling

The workflow also runs automatically:
- Daily at 2:00 AM UTC
- In test mode by default to limit processing

#### Requirements

The workflow requires the following secret to be configured:
- `GEMINI_API_KEY`: API key for Google Gemini (used for AI-powered image tagging)

## Project Structure

- `v1/`: Version 1 of the site and pipeline
- `v2/`: Version 2 of the site and pipeline (current)
- `.github/workflows/`: GitHub Actions workflow definitions
