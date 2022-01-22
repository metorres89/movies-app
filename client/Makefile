build:
	docker build -t movies-front:release .

run:
	docker stop movies-front-release
	docker rm movies-front-release
	docker run -i -d --name movies-front-release -p 8001:80 movies-front:release