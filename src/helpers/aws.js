// function showPlaceholderExtension(extension) {
//       const aT= 'coh'
//       const protocol = 'http://'
//       const domainName = "d2abj3usd75puv.cloudfront.net"
//       const contentfulBranchNamesToCloudfrontDeployments = {
//           "production": `${protocol}${domainName}`,
//           "staging": `${protocol}${domainName}`,
//           "qa": `${protocol}${domainName}`,
//           "development": `${protocol}${domainName}`,
//         };

//     const branchName = 'development'
//     const baseUrl = contentfulBranchNamesToCloudfrontDeployments[branchName];
    
//     document.getElementById('root').style.display = 'block';
//     document.getElementById('triggerBuild').style.display = 'none';
//     document.getElementById('infoBox').style.display = 'none';
//     document.getElementById('site').style.display = 'none';
//     document.getElementById('history').style.display = 'none';
//     var buildStatus = document.getElementById('buildStatus');
//     var tag = document.getElementById("tag");
//     tag.innerHTML='<span>Current site link:</span>'
//     buildStatus.innerHTML = '<span><a target="_blank" href="'+baseUrl+'">LIVE</a></span>';
//   }
    
// function showExtension(extension) {

//       var interval = null;
//       var POLLING_INTERVAL = 3000;

//   // returns builds or error
//     function checkStatuses() {
//         return window.fetch(awsCheckStatusHookURL, corsOptions).then(response => response.json())
//           .then((data) => {

//         })
//           .catch(err => console.error(err));
//       }

// // returns build or error
//       function triggerBuild() {
//         return window.fetch(awsBuildHookURL, corsOptions).then(response => response.json())
//           .then((data) => {
//           	console.log('cool build', data)
//           if (interval) {
//                 window.clearInterval(interval);
//               }
//         })
//       .catch(err => console.error(err));
//       }
      
//       function startPollingStatuses() {
//           if (interval) {
//             window.clearInterval(interval);
//           }
//           checkStatuses();
//           interval = window.setInterval(checkStatuses, POLLING_INTERVAL);
//       }

      

//       triggerBuildBtn.addEventListener('click', function () {
//         triggerBuild().then(function (data) {
//           startPollingStatuses();
//         });
//       });

//       checkStatuses()
