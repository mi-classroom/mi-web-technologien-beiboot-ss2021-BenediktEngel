# ADR - Read Exif-data

## Status

Accepted

## Context

The server needs the functionality to read and write exif and iptc data from the given images. 

### Options

- exifr
- Exif-reader
- node-exiftool

## Decision

~~Use exifr, because it gets all the information we need~~ 

Use node-exiftool, cause we can read and write all kinds of metadata.

## Consequences

~~We need another module for writing new exif data.~~ Caused by the change in MS5 this consequence is now obsolete.
