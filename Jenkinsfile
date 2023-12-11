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
                git branch: 'main', url: 'https://github.com/N4si/DevSecOps-Project.git'
            }
        }
        stage("SonarQube Analysis") {
    steps {
        withSonarQubeEnv('sonar-server') {
            sh '''
                sonar-scanner \
                -Dsonar.projectKey=Netflix \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://10.0.0.49:9000 \
                -Dsonar.login=sqp_6f539cc3c071924290cf9fe738d4e8c6d6209ba4
            '''
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
