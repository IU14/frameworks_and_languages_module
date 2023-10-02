#tells which docekrfile to build, docker build (build cmd), --tag(name of folder/dir), actual name , . (all)
build:
	docker build --tag falcon_test .


# tells which docker file to then run, docker run (run cmd), --rm, --pulish..(chooses the serverport), actual dir 
run:
	docker run --rm --publish 8000:8000 falcon_test