// npm install xlsx
// git clone https://github.com/gs1/GS1DigitalLinkCompressionPrototype.git 

const GS1DigitalLinkToolkit =require("./GS1DigitalLinkCompressionPrototype/src/GS1DigitalLinkToolkit");
var gs1dlt=new GS1DigitalLinkToolkit();
//var uri = "https://ilfd.uk/01/019498780608/21/2";

function compress(uri) {
    if(uri===undefined || uri.length==0) return "";
    var gs1uriElements = gs1dlt.analyseURI(uri,false);
    return gs1dlt.compressGS1DigitalLink(uri, useShortText=false,uriStem=gs1uriElements.uriStem);
    //gs1dlt.compressGS1DigitalLink(uri,(this.shortnames =="true")),this.uristem,(this.uncompressedPrimary=="true"),(this.useOptimisations=="true"),(this.compressOtherKeyValuePairs=="true"));
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
        res["Compressed-JS-gs1-alpha"] = compress(res['QR CODE (Full GS1 Digital link support, ePOS etc)'])
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
reader.writeFile(file, "./file-compressed-gs1-alpha.xlsx");