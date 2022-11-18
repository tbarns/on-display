const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

//GET all from homepage
router.get('/', async (req, res) => {
  try {
    const socialData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const socialPost = socialData.map((post) => post.get({ plain: true }));
    res.json(socialPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// We could add a login page route here

// We could also add a logout page route here

// Signup page view route

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;