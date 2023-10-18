<div align="center">
  <a href="http://netflix-clone-with-tmdb-using-react-mui.vercel.app/">
    <img src="./public/assets/netflix-logo.png" alt="Logo" width="100" height="32">
  </a>

  <h3 align="center">Netflix Clone</h3>

  <p align="center">
    <a href="https://netflix-clone-react-typescript.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/crazy-man22/netflix-clone-react-typescript/issues">Report Bug</a>
    ·
    <a href="https://github.com/crazy-man22/netflix-clone-react-typescript/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#prerequests">Prerequests</a>
    </li>
    <li>
      <a href="#which-features-this-project-deals-with">Which features this project deals with</a>
    </li>
    <li><a href="#third-party-libraries-used-except-for-react-and-rtk">Third Party libraries used except for React and RTK</a></li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>

<br />

<div align="center">
  <img src="./public/assets/home-page.png" alt="Logo" width="100%" height="100%">
  <p align="center">Home Page</p>
  <img src="./public/assets/mini-portal.png" alt="Logo" width="100%" height="100%">
  <p align="center">Mini Portal</p>
  <img src="./public/assets/detail-modal.png" alt="Logo" width="100%" height="100%">
  <p align="center">Detail Modal</p>
  <img src="./public/assets/grid-genre.png" alt="Logo" width="100%" height="100%">
  <p align="center">Grid Genre Page</p>
  <img src="./public/assets/watch.png" alt="Logo" width="100%" height="100%">
  <p align="center">Watch Page with customer contol bar</p>
</div>

**Phase 1: Initial Setup and Deployment**

1. **Launch EC2 (Ubuntu 22.04):**
    - Provision an EC2 instance on AWS with Ubuntu 22.04.
    - Connect to the instance using SSH.
2. **Clone the Code:**
    - Clone your application's code repository onto the EC2 instance:
        
        ```bash
        git clone <repository_url>
        
        ```
        
3. **Get the API Key:**
    - Retrieve the TMDB API key for your application.
4. **Install Docker and Run the App Using a Container:**
    - Set up Docker on the EC2 instance:
        
        ```bash
        sudo apt update
        sudo apt install docker.io
        
        ```
        
    - Build and run your application using Docker containers.

**Phase 2: CI/CD Setup**

1. **Install Jenkins for Automation:**
    - Install Jenkins on the EC2 instance to automate deployment:
        
        ```bash
        sudo apt install openjdk-11-jdk
        wget -q -O - <https://pkg.jenkins.io/debian/jenkins.io.key> | sudo apt-key add -
        sudo sh -c 'echo deb <http://pkg.jenkins.io/debian-stable> binary/ > /etc/apt/sources.list.d/jenkins.list'
        sudo apt update
        sudo apt install jenkins
        sudo systemctl start jenkins
        sudo systemctl enable jenkins
        
        ```
        
    - Access Jenkins in a web browser using the public IP of your EC2 instance.
2. **Install Necessary Plugins in Jenkins:**
    - Configure Jenkins by installing necessary plugins, including Node.js support.
3. **Configure CI/CD Pipeline in Jenkins:**
    - Create a CI/CD pipeline in Jenkins to automate your application deployment.

**Phase 3: Security**

1. **Install SonarQube and Trivy:**
    - Install SonarQube and Trivy on the EC2 instance to scan for vulnerabilities.
2. **Integrate SonarQube and Configure:**
    - Integrate SonarQube with your CI/CD pipeline.
    - Configure SonarQube to analyze code for quality and security issues.
3. **Integrate OWASP Dependency Check:**
    - Integrate OWASP Dependency Check into your CI/CD pipeline to identify vulnerable dependencies.

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