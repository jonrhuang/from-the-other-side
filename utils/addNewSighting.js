import path from 'node:path'
import fs from 'node:fs/promises'
import {getData} from './getData.js'

export async function addNewSighting(newSighting) {
  try {
    const data = await getData()
    console.log('data retrieved')
    data.push(newSighting)
    console.log('data pushed')

    const dataFile = path.join('data', 'data.json')
    await fs.writeFile(
      dataFile, 
      JSON.stringify(data, null, 2), 
      'utf8'
    )
    console.log('data written')

  } catch(err) {
    throw new Error(err)
  }
}