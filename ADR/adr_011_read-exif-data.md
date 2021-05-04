# ADR - Read Exif-data

## Status

Accepted

## Context

The server needs the functionality to read exif and iptc data from the given images. 

### Options

- exifr
- Exif-reader

## Decision

Use exifr, because it gets all the information we need

## Consequences

We need another module for writing new exif data.