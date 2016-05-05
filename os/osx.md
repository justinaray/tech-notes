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
