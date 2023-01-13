const Admin = require('../models/admins')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/*********************** POST *************************/
router.post(`/register`, async (req, res) => {
  let admin = new Admin({
    username: req.body.username,
    passwordHash: bcrypt.hashSync(req.body.passwordHash),
    superadmin: req.body.superadmin,
    concert_id: req.body.concert_id
  });

  try {
    admin = await admin.save();
    if (!admin)
      return res.status(400).send('the admin cannot be created....');

    res.send(admin);
  } catch (err) {
    res.send(err)
  }
});

// login user
router.post('/login', async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });

  if (!admin) {
    return res.status(400).send('The admin not found');
  };

  if (admin && bcrypt.compareSync(req.body.password, admin.passwordHash)) {
    
    const token = jwt.sign(
      {
        admin_id: admin.id,
        username: admin.username,
        concert_id: admin.concert_id
      },
      process.env.SECRET,
      {expiresIn : '1d'}
    )

    res.status(200).send({token: token});
  } else {
    return res.status(200).send('The password is incorrect');
  }
});

/*********************** GET *************************/

// get all concert admin (superadmin: false)
router.get(`/concertAdmin`, async (req, res) => {
  const concertAdminList = await Admin.find({superadmin: false});
  if (!concertAdminList) {
    res.status(500).json({ success: false });
  }
  res.send(concertAdminList);
});

// count total concert admin
router.get('/totalConcertAdmin', async (req, res) => {
  const totalConcertAdmin = await Admin.aggregate([
    {$match: {superadmin: false}},
    {$count: "total concert admin"}
  ]);
  if(!totalConcertAdmin) {
    return res.status(400).json({success: false});
  }
  return res.status(200).send(totalConcertAdmin);
});


// get admin concert by id
router.get('/:id', async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if(!admin) {
    res.status(500).json({message: 'The admin with the given ID was not found.'})
  }
  res.status(200).send(admin);

})
/*********************** DELETE *************************/

// delete ticket by id
router.delete('/:id', async (req, res)=> {
  Admin.findByIdAndRemove(req.params.id).then(admin => {
    if(admin) {
      return res.status(200).json({success: true, message: 'the admin has been deleted'});
    } else {
      return res.status(404).json({success: false, message: 'the admin not found'});
    }
  }).catch(err=>{
    return res.status(400).json({success: false, error: err})
  })
})

/*********************** UPDATE *************************/

router.put('/:id', async (req, res) => {
  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      concert_id: req.body.concert_id,
    },
    { new: true }
  )

  if (!admin) {
    return res.status(400).send('the admin cannot be created');
  }

  res.send(admin);
})

module.exports = router;
