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
  'Building', 'Library', 'Hotel', 'Stadium', 'Restaurant', 'School', 'Apartment', 'Park', 'Mall', 'Office', 'Factory', 'Airport', 'Hospital', 'Supermarket', 'Bank', 'Highway', 'Warehouse', 'Amusement Park', 'Church', 'Museum', 'Shopping Center', 'Oil rig', 'Power plant', 'City street', 'Bridge', 'River', 'Forest', 'Office Building', 'High-rise Building'
];

const typeEnum = [
  'Flood', 'Explosion', 'Exlposion', 'Chemical hazard', 'Terrorist activity', 'Fire', 'Chemical Hazard', 'Terrorist Activity', 'Tornado', 'Earthquake', 'Hurricane', 'Accident', 'Traffic accident', 'Collapse', 'Wildfire'
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
