# Browser-Based Version Check Workflow

## Setup Browser Windows

1. **Arrange Browser Windows**
   ```
   +----------------------+----------------------+
   |        npmjs        |       GitHub        |
   | package page        | releases page       |
   |                     |                     |
   +----------------------+----------------------+
   |      Local Docs     |    Package Docs     |
   | markdown file       | official docs       |
   |                     |                     |
   +----------------------+----------------------+
   ```

## Quick Check Process

1. **NPM Check**

   - Open `https://www.npmjs.com/package/[package-name]`
   - Look for:
     - Latest version number (top of page)
     - Last publish date
     - Weekly downloads (package health)
     - Dependencies list

2. **GitHub Check**

   - Click GitHub link from npm page
   - Go to Releases tab
   - Review:
     - Latest release notes
     - Breaking changes
     - Migration guides

3. **Compare with Local**
   - Open local markdown file
   - Compare version numbers
   - Check lastUpdated date
   - Review version history section

## Example Workflow for Zustand

1. **Browser URLs Setup**

   ```
   Tab 1: https://www.npmjs.com/package/zustand
   Tab 2: https://github.com/pmndrs/zustand/releases
   Tab 3: Local markdown file
   Tab 4: https://docs.pmnd.rs/zustand/getting-started/introduction
   ```

2. **Information to Gather**

   ```yaml
   Package:
     name: zustand
     currentVersion: (from local docs)
     latestVersion: (from npm)
     lastPublished: (from npm)
     newBreakingChanges: (from GitHub)
   ```

3. **Quick Health Checks**
   - [ ] Weekly downloads trending
   - [ ] Recent GitHub activity
   - [ ] Open issues/PRs
   - [ ] Documentation updates

## Version Update Checklist

When a new version is found:

1. **Documentation Updates**

   - [ ] Update version in frontmatter
   - [ ] Update lastUpdated date
   - [ ] Update installation command
   - [ ] Add version history entry

2. **Breaking Changes**

   ````markdown
   ## Version History

   ```versions
   {
     "latest": "x.y.z",
     "breaking": [
       {
         "version": "x.y.0",
         "changes": [
           "Change 1",
           "Change 2"
         ]
       }
     ]
   }
   ```
   ````

   ```

   ```

3. **Feature Updates**

   - [ ] New APIs added
   - [ ] New examples needed
   - [ ] Updated best practices
   - [ ] Performance notes

4. **Resource Links**
   - [ ] Check all links still valid
   - [ ] Add new official resources
   - [ ] Update community resources

## Quick Commands for Terminal

```bash
# Open relevant files
code packages/react-app/docs/dependencies/[package].md

# Check git history of doc
git log -p packages/react-app/docs/dependencies/[package].md

# Compare with template
diff packages/react-app/docs/dependencies/_template.md packages/react-app/docs/dependencies/[package].md
```

## Examples

### Minor Version Update

When updating from 5.0.3 to 5.0.4:

```diff
- version: 5.0.3
+ version: 5.0.4
- lastUpdated: 2025-03-11
+ lastUpdated: 2025-03-12

- npm install zustand@5.0.3
+ npm install zustand@5.0.4
```

### Major Version Update

When updating from 5.x.x to 6.0.0:

```diff
- version: 5.0.3
+ version: 6.0.0
- lastUpdated: 2025-03-11
+ lastUpdated: 2025-03-12

  "breaking": [
+   {
+     "version": "6.0.0",
+     "changes": [
+       "Breaking change description",
+       "Migration steps"
+     ]
+   },
    {
      "version": "5.0.0",
      ...
    }
  ]
```

## Tips for Efficient Updates

1. **Browser Extensions**

   - Install JSON formatter
   - Install Markdown previewer
   - Use split screen view

2. **Keyboard Shortcuts**

   - ⌘+T: New tab
   - ⌘+[1-9]: Switch tabs
   - ⌘+F: Find on page
   - ⌘+L: Focus address bar

3. **Time-Saving Practices**
   - Keep common URLs bookmarked
   - Use browser profiles per project
   - Save search queries for GitHub

## Common Pitfalls to Avoid

1. **Version Numbering**

   - Don't mix release candidates (rc) with stable
   - Watch for pre-releases vs stable
   - Check peer dependencies

2. **Content Management**

   - Don't remove old breaking changes
   - Keep example code updated
   - Maintain consistent formatting

3. **Resource Links**
   - Verify links before committing
   - Update deprecated resources
   - Add migration guides when available

## Regular Maintenance Schedule

- Daily: Quick npm version check
- Weekly: Deep GitHub review
- Monthly: Full documentation audit
- Quarterly: Resource link verification

Remember: Consistency and accuracy are more important than speed. Take time to verify all changes before committing updates.
