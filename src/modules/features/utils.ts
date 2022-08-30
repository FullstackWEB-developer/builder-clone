import { ApplicationName, ApplicationFeatures } from 'dcl-dapps/dist/modules/features/types'

export const fetchApplicationFeatures = async (apps: ApplicationName[]) => {
  const promises = apps.map(a => fetchSingleApplicationFeatures(a))
  const features = await Promise.all(promises)

  return features.reduce((acc, feature) => {
    acc[feature.name] = feature
    return acc
  }, {} as Record<ApplicationName, ApplicationFeatures>)
}

const fetchSingleApplicationFeatures = async (
  app: ApplicationName
): Promise<ApplicationFeatures> => {
  if (app === ApplicationName.BUILDER) {
    return {
      name: app,
      flags: {
        'builder-emote-play-mode': true,
        'builder-new-emote-flow': true,
        'builder-rarities-with-oracle': true
      },
      variants: {}
    }
  }
  const url = `https://feature-flags.decentraland.org/${app}.json`
  const response = await fetch(url)
  const json = await response.json()
  return {
    name: app,
    flags: json.flags,
    variants: json.variants
  }
}
