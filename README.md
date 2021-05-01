# Meetup Scraper

This is a tool to scrape the popular website meetup.com. Simply enter in an interest query (for instance, "soccer"), and the program will retrieve several meetup groups in your area with details such as total members, most recent past event, soonest current event, and a description.

Usage: `node index.js <args>` or `yarn start <args>`.

From the `--help` text:

```
Retrieves Meetup data on a specific interest.
    The possible options are:
      1. the search term. Example: "soccer". Required and must be first arg.

      The following are optional and order agnostic:

      -z [zip code]: any valid US zip code. Defaults to '78758'.
      -m [number]: the max results to be found. Defaults to '5'.
      -s [criterion]: sorting criterion. Available options: mostRecent | soonest | members | title. Default to "mostRecent".

      Additionally, passing "-p" as an argument prints out the resulting JSON data to standard output.
```
