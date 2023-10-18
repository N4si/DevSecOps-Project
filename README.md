<div align="center">
  <a href="http://netflix-clone-with-tmdb-using-react-mui.vercel.app/">
    <img src="./public/assets/netflix-logo.png" alt="Logo" width="100" height="32">
  </a>
</div>

<br />

<div align="center">
  <img src="./public/assets/home-page.png" alt="Logo" width="100%" height="100%">
  <p align="center">Home Page</p>
</div>

# Deploy Netflix Clone on Cloud using Jenkins - DevSecOps Project!

### **Phase 1: Initial Setup and Deployment**

**Step 1: Launch EC2 (Ubuntu 22.04):**

- Provision an EC2 instance on AWS with Ubuntu 22.04.
- Connect to the instance using SSH.

**Step 2: Clone the Code:**

- Update all the packages and then clone the code.
- Clone your application's code repository onto the EC2 instance:
    
    ```bash
    git clone https://github.com/N4si/DevSecOps-Project.git
    ```
    

**Step 3: Install Docker and Run the App Using a Container:**

- Set up Docker on the EC2 instance:
    
    ```bash
    
    sudo apt-get update
    sudo apt-get install docker.io -y
    sudo usermod -aG docker $USER  # Replace with your system's username, e.g., 'ubuntu'
    newgrp docker
    sudo chmod 777 /var/run/docker.sock
    ```
    
- Build and run your application using Docker containers:
    
    ```bash
    docker build -t netflix .
    docker run -d --name netflix -p 8081:80 netflix:latest
    
    #to delete
    docker stop <containerid>
    docker rmi -f netflix
    ```
    

**Step 4: Get the API Key:**

- Open a web browser and navigate to TMDB (The Movie Database) website.
- Click on "Login" and create an account.
- Once logged in, go to your profile and select "Settings."
- Click on "API" from the left-side panel.
- Create a new API key by clicking "Create" and accepting the terms and conditions.
- Provide the required basic details and click "Submit."
- You will receive your TMDB API key.

Now recreate the Docker image with your api key
docker build --build-arg TMDB_V3_API_KEY=<your-api-key> -t netflix .

**Phase 2: Security**

1. **Install SonarQube and Trivy:**
    - Install SonarQube and Trivy on the EC2 instance to scan for vulnerabilities.
        
        sonarqube
        docker run -d --name sonar -p 9000:9000 sonarqube:lts-community
        
        To access: publicIP:9000 (by default username & password is admin)
        
        To install Trivy:
        
        sudo apt-get install wget apt-transport-https gnupg lsb-release
        wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
        echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
        sudo apt-get update
        sudo apt-get install trivy
        
        to scan
        
        trivy image <imageid>
        
2. **Integrate SonarQube and Configure:**
    - Integrate SonarQube with your CI/CD pipeline.
    - Configure SonarQube to analyze code for quality and security issues.
3. **Integrate OWASP Dependency Check:**
    - Integrate OWASP Dependency Check into your CI/CD pipeline to identify vulnerable dependencies.

**Phase 3: CI/CD Setup**

1. **Install Jenkins for Automation:**
    - Install Jenkins on the EC2 instance to automate deployment:
    Install Java
    
    ```bash
    sudo apt update
    sudo apt install fontconfig openjdk-17-jre
    java -version
    openjdk version "17.0.8" 2023-07-18
    OpenJDK Runtime Environment (build 17.0.8+7-Debian-1deb12u1)
    OpenJDK 64-Bit Server VM (build 17.0.8+7-Debian-1deb12u1, mixed mode, sharing)
    
    #jenkins
    sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
    https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
    echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null
    sudo apt-get update
    sudo apt-get install jenkins
    sudo systemctl start jenkins
    sudo systemctl enable jenkins
    ```
    
    - Access Jenkins in a web browser using the public IP of your EC2 instance.
        
        publicIp:8080
        
2. **Install Necessary Plugins in Jenkins:**

Goto Manage Jenkins →Plugins → Available Plugins →

Install below plugins

1 Eclipse Temurin Installer (Install without restart)

2 SonarQube Scanner (Install without restart)

3 NodeJs Plugin (Install Without restart)

### **Configure Java and Nodejs in Global Tool Configuration**

Goto Manage Jenkins → Tools → Install JDK(17) and NodeJs(16)→ Click on Apply and Save

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/84ad6f6a-681d-4a55-a9be-d328db326720/1e0b6c12-12c9-40c5-8467-40f5d0f03966/Untitled.png)

1. NodeJS

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/84ad6f6a-681d-4a55-a9be-d328db326720/25af7419-fb06-4c6d-a672-f3143799b205/Untitled.png)

### SonarQube

Create the token

