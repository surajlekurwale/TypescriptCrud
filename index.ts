const express = require('express');

const mysql = require('mysql')

const app= express()
app.use(express.json())

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    port:"3306",
    database:"whatsapp"
})

db.connect((error:string)=>{
    if(error){
        console.log("Error found....")
    }else{
        console.log("Connection SuccessFully..")
    }
})


app.post('/postdata', (req:Request, res:Response)=>{

   const data = req.body;
   const sql = `INSERT INTO customer SET ?`
   db.query(sql, data,(err:string, result:string)=>{
    if(err){
        console.log({err:"Data Not Post..."})
       
    }else{
        console.log({result:"Data Post SuccessFullly...."})
    }
    
   })

})

app.get('/getdata', (req:Request, res:Response)=>{
    const sql =` SELECT * FROM customer`
    db.query(sql,(err:string, result:string)=>{
        if(err){
            console.log({err:"data Not Get..."})
        }else{
            console.log({result:"data get SuccessFully..."})
        }
    })
})


app.put('/dataupdate/:id', (req:Request, res:Response)=>{
    // const id = req.params.id;
    const data = req.body;
    const sql = `UPDATE customer SET ? WHERE id=?`
    db.query(sql, [data],(err:string, result:string)=>{
        if(err){
            console.log({err:"Data Not Update"})
        }else{
            console.log({result:"Data Update SuccessFully..."})
        }
    })
})

app.delete('/datadelete/:id', (req: Request, res: Response) => {
    const data = req.body;
    const sql = `DELETE FROM customer WHERE id=?`;
    db.query(sql, [data],(err:string, result:string)=>{
        if (err) {
            console.log({ err: "Data Not Delete" });
        } else {
            console.log({ result: "Data Delete Successfully..." });
        }
    });
});




const PORT:Number = 5500

app.listen(PORT, ()=>{
    console.log(`Server Started On ${PORT}`)
})

