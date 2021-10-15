FROM devimage

### android.Dockerfile

ARG KOTLIN_VERSION=1.3.50
ARG ANDROID_SDK_VERSION=3.5.0.21
ARG ANDROID_STUDIO_IDE_VERSION=191.5791312
ARG GRADLE_VERSION=5.6.2


RUN curl -fsSLO --compressed https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip \
    && unzip gradle*.zip  -d /opt/ \
    && curl -fsSLO --compressed https://github.com/JetBrains/kotlin/releases/download/v${KOTLIN_VERSION}/kotlin-compiler-${KOTLIN_VERSION}.zip \
    && unzip kotlin*.zip -d /opt/ \
    && curl -fsSLO --compressed https://dl.google.com/dl/android/studio/ide-zips/${ANDROID_SDK_VERSION}/android-studio-ide-${ANDROID_STUDIO_IDE_VERSION}-linux.tar.gz \
    && tar -xzf android-studio-ide* -C /opt/ \
    && rm -rf /android-studio* /kotlin* /gradle*

RUN npm install -g expo-cli
