const args = process.argv.slice(2)
if (args.length != 1) {
    console.log('1 param1 is expected');
    process.exit(0);
}
const apiKey = args[0]
const headers = {
    'Authorization': `Bearer ${apiKey}`
}
const apiKeyEndPoint = `https://api.pneumatic.app/accounts/api-key`
let resp = await fetch(apiKeyEndPoint, {method:'GET', headers})
let data = await resp.json()
console.log(data)