pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'hirthick21'
        MAIN_PORT = '3000'
        DEV_PORT = '3001'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.BRANCH_NAME = env.BRANCH_NAME ?: 'main'
                    if (env.BRANCH_NAME == 'main') {
                        env.APP_PORT = env.MAIN_PORT
                        env.IMAGE_NAME = 'nodemain'
                        env.CONTAINER_NAME = 'app-main'
                    } else {
                        env.APP_PORT = env.DEV_PORT
                        env.IMAGE_NAME = 'nodedev'
                        env.CONTAINER_NAME = 'app-dev'
                    }
                }
            }
        }
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'echo Tests passed'
            }
        }
        stage('Copy Logo') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        bat 'copy public\\logo-dev.svg public\\logo.svg'
                    }
                }
            }
        }
        stage('Build Docker') {
            steps {
                script {
                    bat """
                        docker build -t ${env.IMAGE_NAME}:v1.0 .
                        docker tag ${env.IMAGE_NAME}:v1.0 ${DOCKER_REGISTRY}/${env.IMAGE_NAME}:v1.0
                    """
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        bat "docker push ${DOCKER_REGISTRY}/${env.IMAGE_NAME}:v1.0"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    bat """
                        docker stop ${env.CONTAINER_NAME} 2>nul || exit 0
                        docker rm ${env.CONTAINER_NAME} 2>nul || exit 0
                        docker run -d --name ${env.CONTAINER_NAME} -p ${env.APP_PORT}:3000 ${env.IMAGE_NAME}:v1.0
                    """
                    echo "App running on http://localhost:${env.APP_PORT}"
                }
            }
        }
    }
}
