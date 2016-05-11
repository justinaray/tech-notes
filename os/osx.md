# OS Customization

* Enable button keyboard nav in dialogs (Prefs)
  * Prefs -> Keyboard -> Shortcuts -> Check `All controls`
  * `defaults write NSGlobalDomain AppleKeyboardUIMode -int 2`
* Remove dock animation
```
defaults write com.apple.dock autohide -bool true // Hide the dock
defaults write com.apple.dock autohide-time-modifier -int 0 // No Dock animation
killall Dock // Restart Dock to apply changes
```
* Shorten tooltips
```
defaults write -g NSInitialToolTipDelay -int 500
```
* Finder Show/Hide All Files
```
defaults write com.apple.finder AppleShowAllFiles [YES|NO]
killall Finder /System/Library/CoreServices/Finder.app // Restart all finder instances
```

# Useful Keyboard Shortcuts

| Category | Description | Command
| --- | ---
| General ||
|| Sleep | CMD-Option-Power(Eject)
| Screenshots ||
|| Whole Screenshot to File (Desktop) | CMD-Shft-3
|| Whole Screenshot to Clipboard | CMD-Ctrl-Shft-3
|| Part of Screen to file | CMD-Shft-4
|| Part of Screen to clipboard | CMD-Ctrl-Shft-4
|| Window to file | CMD-Shft-4 [space]
|| Window to clipboard | CMD-Ctrl-Shft-4 [space]

# Useful Commands

| Description | Command | Notes
| --- | --- | --
| List Open Process Ports | `lsof -n -i4TCP` | Like `netstat -pntl`

# Homebrew

> The missing package manager for OS X

http://brew.sh/

## How it works

* Installs packages to /usr/local/Cellar
* Symlinks them in /usr/local (e.g. opt, bin)
* Puts /usr/local/bin on your PATH

### Formula
* Homebrew uses a list of ruby scripts called Formula
* These Formula tell brew how to install/uninstall things
* These Formula are simply sourced from a git repo homebrew/homebrew-core

## Setup
Follow website instructions.  Set up for single user by default

[Multi-user Setup](http://blog.strug.de/2012/06/my-homebrew-multi-user-setup/) ... YMMV

## Taps
Taps are additional github repos containing additional formula

### Common taps
* homebrew/core (linked by default)
* homebrew/versions
* caskroom/cask

### Casks
A homebrew tap that lets you install binary distributions

Puts them in /opt/homebrew-cask/Caskroom and symlinks them in /Applications

Install with `brew tap caskroom/cask`

## Useful Commands

| Command | Description |
| --- | --- |
| `brew update` | Update brew and its formula |
| `brew search <target>` | Search for `<target>` in formula (Includes taps) |
| `brew info <target>` | Get info on `<target>` (including versions) |
| `brew install <target>` | Install `<target>` |
| `brew upgrade <target>` | Upgrade `<target>` |
| `brew switch <target> <version>` | Run `<version>` of `<target>` |
| `brew tap` | Lists taps |
| `brew cask search '<searchText>'` | Search for a cask |
| `brew cask install '<caskName>'` | Install a cask |

## Customization

Hack away.  It's just git.  You can clean up brew mods to update homebrew:

```
git reset --hard
git clean -df
```

# Dev Setup

## SW

* XCode/Command Line Tools
* homebrew
  * brew tap caskroom/cask
  * brew tap homebrew/versions
* Dev Specific
  * atom
  * node/npm/nvm
  * java
  * redis, dynamodblocal
  * etc.
