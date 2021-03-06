

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


// all currently active sessions
let activeSessions= [];


// Handle socket io messages
io.on('connection', socket => { // called when frontend client connects
  
    let index = 0;
    activeSessions[index].socketId = socket.id; 
    index++;
  
    socket.on('disconnect', () => { // delete session on disconnect
  
      activeSessions = activeSessions.filter(s => { // Remove the disconnected user from the active sessions array
        return s.socketId !== socket.id
      })
      index--;
    })
  })


// Initialize the custom nextJS server
nextApp.prepare().then(() => {

  // Serve the URL link sharing page
  app.get('/share/:id', (req, res) => {
    const { id } = req.params;
    let session = activeSessions.find(o => o.name === id);

    if (session === undefined || id === null){ // If session doesnt exist serve the notfound page
      return nextApp.render(req, res, '/notfound')
    }
    
    else {
      return nextApp.render(req, res, '/share', { id } ) // serve the share page with ID initial props
    }

  })


  // Emit message to a specific client
  app.post('/suggestvideo', jsonParser, (req, res) => { 
    console.log("video suggested")
    const {videoUrl, videoName, id} = req.body

    const session = activeSessions.find(s => { // find the specific session from the active sessions list
        return s.name === id
    })

    if (session === undefined) { // if the specific session wasnt found respond with a 404
        res.status(404).json("not found")
    }

    else { // emit the video to the specific client
        io.emit(`${id} video`, {videoName : videoName, videoUrl : videoUrl});
        console.log("emitting data");
        res.status(200).json("data received and handled")
    }
  })


  // Append a new session to created sessions array
  app.post('/createsession', jsonParser, (req, res) => {
    const { name } = req.body;

    let session = activeSessions.find(o => o.name.toLowerCase() === name.toLowerCase()); // Make sure that name is not already taken
  
    if (session === undefined || session === null) { 
      //createSocket(req.params.name);
      activeSessions.push({
        name : name.toLowerCase(),
        suggestedvideos : []
      })
      res.status(201).json(`${name} created`)
    }
    

    else { // session name already taken
      res.status(409).json("name already exists")
    }

  })


  app.get('*', (req, res) => {
    return nextHandler(req, res);
  })


  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})