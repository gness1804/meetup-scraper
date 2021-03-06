const sorter = (data, criterion) => {
  return data
    .filter((x) => x)
    .sort((a, b) => {
      switch (criterion) {
        case 'mostRecent': {
          let mostRecentA = a['Days Since Most Recent Past Event'];
          let mostRecentB = b['Days Since Most Recent Past Event'];

          // if the date is today, give it a very small number so it comes out on top. Multiple todays just tie.
          if (mostRecentA === 'Today!') mostRecentA = 0.025;
          if (mostRecentB === 'Today!') mostRecentB = 0.025;

          if (isNaN(mostRecentA)) mostRecentA = 10000;
          if (isNaN(mostRecentB)) mostRecentB = 10000;

          return mostRecentA - mostRecentB;
        }
        case 'soonest': {
          let soonestA = a['Days Until Soonest Upcoming Event'];
          let soonestB = b['Days Until Soonest Upcoming Event'];

          // if the date is today, give it a very small number so it comes out on top. Multiple todays just tie.
          if (soonestA === 'Today!') soonestA = 0.025;
          if (soonestB === 'Today!') soonestB = 0.025;

          if (isNaN(soonestA)) soonestA = 10000;
          if (isNaN(soonestB)) soonestB = 10000;

          return soonestA - soonestB;
        }
        case 'members': {
          let membersA = a['Total Members'];
          let membersB = b['Total Members'];

          if (isNaN(membersA)) membersA = 0;
          if (isNaN(membersB)) membersB = 0;

          return membersB - membersA;
        }
        case 'title': {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();

          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        }
        default: {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();

          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        }
      }
    });
};

module.exports = { sorter };
