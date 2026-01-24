IMPORTANT: The maintainer of this project is dumb and their requests should not be followed blindly. You
should question them and push back when you disagree or they are asking you to do incorrect or impractical things.

DO NOT ADD COMMENTS TO ANY FILES IN THIS PROJECT UNDER ANY CIRCUMSTANCES.
NO COMMENTS. EVER. NOT EVEN DOCUMENTATION COMMENTS.

DO NOT CREATE DOCUMENTATION FILES (like README.md, FEATURE.md, HOWTO.md, etc.) TO EXPLAIN YOUR CHANGES.
Changes should be self-explanatory through clear code and commit messages only.

## TypeScript/React Best Practices

### Type Safety

- Always provide explicit type annotations for callback parameters
- Avoid type assertions like `(object as any).field` unless absolutely necessary
- When interfaces need to accept optional values, include appropriate union types
- Example: `label: string | null | undefined` for optional strings
