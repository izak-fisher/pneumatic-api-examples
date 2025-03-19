const args = process.argv.slice(2)
if (args.length != 2) {
    console.log('2 params are expected');
    process.exit(0);
}
const apiKey = args[0]
const headers = {
    'Authorization': `Bearer ${apiKey}`
}
const taskId = args[1]
const taskEventsEndPoint = 'https://api.pneumatic.app/v2/workflows/${taskId}/events'
let resp = await fetch(taskEventsEndPoint, {method:'GET', headers})
if (resp.ok){
    const data = await resp.json()
    console.log(data)
}else{
    console.log(resp)
}