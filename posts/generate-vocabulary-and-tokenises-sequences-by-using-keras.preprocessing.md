---
title: "Generate Vocabulary and Tokenises Sequences by using keras.preprocessing"
author: "Sporule"
date: "2019-09-18"
categories: "machine learning"
tags: "keras,tokenizer , vocabulary "
coverimage: "https://miro.medium.com/max/1000/1*LkKz4wtZNBo5i-Vc8DWhTA.png"
---

## Backgrounds

I found that it is very straightforward to generate the vocab by using keras, however the examples on their website is not very straightforward.

The example below is read a QA Data Set from csv file, and then generate a vocab by using the `keras.preprocessing` library.

Start with loading the data

```python
import pandas as pd 
qa_df = pd.read_csv("python_qa.csv",encoding = "ISO-8859-1",sep='\t')
```

The data format

  |     | Question                                          | Answer                                            |
  | --- | ------------------------------------------------- | ------------------------------------------------- |
  | 0   | How can I find the full path to a font from it... | Unfortunately the only API that isn't deprecat... |
  | 1   | Get a preview JPEG of a PDF on Windows? I have... | ImageMagick delegates the PDF->bitmap conversi... |
  | 2   | Continuous Integration System for a Python Cod... | One possibility is Hudson. It's written in Ja...  |
  | 3   | cx_Oracle: How do I iterate over a result set?... | The canonical way is to use the built-in curs     |
  | 4   | Using 'in' to match an attribute of Python obj... | Using a list comprehension would build a tempo... |

The function to generate the vocab

```python
from keras.preprocessing import text,sequence

#util function
def generate_vocab(x,y,max_seq_length,batch_size):
    #create vocab base on x and y
    vocab = text.Tokenizer(lower=True, split=' ', oov_token='<UNK>',char_level=False, document_count=0)
    vocab.fit_on_texts(x)
    vocab.fit_on_texts(y)
    #tokenise x and y
    x_seqs = vocab.texts_to_sequences(x)
    y_seqs = vocab.texts_to_sequences(y)
    #pad seqs to the max length, truncate the words that outside the max length
    x_seqs = sequence.pad_sequences(x_seqs,padding='post',truncating='post',maxlen=max_seq_length)
    y_seqs = sequence.pad_sequences(y_seqs,padding='post',truncating='post',maxlen=max_seq_length)
    #generate dataset for network to consume with batch
    xy_set = tf.data.Dataset.from_tensor_slices((x_seqs, y_seqs)).batch(batch_size, drop_remainder=True)
    return vocab,x_seqs,y_seqs,xy_set
```

Or you can generate two vocab for x and y

```python
def generate_vocab(x,y,max_seq_length,batch_sz,vocab_length):
    #create vocab base on x and y
    x_vocab = text.Tokenizer(num_words=vocab_length,lower=True,filters='!"#$%&()*+,-./:;=?@[\\]^_`{|}~\t\n', split=' ', oov_token=UNK,char_level=False, document_count=0)
    x_vocab.fit_on_texts(x)
    y_vocab = text.Tokenizer(num_words=vocab_length,lower=True, filters='!"#$%&()*+,-./:;=?@[\\]^_`{|}~\t\n',split=' ', oov_token=UNK,char_level=False, document_count=0)
    y_vocab.fit_on_texts(y)
    #tokenise x and y
    x_seqs = x_vocab.texts_to_sequences(x)
    y_seqs = y_vocab.texts_to_sequences(y)
    #pad seqs to the max length, truncate the words that outside the max length
    x_seqs = sequence.pad_sequences(x_seqs,padding='post',truncating='post',maxlen=max_seq_length)
    y_seqs = sequence.pad_sequences(y_seqs,padding='post',truncating='post',maxlen=max_seq_length)
    #generate dataset for network to consume with batch
    xy_set = tf.data.Dataset.from_tensor_slices((x_seqs, y_seqs)).batch(batch_sz, drop_remainder=True)
    return x_vocab,y_vocab,x_seqs,y_seqs,xy_set
```

Generate the vocab by using the function we just wrote

```python
MAX_SEQ_LENGTH=20
BATCH_SIZE = 8
vocab,q_seqs,a_seqs,qa_set = generate_vocab(qa_df['Question'],qa_df['Answer'],MAX_SEQ_LENGTH,BATCH_SIZE)
```

Vocab is the overall vocab, q_seqs and a_seqs are the tokenised questions and aswers.

You can find more information on [https://keras.io/preprocessing/text/](https://keras.io/preprocessing/text/)
