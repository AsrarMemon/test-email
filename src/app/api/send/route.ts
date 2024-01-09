import { sendMail } from "@/app/service/mailService";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
var fs = require("fs");

import mysql from "mysql2/promise";
var connection: any;
// const connectToDB = async () => {
//   connection = await mysql.createConnection({
//     host: "srv1304.hstgr.io",
//     user: "u820335874_root",
//     password: "Abc0@123",
//     database: "u820335874_email_admin",
//   });
// };

// connectToDB();

export async function POST(req: Request) {
  try {
    console.log("000000000000");
    let lastInsertedId = "";
    connection = await mysql.createConnection({
      host: "srv1304.hstgr.io",
      user: "u820335874_root",
      password: "Abc0@123",
      database: "u820335874_email_admin",
    });
    const data = await req.json();
    console.log(data);
    const users: any = await connection.execute(
      `SELECT * FROM user where id=${data.coachineId}`
    );
    console.log(users);
    const dataTosaved: any = await connection.execute(
      `INSERT INTO user (firstName,lastName,userName) VALUES ('${data.firstName}','${data.lastName}', '${data.userName}')`
    );
    console.log(process.cwd());

    // await connection.execute(
    //   `INSERT into email_template (email_tempplate) value` + '(`'+emailT+'`)'
    // );

    const emailTemplate: any = await connection.execute(
      `SELECT * FROM email_template where id=1`
    );
    if (dataTosaved && dataTosaved[0] && dataTosaved[0].insertId) {
      lastInsertedId = dataTosaved[0].insertId;
    }
    console.log();
    let userNameToR = "";
    if (users[0] && users[0][0]) {
      userNameToR = users[0][0].userName;
    }
    data.userNameToR = userNameToR;
    data.lastInsertedId = lastInsertedId;
    var emailT = fs.readFileSync(process.cwd() + "/email1.html", {
      encoding: "utf-8",
    });
    console.log(emailT);
    for (var i in data) {
      emailT = emailT.replaceAll("{{" + i + "}}", data[i]);
    }

    console.log(users[0][0]);
    await sendMail("Welcome", `${data.email}`, emailT);

    return NextResponse.json({ message: "Success" });
  } catch (e) {
    console.log(e);
  }
}
export async function GET(req: Request) {
  connection = await mysql.createConnection({
    host: "srv1304.hstgr.io",
    user: "u820335874_root",
    password: "Abc0@123",
    database: "u820335874_email_admin",
  });
  const users: any = await connection.execute(`SELECT * FROM fields`);
  return NextResponse.json({ fields: users });
}
