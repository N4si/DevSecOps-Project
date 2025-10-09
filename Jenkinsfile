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
                git branch: 'main', url: 'https://github.com/N4si/DevSecOps-Project.git'
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
            sh 'docker run --rm -v $(pwd):/app aquasec/trivy fs /app | tee trivyfs.txt'
         }
        }
        // stage('TRIVY FS SCAN') {
        //     steps {
        //         sh "trivy fs . > trivyfs.txt"
        //     }
        // }
        stage("Docker Build & Push"){
            steps{
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){   
                       sh "docker build --build-arg TMDB_V3_API_KEY=010ded2a28dec41c8aa069f1c50f5c80 -t netflix ."
                       sh "docker tag netflix jay24666/netflix:latest "
                       sh "docker push jay24666/netflix:latest "
                    }
                }
            }
        }
        stage("TRIVY"){
            steps{
                  sh '''
                    docker run --rm \
                    -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy image jay24666/netflix:latest | tee trivy-image-scan.txt
                  '''
                
                // sh "trivy image jay24666/netflix:latest > trivyimage.txt" 
            }
        }
        // stage('Deploy to container'){
        //     steps{
        //         sh 'docker run -d --name netflix -p 8081:80 jay24666/netflix:latest'
        //     }
        // }

          stage ("Deploy to cluster dev-kt-k8s") {
            steps {
                withKubeConfig(credentialsId: 'kubeconfig-dev-kt-k8s') {
                    sh "kubectl apply -f Kubernetes/deployment.yml"
                    // sh "kubectl apply -f Kubernetes/node-service.yaml"
                    sh "kubectl apply -f Kubernetes/service.yml"
                    // sh "kubectl apply -f k8s/mysql/"
                    // sh """
                    //     sed -i 's#docker.io/jay24666/business-mgmt-app:[0-9]\\+#docker.io/jay24666/business-mgmt-app:${BUILD_NUMBER}#' k8s/app/deployment.yaml
                    //     kubectl apply -f k8s/app/
                    // """
                }
            }
        }
    }
}