# Git Notes

# Basic Concepts/Commands

## Update/Fetch

`git fetch` // updates objects and refs from another repository

`git pull` // fetch and then merge into your current branch

## Branching

`git branch` // Utils for working with branches

Useful options/switches:
* -a // list all branches
* -r // list remote branches
* -vv // show remote tracking information
* -d, --delete
* -D // delete with Force
* --merged // list other branches merged into the current branch

Ex: `git branch <newBranch>` // Create a new branch from the current head


## Checkout

Switches to a branch

1.  `git checkout <branch>` // checkout a branch to your staging area

1.  `git checkout -b <branch>` // create a new branch based on your current checked out branch (HEAD) and checkout/switch to that branch

1.  `git checkout -b feature/<ticketNumber>_<featureName> [origin/develop]`  // Create a new feature branch off of develop (git-flow model)

# Working with Remotes

Remotes are remote repos used for team collaboration.  Typically they are used for your write-access remote repository (Commonly named `origin`) and the base repository you forked from in the github/oss model (Commonly called `upstream`)

## Update Remote Branches

git remote update <branchName> -p // Update list of remote's branches; prune deleted branches

## Working with Forks:

1. git remote add upstream https://github.com/whoever/whatever.git
1. git fetch upstream (Update the upstream repo)
1. git checkout <localBranch>
1. git rebase upstream/<targetBranch>
