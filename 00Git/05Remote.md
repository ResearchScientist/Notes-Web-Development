# Remotes

*Remote*

Git repository stored off site.

*Origin*

Default name of remote you cloned from.

**View**

`git remote -v` displays all remotes

**Rename**

`git remote rename origin someNewName` renames origin to someNewName

# Fetch

`git fetch` pulls changes from remote , does not change local repository

# Pull

`git pull` pulls changes from remote , merges them with local branch
if origin is ahead , it will make a merge commit
if origin not ahead , it will make a fast forward

`git pull rebase` fetch , updates local branch to match upstream branch , replays any commits you made via rebase

# Push

`git push` sends local changes to remote

`git cherry -v` shows commits not yet pushed upstream
