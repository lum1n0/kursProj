FROM openjdk:17
ARG JAR_FILE=target/sprinklab-0.0.1-SNAPSHOT.war
WORKDIR /opt/app
COPY ${JAR_FILE} app.war
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.war"]