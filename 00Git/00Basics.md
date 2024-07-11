# Custom Configuration

**List Current Settings**

`git config --list --system` all users settings
`git config --list --global` all projects settings for one user
`git config --list --local` one projects settings for one user

**Configure Settings**

Set user name , email , diff view , tools.
`git config --global someSetting someValue` assigns given value to given setting
`git config --global user.name myName` sets myName as the user name
`git config --global user.email myEmail` sets myEmail as the user email

# Status

`git status` returns verbose info about current branch and modified files that are in staging area and untracked files
`git status -sb` returns list with prefixes ## current branch , M modified files in staging area , ?? untracked files

# Commit Info Via Relative Path

`HEAD` most recent commit , ultimate
`HEAD~1` 1st previous to most recent , penultimate
`HEAD~2` 2nd previous to most recent , ante penultimate

# Commit Log

`git log someFile` shows log of most recent commit for given file
`git log -2 someFile` shows log of 2 most recent commits of given file
`git annotate someFile` returns hash ID , Author , Date , Time , Lines , Contact

# Files

**Track Files**
`git status` returns list of untracked files
`git add .` adds all files for tracking
`git add someDir / someFile` adds given file for tracking , useful when you don't want to track or stage all files with changes , just the given one and you want it to have its own commit message
`git commit -m "some message"` commits tracked file

**Untrack Files**
`git reset` unstages all files from all directories
`git reset HEAD` unstages all files from commit directory
`git reset HEAD someDir` unstages all files from given directory
`git reset HEAD someDir / someFile` unstages given file

**Revert Changes**
`git checkout -- .` discards all changes to all files not yet staged
`git checkout -- someFile` discards changes not yet staged for given file

```bash
# discards changes to file that has already been staged
git reset HEAD someDir / someFile
git checkout -- someDir / someFile
```

**Revert To A Previous Commit**
`git checkout someHashID someFile` restores given commit
use this to revert back to an older commit
it actually makes a new commit using the older commit info

**Delete Files**
`git rm someFile` deletes given file
`git clean -n` returns list of untracked files
`git clean -f` permanently removes untracked files

**Ignore Files**
`.git ignore` make a file with this file extension and place in root directory , 
any names or file extensions put in this file will be ignored for tracking
`*.mpl` any file ending in `.mpl` will be ignored

# Branches

*master* is the main branch
`git branch` returns list of branches , indicates `*` as current branch

**Navigation**
`git checkout someBranch` moves to given branch
`git checkout -` moves to previous branch

`git checkout -b someBranch` makes new branch with given name , moves to new branch

# Repositories

**New**
`git init someRepository` makes a new empty repository
`git init` write this in the root of a directory you want to make into a repository , all of its sub directories and files will become part of the new repository

**Copy**

*clone* is the local copy of a repository

`git clone url` makes a local copy of a repository , url is the github or gitlab address or HHS key
`git clone url someName` renames cloned repository to given name , by default GIT gives cloned repositories the same name as source

*remote* is the original repository
if the files are hosted on github , bitbucket , gitlab then they are the remote and your local copy is the clone.

`git remote` returns list of remote repositories
`git remote -v` returns remotes urls

*origin* is the name of the remote that was cloned
This name is assigned automatically when the repository is cloned.

**Add**
`git remote add someName url` adds a new remote repository

**Delete**
`git remote rm someName` removes given remote repository

# Pull

Pulls most recent changes from remote repository and merges them onto your current local directory.

`git pull remoteName branchName` for example `git pull origin master`

# Push

Pushes committed changes from local repository and merges them onto remote repository.

`git push remoteName branchName` for example `git push origin master`

It's good practice to have branches in remote and local repositories have the same name.

Avoid potential overwriting when pushing by first pulling then pushing.
`git pull --no-edit origin master`