const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  const news = [
    {
      title: "震惊! 天翼3g居然这么快!",
      time: "2008-7-12",
    },
    {
      title: "震惊! 华中科技大学等来了小熊!",
      time: "2019-9-1",
    },
    {
      title: "震惊! 知名互联网团队内的椅子居然全是坏的!",
      time: "2021-7-13",
    },
  ];
  ctx.body = news;
});

app.listen(7777);
console.log("server running at 7777");