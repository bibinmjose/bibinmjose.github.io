---
title: Some useful commands on Linux
tags: linux shell
aside:
  toc: true
  selectors: 'h3'
key: 20180813
header: true
author: Bibin Jose
---

![bash_logo](/assets/20180813/bash.png)

This is a page where I periodically update this list with useful commands for linux which I routinely use.
I tend to favour ubuntu based commands since it is the most popular, although most of them are transfereable to other linux distros.
That being said, I tend to favour installing _bobby russell_'s [ohmyzsh](https://github.com/ohmyzsh/ohmyzsh) to make life easier.


# Terminal Commands

1. Check the number of processors: `nproc​`
2. Check free RAM : `free -h` To continuously monitor `watch free -h`
3. Checking ubuntu version on the system: `lsb_release -a`
4. Checking the processes running as a tree diagram: `pstree`
5. Check resource utilization (like task manager in windows): `top` or `htop` or `ytop`(not available on all platforms)
6. Checking sytem file size: `df -ah`
7. Checking file size in directory: `du -sh *`
8. Disk partition and disk usage: `lsblk`
9. Printing output of a command into a log file: `nohup` . For -eg:_ `nohup lsblk` will output the result of `lsblk` into a log file in the current folder.
    - `nohup python -u script.py  > file.log 2>&1` =>  Output and error to same `file.log`
    - `nohup myprogram > myprogram.out 2> myprogram.err` => redirect standard output and standard error to different files
10. Opening the current folder (GUI) from terminal: ​​`nautilus .`
11. Check all running python processes with arguments _eg:_ `ps eo args | grep python`
12. Checking linux (kernel) verison: `uname -a​`
13. Show cpu and motherboard details: `lshw -class cpu`
14. To check who are all logged into the system: `who`  or `w`
15. `pushd` and `popd` to navigate to and back to the directory _eg:_ `pushd ~/Desktop`
16. file to print the type of file eg: `file foo` prints out file format as `foo:JPEG` image data
17. search for a file: `locate filename.sh`  prints file location of `filename.sh`
18. To constantly update a command every few seconds: `watch`
19. `tail` and `head` for printing the end and beginning of a file.
20. Functions which give information about a command: `man`  (manual page), `whatis`  (one line description), `info` (only available for some commands)
21. To run a program in the background _eg:_ `firefox &`
22. To capture what is being printed during boot: `journalctl`
23. Checking internet connection eg: ​​`ping 8.8.8.8` or ​`mtr 8.8.8.8`
24. Changing directory/file permissions: `sudo chmod 700`
25. Changing ownership: `sudo chown`
26. Changing group: `sudo chgrp`
27. Listing the directory structure with depth=2 levels : `tree -d -L 2`
28. `printenv` will print out any environment variables you have set.


# Running jobs from terminal in background [foreground and pausing]

To run jobs (one or more programs) in foreground and background from terminal. Here, I use `firefox` as an example to demonstrate the same. `<username>` on screenshots shown below is scrambled for privacy concerns.

## Running programs from terminal

You can always run a  job in foreground by typing a command on to the terminal as

```bash
firefox
```

![firefox_1](/assets/20180813/firefox_1.png)

But once the program starts we lose the bash prompt. Another way to start firefox is to run the program in background. This will return bash prompt as shown below.

```bash
firefox &
```

![firefox_2](/assets/20180813/firefox_2.png)

## Pause and resume jobs from terminal

Sometimes you need to pause a job that’s running and return to bash prompt and execute some commands and afterwards resume the original job. Press `CTRL+Z` to pause the original job and return to command prompt as shown below. This will immediately pause firefox and you will note able to use it for browsing the web.


![firefox_3](/assets/20180813/firefox_3.png)

### Case 1:

To resume  firefox in background run

```bash
bg %1
```

![firefox_4](/assets/20180813/firefox_4.png)

This will resume firefox but in background and returns bash prompt as shown above.

### Case 2:

To resume  firefox in foreground run

```bash
fg %1
```

![firefox_5](/assets/20180813/firefox_5.png)
This will resume firefox but in foreground, but will not return bash prompt as shown above.

## Listing jobs in background and killing them

To list all the jobs running in background run

```bash
jobs -l
```

![firefox_6](/assets/20180813/firefox_6.png)

To kill a job running in background, find job ID (21689) from earlier listing

```bash
kill 21689
```

![firefox_7](/assets/20180813/firefox_7.png)

<br>

