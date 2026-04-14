#!/bin/bash

SERVER="ubuntu@15.206.65.30"
KEY="/Users/rahulnakate/Data/MyProjects/LatestAWSKeypair/saras-key.pem"

echo "🚀 Building React app..."
npm run build

echo "📤 Uploading to server..."
scp -i $KEY -r build/* $SERVER:/home/ubuntu/build/

echo "📦 Deploying on server..."
ssh -i $KEY $SERVER << 'EOF'

  echo "🧹 Cleaning old files..."
  sudo rm -rf /var/www/html/*

  echo "📂 Copying new build..."
  sudo cp -r /home/ubuntu/build/* /var/www/html/

  echo "🔄 Reloading Nginx..."
  sudo systemctl reload nginx

  echo "📊 Nginx status:"
  sudo systemctl status nginx --no-pager

EOF

echo "🌐 Checking site..."

curl -I https://sarasgurukul.com

echo "✅ Deployment completed!"