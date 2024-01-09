"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Thankyou() {
  const [userInfo, setUserInfo] = useState<any>({});
  const [fields, setFields] = useState([]);
  useEffect(() => {
    getFields();
  }, []);
  const getFields = async () => {
    const fields: any = await fetch("/api/send", {
      method: "get",
    });
    const fieldsData = await fields.json();
    const state: any = {};
    if (fieldsData && fieldsData.fields && fieldsData.fields[0]) {
      setFields(fieldsData.fields[0]);
      for (let obj of fieldsData.fields[0]) {
        state[obj.name] = "";
      }
    }
    console.log();
  };
  const sendEmail = async () => {
    try {
      // if (
      //   !userInfo.firstName ||
      //   !userInfo.lastName ||
      //   !userInfo.coachineId ||
      //   !userInfo.mobile ||
      //   !userInfo.email ||
      //   !userInfo.userName
      // ) {
      //   alert("Please ender all details");
      //   return false;
      // }
      // userInfo.referedUserName = location.search.split("=")[1];
      const sendApi: any = await fetch("/api/send", {
        method: "post",
        body: JSON.stringify(userInfo),
      });
      console.log(sendApi.status);
      if (sendApi.status !== 200) {
        alert("Somthing went wrong");
      } else {
        alert("Email sent successfully");
      }
    } catch (e) {
      alert("Somthing went wrong");
    }
    console.log();
  };

  return (
    <main className="flex min-h-screen mt-10">
      <form className="max-w-s">
        {fields.map((ob: any) => (
          <div key={ob.id} className="md:flex md:items-center mb-6">
            <div className="md:w-2/3">
              <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
                {ob.display_name}
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="inline-full-name"
                type="text"
                value={userInfo[ob.name]}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    [ob.name]: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        ))}
        {/* <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.lastName}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  lastName: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              Wealthy Online Coachine ID
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.coachineId}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  coachineId: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              Mobile, Please **TRIPPLE CHECK this and EMAIL ADDRESS below as
              this will allow your system to remain live.
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.mobile}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  mobile: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.email}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              User Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.userName}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  userName: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              Blank
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.blank1}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  blank1: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              Blank
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.blank2}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  blank2: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              Blank
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.blank3}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  blank3: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              Blank
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.blank4}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  blank4: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3">
            <label className="mb-1 ml-5 md:mb-0 pr-4 block md:text-left text-gray-700 text-sm font-bold mb-2">
              Blank
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              type="text"
              value={userInfo.blank5}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  blank5: e.target.value,
                });
              }}
            />
          </div>
        </div>
*/}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => sendEmail()}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
