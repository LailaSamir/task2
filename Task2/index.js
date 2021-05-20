const http = require('http');
const fs = require('fs');
const port = 4000;
const htmlPage = fs.readFileSync(`${__dirname}/index.html`, "utf-8");
const rowsPage = fs.readFileSync(`${__dirname}/rows.html`, "utf-8");


let data = JSON.parse(fs.readFileSync('Lists.json', 'utf-8'));

const listdata = data["Lists"];

console.log(data);

const repaceThtml = (page, list) => {
    let output = page.replace(/TitleRow/g, list.title);
    output = output.replace(/DescriptionRow/g, list.description);
    output = output.replace(/StatusRow/g, list.status);
    return output;
};

const todo = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    Table = listdata.map((el) => repaceThtml(rowsPage, el)).join("");
    const fullpage = htmlPage.replace(/lists/g, Table);
    res.end(fullpage);
});


todo.listen(port, () => {
    console.log("server listening on port 4000");
});