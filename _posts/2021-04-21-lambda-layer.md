---
title: Creating Layers in AWS Lambda
tags: DevOps AWS
mode: immersive
aside:
    toc: true
    selectors: 'h3'
key: 20210421
author: Bibin Jose
cover: "/assets/20210421/thumb.jpg"
show_edit_on_github: false
article_header:
  type: cover
  image:
    src: "assets/20210421/alexis-antoine-Ta65aCJ2NeE-unsplash.png"
---

This is a microblog explaining how to add a layer to lambda function in AWS.

We might have to import a set of libraries [_eg:_ `numpy`, `pandas` etc...] into your lambda function and it is often easier to provide these libraries as layers. We can attach these layers to lambda function and import them to your lambda function seemlessly. [Here](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html) is the snapshot of limitations associated with lambda functions.

### Step-1

Install the library[ies] to local folder. Here I have shown how to create a layer with `Pyyaml`

```
mkdir python
pip install "pyyaml==5.0" -t ./python
pip install "numpy==1.20.0" -t ./python
```

### Step-2

Zip the folder and upload as layer in AWS lambda. You will have to add this layer when defining a lambda function to have the library accessible in lambda functions.

```
zip -r pyyaml_numpy_layer.zip python
```

If there are other sub directories in the `./python` folder of the layer then the modules might not be picked up by the function. We would need to update `PYHTONPATH` or `sys.path` to make it look it into the subdirectories.

## References

1. [lambda documentation](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-concepts.html#gettingstarted-concepts-layer)