import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

const DEBUG = (msg) => {
  const debug = true
  debug && console.log("DEBUG => ", msg)
}

class User{
	constructor(name,password) {
		this.id = Date.now()
		this.name = name
		this.password = password
	}
}

async function addUser(name, password, res) {
	DEBUG('addUser')
	DEBUG(`Name :${name}; Password ${password}`)
	await db.read()
	db.data ||= { users: [] }
	const user = new User(name, password)
	db.data.users.push(user)
	await db.write()
	DEBUG(`addUser :: ${JSON.stringify(user)}`)
  // return res.json({message: `Utilisateur ${name} créé avec succes.`})
}

async function delUser(id, res){
	DEBUG('delUser')
	DEBUG(`Id :${id}`)
	await db.read()
	let users = db.data.users
	DEBUG(`users :${JSON.stringify(users)}`)
	const index = users.findIndex(x => x.id == id)
	if (!index){
		DEBUG('Utilisateur non trouvé')
		// res.json({message: 'Utilisateur non trouvé'})
	}
	DEBUG(users[index])
	const name = users[index].name
	users.splice(index,1)
	await db.write()
	DEBUG(JSON.stringify(users))
	DEBUG(`delUser :: L'utilisateur ${name} supprimé.`)
  // return res.json({message: `Utilisateur ${name} supprimé avec succes.`})
}

async function getUser(id, res){
	DEBUG('getUser')
await db.read()
	await db.read()
	const user = id  
		? db.data.users.find(x => x.id = id)
		: db.data.users
	
	DEBUG(JSON.stringify(user))
	// return res.json(user)
}

export  {addUser, delUser, getUser} 
