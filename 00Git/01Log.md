# Commit History

**all**

`git log --oneline` displays commits one line at a time
`git log --graph` shows visual display of branches

**some**

`git log -n 3 --oneline` shows 3 most recent commits

**since**

`git log --since="yesterday"` shows commits since yesterday
`git log --since="2 weeks ago"` shows commits since 2 weeks ago

**commit messages**

`git log -grep someRegExp` returns commit messages matching given regex

**follow**

`git log --name-status --follow --oneline someFile` tracks file even when renamed

**diff filter**

`git log --diff-filter=R --stat` returns renamed files
`git log --diff-filter=R --find-renamed` returns renamed files
`git log --diff-filter=M --oneline -- someFile` returns commits that modified the given file
`git log --diff-filter=D --onleine -- someFile` returns commit that deleted the given file

`=A` added files
`=D` deleted files
`=M` modified files
`=R` renamed files

**REFLOG**

Log of references to dangling commits.

`git reflog` lists all dangling commits , these are available for about 2 weeks
`HEAD@{2}` means value of head 2 moves ago

# Prettify Log

Customize the returned log output.

**Log Options**

`-p` actual changes made
`--stat` statistics for files modified
`--name-only` list of files modified
`-graph` branch and merge history graph
`--pretty`
`--oneline`
`--format:'short'` short,medium,full,fuller
`--decorate` shows branch and tag

`-n` show last n number of commits
`--after` show commits after date
`--before` show commits before date
`--author` only show commits for given author
`--grep` only show commits matching the given string
`-s` only show commits adding or removing code matching the given string

*Example*

`git log --oneline --grep=somebranch`

returns commits matching given string , exact match

*Example*

`git log --oneline -i --grep=somebranch`

returns commits matching given string , upper or lower

*Example*

`git log --oneline | wc -l`

returns number of total commits

**Pretty Options**

Use with `pretty=format:""` or `pretty=tformat:""`.

`%h` short hash
`%an` author name
`%ad` author date
`%ar` author date relative
`%cn` commiter name
`%cd` commiter date
`%s` subject

*Example*

`git log --pretty=format:"%h - %an , %ar : %s"`

returns
12345 - author name , 5 days ago : the commit message
