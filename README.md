# Procno note

### Recording audio needs SSL
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#privacy_and_security
Localhost is considered safe. Accessing from `192.168.1.15` for example, is not. 
Use a reverse proxy i.e `nginx` to secure the source. Or better, run the web server with

```bash
#
#  create cert: ./mkcert-v1.4.3-linux-amd64 localhost 127.0.0.1 192.168.1.15
HTTPS=true SSL_CRT_FILE=../localhost+2.pem SSL_KEY_FILE=../localhost+2-key.pem npm start
```

And open the browser to trust the certificate for each port: FE 3000, BE 8888
https://192.168.1.15:8888/api/v1/topics/own-topics/

However, backend is not protected with SSL. The reverse proxy should work:

```bash
sudo apt install nginx
sudo ufw allow 'Nginx HTTP'
sudo mkdir  /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/selfsigned.key -out /etc/nginx/ssl/selfsigned.cert

#Country Name (2 letter code) [AU]:de
#State or Province Name (full name) [Some-State]:berlin
#Locality Name (eg, city) []:berlin
#Organization Name (eg, company) [Internet Widgits Pty Ltd]:procno
#Organizational Unit Name (eg, section) []:procno
#Common Name (e.g. server FQDN or YOUR name) []:192.168.1.15
#Email Address []:procno


sudo gedit /etc/nginx/sites-enabled/procno_15.conf

sudo systemctl reload nginx
```


```c
server {
    listen 3001 ssl ;
    server_name 192.168.1.15;
    access_log  /var/log/nginx/procno_15.access.log;
    error_log   /var/log/nginx/procno_15.error.log;
    ssl_certificate             /etc/nginx/ssl/selfsigned.cert;
    ssl_certificate_key         /etc/nginx/ssl/selfsigned.key;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_buffering off;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Referer "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
    }
}

server {
    listen 8889 ssl;
    server_name 192.168.1.15;
    access_log  /var/log/nginx/procno_15.access.log;
    error_log   /var/log/nginx/procno_15.error.log;
    ssl_certificate             /etc/nginx/ssl/selfsigned.cert;
    ssl_certificate_key         /etc/nginx/ssl/selfsigned.key;
    location / {
        proxy_pass http://127.0.0.1:8888;
        proxy_buffering off;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Referer "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
    }
}
```


```
getUserMedia() is a powerful feature which can only be used in secure contexts; 
in insecure contexts, navigator.
mediaDevices is undefined, preventing access to getUserMedia(). 
A secure context is, in short, a page loaded using HTTPS or the file:/// URL scheme, 
or a page loaded from localhost. 
```








# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
