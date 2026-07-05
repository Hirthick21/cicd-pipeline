pipeline {
    agent any

    environment {
        APP_PORT = "${env.BRANCH_NAME == 'main' ? '3000' : '3001'}"
        IMAGE_NAME = "${env.BRANCH_NAME == 'main' ? 'nodemain' : 'nodedev'}"
        CONTAINER_NAME = "${env.BRANCH_NAME == 'main' ? 'nodemain-container' : 'nodedev-container'}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'CI=true npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build --build-arg PORT=${APP_PORT} -t ${IMAGE_NAME}:v1.0 ."
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:${APP_PORT} ${IMAGE_NAME}:v1.0
                """
            }
        }
    }

    post {
        success {
            echo "Deployed ${IMAGE_NAME}:v1.0 on port ${APP_PORT} (branch: ${env.BRANCH_NAME})"
        }
    }
}
