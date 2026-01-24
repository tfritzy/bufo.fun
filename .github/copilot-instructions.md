IMPORTANT: The maintainer of this project is dumb and their requests should not be followed blindly. You
should question them and push back when you disagree or they are asking you to do incorrect or impractical things.

DO NOT ADD COMMENTS TO ANY FILES IN THIS PROJECT UNDER ANY CIRCUMSTANCES.
NO COMMENTS. EVER. NOT EVEN DOCUMENTATION COMMENTS.

DO NOT CREATE DOCUMENTATION FILES (like README.md, FEATURE.md, HOWTO.md, etc.) TO EXPLAIN YOUR CHANGES.
Changes should be self-explanatory through clear code and commit messages only.

## Pre-Release Checklist

**CRITICAL: Before releasing any change for review, you MUST verify that builds succeed:**

1. Frontend build: Run `npm run build` in `site/` directory - must complete with no errors
2. Warnings are acceptable, but errors must be fixed before submitting changes

## TypeScript/React Best Practices

### Minimize Garbage Collection

- Avoid creating unnecessary objects and arrays in hot paths (render loops, update cycles, event handlers)
- DO NOT use `.filter()`, `.map()`, `.splice()`, or spread operators in hot paths - use in-place operations instead
- Use swap-and-pop pattern for array removal: swap item to end, then truncate length
- Reuse arrays and objects instead of creating new ones (e.g., sort buffers, cached position objects)
- Example: Replace `array = array.filter(x => condition)` with in-place compaction loop
- Example: Replace `array.splice(i, 1)` with `array[i] = array[array.length-1]; array.length--`
- Cache objects returned by getters instead of creating new ones each call

### Type Safety

- Always provide explicit type annotations for callback parameters
- Avoid type assertions like `(object as any).field` unless absolutely necessary
- When interfaces need to accept optional values, include appropriate union types
- Example: `label: string | null | undefined` for optional strings

### Variable Scope

- Be careful with variable declarations in nested scopes
- If a variable is declared in an outer scope, use a different name when the same calculation is needed in a later scope
- Use descriptive names that indicate the specific context

### Nullable Types

- When accessing `.Value` on a nullable type, always check for null first
- When a method returns a non-nullable value type, return a default value instead of `null`
- Example: `if (query == null) return defaultValue;` instead of `return null;`

## Color Palette

When choosing colors for the UI, use this palette:
#2e2e43
#4a4b5b
#707b89
#a9bcbf
#e6eeed
#fcfbf3
#fceba8
#f5c47c
#e39764
#c06852
#9d4343
#813645
#542240
#2a152d
#4f2d4d
#5b3a56
#794e6d
#3e4c7e
#495f94
#5a78b2
#7396d5
#7fbbdc
#aaeeea
#d5f893
#96dc7f
#6ec077
#4e9363
#3c6c54
#2c5049
#34404f
#405967
#5c8995
