const Concert = require('../models/concerts');
const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');
const multer = require('multer');
const fs = require('fs');
const { warn } = require('console');

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/6gceftjuy/concert-rest-api-image-storage/"
});

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');

    if(isValid) {
      uploadError = null;
    }
    cb(uploadError, 'tmp/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
})

const upload = multer({ storage: storage })

/*********************** POST *************************/

router.post(`/`, upload.single('concertImage'), async (req, res) => {
  const file = req.file;
  if(!file) return res.status(400).send('No image in the request');

  const date = req.body.date;
  const checkDate = await Concert.find({date: date});
  if(checkDate.length !== 0) {
    console.log(checkDate.length)
    return res.status(400).json({dateUsed: true});
  }

  const fileName = req.file.filename;
  const path = "./tmp/uploads/".concat(fileName);
  const imagekitPath = "https://ik.imagekit.io/6gceftjuy/concert-rest-api-image-storage/"

  fs.readFile(path, function(err, data) {
    if (err) throw err; // Fail if the file can't be read.
    imagekit.upload({
      file : data, //required
      fileName : fileName, //required
      folder: 'concert-rest-api-image-storage',
      useUniqueFileName: false
    }, function(error, response) {
      if(error) console.log(error);
      else console.log(response);
    });
  });

  let concert = new Concert({
    concertName: req.body.concertName,
    date: req.body.date,
    time: req.body.time,
    description: req.body.description,
    concertImage: `${imagekitPath}${fileName}`,
    classPrices: {
      A1: req.body.A1,
      A2: req.body.A2,
      A3: req.body.A3
    },
    classCapacity: {
      A1Cap: req.body.A1Cap,
      A2Cap: req.body.A2Cap,
      A3Cap: req.body.A3Cap
    }
  });

  try {
    concert = await concert.save();

    if(!concert)
    return res.status(404).send('the concert cannot be created');

    res.send(concert);
  } catch (err) {
    res.send(err)
  }
});

/*********************** GET *************************/
// count total concert
router.get('/totalConcert', async (req, res) => {
  const totalConcert = await Concert.aggregate([
    {$count: "total concert"}
  ]);
  if(!totalConcert) {
    return res.status(400).json({success: false});
  }
  return res.status(200).send(totalConcert);
});

// get list concert from x date
router.get(`/`, async (req, res) => {
  const concertList = await Concert.find({date: {$gte: req.body.date}});
  if(!concertList) {
    return res.status(400).send('error');
  }
  return res.send(concertList); 
});

  //const concertList = await Concert.find({date: {$gte: req.body.date}}, {_id:1});
  //console.log(concertList[0]._id.valueOf())

router.get(`/all`, async (req, res) => {
    const concertList = await Concert.find();
    res.send(concertList); 
});

router.get('/betweendate', async (req, res) => {
  const concert = await Concert.find({date: {$gte: req.body.startDate, $lt: req.body.endDate }});
  if(!concert) {
    return res.status(400).send('error');
  }
  return res.status(200).send(concert);
});

router.get('/addonemonth', async (req, res) => {
  let endDate = new Date(req.body.date);

  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() + 1);
  endDate = endDate.toISOString().split('T')[0];

  const concert = await Concert.find({date: {$gte: req.body.date, $lt: endDate}});
  if(!concert) {
    return res.status(400).send('error');
  }
  
  return res.status(200).send(concert);
});

router.get('/:id', async (req, res) => {
  const concert = await Concert.findById(req.params.id);
  if(!concert) {
    return res.status(404).send('the concert cannot be found.');
  }

  res.status(200).send(concert);
})

/*********************** DELETE *************************/

router.delete('/:id', async (req, res)=> {
  Concert.findByIdAndRemove(req.params.id).then(concert => {
    if(concert) {
      return res.status(200).json({success: true, message: 'the concert has been deleted'});
    } else {
      return res.status(404).json({success: false, message: 'the concert not found'});
    }
  }).catch(err=>{
    return res.status(400).json({success: false, error: err})
  })
})

/********************** PUT *****************************/

router.put('/:id', upload.single("concertImage"), async (req, res)=> {
  let concert = await Concert.findById(req.params.id);
  if(!concert) {
    return res.send('send a vadid id');
  }
  const file = req.file;
  let imagePath;
  if(file) {
    const fileName = req.file.filename;
    const path = "./tmp/uploads/".concat(fileName);
    const imagekitPath = "https://ik.imagekit.io/6gceftjuy/concert-rest-api-image-storage/"
    fs.readFile(path, function(err, data) {
      if (err) throw err; // Fail if the file can't be read.
      imagekit.upload({
        file : data, //required
        fileName : fileName, //required
        folder: 'concert-rest-api-image-storage',
        useUniqueFileName: false
      }, function(error, response) {
        if(error) console.log(error);
        else console.log(response)
      });
    });

    imagePath = `${imagekitPath}${fileName}`
  } else {
    imagePath = concert.concertImage;
  }

  concert = await Concert.findByIdAndUpdate(
    req.params.id,
    {
      concertName: req.body.concertName,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
      concertImage: imagePath,
      classPrices: {
        A1: req.body.A1,
        A2: req.body.A2,
        A3: req.body.A3
      },
      classCapacity: {
        A1Cap: req.body.A1Cap,
        A2Cap: req.body.A2Cap,
        A3Cap: req.body.A3Cap
      }
    },
    {new: true}
  )

  if(!concert) {
    return res.status(400).send('the concert cannot be created');
  }

  res.send(concert);
})

module.exports = router;
