install:
	test -e pocketbase_0.22.21_linux_amd64.zip || wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.21/pocketbase_0.22.21_linux_amd64.zip
	mkdir -p pb
	unzip -fd pb pocketbase_0.22.21_linux_amd64.zip
	test -e v0.21.5.zip || wget https://github.com/pocketbase/js-sdk/archive/refs/tags/v0.21.5.zip
	unzip -f v0.21.5.zip

build:
	npm run build
	cp js-sdk-0.21.5/dist/pocketbase.umd.js dist/angular-testproject/browser/

setup:
	./pb/pocketbase migrate up
	./pb/pocketbase admin create test@example.com password

run:
	./pb/pocketbase serve --publicDir dist/angular-testproject/browser

clean:
	rm -fr pb
