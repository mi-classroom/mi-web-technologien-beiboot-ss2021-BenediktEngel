# Web Technologien // begleitendes Projekt Sommersemester 2021

Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Bearbeitung von Bildern. Hierbei steht weniger ein professioneller Konzeptions-, Entwurfs- und Entwicklungsprozess im Vordergrund, sondern vielmehr die sukzessive Weiterentwicklung einer Anwendung, das Ausprobieren, Vergleichen, Refactoren und die Freude an lauffähigem Code.

## How to use...

No matter how you run the application, the `./data` folder must be created and the images-folders must be added before starting. 

### ...manually

To start the server read the [README-file](./server/README.md).

To start the client read the [README-file](./client/README.md).

### ...with docker compose

1. Run `docker compose up`. If the code has changed use also the flag `--build`.
2. Navigate to [http://localhost:5000](http://localhost:5000).

## Contribute

The following describes everything you need to know for contributing.

### Branching

The `main`-Branch is the production-ready branch which is protected. So if you want to build a new feature please checkout a new branch and give it a descriptive name. If the feature is ready to get merged into the `main`-Branch create a Pull-Request. The Pull-Request has to be approved from at least on other contributer.

### Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for the naming of all commits (except for merge commits). So please also use this convention. 

### Used Technologies

If you want to use a new technologie first write an [Architecture decision record (ADR)](https://github.com/joelparkerhenderson/architecture-decision-record) in which the advantages and disadvantages are weighed up. For this project we use the [template by Michael Nygard](https://github.com/joelparkerhenderson/architecture-decision-record/blob/main/templates/decision-record-template-by-michael-nygard/index.md) with an additional section called **Options** in which the considered options are described.

#### Frontend

As described in the [ADRs](./ADR) we use [Vue3](https://v3.vuejs.org) as the Frontend-Framework. If you create new components or refactor old ones please use the `Composition API` so that these are uniform.
For CSS and Styling we use [tailwindcss](https://tailwindcss.com) as the framework combined with [material icons](https://fonts.google.com/icons). 

#### Backend

The backend server is build on [node.js](https://nodejs.org/en/) (v.16, but older versions should also work) with the web-framework [express](https://expressjs.com). For reading and writing of metadata we use node-exiftool and for zipping we use archiver, but you can read more on that in the ADR-folder.

## Timetracker
- **Issue 1:** 10h
- **Issue 2:** 2,5h
- **Issue 3:** 10h
- **Issue 4:** 4h
- **Issue 5:** 4h
- **Issue 6:** 1h
- **Issue 7:** 20h
