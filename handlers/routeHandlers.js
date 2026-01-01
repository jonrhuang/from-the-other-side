import { getData } from '../utils/getData.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { sendResponse } from '../utils/sendResponse.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'
import { sightingEvents } from '../events/sightingEvents.js'

export async function handleGet(res) {
  const data = await getData()
  const content = JSON.stringify(data)
  sendResponse(res, 200, 'application/json', content)
} 

export async function handlePost(req, res) {
  try {
    const parsedBody = await parseJSONBody(req)
    const cleanedBody = sanitizeInput(parsedBody)
    sightingEvents.emit('sighting-added', cleanedBody)
    await addNewSighting(cleanedBody)
    sendResponse(res, 201, 'application/json', JSON.stringify(cleanedBody))
  } catch(err) {
    sendResponse(res, 400, 'application/json', JSON.stringify({error: err}))
  }
  
}