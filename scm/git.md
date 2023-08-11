# Git Notes

# Git Primitives

Object:
    Some serialized, compressed content and an ID (the SHA-1 hash) used for addressing
Tree:
    A recursive structure of blobs (a git object, filename, metadata) and other trees stored by reference
    Storing references to other trees is what allows git to track entire objects (files and dirs) and history as opposed to just file deltas while remaining efficient.
    Trees are internally constructed when you use the staging area and git user level api, git add.
Commit:
    Stores a tree, it's parent commits (if any), and metadata (the author and committer info, timestamp, message, etc) under a new object and sha
    Commits are the way that git stores history of a project over time via the parent commit refs.
References (Refs):
    User-friendly names/aliases which are pointers to git hashes
    Refs are simple files stored in .git/refs that point to a sha
    Refs make it easy to work with git objects/trees/commits without remembering hashes

    Types of References: branches, tags, remotes

        branch:
            A reference to a sha that is the tip of commit chain.
            This reference will be moved as you work with the branch so that it always stores the tip
        tag:
            annotated:
                Contains a ref to a base object (usually a commit), message, tagger, and other metadata in a new object. 
                Stored in .git/refs/tags
                Like a branch reference, but it usually points to a single commit and it doesn't move.
            lightweight:
                Just a simple alias to a commit for simple use
        Remote:
            A named reference to another git repository.
            Ex: /.git/refs/origin
                HEAD
                // other refs in that origin

    the HEAD:
        The pointer to your current working object (checkout)
        This usually is a symbolic link to a branch (like master or develop)
        If you checkout a specific sha, your head will be that SHA and will be in a detached HEAD state
        stored in .git/HEAD

# Basic Concepts/Commands

