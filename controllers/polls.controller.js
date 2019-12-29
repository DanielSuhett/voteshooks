const mongoose = require("../config/db");
const pollModel = require("../models/poll");
const userModel = require("../models/user");
const decode = require("jwt-decode");

exports.createPoll = (req, res) => {
  userModel
    .findOne({
      _id: new mongoose.mongo.ObjectId(
        decodeTokenUserId(req.headers["x-access-token"])
      )
    })
    .then(user => {
      const poll = new pollModel();

      for (const option of req.body.options) {
        const { title, countVotes } = option;

        poll.options.push({
          title: title,
          userId: user._id,
          count_votes: countVotes
        })
      }

      poll.save()

      user.data.push(poll);

      user.save().then(
        res.status(201).send({
          create_poll: true,
          poll
        })
      );
    });
};

exports.getPolls = (req, res) => {
  pollModel.find({ options: { $elemMatch: { userId: decodeTokenUserId(req.headers["x-access-token"]) } } },
    (err, polls) => {
      if (err) {
        console.log(`Error: ` + err);
      } else {
        if (polls.length === 0) {
          res.status(404).send("Not found polls");
        } else {
          res.status(200).send(polls);
        }
      }
    }
  );
};

exports.updatePoll = (req, res) => {
  pollModel.findOneAndUpdate({
    options: { $elemMatch: { userId: decodeTokenUserId(req.headers["x-access-token"]) } },
    _id: new mongoose.mongo.ObjectID(req.params.id)
  },
  { options: req.body.options },
    (err, poll) => {
      if (err) res.status(500).send(err);
      else {
        if (poll)
          res.status(200).send({
            update: true,
            update_at: new Date()
          });
        else res.status(404).send("Not found poll");
      }
    }
  );
}

exports.deletePoll = (req, res) => {
  pollModel.findOneAndDelete({
    options: { $elemMatch: { userId: decodeTokenUserId(req.headers["x-access-token"]) } },
    _id: new mongoose.mongo.ObjectID(req.params.id)
  },
    (err, poll) => {
      if (err) res.status(500).send(err);
      else {
        if (poll)
          res.status(200).send({
            deleted: true,
            deleted_at: new Date()
          });
        else res.status(404).send("Not found poll");
      }
    }
  );
};

const decodeTokenUserId = token => {
  return decode(token).id;
};
