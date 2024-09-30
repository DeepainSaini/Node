const http = require('http');
const fs = require('fs');
const { buffer } = require('stream/consumers');

const server = http.createServer(function(req,res){
    
    const url = req.url;
    const method = req.method;

    if(url === '/'){
       return fs.readFile('message.txt','utf8',(err,data)=>{
           res.write('<html>');
           res.write('<head><title>Enter a Message</title></head>');
           res.write('<body>');
           res.write('<h4>'+data+'</h4');
           res.write('<br>')
           res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button')
           res.write('</body');
           res.write('</html>');
           return res.end();
            
        });
        
    }

    if(url === '/message' && method === 'POST'){
        
        const body = [];

        req.on('data',(chunk)=>{
            body.push(chunk);
        });

        return req.on('end',()=>{
            const parsebody = Buffer.concat(body).toString();
            const message = parsebody.split('=')[1];
            fs.writeFile('message.txt',message,(err)=>{
               res.statusCode = 302;
               res.setHeader('location','/');
               return res.end();
            });
           
        });

    }

    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Welcome to my Node Js project</h1></body>');
    res.write('</html>');
    res.end();
   
});

server.listen(4000);