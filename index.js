const express = require("express");
const app = express();

const port = process.env.PORT || 3004;
const mysql = require("./connection").con;

app.set("view engine","hbs");
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res) => {
    res.render("index");
})

app.get("/add",(req,res) => {
    res.render("add");
})

app.get("/search",(req,res) => {
    res.render("search");
})

app.get("/update",(req,res) => {
    res.render("update");
})

app.get("/delete",(req,res) => {
    res.render("delete");
})



app.get("/view",(req,res) => {
    let qry = "select * from test";
    mysql.query(qry,(err,results) => {
            if(err)
                throw err;
            else {
                res.render("view",{data:results});
            }
    })
})

app.get("/addstudent",(req,res) => {
    //fetching data from form
    const {name,phone,email,gender} = req.query;

    // Sanitization XSS...
    let qry = "select * from test where emailid=? or phoneno=?";
    mysql.query(qry,[email,phone],(err,results) => {
            if(err) 
              throw err;
            else {
                if(results.length>0) {
                    res.render("add",{checkmsg:true})
                }

                else{
                    let qry2 = "insert into test values(?,?,?,?)";
                    mysql.query(qry2,[name,phone,email,gender],(err,results) =>{
                        res.render("add",{msg:true});
                    })
                }
            }
    })
})

app.get("/searchstudent",(req,res) => {
    // Request data to be search for
        const {phone} = req.query;

        let qry = "select * from test where phoneno=?";
        mysql.query(qry,[phone],(err,results) => {
            if(err) 
                throw err;
            else {
                if(results.length > 0) {
                    res.render("search",{msg1:true,msg2:false});
                }
                else {
                    res.render("search",{msg1:false,msg2:true});
                }
            }
        })

})

app.get("/updatesearch",(req,res) => {
    const {phone} = req.query;

        let qry = "select * from test where phoneno=?";
        mysql.query(qry,[phone],(err,results) => {
            if(err) 
                throw err;
            else {
                if(results.length > 0) {
                    res.render("update",{msg1:true,msg2:false,data:results});
                }
                else {
                    res.render("update",{msg1:false,msg2:true});
                }
            }
        })
})

app.get("/updatestudent",(req,res) => {
    const {name,gender,phone} = req.query;
    
    let qry = "update test set username=?,gender=? where phoneno=?";
    mysql.query(qry,[name,gender,phone],(err,results) => {
        if(err) {
            throw err;
        }
        else {
            if(results.affectedRows > 0) {
                res.render("update",{umsg:true});
            }
        }
    })
})

app.get("/removestudent",(req,res) => {
    const {phone} = req.query;

        let qry = "delete from test where phoneno=?";
        mysql.query(qry,[phone],(err,results) => {
            if(err) 
                throw err;
            else {
                if(results.affectedRows > 0) {
                    res.render("delete",{msg1:true,msg2:false});
                }
                else {
                    res.render("delete",{msg1:false,msg2:true});
                }
            }
        })
})


app.listen(port,() => {
    console.log(`Express is running at port ${port}`);
})