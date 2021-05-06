# Server

## How to use the server...

### ...without Docker

1. Navigate into `/server`.
2. Install everything with `npm install`.
3. Create an `.env`-file with `PORT:<YOUR_PORT>` on which the server should run. Also save the path to the data folder `FILE_DIRECTORY:<THE_PATH>` and an RegEx-pattern for the files `PATTERN:<YOUR_PATTERN>`.
4. Run `npm run start` for starting the server.

### ...as Docker container

1. Navigate into `/server`.
2. Create an `.env`-file with `PORT:<YOUR_PORT>` (we recommend using 8000, if not you also have to change the value in line 12 of the Dockerfile) on which the server should run. Also save the path to the data folder `FILE_DIRECTORY:../data` and an RegEx-pattern for the files `PATTERN:<YOUR_PATTERN>`.
4. Build the Image by running `docker build -t <IMAGENAME> .` with an Imagename of your choice.
5. Run the client in a Docker container `docker run -p 8000:8000 -v <ABSOLUTE_PATH_TO_DATA>:/data --rm --name <YOUR-CONTAINERNAME> <IMAGENAME>`.
