# Stash

Saves uncommitted files.
These are tracked files either in staging area or repository.

**Stashing**

`git stash` stash changes
`git stash list` lists changes
`git stash show stash@{0}` shows content

`git stash apply` applies last stash
`git stash apply stash@{0}` applies given stash

`git stash --include-untracked` stashes tracked and untracked files , after stashing files are still untracked
`git stash --all` stashes all files , including git ignore files

**Naming**

`git stash save "something for later"` names stash
`git stash branch someName` makes a branch from stash
`git checkout someStashName -- someFileName` gets given file from given stash

**Removing**

`git stash pop` removes last stash , applies changes
`git stash drop` removes last stash
`git stash drop stash@{n}` removes nth stash
`git stash clear` removes all stashes
