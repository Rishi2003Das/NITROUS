"use strict";(()=>{var e={};e.id=4941,e.ids=[4941],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},13961:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>f,originalPathname:()=>g,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>h,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>x});var o={};t.r(o),t.d(o,{POST:()=>l}),t(95655);var s=t(83323),i=t(54647),n=t(66886),a=t(63330);let p=async({email:e,emailType:r,userId:t,html:o,subject:s})=>{try{let t=a.createTransport({service:"gmail",host:"smtp.gmail.com",port:465,secure:!0,auth:{user:process.env.MAILER_USER,pass:process.env.MAILER_PASS}}),i=o||`
      <p>Default content. No HTML provided.</p>
    `;await t.sendMail({from:`"SkillSwap" <${process.env.MAILER_FROM}>`,to:e,subject:s||("VERIFY"===r?"Verify Your Email":"Reset Your Password"),html:i})}catch(e){throw console.error("Email sending failed:",e),Error("Email sending failed")}};async function l(e){try{let r=await e.json(),{receiverEmail:t,sender:o}=r;if(!t||!o)return n.Z.json({error:"Missing data"},{status:400});let s=`
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #6366f1;">New Connect Request on SkillSwap</h2>
        <p><strong>${o.name}</strong> wants to connect with you!</p>
        <p>Email: ${o.email}</p>
        ${o.location?`<p>Location: ${o.location}</p>`:""}
        <p><strong>Skills Offered:</strong></p>
        <ul>
          ${o.skillsOffered?.map(e=>`<li>${e.name} (${e.proficiency||"n/a"})</li>`).join("")}
        </ul>
        <p><strong>Skills Wanted:</strong></p>
        <ul>
          ${o.skillsWanted?.map(e=>`<li>${e.name} (${e.proficiency||"n/a"})</li>`).join("")}
        </ul>
        <p>Reply directly to this email to continue the conversation.</p>
      </div>
    `;return await p({email:t,emailType:"VERIFY",userId:"connect-action",html:s,subject:"SkillSwap: Someone wants to connect with you!"}),n.Z.json({success:!0})}catch(e){return console.error(e),n.Z.json({error:"Something went wrong"},{status:500})}}let u=s.AppRouteRouteModule,c=new u({definition:{kind:i.x.APP_ROUTE,page:"/api/connect/route",pathname:"/api/connect",filename:"route",bundlePath:"app/api/connect/route"},resolvedPagePath:"C:\\Users\\HP\\Desktop\\NITROUS\\app\\api\\connect\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:d,staticGenerationAsyncStorage:m,serverHooks:h,headerHooks:f,staticGenerationBailout:x}=c,g="/api/connect/route"}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[4303,3330],()=>t(13961));module.exports=o})();