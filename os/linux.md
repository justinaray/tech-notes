# Key parts of Filesystem Hierarchy

* /usr - shared, read-only data
* /etc - host-specific, system-wide config
* /var - host-specific, persistent, variable data
* /home - User home directories
* /dev - System-created links to your HW
* /proc - system-manged process information

# Software Installation Locations

* /bin - Distro managed core binaries needed before /usr is available
* /sbin - Distro managed core binaries requiring root/sudo needed before /usr is available
* /usr/bin - Distro managed binaries (Remainder)
* /usr/sbin - Distro managed binaries requring root/sudo (Remainder)
* /usr/local - "properly" bundled, read-only SW installed by the sys admin available to all users 
* /opt - custom bundled, read-only SW installed by the sys admin available to all usrers 
* ~/.local - per-user counterpart of /usr/local
* ~/.local/opt - per-user couterpart of /opt

## Notes

* The line between /[s]bin and /usr/[s]bin is blurry and historical in nature.  At one point, the split was needed due to limitations on disk space.
* SW in /opt has custom bundling formats and doesn't use *nix-standard bundling formats (bin, lib, share, include, etc).  Ex: JDK
