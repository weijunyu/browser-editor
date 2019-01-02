# browser-editor

Purely in-browser text editor, built with [CodeMirror](https://codemirror.net/) and [Vue.js](https://vuejs.org).

Can be packed into 1 single html file (plus corresponding fonts) and run locally on a modern browser.

For air-gapped environments without easy access to a text editor and doesn't play nice with .js files.

## Usage

### Modes
Language modes provide syntax highlighting.

### Themes
4 Dark and light themes are provided. Defaults to `darcula`.

### Settings
Edit the JSON object under "Current settings". Some common settings:

- indentUnit: how many spaces an indent takes up. Also controls the number of spaces added when pressing `tab`. Defaults to `2`.
- lineNumbers: shows or hide line numbers. Defaults to `true`.
- lineWrapping: scroll or wrap for long lines. Defaults to `false` (scroll).
- autoCloseBrackets: add closing brackets automatically. Defaults to `false`.
- matchBrackets: highlights matching brackets. Defaults to `true`.

### Search (regex supported)

`Ctrl-F / Cmd-F`: Start searching

`Ctrl-G / Cmd-G`: Find next

`Shift-Ctrl-G / Shift-Cmd-G`: Find previous

`Shift-Ctrl-F / Cmd-Option-F`: Replace

`Shift-Ctrl-R / Shift-Cmd-Option-F`: Replace all

## Developing
### Project setup
```
$ npm install
```

### Compiles and hot-reloads for development
```
$ npm run serve
```

### Compiles and minifies for production
The generated production files will be located under `dist/`.
```
$ npm run build
```

### Build and run on Docker
```
$ npm run build
$ docker build --tag ${IMAGE_TAG} .
$ docker run --name ${CONTAINER_NAME} -d [-p ${HOST_PORT}:${CONTAINER_PORT}] ${IMAGE_TAG}
```
