import { sendMail } from "@/app/service/mailService";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import mysql from "mysql2/promise";
var connection: any;
const connectToDB = async () => {
  connection = await mysql.createConnection({
    host: "srv1304.hstgr.io",
    user: "u820335874_root",
    password: "Abc0@123",
    database: "u820335874_email_admin",
  });
};

connectToDB();

export async function POST(req: Request) {
  let lastInsertedId = "";
  if (!connection) {
    connection = await mysql.createConnection({
      host: "srv1304.hstgr.io",
      user: "u820335874_root",
      password: "Abc0@123",
      database: "u820335874_email_admin",
    });
  }
  const data = await req.json();
  const users: any = await connection.execute(
    `SELECT * FROM user where id=${data.coachineId}`
  );

  const dataTosaved: any = await connection.execute(
    `INSERT INTO user (firstName,lastName,userName) VALUES ('${data.firstName}','${data.lastName}', '${data.userName}')`
  );

  if (dataTosaved && dataTosaved[0] && dataTosaved[0].insertId) {
    lastInsertedId = dataTosaved[0].insertId;
  }
  console.log();
  let userNameToR = "";
  if (users[0] && users[0][0]) {
    userNameToR = users[0][0].userName;
  }
  console.log(users[0][0]);
  await sendMail(
    "Welcome",
    `${data.email}`,
    
    `Welcome, ${data.firstName} ${data.lastName},

    Your membership has been activated by your Coach!

    Now follow this  FINAL LAST STEP#3  110% to the letter otherwise you would of completely wasted all your time and money so listen up....
    
    Very soon you will recieve a email from one of our team members THEIR USERNAME and Invoice number.  You add THEIR USERNAME to the link below to give you access to the 7 day free Trial. You then register your details with the following infomation that relates to you below:
        
    FINAL STEP#3
    
    Your Username is: ${data.userName}
    
    Register your new domain name the very same also as: ${data.userName}.ws
    
    Make sure you use this EXACT USERNAME above when registering your 7-Day Free Trial Webstart Package via the link below AND make sure your new domain name is as above also is the EXACT SAME TOO.  
        
    You then register using the link below: (do this as soon as you get an email from one of our team members  as our system can't send you any sales without it!)    
    
    WWW.ABC.....${userNameToR}
    
    PLEASE EMAIL US AT EMAIL ADDRESS BELOW AS WE MUST EMAIL YOU THIS LINK NOW,OK?
    
    PS: Use the link above to register but add the username of the team member who will email you very soon to access the site, ok?
    
    Complete? Good then move on to....

    WHAT NEXT?
    
    Start Sharing your share link in the previous email sent to you using the your following ID Number:
    
    YOUR PERSONAL WEALTHY ONLINE COACHING ID IS NOW: ${data.mobile}
    
    Every time you share your share page online mention to all your friends or other people you refer your ID ${data.mobile} to access our website and so that YOU get paid and collect all those valuable coupon points and stamps!
    
    PS: MAKE SURE YOU FINALISE your account/system setup process by ordering YOUR 100% RISK FREE 7-DAY TRIAL + 100% FREE 15-MINUTE INVITED VIP $1000 COACHING CALL + YOUR WEALTHY ONLINE COACHING ACCOUNT SET UP & PRICELESS MYSTERY UNANNOUNCED GIFT FOR ONLY £9.97 HERE: https://wealthyonlinecoaching.com/buynow.html
    
    Your Id is : ${lastInsertedId}
    Your welcome! 
    
    To Your Future Success 🙂
    
    Wealthy Online Coaching
    
    support@wealthyonlinecoaching.com`
  );

  return NextResponse.json({ message: "Success" });
}
