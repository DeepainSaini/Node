
const fs = require('fs');

function requestHandler(req,res){
   
    res.setHeader('Content-Type','text/html');
    const url = req.url;
    const method = req.method;


    if(url === "/"){
        
        fs.readFile('message.txt',{encoding : "utf-8"},(err,data)=>{
    
            if(err){
                console.log(err);
            }
            
                console.log(data);
                res.write('<html>');
                res.write('<head><title>Send Message</title></head>');
                res.write('<body>');
                res.write(`<p>${data}</p>`);
                res.write(`<form action="/message" method="POST" ><input type="text" name="message"><button type="submit">Send</button></form>`);
                res.write('</body>');
                res.write('</html>');
                return res.end();
        
           
        })
    
       
    }
    
    else if(url === "/message" && method === "POST"){
        
        const body = [];
        req.on('data',function(chunks){
            body.push(chunks);
            console.log(body);
        })
    
       return req.on('end',function(){
    
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile('message.txt',message,(err)=>{
                if(err){
                    console.log(err);
                }
                res.statusCode = 302;
                res.setHeader('location','/')
                return res.end();
            });
         
        })
    
    
      
        
    }
    else{
        res.write('<html>')
        res.write('<head><title>My first page</title></head>')
        res.write('<p>hello from node</p>')
        res.write('</html>')
        res.end();
    }
}


module.exports = requestHandler;
