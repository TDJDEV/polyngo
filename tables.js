import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

class User{
	constructor(name,password) {
		this.id = Date.now()
		this.name = name
		this.password = password
	}
}
await db.read()

function addUser(name, password) {
	const user = new User(name, password)
	db.data.users.push(user)
	await db.write()
}

function delUser(id,res){
	let users = db.data["users"]
	const index = users.findIndex(x => x.id == id)
	const name = users[index].name
	users = users.splice(index,1)
	await db.write()
  return res.json(`Utilisateur ${name} supprimé avec succes.`)
}

export {addUser, delUser}
