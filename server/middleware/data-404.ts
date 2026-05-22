import { defineEventHandler, setResponseStatus } from 'h3'

export default defineEventHandler((event) => {
  const path = event.path || ''

  // If the request starts with /data/ but wasn't served by the static asset handler,
  // it means the file does not exist. Return a clean 404 plain-text response instead
  // of throwing a Nuxt error (which still attempts to render an HTML error page).
  if (path.startsWith('/data/')) {
    setResponseStatus(event, 404)
    return 'Not Found'
  }
})
