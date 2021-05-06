# Client

## How to use the client...

### ...without Docker

1. Navigate into `/client`.
2. Install everything with `npm install`.
3. Create an `.env`-File and set the enviorment-variable for the Serverlocation as `VITE_APP_SERVER=<YOUR_SERVER_ADRESS>` (e.g. http://localhost:8000).
4. Run `npm run dev` for development or `npm run build` followed by `npm run serve` for production.
5. If you use development-mode go to [http://localhost:3000](http://localhost:3000), else go to [http://localhost:5000](http://localhost:5000).

### ...as Docker container

1. Navigate into `/client`.
2. Create an `.env`-File and set the enviorment-variable for the Serverlocation as `VITE_APP_SERVER=<YOUR_SERVER_ADRESS>` (e.g. http://localhost:8000).
4. Build the Image by running `docker build -t <IMAGENAME> .` with an Imagename of your choice.
5. Run the client in a Docker container `docker run -p 5000:5000 --rm --name <YOUR-CONTAINERNAME> <IMAGENAME>`.
6. Go to [http://localhost:5000](http://localhost:5000).
