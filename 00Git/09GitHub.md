# Github Forks

Copy of a repository stored on your github account. (may only be readable)
You can clone your forks to your local computer. (now is writable)

# Github Pull Requests

After making changes to forked repository send a pull request to maintainer of original repository.

**Upstream**

In order to have most recent copy of a forked repository , set up an upstream remote.

`git remote add upstream urlToOriginalRepository` sets up cloned repository as upstream

Now you can fetch changes from upstream after you forked the repository.

*Good Practice*

Look for a CONTRIBUTING file in the project root.

Prior to opening a pull request.
- clean local history
- test local code
- pull upstream changes , best with rebase

After opening a pull request.
- Detail your changes
- Link to open issues that your code might fix

If you are the owner of a project it is best to merge pull requests into master instead of rebasing them into master. This maintains history.
