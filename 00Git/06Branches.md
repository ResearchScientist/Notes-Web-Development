# Pointers

**HEAD**

HEAD points to the current branch.

`cat .git/HEAD` shows what HEAD is currently pointing to

Branch points to the current commit.

# Branches

`git branch` lists all branches , indicates which one head is pointing to

`git branch some_new_branch` makes a new branch but does not switch to it

`git checkout -b some_new_branch` makes new branch with given name , moves to new branch

`git show-ref --heads` lists all branches and the commit they point to

`git branch -vv` lists tracked branches

# Detached Head

When checking out a specific commit instead of a branch the head moves to that commit.
As soon as you checkout a different branch or commit the head points to the new SHA1.
This means there is no longer a reference to the original commit.

When in a detached state save your work by making a new branch.
`git branch someName lastCommit` you only need to give the last commit as all previous will go with it
