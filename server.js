// Handle Setup

const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const next = require('next')
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const port = process.env.PORT || 3000



// array of all currently active sessions
let activeSessions= [];



// Handle socket io connections

io.on('connection', socket => { // called when frontend client connects

    let index = 0;
    console.log(activeSessions, "LIST OF ALL ACTIVE SESSIONS")
    activeSessions[index].socketId = socket.id; // 
    index++;
  
    socket.on('disconnect', () => { // delete session on disconnect
  
      activeSessions = activeSessions.filter(s => { // Remove the disconnected user from the active sessions array
        return s.socketId !== socket.id
      })
      index--;
    })
  })


// Called when a new client with an embedded player is activated

app.post('/createsession', jsonParser, (req, res) => { 
  const { name } = req.body;

  let session = activeSessions.find(o => o.name.toLowerCase() === name.toLowerCase()); // searches for an active session with that name
 
  if (session === undefined || session === null) { // creates a new session
    //createSocket(req.params.name);
    activeSessions.push({
      name : name.toLowerCase(),
      suggestedvideos : []
    })
    console.log(activeSessions, "list of active sessions")
    res.status(201).json(`${name} created`)
  }
  

  else { // session name already taken
    res.status(409).json("name already exists")
  }

})


// Called when someone sents a video suggestion

app.post('/suggestvideo', jsonParser, (req, res) => { 

    const {videoUrl, videoName, postId} = req.body
  
    const session = activeSessions.find(s => { // find the specific session from the active sessions list
        return s.name === postId
    })

    if (session === undefined) { // if the specific session wasnt found respond with a 404
        res.status(404).json("not found")
    }

    else { // emit the video to the specific client
        io.emit(`${postId} video`, {videoName : videoName, videoUrl : videoUrl});
        res.status(200).json("data received and handled")
    }


})

app.get('/share/:id', (req, res) => { // Serve the URL link sharing page
    const { id } = req.params;
    let session = activeSessions.find(o => o.name === id);
    console.log(session, "MEMEMEM")
    if (session === undefined || id === null){ // If session doesnt exist serve the notfound page
      return nextApp.render(req, res, '/notfound', { id: id })
    }
    
    else {
      return nextApp.render(req, res, '/share', { id: id }) // serve the share page with ID initial props
    }

})
  


// Initialize the custom nextJS server
nextApp.prepare().then(() => {

  app.get('*', (req, res) => {
    return nextHandler(req, res);
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})