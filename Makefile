FILES= controllers models public routes utils app.js package.json package-lock.json server.js Makefile README.md
run:
	npm start

update:
	git add $(FILES)
	git status
	git commit -m "Updated recent changes"
	git push