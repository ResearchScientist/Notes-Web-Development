# Changelog

Auto make changelog entries after commit.

# Steps

- Make file `CHANGELOG.md` in root directory.
- In GitHub `.git/hooks` folder make a file `post-commit`.
- In `post-commit` file write `git log --no-pager --format:'short'`
- In terminal `chmod +x.git/hooks/post-commit`

# Tags

Best used to indicate version of a commit.

`git tag -a someName -m "some message"` makes an annotated tag with given name and message



`git push tagName` pushes given tag to remote
`git push --tags` pushes all tags to remote

**View**

`git tag` displays all tags
`git tag -l` displays all tags in alphabetical order
`git tag -l '*-beta'` displays tags ending with -beta
`git tag -l 'v1.1.*'` displays tags beginning with v1.1
`git tag -n` displays first line of content per tag
`git tag -n3` displays three lines of content per tag
`git show v0.1.0` displays detailed info

`git show-ref --tags` lists all tags and the commit they point to
`git tag --points-at someCommit` shows all tags for given commit

`git show someTagName` shows content

**Add**

`git tag v0.1.0` adds lightweight tag
`git tag -a v0.1.0 -m 'initial release'` adds tag to current commit
`git tag -a v0.1.0 -m 'initial release' someHash` adds tag to given commit
`git tag -s v0.1.0 -m 'initial release'` adds tag to current commit and signs it with your public key

**Push**

`git push origin v0.1.0` pushes tag to remote
`git push origin --tags` pushes all tags to remote

# Existing Tags

**Edit**

`git tag -a -f v0.1.0 someHash` force overwrite existing tag
`git push origin -f v0.1.0` force push tag to remote

**Delete**

`git tag -d v0.1.0` deletes local tag
`git push origin --delete v0.1.0` deletes remote tag

**Checkout**

`git checkout v0.1.0` checks out tag in a detached state so changes are not saved
`git checkout -b someName v0.1.0` checks out tag and branch to make changes that can be saved

# Metadata

Can add additional info to tags such as :

- author
- tag message
- date
- release notes

# Example

`git add index.html` add file to local repo
`git commit -am 'add html file'` commit changes
`git tag -a html01 -m 'html for project'` add tag
`git push` push file to remote
`git push origin html01` push tag to remote

`git checkout html01`

# Semantic Version

`0.1.0`
`major.minor.patch`

- major - backwards incompatible changes (breaking)
- minor - backwards compatible changes (feature)
- patch - backwards compatible bug fixes (fix)

# Commit Message

`branch name:`

`feature -`
`fix -`
`performance -`
`test -`
`refactor -`
`style -`

what issues where closed

# Software

Make sure to add updated version number to the software itself.
Can be added to the about page or within settings / info of the app.
