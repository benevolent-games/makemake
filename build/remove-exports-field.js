#!/usr/bin/node

//
// this is a hack,
// to delete an npm package.json's "exports" field,
// which may need to happen when various build tooling is misbehaving.
//

const stdin = await (async() => {
	const stream = process.stdin
	const chunks = []
	for await (const chunk of stream)
		chunks.push(chunk)
	return Buffer.concat(chunks).toString('utf8')
})()

const packageData = JSON.parse(stdin)
delete packageData["exports"]

const newPackageJson = JSON.stringify(packageData, undefined, "\t")
process.stdout.write(newPackageJson)
