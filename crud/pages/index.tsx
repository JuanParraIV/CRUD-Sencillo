import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  bio: string;
}

const Home: NextPage = () => {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    bio: "",
  });
  const HandleSubmit = (event) => {
    event.preventDefault();
  };

  console.log({
    firstName: form.firstName,
    lastName: form.lastName,
    bio: form.bio,
  });

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">User Date</h1>

      <form
        className="flex flex-col items-stretch w-auto min-w-[25%] max-w-min mx-auto space-y-6 "
        onSubmit={(event) => HandleSubmit(event)}
      >
        <input
          className="rounded p-2 border-2 border-gray-600"
          type="text"
          placeholder="Name"
          name=""
          id=""
          value={form.firstName}
          onChange={(event) =>
            setForm({ ...form, firstName: event.target.value })
          }
        />
        <input
          className="rounded p-2 border-2 border-gray-600"
          type="text"
          placeholder="Name"
          name=""
          id=""
          value={form.lastName}
          onChange={(event) =>
            setForm({ ...form, lastName: event.target.value })
          }
        />
        <textarea
          className="rounded p-2 border-2 border-gray-600"
          placeholder="Bio"
          name=""
          id=""
          value={form.bio}
          onChange={(event) => setForm({ ...form, bio: event.target.value })}
        />

        <button
          onClick={(event) => HandleSubmit(event)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
          type="submit"
        >
          Add +
        </button>
      </form>
    </div>
  );
};

export default Home;
