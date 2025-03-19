const args = process.argv.slice(2)
if (args.length != 2) {
    console.log('use: node templates.js api-key template-id');
    process.exit(0);
}
const apiKey = args[0]
const workflowId = parseInt(args[1])
const headers = {
    'Authorization': `Bearer ${apiKey}`
}
const templateEndPoint = `https://api.pneumatic.app/workflows/${workflowId}`
let resp = await fetch(templateEndPoint, {method:'GET', headers})
let workflowData = await resp.json()
console.log(workflowData.current_task.performers)