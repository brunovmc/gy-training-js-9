const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = express();
const port = 3000;

function increaseFrequencyUntil500000(file) {
  const updatedData = [];

  fs.createReadStream(file)
    .pipe(csvParser({ separator: ',' }))
    .on('data', (row) => {
      let freq = parseInt(row.freq);
      if (!isNaN(freq) && freq < 500000) {
        while (freq < 500000) {
          freq++;
        }
        row.freq = freq.toString();
      }
      updatedData.push(row);
      console.log(`${row.nome} - ${row.freq}`);
    })
    .on('end', () => {
      console.log("Frequencies updated in the console.");
    });
}

app.get('/read-csv', (req, res) => {
  const file = 'ibge-fem-10000 (3).csv';
  increaseFrequencyUntil500000(file);

  res.send("Frequencies updated in the console.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
