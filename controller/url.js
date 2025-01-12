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
    //whenver we use get url we push something in visit history like date
    visitHistory: [],
    //user were assigned to req.user while login and createdBy is used to return the user to appropriate users
    createdBy : req.user.id,
  });
  if (result) {
    //this id which is sent as a query is passed to the ejs through static url
    return res.redirect(`/?id=${result.shortURL}`);
  }
}
async function handleGetUrl(req, res) {
  try {
    const result = await URL.findOneAndUpdate(
      { shortURL: req.params.shortUrl },
      {
        //pushing in visithistory so we can get how many times it is clicked just by using length
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
