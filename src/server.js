import path from 'path';
import koa from 'koa';
import koaRouter from 'koa-router';

const PORT = process.env.PORT || 8080;
const app = koa();
const router = koaRouter();

// Routes
router.get('/', function *(next) {
  this.body = 'Unity Cloud Build Processor';
});

app.use(router.routes());
app.listen(PORT);

console.log(`listening on port ${PORT}`);