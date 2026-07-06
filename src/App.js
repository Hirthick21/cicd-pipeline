const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    const branch = process.env.BRANCH || 'main';
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>CICD App - ${branch}</title>
            <style>
                body { 
                    text-align: center; 
                    font-family: Arial, sans-serif; 
                    padding: 50px;
                    background: #f5f5f5;
                }
                .container { 
                    max-width: 800px; 
                    margin: 0 auto;
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .logo { 
                    max-width: 200px; 
                    margin: 20px 0;
                }
                .env-badge { 
                    background: ${branch === 'main' ? '#2c3e50' : '#27ae60'}; 
                    color: white; 
                    padding: 10px 20px; 
                    border-radius: 5px;
                    display: inline-block;
                    font-weight: bold;
                }
                .port-info {
                    margin-top: 20px;
                    padding: 15px;
                    background: #e8f4f8;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 CICD Application</h1>
                <div class="env-badge">Environment: ${branch}</div>
                <br><br>
                <img src="/logo.svg" alt="Logo" class="logo"/>
                <div class="port-info">
                    <h2>Deployment Details</h2>
                    <p><strong>Branch:</strong> ${branch}</p>
                    <p><strong>Port:</strong> ${branch === 'main' ? '3000' : '3001'}</p>
                    <p><strong>Container:</strong> ${branch === 'main' ? 'app-main' : 'app-dev'}</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
