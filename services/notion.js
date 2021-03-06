const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

const databaseId = process.env.NOTION_DATABASE_ID

const getVideos = async () => {
  const payload = {
    path: `databases/${databaseId}/query`,
    method: 'POST'
  }

  const { results } = await notion.request(payload)

  const videos = results.map(page => {
    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      date: page.properties.Date.date.start,
      tags: page.properties.Tags.rich_text[0].text.content,
      description: page.properties.Description.rich_text[0].text.content
    }
  })

  return videos
}

module.exports = getVideos
