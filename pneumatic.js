export default class Pneumatic {
    constructor({apiKey, baseURL}) {
        this.apiKey = apiKey,
        this.baseURL = baseURL
        this.getHeaders = {
            'Authorization': `Bearer ${apiKey}`
        }
        this.postHeaders = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    }

    async getTemplate({templateId}) {
        const templateDetailsEndPoint = `${this.baseURL}/templates/${templateId}`
        const resp = await fetch(templateDetailsEndPoint, {method: 'GET', headers: this.getHeaders})
        if (resp.ok) {
            return await resp.json()
        }else{
            return false
        }
    }
    async getUsers() {
        const usersEndPoint = `${this.baseURL}/accounts/users`;
        const resp = await fetch(usersEndPoint, {method: 'GET', headers: this.getHeaders})
        if (resp.ok) {
            return await resp.json()
        }else{
            return false
        }

    }
    async createTemplate({templateData}) {
        const createTemplateEndpoint = `${this.baseURL}/templates`
        const resp = await fetch(createTemplateEndpoint, {
            method: 'POST', 
            headers: this.postHeaders, 
            body:JSON.stringify(templateData)
            }
        )
        if (resp.ok) {
            return await resp.text()
        }else{
            return await resp.text()
        }
    }
}