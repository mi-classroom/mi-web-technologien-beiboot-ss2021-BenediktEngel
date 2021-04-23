# ADR - Serverside

## Status

Proposed

## Context

Server for reading and writing files with API-access (See https://github.com/mi-classroom/mi-master-wt-beiboot-2021/issues/1).

### Options

- node.js
  - Easy to use with express.js or koa.js for the API-Endpoint and node-exiftool for read and write exif-Data 

- Deno
  - New and more secure, but need permission for reading and writing files
  - Only module for read exif-Data exists not for writing
- PHP

## Decision

Use node.js for the serverside.

## Consequences

Easier to use, cause Backend and frontend use the same language. Large Ecosystem with modules for everything.

