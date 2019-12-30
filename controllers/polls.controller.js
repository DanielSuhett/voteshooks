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
    
      poll.question = req.body.question;
      poll.userId = user._id;

      for (const option of req.body.options) {
        const { title, countVotes } = option;

        poll.options.push({
          title: title,
          count_votes: countVotes
        })
      }

      poll.save()

      user.polls.push(poll);

      user.save().then(
        res.status(201).send({
          create_poll: true
        })
      );
    });
};

exports.getPolls = (req, res) => {
  pollModel.find({ userId: decodeTokenUserId(req.headers["x-access-token"])  },
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

exports.getPoll = (req, res) => {
  pollModel.findOne({
    userId: decodeTokenUserId(req.headers["x-access-token"]), 
    _id: new mongoose.mongo.ObjectID(req.params.id)
  },
    (err, poll) => {
      if (err) {
        console.log(`Error: ` + err);
      } else {
        if (poll.length === 0) {
          res.status(404).send("Not found poll");
        } else {
          res.status(200).send(poll);
        }
      }
    }
  );
};

exports.updatePoll = (req, res) => {
  pollModel.findOneAndUpdate({
     userId: decodeTokenUserId(req.headers["x-access-token"]),
    _id: new mongoose.mongo.ObjectID(req.params.id)
  },
  { question: req.body.question, options: req.body.options },
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
    userId: decodeTokenUserId(req.headers["x-access-token"]), 
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
