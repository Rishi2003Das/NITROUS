"use strict";(()=>{var e={};e.id=4941,e.ids=[4941],e.modules={11185:e=>{e.exports=require("mongoose")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},72901:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>h,originalPathname:()=>g,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>q});var o={};t.r(o),t.d(o,{POST:()=>u}),t(95655);var n=t(83323),i=t(54647),s=t(66886),a=t(91053),p=t(15418);async function u(e){try{let r=await e.json(),{receiverEmail:t,sender:o}=r;if(!t||!o)return s.Z.json({error:"Missing sender or receiver data"},{status:400});let n=await p.Z.findOne({email:t});if(!n)return s.Z.json({error:"Receiver not found"},{status:404});let i="http://localhost:3000",u=`
      <h2>New SkillSwap Request from ${o.name}</h2>
      <p><strong>Email:</strong> ${o.email}</p>
      <p><strong>Location:</strong> ${o.location||"N/A"}</p>

      <h4>Skills Offered:</h4>
      <ul>${(o.skillsOffered||[]).map(e=>`<li>${e.name}</li>`).join("")}</ul>

      <h4>Skills Wanted:</h4>
      <ul>${(o.skillsWanted||[]).map(e=>`<li>${e.name}</li>`).join("")}</ul>

      <p>Respond:</p>
      <a href="${i}/api/respond?email=${encodeURIComponent(o.email)}&action=accept"
         style="padding: 10px 15px; background: green; color: white; text-decoration: none; margin-right: 10px;">
        ✅ Accept
      </a>

      <a href="${i}/api/respond?email=${encodeURIComponent(o.email)}&action=reject"
         style="padding: 10px 15px; background: red; color: white; text-decoration: none;">
        ❌ Reject
      </a>
    `;return await (0,a.C)({email:n.email,subject:`New SkillSwap Request from ${o.name}`,emailType:"CONNECT_REQUEST",html:u}),s.Z.json({message:"Connection request sent"})}catch(e){return console.error("Connect error:",e),s.Z.json({error:"Internal Server Error"},{status:500})}}let l=n.AppRouteRouteModule,c=new l({definition:{kind:i.x.APP_ROUTE,page:"/api/connect/route",pathname:"/api/connect",filename:"route",bundlePath:"app/api/connect/route"},resolvedPagePath:"C:\\Users\\HP\\Desktop\\NITROUS\\app\\api\\connect\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:d,staticGenerationAsyncStorage:m,serverHooks:x,headerHooks:h,staticGenerationBailout:q}=c,g="/api/connect/route"}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[4303,3330,5418,1053],()=>t(72901));module.exports=o})();