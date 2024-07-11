# Fixing Errors

**Checkout**

`git checkout someBranch` warns if data will be overwritten
`git checkout --someFile` overwrites working area files with staging area files , no warning
`git checkout someCommit --someFile` overwrites files & directories in working area & staging area to match commit , no warning

**Restore Deleted File**
`git checkout someDeletingCommit^ someFile` restores file , overwrites files & directories in working & staging areas , no warning

**Reset**

for commits moves head , optionally modifies files
for file paths does not move head , modifies files

Do not use for shared repositories.

`git reset --mixed HEAD~` moves head to previous commit , copies files to staging area
`git reset --soft HEAD~` moves head to previous commit
`git reset --hard HEAD~` moves head to previous commit , copies files to staging area & working area , destructive

`git reset -- someFile` head doesn't move , copies and unstages given file

*Undo Reset*

`git reset ORIG_HEAD` undoes the just performed reset

**Revert**

Use for undoing a commit that has already been shared.
Use with shared repositories.

`git revert someCommit` makes a new commit which is opposite of the given commit

# Tidy Workspace

**Git Clean**

Deletes untracked files from working area , destructive.

`git clean --dry-run` shows what files will be deleted
`git clean -d --dry-run` shows what directories will be deleted

`git clean -d -f` deletes directories and files

# Amend

`git commit --amend` makes a copy of previous commit + new changes

Use when you forgot to add something to a commit.

```bash
git commit -m "changed something" # forgot to add txt file
git add someFile.txt              # added file
git commit --ammend               # ammends file to previous commit
```

Since the ammend makes a copy of the previous commit and adds changes , it will have a new SHA1. The previous commit will be garbage collected.

# Rebase

Makes changes to history.
Gives a commit a new base.
Useful for avoiding messy merge commit histories.
Do not rebase public shared repositories.

`git rebase master` rewinds head to master , makes a copy of current commit , and sorta fast forwards

**Edit**

While rebasing commits can be edited, combined, reordered, inserted, removed.

`git rebase -i someCommit^`opens interactive editor
- pick - keep commit
- reword - keep commit , change message
- edit - keep commit , change more than message
- fixup - combine commit with previous one , keep previous message
- exec - run this command on previous commit
- drop - removes commit

**Split**

Splits a large commit into smaller commits.

```bash
git reset HEAD^
git add
git commit
git rebase --continue
```

Repeat `git add` & `git commit` until the working are is clean.

**Tests**

`git rebase -i -exec "run-tests" someCommit` runs test after every commit applied , stops when test fails

**Stop**

`git rebase --abort` stops currently running rebase

*Good Practice*

Make a copy of branch prior to rebasing.
`git branch myBranchCopy` makes a copy without switching to it

If rebase was successful but was not what you intended.
`git reset myBranchCopy` brings back your copy of original branch
