"use strict";(()=>{var e={};e.id=4941,e.ids=[4941],e.modules={11185:e=>{e.exports=require("mongoose")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},14300:e=>{e.exports=require("buffer")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},72901:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>q,originalPathname:()=>y,requestAsyncStorage:()=>m,routeModule:()=>x,serverHooks:()=>h,staticGenerationAsyncStorage:()=>g,staticGenerationBailout:()=>f});var o={};t.r(o),t.d(o,{POST:()=>l}),t(95655);var n=t(83323),i=t(54647),s=t(66886),a=t(15418),p=t(39381),u=t(32805),c=t(91053);async function l(e){try{await (0,p.Z)();let{recipientId:r}=await e.json(),t=e.cookies.get("User")?.value;if(!t)return s.Z.json({error:"Unauthorized: No sender data"},{status:401});let o=JSON.parse(t),n=await a.Z.findById(r);if(!n)return s.Z.json({error:"Recipient not found"},{status:404});let i=(0,u.rR)({userId:n._id.toString(),senderEmail:o.email,senderName:o.name,emailType:"CONNECT"}),l=process.env.NEXT_PUBLIC_BASE_URL||"http://localhost:3000",d=`${o.name} wants to connect with you on SkillSwap`,x=`
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2>👋 New Connection Request</h2>
        <p><strong>${o.name}</strong> wants to connect with you on <strong>SkillSwap</strong>.</p>
        <p>Email: ${o.email}</p>

        <div style="margin: 20px 0;">
          <a href="${l}/api/respond?token=${i}&action=accept" 
             style="padding: 12px 20px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">
            ✅ Accept
          </a>
          <a href="${l}/api/respond?token=${i}&action=reject" 
             style="padding: 12px 20px; background: #ef4444; color: white; text-decoration: none; border-radius: 5px;">
            ❌ Reject
          </a>
        </div>

        <p>If you do not recognize this request, you can safely ignore this email.</p>
        <hr />
        <p style="font-size: 12px; color: #999;">SkillSwap &copy; ${new Date().getFullYear()}</p>
      </div>
    `;return await (0,c.C)({email:n.email,emailType:"CONNECT",userId:n._id.toString(),subject:d,html:x}),s.Z.json({message:"Connection email sent successfully."})}catch(e){return console.error("Connect route error:",e),s.Z.json({error:"Internal server error"},{status:500})}}let d=n.AppRouteRouteModule,x=new d({definition:{kind:i.x.APP_ROUTE,page:"/api/connect/route",pathname:"/api/connect",filename:"route",bundlePath:"app/api/connect/route"},resolvedPagePath:"C:\\Users\\HP\\Desktop\\NITROUS\\app\\api\\connect\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:m,staticGenerationAsyncStorage:g,serverHooks:h,headerHooks:q,staticGenerationBailout:f}=x,y="/api/connect/route"}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[4303,3269,3330,9902,2805,1053],()=>t(72901));module.exports=o})();