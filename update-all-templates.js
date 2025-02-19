//a throway script to change the revert to parameter in all the templates for a given api key
const args = process.argv.slice(2)
if (args.length != 1) {
    console.log('use: node update-all-templates.js api-key');
    process.exit(0);
}
const apiKey = args[0]
const headers = {
    'Authorization': `Bearer ${apiKey}`
}
const allTemplatesEndPoint = 'https://api.pneumatic.app/templates'
const resp = await fetch(allTemplatesEndPoint, {method: 'GET', headers})
if (!resp.ok){
    console.log(resp);
    process.exit(0);
}
const templates = await resp.json();
for (const template of templates){
    const templateId = template.id;
    const templateEndPoint = `https://api.pneumatic.app/templates/${templateId}`;
    let resp = await fetch(templateEndPoint, {method:'GET', headers});
    if (!resp.ok){
        console.log(`failed to get template with the id of ${templateId}, skipping it`);
        continue;
    }
    const templateData = await resp.json();
    const firstTaskApiName = templateData.tasks.find(task=>task.number===1).api_name;
    templateData.tasks.forEach(task=>{
        if (task.number > 1) {
            task.revert_task=firstTaskApiName
        }
    })
    const putHeaders = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    }
    resp = await fetch(templateEndPoint, {method: 'PUT', headers: putHeaders, body: JSON.stringify(templateData)});
    if (resp.ok) {
        console.log(`template ${templateId}/${template.name} updated`);
    }else{
        console.log(resp);
    }
}
