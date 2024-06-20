# Use the Maven image with Eclipse Temurin JDK 21 on Alpine Linux as the build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build

# Create a directory for the application inside the container
RUN mkdir -p /app

# Set the working directory to /app
WORKDIR /app

# Copy the Maven project file (pom.xml) to the working directory
COPY pom.xml /app

# Copy the source code to the working directory
COPY src /app/src

# Run Maven to package the application, skipping the tests
RUN mvn -B package --file pom.xml -DskipTests


#This is a Multi-Stage Dockerfile: 
#We are seperating:
    #Build stage /\ uses maven to set up directory, copy dependencies and compile the sorce code;
#From
    #Production Stage \/ Eclipse Temurin JDK 21 on Alpine Linux as the runtime environment, exposes port 8080,
    #defines a volume for persistent storage, copies the built JAR file, and sets the entry point to run the application

    
# Use the Eclipse Temurin JDK 21 on Alpine Linux as the runtime environment
FROM eclipse-temurin:21-jdk-alpine

# Expose port 8080 to the host
EXPOSE 8080

# Define a volume that can be mounted from the host for persistent storage
VOLUME /backend_volume

# Copy the jar file from the build stage to the runtime stage
COPY --from=build /app/target/*.jar devops-demo-1.0.jar

# Define the entry point to run the application using java -jar command
ENTRYPOINT ["java", "-jar", "/devops-demo-1.0.jar"]
