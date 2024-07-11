# Info

**Files**

`.git` data pertinent to Git is stored in this file, do not alter it

**Status**

`git status` returns verbose info about current branch and modified files that are in staging area and untracked files
`git status -sb` returns list with prefixes ## current branch , M modified files in staging area , ?? untracked files

**Diff**

Shows differences between current staged changes and the last committed changes.

`git diff` shows all repository differences
`git diff fileName` shows differences for given file
`git diff directory` shows differences for given directory

**Versions**

`r` version
`head` most recent commit
`git diff -r HEAD` shows differences between staged changes and most recent commit
`git diff -r HEAD somePath/someFile` shows differences for given file

**Commit**

`git add someFile` places file in staging area
`git commit -m 'some message'` saves staged changes and adds message

**Log**

`git log` history of all commits , `space` continue , `q` quit
`git log someDirectory` history of files added or deleted
`git log someDirectory/someFile` history of commits for file given

# Changelog

- `CHANGELOG.md` in root directory
- `git log --pretty="%cd - %s" --date=format:"%d %b %Y" > CHANGELOG.md` pipes commit messages into given file
- `git log --pretty="%cd - %s" --date=format:"%d %b %Y" >> CHANGELOG.md` appends commit messages to given file

- `git log --after="2021-03-01" --pretty="%cd - %s" --date=format:"%d %b %Y" >> CHANGELOG.md` appends commit messages committed on and after given date to given file
- `git log --before="2021-02-28" --pretty="<p>%cd - %s</p>" --date=format:"%d %b %Y" >> CHANGELOG.md` appends commit messages committed on and before given date to given file and adds p tags

- `git log --after="2021-03-01" --pretty="<p>%cd - %s</p>" --date=format:"%d %b %Y" >> CHANGELOG.md` appends commit messages committed on and after given date to given file and adds p tags

# Feature Branch Workflow

**Local Feature Branch**

- `git branch` list of all branches and current branch
- `git checkout -b somefeature` makes new local feature branch
- `git checkout somefeature` switches to feature branch
- `git add .` stages changes
- `git commit -am 'msg'` commits changes
- `git push -u origin somefeature` makes branch at remote
- `git push` pushes local feature commits to remote feature branch

**Local Main Branch**

- `git checkout main` switches to main branch
- `git merge somefeature origin` merges commits from remote feature branch onto main branch
- `git push` pushes local main branch commits to remote main branch

If you need to have newest changes from main branch in addition to feature branch changes.
- `git checkout somefeature` switches to feature branch
- `git pull origin main` pulls remote main branch changes into local feature branch
- `git push` pushes local feature commits to remote feature branch

**Delete Feature Branch**

After branch has been committed and merged it can be deleted. History is preserved.
- `git branch -d somefeature` deletes local feature branch
- `git push origin --delete somefeature` deletes feature branch from remote

# Tags

**Display**

`git tag` displays all tags
`git tag -l -n1` displays one line of msg for each tag

**Add*

`git tag -a v0.1.0 -m 'initial release' someHash` adds tag to given commit
`git push origin v0.1.0` pushes tag to remote
`git push origin --tags` pushes all tags to remote

# Local Python Server

Navigate to project root directory

`py -m http.server 8000` runs server at localhost:8000
`CTRL-c` stops server

# SSH Keys

`ls -al ~/.ssh` view existing keys
`ssh-keygen -t ed25519 -C githubemail` make new keys
`eval "$(ssh-agent -s)"` turn on agent
`ssh-add ~/.ssh/id_ed25519` add new keys

# Forked Remote

`git remote -v` shows current linked repositories
`git remote add upstream httpsaddressofrepositorytofork` add original repository as upstream , this is the original repository , not the fork of the original repository
`git remote -v` confirm upstream added

`git fetch upstream` gets newest changes from upstream
`git merge upstream/main` merges upstream to local main
`git push` pushes updated changes to your repository fork