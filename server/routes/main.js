const express = require("express")
const router = express.Router()
const post = require("../models/Post")

router.post("/search", async (req, res) => {
    
    try {
        const locals = {
            title: "search page",
            desc: "Welcome to my blog"
    
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialchar = searchTerm.replace(/[^a-zA-Z0-9]/g,"")
        const data = await post.find({
            $or :[
                {title:{$regex: new RegExp(searchNoSpecialchar,"i")}},
                {body:{$regex: new RegExp(searchNoSpecialchar,"i")}},
            ]
        })
        res.render("searchpage",{
            data,
            locals
        })

    } catch (error) {
        console.log(error)
    }

});

router.get("", async (req, res) => {
    
   
    try {
        const locals = {
            title: "sample blog",
            desc: "Welcome to my blog"
        }
        let perPage = 7
        let page = req.query.page || 1
        
    
        const data = await post.aggregate([{$sort:{createdAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec()

        const count = await post.countDocuments()
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);


        res.render('index', {
            locals,
            data,
            current:page,
            nextPage: hasNextPage ? nextPage : null
     });

    } catch (error) {
        console.log(error)
    }

});


router.get("/post/:id", async (req, res) => {
    
    try {
        const locals = {
            title: "NodeJs  blog",
            desc: "Simple blog page created with NodeJs,Express & MongoDb"
        }
        let slug = req.params.id;

        const data = await post.findById({_id:slug});
        res.render('post', { locals, data });

    } catch (error) {
        console.log(error)
    }

});


/*function insertPostData() 
{
    post.insertMany([
        {
            title: "Implementation of RESTful APIs",
            body: "Learn how to hit the diffrent end point of RESTful API like making GET,POST,PUT,PATCH,DELETE requests using Postman.What is a REST API? An API, or application programming interface,is a set of rules that define how applications or devices can connect to and communicate with each other.A REST API is an API that conforms to the design principles of the REST, or representational state transfer architectural style."
   
       },
        {
            title: "API Authentication",
            body: "general authentication like password based authentication and advanced authentication techniques such as bearer-token authentication.The purpose of API authentication and authorization is to ensure that only authorized users or applications are able to access the API and the resources it provides. This helps to protect sensitive data, and ensures that the API is used in a manner that is consistent with its intended purpose."
        },
        {
            title: "Authentication and Authorization in Node.js",
            body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
        },
        {
            title: "Understand how to work with MongoDB and Mongoose",
            body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
        },
        {
            title: "build real-time, event-driven applications in Node.js",
            body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
        },
        {
            title: "Discover how to use Express.js",
            body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
        },
        {
            title: "Asynchronous Programming with Node.js",
            body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
        },
        {
            title: "Learn the basics of Node.js and its architecture",
            body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
        },
        {
            title: "NodeJs Limiting Network Traffic",
            body: "Learn how to limit netowrk traffic."
        },
        {
            title: "Learn Morgan - HTTP Request logger for NodeJs",
            body: "Learn Morgan."
        },
        {
            title: "Learn Axios",
            body: "It is an excellent middleware that enhances readibility of code."
        },

    ])
}

insertPostData();*/


module.exports = router;

