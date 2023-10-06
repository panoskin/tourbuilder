.PHONY: dev

dev:
	docker run \
		--rm \
		--name tourbuilder \
		-v ./dev.html:/usr/share/nginx/html/index.html:ro \
		-v ./tourbuilder.js:/usr/share/nginx/html/tourbuilder.js:ro \
		-p 8080:80 \
		nginx:alpine
