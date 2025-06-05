const args = process.argv.slice(2)
if (args.length != 2) {
    console.log('need apiKey and template id (two params)');
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
    const template = await resp.json()
    console.log(template.owners)
    template.owners = template.owners.filter(owner=>owner.source_id !== 'undefined')
    console.log(template.owners)
    const putHeaders = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    }
    resp = await fetch(templateEndPoint, {method: 'PUT', headers: putHeaders, body: JSON.stringify(template)});
    if (resp.ok) {
        console.log('template updated')
    }else {
        console.log('something has gone wrong')
    }
} else{
    console.log("failed to fetch templates")
}