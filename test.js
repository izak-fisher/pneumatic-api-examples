import Pneumatic from "./pneumatic.js"
import {writeFile} from 'fs/promises'
const production = new Pneumatic({
    apiKey:'2yrvNMa6aM3ubV0S4W-Pp8vZPmHWeYY4', 
    baseURL:'https://api.pneumatic.app'}
)
const dev = new Pneumatic({
    apiKey: 'fj592P2ipjDX3_id2raJowH0nmqCADdB',
    baseURL:'https://api-dev.pneumatic.app'
})
//const dev = new Pneumatic({
//    apiKey: 'g-DvJPOP8dJ9qme2kfQFUzwHGOIZTWDY',
//    baseURL:'https://api.pneumatic.app',
//})
const sourceTemplate = await production.getTemplate({templateId: 43485})
if (!sourceTemplate) {
    console.log('failed to get template')
    process.exit(0);
}
const users =  await dev.getUsers();
if (!users) {
    console.log('failed to get users')
    process.exit(0);
}
const targetUserId = 3685
//const targetUserId = 4113;//this is supposed to be me...
const targetUser = users.find(user=>parseInt(user.id)===targetUserId)
if (!targetUser) {
    console.log('no target user found')
    process.exit(0)
}
const templateData = sourceTemplate

delete templateData["id"];
const newOwner = {
    api_name: templateData.owners[0].api_name,
    type: templateData.owners[0].type,
    source_id:targetUserId,
}
templateData.is_active = false;
templateData.owners.length = 0;
templateData.owners.push(newOwner)
templateData.tasks = templateData.tasks.map(task =>{
    const newPerformer = task.raw_performers[0]
    newPerformer.source_id = null
    newPerformer.type = 'workflow_starter'
    newPerformer.label = 'Workflow starter'
    const newTask = {...task}
    newTask.raw_performers.length = 0
    newTask.raw_performers.push(newPerformer)
    delete newTask["revert_task"] 
    return newTask
})
//console.log(templateData)
try {
    await writeFile('template-data.json', JSON.stringify(templateData), {encoding:"utf8"})
    console.log("file written")
}catch(err){
    console.log("failed to write file:", err)
}


const result = await dev.createTemplate(templateData)
console.log(result)