Goto Jenkins Dashboard → Manage Jenkins → Credentials → Add Secret Text. It should look like this

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/84ad6f6a-681d-4a55-a9be-d328db326720/a0ab5598-6ec0-4da3-a3c1-a264b29b7a89/Untitled.png)

After adding sonar token

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/84ad6f6a-681d-4a55-a9be-d328db326720/5b1bd347-0267-4153-84ba-285b106df9be/Untitled.png)

Click on Apply and Save

**The Configure System option** is used in Jenkins to configure different server

**Global Tool Configuration** is used to configure different tools that we install using Plugins

We will install a sonar scanner in the tools.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/84ad6f6a-681d-4a55-a9be-d328db326720/d377af7f-7f9c-4e89-9531-354b156ff368/Untitled.png)

Create a Jenkins webhook

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/84ad6f6a-681d-4a55-a9be-d328db326720/e7bcbdf0-faec-4ac4-b96f-a98fb291898c/Untitled.png)

1. **Configure CI/CD Pipeline in Jenkins:**
- Create a CI/CD pipeline in Jenkins to automate your application deployment.

```groovy
pipeline {
    agent any
    tools {
        jdk 'jdk17'
        nodejs 'node16'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }
    stages {
        stage('clean workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout from Git') {
            steps {
                git branch: 'main', url: 'https://github.com/Aj7Ay/Netflix-clone.git'
            }
        }
        stage("Sonarqube Analysis") {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Netflix \
                    -Dsonar.projectKey=Netflix'''
                }
            }
        }
        stage("quality gate") {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }
    }
}
```

Add Dependency checker - OWASP,  trivy scan and deploying app as docker in pipeline

GotoDashboard → Manage Jenkins → Plugins → OWASP Dependency-Check. Click on it and install it without restart.

First, we configured the Plugin and next, we had to configure the Tool

Goto Dashboard → Manage Jenkins → Tools →

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/84ad6f6a-681d-4a55-a9be-d328db326720/53fc8427-bb93-4663-964a-230abe0b983a/Untitled.png)

We need to install the Docker tool in our system, Goto Dashboard → Manage Plugins → Available plugins → Search for Docker and install these plugins

`Docker`

`Docker Commons`

`Docker Pipeline`

`Docker API`

`docker-build-step`

and click on install without restart

Install docker

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/84ad6f6a-681d-4a55-a9be-d328db326720/81d40c5a-6303-4960-b910-eb6b46725823/Untitled.png)

Add dockerhub creds

```groovy

pipeline{
    agent any
    tools{
        jdk 'jdk17'
        nodejs 'node16'
    }
    environment {
        SCANNER_HOME=tool 'sonar-scanner'
    }
    stages {
        stage('clean workspace'){
            steps{
                cleanWs()
            }
        }
        stage('Checkout from Git'){
            steps{
                git branch: 'main', url: 'https://github.com/Aj7Ay/Netflix-clone.git'
            }
        }
        stage("Sonarqube Analysis "){
            steps{
                withSonarQubeEnv('sonar-server') {
                    sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Netflix \
                    -Dsonar.projectKey=Netflix '''
                }
            }
        }
        stage("quality gate"){
           steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 
                }
            } 
        }
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }
        stage('OWASP FS SCAN') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage('TRIVY FS SCAN') {
            steps {
                sh "trivy fs . > trivyfs.txt"
            }
        }
        stage("Docker Build & Push"){
            steps{
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){   
                       sh "docker build --build-arg TMDB_V3_API_KEY=AJ7AYe14eca3e76864yah319b92 -t netflix ."
                       sh "docker tag netflix sevenajay/netflix:latest "
                       sh "docker push nasi101/netflix:latest "
                    }
                }
            }
        }
        stage("TRIVY"){
            steps{
                sh "trivy image nasi101/netflix:latest > trivyimage.txt" 
            }
        }
        stage('Deploy to container'){
            steps{
                sh 'docker run -d --name netflix -p 8081:80 nasi101/netflix:latest'
            }
        }
    }
}

```

**Phase 4: Monitoring**

1. **Install Prometheus and Grafana:**
    - Set up Prometheus and Grafana for monitoring your application.
2. **Configure Prometheus Plugin Integration:**
    - Integrate Jenkins with Prometheus to monitor the CI/CD pipeline.

**Phase 5: Notification**

1. **Implement Notification Services:**
    - Set up email notifications in Jenkins or other notification mechanisms.

**Phase 6: Kubernetes**

1. **Kubernetes Setup (Master and Slave) on Ubuntu 20.04:**
    - Configure your Kubernetes cluster for scalability and ease of management.

**Phase 7: Cleanup**

1. **Cleanup AWS EC2 Instances:**
    - Terminate AWS EC2 instances that are no longer needed.