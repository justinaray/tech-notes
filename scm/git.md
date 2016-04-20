# Git Notes

# Basic Concepts/Commands

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

git diff origin/master path/to/local/file  // diffs a file from another branch (even remotes!) with a local file
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
