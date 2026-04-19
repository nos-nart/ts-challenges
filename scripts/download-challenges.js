import fs from 'fs/promises'
import path from 'path'

const BASE_URL = 'https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/'
const API_URL = 'https://api.github.com/repos/type-challenges/type-challenges/contents/questions'
const OUTPUT_DIR = 'app/data/challenges'

async function downloadFile(challenge, fileName) {
  const url = `${BASE_URL}${challenge}/${fileName}`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
    }
    return await res.text()
  } catch (e) {
    console.error(`Error downloading ${url}:`, e)
    return null
  }
}

async function main() {
  console.log('Fetching challenge list...')
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error(`Failed to fetch challenge list: ${res.statusText}`)
  const challenges = await res.json()

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  // Also save the list of challenges to a JSON file
  await fs.writeFile(path.join(OUTPUT_DIR, 'list.json'), JSON.stringify(challenges, null, 2))

  console.log(`Found ${challenges.length} challenges. Downloading content...`)

  for (const item of challenges) {
    const challengeName = item.name
    const challengeDir = path.join(OUTPUT_DIR, challengeName)
    await fs.mkdir(challengeDir, { recursive: true })

    console.log(`Downloading ${challengeName}...`)

    const files = ['README.md', 'template.ts', 'test-cases.ts']
    await Promise.all(files.map(async (file) => {
      const content = await downloadFile(challengeName, file)
      if (content) {
        await fs.writeFile(path.join(challengeDir, file), content)
      }
    }))
  }

  console.log('All challenges downloaded successfully!')
}

main().catch(console.error)
