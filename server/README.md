# Server

## How to use the server...

### ...without Docker

1. Navigate into `/server`.
2. Install everything with `npm install`.
3. Create an `.env`-file with the values described [here](#env-file)
4. Run `npm run start` for starting the server.

### ...as Docker container

1. Navigate into `/server`.
2. Create an `.env`-file with the values described [here](#env-file)
3. Build the Image by running `docker build -t <IMAGENAME> .` with an Imagename of your choice.
4. Run the client in a Docker container `docker run -p 8000:8000 -v <ABSOLUTE_PATH_TO_DATA>:/data --rm --name <YOUR-CONTAINERNAME> <IMAGENAME>`.

### .env-file
The `.env`-File must contain the following values:

```json
PORT= <YOUR_PORT>           // On wich Port should the server run?
FILE_DIRECTORY= <YOUR_PATH> // Path to all the data
PATTERN= <YOUR_PATTERN>     // Pattern wich pictures should be send back to the client (example: (.*)\.jpg$ )
FIELDS= <YOUR_FIELDS>       // Array of metadata-fields wich should send back to the client
```

Fields is an Array of Objects, every Object must contain the following values:

```json
{
  "field": "<NAME_OF_THE_FIELD", // IPTC-fieldname 
  "label" : {
    "de": "<LABEL_OF_THE_INPUT>",// Label in german
    "en": "<LABEL_OF_THE_INPUT>" // Label in english
  }, 
  "type": "<TYPE>",              // Type of the inputfield in the frontend (textarea and text possible)
  "write": <true || false>,      // Is the value writable? 
  "multilang": <true || false>,  // Should the value saved in both languages
  "maxChars": <NUMBER_OF_CHARS>  // How many chars are possible to write
}
```
