"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function emailtemplate() {
  const [userInfo, setUserInfo] = useState<any>({});
  const [fields, setFields] = useState([]);
  const [emailTemplate, setEmailTemplate] = useState("");
  useEffect(() => {
    getFields();
  }, []);
  const getFields = async () => {
    const fields: any = await fetch("/api/email-template", {
      method: "get",
    });
    const fieldsData = await fields.json();
    console.log(fieldsData);
    setEmailTemplate(fieldsData.template);
  };
  const save = async () => {
    try {
      const sendApi: any = await fetch("/api/email-template", {
        method: "post",
        body: JSON.stringify({ template: emailTemplate }),
      });
      console.log(sendApi.status);
      if (sendApi.status !== 200) {
        alert("Somthing went wrong");
      } else {
        alert("Saved successfully");
      }
    } catch (e) {
      alert("Somthing went wrong");
    }
    console.log();
  };

  return (
    <main>
      <form>
        <textarea
          id="message"
          rows="20"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write template..."
          value={emailTemplate}
          onChange={(e) => {
            setEmailTemplate(e.target.value);
          }}
        ></textarea>

        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          onClick={save}
        >
          Save
        </button>
      </form>
    </main>
  );
}
