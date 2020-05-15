

let aT= 'anetcontent'
// aT= 'coh'
const branchName = 'development'
let space = '3yvivwi0yvy3'
// space='xqzvef1zylwc'

const protocol = 'https://'
let domainName = "d2abj3usd75puv.cloudfront.net"
// domainName = "a.network"

const contentfulBranchNamesToCloudfrontDeployments = {
    "production": `${protocol}${domainName}`,
    "staging": `${protocol}${domainName}`,
    "qa": `${protocol}${domainName}`,
    "development": `${protocol}${domainName}`,
  };
export const baseUrl = contentfulBranchNamesToCloudfrontDeployments[branchName];

const clientQueryStringParam =  'client='+aT
const spaceQueryStringParam =  'sId='+space
const branchNameQueryStringParam = 'branch='+branchName;

export const corsOptions = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'content-type': 'application/json',
  }
}
export const qSP= clientQueryStringParam + '&' + spaceQueryStringParam + '&' + branchNameQueryStringParam
export const API = {
  fetch: 'https://hnm853upah.execute-api.us-east-1.amazonaws.com/contentful?'+qSP+'&startBuild=false',
  deploy: 'https://hnm853upah.execute-api.us-east-1.amazonaws.com/contentful?'+qSP+'&startBuild=true'
};


export const findPhaseDetail = (build, currentPhase, key) => build.phases.filter(({phaseType}) => phaseType === currentPhase)[0][key]

export const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
export const formatDate = (date) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  var day = date.getUTCDate();
  var month = monthNames[date.getMonth()]
  var year = date.getUTCFullYear();

  
  var strTime = `${month} ${day}, ${year}`
  return strTime;
}

export const formatDateWithTimeSince = (date) => {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  // years
  if (interval > 1) {
    return formatDate(date)
  }
  // months
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return formatDate(date)
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

export const findTime = ({date}) => {
  let jsDate = new Date(date);

  return formatAMPM(jsDate)
};

export const findDate = ({date}) => {
  let jsDate = new Date(date);

  return formatDateWithTimeSince(jsDate)
};