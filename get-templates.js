const args = process.argv.slice(2)
if (args.length != 1) {
    console.log('use: node templates.js api-key template-id');
    process.exit(0);
}
const apiKey = args[0]
//const templateId = parseInt(args[1])
const headers = {
    'Authorization': `Bearer ${apiKey}`
}
const templateEndPoint = `https://api.pneumatic.app/templates`
let resp = await fetch(templateEndPoint, {method:'GET', headers})
if (resp.ok) {
    const templates = await resp.json()
    for (let template of templates){
        const templateDetailsEndPoint = `https://api.pneumatic.app/templates/${template.id}`
        resp = await fetch(templateDetailsEndPoint, {method: 'GET', headers})
        if (resp.ok) {
            const templateDetails = await resp.json()
            console.log(templateDetails.id, templateDetails.name)
        }else{
            console.log("failed to get template details")
        }
    }
    //console.log(data)
} else{
    console.log("failed to fetch templates")
}