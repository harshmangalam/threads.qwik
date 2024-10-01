## Contributing to threads.qwik

Thanks for your help in improving the project!

## Pull Requests

- Create your branch from main
- Make sure your branch is up to date with `main`
- Always create PR for `dev` branch.

Even tiny pull requests (e.g., one character pull request fixing a typo in documentation) are greatly appreciated. Before making a large change, it is usually a good idea to first open an issue describing the change to solicit feedback and guidance. This will increase the likelihood of the PR getting merged.

## Commits

We expect you to use the following format.

```
<commit_type>: <short summary>
  │                    │
  │                    └─> Summary. Not capitalized.
  │
  │
  │
  └─> Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory.

`<type>` must be one of the following:
build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)

- ci: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests

## Opening the Pull Request

Before opening a pull request, ensure everything functions correctly locally. You can do this by running just comply followed by just check.
