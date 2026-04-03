# DATCS Local Run Plan

## Prerequisites
- Node.js (version X.X.X)  
- npm (version X.X.X)  
- Git  
- Docker (optional)  

## Environment Setup
1. Clone the repository:  
   ```bash  
   git clone https://github.com/NpHarry-Tech/Deron---Delivery-Drone-Web.git  
   cd Deron---Delivery-Drone-Web  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Set up environment variables:  
   Create a `.env` file in the root directory and configure the necessary variables according to the `.env.example`.

## Build Commands
- Build the project:  
  ```bash  
  npm run build  
  ```
- Run unit tests:  
  ```bash  
  npm test  
  ```

## Local Service Bootstrap
- Start the local server:  
  ```bash  
  npm start  
  ```
- If using Docker, run:  
  ```bash  
  docker-compose up  
  ```

## Development Workflow
1. Create a new feature branch:  
   ```bash  
   git checkout -b feature/my-feature  
   ```  
2. Make changes and commit:  
   ```bash  
   git add .  
   git commit -m "Description of changes"  
   ```  
3. Push the branch:  
   ```bash  
   git push origin feature/my-feature  
   ```  
4. Create a pull request for review.

## Troubleshooting Guide
- **Common Issues:**  
  - If the server doesn’t start, check the terminal for error messages.  
  - Ensure all dependencies are properly installed.  
- **Docker Issues:**  
  - Check if Docker is running.  
  - Review Docker logs for errors.

---  
_last updated: 2026-04-03 10:22:17 UTC_  
