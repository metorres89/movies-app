build:
	docker build -t movies-back:release .
	
run:
	docker stop movies-back-release
	docker rm movies-back-release
	docker run -i -d --name movies-back-release -p 8002:3000 movies-back:release