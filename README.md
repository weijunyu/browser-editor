# browser-editor

Purely in-browser text editor, built together with [CodeMirror](https://codemirror.net/) and [Vue.js](https://vuejs.org).

Can be packed into 1 single html file and run on a browser for air-gapped environments without easy access to a text editor and doesn't play nice with .js files.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Build and run on Docker
```
npm run build
docker build --tag ${IMAGE_TAG} .
docker run --name ${CONTAINER_NAME} -d [-p ${HOST_PORT}:${CONTAINER_PORT}] ${IMAGE_TAG}
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
