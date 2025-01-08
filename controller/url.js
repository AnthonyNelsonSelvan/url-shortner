const { nanoid } = require("nanoid");
const URL = require("../model/url");

async function handleCreateShortUrl(req, res) {
  shortid = nanoid(6);
  if (!req.body.url) {
    return res.json({ status: "no url recieved" });
  }
  const result = await URL.create({
    shortURL: shortid,
    redirectUrl: req.body.url,
    visitHistory: [],
    createdBy : req.user._id,
  });
  if (result) {
    res.redirect('/test');
  }
}
async function handleGetUrl(req, res) {
  try {
    const result = await URL.findOneAndUpdate(
      { shortURL: req.params.shortUrl },
      {
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          },
        },
      }
    );
    if (!result) {
      console.log("url not found");
    } else {
      return res.redirect(result.redirectUrl);
    }
  } catch (err) {
    console.log(err);
  }
}
// async function handleGetUrlAdress(req, res) {
//   const result = await URL.findOne({ shortURL: req.params.shortUrl });
//   if (!result) {
//     return res.status(404).send("Short URL not found");
//   }
//   return res.send(result.redirectUrl);
// } // not working
async function handleDeleteUrl(req, res) {
  await URL.findOneAndDelete({ shortURL: req.params.shortUrl });
  return res.json({ status: "deleted succesfully" });
}
module.exports = {
  handleCreateShortUrl,
  handleGetUrl,
  // handleGetUrlAdress,
  handleDeleteUrl,
};
