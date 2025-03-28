all:
	echo "All targets"

android-clean:
	rm -rf android/app/build/outputs/release
	
build:
	rm -rf out
	npm run build
	npx cap sync

android: android-clean
	npx cap sync
	cd android/ && \
	ls && \
	./gradlew clean && \
	./gradlew assembleRelease

install-android:
	adb install android/app/build/outputs/apk/release/app-release.apk