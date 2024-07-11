# Branches

`git branch --merged main` displays branches merged with main
`git branch --no-merged main` displays branches not merged with main

# Files

`git show someCommit` shows commit and content
`git show someCommit --stat` shows files changed in commit
`git show someCommit:someFile` shows file from another commit

# Diff

**Display changes between staging area and repository.**

`git diff` displays unstaged changes
`git diff --staged` displays staged changes

**Display changes between commits.**

`git show someGitHash` returns git log and git diff for given commit , only need the 1st 5 characters of git hash
`git diff hashID1 .. hashID2` shows difference between given commits
`git diff HEAD .. HEAD ~ 1` shows difference between most recent commit and previous one

`git diff -r HEAD` compares all files to those in staging area
`git diff -r HEAD someDir/someFile` compares given file to latest commit

`cat someDir/someFile` displays updated changes after being committed

# Merge

`git merge sourceBranch destinationBranch` makes a new commit in the destination branch comprised of changes from source branch

**Fast Forward**

If no changes had been made to master then checked out branch is linearly merged back to master.

To avoid loosing history do no allow fast forward.
```git
git checkout master # moved head to main branch 
git merge --no-ff sourceBranch destinationBranch  # forces non linear commit
```

# Merge Conflicts

**Merge**
`git merge sourceBranch destinationBranch` makes a new commit in the destination branch comprised of changes from source branch

**Resolve Merge Conflict**
A conflict occurs when 2 branches make changes to the same line of code.

Step 1
`git merge sourceBranch destinationBranch` a conflict is found

Step 2
`git status` returns file name with merge conflict

Step 3
`nano someFile` opens editor for editing given file

Step 4
Edit content of opened file by deleting the text you do not want to keep
also delete both lines containing `>>> Destination` and `>>> Source`

```bash
 >>> Destination 
     text
 >>> Source
     text
```

Step 5
`git merge sourceBranch destinationBranch` merge the two branches

Step 6
`git commit -m "some message"` commit changes and document

**Reuse Recorded Resolution**

Useful when you want to apply the same solution to multiple files.

`git config rerere.enabled true` turns on function for project
`--global` add global flag to enable function for all projects

After you resolve a merge conflict , git records what you did.
Git automatically uses your solution for any other similar merge conflicts.

`git rerere diff` shows changes made

`git add someFile` adds fixed changes file
`git commit -m "some msg"` commits fixed changes

# References

![moving](00Git/Assets/reference-merges.png)
