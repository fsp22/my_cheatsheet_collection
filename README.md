# My cheatsheet collection
A collection of cheatsheets in PDF format

The collection is stored in a json file (see content.json) as a list of entries with the following format:

```json
{"name": "Latex full guide", 
 "tag": "latex", 
 "footer": {"text": "http://www.icl.utk.edu/~mgates3/docs/", "url": "http://www.icl.utk.edu/~mgates3/docs/"}, 
 "type": "pdf", 
 "url": "http://www.icl.utk.edu/~mgates3/docs/latex.pdf"
}
```

where:

- *name* is the name of the entry
- *tag* is a string with space separated words
- *footer* (optional) is an object with two attribute: the text and the url  of a link
- *type* identifies the type of the resource. Available types:
  - pdf
  - image **TODO**
- *url* is the url of teh resource. It is a relative url for locale file.