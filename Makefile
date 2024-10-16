install:
	test -e pocketbase_0.22.21_linux_amd64.zip || wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.21/pocketbase_0.22.21_linux_amd64.zip
	mkdir -p pb
	unzip -ud pb pocketbase_0.22.21_linux_amd64.zip
	test -e v0.21.5.zip || wget https://github.com/pocketbase/js-sdk/archive/refs/tags/v0.21.5.zip
	unzip -u v0.21.5.zip
	npm install

build:
	npm run build
	cp js-sdk-0.21.5/dist/pocketbase.umd.js dist/angular-testproject/browser/

setup:
	./pb/pocketbase migrate --migrationsDir pb_migrations up
	./pb/pocketbase admin create ${PB_ADMIN_EMAIL} ${PB_ADMIN_PASSWORD}

run:
	./pb/pocketbase serve --publicDir dist/angular-testproject/browser

clean:
	rm -vfr pb js-sdk-0.21.5 dist
