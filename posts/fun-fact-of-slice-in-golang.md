---
title: "Fun Fact of Slice in GoLang"
author: "Sporule"
date: "2019-02-05"
categories: "coding"
tags: "golang,slice"
coverimage: "https://www.vertica.com/wp-content/uploads/2019/07/Golang.png"
---

## Fun Fact

Slice is a very important function in GoLang, which can help us to work with array easily.

However I just relised that GoLang only allows extention of Slice to the right, but not from the left.

In below example, we can drop the last four elements of slice by using X[:4] and then extend it back by using X[:6].

However we can't drop the first two elements and extend it back by using X[-2:]

```go
func main() {
    //now we create an array rather than slice
    ar := [6]int{2, 3, 5, 7, 11, 13}
    fmt.Println(ar)
    //output [2 3 5 7 11 13]

    // Slice the slice to give it 2 length. However the capacity remain the same
    s := ar[:2]
    printSlice(s)
    //output len=2 cap=6 [2 3]

    // Extend its length.
    s = ar[:6]
    printSlice(s)
    //output len=6 cap=6 [2 3 5 7 11 13]

    // Drop its first two values. Capacity drops to 4
    s = ar[2:]
    printSlice(s)
    //output len=4 cap=4 [5 7 11 13]

    //s = ar[-2:]
    printSlice(s)
    //output error

    fmt.Println(ar)
    //output [2 3 5 7 11 13]
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

By looking at the underlying array, the array still has the data that slice need to extend it back as dropping elements in slice will not impact the elements in the referenced array

```go
func main() {
     ar := [6]int{2, 3, 5, 7, 11, 13}
     fmt.Println(ar)
     //output [2 3 5 7 11 13]
     // Slice the slice to give it 2 length.
     s := ar[:2]
     printSlice(s)
     //output len=2 cap=6 [2 3]
     // Extend its length.
     s = ar[:6]
     printSlice(s)
     //output len=6 cap=6 [2 3 5 7 11 13]
     // Drop its first two values.
     s = ar[2:]
     printSlice(s)
     //output len=4 cap=4 [5 7 11 13]
     //s = ar[-2:]
     printSlice(s)
     //output error
     fmt.Println(ar)
     //output [2 3 5 7 11 13]
}

func printSlice(s []int) {
    fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

This is a bit weird but it is OK as it does not have a huge impact on array operations. I will update to this post once I figure it out the alternative.
