const args = process.argv.slice(2)
if (args.length != 2) {
    console.log('use: node templates.js api-key template-id');
    process.exit(0);
}
const apiKey = args[0]
const templateId = parseInt(args[1])
const headers = {
    'Authorization': `Bearer ${apiKey}`
}
const templateEndPoint = `https://api.pneumatic.app/templates/${templateId}`
let resp = await fetch(templateEndPoint, {method:'GET', headers})
if (resp.ok) {
    const templateData = await resp.json();
    const firstTaskApiName = templateData.tasks.find(task=>task.number===1).api_name;
    templateData.tasks.forEach(task=>{
        if (task.number > 1) {
            task.revert_task=firstTaskApiName
        }
    })
    console.log(templateData);
    headers['Content-Type']='application/json';
    resp = await fetch(templateEndPoint, {method: 'PUT', headers, body: JSON.stringify(templateData)});
    if (resp.ok) {
        console.log('template successfully updated, apparently...');
    }else{
        console.log(resp);
    }
}else{
    console.log("fetch failed");
}