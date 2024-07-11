# Areas

**Working Area**

Contains untracked files. These files are not tracked by git.

**Staging Area**

Contains files ready to be commited.

`git ls-files -s` lists SHA1 and file names

`git add someFile` adds file to staging area
`git rm someFile` removes file from stagin area
`git mv someFile` renames file in the staging area

`git add -p` adds files to staging area in hunks interactively

![moving](00Git/Assets/areas.png)

**Repository**

Contains all commits. Tracked by git.

# Data Storage

**SHA1**

Key that stores the encrypted data. It is a 40 digit hexadecimal number.
Points to a specific commit.

**Structure**

`tree .git` displays a tree view of git directory contents.

**Commit**

Is a snapshot that contains author , date , message.

`git cat-file -p someSHA1` displays content of commit , only first 5 digits of SHA1 are needed
