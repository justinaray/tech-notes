# Git Notes

# Basic Concepts/Commands

## Config

show/view settings globally/per-repo

### Examples
```
git config --list // list your current settings (directory/repo sensitive)

git config --global user.name 'user.name' // Globally set your user name

git config --global user.email 'user@example.com' // Globally set your email

git config --global alias.ll log --one-line // Create an alias ll

git config --global core.editor 'atom-beta --wait' // Set a custom editor
```

## Update/Fetch

Updates objects and refs from another repository

```
git fetch // updates objects and refs from another repository

git pull // fetch and then merge into your current branch

git pull --rebase // pull but rebase instead of merge
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
```

## Diff

View differences between stagging, working, and refs in git.  Can view across branches, etc.

### Useful options/switches

| Switch | Description |
| --- | --- |
| --name-only | show just file names |
| -b | ignore most whitespace |
| -w | ignore all whitespace |

### Version Grammar
* [baseRef]~[n] The (optional nth) parent of a baseRef (head by default) (same branch)
* [baseRef]^[n] The (nth) parent of a baseRef (head by default) (but follows merges)
* https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection#Ancestry-References

### Examples

```
git diff // show what's not staged

git diff [--cached|--staged] // show what's staged for commit

git diff <beforeHash>..<afterHash> // diff two commits

git diff <hash>[[..]head] // show changes between hash and head

git diff <hash1>..<hash2> path/to/file // diff changes to a file between hash1 and hash2

git diff origin/master path/to/local/file  // diffs a file from another branch (even remotes!) with a local file (Note: head is implied as the comparison point)
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
| --graph | Show branches graphically (merge commits, etc) |

### Examples

```
git log --oneline -20 // show the last 20 commits with a one line comment

git log --graph --oneline -20 // show the last 20 commits graphically

git log --author=torvalds // Show Linus's commits

git log --grep=foo // Show commits containing "foo"
```

# Working with Remotes

Remotes are remote repos used for team collaboration.  Typically they are used for your write-access remote repository (Commonly named `origin`) and the base repository you forked from in the github/oss model (Commonly called `upstream`)

## Tracking Branches

Tracking branches allow a local and remote branch to work together.  It will enable you to pull in changes from a remote to your local branch, push your changes up, and protect you from out of band pushes.
Git (specifically git clone and git branch) will often do a lot of the remote setup for you.  However, when creating a new branch, you will have to set up a remote tracking branch.

`git push --set-upstream <origin> <remoteBranch>``  // Set up a remote tracking branch and push to it.

Ex: `git push --set-upstream origin feature/ISSUE1_short-desc-of-change`

## Update Remote Branches

`git remote update <branchName> -p` // Update list of remote's branches; prune deleted branches

## Working with Forks

Typically in an OSS model, you will not have direct write access to the target repo.  In this model, you will make a server-side copy of the repository (called a fork) and then make commits, branches, etc. on that remote repository.  After rebasing with the original, target repository, you will PR from your forked repository.

1. git remote add upstream https://github.com/whoever/whatever.git
1. git fetch upstream (Update the upstream repo)
1. git checkout <localBranch>
1. git rebase upstream/<targetBranch>
