import { NextResponse } from "next/server"
import { XMLParser } from "fast-xml-parser"

export async function POST(req) {
  const { username } = await req.json()

  try {
    const newsUrl = `https://news.google.com/rss/search?q=site:x.com/${username}+when:7d`
    const res = await fetch(newsUrl)

    if (!res.ok) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    const xml = await res.text()
    const parser = new XMLParser()
    const data = parser.parse(xml)

    const items = data.rss?.channel?.item

    if (!items) {
      return NextResponse.json({ error: "No tweets found" }, { status: 404 })
    }

    const tweets = Array.isArray(items)
      ? items.map(i => i.title)
      : [items.title]

    return NextResponse.json({ tweets })

  } catch (err) {
    return NextResponse.json({ error: "Failed fetching feed" }, { status: 500 })
  }
}
