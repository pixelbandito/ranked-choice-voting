(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{232:function(e,t,a){e.exports=a(497)},237:function(e,t,a){},238:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},239:function(e,t,a){},497:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(229),r=a.n(o),i=(a(237),a(8)),c=a(9),d=a(11),s=a(10),u=a(12),p=(a(238),a(239),a(98)),m=a(31),b=a(38),h=a(150),v=a.n(h),f=a(49),g=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).handleClickButton=function(){a.props.firebase.login({provider:"google",type:"popup"})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.auth;return l.a.createElement("div",this.props,l.a.createElement("button",{onClick:this.handleClickButton},"Click me!",Object(b.isLoaded)(e)?Object(b.isEmpty)(e)?l.a.createElement("span",null,"Not Authed"):l.a.createElement("pre",null,JSON.stringify(e,null,2)):l.a.createElement("span",null,"Loading...")))}}]),t}(n.Component),O=(Object(m.c)(b.withFirebase,Object(p.b)(function(e){return{auth:e.firebase.auth}}))(g),a(24)),j=a(39),C=a(4),E=a(30),y=a.n(E),P=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).state={polls:{},newCandidateName:""},a.updatePolls=function(e){var t=e.nextPolls,n=e.prevPolls;t&&JSON.stringify(n)!==JSON.stringify(t)&&a.setState({polls:t})},a.getCandidateById=function(e){var t=e.candidateId;return e.candidates.find(function(e){return e.id===t})},a.getCandidateByName=function(e){var t=e.candidateName;return e.candidates.find(function(e){return e.name===t})},a.getAddCandidateDisabled=function(){var e=a.props.activePoll.candidates,t=a.state.newCandidateName;return!t||a.getCandidateByName({candidateName:t,candidates:e})},a.submitAddCandidateForm=function(e){return e.stopPropagation(),e.preventDefault(),a.addCandidate()},a.addCandidate=function(){var e=a.props,t=e.activePoll,n=e.setPoll,l=a.state.newCandidateName;a.getAddCandidateDisabled()||(a.setState({newCandidateName:""}),n(Object(C.a)({},t,{candidates:[].concat(Object(j.a)(t.candidates),[{name:l,id:y.a.generate()}])})))},a.changeNewCandidateNameInput=function(e){var t=e.target.value;a.setState(function(e){return Object(C.a)({},e,{newCandidateName:t})})},a.submitForm=function(e){(0,a.props.setPolls)(a.state.polls),e.preventDefault()},a.renderNewCandidateForm=function(){var e=a.state.newCandidateName;return l.a.createElement("li",{key:"newCandidate"},l.a.createElement("form",{disabled:a.getAddCandidateDisabled(),onSubmit:a.submitAddCandidateForm},l.a.createElement("label",{htmlFor:"newCandidate"},"New candidate"),l.a.createElement("input",{id:"newCandidate",placeholder:"Candidate name",type:"text",value:e,onChange:a.changeNewCandidateNameInput}),l.a.createElement("button",{disabled:a.getAddCandidateDisabled()},"Add candidate")))},a.handleChangeCandidateNameInput=function(e){return function(t){var n=a.props.activePoll.candidates,l=t.target.value;l&&!a.getCandidateByName({candidates:n,candidateName:l})&&(a.setState(function(t){var n=a.props.activePoll,o=t.polls,r=n.candidates,i=Object(j.a)(r);return i.splice(r.indexOf(e),1,Object(C.a)({},e,{name:l})),{polls:Object(C.a)({},o,Object(O.a)({},n.id,Object(C.a)({},n,{candidates:i})))}}),t.stopPropagation())}},a.renderCandidates=function(){var e=a.props.activePoll.candidates.map(function(e){return l.a.createElement("li",{key:e.id},l.a.createElement("label",{htmlFor:e.id},"Candidate"),l.a.createElement("input",{id:e.id,onChange:a.handleChangeCandidateNameInput(e),placeholder:"Candidate name",type:"text",value:e.name}))});return[].concat(Object(j.a)(e),[a.renderNewCandidateForm()])},a.handleChangePollNameInput=function(e){var t=a.props.activePoll,n=a.state.polls,l=e.target.value||t.name;a.setState(function(e){return{polls:Object(C.a)({},n,Object(O.a)({},t.id,Object(C.a)({},t,{name:l})))}})},a.handleChangeEnabledCheckbox=function(e){var t=a.props.activePoll,n=e.target.checked;a.setState(function(e){return{polls:Object(C.a)({},e.polls,Object(O.a)({},t.id,Object(C.a)({},t,{enabled:n})))}})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.polls,t=this.state.polls;this.updatePolls({nextPolls:e,prevPolls:t})}},{key:"componentDidUpdate",value:function(e){var t=this.props.polls,a=e.polls;this.updatePolls({nextPolls:t,prevPolls:a})}},{key:"render",value:function(){var e=this.props.activePoll,t=e.enabled,a=e.name;return l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"pollSelect"},"Select poll"),l.a.createElement("select",{id:"pollSelect",onChange:this.handleChangePollSelect,defaultValue:"placeholder"},l.a.createElement("option",{disabled:!0,value:"placeholder"},"Select a poll"),l.a.createElement("option",{value:"create"},"Create a new poll")),l.a.createElement("form",{onSubmit:this.submitForm},l.a.createElement("h1",null,"Poll"),l.a.createElement("section",null,l.a.createElement("label",{htmlFor:"name"},"Poll name"),l.a.createElement("input",{type:"text",onChange:this.handleChangePollNameInput,value:a})),l.a.createElement("section",null,l.a.createElement("ul",null,this.renderCandidates())),l.a.createElement("section",null,l.a.createElement("label",{htmlFor:"toggleEnabled"},l.a.createElement("input",{id:"toggleEnabled",onChange:this.handleChangeEnabledCheckbox,type:"checkbox",checked:t}),"Enable")),l.a.createElement("button",{type:"button"},"Cancel"),l.a.createElement("button",{type:"submit"},"Save")))}}]),t}(n.Component),k=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state={ballots:[],candidateRanks:[],voterName:""},a.updateShuffledCandidatesFromProps=function(e){var t=e.prevProps,n=void 0===t?{}:t,l=e.nextProps,o=void 0===l?{}:l,r=e.forceUpdate,i=void 0!==r&&r,c=o.activePoll,d=n.activePoll,s=(c||{}).candidates,u=void 0===s?[]:s,p=(d||{}).candidates,m=void 0===p?[]:p;if(JSON.stringify(u)!==JSON.stringify(m)||i){var b=Object(j.a)(u);b.sort(function(){return Math.random()>.5?1:-1});var h=b.map(function(e){return e.id});a.setState({candidateRanks:h})}},a.onChangeCandidateRankInput=function(e){return function(t){var n=a.state.candidateRanks,l=t.target.value;if(l){var o=Object(j.a)(n);o.splice(n.indexOf(e),1),o.splice(l,0,e),a.setState({candidateRanks:o})}}},a.handleChangeVotertNameInput=function(e){return a.setState({voterName:e.target.value})},a.handleSubmitBallotForm=function(e){var t=a.props,n=t.activePoll,l=(n=void 0===n?{}:n).id,o=void 0===l?null:l,r=t.addBallot,i=a.state,c=i.candidateRanks,d=i.voterName;e.preventDefault(),r({candidateRanks:c,submittedDate:(new Date).valueOf(),submitted:!0,id:y.a.generate(),pollId:o,voterName:d}),a.setState({voterName:""}),a.updateShuffledCandidatesFromProps({nextProps:a.props,forceUpdate:!0})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.updateShuffledCandidatesFromProps({nextProps:this.props})}},{key:"componentDidUpdate",value:function(e){this.updateShuffledCandidatesFromProps({nextProps:this.props,prevProps:e})}},{key:"render",value:function(){var e=this,t=this.props.activePoll,a=this.state,n=a.candidateRanks,o=a.voterName,r=(t||{}).candidates,i=void 0===r?[]:r;return l.a.createElement("div",null,l.a.createElement("h1",null,"Ballot"),l.a.createElement("form",{onSubmit:this.handleSubmitBallotForm},l.a.createElement("section",null,l.a.createElement("label",{htmlFor:"voterName"},"Your name"),l.a.createElement("input",{id:"voterName",type:"text",onChange:this.handleChangeVotertNameInput,value:o})),l.a.createElement("section",null,l.a.createElement("ul",null,n.map(function(t,a){var n=i.find(function(e){return e.id===t});return l.a.createElement("li",{key:n.id},l.a.createElement("label",{htmlFor:"candidateRankInput--".concat(n.id)},"Candidate rank",l.a.createElement("br",null),l.a.createElement("strong",null,n.name)),l.a.createElement("input",{id:"candidateRankInput--".concat(n.id),min:"0",max:i.length-1,step:"1",type:"number",value:a,onChange:e.onChangeCandidateRankInput(n.id)}))}))),l.a.createElement("section",null,l.a.createElement("button",{type:"submit",disabled:!o},"Submit"))))}}]),t}(n.Component),S=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state={polls:{}},a.setPolls=function(e){a.setState({polls:e});var t=JSON.stringify(e);window.localStorage.setItem("polls",t)},a.setPoll=function(e){var n=a.state.polls;a.setPolls(Object(C.a)({},n,Object(O.a)({},e.id,Object(C.a)({},t.defaultBallot,n[e.id],e))))},a.getActivePoll=function(){var e=a.state.polls,n=Object.keys(e).length?Object.keys(e)[0]:null;return n?e[n]:Object(C.a)({},t.defaultPoll)},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({polls:t.updatePollsFromLocalStorage()})}},{key:"render",value:function(){var e=this.props,t=e.children,a=Object(f.a)(e,["children"]),n=this.state.polls;return l.a.cloneElement(t,Object(C.a)({},a,{activePoll:this.getActivePoll(),addPoll:this.addPoll,polls:n,setPolls:this.setPolls,setPoll:this.setPoll}))}}]),t}(n.Component);S.defaultPoll={candidates:[],enabled:!1,id:y.a.generate(),name:"",createdDate:null,updatedDate:null,enabledDate:null},S.updatePollsFromLocalStorage=function(){var e=window.localStorage.getItem("polls"),t={};try{t=JSON.parse(e)||t}catch(a){console.warn("Couldn't load polls, they'll be overwritten")}return t};var N=S,w=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state={ballots:{}},a.setBallots=function(e){a.setState({ballots:e});var t=JSON.stringify(e);window.localStorage.setItem("ballots",t)},a.addBallot=function(e){var n=a.state.ballots;a.setBallots(Object(C.a)({},n,Object(O.a)({},e.id,Object(C.a)({},t.defaultBallot,n[e.id],e))))},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({ballots:t.getBallotsFromLocalStorage()})}},{key:"render",value:function(){var e=this.props,t=e.children,a=Object(f.a)(e,["children"]),n=this.state.ballots;return l.a.cloneElement(t,Object(C.a)({},a,{ballots:n,addBallot:this.addBallot}))}}]),t}(n.Component);w.defaultBallot={candidateRanks:[],submittedDate:null,submitted:!1,id:y.a.generate(),pollId:"",voterName:""},w.getBallotsFromLocalStorage=function(){var e=window.localStorage.getItem("ballots"),t={};try{t=JSON.parse(e)||t}catch(a){console.warn("Couldn't load ballots, they'll be overwritten")}return t};var F=w,B=a(61),I=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.activePoll,a=e.ballots,n=Object.entries(a).filter(function(e){var a=Object(B.a)(e,2);a[0];return a[1].pollId===t.id}).sort(function(e,t){var a=Object(B.a)(e,2),n=(a[0],a[1]),l=Object(B.a)(t,2),o=(l[0],l[1]);return n.submittedDate>o.submittedDate?-1:1}).map(function(e){var t=Object(B.a)(e,2);t[0];return t[1]});return l.a.createElement("div",null,l.a.createElement("h1",null,"<Results />"),l.a.createElement("h2",null,n.length," ballot",1===n.length?"":"s"),l.a.createElement("ul",null,n.map(function(e){return l.a.createElement("li",{key:e.id},l.a.createElement("em",null,new Date(e.submittedDate).toLocaleString()),l.a.createElement("br",null),l.a.createElement("pre",null,JSON.stringify(e)))})))}}]),t}(n.Component),D=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(l)))).state={tab:"pollForm"},a.handleClickSetTab=function(e){return function(t){return a.setState({tab:e})}},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=(e.auth,Object(f.a)(e,["auth"])),a=this.state.tab;return l.a.createElement("div",t,l.a.createElement("div",{className:"tabs"},l.a.createElement("button",{className:"tab",onClick:this.handleClickSetTab("pollForm")},"Poll editor"),l.a.createElement("button",{className:"tab",onClick:this.handleClickSetTab("ballot")},"Ballot"),l.a.createElement("button",{className:"tab",onClick:this.handleClickSetTab("results")},"Results")),"pollForm"===a&&l.a.createElement(N,null,l.a.createElement(P,null)),"ballot"===a&&l.a.createElement(N,null,l.a.createElement(F,null,l.a.createElement(k,null))),"results"===a&&l.a.createElement(N,null,l.a.createElement(F,null,l.a.createElement(I,null))),!1)}}]),t}(n.Component);v.a.initializeApp({apiKey:"AIzaSyBdsGFx0j9svg0lfxEHqiWoiUuFywN6tSg",authDomain:"ranked-choice-voting-805a0.firebaseapp.com",databaseURL:"https://ranked-choice-voting-805a0.firebaseio.com",projectId:"ranked-choice-voting-805a0",storageBucket:"ranked-choice-voting-805a0.appspot.com",messagingSenderId:"860983913109"});var x=Object(m.c)(Object(b.reactReduxFirebase)(v.a,{userProfile:"users"}))(m.d)(Object(m.b)({firebase:b.firebaseReducer}),{}),A=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(p.a,{store:x},l.a.createElement("div",{className:"App"},l.a.createElement(D,null)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[232,1,2]]]);
//# sourceMappingURL=main.3c25f715.chunk.js.map