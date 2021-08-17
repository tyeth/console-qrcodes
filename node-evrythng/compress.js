// npm install digital-link.js xlsx

const {DigitalLink,Utils} = require('digital-link.js');


function compress(uri) {
    if(uri===undefined || uri.length==0) return "";
    var dl = DigitalLink(uri);
    return dl.toCompressedWebUriString()
}

// Requiring module
const reader = require('xlsx')
  
// Reading our test file
const file = reader.readFile('./file.xlsx')
  

let data = []
let cData = []  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
        res["Compressed-JS-evrythng"] = compress(res['QR CODE (Full GS1 Digital link support, ePOS etc)'])
      data.push(res)
   })
}
  
// Printing data
console.log(data)

// reader.utils.sheet_add_json(
//     sheet=file.Sheets[file.SheetNames[0]],
//     data=data
//     )
var newSheet = reader.utils.json_to_sheet(data);
file.Sheets[file.SheetNames[0]] = newSheet;
reader.writeFile(file, "./file-compressed.xlsx");




// // Sample data set
// let student_data = [{
//     Student:'Nikhil',
//     Age:22,
//     Branch:'ISE',
//     Marks: 70
// },
// {
//     Name:'Amitha',
//     Age:21,
//     Branch:'EC',
//     Marks:80
// }]
  
// const ws = reader.utils.json_to_sheet(student_data)
  
// reader.utils.book_append_sheet(file,ws,"Sheet3")
  
// // Writing to our file
// reader.writeFile(file,'./file-compressed.xlsx')