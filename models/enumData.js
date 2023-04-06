function getSiteNumber(site) {
  if(site){
    const stringSite = site.toString();
    const trimmedSite = stringSite.trim();
    const index = siteEnum.indexOf(trimmedSite);
    return index !== -1 ? index : 0;
  } else{
    return 0;
  }
}

function getTypeNumber(type) {
  if(type){
    const stringType = type.toString();
    const trimmedType = stringType.trim();
    const index = typeEnum.indexOf(trimmedType);
    return index !== -1 ? index : null;
  } else{
    return null;
  }
}

const siteEnum = [
  "building",
  "library",
  "hotel",
  "stadium",
  "restaurant",
  "school",
  "apartment",
  "park",
  "mall",
  "office",
  "factory",
  "airport",
  "hospital",
  "supermarket",
  "bank",
  "highway",
  "warehouse",
  "amusement park",
  "church",
  "museum",
  "shopping center",
  "oil rig",
  "power plant",
  "city street",
  "bridge",
  "river",
  "forest",
  "high-rise"
];

const typeEnum = [
  "Flood",
  "Explosion",
  "Chemical hazard",
  "Terrorist activity",
  "Fire",
  "Tornado",
  "Earthquake",
  "Hurricane",
  "Accident",
  "Traffic accident",
  "Collapse",
  "Wildfire"
];

const statusEnum = [
  'pending',
  'active',
  'resolved'
];

const resourceEnum = [
  'ambulance',
  'garda',
  'fire',
  'bus',
  'helicopter',
  'rest centre'
];

module.exports = {
  getTypeNumber : getTypeNumber,
  getSiteNumber : getSiteNumber,
  siteEnum:siteEnum,
  typeEnum:typeEnum,
  statusEnum:statusEnum,
  resourceEnum:resourceEnum
};
