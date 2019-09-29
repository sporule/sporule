---
title: "Use Apache MXNet Deep Learning Framework on Kaggle's free GPU"
author: "Sporule"
date: "2019-09-05"
categories: "machine learning"
tags: "mxnet,kaggle,gpu,cuda"
coverimage: "https://miro.medium.com/max/668/1*GZrTyTz0OKMbxnO5Trhcew.png"
---

## Backgrounds

The default MXNet installed in Kaggle's python container is 1.3.1 rather than the CUDA version of MXNet.

So what we need do is simply uninstalled the current MXNet and install the CUDA version of MXNet.

## How to

To start with, turn on the GPU option and internet option on your Kaggle Kernel(Notebook)
[kaggle](https://i.imgur.com/fX2m8vV.png)

Then open the console and run:

```bash
!nvcc --version
```

The current version of CUDA is 9.1:
[cuda](https://i.imgur.com/UFJuXYM.png)

Then what we need to do is to uninstall the current MXNet and then reinstall the mxnet-cu<<Version>>, in this case is mxnet-cu91.  We reinstalled numpy because of the version requirements from mxnet-cu91

```bash
!pip uninstall -y mxnet
!pip install 'numpy<1.15.0,>=1.8.2' mxnet-cu91
```

Everything should work properly now.
Follow MXNet's guide on how to use GPU for data training.
