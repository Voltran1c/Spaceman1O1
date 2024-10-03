export const ga_measurement_id = process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID

export const pageview = (url) => {
  window.gtag('config', ga_measurement_id, {
    page_path: url,
  })
}

export const event = ({ action, params }) => {
  window.gtag('event', action, params)
}
