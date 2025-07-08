FILES= controllers models public routes utils app.js package.json package-lock.json server.js Makefile
run:
	npm start

update:
	git add $(FILES)
	git status
	git commit -m "Update recent changes"
	git push