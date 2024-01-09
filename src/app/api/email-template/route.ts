var fs = require("fs");
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  var emailT = fs.writeFileSync(process.cwd() + "/email1.html", data.template);
  return NextResponse.json({ template: emailT });
}

export async function GET(req: Request) {
  var emailT = fs.readFileSync(process.cwd() + "/email1.html", {
    encoding: "utf-8",
  });
  return NextResponse.json({ template: emailT });
}
