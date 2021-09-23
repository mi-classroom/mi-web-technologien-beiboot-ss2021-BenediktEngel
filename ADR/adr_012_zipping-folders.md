# ADR - Zipping

## Status

Accepted

## Context

In MS6 the feature for downloading zipped folders is introduced, so we need an tool for creating the zipped folders.

### Options

- archiver

## Decision

archiver is used, cause it's an very easy way for creating a zipped version of a folder.

## Consequences

The tool needs a file called `folder.zip` which is used for creating the new Zip-file. This file only should be pushed in the initial-state, cause after creating the first zip all the files are in the zip.
