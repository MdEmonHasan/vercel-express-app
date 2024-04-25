import express from 'express';
import fs from 'fs';
import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});


router.post('/', (req, res)=>{

  const newData = req.body;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    let existingData = JSON.parse(data);
    let found = false;
    for (let i = 0; i < existingData.length; i++) {
      if (existingData[i].key === newData.key) {
        existingData[i].age = newData.age;
        found = true;
        break;
      }
    }
    if (!found) {
      // newData.key = uuidv4(); // Generate a unique ID
      existingData.push(newData);
    }
    fs.writeFile('data.json', JSON.stringify(existingData), werr => {
      if (werr) {
        console.error(werr);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send(newData);
    });
  });
  // res.json({
  //   message: 'API - 👋🌎🌍🌏',
  // });
});
router.use('/emojis', emojis);

export default router;
