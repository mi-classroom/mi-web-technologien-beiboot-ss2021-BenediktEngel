# ADR - Search

## Status

Accepted

## Context

For searching the files and folders an algorithm is needed.

### Options

- fuse.js

## Decision

fuse.js is used. Because it is a fuzzy search algorithm, strings are found that are roughly the same, so typos are ignored.

## Consequences

Caused by the fuzzynes it will also show matches where the pattern don´t matches completly.
