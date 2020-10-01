(this["webpackJsonpapp-react-ui"]=this["webpackJsonpapp-react-ui"]||[]).push([[0],{10:function(e,t,n){e.exports=n(16)},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(7),c=n.n(o),r=n(5),s=n(9),l=n(1),u=n(2),m=n(4),b=n(3),d=n(8),p=new(n.n(d).a)({bitRate:128}),h=function(e){Object(m.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).start=function(){a.state.isBlocked?alert("Permission Denied"):p.start().then((function(){a.setState({isRecording:!0})})).catch((function(e){return console.error(e)}))},a.stop=function(){p.stop().getMp3().then((function(e){var t=Object(s.a)(e,2),n=(t[0],t[1]),i=URL.createObjectURL(n);a.setState({blobURL:i,isRecording:!1})})).catch((function(e){return console.log(e)}))},a.state={isRecording:!1,blobURL:"",isBlocked:!1},a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;navigator.getUserMedia({audio:!0},(function(){console.log("Permission Granted"),e.setState({isBlocked:!1})}),(function(){console.log("Permission Denied"),e.setState({isBlocked:!0})}))}},{key:"render",value:function(){return i.a.createElement("div",{className:"recorder"},i.a.createElement("h1",{className:"header"},"Speech Emotion Recognition"),i.a.createElement("div",{className:"play-button-parent-div"},i.a.createElement("button",{className:"play-button",onClick:this.state.isRecording?this.stop:this.start},this.state.isRecording?i.a.createElement("i",Object(r.a)({className:"play-button-img"},"className","fa fa-stop")):i.a.createElement("i",Object(r.a)({className:"play-button-img"},"className","fa fa-microphone")))),i.a.createElement("div",{className:"audio-player-div"},i.a.createElement("audio",{className:"audio-player",src:this.state.blobURL,controls:"controls"})))}}]),n}(i.a.Component);var f=function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"emotion-card"},i.a.createElement("p",null," ",e.emotion," : ",e.probability," ")))},g=[{id:1,emotion:"Happiness",probability:.92},{id:2,emotion:"Sadness",probability:.1},{id:3,emotion:"Anger",probability:.3},{id:4,emotion:"Surprise",probability:.6},{id:5,emotion:"Disgust",probability:.06},{id:6,emotion:"Wonder",probability:.4}];var E=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"emotion-panel"},g.map((function(e){return i.a.createElement(f,{key:e.id,emotion:e.emotion,probability:e.probability})}))))},v=function(e){Object(m.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={emotion:"Click below",fetching:!1},e.buttonClick=function(t){e.setState({fetching:!0}),fetch("http://127.0.0.1:5000/data").then((function(e){return e.json()})).then((function(t){e.setState({emotion:t.prediction,fetching:!1})}))},e}return Object(u.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"output-panel"},i.a.createElement("h1",null,this.state.emotion),i.a.createElement("button",{id:"fetch-button",className:this.state.fetching?"button-fetching":"button-ready",disabled:this.state.fetching,onClick:this.buttonClick},this.state.fetching?"Fetching...":"Check"))}}]),n}(i.a.Component);var y=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(h,null),i.a.createElement("div",{className:"bottom-part"},i.a.createElement(E,null),i.a.createElement(v,null)))};n(15);c.a.render(i.a.createElement(y,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.580b2f1c.chunk.js.map