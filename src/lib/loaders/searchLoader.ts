import * as url from "url"
import { SearchEntity } from "schema/search/SearchEntity"

export const searchLoader = gravityLoader => {
  return gravityLoader(
    ({ query, entities, mode, ...rest }) => {
      const queryParams = {
        term: query,
        "indexes[]":
          entities || SearchEntity.getValues().map(index => index.value),
        ...rest,
      }

      switch (mode) {
        case "AUTOSUGGEST":
          return url.format({ pathname: "/match/suggest", query: queryParams })
        default:
          return url.format({ pathname: "/match", query: queryParams })
      }
    },
    {},
    { headers: true }
  )
}
