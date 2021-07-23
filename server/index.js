const fs = require("fs");
const { resolve } = require("path");
const jsonServer = require("json-server");
const { routes } = require("./routes");
const uploader = require("./uploader");
const createHash = require("hash-generator");


const dbPath = resolve(__dirname, "db.json");
const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

function getSubscriptions() {
  const { subscriptions } = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  return subscriptions;
}

const validateAccessKey = (req, res, next) => {
  const subscriptions  = getSubscriptions();
  const { id } = req.params
  const subscription = subscriptions.find(sub => sub.id === Number(id));

  const { accesskey } = req.headers;

  if (accesskey !== subscription.accessKey) return res.status(401).json({ error: "Chave de acesso incorreta!"});
  req.subscriptions = subscriptions;
  next();
}

server.use(middlewares);
server.use(jsonServer.rewriter(routes));

server.get("/subscriptions/:id", validateAccessKey);

server.get("/subscriptions/:id/status", validateAccessKey, (req, res) => {
  const { subscriptions }  = req;
  const { id } = req.params
  
  const subscription = subscriptions.find(sub => sub.id === Number(id));
  if (!subscription) return res.status(404).json({ error: "Inscrição não localizada!"});
  
  
  return res.json({
    id,
    status: subscription.homologation,
    message: subscription.message,
  });
})


server.use(jsonServer.bodyParser)
server.patch("/subscriptions/:id", validateAccessKey, uploader, (req, res, next) => {
  const { subscriptions }  = req;
  const { id } = req.params;
  const subscription = subscriptions.find(sub => sub.id === Number(id));

  if (!subscription) return res.status(404).json({ error: "Inscrição não localizada!"});

  req.body.homologation = "pending";
  req.body.message = "Sua inscrição ainda está em análise!";
  req.body.updatedAt = Date.now();
    
  next();
});

server.patch("/subscriptions/:id/status", jsonServer.rewriter({
  "/subscriptions/:id/status": "/subscriptions/:id"
}))

server.post("/subscriptions", uploader, (req, res, next) => {
  const subscriptions  = getSubscriptions();
  const { cpf } = req.body;
  const subscriptionAlreadyExist = subscriptions.find(sub => sub.cpf === cpf);

  if (subscriptionAlreadyExist) return res.status(400).json({ error: "CPF já cadastrado!"})

  req.body.homologation = "pending";
  req.body.message = "Sua inscrição ainda está em análise!";
  req.body.createdAt = Date.now();
  req.body.updatedAt = null;
  req.body.accessKey = createHash(5);

  next();
})


server.use(router);
server.listen(3333, () => {
  console.log("JSON Server is running");
})