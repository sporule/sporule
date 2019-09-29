---
title: "Using pyenv and virtualenv in Linux, and install Jupyter Lab"
author: "Sporule"
date: "2019-08-18"
categories: "notes"
tags: "pyenv,jupyter lab,python,virtualenv"
---

## Backgrounds

pyenv is a simple python version management package, it allows you to install different version of python in your machine.

pyenv-virtualenv is a plugin for pyenv to use virutal python environment in your machine.

This package is very useful as you can simply switch python environment as well as build the live environment in your PC without impacting the master version of python.

## How to

Pyenv provided an automatic script for installation from their Git.

Open terminal, type below command:

```bash
curl -L https://raw.githubusercontent.com/pyenv/pyenv-installer/master/bin/pyenv-installer | bash
```

Above script will install pyenv to your environment, then add the pyenv bin to the PATH:

```bash
export PATH="~/.pyenv/bin:$PATH" 
eval "$(pyenv init -)" 
eval "$(pyenv virtualenv-init -)"
```

Add above three lines to the end of your `~\.bashrc` if you want it to add pyenv to the PATH automatically after restart.

Before installing a new version of python, I will suggest you to install build dependencies before installing other python versions to avoid compiling errors.

Run below to install all dependencies:

```bash
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev
```

Now you can start to install different python version, I am using the 3.6.0:

```bash
pyenv install 3.6.0
```

After having the 3.6.0 version of python installed, I can now create virtual environment base on the 3.6.0. I am creating this environment for jupyter lab so I named in jupyter_3.6

```bash
pyenv virtualenv 3.6.0 jupyter_3.6
```

Now we can activate the virtual environment by using:

```bash
pyenv activate jupyter_3.6
```

You can see that the environment switched to the environment we just created. The python bin and pip bin is now pointed to pyenv folder.
![pyenv](https://i.imgur.com/sHZq6hn.png)

I suggest to upgrade pip before installing any packages:

```bash
pip install --upgrade pip
```

Now you can start to install what ever pacakges are required for your environment, we are setting up this environment for jupyter lab, so I will install jupyter lab

```bash
pip install jupyterlab
```

If you want to exit the environment then use deactivate

```bash
pyenv deactivate
```

All above information is available in [pyenv's github](https://github.com/pyenv/pyenv), what I did is providing a summary to save the time.
