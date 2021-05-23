# Meetup Scraper

This is a tool to scrape the popular website meetup.com. Simply enter in an interest query (for instance, "soccer"), along with the optional parameters described below, and the program will retrieve several meetup groups in the chosen area with details such as total members, most recent past event, soonest current event, and a description.

## Installation:
`npm install meetup-scraper`

From the `--help` text:

```
 Retrieves Meetup data on a specific interest.
    The parameters are:
      1. the search term. Example: "soccer". Required and must be first arg.

      The following are optional and order agnostic:

      -z [zip code]: any valid US zip code. Defaults to '78758'.
      -m [number]: the max results to be found. Defaults to '5'.
      -s [criterion]: sorting criterion. Available options: mostRecent | soonest | members | title. Default to "mostRecent".

      Example: 'meetup-scraper tennis -z 24060 -s mostRecent'
```

An example query:
`meetup-scraper tennis -z 24060 -s mostRecent`

This would produce the following output:
```
[
  {
    "title": "Sun Hikers & Outdoor Enthusiasts",
    "url": "https://www.meetup.com/roanoke-social-meetup-groupbe/",
    "Total Members": 30,
    "Upcoming Events Displayed": 4,
    "Past Events Displayed": 1,
    "Most Recent Past Event": "Sat, May 22, 2021",
    "Days Since Most Recent Past Event": 1,
    "Days Until Soonest Upcoming Event": 5,
    "Soonest Upcoming Event": "Sat, May 29, 2021",
    "description": "2021 Goals:1) To find reliable and compatible personalities to enjoy multiple-day backpacking adventures with.2) To hike 600 miles (weekend hiked 419 miles in 2020).I'd like to try something different. Compose an outdoor group enhanced by Astrological classifications.Initially, we'll focus on Sun signs. The overall encapsulation of your being. Oh hail the Sun! ha. You will be asked to share your Ascendant and Moon if you know them. I have found a free natal chart calculator that will give you your Ascendant and Moon if you so desire to find out. As the group dynamic develops there will be an effort made to expand the Astrological dedication. I have many ideas.As a Sagittarius myself, this what I offer...Generous, idealistic, curious and energetic. An open mind and philosophical view motivates to wander around the world in search of the meaning of life. Sagittarius is extrovert, optimistic and enthusiastic, and likes changes. Sagittarius-born..."
  },
  {
    "title": "NRV Do-Anything Group",
    "url": "https://www.meetup.com/DoAnythingNRV/",
    "Total Members": 756,
    "Upcoming Events Displayed": 1,
    "Past Events Displayed": 1,
    "Most Recent Past Event": "Not Recent",
    "Days Since Most Recent Past Event": "Not Recent",
    "Days Until Soonest Upcoming Event": "Not Available",
    "Soonest Upcoming Event": "Not Listed",
    "description": "Do-Anything GroupFood cravings? Looking for others interested in that concert, game, or event? Wanting to hike a local trail? Looking to play a round of golf (or putt-putt)?FoodBeen craving Italian, Mexican, Chinese, Cajun, Thai... anything?Never got around to trying that restaurant?Just don't feel like cooking tonight?Craving Waffle House at 2am?Meet at the bar to watch the big game?Just need a drink?Concerts & EventsNone of your friends want to see that concert?Want to see that show at The Lyric (http://thelyric.com)?Looking to promote some event you're planning?Getting OutsideWant to hike some local trails?Want to bike the Huckleberry Trail?SportsWant to get a group together for basketball, soccer, football, etc?Looking for a golf or tennis buddy?Is putt-putt or bowling more your style?Want to catch a Salem Red Sox or Pulaski Mariners baseball game?Interested in watching a NRV Roller Girls (http://nrvrollergirls.com) derby bout?Want to watch a race at the Motor Mile Speedway?... anything!"
  }
]
```