![Git Command Overview](http://assets.osteele.com/images/2008/git-transport.png)

## Config

show/view settings globally/per-repo

### Examples
```
git config --list // list your current settings (directory/repo sensitive)

git config --global user.name 'user.name' // Globally set your user name

git config --global user.email 'user@example.com' // Globally set your email

git config --global alias.ll log --one-line // Create an alias ll

git config --global core.editor 'atom-beta --wait' // Set a custom editor

git config url."https://github.com/".insteadOf git@github.com: // Use https instead of SSH for github

git config url."https://<username>@bitbucket.org/".insteadOf git@bitbucket.org: // Use https instead of SSH for bitbucket
```

## Update/Fetch

Updates objects and refs from another repository

```
git fetch // updates objects and refs from another repository

git pull // fetch and then merge into your current branch

git pull --rebase // pull but rebase instead of merge

git fetch --tags [--force] // fetch remote including remote tags (use force to overwrite local, conflicting tags)
```

## Branching

Utils for working with branches

### Useful options/switches

| Switch | Description |
| --- | --- |
| -a | list all branches |
| -r | list remote branches |
| -vv | show remote tracking information |
| -d, --delete | deletes the branch |
| -D | delete with Force |
| --merged | list other branches merged into the current branch |

### Examples

```
git branch <newBranch> // Create a new branch from the current head

// Branch Cleanup

git fetch -p // Prune your local cache of deleted remote branches

git branch --merge // show branches that are fully merged into your current branch

git branch -d <branchName> <branchName2> ... <branchNameN> // Delete local branches
```

## Checkout

Switches to a branch

### Examples

```
git checkout <branch> // checkout a branch to your staging area

git checkout -b <branch> // create a new branch based on your current checked out branch (HEAD) and checkout/switch to that branch

git checkout -b feature/<ticketNumber>_<featureName> [origin/develop]  // Create a new feature branch off of develop (git-flow model)

git checkout <remote-branch-name>  // Shortcut to check out a remote branch as a local branch.
// Notes: Remote name not used; Only works if you have one remote
```

## Diff

View differences between stagging, working, and refs in git.  Can view across branches, etc.

### Useful options/switches

| Switch | Description |
| --- | --- |
| --name-only | show just file names |
| -b | ignore most whitespace |
| -w | ignore all whitespace |
| --diff-filter | filter diff results by change type |

### Version Grammar
* [baseRef]~[n] The (optional nth) parent of a baseRef (head by default) (same branch)
* [baseRef]^[n] The (nth) parent of a baseRef (head by default) (but follows merges)
* <branchName>@{upstream}, (@{u} alias) The upstream/tracking branch of the specified branch (defaults to current)
* https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection#Ancestry-References

### Comparison Mode
* ref..ref1 (Default - same as space) Standard/Two-way diff of heads of branches
* ref...ref Three-way merge of the two branches

### Examples

```
git diff // show what's not staged

git diff [--cached|--staged] // show what's staged for commit

git diff <beforeHash>..<afterHash> // diff two commits

git diff <hash>[[..]head] // show changes between hash and head

git diff <hash1>..<hash2> path/to/file // diff changes to a file between hash1 and hash2

git diff origin/master path/to/local/file  // diffs a file from another branch (even remotes!) with a local file (Note: head is implied as the comparison point)

git diff --diff-filter=M // Only show modified files in diff

git diff @{u} head // Diff of changes on head compare to remote

git diff master@{u}...myBranch // Similar to a PR diff of myBranch onto master.  Assumes `git fetch` has been run.
```

## Log

Show repo history

### Useful options/switches

| Switch | Description |
| --- | --- |
| --oneline | Show commit on a single line; clip comment |
| --reverse | Reverse the listing |
| --&lt;num&gt; | number of commits to show |
| --all | show remote commits too |
| --grep=&lt;searchTerm&gt; | grep the commits |
| --author=&lt;searchTerm&gt; | filter commits by author (email, username, etc) |
| --not <branch|commit> | exclude commits in the specified branch, commit, etc. |
| --graph | Show branches graphically (merge commits, etc) |
| --no-pager | Print output directly without pager (Generic git option but very useful in log outputs)
| --pretty | Customizable format string

### Examples

```
git log // show project history in pager

// Filtering

git log --author=torvalds // Show Linus's commits

git log --grep=foo // Show commits containing "foo"

git log head --not develop // Show commits on your current head/branch that have not been made in develop

// Formatting

git log --oneline -20 // show the last 20 commits with a one line comment

git --no-pager log --oneline -20 // print the last 20 commits straight to stdout without a pager

git log --graph --oneline -20 // show the last 20 commits graphically

# Fetch remote tags first (use --force to override local)
git fetch --tags
# customized log display "<hash> <isoAuthorDate> <authorEmailAddr> <subject> (<tags, refs>) [<committer>]"
git log --all --pretty="%h %aI %ae %s (%d) [%ce]"
```

## Show

Show various types of objects (commits, files on other branches, etc.)

### Examples

```
git show <hash> // Show the commit/diff at hash

git show master:index.js // Cat the index.js file on the master branch
```

## Stash

Stash away your working/staged files for later

### Useful options/switches

| Switch | Description |
| --- | --- |
| -u | Stash working files |
| `save <message>` | Stash with a name/desc |

### Examples

```
git stash [save] // saves your work

git stash save "useful description" // stashes your work with a name/desc

git stash -u // saves your work; including working files

git stash list // list your stashes

git stash pop // apply the most recent stash to your current branch
```

## Updating commits

Update a local commit's message or contents.  Technically it replaces the last commit.

### Useful options/switches

| Switch | Description |
| --- | --- |
| `-C <hash>` | Reuse the specified hash's commit msg |

### Examples

```
git add -A // Optionally stage any changes to add to the commit
git commit --amend // Adds staged files to the last commit.  Opens editor to provide message

git add -A // Optionally stage any changes to add to the commit
git commit --ammend -C HEAD // Adds staged files to the last commit.  Use head's message for commit
```

## Merge

Merge (Join) a development history (branch/commit/tag/etc) into another

### Useful options/switches

| Switch | Description |
| --- | --- |
| --no-commit | Perform the merge but skip the auto-commit (Note: will commit if it can fast-forward) |
| --no-ff | Create a merge commit even if branch could be fast-forwarded |

### Examples

```
git merge develop // Merge develop into your current branch

git merge --no-commit --no-ff develop // Merge develop into your current branch but hold commit for after inspecting the merge
```

## Rebase

Re-apply your change(s) at the end of a base branch to maintain a linear history.

**IMPORTANT**: _Never rebase a public branch shared by multiple people_

### Useful options/switches

| Switch | Description |
| --- | --- |
| -i | Interactive mode.  Lets you select which commits to keep, squash, etc. |

### Examples

```
git rebase -i develop // Replay your current branch changes onto develop
// Use editor to select which commits to keep, squash, etc.
// The first commit must always be kept
// You will have an opportunity to set the final comment afterwards

// If any conflict are encountered, you'll have to deal with the conflicts and continue the rebase
git rebase --continue

git push --force
// You'll have to force push additional rebased commits to your remote to update PRs.
// Never do this to a shared branch!
```

### Rebase a branch that has merge commits

Have a branch you want to rebase but it already contains merge commits?
This process will let you perform a poor man's rebase that will squash the commits and "rebase" on top of your target branch.  You don't have the opportunity to select the commits to squash, but it's easier than manually addressing merge conflicts introduced by the merge commits.

```sh
git checkout <target-branch>
git pull
git checkout -b <tmp-working-branch>
git merge-base <target-branch> <branch-needing-rebased>
git diff --no-color <merge-base-sha> <branch-needing-rebased> > diff
git apply diff
rm diff
git add -A
git commit --author='Orig Author Name <original-author-email@example.com>'
git push origin <tmp-working-branch>:<branch-needing-rebased> --force-with-lease
```

Instructions source from Tom de Bruijn's App Signal [Blog Post](https://blog.appsignal.com/2016/09/27/git-rebasing-strategies.html)

## Reset

Reset current head to the specified branch, commit, etc

### Useful options/switches

| Switch | Description |
| --- | --- |
| -hard | reset both the index and working tree |
| -soft | move head to the specified state, but leave staged and working files |

### Examples

```
git reset --hard head // Undo your work on the current branch and reset to the last commit state
```

## Clean

Remove untracked files/directories from the working directory

### Useful options/switches

| Switch | Description |
| --- | --- |
| -n, --dry-run | Show what would be deleted from working tree |
| -d | Remove directories as well |
| -f | Force the delete.  Necessary if `clean.requireForce` is true |


### Examples

```
git clean -df // Also remove directories; force
```

## Revert

Reverts previous commit(s)

Useful if those changes have been previously pushed to a public branch and cannot be undone via local methods.

### Useful options/switches

| Switch | Description |
| --- | --- |
| -n, --no-commit | Revert the commit, but don't commit it yet |
| -e | Edit the revert commit message (default if run from cli) |

### Examples

```
git revert <hashToClobber> // Undo <hashToClobber> and commit the change.  Commit comment editor will open
git revert --no-commit <hashToClobber> // Undo <hashToClobber> but don't initiate a commit
```

# Working with Remotes

Remotes are remote repos used for team collaboration.  Typically they are used for your write-access remote repository (Commonly named `origin`) and the base repository you forked from in the github/oss model (Commonly called `upstream`)

## Tracking Branches

Tracking branches allow a local and remote branch to work together.  It will enable you to pull in changes from a remote to your local branch, push your changes up, and protect you from out of band pushes.
Git (specifically git clone and git branch) will often do a lot of the remote setup for you.  However, when creating a new branch, you will have to set up a remote tracking branch.

`git push --set-upstream <remoteName> <branchName>`  // Push the current branch and set it as the named tracking branch.

### Examples

```
git push --set-upstream origin feature/ISSUE1_short-desc-of-change
```

## Update Remote Branches

`git remote update <branchName> -p` // Update list of remote's branches; prune deleted branches

## Working with Forks

Typically in an OSS model, you will not have direct write access to the target repo.  In this model, you will make a server-side copy of the repository (called a fork) and then make commits, branches, etc. on that remote repository.  After rebasing with the original, target repository, you will PR from your forked repository.

1. git remote add upstream https://github.com/whoever/whatever.git
1. git fetch upstream (Update the upstream repo)
1. git checkout <localBranch>
1. git rebase `upstream/<targetBranch>`

# Reflog

The Reflog is a local repository of changes that can be used to recover even destructive changes (e.g. deletes, resets).  The reflog is local only and is never pushed to remotes.

# Cleaning up merged branches

```bash
# get latest
git fetch
git checkout main
git reset --hard @{u}
# Remove merged branches - not matching key branches (e.g. main and develop for gitflow)
git branch --merged main | grep -v -e '^\s*\(main\|develop\)\s*$'
```
