// Retrieve site number
function getSiteNumber(site) {
  if (site) {
      const stringSite = site.toString();
      const trimmedSite = stringSite.trim();
      const index = siteEnum.indexOf(trimmedSite);
      return index !== -1 ? index : 0;
  } else {
      return 0;
  }
}

// Retrieve number type
function getTypeNumber(type) {
  if (type) {
      const stringType = type.toString();
      const trimmedType = stringType.trim();
      const index = typeEnum.indexOf(trimmedType);
      return index !== -1 ? index : null;
  } else {
      return null;
  }
}

// Site types definition
const siteEnum = [
  'building',
  'library',
  'hotel',
  'stadium',
  'restaurant',
  'school',
  'apartment',
  'park',
  'mall',
  'office',
  'factory',
  'airport',
  'hospital',
  'supermarket',
  'bank',
  'highway',
  'warehouse',
  'amusement park',
  'church',
  'museum',
  'shopping center',
  'oil rig',
  'power plant',
  'city street',
  'bridge',
  'river',
  'forest',
  'office building',
  'high-rise building'
];

// Disaster types definition
const typeEnum = [
  'flood',
  'explosion',
  'chemical hazard',
  'terrorist activity',
  'fire',
  'tornado',
  'earthquake',
  'hurricane',
  'accident',
  'traffic accident',
  'collapse',
  'wildfire'
];

// Disaster status definition
const statusEnum = [
  'pending', // Upon creation
  'active',
  'resolved', // The disaster is over.
  'closed' // It was added to feedback loop.
];

// Resource types definition
const resourceEnum = [
  'ambulance',
  'garda',
  'fire',
  'bus',
  'helicopter',
  'rest centre'
];

module.exports = {
  getTypeNumber: getTypeNumber,
  getSiteNumber: getSiteNumber,
  siteEnum: siteEnum,
  typeEnum: typeEnum,
  statusEnum: statusEnum,
  resourceEnum: resourceEnum
};