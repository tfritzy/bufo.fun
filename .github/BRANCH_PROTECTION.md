# Branch Protection Configuration

To ensure code quality, the following branch protection rules should be enabled for the `master` branch:

## Required Status Checks

The following workflow must pass before merging:
- **TypeScript Build Check** (`typescript-build`)

## Configuration Steps

1. Go to repository Settings → Branches
2. Add a branch protection rule for `master`
3. Enable "Require status checks to pass before merging"
4. Select the status check: `typescript-build`
5. Enable "Require branches to be up to date before merging" (optional but recommended)

This ensures that all TypeScript code builds successfully before any PR can be merged.
