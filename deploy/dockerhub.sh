#!/bin/sh
echo ${DOCKERHUB_TOKEN} | docker login --username ${DOCKERHUB_USERNAME} --password-stdin

docker build -t ${DOCKERHUB_USERNAME}/browser-editor:${TRAVIS_COMMIT} .

docker tag \
  ${DOCKERHUB_USERNAME}/browser-editor:${TRAVIS_COMMIT} \
  ${DOCKERHUB_USERNAME}/browser-editor:latest

docker push ${DOCKERHUB_USERNAME}/browser-editor:${TRAVIS_COMMIT}
docker push ${DOCKERHUB_USERNAME}/browser-editor:latest