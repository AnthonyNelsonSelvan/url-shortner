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
    createdBy : req.user.id,
  });
  if (result) {
    //this id which is sent as query is passed to the ejs through static url
    return res.redirect(`/?id=${result.shortURL}`);
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
module.exports = {
  handleCreateShortUrl,
  handleGetUrl,
};
